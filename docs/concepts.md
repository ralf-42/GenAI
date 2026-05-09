---
layout: default
title: Konzepte
nav_order: 4
has_children: true
description: "Theoretische Grundlagen und technische Konzepte"
---

# Konzepte

**Version:** 1.0<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI

Die Konzeptseiten erklären nicht alles, was im Feld Generative KI denkbar ist. Sie konzentrieren sich auf die Punkte, an denen in Übungen und Projekten die entscheidenden Unterschiede entstehen: Wann reicht ein Prompt, wann braucht es Retrieval, was leisten Embeddings tatsächlich und wo beginnt der Aufwand stärker zu wachsen als der Nutzen.

## Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

## Orientierung & Strategie

Nicht jede Aufgabe braucht ein Agentensystem, eine Vektordatenbank oder Fine-Tuning. Der Einstieg beginnt deshalb mit der Frage, ob GenAI überhaupt sinnvoll ist und welcher Lösungsweg danach passt.

- [Lohnt sich GenAI?](concepts/orientierung/lohnt-es-sich.html) – *Ist GenAI für diesen Anwendungsfall sinnvoll, machbar und verantwortbar?* Vorprüfung von Problem, Datenlage, Nutzen, Risiken und Betrieb.
- [Aufgabenklassen & Lösungswege](concepts/orientierung/aufgabenklassen-und-loesungswege.html) – *Welcher Weg passt zur Aufgabe?* Entscheidungshilfe zwischen Chat, Workflow, Python, RAG, lokalen Modellen und anderen Lösungswegen.

## Technische Grundlagen

Diese Seiten klären die Mechanik hinter den Modellen. Sie sind dort besonders nützlich, wo ein System zwar "irgendwie funktioniert", aber unklar bleibt, warum es instabil, teuer oder unpräzise wird.

- [Transformer-Architektur](concepts/grundlagen/m05a-transformer.html) – *Wie arbeiten moderne Sprachmodelle intern?*
- [Tokenizing & Chunking](concepts/grundlagen/m08a-tokenizing-chunking.html) – *Wie wird Text so zerlegt, dass Retrieval noch sinnvoll bleibt?*
- [Embeddings](concepts/grundlagen/m08b-embeddings.html) – *Wie wird Bedeutung als Vektor darstellbar?*

## Multimodale Konzepte

Sobald neben Text auch Bilder, Audio oder spezialisierte Modelle ins Spiel kommen, steigen Möglichkeiten und Fehlannahmen zugleich. Diese Seiten trennen technische Möglichkeiten von dem, was im Projektalltag tatsächlich tragfähig ist.

- [Multimodal Bild](concepts/multimodal/m09-multimodal-bild.html) – *Was leisten multimodale Bildmodelle wirklich?*
- [Multimodal Audio](concepts/multimodal/m16-multimodal-audio.html) – *Wann lohnt sich Audio im Workflow?*

## Erweiterte Techniken

Diese Dokumente greifen dort ein, wo einzelne Bausteine zusammenspielen müssen. Gerade in diesen Themen zeigt sich oft, ob eine Anwendung nur beeindruckend aussieht oder im Alltag belastbar arbeitet.

- [Prompt Engineering](concepts/erweitert/prompt-engineering.html) – *Wie werden Modelle gezielt gesteuert?*
- [Context Engineering](concepts/erweitert/m21-context-engineering.html) – *Welche Informationen braucht ein System wirklich?*
- [RAG-Konzepte](concepts/erweitert/rag-konzepte.html) – *Wann hilft Retrieval und wann schadet es eher?*
- [Modellauswahl](concepts/erweitert/m19-modellauswahl.html) – *Nach welchen Kriterien wird ein Modell ausgewählt?*  
  Praktische Designregeln für den Kurs finden sich ergänzend im [Modell-Auswahl Guide](frameworks/modell-auswahl/modell-auswahl-guide.html).
- [Evaluation & Observability](concepts/erweitert/evaluation-observability.html) – *Wie wird sichtbar, ob eine GenAI-Anwendung gut funktioniert?* Mindeststandard für Testsets, RAG-Qualitätsprüfung, Tracing und Fehleranalyse.
- [Fine-Tuning](concepts/erweitert/m18-fine-tuning.html) – *Wann reicht Prompting nicht mehr aus?* Einordnung von Training als spätere Optimierungsoption.

## Produktive und agentische Anwendungen

Sobald GenAI-Anwendungen Werkzeuge aufrufen, Zustand halten oder menschliche Freigaben einbinden, reicht ein einzelner Prompt nicht mehr aus. Diese Seiten behandeln die Konzepte, die aus Modellaufrufen belastbare Anwendungssysteme machen.

- [Tool Use & Function Calling](concepts/agentisch/tool-use-function-calling.html) – *Wie bekommt ein Modell kontrollierten Zugriff auf Werkzeuge?*
- [Memory-Systeme](concepts/agentisch/memory-systeme.html) – *Wie bleibt relevanter Kontext über Nachrichten und Sitzungen hinweg erhalten?*
- [State Management](concepts/agentisch/state-management.html) – *Wie werden Zwischenergebnisse und Prozesszustände explizit verwaltet?*
- [Human-in-the-Loop](concepts/agentisch/human-in-the-loop.html) – *Wann braucht eine GenAI-Anwendung menschliche Freigabe oder Eskalation?*
- [GenAI-Sicherheit](concepts/agentisch/agent-security.html) – *Wie werden Tool-Zugriffe, externe Inhalte und sensible Daten abgesichert?*

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Einsteiger-Guides](frameworks/einsteiger-guides.html) | Wo starte ich als Einsteiger mit Konzepte? |
| [Best Practices](frameworks/best-practices.html) | Welche Produktionsstandards gelten für Konzepte? |
