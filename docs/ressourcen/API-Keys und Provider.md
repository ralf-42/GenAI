---
layout: default
title: API-Keys & Provider
parent: Ressourcen
nav_order: 1
description: "Übersicht über LLM-Provider, API-Keys und Colab-Integration"
has_toc: true
---

# API-Keys & Provider
{: .no_toc }

> **LLM-Provider im Überblick**
> Kostenlose API-Keys, Zahlungsweisen und Google Colab Integration

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Übersicht der LLM-Provider

Diese Tabelle bietet eine Übersicht über die wichtigsten LLM-Provider mit ihren Zahlungsweisen, kostenlosen Optionen und der Integration in Google Colab.

| Provider | Zahlungsweisen | PayPal verfügbar? | Kostenloser API-Key? | Colab-Kompatibilität |
|---|---|---|---|---|
| **OpenAI** | Kreditkarte, PayPal (ab 2026) | Ja (zukünftig) | Nein (Freemium) | Ja: `!pip install openai`, `os.environ["OPENAI_API_KEY"]` [bnaskrecki.faculty.wmi.amu](https://bnaskrecki.faculty.wmi.amu.edu.pl/jupybook/llm_workshop/google_colab_chatgpt_tutorial.html) |
| **Google AI Studio** | Kreditkarte, PayPal | Ja | Ja (Gemini, hohe Limits) | Ja: Native Gemini in Colab, `ChatGoogleGenerativeAI` [colab.research.google](https://colab.research.google.com/) |
| **Groq** | Kreditkarte | Nein | Ja (große Limits) | Ja: `!pip install langchain-groq`, `os.environ["GROQ_API_KEY"]` [apidog](https://apidog.com/de/blog/free-open-source-llm-apis-4/) |
| **Together AI** | Kreditkarte | Nein | Ja (Freemium) | Ja: `ChatTogether` mit Key in Colab [madappgang](https://madappgang.com/blog/best-free-ai-apis-for-2025-build-with-llms-without/) |
| **OVH Cloud** | Kreditkarte, Rechnung | Nein | Ja (Mistral/Llama) | Ja: Standard LangChain-Integration [benutzerfreun](https://www.benutzerfreun.de/websites-entwickeln-mit-ki/kostenloser-zugang-zu-open-source-sprachmodellen/) |
| **OpenRouter** | Kreditkarte | Nein | Ja (Testlimits) | Ja: Multi-Provider Key via Colab [apidog](https://apidog.com/de/blog/free-open-source-llm-apis-4/) |
| **Cloudflare Workers AI** | Kostenlos (Limits) | Nein | Ja (vollständig) | Ja: `ChatCloudflareWorkersAI` [madappgang](https://madappgang.com/blog/best-free-ai-apis-for-2025-build-with-llms-without/) |

---

## Google Colab Integration

### Sichere API-Key Verwaltung in Colab

**Best Practice: Colab Secrets verwenden**

```python
# Installiere benötigte Bibliothek
!pip install langchain-{provider}

# Sichere Key-Verwaltung über Colab Secrets
from google.colab import userdata
import os

# API-Key aus Colab Secrets laden
os.environ["OPENAI_API_KEY"] = userdata.get('OPENAI_API_KEY')
os.environ["GROQ_API_KEY"] = userdata.get('GROQ_API_KEY')
```

**So speichern Sie Keys in Colab Secrets:**
1. Klicken Sie auf das Schlüssel-Symbol 🔑 in der linken Sidebar
2. Fügen Sie Ihren API-Key hinzu (z.B. `OPENAI_API_KEY`)
3. Verwenden Sie `userdata.get('KEY_NAME')` im Code

### Provider-spezifische Installation

**OpenAI:**
```python
!pip install langchain-openai
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
```

**Google Gemini:**
```python
!pip install langchain-google-genai
from langchain_google_genai import ChatGoogleGenerativeAI
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0)
```

**Groq:**
```python
!pip install langchain-groq
from langchain_groq import ChatGroq
llm = ChatGroq(model="mixtral-8x7b-32768", temperature=0)
```

---

## Kostenlose Provider-Empfehlungen

### Für Anfänger & Studenten

**1. Google AI Studio (Gemini)**
- ✅ **Komplett kostenlos** mit hohen Limits
- ✅ **PayPal-Zahlung** möglich
- ✅ **Native Colab-Integration**
- ✅ **Multimodal** (Text, Bild, Audio)

**2. Groq**
- ✅ **Sehr schnell** (Hardware-beschleunigt)
- ✅ **Großzügige kostenlose Limits**
- ✅ **Open-Source-Modelle** (Llama, Mixtral)

**3. Cloudflare Workers AI**
- ✅ **Vollständig kostenlos** (mit Limits)
- ✅ **Keine Kreditkarte nötig**
- ✅ **Mehrere Modelle verfügbar**

### Für Produktivnutzung

**OpenAI (GPT-4)**
- 💰 **Pay-as-you-go** (ab 5$)
- ✅ **Beste Qualität** für komplexe Aufgaben
- ✅ **PayPal ab 2026**

**Together AI**
- 💰 **Freemium** mit kostenlosen Credits
- ✅ **Open-Source-Modelle** zu günstigen Preisen

---

## Lokale Modelle ohne API-Keys

### Ollama in Google Colab

Für vollständige Kontrolle und keine API-Kosten:

```python
# Ollama in Colab installieren (mit GPU-Unterstützung)
!curl -fsSL https://ollama.com/install.sh | sh
!ollama serve &
!ollama pull llama3

# Mit LangChain verwenden
from langchain_community.llms import Ollama
llm = Ollama(model="llama3")
```

**Vorteile:**
- ✅ Keine API-Kosten
- ✅ Vollständige Datenkontrolle
- ✅ Offline-fähig
- ✅ GPU-beschleunigt in Colab

**Nachteile:**
- ⚠️ Langsamere Performance als Cloud-APIs
- ⚠️ Begrenzte Modellgröße (RAM-Limits)

---

## Sicherheitshinweise

### ❌ NIEMALS:
- API-Keys in Code oder Notebooks committen
- Keys in öffentlichen Repositories veröffentlichen
- Keys unverschlüsselt in Dateien speichern

### ✅ IMMER:
- `.env`-Dateien für lokale Entwicklung verwenden
- Colab Secrets für Notebooks nutzen
- API-Keys regelmäßig rotieren
- Nutzungslimits überwachen

### Beispiel: Sichere `.env` Datei (lokal)

```bash
# .env (NIEMALS committen!)
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...
GOOGLE_API_KEY=...
```

```python
# In Python laden
from dotenv import load_dotenv
import os

load_dotenv()
openai_key = os.getenv("OPENAI_API_KEY")
```

---

## Weiterführende Links

- [OpenAI Platform](https://platform.openai.com/)
- [Google AI Studio](https://makersuite.google.com/)
- [Groq Cloud](https://console.groq.com/)
- [Together AI](https://www.together.ai/)
- [Ollama](https://ollama.com/)
- [LangChain Provider Documentation](https://python.langchain.com/docs/integrations/chat/)

---

**Version:** 1.0
**Letzte Aktualisierung:** Dezember 2024
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
