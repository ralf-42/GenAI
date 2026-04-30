---
layout: default
title: API-Keys & Provider
parent: Ressourcen
nav_order: 2
description: Übersicht über LLM-Provider, API-Keys und Colab-Integration
has_toc: true
---

# API-Keys & Provider
{: .no_toc }

> [!NOTE] Provider-Übersicht<br>
> Die Tabelle ordnet LLM-Provider, Integrationspakete und typische Zugangswege für Kursnotebooks ein.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Übersicht der LLM-Provider

Diese Tabelle bietet eine Übersicht über LLM-Provider mit ihren Zahlungsweisen, kostenlosen Optionen und der Integration in Google Colab. Die Angaben zu Zahlungsweisen, Freikontingenten und PayPal-Verfügbarkeit sind zeitabhängig und beziehen sich auf den dokumentierten Stand Dezember 2025. Vor produktiver Nutzung müssen die aktuellen Provider-Seiten geprüft werden.

| Model Provider          | Integration Package           | Zahlungsweisen                    | PayPal verfügbar? | Kostenloser API-Key?       | Hinweise / Besonderheiten                                                  |
| ----------------------- | ----------------------------- | --------------------------------- | ----------------- | -------------------------- | -------------------------------------------------------------------------- |
| openai                  | langchain-openai              | Kreditkarte, PayPal (ab 2026)     | Ja (zukünftig)    | Nein (begrenztes Freemium) | Weit verbreitet, stabil, offizielle PayPal-Koordination mit Agent Toolkit. |
| anthropic               | langchain-anthropic           | Kreditkarte                       | Nein              | Ja (Freemium)              | Fokus auf Sicherheit und RLHF, PayPal aktuell nicht unterstützt.           |
| azure_openai            | langchain-openai              | Kreditkarte, Microsoft Abrechnung | Nein              | Nein                       | Azure-Wrapper für OpenAI, keine PayPal-Zahlung.                            |
| azure_ai                | langchain-azure-ai            | Kreditkarte, Rechnung             | Nein              | Ja (Freemium)              | Microsoft Azure KI-Dienste, Enterprise-fokussiert.                         |
| google_vertexai         | langchain-google-vertexai     | Kreditkarte, PayPal               | Ja                | Ja (hohe Limits)           | Google Cloud, Gemini Modelle, PayPal möglich.                              |
| google_genai            | langchain-google-genai        | Kreditkarte, PayPal               | Ja                | Ja (hohe Limits)           | Google Generative AI mit nativer Cloud-Integration.                        |
| bedrock                 | langchain-aws                 | Kreditkarte                       | Nein              | Nein                       | AWS Bedrock Modelle, keine PayPal-Unterstützung.                           |
| bedrock_converse        | langchain-aws                 | Kreditkarte                       | Nein              | Nein                       | AWS Conversational Endpoints, kein PayPal.                                 |
| cohere                  | langchain-cohere              | Kreditkarte                       | Nein              | Ja (Freemium)              | Gute Text- und Embedding-Leistung.                                         |
| fireworks               | langchain-fireworks           | Kreditkarte                       | Nein              | Ja                         | Multimodale Anwendungsfälle, kein PayPal.                                  |
| together                | langchain-together            | Kreditkarte                       | Nein              | Ja (Freemium)              | Community-getriebene Modelle.                                              |
| mistralai               | langchain-mistralai           | Kreditkarte                       | Nein              | Ja                         | Effiziente Open-Source-Modelle.                                            |
| huggingface             | langchain-huggingface         | Kreditkarte, Open Source          | Nein              | Ja                         | Zugang zum Huggingface Hub, große Modellvielfalt.                          |
| groq                    | langchain-groq                | Kreditkarte                       | Nein              | Ja (gute Ratenlimits)      | Hochleistungs-Hardwareoptimierte Modelle.                                  |
| ollama                  | langchain-ollama              | Lokalinstallation                 | Nein              | Ja                         | Lokal laufende Modelle, keine Cloudabhängigkeit.                           |
| google_anthropic_vertex | langchain-google-vertexai     | Kreditkarte, PayPal               | Ja                | Ja                         | Google Vertex AI mit Anthropic Modellen.                                   |
| deepseek                | langchain-deepseek            | PayPal (limitierte Länder)        | Ja                | Ja                         | Nur PayPal-Zahlung, API-Key Nutzung via PayPal-Authentifizierung.          |
| ibm                     | langchain-ibm                 | Kreditkarte                       | Nein              | Nein                       | IBM Watson KI, hauptsächlich Enterprise.                                   |
| nvidia                  | langchain-nvidia-ai-endpoints | Kreditkarte                       | Nein              | Nein                       | NVIDIA KI mit Hardwarefokus.                                               |
| xai                     | langchain-xai                 | Kreditkarte                       | Nein              | Nein                       | Fokus auf erklärbare KI.                                                   |
| perplexity              | langchain-perplexity          | Kreditkarte                       | Nein              | Ja                         | Dynamische Wissensextraktion, Websuche-basiert.                            |

---

## Google Colab Integration

### Sichere API-Key Verwaltung in Colab

**Best Practice: Colab Secrets verwenden**

```python
# Installiere benötigte Bibliothek
!pip install langchain-{provider}
```

**So werden Keys in Colab Secrets gespeichert:**
1. Das Schlüssel-Symbol 🔑 in der linken Sidebar öffnen
2. Den gewünschten API-Key hinzufügen (z.B. `OPENAI_API_KEY`)


### Provider-spezifische Installation

**OpenAI:**
```python
!pip install langchain-openai
from langchain.chat_models import init_chat_model
llm = init_chat_model("openai:gpt-4o-mini", temperature=0.0)
```

**Google Gemini:**
```python
!pip install langchain-google-genai
from langchain.chat_models import init_chat_model
llm = init_chat_model("google:gemini-pro", temperature=0.0)
```

**Groq:**
```python
!pip install langchain-groq
from langchain.chat_models import init_chat_model
llm = init_chat_model("groq:mixtral-8x7b-32768", temperature=0.0)
```

---

## Provider-Empfehlungen für Tests

### Für Einstieg und Kursübungen

**1. Google AI Studio (Gemini)**
Google AI Studio eignet sich für Kursübungen, wenn ein schneller Einstieg mit Gemini-Modellen und Colab-Integration im Vordergrund steht. Kostenlose Kontingente und Zahlungsoptionen müssen vor der Nutzung im jeweiligen Konto geprüft werden.

**2. Groq**
Groq ist für Experimente mit schnellen Inferenzzeiten interessant. Der praktische Nutzen hängt von den aktuell verfügbaren Modellen, Limits und Nutzungsbedingungen ab.

**3. Cloudflare Workers AI**
Cloudflare Workers AI kann für kleinere Experimente geeignet sein, wenn serverlose Bereitstellung und einfache Modelltests im Vordergrund stehen. Limits und Account-Anforderungen sind providerabhängig.

### Für Produktivnutzung

**OpenAI**
OpenAI eignet sich für produktionsnahe Tests, wenn stabile APIs, gute Dokumentation und breite Tool-Unterstützung wichtig sind. Kosten, Modelle und Zahlungsoptionen ändern sich regelmäßig.

**Together AI**
Together AI ist interessant, wenn Open-Weight-Modelle über eine gehostete API getestet werden sollen. Auch hier müssen verfügbare Modelle, Preise und Limits vorab geprüft werden.

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
- Keine API-Kosten
- Vollständige Datenkontrolle
- Offline-fähig
- GPU-beschleunigt in Colab

**Nachteile:**
- Langsamere Performance als Cloud-APIs
- Begrenzte Modellgröße durch RAM-Limits

---

## Sicherheitshinweise

### Nicht zulässig
- API-Keys in Code oder Notebooks committen
- Keys in öffentlichen Repositories veröffentlichen
- Keys unverschlüsselt in Dateien speichern

### Mindeststandard
- `.env`-Dateien für lokale Entwicklung verwenden
- Colab Secrets für Notebooks nutzen
- API-Keys regelmäßig rotieren
- Nutzungslimits überwachen

---

## Weiterführende Links

- [OpenAI Platform](https://platform.openai.com/)
- [Google AI Studio](https://makersuite.google.com/)
- [Groq Cloud](https://console.groq.com/)
- [Together AI](https://www.together.ai/)
- [Ollama](https://ollama.com/)
- [LangChain Provider Documentation](https://python.langchain.com/docs/integrations/chat/)

---

**Version:** 1.0<br>
**Stand:** Dezember 2025<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
