---
layout: default
title: Modellauswahl
parent: Modelle & Provider
nav_order: 1
description: "Modellrollen, Entscheidungskriterien und Kursstandard für GenAI-Anwendungen"
has_toc: true
---

# Modellauswahl
{: .no_toc }

> Wer in Kursnotebooks ein Modell fest einträgt, schreibt Wartungsaufwand in den Code. Diese Seite zeigt, wie Modellentscheidungen stattdessen über Rollen getroffen werden — und welche Rolle wann passt.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Grundidee

Modellauswahl ist keine Rangliste. Ein Modell ist passend, wenn Qualität, Latenz, Kosten, Kontextfenster, Tool-Unterstützung und Modalität zur Aufgabe passen. Im Kurs wird deshalb nicht überall ein einzelnes Modell fest eingetragen, sondern eine Rolle verwendet: Demo, Worker, Judge, Planner, Medienerzeugung oder Embedding.

Diese Rollen stehen in `04_modul/genai_lib/model_config.py`. Die Datei ist der technische Kursstandard. Wer ein Notebook liest, soll nicht zuerst konkrete Produktnamen interpretieren müssen, sondern erkennen, welche Aufgabe ein Modell im System übernimmt.

## Frontier-Modelle

Die folgende Tabelle zeigt die zentralen Modellrollen aus `model_config.py`. Die konkreten Modell-IDs sind Kurskonfiguration, nicht allgemeine Marktberatung. Vor produktiven Projekten muss die aktuelle Provider-Dokumentation geprüft werden, weil Modellverfügbarkeit, Preise und API-Parameter regelmäßig wechseln.

| Rolle in `model_config.py` | Kursmodell               | Einsatz im Kurs                                                  |
| -------------------------- | ------------------------ | ---------------------------------------------------------------- |
| `BASELINE`                 | `openai:gpt-6-luna`      | Grundlagen, Demos, kurze Antworten, kostengünstige Experimente   |
| `ROUTER`                   | `openai:gpt-6-luna`      | einfache Routing- und Auswahlentscheidungen                      |
| `WORKER`                   | `openai:gpt-6.1-terra`   | RAG-Synthese, strukturierte Ausgaben, Standardaufgaben           |
| `CODING`                   | `openai:gpt-6.1-terra`   | begrenzte Codegenerierung, Refactoring, technische Assistenz     |
| `JUDGE`                    | `openai:gpt-6.1-sol`     | Evaluation, Compliance, Sicherheits- und Qualitätsentscheidungen |
| `PLANNER`                  | `openai:gpt-6.1-sol`     | Aufgabenzerlegung, Agentenplanung, komplexe Workflows            |
| `WORKER_PREMIUM`           | `openai:gpt-6.1-sol`     | hochwertige Synthese, komplexe RAG-Aufgaben, finale Reports      |
| `FRONTIER`                 | `openai:gpt-6-astra`     | maximale Qualität für schwierige Coding-, Judge- und Agenten-Aufgaben |
| `IMAGE_GENERATION`         | `gpt-image-2`            | Bildgenerierung                                                  |
| `TRANSCRIPTION`            | `gpt-transcribe`          | Datei-Audiotranskription                                         |
| `TRANSCRIPTION_SEGMENTS`   | `whisper-1`                | Legacy: `verbose_json` mit Segment-Zeitstempeln; Migration nötig |
| `EMBEDDINGS`               | `text-embedding-3-small` | Vektorsuche und RAG                                              |

GPT-6-Modelle mit Tool-Aufrufen werden mit `langchain-openai` ab Version 1.7.2 über die Responses API geroutet. Bei einer eigenen `ChatOpenAI`-Konfiguration lässt sich `use_responses_api=True` explizit setzen. `whisper-1` wird am 26. Februar 2027 abgeschaltet; die Segment-Zeitstempel benötigen eine gesonderte Migration.



> [!IMPORTANT] Standard vor Produktname<br>
> In Notebooks werden nach Möglichkeit Rollen aus `model_config.py` verwendet. Harte Modellnamen stehen nur dort direkt im Notebook, wo ein bestimmter Endpunkt oder ein bewusstes Vergleichsexperiment gezeigt wird.



## Aktueller Modellsteckbrief: GPT-6.1 Terra

`gpt-6.1-terra` ist im Kurs das Standardmodell für Worker- und Coding-Aufgaben. OpenAI beschreibt es als schnelles, effizientes Modell für visuelles Reasoning, präzise Computerbedienung und klare, natürliche Texte.

| Merkmal | Angabe |
|---|---|
| Modell-ID | [`gpt-6.1-terra`](https://developers.openai.com/api/docs/models/gpt-6.1-terra) |
| Veröffentlichung | 26. Oktober 2026 |
| Kursrollen | `WORKER`, `CODING` |
| Eingabe und Ausgabe | Text und Bilder als Eingabe; Text als Ausgabe; kein Audio oder Video |
| Kontextfenster / maximale Ausgabe | 1.050.000 / 128.000 Tokens |
| Wissensstand | 1. Juni 2026 |
| Reasoning-Stufen | `none`, `low`, `medium` (Standard), `high`, `xhigh`, `max` |
| Prompt Caching | Unterstützt |
| Funktionen | Function Calling, strukturierte Ausgaben, Web- und File Search, Code Interpreter, Computer Use und MCP |
| API für Tool-Aufrufe | Responses API erforderlich |
| Fine-Tuning | Nicht unterstützt |
| Standardpreis pro 1 Mio. Tokens (27. Oktober 2026) | Input 1 USD; gecachter Input 0,05 USD; Output 5 USD |

**Stärken und passende Aufgaben:** visuelle Analyse, klar umrissene Computerbedienung, Textentwürfe und -überarbeitung sowie häufige Alltags-Workflows. Im Kurs dient es außerdem als Standard-Worker und Coding-Worker. Für besonders komplexe Coding-Aufgaben empfiehlt OpenAI GPT-6.1 Sol oder GPT-6 Astra.

**Grenzen:** keine Audio- oder Videoverarbeitung und kein Fine-Tuning. Bei Anfragen mit mehr als 272.000 Input-Tokens gelten höhere Tokenpreise. Die Preise und Modellfunktionen sind eine Momentaufnahme vom 27. Oktober 2026; prüfe vor einer produktiven Nutzung die [aktuelle Modellkarte](https://developers.openai.com/api/docs/models/gpt-6.1-terra) und [Preise](https://platform.openai.com/pricing).

**Modellübersichten:**      
+ [Models.dev]([Models.dev — An open-source database of AI models](https://models.dev/))
+ [LiteLLM Modelle]([LiteLLM-Anbieter & Modelle](https://models.litellm.ai/))      

## Entscheidungsregeln

Für Grundlagen, kurze Demos und erste Chains reicht die Baseline-Rolle. In diesen Modulen zählt, ob das Konzept sichtbar wird, nicht ob die Ausgabe maximal elegant formuliert ist. Erst wenn die Ausgabequalität fachlich relevant wird, etwa bei RAG-Synthese oder strukturierten Berichten, wird auf eine Worker-Rolle gewechselt.

Multimodale Aufgaben sind eine eigene Entscheidung. Ein Textmodell darf nicht pauschal für Bild- oder Audioaufgaben verwendet werden, nur weil es in Textbeispielen gut funktioniert. Bildgenerierung, Transkription und Embeddings folgen eigenen Endpunkten oder Modellklassen.


## Schnelle Auswahl

| Anwendungsfall | Rolle |
|---|---|
| kurze Demo, Konzeptbeispiel, einfache Antwort | `BASELINE` |
| einfache Klassifikation oder Routingentscheidung | `ROUTER` |
| Standard-RAG, Zusammenfassung, strukturierte Antwort | `WORKER` |
| Code, Refactoring, technische Assistenz | `CODING` |
| Aufgabenplanung oder mehrstufige Zerlegung | `PLANNER` |
| Bewertung, Korrektur, Compliance, Sicherheitscheck | `JUDGE` |
| hochwertige Synthese, komplexe RAG-Aufgaben | `WORKER_PREMIUM` |
| schwierige Coding-, Judge- oder Agenten-Aufgaben mit hohem Qualitätsanspruch | `FRONTIER` |
| Bildgenerierung | `IMAGE_GENERATION` |
| Audio-Transkription | `TRANSCRIPTION` |
| Audio-Transkription mit Segment-Zeitstempeln | `TRANSCRIPTION_SEGMENTS` |
| semantische Suche und RAG-Index | `EMBEDDINGS` |

## Entscheidungsbaum

```mermaid
---
config:
  theme: base
  look: classic
  themeVariables:
    primaryColor: '#e0f2fe'
    primaryBorderColor: '#0284c7'
    primaryTextColor: '#1e293b'
    lineColor: '#64748b'
    clusterBkg: '#f8fafc'
    clusterBorder: '#cbd5e1'
    noteBkgColor: '#fef3c7'
    noteBorderColor: '#d97706'
    noteTextColor: '#78350f'
    edgeLabelBackground: '#ffffff'
---

flowchart TD
    START(["Welche Aufgabe hat der Modellaufruf?"])

    START --> D{"Demo, Grundlagen oder Konzept im Fokus?"}
    START --> R{"RAG-Synthese oder komplexe Textausgabe?"}
    START --> M{"Bild, Audio oder Embeddings?"}
    START --> E{"Bewertung, Prüfung oder Planung?"}
    START --> U{"Unklarer neuer Notebook-Schritt?"}

    D -->|Ja| BASE["BASELINE"]
    R -->|Ja| WORKER["WORKER"]
    M -->|Ja| MEDIA["passende Medien- oder Embedding-Rolle"]
    E -->|Ja| JUDGE["JUDGE oder PLANNER"]
    U -->|Ja| STARTBASE["mit BASELINE starten und Bedarf messen"]

%% Funktionsfarben nach Mermaid_Best_Practices.md
classDef default fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0c4a6e;
classDef input fill:#e0e7ff,stroke:#6366f1,stroke-width:2px,color:#1e1b4b;
classDef metric fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f;
classDef output fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#14532d;
class START input;
class D,R,M,E,U,JUDGE metric;
class BASE,WORKER,MEDIA,STARTBASE output;
```



## Code-Muster

### Standard-Chain

```python
from langchain.chat_models import init_chat_model
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

from genai_lib.model_config import BASELINE

llm = init_chat_model(BASELINE)

chain = ChatPromptTemplate.from_template("{frage}") | llm | StrOutputParser()
antwort = chain.invoke({"frage": "Was ist RAG?"})
```

### RAG-Synthese

```python
from langchain.chat_models import init_chat_model

from genai_lib.model_config import WORKER

rag_llm = init_chat_model(WORKER)
```

## Kosten und Qualität

Kostenoptimierung bedeutet im Kurs nicht, immer das billigste Modell zu verwenden. Entscheidend ist die Kosten pro brauchbarem Ergebnis. Ein günstiges Modell ist teuer, wenn es oft wiederholt werden muss, falsche Tools auswählt oder schlechte RAG-Antworten erzeugt.

| Entscheidung | Empfehlung |
|---|---|
| Konzept sichtbar machen | mit `BASELINE` starten |
| Antwortqualität entscheidet | `WORKER` testen und gegen `BASELINE` vergleichen |
| Bewertung oder Sicherheitsprüfung | `JUDGE` einsetzen |
| maximale Qualität bei schwierigen Agenten- oder Coding-Aufgaben | `FRONTIER` bewusst einsetzen |
| Bild, Audio, Embeddings | dedizierte Rolle verwenden |
| Premium-Rollen | nur bei messbarem Qualitätsgewinn oder hohem Risiko |

In Trainings zeigt sich häufig, dass zu früh auf ein großes Modell gewechselt wird. Besser ist ein kleines Evaluationsset mit typischen Kursaufgaben: eine einfache Demo, ein RAG-Fall, ein Fehlerfall und ein Beispiel mit strukturiertem Output. Erst wenn der Unterschied sichtbar wird, rechtfertigt sich ein Upgrade.

## Bewertung

Benchmarks helfen bei der Vorauswahl, ersetzen aber keine Tests mit eigenen Aufgaben. Öffentliche Benchmarks unterscheiden sich in Modellstand, Prompting, Toolnutzung und Auswertung. Für den Kurs sind deshalb kleine, reproduzierbare Testsets wichtiger als ein abstrakter Rangplatz.

| Bewertungsfrage | Beispielhafte Prüfung |
|---|---|
| Reicht die Baseline? | `BASELINE` mit repräsentativen Standardaufgaben testen |
| Braucht die Aufgabe Synthesequalität? | `WORKER` gegen RAG- und Zusammenfassungsaufgaben prüfen |
| Braucht die Aufgabe Planung? | `PLANNER` gegen mehrstufige Aufgaben testen |
| Braucht die Aufgabe Kontrolle? | `JUDGE` gegen Fehlerfälle und Grenzfälle prüfen |
| Ist eine Medienrolle nötig? | Bild, Audio oder Embeddings getrennt vom Textmodell prüfen |

**Typischer Fehler:** Benchmarkwerte als endgültige Entscheidung lesen. Ein Modell mit starkem allgemeinen Benchmark kann bei einem kleinen, klar strukturierten Kursworkflow schlechter abschneiden als ein günstigeres Modell mit besser passender Rolle.

## Modellkaskaden

Eine Modellkaskade kombiniert mehrere Rollen in einem Workflow. Ein günstiges Modell kann Vorarbeit leisten, ein Worker fasst Ergebnisse zusammen, ein Judge prüft kritische Ausgaben. Dadurch wird nicht ein Modell für alles verantwortlich.

Ein typisches Kursmuster sieht so aus: `BASELINE` klassifiziert die Anfrage, `WORKER` erzeugt die Antwort aus den gefundenen Dokumenten, `JUDGE` prüft Quellenbindung und Sicherheit. Diese Trennung ist oft stabiler als ein einzelnes großes Modell, das alle Schritte gleichzeitig erledigen soll.

**Grenze:** Kaskaden erhöhen die Komplexität. Jede zusätzliche Modellrolle braucht Logging, Fehlerbehandlung und Tests. Für kurze Demos ist eine Kaskade meist überdimensioniert.

## Typische Fehler

| Fehler | Folge | Bessere Entscheidung |
|---|---|---|
| stärkstes Modell ohne Test einsetzen | unnötige Kosten und langsame Demos | erst `BASELINE`, dann gezielt upgraden |
| `temperature` aus alten Beispielen übernehmen | API-Fehler oder inkonsistentes Verhalten | GPT-6.x-Rollen ohne `temperature` initialisieren |
| Chat-Modell und Embedding-Modell vermischen | defekte RAG-Indizes oder Dimensionskonflikte | `EMBEDDINGS` separat behandeln |
| Benchmarks statt Kursaufgaben bewerten | falsche Entscheidung für den konkreten Workflow | kleines kursnahes Testset verwenden |

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Provider & Modell-Mapping](./provider-modell-mapping.html) | Wie lassen sich die Kursrollen auf andere Provider übertragen? |
| [Fine-Tuning](./fine-tuning.html) | Wann reicht Modellwahl nicht mehr und Training wird notwendig? |
| [Context Engineering](../05-prompting-rag/context-engineering.html) | Wie beeinflusst Kontextgestaltung die Modellentscheidung? |
| [Evaluation & Observability](../07-qualitaet-sicherheit/evaluation-observability.html) | Wie wird gemessen, ob die gewählte Modellrolle funktioniert? |

---

**Version:** 1.5<br>
**Stand:** Oktober 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
