# Generative KI Kurs

[![LangChain 1.2+ Compliant](https://img.shields.io/badge/LangChain-1.2%2B%20Compliant-brightgreen)](./LangChain_Audit_Report_2025-12-17.md)
[![Code Quality](https://img.shields.io/badge/Compliance-100%25-success)](./LangChain_Audit_Report_2025-12-17.md)
[![Last Audit](https://img.shields.io/badge/Last%20Audit-2025--12--17-blue)](./LangChain_Audit_Report_2025-12-17.md)
[![Python](https://img.shields.io/badge/Python-3.11%2B-blue)](https://www.python.org/)

Ein deutschsprachiger, praxisorientierter Kurs zu Generative-AI-Technologien mit Fokus auf OpenAI GPT-Modelle, LangChain, LangGraph, RAG-Systeme und multimodale Anwendungen.


## 🎯 Zielgruppe

- Entwickler:innen mit Python-Grundkenntnissen
- IT-Fachkräfte, die KI-Technologien integrieren möchten
- Technikbegeisterte mit guter Programmiererfahrung


## 📁 Projektstruktur

```
GenAI/
├── 01_notebook/    # Jupyter Notebooks (Kursmaterialien)
├── 02_daten/       # Trainingsdaten und Beispieldateien
├── 03_skript/      # Ergänzende Unterlagen zum Kurs
├── 04_modul/       # Python-Module und Bibliotheken
└── 05_prompt/      # Prompt-Templates (Markdown-Format)
```

## 🛠️ Technologie-Stack

### Kernframeworks
- **OpenAI API** (>=1.0.0) - GPT-Modelle, Embeddings und multimodale APIs
- **LangChain** (>=1.0.0) - Orchestrierung, Chains, Agents und RAG
- **LangGraph** (>=1.0.0) - zustandsbasierte Workflows und Multi-Agent-Systeme
- **Hugging Face** - Transformers und Community-Modelle

### Spezialisierte Tools
- **ChromaDB** (>=0.5.0) - Vektordatenbank für RAG-Systeme
- **Sentence Transformers** (>=3.0.0) - CLIP für multimodale Embeddings
- **Gradio** (>=3.x) - UI-Entwicklung für KI-Apps
- **Ollama** - Lokale Open-Source-Modelle
- **genai_lib** (eigene Module in `04_modul/genai_lib/`) - Projektspezifische Bibliothek für Kursanwendungen
  - **multimodal_rag.py** - Multimodales RAG-System mit Bild-zu-Bild und Bild-zu-Text Suche
  - **utilities.py** - Hilfsfunktionen für Environment-Checks, Paket-Installation, API-Keys, Prompt-Templates, Model-Profiles (`get_model_profile()`) und LLM-Response-Parsing (`extract_thinking()`)

### LangChain/LangGraph Standards

Neue und überarbeitete Notebooks folgen den lokalen Standards-Dateien:

- [LangChain_Standards.md](./LangChain_Standards.md) - verbindliche Patterns für Models, Tools, Chains, Agents und strukturierte Ausgaben
- [LangGraph_Standards.md](./LangGraph_Standards.md) - verbindliche Patterns für StateGraph, Routing, Checkpointing und Human-in-the-Loop
- [LangSmith_Standards.md](./LangSmith_Standards.md) - verbindliche Patterns für Tracing, Evaluation und Monitoring

Die übergreifenden Dokumente in `../_docs/` liefern zusätzliche Erläuterungen, Templates und Best Practices. Für konkrete Änderungen in diesem Repository sind die lokalen `*_Standards.md` Dateien maßgeblich.

Pflicht-Patterns für LangChain 1.0+:

- `init_chat_model()` statt direkter Provider-Klassen
- `with_structured_output()` statt Parser-Workarounds für strukturierte LLM-Ausgaben
- `@tool` statt manueller Tool-Wrapper
- `create_agent()` für einfache Agenten
- `StateGraph` für komplexe, verzweigte oder langlebige Workflows
- LCEL `|` Chains statt veralteter Chain-Klassen
- Standard Message Content Blocks für multimodale Inhalte

Für einfache Agenten-Beispiele reicht `create_agent()`. `create_react_agent()` oder ein eigener `StateGraph` werden genutzt, wenn das Notebook explizit LangGraph-Verhalten, Routing, Checkpointing oder Multi-Agent-Workflows zeigt.

### Modell-Auswahl

Die Modellwahl richtet sich nach der Rolle im Workflow:

| Rolle | Standardmodell | Hinweis |
|-------|----------------|---------|
| Router, Supervisor, Conditional Edge | `o3` oder `o3-mini` | kein `temperature` |
| Judge, Evaluator | `o3` | kein `temperature` |
| Worker, Content, RAG-Synthese, Code | `gpt-5.1` | `temperature` nur mit `reasoning_effort="none"` |
| Grundlagen-Demo, einfache Chain | `gpt-4o-mini` | `temperature=0.0` möglich |


## 📚 Kursmodule

### Basismodule (M00-M12)
| Modul | Thema | Beschreibung |
|-------|-------|-------------|
| M00 | Kurs Intro | Kursübersicht und Setup |
| M01 | GenAI Intro | Grundlagen Generative AI |
| M02 | Modellsteuerung | Prompting, Context Engineering |
| M03 | Codieren mit GenAI | KI-gestütztes Programmieren |
| M04 | LangChain 101 | Framework-Grundlagen |
| M05 | LLM & Transformer | Architektur und Foundation Models |
| M06 | Chat & Memory | Konversations-Management |
| M07 | Output Parser | Strukturierte Ausgaben |
| M08 | RAG LangChain | Retrieval Augmented Generation |
| M09 | Multimodal Bild | Bildgenerierung und -verarbeitung |
| M10 | Agents | KI-Agenten und Multi-Agent-Systeme |
| M11 | Gradio | UI-Entwicklung |
| M12 | Lokale Modelle | Ollama, Open Source |

### Erweiterte Module (M13-M18)
- **M13**: SQL RAG - Datenbank-Integration
- **M14**: Multimodal RAG - Text & Bild kombiniert
- **M15**: Multimodal Audio - Speech-to-Text, TTS
- **M16**: Multimodal Video - Video-Analyse
- **M17**: MCP - Model Context Protocol
- **M18**: Fine-Tuning - Modell-Anpassung

## 🔑 Voraussetzungen

- Python 3.11+
- Google Colab Account
- OpenAI API Key (ca. 5 EUR für gesamten Kurs)
- Hugging Face Account (kostenlos)

## 📦 Installation

Das `genai_lib` Modul kann direkt aus diesem Repository installiert werden:

```bash
# Mit pip
pip install git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul

# Mit uv (empfohlen für Google Colab)
uv pip install --system git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul
```

## 💡 Nutzung

Alle Notebooks sind eigenständig lauffähig und für Google Colab optimiert. Das `genai_lib` Utility-Paket übernimmt das automatische Setup der Umgebung.

## 🎓 Projekte & Übungen

Der Kurs bietet zwei praxisorientierte Lernformate:

### [RAG Workshop](https://ralf-42.github.io/GenAI/projekte/RAG_Workshop.html)
**Workshop-Format** | Begleitete Schritt-für-Schritt-Übung

Bauen Sie einen intelligenten Tech-Doku-Assistenten von Grund auf:
- 📝 Kapitel 1-7: Vom einfachen Chatbot zur RAG-Anwendung
- 🎯 Stufenweise Komplexität (M04-M11)
- 🛠️ Hands-On mit LangChain, ChromaDB, Gradio
- ⏱️ Zeitaufwand: 4-6 Stunden

### [KI-Challenge](https://ralf-42.github.io/GenAI/projekte/M23_KI-Challenge.html)
**End-to-End Projekt** | Eigenständige Implementierung

Entwickeln Sie eine vollständige GenAI-Anwendung:
- 🎯 4 Projektoptionen: Dokumentenanalyse, Multimodal, Multi-Agent, Domänen-Experte
- 🚀 LangChain 1.0+ Best Practices
- 📦 Abgabe: Jupyter Notebook + README.md
- ⏱️ Zeitaufwand: 15-25 Stunden

## 📖 Dokumentation

- **Kurs-Website:** [https://ralf-42.github.io/GenAI/](https://ralf-42.github.io/GenAI/)
- **Lokale Projektregeln:** [CLAUDE.md](./CLAUDE.md)
- **Agenten-Governance:** [AGENTS.md](./AGENTS.md)
- **LangChain Standards:** [LangChain_Standards.md](./LangChain_Standards.md)
- **LangGraph Standards:** [LangGraph_Standards.md](./LangGraph_Standards.md)
- **LangSmith Standards:** [LangSmith_Standards.md](./LangSmith_Standards.md)


## ⚖️ Lizenzen

Der **Quellcode** steht unter der [MIT License](./LICENSE).       
Die **Kursmaterialien** (z. B. Folien, Texte, Grafiken) sind unter der [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) veröffentlicht.     
**Northwind-Datenbank** von Microsoft unter Microsoft Public License (Ms-PL).     
Bilder und Videos erstellt mit **Hedra AI** – Nutzung gemäß [Hedra Terms](https://www.hedra.com/terms).     

© 2025-2026 Ralf-42       

---

**Letzte Aktualisierung:** April 2026         
**Version:** 2.6          

