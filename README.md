# Generative KI Kurs

Ein umfassender deutschsprachiger Kurs zu praktischen Anwendungen von Generative AI Technologien.

# 1 📚 Kursübersicht

Dieser Kurs bietet eine praxisorientierte Einführung in moderne GenAI-Technologien mit Fokus auf OpenAI GPT-Modelle, Hugging Face und LangChain. Alle Materialien sind in deutscher Sprache verfasst und für die Ausführung in Google Colab optimiert.

# 2 🎯 Lernziele

- Verstehen der Grundlagen von Generative AI
- Praktische Anwendung von GPT-Modellen
- Beherrschung des LangChain-Frameworks
- Entwicklung von RAG-Systemen (Retrieval Augmented Generation)
- Multimodale KI-Anwendungen (Text, Bild, Audio, Video)
- Einsatz lokaler und Open-Source-Modelle
- Fine-Tuning-Techniken


# 3 🛠️ Technische Voraussetzungen

## 3.1 Entwicklungsumgebung
- **Plattform**: Google Colab (empfohlen)
- **Sprache**: Python 3.11+
- **Vorwissen**: Solide Python-Grundkenntnisse erforderlich

## 3.2 Erforderliche API-Schlüssel
- **OpenAI API Key**: Für GPT-Modelle (kostenpflichtig, ~5-10 EUR für den gesamten Kurs)
- **Hugging Face Token**: Für Community-Modelle (kostenlos)

## 3.3 Setup
Jedes Notebook beginnt mit diesem standardisierten Setup:

```python
!uv pip install --system -q git+https://github.com/ralf-42/genai_lib
from genai_lib.utilities import check_environment, get_ipinfo, setup_api_keys, mprint, install_packages
setup_api_keys(['OPENAI_API_KEY', 'HF_TOKEN'], create_globals=False)
```

# 4 🚀 Schnellstart

1. **Google Colab öffnen**: Gehen Sie zu [colab.research.google.com](https://colab.research.google.com)
2. **Notebook hochladen**: Laden Sie eines der Notebooks aus dem `01 ipynb/` Ordner hoch
3. **API-Schlüssel konfigurieren**: 
   - Fügen Sie Ihre API-Schlüssel in Google Colab Secrets hinzu
   - Name: `OPENAI_API_KEY` und `HF_TOKEN`
4. **Setup ausführen**: Führen Sie die erste Zelle für die Umgebungseinrichtung aus
5. **Lernen beginnen**: Arbeiten Sie sich durch die Notebook-Zellen

# 5 🔧 Verwendete Technologien

- **OpenAI**: GPT-4o-mini, o3-mini mit Parameteroptimierung
- **LangChain**: Prompts, Chains, Parser, Runnables, Agents
- **Hugging Face**: Modellzugriff, Transformers, Community-Modelle
- **ChromaDB**: Vektor-Datenbank für RAG-Systeme
- **Ollama**: Lokale Modellausführung
- **Gradio**: Benutzeroberflächen-Entwicklung


# 6 💡 Hinweise für Lernende

- Jedes Notebook ist eigenständig und kann unabhängig ausgeführt werden
- Umgebungssetup erfolgt automatisch über das `genai_lib` Utility-Paket
- Modifikation der Beispiele wird ausdrücklich als Lernübung empfohlen
- Fortschreitende Komplexität innerhalb jeder Modulreihe


# 7 ⚖️ Lizenz

Dieses Repository enthält Bildungsmaterialien für den Kursgebrauch. MIT License.

---

*Entwickelt für deutschsprachige Entwickler und Data Scientists mit Fokus auf praktische GenAI-Anwendungen.*