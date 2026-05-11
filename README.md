# Generative KI Kurs

[![LangChain 1.2+ Compliant](https://img.shields.io/badge/LangChain-1.2%2B%20Compliant-brightgreen)](./LangChain_Audit_Report_2025-12-17.md)
[![Code Quality](https://img.shields.io/badge/Compliance-100%25-success)](./LangChain_Audit_Report_2025-12-17.md)
[![Python](https://img.shields.io/badge/Python-3.11%2B-blue)](https://www.python.org/)

Ein deutschsprachiger, praxisorientierter Einsteigerkurs zu Generative-AI-Technologien mit Fokus auf OpenAI GPT-Modelle, LangChain, RAG-Systeme, Agenten und multimodale Anwendungen.

Die primäre Entwicklungsumgebung ist **Google Colab**; dort steht **Gemini** als integrierte Unterstützung für Verständnisfragen, Code-Erklärungen, Debugging und Variantenbildung zur Verfügung. Gemini ist als Lern- und Arbeitsassistenz vorgesehen, ersetzt aber nicht die gemeinsame Einordnung, Diskussion und Reflexion im Kurs.  


## 🎯 Zielgruppe

- Einsteiger:innen mit ersten Python-Grundkenntnissen
- IT-Fachkräfte, die Generative KI praktisch einordnen und integrieren möchten
- Technikinteressierte, die mit Unterstützung eines Dozenten und Google Colab eigene KI-Beispiele umsetzen möchten
- Fortgeschrittene Teilnehmende, die optionale Aufbau- und Vertiefungsaufgaben bearbeiten möchten


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
  - **model_config.py** - Rollenbasierte Modell-Konstanten (`BASELINE`, `WORKER`, `JUDGE` u. a.) für `init_chat_model()`; deckt alle Tier-Stufen von Nano bis Premium ab
  - **multimodal_rag.py** - Multimodales RAG-System mit Bild-zu-Bild und Bild-zu-Text Suche
  - **utilities.py** - Hilfsfunktionen für Environment-Checks, Paket-Installation, API-Keys, Prompt-Templates, Model-Profiles (`get_model_profile()`) und LLM-Response-Parsing (`extract_thinking()`)

### LangChain/LangGraph Standards

Pflicht-Patterns für LangChain 1.0+:

- `init_chat_model()` statt direkter Provider-Klassen
- `with_structured_output()` statt Parser-Workarounds für strukturierte LLM-Ausgaben
- `@tool` statt manueller Tool-Wrapper
- `create_agent()` für einfache Agenten
- `StateGraph` für komplexe, verzweigte oder langlebige Workflows
- LCEL `|` Chains statt veralteter Chain-Klassen
- Standard Message Content Blocks für multimodale Inhalte

Für einfache Agenten reicht `create_agent()`. Ein eigener `StateGraph` wird genutzt, wenn das Notebook explizit LangGraph-Verhalten, Routing, Checkpointing oder Multi-Agent-Workflows zeigt.

### Modell-Auswahl

Die Modellwahl richtet sich nach der Rolle im Workflow:

| Rolle | Standardmodell | Hinweis |
|-------|----------------|---------|
| Grundlagen-Demo, einfache Chain | `gpt-5.4-nano` | kein `temperature`; Konzept vor Ausgabequalität |
| Router, leichte Auswahlentscheidungen | `gpt-5.4-nano` | `reasoning.effort="low"` bei Bedarf |
| Worker, Content, RAG-Synthese, Code | `gpt-5.4-mini` | kein `temperature`; Qualität/Synthese |
| Judge, Evaluator, Supervisor | `gpt-5.4` | kein `temperature`; `reasoning.effort` nutzen |
| Judge / Planner (Premium) | `gpt-5.5` | maximale Reasoning-Qualität; nur wenn Standard nicht reicht |
| Multimodale Analyse | `gpt-5.4-mini` | Vision-/Audio-/Frame-Input, M16 und M19 |
| Mediengenerierung und Transkription | `gpt-image-1`, `gpt-image-2`, `sora-2`, `whisper-1` | direkte OpenAI-API, nicht LangChain-Rollenmodell |
| Embeddings | `text-embedding-3-small` | RAG, ChromaDB, Vektorindizes |


## 📚 Kursmodule

Die Pflicht-/Optional-Orientierung ist im Kursintro und in der Kursprogression klar markiert. Zusätzlich sind die Aufgaben in den Notebooks differenziert:

- **Grundlagen:** Kernaufgaben für alle Teilnehmenden
- **Aufbau / Fortgeschritten:** zusätzliche Aufgaben für schnellere oder erfahrenere Teilnehmende
- **Vertiefung / Optional:** anspruchsvollere Erweiterungen, Transfer oder Bonus-Challenges

| Datei | Thema | Rolle im Kurs |
|-------|-------|---------------|
| `M00_Kurs_Intro.ipynb` | Kursüberblick, Setup, Kursprogression | Pflicht: Einstieg und Orientierung |
| `M01_GenAI_Intro.ipynb` | Grundlagen Generative KI, OpenAI, Hugging Face, LangChain-Warm-up | Pflicht |
| `M02_Modellsteuerung.ipynb` | Prompting, Parameter, Modellverhalten, Context Engineering | Pflicht |
| `M03_Codieren_mit_GenAI.ipynb` | KI-gestütztes Programmieren mit Colab und Gemini-Unterstützung | Pflicht / Übung |
| `M04_LangChain101.ipynb` | LangChain-Grundlagen, Prompts, Chains, Tools | Pflicht |
| `M05_LLM_Transformer.ipynb` | LLMs, Transformer, Foundation Models, Klassifikation | Pflicht für konzeptionelles Verständnis |
| `M06_OutputParser.ipynb` | Strukturierte Ausgaben und `with_structured_output()` | Pflicht |
| `M07_Chat_Memory_Patterns.ipynb` | Chat-Verläufe, Memory-Patterns, Zusammenfassung | Ergänzend |
| `M08_RAG_LangChain.ipynb` | Retrieval Augmented Generation mit LangChain | Pflicht |
| `M09_SQL_RAG.ipynb` | SQL-RAG und Datenbankintegration | Ergänzend |
| `M10_Agenten_LangChain.ipynb` | Agenten mit LangChain | Aufbau |
| `M11_Middleware.ipynb` | Middleware, Guardrails, Human-in-the-Loop | Aufbau |
| `M12_MCP_LangChain_Agent.ipynb` | Model Context Protocol und Agent-Tools | Aufbau / Optional |
| `M13_Gradio.ipynb` | Gradio-Oberflächen für KI-Anwendungen | Ergänzend |
| `M14_Lokale_Open_Source_Modelle.ipynb` | Lokale und Open-Source-Modelle, Ollama | Optional |
| `M15_Fine_Tuning.ipynb` | Fine-Tuning und Modellanpassung | Optional / Vertiefung |
| `M16_Multimodal_Bild.ipynb` | Multimodale Bildverarbeitung | Ergänzend |
| `M17_Multimodal_RAG.ipynb` | Multimodales RAG mit Text und Bild | Aufbau / Optional |
| `M18_Multimodal_Audio.ipynb` | Audio, Speech-to-Text und Text-to-Speech | Optional |
| `M19_Multimodal_Video.ipynb` | Videoanalyse und multimodale Workflows | Optional |
| `M20_OpenAI_Agent_Builder.md` | Agent Builder als ergänzende No-/Low-Code-Perspektive | Optional |
| `A00_snippets_genai.ipynb` | Wiederverwendbare Snippets und Referenzbausteine | Hilfsnotebook |
| `quick_template.ipynb` | Vorlage für Aufgaben und neue Notebook-Bausteine | Hilfsnotebook |

## 🔑 Voraussetzungen

- Python 3.11+
- Google-Konto mit Zugriff auf Google Colab
- Gemini-Unterstützung in Google Colab für Code- und Verständnisfragen
- OpenAI API Key (ca. 5 EUR für gesamten Kurs)
- Hugging Face Account (kostenlos, für ausgewählte Module)
- Moderierte Teilnahme am Kurs; die Notebooks sind für angeleitete Bearbeitung mit individueller Differenzierung vorbereitet

## 📦 Installation

Das `genai_lib` Modul kann direkt aus diesem Repository installiert werden:

```bash
# Mit pip
pip install git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul

# Mit uv (empfohlen für Google Colab)
uv pip install --system git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul
```



## 📖 Dokumentation

- **Kurs-Website:** [https://ralf-42.github.io/GenAI/](https://ralf-42.github.io/GenAI/)


## ⚖️ Lizenzen

Der **Quellcode** steht unter der [MIT License](./LICENSE).       
Die **Kursmaterialien** (z. B. Folien, Texte, Grafiken) sind unter der [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) veröffentlicht.     
**Northwind-Datenbank** von Microsoft unter Microsoft Public License (Ms-PL).     
Bilder und Videos erstellt mit **Hedra AI** – Nutzung gemäß [Hedra Terms](https://www.hedra.com/terms).     

© 2025-2026 Ralf-42       

---

**Letzte Aktualisierung:** Mai 2026         
**Version:** 2.8          
