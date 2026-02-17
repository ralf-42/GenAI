---
layout: default
title: KI-Challenge
parent: Projekte
nav_order: 2
description: "Praxisprojekt: End-to-End GenAI-Anwendung entwickeln"
has_toc: true
---

# KI-Challenge
{: .no_toc }

> **Praxisprojekt: End-to-End GenAI-Anwendung entwickeln**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---


# 1 | Überblick KI-Challenge


Die KI-Challenge dient als praktische Anwendung und Integration der in den Kursmodulen erlernten Konzepte und Techniken. Ziel ist es, eine funktionsfähige KI-Anwendung zu entwickeln, die mehrere Aspekte der generativen KI kombiniert und einen praktischen Nutzen bietet.

## 1.1 Lernziele

- Integration mehrerer Technologien aus den Kursmodulen
- Praktische Anwendung von LLM-basierten Lösungen
- Entwicklung einer vollständigen End-to-End-Anwendung
- Präsentation und Dokumentation der eigenen Lösung

## 1.2 Voraussetzungen

- Abschluss der Module M01–M10
- Kenntnisse in Python und LangChain 1.0+
- Zugriff auf API-Keys (OpenAI, Hugging Face)
- Grundlegende Vertrautheit mit Gradio für UI-Entwicklung (M13)



## 1.3 Praxiseinblick: Von der Idee zum Deployment

{: .highlight }
> "Ein Open Source Modell ist kein Produkt. Für ein Produkt zu machen, kommen noch viel dazu."
> — Johannes Otterbach (ex-OpenAI, SPRIN-D)

Die KI-Challenge bereitet Sie auf **realistische Herausforderungen** vor, die in der Industrie täglich auftreten:

### Was unterscheidet ein Experiment von einem Produkt?

| **Experiment/Notebook** | **Produkt (Challenge-Ziel)** |
|-------------------------|------------------------------|
| Code läuft einmal | Robuster, wiederholbarer Code |
| Keine Fehlerbehandlung | Graceful Error Handling |
| Lokale Umgebung | Deployment-ready (Gradio, Streamlit) |
| Keine Dokumentation | README.md, Setup-Anleitung |
| "Es funktioniert bei mir" | Reproduzierbar für andere |

### Learnings aus der Praxis

**1. Engineering > Hype**
- Training Runs kosten Millionen und erfordern präzise Planung
- **Ihr Projekt:** Definieren Sie klare Benchmarks, bevor Sie starten
- **Takeaway:** Messbarkeit ist der Schlüssel zum Erfolg

**2. Iteration & Feedback**
- Frontier Labs (OpenAI, Anthropic) iterieren regelmäßig basierend auf User-Feedback
- **Ihr Projekt:** Testen Sie früh mit echten Nutzern (Familie, Freunde, Kommilitonen)
- **Takeaway:** MVP first, dann verfeinern

**3. Produkt-Mindset**
- Guardrails, System Prompts, Prompt Injection Prevention
- **Ihr Projekt:** Implementieren Sie mindestens einen Safety-Layer (z.B. Middleware)
- **Takeaway:** Robustheit > Features

{: .info }
> **Empfehlung:** Lesen Sie die [Praxis-Einblicke KI-Entwicklung](../ressourcen/praxis-ki-entwicklung.md) für detaillierte Insights aus OpenAI, Palantir und europäischen Frontier Labs.

### Konkrete Tipps für Ihre Challenge

✅ **Do's:**
- Start small: Nutzen Sie bestehende Modelle (OpenAI, Groq, Anthropic)
- Fokus auf Deployment: Gradio/Streamlit → echte User testen lassen
- Messbare Ziele: Definieren Sie 3-5 Erfolgsmetriken
- Frühes Feedback: Zeigen Sie Ihr MVP so früh wie möglich

❌ **Don'ts:**
- Nicht von Grund auf trainieren (kein 10-50 Mio. Dollar Budget 😉)
- Kein "Open Source = fertig": Ein Modell allein ist kein Produkt
- Keine Blackbox: Verstehen Sie, was Ihr Modell tut
- Kein Overengineering: Lieber 3 Features perfekt als 10 halbfertig

---

# 2 | Projektoptionen


Zur Auswahl stehen vier verschiedene Projekttypen, die jeweils unterschiedliche Aspekte der generativen KI betonen. Wählen Sie eine Option aus oder kombinieren Sie Elemente verschiedener Optionen.

## 2.1 Dokumentenanalyse-Assistent

**Beschreibung:** Ein System, das PDF-Dokumente, Word-Dateien oder Textdateien verarbeitet und intelligente Zusammenfassungen, Antworten auf Fragen oder strukturierte Analysen liefert.

**Kernelemente:**
- RAG-Pipeline mit Vektordatenbank (ChromaDB)
- Dokumentenverarbeitung und Chunking
- Intelligentes Prompting für die Analyse
- Benutzeroberfläche mit Gradio

**Erwartete Module:**
- M04 (LangChain 101)
- M06 (Structured Output)
- M08 (RAG)
- M09 (SQL RAG – optional für strukturierte Metadaten)
- M13 (Gradio)

## 2.2 Multimodaler Assistent

**Beschreibung:** Ein Assistent, der Bild, Text und optional Audio verarbeiten kann, um komplexe Aufgaben zu erfüllen oder Informationen zu analysieren.

**Kernelemente:**
- Integration von Bild- und Texterkennung
- Multimodale Prompt-Strategien
- Kontextbewusste Antworten
- Interaktive Benutzeroberfläche

**Erwartete Module:**
- M04 (LangChain 101)
- M05 (LLMs und Transformer)
- M07 (Chat und Memory)
- M13 (Gradio)
- M16 (Multimodal Bild)
- M18 (optional: Multimodal Audio)

## 2.3 Agentenbasiertes System

**Beschreibung:** Ein System mit mehreren spezialisierten Agenten, die zusammenarbeiten, um komplexe Aufgaben zu lösen oder Workflow-Prozesse zu automatisieren.

**Kernelemente:**
- Multi-Agenten-Architektur
- Werkzeugintegration (APIs, Datenbanken)
- Middleware für Logging, Safety und Retry
- Benutzerinteraktion und Transparenz

**Erwartete Module:**
- M04 (LangChain 101)
- M10 (Agenten)
- M11 (Middleware)
- M12 (MCP – optional für externe Tool-Integration)
- M13 (Gradio)
- M14 (optional: Lokale Modelle)

## 2.4 Domänen Fachexperte

**Beschreibung:** Ein spezialisierter Assistent für ein bestimmtes Fachgebiet (z.B. Recht, Medizin, Finanzen, Marketing), der tiefgreifendes Fachwissen bereitstellt und domänenspezifische Aufgaben löst.

**Kernelemente:**
- Fachspezifische Wissensdatenbank
- Spezialisierte Prompts und Output-Strukturen
- Benutzeroberfläche für Fachexperten
- Optional: Feinabstimmung eines bestehenden Modells

**Erwartete Module:**
- M04 (LangChain 101)
- M06 (Structured Output)
- M08 (RAG)
- M09 (SQL RAG – für strukturierte Fachdaten)
- M13 (Gradio)
- M15 (optional: Fine-Tuning)

# 3 | Projekt-Setup

Hier finden Sie den Code für das grundlegende Setup Ihres Projekts mit **LangChain 1.0+** Best Practices.

## 3.1 Environment Setup

```python
#@title 🔧 Umgebung einrichten { display-mode: "form" }
# genai_lib installieren (empfohlen)
!uv pip install --system -q git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul

from genai_lib.utilities import check_environment, setup_api_keys

# API-Keys konfigurieren
setup_api_keys(['OPENAI_API_KEY', 'HF_TOKEN'], create_globals=False)

# Environment checken
check_environment()
```

## 3.2 LangChain 1.0+ Imports

```python
# ✅ LangChain 1.0+ - Moderne Imports (PFLICHT!)

# Model Initialization
from langchain.chat_models import init_chat_model

# Document Processing
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Embeddings & Vectorstores
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

# Messages & Prompts
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# LCEL & Output Parsing
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# Tools & Agents (falls benötigt)
from langchain.agents import create_agent
from langchain_core.tools import tool

# Middleware (falls benötigt)
from langchain.agents.middleware import (
    before_model, after_model, wrap_tool_call,
    HumanInTheLoopMiddleware,
    ModelRetryMiddleware, ToolRetryMiddleware
)

print("✅ LangChain 1.0+ Imports erfolgreich")
```

# 4 | Projektstruktur


Ein erfolgreiches Abschlussprojekt sollte folgende Komponenten enthalten:

## 4.1 Problemdefinition und Anforderungen

- Klare Beschreibung des Problems oder der Aufgabe
- Definition der Anforderungen und Erfolgskriterien
- Abgrenzung des Projektumfangs

## 4.2 Datenstrukturen und Modellauswahl

- Auswahl und Begründung der verwendeten Modelle
- Datenstrukturen und Datenvorbereitung
- Embedding-Strategien (bei RAG-Anwendungen)

## 4.3 Kernfunktionalität

- LangChain-Pipelines oder -Ketten
- Prompt-Engineering und Templates
- Integration mit externen APIs oder Datenquellen

## 4.4 Benutzeroberfläche und Interaktion

- Gradio-Interface für die Interaktion
- Benutzerführung und Feedback
- Fehlerbehandlung und Robustheit

## 4.5 Evaluation und Tests

- Testfälle für verschiedene Szenarien
- Bewertung der Modellleistung
- Benutzerfeedback und Verbesserungen

## 4.6 Dokumentation und Präsentation

- Projektdokumentation (Markdown oder PDF)
- Code-Kommentare und Erklärungen
- Präsentation der Ergebnisse

# 5 | Bewertungskriterien


Die  KI-Challenge wird anhand folgender Kriterien bewertet:

| Kriterium | Beschreibung | Gewichtung |
|-----------|--------------|------------|
| **Funktionalität** | Die Anwendung erfüllt die definierten Anforderungen und funktioniert zuverlässig | 30% |
| **Integration** | Erfolgreiche Kombination mehrerer Technologien und Module aus dem Kurs | 25% |
| **Code-Qualität** | Sauberer, lesbarer und gut strukturierter Code mit LangChain 1.0+ Best Practices | 15% |
| **Innovation** | Kreative Lösungsansätze und eigenständige Weiterentwicklung der Konzepte | 15% |
| **Dokumentation** | Vollständige und verständliche Dokumentation des Projekts (README.md) | 15% |

## 5.1 Abgabe-Anforderungen

**Pflicht-Deliverables:**

1. **Jupyter Notebook** (`.ipynb`)
   - Vollständiger, ausführbarer Code
   - Markdown-Zellen mit Erklärungen
   - Strukturiert nach Projektphasen (Setup, Implementierung, Evaluation)
   - Alle Zellen müssen von oben nach unten ausführbar sein

2. **README.md**
   - Projektbeschreibung und Motivation
   - Verwendete Technologien und Module
   - Setup-Anleitung (Installation, API-Keys)
   - Nutzungsanleitung mit Screenshots
   - Ergebnisse und Learnings
   - Bekannte Limitierungen

**Optional (Bonus):**
- Video-Demo
- GitHub Repository mit sauberem Commit-History
- Deployment-Link (z.B. Hugging Face Spaces)

**Abgabeformat:**
- ZIP-Datei mit Ordnerstruktur: `Projekt_Name/` → `notebook.ipynb`, `README.md`, `data/` (falls benötigt)
- Oder: GitHub Repository Link

**Checkliste vor Abgabe:**
- [ ] Code läuft ohne Fehler durch
- [ ] LangChain 1.0+ Patterns verwendet (keine deprecated Features)
- [ ] README.md ist vollständig
- [ ] API-Keys sind NICHT im Code (nur Platzhalter oder .env-Verweis)
- [ ] Alle externen Abhängigkeiten sind dokumentiert
- [ ] Beispiel-Daten oder Download-Links sind enthalten

# 6 | Beispielprojekt: Doku-Assi (LangChain 1.0+)

Als Orientierung dient hier ein vereinfachtes Beispiel für einen Dokumentenanalyse-Assistenten mit **modernen LangChain 1.0+ Patterns**.

```python
# ✅ LangChain 1.0+ - Moderne Imports
from langchain.chat_models import init_chat_model
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.messages import HumanMessage, AIMessage
import gradio as gr

# API-Keys via genai_lib
from genai_lib.utilities import setup_api_keys
setup_api_keys(['OPENAI_API_KEY'], create_globals=False)

# Funktion zum Laden und Verarbeiten von Dokumenten
def load_and_process_document(file_path):
    """
    Lädt ein PDF-Dokument und bereitet es für die Verarbeitung vor

    Args:
        file_path: Pfad zur PDF-Datei

    Returns:
        Chroma-Vektordatenbank mit den Dokumentenchunks
    """
    # PDF laden
    loader = PyPDFLoader(file_path)
    pages = loader.load()

    # Text in Chunks aufteilen
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100
    )
    chunks = text_splitter.split_documents(pages)

    # Embeddings erstellen und Vektorstore initialisieren
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection_name="doc_assistant"
    )

    return vectorstore

# ✅ LangChain 1.0+ - LCEL Chain statt ConversationalRetrievalChain
def setup_qa_chain(vectorstore):
    """
    Erstellt eine RAG-Chain mit LCEL für Frage-Antwort-Interaktionen

    Args:
        vectorstore: Chroma-Vektordatenbank

    Returns:
        LCEL Chain für RAG mit Chat-History
    """
    # ✅ LLM mit init_chat_model (LangChain 1.0+ Standard)
    llm = init_chat_model("openai:gpt-4o-mini", temperature=0.0)

    # Retriever konfigurieren
    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 3}
    )

    # RAG Prompt Template
    rag_prompt = ChatPromptTemplate.from_messages([
        ("system", """Du bist ein hilfreicher Assistent für Dokumentenanalyse.
        Beantworte Fragen basierend auf dem bereitgestellten Kontext.
        Wenn die Antwort nicht im Kontext steht, sage das ehrlich.

        Kontext:
        {context}"""),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{question}")
    ])

    # ✅ LCEL Chain (moderne Syntax mit | Operator)
    def format_docs(docs):
        return "\n\n".join([doc.page_content for doc in docs])

    qa_chain = (
        {
            "context": retriever | format_docs,
            "question": RunnablePassthrough(),
            "chat_history": lambda x: x.get("chat_history", [])
        }
        | rag_prompt
        | llm
        | StrOutputParser()
    )

    return qa_chain, retriever

# Gradio-Interface für die Benutzerinteraktion
def create_interface():
    """
    Erstellt ein Gradio-Interface für die Benutzerinteraktion

    Returns:
        Gradio-Interface
    """
    # Zustandsvariablen
    state = {
        "qa_chain": None,
        "chat_history": []
    }

    # PDF-Upload-Funktion
    def upload_pdf(file):
        try:
            vectorstore = load_and_process_document(file.name)
            state["qa_chain"], state["retriever"] = setup_qa_chain(vectorstore)
            state["chat_history"] = []
            return "✅ Dokument erfolgreich geladen und verarbeitet!"
        except Exception as e:
            return f"❌ Fehler beim Laden des Dokuments: {str(e)}"

    # Frage-Antwort-Funktion mit LCEL
    def ask_question(question):
        if state["qa_chain"] is None:
            return "⚠️ Bitte laden Sie zuerst ein Dokument hoch."

        try:
            # ✅ LCEL Chain mit Chat-History aufrufen
            answer = state["qa_chain"].invoke({
                "question": question,
                "chat_history": state["chat_history"]
            })

            # Quellen separat abrufen
            source_docs = state["retriever"].invoke(question)

            # Chat-Historie aktualisieren (als Messages)
            state["chat_history"].extend([
                HumanMessage(content=question),
                AIMessage(content=answer)
            ])

            # Quellen formatieren
            sources = []
            for i, doc in enumerate(source_docs, 1):
                page = doc.metadata.get('page', 'N/A')
                content_preview = doc.page_content[:150] + "..." if len(doc.page_content) > 150 else doc.page_content
                sources.append(f"{i}. Seite {page}: {content_preview}")

            sources_text = "\n".join(sources)
            full_response = f"{answer}\n\n---\n\n📚 **Verwendete Quellen:**\n{sources_text}"

            return full_response
        except Exception as e:
            return f"❌ Fehler bei der Verarbeitung der Frage: {str(e)}"

    # Gradio-Interface erstellen
    with gr.Blocks(title="Dokumentenanalyse-Assistent") as interface:
        gr.Markdown("# 📚 Dokumentenanalyse-Assistent")
        gr.Markdown("Laden Sie ein PDF-Dokument hoch und stellen Sie Fragen dazu.")

        with gr.Row():
            with gr.Column():
                file_input = gr.File(label="PDF-Dokument hochladen")
                upload_button = gr.Button("Dokument verarbeiten")
                status_text = gr.Textbox(label="Status", interactive=False)

            with gr.Column():
                question_input = gr.Textbox(label="Ihre Frage zum Dokument", placeholder="Stellen Sie eine Frage zum Inhalt des Dokuments...")
                answer_output = gr.Textbox(label="Antwort", interactive=False, lines=15)
                ask_button = gr.Button("Frage stellen")

        # Ereignisbehandlung
        upload_button.click(upload_pdf, inputs=[file_input], outputs=[status_text])
        ask_button.click(ask_question, inputs=[question_input], outputs=[answer_output])

    return interface

# Hauptfunktion
def main():
    interface = create_interface()
    interface.launch(share=True)

# Ausführung
if __name__ == "__main__":
    main()
```


# 7 | Ressourcen und Hilfestellung


Folgende Ressourcen können bei der Entwicklung des Abschlussprojekts hilfreich sein:

- **Dokumentation:**
  - [LangChain Dokumentation](https://python.langchain.com/docs/get_started/introduction)
  - [OpenAI API Dokumentation](https://platform.openai.com/docs/api-reference)
  - [Hugging Face Dokumentation](https://huggingface.co/docs)
  - [Gradio Dokumentation](https://www.gradio.app/docs/interface)

- **Kurs-Notebooks:**
  - `01_notebook/M04_LangChain101.ipynb` – LangChain Grundlagen
  - `01_notebook/M06_OutputParser.ipynb` – Structured Output
  - `01_notebook/M08_RAG_LangChain.ipynb` – RAG
  - `01_notebook/M09_SQL_RAG.ipynb` – SQL RAG
  - `01_notebook/M10_Agenten_LangChain.ipynb` – Agenten
  - `01_notebook/M11_Middleware.ipynb` – Middleware
  - `01_notebook/M13_Gradio.ipynb` – Gradio UI

- **Online-Tools:**
  - GenAI Tutor
  - ChatBots, wie ChatGPT, Gemini, ...
  - ...

Bei Fragen oder Problemen während der Projektentwicklung können Sie das `Kurs-Forum` nutzen.

---

---

**Version:** 3.0
**Letzte Aktualisierung:** Februar 2026
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
