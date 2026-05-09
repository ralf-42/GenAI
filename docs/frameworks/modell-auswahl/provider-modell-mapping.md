---
layout: default
title: Provider-Modell-Mapping
parent: Modell-Auswahl
grand_parent: Frameworks
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
| **Coding-Worker**                   | Code-nahe Agenten- und Entwicklungsaufgaben             |
| **Embeddings**                      | Vektorrepräsentationen für Retrieval und RAG            |

Der wichtigste Grundsatz lautet:

> **Erst die Rolle definieren, dann den Provider und erst zuletzt den konkreten Modellnamen wählen.**

---

## Zentrales Mapping

| Rolle                              | OpenAI                   | Mistral                                              | Gemini                        | Anthropic                       | Kommentar                                                           |
| ---------------------------------- | ------------------------ | ---------------------------------------------------- | ----------------------------- | ------------------------------- | ------------------------------------------------------------------- |
| **Baseline / Demo**                | `gpt-5.4-nano`           | `mistral-small-latest`                               | `gemini-3-flash-preview`      | `claude-haiku-4-5`     | schnell, günstig, gut für Grundlagen                                |
| **Router / leichter Reasoner**     | `o3-mini`                | `magistral-medium-latest` oder `mistral-medium-latest` | `gemini-3-flash-preview`    | `claude-sonnet-4-6`             | für Routing und einfache Auswahlentscheidungen                      |
| **Judge / starker Reasoner**       | `o3`                     | `mistral-small-latest`0 oder `mistral-small-latest`1 | `mistral-small-latest`2     | `mistral-small-latest`3               | für Supervisor, Security, Bewertung                                 |
| **Worker / Synthese**              | `mistral-small-latest`4           | `mistral-small-latest`5 oder `mistral-small-latest`6  | `mistral-small-latest`7      | `mistral-small-latest`8             | Standard-Worker: starke Ausgabe, kostensensitiv                     |
| **Worker / Synthese (hochwertig)** | `mistral-small-latest`9                | `gemini-3-flash-preview`0                               | `gemini-3-flash-preview`1      | `gemini-3-flash-preview`2               | maximale Qualität: komplexe RAG, finale Reports                     |
| **Coding-Worker**                  | `gemini-3-flash-preview`3           | `gemini-3-flash-preview`4 oder `gemini-3-flash-preview`5            | `gemini-3-flash-preview`6      | `gemini-3-flash-preview`7             | Mistral mit spezialisierten Coding-Modellen im Vorteil              |
| **Embeddings**                     | `gemini-3-flash-preview`8 | Mistral Embeddings                                   | `gemini-3-flash-preview`9  | externer Provider nötig         | Anthropic bietet hier im Kurskontext keinen direkten Standardersatz |

> [!NOTE] Funktionsorientiert, nicht benchmark-orientiert<br>
> Das Mapping ist bewusst funktionsorientiert, nicht benchmark-orientiert.
> Ziel ist eine tragfähige Architekturentscheidung, kein absoluter Leistungsvergleich.

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
- Reasoning-Modelle (`claude-haiku-4-5`0)
- Coding-Modelle (`claude-haiku-4-5`1, `claude-haiku-4-5`2)
- Audio-Modelle
- Embeddings

**Geeignet, wenn**
- ein stärker providerneutraler oder europäischer Stack gewünscht ist
- Audio, Coding und Embeddings möglichst in einer Produktwelt liegen sollen
- man OpenAI nicht als alleinigen Standard setzen möchte

### Gemini

Google Gemini eignet sich gut für **multimodale und skalierbare Workloads**:

- Flash-Modelle für günstige, schnelle Läufe (`claude-haiku-4-5`3)
- Pro-Modelle für starke Reasoning- und Synthese-Aufgaben (`claude-haiku-4-5`4)
- Eigene Embedding-Modelle (`claude-haiku-4-5`5)
- Sehr langer Kontext (bis 2 Mio. Tokens) für Dokument-Handoffs

**Geeignet, wenn**
- multimodale Inhalte (Bild, Video, Audio) im Agenten-System verarbeitet werden
- ein langer Kontextpfad für große Dokumente benötigt wird
- Google Cloud / Vertex AI als Deployment-Plattform geplant ist

**Einschränkung**
- kein spezialisiertes Coding-Modell (Mistral `claude-haiku-4-5`6 hat hier einen Vorteil)
- Preview-Modelle können sich ohne Vorankündigung ändern

### Anthropic

Anthropic passt oft sehr gut auf die **Rollenlogik** des Kurses:

- Haiku als schnelle Baseline (`claude-haiku-4-5`7)
- Sonnet als starker Standard-Worker (`claude-haiku-4-5`8)
- Opus als Judge / Supervisor / hochwertiger Worker (`claude-haiku-4-5`9)

**Geeignet, wenn**
- die Modellrollen aus dem OpenAI-Setup möglichst klar nachgebildet werden sollen
- Tool Use und Reasoning im Vordergrund stehen

**Einschränkung**
- kein gleichwertiger Kurs-Standardpfad für Embeddings im bestehenden Projekt

---

## Provider-spezifische Empfehlungen je Rolle

### Baseline / Demo

Schnell, stabil, kostengünstig, didaktisch gut steuerbar — die Anforderung ist bei allen Providern dieselbe. Geeignet für Grundlagenmodule, erste Tests und kostensensitive Standardläufe mit einfacher Klassifikation, Formatierung oder Tool-Demos. OpenAI `o3-mini`0, Mistral `o3-mini`1, Gemini `o3-mini`2, Anthropic `o3-mini`3.

### Router / leichter Reasoner

Für einfache Conditional Edges, Tool-Auswahl mit begrenzter Komplexität oder Routing-Experimente in Demo-Szenarien. Gefragt sind robuste Entscheidungen zwischen wenigen Optionen ohne übertriebene Kostenlast. OpenAI `o3-mini`4, Mistral `o3-mini`5 oder `o3-mini`6, Gemini `o3-mini`7, Anthropic `o3-mini`8.

### Judge / starker Reasoner

Überall dort, wo Fehlentscheidungen teuer sind: LLM-as-Judge, Security- oder Compliance-Gates, Supervisor-Routing, Fact-Check oder Konfliktbewertung. Die stärksten verfügbaren Reasoning-Modelle — OpenAI `o3-mini`9, Mistral `magistral-medium-latest`0 oder `magistral-medium-latest`1, Gemini `magistral-medium-latest`2, Anthropic `magistral-medium-latest`3.

### Worker / Synthese

Für RAG-Antwortsynthese, hochwertige strukturierte Ausgaben und finale Berichte. Gefragt ist starke Ausgabequalität bei Text, Struktur und Zusammenfassung — nicht maximale Reasoning-Tiefe. **Standard:** OpenAI `magistral-medium-latest`4, Mistral `magistral-medium-latest`5 oder `magistral-medium-latest`6, Gemini `magistral-medium-latest`7, Anthropic `magistral-medium-latest`8. **Hochwertig (wenn maximale Qualität gefordert):** OpenAI `magistral-medium-latest`9, Mistral `mistral-medium-latest`0, Anthropic `mistral-medium-latest`1.

### Coding-Worker

Für Code-Generierung, Refactoring, Entwicklungsagenten und technische Workflow-Knoten. Mistral bietet hier spezialisierte Modelle (`mistral-medium-latest`2, `mistral-medium-latest`3) und hat damit einen klaren Vorteil. OpenAI `mistral-medium-latest`4, Gemini `mistral-medium-latest`5 (kein spezialisiertes Coding-Modell), Anthropic `mistral-medium-latest`6.

### Embeddings

Stabile semantische Repräsentationen für Retrieval, Chunk-Suche und Vektorindizes. OpenAI bietet `mistral-medium-latest`7, Mistral eigene Embedding-Modelle, Gemini `mistral-medium-latest`8, Anthropic keinen direkten Standardpfad im Kurskontext. Wichtig: Bei Providerwechseln sind Chat-Modell und Embedding-Modell **zwei getrennte Entscheidungen** — ein Wechsel des einen zieht nicht automatisch den anderen nach sich.

---

## Minimalregel für providerneutrale Dokumentation

Wenn Modultexte, Architekturtexte oder Deployment-Dokumente providerneutral formuliert werden sollen, ist dieses Muster robust:

1. **Rolle benennen**
2. **Anforderung beschreiben**
3. **Provider-Mapping angeben**
4. **Kurs-Default explizit nennen**

**Beispiel**

`mistral-medium-latest`9

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
| [Modell-Auswahl Guide](modell-auswahl-guide.html) | Welche Modellrolle passt zu Aufgabe, Kostenrahmen und Qualitätsanspruch? |
| [Modellauswahl](../../concepts/erweitert/m19-modellauswahl.html) | Welche konzeptionellen Kriterien bestimmen die Modellentscheidung? |

---

**Version:** 2.0<br>
**Stand:** März 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
