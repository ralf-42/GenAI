---
layout: default
title: Start
nav_order: 1
description: "Generative KI mit LangChain & LangGraph"
permalink: /
---

# Generative KI

> **Generative KI. Verstehen. Anwenden. Gestalten. - Praktische Implementierungen mit LangChain, LangGraph und modernen Foundation Models**

## 1 🎯 Übersicht

Entwicklung und Implementierung von **Generative AI Anwendungen** mit **LangChain 1.0+**, **LangGraph** und modernen **Foundation Models**.
Praxisorientierte Notebooks, wiederverwendbare Module und umfassende Dokumentation für produktionsreife GenAI-Systeme.

### 1.1 🔑 Kernthemen

- **LLM-Orchestrierung** mit LangChain 1.0+
- **RAG-Systeme** (Retrieval Augmented Generation)
- **Multimodale Anwendungen** (Text, Bild, Audio, Video)
- **Agents & Tools** für autonome Workflows
- **Prompt Engineering** und Output Parsing
- **Fine-Tuning** und Model Context Protocol (MCP)

---

## 2 🚀 Quick Start

**Installation:** Siehe [Quick Start Guide](ressourcen/quickstart.html)

```bash
# Projekt klonen
git clone https://github.com/ralf-42/GenAI.git
cd GenAI

# Environment & Dependencies
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Jupyter Lab starten
jupyter lab
```

---

## 3 📚 Dokumentation

### 3.1 📘 Standards & Best Practices

- **[LangChain Standards](ressourcen/standards.html#langchain)** - LangChain 1.0+ Patterns
- **[LangGraph Standards](ressourcen/standards.html#langgraph)** - State Machine Workflows
- **[LangSmith Standards](ressourcen/standards.html#langsmith)** - Monitoring & Debugging

### 3.2 🧩 Konzepte

- [**RAG-Konzepte**](concepts/RAG_Konzepte.html) - Retrieval Augmented Generation
- [**Prompt Engineering**](concepts/Prompt_Engineering.html) - Effektive Prompts gestalten
- [**Tool Use & Function Calling**](concepts/Tool_Use_Function_Calling.html) - LLMs mit Tools erweitern
- [**Agent Architekturen**](concepts/Agent_Architekturen.html) - ReAct, Chain-of-Thought, etc.
- [**State Management**](concepts/State_Management.html) - Zustandsverwaltung in LangGraph
- [**Evaluation & Testing**](concepts/Evaluation_Testing.html) - Systematische Qualitätssicherung
- [**Multi-Agent Systeme**](concepts/Multi_Agent_Systeme.html) - Kollaborative Agenten

### 3.3 🛠️ Frameworks

- [**LangChain Einsteiger**](frameworks/Einsteiger_LangChain.html) - Erste Schritte mit LangChain
- [**LangGraph Einsteiger**](frameworks/Einsteiger_LangGraph.html) - State Machines für Workflows
- [**LangSmith Einsteiger**](frameworks/Einsteiger_LangSmith.html) - Monitoring & Debugging
- [**ChromaDB Einsteiger**](frameworks/Einsteiger_ChromaDB.html) - Vektordatenbank für RAG
- [**Agent Builder Einsteiger**](frameworks/Einsteiger_Agent_Builder.html) - Agenten erstellen

### 3.4 📖 Guides

- [**Tools Übersicht**](tools.html) - Verfügbare Tools und Integrationen
- [**Troubleshooting**](ressourcen/troubleshooting.html) - Häufige Probleme lösen
- [**Deployment Guide**](ressourcen/deploy-python.html) - Python-Apps deployen

---

## 4 📦 Projekt-Struktur

```
GenAI/
├── 01_notebook/        # Jupyter Notebooks für Module
├── 02_daten/          # Trainingsdaten und Datasets
├── 03_skript/         # Dokumentation und Materialien
├── 04_modul/          # Python-Module (genai_lib)
├── 05_prompt/         # LangChain Prompt-Templates
├── 07_image/          # Bilder für Notebooks
├── docs/              # GitHub Pages Dokumentation
└── README.md
```

---

## 5 🎓 Module & Notebooks

### 5.1 Grundlagen

- **M00** - Kurs Intro
- **M01** - GenAI Intro
- **M02** - Modellsteuerung
- **M03** - Codieren mit GenAI

### 5.2 LangChain & LangGraph

- **M04a** - LangChain 101
- **M04b** - LangGraph 101
- **M06** - Chat Memory
- **M07** - Output Parser

### 5.3 RAG & Agents

- **M08** - RAG mit LangChain
- **M10** - Agenten mit LangChain

### 5.4 Multimodal

- **M09** - Multimodal Bild
- **M14** - Multimodal RAG
- **M15** - Multimodal Audio
- **M16** - Multimodal Video

### 5.5 Fortgeschritten

- **M11** - Gradio UI
- **M12** - Lokale Open Source Modelle
- **M13** - SQL RAG
- **M17** - Model Context Protocol (MCP)
- **M18** - Fine Tuning

---

## 6 🔧 genai_lib Module

Wiederverwendbare Python-Module in `04_modul/genai_lib/`:

- **utilities.py** - Helper-Funktionen (mprint, mermaid, setup_api_keys)
- **multimodal_rag.py** - Multimodales RAG-System
- **mcp_modul.py** - Model Context Protocol Integration

**Installation:**
```bash
pip install git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul
```

---

## 7 🌐 Ressourcen

- [**Dokumentation**](ressourcen/documentation.html) - Vollständige API-Referenz
- [**Quick Start**](ressourcen/quickstart.html) - Schnelleinstieg
- [**Standards**](ressourcen/standards.html) - Coding Standards
- [**Troubleshooting**](ressourcen/troubleshooting.html) - Problemlösungen

---

## 8 ⚖️ Rechtliches

- [**Impressum**](legal/impressum.html)
- [**Datenschutz**](legal/datenschutz.html)
- [**Haftungsausschluss**](legal/haftungsausschluss.html)

---

## 9 📞 Kontakt

- **GitHub:** [ralf-42](https://github.com/ralf-42)
- **Repository:** [GenAI](https://github.com/ralf-42/GenAI)
- **Issues:** [GitHub Issues](https://github.com/ralf-42/GenAI/issues)

---

**Lizenz:** MIT License - Copyright (c) 2025 Ralf
