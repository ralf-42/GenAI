---
layout: default
title: Migration-Analyse Provider
parent: Deployment
nav_order: 4
description: Migration von OpenAI-basierten Kursmodulen zu Mistral mit LangChain als Abstraktionsschicht
has_toc: true
---

# Migration: OpenAI → Mistral
{: .no_toc }

> **Migrationsleitfaden für das Projekt `GenAI`**<br>
> Die Migration wird nicht durch Austauschbarkeit der Provider einfach, sondern durch die vorhandene Trennung von Modellzugriff und Anwendungslogik.

> [!NOTE] Einordnung<br>
> Die Notebooks in `01_notebook/` dienen hier als Beispiele für Migrationstypen. Entscheidend ist nicht das einzelne Notebook, sondern welche technische Kopplung dort vorliegt: Chat-Modell, Embedding-Modell, Tool-Aufruf, strukturierte Ausgabe oder multimodaler Pfad.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Kernaussage

Eine Migration von OpenAI zu Mistral ist im Projekt `GenAI` handhabbar, aber nicht mechanisch. LangChain reduziert den Umbau, weil viele Modellaufrufe bereits über `init_chat_model(...)`, `ChatPromptTemplate`, `with_structured_output()`, `@tool` und `create_agent()` laufen. Dadurch ist die fachliche Notebook-Logik oft von der Providerwahl getrennt.

Diese Abstraktion ersetzt keine Qualitätsprüfung. Mistral-Modelle unterscheiden sich bei Modellpalette, Tool-Verhalten, strukturierter Ausgabe, Multimodalität, Latenz, Kosten und Tokenisierung. Die Migration ist deshalb primär eine kontrollierte Anpassung der Provider-Schicht mit anschließender Evaluation, nicht ein globales Suchen-und-Ersetzen von Modellnamen.

> [!WARNING] Typischer Fehler<br>
> `"openai:..."` durch `"mistral:..."` zu ersetzen und das Ergebnis als migriert zu betrachten, übersieht die eigentliche Arbeit: Modellrollen müssen neu gemappt, RAG-Embeddings konsistent gehalten und Tool-Aufrufe gegen reale Testfälle geprüft werden.

---

## Was LangChain vereinfacht

LangChain vereinheitlicht den Zugriff auf Chat-Modelle, Tools und strukturierte Ausgaben. Wo diese Muster sauber verwendet werden, bleibt ein großer Teil des Notebook-Codes unverändert. Der Prompt bleibt ein `ChatPromptTemplate`, das Tool bleibt eine mit `@tool` beschriebene Python-Funktion, und der Agent bleibt ein `create_agent()`-Aufruf.

Die Migrationsarbeit verschiebt sich dadurch auf wenige Stellen: Modellinitialisierung, Umgebungsvariablen, Paketabhängigkeiten, Modellrollen und Tests. Besonders wertvoll ist diese Trennung bei RAG- und Agentenmodulen, weil dort der fachliche Ablauf sonst schnell mit Providerdetails verschmilzt.

Für Mistral wird in LangChain das Paket `langchain-mistralai` benötigt. Zusätzlich muss `MISTRAL_API_KEY` gesetzt sein. Das ist eine eigene Providerabhängigkeit und gehört explizit in Setup-Zellen oder Kursdokumentation.

```bash
pip install -U langchain-mistralai
export MISTRAL_API_KEY="..."
```

---

## Modellrollen

Im Kurs sollte nicht direkt ein alter OpenAI-Modellname durch einen einzelnen Mistral-Modellnamen ersetzt werden. Besser ist ein Rollenmodell. Eine Rolle beschreibt, wofür das Modell eingesetzt wird; der konkrete Provider und Modellname bleiben konfigurierbar.

| Rolle | OpenAI-Beispiel | Mistral-Beispiel | Prüfung |
|---|---|---|---|
| Baseline | `openai:gpt-5.4-nano` | `mistral-small-2603` | kurze Antworten, Kosten, Latenz |
| Standard | `openai:gpt-5.4-mini` | `mistral-medium-3.5` | RAG-Synthese, Tool-Nutzung, strukturierte Ausgabe |
| Starkes Modell | `openai:gpt-5.4` | `mistral-large-2512` | komplexe Aufgaben, längere Kontexte |
| Code | `openai:gpt-5.4-mini` | Devstral- oder Codestral-Modell nach aktueller Modellliste | Codeaufgaben und Repository-Kontext |
| Embeddings | `text-embedding-3-small` | `mistral-embed` oder `codestral-embed` | Vektordimension, Retrievalqualität, Index-Neuaufbau |

Die Mistral-Modellpalette ändert sich aktiv. Daher sollten konkrete Modellnamen als Stand der Dokumentation gelesen und vor produktiver Nutzung gegen die Mistral-Modellseite geprüft werden.

---

## Provider-Schicht

Für providerneutrale Kursbeispiele kann `init_chat_model(...)` weiter die zentrale Einstiegsschicht bleiben, sofern die passende LangChain-Integration installiert ist. Für Mistral-spezifische Fehlersuche ist die direkte Klasse `ChatMistralAI` nützlich, weil sie klar zeigt, welche Providerparameter tatsächlich gesetzt werden.

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
> Eine zentrale Provider-Funktion reduziert Wiederholung, löst aber keine Modellentscheidung. Für jedes Kursmodul muss klar sein, ob es Baseline, Standard, starkes Modell, Code-Modell, Vision-Modell oder Embedding-Modell benötigt.

---

## Embeddings und RAG

RAG-Module hängen nicht nur am Chat-Modell. Das Embedding-Modell bestimmt Vektordimension, Indexkompatibilität und Suchqualität. Wird von OpenAI-Embeddings auf Mistral-Embeddings gewechselt, muss der Vektorindex in der Regel neu aufgebaut werden. Ein bestehender Chroma- oder pgvector-Index mit OpenAI-Vektoren kann nicht einfach mit Mistral-Query-Vektoren weiterverwendet werden.

Mistral bietet mit `mistral-embed` Text-Embeddings und mit `codestral-embed` Code-Embeddings. LangChain stellt dafür `MistralAIEmbeddings` bereit.

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

Für den Kurs ist ein hybrider Übergang sinnvoll: Chat-Modelle können zuerst auf Mistral getestet werden, während OpenAI-Embeddings vorerst erhalten bleiben. Erst wenn die Antwortqualität stabil ist, wird die Embedding-Schicht separat migriert und der Index neu aufgebaut.

---

## Strukturierte Ausgaben und Tools

`with_structured_output()` und Tool Calling sind mit `ChatMistralAI` grundsätzlich verfügbar, aber modellabhängig. Deshalb muss jede strukturierte Ausgabe mit realen Beispielen getestet werden. Entscheidend ist nicht nur, ob ein JSON-Objekt zurückkommt, sondern ob Pflichtfelder stabil belegt werden, Enums eingehalten werden und Fehlerfälle kontrolliert scheitern.

Bei Tools bleibt die Python-Funktion meist gleich. Das Modellverhalten kann sich trotzdem ändern: Ein Mistral-Modell kann ein Tool früher, später oder mit anderen Argumenten aufrufen als ein OpenAI-Modell. Tool-Migration bedeutet deshalb vor allem Laufvergleiche mit denselben Eingaben.

> [!WARNING] Typischer Fehler<br>
> Tool-Definitionen werden oft als providerneutral betrachtet. Die Definition ist providerneutral, die Tool-Auswahl des Modells ist es nicht. Genau diese Auswahl muss evaluiert werden.

---

## Multimodale Pfade

Mistral bietet inzwischen multimodale Modelle und eigene Dokument-, Vision-, Audio- und Agentenfunktionen. Trotzdem sollten Bild-, Audio- und Video-Beispiele nicht pauschal migriert werden. Die LangChain-Python-Integration, das konkrete Modell und der jeweilige API-Pfad müssen zusammenpassen.

Für das Projekt `GenAI` bedeutet das: Text- und Tool-Pfade können zuerst migriert werden. RAG wird wegen der Embedding-Frage getrennt behandelt. Multimodale Module werden einzeln markiert und nur dann als kompatibel ausgewiesen, wenn der konkrete Kursablauf mit Mistral getestet wurde.

---

## Markierung der Kursmodule

Die Migration wird leichter, wenn jedes Modul nicht nach Dateinamen, sondern nach Providerbindung markiert wird.

| Markierung | Bedeutung |
|---|---|
| Providerneutral | LangChain-Abstraktion reicht vermutlich aus |
| OpenAI-spezifisch | OpenAI-API, OpenAI-Modellfeature oder OpenAI-Medienpfad wird direkt genutzt |
| Mistral-kompatibel | Mit Mistral getestet und dokumentiert |
| RAG + Embeddings | Chat- und Embedding-Provider getrennt prüfen |
| Multimodal | Vision, Audio, OCR oder Video einzeln testen |

Diese Markierungen sind keine Verwaltungsschicht um ihrer selbst willen. Sie verhindern, dass eine erfolgreiche Textmigration fälschlich als vollständige Provider-Migration gelesen wird.

---

## Prüfplan

Die Migration sollte mit kleinen, reproduzierbaren Testfällen beginnen. Zuerst wird die Provider-Schicht zentralisiert und OpenAI bleibt der Default. Danach wird Mistral als alternative Konfiguration ergänzt. Einfache Prompt- und Structured-Output-Beispiele zeigen, ob die Basisschicht funktioniert. Erst danach folgen Tool-Agenten, RAG und multimodale Pfade.

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

Eine belastbare Migration entsteht in sechs Schritten. Zuerst wird eine zentrale Provider-Konfiguration eingeführt. Danach laufen einfache Chat- und Prompt-Beispiele mit Mistral. Im dritten Schritt werden strukturierte Ausgaben und Tool-Agents geprüft. RAG folgt erst danach, weil Embeddings und Indexkompatibilität ein eigenes Thema sind. Multimodale Pfade werden zuletzt einzeln getestet. Am Ende werden die Modulmarkierungen und die Dokumentation aktualisiert.

Diese Reihenfolge verhindert, dass viele Fehlerquellen gleichzeitig auftreten. Wenn bereits ein einfacher Prompt mit Mistral instabil ist, muss kein RAG-Index neu gebaut werden. Wenn Structured Output stabil läuft, aber Tool-Aufrufe scheitern, liegt das Problem wahrscheinlich im Modellverhalten und nicht im LangChain-Adapter.

---

## Fazit

Der Wechsel von OpenAI zu Mistral wird im Projekt `GenAI` durch LangChain deutlich einfacher, bleibt aber eine echte Migration. Die Modellschicht lässt sich zentralisieren, Tools und Prompts können oft erhalten bleiben, und viele Kursmodule brauchen keinen vollständigen Neuaufbau. Entscheidend sind Rollenmapping, Provider-Setup, Embedding-Strategie, strukturierte Tests und eine klare Kennzeichnung, welche Module wirklich mit Mistral geprüft wurden.

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
| [Minimum Viable GenAI Stack](./minimum-viable-genai-stack.html) | Welche Schichten müssen bei einer Provider-Migration getrennt betrachtet werden? |

---

**Version:** 2.1<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
