---
layout: default
title: Lohnt sich GenAI?
parent: Orientierung & Strategie
grand_parent: Konzepte
nav_order: 1
description: "Einschätzung vor Projektstart: ob ein GenAI-Vorhaben sinnvoll, machbar und verantwortbar ist"
has_toc: true
---

# Lohnt sich GenAI?
{: .no_toc }

> **Vor dem Modellaufruf steht die Frage, ob GenAI für das Problem überhaupt die richtige Lösung ist.**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Warum diese Frage vor der Toolwahl kommt

Viele GenAI-Projekte springen zu früh in Modelle, Prompts, Vektordatenbanken oder Frameworks. Das ist verständlich, aber oft zu früh. Zuerst muss geklärt werden, ob ein GenAI-System hier überhaupt sinnvoll, machbar und verantwortbar ist. Erst danach stellt sich die Frage nach dem richtigen Lösungsweg.

Diese Seite bewertet deshalb nicht, ob LangChain, RAG, Fine-Tuning oder ein Agent Builder gewählt werden sollte. Sie prüft eine Ebene davor: Ist das Vorhaben tragfähig genug, um diese Entscheidungen überhaupt zu rechtfertigen?

Typischer Fehler: `Wir wollen GenAI einsetzen` als Problemformulierung zu behandeln. Das ist noch kein Projektziel, sondern höchstens eine Lösungsrichtung.

## Problemklärung zuerst

Ein GenAI-Projekt kann nur dann sinnvoll bewertet werden, wenn das zugrunde liegende Problem klar formuliert ist. Gefragt werden muss, was konkret verbessert, beschleunigt oder automatisiert werden soll, wie der heutige Ablauf aussieht und woran später Erfolg erkannt wird.

Wenn ein Problem nicht präzise beschrieben werden kann, ist meist auch keine tragfähige Evaluation möglich. Genau dort kippt ein Projekt schnell in ein offenes Experiment. Das kann sinnvoll sein, braucht aber einen anderen Rahmen als ein produktives Vorhaben.

Warnsignale sind ein unklar formuliertes Ziel, fehlende Erfolgskriterien oder Sätze wie `Wir wollen mal sehen, was mit KI geht`.

## Wann GenAI naheliegt

GenAI wird **plausibel**, wenn Sprache, Bilder, Code, Dokumente oder andere unstrukturierte Inhalte eine zentrale Rolle spielen. Typische Aufgaben sind Zusammenfassen, Umformulieren, Extrahieren, Klassifizieren mit unscharfen Kriterien, Dialogführung, Wissensarbeit oder das Erzeugen strukturierter Vorschläge aus uneinheitlichem Input.

Der Nutzen entsteht besonders dort, wo starre Regeln zu spröde wären und klassische Suche zu wenig Kontext versteht. Wenn viele Varianten einer Aufgabe auftreten, aber ein menschlicher Bearbeiter trotzdem anhand von Mustern entscheiden kann, ist GenAI oft ein realistischer Kandidat.

| Aufgabe                            | Warum GenAI passen kann                                 |
| ---------------------------------- | ------------------------------------------------------- |
| Dokumente zusammenfassen           | Sprache und Kontext stehen im Mittelpunkt               |
| Supportanfragen vorstrukturieren   | Eingaben sind variabel, Zielstruktur ist bekannt        |
| Wissenssuche über eigene Dokumente | Retrieval kann relevante Quellen in Antworten einbetten |
| Texte oder Codeentwürfe erzeugen   | Kreative oder halbstrukturierte Ausgabe ist erwünscht   |
|                                    |                                                         |

## Wann GenAI nicht die erste Wahl ist

Nicht jede Automatisierung braucht GenAI. Wenn Regeln klar sind, Daten sauber strukturiert vorliegen und deterministische Ergebnisse erwartet werden, ist klassischer Code oft robuster, günstiger und leichter zu prüfen. Auch bei sehr kleinen Datenmengen, rechtlich gesperrten Informationen oder Aufgaben mit Null-Fehler-Toleranz ist Vorsicht geboten.

GenAI ist ebenfalls schwach, wenn die Qualität nicht überprüfbar ist. Ein System, dessen Antworten plausibel klingen, aber nicht messbar bewertet werden können, erzeugt schnell Vertrauen ohne Kontrolle.

| Warnsignal | Konsequenz |
|---|---|
| klare Wenn-dann-Regeln reichen aus | klassischer Code ist meist besser |
| strukturierte Datenbankabfrage genügt | SQL oder BI-Logik ist oft transparenter |
| keine Testfälle verfügbar | Qualität bleibt Bauchgefühl |
| sensible Daten dürfen nicht verarbeitet werden | Architektur oder Anbieterwahl kann blockiert sein |

## Datenlage entscheidet mit

GenAI-Systeme arbeiten nie im luftleeren Raum. Sie brauchen Prompts, Beispiele, Dokumente, Testfälle, Referenzantworten oder Nutzerfeedback. Entscheidend ist nicht nur, ob solche Daten grundsätzlich existieren, sondern ob sie zugänglich, aktuell, konsistent und rechtlich nutzbar sind.

Für RAG-Projekte müssen Dokumente nicht perfekt sein, aber sie müssen so vorliegen, dass Chunking, Embeddings und Quellenangaben sinnvoll möglich sind. Für Evaluation braucht es zumindest eine kleine Sammlung realistischer Fälle. Für Fine-Tuning braucht es deutlich mehr: saubere Trainingsdaten, klare Zielausgaben und belastbare Vergleichsmessung.

Grenze: Ein stärkeres Modell kompensiert keine unklare Datengrundlage. Es verschiebt das Problem nur in teurere und schwerer erklärbare Antworten.

## Nutzen, Kosten und Betrieb

Ein Vorhaben lohnt sich nicht, weil GenAI modern wirkt, sondern weil ein **messbarer Mehrwert** entsteht. Typische Nutzenformen sind Zeitersparnis, bessere Skalierung, Qualitätsverbesserung, konsistentere Vorarbeit oder Fähigkeiten, die ohne Sprachmodell vorher kaum erreichbar waren.

Dem stehen Kosten gegenüber: Modellnutzung, Entwicklung, Integration, Datenaufbereitung, Evaluation, Monitoring und späterer Betrieb. Die API-Kosten sind dabei nur ein Teil. Häufiger werden Pflege, Fehleranalyse und Qualitätssicherung unterschätzt.

In der Praxis relevant, wenn: Ein Prototyp zwar schnell entsteht, aber noch niemand geklärt hat, wer die Qualität prüft, wer Prompts pflegt, wer Kosten überwacht und wer bei Fehlern verantwortlich ist.

## Risiken realistisch einordnen

Ein sinnvolles GenAI-Projekt braucht nicht nur eine Nutzenperspektive, sondern auch ein realistisches Risikobild. Technische Risiken sind Halluzinationen, Quellenfehler, Datenlecks, Prompt Injection, hohe Latenz oder Kostenexplosion bei schlecht begrenzten Abläufen. Organisatorische Risiken entstehen durch überhöhte Erwartungen, fehlende Akzeptanz oder unklare Verantwortung.

Hinzu kommen regulatorische Fragen. In sensiblen Bereichen wie HR, Gesundheit, Bildung, Finanzen oder Verwaltung können Transparenz, Datenschutz, menschliche Aufsicht und Dokumentation nicht nachträglich improvisiert werden.

| Risikotyp | Typisches Beispiel |
|---|---|
| technisch | plausible, aber falsche Antwort |
| organisatorisch | Stakeholder erwarten Fehlerfreiheit |
| rechtlich | personenbezogene Daten im Prompt oder in Logs |
| betrieblich | keine Zuständigkeit für Monitoring und Updates |

## Eine *einfache* Go- oder No-Go-Logik

Wenn Problem, Daten, Nutzen, Risiken und Betrieb halbwegs klar sind, lässt sich eine erste Einschätzung treffen. Ein Projekt wirkt tragfähig, wenn das Ziel konkret ist, Daten verfügbar sind, der Mehrwert gegenüber einfacheren Lösungen erkennbar bleibt und zentrale Risiken planbar sind.

Umgekehrt ist Vorsicht geboten, wenn die Fragestellung unscharf bleibt, keine sinnvolle Evaluation möglich ist, keine brauchbare Datengrundlage existiert oder der Nutzen nur vage behauptet wird.

```text
Kurzcheck:
- Ist das Problem klar formuliert?
- Spielt unstrukturierter Inhalt eine zentrale Rolle?
- Gibt es brauchbare Daten, Beispiele oder Testfälle?
- Entsteht ein messbarer Mehrwert gegenüber einfacheren Lösungen?
- Sind Risiken, Kosten, Betrieb und Verantwortung realistisch eingeordnet?
```

## Was für Entwickler zuerst wichtig ist

Für Entwickler reicht oft schon eine nüchterne Vorprüfung. Wenn ein Projekt nur auf Begeisterung für GenAI basiert, aber weder Problem noch Daten noch Erfolgskriterien sauber benannt werden können, ist der richtige nächste Schritt nicht Prompt Engineering, sondern Problemklärung.

**Ein gutes No-Go ist kein Scheitern**. Es spart Zeit, schützt vor falschen Erwartungen und verhindert, dass ein schneller Prototyp mit einem belastbaren System verwechselt wird.

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Aufgabenklassen & Lösungswege](./aufgabenklassen-und-loesungswege.html) | Welcher Lösungsweg passt, wenn GenAI grundsätzlich sinnvoll erscheint? |
| [Modellauswahl](../entscheidungen-qualitaet/m19-modellauswahl.html) | Welches Modell passt zu Qualität, Kosten, Latenz und Modalität? |
| [RAG-Konzepte](../anwendungsmethoden/rag-konzepte.html) | Wann hilft externer Wissenszugriff über eigene Dokumente? |
| [Evaluation & Observability](../entscheidungen-qualitaet/evaluation-observability.html) | Wie wird Qualität eines späteren Systems belastbar gemessen? |
| [EU AI Act](../../regulatorisches/eu-ai-act.html) | Welche regulatorischen Anforderungen können ein Vorhaben prägen? |
| [Digitale Souveränität](../../regulatorisches/digitale-souveraenitaet.html) | Welche Abhängigkeiten entstehen durch Modell- und Infrastrukturwahl? |

---

**Version:** 1.0<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
