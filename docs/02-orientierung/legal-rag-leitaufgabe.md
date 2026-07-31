---
layout: default
title: Legal-RAG Leitaufgabe
parent: Orientierung
nav_order: 4
description: "Roter Faden für den GenAI-Kurs: Legal-RAG als praxisnaher Use Case mit Quellenbindung, Unsicherheit und Review"
has_toc: true
---

# Legal-RAG Leitaufgabe
{: .no_toc }

> **Vom Prompt zur quellengebundenen Antwort**
> Der Legal-RAG Workshop verbindet die GenAI-Module mit einer wiederkehrenden Praxisfrage: Wie kann ein KI-System rechtliche oder regelbasierte Dokumente durchsuchen, Antworten belegen und Unsicherheit sichtbar machen?

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Warum dieser Use Case?

Legal-RAG ist ein geeigneter roter Faden für den GenAI-Kurs, weil er typische GenAI-Entscheidungen in einem realistischen Kontext bündelt:

- Reicht ein einfacher Prompt oder braucht es Retrieval?
- Welche Dokumente dürfen als Quelle verwendet werden?
- Wie wird eine Antwort strukturiert?
- Wann ist eine Aussage nicht ausreichend belegt?
- Wann braucht es Human Review?
- Wie werden Qualität, Kosten und Grenzen sichtbar?

Der Use Case bleibt bewusst eine technische Lernaufgabe. Er ersetzt keine Rechtsberatung. Im Kurs geht es darum, eine nachvollziehbare RAG-Anwendung aufzubauen und ihre Grenzen zu verstehen.

## Arbeitsfrage

Die Leitfrage lautet:

> Wie lässt sich eine Frage zu rechtlichen oder regelbasierten Dokumenten so beantworten, dass die Antwort auf bereitgestellten Quellen beruht, Unsicherheit sichtbar bleibt und kritische Fälle geprüft werden können?

Diese Frage begleitet die Module vom einfachen Modellaufruf bis zum vollständigen Workshop.

## Was das System leisten soll

Ein brauchbarer Legal-RAG-Prototyp soll:

- eine Frage in natürlicher Sprache entgegennehmen,
- relevante Textstellen aus einem kuratierten Dokumentkorpus finden,
- eine Antwort mit Quellenbezug formulieren,
- fehlende Evidenz klar benennen,
- strukturierte Ausgaben für Prüfung und Weiterverarbeitung liefern,
- bei riskanten oder unklaren Aussagen Human Review vorsehen,
- Kosten, Modellwahl und Qualitätsgrenzen nachvollziehbar machen.

## Was bewusst nicht Ziel ist

Der Legal-RAG Workshop ist kein produktives Rechtssystem und keine Rechtsberatung.

Nicht Ziel ist:

- verbindliche rechtliche Bewertung,
- Verarbeitung echter vertraulicher Mandats- oder Kundendaten,
- ungeprüfte Antwort ohne Quellenbindung,
- blindes Vertrauen in plausible Modellformulierungen,
- produktiver Betrieb ohne Datenschutz-, Sicherheits- und Qualitätsprüfung.

## Modulbezug

| Modulbereich | Beitrag zur Leitaufgabe |
|--------------|--------------------------|
| Prompting und Text | Fragen formulieren, Antworten zusammenfassen, Grenzen benennen |
| Strukturierte Ausgaben | Antwort, Risiken, offene Fragen und Quellenbedarf maschinenlesbar machen |
| RAG | Dokumente indexieren, relevante Stellen abrufen, Quellen belegen |
| SQL RAG | Metadaten zu Normen, Quellen oder Dokumenttypen strukturiert abfragen |
| Agenten und Tools | Entscheiden, wann Retrieval oder ein Tool nötig ist |
| Middleware und Review | riskante Antworten prüfen, Fehler behandeln, Freigaben einbauen |
| Kosten und Modellwahl | einfachen Prompt, RAG und agentische Varianten vergleichen |

## Praxistransfer in Notebooks

In passenden Notebooks wird der Praxisbezug als Aufgabenblock geführt. Der Block steht unter `# A | Aufgaben` auf derselben Layout-Ebene wie `**Grundlagen**`, `**Aufbau**` und `**Vertiefung**`.

Beispiel:

```markdown
**Praxis-Transfer: Legal-RAG Workshop**

1. Welche reale Arbeitsfrage löst dieser Notebook-Baustein im Legal-RAG Workshop?
2. Welche Eingabedaten oder Dokumente braucht er?
3. Welche Ausgabe sollte er liefern?
4. Welche Risiken oder Grenzen bleiben?
5. Wann wäre Human Review nötig?
6. Ist der passende Lösungsweg hier Prompt, strukturierte Ausgabe, RAG, Tool, Agent oder Workflow?
```

## Vom Leitbild zum Workshop

Diese Seite beschreibt die Leitaufgabe und die Einordnung. Die konkrete Umsetzung steht im Projektbereich:

| Dokument | Frage |
|---|---|
| [Legal-RAG Workshop](../11-projekte/rag-workshop.html) | Wie wird aus der Leitaufgabe Schritt für Schritt eine lauffähige Anwendung? |
| [Aufgaben & Lösungswege](./aufgabenklassen-und-loesungswege.html) | Wann reicht Prompting, wann braucht es RAG, Tools oder Agenten? |
| [RAG-Konzepte](../05-prompting-rag/rag-konzepte.html) | Welche Retrieval-Entscheidungen liegen unter dem Workshop? |
| [Evaluation & Observability](../07-qualitaet-sicherheit/evaluation-observability.html) | Wie wird die Qualität einer RAG-Anwendung überprüfbar? |

---

**Version:** 1.0<br>
**Stand:** Juli 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
