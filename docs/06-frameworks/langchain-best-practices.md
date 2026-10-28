---
layout: default
title: LangChain Best Practices
parent: LangChain
grand_parent: Frameworks
nav_order: 2
description: "Kernmuster für Modelle, strukturierte Ausgaben, Tools und Agenten im GenAI-Projekt"
has_toc: true
---

# LangChain Best Practices
{: .no_toc }

Dieses Dokument bündelt die zentralen LangChain-Muster für Notebooks und Module im GenAI-Projekt. LangChain stellt Modell-, Prompt-, Tool- und Agentenbausteine bereit. Für explizites Routing und langlebigen Workflow-State siehe [LangGraph Best Practices](./langgraph-best-practices.html); Traces und Evaluation behandelt [LangSmith Best Practices](./langsmith-best-practices.html).

---

## Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Modell initialisieren

Im GenAI-Projekt kommen Modell-IDs aus genai_lib.model_config. init_chat_model erstellt daraus das Chat-Modell.

~~~python
from langchain.chat_models import init_chat_model
from genai_lib.model_config import BASELINE, WORKER

llm = init_chat_model(BASELINE)
response = llm.invoke("Erkläre kurz, was ein Sprachmodell ist.")
~~~

Für unterschiedliche Aufgaben stehen Rollen wie ROUTER, WORKER, JUDGE und PLANNER bereit. Die Modellwahl und das Setzen provider-spezifischer Parameter richten sich nach der Aufgabe.

## Strukturierte Ausgaben

Ein Pydantic-Schema beschreibt die erwartete Antwort. with_structured_output bindet es an das Modell.

~~~python
from pydantic import BaseModel, Field


class AnswerResult(BaseModel):
    answer: str = Field(description="Antwort auf die Frage")
    confidence: float = Field(description="Einschätzung zwischen 0 und 1")


structured_llm = llm.with_structured_output(AnswerResult)
result = structured_llm.invoke("Was ist ein StateGraph?")
~~~

## Tools und Agenten

Tools erhalten klare Typen und eine kurze Beschreibung. create_agent verbindet Modell und Tools zu einem Agentenlauf.

~~~python
from langchain.agents import create_agent
from langchain_core.tools import tool


@tool
def get_order_status(order_id: str) -> str:
    """Liefert den Status einer Bestellung."""
    return f"Bestellung {order_id}: in Bearbeitung"


agent = create_agent(
    model=llm,
    tools=[get_order_status],
    system_prompt="Beantworte Fragen zu Bestellungen. Nutze das Tool für Statusabfragen.",
)
result = agent.invoke(
    {"messages": [{"role": "user", "content": "Prüfe Bestellung A-104."}]}
)
~~~

Bei komplexeren Eingaben kann args_schema robuste Tool-Spezifikationen festlegen.

LangChain eignet sich für einen Agenten mit Tools und einen überschaubaren Ablauf. Bei mehreren expliziten Zuständen, Wiederaufnahme oder Freigabeschritten lässt sich der Kontrollfluss mit LangGraph beschreiben.

## LCEL-Chains

LCEL setzt Prompt, Modell und Parser mit dem Pipe-Operator zusammen. Jedes Element bleibt einzeln erkennbar und kann separat konfiguriert werden.

~~~python
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_template("Fasse das Thema in einem Satz zusammen: {topic}")
chain = prompt | llm | StrOutputParser()

result = chain.invoke({"topic": "Retrieval-Augmented Generation"})
~~~

## Middleware und Nachrichten

Middleware ergänzt Agenten um Funktionen wie Zusammenfassungen oder Freigaben. Wähle nur Middleware, die zum Ablauf und zur Laufzeit des Agenten passt.

~~~python
from langchain.agents.middleware import SummarizationMiddleware

agent = create_agent(
    model=llm,
    tools=[get_order_status],
    middleware=[
        SummarizationMiddleware(
            model=llm,
            trigger=("messages", 20),
        ),
    ],
)
~~~

Für multimodale Eingaben werden Nachrichten mit standardisierten Content Blocks aufgebaut. Der konkrete Block hängt vom unterstützten Modell und der Aufgabe ab.

## Robuste Ausführung

Wiederholungen können vorübergehende Fehler abfangen. Für kritische Abläufe kann nach den Wiederholungen ein alternatives Modell eingesetzt werden.

~~~python
fallback_llm = init_chat_model(WORKER)
robust_llm = llm.with_retry(stop_after_attempt=3).with_fallbacks([fallback_llm])
result = robust_llm.invoke("Fasse die Ergebnisse knapp zusammen.")
~~~

Die Wiederholungszahl und Fallback-Auswahl richten sich nach den Fehlertypen und Qualitätsanforderungen des jeweiligen Aufrufs.

## Praxischeck

- Modelle über init_chat_model und die passenden Rollen aus genai_lib.model_config laden.
- Strukturierte Ausgaben mit einem klaren Pydantic-Schema festlegen.
- Tools typisieren und ihre Aufgabe im Docstring beschreiben.
- LCEL für lineare Prompt-Modell-Parser-Abläufe verwenden.
- Middleware gezielt nach Ablauf und Anforderungen auswählen.
- Zustandsbehaftete Verzweigungen und Freigaben mit LangGraph modellieren.
- Repräsentative Agentenläufe mit LangSmith beobachten und auswerten.

## Weiterführende Ressourcen

- [LangChain: Models](https://docs.langchain.com/oss/python/langchain/models)
- [LangChain: Agents](https://docs.langchain.com/oss/python/langchain/agents)
- [LangChain: Structured output](https://docs.langchain.com/oss/python/langchain/structured-output)
- [LangChain: Tools](https://docs.langchain.com/oss/python/langchain/tools)
- [LangChain: Middleware](https://docs.langchain.com/oss/python/langchain/middleware/overview)
- [Einsteiger: GenAI-Bibliothek](./einsteiger-genai-lib.html)
- [LangGraph Best Practices](./langgraph-best-practices.html)
- [LangSmith Best Practices](./langsmith-best-practices.html)

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [LangGraph Best Practices](langgraph-best-practices.html) | Wie werden Verzweigungen, State und Wiederaufnahme modelliert? |
| [LangSmith Best Practices](langsmith-best-practices.html) | Wie werden Läufe beobachtet und bewertet? |

---

**Version:** 2.0<br>
**Stand:** Oktober 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
