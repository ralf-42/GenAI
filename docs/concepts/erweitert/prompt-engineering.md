---
layout: default
title: Prompt Engineering
parent: Erweiterte Techniken
grand_parent: Konzepte
nav_order: 1
description: "Strategien für effektive Prompts in KI-Agenten-Systemen"
has_toc: true
---

# Prompt Engineering
{: .no_toc }

> **Strategien für effektive Prompts in KI-Agenten-Systemen**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Überblick

Ein Prompt ist die Schnittstelle zwischen Mensch und Sprachmodell. Die Qualität der Antwort hängt maßgeblich davon ab, **wie** eine Aufgabe formuliert wird – nicht nur **was** gefragt wird.

Für KI-Agenten ist Prompt Engineering besonders relevant:

| Kontext | Bedeutung |
|---------|-----------|
| **System-Prompts** | Definieren Rolle, Fähigkeiten und Grenzen des Agenten |
| **Tool-Beschreibungen** | Bestimmen, wann und wie ein Agent Werkzeuge einsetzt |
| **Reasoning-Prompts** | Steuern den Denkprozess bei komplexen Aufgaben |
| **Output-Formatierung** | Garantieren strukturierte, verarbeitbare Antworten |

**Kernprinzip:** Ein gut formulierter Prompt reduziert Fehler, verbessert die Konsistenz und macht das Verhalten eines Agenten vorhersagbar.

> [!NOTE] Kernbotschaft<br>
> Prompt-Qualität ist in Agentensystemen ein zentraler Steuerhebel für Zuverlässigkeit und Reproduzierbarkeit.

---

## Grundlegende Prompt-Strukturen

Effektive Prompts folgen einer klaren Struktur. Drei Grundmuster haben sich etabliert.

### Zero-Shot Prompting

Das Modell erhält eine Aufgabe ohne Beispiele und löst sie basierend auf seinem Vorwissen.

```text
Prompt-Struktur: Zero-Shot

System:
- Du bist ein hilfreicher Assistent.

Aufgabe:
- Klassifiziere die folgende E-Mail als "dringend" oder "normal".

Eingabe:
- E-Mail-Text
```

**Geeignet für:**
- Einfache, eindeutige Aufgaben
- Allgemeinwissen-Fragen
- Standardformatierungen

### Few-Shot Prompting

Das Modell erhält Beispiele, die das gewünschte Verhalten demonstrieren.

```text
Prompt-Struktur: Few-Shot

System:
- Klassifiziere E-Mails nach Dringlichkeit.

Beispiel 1:
- Eingabe: Betreff "Server ausgefallen"
- Ausgabe: dringend

Beispiel 2:
- Eingabe: Betreff "Quartalsbericht verfügbar"
- Ausgabe: normal

Neue Aufgabe:
- Eingabe: aktueller E-Mail-Betreff
- Ausgabe: dringend oder normal
```

**Geeignet für:**
- Spezifische Formatvorgaben
- Domänenspezifische Klassifikationen
- Konsistente Ausgabestrukturen

### Chain-of-Thought (CoT)

Das Modell wird angewiesen, seinen Denkprozess schrittweise darzulegen.

> [!WARNING] Sorgfältig einsetzen<br>
> Chain-of-Thought verbessert komplexe Aufgaben oft deutlich, erhöht aber Token-Verbrauch und Latenz. Für einfache Aufgaben ist Zero-/Few-Shot meist effizienter.

```text
Prompt-Struktur: Chain-of-Thought

Aufgabe:
- Löse die folgende Aufgabe Schritt für Schritt.

Arbeitsplan:
1. Bestimme, was gegeben ist.
2. Bestimme, was gesucht wird.
3. Lege die nötigen Schritte fest.
4. Führe die Schritte aus.
5. Formuliere die Antwort.

Eingabe:
- konkrete Aufgabe
```

**Geeignet für:**
- Mathematische Probleme
- Logische Schlussfolgerungen
- Mehrstufige Analysen

---

## System-Prompts für Agenten

Der System-Prompt definiert die Identität und das Verhalten eines Agenten. Er ist der wichtigste Hebel für konsistentes Agentenverhalten.

> [!TIP] Priorisierung im Prompt<br>
> Kritische Regeln zuerst platzieren (Sicherheit, Grenzen, Eskalation), danach Stil und Tonalität.

### Struktur eines effektiven System-Prompts

Ein guter System-Prompt beantwortet vier Fragen:

| Frage | Inhalt |
|-------|--------|
| **Wer?** | Rolle und Expertise des Agenten |
| **Was?** | Aufgabenbereich und Fähigkeiten |
| **Wie?** | Verhaltensregeln und Tonalität |
| **Was nicht?** | Explizite Einschränkungen |

### Beispiel: Vollständiger Agent-System-Prompt

```text
System-Prompt: technischer Support-Agent

ROLLE:
- Experte für die Produkte X, Y und Z
- Erste Anlaufstelle für technische Fragen
- Eskalation an Menschen bei komplexen Fällen

FÄHIGKEITEN:
- Zugriff auf die Wissensdatenbank (Tool: search_knowledge)
- Ticket-Erstellung im Helpdesk (Tool: create_ticket)
- Prüfung des Kundenstatus (Tool: check_customer)

VERHALTENSREGELN:
- Antworte präzise und lösungsorientiert
- Frage nach, wenn Informationen fehlen
- Bestätige Verständnis bei komplexen Problemen
- Verwende technische Begriffe nur mit Erklärung

EINSCHRÄNKUNGEN:
- Keine Preisauskünfte oder Vertragsänderungen
- Keine Zusagen ohne Rücksprache mit dem Vertrieb
- Bei Sicherheitsfragen immer an Security-Team eskalieren
```

### Typische Fehler bei System-Prompts

| Fehler | Problem | Lösung |
|--------|---------|--------|
| Zu vage | Agent verhält sich inkonsistent | Konkrete Beispiele und Regeln |
| Zu lang | Wichtige Anweisungen gehen unter | Priorisieren, strukturieren |
| Widersprüchlich | Agent "halluziniert" Kompromisse | Eindeutige Hierarchie |
| Keine Grenzen | Agent überschreitet Kompetenz | Explizite Einschränkungen |

---

## Tool-Beschreibungen optimieren

Die Beschreibung eines Tools bestimmt, ob und wann ein Agent es korrekt einsetzt. Eine präzise Beschreibung ist entscheidender als der Code dahinter.

### Anatomie einer guten Tool-Beschreibung

```text
Tool: search_knowledge

Zweck:
- Durchsucht die interne Wissensdatenbank nach relevanten Artikeln.

Wann verwenden:
- bei Fragen zu Produktfunktionen
- bei Fehlermeldungen und deren Lösungen
- bei How-To-Anfragen

Wann nicht verwenden:
- bei Fragen zu Preisen oder Verträgen
- bei persönlichen Kundendaten
- wenn die Antwort bereits sicher bekannt ist

Eingaben:
- query: Suchbegriff oder Frage in natürlicher Sprache
- max_results: maximale Anzahl zurückgegebener Artikel

Ausgabe:
- Liste relevanter Wissensartikel mit Titel und Zusammenfassung
```

### Checkliste für Tool-Beschreibungen

> [!SUCCESS] Qualitätskriterium<br>
> Wenn ein Tool klar beschreibt, wann es verwendet werden soll und wann nicht, sinken Fehlaufrufe und Halluzinationen deutlich.

- [ ] **Zweck klar benannt** – Was macht das Tool?
- [ ] **Anwendungsfälle** – Wann soll es verwendet werden?
- [ ] **Gegenanzeigen** – Wann soll es NICHT verwendet werden?
- [ ] **Parameter erklärt** – Was bedeuten die Eingaben?
- [ ] **Rückgabewert beschrieben** – Was kommt zurück?

---

## Ausgabeformatierung

Strukturierte Ausgaben machen Agentenantworten verarbeitbar und konsistent.

### Explizite Formatvorgaben

```text
Prompt-Struktur: explizite Formatvorgabe

Aufgabe:
- Analysiere den folgenden Text und extrahiere die Kernaussagen.

Eingabe:
- Text

Antwortformat:
HAUPTTHEMA: [Ein Satz]
KERNAUSSAGEN:
- [Punkt 1]
- [Punkt 2]
- [Punkt 3]
STIMMUNG: [positiv/neutral/negativ]
KONFIDENZ: [hoch/mittel/niedrig]
```

### Strukturierte Ausgaben mit Pydantic

Für maschinelle Weiterverarbeitung bietet LangChain typsichere Ausgaben:

> [!TIP] Für Produktion bevorzugen<br>
> Bei Weiterverarbeitung durch Code sind strukturierte Ausgaben mit Schema-Validierung robuster als freie Textantworten.

```text
Schema: Analyse (Pydantic)

Felder:
- hauptthema: zentrales Thema in einem Satz
- kernaussagen: Liste der wichtigsten Punkte
- stimmung: positiv, neutral oder negativ
- konfidenz: Sicherheit der Analyse zwischen 0.0 und 1.0

Ablauf:
1. Das Modell erhält das Schema als erwartete Ausgabeform.
2. Das Modell analysiert den Text.
3. Die Antwort wird gegen das Schema geprüft.
4. Die Anwendung kann gezielt auf Felder wie hauptthema oder konfidenz zugreifen.
```

---

## Fortgeschrittene Strategien

### Role-Prompting

Die Zuweisung einer spezifischen Rolle verbessert domänenspezifische Antworten.

```text
Prompt-Struktur: Role-Prompting

Rollenbibliothek:
- jurist: erfahrener Rechtsanwalt mit Spezialisierung auf IT-Recht
- mediziner: Facharzt für Innere Medizin mit langjähriger Erfahrung
- entwickler: Senior Software Engineer mit Erfahrung in Python und Cloud-Architekturen

Ablauf:
1. Wähle die passende Rolle zur Aufgabe.
2. Setze diese Rolle als System-Anweisung.
3. Stelle die konkrete Frage als Nutzereingabe.
```

### Self-Consistency

Mehrere Antworten generieren und die häufigste oder konsistenteste wählen.

```text
Strategie: Self-Consistency

Eingaben:
- question: zu beantwortende Frage
- n: Anzahl unabhängiger Antwortversuche

Ablauf:
1. Generiere n Antworten zur gleichen Frage.
2. Vergleiche die Antworten.
3. Bestimme die häufigste, stabilste oder am besten begründete Antwort.
4. Gib diese aggregierte Antwort zurück.
```

### Retrieval-Augmented Prompting

Kontext aus externen Quellen in den Prompt integrieren:

```text
Prompt-Struktur: Retrieval-Augmented Prompting

Anweisung:
- Beantworte die Frage nur auf Basis des bereitgestellten Kontexts.
- Wenn die Antwort nicht im Kontext steht, sage das ausdrücklich.

Eingaben:
- Kontext aus Retrieval
- Frage der Nutzerin oder des Nutzers

Ausgabe:
- Antwort mit Bezug auf den Kontext
```

---

## Best Practices

### Die CLEAR-Methode

| Buchstabe | Prinzip | Umsetzung |
|-----------|---------|-----------|
| **C** | Concise | Präzise formulieren, Füllwörter vermeiden |
| **L** | Logical | Logische Struktur, klare Reihenfolge |
| **E** | Explicit | Erwartungen explizit benennen |
| **A** | Adaptive | An Aufgabe und Modell anpassen |
| **R** | Reproducible | Konsistente Ergebnisse ermöglichen |

### Iteratives Prompt-Design

```mermaid
flowchart LR
    A[Erster Entwurf] --> B[Testen]
    B --> C{Ergebnis OK?}
    C -->|Nein| D[Analysieren]
    D --> E[Anpassen]
    E --> B
    C -->|Ja| F[Dokumentieren]
```

**Empfohlener Workflow:**

1. **Baseline erstellen** – Einfachster funktionierender Prompt
2. **Schwachstellen identifizieren** – Wo versagt der Prompt?
3. **Gezielt verbessern** – Eine Änderung pro Iteration
4. **Testen mit Varianten** – Verschiedene Eingaben prüfen
5. **Dokumentieren** – Warum funktioniert diese Version?

### Prompt-Versionierung

```text
Prompt-Versionierung:

Version classify_email_v1:
- Klassifiziere eine E-Mail als dringend oder normal.

Version classify_email_v2:
- Klassifiziere eine E-Mail nach expliziten Kriterien.
- dringend: Systemausfälle, Sicherheitsprobleme, Deadlines unter 24 Stunden
- normal: alle anderen Anfragen

Produktion:
- Aktive Prompt-Version dokumentieren
- Änderungen nachvollziehbar versionieren
- Testergebnisse pro Version festhalten
```

---

## Häufige Fehler und Lösungen

> [!WARNING] Häufigster Praxisfehler<br>
> Ambige Anweisungen sind eine Hauptursache für instabile Ergebnisse. Erst Präzision im Prompt, dann Modellwechsel.

### Fehler: Ambige Anweisungen

**Problem:**
```text
Vage und mehrdeutig:

Aufgabe:
- Fasse das zusammen.

Eingabe:
- Text
```

**Lösung:**
```text
Präzise und eindeutig:

Aufgabe:
- Erstelle eine Zusammenfassung in 3 Stichpunkten.

Regeln:
- Jeder Punkt maximal 15 Wörter.
- Fokus auf Handlungsempfehlungen.

Eingabe:
- Text
```

### Fehler: Fehlende Beispiele bei komplexen Formaten

**Problem:**
```text
Erwartet ein spezifisches Format ohne Beispiel:

Aufgabe:
- Extrahiere Entitäten aus dem Text.

Eingabe:
- Text
```

**Lösung:**
```text
Mit Beispiel (Few-Shot):

Aufgabe:
- Extrahiere Entitäten im Format: ENTITÄT (TYP)

Beispiel:
- Text: "Angela Merkel besuchte gestern Berlin."
- Entitäten: Angela Merkel (PERSON), Berlin (ORT), gestern (ZEIT)

Neue Eingabe:
- Text
```

### Fehler: Widersprüchliche Anweisungen

**Problem:**
```text
Widersprüchlich:

Aufgabe:
- Erkläre das Thema kurz und detailliert.

Problem:
- "kurz" und "detailliert" sind ohne Priorisierung schwer gleichzeitig erfüllbar.
```

**Lösung:**
```text
Klare Priorisierung:

Aufgabe:
- Erkläre das Thema in zwei getrennten Teilen.

Struktur:
1. Kurzfassung: 1-2 Sätze mit der Kernaussage
2. Details: 3-5 Sätze mit wichtigen Aspekten

Eingabe:
- Thema
```

---

## Zusammenfassung

Effektives Prompt Engineering basiert auf drei Säulen:

| Säule | Kernaspekt |
|-------|------------|
| **Klarheit** | Eindeutige, strukturierte Anweisungen |
| **Kontext** | Relevante Informationen und Beispiele |
| **Kontrolle** | Explizite Formatvorgaben und Grenzen |

**Für KI-Agenten besonders wichtig:**

- **System-Prompts** definieren das Gesamtverhalten
- **Tool-Beschreibungen** steuern die Werkzeugnutzung
- **Strukturierte Ausgaben** ermöglichen Weiterverarbeitung
- **Iteratives Testen** führt zu robusten Prompts

Im weiteren Kursverlauf werden diese Strategien praktisch in LangChain-Agents angewendet.


---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Context Engineering](./m21-context-engineering.html) | Wie wird aus einzelnen Prompts ein belastbarer Gesamtkontext? |
| [RAG-Konzepte](./rag-konzepte.html) | Wann reicht bessere Promptformulierung nicht mehr ohne Retrieval? |
| [Fine-Tuning](./m18-fine-tuning.html) | Wann stößt Prompting an Grenzen, die Training besser löst? |

---

**Version:**    1.0<br>
**Stand:**    November 2025<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
