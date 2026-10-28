---
layout: default
title: Links
parent: Ressourcen
nav_order: 5
description: Kuratierte Sammlung externer Ressourcen zu KI, LLMs und Frameworks
has_toc: true
---

# Links
{: .no_toc }

> [!NOTE] Kuratierte Links<br>
> Die Sammlung verweist auf externe Dokumentationen, Benchmarks, Lernressourcen und Tools für die Kursarbeit.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## KI-Modelle & Benchmarks

Vergleichsplattformen und Datenbanken für KI-Modelle.

| Ressource                                                                         | Beschreibung                                                             |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard)                | Benchmark für Embedding-Modelle                                          |
| [LMArena Leaderboard](https://lmarena.ai/de/leaderboard)                          | Vergleich der besten Frontier AI Modelle                                 |
| [Models.dev](https://models.dev/)                                                 | Open-Source Datenbank von KI-Modellen                                    |
| [Anthropic Economic Index](https://www.anthropic.com/economic-index#job-explorer) | Wirtschaftliche Auswirkungen von KI auf Berufe                           |
| [Anthropic Economic Index: US Usage](https://www.anthropic.com/economic-index#us-usage) | Nutzungsmuster von KI in den USA innerhalb des Economic Index            |
| [Diffusion Model](https://chat.inceptionlabs.ai/)                                 | Chat-Interface für Mercury – Diffusion Language Model - inceptionlabs.ai |
| [Artificial Analysis](https://artificialanalysis.ai/)                             | Unabhängiger Vergleich von KI-Modellen nach Leistung, Preis und Geschwindigkeit |

---

## Lernressourcen & Visualisierungen

Interaktive Erklärungen und Kurse zum Verständnis von KI.

| Ressource                                                                  | Beschreibung                                                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [CNN Explainer](https://poloclub.github.io/cnn-explainer/)                 | Interaktive Visualisierung von Convolutional Neural Networks        |
| [Transformer Explainer](https://poloclub.github.io/transformer-explainer/) | LLM Transformer-Architektur visuell erklärt                         |
| [Generative AI - FT](https://ig.ft.com/generative-ai/)                     | "Generative AI exists because of the transformer" - Financial Times |
| [DeepLearning.AI Courses](https://www.deeplearning.ai/courses/)            | Kurse von Andrew Ng zu Deep Learning und KI                         |
| [Zukunftszentrum KI NRW](https://www.zukunftszentrum-ki.nrw/)              | Praxisnahe Orientierung zu KI-Einführung, Digitalisierung und Weiterbildung in Unternehmen |
| [KV Cache (YouTube)](https://youtu.be/tGp6Ns9GtSU?si=vENFJCSD62RtF7vM)     | Erklärvideo zum Key-Value Cache bei Transformer-Modellen            |
| [Prompt Cache (YouTube)](https://youtu.be/u57EnkQaUTY?si=5prPK8YpW7oAF8K7) | Erklärvideo zu Prompt Caching und wiederverwendeten Kontexten       |

---

## OpenAI

Offizielle OpenAI Ressourcen und Dokumentation.

| Ressource | Beschreibung |
|-----------|--------------|
| [Platform Overview](https://platform.openai.com/docs/overview) | Übersicht der OpenAI Platform |
| [API Reference](https://platform.openai.com/docs/api-reference/introduction) | Vollständige API-Dokumentation |
| [OpenAI Cookbook](https://cookbook.openai.com/) | Beispiele und Best Practices |
| [OpenAI Chat](https://platform.openai.com/chat) | Chat-Interface der Platform |
| [openai-fm (GitHub)](https://github.com/openai/openai-fm) | Demo-Code für die OpenAI Speech API |
| [Organization Settings](https://platform.openai.com/settings/organization/general) | Organisationseinstellungen |

---

## LangChain Ökosystem

LangChain, LangGraph, LangSmith und verwandte Tools.

| Ressource | Beschreibung |
|-----------|--------------|
| [LangChain Reference](https://reference.langchain.com/python/langchain/) | Offizielle LangChain Python-Referenz |
| [LangGraph Reference](https://reference.langchain.com/python/langgraph/) | Offizielle LangGraph Python-Referenz |
| [LangSmith](https://eu.smith.langchain.com/) | Monitoring & Debugging Platform |
| [LangSmith Hub](https://smith.langchain.com/hub) | Community Prompts und Chains |
| [Open Canvas](https://opencanvas.langchain.com/) | Visueller Workflow-Editor |
| [ChromaDB-Dokumentation](https://docs.trychroma.com/) | Collections, Embeddings, Suche und lokale Persistenz für RAG |
| [Pydantic-Dokumentation](https://docs.pydantic.dev/latest/) | Datenmodelle, Felder und Validierung für strukturierte Ausgaben |

---

## RAG & Chunking

Tools zum Anzeigen und Evaluieren von Chunking-Strategien für Retrieval-Augmented Generation.

| Ressource | Beschreibung |
|-----------|--------------|
| [Chunkwise](https://chunkwise.github.io/) | Open-Source-Plattform zur Visualisierung, Evaluation und zum Vergleich von Chunking-Workflows für RAG; selbstverwalteter AWS-Deploy, Projektseite mit Walkthrough |
| [Open RAG Eval (GitHub)](https://github.com/vectara/open-rag-eval) | Open-Source-Python-Toolkit zur Evaluation von RAG-Pipelines und zum Vergleich von Chunk-Größen und Überlappungen; lokale Ausführung erforderlich |
| [RAG Chunking Simulator](https://a2z.tools/rag-chunking-simulator) | Frei zugänglicher Browser-Visualizer für einfache Chunking-Strategien; zeigt Chunk-Grenzen und Tokenverteilung, ersetzt keine Retrieval-Evaluation |
| [apprun.icu AI-Tools](https://apprun.icu/ai-tools/) | Übersicht kostenloser Browser-Tools für KI-Anwendungen, darunter der Chunking Strategy Comparator |

---

## Model Context Protocol (MCP)

Standard-Protokoll für die Kommunikation zwischen LLMs und externen Tools/Datenquellen.

| Ressource | Beschreibung |
|-----------|--------------|
| [MCP Docs - Getting Started](https://modelcontextprotocol.io/docs/getting-started/intro) | Offizielle MCP-Dokumentation und Einführung |
| [FastMCP](https://gofastmcp.com/getting-started/welcome) | Schneller Einstieg in MCP mit Python |
| [LangChain MCP Adapters](https://github.com/langchain-ai/langchain-mcp-adapters) | MCP-Integration für LangChain |
| [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) | Tool zum Testen und Debuggen von MCP-Servern |

---

## Agentische Anwendungen

Ressourcen für Tool Use, Agenten-Patterns und agentische GenAI-Systeme.

| Ressource | Beschreibung |
|-----------|--------------|
| [Google Cloud - Was sind KI-Agenten?](https://cloud.google.com/discover/what-are-ai-agents?hl=de) | Einführung in KI-Agenten und agentische Anwendungsmuster |
| [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) | Grundlagenpaper zum Zusammenspiel von Denken und Handeln in LLM-Systemen |
| [Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761) | Grundlagenpaper zu Tool Use |
| [Self-RAG](https://arxiv.org/abs/2310.11511) | Retrieval, Generierung und Selbstkritik in einem RAG-nahen Verfahren |
| [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) | OpenAI-Framework für agentische Anwendungen |
| [KI-Agenten-Orchestrierung]({{ '/visualisierungen/ki_agent_architektur/' | relative_url }}){:target="_blank" rel="noopener"} | Interaktive Visualisierung zur Funktionsweise von KI-Agenten |

---

## Sicherheit & Governance

Rahmenwerke und Empfehlungen für Sicherheitsrisiken und verantwortungsvolle Entwicklung generativer KI.

| Ressource | Beschreibung |
|-----------|--------------|
| [OWASP GenAI LLM Top 10 (2026)](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) | Aktuelle Übersicht zentraler Sicherheitsrisiken in LLM-Anwendungen |
| [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | Freiwilliger Rahmen für KI-Risikomanagement und Governance |

---

## Computer Vision

Frameworks und Tools für Bildverarbeitung und Objekterkennung.

| Ressource                                                                               | Beschreibung                                                 |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [Ultralytics YOLO](https://www.ultralytics.com/de)                                      | Computer Vision Framework (Objekterkennung, Segmentierung)   |
| [CNN Explainer](https://poloclub.github.io/cnn-explainer/)                              | Interaktive Visualisierung von Convolutional Neural Networks |
| [MediaPipe Studio](https://mediapipe-studio.webapps.google.com/home)                    | Google ML-Lösungen für Vision, Text und Audio                |
| [MediaPipe Solutions Guide](https://ai.google.dev/edge/mediapipe/solutions/guide?hl=de) | Dokumentation der MediaPipe-Lösungen                         |
| [MediaPipe Samples — Face Detector](https://google-ai-edge.github.io/mediapipe-samples-web/#/vision/face_detector) | Browser-Demo zur Gesichtserkennung mit MediaPipe |

---

## Hugging Face

Community-Platform für Machine Learning.

| Ressource | Beschreibung |
|-----------|--------------|
| [Hugging Face](https://huggingface.co/) | Die AI Community Platform |
| [Transformers Docs](https://huggingface.co/docs/transformers/index) | Dokumentation der Transformers-Bibliothek |

---

## Fine-Tuning

Ressourcen zur Anpassung von Sprachmodellen auf eigene Daten.

| Ressource | Beschreibung |
|-----------|--------------|
| [Unsloth Docs](https://unsloth.ai/docs/de) | Fine-Tuning von LLMs mit minimalem Speicherbedarf – unterstützt LLaMA, Mistral, Gemma u. a. |

---

## Sonstiges

| Ressource | Beschreibung |
|-----------|--------------|
| [OpenCode](https://opencode.de/de) | Open-Source KI-Coding-Assistent für das Terminal – Alternative zu Claude Code |
| [Google Colab CLI](https://github.com/googlecolab/google-colab-cli) | Kommandozeilen-Tool für den Zugriff auf Google Colab-Notebooks vom Terminal aus |
| [Loriot - Pneumatische Plastologie](https://www.youtube.com/watch?v=7WhL5Kw2MKE) | Klassiker: "Körperteile vergrößern durch Atmung" |


## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Zuerst lesen](../zuerst-lesen.html) | Welche Dokumente sind vor dem ersten Kursprojekt am wichtigsten? |
| [Lesepfade](../lesepfade.html) | Welche Reihenfolge passt zu Rolle, Ziel und Vorkenntnissen? |

---

**Version:** 1.4<br>
**Stand:** Oktober 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
