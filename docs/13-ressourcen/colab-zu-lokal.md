---
layout: default
title: Von Colab zu Local
parent: Ressourcen
nav_order: 3
description: Anleitung zur Ausführung der Kurs-Notebooks in einer lokalen Jupyter-Umgebung
has_toc: true
---

# Von Colab zur lokalen Umgebung
{: .no_toc }

> [!NOTE] Lokale Ausführung<br>
> Colab-spezifische Setup-Zeilen werden lokal durch eine virtuelle Umgebung, installierte Pakete und gesetzte Umgebungsvariablen ersetzt.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Einmalige Einrichtung

### Python-Umgebung & genai_lib

```bash
# Virtuelle Umgebung erstellen (empfohlen)
python -m venv .venv
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # Mac/Linux

# genai_lib installieren (ersetzt !uv pip install --system in Colab)
pip install git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul
```

### API-Keys einrichten

In Colab übernimmt `setup_api_keys()` die Keys aus dem Colab-Secret-Manager. Lokal müssen die Keys vorab gesetzt werden. Für lokale Kursläufe eignet sich eine `.env`-Datei im Projektverzeichnis, sofern sie nicht versioniert wird:

```bash
# Datei: GenAI/.env
OPENAI_API_KEY=sk-...
HF_TOKEN=hf_...          # optional, z. B. für Hugging-Face-Modelle oder multimodale Demos
LANGSMITH_API_KEY=ls__...  # optional, für LangSmith-Tracing
```

```python
# Alternativ: direkt in der ersten Notebook-Zelle setzen
import os
os.environ["OPENAI_API_KEY"] = "sk-..."
```

> [!WARNING] Schlüsseldateien<br>
> `.env`-Datei niemals in Git einchecken. Der Eintrag in `.gitignore` muss vor dem ersten Commit geprüft werden.

---

## Anpassungen in der Setup-Zelle

Jedes Notebook enthält eine erste Zelle mit Colab-spezifischem Code. Diese Zeilen müssen angepasst werden:

| Colab-Code | Lokal ersetzen durch | Aufwand |
|---|---|---|
| `!uv pip install --system -q <paket>` | Einmalig im Terminal: `pip install <paket>` | Einmalig |
| `#@title 🔧 Umgebung einrichten{ display-mode: "form" }` | Zeile löschen | Kosmetik |
| `#@markdown <p><font ...>...</font></p>` | Zeile löschen | Kosmetik |
| `get_ipinfo()` | Zeile auskommentieren | Optional |

**Beispiel: Colab → Lokal**

```python
# ❌ Colab (original)
#@title 🔧 Umgebung einrichten{ display-mode: "form" }
!uv pip install --system -q git+https://github.com/ralf-42/GenAI.git#subdirectory=04_modul
from genai_lib.utilities import check_environment, setup_api_keys, mprint, mermaid
setup_api_keys(['OPENAI_API_KEY'])
check_environment()
get_ipinfo()

# ✅ Lokal (angepasst)
from genai_lib.utilities import check_environment, setup_api_keys, mprint, mermaid
setup_api_keys(['OPENAI_API_KEY'])
check_environment()
```

---

## Besonderheiten einzelner Module

| Modul | Besonderheit | Lokale Anpassung |
|---|---|---|
| **M06** (RAG) | ChromaDB, Embeddings | `pip install chromadb langchain-community langchain-openai` |
| **M10** (MCP) | `!uv pip install fastmcp langchain-mcp-adapters nest_asyncio uvicorn` | `pip install fastmcp langchain-mcp-adapters nest_asyncio uvicorn` |
| **M11** (Gradio) | `demo.launch()` | Bleibt unverändert — öffnet lokal eine Browser-URL |
| **M12** (Lokale Modelle) | Benötigt [Ollama](https://ollama.com) als lokalen LLM-Server | Ollama separat installieren und Modell laden: `ollama pull llama3` |
| **M15** (Multimodal RAG) | CLIP/Sentence Transformers und ggf. `HF_TOKEN` für Hugging Face | Zusatzpakete installieren und `HF_TOKEN` bei Bedarf in `.env` setzen |

---

## Was sich nicht ändert

> [!NOTE] Colab-Abhängigkeiten<br>
> Die Notebooks haben minimale Colab-Abhängigkeiten. Der Großteil läuft lokal ohne Änderung.

- Alle LangChain / LangGraph Patterns
- Alle relativen Dateipfade (keine `/content/`-Pfade in den Notebooks)
- Kein Google Drive Mounting erforderlich (Notebooks sind selbst-contained)
- `mprint()`, `mermaid()`, `load_prompt()` aus genai_lib
- LangSmith-Umgebungsvariablen (`os.environ["LANGSMITH_TRACING"]` etc.)

---

## Kurzcheck vor dem ersten Start

- [ ] Virtuelle Umgebung aktiv? (`.venv\Scripts\activate`)
- [ ] `genai_lib` installiert? (`pip show genai-lib`)
- [ ] `OPENAI_API_KEY` gesetzt? (`echo %OPENAI_API_KEY%`)
- [ ] Colab-Metadatenzeilen wie `#@title` und optionale `get_ipinfo()`-Aufrufe entfernt?
- [ ] Notebook-spezifische Zusatzpakete installiert (M06, M10, M11, M12, M15)?
- [ ] Für M12: Ollama installiert und gestartet?


## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Zuerst lesen](../zuerst-lesen.html) | Welche Dokumente sind vor dem ersten Kursprojekt am wichtigsten? |
| [Lernpfade](../lernpfade.html) | Welche Reihenfolge passt zu Rolle, Ziel und Vorkenntnissen? |

---

**Version:** 1.1<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
