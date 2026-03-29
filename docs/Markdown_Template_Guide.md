---
layout: default
title: Markdown Template Guide
nav_exclude: true
description: "Vorlage und Regeln für Markdown-Dateien in docs/ nach dem verbindlichen Doku-Standard"
has_toc: true
---

# Markdown Template Guide
{: .no_toc }

> **Vorlage und Regeln für Markdown-Dateien in `docs/` nach dem verbindlichen Doku-Standard**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Ziel und Geltungsbereich

Diese Datei übersetzt den verbindlichen Standard aus `_docs/Dokument_Standard.md` in eine praktische Arbeitsvorlage für `GenAI/docs/`. Maßgeblich bleibt immer der Standard selbst. Diese Guide-Datei konkretisiert ihn für Jekyll, just-the-docs und die vorhandene Projektstruktur.

---

## Grundprinzip

Für alle Dokumente in `docs/` gilt: **Substanz vor Struktur**. Formatierung hilft beim Lesen, ersetzt aber keinen präzisen Text. Ein sauber formulierter Absatz ist fast immer besser als eine Kette aus Bullet Points.

Aufzählungen werden nur eingesetzt, wenn echte Parallelstruktur vorliegt. Abschnitte mit zusammenhängender Argumentation bleiben Fließtext. Aussagen wie "praxisorientiert", "ganzheitlich" oder "state of the art" werden vermieden, wenn sie nicht durch ein Beispiel oder einen überprüfbaren Beleg gedeckt sind.

Personalpronomen werden vermieden. Statt "Sie prüfen" oder "du findest" werden unpersönliche Formulierungen verwendet, etwa "Vor dem Start wird geprüft" oder "Die Checkliste findet sich weiter unten".

---

## Standard-Template für Inhaltsseiten

Diese Vorlage gilt für inhaltliche Dokumente in `concepts/`, `frameworks/`, `deployment/`, `ressourcen/` und `regulatorisches/`.

````markdown
---
layout: default
title: Titel des Dokuments
parent: Übergeordnete Seite
nav_order: 1
description: Prägnanter Beschreibungstext für Navigation und SEO
has_toc: true
---

# Titel des Dokuments
{: .no_toc }

> **Prägnanter Beschreibungstext für Navigation und SEO**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Erstes Kapitel

Hier steht zusammenhängender Text. Bullet Points nur dann, wenn mehrere wirklich gleichwertige Punkte nebeneinanderstehen.

---

## Zweites Kapitel

Hier folgt der eigentliche Inhalt.

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Verwandtes Dokument](./Verwandtes_Dokument.html) | Worum geht es dort? |

---

**Version:**    1.0<br>
**Stand:**    März 2026<br>
**Kurs:**    Generative KI. Verstehen. Anwenden. Gestalten.
