---
layout: default
title: Context Engineering
parent: Konzepte
nav_order: 18
description: "Context Management: Optimierung von Context-Fenstern und Memory-Strategien"
has_toc: true
---

# Context Engineering
{: .no_toc }

> **Context Management: Optimierung von Context-Fenstern und Memory-Strategien**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---


# 1 Was ist Context Engineering?



**Context Engineering** ist die **Kunst, KI-Systemen die richtigen Informationen zur richtigen Zeit zu geben**. Stellen Sie sich vor, Sie sind ein Berater, der einem Kunden hilft - Sie brauchen alle relevanten Informationen über den Kunden, seine Situation und seine Bedürfnisse, um eine gute Beratung zu geben.

## 1.1 Der Unterschied zu Prompt Engineering

| Aspekt                 | Prompt Engineering                                                                     | Context Engineering                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Definition**         | Kunst der Formulierung optimaler Eingabeaufforderungen <br>für KI-Modelle              | Systematisches Design und Management des gesamten <br>Kontexts für KI-Systeme                          |
| **Fokus**              | Einzelne Prompt-Optimierung                                                            | Gesamtes Kontextmanagement und -architektur                                                            |
| **Zeitrahmen**         | Kurzfristig, pro Anfrage                                                               | Langfristig, systemweit                                                                                |
| **Zielgruppe**         | Endnutzer, Content-Ersteller                                                           | Entwickler, Systemarchitekten                                                                          |
| **Hauptziel**          | Bessere Antworten durch optimierte Prompts                                             | Konsistente, kontextbewusste KI-Systeme                                                                |
| **Techniken**          | - Few-Shot Learning  <br>- Chain-of-Thought  <br>- Role-Playing  <br>- Template-Design | - RAG (Retrieval-Augmented Generation)  <br>- Vektorsuche  <br>- Wissensgraphen  <br>- Kontext-Caching |
| **Eingabeformat**      | Textuelle Anweisungen und Beispiele                                                    | Strukturierte Daten, Dokumente, Metadaten                                                              |
| **Skalierbarkeit**     | Begrenzt auf einzelne Interaktionen                                                    | Hochskalierbar für Enterprise-Anwendungen                                                              |
| **Wartung**            | Manuelle Anpassung der Prompts                                                         | Automatisiertes Kontext-Management                                                                     |
| **Fehlerbehandlung**   | Trial-and-Error bei Prompts                                                            | Systematische Kontext-Validierung                                                                      |
| **Messbarkeit**        | Qualitative Bewertung der Antworten                                                    | Quantitative Metriken (Relevanz, Genauigkeit)                                                          |
| **Kosten**             | Niedrig (nur Prompt-Optimierung)                                                       | Höher (Infrastruktur, Datenmanagement)                                                                 |
| **Anwendungsbereich**  | - Chatbots  <br>- Content-Generierung  <br>- Übersetzungen  <br>- Kreative Aufgaben    | - Wissensmanagementsysteme  <br>- Dokumentensuche  <br>- Expertensysteme  <br>- Enterprise-KI          |
| **Herausforderungen**  | - Prompt-Injection  <br>- Inkonsistente Ergebnisse<br>- Begrenzte Kontextlänge         | - Datenqualität  <br>- Kontext-Fragmentierung  <br>- Skalierungskosten                                 |
| **Erfolgsfaktoren**    | - Klare Anweisungen  <br>- Gute Beispiele  <br>- Strukturierte Prompts                 | - Hochwertige Datenquellen  <br>- Effiziente Suche  <br>- Kontext-Relevanz                             |
| **Tools & Frameworks** | - OpenAI Playground  <br>- LangChain PromptTemplates  <br>- Anthropic Console          | - LangChain  <br>- LlamaIndex  <br>- Pinecone  <br>- Weaviate                                          |
| **Zukunftstrend**      | Integration in größere Systeme                                                         | Weiterentwicklung zu autonomen Agenten                                                                 |
| **Best Practices**     | - Iterative Verbesserung  <br>- A/B-Testing  <br>- Klare Rollenverteilung              | - Datengovernance  <br>- Monitoring & Logging  <br>- Kontext-Versionierung                             |

## 1.2 Fazit

**Prompt Engineering** ist ideal für schnelle, einzelne Optimierungen und kreative Anwendungen, während **Context Engineering** für robuste, skalierbare KI-Systeme in Unternehmen unerlässlich ist. Moderne KI-Anwendungen profitieren von der Kombination beider Ansätze.

## 1.3 Warum ist das wichtig?

- **85% aller KI-Fehler** entstehen durch fehlende oder falsche Kontextinformationen
- Ihr Prompt macht nur **0,1%** des gesamten Kontexts aus, den die KI verarbeitet
- **38% bessere Ergebnisse** durch gutes Context Engineering




# 2 Die vier Grundstrategien



## 2.1 Kontext Auswählen(Context Selection)
Die richtigen Informationen zur richtigen Zeit bereitstellen.

**Beispiel - Versicherungsberatung:**
```
Kundenkontext:
- Alter: 35 Jahre
- Familie: 2 Kinder
- Beruf: Selbständig
- Ziel: Familienabsicherung

→ KI wählt passende Produktinformationen aus
```

## 2.2 Kontext Komprimieren (Context Compression)
Nur die wichtigsten Informationen behalten.

**Beispiel:**
```
Lange Schadenshistorie (50 Seiten)
↓
Zusammenfassung: "3 Kleinschäden in 5 Jahren, 
Gesamtschaden: 2.500€, keine Muster erkennbar"
```

## 2.3 Kontext Speichern (Context Memory)
Wichtige Informationen für später aufbewahren.

**Beispiel:**
```
Kundeninteraktion 1: "Ich bevorzuge niedrige Beiträge"
↓ (gespeichert)
Kundeninteraktion 2: KI erinnert sich an Präferenz
```

## 2.4 Kontext Trennen (Context Isolation)
Verschiedene Aufgaben mit separaten Kontexten bearbeiten.

**Beispiel:**
```
Agent A: Schadensprüfung (hat Zugang zu Schadensdaten)
Agent B: Kundenberatung (hat Zugang zu Produktdaten)
```




# 3 Die drei häufigsten Fehler



## 3.1 Context Overload
**Problem:** Zu viele Informationen verwirren die KI
**Lösung:** Nur relevante Informationen bereitstellen

## 3.2 Context Conflict
**Problem:** Widersprüchliche Informationen
**Lösung:** Informationen auf Konsistenz prüfen

## 3.3 Context Staleness
**Problem:** Veraltete Informationen
**Lösung:** Regelmäßige Updates implementieren




# 4 Praktische Anwendung

## 4.1 Kontext analysieren

```
Frage: "Welche Versicherung brauche ich?"

Benötigte Kontextinformationen (nach Priorität):
✓ KRITISCH:
  - Alter: 32 Jahre
  - Familienstand: verheiratet, 2 Kinder (3, 7 Jahre)
  - Beruf: Software-Entwickler
  - Einkommen: 65.000€ brutto/Jahr

✓ WICHTIG:
  - Bestehende Absicherungen: KFZ-Haftpflicht, Hausratversicherung
  - Immobilienstatus: Eigenheim (Restschuld 180.000€)
  - Gesundheitsstatus: keine Vorerkrankungen

✓ ERGÄNZEND:
  - Risikobereitschaft: konservativ
  - Finanzielle Ziele: Familienabsicherung, Altersvorsorge
  - Verfügbares Budget: 200€/Monat für Versicherungen
```

## 4.2 Kontext strukturieren

```
PROMPT-STRUKTUR:

=== KUNDENKONTEXT ===
Demografisch:
- Person: 32 Jahre, männlich, verheiratet
- Familie: 2 Kinder (3, 7 Jahre), Hausfrau-Ehefrau
- Wohnort: Eigenheim, Restschuld 180.000€

Finanziell:
- Einkommen: 65.000€ brutto/Jahr (alleinverdienend)
- Budget Versicherungen: 200€/Monat
- Risikobereitschaft: konservativ

=== PRODUKTKONTEXT ===
Bestehende Absicherung:
- KFZ-Haftpflicht: vollständig
- Hausratversicherung: 50.000€ Versicherungssumme
- Keine weitere Absicherung vorhanden

Relevante Produktkategorien:
- Risikolebensversicherung (Familienabsicherung)
- Berufsunfähigkeitsversicherung (Einkommensschutz)
- Private Unfallversicherung
- Rechtsschutzversicherung

=== BERATUNGSKONTEXT ===
Anfrage: "Welche Versicherung brauche ich?"
Beratungsziel: Bedarfsanalyse und Produktempfehlung
Compliance: Versicherungsberatung nach §34d GewO
```

## 4.3 Kontext optimieren

```
OPTIMIERUNGSREGELN für KI-Verarbeitung:

1. TOKEN-EFFIZIENZ (Max. 500 Token für Kontext):
   ❌ "Der Kunde ist 32 Jahre alt und arbeitet als Software-Entwickler..."
   ✅ "Kunde: 32J, Software-Dev, 65k€, verheiratet, 2 Kinder"

2. RELEVANZ-FILTERING:
   Für Versicherungsberatung IMMER relevant:
   - Alter, Familienstand, Beruf, Einkommen
   - Bestehende Policen
   - Gesundheitsstatus (wenn abgefragt)
   
   SITUATIV relevant:
   - Hobbys (nur bei Unfallversicherung)
   - Immobilien (nur bei Sachversicherungen)

3. STRUKTURIERUNG für LLM:
```

AUFTRAG: Versicherungsbedarfsanalyse KUNDE: 32J, Soft-Dev, 65k€, verheiratet, 2Ki(3,7J), Eigenheim(180k€ Schuld) BESTAND: KFZ-Haft, Hausrat(50k€) BUDGET: 200€/Monat PRÄFERENZ: konservativ ZIEL: Familien-/Einkommensabsicherung

AUFGABE: Identifiziere Versicherungslücken und empfehle passende Produkte mit Begründung.

## 4.4 Konsistenz-Checkliste:

```
- [ ] Gleiche Kategorien in allen Abschnitten verwendet
- [ ] Konkrete Beispiele statt Platzhalter
- [ ] Token-Limits definiert und eingehalten  
- [ ] Relevanz-Kriterien spezifiziert
- [ ] Optimierung messbar (Token-Reduktion, Strukturierung)
```

# 5 Einfache Tools und Techniken


## 5.1 Tool 1: Context-Checkliste
```
☐ Sind alle notwendigen Informationen vorhanden?
☐ Sind die Informationen aktuell?
☐ Gibt es Widersprüche?
☐ Ist der Kontext nicht zu lang?
☐ Ist der Kontext relevant für die Aufgabe?
```

## 5.2 Tool 2: Kontext-Templates
```
**Kundenberatung-Template:**
KUNDE: [Name, Alter, Beruf]
SITUATION: [Aktuelle Lebensumstände]
ZIEL: [Was möchte der Kunde erreichen?]
BUDGET: [Verfügbare Mittel]
PRÄFERENZEN: [Besondere Wünsche]
```

## 5.3 Tool 3: Einfache Kontextregeln
```
1. Immer aktuellste Daten verwenden
2. Maximal 3 Hauptinformationen pro Kontext
3. Widersprüche sofort klären
4. Kundenspezifische Informationen priorisieren
5. Rechtliche Anforderungen immer beachten
```




# 6 Messbare Verbesserungen



## 6.1 Vorher vs. Nachher

**Ohne Context Engineering:**
- ❌ 45% Fehlerrate bei Empfehlungen
- ❌ 3+ Nachfragen pro Beratung
- ❌ 15 Min. Bearbeitungszeit

**Mit Context Engineering:**
- ✅ 12% Fehlerrate bei Empfehlungen
- ✅ 1 Nachfrage pro Beratung
- ✅ 8 Min. Bearbeitungszeit

## 6.2 Erfolgs-Metriken
```
Genauigkeit: +65%
Effizienz: +47%
Kundenzufriedenheit: +30%
```





# 7 Sofort umsetzbare Tipps



## 7.1 Do's
- Beginnen Sie mit einfachen Context-Checklisten
- Sammeln Sie systematisch Feedback
- Dokumentieren Sie erfolgreiche Kontextmuster
- Starten Sie mit Ihren häufigsten Anwendungsfällen
- Messen Sie Verbesserungen kontinuierlich

## 7.2 Don'ts
- Nicht zu kompliziert beginnen
- Nicht alle Kontextquellen auf einmal ändern
- Nicht ohne Messungen optimieren
- Nicht vergessen, das Team zu schulen
- Nicht auf Feedback verzichten

---

# 8 Nächste Schritte


## 8.1 Stufe 1: Grundlagen (Sie sind hier!)
- Context Engineering verstehen
- Erste Tools anwenden
- Einfache Verbesserungen umsetzen

## 8.2 Stufe 2: Fortgeschrittene Techniken
- Automatisierte Kontextauswahl
- KI-gestützte Kontextoptimierung
- Multi-Agenten-Systeme

## 8.3 Stufe 3: Expertenlevel
- Eigene Context-Engineering-Frameworks
- Komplexe Gedächtnissysteme
- Unternehmensweite Implementierung



> [!NOTE]
> Context Engineering ist eine erlernbare Fähigkeit, die sofort bessere KI-Ergebnisse liefert. Beginnen Sie heute mit einfachen Techniken und bauen Sie schrittweise Expertise auf!


# 9 Aufgabe


## 9.1 Aufgabe 1: Kontext-Analyse
**Aufgabe:** Analysieren Sie eine typische Kundenanfrage in Ihrem Bereich.

**Beispiel:**
```
Kundenanfrage: "Ich suche eine günstige Hausratversicherung"

Fehlende Kontextinformationen:
- Wohnort und Wohnungsgröße?
- Wert der Einrichtung?
- Besondere Risiken?
- Bisherige Schäden?
- Definition von "günstig"?
```

## 9.2 Aufgabe 2: Kontext-Design
**Aufgabe:** Erstellen Sie ein Kontext-Template für Ihre häufigste Aufgabe.

**Vorlage:**
```
AUFGABE: [Beschreibung]

BENÖTIGTE INFORMATIONEN:
1. [Primäre Info]
2. [Sekundäre Info]
3. [Ergänzende Info]

AUSSCHLUSSKRITERIEN:
- [Was nicht relevant ist]

QUALITÄTSKRITERIEN:
- [Wann ist der Kontext gut?]
```

## 9.3 Aufgabe 3: Fehler-Identifikation
**Aufgabe:** Identifizieren Sie typische Kontextfehler in Ihrem Arbeitsbereich.

**Häufige Fehler:**
```
□ Veraltete Produktinformationen
□ Fehlende Kundenpräferenzen
□ Unvollständige Risikobewertung
□ Ignorierte Ausschlusskriterien
□ Widersprüchliche Datenquellen
```


---
 
**Version:** 1.0     
**Stand:** November 2025    
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.    
