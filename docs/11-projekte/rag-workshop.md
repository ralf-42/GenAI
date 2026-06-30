---
layout: default
title: Legal-RAG-Workshop
parent: Projekte
nav_order: 1
description: "Schrittweiser Workshop: Juristischer KI-Assistent - vom einfachen Chatbot zum RAG-basierten Rechtssystem mit Quellen, Agent, Qualitätssicherung und UI"
has_toc: true
---

# Legal-RAG Workshop
{: .no_toc }

> **Juristischen KI-Assistenten bauen**
> Schrittweise Entwicklung vom einfachen Chatbot zu einem RAG-basierten Rechtssystem mit kontrolliertem Kontext, Quellenangaben, Agent, Middleware, UI und lokalem Modellbetrieb (Module M02-M12)

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Projektübersicht

In diesem Projekt entsteht ein **juristischer KI-Assistent**, der rechtliche Fragen strukturiert bearbeitet, passende Quellen findet und Antworten mit nachvollziehbaren Verweisen vorbereitet. Das System soll keine Rechtsberatung ersetzen. Es zeigt, wie ein KI-System für juristische Informationsarbeit technisch aufgebaut werden kann: Benutzeroberfläche, System-Prompt, Orchestrierung, Retrieval, Modellaufruf, Qualitätskontrolle und Präsentation.

Das Projekt orientiert sich an einer typischen Architektur für juristische KI-Systeme:

- **Benutzeroberfläche:** Chat, Dokumenten-Upload, Recherche, Arbeitsbereiche und Verlauf
- **System-Prompt:** Rolle, Tonfall, Grenzen und Zitierpflicht
- **Orchestrierung & Tools:** Aufgabenplanung, Tool-Auswahl, Output-Filter und Qualitätskontrolle
- **Kontext-Injektion:** Retrieval aus Gesetzen, Urteilen und weiteren Quellen
- **KI-Modell:** Antwortgenerierung auf Basis von Prompt und kontrolliertem Kontext
- **Output & Präsentation:** Strukturierung, Quellenangaben, Export und UI-Ausgabe


### Persona


<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/profil_legal.png" class="logo" width="950"/>
<p><font color='black' size="2">
KI-generiertes Bild
</font></p>

### Ziele:

- Aufbau einer GenAI-Anwendung für juristische Recherche von Grund auf
- Schrittweise Integration von LangChain-Features
- Umsetzung eines RAG-Systems mit kontrollierter Quellenbasis
- Praktische Anwendung der Module M02-M12 mit lokaler und Open-Source-Modellvariante
- Best Practices für strukturierten Notebook-Code, Quellenangaben und Qualitätssicherung

**Arbeitsumgebung:** Google Colab oder Jupyter Notebook

### Potenzielle Architektur:


<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/legal_system.png" class="logo" width="950"/>
<p><font color='black' size="2">
KI-generiertes Bild
</font></p>

---

## Notebook-Struktur

Vorgesehen ist **ein Notebook** mit **zehn aufbauenden Kapiteln**. Alternativ kann jedes Kapitel als eigenes Notebook geführt werden:

```text
Legal_Assistant.ipynb
   ├── Kapitel 1: Basis-Chatbot (M02)
   ├── Kapitel 2: Token-Optimierung (M03)
   ├── Kapitel 3: Strukturierte Ausgaben (M04)
   ├── Kapitel 4: Chat-History & Memory (M05)
   ├── Kapitel 5: Legal RAG (M06)
   ├── Kapitel 6: SQL RAG für Rechtsmetadaten (M07)
   ├── Kapitel 7: Agent mit juristischen Tools (M08)
   ├── Kapitel 8: Middleware, Sicherheit & Freigabe (M09)
   ├── Kapitel 9: Gradio-UI (M11)
   └── Kapitel 10: Lokale Modelle & Open Source (M12)
```

**Empfehlung:** Für den Einstieg reicht ein gemeinsames Notebook. Eine klare Trennung per Markdown-Zelle hält den Verlauf nachvollziehbar.

---

## Vorbereitung: Google Colab Setup

Vor dem Start wird die Colab-Umgebung mit der Kursbibliothek (`genai_lib`) und den erforderlichen Abhängigkeiten eingerichtet.

### API-Key in Colab Secrets speichern

1. In Colab das Schlüssel-Symbol in der linken Sidebar öffnen
2. `OPENAI_API_KEY` anlegen
3. "Notebook access" aktivieren

### Kursbibliothek & Umgebung einrichten

Zu Beginn des Notebooks wird die GenAI-Kursbibliothek installiert. Danach werden die grundlegenden Hilfsfunktionen und der API-Key geladen:

```python
# ═══════════════════════════════════════════════════
# UMGEBUNG EINRICHTEN (Kurs-Utilities laden)
# ═══════════════════════════════════════════════════

# GenAI Kursbibliothek installieren
!uv pip install --system -q git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul

# Projekt-Utilities importieren
from genai_lib.utilities import (
    check_environment,
    get_ipinfo,
    setup_api_keys,
    mprint,
    install_packages,
    mermaid,
    get_model_profile,
    extract_thinking,
    load_prompt
)

# API-Key laden (sucht automatisch in Colab Secrets, Umgebungsvariablen oder fragt interaktiv)
setup_api_keys(['OPENAI_API_KEY'], create_globals=False)

print()
check_environment()
print()
get_ipinfo()

# Modell-Konfiguration (Rollen als Konstanten importieren)
from genai_lib.model_config import BASELINE
```

### Zusätzliche Abhängigkeiten installieren

Für den Workshop werden weitere Pakete wie `langchain-chroma`, `markitdown` und `gradio` benötigt. `markitdown` ist praktisch, wenn Gesetzestexte, Urteile oder Arbeitsmaterialien aus PDF-, DOCX- oder HTML-Dateien in Markdown umgewandelt werden sollen.

```python
# ═══════════════════════════════════════════════════
# INSTALLATIONEN
# ═══════════════════════════════════════════════════

# markitdown für Dokumentenkonvertierung installieren
!uv pip install --system -q "markitdown[all]"

# Weitere Pakete über genai_lib installieren
install_packages([
    "langchain_openai",
    "langchain_chroma",
    "gradio",
    ("langchain-text-splitters", "langchain_text_splitters"),
])
```

---

## Kapitel 1: Basis-Chatbot (Modul M02)

**Ziel:** LangChain-Grundlagen, Prompt-Templates, einfache LLM-Interaktion

In diesem Kapitel entsteht ein erster juristischer Assistent ohne externe Quellen. Er darf allgemeine Erklärungen geben, muss aber transparent machen, wenn ihm der konkrete Norm- oder Entscheidungskontext fehlt.

### Aufgabe 1.1: LLM initialisieren

```python
# ═══════════════════════════════════════════════════
# KAPITEL 1: BASIS-CHATBOT (M02)
# ═══════════════════════════════════════════════════

from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# TODO:
# 1. LLM initialisieren
# 2. System-Prompt mit juristischer Rolle und Grenzen formulieren
# 3. ChatPromptTemplate erstellen
# 4. LCEL-Chain mit StrOutputParser bauen
# 5. Eine Testfrage ausführen
```

### Aufgabe 1.2: Interaktive Chat-Schleife

```python
def legal_chat():
    """Einfache Chat-Schleife für Jupyter/Colab."""
    # TODO:
    # - Eingabe wiederholt abfragen
    # - Abbruchbefehl definieren
    # - Chain mit der Nutzerfrage aufrufen
    # - Antwort ausgeben
    pass
```

**Erfolgskriterium:**

- Der Bot beantwortet allgemeine juristische Verständnisfragen nachvollziehbar
- Der Bot weist auf fehlende Quellen oder Sachverhaltsdetails hin
- Der Chat läuft in einer Schleife bis `exit`
- LCEL-Syntax (`|`) wird verwendet

---

## Kapitel 2: Token-Optimierung (Modul M03)

**Ziel:** Transformer-Konzepte verstehen, Token-Zählung, Kontext-Management

Juristische Texte sind oft lang: Gesetze, Urteile, Kommentare und Schriftsätze enthalten viele Verweise und Wiederholungen. In diesem Kapitel wird sichtbar, warum Kontextfenster, Chunking und kurze Prompts für Legal RAG entscheidend sind.

### Aufgabe 2.1: Token-Zählung implementieren

```python
# ═══════════════════════════════════════════════════
# KAPITEL 2: TOKEN-OPTIMIERUNG (M03)
# ═══════════════════════════════════════════════════

import tiktoken

def count_tokens(text: str, model: str = "gpt-5.4-nano") -> int:
    """Zählt Tokens für ein gegebenes Modell."""
    # TODO:
    # - Encoding für das Modell laden
    # - Text encodieren
    # - Anzahl der Tokens zurückgeben
    pass
```

### Aufgabe 2.2: Chat mit Token-Tracking

```python
def legal_chat_mit_tokens():
    """Chat mit Token-Statistiken."""
    # TODO:
    # - Chat-Schleife aus Kapitel 1 wiederverwenden
    # - Tokens pro Frage/Antwort zählen
    # - Session-Summe pflegen
    # - Warnung bei langen Antworten ergänzen
    pass
```

**Erfolgskriterium:**

- Token-Zählung funktioniert korrekt
- Statistiken werden nach jeder Frage angezeigt
- Lange Antworten werden sichtbar
- Die Teilnehmenden erkennen, warum juristische Quellen vor dem Modellaufruf verdichtet werden müssen

---

## Kapitel 3: Strukturierte Ausgaben (Modul M04)

**Ziel:** Pydantic-Modelle, `with_structured_output()`, JSON-Schema

Juristische Antworten sollen nicht nur frei formuliert sein. Häufig braucht die Anwendung eine feste Struktur: Frage, Kurzantwort, einschlägige Normen, Fundstellen, Unsicherheiten und nächste Prüfschritte.

### Aufgabe 3.1: Pydantic-Modell definieren

```python
# ═══════════════════════════════════════════════════
# KAPITEL 3: STRUKTURIERTE AUSGABEN (M04)
# ═══════════════════════════════════════════════════

from pydantic import BaseModel, Field
from typing import Literal

class LegalAnswer(BaseModel):
    """Strukturierte juristische Antwort."""
    # TODO:
    # - Frage
    # - Kurzantwort
    # - Rechtsgebiet
    # - einschlägige Normen
    # - Quellenbedarf / Unsicherheit
    # - nächster Prüfschritt
    pass

# TODO:
# - LLM mit with_structured_output(LegalAnswer) konfigurieren
# - Testfrage ausführen
```

### Aufgabe 3.2: Fallnotiz-Datenbank aufbauen

```python
import json

def create_case_notes():
    """Interaktive Sammlung strukturierter Fallnotizen."""
    # TODO:
    # - Fragen interaktiv sammeln
    # - strukturierte Antwort erzeugen
    # - Ergebnisse als Liste speichern
    # - JSON-Export ergänzen
    pass
```

**Erfolgskriterium:**

- Strukturierte Ausgabe wird als Pydantic-Objekt erzeugt
- Normen, Rechtsgebiet und Unsicherheiten werden getrennt erfasst
- Export in JSON-Datei funktioniert
- Die Struktur ist später für UI, Evaluation und Qualitätssicherung nutzbar

---

## Kapitel 4: Chat-History & Memory (Modul M05)

**Ziel:** Konversationskontext verwalten, Chat-History nutzen

Juristische Rückfragen beziehen sich oft auf denselben Sachverhalt. Der Assistent soll deshalb frühere Angaben berücksichtigen, ohne daraus unbelegte Tatsachen zu machen.

### Aufgabe 4.1: Memory implementieren

```python
# ═══════════════════════════════════════════════════
# KAPITEL 4: CHAT-HISTORY & MEMORY (M05)
# ═══════════════════════════════════════════════════

from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

store = {}

def get_session_history(session_id: str) -> InMemoryChatMessageHistory:
    """Holt oder erstellt Chat-History für eine Session."""
    # TODO:
    # - Neue Session anlegen, falls sie noch nicht existiert
    # - Bestehende Session zurückgeben
    pass

# TODO:
# - Prompt mit MessagesPlaceholder definieren
# - Chain bauen
# - RunnableWithMessageHistory konfigurieren
```

### Aufgabe 4.2: Chat mit Kontext-Bewusstsein

```python
def legal_chat_mit_memory():
    """Chat mit Konversationsgedächtnis."""
    # TODO:
    # - Session-ID festlegen
    # - reset und exit behandeln
    # - chain_with_history mit config aufrufen
    # - Antwort und History-Länge anzeigen
    pass
```

**Erfolgskriterium:**

- Der Bot berücksichtigt vorherige Sachverhaltsangaben
- Der Bot trennt Nutzerangaben von Rechtsquellen
- `reset` löscht die History
- Die History-Länge wird angezeigt

---

## Kapitel 5: Legal RAG (Modul M06)

**Ziel:** Retrieval-Augmented Generation, Vektordatenbank, Embeddings, kontrollierter Kontext, einfache RAG-Evaluation

Jetzt erhält der Assistent eine Quellenbasis. Für den Workshop reichen drei bis fünf Markdown-Dateien, zum Beispiel:

- `bgb_auszug.md` mit ausgewählten Normen
- `gg_auszug.md` mit Grundrechten
- `urteile_beispiele.md` mit kurzen Entscheidungszusammenfassungen
- `faq_rechtsquellen.md` mit Erläuterungen zu Normen, Urteilen und Kommentaren

Die Dateien sollten nur frei nutzbare oder selbst erstellte Inhalte enthalten. Kommerzielle Kommentare, Handbücher und Fachdatenbanken dürfen nicht ohne passende Nutzungsrechte übernommen werden.

### Aufgabe 5.1: Dokumente hochladen (Colab File Upload)

```python
# ═══════════════════════════════════════════════════
# KAPITEL 5: LEGAL RAG (M06)
# ═══════════════════════════════════════════════════

from google.colab import files
import os

# TODO:
# - Zielverzeichnis für Rechtsquellen anlegen
# - Dateien hochladen
# - Uploads im Zielverzeichnis speichern
# - Dateiliste zur Kontrolle ausgeben
```

### Aufgabe 5.2: Vektordatenbank erstellen

```python
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

# TODO:
# - Markdown-Dokumente laden
# - sinnvolle Chunking-Parameter wählen
# - Embedding-Modell initialisieren
# - Chroma-Collection erstellen
# - Retriever konfigurieren
# - Anzahl Dokumente/Chunks prüfen
```

### Aufgabe 5.3: RAG-Chain implementieren

```python
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

def format_docs(docs):
    """Formatiert gefundene Dokumente für den Prompt."""
    # TODO:
    # - Quelle aus Metadaten übernehmen
    # - Dokumentinhalt kompakt formatieren
    # - mehrere Dokumente sauber trennen
    pass

# TODO:
# - RAG-System-Prompt formulieren
# - Kontext und Frage in den Prompt einbinden
# - Retriever, Formatierung, Prompt, LLM und Parser als LCEL-Chain verbinden
# - Testfrage ausführen
```

### Aufgabe 5.4: RAG-Chat mit Quellenangaben

```python
def legal_rag_chat():
    """RAG-Chat mit Quellenangaben."""
    # TODO:
    # - Nutzerfrage abfragen
    # - passende Dokumente abrufen
    # - RAG-Antwort erzeugen
    # - Quellen sichtbar ausgeben
    pass
```

### Aufgabe 5.5: Mini-Evaluation für Legal RAG

Ein Legal-RAG-System ist nicht schon brauchbar, weil eine Antwort plausibel klingt. Nach der ersten RAG-Chain wird ein kleines Testset angelegt, das Retrieval, Quellenbezug und Antwortgrenzen prüft.

```python
eval_set = [
    {
        "frage": "...",
        "erwartete_quelle": "...",
        "erwartung": "...",
    },
    # TODO: mindestens zwei weitere Fälle ergänzen
]

# TODO:
# - Für jeden Fall Retrieval und Antwort ausführen
# - erwartete und gefundene Quellen vergleichen
# - Antwort manuell bewerten und dokumentieren
```

**Erfolgskriterium:**

- Dokumente werden hochgeladen und indiziert
- Retrieval findet relevante Chunks
- Antworten basieren auf kontrolliertem Kontext
- Quellenangaben werden angezeigt
- Mindestens drei RAG-Testfragen werden dokumentiert und bewertet
- Der Bot sagt klar, wenn der Kontext nicht ausreicht

---

## Kapitel 6: SQL RAG für Rechtsmetadaten (Modul M07)

**Ziel:** Strukturierte Daten mit RAG abfragen, SQL-Generierung durch LLMs

Neben Volltextquellen braucht ein juristisches System strukturierte Metadaten: Norm, Gericht, Datum, Aktenzeichen, Rechtsgebiet, Quelle und Dokumenttyp. Diese Informationen lassen sich gut in einer SQLite-Datenbank ablegen.

### Aufgabe 6.1: SQLite-Datenbank erstellen

```python
# ═══════════════════════════════════════════════════
# KAPITEL 6: SQL RAG FÜR RECHTSMETADATEN (M07)
# ═══════════════════════════════════════════════════

import sqlite3

# TODO:
# - SQLite-Verbindung öffnen
# - Tabelle für Rechtsquellen-Metadaten entwerfen
# - sinnvolle Spalten definieren, z. B. Titel, Dokumenttyp, Rechtsgebiet, Fundstelle, Datum, Quelle
# - eigene Beispieldaten einfügen
# - Verbindung schließen
```

### Aufgabe 6.2: SQL-Chain mit LangChain

Für die SQL-Generierung ist `gpt-5.4-mini` meist die stabilere Wahl als `gpt-5.4-nano`, besonders bei komplexeren Schemata oder wenn die Abfrage mehrere Bedingungen kombinieren muss.

```python
from langchain_community.utilities import SQLDatabase
from langchain.chains import create_sql_query_chain

# TODO:
# - SQLite-Datenbank über SQLDatabase anbinden
# - SQL-Chain erstellen
# - Testfrage formulieren
# - generierte SQL-Abfrage prüfen, bevor sie ausgeführt wird
```

### Aufgabe 6.3: Kombination Vektor-RAG + SQL RAG

```python
def hybrid_legal_chat():
    """Chat mit Vektor-RAG und SQL RAG kombiniert."""
    # TODO:
    # - Frage entgegennehmen
    # - Volltext-Retrieval ausführen
    # - SQL-Metadatenprüfung vorbereiten
    # - beide Ergebnisse nachvollziehbar ausgeben
    pass
```

**Erfolgskriterium:**

- SQLite-Datenbank mit Rechtsquellen-Metadaten wird erstellt
- Natürlichsprachliche Fragen werden in SQL übersetzt
- Ergebnisse unterstützen die Quellenprüfung
- Kombination mit Vektor-RAG funktioniert

---

## Kapitel 7: Agent mit juristischen Tools (Modul M08)

**Ziel:** LangChain Agents, Tool-Definition, Function Calling

Der Agent entscheidet, wann er Retrieval, Metadatensuche oder Qualitätsprüfung nutzt. Das Toolset bleibt bewusst klein, damit die Entscheidungslogik nachvollziehbar bleibt.

### Aufgabe 7.1: Tools definieren

```python
# ═══════════════════════════════════════════════════
# KAPITEL 7: AGENT MIT JURISTISCHEN TOOLS (M08)
# ═══════════════════════════════════════════════════

from langchain_core.tools import tool

@tool
def search_legal_sources(query: str) -> str:
    """Durchsucht die juristischen Volltextquellen nach relevanten Informationen."""
    # TODO: Retriever nutzen und Treffer als Quellenkontext formatieren
    pass

@tool
def query_legal_metadata(question: str) -> str:
    """Erzeugt eine SQL-Abfrage für die Rechtsquellen-Metadatenbank."""
    # TODO: Frage in eine SQL-Metadatenabfrage überführen
    pass

@tool
def check_citations(answer: str) -> str:
    """Prüft, ob eine Antwort Quellenangaben enthält."""
    # TODO: einfache Prüfung auf Quellenangaben implementieren
    pass

@tool
def classify_legal_question(question: str) -> str:
    """Ordnet eine Frage grob einem Rechtsgebiet zu."""
    # TODO: strukturierte Ausgabe oder einfache Klassifikation nutzen
    pass

# TODO: Tool-Liste zusammenstellen
```

### Aufgabe 7.2: Agent erstellen

```python
from langchain.agents import create_agent

# TODO:
# - create_agent() verwenden
# - Modell auswählen
# - Tool-Liste übergeben
# - System-Prompt mit Rolle, Grenzen und Tool-Nutzung formulieren
```

### Aufgabe 7.3: Agent-Chat

```python
def legal_agent_chat():
    """Interaktiver Agent-Chat."""
    # TODO:
    # - Nutzerfrage entgegennehmen
    # - Agent mit Messages-Format aufrufen
    # - finale Antwort ausgeben
    # - Tool-Aufrufe bei Bedarf sichtbar machen
    pass
```

**Erfolgskriterium:**

- Alle vier Tools funktionieren einzeln
- Agent nutzt Tools nachvollziehbar
- Antworten enthalten Quellen oder klare Hinweise auf fehlende Quellen
- Debug-Ausgaben oder Zwischenstände machen Tool-Aufrufe prüfbar

---

## Kapitel 8: Middleware, Sicherheit & Freigabe (Modul M09)

**Ziel:** Agent-Ausführung kontrollieren mit Middleware und Human-in-the-loop

Juristische KI-Systeme brauchen klare Kontrollpunkte. Logging, Retry-Logik und menschliche Freigabe helfen, Tool-Aufrufe und Antworten nachvollziehbar zu machen.

### Aufgabe 8.1: Logging-Middleware

```python
# ═══════════════════════════════════════════════════
# KAPITEL 8: MIDDLEWARE, SICHERHEIT & FREIGABE (M09)
# ═══════════════════════════════════════════════════

from langchain.agents import AgentState
from langchain.agents.middleware import before_model, after_model, wrap_tool_call
from langchain.tools.tool_node import ToolCallRequest

@before_model
def log_before(state: AgentState, runtime):
    """Loggt jede Modell-Anfrage."""
    # TODO: relevante Informationen vor dem Modellaufruf loggen
    return None

@after_model
def log_after(state: AgentState, runtime):
    """Loggt jede Modell-Antwort."""
    # TODO: Tool-Aufrufe oder finale Antwort erkennen und loggen
    return None

@wrap_tool_call
def log_tool(request: ToolCallRequest, handler):
    """Loggt jede Tool-Ausführung."""
    # TODO:
    # - Tool-Namen loggen
    # - Handler aufrufen
    # - gekürztes Ergebnis loggen
    pass
```

### Aufgabe 8.2: Human-in-the-loop für sensible Tools

```python
from langchain.agents.middleware import HumanInTheLoopMiddleware
from langgraph.checkpoint.memory import MemorySaver

hitl = HumanInTheLoopMiddleware(
    # TODO: sensible Tools für Unterbrechung eintragen
    interrupt_on={}
)

# TODO:
# - Agent mit Middleware und Checkpointer erstellen
# - HITL-Unterbrechung testen
```

### Aufgabe 8.3: Retry-Middleware für Robustheit

```python
from langchain.agents.middleware import ModelRetryMiddleware, ToolRetryMiddleware

# TODO:
# - Retry-Middleware für Modell und Tools ergänzen
# - Reihenfolge der Middleware bewusst wählen
# - robusten Agenten erstellen und testen
```

**Erfolgskriterium:**

- Logging zeigt Modell- und Tool-Aufrufe
- HITL unterbricht bei sensiblen Tools
- Retry-Middleware fängt transiente Fehler ab
- Der Middleware-Stack bleibt verständlich und prüfbar
- Die Ausgabe macht Unsicherheiten und fehlende Quellen sichtbar

---

## Kapitel 9: Gradio-UI (Modul M11)

**Ziel:** Web-Interface mit Gradio, State-Management, Event-Handling

Die UI bildet die Schichten des Systems ab: Chat, Dokumenten-Upload, Recherchemodus, Agent-Modus und Quellenanzeige. Für den Workshop reicht eine einfache Oberfläche mit Tabs.

### Aufgabe 9.1: Basis-UI erstellen

```python
# ═══════════════════════════════════════════════════
# KAPITEL 9: GRADIO-UI (M11)
# ═══════════════════════════════════════════════════

import gradio as gr

def chat_handler(message, history):
    """Verarbeitet normale Chat-Anfragen."""
    # TODO: Basis-Chain aufrufen und Antwort zurückgeben
    pass

def rag_handler(message, history):
    """Verarbeitet RAG-basierte Anfragen."""
    # TODO:
    # - Retrieval ausführen
    # - RAG-Antwort erzeugen
    # - Quellen für die UI formatieren
    pass

def agent_handler(message, history):
    """Verarbeitet Agent-Anfragen mit Middleware."""
    # TODO: Agent aufrufen und finale Antwort extrahieren
    pass
```

### Aufgabe 9.2: Gradio-App implementieren

```python
with gr.Blocks(title="Juristischer KI-Assistent") as demo:
    # TODO:
    # - Titel und kurze Beschreibung ergänzen
    # - Tabs für Chat, Legal RAG und Agent anlegen
    # - passende Handler verbinden
    pass

# TODO: App starten
```

**Colab-spezifische Hinweise:**

- `share=True` erstellt einen öffentlichen Link
- Der Link kann mit anderen geteilt werden
- Gradio läuft direkt in Colab ohne separaten Server
- Für sensible oder echte juristische Inhalte sollte kein öffentlicher Share-Link verwendet werden

**Erfolgskriterium:**

- UI läuft in Colab
- Chat, RAG und Agent funktionieren
- Quellen werden sichtbar angezeigt
- "Chat löschen" oder Session-Reset ist ergänzt
- Sensible Inhalte werden nicht öffentlich geteilt

---

## Kapitel 10: Lokale Modelle & Open Source (Modul M12)

**Ziel:** Lokale und Open-Source-Modelle als Betriebsoption einordnen, testen und gegen API-Modelle vergleichen

Juristische Anwendungen arbeiten häufig mit sensiblen Dokumenten. Lokale Modelle können deshalb interessant sein, weil Daten die eigene Umgebung nicht verlassen müssen. Gleichzeitig sind Qualität, Geschwindigkeit, Hardwarebedarf und Wartung realistische Grenzen. In diesem Kapitel wird kein produktionsreifes On-Premise-System gebaut. Es geht um einen technischen Vergleich: API-Modell gegen lokales Modell auf denselben Legal-RAG-Fragen.

### Aufgabe 10.1: Lokales Modell anbinden

Für lokale Tests eignet sich zum Beispiel Ollama. Das Modell muss bereits lokal installiert und gestartet sein.

```python
# ═══════════════════════════════════════════════════
# KAPITEL 10: LOKALE MODELLE & OPEN SOURCE (M12)
# ═══════════════════════════════════════════════════

from langchain.chat_models import init_chat_model

# TODO:
# - lokales Modell auswählen und starten
# - init_chat_model("ollama:<modellname>") verwenden
# - RAG-Prompt aus Kapitel 5 wiederverwenden oder anpassen
# - lokale RAG-Chain analog zur API-Chain aufbauen
```

### Aufgabe 10.2: API-Modell und lokales Modell vergleichen

```python
vergleichsfragen = [
    "...",
    "...",
    "...",
]

# TODO:
# - dieselben Fragen an API- und lokales Modell stellen
# - Antworten nebeneinander dokumentieren
# - Quellenbezug, Vollständigkeit, Kürze und Umgang mit fehlendem Kontext bewerten
```

### Aufgabe 10.3: Betriebsentscheidung dokumentieren

Ergänze im Notebook eine kurze Entscheidungsmatrix:

| Kriterium | API-Modell | Lokales Modell |
|---|---|---|
| Antwortqualität |  |  |
| Geschwindigkeit |  |  |
| Datenschutz |  |  |
| Kostenkontrolle |  |  |
| Wartungsaufwand |  |  |
| Eignung für diesen Legal-RAG-Prototyp |  |  |

**Erfolgskriterium:**

- Ein lokales Modell ist angebunden oder der fehlende lokale Betrieb ist sauber begründet
- Mindestens drei Legal-RAG-Fragen werden gegen API- und lokales Modell verglichen
- Die Bewertung unterscheidet Qualität, Datenschutz, Betrieb und Kosten
- Die Entscheidungsmatrix enthält eine nachvollziehbare Empfehlung

---

## Erweiterungen

### Erweiterung 1: Persistenz

- Chat-History in JSON speichern
- Vorherige Sessions beim Start laden
- Arbeitsbereiche für unterschiedliche Fälle ergänzen

### Erweiterung 2: Erweiterte Legal-RAG-Features

- Hybrid-Search (Keyword + Semantic)
- Re-Ranking der Retrieval-Ergebnisse
- Chunk-Overlap-Visualisierung
- Quellengewichtung nach Dokumenttyp
- Trennung von Normtext, Urteil und eigener Zusammenfassung

### Erweiterung 3: MCP-Integration (M10)

- MCP-Server für eine kleine Rechtsquellen-Sammlung erstellen
- Agent über MCP-Client mit externen Tools verbinden
- Vergleich: Tools direkt vs. Tools via MCP

### Erweiterung 4: Qualitätssicherung

- Zitierprüfung als eigene Funktion ergänzen
- Testfälle für falsche oder fehlende Quellen anlegen
- Halluzinations-Check vor der UI-Ausgabe ausführen
- Antwort als PDF oder Markdown exportieren

### Erweiterung 5: Lokaler Betrieb vertiefen (M12)

- Embeddings und Chat-Modell lokal betreiben
- API- und lokales Modell mit derselben Evaluation vergleichen
- Hardwarebedarf und Antwortzeiten dokumentieren
- Datenschutz- und Betriebsgrenzen des lokalen Setups beschreiben

---

## Bewertungskriterien

| Kapitel | Punkte | Kriterien |
|---------|--------|-----------|
| 1: Basis-Chatbot (M02) | 10 | Funktionalität, klare Grenzen, LCEL-Nutzung |
| 2: Token-Optimierung (M03) | 10 | Korrekte Zählung, Statistiken, Kontextbewusstsein |
| 3: Strukturierte Ausgaben (M04) | 10 | Pydantic-Modelle, Validierung, juristische Felder |
| 4: Chat-Memory (M05) | 10 | Sachverhaltskontext, Memory-Management |
| 5: Legal RAG (M06) | 15 | Retrieval-Qualität, Quellenangaben, Mini-Evaluation |
| 6: SQL RAG (M07) | 10 | Rechtsmetadaten, SQL-Generierung, Hybrid-Modus |
| 7: Agent mit Tools (M08) | 15 | Tool-Implementation, Agent-Logik, Zitierprüfung |
| 8: Middleware (M09) | 10 | Logging, HITL, Retry-Stack, Kontrollpunkte |
| 9: Gradio-UI (M11) | 10 | Usability, Quellenanzeige, sensible Veröffentlichung |
| 10: Lokale Modelle (M12) | 10 | Vergleich API-Modell vs. lokales Modell, Betriebsentscheidung |
| **Gesamt** | **110** | |

**Bestanden:** >= 60 Punkte

---

## Hilfreiche Ressourcen

**LangChain Dokumentation:**

- [init_chat_model()](https://python.langchain.com/docs/concepts/chat_models/)
- [RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/)
- [Agents](https://python.langchain.com/docs/concepts/agents/)

**Kurs-Notebooks:**

- `01_notebook/M02_LangChain101.ipynb`
- `01_notebook/M03_Textverarbeitung_mit_LangChain.ipynb`
- `01_notebook/M04_OutputParser.ipynb`
- `01_notebook/M05_Chat_Memory_Patterns_stategraph.ipynb`
- `01_notebook/M05_Chat_Memory_Patterns_list_dict.ipynb`
- `01_notebook/M06_RAG_LangChain.ipynb`
- `01_notebook/M07_SQL_RAG.ipynb`
- `01_notebook/M08_Agenten_LangChain.ipynb`
- `01_notebook/M09_Middleware.ipynb`
- `01_notebook/M10_MCP_LangChain_Agent.ipynb`
- `01_notebook/M11_Gradio.ipynb`
- `01_notebook/M12_Lokale_Open_Source_Modelle.ipynb`

**Qualität & Observability:**

- [Evaluation & Observability](../07-qualitaet-sicherheit/evaluation-observability.html)
- [RAG-Konzepte](../05-prompting-rag/rag-konzepte.html)
- [LangSmith Best Practices](../06-frameworks/langsmith-best-practices.html)

---

## Erwartete Ergebnisse

**Format:**

- **Jupyter Notebook** (`Legal_Assistant.ipynb`) mit zehn Kapiteln, sauberer Markdown-Struktur und nachvollziehbaren Code-Zellen
- **Rechtsquellen-Dateien** mit drei bis fünf `.md`-Dateien für den RAG-Teil
- **SQLite-Datenbank** mit Metadaten zu Normen, Urteilen oder Beispielquellen
- **README.md** mit Kurzbeschreibung, Setup-Hinweisen, Quellenbasis und Screenshot der Gradio-Oberfläche
- Eine **M12-Entscheidungsmatrix** zum Vergleich von API-Modell und lokalem Modell
- Ein **Demo-Video** oder ein **Colab-Link**

**Einreichung:**

- Als **Colab-Link**
- Oder als **ZIP-Archiv** mit `.ipynb`, `legal_docs/` und Datenbankdatei
- Oder als **Git-Repository-Link**

### Checkliste Legal-RAG-Workshop

- [ ] Notebook läuft von oben bis unten fehlerfrei durch
- [ ] Alle API-Keys sind über Colab Secrets eingebunden und nicht hardcodiert
- [ ] Alle 10 Kapitel sind implementiert
- [ ] Mindestens 3 Markdown-Dateien mit frei nutzbaren oder selbst erstellten Rechtsquellen sind vorhanden
- [ ] Mindestens 3 RAG-Testfragen mit Bewertung sind dokumentiert
- [ ] SQLite-Datenbank für Rechtsmetadaten ist erstellt
- [ ] Antworten enthalten Quellenangaben oder klare Hinweise auf fehlenden Kontext
- [ ] Middleware-Stack mit Logging, HITL und Retry funktioniert
- [ ] Gradio-UI läuft und zeigt Quellen sichtbar an
- [ ] Lokales Modell getestet oder begründet ausgelassen
- [ ] README.md erklärt Projekt, Setup, Quellenbasis und Grenzen

---

## FAQ

**Q: Kann ich separate Notebooks erstellen statt einem großen?**  
A: Ja. Möglich sind separate Notebooks, etwa `Kapitel_1_Chat.ipynb` bis `Kapitel_10_Lokale_Modelle.ipynb`. Wichtig ist dann, dass spätere Kapitel auf frühere Ergebnisse zugreifen können.

**Q: Ist das eine Rechtsberatung?**  
A: Nein. Das Projekt ist eine technische Übung. Der Assistent arbeitet mit Beispielquellen und soll zeigen, wie RAG, Agenten und Qualitätssicherung in einem juristischen Kontext zusammenspielen.

**Q: Welche Quellen darf ich verwenden?**  
A: Nutze selbst erstellte Texte, frei verfügbare Gesetzestexte oder kurze didaktische Auszüge. Kommerzielle Kommentare, Handbücher und Fachdatenbanken dürfen nur verwendet werden, wenn die Nutzungsrechte das erlauben.

**Q: Welches LLM-Modell soll ich verwenden?**  
A: Für Kapitel 6 (SQL RAG) ist `gpt-5.4-mini` oder größer die robustere Wahl. `gpt-5.4-nano` ist für einfache Demos okay, scheitert aber bei komplexeren Schemata und längeren SQL-Statements häufiger. Für Kapitel 7 (Agent) ist `gpt-5.4-nano` weiterhin für einfache Function-Calling-Beispiele brauchbar.

**Q: Muss ich für M12 ein lokales Modell installieren?**  
A: Wer lokal arbeiten kann, vergleicht ein Open-Source-Modell mit dem API-basierten RAG-System. Wer in Colab oder auf schwacher Hardware arbeitet, dokumentiert stattdessen, warum lokaler Betrieb für diesen Prototyp nicht sinnvoll ist.

**Q: Kann ich andere Vektordatenbanken nutzen?**  
A: Ja, FAISS ist in Colab oft etwas schneller als ChromaDB. Qdrant ist ebenfalls möglich.

**Q: Wo bekomme ich Markdown-Dateien für Legal RAG?**  
A: Optionen:

- Eigene `.md`-Dateien mit kurzen Normauszügen oder didaktischen Fallbeispielen erstellen
- Frei zugängliche Gesetzestexte in kleine Auszüge übertragen
- Eigene Zusammenfassungen öffentlich verfügbarer Entscheidungen schreiben
- `markitdown` für die Konvertierung eigener PDF- oder DOCX-Materialien nutzen

**Q: Mein Colab-Notebook stürzt beim Gradio-Launch ab**  
A: Häufige Ursachen:

- RAM-Limit erreicht -> Runtime -> Factory reset runtime
- Firewall blockiert Share-Link -> `share=False` für lokalen Zugriff testen
- Alte Gradio-Version -> `!pip install --upgrade gradio`

**Q: Kann ich die Übung auch lokal ohne Colab machen?**  
A: Ja. Dann lokal mit Jupyter Notebook oder JupyterLab arbeiten und Folgendes ersetzen:

- `from google.colab import userdata` -> `from dotenv import load_dotenv`
- `files.upload()` -> lokale File-Pfade
- `share=True` -> optional für Gradio

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [KI-Challenge](./ki-challenge.html) | Wie wird aus einem offenen Kursprojekt ein bewertbares End-to-End-System? |
| [RAG-Konzepte](../05-prompting-rag/rag-konzepte.html) | Welche Retrieval-Entscheidungen liegen unter dem Workshop? |
| [Evaluation & Observability](../07-qualitaet-sicherheit/evaluation-observability.html) | Wie wird die Qualität einer RAG-Anwendung überprüfbar? |

---

**Version:** 3.0<br>
**Stand:** Juni 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
