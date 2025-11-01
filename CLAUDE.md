# Projekt: Generative KI

## Projektübersicht

Dieses Projekt befasst sich mit generativer Künstlicher Intelligenz und deren praktischen Anwendungen. Es umfasst Implementierungen, Experimente und Dokumentationen zu verschiedenen Aspekten generativer KI-Modelle.

## Technologie-Stack

### Programmiersprache
- **Python** (primäre Entwicklungssprache)

### KI/ML Frameworks
- **LangChain** (>=0.2.0) - **Primäre Bibliothek** für LLM-Orchestrierung, Workflow-Management, Chains und Agents
- **TensorFlow** & **Keras** - Deep Learning und neuronale Netze
- **scikit-learn** - Klassische Machine Learning Algorithmen
- **OpenAI API** (>=1.0.0) - Integration von GPT-Modellen (über LangChain bevorzugt)

### Visualisierung & UI
- **Plotly Express** - Interaktive Datenvisualisierungen
- **Gradio** (>=3.x) - Webinterfaces für ML-Modelle

## Projektstruktur

```
GenAI/
├── 00 admin/          # Administrative Dateien und Konfigurationen
├── 01 ipynb/          # Jupyter Notebooks für Kursmodule und Experimente
│   ├── .ipynb_checkpoints/  # Notebook Checkpoints
│   ├── .jupyter/      # Jupyter Konfiguration
│   └── _misc/         # Sonstige Notebook-Dateien
├── 02 data/           # Trainingsdaten und Datasets
│   └── _misc/         # Sonstige Daten
├── 03 doc/            # Dokumentation und Kursmaterialien
│   └── _misc/         # Sonstige Dokumentation
├── 05 podcast/        # Podcast-bezogene Materialien
│   └── _misc/         # Sonstige Podcast-Dateien
├── 09 Cources/        # Externe Kurse und Tutorials
│   ├── 5d Google Course GenAI/
│   ├── DeepLearning_Advanced_Retrieval_for_AI_with_Chroma/
│   ├── DeepLearning_Building_and_Evaluating_Advanced_RAG/
│   ├── DeepLearning_Building_Multimodal_Search_and_RAG/
│   ├── DeepLearning_How_Transfomer_LLMs_Work/
│   ├── langchain-course-main/
│   ├── langchain-tutorials-main/
│   ├── WUSL_app_generative_ai-main/
│   └── WUSL_generative_ai/
├── Python_Modules/    # Eigene Python-Module und Bibliotheken
│   ├── genai_lib/     # Generative AI Bibliothek
│   └── _misc/         # Sonstige Module
├── .claudeignore      # Claude Code Ignore-Datei
├── .gitignore         # Git Ignore-Datei
├── CLAUDE.md          # Claude Code Projektinstruktionen
├── LICENSE            # Lizenzinformationen
└── README.md          # Projekt-README
```

**Hinweis:** Für neue LangChain-Projekte wird empfohlen, zusätzlich folgende Verzeichnisse anzulegen:
- `src/chains/` - LangChain Chain-Implementierungen
- `src/agents/` - LangChain Agent-Implementierungen
- `src/vectorstores/` - Vektordatenbank-Integrationen
- `prompts/` - LangChain Prompt-Templates
- `tests/` - Unit und Integration Tests

## Code-Konventionen

### Namenskonventionen
- **snake_case** für:
  - Variablen: `model_output`, `training_data`
  - Funktionen: `load_model()`, `preprocess_text()`
  - Klassennamen: `text_generator`, `image_model`

### Stil-Richtlinien
- Befolgen des Python Style Guide (PEP 8)
- Kurze, verständliche Kommentare für Code-Blöcke
- Aussagekräftige Variablen- und Funktionsnamen
- Maximale Zeilenlänge: 88 Zeichen (Black-Standard)

### LangChain-Präferenzen
Bevorzuge LangChain für alle LLM-bezogenen Aufgaben:
- **LLM-Integrationen** - Nutze `ChatOpenAI`, `OpenAI` statt direkter API-Calls
- **Prompt-Management** - Verwende `PromptTemplate`, `ChatPromptTemplate`
- **Chain-Konstruktionen** - Nutze `LLMChain`, `SequentialChain`, LCEL (LangChain Expression Language)
- **Vektordatenbank-Anbindungen** - Verwende LangChain-Integrationen (Chroma, FAISS, Pinecone)
- **Agent-Implementierungen** - Nutze LangChain Agents Framework
- **RAG-Systeme** - Verwende `RetrievalQA`, `ConversationalRetrievalChain`

#### Beispiel-Imports
```python
# LLM-Integrationen
from langchain_openai import ChatOpenAI, OpenAI
from langchain_community.chat_models import ChatAnthropic

# Prompts
from langchain.prompts import PromptTemplate, ChatPromptTemplate
from langchain.prompts import SystemMessagePromptTemplate, HumanMessagePromptTemplate

# Chains
from langchain.chains import LLMChain, SequentialChain
from langchain.chains import RetrievalQA, ConversationalRetrievalChain

# Vectorstores
from langchain_community.vectorstores import Chroma, FAISS
from langchain_community.embeddings import OpenAIEmbeddings

# Agents
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.agents import Tool

# Document Loaders
from langchain_community.document_loaders import TextLoader, PDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
```

## Entwicklungsrichtlinien

### Code-Qualität
- Docstrings für alle Funktionen und Klassen
- Unit Tests für kritische Funktionalität
- Code-Reviews vor Merge

### Versionskontrolle
- Aussagekräftige Commit-Messages
- Feature-Branches für neue Entwicklungen
- Main-Branch ist produktionsreif

## Wichtige Abhängigkeiten

```python
# requirements.txt
# LangChain Stack (Priorität)
langchain>=0.2.0
langchain-openai>=0.1.0
langchain-community>=0.2.0
langchain-core>=0.2.0

# LLM APIs
openai>=1.0.0

# Vektordatenbanken
chromadb>=0.4.0
faiss-cpu>=1.7.4

# Deep Learning
tensorflow>=2.15.0
keras>=3.0.0
scikit-learn>=1.3.0

# Visualisierung & UI
plotly>=5.18.0
gradio>=3.50.0

# Basis-Bibliotheken
numpy>=1.24.0
pandas>=2.0.0
python-dotenv>=1.0.0
```

## Häufige Befehle

### Installation
```bash
# LangChain Basis-Installation
pip install langchain langchain-openai langchain-community

# Mit Vektordatenbanken
pip install langchain chromadb faiss-cpu

# Alle Abhängigkeiten
pip install -r requirements.txt
```

### Testing
```bash
# Alle Tests ausführen
python -m pytest tests/

# Mit Coverage
python -m pytest tests/ --cov=src --cov-report=html

# Spezifische Tests
python -m pytest tests/test_chains.py -v
```

### Development
```bash
# Jupyter Lab starten
jupyter lab

# LangChain Debugging (verbose mode)
export LANGCHAIN_VERBOSE=true

# API Keys setzen (Linux/Mac)
export OPENAI_API_KEY='your-key-here'

# API Keys setzen (Windows)
set OPENAI_API_KEY=your-key-here
```

## Anwendungsfälle

### 1. Text-Generierung
- GPT-basierte Textgenerierung
- Fine-tuning von Sprachmodellen
- Prompt Engineering

### 2. Bild-Generierung
- Diffusion-Modelle
- GANs (Generative Adversarial Networks)
- Style Transfer

### 3. Multimodale Anwendungen
- Text-zu-Bild
- Bild-zu-Text
- Audio-Generierung

## Best Practices

### Modell-Training
- Verwendung von Callbacks für Training-Monitoring
- Early Stopping zur Vermeidung von Overfitting
- Regelmäßiges Speichern von Checkpoints
- Learning Rate Scheduling

### API-Integration
- Sichere Verwaltung von API-Keys (Umgebungsvariablen)
- Rate Limiting beachten
- Fehlerbehandlung und Retry-Logik
- Caching für wiederholte Anfragen

### Deployment
- Gradio-Apps für schnelles Prototyping
- Docker-Container für Produktionsumgebungen
- Monitoring und Logging
- Performance-Optimierung

## Sicherheit & Ethik

- Verantwortungsvoller Umgang mit generierten Inhalten
- Bias-Erkennung und -Minimierung
- Transparenz über KI-generierte Inhalte
- Datenschutz und DSGVO-Konformität

## Ressourcen & Dokumentation

### Externe Dokumentationen
- [TensorFlow Docs](https://www.tensorflow.org/api_docs)
- [LangChain Docs](https://python.langchain.com/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Gradio Documentation](https://www.gradio.app/docs)

### Interne Dokumentation
- API-Dokumentation im `/docs` Ordner
- Jupyter Notebooks mit Beispielen
- Code-Kommentare und Docstrings

## Kontakt & Zusammenarbeit

Für Fragen, Vorschläge oder Zusammenarbeit:
- Issues im Repository erstellen
- Pull Requests willkommen
- Code Reviews durch Team-Mitglieder

## Lizenz

 MIT License - Copyright (c) 2025 Ralf


**Letzte Aktualisierung:** Oktober 2025  
**Version:** 1.0  
**Maintainer:** Ralf
- ImportError                               Traceback (most recent call last)
/tmp/ipython-input-2948938534.py in <cell line: 0>()
      5 from langchain_community.utilities import SQLDatabase
      6 from langchain_community.agent_toolkits import create_sql_agent
----> 7 from langchain.agents import Tool  # Für Custom Tools
      8 from langchain_core.callbacks import BaseCallbackHandler
      9 from typing import Any, Dict

ImportError: cannot import name 'Tool' from 'langchain.agents' (/usr/local/lib/python3.12/dist-packages/langchain/agents/__init__.py)