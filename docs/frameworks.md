---
layout: default
title: Frameworks
nav_order: 5
has_children: true
description: "Einsteiger-Guides, Modell-Auswahl und Best Practices für LangChain, LangGraph, LangSmith, ChromaDB und weitere Werkzeuge"
---

# Frameworks

Die Framework-Seiten dienen nicht als vollständige Produktkataloge. Sie erklären die Werkzeuge, die im Kurs tatsächlich gebraucht werden, und vor allem, an welcher Stelle welches Framework den Unterschied macht. Entscheidend ist weniger, was ein Tool alles kann, sondern wofür es im Projektaufbau taugt.

Der Bereich gliedert sich in drei Gruppen, die auch der Seitennavigation entsprechen.

## Einsteiger-Guides

Kompakter Einstieg in die Werkzeuge — geordnet nach Verwendungszweck, nicht nach Produktnamen.

**LLM-Orchestrierung & Workflows**

LangChain ist die zentrale Schicht zwischen Modell und Anwendung. LangGraph ergänzt sie, sobald mehrstufige Abläufe, State oder Routing nötig werden.

- **[LangChain Einsteiger](https://ralf-42.github.io/GenAI/frameworks/einsteiger/einsteiger-langchain.html)** – *Wie werden Modelle, Prompts und Chains zusammengeführt?*
- **[LangGraph Einsteiger](https://ralf-42.github.io/GenAI/frameworks/einsteiger/einsteiger-langgraph.html)** – *Wie werden mehrstufige Workflows mit State und Routing umgesetzt?*

**Vektordatenbanken**

ChromaDB wird dort relevant, wo semantische Suche nicht nur eine Idee bleiben soll.

- **[ChromaDB Einsteiger](https://ralf-42.github.io/GenAI/frameworks/einsteiger/einsteiger-chromadb.html)** – *Wie wird aus Embeddings ein nutzbarer Suchindex?*

**Projektspezifische Bibliotheken & Prompts**

- **[GenAI_Lib Einsteiger](https://ralf-42.github.io/GenAI/frameworks/einsteiger/einsteiger-genai-lib.html)** – *Welche Hilfsfunktionen trägt das Kursprojekt selbst bei?*
- **[Prompt-Templates Einsteiger](https://ralf-42.github.io/GenAI/frameworks/einsteiger/einsteiger-prompts.html)** – *Wie werden Prompts wiederverwendbar und pflegbar?*

**No-Code / Low-Code**

- **[Agent Builder Einsteiger](https://ralf-42.github.io/GenAI/frameworks/einsteiger/einsteiger-agent-builder.html)** – *Wann genügt ein visueller Workflow-Builder?*

## Modell-Auswahl

Konkrete Provider, Modelle und Kurs-Defaults — die konzeptionellen Kriterien und Trade-offs stehen unter [Konzepte → Modellauswahl](https://ralf-42.github.io/GenAI/concepts/erweitert/m19-modellauswahl.html).

- **[Modell-Auswahl Guide](https://ralf-42.github.io/GenAI/frameworks/modell-auswahl/modell-auswahl-guide.html)** – *Welches Modell passt zu welcher Aufgabe?* Designregeln für den Kurseinsatz.
- **[Provider-Modell-Mapping](https://ralf-42.github.io/GenAI/frameworks/modell-auswahl/provider-modell-mapping.html)** – *Welche Provider und Modellfamilien passen zu welchen Anwendungstypen?*

## Best Practices

Empfohlene Patterns und Anti-Patterns für die im Kurs zentralen Frameworks. Evaluation und Observability sind hier mitgeführt, weil die technische Umsetzung — Tracing, Datasets, Monitoring — direkt in LangSmith landet.

- **[LangChain Best Practices](https://ralf-42.github.io/GenAI/frameworks/best-practices/langchain-best-practices.html)** – *Was sind die 7 MUST-HAVE Features?* `init_chat_model()`, `with_structured_output()`, `@tool`, `create_agent()`, LCEL `|` Chains, Middleware, Standard Content Blocks.
- **[LangGraph Best Practices](https://ralf-42.github.io/GenAI/frameworks/best-practices/langgraph-best-practices.html)** – *Wie bleiben zustandsbehaftete Workflows wartbar?* State, Routing, Checkpointing und Human-in-the-Loop.
- **[LangSmith Best Practices](https://ralf-42.github.io/GenAI/frameworks/best-practices/langsmith-best-practices.html)** – *Wie observiere ich Chains und Agenten technisch?* `LANGSMITH_*` Umgebungsvariablen, Tracing, Evaluation und Monitoring.

