## Von LangChain-Session-Code zu LangGraph-StateGraph

Ziel dieser Gegenüberstellung: GenAI-Einsteiger sollen den Wechsel vom manuell verwalteten Chat-Verlauf mit `list`/`dict` zum LangGraph-Ansatz mit `StateGraph`, `MessagesState` und Checkpointer verstehen.

| Aspekt                     | LangChain / Python `list` + `dict`                                                                                                                                            | LangGraph / `StateGraph`                                                                                             | Vereinfachte Einsteiger-Erklärung                                                                                      |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Grundidee                  | Der Verlauf wird selbst verwaltet: `sessions = {}` speichert pro `thread_id` eine Liste von Nachrichten.                                                                      | Der Verlauf liegt im Graph-State. Der Checkpointer speichert pro `thread_id` den Zustand.                            | LangChain-Variante: "Ich führe ein Notizbuch selbst." LangGraph-Variante: "Der Graph führt das Notizbuch für mich."   |
| Session-Schlüssel          | `thread_id` ist der Key im Dictionary: `sessions[thread_id]`.                                                                                                                 | `thread_id` wird als Konfiguration übergeben: `config = {"configurable": {"thread_id": thread_id}}`.                 | Die ID bleibt gleich wichtig, wandert aber vom eigenen Dictionary in die Graph-Konfiguration.                          |
| Speicherort                | `sessions` liegt als Python-Dict im RAM. Nach Neustart ist der Verlauf weg.                                                                                                   | `InMemorySaver()` speichert ebenfalls im RAM. Später kann der Checkpointer ausgetauscht werden, z. B. gegen SQLite.  | In Abschnitt 3.1 sind beide Varianten flüchtig. LangGraph macht den Speicher aber austauschbar.                        |
| Eingabe speichern          | `sessions[thread_id].append(HumanMessage(content=user_input))`                                                                                                                | `app.invoke({"messages": [HumanMessage(content=user_input)]}, config=config)`                                        | In LangGraph wird die neue User-Nachricht als Input an den Graph gegeben. Das manuelle `append` fällt weg.             |
| Kontext bauen              | `context = [SystemMessage(content=system_prompt)] + sessions[thread_id]`                                                                                                      | Im Node: `messages = [SystemMessage(content=system_prompt)] + state["messages"]`                                     | Der gleiche Schritt bleibt erhalten, sitzt aber in einer Node-Funktion.                                                |
| LLM aufrufen               | `response = llm.invoke(context)`                                                                                                                                              | Im Node: `return {"messages": [llm.invoke(messages)]}`                                                               | Der LLM-Aufruf ist fast gleich. Neu ist nur: Die Antwort wird als State-Update zurückgegeben.                          |
| Antwort speichern          | `sessions[thread_id].append(response)`                                                                                                                                        | LangGraph hängt die zurückgegebene Nachricht an `state["messages"]` an.                                              | In LangGraph beschreibt der Node nur das Update. Das Speichern übernimmt der Graph.                                    |
| Chat-Funktion              | `ask(thread_id, user_input)` initialisiert ggf. `sessions[thread_id]`, hängt User-Nachricht an, ruft das LLM auf, speichert die Antwort und gibt `response.content` zurück.   | `ask(thread_id, user_input)` baut `config`, ruft `app.invoke(...)` auf und liest `result["messages"][-1].content`.   | Die äußere Funktion bleibt für Lernende fast gleich. Die Speicherlogik verschwindet in Graph + Checkpointer.           |
| Graph-Struktur             | Kein Graph. Die Reihenfolge steckt direkt im Funktionscode.                                                                                                                   | `StateGraph(MessagesState)` mit einem Node `"model"` und Edge `START -> "model"`.                                    | LangGraph macht den Ablauf explizit: Start, Node, gespeicherter State.                                                 |
| Minimaler mentaler Wechsel | "Ich kontrolliere Liste, Dict und Append selbst."                                                                                                                             | "Ich definiere, wie ein State verarbeitet wird; LangGraph verwaltet den Verlauf."                                    | Der wichtigste Schritt ist nicht mehr Code-Menge, sondern Verantwortlichkeit: weniger manuell, mehr deklarativ.        |
| Typische Stolperfalle      | Alles ist sichtbar, aber man muss konsequent an die richtige Session-Liste schreiben.                                                                                         | Man darf nicht parallel wieder eigene `sessions[...]` pflegen, sonst gibt es zwei Wahrheiten.                        | Entweder manuell speichern oder Graph-State nutzen. Nicht beides mischen.                                              |

## Code-Übersetzung in Kurzform

| Manuelles Muster | LangGraph-Muster | Bedeutung |
|---|---|---|
| `sessions = {}` | `app = create_memory_app(call_model, InMemorySaver())` | Speicher vorbereiten |
| `sessions[thread_id]` | `{"configurable": {"thread_id": thread_id}}` | Session auswählen |
| `sessions[thread_id].append(HumanMessage(...))` | `app.invoke({"messages": [HumanMessage(...)]}, config=config)` | User-Nachricht an die Session geben |
| `[SystemMessage(...)] + sessions[thread_id]` | `[SystemMessage(...)] + state["messages"]` | Kontext für das LLM bauen |
| `sessions[thread_id].append(response)` | `return {"messages": [response]}` | AI-Antwort in den Verlauf übernehmen |
| `return response.content` | `return result["messages"][-1].content` | Letzte Antwort ausgeben |

## Vereinfachter Zielcode

Die folgende Form reduziert den LangGraph-Code auf das didaktische Minimum. Sie zeigt nur drei Bausteine: Node, Graph, Chat-Funktion.

```python
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import END, MessagesState, START, StateGraph


def call_model(state: MessagesState):
    messages = [SystemMessage(content=system_prompt)] + state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}


builder = StateGraph(MessagesState)
builder.add_node("model", call_model)
builder.add_edge(START, "model")
builder.add_edge("model", END)

app = builder.compile(checkpointer=InMemorySaver())


def ask(thread_id: str, user_input: str) -> str:
    config = {"configurable": {"thread_id": thread_id}}
    result = app.invoke(
        {"messages": [HumanMessage(content=user_input)]},
        config=config,
    )
    return result["messages"][-1].content
```

## Didaktischer Merksatz

Bei `list` + `dict` verwaltet die Funktion den Chat-Verlauf selbst. Bei LangGraph verwaltet der Graph den Verlauf; die Funktion beschreibt nur noch, wie aus bisherigen Nachrichten eine neue Antwort entsteht.
