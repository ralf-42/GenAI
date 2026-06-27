---
layout: default
title: Kursüberblick
parent: Orientierung
nav_order: 0
description: "Überblick über Zielgruppe, Voraussetzungen, Kursmodule und Vorbereitung für den GenAI-Kurs"
has_toc: true
---

# Kursüberblick
{: .no_toc }

> **Generative KI. Verstehen. Anwenden. Gestalten.**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# Worum es in diesem Kurs geht

Der Kurs richtet sich an Einsteigerinnen und Einsteiger, die Generative KI nicht nur ausprobieren, sondern in praktischen Anwendungen nachvollziehbar einsetzen möchten. Im Mittelpunkt stehen moderne Sprach- und Multimodalmodelle, Prompting, LangChain, RAG, Agenten, lokale Modelle und die Frage, wann welcher Lösungsweg sinnvoll ist.

Der Fokus liegt auf praktischer Umsetzung mit Python. Theoretische Konzepte werden so weit erklärt, wie sie für Verständnis, Auswahl und Anwendung nötig sind.

# Zielgruppe

Der Kurs passt besonders für:

- Programmierende und Entwickelnde, die erste GenAI-Anwendungen bauen möchten
- IT-Fachkräfte, die KI-Funktionen in bestehende Projekte integrieren wollen
- technikaffine Quereinsteigerinnen und Quereinsteiger mit guten Python-Grundlagen

Hilfreich sind Kenntnisse zu Datentypen, Listen, Dictionaries, Kontrollstrukturen, Funktionen und dem Umgang mit Bibliotheken.

# Was Sie mitnehmen

Nach dem Kurs sollten Sie in der Lage sein:

- GenAI-Anwendungsfälle realistisch einzuschätzen
- Prompts, Kontext und Modellantworten gezielt zu steuern
- einfache LLM-Anwendungen mit Python und LangChain umzusetzen
- Dokumente über RAG und Embeddings nutzbar zu machen
- multimodale Aufgaben mit Text, Bild oder Audio einzuordnen
- Modellwahl, Kosten, Datenschutz und Qualität bewusster zu bewerten

# Kursstruktur

Die Basismodule bilden das Fundament. Sie führen von Grundbegriffen über Frameworks bis zu RAG, Multimodalität, Agenten und lokalen Modellen.

| Bereich | Inhalte |
| ------- | ------- |
| **Grundlagen** | Generative KI, Modellsteuerung, LLMs, Transformer, Memory und strukturierte Ausgaben |
| **Frameworks** | LangChain, LangGraph, GenAI-Lib und Best Practices |
| **Daten & Wissen** | Tokenizing, Chunking, Embeddings, RAG und Vektordatenbanken |
| **Multimodalität** | Bild-, Audio- und Videoverarbeitung |
| **Agenten** | Tool Use, Function Calling, Agentenarchitekturen und Workflows |
| **Betrieb & Verantwortung** | Evaluation, Sicherheit, Deployment, Datenschutz und Governance |

Erweiterungsmodule vertiefen Spezialthemen wie SQL-RAG, multimodales RAG, Fine-Tuning, Modellauswahl, Evaluation, Model Context Protocol und Context Engineering.

## Modulübersicht

Die aktuelle Kursstruktur ist in thematische Blöcke gegliedert:

| Modul | Rolle | Block | Inhalt | Schwerpunkt |
| :---: | ----- | ----- | ------ | ----------- |
| 1  | Pflicht             | Grundlagen               | Einführung GenAI                | Kursüberblick, OpenAI, Hugging Face und erste LangChain-Einordnung |
| 2  | Pflicht             | Framework & Patterns     | LangChain 101                   | Chains, Models, Prompts, Graph-Grundlagen und Best Practices |
| 3  | Pflicht             | Framework & Patterns     | Textverarbeitung mit LangChain  | Textgenerierung, Textklassifizierung, Textzusammenfassung und LangChain-Grundmuster |
| 4  | Pflicht             | Framework & Patterns     | Structured Output               | JSON, strukturierte Ausgaben und robuste Antwortformate |
| 5  | Ergänzend           | Framework & Patterns     | Chat und Memory                 | Kurzzeit-Memory, persistentes Memory und externe Speicher |
| 6  | Pflicht             | RAG                      | Retrieval Augmented Generation  | ChromaDB, Embeddings, Dokument-Q&A und Vektordatenbanken |
| 7  | Ergänzend           | RAG                      | SQL RAG                         | LLMs mit Datenbanken, SQL-Generierung und strukturierte Daten |
| 8  | Aufbau              | Agenten & Orchestrierung | Agenten                         | Tool Use, Agentenarchitekturen, Planung und Multi-Agentensysteme |
| 9  | Aufbau              | Agenten & Orchestrierung | Middleware                      | Kontrolle von Agent-Ausführungen, Freigaben, Retry und Summarization |
| 10 | Aufbau / Optional   | Agenten & Orchestrierung | MCP                             | Model Context Protocol und standardisierte Tool-Integration |
| 11 | Ergänzend           | Deployment & Optimierung | Gradio                          | UI-Entwicklung, praktische Demos und Sharing |
| 12 | Optional            | Deployment & Optimierung | Lokale und Open Source Modelle  | Ollama, lokale Modelle, Lizenzierung und Auswahlkriterien |
| 13 | Optional/Vertiefung | Deployment & Optimierung | Fine-Tuning                     | Anpassung von Modellen und Bewertung spezialisierter Varianten |
| 14 | Ergänzend           | Multimodal               | Bild                            | Bildgenerierung, Bildklassifikation, Objekterkennung und Bildbeschreibung |
| 15 | Aufbau / Optional   | Multimodal               | Multimodal RAG                  | Dokumente mit Text- und Bildanteilen erschließen |
| 16 | Optional            | Multimodal               | Audio                           | Speech-to-Text, Text-to-Speech, Audioanalyse und Podcast-Pipelines |
| 17 | Platzhalter         | —                        | derzeit nicht belegt            | Modulnummer freigehalten |
| 18 | Platzhalter         | —                        | derzeit nicht belegt            | Modulnummer freigehalten |
| 19 | Praxis-Extra        | Praxis-Extras            | Modellsteuerung                 | Sampling, Context Engineering und kontrollierte Ausgaben |
| 20 | Praxis-Extra        | Praxis-Extras            | Codieren mit GenAI              | Codegenerierung, Debugging, Revisionsprompts und Entwicklungsworkflow |

Eine interaktive Orientierung zur Modellwahl ist hier hilfreich: [Modellauswahl](https://editor.p5js.org/ralf.bendig.rb/full/8BbTi8Ico).

# Vorbereitung

Für die praktischen Übungen werden typischerweise benötigt:

- ein Google-Account für Google Colab und Google Drive
- ein OpenAI-Account mit API-Key und kleinem API-Guthaben
- ein Hugging-Face-Account mit API-Key für ausgewählte Modelle oder Demos
- ein Gerät, auf dem Browser, Notebook-Umgebung und Kursmaterial zuverlässig funktionieren
- Zugriff auf die im Kurs genutzte digitale Pinnwand, zum Beispiel taskcards.de

Bei Business-Laptops sollte vorab geprüft werden, ob Cloud-Dienste, API-Zugriffe, GitHub, Google Colab und Hugging Face durch die IT-Richtlinien erlaubt sind.

Nützliche Einstiege:

- [OpenAI Platform](https://platform.openai.com/settings/organization/general)
- [Hugging Face](https://huggingface.co/)

# Arbeitsweise

Der Kurs lebt vom Ausprobieren. Generative KI darf und soll während der Aufgaben genutzt werden. Entscheidend ist der reflektierte Einsatz: Ergebnisse werden geprüft, verbessert und mit den technischen Grenzen der Modelle abgeglichen.

Sinnvoll ist es, eigene Fragestellungen oder Arbeitsaufgaben mitzubringen. Dadurch wird schneller sichtbar, welche Methoden in realen Situationen tragen und wo klassische Automatisierung, Datenschutz oder Evaluation wichtiger sind als ein weiterer Prompt.

## Lernen mit GenAI

Generative KI darf im Kurs als Lern- und Entwicklungshilfe eingesetzt werden. Wenn eine Aufgabe festhängt, kann ein Modell helfen, Fehlermeldungen zu erklären, Teilschritte vorzuschlagen oder Codevarianten zu vergleichen.

Wichtig ist die Grenze: Die KI ersetzt nicht das eigene Verständnis. Der Schwerpunkt bleibt darauf, GenAI-Systeme selbst zu verstehen, aufzubauen, zu prüfen und gezielt weiterzuentwickeln.

## Kompetenzillusion vermeiden

GenAI-Werkzeuge können sehr überzeugend erklären und formulieren. Dadurch entsteht leicht der Eindruck, ein Thema sei verstanden, obwohl nur die Antwort plausibel klingt. Deshalb gehören Nachvollziehen, Testen, Vergleichen und eigenes Umsetzen zum Kurs.

<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/kompetenzillusion.png" alt="Kompetenzillusion beim Lernen mit KI" width="700">
<p><small>KI-generiertes Bild</small></p>

# Nächste Schritte

| Dokument | Frage |
| -------- | ----- |
| [Lohnt sich GenAI?](./lohnt-es-sich.html) | Wann ist GenAI überhaupt der passende Ansatz? |
| [Aufgaben & Lösungswege](./aufgabenklassen-und-loesungswege.html) | Welche Umsetzung passt zu welcher Aufgabe? |
| [Large Language Models](../03-grundlagen/large-language-models.html) | Wie funktionieren LLMs, Foundation Models und Transformer? |
| [Prompt Engineering](../05-prompting-rag/prompt-engineering.html) | Wie werden Modellantworten gezielt gesteuert? |

---

**Version:** 1.1<br>
**Stand:** Juni 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
