---
layout: default
title: Migration-Analyse Provider
parent: Deployment
nav_order: 5
description: Migration von OpenAI-basierten Kursmodulen zu Mistral mit LangChain als Abstraktionsschicht
has_toc: true
---

# Migration: OpenAI → Mistral
{: .no_toc }

> **Migrationsleitfaden für das Projekt `GenAI`**<br>
> Die Migration klappt nicht einfach „durch Austausch“, weil das Projekt die Modellzugriffe bewusst von der Anwendungslogik trennt.

> [!NOTE] Einordnung<br>
> Die Notebooks in `01_notebook/` zeigen hier nur Beispiele für verschiedene Migrationstypen. Entscheidend ist nicht das einzelne Notebook, sondern welche technische Kopplung dort wirklich drin ist: Chat-Modell, Embedding-Modell, Tool-Aufruf, strukturierte Ausgabe oder multimodale Pfade.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Kernaussage

Eine Migration von OpenAI zu Mistral ist im Projekt `GenAI` gut machbar – nur eben nicht als blindes Copy-Paste. LangChain reduziert den Umbau deutlich, weil viele Modellaufrufe bereits über `init_chat_model(...)`, `ChatPromptTemplate`, `with_structured_output()`, `@tool` und `create_agent()` laufen. Dadurch bleibt die fachliche Notebook-Logik oft erstaunlich nah am Original, während die Providerwahl „hinten“ in der Modellschicht passiert.

Trotzdem ersetzt das nicht die Prüfung. Mistral unterscheidet sich bei Modellpalette, Tool-Verhalten, strukturierter Ausgabe, Multimodalität, Latenz, Kosten und Tokenisierung. Die Migration ist daher eine kontrollierte Anpassung der Provider-Schicht – mit anschließender Evaluation. Nicht ein globales Suchen-und-ersetzen von Modellnamen.

> [!WARNING] Typischer Fehler<br>
> `"openai:..."` durch `"mistral:..."` zu ersetzen und das Ergebnis dann als „fertig migriert“ zu werten, übersieht den eigentlichen Aufwand: Modellrollen müssen sauber neu gemappt werden, RAG-Embeddings müssen konsistent gehalten werden, und Tool-Aufrufe gehören gegen reale Testfälle geprüft.

---

## Was LangChain vereinfacht

LangChain bringt Ordnung in den Zugriff auf Chat-Modelle, Tools und strukturierte Ausgaben. Wenn die Muster im Kurs sauber verwendet werden, bleibt viel Code unangetastet: Das Prompting läuft weiter über ein `ChatPromptTemplate`, Tools bleiben Python-Funktionen mit `@tool`, und Agents bleiben ein `create_agent()`-Aufruf.

So verschiebt sich die Arbeit auf wenige Stellen: Modellinitialisierung, Umgebungsvariablen, Paketabhängigkeiten, Rollen/Mapping und Tests. Besonders stark wirkt diese Trennung bei RAG- und Agentenmodulen, weil dort sonst sehr schnell Provider-Details in die fachliche Logik hineinrutschen.

Für Mistral braucht ihr das Paket `langchain-mistralai`. Außerdem muss `MISTRAL_API_KEY` gesetzt sein. Das gehört entweder in Setup-Zellen oder sauber in die Kursdokumentation.

```bash
pip install -U langchain-mistralai
export MISTRAL_API_KEY="..."
```

---

## Modellrollen

Für den Kurs ist es besser, nicht einfach „irgendeinen“ OpenAI-Modellnamen 1:1 gegen einen Mistral-Modellnamen zu tauschen. Stattdessen arbeitet ihr mit Rollen. Eine Rolle beschreibt, wofür das Modell eingesetzt wird; der konkrete Provider und Modellname kommen aus der Konfiguration.

| Rolle | OpenAI-Beispiel | Mistral-Beispiel | Prüfung |
|---|---|---|---|
| Baseline | `openai:gpt-5.4-nano` | `mistral-small-2603` | kurze Antworten, Kosten, Latenz |
| Standard | `openai:gpt-5.4-mini` | `mistral-medium-3.5` | RAG-Synthese, Tool-Nutzung, strukturierte Ausgabe |
| Starkes Modell | `openai:gpt-5.4` | `mistral-large-2512` | komplexe Aufgaben, längere Kontexte |
| Code | `openai:gpt-5.4-mini` | Devstral- oder Codestral-Modell nach aktueller Modellliste | Codeaufgaben und Repository-Kontext |
| Embeddings | `text-embedding-3-small` | `mistral-embed` oder `codestral-embed` | Vektordimension, Retrievalqualität, Index-Neuaufbau |

Die Mistral-Modellpalette verändert sich laufend. Deshalb sind die konkreten Modellnamen als momentaner Stand zu verstehen – vor einem produktiven Einsatz lohnt sich immer der Blick auf die aktuelle Mistral-Modellseite.

---

## Provider-Schicht

Für providerneutrale Kursbeispiele kann `init_chat_model(...)` die zentrale Einstiegsschicht bleiben – vorausgesetzt die passende LangChain-Integration ist installiert. Wenn ihr gezielt Mistral-spezifische Fehler finden wollt, hilft zusätzlich die direkte Klasse `ChatMistralAI`, weil man dort sehr klar sieht, welche Providerparameter wirklich gesetzt sind.

```python
from langchain.chat_models import init_chat_model

MODEL_CONFIG = {
    "openai": {
        "baseline": "openai:gpt-5.4-nano",
        "standard": "openai:gpt-5.4-mini",
    },
    "mistral": {
        "baseline": "mistral:mistral-small-2603",
        "standard": "mistral:mistral-medium-3.5",
    },
}


def get_llm(role: str = "baseline", provider: str = "openai", **kwargs):
    model = MODEL_CONFIG[provider][role]
    return init_chat_model(model, **kwargs)
```

Für direkte Mistral-Tests:

```python
from langchain_mistralai import ChatMistralAI

llm = ChatMistralAI(
    model="mistral-medium-3.5",
    temperature=0,
    max_retries=2,
)
```

> [!NOTE] Grenze<br>
> Eine zentrale Provider-Funktion spart Wiederholung – entscheidet aber nicht, welches Modell fachlich passt. Für jedes Kursmodul muss klar sein, ob Baseline, Standard, starkes Modell, Code-Modell, Vision-Modell oder Embedding-Modell gebraucht wird.

---

## Embeddings und RAG

RAG-Module hängen nicht nur am Chat-Modell. Das Embedding-Modell bestimmt Vektordimension, Indexkompatibilität und damit die Suchqualität. Wenn ihr von OpenAI-Embeddings auf Mistral-Embeddings wechselt, führt das in der Regel zu einem neuen Index-Aufbau. Ein bestehender Chroma- oder pgvector-Index mit OpenAI-Vektoren lässt sich meist nicht einfach weiterverwenden, weil die Query-Vektoren dann nicht mehr zusammenpassen.

Mistral bietet Text-Embeddings über `mistral-embed` sowie Code-Embeddings über `codestral-embed`. In LangChain gibt es dafür `MistralAIEmbeddings`.

```python
from langchain_mistralai import MistralAIEmbeddings
from langchain_openai import OpenAIEmbeddings


def get_embeddings(provider: str = "openai", domain: str = "text"):
    if provider == "openai":
        return OpenAIEmbeddings(model="text-embedding-3-small")

    if provider == "mistral" and domain == "text":
        return MistralAIEmbeddings(model="mistral-embed")

    if provider == "mistral" and domain == "code":
        return MistralAIEmbeddings(model="codestral-embed")

    raise ValueError(f"Kein Embedding-Backend für {provider=} und {domain=}.")
```

Für den Kurs ist ein hybrider Übergang oft sinnvoll: Erst die Chat-Modelle auf Mistral testen, während die Embeddings vorerst weiter von OpenAI kommen. Wenn die Antwortqualität stabil ist, migriert ihr die Embedding-Schicht bewusst – und baut den Index neu auf.

---

## Strukturierte Ausgaben und Tools

`with_structured_output()` und Tool Calling sind mit `ChatMistralAI` grundsätzlich verfügbar, aber wie gut es klappt hängt am konkreten Modell. Deshalb gehört jede strukturierte Ausgabe mit echten Beispielen getestet: Es reicht nicht zu sehen, dass überhaupt ein JSON zurückkommt. Prüft, ob Pflichtfelder zuverlässig gesetzt werden, ob Enums eingehalten werden und ob Fehlerfälle sauber fehlschlagen (statt still „falsch“ zu liefern).

Bei Tools bleibt eure Python-Definition meist gleich. Das Modellverhalten kann sich trotzdem ändern: Ein Mistral-Modell kann Tools früher oder später aufrufen, oder mit abweichenden Argumenten als ein OpenAI-Modell. Tool-Migration heißt daher vor allem: gleiche Eingaben, gleiche Tool-Definition, und dann gegen erwartete Ergebnisse laufen lassen.

> [!WARNING] Typischer Fehler<br>
> Tool-Definitionen wirken oft providerneutral. Die Definition ist es vielleicht – aber die Tool-Auswahl durch das Modell ist es nicht. Genau diese Auswahl müsst ihr evaluieren.

---

## Multimodale Pfade

Mistral bietet inzwischen multimodale Modelle sowie eigene Dokument-, Vision-, Audio- und Agenten-Funktionen. Trotzdem sollte man Bild-, Audio- und Video-Beispiele nicht einfach „mitmigrieren“. In der Praxis müssen LangChain-Python-Integration, konkretes Modell und der passende API-Pfad zusammenpassen.

Für `GenAI` bedeutet das: Text- und Tool-Pfade könnt ihr meist als Erstes migrieren. RAG behandelt ihr getrennt, weil Embeddings und Indexkompatibilität sonst gleichzeitig Probleme machen. Multimodale Module werden einzeln gekennzeichnet und erst dann als kompatibel betrachtet, wenn der konkrete Kursablauf mit Mistral wirklich getestet wurde.

---

## Markierung der Kursmodule

Die Migration wird deutlich leichter, wenn ihr Module nicht nach Dateinamen, sondern nach ihrer Providerbindung klassifiziert.

| Markierung | Bedeutung |
|---|---|
| Providerneutral | LangChain-Abstraktion reicht vermutlich aus |
| OpenAI-spezifisch | OpenAI-API, OpenAI-Modellfeature oder OpenAI-Medienpfad wird direkt genutzt |
| Mistral-kompatibel | Mit Mistral getestet und dokumentiert |
| RAG + Embeddings | Chat- und Embedding-Provider getrennt prüfen |
| Multimodal | Vision, Audio, OCR oder Video einzeln testen |

Diese Markierungen sind keine reine Verwaltung. Sie verhindern, dass eine erfolgreiche Textmigration fälschlich als „vollständige Provider-Migration“ verstanden wird.

---

## Prüfplan

Plant die Migration mit kleinen, reproduzierbaren Testfällen. Startet so, dass ihr früh merkt, ob die Basis funktioniert. Erst die Provider-Schicht zentralisieren, OpenAI als Default lassen. Danach Mistral als zusätzliche Konfiguration ergänzen. An kleinen Prompt- und Structured-Output-Beispielen zeigt sich schnell, ob die Basisschicht sitzt.

Erst wenn das stabil läuft, kommt Tool-Agenten- und Tool-Use in den Fokus. RAG kommt danach, weil Embeddings und Indexkompatibilität ein eigenes Kapitel sind. Multimodale Pfade kommen ganz am Ende – einzeln testen und nur dann als „grün“ markieren, wenn die konkreten Eingaben wirklich passen.

| Bereich | Prüffrage |
|---|---|
| Setup | Sind `langchain-mistralai` und `MISTRAL_API_KEY` vorhanden? |
| Modellrolle | Passt das Mistral-Modell zur bisherigen OpenAI-Rolle? |
| Message-Format | Akzeptiert das Modell die Rollen- und Nachrichtenfolge? |
| Strukturierte Ausgabe | Bleiben Pydantic-Schema und Validierung stabil? |
| Tool Use | Werden Tools mit korrekten Argumenten aufgerufen? |
| RAG | Wurde der Embedding-Provider bewusst gewählt und der Index passend aufgebaut? |
| Multimodal | Unterstützt genau dieses Modell den benötigten Eingabetyp? |
| Tracing | Sind LangSmith-Traces für OpenAI- und Mistral-Läufe vergleichbar? |
| Kosten und Latenz | Passt der Lauf zum Kursbetrieb? |

---

## Reihenfolge

Eine belastbare Migration entsteht in sechs Schritten. Zuerst führt ihr eine zentrale Provider-Konfiguration ein. Danach laufen einfache Chat- und Prompt-Beispiele mit Mistral. Im dritten Schritt prüft ihr strukturierte Ausgaben und Tool-Agenten. RAG kommt erst danach, weil Embeddings und Indexkompatibilität ein eigenes Risiko sind. Multimodale Pfade testet ihr als Einzelthema. Zum Schluss aktualisiert ihr Modulmarkierungen und die Dokumentation.

So verhindert ihr, dass mehrere Fehlerquellen gleichzeitig auftauchen. Wenn ein einfacher Prompt mit Mistral schon instabil ist, braucht ihr noch keinen neuen RAG-Index. Wenn Structured Output klappt, aber Tool-Aufrufe nicht, liegt das Problem eher im Modellverhalten als im LangChain-Adapter.

---

## Fazit

Der Wechsel von OpenAI zu Mistral wird im Projekt `GenAI` durch LangChain deutlich einfacher, bleibt aber eine echte Migration. Die Modellschicht lässt sich zentralisieren, Tools und Prompts bleiben häufig erhalten, und viele Kursmodule brauchen keinen kompletten Neuaufbau. Entscheidend sind Rollenmapping, Provider-Setup, die Embedding-Strategie, strukturierte Tests und eine klare Kennzeichnung, welche Module wirklich mit Mistral geprüft wurden.

---

## Quellen

- [LangChain MistralAI Integration](https://docs.langchain.com/oss/python/integrations/providers/mistralai)
- [ChatMistralAI](https://docs.langchain.com/oss/python/integrations/chat/mistralai/)
- [Mistral Models](https://docs.mistral.ai/models)
- [Mistral Text Embeddings](https://docs.mistral.ai/capabilities/embeddings/text_embeddings)
- [Mistral Code Embeddings](https://docs.mistral.ai/capabilities/embeddings/code_embeddings)

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Vom Modell zur Anwendung](./vom-modell-zum-produkt.html) | Welche Rolle spielt LangChain im Weg vom Modell zur Anwendung? |
| [Vom Notebook zum Produkt](./vom-notebook-zum-produkt.html) | Welche technischen Schritte machen ein Notebook deploymentfähig? |
| [Middleware & Integrationsschicht](./middleware-integrationsschicht.html) | Wo sollte Provider-Auswahl und Zugriffskontrolle gekapselt werden? |
| [Minimum Viable GenAI Stack](./minimum-viable-genai-stack.html) | Welche Schichten müssen bei einer Provider-Migration getrennt betrachtet werden? |

---

**Version:** 2.1<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
