---
layout: default
title: LangGraph Best Practices
parent: Best Practices
grand_parent: Frameworks
nav_order: 2
description: "Best Practices für zustandsbehaftete GenAI-Workflows mit LangGraph"
has_toc: true
---

# LangGraph Best Practices
{: .no_toc }

> **Vertiefung für Teilnehmende, die nach dem Einsteiger-Guide robuste LangGraph-Muster für echte Workflows nachschlagen möchten.**

Diese Seite ist keine erste Einführung in LangGraph. Sie richtet sich an Teilnehmende, die bereits verstanden haben, warum ein Graph nötig ist und nun stabilere Muster für State, Routing, Checkpointing oder Multi-Agent-Flüsse suchen. Für den ersten Zugang empfiehlt sich zuerst [LangGraph Einsteiger](../einsteiger/einsteiger-langgraph.html).

Der Ton dieser Seite ist bewusst normativer als in den Konzept- und Einsteigerseiten. Im Kurs bedeutet das nicht, dass jede Funktion sofort verwendet werden muss. Wichtiger ist zu verstehen, wann ein Pattern wirklich nötig ist und wann es für den aktuellen Schritt noch überdimensioniert wäre.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 🎯 Wann LangGraph statt einfachem `create_agent()`?

Für Einsteiger ist diese Tabelle wichtiger als viele Detailabschnitte weiter unten. Erst wenn der Anwendungsfall wirklich mehrstufig, verzweigt oder langlebig wird, lohnt sich die Vertiefung in die restlichen Patterns.

| Use Case | LangChain `create_agent()` | LangGraph |
|----------|---------------------------|-----------|
| **Einfacher Agent** mit Tools | ✅ Perfekt | ❌ Overkill |
| **Multi-Step Workflows** mit Bedingungen | ⚠️ Begrenzt | ✅ Ideal |
| **Multi-Agent-Systeme** (Supervisor, Hierarchie) | ❌ Nicht möglich | ✅ Essential |
| **Langlebige Sessions** mit Checkpointing | ❌ Nicht möglich | ✅ Essential |
| **Human-in-the-Loop** (erweitert) | ⚠️ Basic (via Middleware) | ✅ Advanced |
| **Conditional Routing** | ❌ Nicht möglich | ✅ Essential |
| **State Persistence** über Tage/Wochen | ❌ Nicht möglich | ✅ Essential |

**Faustregel:**
- ✅ **LangChain** für einfache, lineare Agent-Tasks
- ✅ **LangGraph** für komplexe, verzweigte Workflows und Multi-Agent-Systeme

---

## Überblick der wichtigsten LangGraph-Standards

| # | Feature | Priorität | Hauptvorteil | Use Case |
|---|---------|-----------|--------------|----------|
| 1 | StateGraph mit TypedDict | Kernstandard | Type-safe State Management | Alle Workflows |
| 2 | Nodes & Edges | Kernstandard | Workflow-Definition | Alle Workflows |
| 3 | Conditional Routing | Kernstandard | Dynamische Entscheidungen | Verzweigte Logik |
| 4 | Checkpointing & Memory | Aufbauend | Persistenz & Recovery | Langlebige Sessions |
| 5 | Human-in-the-Loop (erweitert) | Aufbauend | Interrupt & Resume | Kritische Entscheidungen |
| 6 | Subgraphs & Multi-Agent | Vertiefung | Modulare Systeme | Komplexe Workflows |
| 7 | Stream Modes | Vertiefung | Debugging & Monitoring | Beobachtbare Apps |

---

## 1️⃣ StateGraph mit TypedDict - Type-Safe State Management

### ❌ ALT (fehleranfällig)
```python
# Untyped State - Runtime-Fehler möglich
graph = StateGraph(dict)
state = {"messages": [], "count": 0}  # Keine Type-Checks!
```

### ✅ NEU (PFLICHT)
```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """State-Definition mit TypedDict für Type-Safety."""
    messages: Annotated[list, add_messages]  # Reducer für Message-Akkumulation
    user_id: str
    session_id: str
    current_step: int

# StateGraph mit typisiertem State
graph = StateGraph(AgentState)
```

### 🎯 Vorteile
- ✅ **Type-Safety**: Fehler zur Entwicklungszeit, nicht zur Laufzeit
- ✅ **IDE-Unterstützung**: Autocomplete und IntelliSense
- ✅ **Reducer-Support**: `add_messages` für Message-Akkumulation
- ✅ **Minimal Overhead**: TypedDict ist stdlib, keine Runtime-Kosten

### 📦 Best Practices: TypedDict vs. Pydantic

| Kriterium | TypedDict | Pydantic BaseModel |
|-----------|-----------|-------------------|
| **Performance** | ✅ Schnell (kein Overhead) | ⚠️ Langsamer (Validation) |
| **Use Case** | Interne State Machines | API Boundaries, User Input |
| **Validation** | ❌ Keine Runtime-Validation | ✅ Strikte Validation |
| **Empfehlung** | **LangGraph State (intern)** | **Input/Output-Validierung** |

```python
# ✅ Best Practice: TypedDict für State
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# ✅ Pydantic für User Input
from pydantic import BaseModel
class UserInput(BaseModel):
    query: str
    temperature: float = 0.7
```

---

## 2️⃣ Nodes & Edges - Workflow-Definition

### 🔄 Workflow-Bausteine

#### **Nodes** = Funktionen, die State transformieren
```python
def agent_node(state: AgentState) -> AgentState:
    """Ein Node ist eine Funktion, die State empfängt und transformiert."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> AgentState:
    """Tool-Ausführung als Node."""
    result = execute_tool(state["messages"][-1])
    return {"messages": [result]}
```

#### **Edges** = Verbindungen zwischen Nodes
```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)

# Nodes hinzufügen
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# Edges definieren
graph.add_edge(START, "agent")  # Start → agent
graph.add_edge("tools", "agent")  # tools → agent (Loop)
graph.add_edge("agent", END)  # agent → END
```

### 📦 Graph-Visualisierung (PFLICHT nach compile())

Nach `graph_builder.compile()` den Graphen immer grafisch darstellen – als sofortige Sichtprüfung der Struktur (Nodes, Edges, Routing).

```python
from IPython.display import Image, display

# Direkt nach graph.compile():
graph = graph_builder.compile()

try:
    display(Image(graph.get_graph().draw_mermaid_png()))
except Exception as e:
    print(f"⚠️ Graph-Visualisierung nicht verfügbar: {e}")
```

**Warum `create_agent()`0:** `create_agent()`1 benötigt `create_agent()`2 oder einen Playwright-Browser.
In Colab und Jupyter meist verfügbar – `create_agent()`3 verhindert Abbruch falls nicht installiert.

**Was die Visualisierung zeigt:**
- Alle Nodes mit Namen
- Edges und deren Richtung
- Conditional Edges als Verzweigungen
- START- und END-Knoten

### 🎯 Vorteile
- ✅ **Klarheit**: Workflow ist visuell verständlich
- ✅ **Testbarkeit**: Nodes sind isolierte Funktionen
- ✅ **Wiederverwendbarkeit**: Nodes können geteilt werden
- ✅ **Debugging**: Einzelne Nodes testbar

### 📦 Advanced: Node Caching (verfügbar ab v1.0)

**Warum:** Eliminiere redundante Berechnungen und spare API-Kosten während der Entwicklung.

`create_agent()`4

**Use Cases:**
- ✅ Teure API-Calls (Web Search, Database Queries)
- ✅ Development & Testing (schnellere Iteration)
- ✅ Wiederholbare Berechnungen mit gleichen Inputs

**Vorteile:**
- 🚀 Entwicklungsgeschwindigkeit erhöhen
- 💰 API-Kosten reduzieren
- ⚡ Workflow-Iterationen beschleunigen

### 📦 Advanced: Deferred Nodes (verfügbar ab v1.0)

**Warum:** Verzögere Node-Ausführung bis alle Upstream-Pfade abgeschlossen sind (Map-Reduce, Consensus).

`create_agent()`5

**Use Cases:**
- ✅ **Map-Reduce Patterns**: Parallele Verarbeitung + Aggregation
- ✅ **Consensus Mechanisms**: Mehrere Agents einigen sich auf Ergebnis
- ✅ **Multi-Agent Collaboration**: Warte auf alle Agent-Antworten vor Entscheidung

**Vorteile:**
- 🔄 Saubere Map-Reduce-Semantik
- 🤝 Perfekt für Multi-Agent-Consensus
- ⚡ Maximale Parallelisierung + saubere Aggregation

---

## 3️⃣ Conditional Routing - Dynamische Entscheidungen

### ❌ ALT (statische Edges)
`create_agent()`6

### ✅ NEU (PFLICHT für verzweigte Logik)
`create_agent()`7

### 🎯 Vorteile
- ✅ **Dynamische Workflows**: Pfad abhängig von State
- ✅ **Komplexe Logik**: Beliebige Bedingungen möglich
- ✅ **Fehlerbehandlung**: Routing zu Error-Nodes
- ✅ **Multi-Agent**: Routing zu verschiedenen Agents

### 📦 Advanced: Routing zu mehreren Nodes
`create_agent()`8

---

## 4️⃣ Checkpointing & Memory - Persistenz & Recovery

### ❌ ALT (State verloren bei Neustart)
`create_agent()`9

### ✅ NEU (PFLICHT für Production)
```python
# Untyped State - Runtime-Fehler möglich
graph = StateGraph(dict)
state = {"messages": [], "count": 0}  # Keine Type-Checks!
```0

### 🎯 Vorteile
- ✅ **Crash-Recovery**: Kein Datenverlust bei Absturz
- ✅ **Langlebige Sessions**: Workflows über Tage/Wochen
- ✅ **Debugging**: State-Historie verfügbar
- ✅ **Rollback**: Zurück zu früheren Checkpoints

### 📦 Checkpoint-Backends

| Backend | Use Case | Persistenz | Version |
|---------|----------|-----------|---------|
| ```python
# Untyped State - Runtime-Fehler möglich
graph = StateGraph(dict)
state = {"messages": [], "count": 0}  # Keine Type-Checks!
```1 | Development, Testing | ❌ Nur RAM | - |
| ```python
# Untyped State - Runtime-Fehler möglich
graph = StateGraph(dict)
state = {"messages": [], "count": 0}  # Keine Type-Checks!
```2 | Production (single instance) | ✅ Disk | v3.0.1+ (Security Hardening) |
| ```python
# Untyped State - Runtime-Fehler möglich
graph = StateGraph(dict)
state = {"messages": [], "count": 0}  # Keine Type-Checks!
```3 | Production (distributed) | ✅ Database | v3.0.2+ (Security Hardening) |
| Custom | Spezielle Anforderungen | ✅ Anpassbar | - |

**⚠️ Security Update (v1.0.5):**
- **SQLite Checkpoint v3.0.1**: Security Hardening für Production-Deployments
- **PostgreSQL Checkpoint v3.0.2**: Security Hardening + Custom Encryption at Rest
- **Empfehlung**: Update auf v3.x für sichere Production-Umgebungen

```python
# Untyped State - Runtime-Fehler möglich
graph = StateGraph(dict)
state = {"messages": [], "count": 0}  # Keine Type-Checks!
```4

---

## 5️⃣ Human-in-the-Loop (erweitert) - Interrupt & Resume

### ❌ ALT (LangChain Middleware - basic)
```python
# Untyped State - Runtime-Fehler möglich
graph = StateGraph(dict)
state = {"messages": [], "count": 0}  # Keine Type-Checks!
```5

### ✅ NEU (PFLICHT für erweiterte Kontrolle)
```python
# Untyped State - Runtime-Fehler möglich
graph = StateGraph(dict)
state = {"messages": [], "count": 0}  # Keine Type-Checks!
```6

### 🎯 Vorteile
- ✅ **Volle Kontrolle**: Workflow pausiert exakt an definiertem Punkt
- ✅ **Asynchron**: User kann Stunden/Tage später antworten
- ✅ **Multiple Interrupts**: Mehrere Pausen im Workflow
- ✅ **State-Preservation**: Kompletter State bleibt erhalten

### 📦 Interrupt-Patterns

#### Pattern 1: Approval Gate
```python
# Untyped State - Runtime-Fehler möglich
graph = StateGraph(dict)
state = {"messages": [], "count": 0}  # Keine Type-Checks!
```7

#### Pattern 2: Data Collection
```python
# Untyped State - Runtime-Fehler möglich
graph = StateGraph(dict)
state = {"messages": [], "count": 0}  # Keine Type-Checks!
```8

#### Pattern 3: Error Handling
```python
# Untyped State - Runtime-Fehler möglich
graph = StateGraph(dict)
state = {"messages": [], "count": 0}  # Keine Type-Checks!
```9

### 🆕 NEU in v1.1.7: Time-Travel / Replay-Fix bei Interrupt-Return

**Fix ab v1.1.7:**  spult automatisch zum letzten Interrupt-Checkpoint zurück.



**Typischer Fehler:**  weglassen. Ohne Checkpointer kein Replay-Punkt.

---

### 📦 Advanced: Multiple Interrupt Resume (verfügbar ab v1.0)

**Warum:** Parallele Tool Calls oder mehrere Interrupts gleichzeitig fortsetzen.

**Problem (vor v1.0):** Interrupts mussten sequenziell bearbeitet werden.

**Lösung (ab v1.0):** Alle Interrupts können gleichzeitig mit einem einzigen ```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """State-Definition mit TypedDict für Type-Safety."""
    messages: Annotated[list, add_messages]  # Reducer für Message-Akkumulation
    user_id: str
    session_id: str
    current_step: int

# StateGraph mit typisiertem State
graph = StateGraph(AgentState)
```0 fortgesetzt werden.

```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """State-Definition mit TypedDict für Type-Safety."""
    messages: Annotated[list, add_messages]  # Reducer für Message-Akkumulation
    user_id: str
    session_id: str
    current_step: int

# StateGraph mit typisiertem State
graph = StateGraph(AgentState)
```1

**Use Cases:**
- ✅ **Parallel Tool Calls**: Agent will mehrere Tools gleichzeitig ausführen
- ✅ **Batch Approvals**: User kann mehrere Aktionen auf einmal genehmigen
- ✅ **Out-of-Order Resume**: Interrupts können in beliebiger Reihenfolge beantwortet werden

**Vorteile:**
- 🚀 **Effizienz**: Keine sequenzielle Bearbeitung mehr nötig
- 🤝 **User Experience**: User kann alle Entscheidungen auf einmal treffen
- ⚡ **Performance**: Parallele Tool Calls bleiben parallel

**Best Practice:**
```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """State-Definition mit TypedDict für Type-Safety."""
    messages: Annotated[list, add_messages]  # Reducer für Message-Akkumulation
    user_id: str
    session_id: str
    current_step: int

# StateGraph mit typisiertem State
graph = StateGraph(AgentState)
```2

### ⚠️ Best Practices (2025)

1. **Verwende ```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """State-Definition mit TypedDict für Type-Safety."""
    messages: Annotated[list, add_messages]  # Reducer für Message-Akkumulation
    user_id: str
    session_id: str
    current_step: int

# StateGraph mit typisiertem State
graph = StateGraph(AgentState)
```3 (Standard seit v1.0)**
   ```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """State-Definition mit TypedDict für Type-Safety."""
    messages: Annotated[list, add_messages]  # Reducer für Message-Akkumulation
    user_id: str
    session_id: str
    current_step: int

# StateGraph mit typisiertem State
graph = StateGraph(AgentState)
```4

2. **Interrupt-Reihenfolge ist wichtig**
   ```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """State-Definition mit TypedDict für Type-Safety."""
    messages: Annotated[list, add_messages]  # Reducer für Message-Akkumulation
    user_id: str
    session_id: str
    current_step: int

# StateGraph mit typisiertem State
graph = StateGraph(AgentState)
```5

3. **Resume mit Command-Object**
   ```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """State-Definition mit TypedDict für Type-Safety."""
    messages: Annotated[list, add_messages]  # Reducer für Message-Akkumulation
    user_id: str
    session_id: str
    current_step: int

# StateGraph mit typisiertem State
graph = StateGraph(AgentState)
```6

---

## 6️⃣ Subgraphs & Multi-Agent - Modulare Systeme

### 🏗️ Multi-Agent-Patterns

#### Pattern 1: Supervisor Pattern
```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """State-Definition mit TypedDict für Type-Safety."""
    messages: Annotated[list, add_messages]  # Reducer für Message-Akkumulation
    user_id: str
    session_id: str
    current_step: int

# StateGraph mit typisiertem State
graph = StateGraph(AgentState)
```7

#### Pattern 2: Hierarchical Teams mit Subgraphs
```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """State-Definition mit TypedDict für Type-Safety."""
    messages: Annotated[list, add_messages]  # Reducer für Message-Akkumulation
    user_id: str
    session_id: str
    current_step: int

# StateGraph mit typisiertem State
graph = StateGraph(AgentState)
```8

### 🎯 Vorteile
- ✅ **Modularität**: Teams als wiederverwendbare Komponenten
- ✅ **Skalierbarkeit**: Einfache Erweiterung durch neue Teams
- ✅ **Klarheit**: Klare Verantwortlichkeiten
- ✅ **Testing**: Subgraphs isoliert testbar

### 📦 Wann welches Pattern?

| Pattern | Use Case | Komplexität | Vorteile |
|---------|----------|-------------|----------|
| **Supervisor** | 3-5 Agents, flache Struktur | ⭐ Niedrig | Einfach, schnell |
| **Hierarchical** | >5 Agents, mehrere Ebenen | ⭐⭐ Mittel | Skalierbar, strukturiert |
| **Collaborative** | Agents arbeiten parallel | ⭐⭐⭐ Hoch | Effizient, komplex |

### 🆕 ToolRuntime – Dependency Injection in Tools *(langgraph-prebuilt 1.0.8, Feb 2026)*

**ToolRuntime** ermöglicht Tools den Zugriff auf den vollständigen LangGraph-Laufzeit-Kontext via Dependency Injection – ähnlich wie ```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    """State-Definition mit TypedDict für Type-Safety."""
    messages: Annotated[list, add_messages]  # Reducer für Message-Akkumulation
    user_id: str
    session_id: str
    current_step: int

# StateGraph mit typisiertem State
graph = StateGraph(AgentState)
```9 und `add_messages`0, aber mit Zugang zum gesamten Runtime-Bundle.

`add_messages`1

**ToolRuntime-Felder:**

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `add_messages`2 | `add_messages`3 | Aktueller Graph-State |
| `add_messages`4 | `add_messages`5 | LangGraph Runtime-Context |
| `add_messages`6 | `add_messages`7 | Runnable-Konfiguration |
| `add_messages`8 | `add_messages`9 | Für direktes Streaming aus dem Tool |
| ```python
# ✅ Best Practice: TypedDict für State
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# ✅ Pydantic für User Input
from pydantic import BaseModel
class UserInput(BaseModel):
    query: str
    temperature: float = 0.7
```0 | ```python
# ✅ Best Practice: TypedDict für State
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# ✅ Pydantic für User Input
from pydantic import BaseModel
class UserInput(BaseModel):
    query: str
    temperature: float = 0.7
```1 | ID des aktuellen Tool-Calls |
| ```python
# ✅ Best Practice: TypedDict für State
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# ✅ Pydantic für User Input
from pydantic import BaseModel
class UserInput(BaseModel):
    query: str
    temperature: float = 0.7
```2 | ```python
# ✅ Best Practice: TypedDict für State
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# ✅ Pydantic für User Input
from pydantic import BaseModel
class UserInput(BaseModel):
    query: str
    temperature: float = 0.7
```3 | Persistenter Store (falls konfiguriert) |

**Wann ToolRuntime verwenden:**
- ✅ Tool braucht Zugriff auf State-Felder (ohne ```python
# ✅ Best Practice: TypedDict für State
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# ✅ Pydantic für User Input
from pydantic import BaseModel
class UserInput(BaseModel):
    query: str
    temperature: float = 0.7
```4-Annotation)
- ✅ Dynamisch registrierte Tools (zur Laufzeit hinzugefügt)
- ✅ Tool soll direkt in den Stream schreiben (```python
# ✅ Best Practice: TypedDict für State
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# ✅ Pydantic für User Input
from pydantic import BaseModel
class UserInput(BaseModel):
    query: str
    temperature: float = 0.7
```5)
- ❌ Einfache Tools ohne Kontext-Bedarf → kein Overhead nötig

---

## 7️⃣ Stream Modes - Debugging & Monitoring

### ❌ ALT (keine Einsicht in Workflow)
```python
# ✅ Best Practice: TypedDict für State
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# ✅ Pydantic für User Input
from pydantic import BaseModel
class UserInput(BaseModel):
    query: str
    temperature: float = 0.7
```6

### ✅ NEU (PFLICHT für Production)
```python
# ✅ Best Practice: TypedDict für State
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# ✅ Pydantic für User Input
from pydantic import BaseModel
class UserInput(BaseModel):
    query: str
    temperature: float = 0.7
```7

### 🎯 Vorteile
- ✅ **Real-time Monitoring**: Workflow-Progress live verfolgen
- ✅ **Debugging**: Fehler sofort identifizieren
- ✅ **User Feedback**: Progress-Bar, Status-Updates
- ✅ **Production Monitoring**: Logging, Metrics

### 🆕 NEU in v1.1.0: v2-Streaming-Format (StreamPart-Dicts)

Ab v1.1.0 liefert  strukturierte -Dicts.  gibt  mit  und  zurück.



**Grenze:** Altes -Format erzeugt ab v1.1 Deprecation-Warnings.

---

### 📦 Stream Modes Übersicht

| Mode | Output | Use Case | Performance |
|------|--------|----------|-------------|
| **values** | Full State | Simple Workflows, Debugging | ⚠️ Viel Daten |
| **updates** | State Deltas | Production, Monitoring | ✅ Effizient |
| **debug** | Execution Traces | Development, Fehlersuche | ⚠️ Verbose |
| **messages** | LLM Tokens | Streaming Chat UIs | ✅ Real-time |
| **custom** | User-defined | Spezielle Anforderungen | ✅ Flexibel |

### 📦 Practical Example: Progress Bar
```python
# ✅ Best Practice: TypedDict für State
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# ✅ Pydantic für User Input
from pydantic import BaseModel
class UserInput(BaseModel):
    query: str
    temperature: float = 0.7
```8

### 📦 Advanced: Pre/Post Model Hooks (verfügbar ab v1.0)

**Warum:** Custom Logic vor/nach Model Calls für Context-Management, Guardrails und Human-in-Loop Gates.

**Use Cases:**
- **Pre-Hook:** Context-Size-Management (Token-Bloat verhindern), Custom Prompt Injection
- **Post-Hook:** Guardrails, Content Moderation, Compliance-Checks, Human Review Gates

```python
# ✅ Best Practice: TypedDict für State
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# ✅ Pydantic für User Input
from pydantic import BaseModel
class UserInput(BaseModel):
    query: str
    temperature: float = 0.7
```9

**Vorteile:**
- 🛡️ **Safety-Layer**: Automatische Guardrails vor Production-Deployment
- 💰 **Token-Management**: Verhindere teure Token-Overflows
- 🔍 **Compliance**: DSGVO-konforme PII-Redaktion
- 🤝 **Human-in-Loop**: Pause bei kritischen Entscheidungen

**Best Practices:**

1. **Pre-Hook für Context-Management**
   ```python
def agent_node(state: AgentState) -> AgentState:
    """Ein Node ist eine Funktion, die State empfängt und transformiert."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> AgentState:
    """Tool-Ausführung als Node."""
    result = execute_tool(state["messages"][-1])
    return {"messages": [result]}
```0

2. **Post-Hook für Guardrails**
   ```python
def agent_node(state: AgentState) -> AgentState:
    """Ein Node ist eine Funktion, die State empfängt und transformiert."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> AgentState:
    """Tool-Ausführung als Node."""
    result = execute_tool(state["messages"][-1])
    return {"messages": [result]}
```1

3. **Kombination mit Human-in-Loop**
   ```python
def agent_node(state: AgentState) -> AgentState:
    """Ein Node ist eine Funktion, die State empfängt und transformiert."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> AgentState:
    """Tool-Ausführung als Node."""
    result = execute_tool(state["messages"][-1])
    return {"messages": [result]}
```2

---

## 🚀 Complete Example: Multi-Agent Research System

```python
def agent_node(state: AgentState) -> AgentState:
    """Ein Node ist eine Funktion, die State empfängt und transformiert."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> AgentState:
    """Tool-Ausführung als Node."""
    result = execute_tool(state["messages"][-1])
    return {"messages": [result]}
```3

---

## 📚 Import-Cheatsheet

```python
def agent_node(state: AgentState) -> AgentState:
    """Ein Node ist eine Funktion, die State empfängt und transformiert."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> AgentState:
    """Tool-Ausführung als Node."""
    result = execute_tool(state["messages"][-1])
    return {"messages": [result]}
```4

---

## ⚠️ Migration von LangChain zu LangGraph

### Wann migrieren?

- ✅ Multi-Step Workflows mit Verzweigungen
- ✅ Multi-Agent-Systeme (>2 Agents)
- ✅ Langlebige Sessions (>1 Stunde)
- ✅ Human-in-the-Loop mit erweiterten Features
- ✅ State Persistence erforderlich

### Migration-Checkliste

- [ ] State als TypedDict definieren
- [ ] Agent-Logik in Nodes umwandeln
- [ ] Conditional Routing für Verzweigungen
- [ ] Checkpointer hinzufügen (SQLite/Postgres)
- [ ] Interrupt-Punkte für Human-in-the-Loop
- [ ] Stream Modes für Monitoring
- [ ] Tests für einzelne Nodes schreiben
- [ ] **Graph nach ```python
def agent_node(state: AgentState) -> AgentState:
    """Ein Node ist eine Funktion, die State empfängt und transformiert."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> AgentState:
    """Tool-Ausführung als Node."""
    result = execute_tool(state["messages"][-1])
    return {"messages": [result]}
```5 visualisieren** (```python
def agent_node(state: AgentState) -> AgentState:
    """Ein Node ist eine Funktion, die State empfängt und transformiert."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> AgentState:
    """Tool-Ausführung als Node."""
    result = execute_tool(state["messages"][-1])
    return {"messages": [result]}
```6)
- [ ] ```python
def agent_node(state: AgentState) -> AgentState:
    """Ein Node ist eine Funktion, die State empfängt und transformiert."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> AgentState:
    """Tool-Ausführung als Node."""
    result = execute_tool(state["messages"][-1])
    return {"messages": [result]}
```7 → ```python
def agent_node(state: AgentState) -> AgentState:
    """Ein Node ist eine Funktion, die State empfängt und transformiert."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> AgentState:
    """Tool-Ausführung als Node."""
    result = execute_tool(state["messages"][-1])
    return {"messages": [result]}
```8 ersetzen (deprecated seit v1.0)
- [ ] ```python
def agent_node(state: AgentState) -> AgentState:
    """Ein Node ist eine Funktion, die State empfängt und transformiert."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

def tool_node(state: AgentState) -> AgentState:
    """Tool-Ausführung als Node."""
    result = execute_tool(state["messages"][-1])
    return {"messages": [result]}
```9 Imports → ```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)

# Nodes hinzufügen
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# Edges definieren
graph.add_edge(START, "agent")  # Start → agent
graph.add_edge("tools", "agent")  # tools → agent (Loop)
graph.add_edge("agent", END)  # agent → END
```0 migrieren

### ⚠️ Deprecated APIs (ab v1.0)

| Deprecated | Ersatz | Status |
|-----------|--------|--------|
| ```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)

# Nodes hinzufügen
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# Edges definieren
graph.add_edge(START, "agent")  # Start → agent
graph.add_edge("tools", "agent")  # tools → agent (Loop)
graph.add_edge("agent", END)  # agent → END
```1 Parameter in ```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)

# Nodes hinzufügen
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# Edges definieren
graph.add_edge(START, "agent")  # Start → agent
graph.add_edge("tools", "agent")  # tools → agent (Loop)
graph.add_edge("agent", END)  # agent → END
```2 | ```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)

# Nodes hinzufügen
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# Edges definieren
graph.add_edge(START, "agent")  # Start → agent
graph.add_edge("tools", "agent")  # tools → agent (Loop)
graph.add_edge("agent", END)  # agent → END
```3 | Deprecation-Warning, Entfernung in v2.0 |
| ```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)

# Nodes hinzufügen
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# Edges definieren
graph.add_edge(START, "agent")  # Start → agent
graph.add_edge("tools", "agent")  # tools → agent (Loop)
graph.add_edge("agent", END)  # agent → END
```4 | ```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)

# Nodes hinzufügen
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# Edges definieren
graph.add_edge(START, "agent")  # Start → agent
graph.add_edge("tools", "agent")  # tools → agent (Loop)
graph.add_edge("agent", END)  # agent → END
```5 / ```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)

# Nodes hinzufügen
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# Edges definieren
graph.add_edge(START, "agent")  # Start → agent
graph.add_edge("tools", "agent")  # tools → agent (Loop)
graph.add_edge("agent", END)  # agent → END
```6 | Deprecation-Warning, Entfernung in v2.0 |
| ```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)

# Nodes hinzufügen
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# Edges definieren
graph.add_edge(START, "agent")  # Start → agent
graph.add_edge("tools", "agent")  # tools → agent (Loop)
graph.add_edge("agent", END)  # agent → END
```7 | ```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)

# Nodes hinzufügen
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# Edges definieren
graph.add_edge(START, "agent")  # Start → agent
graph.add_edge("tools", "agent")  # tools → agent (Loop)
graph.add_edge("agent", END)  # agent → END
```8 | Deprecation-Warning, Entfernung in v2.0 |
| ```python
from langgraph.graph import StateGraph, START, END

graph = StateGraph(AgentState)

# Nodes hinzufügen
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

# Edges definieren
graph.add_edge(START, "agent")  # Start → agent
graph.add_edge("tools", "agent")  # tools → agent (Loop)
graph.add_edge("agent", END)  # agent → END
```9 | `graph_builder.compile()`0 Funktion | Deprecation-Warning |

`graph_builder.compile()`1

---

## 🎯 Best Practices Zusammenfassung

### 1. State Design
- ✅ **TypedDict** für LangGraph State (Performance)
- ✅ **Pydantic** für Input/Output-Validierung
- ✅ **Minimal State**: Nur nötige Daten im State
- ✅ **Reducer**: `graph_builder.compile()`2 für Message-Akkumulation

### 2. Workflow-Design
- ✅ **Kleine Nodes**: Eine Verantwortung pro Node
- ✅ **Conditional Routing**: Statt viele kleine Edges
- ✅ **Subgraphs**: Für >5 Nodes gruppieren
- ✅ **Error Handling**: Dedicated Error-Nodes
- ✅ **Graph-Visualisierung**: Direkt nach `graph_builder.compile()`3 mit `graph_builder.compile()`4

### 3. Production-Ready
- ✅ **Checkpointing**: Immer in Production
- ✅ **Stream Modes**: Für Monitoring
- ✅ **Thread-IDs**: User/Session-spezifisch
- ✅ **Testing**: Nodes isoliert testen
- ✅ **Recursion Limit**: Explizit setzen (Default geändert in v1.0.6)
- ✅ **Python**: Minimum 3.10+ (3.13 kompatibel, 3.9 abgekündigt)

### 4. Human-in-the-Loop
- ✅ **`graph_builder.compile()`5** verwenden (nicht `graph_builder.compile()`6)
- ✅ **Konsistente Reihenfolge** der Interrupts
- ✅ **Command-Object** für Resume
- ✅ **Approval Gates** für kritische Aktionen

---

## 📖 Weitere Ressourcen

- **LangGraph Docs**: https://langchain-ai.github.io/langgraph/
- **LangGraph Changelog**: https://changelog.langchain.com/ (Node Caching, Deferred Nodes, Hooks)
- **Multi-Agent Tutorial**: https://langchain-ai.github.io/langgraph/tutorials/multi_agent/
- **Checkpointing Guide**: https://langchain-ai.github.io/langgraph/concepts/persistence/
- **Human-in-the-Loop**: https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/
- **LangGraph Studio**: Visuelle Debugging-Umgebung

---

**Version:** 1.4<br>
**Letzte Aktualisierung:** März 2026 (LangGraph v1.0.10 / langgraph-prebuilt v1.0.8)
**Autor:** GenAI Projekt Team

**Changelog v1.4 (März 2026):**
- 🆕 **ToolRuntime** dokumentiert (Must-Have #6) — Dependency Injection des vollständigen Laufzeit-Kontexts in Tools via `graph_builder.compile()`7 (langgraph-prebuilt 1.0.8)
- ✅ Vergleichstabelle: ToolRuntime-Felder und Wann-verwenden-Empfehlung

**Changelog v1.3 (März 2026):**
- ✅ **Graph-Visualisierung** in Section 2 dokumentiert: `graph_builder.compile()`8 direkt nach `graph_builder.compile()`9 (PFLICHT)
- ✅ Migration-Checkliste und Best Practices Zusammenfassung ergänzt

**Changelog v1.2 (Februar 2026):**
- ✅ **Deprecated APIs** Sektion hinzugefügt (```python
from IPython.display import Image, display

# Direkt nach graph.compile():
graph = graph_builder.compile()

try:
    display(Image(graph.get_graph().draw_mermaid_png()))
except Exception as e:
    print(f"⚠️ Graph-Visualisierung nicht verfügbar: {e}")
```0 → ```python
from IPython.display import Image, display

# Direkt nach graph.compile():
graph = graph_builder.compile()

try:
    display(Image(graph.get_graph().draw_mermaid_png()))
except Exception as e:
    print(f"⚠️ Graph-Visualisierung nicht verfügbar: {e}")
```1, ```python
from IPython.display import Image, display

# Direkt nach graph.compile():
graph = graph_builder.compile()

try:
    display(Image(graph.get_graph().draw_mermaid_png()))
except Exception as e:
    print(f"⚠️ Graph-Visualisierung nicht verfügbar: {e}")
```2 → ```python
from IPython.display import Image, display

# Direkt nach graph.compile():
graph = graph_builder.compile()

try:
    display(Image(graph.get_graph().draw_mermaid_png()))
except Exception as e:
    print(f"⚠️ Graph-Visualisierung nicht verfügbar: {e}")
```3)
- ✅ **Default Recursion Limit** Hinweis: Ab v1.0.6 geändert - explizites Setzen in Notebooks empfohlen
- ✅ **Python 3.13** Kompatibilität bestätigt, Python 3.9 abgekündigt (Minimum: 3.10+)
- ✅ Veraltete v0.x Referenzen auf v1.0 aktualisiert
- ✅ Migration-Checkliste erweitert

**Changelog v1.1 (Dezember 2025):**
- ✅ **Node Caching** dokumentiert - Performance-Optimierung
- ✅ **Deferred Nodes** dokumentiert - Map-Reduce & Consensus
- ✅ **Pre/Post Model Hooks** dokumentiert - Guardrails & Context-Management
- ✅ **Multiple Interrupt Resume** dokumentiert - Parallele Tool Calls
- ✅ **Security Hardening** für Checkpointers
- ✅ **LangGraph 1.0 GA** Features integriert (Oktober 2025)

---

> [!TIP] Tipp<br>
> Mit einfachen ```python
from IPython.display import Image, display

# Direkt nach graph.compile():
graph = graph_builder.compile()

try:
    display(Image(graph.get_graph().draw_mermaid_png()))
except Exception as e:
    print(f"⚠️ Graph-Visualisierung nicht verfügbar: {e}")
```4 Workflows starten und zu LangGraph migrieren, wenn die Komplexität steigt.

---

**Version:** 1.0<br>
**Stand:** März 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [LangChain Best Practices](langchain-best-practices.html) | Welche LangChain 1.0-Patterns sind in neuen Implementierungen Pflicht? |
| [LangSmith Best Practices](langsmith-best-practices.html) | Wie überwache und evaluiere ich LangGraph-Graphen mit LangSmith? |
