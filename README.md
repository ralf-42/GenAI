# Generative KI 

<table>
  <tr>
    <td><a href="./04_modul/requirements.txt"><img src="https://img.shields.io/badge/LangGraph-%3E%3D1.2.16-brightgreen" alt="LangGraph &gt;=1.2.16"></a></td>
    <td><a href="https://smith.langchain.com"><img src="https://img.shields.io/badge/LangSmith_SDK-0.14.11%2B-blue" alt="LangSmith SDK 0.14.11+"></a></td>
    <td><a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3.11%2B-blue" alt="Python 3.11+"></a></td>
  </tr>
</table>

Ein deutschsprachiger, praxisorientierter Einsteigerkurs zu Generative-KI-Technologien mit Fokus auf OpenAI GPT-Modelle, LangChain, RAG-Systeme, Agenten und multimodale Anwendungen.

Die primäre Entwicklungsumgebung ist **Google Colab**; dort steht **Gemini** als integrierte Unterstützung für Verständnisfragen, Code-Erklärungen, Debugging und Variantenbildung zur Verfügung. Gemini ist als Lern- und Arbeitsassistenz vorgesehen, ersetzt aber nicht die gemeinsame Einordnung, Diskussion und Reflexion im Kurs.

## 🌐 Kurs-Website

**[→ GenAI Kurs-Website (GitHub Pages)](https://ralf-42.github.io/GenAI/)**

Die Kursdokumentation mit Konzepten, Frameworks-Guides und Ressourcen zu Generativer KI ist als interaktive Website verfügbar.

## 🎯 Zielgruppe

- Einsteiger:innen mit guten Python-Grundkenntnissen
- IT-Fachkräfte, die Generative KI praktisch einordnen und integrieren möchten
- Technikinteressierte, die mit Unterstützung eines Dozenten und Google Colab eigene KI-Beispiele umsetzen möchten
- Teilnehmende, die einzelne Themen vertiefen oder eigene Varianten bearbeiten möchten


## 📁 Projektstruktur

```
GenAI/
├── 01_notebook/    # Jupyter Notebooks (Kursmaterialien)
├── 02_daten/       # Trainingsdaten und Beispieldateien
├── 03_skript/      # Ergänzende Unterlagen zum Kurs
├── 04_modul/       # Python-Module und Bibliotheken
├── 05_prompt/      # Prompt-Templates (Markdown-Format)
├── 07_image/       # Bild- und Visualisierungsmaterial
└── docs/           # Projektdokumentation
```

## 🛠️ Technologie-Stack

### Kernframeworks
- **OpenAI API** (>=2.0.0) - GPT-Modelle, Embeddings und multimodale APIs
- **LangChain** (>=1.4.6) - Orchestrierung, Chains, Agents und RAG
- **LangGraph** (>=1.2.16) - zustandsbasierte Workflows und Multi-Agent-Systeme
- **LangSmith SDK** (>=0.14.11) - Tracing, Evaluation und Production-Monitoring
- **Hugging Face** - Transformers und Community-Modelle

### Spezialisierte Tools
- **ChromaDB** (>=1.0.0) - Vektordatenbank für RAG-Systeme
- **Sentence Transformers** (>=5.0.0) - CLIP für multimodale Embeddings
- **Gradio** (optional, Modul M11) - UI-Entwicklung für KI-Apps
- **Ollama** - Lokale Open-Source-Modelle
- **genai_lib** (eigene Module in `04_modul/genai_lib/`) - Projektspezifische Bibliothek für Kursanwendungen
  - **model_config.py** - Rollenbasierte Modell-Konstanten (`BASELINE`, `ROUTER`, `WORKER`, `CODING`, `JUDGE`, `PLANNER`, `WORKER_PREMIUM`, `FRONTIER` u. a.) für `init_chat_model()`; deckt die Stufen Luna, Terra, Sol und Astra ab
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

Die Modellwahl richtet sich nach der Rolle im Workflow. Die Tabelle dient als Orientierung; maßgeblich ist die Konfiguration in [`model_config.py`](./04_modul/genai_lib/model_config.py).

| Rolle (Konstante in `model_config.py`) | Modell | Einsatz |
|-------|----------------|---------|
| Baseline / Demo (`BASELINE`) | `gpt-6-luna` | kein `temperature`; Konzept vor Ausgabequalität |
| Router (`ROUTER`) | `gpt-6-luna` | einfache Routing-Entscheidungen |
| Worker / Synthese (`WORKER`) | `gpt-6.1-terra` | RAG-Synthese, strukturierte Ausgaben; `reasoning.effort` low–medium |
| Coding-Worker (`CODING`) | `gpt-6.1-terra` | begrenzte Code-Generierung und Refactorings |
| Judge / starker Reasoner (`JUDGE`) | `gpt-6.1-sol` | Supervisor, Security, Evaluation; `reasoning.effort` high–xhigh |
| Planner (`PLANNER`) | `gpt-6.1-sol` | Aufgabenzerlegung, Schritt-Planung, Agentic RAG |
| Worker Premium (`WORKER_PREMIUM`) | `gpt-6.1-sol` | komplexe RAG, finale Reports |
| Frontier (`FRONTIER`) | `gpt-6-astra` | maximale Qualität für besonders schwierige Aufgaben |
| Embeddings (`EMBEDDINGS`) | `text-embedding-3-small` | RAG, ChromaDB, Vektorindizes |
| Bildgenerierung (`IMAGE_GENERATION`) | `gpt-image-2` | direkte OpenAI Images API, ohne Provider-Präfix |
| Transkription (`TRANSCRIPTION`) | `gpt-transcribe` | Datei-Audiotranskription |
| Transkription mit Segmenten (`TRANSCRIPTION_SEGMENTS`) | `whisper-1` | Legacy: Zeitstempel/Segmente; Ablösung bis 26.02.2027 erforderlich |

GPT-6-Modelle mit Tool-Aufrufen werden mit `langchain-openai` ab Version 1.7.2 über die Responses API geroutet. Bei einer eigenen `ChatOpenAI`-Konfiguration kann `use_responses_api=True` explizit gesetzt werden. `whisper-1` wird am 26. Februar 2027 abgeschaltet; die Segment-Zeitstempel benötigen eine gesonderte Migration.


## 📚 Kursmodule

Die Notebooks sind nach Themen geordnet. Einzelne Aufgaben können je nach Kursverlauf, Zeitbudget und Vorwissen unterschiedlich tief bearbeitet werden. Die Nr. entspricht der Modul-ID im Dateinamen des Notebooks (z. B. `M01_GenAI_Intro.ipynb`).

### Block 1: Grundlagen
| Nr. | Modul | Thema | Beschreibung |
| ---: | ----- | ----- | ------------ |
| 1 | GenAI Intro | Einstieg in Generative KI | Grundlagen Generative KI, OpenAI, Hugging Face, LangChain-Warm-up |
| 2 | LangChain101 | LangChain-Grundlagen | LangChain-Grundlagen, Prompts, Chains, Tools |
| 3 | LLM Text | Textverarbeitung mit LLMs | Textgenerierung, Textklassifizierung, Textzusammenfassung, LangChain-Grundmuster |
| 4 | OutputParser | Strukturierte Ausgaben | Strukturierte Ausgaben und `with_structured_output()` |
| 5 | Chat Memory Patterns (StateGraph) | Chat-Verläufe und Memory | Chat-Verläufe, Memory-Patterns (LangGraph/StateGraph) |
| 5 | Chat Memory Patterns (Liste/Dict) | Chat-Verläufe und Memory | Chat-Verläufe, Memory-Patterns (Python-Listen/Dict) |

### Block 2: Wissensbasierte Anwendungen
| Nr. | Modul | Thema | Beschreibung |
| ---: | ----- | ----- | ------------ |
| 6 | RAG LangChain | Retrieval Augmented Generation | Retrieval Augmented Generation mit LangChain |
| 7 | SQL RAG | SQL-RAG | SQL-RAG und Datenbankintegration |

### Block 3: Agenten und Integration
| Nr. | Modul | Thema | Beschreibung |
| ---: | ----- | ----- | ------------ |
| 8 | Agenten LangChain | Agenten | Agenten mit LangChain |
| 9 | Middleware | Middleware und Guardrails | Middleware, Guardrails, Human-in-the-Loop |
| 10 | MCP LangChain Agent | Model Context Protocol | Model Context Protocol und Agent-Tools |
| 11 | Gradio | Benutzeroberflächen | Gradio-Oberflächen für KI-Anwendungen |

### Block 4: Lokale Modelle und Optimierung
| Nr. | Modul | Thema | Beschreibung |
| ---: | ----- | ----- | ------------ |
| 12 | Lokale Open Source Modelle | Lokale Modelle | Lokale und Open-Source-Modelle, Ollama |
| 13 | Fine Tuning Unsloth | Fine-Tuning | Fine-Tuning und Modellanpassung |
| 14 | Modell Router | LLM-Routing | LLM-Routing, Provider-Failover und Circuit Breaker |
| 15 | Modell Kosten | Kostenermittlung | Kostenermittlung: Tokens, Preise und LangSmith |

### Block 5: Multimodal
| Nr. | Modul | Thema | Beschreibung |
| ---: | ----- | ----- | ------------ |
| 16 | Multimodal Bild | Bildverarbeitung | Multimodale Bildverarbeitung |
| 17 | Multimodal RAG | Multimodales RAG | Multimodales RAG mit Text und Bild |
| 18 | Multimodal Audio | Audio | Audio, Speech-to-Text und Text-to-Speech |

### Hilfs-Notebooks
| Datei | Zweck |
| ----- | ----- |
| `M90_API_Keys_einrichten_und_testen.ipynb` | Secrets in Colab anlegen und OpenAI- und Hugging-Face-Zugang testen |
| `A00_snippets_genai.ipynb` | Wiederverwendbare Snippets und Referenzbausteine |
| `quick_template.ipynb` | Vorlage für Aufgaben und neue Notebook-Bausteine |

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

## 💡 Nutzung

Alle Notebooks sind eigenständig lauffähig und für Google Colab optimiert. Das `genai_lib` Utility-Paket übernimmt das automatische Setup der Umgebung.

## 📖 Dokumentation

- **Kurs-Website:** [https://ralf-42.github.io/GenAI/](https://ralf-42.github.io/GenAI/)

## ⚖️ Lizenzen

Der **Quellcode** steht unter der [MIT License](./LICENSE).       

Die **Kursmaterialien** (z. B. Folien, Texte, Grafiken) sind unter der [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) veröffentlicht.     

**Northwind SQLite-Datenbank**: basiert auf Microsofts Northwind-Beispieldatenbank. Die hier verwendete SQLite-Version stammt aus dem Projekt `jpwhite3/northwind-SQLite3` und steht unter der MIT License (Copyright © 2016 JP White); siehe [`Licence NorthwindDB.md`](./02_daten/05_sonstiges/Licence%20NorthwindDB.md). Microsofts SQL-Server-Samples, einschließlich Northwind/Pubs, stehen ebenfalls unter MIT License (Copyright Microsoft Corporation).

**Chinook-Datenbank**: steht unter der MIT License (Copyright © 2008–2024 Luis Rocha); siehe [`Licence ChinookDB.md`](./02_daten/05_sonstiges/Licence%20ChinookDB.md).     

**Hedra-Medien**: Mit Hedra erstellte oder auf allgemein verfügbaren Hedra-Vorlagen/Assets beruhende Bilder und Videos sind nicht von der allgemeinen CC-BY-4.0-Lizenz der Kursmaterialien umfasst, soweit sie als solche gekennzeichnet sind. Ihre Nutzung richtet sich nach den [Hedra Terms of Use](https://www.hedra.com/terms) und ggf. weiteren Hedra-Richtlinien.     

Die ausführliche Lizenzzuordnung für die Kurs-Website steht unter [Rechtliches → Lizenzen](./docs/14-rechtliches/lizenzen.md).

© 2025-2026 Ralf-42     

> [!NOTE]
> **Hinweis zur Entstehung:** Bei der Erstellung dieser Unterlagen wurden KI-Werkzeuge unterstützend eingesetzt, unter anderem für Recherche, Strukturierung, Formulierung und einzelne Medien. Die Inhalte wurden anschließend fachlich geprüft, eingeordnet und redaktionell überarbeitet.

---

**Stand:** Oktober 2026     
**Version:** 3.2     
