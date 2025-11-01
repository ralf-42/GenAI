# genai_lib

Python-Bibliothek mit wiederverwendbaren Modulen für den Generative AI Kurs. Optimiert für Google Colab und Jupyter Notebooks.

## 📦 Installation

```bash
# Mit pip
pip install git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul

# Mit uv (empfohlen für Google Colab)
uv pip install --system git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul
```

## 📚 Module

### `utilities.py`
Hilfsfunktionen für Notebook-Setup und Konfiguration.

**Hauptfunktionen:**
- `check_environment()` - Zeigt Python-, LangChain- und LangGraph-Versionen
- `setup_api_keys()` - Interaktive API-Key-Verwaltung (OpenAI, Hugging Face)
- `install_packages()` - Installation von Python-Paketen mit Fortschrittsanzeige
- `mprint()` - Formatierte Markdown-Ausgabe in Notebooks
- `get_ipinfo()` - Zeigt IP-Adresse und Standort (nützlich für Colab)
- `load_chat_prompt_template()` - Lädt Prompt-Templates von GitHub/lokal

**Beispiel:**
```python
from genai_lib.utilities import setup_api_keys, check_environment

setup_api_keys(['OPENAI_API_KEY'])
check_environment()
```

---

### `multimodal_rag.py`
Multimodales RAG-System für Text- und Bilddokumente mit ChromaDB und CLIP.

**Architektur:**
- **RAGConfig** - Zentrale Konfiguration (Modelle, Chunk-Größe, Thresholds)
- **RAGComponents** - Container für LLM, Embeddings, CLIP-Model, Vektordatenbank

**Hauptfunktionen:**

#### Initialisierung & Datenverarbeitung
- `init_rag_system()` - RAG-System initialisieren
- `process_directory()` - Bulk-Import von Dateien (TXT, PDF, DOCX, Bilder)
- `add_text_document()` - Einzelnes Textdokument hinzufügen
- `add_image_with_description()` - Bild mit automatischer Beschreibung (GPT-4o-mini Vision)

#### Suchfunktionen
- `search_texts()` - Text → Text (inkl. Bildbeschreibungen)
- `search_images()` - Text → Bild (CLIP-basiert)
- `search_similar_images()` - Bild → Bild (visuelle Ähnlichkeit)
- `search_text_by_image()` - Bild → Text (Cross-Modal)
- `multimodal_search()` - Erweiterte Suche mit LLM-Zusammenfassung

#### Verwaltung
- `get_system_status()` - Zeigt Anzahl gespeicherter Dokumente/Bilder
- `cleanup_database()` - Vektordatenbank löschen

**Modalitäten:**

| Eingabe | Ausgabe | Funktion | Status |
|---------|---------|----------|--------|
| Text | Text | `search_texts()` | ✅ |
| Text | Bild | `search_images()` | ✅ |
| Bild | Text | `search_text_by_image()` | ✅ |
| Bild | Bild | `search_similar_images()` | ✅ |
| Text | Text+Bild | `multimodal_search()` | ✅ |

**Beispiel:**
```python
from genai_lib.multimodal_rag import init_rag_system, process_directory, multimodal_search

# Initialisierung
rag = init_rag_system()

# Dokumente laden
process_directory(rag, './my_files', auto_describe_images=True)

# Suche
result = multimodal_search(rag, "Was sind Cyborgs?")
print(result)
```

---

### `mcp_modul.py`
Model Context Protocol (MCP) - Client-Server-Integration für erweiterte Tool-Nutzung.

**Hauptfunktionen:**

#### Server-Verwaltung
- `connect_to_server()` - Verbindung zu MCP-Server herstellen
- `disconnect_server()` - Server-Verbindung trennen
- `list_connected_servers()` - Zeigt alle aktiven Server

#### Tool-Management
- `register_new_tool()` - Neues Tool registrieren
- `get_available_tools()` - Verfügbare Tools aller Server
- `get_tool_details()` - Details zu spezifischem Tool

#### OpenAI-Integration
- `setup_assistant_mcp_connection()` - MCP-Server für OpenAI Assistant
- `create_openai_messages()` - Nachrichten für OpenAI mit Tool-Context
- `get_openai_client()` - OpenAI Client mit MCP-Unterstützung

#### Utility
- `get_server_info()` - Server-Informationen
- `get_client_status()` - Client-Status
- `get_module_info()` - Modul-Version und Konfiguration

**Beispiel:**
```python
from genai_lib.mcp_modul import connect_to_server, get_available_tools

# Server verbinden
connect_to_server("filesystem", filesystem_handler)

# Tools anzeigen
tools = get_available_tools()
print(tools)
```

---

## 🔧 Abhängigkeiten

### LangChain Stack (>=1.0.0)
- `langchain` - Core Framework
- `langchain-openai` - OpenAI Integration
- `langchain-community` - Community-Tools
- `langchain-chroma` - ChromaDB Integration

### Multimodal
- `chromadb>=0.5.0` - Vektordatenbank
- `sentence-transformers>=3.0.0` - CLIP für Bild-Embeddings
- `pillow>=10.0.0` - Bildverarbeitung
- `markitdown` - Dokumentenkonvertierung

### Utilities
- `requests>=2.31.0` - HTTP-Requests
- `python-dotenv>=1.0.0` - Umgebungsvariablen

## 📖 Dokumentation

Vollständige Beispiele und Tutorials finden Sie in den Kursmodulen:
- **M04**: LangChain 101
- **M08a**: RAG mit LangChain
- **M14**: Multimodales RAG
- **M17**: Model Context Protocol

## ⚖️ Lizenz

MIT License - Copyright (c) 2025 Ralf

---

**Version:** 2.1.0
**Letzte Aktualisierung:** Januar 2025
