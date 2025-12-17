# Generative KI Kurs

Ein deutschsprachiger, praxisorientierter Kurs zu Generative AI Technologien mit Fokus auf OpenAI GPT-Modelle, LangChain und praktischen Anwendungen.

## 🎯 Zielgruppe

- Entwickler:innen mit Python-Grundkenntnissen
- IT-Fachkräfte, die KI-Technologien integrieren möchten
- Technikbegeisterte mit Programmiererfahrung

## 🤖 For AI Agents

This repository includes **agent governance** documentation:

- **[AGENTS.md](./AGENTS.md)** - How AI agents should work with this codebase (role, rules, scope, quality gates)
- **[CLAUDE.md](./CLAUDE.md)** - Project structure, conventions, and technical documentation
- **[LangChain_1.0_Must_Haves.md](./LangChain_1.0_Must_Haves.md)** - Required patterns for all LangChain code

**Note:** AGENTS.md defines **behavior**, while CLAUDE.md describes **structure**. Read both before making changes.

## 📁 Projektstruktur

```
GenAI/
├── 01_notebook/    # Jupyter Notebooks (Kursmaterialien)
├── 02_daten/       # Trainingsdaten und Beispieldateien
├── 03_skript/      # Kursdokumentation und Präsentationen
├── 04_modul/       # Python-Module und Bibliotheken
└── 05_prompt/      # Prompt-Templates
```

## 🛠️ Technologie-Stack

### Kernframeworks
- **OpenAI API** (>=1.0.0) - GPT-4o-mini, Embeddings, DALL-E
- **LangChain** (>=1.1.0) 🆕 - Orchestrierung, Chains, Agents, RAG
- **LangGraph** (>=0.2.0) - Zustandsbasierte Multi-Agent-Workflows
- **Hugging Face** - Transformers und Community-Modelle

### Spezialisierte Tools
- **ChromaDB** (>=0.5.0) - Vektordatenbank für RAG-Systeme
- **Sentence Transformers** (>=3.0.0) - CLIP für multimodale Embeddings
- **Gradio** (>=3.x) - UI-Entwicklung für KI-Apps
- **Ollama** - Lokale Open-Source-Modelle
- **genai_lib** (eigene Module in `04_modul/genai_lib/`) - Projektspezifische Bibliothek für Kursanwendungen
  - **multimodal_rag.py** - Multimodales RAG-System mit Bild-zu-Bild und Bild-zu-Text Suche
  - **mcp_modul.py** - Model Context Protocol (MCP) Integration für Server, Clients und AI-Assistenten
  - **utilities.py** - Hilfsfunktionen für Environment-Checks, Paket-Installation, API-Keys, Prompt-Templates, Model-Profiles (`get_model_profile()`) und LLM-Response-Parsing (`extract_thinking()`)

### 🆕 LangChain v1.1.0 Features (Dezember 2025)

Dieser Kurs nutzt die neuesten **LangChain v1.1.0** Features:

- ✨ **Model Profiles** - Automatische Capability-Detection via `.profile` Attribut (Reasoning, Multimodal, Temperature, Knowledge Cutoff)
- ✨ **Smart Structured Output** - Auto-Inference von `ProviderStrategy`
- ✨ **SystemMessage in Agents** - Cache-Control für Anthropic Claude
- ✨ **ModelRetryMiddleware** - Automatische Retries mit exponential backoff
- ✨ **ContentModerationMiddleware** - OpenAI Moderation für Safety-Layer

**Dokumentation:**
- [LangChain 1.0 Must-Haves](./LangChain_1.0_Must_Haves.md) - PFLICHT-Features für alle Notebooks
- [LangGraph 1.0 Must-Haves](./LangGraph_1.0_Must_Haves.md) - Multi-Agent & State Machines
- [Notebook Template Guide](./Notebook_Template_Guide.md) - Standard-Struktur für Notebooks
- [CLAUDE.md](./CLAUDE.md) - Vollständige Projektinstruktionen

## 📚 Kursmodule

### Basismodule (M00-M12)
| Modul | Thema | Beschreibung |
|-------|-------|-------------|
| M01 | GenAI Intro | Grundlagen Generative AI |
| M02 | Modellsteuerung | Prompting, Context Engineering |
| M03 | Codieren mit GenAI | KI-gestütztes Programmieren |
| M04 | LangChain 101 | Framework-Grundlagen |
| M05 | LLM & Transformer | Architektur und Foundation Models |
| M06 | Chat & Memory | Konversations-Management |
| M07 | Output Parser | Strukturierte Ausgaben |
| M08a | RAG LangChain | Retrieval Augmented Generation |
| M08b | RAG LangGraph | Advanced RAG (Self-RAG, Corrective RAG) |
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

## 📖 Dokumentation

- Vollständiges Kursskript: `03_skript/GenAI_all_in_one.pdf`

## ⚖️ Lizenzen

Der **Quellcode** steht unter der [MIT License](./LICENSE).    
Die **Kursmaterialien** (z. B. Folien, Texte, Grafiken) sind unter der [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) veröffentlicht.    
**Northwind-Datenbank** von Microsoft unter Microsoft Public License (Ms-PL).    
Bilder und Videos erstellt mit **Hedra AI** – Nutzung gemäß [Hedra Terms](https://www.hedra.com/terms).    

© 2025 Ralf-42

---

**Letzte Aktualisierung:** Dezember 2025
**Version:** 2.2

**Changelog v2.2:**
- 🤖 **AGENTS.md** hinzugefügt - Agent Governance für KI-Assistenten
- ✅ README.md erweitert mit "For AI Agents" Sektion
- 📚 Klare Abgrenzung: AGENTS.md (Verhalten) vs. CLAUDE.md (Struktur)

**Changelog v2.1:**
- ✅ LangChain v1.1.0 Support (Dezember 2025)
- 🆕 Model Profiles, Smart Structured Output, SystemMessage Support
- 🆕 2 neue Middleware: ModelRetryMiddleware & ContentModerationMiddleware
- ✅ Dokumentation erweitert mit v1.1.0 Features
