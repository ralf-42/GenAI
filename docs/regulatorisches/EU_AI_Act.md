---
layout: default
title: EU AI Act
parent: Regulatorisches
nav_order: 2
description: "Rechtliche Rahmenbedingungen: EU AI Act und regulatorische Anforderungen"
has_toc: true
---

# EU AI Act
{: .no_toc }

> [!NOTE] Rechtlicher Rahmen<br>
> Der EU AI Act ordnet KI-Systeme nach Risiko und verbindet technische Entwicklung mit Dokumentation, Governance und Aufsicht.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Einleitung & Zielsetzung

Der EU AI Act (Verordnung (EU) 2024/1689) ist das zentrale europäische Gesetz zur Regulierung von Künstlicher Intelligenz. Er soll Sicherheit, Grundrechte und europäische Werte schützen, ohne Innovation grundsätzlich zu blockieren. Das geschieht über einen risikobasierten Ansatz: Je stärker ein KI-System in sensible Lebensbereiche eingreift, desto höher sind die Anforderungen an Dokumentation, Qualitätssicherung, Transparenz und menschliche Aufsicht.

Für GenAI-Projekte ist der AI Act vor allem deshalb relevant, weil technische Prototypen schnell zu regulierten Systemen werden können. Ein Chatbot für interne Wissenssuche ist anders zu bewerten als ein System, das Bewerbungen vorsortiert, medizinische Empfehlungen gibt oder Entscheidungen in Bildung, Verwaltung oder Strafverfolgung beeinflusst. Die regulatorische Einordnung gehört deshalb nicht ans Projektende, sondern in die frühe Architektur- und Produktentscheidung.

## Umsetzung & Anwendbarkeit

Das Gesetz trat am 1. August 2024 in Kraft. Die Pflichten werden gestaffelt wirksam; erste Verbote, etwa für bestimmte manipulative KI-Systeme und Social Scoring, gelten seit Februar 2025. Weitere Pflichten folgen abhängig von Systemtyp und Risikoklasse. Auf EU-Ebene übernimmt das European AI Office zentrale Aufgaben, insbesondere bei General Purpose AI (GPAI). Mitgliedstaaten müssen zuständige Behörden benennen, regulatorische Sandkästen einrichten und Durchsetzungsstrukturen aufbauen.

<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/Pasted image 20250416154726.png" alt="EU AI Act Zeitplan" width="600">

Grenze: Die formale Anwendung des AI Acts löst noch keine operative Compliance. In der Praxis entstehen die größten Lücken bei Inventarisierung, Rollenklärung, Datenqualität, Dokumentationspflege und der Frage, wer Änderungen am Modell oder Prompt freigibt.

## Risikoklassen im Detail

Der AI Act unterscheidet vier Risikoklassen. Systeme mit inakzeptablem Risiko sind verboten, etwa bestimmte Formen von Social Scoring oder manipulativer KI. Hochrisiko-Systeme sind erlaubt, unterliegen aber strengen Anforderungen an Risikomanagement, Datenqualität, technische Dokumentation, Protokollierung, menschliche Aufsicht und Konformitätsbewertung. Dazu zählen Systeme in Bereichen wie Bildung, Beschäftigung, Justiz, Strafverfolgung, Gesundheit oder kritischer Infrastruktur.

Systeme mit begrenztem Risiko unterliegen vor allem Transparenzpflichten. Dazu gehören Chatbots oder Deepfake-Generatoren, bei denen offengelegt werden muss, dass eine Interaktion oder ein Inhalt KI-gestützt erzeugt wurde. Systeme mit minimalem Risiko, etwa Spamfilter oder viele Empfehlungssysteme, bleiben weitgehend frei von verbindlichen Zusatzpflichten; freiwillige Verhaltenskodizes bleiben möglich.

<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/Pasted image 20250416154437.png" alt="EU AI Act Risikoklassen" width="600">

Typischer Fehler: Ein System wird nur nach der verwendeten Modelltechnologie bewertet. Entscheidend ist aber der konkrete Einsatzkontext. Dass ein LLM technisch identisch bleibt, bedeutet nicht, dass es regulatorisch gleich einzuordnen ist.

## Herausforderungen & Kritikpunkte

Die praktische Umsetzung bleibt anspruchsvoll. Begriffe wie "KI-System", "systemisches Risiko" oder "enge verfahrenstechnische Aufgabe" müssen in konkreten Projekten ausgelegt werden. Auch die Einstufung als Hochrisiko-System ist nicht immer eindeutig, insbesondere wenn GenAI nur ein Baustein in einem größeren Workflow ist.

Weitere Herausforderungen liegen in der GPAI-Regulierung, in Grundrechtsfragen und in der Durchsetzbarkeit. Behörden benötigen technische Expertise, Unternehmen benötigen belastbare Prozesse, und Entwicklerteams benötigen klare Kriterien, wann Modellwechsel, Prompt-Änderungen oder neue Datenquellen eine erneute Bewertung auslösen.

## Potenziale & Chancen

Der AI Act schafft nicht nur Pflichten, sondern auch Orientierung. Einheitliche Regeln können Investitionsentscheidungen erleichtern, weil Risiken nicht in jedem Mitgliedstaat neu bewertet werden müssen. Zugleich entsteht ein Markt für vertrauenswürdige KI-Produkte, Auditierung, Governance-Tools, Modellkarten, Datenqualitätsprüfungen und Compliance-Beratung.

Für europäische Anbieter kann Regulierung ein Qualitätsmerkmal werden, wenn Nachvollziehbarkeit, Datenschutz und robuste Betriebsprozesse nicht nur behauptet, sondern messbar umgesetzt werden. Der sogenannte Brussels Effect kann dazu führen, dass internationale Anbieter europäische Anforderungen auch außerhalb Europas übernehmen.

## Best Practices & Empfehlungen

Eine belastbare AI-Act-Umsetzung beginnt mit einer Systeminventur. KI-Systeme, Datenquellen, Modellanbieter, Einsatzkontexte und Verantwortlichkeiten werden dokumentiert, bevor eine Risikoklasse festgelegt wird. Darauf aufbauend lassen sich Governance-Strukturen, Freigabeprozesse und Monitoring definieren.

Für GenAI-Projekte sind drei Punkte besonders wichtig: Erstens muss die Zweckbindung klar beschrieben sein. Zweitens müssen Prompts, Retrieval-Quellen, Modellversionen und relevante Konfigurationen nachvollziehbar bleiben. Drittens braucht es einen Prozess für Fehlermeldungen, menschliche Kontrolle und regelmäßige Neubewertung, sobald sich Modell, Datenbasis oder Nutzungskontext ändern.

In der Praxis relevant, wenn: ein Prototyp aus Notebook, Demo oder Workshop in eine produktive Umgebung wandert. Genau an dieser Stelle wechseln die Anforderungen von technischer Machbarkeit zu Verantwortlichkeit, Dokumentation und Betrieb.

## Ausblick

Der langfristige Erfolg des AI Acts hängt davon ab, ob Regulierung und technische Entwicklung anschlussfähig bleiben. Zu starre Auslegung kann Innovation bremsen; zu lockere Umsetzung lässt Grundrechts- und Sicherheitsrisiken bestehen. Entscheidend wird die Fähigkeit, KI-Systeme nicht nur einmalig zu klassifizieren, sondern über ihren gesamten Lebenszyklus zu steuern.

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Ethik und GenAI](./Ethik_und_GenAI.html) | Welche normativen Zielkonflikte entstehen jenseits formaler Regulierung? |
| [Digitale Souveränität](./Digitale_Souveraenitat.html) | Wie hängen KI-Regulierung, Infrastrukturabhängigkeiten und europäische Handlungsfähigkeit zusammen? |
| [Evaluation & Observability](../concepts/Evaluation_Observability.html) | Wie werden Qualität, Fehlerverhalten und Betrieb von KI-Systemen überprüfbar? |

---

**Version:** 1.0<br>
**Stand:** November 2025<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
