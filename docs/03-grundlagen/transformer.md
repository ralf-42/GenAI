---
layout: default
title: Transformer Architektur
parent: Grundlagen
nav_order: 1
description: "Deep Dive in Transformer-Modelle: Attention, Encoder-Decoder und moderne Varianten"
has_toc: true
---

# Transformer Architektur
{: .no_toc }

> **Deep Dive in Transformer-Modelle: Attention, Encoder-Decoder und moderne Varianten**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# Was ist ein Transformer?
Stell dir vor, du liest einen Text und willst wirklich verstehen, was gemeint ist. Dann reicht es nicht, Wort für Wort abzuarbeiten. Du schaust automatisch: Welche Wörter passen zusammen? Welche sind gerade entscheidend, und welche spielen eher eine Nebenrolle?

Genau dafür ist ein **Transformer** gebaut: Er verarbeitet Texte so, dass das Modell ausrechnen kann, welche Wörter in einem Kontext besonders wichtig sind.

# Die Grundidee
Nehmen wir den Satz: _„Der Hund bellt laut.“_

- Ein Mensch erkennt schnell: **„Hund“** ist hier das Subjekt.
- **„bellt“** ist die Handlung und wird durch **„laut“** näher beschrieben.
- **„Der“** hängt zwar grammatikalisch mit **„Hund“** zusammen, ist für die eigentliche Aussage aber weniger wichtig.

Ein Transformer arbeitet mit diesem Prinzip über **Self-Attention**: Wenn das Modell „bellt“ verarbeitet, gibt es „Hund“ und „laut“ mehr Gewicht. „Der“ wird zwar mit einbezogen, aber weniger stark.

Der Transformer lernt diese Zusammenhänge nicht per Hand, sondern über **Aufmerksamkeit**:
- Er betrachtet alle Wörter gleichzeitig
- Er berechnet, wie stark jedes Wort mit jedem anderen zusammenhängt
- Wichtige Verbindungen bekommen dabei mehr Einfluss

<div style="page-break-after: always;"></div>


## Wörter werden zu Zahlen → Embedding
- Computer verstehen keine Wörter, sondern nur Zahlen
- Deshalb wird jedes Wort in eine Liste von Zahlen umgewandelt (eine Art „Fingerabdruck“ des Wortes)
- Entscheidend ist: Die Darstellung hängt nicht nur vom Wort selbst ab, sondern auch davon, in welchem Zusammenhang es vorkommt

## Position ist wichtig → Positional Encoding
- *Der Lehrer fragt den Schüler*. bedeutet etwas anderes als *Den Lehrer fragt der Schüler*.
- Damit der Transformer diese Reihenfolge kennt, bekommt jedes Wort zusätzlich eine Positions-Information

## Aufmerksamkeit berechnen → Self-Attention

Self-Attention ist ein Mechanismus, bei dem jedes Wort in einem Satz mit allen anderen Wörtern (inklusive sich selbst) verglichen wird. Aus den Ähnlichkeiten entsteht ein Signal dafür, wie stark das jeweilige andere Wort in die Darstellung einfließen soll.

**Beispiel:**
Im Satz **„Der große Hund bellt laut“** wird das Wort **„bellt“** mit allen anderen Wörtern abgeglichen:

- Mit **„Hund“** ist die Verbindung stark, weil der Hund die Handlung ausführt.
- **„große“** beschreibt den Hund und ist dadurch indirekt mit „bellt“ verknüpft.
- **„laut“** passt direkt zur Handlung und ist deshalb besonders relevant.
- **„Der“** ist ein Artikel und trägt weniger inhaltliche Information zu „bellt“ bei.

So erkennt das Modell, welche Wörter bei „bellt“ wichtig sind, und baut daraus eine kontextabhängige Darstellung, die den Satz besser abbildet.

Damit diese Aufmerksamkeit nicht nur „irgendwie“ berechnet wird, sondern auch die Rollen der Wörter berücksichtigt, nutzt der Transformer eine bestimmte Fragetechnik: Er stellt pro Wort drei Werte zusammen – **Query**, **Key** und **Value**.

- **„Was suche ich?“** → **Query**
- **„Was biete ich an?“** → **Key**
- **„Was ist mein Inhalt?“** → **Value**

**Beispiel mit dem Satz:** *"Der große <mark style="background: #BBFABBA6;">Hund</mark> <mark style="background: #D2B3FFA6;">bellte</mark> laut."*

**Das Wort "<mark style="background: #D2B3FFA6;">bellte</mark>" analysiert:**
- **Query (Was suche ich?)**: "Ich bin ein Verb und suche nach meinem Subjekt - wer macht die Handlung?"
- **Key (Was biete ich an?)**: Von "<mark style="background: #BBFABBA6;">Hund</mark>": "Ich bin ein Substantiv und kann Subjekt sein!"
- **Value (Was ist mein Inhalt?)**: Von "<mark style="background: #BBFABBA6;">Hund</mark>": "Ich bin ein Tier, männlich, mit der Eigenschaft 'groß'"

**Ergebnis**: Der Transformer erkennt die enge Verbindung zwischen „Hund“ und „bellte“ und bildet ab: „Der Hund führt die Handlung des Bellens aus.“



<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/self_attention.png" alt="Self-Attention Mechanismus" width="500">
<p><font color='black' size="2">
KI-generiertes Bild
</font></p>




Das läuft parallel für alle Wörter ab – dadurch sieht das Modell die wichtigsten Beziehungen im Satz.

## Mehrere *Köpfe* gleichzeitig → Multi-Head-Attention

**Multi-Head-Attention** heißt: Der Transformer führt mehrere Self-Attention-Berechnungen gleichzeitig durch – mit unterschiedlichen Blickwinkeln (den sogenannten **Heads**).

Statt nur eine einzige Sicht darauf zu berechnen, wie „bellt“ mit anderen Wörtern zusammenhängt, erstellt das Modell mehrere Perspektiven. Jeder Head bekommt eigene Query-, Key- und Value-Vektoren und fokussiert auf etwas anderes.

**Beispiel mit 3 Attention-Heads:**

| Head | Möglicher Fokus                                 |
| ---- | ----------------------------------------------- |
| 1    | **Wer tut etwas?** – Beziehung zu „Hund“        |
| 2    | **Wie wird etwas getan?** – Beziehung zu „laut“ |
| 3    | **Grammatikalische Struktur** – z. B. Artikel   |

Jeder Head berechnet eigene Attention-Gewichte und erzeugt eine eigene neue Repräsentation für „bellt“.
Danach werden die Ergebnisse zusammengeführt (konkatenieren und lineare Transformation), damit am Ende eine reichhaltigere Darstellung entsteht.

**Warum das sinnvoll ist?**

Ein einzelner Attention-Mechanismus kann nur eine begrenzte Art von Beziehung richtig stark machen. Mit **Multi-Head-Attention** lernt das Modell:

- verschiedene semantische Beziehungen parallel zu erkennen
- Kontexte und Nuancen besser zu verarbeiten
- den Satzaufbau feiner zu erfassen

**Wie funktioniert das technisch?**
<br>

<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/Pasted image 20250309190825.png" alt="Transformer Architektur" width="500">
<p><font color='black' size="2">
KI-generiertes Bild
</font></p>



## In die Zukunft schauen verboten → Masked-Self-Attention


**Problem beim Text-Generieren:**

Beim Generieren von Text passiert Folgendes: Das Modell erzeugt **Wort für Wort**. Dabei darf es bei der nächsten Vorhersage nur auf das schauen, was schon genannt wurde – **nicht** auf Wörter, die erst in Zukunft kommen.

**Ohne Maske (normale Self-Attention):**

Das Modell würde bei der Vorhersage von Wort _n+1_ schon sehen, was bei _n+2_ oder _n+3_ kommt. Das wäre kein echtes Raten, sondern „Ablesen“ aus dem, was ohnehin schon bekannt ist.

**Mit Masked Self-Attention:**

Das Modell wird gezwungen, **zukünftige Positionen auszublenden**. So darf es bei einer Vorhersage nur den bisherigen Kontext verwenden.

**Masked Self-Attention** ist wichtig, damit ein Sprachmodell wirklich Schritt für Schritt Text erzeugt, ohne sich zukünftige Wörter vorweg „anzusehen“. Es entspricht damit eher dem echten Schreibprozess: Du kennst nur das, was bisher schon steht.

<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/self_attention_2.png" alt="Masked Self-Attention" width="600">
<p><font color='black' size="2">
KI-generiertes Bild
</font></p>



# Drei Haupttypen von Transformern

<br>

[Transformer](https://editor.p5js.org/ralf.bendig.rb/full/I1TTpJk-D)

## Verstehen - Encoder-Only (wie BERT)

**Fachbegriff**: Bidirectional Encoder Representations
- Liest den ganzen Text und versteht ihn
- Kann Fragen zum Text beantworten
- Wie ein Leser, der wirklich alles einmal durchgeht

**Beispiel**: "In welchem Jahr wurde Einstein geboren?" → Findet die Antwort im Text

## Schreiben - Decoder-Only (wie ChatGPT)

**Fachbegriff**: Autoregressive Language Models
- Schreibt Text Wort für Wort
- Jedes neue Wort basiert auf allen vorherigen
- Wie jemand, der eine Geschichte weiter erzählt

**Beispiel**: "Es war einmal..." → "Es war einmal ein kleiner Drache, der fliegen lernen wollte..."

[TransformerExplainer](https://poloclub.github.io/transformer-explainer/)

## Übersetzen - Encoder-Decoder (wie T5)

**Fachbegriff**: Sequence-to-Sequence Models
- Liest den Input vollständig und schreibt dann den Output
- Verbindet Verstehen und Schreiben
- Wie ein Übersetzer, der erst den Text komplett erfasst und dann überträgt

**Beispiel**: "Hello world" → "Hallo Welt"

# Warum sind Transformer so revolutionär?


## Vorher (alte Methoden):
- Computer lasen Texte Wort für Wort von links nach rechts
- Dabei wurde es oft langsam, und der Anfang des Textes wurde leichter vergessen
- Wie jemand, der nur ein Wort nach dem anderen liest und den Rest aus den Augen verliert

## Transformer:
- Sehen alle Wörter gleichzeitig
- Verstehen Zusammenhänge auch über größere Distanzen hinweg
- Viele Teile können parallel verarbeitet werden → schneller
- Wie jemand, der den ganzen Text auf einmal erfasst


# Top 10 Post-Transformer


**Was kommt als Nächstes?** Die KI-Forschung entwickelt sich schnell. Hier sind einige neue Ansätze, die möglicherweise die Zukunft prägen, aber noch nicht überall Standard sind:


## Übersicht

| Rang   | Modelltyp                          | Was ist anders?                                                                  | Besonderheit                                                                           | Transformer-basiert | Beispiele/Status                                                                                   |
| ------ | ---------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------- |
| **1**  | **State Space Models (SSM)**       | Sequenzmodell ohne klassische Attention; lineare Skalierbarkeit O(n) statt O(n²) | 5× schnellere Inferenz, Verarbeitung von Millionen-Token-Sequenzen                     | ❌ Nein              | Mamba, Mamba-2, Jamba (AI21), IBM Bamba                                                            |
| **2**  | **Neural Memory Architectures**    | Dynamische Speicher-Module mit Kurz- und Langzeitgedächtnis, lernen zur Testzeit | Skalierung auf 2M+ Token, "Needle-in-Haystack" Aufgaben, überraschungsbasiertes Lernen | ⚠️ Hybrid           | Google Titans, Sakana NAMMs                                                                        |
| **3**  | **Self-Adaptive Models**           | Dynamische Gewichtsanpassung zur Laufzeit ohne Retraining                        | Singular Value Fine-tuning (SVF), Spezialisierung durch "Expert"-Vektoren              | ✅ Ja                | Sakana Transformer², SVF                                                                           |
| **4**  | **Mixture-of-Experts (MoE)**       | Viele Teilmodelle ("Experten"), nur wenige aktiv pro Input                       | Riesige Skalierbarkeit bei geringeren Kosten pro Anfrage                               | ✅ Ja (meist)        | GPT-4, Gemini Ultra, MoE-Mamba                                                                     |
| **5**  | **Continuous Computation Models**  | Zeitdynamik auf Neuron-Ebene, interne "Denkschritte" unabhängig von Input        | Biologisch inspiriert, sequentielle Verarbeitung wie im Gehirn                         | ❌ Nein              | Sakana CTM, Temporale Netzwerke                                                                    |
| **6**  | **Test-Time Compute Models**       | Zusätzliche Rechenzeit während Inferenz für bessere Ergebnisse                   | "Denken" länger über schwierige Probleme, Chain-of-Thought zur Laufzeit                | ✅ Ja                | OpenAI o1, o3                                                                                      |
| **7**  | **Multimodale Modelle**            | Text, Bild, Audio, Video in einheitlicher Architektur verarbeitet                | Kombinierte Verständnis & Generierung über Datentypen hinweg                           | ✅ Ja                | GPT-4o, Gemini Pro, Claude 3                                                                       |
| **8**  | **Retrieval-Augmented Generation** | Externe Wissensquellen dynamisch zur Laufzeit einbinden                          | Zugriff auf aktuelle Informationen, reduziert Halluzinationen                          | ✅ Ja (meist)        | RAG-Systeme, Perplexity                                                                            |
| **9**  | **Diffusionsmodelle für Text**     | Schrittweise Rauschentfernung statt direktes Sampling                            | Präzise Kontrolle über Stil, Struktur und Textgenerierung                              | ⚠️ Hybrid           | Experimentelle Textgeneratoren [Diffusionmodel](https://huggingface.co/spaces/multimodalart/Dream) |
| **10** | **Neurosymbolische Ansätze**       | Kombination neuronaler Netze mit symbolischer KI und Logik                       | Verbesserte Reasoning-Fähigkeiten und logische Schlussfolgerungen                      | ⚠️ Hybrid           | Forschungsprototypen, Logic-LMs                                                                    |

**Legende:**

**Transformer-basiert:**

- ✅ **Ja**: Basiert vollständig auf Transformer-Architektur
- ❌ **Nein**: Komplett neue Architektur ohne Transformer-Komponenten
- ⚠️ **Hybrid**: Kombiniert Transformer mit anderen Ansätzen

**Entwicklungsstatus:**

- **Produktiv**: Bereits in kommerziellen Produkten verfügbar
- **Experimentell**: Funktionsfähige Prototypen, noch nicht produktionsreif
- **Forschung**: Frühe Forschungsphase, Konzeptnachweis

## Trends für 2026ff:

- **Memory-Revolution**: Architekturen mit neuralen Gedächtnis-Modulen
- **SSM-Adoption**: Lineare Skalierung wird Standard für lange Sequenzen
- **Runtime-Adaptation**: Modelle passen sich dynamisch ohne Retraining an
- **Hybrid-Ansätze**: Kombination verschiedener Architekturen für optimale Leistung


**Warum ist das wichtig?** Diese neuen Ansätze könnten die Dominanz von Transformern besonders dort verändern, wo Effizienz und Geschwindigkeit entscheidend sind.


---

## Abgrenzung zu verwandten Dokumenten

| Dokument                                                 | Frage                                                                                 |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [Tokenizing & Chunking](./tokenizing-chunking.html) | Wie wird Text für Modelle in verarbeitbare Einheiten zerlegt?                         |
| [Embeddings](./embeddings.html)                     | Wie wird Bedeutung als Vektor darstellbar gemacht?                                    |
| [Fine-Tuning](../04-modelle-provider/fine-tuning.html)         | Wann reicht die Grundarchitektur nicht mehr und Anpassung per Training wird relevant? |

---

**Version:**    1.0<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
