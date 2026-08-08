# Generative KI 

<table>
  <tr>
    <td><a href="./.claude/config/langchain-patterns.yaml"><img src="https://img.shields.io/badge/LangChain-%3E%3D1.3.13-brightgreen" alt="LangChain &gt;=1.3.13"></a></td>
    <td><a href="./04_modul/requirements.txt"><img src="https://img.shields.io/badge/LangGraph-%3E%3D1.2.4-brightgreen" alt="LangGraph &gt;=1.2.4"></a></td>
    <td><a href="https://smith.langchain.com"><img src="https://img.shields.io/badge/LangSmith_SDK-0.8%2B-blue" alt="LangSmith SDK 0.8+"></a></td>
    <td><a href="../_docs/_archive/LangChain_Audit_Report_2026-06-05.md"><img src="https://img.shields.io/badge/Compliance-100%25-success" alt="Compliance 100%"></a></td>
    <td><a href="../_docs/_archive/LangChain_Audit_Report_2026-06-05.md"><img src="https://img.shields.io/badge/Audit-Jun_2026-success" alt="Audit Jun 2026"></a></td>
    <td><a href="./.claude/config/langchain-patterns.yaml"><img src="https://img.shields.io/badge/Patterns-Jul_2026-success" alt="Patterns Jul 2026"></a></td>
    <td><a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3.11%2B-blue" alt="Python 3.11+"></a></td>
  </tr>
</table>

Ein deutschsprachiger, praxisorientierter Einsteigerkurs zu Generative-KI-Technologien mit Fokus auf OpenAI GPT-Modelle, LangChain, RAG-Systeme, Agenten und multimodale Anwendungen.

Die primäre Entwicklungsumgebung ist **Google Colab**; dort steht **Gemini** als integrierte Unterstützung für Verständnisfragen, Code-Erklärungen, Debugging und Variantenbildung zur Verfügung. Gemini ist als Lern- und Arbeitsassistenz vorgesehen, ersetzt aber nicht die gemeinsame Einordnung, Diskussion und Reflexion im Kurs.  


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
└── 05_prompt/      # Prompt-Templates (Markdown-Format)
```



## 🛠️ Technologie-Stack

### Kernframeworks
- **OpenAI API** (>=1.0.0) - GPT-Modelle, Embeddings und multimodale APIs
- **LangChain** (>=1.3.13) - Orchestrierung, Chains, Agents und RAG
- **LangGraph** (>=1.2.4) - zustandsbasierte Workflows und Multi-Agent-Systeme
- **LangSmith SDK** (>=0.8.0) - Tracing, Evaluation und Production-Monitoring
- **Hugging Face** - Transformers und Community-Modelle

### Spezialisierte Tools
- **ChromaDB** (>=0.5.0) - Vektordatenbank für RAG-Systeme
- **Sentence Transformers** (>=3.0.0) - CLIP für multimodale Embeddings
- **Gradio** (>=3.x) - UI-Entwicklung für KI-Apps
- **Ollama** - Lokale Open-Source-Modelle
- **genai_lib** (eigene Module in `04_modul/genai_lib/`) - Projektspezifische Bibliothek für Kursanwendungen
  - **model_config.py** - Rollenbasierte Modell-Konstanten (`BASELINE`, `ROUTER`, `WORKER`, `CODING`, `JUDGE`, `PLANNER`, `WORKER_PREMIUM`, `FRONTIER` u. a.) für `init_chat_model()`; deckt alle Tier-Stufen von Luna bis Frontier ab
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

| Rolle (Konstante in `model_config.py`) | Modell | Hinweis |
|-------|----------------|---------|
| Baseline / Demo (`BASELINE`) | `gpt-5.6-luna` | kein `temperature`; Konzept vor Ausgabequalität |
| Router (`ROUTER`) | `gpt-5.6-luna` | `reasoning.effort="low"` bei einfachen Routing-Entscheidungen |
| Worker / Synthese (`WORKER`) | `gpt-5.4-mini` | RAG-Synthese, strukturierte Ausgaben; `reasoning.effort` low–medium |
| Coding-Worker (`CODING`) | `gpt-5.4-mini` | Code-Generierung, Refactoring; `reasoning.effort` medium–high |
| Judge / starker Reasoner (`JUDGE`) | `gpt-5.4` | Supervisor, Security, Evaluation; `reasoning.effort="high"` |
| Planner (`PLANNER`) | `gpt-5.4` | Aufgabenzerlegung, Schritt-Planung, Agentic RAG |
| Worker Premium (`WORKER_PREMIUM`) | `gpt-5.6-terra` | komplexe RAG, finale Reports |
| Frontier (`FRONTIER`) | `gpt-5.6-sol` | maximale Qualität, kritische Demos, Benchmark-Vergleiche |
| Bildgenerierung (`IMAGE_GENERATION`) | `gpt-image-2` | direkte OpenAI Images API, ohne Provider-Präfix |
| Transkription (`TRANSCRIPTION`) | `gpt-4o-mini-transcribe` | Standard-Audiotranskription |
| Transkription mit Segmenten (`TRANSCRIPTION_SEGMENTS`) | `whisper-1` | Zeitstempel/Segmente über `verbose_json` |
| Embeddings (`EMBEDDINGS`) | `text-embedding-3-small` | RAG, ChromaDB, Vektorindizes |


## 📚 Kursmodule

Die Notebooks sind nach Themen geordnet. Einzelne Aufgaben können je nach Kursverlauf, Zeitbudget und Vorwissen unterschiedlich tief bearbeitet werden.

| Datei                                       | Thema                                                                            |
| ------------------------------------------- | -------------------------------------------------------------------------------- |
| `M01_GenAI_Intro.ipynb`                     | Grundlagen Generative KI, OpenAI, Hugging Face, LangChain-Warm-up                |
| `M02_LangChain101.ipynb`                    | LangChain-Grundlagen, Prompts, Chains, Tools                                     |
| `M03_LLM_Text.ipynb`                        | Textgenerierung, Textklassifizierung, Textzusammenfassung, LangChain-Grundmuster |
| `M04_OutputParser.ipynb`                    | Strukturierte Ausgaben und `with_structured_output()`                            |
| `M05_Chat_Memory_Patterns_stategraph.ipynb` | Chat-Verläufe, Memory-Patterns (LangGraph/StateGraph)                            |
| `M05_Chat_Memory_Patterns_list_dict.ipynb`  | Chat-Verläufe, Memory-Patterns (Python-Listen/Dict)                              |
| `M06_RAG_LangChain.ipynb`                   | Retrieval Augmented Generation mit LangChain                                     |
| `M07_SQL_RAG.ipynb`                         | SQL-RAG und Datenbankintegration                                                 |
| `M08_Agenten_LangChain.ipynb`               | Agenten mit LangChain                                                            |
| `M09_Middleware.ipynb`                      | Middleware, Guardrails, Human-in-the-Loop                                        |
| `M10_MCP_LangChain_Agent.ipynb`             | Model Context Protocol und Agent-Tools                                           |
| `M11_Gradio.ipynb`                          | Gradio-Oberflächen für KI-Anwendungen                                            |
| `M12_Lokale_Open_Source_Modelle.ipynb`      | Lokale und Open-Source-Modelle, Ollama                                           |
| `M13_Fine_Tuning_Unsloth.ipynb`             | Fine-Tuning und Modellanpassung                                                  |
| `M14_Modell_Router.ipynb`                   | LLM-Routing, Provider-Failover und Circuit Breaker                               |
| `M15_Modell_Kosten.ipynb`                   | Kostenermittlung: Tokens, Preise und LangSmith                                   |
| `M16_Multimodal_Bild.ipynb`                 | Multimodale Bildverarbeitung                                                     |
| `M17_Multimodal_RAG.ipynb`                  | Multimodales RAG mit Text und Bild                                               |
| `M18_Multimodal_Audio.ipynb`                | Audio, Speech-to-Text und Text-to-Speech                                         |
| `A00_snippets_genai.ipynb`                  | Wiederverwendbare Snippets und Referenzbausteine                                 |
| `quick_template.ipynb`                      | Vorlage für Aufgaben und neue Notebook-Bausteine                                 |

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

**Northwind SQLite-Datenbank**: basiert auf Microsofts Northwind-Beispieldatenbank. Die hier verwendete SQLite-Version stammt aus dem Projekt `jpwhite3/northwind-SQLite3` und steht unter der MIT License (Copyright © 2016 JP White); siehe [`Licence NorthwindDB.md`](./02_daten/05_sonstiges/Licence%20NorthwindDB.md). Microsofts SQL-Server-Samples, einschließlich Northwind/Pubs, stehen ebenfalls unter MIT License (Copyright Microsoft Corporation).

**Chinook-Datenbank**: steht unter der MIT License (Copyright © 2008–2024 Luis Rocha); siehe [`Licence ChinookDB.md`](./02_daten/05_sonstiges/Licence%20ChinookDB.md).     

**Hedra-Medien**: Mit Hedra erstellte oder auf allgemein verfügbaren Hedra-Vorlagen/Assets beruhende Bilder und Videos sind nicht von der allgemeinen CC-BY-4.0-Lizenz der Kursmaterialien umfasst, soweit sie als solche gekennzeichnet sind. Ihre Nutzung richtet sich nach den [Hedra Terms of Use](https://www.hedra.com/terms) und ggf. weiteren Hedra-Richtlinien.     

© 2025-2026 Ralf-42     


> [!NOTE]
> Bei der Erstellung dieser Unterlagen kamen KI-Werkzeuge zum Einsatz. Die Inhalte wurden anschließend fachlich geprüft und überarbeitet.


---

**Letzte Aktualisierung:** Juli 2026         
**Version:** 3.1          
