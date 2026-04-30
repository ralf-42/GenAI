---
layout: default
title: Lesepfade
nav_order: 2
description: Orientierung, Lesepfade und empfohlene Einstiege durch die GenAI-Dokumentation
has_toc: true
---

# Lesepfade

Diese Dokumentation ist nicht als lineares Handbuch aufgebaut. Der schnellste Einstieg entsteht meist nicht durch vollständiges Lesen, sondern durch einen passenden Pfad: erst das Ziel klären, dann gezielt vertiefen.

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

## Wofür diese Seite da ist

Die Dokumentation deckt mehrere Ebenen gleichzeitig ab: Grundbegriffe, Modellverständnis, Framework-Einstieg, RAG, Multimodalität, Deployment und Governance. Ohne Einstiegspunkt wird daraus schnell eine Sammlung guter Einzeltexte ohne klare Leserführung.

Diese Seite bündelt deshalb drei Dinge:

- einen kompakten Überblick über sinnvolle Einstiege
- empfohlene Lesepfade je nach Ziel
- eine kleine Auswahl von Dokumenten, mit denen fast immer begonnen werden kann

## Typische Einstiege

Nicht jede Person startet mit derselben Frage. In der Praxis tauchen meist fünf Ausgangslagen auf.

### Orientierung

Ein Gesamtbild fehlt noch, die Grundbegriffe sind unscharf oder der Unterschied zwischen einem Chatbot und einem wirklich nützlichen System ist unklar.

Empfohlener Einstieg:

1. [Aufgabenklassen und Lösungswege](./concepts/aufgabenklassen-und-loesungswege.html)
2. [Prompt Engineering](./concepts/prompt-engineering.html)
3. [Modellauswahl](./concepts/m19-modellauswahl.html)

### Erste eigene Chain

Ein erster lauffähiger LangChain-Workflow soll entstehen. Der Fokus liegt auf dem Handwerk: Modell einbinden, Prompt strukturieren, Output verarbeiten.

Empfohlener Einstieg:

1. [Einsteiger LangChain](./frameworks/einsteiger-langchain.html)
2. [Einsteiger Prompts](./frameworks/einsteiger-prompts.html)
3. [LangChain Best Practices](./frameworks/langchain-best-practices.html)
4. [Modell-Auswahl Guide](./frameworks/modell-auswahl-guide.html)

### Kursnotebooks vorbereiten

Die Notebooks sollen ohne Reibung laufen: API-Keys müssen verfügbar sein, Colab-spezifische Zellen müssen verstanden werden und die lokalen Hilfsfunktionen sollen nachvollziehbar bleiben.

Empfohlener Einstieg:

1. [API-Keys & Provider](./ressourcen/api-keys-und-provider.html)
2. [Von Colab zu Local](./ressourcen/colab-zu-lokal.html)
3. [GenAI_Lib Einsteiger](./frameworks/einsteiger-genai-lib.html)
4. [Code Standards](./ressourcen/standards.html)

### RAG und Retrieval

Dokumente, Wissensquellen oder Grounding spielen die Hauptrolle. Meist steht dann nicht das Sprachmodell selbst im Vordergrund, sondern die Frage, wie Wissen zuverlässig eingebunden und geprüft wird.

Empfohlener Einstieg:

1. [RAG-Konzepte](./concepts/rag-konzepte.html)
2. [Tokenizing und Chunking](./concepts/m08a-tokenizing-chunking.html)
3. [Embeddings](./concepts/m08b-embeddings.html)
4. [Evaluation & Observability](./concepts/evaluation-observability.html)
5. [Einsteiger ChromaDB](./frameworks/einsteiger-chromadb.html)

### Qualität und Fehlersuche

Eine Chain oder ein Agent funktioniert technisch, aber die Antwortqualität schwankt. Dann hilft kein weiteres Prompt-Polishing nach Bauchgefühl, sondern ein kleiner Satz wiederholbarer Testfälle und ein Blick auf die Zwischenschritte.

Empfohlener Einstieg:

1. [Evaluation & Observability](./concepts/evaluation-observability.html)
2. [RAG-Konzepte](./concepts/rag-konzepte.html)
3. [LangSmith Best Practices](./frameworks/langsmith-best-practices.html)
4. [Troubleshooting](./ressourcen/troubleshooting.html)

### Multimodalität

Text reicht nicht mehr aus. Bilder, Audio oder gemischte Inhalte sollen eingebunden werden. Der Fokus verschiebt sich von Textverarbeitung zu Foundation-Model-Fähigkeiten.

Empfohlener Einstieg:

1. [Transformer-Grundlagen](./concepts/m05a-transformer.html)
2. [Multimodal: Bild](./concepts/m09-multimodal-bild.html)
3. [Multimodal: Audio](./concepts/m16-multimodal-audio.html)
4. [Context Engineering](./concepts/m21-context-engineering.html)

### Deployment und Betrieb

Ein System soll nicht nur im Notebook funktionieren, sondern auch unter realen Bedingungen betreibbar werden. Dann verschiebt sich der Fokus von der Demo zur Produktreife.

Empfohlener Einstieg:

1. [Vom Modell zum Produkt: LangChain-Ökosystem](./deployment/vom-modell-zum-produkt-langchain-oekosystem.html)
2. [Aus Entwicklung ins Deployment](./deployment/aus-entwicklung-ins-deployment.html)
3. [Evaluation & Observability](./concepts/evaluation-observability.html)
4. [LangSmith Best Practices](./frameworks/langsmith-best-practices.html)
5. [Migration: OpenAI → Mistral](./deployment/migration-openai-mistral.html)

### Governance und Rahmenbedingungen

Sobald GenAI-Systeme in Bildung, Verwaltung oder Unternehmen eingesetzt werden, reichen Architektur und Code nicht mehr aus. Rechtliche, organisatorische und ethische Fragen werden dann zum Teil des Entwurfs.

Empfohlener Einstieg:

1. [Digitale Souveränität](./regulatorisches/digitale-souveraenitat.html)
2. [Ethik und GenAI](./regulatorisches/ethik-und-genai.html)
3. [EU AI Act](./regulatorisches/eu-ai-act.html)
4. [KI-Reifegradmodell](./ressourcen/ki-reifegradmodell.html)

### No-Code, Low-Code und visuelle Orientierung

Nicht jeder Einstieg beginnt im Code. Für erste Prototypen, Modellverständnis oder Workshop-Situationen können Visualisierungen und Builder helfen, bevor eine Python-Architektur entsteht.

Empfohlener Einstieg:

1. [Interaktive Visualisierungen](./ressourcen/interaktive-visualisierungen.html)
2. [Agent Builder Einsteiger](./frameworks/einsteiger-agent-builder.html)
3. [Aufgabenklassen und Lösungswege](./concepts/aufgabenklassen-und-loesungswege.html)
4. [Links](./ressourcen/links.html)

## Vier Dokumente für fast jeden Start

Wer nicht lange wählen will, kommt mit diesen vier Dokumenten meist am schnellsten ins Thema:

1. [Aufgabenklassen und Lösungswege](./concepts/aufgabenklassen-und-loesungswege.html)
2. [Einsteiger LangChain](./frameworks/einsteiger-langchain.html)
3. [RAG-Konzepte](./concepts/rag-konzepte.html)
4. [Evaluation & Observability](./concepts/evaluation-observability.html)

Diese Kombination klärt erst die Einsatzfrage, dann die Umsetzung, danach das wichtigste Erweiterungsmuster und zuletzt die Frage, wie Qualität sichtbar wird. Genau diese Reihenfolge verhindert viele frühe Fehlstarts.

## Wie die Bereiche zusammenhängen

Die Dokumentation ist in Bereiche gegliedert, die unterschiedliche Funktionen haben.

| Bereich | Rolle in der Navigation | Typische Frage |
|---|---|---|
| `concepts/` | Begriffe, Modelle, Entscheidungslogik | Wie lässt sich das Thema einordnen? |
| `frameworks/` | Einstieg und Arbeitsweise mit Tools | Wie wird es konkret umgesetzt? |
| `deployment/` | Betrieb, Produktisierung, Übergang in reale Systeme | Wie wird aus einer Demo ein System? |
| `regulatorisches/` | rechtliche und organisatorische Einordnung | Welche Rahmenbedingungen gelten? |
| `ressourcen/` | Hilfen, Setup, Nachschlagepunkte | Was hilft bei der praktischen Arbeit? |
| `projekte/` | projektnahe Aufgaben und Kursformate | Wie lässt sich das Gelernte anwenden? |

## Leselogik statt Vollständigkeit

Die Dokumentation muss nicht vollständig von oben nach unten gelesen werden. Sinnvoller ist ein selektiver Ablauf:

1. mit einer Leitfrage beginnen
2. einen passenden Pfad aus dieser Seite wählen
3. nur dann in angrenzende Themen springen, wenn die eigene Aufgabe das verlangt

Gerade bei GenAI-Projekten führt Vollständigkeit schnell in Sackgassen. Ein zu früher Sprung in Fine-Tuning, Multimodalität oder Deployment erzeugt oft mehr Komplexität als Erkenntnis.

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [concepts](./concepts.html) | Welche Konzeptdokumente stehen zur Verfügung? |
| [frameworks](./frameworks.html) | Welche Frameworks und Best Practices werden behandelt? |
| [deployment](./deployment.html) | Welche Dokumente begleiten den Weg in den Betrieb? |
| [regulatorisches](./regulatorisches.html) | Welche rechtlichen und organisatorischen Rahmenbedingungen gelten? |
| [ressourcen](./ressourcen.html) | Welche Hilfen und Nachschlagepunkte unterstützen die Umsetzung? |
| [projekte](./projekte.html) | Welche projektnahen Aufgaben und Kursformate stehen bereit? |

---

**Version:** 1.1<br>
**Stand:** April 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
