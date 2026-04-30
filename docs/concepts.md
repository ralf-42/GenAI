---
layout: default
title: Konzepte
nav_order: 3
has_children: true
description: "Theoretische Grundlagen und technische Konzepte"
---

# Konzepte

Die Konzeptseiten erklären nicht alles, was im Feld Generative KI denkbar ist. Sie konzentrieren sich auf die Punkte, an denen in Übungen und Projekten die entscheidenden Unterschiede entstehen: Wann reicht ein Prompt, wann braucht es Retrieval, was leisten Embeddings tatsächlich und wo beginnt der Aufwand stärker zu wachsen als der Nutzen.

## Orientierung & Strategie

Nicht jede Aufgabe braucht ein Agentensystem, eine Vektordatenbank oder Fine-Tuning. Der Einstieg beginnt deshalb mit der Frage, welcher Lösungsweg überhaupt passt.

- [Aufgabenklassen & Lösungswege](https://ralf-42.github.io/GenAI/concepts/aufgabenklassen-und-loesungswege.html) – *Welcher Weg passt zur Aufgabe?* Entscheidungshilfe zwischen Chat, Workflow, Python, RAG, lokalen Modellen und anderen Lösungswegen.

## Technische Grundlagen

Diese Seiten klären die Mechanik hinter den Modellen. Sie sind dort besonders nützlich, wo ein System zwar "irgendwie funktioniert", aber unklar bleibt, warum es instabil, teuer oder unpräzise wird.

- [Transformer-Architektur](https://ralf-42.github.io/GenAI/concepts/m05a-transformer.html) – *Wie arbeiten moderne Sprachmodelle intern?*
- [Tokenizing & Chunking](https://ralf-42.github.io/GenAI/concepts/m08a-tokenizing-chunking.html) – *Wie wird Text so zerlegt, dass Retrieval noch sinnvoll bleibt?*
- [Embeddings](https://ralf-42.github.io/GenAI/concepts/m08b-embeddings.html) – *Wie wird Bedeutung als Vektor darstellbar?*

## Multimodale Konzepte

Sobald neben Text auch Bilder, Audio oder spezialisierte Modelle ins Spiel kommen, steigen Möglichkeiten und Fehlannahmen zugleich. Diese Seiten trennen technische Möglichkeiten von dem, was im Projektalltag tatsächlich tragfähig ist.

- [Multimodal Bild](https://ralf-42.github.io/GenAI/concepts/m09-multimodal-bild.html) – *Was leisten multimodale Bildmodelle wirklich?*
- [Multimodal Audio](https://ralf-42.github.io/GenAI/concepts/m16-multimodal-audio.html) – *Wann lohnt sich Audio im Workflow?*
- [Fine-Tuning](https://ralf-42.github.io/GenAI/concepts/m18-fine-tuning.html) – *Wann reicht Prompting nicht mehr aus?*

## Erweiterte Techniken

Diese Dokumente greifen dort ein, wo einzelne Bausteine zusammenspielen müssen. Gerade in diesen Themen zeigt sich oft, ob eine Anwendung nur beeindruckend aussieht oder im Alltag belastbar arbeitet.

- [Prompt Engineering](https://ralf-42.github.io/GenAI/concepts/prompt-engineering.html) – *Wie werden Modelle gezielt gesteuert?*
- [Context Engineering](https://ralf-42.github.io/GenAI/concepts/m21-context-engineering.html) – *Welche Informationen braucht ein System wirklich?*
- [RAG-Konzepte](https://ralf-42.github.io/GenAI/concepts/rag-konzepte.html) – *Wann hilft Retrieval und wann schadet es eher?*
- [Modellauswahl](https://ralf-42.github.io/GenAI/concepts/m19-modellauswahl.html) – *Nach welchen Kriterien wird ein Modell ausgewählt?*  
  Praktische Designregeln für den Kurs finden sich ergänzend im [Modell-Auswahl Guide](https://ralf-42.github.io/GenAI/frameworks/modell-auswahl-guide.html).
- [Evaluation & Observability](https://ralf-42.github.io/GenAI/concepts/evaluation-observability.html) – *Wie wird sichtbar, ob eine GenAI-Anwendung gut funktioniert?* Mindeststandard für Testsets, RAG-Qualitätsprüfung, Tracing und Fehleranalyse.
