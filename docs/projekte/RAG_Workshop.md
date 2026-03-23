---
layout: default
title: RAG Workshop
parent: Projekte
nav_order: 1
description: "Schrittweise Workshop: Tech-Doku Assistent - vom einfachen Chatbot zur RAG-basierten Anwendung mit UI"
has_toc: true
---

# RAG Workshop
{: .no_toc }

> **Tech-Doku Assistent bauen**
> Schrittweise Entwicklung vom einfachen Chatbot zur intelligenten RAG-Anwendung mit Agent, Middleware und UI (Module M04–M13)

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Projektübersicht

Diese Übungsaufgabe entwickelt schrittweise einen **Tech-Doku-Assistenten**, der technische Fragen beantwortet und mit jedem Abschnitt systematischer aufgebaut wird.

**Lernziele:**
- Aufbau einer GenAI-Anwendung von Grund auf
- Schrittweise Integration von LangChain-Features
- Praktische Anwendung der Module M04–M13
- Best Practices für strukturierten Notebook-Code

**Arbeitsumgebung:** Google Colab oder Jupyter Notebook

---

## Notebook-Struktur

Vorgesehen ist **ein Notebook** mit **neun aufbauenden Kapiteln**. Alternativ kann jedes Kapitel als eigenes Notebook geführt werden:

```
📓 Tech_Doku_Assistent.ipynb
   ├── 🎯 Kapitel 1: Basis-Chatbot (M04)
   ├── 📊 Kapitel 2: Token-Optimierung (M05)
   ├── 🔧 Kapitel 3: Strukturierte Ausgaben (M06)
   ├── 💬 Kapitel 4: Chat-History & Memory (M07)
   ├── 📚 Kapitel 5: RAG-Integration (M08)
   ├── 🗄️ Kapitel 6: SQL RAG (M09)
   ├── 🤖 Kapitel 7: Agent mit Tools (M10)
   ├── 🛡️ Kapitel 8: Middleware (M11)
   └── 🌐 Kapitel 9: Gradio-UI (M13)
```

**Empfehlung:** Für den Einstieg reicht ein gemeinsames Notebook. Eine klare Trennung per Markdown-Zelle hält den Verlauf nachvollziehbar.

---

## Vorbereitung: Google Colab Setup

Vor dem Start wird die Colab-Umgebung eingerichtet:

### API-Key in Colab Secrets speichern

1. In Colab das Schlüssel-Symbol 🔑 in der linken Sidebar öffnen
2. `OPENAI_API_KEY` anlegen
3. "Notebook access" aktivieren

### Basis-Pakete installieren

Zu Beginn des Notebooks wird ausgeführt:

```python
# ═══════════════════════════════════════════════════
# 📦 INSTALLATION (Einmalig ausführen)
# ═══════════════════════════════════════════════════

!pip install -q langchain>=1.1.0 langchain-openai>=1.0.0 langchain-community
!pip install -q chromadb tiktoken gradio
```

### API-Key laden

```python
# ═══════════════════════════════════════════════════
# 🔑 API-KEY SETUP
# ═══════════════════════════════════════════════════

import os
from google.colab import userdata

# API-Key aus Colab Secrets laden
os.environ["OPENAI_API_KEY"] = userdata.get('OPENAI_API_KEY')
```

---

## Kapitel 1: Basis-Chatbot (Modul M04)

**Lernziel:** LangChain-Grundlagen, Prompt-Templates, einfache LLM-Interaktion

### Aufgabe 1.1: LLM initialisieren

```python
# ═══════════════════════════════════════════════════
# 🎯 KAPITEL 1: BASIS-CHATBOT (M04)
# ═══════════════════════════════════════════════════

from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# LLM initialisieren
llm = init_chat_model("openai:gpt-4o-mini", temperature=0.3)
...
```

### Aufgabe 1.2: Interaktive Chat-Schleife

```python
# Chat-Funktion für Notebook
def tech_chat():
    """Einfache Chat-Schleife für Jupyter/Colab"""
    print("🤖 Tech-Doku Assistent gestartet!")
    ...
```

**Erfolgskriterium:**
- ✅ Der Bot beantwortet technische Fragen korrekt
- ✅ Der Chat läuft in einer Schleife (bis "exit")
- ✅ LCEL-Syntax (`|`) wird verwendet

---

## Kapitel 2: Token-Optimierung (Modul M05)

**Lernziel:** Transformer-Konzepte verstehen, Token-Zählung, Kontext-Management

### Aufgabe 2.1: Token-Zählung implementieren

```python
# ═══════════════════════════════════════════════════
# 📊 KAPITEL 2: TOKEN-OPTIMIERUNG (M05)
# ═══════════════════════════════════════════════════

import tiktoken

# Token-Counter Funktion
def count_tokens(text: str, model: str = "gpt-4o-mini") -> int:
    """Zählt Tokens für ein gegebenes Modell"""
    encoding = tiktoken.encoding_for_model(model)
    ...
```

### Aufgabe 2.2: Chat mit Token-Tracking

```python
def tech_chat_mit_tokens():
    """Chat mit Token-Statistiken"""
    print("🤖 Tech-Doku Assistent (mit Token-Tracking)")
    print("   (Schreibe 'exit' zum Beenden)\n")
    ...
```

**Erfolgskriterium:**
- ✅ Token-Zählung funktioniert korrekt
- ✅ Statistiken werden nach jeder Frage angezeigt
- ✅ Warnung bei langen Antworten (>500 Tokens)
- ✅ Session-Gesamtstatistik am Ende

---

## Kapitel 3: Strukturierte Ausgaben (Modul M06)

**Lernziel:** Pydantic-Modelle, `with_structured_output()`, JSON-Schema

### Aufgabe 3.1: Pydantic-Modell definieren

```python
# ═══════════════════════════════════════════════════
# 🔧 KAPITEL 3: STRUKTURIERTE AUSGABEN (M06)
# ═══════════════════════════════════════════════════

from pydantic import BaseModel, Field
from typing import Literal

class FAQEntry(BaseModel):
    """Strukturierte FAQ-Eingabe"""
    frage: str = Field(description="Die ursprüngliche Frage")
    antwort: str = Field(description="Die Antwort (max 200 Zeichen)")
    ...
```

### Aufgabe 3.2: FAQ-Datenbank aufbauen

```python
import json

def create_faq_database():
    """Interaktive FAQ-Erstellung"""
    faq_list = []
    print("🔧 FAQ-Generator")
    ...
```

**Erfolgskriterium:**
- ✅ Strukturierte JSON-Ausgabe
- ✅ Schema-Validierung funktioniert
- ✅ Alle Felder korrekt befüllt
- ✅ Export in JSON-Datei

---

## Kapitel 4: Chat-History & Memory (Modul M07)

**Lernziel:** Konversationskontext verwalten, Chat-History nutzen

### Aufgabe 4.1: Memory implementieren

```python
# ═══════════════════════════════════════════════════
# 💬 KAPITEL 4: CHAT-HISTORY & MEMORY (M07)
# ═══════════════════════════════════════════════════

from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

# Memory-Store (speichert alle Sessions)
store = {}

def get_session_history(session_id: str) -> InMemoryChatMessageHistory:
    """Holt oder erstellt Chat-History für Session"""
    if session_id not in store:
        ...
```

### Aufgabe 4.2: Chat mit Kontext-Bewusstsein

```python
def tech_chat_mit_memory():
    """Chat mit Konversationsgedächtnis"""
    session_id = "user_session_1"
    print("🤖 Tech-Doku Assistent (mit Memory)")
    ...
```

**Erfolgskriterium:**
- ✅ Bot erinnert sich an vorherige Fragen
- ✅ Antworten beziehen sich auf Kontext
- ✅ 'reset' Befehl löscht History
- ✅ History-Länge wird angezeigt

---

## Kapitel 5: RAG-Integration (Modul M08)

**Lernziel:** Retrieval-Augmented Generation, Vektordatenbank, Embeddings

### Aufgabe 5.1: Dokumente hochladen (Colab File Upload)

```python
# ═══════════════════════════════════════════════════
# 📚 KAPITEL 5: RAG-INTEGRATION (M08)
# ═══════════════════════════════════════════════════

from google.colab import files
import os

# Verzeichnis für Dokumente erstellen
os.makedirs('docs', exist_ok=True)
...
```

### Aufgabe 5.2: Vektordatenbank erstellen

```python
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# Dokumente laden
loader = DirectoryLoader('docs/', glob="**/*.md", loader_cls=TextLoader)
documents = loader.load()
...
```

### Aufgabe 5.3: RAG-Chain implementieren

```python
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# Hilfsfunktion: Dokumente formatieren
def format_docs(docs):
    """Formatiert Retrieved Docs für Prompt"""
    return "\n\n".join([f"Quelle: {doc.metadata.get('source', 'Unbekannt')}\n{doc.page_content}" for doc in docs])
...
```

### Aufgabe 5.4: RAG-Chat mit Quellenangaben

```python
def rag_chat():
    """RAG-Chat mit Quellenangaben"""
    print("🤖 Tech-Doku Assistent (RAG-Modus)")
    print("   (Schreibe 'exit' zum Beenden)\n")
    ...
```

**Erfolgskriterium:**
- ✅ Dokumente werden hochgeladen und indiziert
- ✅ Retrieval findet relevante Chunks
- ✅ Antworten basieren auf Dokumenten
- ✅ Quellenangaben werden angezeigt

---

## Kapitel 6: SQL RAG (Modul M09)

**Lernziel:** Strukturierte Daten mit RAG abfragen, SQL-Generierung durch LLMs

### Aufgabe 6.1: SQLite-Datenbank erstellen

```python
# ═══════════════════════════════════════════════════
# 🗄️ KAPITEL 6: SQL RAG (M09)
# ═══════════════════════════════════════════════════

import sqlite3

# Beispiel-Datenbank für Tech-Dokumentation
conn = sqlite3.connect("tech_docs.db")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS dokumentation (
        id INTEGER PRIMARY KEY,
        titel TEXT,
        kategorie TEXT,
        inhalt TEXT,
        version TEXT
    )
""")
...
```

### Aufgabe 6.2: SQL-Chain mit LangChain

```python
from langchain_community.utilities import SQLDatabase
from langchain.chains import create_sql_query_chain

# Datenbank anbinden
db = SQLDatabase.from_uri("sqlite:///tech_docs.db")

# SQL-Chain erstellen
sql_chain = create_sql_query_chain(llm, db)
...
```

### Aufgabe 6.3: Kombination Vektor-RAG + SQL RAG

```python
def hybrid_chat():
    """Chat mit Vektor-RAG und SQL RAG kombiniert"""
    print("🤖 Tech-Doku Assistent (Hybrid-Modus)")
    print("   📚 Dokumente + 🗄️ Datenbank")
    ...
```

**Erfolgskriterium:**
- ✅ SQLite-Datenbank mit Beispieldaten erstellt
- ✅ Natürlichsprachliche Fragen werden in SQL übersetzt
- ✅ Ergebnisse werden verständlich aufbereitet
- ✅ Kombination mit Vektor-RAG funktioniert

---

## Kapitel 7: Agent mit Tools (Modul M10)

**Lernziel:** LangChain Agents, Tool-Definition, Function Calling

### Aufgabe 7.1: Tools definieren

```python
# ═══════════════════════════════════════════════════
# 🤖 KAPITEL 7: AGENT MIT TOOLS (M10)
# ═══════════════════════════════════════════════════

from langchain_core.tools import tool
import ast

@tool
def search_documentation(query: str) -> str:
    """Durchsucht die technische Dokumentation nach relevanten Informationen."""
    # Nutze Retriever aus Kapitel 5
    docs = retriever.get_relevant_documents(query)
    ...

@tool
def query_database(question: str) -> str:
    """Beantwortet Fragen über die Tech-Doku Datenbank mittels SQL."""
    # Nutze SQL-Chain aus Kapitel 6
    result = sql_chain.invoke({"question": question})
    ...

@tool
def calculate_token_cost(text: str, model: str = "gpt-4o-mini") -> str:
    """Berechnet Token-Anzahl und geschätzte Kosten für einen Text."""
    tokens = count_tokens(text, model)
    ...

@tool
def validate_python_code(code: str) -> str:
    """Validiert Python-Code auf Syntax-Fehler."""
    try:
        ast.parse(code)
        ...
```

### Aufgabe 7.2: Agent erstellen

```python
from langchain.agents import create_agent

# Agent erstellen
agent = create_agent(
    model="openai:gpt-4o-mini",
    tools=tools,
    ...
)
```

### Aufgabe 7.3: Agent-Chat

```python
def agent_chat():
    """Interactive Agent Chat"""
    print("🤖 Tech-Doku Assistent (Agent-Modus)")
    print("   Tools: 📚 Doku-Suche | 🗄️ DB-Abfrage | 📊 Token-Rechner | ✅ Code-Validator")
    ...
```

**Erfolgskriterium:**
- ✅ Alle 4 Tools funktionieren einzeln
- ✅ Agent nutzt Tools korrekt
- ✅ Entscheidungslogik ist nachvollziehbar
- ✅ Debug-Modus zeigt Tool-Aufrufe

---

## Kapitel 8: Middleware (Modul M11)

**Lernziel:** Agent-Ausführung kontrollieren mit Middleware-Hooks und prebuilt Middleware

### Aufgabe 8.1: Logging-Middleware mit Decorator-Hooks

```python
# ═══════════════════════════════════════════════════
# 🛡️ KAPITEL 8: MIDDLEWARE (M11)
# ═══════════════════════════════════════════════════

from langchain.agents import AgentState
from langchain.agents.middleware import before_model, after_model, wrap_tool_call
from langchain.tools.tool_node import ToolCallRequest

@before_model
def log_before(state: AgentState, runtime):
    """Loggt jede Modell-Anfrage"""
    print(f"🧠 Model wird aufgerufen mit {len(state['messages'])} Nachrichten")
    return None

@after_model
def log_after(state: AgentState, runtime):
    """Loggt jede Modell-Antwort"""
    msg = state["messages"][-1]
    if hasattr(msg, "tool_calls") and msg.tool_calls:
        print(f"⚡ Tool-Aufruf: {[tc['name'] for tc in msg.tool_calls]}")
    else:
        print(f"💬 Antwort generiert")
    return None

@wrap_tool_call
def log_tool(request: ToolCallRequest, handler):
    """Loggt jede Tool-Ausführung"""
    print(f"🔧 Führe aus: {request.tool_call['name']}")
    result = handler(request)
    print(f"✅ Ergebnis: {str(result.content)[:100]}")
    return result
```

### Aufgabe 8.2: Human-in-the-Loop für sensible Tools

```python
from langchain.agents.middleware import HumanInTheLoopMiddleware
from langgraph.checkpoint.memory import MemorySaver

# HITL für sensible Tools aktivieren
hitl = HumanInTheLoopMiddleware(
    interrupt_on={"query_database": True}
)

agent_safe = create_agent(
    model="openai:gpt-4o-mini",
    tools=tools,
    middleware=[log_before, log_after, log_tool, hitl],
    checkpointer=MemorySaver()
)
...
```

### Aufgabe 8.3: Retry-Middleware für Robustheit

```python
from langchain.agents.middleware import ModelRetryMiddleware, ToolRetryMiddleware

agent_robust = create_agent(
    model="openai:gpt-4o-mini",
    tools=tools,
    middleware=[
        log_before, log_after, log_tool,
        ModelRetryMiddleware(max_retries=3, backoff_factor=2.0, jitter=True),
        ToolRetryMiddleware(max_retries=2, jitter=True),
        hitl,
    ],
    checkpointer=MemorySaver()
)
...
```

**Erfolgskriterium:**
- ✅ Logging zeigt Modell- und Tool-Aufrufe
- ✅ HITL unterbricht bei Datenbank-Queries und wartet auf Bestätigung
- ✅ Retry-Middleware fängt transiente Fehler ab
- ✅ Middleware-Stack ist korrekt kombiniert

---

## Kapitel 9: Gradio-UI (Modul M13)

**Lernziel:** Web-Interface mit Gradio, State-Management, Event-Handling

### Aufgabe 9.1: Basis-UI erstellen

```python
# ═══════════════════════════════════════════════════
# 🌐 KAPITEL 9: GRADIO-UI (M13)
# ═══════════════════════════════════════════════════

import gradio as gr

# Chat-Handler-Funktionen
def chat_handler(message, history):
    """Verarbeitet normale Chat-Anfragen"""
    antwort = chain.invoke({"frage": message})
    ...

def rag_handler(message, history):
    """Verarbeitet RAG-basierte Anfragen"""
    antwort = rag_chain.invoke(message)
    ...

def agent_handler(message, history):
    """Verarbeitet Agent-Anfragen (mit Middleware)"""
    response = agent_robust.invoke({
        "messages": [{"role": "user", "content": message}]
    })
    ...
```

### Aufgabe 9.2: Gradio-App implementieren

```python
# Gradio Interface
with gr.Blocks(title="Tech-Doku Assistent") as demo:
    gr.Markdown("# 🤖 Tech-Doku Assistent")
    gr.Markdown("*Powered by LangChain & OpenAI*")
    ...
```

**Colab-spezifische Hinweise:**
- `share=True` erstellt einen öffentlichen Link (für 72h gültig)
- Der Link kann mit anderen geteilt werden
- Gradio läuft direkt in Colab ohne separaten Server

**Erfolgskriterium:**
- ✅ UI läuft in Colab mit öffentlichem Link
- ✅ Alle Tabs funktionieren (Chat, RAG, Agent)
- ✅ Token-Tracking wird live aktualisiert
- ✅ "Chat löschen" Button funktioniert

---

## Bonusaufgaben

### Bonus 1: Persistenz
- Chat-History in JSON speichern
- Vorherige Sessions beim Start laden
- Session-Management ergänzen

### Bonus 2: Erweiterte RAG-Features
- Hybrid-Search (Keyword + Semantic)
- Re-Ranking der Retrieval-Ergebnisse
- Chunk-Overlap-Visualisierung

### Bonus 3: MCP-Integration (M12)
- MCP-Server für die Tech-Dokumentation erstellen
- Agent über MCP-Client mit externen Tools verbinden
- Vergleich: Tools direkt vs. Tools via MCP

### Bonus 4: Notebook dokumentieren
- Ein Inhaltsverzeichnis mit Markdown-Zellen anlegen
- Emoji-Header für jedes Kapitel ergänzen
- Lernziele und Erfolgskriterien dokumentieren

---

## Bewertungskriterien

| Kapitel | Punkte | Kriterien |
|---------|--------|-----------|
| 1: Basis-Chatbot (M04) | 10 | Funktionalität, Code-Qualität, LCEL-Nutzung |
| 2: Token-Optimierung (M05) | 10 | Korrekte Zählung, Statistiken, Warnungen |
| 3: Strukturierte Ausgaben (M06) | 10 | Pydantic-Modelle, Validierung |
| 4: Chat-Memory (M07) | 10 | Context-Awareness, Memory-Management |
| 5: RAG-Integration (M08) | 15 | Retrieval-Qualität, Quellenangaben |
| 6: SQL RAG (M09) | 10 | SQL-Generierung, Hybrid-Modus |
| 7: Agent mit Tools (M10) | 15 | Tool-Implementation, Agent-Logik |
| 8: Middleware (M11) | 10 | Logging, HITL, Retry-Stack |
| 9: Gradio-UI (M13) | 10 | Usability, Features, Design |
| **Gesamt** | **100** | |

**Bestanden:** ≥ 60 Punkte

---

## Hilfreiche Ressourcen

**LangChain Dokumentation:**
- [init_chat_model()](https://python.langchain.com/docs/concepts/chat_models/)
- [RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/)
- [Agents](https://python.langchain.com/docs/concepts/agents/)


**Kurs-Notebooks:**
- `01_notebook/M04_LangChain101.ipynb`
- `01_notebook/M06_OutputParser.ipynb`
- `01_notebook/M07_Chat_Memory_Patterns.ipynb`
- `01_notebook/M08_RAG_LangChain.ipynb`
- `01_notebook/M09_SQL_RAG.ipynb`
- `01_notebook/M10_Agenten_LangChain.ipynb`
- `01_notebook/M11_Middleware.ipynb`
- `01_notebook/M13_Gradio.ipynb`

---

## Erwartete Ergebnisse

**Format:**
- **Jupyter Notebook** (`Tech_Doku_Assistent.ipynb`) mit allen neun Kapiteln, sauberer Markdown-Struktur und nachvollziehbaren Code-Zellen
- **Dokumentations-Dateien** mit drei bis fünf `.md`-Dateien für den RAG-Teil
- **README.md** mit Kurzbeschreibung, Setup-Hinweisen und einem Screenshot der Gradio-Oberfläche
- Optional ein **Demo-Video** oder ein **Colab-Link**

**Einreichung:**
- Als **Colab-Link**
- Oder als **ZIP-Archiv** mit `.ipynb` und `docs/`
- Oder als **Git-Repository-Link**

### Checkliste RAG-Workshop
- [ ] Notebook läuft von oben bis unten fehlerfrei durch
- [ ] Alle API-Keys sind über Colab Secrets eingebunden (nicht hardcodiert!)
- [ ] Alle 9 Kapitel sind implementiert
- [ ] Mindestens 3 Markdown-Dateien für RAG vorhanden
- [ ] SQLite-Datenbank für SQL RAG erstellt
- [ ] Middleware-Stack (Logging + HITL + Retry) funktioniert
- [ ] Gradio-UI läuft und erstellt share-Link
- [ ] Erfolgskriterien aus allen Kapiteln erfüllt
- [ ] README.md erklärt das Projekt

---

## FAQ

**Q: Muss ich alle Kapitel implementieren?**
A: Kapitel 1–5 sind Pflicht. Kapitel 6–9 sind optional für zusätzliche Punkte.

**Q: Kann ich separate Notebooks erstellen statt einem großen?**
A: Ja. Möglich sind neun separate Notebooks, etwa `Kapitel_1_Chat.ipynb` bis `Kapitel_9_Gradio.ipynb`. Wichtig ist dann, dass spätere Kapitel auf frühere Ergebnisse zugreifen können.

**Q: Welches LLM-Modell soll ich verwenden?**
A: `gpt-4o-mini` ist ausreichend und kosteneffizient. Für Kapitel 7 (Agent) funktioniert `gpt-4o-mini` ebenfalls, da es Function Calling unterstützt.

**Q: Kann ich andere Vektordatenbanken nutzen?**
A: Ja, FAISS ist in Colab sogar etwas schneller als ChromaDB. Qdrant ist ebenfalls möglich.

**Q: Wo bekomme ich Markdown-Dateien für RAG?**
A: Optionen:
  - Eigene `.md`-Dateien mit technischen Informationen erstellen
  - Offizielle Dokumentation herunterladen, etwa zu Docker oder Kubernetes
  - `markitdown` für PDF-zu-Markdown-Konvertierung nutzen
  - Wikipedia-Artikel als Markdown übernehmen

**Q: Mein Colab-Notebook stürzt beim Gradio-Launch ab**
A: Häufigste Ursachen:
  - RAM-Limit erreicht → Runtime → Factory reset runtime
  - Firewall blockiert share-Link → `share=False` für lokalen Zugriff testen
  - Alte Gradio-Version → `!pip install --upgrade gradio`

**Q: Kann ich die Übung auch lokal (ohne Colab) machen?**
A: Ja. Dann lokal mit Jupyter Notebook oder JupyterLab arbeiten und Folgendes ersetzen:
  - `from google.colab import userdata` → `from dotenv import load_dotenv`
  - `files.upload()` → Lokale File-Pfade
  - `share=True` → Optional für Gradio

---

**Version:** 2.0
**Stand:** Februar 2026
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
