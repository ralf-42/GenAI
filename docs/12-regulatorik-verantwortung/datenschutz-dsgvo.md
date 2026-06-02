---
layout: default
title: "Datenschutz & DSGVO"
parent: Regulatorik & Verantwortung
nav_order: 2
description: "DSGVO-konforme Nutzung von GenAI: Prompts, LLM-APIs, Logging, RAG und lokale Modelle"
has_toc: true
---

# Datenschutz & DSGVO
{: .no_toc }

> [!IMPORTANT] Verantwortlichkeit nach DSGVO<br>
> Wer personenbezogene Daten an eine externe KI-API schickt, ist Verantwortlicher im Sinne der DSGVO — unabhängig davon, ob das bewusst passiert oder nicht.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Warum Datenschutz für KI-Entwickler relevant ist

Die DSGVO gilt seit 2018 in der gesamten EU. Sie regelt, wie personenbezogene Daten verarbeitet werden dürfen: also Informationen, die sich einer natürlichen Person zuordnen lassen. In GenAI-Projekten betrifft das schnell die Praxis, denn viele typische Anwendungsfälle arbeiten mit solchen Daten – etwa wenn Kundenfragen beantwortet, E-Mails analysiert, Dokumente zusammengefasst oder Bewerbungsunterlagen ausgewertet werden.

Bei LLM-basierten Systemen kommt hinzu: Datenschutzverstöße entstehen oft eher aus dem Alltag heraus als aus böser Absicht. Ein Entwickler nutzt für Tests einen Kundennamen im Prompt, weil das das Testen vereinfacht. Ein RAG-System indiziert Dokumente mit Ansprechpartnern. Ein Trace enthält eine Kundennummer. In all diesen Fällen ist das nicht zwangsläufig geplant, aber es genügt, wenn personenbezogene Daten verarbeitet werden, ohne das zuvor sauber eingeordnet zu haben.

**In der Praxis relevant wenn:** Eine GenAI-Anwendung auf echte Nutzerdaten zugreift, E-Mails oder Dokumente verarbeitet, Antworten auf der Basis von Profildaten personalisiert, RAG-Indizes aus internen Quellen aufbaut oder Ergebnisse in einer Datenbank speichert.

---

## Was darf in den Prompt?

Als einfache Orientierung gilt: Möglichst wenig personenbezogene Daten in den Prompt – und nur dann, wenn es für die Aufgabe wirklich gebraucht wird.

**Personenbezogene Daten** sind zum Beispiel Namen, E-Mail-Adressen, Telefonnummern, Geburtsdaten, IP-Adressen, Kundennummern und alles, was sich einer Person direkt oder indirekt zuordnen lässt. **Besondere Kategorien** nach Art. 9 DSGVO – etwa Gesundheitsdaten, religiöse Überzeugungen oder biometrische Daten – stellen dabei höhere Anforderungen.

Bevor Daten überhaupt in einen Prompt gelangen, sollten diese drei Fragen beantwortet sein:

1. Ist die Information für die Antwort wirklich nötig – oder reicht eine anonymisierte Version?
2. Gibt es eine Zustimmung der betroffenen Person oder eine andere passende Rechtsgrundlage?
3. Weiß der Anbieter, dass seine API für diese Art der Datenverarbeitung genutzt wird?

**Anonymisieren statt weglassen:** Häufig reicht es, den echten Namen durch einen Platzhalter zu ersetzen. Statt `Max Müller hat folgendes Problem: ...` kann zum Beispiel `Ein Nutzer hat folgendes Problem: ...` oder `[NAME] hat folgendes Problem: ...` genutzt werden. In vielen Fällen bleibt die Antwortqualität dabei ausreichend.

Für die automatische Erkennung und Maskierung von personenbezogenen Daten wird häufig `presidio` genutzt, ein Open-Source-Werkzeug von Microsoft, das PII wie Namen, E-Mails, Telefonnummern und weitere Kategorien zuverlässig erkennt.

```python
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

analyzer  = AnalyzerEngine()
anonymizer = AnonymizerEngine()

text = "Bitte prüfe die Anfrage von Max Müller (max@example.com)."
ergebnisse = analyzer.analyze(text=text, language="de")
anonymisiert = anonymizer.anonymize(text=text, analyzer_results=ergebnisse)

print(anonymisiert.text)
# → "Bitte prüfe die Anfrage von <PERSON> (<EMAIL_ADDRESS>)."
```

**Typischer Fehler:** Entwickler testen mit echten Produktionsdaten, weil das einfacher ist als passende Testdaten aufzubauen. So landen reale personenbezogene Daten in externen APIs sowie in Logs und Traces – oft ohne dass das in der Datenschutzdokumentation sauber erfasst ist.

---

## Welcher Dienst für welche Daten?

Welche KI-Lösung in Frage kommt, hängt davon ab, wie sensibel die verarbeiteten Daten sind.

| Datensensitivität | Beispiele | Geeigneter Dienst |
|---|---|---|
| Keine personenbezogenen Daten | Öffentliche Texte, anonymisierte Fragen | Cloud-LLM-API meist vertretbar |
| Interne Unternehmensdaten, kein PII | Technische Dokumentation, anonymisierte Protokolle | Cloud-LLM-API mit geprüften Datenkontrollen |
| Personenbezogene Daten (Standard) | Kundenfragen, interne E-Mails | Dienst mit AVV/DPA, klarer Datenhaltung und dokumentiertem Zweck |
| Besondere Kategorien (Art. 9 DSGVO) | Gesundheitsdaten, Bewerbungsunterlagen | Lokales Modell oder streng kontrollierte Unternehmensumgebung |

Bei Cloud-LLM-APIs sollten Datenkontrollen konkret geprüft werden. Dazu gehören zum Beispiel Fragen wie: Werden Eingaben zum Training verwendet? Welche Logs entstehen? Wie lange werden Inhalte gespeichert? Gibt es einen Auftragsverarbeitungsvertrag (AVV/DPA), Optionen zur Datenresidenz oder regionale Verarbeitung? Solche Punkte müssen in die organisatorische und technische Bewertung einfließen.

Für OpenAI API-Daten gilt als Beispiel: API-Daten werden standardmäßig nicht zum Training genutzt, sofern nicht aktiv zugestimmt wird. Gleichzeitig können je nach Endpoint und Konfiguration Abuse-Monitoring-Logs und Application State entstehen. Details wie diese gehören in die Prüfung und Bewertung.

Lokale Modelle über Ollama oder vLLM laufen vollständig auf eigener Infrastruktur. Dann muss nichts das eigene System verlassen. Für hochsensible Daten ist das oft die kontrollierbarste Variante – allerdings mit dem Nachteil, dass lokale Modelle in Qualität, Geschwindigkeit oder Betriebsaufwand hinter großen Cloudmodellen zurückbleiben können.

**Grenze:** Auch ein lokales Modell ändert nichts daran, dass die DSGVO grundsätzlich relevant bleibt. Die Daten werden weiterhin verarbeitet, und damit gelten die üblichen Anforderungen wie Zweckbindung, Speicherbegrenzung, Betroffenenrechte und weitere Pflichten unverändert.

---

## Logging, Tracing und Evaluation — die vergessene Datenschutzfrage

GenAI-Systeme erzeugen oft mehr personenbezogene Spuren, als man zunächst erwartet. Dazu zählen Prompt-Historien, Notebook-Ausgaben, RAG-Retrievals, Tool-Aufrufe, Fehlerlogs, Evaluation-Datasets und Traces. Das ist für Debugging und Qualitätssicherung wertvoll – gleichzeitig stellt es eine Datenschutzfrage dar: Wenn ein Prompt personenbezogene Daten enthält, können diese Daten danach in Logs, Traces oder Testsets auftauchen.

LangSmith wird häufig für Tracing und Evaluation genutzt. Der EU-Endpunkt (`eu.api.smith.langchain.com`) ist dabei ein wichtiger Baustein, ersetzt aber keine Datenklassifikation. Entscheidend bleibt, welche Inhalte überhaupt in Traces, Metadaten und Datasets aufgenommen werden.

Je früher sensible Inhalte im Logging und Tracing berücksichtigt werden, desto besser lässt sich der Datenfluss steuern. In vielen Fällen macht es Sinn, sensible Felder zu maskieren oder gar nicht erst in die Trace-Metadaten aufzunehmen.

```python
run_cfg = {
    "run_name": "M13_RAG_Query",
    "tags": ["rag", "m13"],
    "metadata": {
        "modul": "M13",
        "anfrage_typ": "fachfrage",
        # Kein echter Nutzername, keine E-Mail in Metadaten
    }
}
```

**Typischer Fehler:** Nutzerdaten direkt als `metadata`-Felder zu verwenden, weil das praktisch für spätere Filterung klingt. Häufig ist es besser, anonymisierte Bezeichner oder IDs statt Klardaten zu nutzen.

---

## Auftragsverarbeitungsvertrag — was Entwickler wissen müssen

Sobald personenbezogene Daten an einen externen Dienstleister übergeben werden, verarbeitet dieser die Daten im Auftrag. Dafür wird ein **Auftragsverarbeitungsvertrag** benötigt (AVV, englisch: Data Processing Agreement, DPA). Das gilt auch für LLM-APIs.

In der Praxis heißt das: Bevor ein Unternehmen eine LLM-API-Dienstleistung produktiv für die Verarbeitung personenbezogener Daten einsetzt, sollte geprüft werden, ob ein AVV mit dem Anbieter vorliegt.

| Anbieter | AVV verfügbar? | Wo |
|---|---|---|
| OpenAI API | Ja | Data Processing Addendum / Business Terms prüfen |
| Azure OpenAI | Ja | Microsoft-Kundenvertrag und Auftragsverarbeitungsbedingungen prüfen |
| Anthropic Claude API | Ja | Anbieterbedingungen bzw. Enterprise-Vertrag prüfen |
| Hugging Face Inference | Je nach Dienst und Vertrag | Nutzungsbedingungen und Enterprise-Optionen prüfen |

Das müssen Entwickler in der Regel nicht selbst verhandeln. Wichtig ist aber, dass bewusst ist: Diese Verträge müssen existieren. Bei Unsicherheiten ist es sinnvoll, Datenschutzbeauftragte oder Rechtsabteilung einzubeziehen, bevor ein System produktiv geht.

**In der Praxis relevant wenn:** Ein Unternehmen baut eine GenAI-Anwendung, die echte Nutzerdaten verarbeitet, und setzt sie produktiv ein – nicht nur für interne Tests.

---

## Datenschutz by Design

Datenschutz by Design bedeutet, Datenschutz von Anfang an in der Architektur mitzudenken. Bei GenAI-Systemen heißt das vor allem: Personenbezogene Daten möglichst früh im Datenfluss filtern oder anonymisieren. So bleibt der spätere Datenbestand kontrollierbarer.

Datenschutz by Default ergänzt das. Die Standardkonfiguration sollte so datensparsam wie möglich sein. Tracing sollte keine Klardaten in Metadaten schreiben, RAG-Indizes sollten nur die nötigen Inhalte enthalten, Tool-Zugriffe sollten passend begrenzt sein und Logs sollten eine sinnvolle, begründete Aufbewahrungsdauer haben.

Ein naheliegendes Prinzip ist eine Vorverarbeitung vor dem Modellaufruf:

```python
def verarbeite_anfrage(text: str) -> str:
    """Verarbeitet eine Nutzeranfrage — prüft zuerst auf PII."""
    if enthält_pii(text):
        return "Anfrage enthält personenbezogene Daten und kann nicht verarbeitet werden."
    return weiterleiten_an_llm(text)
```

Die Prüfung passiert dabei, bevor die Daten in Prompt, RAG-Index, Tool-Aufruf oder Trace landen – nicht erst nach der Modellantwort.

Außerdem gilt das Prinzip der **Datensparsamkeit**: Es sollten nur die Daten erhoben und verarbeitet werden, die für den konkreten Zweck tatsächlich benötigt werden. Ein RAG-System für technische Handbücher braucht keine Personaldaten. Ein Chatbot für Bestellstatus benötigt in der Regel keinen Zugriff auf die vollständige Bestellhistorie.

---

## Wann ist eine Datenschutzfolgenabschätzung nötig?

Eine **Datenschutzfolgenabschätzung** (DSFA, englisch: Data Protection Impact Assessment, DPIA) ist nach Art. 35 DSGVO erforderlich, wenn die Verarbeitung voraussichtlich ein hohes Risiko für Betroffene mit sich bringt.

Für LLM-basierte Systeme sollte die DSFA spätestens eingeordnet werden, wenn eine oder mehrere der folgenden Situationen zutreffen:

- Das System verarbeitet systematisch besondere Kategorien personenbezogener Daten (Gesundheit, Biometrie, Religion, politische Überzeugung)
- Das System trifft oder bereitet automatisierte Entscheidungen mit Rechtswirkung vor (Kreditvergabe, Stellenbesetzung, medizinische Empfehlung)
- Das System verarbeitet Daten von schutzbedürftigen Gruppen (Minderjährige, Patienten, Beschäftigte)
- Das System nutzt neue, schwer vorhersehbare Automatisierungs- oder Agentenmuster mit Zugriff auf sensible Daten oder wirkungsrelevante Tools

Ein Chatbot für FAQs zu Produkten erfüllt in der Regel keine dieser Bedingungen. Eine GenAI-Anwendung, die Bewerbungsunterlagen auswertet und eine Vorauswahl vorbereitet, passt dagegen schnell zu mehreren Risikokriterien.

**Grenze:** Ob eine DSFA erforderlich ist, entscheidet der Datenschutzbeauftragte im Unternehmen. Für Entwickler ist vor allem wichtig, die relevanten Informationen bereitzustellen: welche Daten verarbeitet werden, welche Tools Zugriff erhalten, welche Speicherfristen gelten, welche Logs entstehen und welche Drittanbieter beteiligt sind.

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [EU AI Act](./eu-ai-act.html) | Welche Risikostufen und Anforderungen definiert das europäische KI-Recht? |
| [GenAI-Sicherheit](../07-qualitaet-sicherheit/genai-sicherheit.html) | Wie werden Tool-Zugriffe, externe Inhalte und sensible Daten technisch abgesichert? |
| [Aufgabenklassen & Lösungswege](../02-orientierung/aufgabenklassen-und-loesungswege.html) | Wie wird Datenschutz früh in die Wahl zwischen Chat, Workflow, RAG, lokalem Modell und Agentensystem einbezogen? |
| [Digitale Souveränität](./digitale-souveraenitaet.html) | Wann werden Datenresidenz, Anbieterabhängigkeit und souveräne Infrastruktur strategisch relevant? |

---

**Version:** 1.0<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
