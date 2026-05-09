---
layout: default
title: Frameworks
nav_order: 5
has_children: true
description: "Einsteiger-Guides, Modell-Auswahl und Best Practices für LangChain, LangGraph, LangSmith, ChromaDB und weitere Werkzeuge"
---

# Frameworks

**Version:** 1.0<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI

Die Framework-Seiten dienen nicht als vollständige Produktkataloge. Sie erklären die Werkzeuge, die im Kurs tatsächlich gebraucht werden, und vor allem, an welcher Stelle welches Framework den Unterschied macht. Entscheidend ist weniger, was ein Tool alles kann, sondern wofür es im Projektaufbau taugt.

Der Bereich gliedert sich in drei Gruppen, die auch der Seitennavigation entsprechen:

- **[Einsteiger-Guides](frameworks/einsteiger-guides.html)** - erste praktische Zugänge zu den Werkzeugen
- **[Modell-Auswahl](frameworks/modell-auswahl.html)** - konkrete Modell- und Provider-Entscheidungen
- **[Best Practices](frameworks/best-practices.html)** - verbindliche Patterns und Anti-Patterns für den Kurseinsatz

## Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

## Einsteiger-Guides

Kompakter Einstieg in die Werkzeuge, geordnet nach Verwendungszweck und analog zur Unterseite [Einsteiger-Guides](frameworks/einsteiger-guides.html).

**LLM-Orchestrierung & Workflows**

LangChain ist die zentrale Schicht zwischen Modell und Anwendung. LangGraph ergänzt sie, sobald mehrstufige Abläufe, State oder Routing nötig werden.

- **[LangChain Einsteiger](frameworks/einsteiger/einsteiger-langchain.html)** – *Wie werden Modelle, Prompts und Chains zusammengeführt?*
- **[LangGraph Einsteiger](frameworks/einsteiger/einsteiger-langgraph.html)** – *Wie werden mehrstufige Workflows mit State und Routing umgesetzt?*

**Vektordatenbanken**

ChromaDB wird dort relevant, wo semantische Suche nicht nur eine Idee bleiben soll.

- **[ChromaDB Einsteiger](frameworks/einsteiger/einsteiger-chromadb.html)** – *Wie wird aus Embeddings ein nutzbarer Suchindex?*

**Projektspezifische Bibliotheken & Prompts**

- **[GenAI_Lib Einsteiger](frameworks/einsteiger/einsteiger-genai-lib.html)** – *Welche Hilfsfunktionen trägt das Kursprojekt selbst bei?*
- **[Prompt-Templates Einsteiger](frameworks/einsteiger/einsteiger-prompts.html)** – *Wie werden Prompts wiederverwendbar und pflegbar?*

**Evaluation & Observability**

- **[LangSmith Einsteiger](frameworks/einsteiger/einsteiger-langsmith.html)** – *Wie starte ich mit LangSmith für Tracing und Debugging?*

**No-Code / Low-Code**

- **[Agent Builder Einsteiger](frameworks/einsteiger/einsteiger-agent-builder.html)** – *Wann genügt ein visueller Workflow-Builder?*

## Modell-Auswahl

Konkrete Provider, Modelle und Kurs-Defaults aus der Unterseite [Modell-Auswahl](frameworks/modell-auswahl.html). Die konzeptionellen Kriterien und Trade-offs stehen ergänzend unter [Konzepte → Modellauswahl](concepts/erweitert/m19-modellauswahl.html).

- **[Modell-Auswahl Guide](frameworks/modell-auswahl/modell-auswahl-guide.html)** – *Welches Modell passt zu welcher Aufgabe?* Designregeln für den Kurseinsatz.
- **[Provider-Modell-Mapping](frameworks/modell-auswahl/provider-modell-mapping.html)** – *Welche Provider und Modellfamilien passen zu welchen Anwendungstypen?*

## Best Practices

Empfohlene Patterns und Anti-Patterns aus der Unterseite [Best Practices](frameworks/best-practices.html). Evaluation und Observability sind hier mitgeführt, weil die technische Umsetzung - Tracing, Datasets, Monitoring - direkt in LangSmith landet.

- **[LangChain Best Practices](frameworks/best-practices/langchain-best-practices.html)** – *Was sind die 7 MUST-HAVE Features?* `init_chat_model()`, `with_structured_output()`, `@tool`, `create_agent()`, LCEL `|` Chains, Middleware, Standard Content Blocks.
- **[LangGraph Best Practices](frameworks/best-practices/langgraph-best-practices.html)** – *Wie bleiben zustandsbehaftete Workflows wartbar?* State, Routing, Checkpointing und Human-in-the-Loop.
- **[LangSmith Best Practices](frameworks/best-practices/langsmith-best-practices.html)** – *Wie observiere ich Chains und Agenten technisch?* `LANGSMITH_*` Umgebungsvariablen, Tracing, Evaluation und Monitoring.

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Einsteiger-Guides](frameworks/einsteiger-guides.html) | Wo starte ich als Einsteiger mit Frameworks? |
| [Best Practices](frameworks/best-practices.html) | Welche Produktionsstandards gelten für Frameworks? |
