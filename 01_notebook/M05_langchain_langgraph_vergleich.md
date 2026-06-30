## Von `list`/`dict` zu LangGraph

Ziel: GenAI-Einsteiger sollen sehen, welcher Teil des manuellen Session-Codes in LangGraph durch `StateGraph`, `MessagesState` und Checkpointer ersetzt wird.

## Kurzvergleich

| Frage | Python `list` + `dict` | LangGraph |
|---|---|---|
| Wo liegt der Verlauf? | In `sessions[thread_id]` | Im Graph-State, getrennt nach `thread_id` |
| Wer speichert neue Nachrichten? | Die Funktion ruft selbst `append(...)` auf | Der Graph übernimmt das über `MessagesState` |
| Wo wird die Session gewählt? | Direkt im Dictionary-Key | In `config = {"configurable": {"thread_id": ...}}` |
| Wo entsteht der LLM-Kontext? | In `ask(...)` | Im Node `call_model(...)` |
| Was bleibt gleich? | `SystemMessage + bisherige Nachrichten -> llm.invoke(...)` | Derselbe LLM-Aufruf, nur innerhalb eines Nodes |
| Was wird einfacher? | Wenig Framework, aber viel manuelle Zustandslogik | Weniger manuelle Speicherlogik, Checkpointer austauschbar |

## Code-Zuordnung

| Manuelles Muster | LangGraph-Muster | Bedeutung |
|---|---|---|
| `sessions = {}` | `builder.compile(checkpointer=InMemorySaver())` | Speicher vorbereiten |
| `sessions[thread_id]` | `configurable.thread_id` | Session auswählen |
| `append(HumanMessage(...))` | `app.invoke({"messages": [HumanMessage(...)]}, config=config)` | User-Nachricht übergeben |
| `[SystemMessage(...)] + sessions[thread_id]` | `[SystemMessage(...)] + state["messages"]` | Kontext bauen |
| `append(response)` | `return {"messages": [response]}` | AI-Antwort als State-Update zurückgeben |
| `response.content` | `result["messages"][-1].content` | Letzte Antwort ausgeben |

## Code-Gegenüberstellung

Die Notebook-Abschnitte zeigen dasselbe Basismodell:

- `M05_Chat_Memory_Patterns_list_dict.ipynb`, Abschnitt 3.1: manuelles Dictionary-Pattern
- `M05_Chat_Memory_Patterns_stategraph.ipynb`, Abschnitt 2.1: `StateGraph` + `InMemorySaver`

Ausgaben wie `mprint(...)` sind weggelassen, damit der Kern sichtbar bleibt.

### Variante 1: Manuelle Session-Verwaltung

```python
sessions = {}  # thread_id -> list[BaseMessage]


def ask(thread_id: str, user_input: str) -> str:
    if thread_id not in sessions:
        sessions[thread_id] = []

    sessions[thread_id].append(HumanMessage(content=user_input))

    context = [SystemMessage(content=system_prompt)] + sessions[thread_id]
    response = llm.invoke(context)

    sessions[thread_id].append(response)
    return response.content
```

**Lesart:** Die Funktion macht alles selbst: Session finden, User-Nachricht speichern, Kontext bauen, LLM aufrufen, AI-Antwort speichern.

### Variante 2: LangGraph-StateGraph

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

**Lesart:** `ask(...)` übergibt nur noch neue Nachrichten an den Graphen. Der Node beschreibt den LLM-Schritt. `MessagesState` und Checkpointer übernehmen das Fortschreiben des Verlaufs.

## Merksatz

Bei `list` + `dict` verwaltet die Chat-Funktion den Verlauf selbst. Bei LangGraph beschreibt der Node nur noch, wie aus bisherigen Nachrichten eine neue Antwort entsteht; der Graph verwaltet den Verlauf.

## Erweiterung

- **Persistenz:** `InMemorySaver()` kann später durch einen persistenten Checkpointer ersetzt werden, z. B. SQLite.
- **Streaming:** Für flüssige UI-Ausgaben kann statt `app.invoke(...)` später `app.stream(...)` verwendet werden.
