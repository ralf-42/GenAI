---
layout: default
title: Evaluation & Observability
parent: Konzepte
nav_order: 11
description: "Qualität von GenAI-Anwendungen messen, erklären und verbessern"
has_toc: true
---

# Evaluation & Observability
{: .no_toc }

> **Qualität von GenAI-Anwendungen messen, erklären und verbessern**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Warum dieses Thema früh kommt

GenAI-Anwendungen wirken in Demos oft stabiler, als sie sind. Eine einzelne gelungene Antwort beweist nur, dass ein Fall funktioniert hat. Dieser Einzelfall sagt wenig darüber aus, ob dieselbe Chain bei anderen Fragen, anderem Kontext oder leicht veränderten Dokumenten noch belastbar arbeitet.

Evaluation und Observability schaffen dafür zwei verschiedene Blickwinkel. Evaluation prüft, ob ein System gute Ergebnisse liefert. Observability zeigt, wie diese Ergebnisse entstanden sind. Erst zusammen wird sichtbar, ob ein Fehler im Prompt, im Retriever, im Tool-Aufruf, im Modell oder in den Eingabedaten liegt.

Typischer Fehler: Antwortqualität wird nur im Chatfenster beurteilt. Das führt schnell zu Bauchgefühl-Optimierung: Prompts werden verändert, ohne zu wissen, ob die Änderung über mehrere Testfälle hinweg wirklich besser wurde.

---

## Begriffe sauber trennen

Die Begriffe werden im Alltag oft vermischt. Für Kursprojekte reicht eine pragmatische Trennung:

| Begriff | Frage | Beispiel |
|---|---|---|
| **Testen** | Läuft der Code technisch? | Notebook von oben bis unten ausführen |
| **Evaluation** | Ist das Ergebnis fachlich gut? | 10 RAG-Fragen mit erwarteten Antworten vergleichen |
| **Monitoring** | Was passiert im laufenden Betrieb? | Fehlerquote, Latenz und Kosten beobachten |
| **Observability** | Warum ist etwas passiert? | Trace zeigt Retrieval, Prompt, Tool-Call und Modellantwort |

In der Praxis relevant, wenn eine Anwendung mehr leisten soll als eine einmalige Demo. Sobald Dokumente aktualisiert, Prompts angepasst oder Tools eingebunden werden, braucht es mindestens kleine, wiederholbare Testsets.

---

## Mindeststandard für Einsteigerprojekte

Ein Einsteigerprojekt braucht keine vollständige MLOps-Pipeline. Es braucht aber einen Mindeststandard, der wiederholbar ist und Fehler sichtbar macht.

| Bereich | Mindeststandard |
|---|---|
| Testset | 5 bis 10 repräsentative Fragen |
| Erwartung | kurze Musterantwort oder klare Bewertungskriterien |
| Bewertung | korrekt, teilweise korrekt, falsch |
| Fehlerkategorie | Retrieval, Prompt, Kontext, Tool, Modell, Daten |
| Verlauf | Ergebnisse nach Änderungen dokumentieren |

Dieser Standard passt besonders gut zu RAG, SQL-RAG und Agenten. Bei RAG wird sichtbar, ob die richtigen Chunks gefunden wurden. Bei SQL-RAG wird sichtbar, ob die generierte Abfrage korrekt und sicher ist. Bei Agenten wird sichtbar, ob Tool-Auswahl und Reihenfolge plausibel waren.

> [!SUCCESS] Mindeststandard<br>
> Jede substantielle Änderung an Prompt, Chunking, Retriever oder Tool-Logik wird gegen dasselbe kleine Testset geprüft. Sonst bleibt unklar, ob die Änderung verbessert oder nur verschoben hat.

---

## RAG-Evaluation

RAG-Systeme brauchen eine andere Bewertung als reine Chatbots, weil zwei Fehlerquellen zusammenspielen. Der Retriever kann falschen Kontext liefern, und das Modell kann den richtigen Kontext falsch verwenden. Eine Antwort kann deshalb gut formuliert sein und trotzdem fachlich falsch bleiben.

Eine einfache RAG-Evaluation trennt drei Fragen:

| Ebene | Leitfrage | Bewertung |
|---|---|---|
| Retrieval | Wurden passende Quellen gefunden? | relevante Chunks vorhanden / fehlen |
| Grounding | Ist die Antwort durch Quellen gedeckt? | belegt / teilweise belegt / nicht belegt |
| Antwort | Beantwortet die Ausgabe die Frage? | korrekt / teilweise / falsch |

Ein kleines Testset kann direkt als Markdown-Tabelle gepflegt werden:

| Frage | Erwartung | Quelle erwartet | Ergebnis |
|---|---|---|---|
| Welche Passwortregeln gelten? | Länge, Sonderzeichen, Wechselintervall | `security.md` | offen |
| Wie wird ein API-Key gespeichert? | Secret Manager, nicht im Notebook | `setup.md` | offen |
| Was tun bei Timeout? | Retry oder kleinere Anfrage | `troubleshooting.md` | offen |

Grenze: LLM-as-a-judge kann helfen, ersetzt aber kein fachliches Urteil. Gerade bei rechtlichen, medizinischen, finanziellen oder unternehmensinternen Antworten müssen Testfälle von Personen geprüft werden, die die Domäne kennen.

---

## Observability bei Chains und Agenten

Observability beginnt nicht erst im Produktivbetrieb. Schon im Notebook hilft sie, Chain-Schritte auseinanderzuhalten. Bei einfachen Chains reicht oft ein gezieltes Ausgeben von Zwischenergebnissen. Bei Agenten und verschachtelten RAG-Pipelines wird ein Trace schnell hilfreicher, weil er Input, Output, Tool-Aufrufe, Token-Nutzung und Latenz pro Schritt sichtbar macht.

Ein Trace beantwortet typische Debugging-Fragen:

| Frage | Sichtbar im Trace |
|---|---|
| Welche Dokumente wurden retrieved? | Retriever-Input und Retriever-Output |
| Welcher Prompt ging an das Modell? | vollständige Prompt-Nachricht |
| Welches Tool wurde aufgerufen? | Tool-Name, Argumente, Ergebnis |
| Wo entstand ein Fehler? | fehlerhafter Chain- oder Tool-Schritt |
| Warum ist die Anwendung langsam? | Latenz pro Komponente |

Nicht geeignet ist Observability als Ersatz für Evaluation. Ein Trace erklärt den Ablauf, bewertet ihn aber nicht automatisch. Umgekehrt zeigt eine schlechte Bewertung noch nicht, wo der Fehler entstanden ist.

---

## LangSmith im Kurskontext

LangSmith ist im Projekt die naheliegende Plattform für Tracing, Evaluation und Monitoring, weil LangChain- und LangGraph-Anwendungen dort ohne viel Zusatzcode sichtbar werden. Für Einsteiger reicht zuerst das automatische Tracing: Umgebung konfigurieren, Chain ausführen, Trace inspizieren.

```python
import os

os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_PROJECT"] = "GenAI-dev"
```

Danach sollte im Kurs nicht die Plattform im Vordergrund stehen, sondern die Frage: Welche Hypothese wird geprüft? Ein Trace ist nur dann nützlich, wenn klar ist, worauf geachtet wird: falscher Kontext, falsches Tool, zu viele Tokens, unerwartete Modellantwort oder fehlende Quellen.

Für die detaillierten Patterns gilt die projektweite Referenz [LangSmith Best Practices](../frameworks/langsmith-best-practices.html). Die Standards für konkrete Notebook-Änderungen stehen zusätzlich in `LangSmith_Standards.md` im Repository.

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [RAG-Konzepte](./rag-konzepte.html) | Wie wird Retrieval aufgebaut und warum bestimmt es die Antwortqualität? |
| [Context Engineering](./m21-context-engineering.html) | Welche Informationen gehören in den Kontext einer Modellanfrage? |
| [Modell-Auswahl Guide](../frameworks/modell-auswahl-guide.html) | Welches Modell passt zu Aufgabe, Kostenrahmen und Latenzanforderung? |
| [LangSmith Best Practices](../frameworks/langsmith-best-practices.html) | Wie werden Tracing, Evaluation und Monitoring technisch umgesetzt? |

---

**Version:** 1.0<br>
**Stand:** April 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
