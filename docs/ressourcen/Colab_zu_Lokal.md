---
layout: default
title: Von Colab zu Local
parent: Ressourcen
nav_order: 6
description: Anleitung zur Ausführung der Kurs-Notebooks in einer lokalen Jupyter-Umgebung
has_toc: true
---

# Von Colab zur lokalen Umgebung
{: .no_toc }

> **Welche Anpassungen sind nötig, um die Kurs-Notebooks lokal auszuführen?** 

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

In Colab übernimmt `setup_api_keys()` die Keys aus dem Colab-Secret-Manager. Lokal müssen die Keys vorab gesetzt werden — am einfachsten über eine `.env`-Datei im Projektverzeichnis:

```bash
# Datei: GenAI/.env
OPENAI_API_KEY=sk-...
HF_TOKEN=hf_...          # nur für M17 (Multimodal RAG)
LANGSMITH_API_KEY=ls__...  # optional, für LangSmith-Tracing
```

```python
# Alternativ: direkt in der ersten Notebook-Zelle setzen
import os
os.environ["OPENAI_API_KEY"] = "sk-..."
```

{: .warning }
> `.env`-Datei niemals in Git einchecken — Eintrag in `.gitignore` prüfen.

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
| **M08** (RAG) | ChromaDB, Embeddings | `pip install chromadb langchain-community` |
| **M12** (MCP) | `!uv pip install fastmcp langchain-mcp-adapters nest_asyncio uvicorn` | `pip install fastmcp langchain-mcp-adapters nest_asyncio uvicorn` |
| **M13** (Gradio) | `demo.launch(quiet=True)` | Bleibt unverändert — öffnet automatisch im Browser |
| **M14** (Lokale Modelle) | Benötigt [Ollama](https://ollama.com) als lokalen LLM-Server | Ollama separat installieren und Modell laden: `ollama pull llama3` |
| **M17** (Multimodal RAG) | Zusätzlicher Key: `HF_TOKEN` für Hugging Face | In `.env` oder `os.environ["HF_TOKEN"]` setzen |

---

## Was sich nicht ändert

{: .note }
> Die Notebooks haben **minimale Colab-Abhängigkeiten** — der Großteil läuft lokal ohne jede Änderung.

- ✅ Alle LangChain / LangGraph Patterns
- ✅ Alle relativen Dateipfade (keine `/content/`-Pfade in den Notebooks)
- ✅ Kein Google Drive Mounting erforderlich (Notebooks sind selbst-contained)
- ✅ `mprint()`, `mermaid()`, `load_prompt()` aus genai_lib
- ✅ LangSmith-Umgebungsvariablen (`os.environ["LANGSMITH_TRACING"]` etc.)

---

## Kurzcheck vor dem ersten Start

- [ ] Virtuelle Umgebung aktiv? (`.venv\Scripts\activate`)
- [ ] `genai_lib` installiert? (`pip show genai-lib`)
- [ ] `OPENAI_API_KEY` gesetzt? (`echo %OPENAI_API_KEY%`)
- [ ] `#@title`- und `get_ipinfo()`-Zeilen entfernt?
- [ ] Notebook-spezifische Zusatzpakete installiert (M08, M12, M14, M17)?
- [ ] Für M14: Ollama installiert und gestartet?

---

**Version:**    1.0
**Stand:**    März 2026
**Kurs:**    Generative KI. Verstehen. Anwenden. Gestalten.
