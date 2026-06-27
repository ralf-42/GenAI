---
layout: default
title: Sampling-Parameter
parent: Prompting & RAG
nav_order: 4
description: "Temperature, Top-p und Top-k: Wie Sampling-Parameter die Ausgabe klassischer Sprachmodelle steuern"
has_toc: true
---

# Sampling-Parameter
{: .no_toc }

> **Sampling-Parameter steuern, wie ein Modell aus möglichen nächsten Tokens auswählt. Sie verändern nicht das Wissen des Modells, sondern die Auswahlstrategie bei der Generierung.**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# Warum Sampling wichtig ist

Ein Sprachmodell berechnet für das nächste Token nicht nur eine einzige Möglichkeit, sondern eine Wahrscheinlichkeitsverteilung über viele mögliche Tokens. Sampling-Parameter bestimmen, wie aus dieser Verteilung ausgewählt wird.

Bei vielen klassischen Sprachmodellen gilt:

- niedrige Werte führen zu stabileren, vorhersehbareren Antworten
- höhere Werte führen zu mehr Variation und Kreativität
- zu hohe Werte erhöhen das Risiko unpassender oder ungenauer Formulierungen

Sampling ist deshalb besonders relevant, wenn man zwischen Konsistenz und Vielfalt abwägen muss.

# Temperature

**Temperature** steuert, wie stark Unterschiede zwischen Token-Wahrscheinlichkeiten betont oder abgeflacht werden.

| Temperature | Wirkung |
| ----------- | ------- |
| **niedrig** | wahrscheinliche Tokens werden stärker bevorzugt; die Ausgabe wird stabiler |
| **mittel** | ausgewogenes Verhältnis zwischen Stabilität und Variation |
| **hoch** | seltenere Tokens bekommen mehr Chancen; die Ausgabe wird vielfältiger, aber riskanter |

Beispiel: Wenn ein Modell nach „Der Himmel ist ...“ sehr sicher „blau“ erwartet, macht eine niedrige Temperature diese Auswahl noch dominanter. Eine höhere Temperature gibt auch weniger wahrscheinlichen Alternativen mehr Gewicht.

Temperature erzeugt kein neues Wissen. Sie verändert nur, wie stark die vorhandene Wahrscheinlichkeitsverteilung zugespitzt oder geglättet wird.

# Top-p

**Top-p** wird auch **Nucleus Sampling** genannt. Dabei werden die wahrscheinlichsten Tokens so lange gesammelt, bis ihre gemeinsame Wahrscheinlichkeit einen Schwellenwert erreicht.

Beispiel: Bei `top_p = 0.9` werden nur die wahrscheinlichsten Tokens berücksichtigt, deren kumulierte Wahrscheinlichkeit zusammen etwa 90 Prozent erreicht. Aus dieser Kandidatenmenge wird dann ausgewählt.

| Top-p | Wirkung |
| ----- | ------- |
| **niedrig** | kleine Kandidatenmenge, konservativere Antworten |
| **hoch** | größere Kandidatenmenge, mehr Variation |
| **1.0** | praktisch keine Einschränkung durch Top-p |

Der Vorteil: Top-p passt sich dynamisch an die Verteilung an. Wenn das Modell sehr sicher ist, bleibt die Auswahl klein. Wenn mehrere Fortsetzungen plausibel sind, kann sie größer werden.

# Top-k

**Top-k** begrenzt die Auswahl auf die `k` wahrscheinlichsten Tokens.

Beispiel: Bei `top_k = 10` kommen nur die zehn wahrscheinlichsten Tokens als nächstes Token infrage. Alle anderen werden ausgeschlossen.

| Top-k | Wirkung |
| ----- | ------- |
| **klein** | fokussiertere, vorhersehbarere Antworten |
| **größer** | mehr Vielfalt und stilistische Variation |
| **sehr groß** | nähert sich einer Auswahl aus sehr vielen möglichen Tokens |

Top-k ist einfach zu verstehen, aber weniger flexibel als Top-p. Es berücksichtigt immer gleich viele Kandidaten, auch wenn die Wahrscheinlichkeitsverteilung je nach Situation sehr unterschiedlich ist.

# Zusammenspiel

In vielen Sampling-Verfahren wird zuerst die Wahrscheinlichkeitsverteilung durch Temperature verändert. Danach begrenzen Top-p oder Top-k, welche Tokens überhaupt zur Auswahl stehen.

Vereinfacht:

1. Das Modell berechnet Wahrscheinlichkeiten für mögliche nächste Tokens.
2. Temperature macht die Verteilung schärfer oder flacher.
3. Top-p oder Top-k beschränken die Kandidatenmenge.
4. Aus dieser Menge wird das nächste Token gewählt.

Für viele Aufgaben reicht eine einfache Daumenregel:

| Ziel | Typische Einstellung |
| ---- | -------------------- |
| Fakten, Extraktion, strukturierte Antworten | niedrige Temperature, engere Auswahl |
| Brainstorming, Stilvarianten, kreative Texte | höhere Temperature, offenere Auswahl |
| Reproduzierbare Tests | möglichst deterministische Einstellungen, falls vom Anbieter unterstützt |

# Hinweis zu Reasoning-Modellen

Neuere Reasoning-Modelle steuern die Antwortqualität oft weniger über klassische Sampling-Parameter und stärker über interne Rechenzeit, Reasoning-Aufwand oder modellseitige Strategien. Anbieter benennen und konfigurieren diese Mechanismen unterschiedlich.

Für die Praxis bedeutet das:

- Bei klassischen Chat- oder Completion-Modellen bleiben `temperature`, `top_p` und teilweise `top_k` wichtige Stellschrauben.
- Bei Reasoning-Modellen können diese Parameter eingeschränkt, weniger relevant oder gar nicht verfügbar sein.
- Präzise Prompts, passende Modellwahl und klare Bewertungskriterien bleiben wichtiger als das Drehen an Sampling-Werten.

# Interaktive Visualisierung

- [LLM Sampling Simulator](https://editor.p5js.org/ralf.bendig.rb/full/LBc3t3yP4)

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
| -------- | ----- |
| [Large Language Models](../03-grundlagen/large-language-models.html) | Was ist ein LLM und warum sind Transformer wichtig? |
| [Tokenizing & Chunking](../03-grundlagen/tokenizing-chunking.html) | Wie werden Texte in Tokens und Chunks zerlegt? |
| [Context Engineering](./context-engineering.html) | Welche Informationen gehören in den Kontext eines Modellaufrufs? |

---

**Version:** 1.0<br>
**Stand:** Juni 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
