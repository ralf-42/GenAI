---
layout: default
title: LangGraph Best Practices
parent: LangGraph
grand_parent: Frameworks
nav_order: 2
description: "Kompakte Muster für zustandsbehaftete Workflows im GenAI-Projekt"
has_toc: true
---

# LangGraph Best Practices
{: .no_toc }

LangGraph beschreibt einen Ablauf über **State**, **Nodes** und **Edges**. Nutze einen Graphen, wenn ein Workflow verzweigt, länger läuft, pausiert oder wiederaufgenommen wird. Für den Einstieg siehe [LangGraph Einsteiger](./einsteiger-langgraph.html).

---

## Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Workflow als StateGraph

Der State hält gemeinsam genutzte Workflow-Daten. Nodes übernehmen einzelne Aufgaben und geben Änderungen zurück. Ein Router wählt den nächsten Schritt.

~~~python
from typing import Literal, TypedDict

from langgraph.graph import END, START, StateGraph


class ResearchState(TypedDict, total=False):
    query: str
    category: Literal["research", "general"]
    answer: str


def classify_node(state: ResearchState) -> dict:
    category = "research" if "quelle" in state["query"].lower() else "general"
    return {"category": category}


def research_node(state: ResearchState) -> dict:
    return {"answer": f"Rechercheauftrag: {state['query']}"}


def general_node(state: ResearchState) -> dict:
    return {"answer": f"Antwortauftrag: {state['query']}"}


def research_router(state: ResearchState) -> Literal["research", "general"]:
    return state["category"]


research_builder = StateGraph(ResearchState)
research_builder.add_node("classify_node", classify_node)
research_builder.add_node("research_node", research_node)
research_builder.add_node("general_node", general_node)
research_builder.add_edge(START, "classify_node")
research_builder.add_conditional_edges(
    "classify_node",
    research_router,
    {
        "research": "research_node",
        "general": "general_node",
    },
)
research_builder.add_edge("research_node", END)
research_builder.add_edge("general_node", END)

research_agent = research_builder.compile()
result = research_agent.invoke({"query": "Finde eine geeignete Quelle"})
~~~

Im GenAI-Projekt gelten diese Namen:

- State-Klassen erhalten einen fachlichen Namen mit State, etwa ResearchState.
- Node-Funktionen enden auf _node.
- Router heißen router oder fachlich eindeutig, etwa research_router.
- Builder heißen agent_builder oder fachlich eindeutig, etwa research_builder.
- Der kompilierte Workflow heißt agent oder fachlich eindeutig, etwa research_agent.

## State und Nachrichten

Halte den State klein und fachlich verständlich. TypedDict eignet sich für den internen Graph-State; Pydantic-Modelle eignen sich für validierte Eingaben und Ergebnisse an Systemgrenzen.

Für Nachrichtenlisten fügt add_messages neue Nachrichten an und führt Aktualisierungen anhand der Nachrichten-ID zusammen.

~~~python
from typing import Annotated, TypedDict

from langchain_core.messages import AnyMessage
from langgraph.graph.message import add_messages


class ConversationState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]
~~~

## Checkpointing und Wiederaufnahme

Ein Checkpointer speichert Zwischenstände pro Thread. Verwende eine stabile thread_id, wenn eine Unterhaltung fortgesetzt werden soll.

~~~python
from langgraph.checkpoint.memory import InMemorySaver

checkpointer = InMemorySaver()
research_agent = research_builder.compile(checkpointer=checkpointer)

config = {"configurable": {"thread_id": "research-001"}}
result = research_agent.invoke(
    {"query": "Finde eine geeignete Quelle"},
    config=config,
)
~~~

InMemorySaver eignet sich für eine lokale Demo. Für dauerhafte Sitzungen wird ein persistenter Checkpointer eingesetzt. Ein Store ist für Informationen geeignet, die über mehrere Threads hinweg verfügbar sein sollen.

## Freigaben mit Human-in-the-Loop

interrupt() pausiert den Lauf und liefert die Freigabeanfrage an die Anwendung. Ein Checkpointer und eine thread_id ermöglichen das Fortsetzen.

~~~python
from typing import TypedDict

from langgraph.graph import END, START, StateGraph
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.types import Command, interrupt


class ReviewState(TypedDict, total=False):
    draft: str
    approved: bool


def approval_node(state: ReviewState) -> dict:
    decision = interrupt({"draft": state["draft"], "action": "publish"})
    return {"approved": decision["approved"]}


approval_builder = StateGraph(ReviewState)
approval_builder.add_node("approval_node", approval_node)
approval_builder.add_edge(START, "approval_node")
approval_builder.add_edge("approval_node", END)

approval_agent = approval_builder.compile(checkpointer=InMemorySaver())
approval_config = {"configurable": {"thread_id": "review-001"}}

approval_agent.invoke({"draft": "Entwurf zur Prüfung"}, config=approval_config)
result = approval_agent.invoke(
    Command(resume={"approved": True}),
    config=approval_config,
)
~~~

Die Interrupt-Nutzlast sollte JSON-serialisierbar und für die prüfende Person verständlich sein.

## Teilgraphen und Streaming

Ein kompilierter Teilgraph kann als Node in einen übergeordneten Ablauf eingesetzt werden. So bleibt ein fachlich eigenständiger Prozess modular.

~~~python
research_subgraph = research_builder.compile()
team_builder.add_node("research_subgraph", research_subgraph)
~~~

Mit Streaming lassen sich State-Updates während eines Laufs beobachten:

~~~python
for update in research_agent.stream(
    {"query": "Finde eine geeignete Quelle"},
    stream_mode="updates",
):
    print(update)
~~~

## Praxischeck

- State enthält nur Daten, die im Workflow gemeinsam benötigt werden.
- Nodes haben klar erkennbare Aufgaben und liefern State-Updates.
- Router liefern registrierte Node-IDs oder END.
- Für wiederaufnehmbare Threads werden Checkpointer und stabile thread_id verwendet.
- Freigaben verwenden interrupt() und eine passende Resume-Logik.
- Fachlich eigenständige Teilabläufe können als Teilgraphen eingebunden werden.

## Weiterführende Ressourcen

- [LangGraph: Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api)
- [LangGraph: Persistence](https://docs.langchain.com/oss/python/langgraph/persistence)
- [LangGraph: Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)
- [LangGraph: Multi-agent](https://docs.langchain.com/oss/python/langchain/multi-agent)
- [LangSmith Best Practices](./langsmith-best-practices.html)
- [LangChain Best Practices](./langchain-best-practices.html)

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [LangChain Best Practices](langchain-best-practices.html) | Wie werden Modelle, Tools und Agenten aufgebaut? |
| [LangSmith Best Practices](langsmith-best-practices.html) | Wie werden Traces und Evaluationen eingesetzt? |

---

**Version:** 2.0<br>
**Stand:** Oktober 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
