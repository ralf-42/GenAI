# genai_lib

Python-Bibliothek mit wiederverwendbaren Modulen für den Generative AI Kurs. Optimiert für Google Colab und Jupyter Notebooks.

## Installation

```bash
# Mit pip
pip install git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul

# Mit uv (empfohlen für Google Colab)
uv pip install --system git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul
```

## Module

### utilities.py
Hilfsfunktionen für Notebook-Setup:
- `check_environment()` - Python-, LangChain- und LangGraph-Versionen
- `setup_api_keys()` - API-Key-Verwaltung
- `install_packages()` - Package-Installation
- `mprint()` - Markdown-Ausgabe
- `get_ipinfo()` - IP und Standort

### multimodal_rag.py
Multimodales RAG-System (Text + Bilder):
- `init_rag_system()` - Initialisierung
- `process_directory()` - Dateien laden
- `search_texts()` - Text → Text
- `search_images()` - Text → Bild
- `search_similar_images()` - Bild → Bild
- `search_text_by_image()` - Bild → Text
- `multimodal_search()` - Erweiterte Suche

### mcp_modul.py
Model Context Protocol (MCP):
- `connect_to_server()` - Server-Verbindung
- `get_available_tools()` - Tool-Liste
- `setup_assistant_mcp_connection()` - OpenAI Integration

## Abhängigkeiten

- LangChain >= 1.0.0
- LangGraph >= 0.2.0
- ChromaDB >= 0.5.0
- Sentence Transformers >= 3.0.0

## Dokumentation

Vollständige Dokumentation: [genai_lib/README.md](./genai_lib/README.md)

Beispiele in Kursmodulen:
- M04 - LangChain 101
- M08a - RAG mit LangChain
- M14 - Multimodales RAG
- M17 - Model Context Protocol

## Lizenz

MIT License - Copyright (c) 2025 Ralf
