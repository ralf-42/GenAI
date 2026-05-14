---
layout: default
title: Tokenizing & Chunking
parent: Grundlagen
nav_order: 2
description: "Text-Preprocessing für LLMs: Tokenization-Strategien und Chunking-Methoden für RAG"
has_toc: true
---

# Tokenizing & Chunking
{: .no_toc }

> **Text-Preprocessing für LLMs: Tokenization-Strategien und Chunking-Methoden für RAG**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---


Die Textverarbeitung in LLM-Systemen steht und fällt häufig mit drei zentralen Entscheidungen: Welcher **Tokenizer** wird verwendet, wie groß sind die **Chunks**, und nach welcher Logik werden sie gebildet? Ein Tokenizer zerlegt Texte in kleine Einheiten, sogenannte **Tokens**. Dabei kann es sich um ganze Wörter, Wortbestandteile oder sogar einzelne Zeichen handeln. Auf den ersten Blick wirken diese Parameter technisch und eher nachrangig. In RAG- oder Analyseaufgaben entscheiden sie jedoch oft darüber, ob relevante Informationen überhaupt gefunden und korrekt verarbeitet werden.

In der Praxis zeigt sich dabei ein typisches Muster: Wenn Antworten unpräzise, unvollständig oder instabil ausfallen, gerät zunächst das Modell selbst in Verdacht. Häufig liegt die eigentliche Ursache jedoch bereits früher in der Verarbeitungskette. Ein **Chunker** unterteilt längere Texte in Chunks, also in verarbeitbare Abschnitte für Suche, Embeddings oder weitere Verarbeitungsschritte. Sind diese Abschnitte zu klein, fallen die Grenzen ungünstig oder erzeugen Überlappungen unnötiges Rauschen, leidet die Qualität der Ergebnisse deutlich. Gerade deshalb sollten **Tokenizing** und **Chunking** nicht lediglich als technische Vorverarbeitung betrachtet werden.


# Tokenizer-, Chunking- & Strategieauswahl



## Dokumenttypen

Nicht jeder Dokumenttyp stellt die gleichen Anforderungen an Tokenisierung und Chunking. Länge, Struktur und sprachliche Eigenschaften eines Dokuments beeinflussen maßgeblich, welche Tokenizer, Chunk-Größen und Strategien sinnvoll sind. Während lange Fließtexte vor allem vom Erhalt semantischer Zusammenhänge profitieren, erfordern kurze Texte oder technische Dokumente häufig stärker strukturorientierte Verfahren. Die folgende Tabelle zeigt typische Empfehlungen für unterschiedliche Dokumenttypen.

| Dokumenttyp                     | Tokenizer                                                    | Chunk-Größe                          | Überlappung                     | Chunking-Strategie                         | Begründung                                                                                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------ | ------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lange Texte**                 | SentencePiece oder BPE                                       | 512–1024 Tokens                      | 20–30%                          | Semantisches & embeddingbasiertes Chunking | Diese Tokenizer zerlegen den Text in kleinere, semantisch sinnvolle Einheiten. Größere Chunks helfen, den Kontext beizubehalten und logische Einheiten in dichten Texten zu bewahren.           |
| **Mittel-lange Texte**          | WordPiece                                                    | 256–512 Tokens                       | 10–20%                          | Semantisches Chunking                      | WordPiece verarbeitet gemischte Sprache gut. Semantisches Chunking fasst narrative und strukturierte Abschnitte optimal zusammen, ohne den Text zu stark zu fragmentieren.                      |
| **Kurze Texte**                 | Whitespace-/Symbol-basierte Tokenizer                        | 50–200 Tokens                        | 0–5%                            | Rekursives Zeichen-Chucking                | Kurze, oft stark strukturierte Texte profitieren von kleinen Chunks. Rekursives Zeichen-Chucking kann helfen, bei fehlenden klaren Grenzen die Struktur zu wahren.                              |
| **Code & Technische Dokumente** | Whitespace- oder benutzerdefinierte symbolbasierte Tokenizer | Ca. 256 Tokens (pro Funktion/Absatz) | Variabel (minimale Überlappung) | Agentisches Chunking                       | Die strukturelle Integrität ist entscheidend, um die Semantik des Codes zu erhalten. Agentisches Chunking berücksichtigt funktionale Zusammenhänge und stellt die Intaktheit der Blöcke sicher. |

<div style="page-break-after: always;"></div>


## Anwendungsszenarien


Die Wahl einer geeigneten Chunking-Strategie hängt stark vom jeweiligen Anwendungsszenario ab. Unterschiedliche Aufgaben stellen unterschiedliche Anforderungen an Größe, Überlappung und semantische Struktur der Chunks. Während bei Frage-Antwort-Systemen möglichst viel Kontext erhalten bleiben muss, steht bei Zusammenfassungen eher die inhaltliche Verdichtung im Vordergrund. Die folgende Tabelle zeigt typische Einsatzszenarien und geeignete Strategien für ein effektives Tokenizing und Chunking.


| Szenario                           | Ziel                                                      | Empfohlenes Chunking                                         | Strategie                                                               | Begründung                                                                                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Antworten auf Fragen**           | Exakte Extraktion relevanter Passagen                     | 512 Tokens mit hoher Überlappung (30–50%)                    | Kombination aus semantischem und embeddingbasiertem Chunking            | Hohe Überlappung stellt sicher, dass der Kontext zwischen den Chunks nicht verloren geht. Semantische Grenzen und embeddingbasierte Analysen erfassen relevante Abschnitte präzise.           |
| **Zusammenfassungen**              | Verdichtung des Inhalts bei Beibehaltung der Kernaussagen | 256 Tokens mit moderater Überlappung (10–20%)                | Semantisches Chunking                                                   | Semantisches Chunking bewahrt komplette Sinnabschnitte, sodass die Kernaussagen klar extrahiert werden können, ohne den Kontext zu verlieren.                                                 |
| **Informationsretrieval (RAG)**    | Effiziente Auffindbarkeit relevanter Abschnitte           | 256–512 Tokens mit moderater Überlappung (10–20%)            | Embeddingbasiertes Chunking                                             | Embeddingbasiertes Chunking gruppiert semantisch verwandte Inhalte. So werden relevante Informationen leichter auffindbar und retrieval-technisch optimal aufbereitet.                        |
| **Named Entity Recognition (NER)** | Identifikation wichtiger Entitäten                        | Ca. 256 Tokens an Satzgrenzen, minimale Überlappung (5–15%)  | Semantisches Chunking (ggf. kombiniert mit embeddingbasierten Ansätzen) | Durch an Satzgrenzen ausgerichtete Chunks wird vermieden, dass Entitäten aufgespalten werden. Eine embeddingbasierte Analyse kann zusätzlich helfen, zusammengehörige Entitäten zu erfassen.  |
| **Textklassifikation**             | Zuweisung von Labels zu Dokumenten oder Abschnitten       | Ganze Dokumente oder 512 Tokens, wenig bis keine Überlappung | Semantisches Chunking (optional mit reduzierter Granularität)           | Gröbere Unterteilungen verhindern Rauschen, während semantische Einheiten erhalten bleiben, die für die Klassifikation relevant sind.                                                         |
| **Code-Kommentierung/Erklärung**   | Verständnis und Erklärung von Codeabschnitten             | Pro Funktion/Modul, Überlappung nur bei Bedarf               | Agentisches Chunking                                                    | Agentisches Chunking berücksichtigt syntaktische und semantische Aspekte des Codes. So bleiben logische Zusammenhänge, wie Funktionsdefinitionen, erhalten und können optimal erklärt werden. |


> [!NOTE] Pilotphase<br>
> Vor einer konkreten Implementierung lohnt sich eine kurze Pilotphase mit echten Dokumenten. Häufig reichen schon zwei oder drei Varianten, um zu sehen, ob ein Setup eher Kontext erhält oder eher Rauschen produziert.


# Beispiel Tokenizing & Chunking


<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/Pasted image 20250310180654.png" alt="Tokenizing & Chunking Prozess" width="700">
+ Tokenizing:
	+ Zerlegt Text in kleinste Einheiten (Token)
	+ Diese Token werden in Zahlen (IDs) umgewandelt
	+ Ein Token kann ein Wort, Teil eines Wortes oder ein Satzzeichen sein

+ Chunking:
	+ Gruppiert die Token in verarbeitbare Blöcke
	+ Beispiel: Bei max. 4096 Token pro Anfrage werden längere Texte in Chunks aufgeteilt
	+ Jeder Chunk behält dabei genug Überlappung (hier 1) zum vorherigen Chunk für Kontexterhalt
+ Zusammenspiel:
	+ Text wird erst tokenisiert (in kleinste Einheiten zerlegt)
	+ Die Token werden dann in Chunks gruppiert (für Verarbeitung)
	+ Chunks werden nacheinander verarbeitet
	+ LLM behält Kontext zwischen Chunks durch Überlappungen

# Parameter- und Strategieauswahl
- **Tokenizer-Auswahl:**
    - **SentencePiece/BPE** sind ideal für lange, unstrukturierte Texte, da sie feine Subworteinheiten erzeugen und dabei semantische Bedeutung beibehalten.
    - **WordPiece** ist optimal für hybride Texte, in denen technische sowie allgemeine Sprache vorkommen.
    - **Whitespace-/Symbol-basierte Tokenizer** (oder speziell angepasste Tokenizer für Code) gewährleisten, dass die Struktur, beispielsweise in kurzen Texten oder Quellcode, erhalten bleibt.
- **Chunk-Größe und Überlappung:**
    - Die **Chunk-Größe** wird so gewählt, dass jeweils eine komplette logische Einheit erfasst wird. Längere Texte benötigen größere Chunks, während bei kurzen Texten kleinere, präzisere Segmente ausreichend sind.
    - **Überlappung** hilft dabei, Kontextinformationen am Rand der Chunks nicht zu verlieren. Für komplexe Aufgaben (wie präzise Fragebeantwortung) ist eine höhere Überlappung vorteilhaft, wohingegen bei Aufgaben wie Klassifikation geringere Überlappungen ausreichend sind.
- **Zusätzliche Chunking-Strategien:**
    - **Semantisches Chunking** zielt darauf ab, thematisch und inhaltlich zusammenhängende Abschnitte zu bilden.
    - **Rekursives Zeichen-Chucking** eignet sich, wenn keine klaren sprachlichen Grenzen vorliegen oder bei sehr strukturierten, kurzen Dokumenten.
    - **Embeddingbasiertes Chunking** nutzt Ähnlichkeiten im Einbettungsraum, um semantisch verwandte Inhalte zu gruppieren, was insbesondere bei Retrieval-Aufgaben nützlich ist.
    - **Agentisches Chunking** verwendet agentenbasierte Verfahren, um logische und syntaktische Zusammenhänge zu identifizieren – ein Ansatz, der besonders bei Code und technischen Dokumenten Vorteile bietet.
- **Praktische Rahmenbedingungen:**
    - **Speicherverbrauch und Verarbeitungsgeschwindigkeit** lassen sich durch Anpassung der Chunk-Größe steuern. Kleinere Chunks reduzieren den Speicherbedarf und beschleunigen die Verarbeitung, was vor allem bei großen Datenmengen von Bedeutung ist.
    - **Kosten** können durch die Optimierung der Überlappung minimiert werden. Eine zu hohe Überlappung erhöht Redundanzen und Rechenaufwand, sodass hier ein ausgewogenes Verhältnis gefunden werden muss.

Für Entwickler ist vor allem eine Erfahrung wichtig: Es gibt selten eine universell richtige Chunk-Größe. Gute Werte hängen stark davon ab, ob Absätze, Abschnitte, Funktionsblöcke oder stark strukturierte Datensätze verarbeitet werden. Wer ohne Testdaten sofort auf "Best Practices" vertraut, optimiert oft am eigentlichen Problem vorbei.


> [!NOTE] Praxistest<br>
> Die Eignung von Chunk-Größen und -Strategien zeigt sich am zuverlässigsten mit echten Daten, nicht mit Beispieltexten. Relevant sind dabei vor allem Abrufgenauigkeit, Antwortqualität und die Frage, ob wichtige Informationen an Chunk-Grenzen verloren gehen.



# Tokenizer-Typen im Vergleich
## Byte-Pair Encoding (BPE)

- **Prinzip:** Häufig auftretende Zeichenpaare werden iterativ zusammengefasst
- **Vorteile:**
  - Kompaktes Vokabular
  - Guter Umgang mit seltenen Wörtern
- **Nachteile:**
  - Training erforderlich
- **Verwendung:** GPT-Modelle, viele Transformer

## WordPiece

- **Prinzip:** Ähnlich wie BPE, optimiert auf Wahrscheinlichkeitsmaximierung
- **Vorteile:**
  - Effizient für mehrsprachige Modelle
  - Gute Generalisierung
- **Nachteile:**
  - Komplexere Implementation
- **Verwendung:** BERT, DistilBERT

## SentencePiece

- **Prinzip:** Behandelt Text als Rohdaten ohne Whitespace-Annahmen
- **Vorteile:**
  - Language-agnostic (funktioniert für alle Sprachen)
  - Keine Vorverarbeitung nötig
- **Nachteile:**
  - Etwas langsamer
- **Verwendung:** T5, XLNet

## Whitespace/Symbol-basierte Tokenizer

- **Prinzip:** Trennung an Leerzeichen und Satzzeichen
- **Vorteile:**
  - Sehr einfach
  - Schnell
  - Gut für Code
- **Nachteile:**
  - Großes Vokabular
  - Probleme mit zusammengesetzten Wörtern
- **Verwendung:** Einfache Anwendungen, Code-Analyse


# Chunking-Strategien im Detail


Verschiedene Chunking-Strategien haben spezifische Vor- und Nachteile, die je nach Anwendung berücksichtigt werden sollten.

## Zeichenbasiertes Chunking

- **Einfach:** Text wird nach fester Zeichenanzahl geteilt
- **Nachteile:** Kann Wörter oder Sätze mitten durchschneiden
- **Anwendung:** Selten empfohlen, nur für sehr einfache Fälle

## Rekursives Zeichen-Chunking

- **Vorgehen:** Versucht zunächst an Absatzgrenzen zu trennen, dann an Sätzen, schließlich an Wörtern
- **Vorteile:** Erhält mehr strukturelle Integrität als einfaches Zeichen-Chunking
- **Anwendung:** Standard für viele Texttypen

## Dokumentbasiertes Chunking

- **Vorgehen:** Nutzt dokumentspezifische Struktur (z.B. Markdown-Header, HTML-Tags)
- **Vorteile:** Semantisch sinnvolle Grenzen
- **Anwendung:** Strukturierte Dokumente, technische Dokumentation

## Semantisches Chunking

- **Vorgehen:** Analysiert semantische Ähnlichkeit zwischen Sätzen
- **Vorteile:** Hält zusammenhängende Inhalte zusammen
- **Nachteile:** Rechenintensiver
- **Anwendung:** Hochwertige RAG-Systeme

## Embeddingbasiertes Chunking

- **Vorgehen:** Nutzt Embeddings um semantisch ähnliche Abschnitte zu identifizieren
- **Vorteile:** Sehr genaue semantische Gruppierung
- **Nachteile:** Hoher Rechenaufwand
- **Anwendung:** Retrieval-optimierte Systeme

## Agentisches Chunking

- **Vorgehen:** KI-Agent analysiert Text und entscheidet über Chunk-Grenzen
- **Vorteile:** Adaptiv, kontextabhängig
- **Nachteile:** Komplex, teuer
- **Anwendung:** Hochspezialisierte Anwendungen, Code-Analyse


<div style="page-break-after: always;"></div>

# Best Practices
## Chunk-Größe wählen

1. **Kleine Chunks (128-256 Tokens):**
   - Präzises Retrieval
   - Höhere Kosten (mehr Chunks)
   - Risiko: Kontextverlust

2. **Mittlere Chunks (256-512 Tokens):**
   - Guter Kompromiss
   - Standard für die meisten Anwendungen

3. **Große Chunks (512-1024 Tokens):**
   - Mehr Kontext
   - Weniger Chunks
   - Risiko: Irrelevante Informationen

## Überlappung optimieren

- **Keine Überlappung (0%):** Nur wenn Chunks völlig unabhängig sind
- **Kleine Überlappung (5-10%):** Strukturierte Dokumente
- **Moderate Überlappung (10-20%):** Standard für RAG
- **Hohe Überlappung (30-50%):** Wenn Kontext kritisch ist (Q&A)

## Strategie-Auswahl

```mermaid
flowchart TD
    START([Text analysieren]) --> Q1{Ist der Text<br>strukturiert?}

    Q1 -->|JA| DOK[Dokumentbasiertes<br>Chunking]
    Q1 -->|NEIN| Q2{Ist semantische<br>Kohärenz wichtig?}

    Q2 -->|NEIN| ZEICHEN[Einfaches<br>Zeichenbasiertes Chunking]
    Q2 -->|JA| Q3{Ist Rechenleistung<br>verfügbar?}

    Q3 -->|JA| EMBED[Embeddingbasiertes oder<br>Semantisches Chunking]
    Q3 -->|NEIN| REKURSIV[Rekursives<br>Zeichen-Chunking]

    START --> Q4{Ist es Code?}
    Q4 -->|JA| AGENT[Agentisches oder<br>AST-basiertes Chunking]

    style START fill:#e3f2fd,stroke:#1976d2
    style DOK fill:#c8e6c9,stroke:#388e3c
    style ZEICHEN fill:#c8e6c9,stroke:#388e3c
    style EMBED fill:#c8e6c9,stroke:#388e3c
    style REKURSIV fill:#c8e6c9,stroke:#388e3c
    style AGENT fill:#c8e6c9,stroke:#388e3c
```


# Evaluation & Monitoring
## Metriken für Chunking-Qualität

- **Retrieval Precision:** Anteil relevanter Chunks in Top-K Ergebnissen
- **Retrieval Recall:** Anteil gefundener relevanter Chunks
- **Context Preservation:** Wird wichtiger Kontext über Chunk-Grenzen hinweg erhalten?
- **Chunk Size Distribution:** Sind die Chunks gleichmäßig groß?

## A/B Testing

Sinnvoll ist der Vergleich mehrerer Konfigurationen:
- Chunk-Größe: 256 vs. 512 Tokens
- Überlappung: 10% vs. 20%
- Strategie: Rekursiv vs. Semantisch

Geeignete Messgrößen sind:
- Antwortqualität (manuell oder mit LLM-as-Judge)
- Retrieval-Geschwindigkeit
- Kosten (API-Calls, Compute)


# Implementierungs-Beispiel (Pseudo-Code)

Das konkrete Framework kann sich ändern. Stabil bleibt die Pipeline: Dokument laden, passende Strategie wählen, Grenzen bestimmen, Chunks prüfen und erst danach indexieren.

```text
Pseudo-Code, nicht als Python ausführen:

Eingabe:
    dokument_text
    ziel: z. B. Q&A, Zusammenfassung oder Klassifikation
    dokumenttyp: z. B. Fließtext, Markdown, Code oder Tabelle

Chunking vorbereiten:
    passende Strategie wählen
    Zielgröße festlegen
    Überlappung festlegen
    Trennzeichen oder Strukturgrenzen festlegen

Chunking ausführen:
    Text entlang stabiler Grenzen teilen
    wenn Abschnitt zu groß:
        nächstfeinere Grenze verwenden
    wenn Abschnitt zu klein:
        mit benachbartem Abschnitt zusammenführen
    Überlappung zwischen benachbarten Chunks ergänzen

Qualität prüfen:
    keine wichtigen Sätze mitten trennen
    Chunk-Größen verteilen sich plausibel
    Metadaten wie Quelle, Abschnitt und Position speichern
```

**Wichtig:** Die Einheit der Größe muss explizit sein. Manche Verfahren zählen Zeichen, andere Tokens. Für RAG ist entscheidend, dass die gewählte Einheit zur späteren Modell- und Embedding-Pipeline passt.

```text
Pseudo-Code, nicht als Python ausführen:

wenn tokenbasiertes Chunking nötig ist:
    Tokenizer des Zielmodells verwenden
    Text in Tokens zählen
    Chunks nach Tokenlimit bilden
    Überlappung ebenfalls in Tokens berechnen

wenn zeichenbasiertes Chunking reicht:
    Zeichen oder Absätze zählen
    Chunks nach Strukturgrenzen bilden
    Ergebnis mit echten Retrieval-Fragen testen
```


# Fazit
Die Wahl der richtigen Kombination aus Tokenizer, Chunk-Größe und Chunking-Strategie ist entscheidend für die Qualität einer NLP-Anwendung:

- **Dokumenttyp bestimmt Tokenizer:** Lange Texte → BPE/SentencePiece, Code → Whitespace/Symbol
- **Anwendung bestimmt Chunk-Größe:** Q&A → größer mit Überlappung, Klassifikation → größer ohne Überlappung
- **Strategie folgt Anforderungen:** Semantik wichtig → Semantisches/Embedding-basiert, Struktur wichtig → Dokumentbasiert
- **Tests mit echten Daten:** A/B-Tests sind hier deutlich aussagekräftiger als Beispieltexte

---

**Weiterführende Ressourcen:**
- [LangChain Text Splitters](https://python.langchain.com/docs/modules/data_connection/document_transformers/)
- [Chunking Strategies Vergleich](https://www.pinecone.io/learn/chunking-strategies/)
- [Token vs. Character Splitting](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken)


---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Embeddings](./embeddings.html) | Wie werden die vorbereiteten Textstücke später semantisch repräsentiert? |
| [RAG-Konzepte](../05-prompting-rag/rag-konzepte.html) | Wie wirken Chunking-Entscheidungen auf Retrieval und Antwortqualität? |
| [Transformer-Architektur](./transformer.html) | Warum spielen Token überhaupt eine so zentrale Rolle für Sprachmodelle? |

---

**Version:**    1.1<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
