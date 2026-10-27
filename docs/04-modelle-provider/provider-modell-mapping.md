---
layout: default
title: Provider-Modell-Mapping
parent: Modelle & Provider
nav_order: 2
description: "Provider- und Modell-Mapping für GenAI-Anwendungen: OpenAI, Anthropic, Google, Mistral und lokale Modelle"
has_toc: true
---

# Provider-Modell-Mapping
{: .no_toc }

> **Ein Rollenmodell für mehrere Provider**
> Dieses Dokument ordnet die im Kurs verwendeten Modellrollen auf OpenAI, Mistral, Gemini und Anthropic ab.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Zweck dieses Dokuments

Im Kurs werden konkrete OpenAI-Modelle verwendet, weil die Module, Notebooks und Beispiele darauf abgestimmt sind. Für Architekturentscheidungen ist aber oft nicht der Markenname entscheidend, sondern die **Rolle**, die ein Modell im System übernimmt.

Dieses Dokument trennt deshalb zwei Ebenen:

1. **Kurs-Default:** die tatsächlich in den Modulen verwendeten OpenAI-Modelle
2. **Provider-Mapping:** geeignete Entsprechungen bei Mistral, Gemini und Anthropic

> [!IMPORTANT] Nur zur Einordnung und Planung<br>
> Dieses Mapping dient der Einordnung und Architekturplanung.
> Es ändert nicht automatisch die in den Modulen verwendeten Modelle.

---

## Rollen statt Produktnamen

Für den Kurs sind vor allem diese Modellrollen relevant:

| Rolle                               | Typische Aufgabe                                        |
| ----------------------------------- | ------------------------------------------------------- |
| **Baseline / Demo**                 | günstige, schnelle Läufe für Grundlagen und erste Tests |
| **Router / leichter Reasoner**      | einfache Routing- oder Auswahlentscheidungen            |
| **Judge / starker Reasoner**        | Bewertung, Policy-Checks, Supervisor-Entscheidungen     |
| **Worker / Synthese**               | hochwertige Text-, Code- oder RAG-Ausgabe               |
| **Worker / Synthese (hochwertig)**  | maximale Ausgabequalität, komplexe RAG, finale Reports  |
| **Frontier / maximale Qualität**    | schwierige Coding-, Judge- und Agenten-Aufgaben         |
| **Coding-Worker**                   | Code-nahe Agenten- und Entwicklungsaufgaben             |
| **Embeddings**                      | Vektorrepräsentationen für Retrieval und RAG            |

Der wichtigste Grundsatz lautet:

> **Erst die Rolle definieren, dann den Provider und erst zuletzt den konkreten Modellnamen wählen.**

---

## Zentrales Mapping

| Rolle                              | [OpenAI](https://platform.openai.com/docs/models) | [Mistral](https://docs.mistral.ai/models/) | [Gemini](https://ai.google.dev/gemini-api/docs/models) | [Anthropic](https://platform.claude.com/docs/en/about-claude/models/overview) | Kommentar                                                           |
| ---------------------------------- | ------------------------ | ---------------------------------------------------- | ----------------------------- | ------------------------------- | ------------------------------------------------------------------- |
| **Baseline / Demo**                | `gpt-6-luna`              | `mistral-small-2603`                                 | `gemini-3.5-flash-lite`       | `claude-haiku-5-5`              | schnell, günstig, gut für Grundlagen                                |
| **Router / leichter Reasoner**     | `gpt-6-luna`              | `mistral-small-2603`                                 | `gemini-3.5-flash-lite`       | `claude-haiku-5-5`              | für Routing und einfache Auswahlentscheidungen                      |
| **Judge / starker Reasoner**       | `gpt-6.1-sol`             | `mistral-medium-3-5` (hohes `reasoning_effort`)      | `gemini-4-argon`              | `claude-opus-5-5`                 | für Supervisor, Security, Bewertung                                 |
| **Worker / Synthese**              | `gpt-6.1-terra`           | `mistral-medium-3-5`                                 | `gemini-3.8-flash`             | `claude-sonnet-5-5`               | Standard-Worker: starke Ausgabe, kostensensitiv                     |
| **Worker / Synthese (hochwertig)** | `gpt-6.1-sol`             | `mistral-large-4` (Preview)                          | `gemini-4-argon`              | `claude-opus-5-5`                 | hohe Qualität: komplexe RAG, finale Reports                         |
| **Frontier / maximale Qualität**   | `gpt-6-astra`             | `mistral-large-4` (Preview)                          | `gemini-4-argon`              | `claude-fable-5-1`                | maximale Qualität für schwierige Coding-, Judge- und Agenten-Aufgaben |
| **Coding-Worker**                  | `gpt-6.1-terra`           | `mistral-medium-3-5` oder `codestral-2508`           | `gemini-3.8-flash`             | `claude-sonnet-5-5`               | Mistral mit spezialisierten Coding-Modellen im Vorteil              |
| **Embeddings**                     | `text-embedding-3-small` | `mistral-embed`                                   | `gemini-embedding-2`              | externer Provider nötig         | Anthropic bietet hier im Kurskontext keinen direkten Standardersatz |

> [!NOTE] Funktionsorientiert, nicht benchmark-orientiert<br>
> Das Mapping ist bewusst funktionsorientiert, nicht benchmark-orientiert.
> Ziel ist eine tragfähige Architekturentscheidung, kein absoluter Leistungsvergleich.

Die Modell-IDs und Lifecycle-Angaben sind Momentaufnahmen, geprüft am 27. Oktober 2026. Google hat `gemini-embedding-2-preview` am 10. August 2026 abgeschaltet; verwende `gemini-embedding-2`. Prüfe vor einer Integration die verlinkten offiziellen Modellübersichten und Deprecation-Seiten erneut.

---

## Wie die Provider im Kurskontext zu lesen sind

### OpenAI

OpenAI ist im Projekt derzeit der **Kurs-Default**:

- starkes Rollenmodell im bestehenden Kurs
- konkrete Zuordnung in den Notebooks bereits umgesetzt
- Agent Builder als OpenAI-spezifisches Zusatzmodul
- Embeddings direkt im bestehenden RAG-Pfad verankert

**Geeignet, wenn**
- bestehende Kurslogik unverändert bleiben soll
- Notebooks 1:1 weiterlaufen sollen
- die Modellunterscheidung im Unterricht explizit gezeigt wird

### Mistral

Mistral ist besonders interessant, wenn ein **breiter Single-Provider-Pfad** angestrebt wird:

- Generalmodelle
- Reasoning-Funktion im Generalmodell `mistral-medium-3-5`
- Coding-Modelle (`codestral-2508`)
- Audio-Modelle
- Embeddings

**Geeignet, wenn**
- ein stärker providerneutraler oder europäischer Stack gewünscht ist
- Audio, Coding und Embeddings möglichst in einer Produktwelt liegen sollen
- man OpenAI nicht als alleinigen Standard setzen möchte

### Gemini

Google Gemini eignet sich gut für **multimodale und skalierbare Workloads**:

- Flash-Modelle für günstige, schnelle Läufe (`gemini-3.5-flash-lite`)
- Starkes Reasoning- und Synthesemodell (`gemini-4-argon`)
- Eigene Embedding-Modelle (`gemini-embedding-2`)
- Langer Kontext (1 Mio. Tokens bei `gemini-4-argon`) für Dokument-Handoffs

**Geeignet, wenn**
- multimodale Inhalte (Bild, Video, Audio) im Agenten-System verarbeitet werden
- ein langer Kontextpfad für große Dokumente benötigt wird
- Google Cloud / Vertex AI als Deployment-Plattform geplant ist

**Einschränkung**
- kein spezialisiertes Coding-Modell (Mistral `codestral-2508` hat hier einen Vorteil)
- Preview-Modelle können sich ändern. Die [Gemini Deprecations-Seite](https://ai.google.dev/gemini-api/docs/deprecations) führt Abschaltungen und Ersatzmodelle auf.

### Anthropic

Anthropic passt oft sehr gut auf die **Rollenlogik** des Kurses:

- Haiku als schnelle Baseline (`claude-haiku-5-5`)
- Sonnet als starker Standard-Worker (`claude-sonnet-5-5`)
- Opus als Judge / Supervisor / hochwertiger Worker (`claude-opus-5-5`)
- Fable als Frontier-Modell für anspruchsvolle Aufgaben (`claude-fable-5-1`)

Anthropic führt diese Modell-IDs auf der [Model Deprecations-Seite](https://platform.claude.com/docs/en/about-claude/model-deprecations) als aktuell; laut Modellübersicht liegen die Retirement-Termine frühestens ab dem 1. September 2027.

**Geeignet, wenn**
- die Modellrollen aus dem OpenAI-Setup möglichst klar nachgebildet werden sollen
- Tool Use und Reasoning im Vordergrund stehen

**Einschränkung**
- kein gleichwertiger Kurs-Standardpfad für Embeddings im bestehenden Projekt

---

## Provider-spezifische Empfehlungen je Rolle

### Baseline / Demo

Schnell, stabil, kostengünstig, didaktisch gut steuerbar — die Anforderung ist bei allen Providern dieselbe. Geeignet für Grundlagenmodule, erste Tests und kostensensitive Standardläufe mit einfacher Klassifikation, Formatierung oder Tool-Demos. Die passenden Modelle stehen in der zentralen Mapping-Tabelle.

### Router / leichter Reasoner

Für einfache Conditional Edges, Tool-Auswahl mit begrenzter Komplexität oder Routing-Experimente in Demo-Szenarien. Gefragt sind robuste Entscheidungen zwischen wenigen Optionen ohne übertriebene Kostenlast. Die passenden Modelle stehen in der zentralen Mapping-Tabelle.

### Judge / starker Reasoner

Überall dort, wo Fehlentscheidungen teuer sind: LLM-as-Judge, Security- oder Compliance-Gates, Supervisor-Routing, Fact-Check oder Konfliktbewertung. Die passenden Modelle stehen in der zentralen Mapping-Tabelle.

### Worker / Synthese

Für RAG-Antwortsynthese, hochwertige strukturierte Ausgaben und finale Berichte. Gefragt ist starke Ausgabequalität bei Text, Struktur und Zusammenfassung — nicht maximale Reasoning-Tiefe. Nutze die Standard-Worker-Rolle für reguläre Aufgaben und die hochwertige Worker-Rolle für komplexe Synthesen und finale Berichte. Die Provider-Zuordnungen stehen in der zentralen Mapping-Tabelle.

### Frontier / maximale Qualität

Für schwierige Coding-, Judge- und Agenten-Aufgaben mit hohem Qualitätsanspruch. Diese Rolle ist kein Standard für kurze Demos, sondern eine bewusste Eskalation, wenn Fehlerkosten, Komplexität oder Autonomie den Mehrpreis rechtfertigen. Die Provider-Zuordnungen stehen in der zentralen Mapping-Tabelle.

### Coding-Worker

Für Code-Generierung, Refactoring, Entwicklungsagenten und technische Workflow-Knoten. Mistral bietet mit Codestral ein spezialisiertes Modell für Code-Vervollständigung; für Coding-Agenten kann auch ein Generalmodell geeignet sein. Die Provider-Zuordnungen stehen in der zentralen Mapping-Tabelle.

### Embeddings

Stabile semantische Repräsentationen für Retrieval, Chunk-Suche und Vektorindizes. OpenAI bietet `text-embedding-3-small`, Mistral `mistral-embed`, Gemini `gemini-embedding-2`, Anthropic keinen direkten Standardpfad im Kurskontext. Wichtig: Bei Providerwechseln sind Chat-Modell und Embedding-Modell **zwei getrennte Entscheidungen** — ein Wechsel des einen zieht nicht automatisch den anderen nach sich.

---

## Minimalregel für providerneutrale Dokumentation

Wenn Modultexte, Architekturtexte oder Deployment-Dokumente providerneutral formuliert werden sollen, ist dieses Muster robust:

1. **Rolle benennen**
2. **Anforderung beschreiben**
3. **Provider-Mapping angeben**
4. **Kurs-Default explizit nennen**

**Beispiel**

> Der **Supervisor** übernimmt Security-Gates und Fact-Checks. Seine Modellrolle ist `Judge`; die Provider-Zuordnungen stehen in der zentralen Mapping-Tabelle.

Das erlaubt eine allgemeine Beschreibung, ohne die konkreten OpenAI-Implementierungen im Kurs umzuschreiben.

---

## Verhältnis zum Modell-Auswahl Guide

Dieses Dokument ersetzt den Modell-Auswahl Guide **nicht**.

- Der **Modell-Auswahl Guide** erklärt, welche OpenAI-Modelle im Kurs aktuell verwendet werden und warum.
- Das **Provider-Modell-Mapping** zeigt, wie dieselben Rollen auf Mistral, Gemini und Anthropic übertragen werden können.

Beide Dokumente zusammen ergeben:

1. **konkrete Kursrealität**
2. **providerübergreifende Architekturperspektive**


## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Modell-Auswahl Guide](modellauswahl.html) | Welche Modellrolle passt zu Aufgabe, Kostenrahmen und Qualitätsanspruch? |

---

**Version:** 2.1<br>
**Stand:** Oktober 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
