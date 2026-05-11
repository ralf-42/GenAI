---
layout: default
title: Modell-Auswahl Guide
parent: Modell-Auswahl
grand_parent: Frameworks
nav_order: 1
description: "Welches Modell für welche Aufgabe? Praktische Designregeln für gpt-5.4-nano, gpt-5.4-mini, Vision- und Medienmodelle im GenAI-Kurs."
has_toc: true
---

# Modell-Auswahl Guide
{: .no_toc }

> **Welches Modell für welche Aufgabe?**
> Praktische Designregeln und Modul-Mapping für den GenAI-Kurs.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Modelle im Kurs

| Modell | Stärke | Typischer Einsatz im Kurs |
|---|---|---|
| `gpt-5.4-nano` | Günstig, schnell, GPT-5.x-Basis | Grundlagen, Demos, einfache Chains |
| `gpt-5.4-mini` | Coding, Inhalts-Generierung, konfigurierbare Reasoning-Tiefe, multimodale Analyse | RAG-Synthese, komplexe Outputs, strukturierte Generierung, M16-Bildanalyse |
| `gpt-5.4` | Starke Reasoning-Qualität | Judge, Evaluation, Supervisor-Entscheidungen |
| `gpt-image-1` / `gpt-image-2` | Bildgenerierung und Bildbearbeitung | M16 Bildgenerierung und Image Editing |
| `whisper-1` | Audio-Transkription | M19 Video-to-Text über extrahiertes Audio |
| `sora-2` | Videoerzeugung | M19 Image-to-Video / Text-to-Video |

> [!TIP] Faustregel Modellwahl<br>
> Nicht das stärkste Modell wählen — das *passende* für die Aufgabe.
> Mit `gpt-5.4-nano` starten, nur bei echtem Bedarf upgraden.

---

## Designregeln

### Regel 1 — Grundlagen und Demos: `gpt-5.4-nano`

Alle Module, in denen das Konzept im Vordergrund steht (nicht die Ausgabequalität), verwenden `gpt-5.4-nano`.
Begründung: Günstigstes GPT-5.x-Modell — konsistent mit der gesamten Modell-Konfiguration, kein `temperature`.

```python
from langchain.chat_models import init_chat_model

llm = init_chat_model("openai:gpt-5.4-nano")
```

> [!NOTE] Keine temperature bei BASELINE<br>
> `temperature` ist bei der gesamten GPT-5.x-Serie outdated. Deterministische Ausgaben über präzise Prompts steuern.

### Regel 2 — RAG-Synthese und komplexe Inhalts-Generierung: `gpt-5.4-mini`

Wenn die Ausgabequalität entscheidend ist — z. B. bei der Synthese von Dokumenten-Chunks oder der Generierung strukturierter Berichte — kommt `gpt-5.4-mini` zum Einsatz.

```python
# Korrekt: ohne temperature (API-Kompatibilität)
rag_llm = init_chat_model("openai:gpt-5.4-mini")
```

> [!DANGER] temperature-Parameter führt zu API-Fehler<br>
> `temperature` führt bei `gpt-5.4-mini` zu einem API-Fehler, außer wenn `reasoning_effort="none"` gesetzt ist.
> **Empfehlung:** `temperature` weglassen und `reasoning_effort` zur Qualitätssteuerung nutzen.

### Regel 3 — Multimodale Analyse: Vision-Modell statt Text-Baseline

Aufgaben mit Bildinput, Frame-Analyse oder kombiniertem Text-Bild-Input erfordern ein Modell mit Vision-Unterstützung.
`gpt-5.4-nano` ist die Text-/Demo-Baseline und wird **nicht** pauschal für Bildanalyse eingesetzt.
Für Bildanalyse nutzt M16 `gpt-5.4-mini`; M19 Frame-Analyse ebenfalls mit `gpt-5.4-mini`.

```python
multimodal_llm = init_chat_model("openai:gpt-5.4-mini")
```

Medien-Endpunkte wie Bildgenerierung, Transkription oder Videoerzeugung laufen im Kurs teilweise direkt über die OpenAI-API, weil LangChain diese Pipeline-Komponenten nicht vollständig abbildet.

### Regel 4 — Einfache Extraktion und Klassifikation: immer `gpt-5.4-nano`

Strukturierte Datenextraktion aus klar definierten Texten, einfache Klassifikation, Formatierung:
Premium-Modelle bringen hier keinen Mehrwert, kosten aber deutlich mehr.

### Regel 5 — Baseline immer zuerst

Jedes neue Notebook startet mit `gpt-5.4-nano` als Baseline.
Upgrade auf `gpt-5.4-mini` nur, wenn die Baseline-Qualität nachweislich unzureichend ist.

---

## Entscheidungsbaum

```mermaid
flowchart TD
    START(["Welche Aufgabe
hat der LLM-Aufruf?"])

    START --> D{"Demo / Grundlagen /
Konzept im Fokus?"}
    START --> R{"RAG-Synthese /
komplexe Textgenerierung?"}
    START --> M{"Multimodal:
Bild, Audio, Video?"}
    START --> U{"Unklar /
neues Notebook?"}

    D -->|Ja| MINI["⚪ gpt-5.4-nano"]
    R -->|Ja| GP["🟢 gpt-5.4-mini
ohne temperature"]
    M -->|Ja| GO["🔵 gpt-5.4-mini
Vision"]
    U -->|Ja| BASE["⚪ gpt-5.4-nano
als Baseline starten"]

    style MINI fill:#546E7A,color:#fff
    style GP   fill:#2E7D32,color:#fff
    style GO   fill:#1565C0,color:#fff
    style BASE fill:#546E7A,color:#fff
    style START fill:#E65100,color:#fff
```

---

## Modul-Mapping

### Standard: `gpt-5.4-nano` (Fokus Konzept, nicht Modellqualität)

| Module | Thema | Begründung |
|---|---|---|
| M00–M05 | Kurs-Intro, GenAI-Grundlagen, Modellsteuerung, Transformer | Konzept > Qualität |
| M06 | OutputParser, strukturierte Ausgaben | Struktur lernen, nicht Qualität optimieren |
| M07 | Chat-Memory-Patterns | Architektur-Verständnis im Vordergrund |
| M10 | Agenten mit LangChain | Erste Agenten-Schritte — Konzept zählt |
| M11 | Middleware | Sicherheits- und Steuerungskonzepte |
| M12 | MCP LangChain Agent | Tool-Integration verstehen |
| M13 | Gradio Web-UI | Interface-Design > Modellqualität |
| M20 | OpenAI Agent Builder | No-Code-Plattform — Plattform gibt Modell vor |

### Upgrade auf `gpt-5.4-mini`: Qualität der Ausgabe entscheidend

| Module | Thema | Begründung |
|---|---|---|
| M08 | RAG mit LangChain | Synthese von Dokumenten-Chunks: Qualität zählt |
| M09 | SQL-RAG | Komplexe natürlichsprachliche SQL-Generierung |
| M17 | Multimodales RAG | Bild- + Textantworten: Synthese-Qualität wichtig |

### Vision- und Medienmodelle: Multimodaler Input oder Generierung erforderlich

| Module | Thema | Begründung |
|---|---|---|
| M16 | Multimodal Bild | `gpt-5.4-mini` für Bildanalyse; `gpt-image-1`/`gpt-image-2` für Bildgenerierung und Bearbeitung |
| M17 | Multimodales RAG | Bild- und Text-Retrieval kombiniert; Synthese und Vision mit `gpt-5.4-mini` |
| M18 | Multimodal Audio | Audio-Verarbeitung und nachgelagerte LLM-Analyse |
| M19 | Multimodal Video | `whisper-1` für Transkription, `gpt-5.4-nano` für einfache Frame-/Textanalyse, `gpt-5.4-mini` für Frame-Analyse, `sora-2` für Videoerzeugung |

### Sonderfall: Lokale Modelle (M14)

| Modul | Thema | Modell |
|---|---|---|
| M14 | Lokale Open-Source-Modelle | Ollama (z. B. `llama3`, `mistral`) |

```python
# M14: Lokales Modell via Ollama
from langchain.chat_models import init_chat_model
local_llm = init_chat_model("ollama:llama3")
```

---

## Code-Muster

### Standard-Chain (`gpt-5.4-nano`)

```python
from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = init_chat_model("openai:gpt-5.4-nano")

chain = ChatPromptTemplate.from_template("{frage}") | llm | StrOutputParser()
antwort = chain.invoke({"frage": "Was ist RAG?"})
```

### RAG-Synthese (`gpt-5.4-mini`)

```python
# Retriever: Dokument-Chunks holen
# Generator: Chunks zu qualitativ hochwertiger Antwort synthetisieren
rag_llm = init_chat_model("openai:gpt-5.4-mini")

rag_chain = retriever | rag_llm | StrOutputParser()
```

### Multimodal — Bildanalyse (`gpt-5.4-mini`)

```python
from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage

multimodal_llm = init_chat_model("openai:gpt-5.4-mini")

message = HumanMessage(content=[
    {"type": "text",  "text": "Was zeigt dieses Bild?"},
    {"type": "image_url", "image_url": {"url": bild_url}},
])
antwort = multimodal_llm.invoke([message])
```

---

## Kosten-Orientierung

> Kursteilnehmer arbeiten mit einem begrenzten API-Budget.
> `gpt-5.4-nano` ist die kosteneffiziente Standardwahl für textbasierte Lernschritte.
> Für Bildinput ist ein multimodal fähiges Modell erforderlich; in M16 ist `gpt-5.4-mini` die Standardwahl.

| Setup | Relatives Kostenniveau | Empfehlung |
|---|---|---|
| Alles Textbasierte mit `gpt-5.4-nano` | ⭐ (Baseline) | Standard für Konzept-Module |
| `gpt-5.4-mini` für RAG-Synthese und M16-Bildanalyse | ⭐⭐⭐ | Für RAG-Module (M08, M09, M17) und M16 |
| `gpt-image-*`, `sora-2`, `whisper-1` | variabel | Nur für dedizierte Medien-Endpunkte |

**Empfohlenes Vorgehen:**

1. Textkonzept mit `gpt-5.4-nano` verstehen und ausprobieren
2. Upgrade nur bei nachgewiesenem Qualitätsbedarf
3. Für Bild, Audio oder Video bewusst das passende Medienmodell wählen
4. Optionale Vergleichszellen mit `# Optional: Upgrade-Modell` markieren

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Inhalt |
|---|---|
| [Modellauswahl (Konzept)](../../concepts/erweitert/m19-modellauswahl.html) | Theoretische Grundlagen: Modell-Landschaft, Benchmarks, Evaluierungskriterien |
| [LangChain Einsteiger](../einsteiger/einsteiger-langchain.html) | LangChain-Grundlagen: Chains, Tools, Agents |
| [ChromaDB Einsteiger](../einsteiger/einsteiger-chromadb.html) | Vektordatenbanken für RAG-Systeme |

---

**Version:**    1.0<br>
**Stand:**    März 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
