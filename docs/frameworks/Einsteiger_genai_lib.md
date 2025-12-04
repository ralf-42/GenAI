---
layout: default
title: GenAI_Lib Einsteiger
parent: Frameworks
nav_order: 5
description: Projektspezifische Python-Bibliothek für Kursanwendungen
permalink: /frameworks/genai_lib/
---

# GenAI_Lib - Projektspezifische Bibliothek
{: .no_toc }

> **Projektspezifische Bibliothek für den Kurs Generative KI**

---

Die `genai_lib` ist eine projektspezifische Python-Bibliothek, die speziell für die Anforderungen dieses Kurses entwickelt wurde. Sie bündelt wichtige Funktionen für multimodale RAG-Systeme, MCP-Integration und allgemeine Hilfsfunktionen.

## Inhalt
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Installation

Die `genai_lib` kann direkt aus dem GitHub-Repository installiert werden:

```bash
# Mit pip
pip install git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul

# Mit uv (empfohlen für Google Colab)
uv pip install --system git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul
```

## Module im Überblick

Die Bibliothek besteht aus drei Hauptmodulen:

| Modul | Beschreibung | Hauptfunktionen |
|-------|-------------|----------------|
| **utilities.py** | Hilfsfunktionen für Environment-Setup | Environment-Checks, Paket-Installation, API-Keys, Prompt-Templates, LLM-Response-Parsing |
| **multimodal_rag.py** | Multimodales RAG-System | Text- und Bildsuche, Bild-zu-Bild-Suche, Bild-zu-Text-Suche |
| **mcp_modul.py** | Model Context Protocol | MCP-Server, MCP-Client, AI-Assistant mit MCP-Tools |

---

## utilities.py - Hilfsfunktionen

### Überblick

Das `utilities`-Modul stellt grundlegende Hilfsfunktionen bereit, die in vielen Notebooks und Projekten wiederkehrend benötigt werden.

### Hauptfunktionen

#### 1. `check_environment()`

Überprüft die Entwicklungsumgebung und zeigt installierte Pakete an.

```python
from genai_lib.utilities import check_environment

check_environment()
```

**Ausgabe:**
- Python-Version
- Alle installierten LangChain-Bibliotheken
- Unterdrückt automatisch Deprecation-Warnungen

#### 2. `install_packages(packages)`

Installiert Python-Pakete automatisch, wenn sie noch nicht verfügbar sind.

```python
from genai_lib.utilities import install_packages

# Einfache Installation
install_packages(['numpy', 'pandas'])

# Mit separaten Install- und Import-Namen
install_packages([
    ('markitdown[all]', 'markitdown'),
    'langchain_chroma'
])
```

**Features:**
- Prüft, ob Pakete bereits installiert sind
- Verwendet `uv pip install` für schnelle Installation in Google Colab
- Gibt klare Statusmeldungen (✅ ✗ 🔄)
- Unterstützt Tupel für verschiedene Install- und Import-Namen

#### 3. `setup_api_keys(key_names, create_globals=True)`

Lädt API-Keys aus Google Colab userdata und setzt sie als Umgebungsvariablen.

```python
from genai_lib.utilities import setup_api_keys

# Mit globalen Variablen (Standardverhalten)
setup_api_keys([
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "HF_TOKEN"
])

# Nur Umgebungsvariablen (keine globalen Variablen)
setup_api_keys(["OPENAI_API_KEY"], create_globals=False)
```

**Features:**
- Lädt Keys sicher aus Google Colab Secrets
- Erstellt optional globale Variablen für einfachen Zugriff
- Gibt Statusmeldungen für jeden Key aus
- Verhindert unbeabsichtigte Sichtbarkeit durch Return-Werte

#### 4. `get_ipinfo()`

Zeigt Geoinformationen zur aktuellen IP-Adresse an.

```python
from genai_lib.utilities import get_ipinfo

get_ipinfo()
```

**Ausgabe:**
- IP-Adresse
- Stadt, Region, Land
- Provider
- Koordinaten, Postleitzahl, Zeitzone

#### 5. `mprint(text)`

Gibt Markdown-formatierten Text in Jupyter Notebooks aus.

```python
from genai_lib.utilities import mprint

mprint("# Überschrift\n**Fett** und *kursiv*")
```

#### 6. `mermaid(code, width=None, height=None)`

Rendert Mermaid-Diagramme direkt im Notebook mit anpassbarer Größe.

```python
from genai_lib.utilities import mermaid

# Standard (automatische Größe)
mermaid('''
graph TD
    A[Start] --> B[Process]
    B --> C[End]
''')

# Mit angepasster Größe
mermaid('''
sequenceDiagram
    User->>Agent: Frage stellen
    Agent->>LLM: Query senden
    LLM-->>Agent: Antwort
    Agent-->>User: Ergebnis
''', width=800, height=600)
```

**Parameter:**
- `code` (str): Mermaid-Code für das Diagramm
- `width` (int, optional): Breite in Pixeln
- `height` (int, optional): Höhe in Pixeln

**Unterstützte Diagrammtypen:**
- Flowcharts (`graph TD`, `graph LR`)
- Sequenzdiagramme (`sequenceDiagram`)
- Gantt-Charts (`gantt`)
- State Machines (`stateDiagram`)

**Features:**
- Automatische oder manuelle Größenkontrolle
- Robuste Fehlerbehandlung mit aussagekräftigen Fehlermeldungen
- Timeout-Schutz (15 Sekunden)

#### 7. `load_chat_prompt_template(path)`

Lädt Prompt-Templates aus Python-Dateien.

```python
from genai_lib.utilities import load_chat_prompt_template

# Lokal
prompt = load_chat_prompt_template('05_prompt/qa_prompt.py')

# Von GitHub (tree oder blob URLs werden automatisch konvertiert)
prompt = load_chat_prompt_template(
    'https://github.com/ralf-42/GenAI/blob/main/05_prompt/text_zusammenfassung.py'
)

# Oder mit tree-URL
prompt = load_chat_prompt_template(
    'https://github.com/user/repo/tree/main/prompts/qa_prompt.py'
)
```

**Template-Format (qa_prompt.py):**
```python
messages = [
    ("system", "{system_prompt}"),
    ("human", "Question: {question}\n\nContext: {context}\n\nAnswer:")
]
```

#### 8. `extract_thinking(response)` 🆕

Universeller Parser für verschiedene Thinking-Formate von LLMs. Extrahiert den Denkprozess und die eigentliche Antwort aus unterschiedlichen Response-Strukturen.

```python
from genai_lib.utilities import extract_thinking

# Response von beliebigem LLM
response = llm.invoke("Erkläre Schritt für Schritt, was 2+2 ergibt")

# Universeller Parser für alle Formate
thinking, answer = extract_thinking(response)

print(f"Denkprozess: {thinking[:200]}...")
print(f"Antwort: {answer}")
```

**Unterstützte Formate:**

| Provider/Modell | Format | Beispiel |
|-----------------|--------|----------|
| Claude (Extended Thinking) | Liste mit `{"type": "thinking"}` Blöcken | `content = [{"type": "thinking", "thinking": "..."}]` |
| Gemini | Liste mit `{"type": "thinking"}` Blöcken | `content = [{"type": "thinking", "thinking": "..."}]` |
| Qwen3, DeepSeek R1 | String mit `<think>` Tags | `"<think>Denkprozess</think>Antwort"` |
| DeepSeek | `additional_kwargs["reasoning_content"]` | Separates Feld im Response |

**Rückgabe:**
- `thinking` (str): Extrahierter Denkprozess (leer, wenn nicht vorhanden)
- `answer` (str): Eigentliche Antwort

**Features:**
- Provider-agnostisch: Ein Parser für alle LLMs
- Fallback-Logik: Prüft automatisch alle bekannten Formate
- Robust: Gibt leeren Thinking-String zurück, wenn kein Denkprozess vorhanden

#### 9. `get_model_profile(model, temperature=0.0, print_profile=True, **kwargs)` 🆕

Ruft Model-Profile von models.dev ab und zeigt die wichtigsten Capabilities eines LLM-Modells. Nutzt intern `init_chat_model()` und gibt detaillierte Informationen über Structured Output, Function Calling, Vision, Token-Limits, etc. zurück.

```python
from genai_lib.utilities import get_model_profile

# Formatierte Ausgabe aller wichtigen Capabilities
profile = get_model_profile("openai:gpt-4o-mini")

# Output:
# 🔍 Model Profile: openai:gpt-4o-mini
# ============================================================
#
# 📋 Core Capabilities:
#   ✓ Structured Output:  True
#   ✓ Function Calling:   True
#   ✓ JSON Mode:          True
#   ✓ Reasoning:          False
#
# 🎨 Multimodal Capabilities:
#   ✓ Input:  📝 Text, 🖼️ Image
#   ✓ Output: 📝 Text
#
# 📊 Token Limits:
#   ✓ Max Input Tokens:   128000
#   ✓ Max Output Tokens:  16384
#
# ⚙️ Model Configuration:
#   ✓ Temperature:        Yes
#   ✓ Knowledge Cutoff:   2023-10
#
# 🔧 Additional Features:
#   ✓ Streaming:          True
#   ✓ Async:              True
# ============================================================

# Ohne Ausgabe (nur Profile-Dict zurückgeben)
profile = get_model_profile("anthropic:claude-3-sonnet", print_profile=False)

# Verschiedene Models vergleichen
for model in ["openai:gpt-4o-mini", "anthropic:claude-3-sonnet", "google:gemini-pro"]:
    print(f"\n{model}:")
    profile = get_model_profile(model, print_profile=False)
    print(f"  Context: {profile['max_input_tokens']} tokens")
    print(f"  Vision: {profile['image_inputs']}")
    print(f"  Reasoning: {profile.get('reasoning', False)}")
    print(f"  Knowledge: {profile.get('knowledge_cutoff', 'N/A')}")
```

**Parameter:**
- `model` (str): Model-Name im Format "provider:model"
- `temperature` (float): Temperatur-Einstellung (Standard: 0.0)
- `print_profile` (bool): Formatierte Ausgabe aktivieren (Standard: True)
- `**kwargs`: Zusätzliche Parameter für `init_chat_model()` (z.B. max_tokens)

**Rückgabe:**
- `dict`: Vollständiges Model-Profile mit allen Capabilities

**Profile-Attribute (Auswahl):**

**Core Capabilities:**
- `structured_output`: Native Structured Output API
- `tool_calling`: Function Calling Support
- `supports_json_mode`: JSON Mode Support
- `reasoning`: Extended Thinking/Reasoning Support

**Multimodal Input:**
- `text_inputs`: Text Input (Standard) - Anzeige: 📝 Text
- `image_inputs`: Bild Input (Vision) - Anzeige: 🖼️ Image
- `audio_inputs`: Audio Input Support - Anzeige: 🎵 Audio
- `video_inputs`: Video Input Support - Anzeige: 🎬 Video

**Multimodal Output:**
- `text_outputs`: Text Output (Standard) - Anzeige: 📝 Text
- `image_outputs`: Bild-Generierung - Anzeige: 🖼️ Image
- `audio_outputs`: Audio-Generierung (TTS) - Anzeige: 🎵 Audio
- `video_outputs`: Video-Generierung - Anzeige: 🎬 Video

**Token Limits:**
- `max_input_tokens`: Context Window Größe
- `max_output_tokens`: Max. Output-Länge

**Model Configuration:**
- `temperature`: Temperature-Parameter Support
- `knowledge_cutoff`: Knowledge Cutoff Date

**Additional Features:**
- `streaming`: Streaming Support
- `async_capable`: Async Support

**Features:**
- Quelle: models.dev (Open-Source Model-Index)
- Automatische Capability-Detection
- Formatierte Übersicht mit Symbolen (📝🖼️🎵🎬) oder Raw-Dict
- Reasoning/Thinking Support Detection
- Temperature-Support-Check
- Knowledge Cutoff Date
- Perfekt für Modellvergleiche in Notebooks

**Use Cases:**
- Modell-Fähigkeiten vor Verwendung prüfen (Reasoning, Vision, Audio, etc.)
- Verschiedene LLMs vergleichen (Context Window, Multimodal, Knowledge)
- Feature-Gates in Code (z.B. "nur wenn Vision verfügbar")
- Reasoning-Modelle identifizieren (Claude Extended Thinking, DeepSeek R1)
- Temperature-Unterstützung prüfen
- Debugging und Dokumentation

---

## multimodal_rag.py - Multimodales RAG

### Überblick

Das `multimodal_rag`-Modul implementiert ein vollständiges RAG-System mit Unterstützung für Text- und Bilddokumente. Es kombiniert OpenAI-Embeddings für Text und CLIP-Embeddings für Bilder.

### Architektur

```
multimodal_rag
├── Text-Pipeline: OpenAI Embeddings + ChromaDB
├── Bild-Pipeline: CLIP Embeddings + ChromaDB
├── Vision-LLM: GPT-4o-mini für Bildbeschreibungen
└── Hybride Suche: Text ↔ Bild ↔ Bild
```

### Hauptfunktionen

#### 1. `init_rag_system(config=None)`

Initialisiert das vollständige RAG-System.

```python
from genai_lib.multimodal_rag import init_rag_system, RAGConfig

# Mit Standard-Konfiguration
rag = init_rag_system()

# Mit eigener Konfiguration
config = RAGConfig(
    chunk_size=300,
    chunk_overlap=50,
    clip_model='clip-ViT-B-32',
    llm_model='gpt-4o-mini',
    db_path='./my_rag_db'
)
rag = init_rag_system(config)
```

**Was wird initialisiert:**
- OpenAI Text-Embeddings
- CLIP-Modell für Bild-Embeddings
- GPT-4o-mini für Text und Vision
- ChromaDB mit zwei Collections (texts, images)
- MarkItDown für Dokumentenkonvertierung

#### 2. `process_directory(rag, directory_path, auto_describe_images=True)`

Verarbeitet ein Verzeichnis mit Text- und Bilddateien.

```python
from genai_lib.multimodal_rag import process_directory

# Verzeichnis mit automatischen Bildbeschreibungen
process_directory(rag, './files', auto_describe_images=True)

# Ohne Bildbeschreibungen (nur CLIP-Embeddings)
process_directory(rag, './files', auto_describe_images=False)
```

**Unterstützte Dateitypen:**
- **Text:** `.txt`, `.md`, `.pdf`, `.docx`, `.pptx`, `.xlsx`
- **Bilder:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`

**Features:**
- Automatische Dokumentenkonvertierung mit MarkItDown
- Text-Chunking mit RecursiveCharacterTextSplitter
- Automatische Bildbeschreibung mit GPT-4o-mini
- CLIP-Embeddings für Bilder
- Fortschrittsanzeige

#### 3. `multimodal_search(rag, query, k=5, text_only=False, images_only=False)`

Durchsucht Text und Bilder gleichzeitig.

```python
from genai_lib.multimodal_rag import multimodal_search

# Hybride Suche (Text + Bilder)
results = multimodal_search(rag, "Roboter mit KI", k=5)

# Nur Text
text_results = multimodal_search(rag, "Maschinelles Lernen", text_only=True)

# Nur Bilder
image_results = multimodal_search(rag, "rote Autos", images_only=True)
```

**Rückgabe:**
- `text_docs`: Liste von LangChain Documents mit Text-Chunks
- `image_results`: Liste von Dictionaries mit Bildpfaden und Metadaten

#### 4. `search_similar_images(rag, image_path, k=5)`

Findet ähnliche Bilder zu einem Query-Bild (Bild → Bild Suche).

```python
from genai_lib.multimodal_rag import search_similar_images

# Ähnliche Bilder finden
similar = search_similar_images(rag, "./query_image.jpg", k=5)

for img in similar:
    print(f"Ähnlichkeit: {img['similarity']:.2f}")
    print(f"Pfad: {img['image_path']}")
```

**Use Cases:**
- Duplikate finden
- Ähnliche Produkte vorschlagen
- Bildkategorisierung

#### 5. `search_text_by_image(rag, image_path, k=3)`

Findet Textdokumente, die zum Bildinhalt passen (Bild → Text Suche).

```python
from genai_lib.multimodal_rag import search_text_by_image

# Passende Texte zu einem Bild finden
texts = search_text_by_image(rag, "./product_image.jpg", k=3)

for doc in texts:
    print(doc.page_content)
```

**Use Cases:**
- Produktbeschreibungen zu Bildern finden
- Dokumentation zu Screenshots suchen
- Bild-Text-Verknüpfung in Datenbanken

#### 6. `generate_rag_answer(rag, query, k=3)`

Generiert eine Antwort basierend auf gefundenen Dokumenten.

```python
from genai_lib.multimodal_rag import generate_rag_answer

answer = generate_rag_answer(rag, "Was ist ein Transformer?", k=3)
print(answer)
```

**Features:**
- Kombiniert Text- und Bildkontext
- Verwendet GPT-4o-mini für Antwortgenerierung
- Zeigt Quellendokumente an

### Vollständiges Beispiel

```python
from genai_lib.multimodal_rag import (
    init_rag_system,
    process_directory,
    multimodal_search,
    generate_rag_answer
)

# 1. System initialisieren
rag = init_rag_system()

# 2. Dokumente verarbeiten
process_directory(rag, './knowledge_base', auto_describe_images=True)

# 3. Suche durchführen
results = multimodal_search(rag, "Neuronale Netze", k=5)

# 4. Antwort generieren
answer = generate_rag_answer(rag, "Erkläre Neuronale Netze")
print(answer)
```

---

## mcp_modul.py - Model Context Protocol

### Überblick

Das `mcp_modul` implementiert das **Model Context Protocol (MCP)** - einen Standard für die Kommunikation zwischen LLMs und externen Tools/Datenquellen.

### Architektur

```
MCP-Architektur
├── Server: Stellt Tools bereit (read_file, write_file, list_files, etc.)
├── Client: Verbindet sich mit Servern und ruft Tools auf
└── AI-Assistant: LLM mit MCP-Tool-Integration
```

### Hauptfunktionen

#### 1. MCP-Server

##### `handle_mcp_request(method, params=None)`

Verarbeitet MCP-Anfragen.

```python
from genai_lib.mcp_modul import handle_mcp_request

# Server-Info abrufen
response = handle_mcp_request("initialize")

# Tool aufrufen
response = handle_mcp_request("tools/call", {
    "name": "read_file",
    "arguments": {"filepath": "test.txt"}
})
```

##### `get_server_info()`

Gibt Server-Konfiguration zurück.

```python
from genai_lib.mcp_modul import get_server_info

info = get_server_info()
print(info)
```

#### 2. MCP-Client

##### `setup_full_connection(server_name="file-server")`

Verbindet Client mit MCP-Server.

```python
from genai_lib.mcp_modul import setup_full_connection, call_server_tool

# 1. Verbindung aufbauen
setup_full_connection("file-server")

# 2. Tool aufrufen
result = call_server_tool("read_file", {"filepath": "example.txt"})
print(result)
```

##### `call_server_tool(tool_name, arguments=None, server_name="file-server")`

Ruft ein Server-Tool auf.

```python
from genai_lib.mcp_modul import call_server_tool

# Datei lesen
content = call_server_tool("read_file", {
    "filepath": "data.txt"
})

# Datei schreiben
call_server_tool("write_file", {
    "filepath": "output.txt",
    "content": "Hello World"
})

# Verzeichnis auflisten
files = call_server_tool("list_files", {
    "directory": "./data"
})
```

#### 3. AI-Assistant mit MCP

##### `setup_assistant_mcp_connection(server_name="file-server", api_key=None)`

Initialisiert AI-Assistant mit MCP-Verbindung.

```python
from genai_lib.mcp_modul import (
    setup_assistant_mcp_connection,
    process_user_query
)

# 1. Assistant verbinden
setup_assistant_mcp_connection("file-server")

# 2. Anfrage verarbeiten
response = process_user_query("Lies die Datei config.json und zeige den Inhalt")
print(response)
```

##### `process_user_query(user_input, debug=False)`

Verarbeitet Benutzeranfragen mit automatischer Tool-Verwendung.

```python
from genai_lib.mcp_modul import process_user_query

# Einfache Anfrage
response = process_user_query("Liste alle Dateien im Verzeichnis ./data auf")

# Mit Debug-Ausgabe
response = process_user_query(
    "Erstelle eine Zusammenfassung aller .txt-Dateien",
    debug=True
)
```

### Verfügbare MCP-Tools

| Tool | Beschreibung | Parameter |
|------|-------------|-----------|
| `read_file` | Liest Dateiinhalt | `filepath` (str) |
| `write_file` | Schreibt in Datei | `filepath` (str), `content` (str) |
| `list_files` | Listet Verzeichnis | `directory` (str, optional) |
| `get_system_info` | System-Informationen | - |

### Vollständiges Beispiel

```python
from genai_lib.mcp_modul import (
    setup_full_connection,
    setup_assistant_mcp_connection,
    process_user_query,
    call_server_tool
)

# 1. Direkte Tool-Nutzung (ohne LLM)
setup_full_connection("file-server")
files = call_server_tool("list_files", {"directory": "./"})
print("Gefundene Dateien:", files)

# 2. AI-Assistant mit automatischer Tool-Verwendung
setup_assistant_mcp_connection("file-server")

# Assistant kann jetzt selbstständig Tools nutzen
response = process_user_query(
    "Lies alle .txt-Dateien und erstelle eine Zusammenfassung"
)
print(response)
```

---

## Best Practices

### 1. Environment-Setup in Notebooks

```python
from genai_lib.utilities import check_environment, setup_api_keys, install_packages

# 1. Environment checken
check_environment()

# 2. Pakete installieren
install_packages([
    'langchain',
    'langchain-openai',
    ('markitdown[all]', 'markitdown')
])

# 3. API-Keys setzen
setup_api_keys(["OPENAI_API_KEY"])
```

### 2. Multimodales RAG-System

```python
from genai_lib.multimodal_rag import (
    init_rag_system,
    RAGConfig,
    process_directory,
    multimodal_search
)

# Custom Konfiguration für große Dokumente
config = RAGConfig(
    chunk_size=500,
    chunk_overlap=100,
    text_threshold=1.0,
    db_path='./projekt_rag'
)

rag = init_rag_system(config)
process_directory(rag, './docs', auto_describe_images=True)
```

### 3. MCP-Integration

```python
from genai_lib.mcp_modul import (
    setup_assistant_mcp_connection,
    process_user_query
)

# Assistant mit File-Access
setup_assistant_mcp_connection("file-server")

# Multi-Step-Operationen
response = process_user_query("""
    1. Liste alle .pdf-Dateien
    2. Lies die erste Datei
    3. Erstelle eine Zusammenfassung
""")
```

---

## Abhängigkeiten

### Kern-Abhängigkeiten
```python
# LangChain Stack
langchain>=1.0.0
langchain-core>=1.0.0
langchain-openai>=0.2.0
langchain-community>=0.3.0
langchain-chroma>=0.1.0

# OpenAI
openai>=1.0.0

# Multimodal
sentence-transformers>=3.0.0
pillow>=10.0.0
markitdown>=0.0.1

# Vektordatenbank
chromadb>=0.5.0

# Utilities
python-dotenv>=1.0.0
requests>=2.31.0
```

---

## Ressourcen

- **GitHub Repository**: [ralf-42/GenAI](https://github.com/ralf-42/GenAI)
- **Installationsordner**: `04_modul/genai_lib/`
- **Beispiel-Notebooks**: Siehe Kursmodule M08-M18

---

## Lizenz

MIT License - Copyright (c) 2025 Ralf

Die Module stehen unter der MIT-Lizenz und können frei für eigene Projekte verwendet werden.


---

**Version:** 1.2
**Stand:** Dezember 2025
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.

**Changelog v1.2:**
- 🆕 `get_model_profile()` - Abruf von Model-Capabilities von models.dev
  - Core Capabilities: Structured Output, Function Calling, JSON Mode, **Reasoning**
  - Multimodal: Vereinfachte Anzeige mit Symbolen (📝 Text, 🖼️ Image, 🎵 Audio, 🎬 Video)
  - Model Configuration: **Temperature Support**, **Knowledge Cutoff**
  - Token Limits, Streaming, Async

**Changelog v1.1:**
- 🆕 `extract_thinking()` - Universeller Parser für LLM-Thinking-Formate (Claude, Gemini, Qwen3, DeepSeek)     

