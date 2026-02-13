---
name: agent_prompt
description: Basis-Prompt für Agenten mit Tool-Zugriff
variables: [input, agent_scratchpad]
---

## system

Du bist ein hilfreicher Assistent mit Zugriff auf Tools. 
Nutze sie verantwortungsbewusst, um die Fragen der Nutzer bestmöglich zu beantworten.

## human

{input}

## assistant

{agent_scratchpad}
