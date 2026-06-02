---
layout: default
title: EU AI Act
parent: Regulatorik & Verantwortung
nav_order: 1
description: "EU AI Act: Risikoklassen, Pflichten und Bedeutung für GenAI-Anwendungen"
has_toc: true
---

# EU AI Act
{: .no_toc }

> [!NOTE] Risikoklassen, Fristen und Pflichten der EU-KI-Verordnung<br>
> Diese Seite gibt einen Überblick über Risikoklassen, Zeitplan und technische Konsequenzen des EU AI Act.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# 1 Einordnung

Der EU AI Act ist die Verordnung (EU) 2024/1689 und regelt die Nutzung von KI-Systemen in der Europäischen Union. Bestimmte KI-Praktiken werden dabei verboten. Für Hochrisiko-Systeme gelten strenge Anforderungen. Zusätzlich müssen Anbieter ausgewählter KI-Systeme bestimmte Punkte wie Transparenz, Dokumentation und menschliche Aufsicht erfüllen.

Für die Praxis ist weniger die juristische Systematik entscheidend als die technische Wirkung: Wer Tools einsetzt, Dokumente durchsucht oder Entscheidungen vorbereitet, braucht klare Einsatzgrenzen, nachvollziehbare Zwischenschritte und kontrollierbare Freigaben.

Wichtig ist auch: Der AI Act ersetzt weder die DSGVO noch bestehende branchenspezifische Regulierung. Je nach Bereich kommen weitere Regeln hinzu, zum Beispiel in Medizin, Finanzwesen, bei Beschäftigung, Bildung oder in der öffentlichen Verwaltung. Der AI Act bildet dafür den gemeinsamen Rahmen: Er klärt, welche KI-Praktiken unzulässig sind, welche Anwendungen als hochriskant gelten und welche Mindestanforderungen für Systeme gelten, die Sicherheit oder Grundrechte berühren.

> [!IMPORTANT] Keine Rechtsberatung<br>
> Diese Seite ordnet den EU AI Act für technische Entscheidungen ein. Für konkrete Produkte, Verträge oder behördliche Pflichten ist juristische Prüfung erforderlich.

# 2 Zeitplan und Anwendbarkeit

Der AI Act ist am **1. August 2024** in Kraft getreten. Die Pflichten gelten nicht alle gleichzeitig, sondern werden schrittweise wirksam. Deshalb sollte der Zeitplan nicht als reine „Planung für später“ verstanden werden: Einige Pflichten sind bereits jetzt relevant.

| Datum | Was gilt |
|---|---|
| **2. Februar 2025** | Verbote nach Art. 5, Definitionen und AI-Literacy-Pflichten gelten |
| **2. August 2025** | GPAI-Regeln und Governance-Strukturen gelten; nationale Behörden und Sanktionen müssen vorbereitet sein |
| **2. August 2026** | Der Großteil der Verordnung wird anwendbar, darunter Transparenzpflichten nach Art. 50 und Hochrisiko-Systeme aus Annex III |
| **2. August 2027** | Hochrisiko-KI als Sicherheitskomponente in regulierten Produkten wird anwendbar |
| **31. Dezember 2030** | Sonderfristen für bestimmte bereits bestehende große IT-Systeme und einzelne Bestandssysteme |

Im November 2025 hat die Europäische Kommission im Rahmen des **Digital Omnibus** vorgeschlagen, die Anwendung bestimmter Hochrisiko-Pflichten stärker an verfügbare Unterstützungsinstrumente wie harmonisierte Standards, gemeinsame Spezifikationen oder Leitlinien zu koppeln. Am **13. März 2026** hat der Rat seine Position zu Vereinfachungen bestimmter AI-Act-Regeln festgelegt. Für die Planung ist das relevant, aber es ersetzt keinen geltenden Rechtsstand. Solange keine Änderung beschlossen und wirksam ist, bleibt der ursprüngliche Zeitplan der Verordnung maßgeblich.

Typischer Fehler: Oft wird der Zeitplan nur mit „2026“ beschrieben. Das greift zu kurz, denn Verbote und AI-Literacy gelten bereits seit Februar 2025 und GPAI-Pflichten werden seit August 2025 relevant.

# 3 Risikoklassen

Der AI Act folgt einem risikobasierten Ansatz. Nicht entscheidend ist, ob ein System modern, agentisch oder generativ ist, sondern wofür es eingesetzt wird und welche Auswirkungen auf Menschen möglich sind.

| Risikoklasse | Bedeutung | Beispiele |
|---|---|---|
| **Unzulässige KI-Praktiken** | Verbotene Anwendungen, weil sie Grundrechte oder Sicherheit in besonders schwerer Weise gefährden | bestimmte manipulative Systeme, Social Scoring, bestimmte biometrische Kategorisierung, Emotionserkennung in Bildung und Beschäftigung, bestimmte Predictive-Policing-Konstellationen |
| **Hochrisiko-KI** | Zulässig, aber nur mit strengen Anforderungen an Risiko­management, Datenqualität, Dokumentation, Logging, menschliche Aufsicht, Robustheit und Cybersicherheit | ausgewählte Systeme in Bildung, Beschäftigung, kritischer Infrastruktur, zentralen privaten/öffentlichen Diensten, Strafverfolgung, Migration/Grenzkontrolle und Rechtsauslegung |
| **Transparenzpflichtige KI** | Nutzer müssen erkennen können, dass sie mit KI interagieren oder KI-generierte Inhalte sehen | Chatbots, Deepfakes, bestimmte synthetische Inhalte und interaktive KI-Systeme |
| **Minimales oder geringes Risiko** | Keine besonderen AI-Act-Pflichten; freiwillige Verhaltenskodizes bleiben möglich | viele interne Hilfswerkzeuge, Spamfilter, einfache Empfehlungssysteme |

Hochrisiko bedeutet nicht: „In sensiblen Bereichen ist alles automatisch hochriskant.“ Entscheidend sind die konkreten Vorgaben in Art. 6, Annex I und Annex III. Ein KI-System für Terminplanung in einer Klinik wird anders eingeordnet als ein System, das diagnostische Hinweise liefert oder eine sicherheitsrelevante Entscheidung vorbereitet.

# 4 Hochrisiko-Systeme

Hochrisiko-Systeme entstehen im AI Act im Wesentlichen auf zwei Wegen. Erstens können KI-Systeme Teil regulierter Produkte oder Sicherheitskomponenten sein, zum Beispiel bei Maschinen, Medizinprodukten, Fahrzeugen oder Aufzügen. Zweitens nennt Annex III konkrete Anwendungsfelder, in denen KI besonders stark in Grundrechte oder Lebensentscheidungen eingreifen kann.

Besonders anschauliche Fälle aus Annex III sind: Bewerberauswahl, Leistungsbewertung am Arbeitsplatz, Zugang zu Bildung, Bewertung in Prüfungen, Kreditwürdigkeitsprüfung, Zugang zu öffentlichen Leistungen, bestimmte Formen der Strafverfolgung, Migration sowie Unterstützung bei der Rechtsauslegung. In solchen Konstellationen reicht ein funktionierender Prompt nicht aus. Gefordert sind nachvollziehbare Datenflüsse, dokumentierte Modell- und Prompt-Versionen, Logs, menschliche Aufsicht sowie ein belastbares Fehlerkonzept.

Grenze: Ein Agent, der eine Entscheidung vorbereitet, ist nicht automatisch verboten. Relevant wird es insbesondere dann, wenn ein System faktisch entscheidet, Betroffene keine echte menschliche Prüfung erhalten oder die Entscheidungsgrundlage nicht nachvollziehbar bleibt.

# 5 General Purpose AI

General Purpose AI (GPAI) betrifft Modelle, die für viele unterschiedliche Zwecke eingesetzt werden können. Anbieter solcher Modelle unterliegen seit **2. August 2025** eigenen Pflichten. Wenn diese Modelle systemisches Risiko aufweisen, kommen zusätzliche Anforderungen hinzu, zum Beispiel Risikobewertung, Sicherheitsmaßnahmen und Dokumentation.

Praktisch wichtig ist die Abgrenzung: Wer ein externes Modell über eine API nutzt, ist nicht automatisch Anbieter dieses GPAI-Modells. Dennoch können eigene Pflichten entstehen, sobald daraus ein konkretes KI-System gebaut und in einem sensiblen Kontext eingesetzt wird. Der Betreiber eines Research- oder Entscheidungsassistenten kann also Pflichten haben, auch wenn das zugrunde liegende Basismodell von einem anderen Anbieter stammt.

# 6 Bedeutung für toolgestützte GenAI-Anwendungen

Toolgestützte GenAI-Anwendungen bringen einige Fragen des AI Act stärker in den Fokus, weil sie nicht nur Text erzeugen, sondern auch Zwischenschritte ausführen können. Dazu gehören Tool-Aufrufe, externe Datenabfragen, das Erstellen von Dateien, das Starten von Workflows oder das Weiterreichen von Vorschlägen an andere Systeme. Je mehr Autonomie ein System erhält, desto wichtiger werden Begrenzung und Nachvollziehbarkeit.

In der Entwicklung wird GenAI häufig zuerst anhand des Funktionsumfangs bewertet: Kann das System suchen, zusammenfassen, Entscheidungen vorbereiten und handeln? Aus regulatorischer Sicht ist aber eher entscheidend, welche Handlung ein Agent ausführen darf, ohne dass vorher freigegeben wird, welche Daten er sehen darf, welche Zwischenergebnisse gespeichert werden und an welcher Stelle eine menschliche Entscheidung zwingend ist.

Daraus ergeben sich für die Praxis fünf Mindestmuster:

| Muster | Bedeutung im GenAI-System |
|---|---|
| **Human-in-the-Loop** | Kritische Entscheidungen bleiben freigabepflichtig |
| **Logging und Traceability** | Tool-Aufrufe, Quellen, Prompts und Modellversionen bleiben nachvollziehbar |
| **Quellenbindung bei RAG** | Antworten zu Dokumenten müssen auf zitierbare Quellen zurückführbar sein |
| **Tool-Grenzen** | Systeme erhalten nur die Werkzeuge, die für die Aufgabe erforderlich sind |
| **Evaluation vor Einsatz** | Fehlerfälle, Out-of-Corpus-Fragen und Regressionen werden vor Nutzung geprüft |

Nicht sinnvoll ist ein automatischer Entscheidungs-Loop mit Außenwirkung, wenn keine menschliche Freigabe vorgesehen ist, keine Dokumentation gemacht wird und keine überprüfbaren Kriterien existieren. Gerade in Bereichen wie Legal, Medizin, HR und Finanzwesen lohnt es sich, GenAI zunächst als Assistenzsystem zu entwerfen, statt als autonomer Entscheider.

# 7 Umsetzung in der Praxis

Der AI Act ist kein einzelnes Rechtskapitel, das man „abheftet“. Er betrifft mehrere technische Bausteine: Tool Use, RAG, Human-in-the-Loop, Evaluation, Security, Observability und Deployment. Die regulatorische Sicht erklärt so, warum diese Module nicht nur Architekturthemen sind, sondern auch als Kontrollmechanismen verstanden werden müssen.

Ein Research Assistant für Fachartikel wird zunächst oft eher als niedriges oder begrenztes Risiko betrachtet. Er durchsucht bereitgestellte Dokumente, fasst Quellen zusammen und verweist auf Citations. Das kann sich jedoch ändern, sobald er in regulierten Branchen eingesetzt wird, etwa für medizinische Einschätzungen, rechtliche Bewertungen, Kreditentscheidungen oder Bewerberauswahl. Dann ist der gleiche technische Bauplan nicht automatisch ausreichend. Es braucht zusätzliche Validierung, Rollenklärung, Freigaben und Dokumentation.

Typischer Fehler: Ein Prototyp wird in einen produktiven Kontext übertragen, ohne die Risikoklasse erneut zu prüfen. Unerwartet kann es passieren, dass dieselbe Architektur je nach Einsatzkontext unterschiedlich eingeordnet wird, etwa als harmlos, transparenzpflichtig oder hochriskant.

# 8 Herausforderungen

Die Umsetzung bleibt anspruchsvoll. Begriffe wie „KI-System“, „systemisches Risiko“ oder „wesentliche Änderung“ müssen im Einzelfall eingeordnet werden. Zusätzlich werden technische Standards, Leitlinien und nationale Zuständigkeiten weiter konkretisiert. Für Unternehmen bedeutet das keinen einfachen Freibrief zum Abwarten, sondern eher die Notwendigkeit, Inventar, Risikoklassifizierung und Dokumentation früh aufzubauen.

Besonders anspruchsvoll ist die Grenze zwischen Unterstützung und Entscheidung. Ein Agent, der eine Zusammenfassung erstellt, wird anders bewertet als ein Agent, dessen Ergebnis faktisch über Zugang zu Arbeit, Kredit, Bildung oder medizinischer Behandlung bestimmt. In der Praxis liegt die Herausforderung oft weniger im Modell selbst, sondern in der organisatorischen Einbettung: Wer prüft das Ergebnis, wer trägt die Verantwortung, und wie können Betroffene eine Entscheidung nachvollziehen oder anfechten?

# 9 Empfehlungen

Vor dem Einsatz einer GenAI-Anwendung sollte zuerst der konkrete Anwendungsfall beschrieben werden: Wer nutzt das System, welche Datenarten werden verwendet, wie sieht der Entscheidungskontext aus, welche Personen könnten betroffen sein und welche Handlung wird durch das System erwartet. Danach folgt die Risikoklassifizierung. Erst anschließend ist es sinnvoll zu entscheiden, ob allgemeine Transparenzhinweise ausreichen oder ob bei Hochrisiko-Konstellationen zusätzliche Punkte wie Risikomanagement, technische Dokumentation, Logging, menschliche Aufsicht und Qualitätsmanagement erforderlich werden.

Für Prototypen und Lernsysteme empfiehlt sich ein Mindeststandard, auch wenn im konkreten Beispiel noch keine Hochrisiko-Pflichten ausgelöst werden. Dazu gehören: keine sensiblen Echtdaten, klare Kennzeichnung als nicht-produktives System, nachvollziehbare Quellen, reproduzierbare Tests und Freigaben vor kritischen Ausgaben. So lassen sich Arbeitsweisen etablieren, die in regulierten Kontexten nicht jedes Mal neu erfunden werden müssen.

# Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Ethik und GenAI](./ethik-und-genai.html) | Welche Verantwortung entsteht jenseits rechtlicher Mindestpflichten? |
| [Digitale Souveränität](./digitale-souveraenitaet.html) | Wie abhängig ist ein KI-System von Cloud, Plattformen und außereuropäischer Infrastruktur? |
| [Agent Security](../07-qualitaet-sicherheit/genai-sicherheit.html) | Welche technischen Risiken entstehen durch Tools, Prompts, Daten und Systemverhalten? |
| [Evaluation & Observability](../07-qualitaet-sicherheit/evaluation-observability.html) | Wie werden Qualität, Fehler und Drift in KI-Systemen messbar? |

---

**Version:** 1.1<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
