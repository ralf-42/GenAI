---
layout: default
title: Frameworks
nav_order: 4
has_children: true
description: "Einsteiger-Guides für LangChain, ChromaDB und Agent Builder"
---

# Frameworks

Die Framework-Seiten dienen nicht als vollständige Produktkataloge. Sie erklären die Werkzeuge, die im Kurs tatsächlich gebraucht werden, und vor allem, an welcher Stelle welches Framework den Unterschied macht. Entscheidend ist weniger, was ein Tool alles kann, sondern wofür es im Projektaufbau taugt.

## LLM-Orchestrierung & Workflows

LangChain ist im Projekt die zentrale Schicht zwischen Modell und Anwendung. Wer verstehen will, warum Providerwechsel, Chains oder Tool-Integration im Kurs vergleichsweise kontrollierbar bleiben, beginnt hier.

- **[LangChain Einsteiger](https://ralf-42.github.io/GenAI/frameworks/Einsteiger_LangChain.html)** – *Wie werden Modelle, Prompts und Chains zusammengeführt?*

## Vektordatenbanken

ChromaDB wird dort relevant, wo semantische Suche nicht nur eine Idee bleiben soll. Die Seite zeigt weniger "was ChromaDB alles bietet", sondern wie daraus ein brauchbarer Retrieval-Pfad wird.

- **[ChromaDB Einsteiger](https://ralf-42.github.io/GenAI/frameworks/Einsteiger_ChromaDB.html)** – *Wie wird aus Embeddings ein nutzbarer Suchindex?*

## No-Code / Low-Code

Nicht jede Anwendung beginnt mit Python-Code. Agent Builder ist im Kurs vor allem als Vergleich interessant: Wo reicht ein visueller Workflow, und ab wann wird Code unverzichtbar?

- **[Agent Builder Einsteiger](https://ralf-42.github.io/GenAI/frameworks/Einsteiger_Agent_Builder.html)** – *Wann genügt ein visueller Workflow-Builder?*

## Projektspezifische Bibliotheken

Die `genai_lib` bündelt genau die Hilfsfunktionen, die im Kurs immer wieder gebraucht werden. Wer nachvollziehen möchte, warum Setups, API-Keys und Visualisierungen in den Notebooks vergleichsweise konsistent aussehen, findet hier die technische Basis.

- **[GenAI_Lib Einsteiger](https://ralf-42.github.io/GenAI/frameworks/Einsteiger_GenAI_Lib.html)** – *Welche Hilfsfunktionen trägt das Kursprojekt selbst bei?*

## Modell-Auswahl

Modellauswahl ist selten nur eine Qualitätsfrage. Häufiger geht es um Kosten, Latenz, Modalitäten und die Frage, ob ein stärkeres Modell den Mehraufwand überhaupt rechtfertigt.

- **[Modell-Auswahl Guide](https://ralf-42.github.io/GenAI/frameworks/Modell_Auswahl_Guide.html)** – *Welches Modell passt zu welcher Aufgabe?*

## Prompt-Templates

Prompt-Dateien werden im Kurs nicht als Textbausteine behandelt, sondern als wartbare Schnittstelle zwischen Idee und Anwendung. Die Seite zeigt, wie daraus mehr wird als eine Sammlung lose kopierter Prompts.

- **[Prompt-Templates Einsteiger](https://ralf-42.github.io/GenAI/frameworks/Einsteiger_Prompts.html)** – *Wie werden Prompts wiederverwendbar und pflegbar?*

## Evaluation & Observability

KI-Anwendungen brauchen neben funktionierendem Code auch sichtbare Qualität. Für den Einstieg reicht ein kleines Testset; bei Chains, RAG und Agenten wird zusätzlich relevant, welcher Schritt die Antwort erzeugt oder verschlechtert hat.

- **[Evaluation & Observability](https://ralf-42.github.io/GenAI/concepts/Evaluation_Observability.html)** – *Wie wird sichtbar, ob eine GenAI-Anwendung gut funktioniert?* Mindeststandard für Testsets, RAG-Qualitätsprüfung, Tracing und Fehleranalyse.
- **[LangSmith Best Practices](https://ralf-42.github.io/GenAI/frameworks/LangSmith_Best_Practices.html)** – *Wie observiere ich Chains und Agenten technisch?* Tracing, Evaluation und Monitoring mit LangSmith.

## Best Practices & Anti-Patterns

Empfohlene Patterns und Anti-Patterns für die im Kurs zentralen Frameworks.

- **[LangChain Best Practices](https://ralf-42.github.io/GenAI/frameworks/LangChain_Best_Practices.html)** – *Was sind die 7 MUST-HAVE Features?* Pflichtpatterns für alle LangChain 1.0+ Notebooks
  - `init_chat_model()`, `with_structured_output()`, `@tool`, `create_agent()`
  - LCEL `|` Chains, Middleware, Standard Content Blocks
  - Anti-Patterns und Migrationshinweise (v1.2.x Neuerungen)

- **[LangSmith Best Practices](https://ralf-42.github.io/GenAI/frameworks/LangSmith_Best_Practices.html)** – *Wie observiere ich Chains und Agenten richtig?* Tracing, Evaluation und Monitoring in der Praxis
  - `LANGSMITH_*` Umgebungsvariablen (nicht `LANGCHAIN_*`)
  - `.with_config()`, `.func()`, Projektname-Konventionen
  - Troubleshooting: EU-Endpoint, falsches Projekt, fehlende Traces

