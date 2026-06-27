---
layout: default
title: GenAI Kurs - Überarbeitungsliste
nav_order: 99
description: "Konkrete Abarbeitungsliste für die Nachpflege des kursversionierten GenAI-Materials"
has_toc: true
---

# GenAI Kurs - Überarbeitungsliste
{: .no_toc }

> **Arbeitsliste für die Nachpflege der versionierten Kursunterlagen in `01_notebook`, `05_prompt` und `docs`.**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# Prio 1 - Navigation und Kurslogik glätten

- [x] `README.md`, `docs/index.md`, `docs/zuerst-lesen.md`, `docs/lernpfade.md` und `docs/02-orientierung/kursueberblick.md` sprachlich und inhaltlich aufeinander abstimmen.
- [x] `Kursüberblick` als zentralen Einstieg überall gleich führen.
- [x] Die Startreihenfolge im Kurs klar machen: Kursüberblick -> Lohnt sich GenAI? -> Aufgabenklassen -> LLM-Grundlagen -> Umsetzung.
- [x] Alle Navigationsseiten auf dieselbe Bezeichnung für den Kurszuschnitt bringen.

# Prio 2 - Modulstruktur bereinigen

- [x] `M17` und `M18` als freigehaltene Platzhalter in allen Modulübersichten konsistent markieren (M00, README.md).
- [x] `M03_Large_Language_Modell.ipynb` in `M03_Textverarbeitung_mit_LangChain.ipynb` umbenannt; Abschnitts­nummern (1–6), Notebook-Titel und alle Übersichten (README.md, rag-workshop.md) angepasst.
- [x] Alle Hinweise auf entfernte Kursnotebooks (M17, M18) aus den Übersichten entfernt (M00, README.md).
- [x] `M19` und `M20` überall einheitlich als `Praxis-Extra` führen (README.md, M00-Tabelle, Block-Beschreibung: erledigt).
- [x] Prüfen, dass die Modulreihenfolge in `README.md` und `docs/02-orientierung/kursueberblick.md` exakt zusammenpasst (M03-Titel und M17-Platzhalter in kursueberblick.md korrigiert).

# Prio 3 - Begriffskonsistenz schärfen

- [x] In `docs/03-grundlagen/large-language-models.md` die Begriffe `LLM`, `Foundation Model`, `Transformer`, `Token`, `Prompt`, `Kontext` und `Memory` einheitlich verwenden (Memory in Schlüsselbegriffe aufgenommen, Memory-Brücke zu Kontextfenster ergänzt).
- [x] Stellen mit `Wort für Wort` fachlich dort auf `Token für Token` umstellen — keine Treffer gefunden, bereits korrekt.
- [x] Beispiele und Formulierungen so anpassen, dass dieselbe Idee nicht mehrfach unterschiedlich erklärt wird (Self-Attention-Quervereis in „Die Logik eines Transformers" Schritt 3 ergänzt).
- [x] Die Einführung zu LLMs, Foundation Models und Transformer in sich geschlossen halten (Memory-Brücke ergänzt, direkte Ansprache entfernt).

# Prio 4 - Redundanzen reduzieren

- [x] Wiederholte Erklärungen in `docs/03-grundlagen/large-language-models.md` straffen (Datei von ~483 auf 459 Zeilen).
- [x] Den Übergang von LLM -> Foundation Model -> Transformer -> Diffusion klarer und kürzer machen (Intro-Sektionen zusammengeführt).
- [x] In Einsteigerseiten Wiederholungen nur dort behalten, wo sie didaktisch einen echten Mehrwert haben (Logik-Abschnitt auf 5-Punkte-Liste komprimiert; Kurz-gesagt-Duplikat entfernt).
- [x] Überprüfen, ob einzelne Tabellen oder Abschnitte bereits an anderer Stelle ausreichend erklärt werden (ask-nano-Analyse: 18 Stellen geprüft, 5 bereinigt).

# Prio 5 - Format vereinheitlichen

- [x] Alte HTML-Formatierung wie `<font>` abgebaut: tokenizing-chunking.md, ethik-und-genai.md (×2), multimodal-bild.md (×3), langchain-langgraph-cheatsheet.md — alle auf `<p><small>...</small></p>` vereinheitlicht.
- [x] Lose Links in Fließtext eingebettet: multimodal-bild.md (Quelle + 2 Demos als Sätze mit Einleitung formuliert).
- [x] Bild-Alt-Text korrigiert: rag-konzepte.md (war "Raster aus Pixelwerten", jetzt "RAG-Prozess: Indexierung und Retrieval").
- [ ] Tabellen- und Überschriftenstile in `docs` vereinheitlichen, soweit sie die Lesbarkeit verbessern.

# Prio 6 - Schwierigkeitsgrad und Zusatzteile sichtbar halten

- [x] Rollen konsistent: `kursueberblick.md` erhielt neue Spalte „Rolle" (Pflicht/Ergänzend/Aufbau/Optional/Vertiefung/Praxis-Extra/Platzhalter) — aus `README.md` übertragen.
- [x] Schwierigkeitsgrade sichtbar: README war bereits konsistent; kursueberblick.md jetzt ebenfalls mit Rolle-Spalte.
- [x] Zusatzmodule klar erkennbar: M08–M10 als Aufbau, M12–M13 als Optional/Vertiefung, M19–M20 als Praxis-Extra, M17/M18 als Platzhalter.
- [x] Pfadlogik 5-Tage-Kurs: keine separate lernpfade.md vorhanden — Unterscheidung Pflicht/Zusatz über Rolle-Spalte direkt in der Modulübersicht sichtbar.

---

## Arbeitsreihenfolge

1. Prio 1 erledigen.
2. Prio 2 erledigen.
3. Prio 3 erledigen.
4. Prio 4 erledigen.
5. Prio 5 erledigen.
6. Prio 6 erledigen.

---

## Bearbeitungsnotiz

- Diese Liste ist als Arbeitsgrundlage gedacht.
- Wenn ein Punkt erledigt ist, wird er direkt hier abgehakt.
- Wenn sich beim Abarbeiten neue Regeln ergeben, werden sie in den betroffenen Kursdateien nachgezogen.
