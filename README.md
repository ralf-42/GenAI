# Generative KI Kurs

Ein deutschsprachiger Kurs zu praktischen Anwendungen von Generative KI Technologien.

# 1 📚 Kursübersicht

Dieser Kurs bietet eine praxisorientierte Einführung in moderne GenAI-Technologien mit Fokus auf OpenAI GPT-Modelle, Hugging Face und LangChain. Alle Materialien sind in deutscher Sprache verfasst und für die Ausführung in Google Colab optimiert.

# 2 ✨ Zielgruppe
- **Entwickler:innen** mit guten Python-Grundkenntnissen
- **IT-Fachkräfte**, die KI-Technologien in bestehende Projekte integrieren möchten
- **Technikbegeisterte Quereinsteiger:innen** mit Programmiererfahrung

# 3 🎯 Lernziele

- Verstehen der Grundlagen von Generative AI
- Praktische Anwendung von GPT-Modellen und OpenAI APIs
- Beherrschung des LangChain-Frameworks
- Entwicklung von RAG-Systemen (Retrieval Augmented Generation)
- Multimodale KI-Anwendungen (Text, Bild, Audio, Video)
- Einsatz lokaler und Open-Source-Modelle (Ollama)
- Fine-Tuning-Techniken und Modelloptimierung
- Entwicklung von KI-Agenten und Gradio-Benutzeroberflächen



# 4 📁 Repository-Struktur

```
GenAI/
├── 01 ipynb/                   # 📚 Jupyter Notebooks (Hauptkursmaterialien)
│   ├── M00_Kurs_Intro.ipynb      # Kurseinführung und Überblick
│   ├── M01_GenAI_Intro.ipynb     # Einführung in Generative AI
│   ├── M02_Modellsteuerung_und_optimierung.ipynb
│   ├── M03_Codieren_mit_GenAI.ipynb
│   ├── M04_LangChain101.ipynb
│   ├── M05_LLM_Transformer.ipynb
│   ├── M06_Chat_Memory.ipynb
│   ├── M07_OutputParser.ipynb
│   ├── M08_Retrieval_Augmented_Generation.ipynb
│   ├── M09_Multimodal_Bild.ipynb
│   ├── M10_Agenten.ipynb
│   ├── M11_Gradio.ipynb
│   ├── M12_Lokale_Open_Source_Modelle.ipynb
│   ├── M13_SQL_RAG.ipynb
│   ├── M14_Multimodal_RAG.ipynb
│   ├── M15_Multimodal_Audio.ipynb
│   ├── M16_Multimodal_Video.ipynb
│   ├── M17_MCP_Model_Context_Protocol.ipynb
│   └── M18_Fine_Tuning.ipynb
├── 02 data/                    # 📊 Trainingsdaten und Beispieldateien
│   ├── biografien_1.txt          # Beispielbiografien für RAG
│   ├── biografien_2.md
│   ├── biografien_3.pdf
│   ├── biografien_4.docx
│   ├── customers.db              # SQLite Datenbank für SQL RAG
│   ├── northwind.db              # Beispiel-Datenbank
│   ├── mein_buch.pdf             # Beispiel-PDF für Textverarbeitung
│   ├── apfel.jpg                 # Beispielbilder für Bildverarbeitung
│   ├── people.jpg
│   ├── *_training_final.jsonl    # Fine-Tuning Datensätze
│   ├── *_testset_final.jsonl
│   └── *.mp3, *.mp4, *.wav       # Audio/Video-Beispiele
├── 03 doc/                     # 📖 Dokumentation und Ressourcen
│   └── GenAI_all_in_one.pdf      # Kursskript
├── LICENSE                     # MIT-Lizenzinformationen
└── README.md                   # Projekt-README

```


# 5 📋 Kursstruktur

## 5.1 Basismodule (1-12) - Obligatorisch
| Modul | Thema              | Beschreibung                                             |
| ----- | ------------------ | -------------------------------------------------------- |
| M01   | GenAI Intro        | Überblick Generative AI, OpenAI, Hugging Face, LangChain |
| M02   | Modellsteuerung    | Prompting, Context Engineering, RAG, Fine-Tuning         |
| M03   | Codieren mit GenAI | Prompting für Code, Debugging, Grenzen                   |
| M04   | LangChain 101      | Architektur, Kernkonzepte, Best Practices                |
| M05   | LLM & Transformer  | Foundation Models, Transformer-Architektur               |
| M06   | Chat & Memory      | Kurz-/Langzeit-Memory, Externes Memory                   |
| M07   | Output Parser      | Strukturierte Ausgaben, JSON, Custom Parser              |
| M08   | RAG                | ChromaDB, Embeddings, Q&A über Dokumente                 |
| M09   | Multimodal Bild    | Bildgenerierung, In-/Outpainting, Klassifizierung        |
| M10   | Agents             | KI-Agenten, Architekturen, Multi-Agenten-Systeme         |
| M11   | Gradio             | UI-Entwicklung für KI-Anwendungen                        |
| M12   | Lokale Modelle     | Ollama, Open Source vs. Closed Source                    |

## 5.2 Erweiterungsmodule (13-23) - Fakultativ

| Modul | Thema                        | Beschreibung                                       |
| ----- | ---------------------------- | -------------------------------------------------- |
| M13   | SQL RAG                      | Integration von LLMs mit Datenbanken               |
| M14   | Multimodal RAG               | Text und Bilder kombiniert verarbeiten             |
| M15   | Multimodal Video             | Video-zu-Text, Video-Analyse, Objekterkennung      |
| M16   | Multimodal Audio             | Speech-to-Text, Text-to-Speech, Audio-Pipeline     |
| M17   | MCP - Model Context Protocol | Standardisiertes Protokoll für Tool-Einsatz        |
| M18   | Fine-Tuning                  | Parameter Efficient Fine-Tuning, Modellevaluierung |
| M19   | Modellauswahl und Evaluation | Systematische Modellauswahl und Bewertung          |
| M20   | Advanced Prompt Engineering  | Fortgeschrittene Prompt-Strategien und -Techniken  |
| M21   | Context Engineering          | Strategien für effektives Context Management       |
| M22   | EU AI Act / Ethik            | Rechtliche Compliance und ethische KI-Entwicklung  |
| M23   | KI-Challenge                 | Praktische Integration aller Kursmodule            |

# 6 🛠️ Technisches Setup

- Browser mit Internet-Zugang
- Google-Account
- Installation Google Colab


# 7 🌟 Entwicklungsumgebung
- **Plattform**: Google Colab
- **Sprache**: Python 3.11+
- **Vorwissen**: Solide Python-Grundkenntnisse erforderlich

# 8 🔑 Erforderliche API-Schlüssel
- **OpenAI-Account**: Für Zugang ChatGPT
- **OpenAI API Key**: Für GPT-Modelle (kostenpflichtig, ca. 5 EUR für den gesamten Kurs)
- **Hugging Face Account und Hugging Face Token**: Für Community-Modelle (beides kostenlos)


# 9 🔧 Verwendete Technologien

### Hauptframeworks
- **OpenAI API** (>=1.0.0): GPT-4o-mini, Text-Embedding-3-small, DALL-E
- **LangChain** (>=0.2.0): Prompts, Chains, Parser, Runnables, Agents, ChromaDB Integration
- **Hugging Face**: Transformers, Community-Modelle, Tokenizer

### Spezialisierte Tools
- **ChromaDB**: Vektor-Datenbank für RAG-Systeme und Embeddings
- **Ollama**: Lokale Modellausführung (Llama, Mistral, etc.)
- **Gradio** (>=3.x): Benutzeroberflächen-Entwicklung für KI-Apps

### Weitere Tools
- **MarkItDown**: Markdown-Verarbeitung
- **Unstructured**: Dokumentenverarbeitung
- **PyPDF**: PDF-Verarbeitung
- **SQLite**: Datenbank-Integration
- **NumPy** (>=1.24.0) & **Pandas** (>=2.0.0): Datenverarbeitung

# 10 💡 Hinweise für Lernende

- Jedes Notebook ist eigenständig und kann unabhängig ausgeführt werden
- Umgebungssetup erfolgt automatisch über das `genai_lib` Utility-Paket
- Modifikation der Beispiele wird ausdrücklich als Lernübung empfohlen
- Fortschreitende Komplexität innerhalb jeder Modulreihe
- Praktische Übungen am Ende jedes Moduls

## Code-Konventionen

### Namenskonventionen
- **snake_case** für Variablen, Funktionen und Klassennamen
  - Beispiele: `model_output`, `training_data`, `load_model()`, `text_generator`

### Stil-Richtlinien
- Befolgen des Python Style Guide (PEP 8)
- Kurze, verständliche Kommentare für Code-Blöcke
- Aussagekräftige Variablen- und Funktionsnamen
- Maximale Zeilenlänge: 88 Zeichen (Black-Standard)
- Docstrings für alle Funktionen und Klassen

## Best Practices

### API-Integration
- Sichere Verwaltung von API-Keys über Umgebungsvariablen
- Rate Limiting beachten
- Fehlerbehandlung und Retry-Logik implementieren
- Caching für wiederholte Anfragen nutzen

### Deployment
- Gradio-Apps für schnelles Prototyping
- Monitoring und Logging einrichten
- Performance-Optimierung durchführen

## Sicherheit & Ethik

- Verantwortungsvoller Umgang mit generierten Inhalten
- Bias-Erkennung und -Minimierung
- Transparenz über KI-generierte Inhalte
- Datenschutz und DSGVO-Konformität beachten


# 11 📚 Ressourcen & Dokumentation

### Externe Dokumentationen
- [LangChain Docs](https://python.langchain.com/) - LangChain Python Dokumentation
- [OpenAI API Reference](https://platform.openai.com/docs) - OpenAI API Dokumentation
- [Gradio Documentation](https://www.gradio.app/docs) - Gradio Framework Dokumentation
- [Hugging Face Docs](https://huggingface.co/docs) - Hugging Face Transformers

### Interne Dokumentation
- Vollständiges Kursskript: `03 doc/GenAI_all_in_one.pdf`
- Jupyter Notebooks mit ausführlichen Beispielen im `01 ipynb/` Verzeichnis
- Code-Kommentare und Docstrings in allen Python-Modulen
- CLAUDE.md: Projektinstruktionen für Claude Code

### Externe Kurse (im Repository enthalten)
- Google Course GenAI (5-tägig)
- DeepLearning.AI Kurse zu RAG und Chroma
- LangChain Tutorials und Course


# 12 ⚖️ Lizenzen

Der **Quellcode** steht unter der [MIT License](./LICENSE).  
Die **Kursmaterialien** (z. B. Folien, Texte, Grafiken) sind unter der [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) veröffentlicht.
**Northwind-Datenbank** von Microsoft unter Microsoft Public License (Ms-PL).     
Bilder und Videos erstellt mit **Hedra AI** – Nutzung gemäß Hedra Nutzungsbedingungen ([hedra terms)“](https://www.hedra.com/terms\)%E2%80%9C)

© 2025 Ralf-42



---

**Letzte Aktualisierung:** Oktober 2025
**Version:** 1.1
**Maintainer:** Ralf-42
