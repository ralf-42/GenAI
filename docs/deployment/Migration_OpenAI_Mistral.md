---
layout: default
title: Migration-Analyse Provider
parent: Deployment
nav_order: 3
description: Migrationsleitfaden für den Wechsel von OpenAI-basierten Kursmodulen in die Mistral-Modellwelt mit LangChain als Abstraktionsschicht
has_toc: true
---

# Migration: OpenAI → Mistral
{: .no_toc }

> **Migrationsleitfaden für das Projekt `GenAI`**      
> Zentrale Aussage: Die Migration wird vor allem dadurch vereinfacht, dass das Projekt bereits stark auf **LangChain** und das umgebende Ökosystem setzt.

{: .note }
> Die Notebooks in `01_notebook/` dienen hier nur als **Beispiele für Migrationstypen**.  
> Relevant ist nicht das einzelne Notebook, sondern **welche Art von Änderung** durch die bestehende LangChain-Struktur einfacher wird.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Kernaussage

Eine Migration von OpenAI zu Mistral ist im Projekt `GenAI` **nicht trivial**, aber sie ist deutlich einfacher, weil große Teile der LLM-Nutzung bereits über **LangChain-Abstraktionen** laufen.

Die Vereinfachung entsteht vor allem durch `init_chat_model(...)` statt provider-spezifischer Roh-Clients, konsistente LangChain-Patterns für Prompts, Chains und Tools sowie wiederkehrende Strukturen für RAG, Structured Output und Agentenlogik. In vielen Notebook-Abschnitten ist der Modellzugriff bereits von der Anwendungslogik getrennt. Die Migration ist deshalb kein vollständiger Neuaufbau und kein Austausch des gesamten Kursmaterials, sondern primär eine kontrollierte Anpassung der Modell- und Provider-Schicht.

---

## Was LangChain bei der Migration vereinfacht

### Vereinheitlichte Modellinitialisierung

Wo Modelle über `init_chat_model(...)` genutzt werden, wird die Migration deutlich leichter: Der Providerwechsel erfolgt über Modell-String und Konfiguration, während die umgebende Prompt-, Chain- oder Agent-Logik häufig gleich bleibt. Dadurch kann derselbe Notebook-Ablauf mit einem anderen Provider getestet werden.

Typische Beispiele im Projekt sind einfache Chat-Aufrufe, LCEL-Chains, Structured Output, Agenten mit `@tool` und MCP-/Agenten-Setups.

### Wiederverwendbare LangChain-Bausteine

Im Projekt wiederholen sich Muster wie `ChatPromptTemplate`, `StrOutputParser`, `with_structured_output()`, `@tool` und `create_agent()`. Das ist migrationsfreundlich, weil diese Muster providerübergreifend ähnlich bleiben. Geändert wird primär, **welches Modell** dahinter hängt.

### Strukturierte Ausgaben bleiben strukturiert

Wenn ein Modul Pydantic-Modelle oder `with_structured_output()` nutzt, muss bei einer Migration nicht die gesamte Extraktionslogik neu geschrieben werden. Geprüft werden muss nur:

- unterstützt das Mistral-Modell den gewünschten Modus stabil
- bleiben Validierung und Feldbelegung robust
- ändern sich Fehlermuster oder Ausgabedisziplin

### Agenten- und Tool-Pfade bleiben grundsätzlich erhalten

Wenn Tools sauber über LangChain gekapselt sind, bleibt bei einer Migration die Tool-Logik in der Regel gleich. Neu zu prüfen ist vor allem:

- wie zuverlässig das Modell Tools auswählt
- wie stabil Parameter gesetzt werden
- ob sich das Verhalten bei mehrstufigen Tool-Aufrufen ändert

---

## Was trotz LangChain nicht automatisch gelöst ist

LangChain vereinfacht den Umbau, aber es hebt Providerunterschiede nicht auf.

### Modellrollen müssen sinnvoll gemappt werden

Auch in `GenAI` gibt es faktisch unterschiedliche Modellrollen:

- günstige Baselines und Demos
- stärkere Modelle für komplexere Aufgaben
- multimodale oder spezialisierte Pfade

Die Migration besteht deshalb nicht nur darin, `"openai:..."` durch `"mistral:..."` zu ersetzen, sondern passende Mistral-Modelle je Einsatzzweck zu wählen.

### Embeddings bleiben ein eigenes Thema

RAG-Module und semantische Suche hängen nicht nur am Chat-Modell. Zu entscheiden ist:

- OpenAI-Embeddings vorerst beibehalten
- oder Mistral-Embeddings ergänzen

Das ist ein separates Migrationsthema.

### Multimodale Pfade müssen einzeln geprüft werden

In `GenAI` gibt es Bild-, Audio- und Video-Beispiele. Diese Pfade dürfen nicht pauschal als gleichwertig migrierbar angenommen werden. Besonders relevant ist:

- welche Modalitäten das jeweilige Mistral-Modell tatsächlich abdeckt
- ob der bisherige Kursablauf fachlich gleich bleibt
- ob ein Hybridpfad sinnvoller ist

### Provider-spezifische Inhalte bleiben provider-spezifisch

Wo Inhalte stark an OpenAI oder einen konkreten API-Pfad gebunden sind, hilft die LangChain-Abstraktion nur begrenzt. Solche Inhalte sollten nicht künstlich in eine generische Migration gezwungen werden.

---

## Welche Migrationsarbeiten konkret anfallen

### Provider-Schicht abstrahieren

Die wichtigste technische Maßnahme ist eine zentrale Modellinitialisierung.

```python
from langchain.chat_models import init_chat_model

MODEL_CONFIG = {
    "openai": {
        "baseline": "openai:gpt-4o-mini",
        "standard": "openai:gpt-4o",
    },
    "mistral": {
        "baseline": "mistral:mistral-small-latest",
        "standard": "mistral:mistral-medium-latest",
    },
}

def get_llm(role: str = "baseline", provider: str = "openai", **kwargs):
    model = MODEL_CONFIG[provider][role]
    return init_chat_model(model, **kwargs)
```

**Effekt:**  
Die eigentliche LangChain-Logik bleibt weitgehend gleich, während die Providerwahl zentralisiert wird.

### Embeddings separat kapseln

```python
from langchain_openai import OpenAIEmbeddings

def get_embeddings(provider: str = "openai"):
    if provider == "openai":
        return OpenAIEmbeddings(model="text-embedding-3-small")
    raise ValueError("Für diesen Provider ist noch kein Embedding-Backend konfiguriert.")
```

**Effekt:**  
Chat-Provider und Embedding-Provider werden sauber getrennt.

### Modul- und Doku-Markierungen ergänzen

Sinnvolle Markierungen:

- `Provider-neutral`
- `OpenAI-spezifisch`
- `Mistral-kompatibel`
- `RAG + Embeddings`
- `Multimodal`

**Effekt:**  
Die Migration wird transparent dokumentiert, ohne dass einzelne Notebooks als starre Migrationsliste gelesen werden.

---

## Wie die Notebooks als Beispiele dienen

Die Notebooks dienen nur dazu, die Typen von Migrationsarbeit anschaulich zu machen. Einfache Prompt- und Chain-Notebooks zeigen, wie gut `init_chat_model(...)` den Providerwechsel abfedert. Structured-Output-Notebooks zeigen, dass die Schemalogik bestehen bleiben kann. Agenten- und Tool-Notebooks machen sichtbar, dass vor allem das Modellverhalten geprüft werden muss, nicht die Tool-Definition selbst. RAG-Notebooks trennen die Embedding-Frage ab, während multimodale Notebooks zeigen, wo eine Einzelfallprüfung nötig bleibt.

Die eigentliche Aussage ist:

> Die Notebooks sind keine Migrationsliste, sondern **Beleg dafür, dass die bestehende LangChain-Struktur die Migration systematisch vereinfacht**.

---

## Prüf- und Testpunkte

Für jede Migration auf Mistral bleiben dieselben Kernfragen relevant: Läuft die bestehende LangChain-Struktur weiter stabil, bleiben Outputs fachlich brauchbar, Structured Output valide und Tool-Aufrufe korrekt? Zusätzlich müssen RAG-Pfade konsistent bleiben, und Latenz sowie Kosten müssen zum Kursbetrieb passen.

**Minimalmatrix:**

| Kriterium | Prüffrage |
|----------|-----------|
| **Qualität** | Ist die Ausgabe im Kurskontext brauchbar? |
| **Structured Output** | Bleibt das Schema stabil gültig? |
| **Tool Use** | Werden Tools sinnvoll und korrekt genutzt? |
| **RAG** | Bleiben Retrieval und Antwortsynthese konsistent? |
| **Latenz** | Ist der Flow noch flüssig? |
| **Kosten** | Ist der Lauf wirtschaftlich vertretbar? |

---

## Empfohlene Reihenfolge

### Phase 1: Provider-Schicht zentralisieren

- `get_llm()`-Pattern einführen
- OpenAI als Default beibehalten
- Mistral als alternative Konfiguration ergänzen

### Phase 2: Einfache LangChain-Pfade testen

- einfache Prompt-, Chain- und Structured-Output-Beispiele mit Mistral durchlaufen
- Unterschiede dokumentieren

### Phase 3: Tool- und Agentenpfade testen

- Tool-Auswahl
- Parameterstabilität
- ReAct-/Agenten-Verhalten

### Phase 4: RAG- und Embedding-Entscheidung treffen

- OpenAI-Embeddings behalten oder Mistral-Embeddings ergänzen
- RAG-Module getrennt bewerten

### Phase 5: Multimodale Pfade einzeln prüfen

- Bild
- Audio
- Video

### Phase 6: Doku nachziehen

- Provider-Markierungen ergänzen
- Mistral-Kompatibilität nur dort behaupten, wo sie geprüft wurde

---

## Fazit

Die eigentliche Botschaft dieser Migration ist: Der Wechsel von OpenAI zu Mistral wird im Projekt `GenAI` nicht deshalb handhabbar, weil Provider austauschbar wären, sondern weil **LangChain die LLM-Schicht bereits stark standardisiert**. Dadurch verschiebt sich die Arbeit weg von einer kompletten Neuerstellung der Notebook-Logik hin zu Provider-Mapping, Modellwahl, Embedding-Entscheidungen, gezielten Qualitätsvergleichen und Einzelfallprüfung bei Multimodalität. Genau darin liegt der architektonische Vorteil des bestehenden Ökosystems.

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Vom Modell zur Anwendung](./Vom_Modell_zum_Produkt_LangChain_Oekosystem.html) | Welche Rolle spielt LangChain im Weg vom Modell zur Anwendung? |
| [Produktionsreife Anwendung](./aus-entwicklung-ins-deployment.html) | Welche technischen Schritte machen ein Notebook deploymentfähig? |

---

**Version:**    2.0<br>
**Stand:**    März 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
