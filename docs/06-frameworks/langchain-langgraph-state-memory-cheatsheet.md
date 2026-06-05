---
layout: default
title: Cheatsheet
parent: Frameworks
nav_order: 5
description: Kompakte Referenz für LangChain, LangGraph, State, Checkpointing und Memory im GenAI-Kurs
has_toc: true
---

# Cheatsheet

> **Kurzreferenz für Kursnotebooks: Wann reicht LangChain, wann braucht es LangGraph, und wo gehört Memory hin?**

---


## Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---


<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/cheatsheet.png" class="logo" width="750"/>
<p><font color='black' size="2">
KI-generiertes Bild
</font></p>

## Schnellentscheidung

| Frage                                                          | Empfehlung                                      |
| -------------------------------------------------------------- | ----------------------------------------------- |
| Ein einzelner Modellaufruf, Prompt oder Parser?                | LangChain                                       |
| Eine lineare Pipeline ohne Verzweigung?                        | LangChain LCEL                                  |
| Ein Agent mit wenigen Tools, aber ohne eigene Ablaufsteuerung? | LangChain `create_agent()`                      |
| Mehrere Schritte mit Routing, Schleifen oder Qualitätsgates?   | LangGraph                                       |
| Gesprächsverlauf über mehrere Turns in einer Session?          | LangGraph Checkpointer                          |
| Dauerhafte Nutzerpräferenzen, Fakten oder Profile?             | Separates Memory-System                         |
| Riskante Aktion mit Freigabe?                                  | LangGraph `interrupt()` + `Command(resume=...)` |



---

## Import-Spickzettel

```python
from typing import Annotated, Literal
from typing_extensions import TypedDict

from pydantic import BaseModel, Field

from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, AIMessage

from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.types import interrupt, Command
```

## Minimaler LangChain-Baustein

```python
llm = init_chat_model("openai:gpt-5.4-nano")

prompt = ChatPromptTemplate([
    ("system", "Antworte kurz und konkret."),
    ("human", "{frage}"),
])

chain = prompt | llm | StrOutputParser()

antwort = chain.invoke({"frage": "Was ist LangChain?"})
print(antwort)
```

**Was gehört hierher?**

- Modellaufrufe
- Prompt-Vorlagen
- Output Parser
- Structured Output
- Tools
- lineare RAG-Chains
- einfache Agenten mit `create_agent()`

## Structured Output

```python
class AnfrageTyp(BaseModel):
    intent: Literal["chat", "wissen", "code"] = Field(
        description="Art der Nutzeranfrage"
    )


router_llm = llm.with_structured_output(AnfrageTyp)
ergebnis = router_llm.invoke("Bitte erklaere RAG mit Quellen.")
print(ergebnis.intent)
```

**Regel:** Fuer verlässliche Klassifikation oder Extraktion nicht nur JSON im Prompt verlangen, sondern `with_structured_output()` mit Pydantic-Schema nutzen.

## Minimaler LangGraph-State

```python
class ChatState(TypedDict):
    messages: Annotated[list, add_messages]
    intent: str | None
```

**State enthält nur, was zwischen Nodes gebraucht wird.**

| Gehört in den State | Besser nicht in den State |
|---|---|
| Nachrichtenverlauf | große Dokumente |
| Routing-Entscheidung | komplette Vektorindizes |
| Zwischenergebnis für nächste Node | temporäre lokale Hilfsvariablen |
| Freigabe-Status | API-Keys oder Secrets |
| Fehlerstatus | rohe Debug-Logs |

## Minimaler LangGraph

```python
def chat_node(state: ChatState) -> dict:
    response = llm.invoke(state["messages"])
    return {"messages": [response]}


builder = StateGraph(ChatState)
builder.add_node("chat", chat_node)
builder.add_edge(START, "chat")
builder.add_edge("chat", END)

graph = builder.compile()

result = graph.invoke({
    "messages": [("human", "Was ist LangGraph?")],
    "intent": None,
})
print(result["messages"][-1].content)
```

## Routing mit Conditional Edges

```python
class RouterState(TypedDict):
    messages: Annotated[list, add_messages]
    intent: Literal["chat", "wissen", "code"] | None


def classify_node(state: RouterState) -> dict:
    structured_llm = llm.with_structured_output(AnfrageTyp)
    result = structured_llm.invoke(state["messages"][-1].content)
    return {"intent": result.intent}


def route_by_intent(state: RouterState) -> str:
    return state["intent"] or "chat"


def wissen_node(state: RouterState) -> dict:
    return {"messages": [AIMessage(content="Hier wuerde der RAG-Pfad antworten.")]}


def code_node(state: RouterState) -> dict:
    return {"messages": [AIMessage(content="Hier wuerde ein Code-Pfad vorbereitet.")]}


builder = StateGraph(RouterState)
builder.add_node("classify", classify_node)
builder.add_node("chat", chat_node)
builder.add_node("wissen", wissen_node)
builder.add_node("code", code_node)

builder.add_edge(START, "classify")
builder.add_conditional_edges(
    "classify",
    route_by_intent,
    {
        "chat": "chat",
        "wissen": "wissen",
        "code": "code",
    },
)
builder.add_edge("chat", END)
builder.add_edge("wissen", END)
builder.add_edge("code", END)

graph = builder.compile()
```

**Regel:** Die Routing-Funktion sollte nur entscheiden. Die eigentliche Arbeit gehört in Nodes.

## Checkpointing ist Session-Gedächtnis

```python
checkpointer = InMemorySaver()
graph = builder.compile(checkpointer=checkpointer)

config = {"configurable": {"thread_id": "kurs-demo-01"}}

graph.invoke(
    {"messages": [("human", "Merke: Thema ist RAG.")]},
    config=config,
)

result = graph.invoke(
    {"messages": [("human", "Was war das Thema?")]},
    config=config,
)
```

**Checkpointing speichert den Graph-State pro `thread_id`.** Das ist ideal für laufende Sessions, Wiederaufnahme und Human-in-the-Loop.

| Begriff | Bedeutung |
|---|---|
| `checkpointer` | Speicher für Graph-Zustände |
| `thread_id` | eindeutige Session-ID |
| `InMemorySaver` | flüchtiger Speicher für Notebooks und Demos |
| persistenter Checkpointer | Speicher über Prozess-Neustarts hinweg |

## Memory ist mehr als Chatverlauf

| Ebene | Zweck | Beispiel | Typische Umsetzung |
|---|---|---|---|
| Prompt-Kontext | Aktuelle Aufgabe steuern | Systemprompt, Beispiele | LangChain Prompt |
| Message History | Bisheriger Dialog | Human/AI Messages | `add_messages` |
| Checkpointing | Session fortsetzen | gleicher `thread_id` | LangGraph Checkpointer |
| RAG-Memory | Wissen abrufen | Dokumente, Chunks | ChromaDB, Retriever |
| Langzeit-Memory | Nutzerpräferenzen/Fakten | "mag kurze Antworten" | Datenbank + explizite Regeln |

**Nicht verwechseln:** Ein Checkpointer macht noch kein gutes Langzeitgedaechtnis. Er speichert Zustand, aber entscheidet nicht, was dauerhaft sinnvoll, erlaubt oder relevant ist.

## Human-in-the-Loop

```python
def approval_node(state: RouterState) -> dict:
    letzte_anfrage = state["messages"][-1].content
    decision = interrupt({
        "frage": "Aktion ausführen?",
        "anfrage": letzte_anfrage,
    })

    if decision.get("approved"):
        return {"intent": "code"}

    return {
        "messages": [AIMessage(content="Aktion wurde nicht ausgefuehrt.")],
        "intent": "chat",
    }


result = graph.invoke(
    Command(resume={"approved": True}),
    config=config,
)
```

**Wichtig:** `interrupt()` braucht einen Checkpointer und eine stabile `thread_id`, sonst kann der Graph nicht sauber fortgesetzt werden.

## RAG im Graph

```python
class RagState(TypedDict):
    messages: Annotated[list, add_messages]
    context: str


def retrieve_node(state: RagState) -> dict:
    frage = state["messages"][-1].content
    # Der Retriever wird vorher aus einem Vektorstore erzeugt,
    # zum Beispiel mit Chroma: vectorstore.as_retriever(...)
    docs = retriever.invoke(frage)
    context = "\n\n".join(doc.page_content for doc in docs)
    return {"context": context}


def answer_node(state: RagState) -> dict:
    prompt = ChatPromptTemplate([
        ("system", "Antworte nur mit dem Kontext:\n{context}"),
        ("human", "{frage}"),
    ])
    chain = prompt | llm | StrOutputParser()
    answer = chain.invoke({
        "context": state["context"],
        "frage": state["messages"][-1].content,
    })
    return {"messages": [AIMessage(content=answer)]}
```

**Regel:** Der Retriever selbst bleibt außerhalb des State. In den State gehört nur der abgerufene Kontext oder ein kompaktes Zwischenergebnis.

## Typische Fehler

| Fehler | Besser |
|---|---|
| LangGraph für jeden kleinen Modellaufruf verwenden | Erst LangChain, bei Routing/State zu LangGraph wechseln |
| Riesigen State bauen | State klein, explizit und typisiert halten |
| Pydantic als internen Graph-State nutzen | `TypedDict` für State, Pydantic für Ein-/Ausgaben |
| Checkpointing als Langzeit-Memory verstehen | Session-State und Langzeit-Memory trennen |
| `thread_id` jedes Mal neu erzeugen | stabile ID pro Gespräch/Sitzung verwenden |
| Routing im Prompt verstecken | Routing als `add_conditional_edges` sichtbar machen |
| Tools direkt riskante Aktionen ausführen lassen | HITL-Gate vor irreversible Aktionen setzen |
| API-Keys oder Rohdaten im State speichern | Secrets extern halten, State datensparsam gestalten |

## Mini-Checkliste für neue Notebooks

- [ ] Reicht LangChain oder ist LangGraph wirklich nötig?
- [ ] State als `TypedDict` definiert?
- [ ] Nachrichtenliste mit `Annotated[list, add_messages]` modelliert?
- [ ] Routing als eigene Funktion sichtbar?
- [ ] `with_structured_output()` für Klassifikation/Extraktion genutzt?
- [ ] Checkpointer nur dort aktiviert, wo Session-State gebraucht wird?
- [ ] Stabile `thread_id` für mehrturnige Beispiele gesetzt?
- [ ] RAG-Retriever außerhalb des State gehalten?
- [ ] Riskante Aktion mit `interrupt()` abgesichert?
- [ ] Beispiel läuft deterministisch genug für Kurs und Colab?

## Weiterführende Kursseiten

| Thema | Seite |
|---|---|
| LangChain Einstieg | [Einsteiger LangChain](./einsteiger-langchain.html) |
| LangChain Standards | [LangChain Best Practices](./langchain-best-practices.html) |
| LangGraph Einstieg | [Einsteiger LangGraph](./einsteiger-langgraph.html) |
| LangGraph Standards | [LangGraph Best Practices](./langgraph-best-practices.html) |
| Memory-Grundlagen | [Memory-Systeme](../03-grundlagen/memory-systeme.html) |
| RAG-Grundlagen | [RAG-Konzepte](../05-prompting-rag/rag-konzepte.html) |

---

**Version:** 1.0<br>
**Stand:** Juni 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
