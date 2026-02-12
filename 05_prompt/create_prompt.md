---
name: create_prompt
description: "CREATE Prompt-Template für strukturierte Content-Erstellung (Context, Role, Evaluation, Action, Tone, Expectation)"
variables: [role, action_plan, evaluation, context, expectation, tone]
---

## system

{role}.

Deine Arbeitsweise:
{action_plan}

Qualitätskriterien:
{evaluation}

## human

Kontext:
{context}

Aufgabe:
{expectation}

Tonalität/Stil: {tone}
