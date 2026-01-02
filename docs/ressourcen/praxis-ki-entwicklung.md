---
layout: default
title: Praxis KI-Entwicklung
parent: Ressourcen
nav_order: 5
description: "Einblicke aus der Praxis: Von Training Runs bis Frontier Labs"
has_toc: true
---

# Praxis: KI-Entwicklung im Real-World Context
{: .no_toc }

> **Von der Forschung zur Produktion: Learnings aus OpenAI, Palantir und europäischen Frontier Labs**    

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Diese Seite bietet praxisnahe Einblicke in die Entwicklung von Large Language Models und KI-Produkten, basierend auf Erfahrungen von Johannes Otterbach (ex-OpenAI, Palantir, Merantix, SPRIN-D). Die Inhalte ergänzen das theoretische Kurswissen mit realen Herausforderungen aus der Industrie.

{: .info }
> **Kontext:** Johannes Otterbach war an der Entwicklung von GPT-2/GPT-3 bei OpenAI beteiligt und arbeitet heute an der SPRIN-D Initiative für europäische Frontier Labs.

---

# 1 | Training Runs: Die "YOLO Runs"

## 1.1 Was ist ein Training Run?

Ein **Training Run** für ein Large Language Model wie GPT-4 ist ein komplexer, mehrstufiger Prozess:

### Phasen eines Training Runs

1. **Kleine Modelle** (Hunderte bis Tausende) → Exploration
2. **Mittlere Modelle** (Dutzende) → Scaling Laws validieren
3. **Große Modelle** (wenige) → Performance-Bestätigung
4. **YOLO Run** (einer) → Das finale Produktionsmodell

{: .quote }
> "Du kannst nicht mit YOLO Approach reingehen, sondern ich hab so bisschen Gefühl, eine Vorhersage, was sind die Parameter, die Datensätze und die Modellarchitektur [...] die ich brauche, eine gewisse Performance zu erzielen."

### Die Scaling Laws (Skalierungsgesetze)

**Was sind Scaling Laws?**
- Man trainiert eine Batterie von Modellen (klein → mittel → groß)
- Konsistente Benchmarks über alle Größen hinweg
- **Vorhersage**: Welche Ressourcen brauche ich für ein *sehr großes* Modell?

**Warum "YOLO Run"?**
- **Kosten**: 10-50 Millionen Dollar pro Training Run (je nach Modellgröße)
- **Einmaligkeit**: Nur ein Versuch mit dem finalen Modell
- **Risiko**: GPU-Ausfälle können den gesamten Run stoppen

{: .warning }
> **Kostendimension GPT-4 Training:** Geschätzte 10-50 Millionen Dollar, abhängig von Datencenter, Stromkosten und GPU-Verfügbarkeit.

---

## 1.2 Die Engineering-Komplexität

### Hardware-Herausforderungen

**GPU-Cluster Setup:**
- **Typisch:** 10.000+ GPUs (z.B. NVIDIA H100)
- **Preis pro GPU:** ~30.000-40.000 Euro
- **Problem:** GPU-Ausfälle sind die **Regel**, nicht die Ausnahme

{: .quote }
> "Wenn eine GPU ausfällt, kann's passieren, dass das ganze Training lahmlegt. Dann warten irgendwie 9.999 GPUs auf die eine GPU, die ausgefallen ist [...] Da muss man den ganzen Trainings Run unterbrechen und wieder starten."

### Das Message Passing Interface (MPI) Problem

- **MPI**: Standard-Protokoll für GPU-Kommunikation (aus High Performance Computing)
- **Limitation**: Keine eingebaute Ausfalltoleranz
- **Folge**: Ein GPU-Ausfall = gesamter Run stoppt

**Engineering-Aufwand:**
- Checkpointing-Systeme entwickeln
- Redundanz einbauen
- Monitoring in Echtzeit

### Das Team-Paradox

{: .highlight }
> "Größenordnung 20-50 Leute im Team ist ausreichend für ein großes Sprachmodell, wenn du das Know-how hast."

**20-50 Leute** für Software mit **Milliarden Nutzern** → Das ist der Unterschied zu traditioneller Software-Entwicklung.

---

## 1.3 Die Beobachtungskultur

### Weights & Biases Obsession

{: .quote }
> "Du musst den Researchern den Zugang zum Interface blocken, wo sie den Trainingsrahmen beobachten. Weil die Leute gucken die ganze Zeit auf ihr Handy [...] direkt morgens nach dem Aufstehen wird Handy vom Nachttisch genommen und dann wird sich die Trainingskurve angeguckt."

**Warum so intensiv?**
- Trainingskurven zeigen: Konvergiert das Modell?
- Früherkennung von Problemen spart Millionen
- Saturierung = verschwendete Rechenzeit

---

# 2 | Von der Forschung zum Produkt

## 2.1 Der kritische Unterschied

{: .warning }
> **Kernaussage:** "Ein Open Source Modell ist kein Produkt. Für ein Produkt zu machen, kommen noch viel dazu."

### Was fehlt einem Open Source Modell?

| **Open Source Modell** | **Produkt** |
|------------------------|-------------|
| Rohes Basismodell | + Guardrails |
| Keine Safety-Layer | + System Prompts |
| Kein Deployment | + Skalierbare Infrastruktur |
| Keine Monitoring | + Prompt Injection Protection |
| Keine Fine-Tuning | + Supervised Fine-Tuning / RLHF |

**Beispiel aus dem Interview:**
- **Stable Diffusion** (Open Source) → **Black Forest Labs** (Produkt)
- Difference: Deployment, API, Safety, User Experience

---

## 2.2 Die Post-Training Pipeline

Nach dem YOLO Run kommen mehrere Schritte:

### 1. Supervised Fine-Tuning (SFT)
- Spezialisierung auf bestimmte Aufgaben (z.B. Code, Mathe)
- Produktmanager definieren Anforderungen

### 2. Reinforcement Learning from Human Feedback (RLHF)
- Menschliches Feedback integrieren
- **Problem:** Sycophantisches Verhalten (Schleimermodus)

{: .info }
> "Der Schleimermodus, genau. Also immer ja sagen oder immer deine Vermutung bestätigen."

### 3. Quantisierung
- Von BFloat16 zu kleineren Zahlenformaten
- **Ziel:** Mehr Modelle pro GPU laden, schnellere Inferenz

### 4. Destillation (Student-Teacher Approach)
- Großes Modell "unterrichtet" kleines Modell
- Effizienz für Deployment

---

## 2.3 Das Team-Setup

**Wer ist beteiligt?**

1. **Researcher:** Experimente, Skalierungsgesetze
2. **ML Engineers:** Training Runs, MLOPS
3. **Produktmanager:** Use Cases, Anforderungen
4. **Site Reliability Engineers:** Deployment, Kosten-Optimierung
5. **Safety Teams:** Guardrails, Alignment

---

# 3 | Reasoning & Innovation: o1-Preview vs. DeepSeek R1

## 3.1 Der Durchbruch: Reasoning-Modelle

**Was ist Reasoning?**
- Modelle, die "nachdenken" können (Chain-of-Thought)
- Lösen von mathematischen Problemen, komplexen Aufgaben

{: .quote }
> "Das Reasoning, das war schon eine Sache, die hat man bisschen früher angefangen. Das ging mit dem Lösen von mathematischen Problemen einher."

### OpenAI o1-Preview (September 2024)
- Erste öffentliche "Reasoning"-Modelle
- Sichtbarer Denkprozess (am Anfang)
- Fokus: Mathematik, Coding

### DeepSeek R1 (Dezember 2024)
- Chinesisches Open-Weight Reasoning-Modell
- **Innovation:** Effizienter trotz US-Chipbeschränkungen

---

## 3.2 Unfettered Research: Die Kultur der Kreativität

{: .highlight }
> **Konzept:** "Sunk Cost Rechenpower" → Forschern wird GPU-Budget gegeben, das sie auslasten *müssen*

**Warum funktioniert das?**
- Forscher probieren "saudumme Sachen" aus
- Keine ständige Rechtfertigung nötig
- Kreativität durch Freiheit

{: .quote }
> "Du musst dann manchmal saudumme Sachen probieren, weil du musst dir irgendwie diese Rechenpower auswerten. Und so kommst du dann auf diese kreativen Ideen."

### Beispiel: DeepSeek R1
- **Problem:** US-Export-Restriktionen für GPUs
- **Ansatz:** "Macht die Modelle kleiner und effizienter"
- **Resultat:** State-of-the-Art mit weniger Hardware

---

# 4 | Frontier Labs in Europa: Die SPRIN-D Initiative

## 4.1 Die Mission

{: .quote }
> "Die Vorstellung, in einer Welt zu leben, die sehr bipolar von chinesischer und US Tech dominiert ist, gefällt mir persönlich nicht. Ich würde gern, dass wir Tech entwickeln können, die auch das europäische Wertesystem mitnimmt."

**SPRIN-D Ziel:**
- 5-10 Frontier Labs in Europa etablieren
- Jeweils bis zu **1 Milliarde Euro** Fundraising-Potenzial
- Research + Deployment Companies

---

## 4.2 Kulturelle Herausforderungen

### Problem: European Mindset

{: .warning }
> "Hier in Europa denken wir es halt oftmals, ah, wir geben öffentliche Förderungen an Universitäten. Die bauen uns Modell, das machen wir Open Source. Und dann was? Da stehen wir."

**Unterschiede USA vs. Europa:**

| **USA** | **Europa** |
|---------|------------|
| Risikotoleranz hoch | Risikotoleranz niedrig |
| Deployment-Fokus | Research-Fokus |
| Schnelles Feedback | Lange Förderzyklen |
| Open AI, Anthropic | Universitäten, Open Source |

### Das Feedback-Loop Problem

**Warum Deployment kritisch ist:**
- OpenAI/Anthropic: Research → Produkt → Kunden → Feedback → Iteration
- Europa: Research → Paper → ... (kein Kunden-Feedback)

{: .quote }
> "Wir müssen wirklich diesen Prozess verstetigen, wie bauen wir diese Frontiermodelle, wie deployen wir sie und wie verbessern wir sie?"

---

## 4.3 Europäische Stärken (unterschätzt)

### 1. Multilingualität

{: .highlight }
> "Die multilingualen Sprachmodelle werden nicht in dem größten multilingualen Markt der Welt entwickelt. Europa hat 27 Mitgliedsstaaten."

**Opportunity:**
- Sprachbarrieren überwinden → EU als skalierender Markt
- Kulturelle Nuancen besser abbilden

### 2. Föderale Strukturen

**Vorteil für Multi-Agent-Systeme:**
- Viele kleine, spezialisierte Modelle
- Agentenökonomie statt einem Riesenmodell

### 3. Domain-Expertise

**Bereiche mit Potenzial:**
- **Manufacturing** (Maschinenbau)
- **Pharma** (Drug Development)
- **Agriculture** (Landwirtschaft)
- **Renewable Energy**

{: .quote }
> "Das sind nicht nur weiße große Sprachmodelle, sondern es kann auch sein, wir skalieren eine Agentenökonomie. Wir haben viele, viele kleine Modelle, die alle spezialisiert sind."

---

# 5 | Learnings für die KI-Challenge

## 5.1 Von "Magic" zu Engineering

{: .warning }
> **Mindset-Shift:** KI ist kein Blackbox-Magic, sondern experimentelle Wissenschaft mit klaren Engineering-Prinzipien.

### Was Sie aus den Praxis-Einblicken mitnehmen sollten:

**1. Iteration ist King**
- Kleine Experimente → Mittlere Validierung → Großer Run
- Nicht direkt auf YOLO gehen

**2. Benchmarks sind essentiell**
- Was ich nicht messen kann, kann ich nicht optimieren
- Definieren Sie klare Erfolgsmetriken

**3. Deployment ≠ Training**
- Ein trainiertes Modell ist erst der Anfang
- Guardrails, System Prompts, Monitoring

**4. Feedback-Loops**
- User-Feedback frühzeitig einholen
- Iterieren basierend auf realen Use Cases

---

## 5.2 Praktische Takeaways für Ihr Projekt

### ✅ Do's

- **Start small:** Nutzen Sie bestehende Modelle (OpenAI, Anthropic)
- **Fokus auf Deployment:** Gradio, Streamlit → echte User testen lassen
- **Messbare Ziele:** Definieren Sie Benchmarks (Accuracy, Latenz, User Satisfaction)
- **Guardrails früh:** System Prompts, Prompt Injection Prevention
- **Dokumentation:** README.md mit Setup, Learnings, Limitierungen

### ❌ Don'ts

- **Nicht von Grund auf trainieren:** Sie haben nicht 10-50 Mio. Dollar
- **Kein "Open Source = fertig":** Ein Modell allein ist kein Produkt
- **Keine Blackbox:** Verstehen Sie, was Ihr Modell tut (oder nicht tut)
- **Kein Overengineering:** MVP first, dann iterieren

---

## 5.3 Die "Produktmanager"-Perspektive

{: .quote }
> "OpenAI sind's inzwischen die Produktmanager, dann sagen, okay, wir brauchen Modell zum Beispiel, das supergut ist auf Reasoning für Mathe oder [...] ich, wir müssen die Coding Modelle bisschen hochtreiben."

**Was bedeutet das für Sie?**
- Definieren Sie Ihr **Use Case** klar: Was soll das Modell können?
- **Fine-Tuning-Bedarf:** Brauchen Sie Spezialisierung? (z.B. Jura, Medizin)
- **Trade-offs:** Geschwindigkeit vs. Accuracy, Kosten vs. Qualität

---

# 6 | Weiterführende Ressourcen

## Empfohlene Lektüre

- **OpenAI Cookbook:** [https://cookbook.openai.com/](https://cookbook.openai.com/)
- **Anthropic Documentation:** [https://docs.anthropic.com/](https://docs.anthropic.com/)
- **LangChain Production Best Practices:** [https://python.langchain.com/docs/guides/productionization/](https://python.langchain.com/docs/guides/productionization/)

## Relevante Kurs-Module

- **Modul 10:** Agents (praktische Anwendung)
- **Modul 18:** Fine-Tuning (Spezialisierung)
- **Modul 19:** Modellauswahl (Trade-offs verstehen)
- **Modul 23:** KI-Challenge (End-to-End Projekt)

## Podcasts & Interviews

- **AI To the DNA:** Johannes Otterbach Interview (Quelle dieser Seite)
- **Latent Space Podcast:** Frontier Labs, Scaling Laws
- **The Cognitive Revolution:** AI Safety, Alignment

---

# 7 | Glossar

| **Begriff** | **Erklärung** |
|-------------|---------------|
| **YOLO Run** | "You Only Live Once" - Der finale, teure Training Run für ein Produktionsmodell |
| **Scaling Laws** | Gesetzmäßigkeiten, die Performance-Verbesserungen bei größeren Modellen vorhersagen |
| **Frontier Lab** | Research + Deployment Company an der Spitze der KI-Entwicklung |
| **Unfettered Research** | Forschungskultur mit hoher Freiheit und GPU-Budget ohne ständige Rechtfertigung |
| **Sycophantic Behavior** | "Schleimermodus" - Modell bestätigt immer die Annahmen des Users |
| **Guardrails** | Sicherheitsmechanismen, die unerwünschtes Modellverhalten verhindern |
| **Quantisierung** | Reduzierung der Zahlenpräzision für schnellere Inferenz |
| **Destillation** | Übertragung von Wissen aus einem großen in ein kleines Modell |

---

**Version:** 1.0    
**Stand:** Januar 2025    
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.    
**Quelle:** Interview mit Johannes Otterbach (ex-OpenAI, SPRIN-D), Podcast "AI To the DNA"    



