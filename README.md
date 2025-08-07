# 1 Generative AI Kurs

Ein umfassender deutschsprachiger Kurs zu praktischen Anwendungen von Generative AI Technologien.

## 1.1 📚 Kursübersicht

Dieser Kurs bietet eine praxisorientierte Einführung in moderne GenAI-Technologien mit Fokus auf OpenAI GPT-Modelle, Hugging Face und LangChain. Alle Materialien sind in deutscher Sprache verfasst und für die Ausführung in Google Colab optimiert.

## 1.2 🎯 Lernziele

- Verstehen der Grundlagen von Generative AI
- Praktische Anwendung von GPT-Modellen
- Beherrschung des LangChain-Frameworks
- Entwicklung von RAG-Systemen (Retrieval Augmented Generation)
- Multimodale KI-Anwendungen (Text, Bild, Audio, Video)
- Einsatz lokaler und Open-Source-Modelle
- Fine-Tuning-Techniken

## 1.3 📖 Notebooks

### 1.3.1 Grundlagen
- **M00**: Kurs-Einführung und Umgebungssetup
- **M01**: Einführung in Generative AI
- **M02**: Modellsteuerung und Optimierung
- **M03**: Codieren mit GenAI

### 1.3.2 Framework-Expertise
- **M04**: LangChain 101 - Kernkonzepte
- **M05**: LLM und Transformer-Architekturen
- **M06**: Chat Memory - Konversationsgedächtnis
- **M07**: Output Parser - Strukturierte Ausgaben

### 1.3.3 Erweiterte Anwendungen
- **M08**: Retrieval Augmented Generation (RAG)
- **M09**: Multimodale Bildverarbeitung
- **M10**: KI-Agenten
- **M11**: Gradio - UI-Entwicklung
- **M12**: Lokale und Open-Source-Modelle
- **M13**: SQL RAG - Datenbankintegration

### 1.3.4 Spezialisierung
- **M14**: Multimodale Audioverarbeitung
- **M15**: Multimodale Videoverarbeitung
- **M16**: Fine-Tuning-Techniken


## 1.4 🛠️ Technische Voraussetzungen

### 1.4.1 Entwicklungsumgebung
- **Plattform**: Google Colab (empfohlen)
- **Sprache**: Python 3.11+
- **Vorwissen**: Solide Python-Grundkenntnisse erforderlich

### 1.4.2 Erforderliche API-Schlüssel
- **OpenAI API Key**: Für GPT-Modelle (kostenpflichtig, ~5-10 EUR für den gesamten Kurs)
- **Hugging Face Token**: Für Community-Modelle (kostenlos)

### 1.4.3 Setup
Jedes Notebook beginnt mit diesem standardisierten Setup:

```python
!uv pip install --system -q git+https://github.com/ralf-42/genai_lib
from genai_lib.utilities import check_environment, get_ipinfo, setup_api_keys, mprint, install_packages
setup_api_keys(['OPENAI_API_KEY', 'HF_TOKEN'], create_globals=False)
```

## 1.5 🚀 Schnellstart

1. **Google Colab öffnen**: Gehen Sie zu [colab.research.google.com](https://colab.research.google.com)
2. **Notebook hochladen**: Laden Sie eines der Notebooks aus dem `01 ipynb/` Ordner hoch
3. **API-Schlüssel konfigurieren**: 
   - Fügen Sie Ihre API-Schlüssel in Google Colab Secrets hinzu
   - Name: `OPENAI_API_KEY` und `HF_TOKEN`
4. **Setup ausführen**: Führen Sie die erste Zelle für die Umgebungseinrichtung aus
5. **Lernen beginnen**: Arbeiten Sie sich durch die Notebook-Zellen

## 1.6 🔧 Verwendete Technologien

- **OpenAI**: GPT-4o-mini, o3-mini mit Parameteroptimierung
- **LangChain**: Prompts, Chains, Parser, Runnables, Agents
- **Hugging Face**: Modellzugriff, Transformers, Community-Modelle
- **ChromaDB**: Vektor-Datenbank für RAG-Systeme
- **Ollama**: Lokale Modellausführung
- **Gradio**: Benutzeroberflächen-Entwicklung


## 1.7 💡 Hinweise für Lernende

- Jedes Notebook ist eigenständig und kann unabhängig ausgeführt werden
- Umgebungssetup erfolgt automatisch über das `genai_lib` Utility-Paket
- Modifikation der Beispiele wird ausdrücklich als Lernübung empfohlen
- Fortschreitende Komplexität innerhalb jeder Modulreihe


## 1.8 ⚖️ Lizenz

Dieses Repository enthält Bildungsmaterialien für den Kursgebrauch. MIT License.

---

*Entwickelt für deutschsprachige Entwickler und Data Scientists mit Fokus auf praktische GenAI-Anwendungen.*