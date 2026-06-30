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


# Überblick KI-Challenge
Die KI-Challenge ist ein durchgängiges Praxisprojekt: Von der ersten Idee bis zu einer Anwendung, die wirklich genutzt werden kann. Im Fokus stehen ein klarer Scope und eine Umsetzung, die im Alltag verlässlich funktioniert.

## Lernziele

- Mehrere Technologien aus den Kursmodulen sinnvoll kombinieren
- LLM-basierte Lösungen praktisch umsetzen
- Eine echte End-to-End-Anwendung bauen
- Die eigene Lösung nachvollziehbar erklären und dokumentieren

## Voraussetzungen

- Grundkenntnisse in generativer KI
- Python-Kenntnisse und LangChain 1.0+
- Zugriff auf API-Keys (OpenAI, Hugging Face)
- Erste Vertrautheit mit Gradio für die UI-Entwicklung


## Praxiseinblick: Von der Idee zum Deployment

{: .highlight }
> "Ein Open Source Modell ist kein Produkt. Für ein Produkt zu machen, kommen noch viel dazu."
> — Johannes Otterbach (ex-OpenAI, SPRIN-D)

Die KI-Challenge greift genau die typischen Hürden auf, die zwischen Notebook-Demo und einer belastbaren Anwendung auftauchen:

### Was unterscheidet ein Experiment von einem Produkt?

| **Experiment/Notebook** | **Produkt (Challenge-Ziel)** |
|-------------------------|------------------------------|
| Code läuft einmal | Robuster, wiederholbarer Code |
| Keine Fehlerbehandlung | Graceful Error Handling |
| Lokale Umgebung | Deployment-ready (Gradio, Streamlit) |
| Keine Dokumentation | README.md, Setup-Anleitung |
| "Es funktioniert bei mir" | Reproduzierbar für andere |

### Learnings aus der Praxis

In der Praxis zählt Engineering oft mehr als Hype: Große Trainingsläufe sind teuer und erfordern Planung. Für die Challenge heißt das auch: Legt euch vor dem Start auf Erfolgsmessungen fest, damit Fortschritt nicht nur nach Bauchgefühl bewertet wird.

Außerdem gilt: Iteration und Feedback früh einbauen. Systeme verbessern sich selten durch einen einzelnen großen Wurf, sondern durch wiederholtes Testen mit echten Nutzungssituationen. Deshalb ist ein kleines MVP mit frühem Feedback oft robuster als eine große Demo ohne Rückkopplung.

Produktdenken zeigt sich in Guardrails, System Prompts und Schutz vor Prompt Injection. Für euer Projekt reicht meistens schon ein klarer Safety-Layer, z.B. eine Middleware mit Logging und Retry. Am Ende ist Robustheit wichtiger als eine lange Liste an Features.


{: .info }
> **Empfehlung:** Die [Links-Sammlung](../13-ressourcen/links.html) ergänzt den Projektteil um weitere Ressourcen für GenAI-Entwicklung und Best Practices.

### Konkrete Hinweise für die Challenge

Startet mit bestehenden Modellen (z.B. OpenAI, Groq oder Anthropic) und bringt Gradio oder Streamlit möglichst früh in einen nutzbaren Zustand. Drei bis fünf Erfolgsmetriken reichen völlig aus – solange sie klar sind und am MVP sichtbar getestet werden.

Nicht passend ist ein Plan, der mit Training von Grund auf beginnt oder Open Source direkt mit Produktreife gleichsetzt. Ein Modell allein ist noch kein Produkt. Ebenfalls schwierig ist, wenn Blackbox-Verhalten dominiert oder es zu viel Overengineering gibt: Lieber drei stabile Funktionen als zehn halbfertige Ideen.


---

# Projektoptionen
Ihr könnt aus vier Projekttypen wählen. Als Startpunkt eignen sie sich gut, und bei Bedarf lassen sie sich auch kombinieren – solange der Umfang handhabbar bleibt.

## Dokumentenanalyse-Assistent

**Beschreibung:** Ein System verarbeitet PDF-Dokumente, Word-Dateien oder Textdateien und liefert Zusammenfassungen, Antworten auf Fragen oder strukturierte Analysen.

**Kernelemente:**
- RAG-Pipeline mit Vektordatenbank (ChromaDB)
- Dokumentenverarbeitung und Chunking
- Intelligentes Prompting für die Analyse
- Benutzeroberfläche mit Gradio

## Multimodaler Assistent

**Beschreibung:** Ein Assistent, der Bild, Text und optional Audio verarbeiten kann, um komplexe Aufgaben zu lösen oder Informationen aufzubereiten.

**Kernelemente:**
- Integration von Bild- und Texterkennung
- Multimodale Prompt-Strategien
- Kontextbewusste Antworten
- Interaktive Benutzeroberfläche


## Agentenbasiertes System

**Beschreibung:** Ein System mit mehreren spezialisierten Agenten, die gemeinsam arbeiten. Damit lassen sich komplexere Aufgaben lösen oder Workflows automatisieren.

**Kernelemente:**
- Multi-Agenten-Architektur
- Werkzeugintegration (APIs, Datenbanken)
- Middleware für Logging, Safety und Retry
- Benutzerinteraktion und Transparenz


## Domänen Fachexperte

**Beschreibung:** Ein spezialisierter Assistent für ein konkretes Fachgebiet (z.B. Recht, Medizin, Finanzen, Marketing), der domänenspezifische Aufgaben zuverlässig abarbeitet.

**Kernelemente:**
- Fachspezifische Wissensdatenbank
- Spezialisierte Prompts und Output-Strukturen
- Benutzeroberfläche für Fachexperten
- Optional: Feinabstimmung eines bestehenden Modells


# Projekt-Setup
Der folgende Abschnitt zeigt ein mögliches Grundsetup für ein Projekt mit **LangChain 1.0+**. Das ist bewusst kein starres Template, sondern ein belastbarer Startpunkt.

## Environment Setup

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

## LangChain 1.0+ Imports

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

# Projektstruktur
Eine erfolgreiche Abschlusslösung sollte aus diesen Bausteinen bestehen:

## Problemdefinition und Anforderungen

- Klare Beschreibung der Aufgabe bzw. des Problems
- Anforderungen und Erfolgskriterien definieren
- Den Projektumfang bewusst abgrenzen

## Datenstrukturen und Modellauswahl

- Modelle auswählen und begründen
- Datenstrukturen und Datenvorbereitung festlegen
- Bei RAG: Embedding-Strategie und passende Vorgehensweise definieren

## Kernfunktionalität

- LangChain-Pipelines oder -Ketten umsetzen
- Prompt-Engineering über Templates sauber gestalten
- Integration mit externen APIs oder Datenquellen einbauen

## Benutzeroberfläche und Interaktion

- Gradio-Interface für die Nutzung
- Gute Benutzerführung und direktes Feedback
- Fehlerbehandlung für einen stabilen Betrieb

## Evaluation und Tests

- Testfälle für verschiedene Situationen
- Bewertung der Modellleistung
- Feedback aus der Nutzung einarbeiten

## Dokumentation und Präsentation

- Projektdokumentation (Markdown oder PDF)
- Code-Kommentare und verständliche Erklärungen
- Präsentation der Ergebnisse


# Bewertungskriterien
Die  KI-Challenge wird nach folgenden Kriterien bewertet:

| Kriterium | Beschreibung | Gewichtung |
|-----------|--------------|------------|
| **Funktionalität** | Die Anwendung erfüllt die definierten Anforderungen und läuft zuverlässig | 30% |
| **Integration** | Mehrere Technologien aus dem Kurs werden sinnvoll zusammengeführt | 25% |
| **Code-Qualität** | Lesbarer, sauber strukturierter Code mit LangChain 1.0+ Best Practices | 15% |
| **Innovation** | Kreative Lösungsansätze und sinnvolle Weiterentwicklung der Konzepte | 15% |
| **Dokumentation** | Vollständige und verständliche Dokumentation des Projekts (README.md) | 15% |



# Beispielprojekt: Doku-Assi (LangChain 1.0+)
Als Orientierung dient dieses vereinfachte Beispiel für einen Dokumentenanalyse-Assistenten mit **modernen LangChain 1.0+ Patterns**.

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
    llm = init_chat_model("openai:gpt-5.4-nano")

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
            return "⚠️ Zuerst muss ein Dokument hochgeladen werden."

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
        gr.Markdown("PDF-Dokument hochladen und Fragen zum Inhalt stellen.")

        with gr.Row():
            with gr.Column():
                file_input = gr.File(label="PDF-Dokument hochladen")
                upload_button = gr.Button("Dokument verarbeiten")
                status_text = gr.Textbox(label="Status", interactive=False)

            with gr.Column():
                question_input = gr.Textbox(label="Frage zum Dokument", placeholder="Frage zum Inhalt des Dokuments eingeben...")
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


# Ressourcen und Hilfestellung
Diese Ressourcen helfen euch beim Entwickeln des Abschlussprojekts:

- **Dokumentation**
  - [LangChain Dokumentation](https://python.langchain.com/docs/get_started/introduction)
  - [OpenAI API Dokumentation](https://platform.openai.com/docs/api-reference)
  - [Hugging Face Dokumentation](https://huggingface.co/docs)
  - [Gradio Dokumentation](https://www.gradio.app/docs/interface)



- **Weitere Hilfsmittel**
  - GenAI Tutor
  - LLM-Chatbots wie ChatGPT oder Gemini als Sparringspartner



---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Legal-RAG Workshop](./rag-workshop.html) | Wie entsteht schrittweise ein juristisches RAG-System mit Quellen, Agent, Middleware und UI? |
| [Vom Notebook zum Produkt](../10-deployment/vom-notebook-zum-produkt.html) | Welche Schritte sind nötig, damit ein Kursprojekt deploybar wird? |
| [Evaluation & Observability](../07-qualitaet-sicherheit/evaluation-observability.html) | Wie werden Qualität und Fehlerverhalten einer GenAI-Anwendung sichtbar? |

---

**Version:**    3.0<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
