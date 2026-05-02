---
layout: default
title: Best Practices
parent: Frameworks
nav_order: 3
has_children: true
description: "Empfohlene Patterns und Anti-Patterns für LangChain, LangGraph und LangSmith"
---

# Best Practices

Empfohlene Patterns und Anti-Patterns für die im Kurs zentralen Frameworks.

- **[LangChain Best Practices](https://ralf-42.github.io/GenAI/frameworks/bestpractices/langchain-best-practices.html)** – *Was sind die 7 MUST-HAVE Features?* Pflichtpatterns für alle LangChain 1.0+ Notebooks.
  - `init_chat_model()`, `with_structured_output()`, `@tool`, `create_agent()`
  - LCEL `|` Chains, Middleware, Standard Content Blocks
  - Anti-Patterns und Migrationshinweise (v1.2.x Neuerungen)

- **[LangGraph Best Practices](https://ralf-42.github.io/GenAI/frameworks/bestpractices/langgraph-best-practices.html)** – *Wie bleiben zustandsbehaftete Workflows wartbar?* Patterns für State, Routing, Checkpointing und Human-in-the-Loop.

- **[LangSmith Best Practices](https://ralf-42.github.io/GenAI/frameworks/bestpractices/langsmith-best-practices.html)** – *Wie observiere ich Chains und Agenten technisch?* Tracing, Evaluation und Monitoring mit LangSmith.
