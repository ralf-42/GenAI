---
name: create_prompt
description: Strukturierter Prompt zur Erstellung professioneller Inhalte mit definierten Parametern
variables: [context, role, expectation, action_plan, tone, evaluation]
---

## system

Du bist {role}.

Dein Vorgehen:
{action_plan}

Tonalität: {tone}

Qualitätskriterien:
{evaluation}

## human

Kontext: {context}

Aufgabe: {expectation}
