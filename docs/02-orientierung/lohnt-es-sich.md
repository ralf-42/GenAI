---
layout: default
title: Lohnt sich GenAI?
parent: Orientierung
nav_order: 1
description: "Einschätzung vor Projektstart: ob ein GenAI-Vorhaben sinnvoll, machbar und verantwortbar ist"
has_toc: true
---

# Lohnt sich GenAI?
{: .no_toc }

> **Bevor ein Modell angefragt wird, steht zuerst die Frage im Raum: Ist GenAI für dieses Problem überhaupt die richtige Lösung?**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Warum diese Frage vor der Toolwahl kommt

Viele starten zu früh: mit Modellen, Prompts, Vektordatenbanken oder Frameworks. Das ist verständlich, aber oft die falsche Reihenfolge. Bevor man über konkrete Technik entscheidet, sollte man zuerst prüfen, ob ein GenAI-System für das eigentliche Problem überhaupt sinnvoll, umsetzbar und verantwortbar ist. Erst danach ergibt die Tool- oder Methodenwahl überhaupt Sinn.

Genau deshalb bewertet diese Seite nicht, ob LangChain, RAG, Fine-Tuning oder ein Agent Builder gewählt werden sollte. Sie setzt davor an: Lässt sich das Vorhaben so begründen, dass diese Entscheidungen später gerechtfertigt sind?

Typischer Fehler: `Wir wollen GenAI einsetzen` als Projektziel behandeln. Das ist höchstens eine Idee, aber noch kein klarer Nutzen für ein konkretes Problem.

## Problemklärung zuerst

GenAI lässt sich nur sinnvoll einschätzen, wenn das zugrunde liegende Problem klar beschrieben ist. Konkret heißt das: Was soll sich verbessern, beschleunigen oder automatisieren lassen? Wie läuft der heutige Ablauf? Und woran erkennt man später, dass das Ergebnis wirklich besser ist?

Wenn sich ein Problem nicht sauber formulieren lässt, wird es meist auch schwer, Qualität oder Erfolg belastbar zu evaluieren. An dieser Stelle rutschen Projekte schnell in ein offenes Experiment. Das kann durchaus sinnvoll sein – dann braucht es aber einen anderen Rahmen als ein produktives Vorhaben.

Warnsignale sind zum Beispiel ein unklar formuliertes Ziel, fehlende Erfolgskriterien oder Formulierungen wie `Wir wollen mal sehen, was mit KI geht`.

## Wann GenAI naheliegt

GenAI wirkt besonders dann passend, wenn Sprache, Bilder, Code, Dokumente oder andere unstrukturierte Inhalte im Mittelpunkt stehen. Typische Aufgaben sind Zusammenfassen, Umformulieren, Extrahieren, Klassifizieren mit Kriterien, die nicht ganz scharf abgrenzbar sind, Dialogführung, Wissensarbeit oder das Erzeugen strukturierter Vorschläge aus uneinheitlichem Input.

Der Nutzen entsteht vor allem dort, wo starre Regeln schnell zu kurz greifen – oder klassische Suche den nötigen Kontext nicht mitliefert. Wenn es viele Varianten gibt, ein menschlicher Bearbeiter aber trotzdem anhand von Mustern entscheiden kann, ist GenAI häufig ein realistischer Kandidat.

| Aufgabe                            | Warum GenAI passen kann                                 |
| ---------------------------------- | ------------------------------------------------------- |
| Dokumente zusammenfassen           | Sprache und Kontext stehen im Mittelpunkt               |
| Supportanfragen vorstrukturieren   | Eingaben sind variabel, Zielstruktur ist bekannt        |
| Wissenssuche über eigene Dokumente | Retrieval kann relevante Quellen in Antworten einbetten |
| Texte oder Codeentwürfe erzeugen   | Kreative oder halbstrukturierte Ausgabe ist erwünscht   |
|                                    |                                                         |

## Wann GenAI nicht die erste Wahl ist

Nicht jede Automatisierung braucht GenAI. Wenn Regeln klar sind, Daten sauber strukturiert vorliegen und deterministische Ergebnisse erwartet werden, ist klassischer Code oft robuster, günstiger und einfacher zu prüfen. Auch bei sehr kleinen Datenmengen oder wenn Informationen rechtlich gesperrt sind, sollte man genauer hinschauen. Gleiches gilt, wenn Fehlertoleranz faktisch nicht akzeptabel ist.

GenAI ist außerdem dann schwach, wenn sich Qualität nicht gut prüfen lässt. Ein System, dessen Antworten plausibel klingen, aber nicht messbar bewertet werden können, erzeugt schnell Vertrauen – ohne dass man wirklich Kontrolle hat.

| Warnsignal | Konsequenz |
|---|---|
| klare Wenn-dann-Regeln reichen aus | klassischer Code ist meist besser |
| strukturierte Datenbankabfrage genügt | SQL oder BI-Logik ist oft transparenter |
| keine Testfälle verfügbar | Qualität bleibt Bauchgefühl |
| sensible Daten dürfen nicht verarbeitet werden | Architektur oder Anbieterwahl kann blockiert sein |

## Datenlage entscheidet mit

GenAI funktioniert nie im luftleeren Raum. Es braucht Prompts, Beispiele, Dokumente, Testfälle, Referenzantworten oder Nutzerfeedback. Entscheidend ist nicht nur, ob so etwas grundsätzlich existiert, sondern ob es zugänglich, aktuell, konsistent und rechtlich nutzbar ist.

Für RAG-Projekte müssen Dokumente nicht perfekt sein – aber sie sollten so vorliegen, dass Chunking, Embeddings und Quellenangaben sinnvoll möglich sind. Für Evaluation braucht es mindestens eine kleine Sammlung realistischer Fälle. Für Fine-Tuning braucht es deutlich mehr: saubere Trainingsdaten, klare Zielausgaben und eine belastbare Messung im Vergleich.

Wichtig: Ein stärkeres Modell kann eine unklare Datengrundlage nicht „wegzaubern“. Es verschiebt das Problem nur in Antworten, die am Ende teurer und schwerer nachzuvollziehen sein können.

## Nutzen, Kosten und Betrieb

Ein Vorhaben lohnt sich nicht, weil GenAI „modern“ ist – sondern weil es einen **messbaren Mehrwert** liefert. Häufige Nutzenformen sind Zeitersparnis, bessere Skalierung, Qualitätsverbesserung, konsistente Vorarbeit oder Fähigkeiten, die ohne Sprachmodell vorher kaum erreichbar waren.

Dagegen stehen Kosten: Modellnutzung, Entwicklung, Integration, Datenaufbereitung, Evaluation, Monitoring und späterer Betrieb. Die API-Kosten sind dabei oft nur ein Teil. In der Praxis werden Pflege, Fehleranalyse und Qualitätssicherung gerne unterschätzt.

Relevanz zeigt sich häufig dann, wenn ein Prototyp zwar schnell entsteht, aber noch niemand geklärt hat, wer Qualität prüft, wer Prompts pflegt, wer Kosten überwacht und wer bei Fehlern verantwortlich ist.

## Risiken realistisch einordnen

Ein sinnvolles GenAI-Projekt braucht beides: eine Nutzenperspektive und ein realistisch gezeichnetes Risikobild. Technische Risiken sind etwa Halluzinationen, Quellenfehler, Datenlecks, Prompt Injection, hohe Latenz oder Kostenexplosion bei schlecht begrenzten Abläufen. Organisatorische Risiken entstehen durch überhöhte Erwartungen, fehlende Akzeptanz oder unklare Zuständigkeiten.

Außerdem kommen regulatorische Fragen hinzu. In sensiblen Bereichen wie HR, Gesundheit, Bildung, Finanzen oder Verwaltung lassen sich Transparenz, Datenschutz, menschliche Aufsicht und Dokumentation nicht einfach später „irgendwie“ ergänzen.

| Risikotyp | Typisches Beispiel |
|---|---|
| technisch | plausible, aber falsche Antwort |
| organisatorisch | Stakeholder erwarten Fehlerfreiheit |
| rechtlich | personenbezogene Daten im Prompt oder in Logs |
| betrieblich | keine Zuständigkeit für Monitoring und Updates |

## Eine *einfache* Go- oder No-Go-Logik

Wenn Problem, Daten, Nutzen, Risiken und Betrieb halbwegs klar sind, kann man eine erste Einschätzung treffen. Ein Projekt wirkt tragfähig, wenn das Ziel konkret ist, die Daten verfügbar sind, der Mehrwert gegenüber einfacheren Lösungen erkennbar bleibt und die wichtigsten Risiken planbar eingeordnet werden können.

Vorsicht ist dagegen angesagt, wenn die Fragestellung unscharf bleibt, keine sinnvolle Evaluation möglich ist, keine brauchbare Datengrundlage existiert oder der Nutzen nur vage behauptet wird.

```text
Kurzcheck:
- Ist das Problem klar formuliert?
- Spielt unstrukturierter Inhalt eine zentrale Rolle?
- Gibt es brauchbare Daten, Beispiele oder Testfälle?
- Entsteht ein messbarer Mehrwert gegenüber einfacheren Lösungen?
- Sind Risiken, Kosten, Betrieb und Verantwortung realistisch eingeordnet?
```

## Was für Entwickler zuerst wichtig ist

Für Entwickler reicht oft eine nüchterne Vorprüfung. Wenn ein Projekt nur auf Begeisterung für GenAI basiert, aber weder Problem noch Daten noch Erfolgskriterien sauber benannt werden können, ist der nächste Schritt nicht Prompt Engineering, sondern Problemklärung.

**Ein gutes No-Go ist kein Scheitern**. Es spart Zeit, verhindert falsche Erwartungen und verhindert, dass ein schneller Prototyp fälschlich als belastbares System durchgeht.

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Aufgabenklassen & Lösungswege](./aufgabenklassen-und-loesungswege.html) | Welcher Lösungsweg passt, wenn GenAI grundsätzlich sinnvoll erscheint? |
| [Modellauswahl](../04-modelle-provider/modellauswahl.html) | Welches Modell passt zu Qualität, Kosten, Latenz und Modalität? |
| [RAG-Konzepte](../05-prompting-rag/rag-konzepte.html) | Wann hilft externer Wissenszugriff über eigene Dokumente? |
| [Evaluation & Observability](../07-qualitaet-sicherheit/evaluation-observability.html) | Wie wird Qualität eines späteren Systems belastbar gemessen? |
| [EU AI Act](../12-regulatorik-verantwortung/eu-ai-act.html) | Welche regulatorischen Anforderungen können ein Vorhaben prägen? |
| [Digitale Souveränität](../12-regulatorik-verantwortung/digitale-souveraenitaet.html) | Welche Abhängigkeiten entstehen durch Modell- und Infrastrukturwahl? |

---

**Version:** 1.0<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.