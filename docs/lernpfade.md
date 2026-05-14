---
layout: default
title: Lernpfade
nav_order: 3
description: Orientierung, Lesepfade und empfohlene Einstiege durch die GenAI-Dokumentation
has_toc: true
---

# Lernpfade
{: .no_toc }

Diese Dokumentation ist **nicht** als lineares Handbuch aufgebaut. Für den kürzesten Einstieg eignet sich zuerst [Zuerst lesen](./zuerst-lesen.html). Danach helfen die Lesepfade dabei, je nach Ziel gezielt zu vertiefen.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

## Wofür diese Seite da ist

Die Dokumentation deckt mehrere Ebenen gleichzeitig ab: Grundbegriffe, Modellverständnis, Framework-Einstieg, RAG, Multimodalität, Deployment und Governance. Ohne einen passenden Einstiegspunkt wird daraus schnell eine Sammlung guter Einzeltexte ohne klare Leseführung.

Diese Seite bündelt deshalb drei Dinge:

- einen kompakten Überblick über sinnvolle Einstiege
- empfohlene Lesepfade je nach Ziel
- eine kleine Auswahl von Dokumenten, mit denen fast immer begonnen werden kann

## Typische Einstiege

Nicht jede Person startet mit derselben Frage. Die folgenden neun Einstiegssituationen decken die häufigsten Ausgangspunkte ab.

### Orientierung

Ein Gesamtbild fehlt noch, die Grundbegriffe sind unscharf oder der Unterschied zwischen einem Chatbot und einem wirklich nützlichen System ist unklar.

Empfohlener Einstieg:

1. [Lohnt sich GenAI?](./02-orientierung/lohnt-es-sich.html)
2. [Aufgabenklassen und Lösungswege](./02-orientierung/aufgabenklassen-und-loesungswege.html)
3. [Prompt Engineering](./05-prompting-rag/prompt-engineering.html)
4. [Modellauswahl](./04-modelle-provider/modellauswahl.html)

### Erste eigene Chain

Ein erster lauffähiger LangChain-Workflow soll entstehen. Der Fokus liegt auf dem Handwerk: Modell einbinden, Prompt strukturieren, Output verarbeiten.

Empfohlener Einstieg:

1. [LangChain Einsteiger](./06-frameworks/einsteiger-langchain.html)
2. [Prompt-Templates Einsteiger](./05-prompting-rag/einsteiger-prompts.html)
3. [LangChain Best Practices](./06-frameworks/langchain-best-practices.html)
4. [Modell-Auswahl Guide](./04-modelle-provider/modellauswahl.html)

### Notebooks vorbereiten

Die Notebooks sollen ohne Reibung laufen: API-Keys müssen verfügbar sein, Colab-spezifische Zellen müssen verstanden werden und die lokalen Hilfsfunktionen sollen nachvollziehbar bleiben.

Empfohlener Einstieg:

1. [Von Colab zu Local](./13-ressourcen/colab-zu-lokal.html)
2. [GenAI_Lib Einsteiger](./06-frameworks/einsteiger-genai-lib.html)
3. [Code Standards](./13-ressourcen/standards.html)

### RAG & Retrieval

Dokumente, Wissensquellen oder Grounding spielen die Hauptrolle. Meist steht dann nicht das Sprachmodell selbst im Vordergrund, sondern die Frage, wie Wissen zuverlässig eingebunden und geprüft wird.

Empfohlener Einstieg:

1. [RAG-Konzepte](./05-prompting-rag/rag-konzepte.html)
2. [Tokenizing und Chunking](./03-grundlagen/tokenizing-chunking.html)
3. [Embeddings](./03-grundlagen/embeddings.html)
4. [Evaluation & Observability](./07-qualitaet-sicherheit/evaluation-observability.html)
5. [ChromaDB Einsteiger](./06-frameworks/einsteiger-chromadb.html)

### Toolgestützte und agentische Anwendungen

Eine GenAI-Anwendung soll nicht nur antworten, sondern Werkzeuge aufrufen, Zwischenergebnisse halten, bei riskanten Schritten pausieren oder über mehrere Schritte hinweg stabil bleiben. Dann verschiebt sich der Fokus von Prompt und Modell zu Workflow, State und Sicherheitsgrenzen.

Empfohlener Einstieg:

1. [Tool Use & Function Calling](./08-agentische-systeme/tool-use-function-calling.html)
2. [Memory-Systeme](./03-grundlagen/memory-systeme.html)
3. [GenAI-Sicherheit](./07-qualitaet-sicherheit/genai-sicherheit.html)
4. [LangGraph Einsteiger](./06-frameworks/einsteiger-langgraph.html)
5. [LangGraph Best Practices](./06-frameworks/langgraph-best-practices.html)

### Qualität und Fehlersuche

Eine Chain oder ein Agent funktioniert technisch, aber die Antwortqualität schwankt. Dann hilft kein weiteres Prompt-Polishing nach Bauchgefühl, sondern ein kleiner Satz wiederholbarer Testfälle und ein Blick auf die Zwischenschritte.

Empfohlener Einstieg:

1. [Evaluation & Observability](./07-qualitaet-sicherheit/evaluation-observability.html)
2. [RAG-Konzepte](./05-prompting-rag/rag-konzepte.html)
3. [LangSmith Best Practices](./06-frameworks/langsmith-best-practices.html)
4. [LangGraph Best Practices](./06-frameworks/langgraph-best-practices.html)
5. [Troubleshooting](./13-ressourcen/troubleshooting.html)

### Multimodalität

Text reicht nicht mehr aus. Bilder, Audio oder gemischte Inhalte sollen eingebunden werden. Der Fokus verschiebt sich von Textverarbeitung zu Foundation-Model-Fähigkeiten.

Empfohlener Einstieg:

1. [Transformer-Grundlagen](./03-grundlagen/transformer.html)
2. [Multimodal: Bild](./09-multimodal/multimodal-bild.html)
3. [Multimodal: Audio](./09-multimodal/multimodal-audio.html)
4. [Context Engineering](./05-prompting-rag/context-engineering.html)

### Deployment und Betrieb

Ein System soll nicht nur im Notebook funktionieren, sondern auch unter realen Bedingungen betreibbar werden. Dann verschiebt sich der Fokus von der Demo zur Produktreife.

Empfohlener Einstieg:

1. [Vom Modell zum Produkt: LangChain-Ökosystem](./10-deployment/vom-modell-zum-produkt.html)
2. [Minimum Viable GenAI Stack](./10-deployment/minimum-viable-genai-stack.html)
3. [Vom Notebook zum Produkt](./10-deployment/vom-notebook-zum-produkt.html)
4. [Evaluation & Observability](./07-qualitaet-sicherheit/evaluation-observability.html)
5. [LangSmith Best Practices](./06-frameworks/langsmith-best-practices.html)
6. [Provider-Modell-Mapping](./04-modelle-provider/provider-modell-mapping.html)
7. [Migration: OpenAI → Mistral](./10-deployment/migration-openai-mistral.html)

### Governance und Rahmenbedingungen

Sobald GenAI-Systeme in Bildung, Verwaltung oder Unternehmen eingesetzt werden, reichen Architektur und Code nicht mehr aus. Rechtliche, organisatorische und ethische Fragen werden dann zum Teil des Entwurfs.

Empfohlener Einstieg:

1. [Digitale Souveränität](./12-regulatorik-verantwortung/digitale-souveraenitaet.html)
2. [Ethik und GenAI](./12-regulatorik-verantwortung/ethik-und-genai.html)
3. [EU AI Act](./12-regulatorik-verantwortung/eu-ai-act.html)
4. [Datenschutz & DSGVO](./12-regulatorik-verantwortung/datenschutz-dsgvo.html)
5. [KI-Reifegradmodell](./02-orientierung/ki-reifegradmodell.html)


## Fünf Dokumente für *fast* jeden Start

Wer nicht lange wählen will, kommt mit diesen fünf Dokumenten meist am schnellsten ins Thema:

1. [Lohnt sich GenAI?](./02-orientierung/lohnt-es-sich.html)
2. [Aufgabenklassen und Lösungswege](./02-orientierung/aufgabenklassen-und-loesungswege.html)
3. [LangChain Einsteiger](./06-frameworks/einsteiger-langchain.html)
4. [RAG-Konzepte](./05-prompting-rag/rag-konzepte.html)
5. [Evaluation & Observability](./07-qualitaet-sicherheit/evaluation-observability.html)

Diese Kombination klärt erst die Einsatzfrage, dann die Lösungsklasse und Umsetzung, danach das wichtigste Erweiterungsmuster und zuletzt die Frage, wie Qualität sichtbar wird. Genau diese Reihenfolge verhindert viele frühe Fehlstarts.

## Wie die Bereiche zusammenhängen

Die Dokumentation ist in Bereiche gegliedert, die unterschiedliche Funktionen haben.

| Bereich | Rolle in der Navigation | Typische Frage |
|---|---|---|
| `02-orientierung/` bis `09-multimodal/` | Begriffe, Methoden, Frameworks, Modelle | Wie lässt sich das Thema einordnen? |
| `10-deployment/` | Betrieb, Produktisierung, Übergang in reale Systeme | Wie wird aus einer Demo ein System? |
| `11-projekte/` | Kursbegleitende Aufgaben und Abschlussprojekte | Wie lässt sich das Gelernte anwenden? |
| `12-regulatorik-verantwortung/` | rechtliche und organisatorische Einordnung | Welche Rahmenbedingungen gelten? |
| `13-ressourcen/` | Hilfen, Setup, Nachschlagepunkte | Was hilft bei der praktischen Arbeit? |

## Leselogik statt Vollständigkeit

Die Dokumentation muss nicht vollständig von oben nach unten gelesen werden. Sinnvoller ist ein selektiver Ablauf:

1. mit einer Leitfrage beginnen
2. einen passenden Pfad aus dieser Seite wählen
3. nur dann in angrenzende Themen springen, wenn die eigene Aufgabe das verlangt

Gerade bei GenAI-Projekten führt Vollständigkeit schnell in Sackgassen. Ein zu früher Sprung in Fine-Tuning, Multimodalität oder Deployment erzeugt oft mehr Komplexität als Erkenntnis.

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [concepts](./02-orientierung/) | Welche Konzeptdokumente stehen zur Verfügung? |
| [frameworks](./06-frameworks/) | Welche Frameworks und Best Practices werden behandelt? |
| [deployment](./10-deployment/) | Welche Dokumente begleiten den Weg in den Betrieb? |
| [projekte](./11-projekte/) | Welche projektnahen Aufgaben und Kursformate stehen bereit? |
| [regulatorisches](./12-regulatorik-verantwortung/) | Welche rechtlichen und organisatorischen Rahmenbedingungen gelten? |
| [ressourcen](./13-ressourcen/) | Welche Hilfen und Nachschlagepunkte unterstützen die Umsetzung? |

---

**Version:** 1.1<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
