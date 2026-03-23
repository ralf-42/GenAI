---
layout: default
title: Callout Test
nav_exclude: true
description: "Interne Testseite für GitHub-Alert-Callouts"
has_toc: true
---

# Callout Test Page

Diese Seite testet die korrekte Darstellung von Callouts im Agenten-Projekt.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Test 1: Einfacher Callout ohne Custom Title

> [!NOTE] Standard-Hinweis
> Details siehe Skript: M08 - Embeddings

**Erwartetes Ergebnis:**
- Titel: "Hinweis" (Standard-Titel)
- Content: "Details siehe Skript: M08 - Embeddings" (in neuer Zeile unter dem Titel)

---

## Test 2: Callout mit Custom Title

> [!TIP] Best Practice
> Embeddings für semantische Suche konsequent einsetzen.

**Erwartetes Ergebnis:**
- Titel: "Best Practice" (Custom-Titel)
- Content: "Embeddings für semantische Suche konsequent einsetzen." (in neuer Zeile)

---

## Test 3: Warning Callout

> [!WARNING] Standard-Warnung
> Achtung: Diese Funktion ist experimentell und kann sich ändern.

**Erwartetes Ergebnis:**
- Titel: "Warnung" (Standard-Titel)
- Content: "Achtung: Diese Funktion ist experimentell und kann sich ändern." (in neuer Zeile)

---

## Test 4: Mehrere Callout-Typen

> [!IMPORTANT] Weitere Information
> Weitere Informationen stehen in der offiziellen Dokumentation.

> [!DANGER] Kritischer Fehler
> Produktionsdaten niemals ohne Backup löschen!

> [!TIP] Erfolgreicher Test
> Die Installation wurde erfolgreich abgeschlossen.

**Erwartetes Ergebnis:**
- Alle drei Callouts zeigen den korrekten Typ-Icon
- Content immer in neuer Zeile unter Titel

---

## Test 5: Kurzer Text (< 50 Zeichen)

> [!NOTE] Kurzer Hinweis
> Kurzer Hinweis

**Erwartetes Ergebnis:**
- Titel: "Hinweis" (Standard-Titel)
- Content: "Kurzer Hinweis" (in neuer Zeile, NICHT als Custom-Titel behandelt)

---

**Version:**    1.0
**Stand:**    März 2026
**Kurs:**    Generative KI. Verstehen. Anwenden. Gestalten.
