---
layout: default
title: Legal-RAG-Workshop
parent: Projekte
nav_order: 1
description: "Schrittweiser Workshop: Juristischer KI-Assistent - vom einfachen Chatbot zum RAG-basierten Rechtssystem mit Quellen, Agent, Qualitätssicherung und UI"
has_toc: true
---

# Legal-RAG Workshop
{: .no_toc }

> **Juristischen KI-Assistenten bauen**
> Schrittweise Entwicklung vom einfachen Chatbot zu einem RAG-basierten Rechtssystem mit kontrolliertem Kontext, Quellenangaben, Agent, Middleware, UI und lokalem Modellbetrieb (Module M02-M12)

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Projektübersicht

In diesem Projekt entsteht ein **juristischer KI-Assistent**, der rechtliche Fragen strukturiert bearbeitet, passende Quellen findet und Antworten mit nachvollziehbaren Verweisen vorbereitet. Das System soll keine Rechtsberatung ersetzen. Es zeigt, wie ein KI-System für juristische Informationsarbeit technisch aufgebaut werden kann: Benutzeroberfläche, System-Prompt, Orchestrierung, Retrieval, Modellaufruf, Qualitätskontrolle und Präsentation.

Das Projekt orientiert sich an einer typischen Architektur für juristische KI-Systeme:

- **Benutzeroberfläche:** Chat, Dokumenten-Upload, Recherche, Arbeitsbereiche und Verlauf
- **System-Prompt:** Rolle, Tonfall, Grenzen und Zitierpflicht
- **Orchestrierung & Tools:** Aufgabenplanung, Tool-Auswahl, Output-Filter und Qualitätskontrolle
- **Kontext-Injektion:** Retrieval aus Gesetzen, Urteilen und weiteren Quellen
- **KI-Modell:** Antwortgenerierung auf Basis von Prompt und kontrolliertem Kontext
- **Output & Präsentation:** Strukturierung, Quellenangaben, Export und UI-Ausgabe


### Persona


<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/profil_legal.png" class="logo" width="950"/>
<p><font color='black' size="2">
KI-generiertes Bild
</font></p>

### Ziele:

- Aufbau einer GenAI-Anwendung für juristische Recherche von Grund auf
- Schrittweise Integration von LangChain-Features
- Umsetzung eines RAG-Systems mit kontrollierter Quellenbasis
- Praktische Anwendung der Module M02-M12 mit lokaler und Open-Source-Modellvariante
- Best Practices für strukturierten Notebook-Code, Quellenangaben und Qualitätssicherung

**Arbeitsumgebung:** Google Colab oder Jupyter Notebook

### Potenzielle Architektur:


<img src="https://raw.githubusercontent.com/ralf-42/GenAI/main/07_image/legal_system.png" class="logo" width="950"/>
<p><font color='black' size="2">
KI-generiertes Bild
</font></p>

---

## Notebook-Struktur

Vorgesehen ist **ein Notebook** mit **zehn aufbauenden Kapiteln**. Alternativ kann jedes Kapitel als eigenes Notebook geführt werden:

```text
Legal_Assistant.ipynb
   ├── Kapitel 1: Basis-Chatbot (M02)
   ├── Kapitel 2: Token-Optimierung (M03)
   ├── Kapitel 3: Strukturierte Ausgaben (M04)
   ├── Kapitel 4: Chat-History & Memory (M05)
   ├── Kapitel 5: Legal RAG (M06)
   ├── Kapitel 6: SQL RAG für Rechtsmetadaten (M07)
   ├── Kapitel 7: Agent mit juristischen Tools (M08)
   ├── Kapitel 8: Middleware, Sicherheit & Freigabe (M09)
   ├── Kapitel 9: Gradio-UI (M11)
   └── Kapitel 10: Lokale Modelle & Open Source (M12)
```

**Empfehlung:** Für den Einstieg reicht ein gemeinsames Notebook. Eine klare Trennung per Markdown-Zelle hält den Verlauf nachvollziehbar.

---

## Vorbereitung: Google Colab Setup

Vor dem Start wird die Colab-Umgebung mit der Kursbibliothek (`genai_lib`) und den erforderlichen Abhängigkeiten eingerichtet.

### API-Key in Colab Secrets speichern

1. In Colab das Schlüssel-Symbol in der linken Sidebar öffnen
2. `OPENAI_API_KEY` anlegen
3. "Notebook access" aktivieren

### Kursbibliothek & Umgebung einrichten

Zu Beginn des Notebooks wird die GenAI-Kursbibliothek installiert. Danach werden die grundlegenden Hilfsfunktionen und der API-Key geladen:

```python
# ═══════════════════════════════════════════════════
# UMGEBUNG EINRICHTEN (Kurs-Utilities laden)
# ═══════════════════════════════════════════════════

# GenAI Kursbibliothek installieren
!uv pip install --system -q git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul

# Projekt-Utilities importieren
from genai_lib.utilities import (
    check_environment,
    get_ipinfo,
    setup_api_keys,
    mprint,
    install_packages,
    mermaid,
    get_model_profile,
    extract_thinking,
    load_prompt
)

# API-Key laden (sucht automatisch in Colab Secrets, Umgebungsvariablen oder fragt interaktiv)
setup_api_keys(['OPENAI_API_KEY'], create_globals=False)

print()
check_environment()
print()
get_ipinfo()

# Modell-Konfiguration (Rollen als Konstanten importieren)
from genai_lib.model_config import BASELINE
```

### Zusätzliche Abhängigkeiten installieren

Für den Workshop werden weitere Pakete wie `langchain-chroma`, `markitdown` und `gradio` benötigt. `markitdown` ist praktisch, wenn Gesetzestexte, Urteile oder Arbeitsmaterialien aus PDF-, DOCX- oder HTML-Dateien in Markdown umgewandelt werden sollen.

```python
# ═══════════════════════════════════════════════════
# INSTALLATIONEN
# ═══════════════════════════════════════════════════

# markitdown für Dokumentenkonvertierung installieren
!uv pip install --system -q "markitdown[all]"

# Weitere Pakete über genai_lib installieren
install_packages([
    "langchain_openai",
    "langchain_chroma",
    "gradio",
    ("langchain-text-splitters", "langchain_text_splitters"),
])
```

---

## Kapitel 1: Basis-Chatbot (Modul M02)

**Ziel:** LangChain-Grundlagen, Prompt-Templates, einfache LLM-Interaktion

In diesem Kapitel entsteht ein erster juristischer Assistent ohne externe Quellen. Er darf allgemeine Erklärungen geben, muss aber transparent machen, wenn ihm der konkrete Norm- oder Entscheidungskontext fehlt.

### Aufgabe 1.1: LLM initialisieren

```python
# ═══════════════════════════════════════════════════
# KAPITEL 1: BASIS-CHATBOT (M02)
# ═══════════════════════════════════════════════════

from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# LLM initialisieren
llm = init_chat_model("openai:gpt-5.4-mini")

prompt = ChatPromptTemplate.from_messages([
    ("system", """Du bist ein juristischer Lernassistent.
Antworte präzise, verständlich und mit klaren Grenzen.
Gib keine verbindliche Rechtsberatung.
Wenn dir Normen, Urteile oder Sachverhaltsdetails fehlen, sage das offen."""),
    ("human", "{frage}"),
])

chain = prompt | llm | StrOutputParser()

antwort = chain.invoke({"frage": "Was ist der Unterschied zwischen Gesetz und Urteil?"})
print(antwort)
```

### Aufgabe 1.2: Interaktive Chat-Schleife

```python
def legal_chat():
    """Einfache Chat-Schleife für Jupyter/Colab."""
    print("Juristischer KI-Assistent gestartet!")
    print("Schreibe 'exit' zum Beenden.\n")

    while True:
        frage = input("Frage: ")
        if frage.lower() == "exit":
            break

        antwort = chain.invoke({"frage": frage})
        print("\nAntwort:")
        print(antwort)
        print()
```

**Erfolgskriterium:**

- Der Bot beantwortet allgemeine juristische Verständnisfragen nachvollziehbar
- Der Bot weist auf fehlende Quellen oder Sachverhaltsdetails hin
- Der Chat läuft in einer Schleife bis `exit`
- LCEL-Syntax (`|`) wird verwendet

---

## Kapitel 2: Token-Optimierung (Modul M03)

**Ziel:** Transformer-Konzepte verstehen, Token-Zählung, Kontext-Management

Juristische Texte sind oft lang: Gesetze, Urteile, Kommentare und Schriftsätze enthalten viele Verweise und Wiederholungen. In diesem Kapitel wird sichtbar, warum Kontextfenster, Chunking und kurze Prompts für Legal RAG entscheidend sind.

### Aufgabe 2.1: Token-Zählung implementieren

```python
# ═══════════════════════════════════════════════════
# KAPITEL 2: TOKEN-OPTIMIERUNG (M03)
# ═══════════════════════════════════════════════════

import tiktoken

def count_tokens(text: str, model: str = "gpt-5.4-nano") -> int:
    """Zählt Tokens für ein gegebenes Modell."""
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))

beispieltext = """
§ 823 BGB regelt die Schadensersatzpflicht bei vorsätzlicher oder fahrlässiger
Verletzung bestimmter Rechte und Rechtsgüter.
"""

print("Tokens:", count_tokens(beispieltext))
```

### Aufgabe 2.2: Chat mit Token-Tracking

```python
def legal_chat_mit_tokens():
    """Chat mit Token-Statistiken."""
    print("Juristischer KI-Assistent (mit Token-Tracking)")
    print("Schreibe 'exit' zum Beenden.\n")

    total_tokens = 0

    while True:
        frage = input("Frage: ")
        if frage.lower() == "exit":
            break

        antwort = chain.invoke({"frage": frage})
        token_count = count_tokens(frage + antwort)
        total_tokens += token_count

        print("\nAntwort:")
        print(antwort)
        print(f"\nTokens für diese Runde: {token_count}")
        print(f"Tokens gesamt: {total_tokens}\n")

        if count_tokens(antwort) > 500:
            print("Hinweis: Die Antwort ist lang. Prüfe, ob eine kürzere Struktur reicht.\n")
```

**Erfolgskriterium:**

- Token-Zählung funktioniert korrekt
- Statistiken werden nach jeder Frage angezeigt
- Lange Antworten werden sichtbar
- Die Teilnehmenden erkennen, warum juristische Quellen vor dem Modellaufruf verdichtet werden müssen

---

## Kapitel 3: Strukturierte Ausgaben (Modul M04)

**Ziel:** Pydantic-Modelle, `with_structured_output()`, JSON-Schema

Juristische Antworten sollen nicht nur frei formuliert sein. Häufig braucht die Anwendung eine feste Struktur: Frage, Kurzantwort, einschlägige Normen, Fundstellen, Unsicherheiten und nächste Prüfschritte.

### Aufgabe 3.1: Pydantic-Modell definieren

```python
# ═══════════════════════════════════════════════════
# KAPITEL 3: STRUKTURIERTE AUSGABEN (M04)
# ═══════════════════════════════════════════════════

from pydantic import BaseModel, Field
from typing import Literal

class LegalAnswer(BaseModel):
    """Strukturierte juristische Antwort."""
    frage: str = Field(description="Die ursprüngliche Frage")
    kurzantwort: str = Field(description="Kurze, verständliche Antwort")
    rechtsgebiet: Literal["Zivilrecht", "Strafrecht", "Öffentliches Recht", "Unklar"]
    normen: list[str] = Field(description="Genannte Normen, z. B. § 823 BGB")
    quellenbedarf: bool = Field(description="True, wenn belastbare Quellen fehlen")
    hinweis: str = Field(description="Grenzen der Antwort oder nächster Prüfschritt")

structured_llm = llm.with_structured_output(LegalAnswer)

result = structured_llm.invoke(
    "Welche Rolle spielt § 823 BGB bei Schadensersatzansprüchen?"
)

print(result)
```

### Aufgabe 3.2: Fallnotiz-Datenbank aufbauen

```python
import json

def create_case_notes():
    """Interaktive Sammlung strukturierter Fallnotizen."""
    notes = []
    print("Fallnotiz-Generator")
    print("Schreibe 'exit' zum Beenden.\n")

    while True:
        frage = input("Juristische Frage: ")
        if frage.lower() == "exit":
            break

        note = structured_llm.invoke(frage)
        notes.append(note.model_dump())
        print(note)

    with open("legal_case_notes.json", "w", encoding="utf-8") as f:
        json.dump(notes, f, ensure_ascii=False, indent=2)

    return notes
```

**Erfolgskriterium:**

- Strukturierte Ausgabe wird als Pydantic-Objekt erzeugt
- Normen, Rechtsgebiet und Unsicherheiten werden getrennt erfasst
- Export in JSON-Datei funktioniert
- Die Struktur ist später für UI, Evaluation und Qualitätssicherung nutzbar

---

## Kapitel 4: Chat-History & Memory (Modul M05)

**Ziel:** Konversationskontext verwalten, Chat-History nutzen

Juristische Rückfragen beziehen sich oft auf denselben Sachverhalt. Der Assistent soll deshalb frühere Angaben berücksichtigen, ohne daraus unbelegte Tatsachen zu machen.

### Aufgabe 4.1: Memory implementieren

```python
# ═══════════════════════════════════════════════════
# KAPITEL 4: CHAT-HISTORY & MEMORY (M05)
# ═══════════════════════════════════════════════════

from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

store = {}

def get_session_history(session_id: str) -> InMemoryChatMessageHistory:
    """Holt oder erstellt Chat-History für eine Session."""
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

memory_prompt = ChatPromptTemplate.from_messages([
    ("system", """Du bist ein juristischer Lernassistent.
Nutze die bisherige Unterhaltung nur als Sachverhaltskontext.
Unterscheide klar zwischen Angaben des Nutzers, Rechtsquellen und eigener Einschätzung."""),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{frage}"),
])

memory_chain = memory_prompt | llm | StrOutputParser()

chain_with_history = RunnableWithMessageHistory(
    memory_chain,
    get_session_history,
    input_messages_key="frage",
    history_messages_key="history",
)
```

### Aufgabe 4.2: Chat mit Kontext-Bewusstsein

```python
def legal_chat_mit_memory():
    """Chat mit Konversationsgedächtnis."""
    session_id = "legal_session_1"
    print("Juristischer KI-Assistent (mit Memory)")
    print("Schreibe 'reset' zum Löschen der History oder 'exit' zum Beenden.\n")

    while True:
        frage = input("Frage: ")

        if frage.lower() == "exit":
            break

        if frage.lower() == "reset":
            store[session_id] = InMemoryChatMessageHistory()
            print("History gelöscht.\n")
            continue

        antwort = chain_with_history.invoke(
            {"frage": frage},
            config={"configurable": {"session_id": session_id}},
        )

        history_length = len(get_session_history(session_id).messages)
        print("\nAntwort:")
        print(antwort)
        print(f"\nHistory-Nachrichten: {history_length}\n")
```

**Erfolgskriterium:**

- Der Bot berücksichtigt vorherige Sachverhaltsangaben
- Der Bot trennt Nutzerangaben von Rechtsquellen
- `reset` löscht die History
- Die History-Länge wird angezeigt

---

## Kapitel 5: Legal RAG (Modul M06)

**Ziel:** Retrieval-Augmented Generation, Vektordatenbank, Embeddings, kontrollierter Kontext, einfache RAG-Evaluation

Jetzt erhält der Assistent eine Quellenbasis. Für den Workshop reichen drei bis fünf Markdown-Dateien, zum Beispiel:

- `bgb_auszug.md` mit ausgewählten Normen
- `gg_auszug.md` mit Grundrechten
- `urteile_beispiele.md` mit kurzen Entscheidungszusammenfassungen
- `faq_rechtsquellen.md` mit Erläuterungen zu Normen, Urteilen und Kommentaren

Die Dateien sollten nur frei nutzbare oder selbst erstellte Inhalte enthalten. Kommerzielle Kommentare, Handbücher und Fachdatenbanken dürfen nicht ohne passende Nutzungsrechte übernommen werden.

### Aufgabe 5.1: Dokumente hochladen (Colab File Upload)

```python
# ═══════════════════════════════════════════════════
# KAPITEL 5: LEGAL RAG (M06)
# ═══════════════════════════════════════════════════

from google.colab import files
import os

os.makedirs("legal_docs", exist_ok=True)

uploaded = files.upload()

for filename, content in uploaded.items():
    path = os.path.join("legal_docs", filename)
    with open(path, "wb") as f:
        f.write(content)

print("Hochgeladene Dateien:", os.listdir("legal_docs"))
```

### Aufgabe 5.2: Vektordatenbank erstellen

```python
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

loader = DirectoryLoader("legal_docs/", glob="**/*.md", loader_cls=TextLoader)
documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=900,
    chunk_overlap=150,
    separators=["\n## ", "\n### ", "\n\n", "\n", " "],
)

chunks = text_splitter.split_documents(documents)

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    collection_name="legal_sources",
)

retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

print(f"Dokumente: {len(documents)}")
print(f"Chunks: {len(chunks)}")
```

### Aufgabe 5.3: RAG-Chain implementieren

```python
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

def format_docs(docs):
    """Formatiert gefundene Dokumente für den Prompt."""
    return "\n\n".join([
        f"Quelle: {doc.metadata.get('source', 'Unbekannt')}\n{doc.page_content}"
        for doc in docs
    ])

rag_prompt = ChatPromptTemplate.from_messages([
    ("system", """Du bist ein juristischer Recherche-Assistent.
Beantworte die Frage nur auf Basis des bereitgestellten Kontexts.
Nenne die verwendeten Quellen.
Wenn der Kontext nicht reicht, sage klar, welche Information fehlt.
Keine verbindliche Rechtsberatung."""),
    ("human", "Kontext:\n{context}\n\nFrage:\n{frage}"),
])

rag_chain = (
    {
        "context": retriever | format_docs,
        "frage": RunnablePassthrough(),
    }
    | rag_prompt
    | llm
    | StrOutputParser()
)

antwort = rag_chain.invoke("Welche Voraussetzungen nennt § 823 BGB?")
print(antwort)
```

### Aufgabe 5.4: RAG-Chat mit Quellenangaben

```python
def legal_rag_chat():
    """RAG-Chat mit Quellenangaben."""
    print("Juristischer KI-Assistent (RAG-Modus)")
    print("Schreibe 'exit' zum Beenden.\n")

    while True:
        frage = input("Frage: ")
        if frage.lower() == "exit":
            break

        docs = retriever.invoke(frage)
        antwort = rag_chain.invoke(frage)

        print("\nAntwort:")
        print(antwort)
        print("\nGefundene Quellen:")
        for doc in docs:
            print("-", doc.metadata.get("source", "Unbekannt"))
        print()
```

### Aufgabe 5.5: Mini-Evaluation für Legal RAG

Ein Legal-RAG-System ist nicht schon brauchbar, weil eine Antwort plausibel klingt. Nach der ersten RAG-Chain wird ein kleines Testset angelegt, das Retrieval, Quellenbezug und Antwortgrenzen prüft.

```python
eval_set = [
    {
        "frage": "Welche Voraussetzungen nennt § 823 BGB?",
        "erwartete_quelle": "bgb_auszug.md",
        "erwartung": "Die Antwort nennt Rechtsgutsverletzung, Verschulden und Schaden nur, wenn diese Punkte im Kontext stehen.",
    },
    {
        "frage": "Welche Bedeutung hat Art. 5 GG für Meinungsfreiheit?",
        "erwartete_quelle": "gg_auszug.md",
        "erwartung": "Die Antwort verweist auf die Quelle und nennt Grenzen nur aus dem Kontext.",
    },
    {
        "frage": "Gibt es ein Urteil zu diesem Sachverhalt?",
        "erwartete_quelle": "urteile_beispiele.md",
        "erwartung": "Die Antwort sagt klar, wenn der Sachverhalt oder eine passende Entscheidung fehlt.",
    },
]

for fall in eval_set:
    docs = retriever.invoke(fall["frage"])
    antwort = rag_chain.invoke(fall["frage"])

    print("\nFrage:", fall["frage"])
    print("Erwartete Quelle:", fall["erwartete_quelle"])
    print("Gefundene Quellen:", [doc.metadata.get("source") for doc in docs])
    print("Antwort:", antwort)
    print("Bewertung: korrekt / teilweise / falsch")
```

**Erfolgskriterium:**

- Dokumente werden hochgeladen und indiziert
- Retrieval findet relevante Chunks
- Antworten basieren auf kontrolliertem Kontext
- Quellenangaben werden angezeigt
- Mindestens drei RAG-Testfragen werden dokumentiert und bewertet
- Der Bot sagt klar, wenn der Kontext nicht ausreicht

---

## Kapitel 6: SQL RAG für Rechtsmetadaten (Modul M07)

**Ziel:** Strukturierte Daten mit RAG abfragen, SQL-Generierung durch LLMs

Neben Volltextquellen braucht ein juristisches System strukturierte Metadaten: Norm, Gericht, Datum, Aktenzeichen, Rechtsgebiet, Quelle und Dokumenttyp. Diese Informationen lassen sich gut in einer SQLite-Datenbank ablegen.

### Aufgabe 6.1: SQLite-Datenbank erstellen

```python
# ═══════════════════════════════════════════════════
# KAPITEL 6: SQL RAG FÜR RECHTSMETADATEN (M07)
# ═══════════════════════════════════════════════════

import sqlite3

conn = sqlite3.connect("legal_sources.db")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS rechtsquellen (
        id INTEGER PRIMARY KEY,
        titel TEXT,
        dokumenttyp TEXT,
        rechtsgebiet TEXT,
        fundstelle TEXT,
        datum TEXT,
        quelle TEXT
    )
""")

beispiele = [
    ("§ 823 BGB", "Norm", "Zivilrecht", "BGB", None, "bgb_auszug.md"),
    ("Art. 5 GG", "Norm", "Öffentliches Recht", "GG", None, "gg_auszug.md"),
    ("Beispielurteil Meinungsfreiheit", "Urteil", "Öffentliches Recht", "BVerfG", "2020-01-01", "urteile_beispiele.md"),
]

cursor.executemany("""
    INSERT INTO rechtsquellen (titel, dokumenttyp, rechtsgebiet, fundstelle, datum, quelle)
    VALUES (?, ?, ?, ?, ?, ?)
""", beispiele)

conn.commit()
conn.close()
```

### Aufgabe 6.2: SQL-Chain mit LangChain

Für die SQL-Generierung ist `gpt-5.4-mini` meist die stabilere Wahl als `gpt-5.4-nano`, besonders bei komplexeren Schemata oder wenn die Abfrage mehrere Bedingungen kombinieren muss.

```python
from langchain_community.utilities import SQLDatabase
from langchain.chains import create_sql_query_chain

db = SQLDatabase.from_uri("sqlite:///legal_sources.db")

sql_chain = create_sql_query_chain(llm, db)

query = sql_chain.invoke({
    "question": "Welche Quellen gehören zum Öffentlichen Recht?"
})

print(query)
```

### Aufgabe 6.3: Kombination Vektor-RAG + SQL RAG

```python
def hybrid_legal_chat():
    """Chat mit Vektor-RAG und SQL RAG kombiniert."""
    print("Juristischer KI-Assistent (Hybrid-Modus)")
    print("Volltextquellen + Rechtsmetadaten")
    print("Schreibe 'exit' zum Beenden.\n")

    while True:
        frage = input("Frage: ")
        if frage.lower() == "exit":
            break

        docs = retriever.invoke(frage)
        rag_antwort = rag_chain.invoke(frage)
        sql_vorschlag = sql_chain.invoke({"question": frage})

        print("\nRAG-Antwort:")
        print(rag_antwort)
        print("\nSQL-Vorschlag für Metadatenprüfung:")
        print(sql_vorschlag)
        print("\nQuellen:")
        for doc in docs:
            print("-", doc.metadata.get("source", "Unbekannt"))
        print()
```

**Erfolgskriterium:**

- SQLite-Datenbank mit Rechtsquellen-Metadaten wird erstellt
- Natürlichsprachliche Fragen werden in SQL übersetzt
- Ergebnisse unterstützen die Quellenprüfung
- Kombination mit Vektor-RAG funktioniert

---

## Kapitel 7: Agent mit juristischen Tools (Modul M08)

**Ziel:** LangChain Agents, Tool-Definition, Function Calling

Der Agent entscheidet, wann er Retrieval, Metadatensuche oder Qualitätsprüfung nutzt. Das Toolset bleibt bewusst klein, damit die Entscheidungslogik nachvollziehbar bleibt.

### Aufgabe 7.1: Tools definieren

```python
# ═══════════════════════════════════════════════════
# KAPITEL 7: AGENT MIT JURISTISCHEN TOOLS (M08)
# ═══════════════════════════════════════════════════

from langchain_core.tools import tool

@tool
def search_legal_sources(query: str) -> str:
    """Durchsucht die juristischen Volltextquellen nach relevanten Informationen."""
    docs = retriever.invoke(query)
    return format_docs(docs)

@tool
def query_legal_metadata(question: str) -> str:
    """Erzeugt eine SQL-Abfrage für die Rechtsquellen-Metadatenbank."""
    return sql_chain.invoke({"question": question})

@tool
def check_citations(answer: str) -> str:
    """Prüft, ob eine Antwort Quellenangaben enthält."""
    has_source = "Quelle:" in answer or "Quellen:" in answer
    if has_source:
        return "Quellenangaben gefunden. Prüfe zusätzlich, ob sie wirklich zum Inhalt passen."
    return "Keine Quellenangaben gefunden. Antwort vor Verwendung überarbeiten."

@tool
def classify_legal_question(question: str) -> str:
    """Ordnet eine Frage grob einem Rechtsgebiet zu."""
    classifier = llm.with_structured_output(LegalAnswer)
    result = classifier.invoke(question)
    return result.rechtsgebiet

tools = [
    search_legal_sources,
    query_legal_metadata,
    check_citations,
    classify_legal_question,
]
```

### Aufgabe 7.2: Agent erstellen

```python
from langchain.agents import create_agent

agent = create_agent(
    model="openai:gpt-5.4-nano",
    tools=tools,
    system_prompt="""Du bist ein juristischer Recherche-Agent.
Nutze Tools, wenn eine Frage Quellen, Rechtsgebiet oder Metadaten betrifft.
Kennzeichne Unsicherheiten und gib keine verbindliche Rechtsberatung.""",
)
```

### Aufgabe 7.3: Agent-Chat

```python
def legal_agent_chat():
    """Interaktiver Agent-Chat."""
    print("Juristischer KI-Assistent (Agent-Modus)")
    print("Tools: Quellen-Suche | Metadaten-Abfrage | Zitierprüfung | Rechtsgebiets-Klassifikation")
    print("Schreibe 'exit' zum Beenden.\n")

    while True:
        frage = input("Frage: ")
        if frage.lower() == "exit":
            break

        response = agent.invoke({
            "messages": [{"role": "human", "content": frage}]
        })

        print("\nAntwort:")
        print(response["messages"][-1].content)
        print()
```

**Erfolgskriterium:**

- Alle vier Tools funktionieren einzeln
- Agent nutzt Tools nachvollziehbar
- Antworten enthalten Quellen oder klare Hinweise auf fehlende Quellen
- Debug-Ausgaben oder Zwischenstände machen Tool-Aufrufe prüfbar

---

## Kapitel 8: Middleware, Sicherheit & Freigabe (Modul M09)

**Ziel:** Agent-Ausführung kontrollieren mit Middleware und Human-in-the-loop

Juristische KI-Systeme brauchen klare Kontrollpunkte. Logging, Retry-Logik und menschliche Freigabe helfen, Tool-Aufrufe und Antworten nachvollziehbar zu machen.

### Aufgabe 8.1: Logging-Middleware

```python
# ═══════════════════════════════════════════════════
# KAPITEL 8: MIDDLEWARE, SICHERHEIT & FREIGABE (M09)
# ═══════════════════════════════════════════════════

from langchain.agents import AgentState
from langchain.agents.middleware import before_model, after_model, wrap_tool_call
from langchain.tools.tool_node import ToolCallRequest

@before_model
def log_before(state: AgentState, runtime):
    """Loggt jede Modell-Anfrage."""
    print(f"Model wird aufgerufen mit {len(state['messages'])} Nachrichten")
    return None

@after_model
def log_after(state: AgentState, runtime):
    """Loggt jede Modell-Antwort."""
    msg = state["messages"][-1]
    if hasattr(msg, "tool_calls") and msg.tool_calls:
        print(f"Tool-Aufruf: {[tc['name'] for tc in msg.tool_calls]}")
    else:
        print("Antwort generiert")
    return None

@wrap_tool_call
def log_tool(request: ToolCallRequest, handler):
    """Loggt jede Tool-Ausführung."""
    print(f"Führe aus: {request.tool_call['name']}")
    result = handler(request)
    print(f"Ergebnis: {str(result.content)[:120]}")
    return result
```

### Aufgabe 8.2: Human-in-the-loop für sensible Tools

```python
from langchain.agents.middleware import HumanInTheLoopMiddleware
from langgraph.checkpoint.memory import MemorySaver

hitl = HumanInTheLoopMiddleware(
    interrupt_on={
        "query_legal_metadata": True,
        "check_citations": True,
    }
)

agent_safe = create_agent(
    model="openai:gpt-5.4-nano",
    tools=tools,
    middleware=[log_before, log_after, log_tool, hitl],
    checkpointer=MemorySaver(),
)
```

### Aufgabe 8.3: Retry-Middleware für Robustheit

```python
from langchain.agents.middleware import ModelRetryMiddleware, ToolRetryMiddleware

agent_robust = create_agent(
    model="openai:gpt-5.4-nano",
    tools=tools,
    middleware=[
        log_before,
        log_after,
        log_tool,
        ModelRetryMiddleware(max_retries=3, backoff_factor=2.0, jitter=True),
        ToolRetryMiddleware(max_retries=2, jitter=True),
        hitl,
    ],
    checkpointer=MemorySaver(),
)
```

**Erfolgskriterium:**

- Logging zeigt Modell- und Tool-Aufrufe
- HITL unterbricht bei sensiblen Tools
- Retry-Middleware fängt transiente Fehler ab
- Der Middleware-Stack bleibt verständlich und prüfbar
- Die Ausgabe macht Unsicherheiten und fehlende Quellen sichtbar

---

## Kapitel 9: Gradio-UI (Modul M11)

**Ziel:** Web-Interface mit Gradio, State-Management, Event-Handling

Die UI bildet die Schichten des Systems ab: Chat, Dokumenten-Upload, Recherchemodus, Agent-Modus und Quellenanzeige. Für den Workshop reicht eine einfache Oberfläche mit Tabs.

### Aufgabe 9.1: Basis-UI erstellen

```python
# ═══════════════════════════════════════════════════
# KAPITEL 9: GRADIO-UI (M11)
# ═══════════════════════════════════════════════════

import gradio as gr

def chat_handler(message, history):
    """Verarbeitet normale Chat-Anfragen."""
    antwort = chain.invoke({"frage": message})
    return antwort

def rag_handler(message, history):
    """Verarbeitet RAG-basierte Anfragen."""
    docs = retriever.invoke(message)
    antwort = rag_chain.invoke(message)
    quellen = "\n".join([
        f"- {doc.metadata.get('source', 'Unbekannt')}"
        for doc in docs
    ])
    return f"{antwort}\n\nQuellen:\n{quellen}"

def agent_handler(message, history):
    """Verarbeitet Agent-Anfragen mit Middleware."""
    response = agent_robust.invoke({
        "messages": [{"role": "human", "content": message}]
    })
    return response["messages"][-1].content
```

### Aufgabe 9.2: Gradio-App implementieren

```python
with gr.Blocks(title="Juristischer KI-Assistent") as demo:
    gr.Markdown("# Juristischer KI-Assistent")
    gr.Markdown("Recherche, RAG und Agent-Workflow mit kontrollierter Quellenbasis.")

    with gr.Tab("Chat"):
        gr.ChatInterface(fn=chat_handler)

    with gr.Tab("Legal RAG"):
        gr.ChatInterface(fn=rag_handler)

    with gr.Tab("Agent"):
        gr.ChatInterface(fn=agent_handler)

demo.launch(share=True)
```

**Colab-spezifische Hinweise:**

- `share=True` erstellt einen öffentlichen Link
- Der Link kann mit anderen geteilt werden
- Gradio läuft direkt in Colab ohne separaten Server
- Für sensible oder echte juristische Inhalte sollte kein öffentlicher Share-Link verwendet werden

**Erfolgskriterium:**

- UI läuft in Colab
- Chat, RAG und Agent funktionieren
- Quellen werden sichtbar angezeigt
- "Chat löschen" oder Session-Reset ist ergänzt
- Sensible Inhalte werden nicht öffentlich geteilt

---

## Kapitel 10: Lokale Modelle & Open Source (Modul M12)

**Ziel:** Lokale und Open-Source-Modelle als Betriebsoption einordnen, testen und gegen API-Modelle vergleichen

Juristische Anwendungen arbeiten häufig mit sensiblen Dokumenten. Lokale Modelle können deshalb interessant sein, weil Daten die eigene Umgebung nicht verlassen müssen. Gleichzeitig sind Qualität, Geschwindigkeit, Hardwarebedarf und Wartung realistische Grenzen. In diesem Kapitel wird kein produktionsreifes On-Premise-System gebaut. Es geht um einen technischen Vergleich: API-Modell gegen lokales Modell auf denselben Legal-RAG-Fragen.

### Aufgabe 10.1: Lokales Modell anbinden

Für lokale Tests eignet sich zum Beispiel Ollama. Das Modell muss bereits lokal installiert und gestartet sein.

```python
# ═══════════════════════════════════════════════════
# KAPITEL 10: LOKALE MODELLE & OPEN SOURCE (M12)
# ═══════════════════════════════════════════════════

from langchain.chat_models import init_chat_model

# Beispiel: lokales Modell über Ollama
local_llm = init_chat_model("ollama:llama3.1")

local_prompt = ChatPromptTemplate.from_messages([
    ("system", """Du bist ein juristischer Recherche-Assistent.
Beantworte die Frage nur auf Basis des bereitgestellten Kontexts.
Nenne die verwendeten Quellen.
Wenn der Kontext nicht reicht, sage klar, welche Information fehlt."""),
    ("human", "Kontext:\n{context}\n\nFrage:\n{frage}"),
])

local_rag_chain = (
    {
        "context": retriever | format_docs,
        "frage": RunnablePassthrough(),
    }
    | local_prompt
    | local_llm
    | StrOutputParser()
)
```

### Aufgabe 10.2: API-Modell und lokales Modell vergleichen

```python
vergleichsfragen = [
    "Welche Voraussetzungen nennt § 823 BGB?",
    "Welche Quelle ist für Art. 5 GG relevant?",
    "Was fehlt, wenn keine passende Entscheidung im Kontext steht?",
]

for frage in vergleichsfragen:
    api_antwort = rag_chain.invoke(frage)
    lokale_antwort = local_rag_chain.invoke(frage)

    print("\nFrage:", frage)
    print("\nAPI-Modell:")
    print(api_antwort)
    print("\nLokales Modell:")
    print(lokale_antwort)
    print("\nBewertung: Quellenbezug / Vollständigkeit / Kürze / Fehlende-Kontext-Erkennung")
```

### Aufgabe 10.3: Betriebsentscheidung dokumentieren

Ergänze im Notebook eine kurze Entscheidungsmatrix:

| Kriterium | API-Modell | Lokales Modell |
|---|---|---|
| Antwortqualität |  |  |
| Geschwindigkeit |  |  |
| Datenschutz |  |  |
| Kostenkontrolle |  |  |
| Wartungsaufwand |  |  |
| Eignung für diesen Legal-RAG-Prototyp |  |  |

**Erfolgskriterium:**

- Ein lokales Modell ist angebunden oder der fehlende lokale Betrieb ist sauber begründet
- Mindestens drei Legal-RAG-Fragen werden gegen API- und lokales Modell verglichen
- Die Bewertung unterscheidet Qualität, Datenschutz, Betrieb und Kosten
- Die Entscheidungsmatrix enthält eine nachvollziehbare Empfehlung

---

## Erweiterungen

### Erweiterung 1: Persistenz

- Chat-History in JSON speichern
- Vorherige Sessions beim Start laden
- Arbeitsbereiche für unterschiedliche Fälle ergänzen

### Erweiterung 2: Erweiterte Legal-RAG-Features

- Hybrid-Search (Keyword + Semantic)
- Re-Ranking der Retrieval-Ergebnisse
- Chunk-Overlap-Visualisierung
- Quellengewichtung nach Dokumenttyp
- Trennung von Normtext, Urteil und eigener Zusammenfassung

### Erweiterung 3: MCP-Integration (M10)

- MCP-Server für eine kleine Rechtsquellen-Sammlung erstellen
- Agent über MCP-Client mit externen Tools verbinden
- Vergleich: Tools direkt vs. Tools via MCP

### Erweiterung 4: Qualitätssicherung

- Zitierprüfung als eigene Funktion ergänzen
- Testfälle für falsche oder fehlende Quellen anlegen
- Halluzinations-Check vor der UI-Ausgabe ausführen
- Antwort als PDF oder Markdown exportieren

### Erweiterung 5: Lokaler Betrieb vertiefen (M12)

- Embeddings und Chat-Modell lokal betreiben
- API- und lokales Modell mit derselben Evaluation vergleichen
- Hardwarebedarf und Antwortzeiten dokumentieren
- Datenschutz- und Betriebsgrenzen des lokalen Setups beschreiben

---

## Bewertungskriterien

| Kapitel | Punkte | Kriterien |
|---------|--------|-----------|
| 1: Basis-Chatbot (M02) | 10 | Funktionalität, klare Grenzen, LCEL-Nutzung |
| 2: Token-Optimierung (M03) | 10 | Korrekte Zählung, Statistiken, Kontextbewusstsein |
| 3: Strukturierte Ausgaben (M04) | 10 | Pydantic-Modelle, Validierung, juristische Felder |
| 4: Chat-Memory (M05) | 10 | Sachverhaltskontext, Memory-Management |
| 5: Legal RAG (M06) | 15 | Retrieval-Qualität, Quellenangaben, Mini-Evaluation |
| 6: SQL RAG (M07) | 10 | Rechtsmetadaten, SQL-Generierung, Hybrid-Modus |
| 7: Agent mit Tools (M08) | 15 | Tool-Implementation, Agent-Logik, Zitierprüfung |
| 8: Middleware (M09) | 10 | Logging, HITL, Retry-Stack, Kontrollpunkte |
| 9: Gradio-UI (M11) | 10 | Usability, Quellenanzeige, sensible Veröffentlichung |
| 10: Lokale Modelle (M12) | 10 | Vergleich API-Modell vs. lokales Modell, Betriebsentscheidung |
| **Gesamt** | **110** | |

**Bestanden:** >= 60 Punkte

---

## Hilfreiche Ressourcen

**LangChain Dokumentation:**

- [init_chat_model()](https://python.langchain.com/docs/concepts/chat_models/)
- [RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/)
- [Agents](https://python.langchain.com/docs/concepts/agents/)

**Kurs-Notebooks:**

- `01_notebook/M02_LangChain101.ipynb`
- `01_notebook/M03_Textverarbeitung_mit_LangChain.ipynb`
- `01_notebook/M04_OutputParser.ipynb`
- `01_notebook/M05_Chat_Memory_Patterns_stategraph.ipynb`
- `01_notebook/M05_Chat_Memory_Patterns_list_dict.ipynb`
- `01_notebook/M06_RAG_LangChain.ipynb`
- `01_notebook/M07_SQL_RAG.ipynb`
- `01_notebook/M08_Agenten_LangChain.ipynb`
- `01_notebook/M09_Middleware.ipynb`
- `01_notebook/M10_MCP_LangChain_Agent.ipynb`
- `01_notebook/M11_Gradio.ipynb`
- `01_notebook/M12_Lokale_Open_Source_Modelle.ipynb`

**Qualität & Observability:**

- [Evaluation & Observability](../07-qualitaet-sicherheit/evaluation-observability.html)
- [RAG-Konzepte](../05-prompting-rag/rag-konzepte.html)
- [LangSmith Best Practices](../06-frameworks/langsmith-best-practices.html)

---

## Erwartete Ergebnisse

**Format:**

- **Jupyter Notebook** (`Legal_Assistant.ipynb`) mit zehn Kapiteln, sauberer Markdown-Struktur und nachvollziehbaren Code-Zellen
- **Rechtsquellen-Dateien** mit drei bis fünf `.md`-Dateien für den RAG-Teil
- **SQLite-Datenbank** mit Metadaten zu Normen, Urteilen oder Beispielquellen
- **README.md** mit Kurzbeschreibung, Setup-Hinweisen, Quellenbasis und Screenshot der Gradio-Oberfläche
- Eine **M12-Entscheidungsmatrix** zum Vergleich von API-Modell und lokalem Modell
- Ein **Demo-Video** oder ein **Colab-Link**

**Einreichung:**

- Als **Colab-Link**
- Oder als **ZIP-Archiv** mit `.ipynb`, `legal_docs/` und Datenbankdatei
- Oder als **Git-Repository-Link**

### Checkliste Legal-RAG-Workshop

- [ ] Notebook läuft von oben bis unten fehlerfrei durch
- [ ] Alle API-Keys sind über Colab Secrets eingebunden und nicht hardcodiert
- [ ] Alle 10 Kapitel sind implementiert
- [ ] Mindestens 3 Markdown-Dateien mit frei nutzbaren oder selbst erstellten Rechtsquellen sind vorhanden
- [ ] Mindestens 3 RAG-Testfragen mit Bewertung sind dokumentiert
- [ ] SQLite-Datenbank für Rechtsmetadaten ist erstellt
- [ ] Antworten enthalten Quellenangaben oder klare Hinweise auf fehlenden Kontext
- [ ] Middleware-Stack mit Logging, HITL und Retry funktioniert
- [ ] Gradio-UI läuft und zeigt Quellen sichtbar an
- [ ] Lokales Modell getestet oder begründet ausgelassen
- [ ] README.md erklärt Projekt, Setup, Quellenbasis und Grenzen

---

## FAQ

**Q: Kann ich separate Notebooks erstellen statt einem großen?**  
A: Ja. Möglich sind separate Notebooks, etwa `Kapitel_1_Chat.ipynb` bis `Kapitel_10_Lokale_Modelle.ipynb`. Wichtig ist dann, dass spätere Kapitel auf frühere Ergebnisse zugreifen können.

**Q: Ist das eine Rechtsberatung?**  
A: Nein. Das Projekt ist eine technische Übung. Der Assistent arbeitet mit Beispielquellen und soll zeigen, wie RAG, Agenten und Qualitätssicherung in einem juristischen Kontext zusammenspielen.

**Q: Welche Quellen darf ich verwenden?**  
A: Nutze selbst erstellte Texte, frei verfügbare Gesetzestexte oder kurze didaktische Auszüge. Kommerzielle Kommentare, Handbücher und Fachdatenbanken dürfen nur verwendet werden, wenn die Nutzungsrechte das erlauben.

**Q: Welches LLM-Modell soll ich verwenden?**  
A: Für Kapitel 6 (SQL RAG) ist `gpt-5.4-mini` oder größer die robustere Wahl. `gpt-5.4-nano` ist für einfache Demos okay, scheitert aber bei komplexeren Schemata und längeren SQL-Statements häufiger. Für Kapitel 7 (Agent) ist `gpt-5.4-nano` weiterhin für einfache Function-Calling-Beispiele brauchbar.

**Q: Muss ich für M12 ein lokales Modell installieren?**  
A: Wer lokal arbeiten kann, vergleicht ein Open-Source-Modell mit dem API-basierten RAG-System. Wer in Colab oder auf schwacher Hardware arbeitet, dokumentiert stattdessen, warum lokaler Betrieb für diesen Prototyp nicht sinnvoll ist.

**Q: Kann ich andere Vektordatenbanken nutzen?**  
A: Ja, FAISS ist in Colab oft etwas schneller als ChromaDB. Qdrant ist ebenfalls möglich.

**Q: Wo bekomme ich Markdown-Dateien für Legal RAG?**  
A: Optionen:

- Eigene `.md`-Dateien mit kurzen Normauszügen oder didaktischen Fallbeispielen erstellen
- Frei zugängliche Gesetzestexte in kleine Auszüge übertragen
- Eigene Zusammenfassungen öffentlich verfügbarer Entscheidungen schreiben
- `markitdown` für die Konvertierung eigener PDF- oder DOCX-Materialien nutzen

**Q: Mein Colab-Notebook stürzt beim Gradio-Launch ab**  
A: Häufige Ursachen:

- RAM-Limit erreicht -> Runtime -> Factory reset runtime
- Firewall blockiert Share-Link -> `share=False` für lokalen Zugriff testen
- Alte Gradio-Version -> `!pip install --upgrade gradio`

**Q: Kann ich die Übung auch lokal ohne Colab machen?**  
A: Ja. Dann lokal mit Jupyter Notebook oder JupyterLab arbeiten und Folgendes ersetzen:

- `from google.colab import userdata` -> `from dotenv import load_dotenv`
- `files.upload()` -> lokale File-Pfade
- `share=True` -> optional für Gradio

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [KI-Challenge](./ki-challenge.html) | Wie wird aus einem offenen Kursprojekt ein bewertbares End-to-End-System? |
| [RAG-Konzepte](../05-prompting-rag/rag-konzepte.html) | Welche Retrieval-Entscheidungen liegen unter dem Workshop? |
| [Evaluation & Observability](../07-qualitaet-sicherheit/evaluation-observability.html) | Wie wird die Qualität einer RAG-Anwendung überprüfbar? |

---

**Version:** 3.0<br>
**Stand:** Juni 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
