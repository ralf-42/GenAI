---
layout: default
title: Von Colab zu Local
parent: Ressourcen
nav_order: 3
description: GenAI-Kursnotebooks in einer lokalen Jupyter-Umgebung ausführen
has_toc: true
---

# Von Colab zur lokalen Umgebung
{: .no_toc }

Diese Anleitung beschreibt zwei Wege: Notebooks direkt in lokalem Jupyter ausführen oder die Colab-Oberfläche mit einem lokalen Jupyter-Runtime verbinden.

---

## Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Weg 1: Notebooks in lokalem Jupyter ausführen

### 1. Repository und Python-Umgebung vorbereiten

Die Kursbibliothek `genai_lib` benötigt Python 3.11 oder neuer. Öffne ein Terminal im geklonten Repository `GenAI`.

**Windows PowerShell:**

```powershell
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install jupyterlab ipykernel python-dotenv
python -m pip install -e .\04_modul
python -m ipykernel install --user --name genai --display-name "Python (GenAI)"
jupyter lab
```

**macOS oder Linux:**

```bash
python3.11 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install jupyterlab ipykernel python-dotenv
python -m pip install -e ./04_modul
python -m ipykernel install --user --name genai --display-name "Python (GenAI)"
jupyter lab
```

Die Installation von `genai_lib` lädt die Basisabhängigkeiten aus `04_modul/requirements.txt`. Wähle in Jupyter den Kernel **Python (GenAI)** und öffne ein Notebook aus `01_notebook`.

Starte Jupyter aus dem Repository-Verzeichnis `GenAI`, damit relative Pfade zu `02_daten`, `files` und weiteren Kursdateien aufgelöst werden.

### 2. API-Schlüssel lokal bereitstellen

`setup_api_keys()` liest Schlüssel aus dem Colab-Secret-Manager und ist für Colab gedacht. Lokal lädt `python-dotenv` die Werte aus einer `.env`-Datei im Repository-Verzeichnis.

Lege lokal eine `.env`-Datei an:

```text
OPENAI_API_KEY=dein-openai-schluessel
LANGSMITH_API_KEY=dein-langsmith-schluessel
HF_TOKEN=dein-huggingface-token
```

Ergänze nur die Schlüssel, die das ausgewählte Notebook verwendet. Lade sie in der ersten Setup-Zelle:

```python
import os

from dotenv import load_dotenv

load_dotenv()

print({
    name: bool(os.getenv(name))
    for name in ("OPENAI_API_KEY", "LANGSMITH_API_KEY", "HF_TOKEN")
})
```

Die `.env`-Datei ist im GenAI-Repository durch `.gitignore` ausgeschlossen. Die Prüfung zeigt nur, ob die Variablen vorhanden sind; sie gibt ihre Werte nicht aus.

### 3. Colab-spezifische Setup-Zellen anpassen

| Colab-Element | Lokaler Ablauf |
|---|---|
| `!uv pip install --system ...` | Installiere Pakete in der aktivierten Umgebung mit `python -m pip install <paket>` oder in einer Notebook-Zelle mit `%pip install <paket>`. |
| `install_packages([...])` aus `genai_lib.utilities` | Installiere die aufgeführten Pakete einmalig in der aktiven Umgebung; der Helper nutzt `uv` für Colab. |
| `setup_api_keys([...])` | Lade die Schlüssel mit `load_dotenv()` oder setze sie in der Terminal-Umgebung. |
| `#@title` und `#@markdown` | Die Zeilen bleiben in Python gültige Kommentare. In Jupyter erscheinen sie nicht als Colab-Formulare. |
| `get_ipinfo()` | Die Funktion fragt externe Netzwerkinformationen ab. Führe sie nur aus, wenn du diese Diagnose benötigst. |
| `drive.mount(...)` | Verwende lokale Datenpfade und lokale Persistenz. Colabs Drive-Mount steht lokal nicht zur Verfügung. |

Führe die Zellen nach der Einrichtung in einem frischen Kernel der Reihe nach von oben nach unten aus.

### Notebook-spezifische Zusatzpakete

Die Basisabhängigkeiten stehen in `04_modul/requirements.txt`. Diese Notebooks benötigen zusätzliche Komponenten:

| Notebook | Zusatzpakete oder externe Voraussetzung |
|---|---|
| `M06_RAG_LangChain.ipynb` | `langchain-huggingface`; `markitdown[all]` ist in der Basisumgebung enthalten. |
| `M10_MCP_LangChain_Agent.ipynb` | `fastmcp`, `langchain-mcp-adapters`, `uvicorn` |
| `M11_Gradio.ipynb` | `gradio` |
| `M12_Lokale_Open_Source_Modelle.ipynb` | Ollama separat installieren und ein im Notebook verwendetes Modell laden. |
| `M13_Fine_Tuning_Unsloth.ipynb` | `unsloth`, `transformers` und eine kompatible NVIDIA-GPU/CUDA-Umgebung; nach der Installation ist ein Kernel-Neustart erforderlich. |
| `M16_Multimodal_Bild.ipynb` | `ultralytics` für die YOLO-Objekterkennung. |
| `M17_Multimodal_RAG.ipynb` | `markitdown[all]` ist in der Basisumgebung enthalten. |

Installiere nur die Pakete für das jeweilige Notebook:

```powershell
python -m pip install langchain-huggingface "markitdown[all]"
python -m pip install fastmcp langchain-mcp-adapters uvicorn
python -m pip install gradio
python -m pip install ultralytics
```

Die Fine-Tuning-Umgebung hängt von Betriebssystem, CUDA und GPU ab. Installiere Unsloth und Transformers nach der [aktuellen Unsloth-Installationsanleitung](https://docs.unsloth.ai/get-started/installing-%2B-updating/pip-install). Für Inferenz mit lokalen Modellen wird Ollama als eigener Dienst benötigt; installiere Ollama nach dessen [aktueller Dokumentation](https://ollama.com/download) und lade anschließend das Modell aus dem Notebook.

### Lokale Dateien und Google Drive

Die meisten GenAI-Notebooks greifen auf Dateien relativ zum Arbeitsverzeichnis zu. Lege die erforderlichen Eingaben dort ab und starte Jupyter aus dem Repository-Verzeichnis.

| Notebook | Lokale Anpassung |
|---|---|
| `M06_RAG_LangChain.ipynb` | Die Kursdokumente und Chroma-Datenbanken werden lokal im Arbeitsverzeichnis angelegt. Die Datenbankordner heißen unter anderem `chroma_demo` und `chroma_db`. |
| `M10_MCP_LangChain_Agent.ipynb` | Ersetze den Drive-Root `/content/drive/MyDrive` durch den Pfad zum lokalen GenAI-Repository. `NOTEBOOK_ROOT` muss auf die lokalen Notebook-Dateien zeigen. |
| `M13_Fine_Tuning_Unsloth.ipynb` | Lege die Trainingsdatei `pneumatische_plastologie_trainset_en_clean_reinforced.json` im erwarteten lokalen Datenpfad ab. |
| `M16_Multimodal_Bild.ipynb` | Lege die Eingabebilder im verwendeten lokalen Ordner `files` ab. |
| `M17_Multimodal_RAG.ipynb` | Lege die Text- und Bilddateien im Ordner `files` ab. Der persistente Vektorstore liegt standardmäßig unter `multimodal_rag_db`. |
| `M18_Multimodal_Audio.ipynb` | Lege die verwendeten Audiodateien im Arbeitsverzeichnis ab. |

Google Drive wird in den aktiven Kursnotebooks nur für den Datei-Zugriff im MCP-Beispiel M10 eingebunden. Für die lokale Ausführung zeige `NOTEBOOK_ROOT` auf den geklonten Ordner. Die übrigen genannten Datenpfade werden lokal verwaltet.

### GPU und lokale Modelle

Die OpenAI-API-Notebooks benötigen keine lokale GPU. Das Modell-Notebook M12 nutzt lokal ausgeführte Ollama-Modelle; passende Hardware beschleunigt die Inferenz. M13 Fine-Tuning setzt eine kompatible NVIDIA-GPU mit CUDA und ausreichend Speicher voraus. Für weitere Bild- und Embedding-Aufgaben hängt eine GPU-Empfehlung vom jeweiligen Arbeitsschritt ab.

## Weg 2: Colab-Oberfläche mit lokalem Jupyter verbinden

Bei diesem Weg bleibt die Colab-Oberfläche geöffnet, während der Code auf dem eigenen Rechner läuft. Installiere zusätzlich `notebook` in der aktivierten Umgebung:

```powershell
python -m pip install notebook
jupyter notebook --NotebookApp.allow_origin="https://colab.research.google.com" --port=8888 --NotebookApp.port_retries=0 --NotebookApp.allow_credentials=True
```

Kopiere die beim Start ausgegebene Runtime-URL. Wähle in Colab **Connect** → **Connect to local runtime...** und füge die URL ein. Die Oberfläche kann sich ändern; die aktuelle Anleitung steht bei [Google Colab: Local runtimes](https://research.google.com/colaboratory/local-runtimes.html).

Eine lokale Runtime gibt Notebook-Code Zugriff auf Dateien und Ressourcen des Rechners. Führe dort nur Notebooks aus, deren Inhalte du geprüft hast. Code-Zellenausgaben werden bei diesem Verbindungsweg standardmäßig in Google Drive gespeichert; die lokale Runtime wird beim Teilen des Notebooks nicht mitgeteilt. [Google Colab FAQ](https://research.google.com/colaboratory/faq.html)

Für dauerhaft lokale Daten und Datei-Pfade ist Weg 1 meist einfacher.

## Kurzcheck

- Python 3.11 oder neuer ist aktiv.
- `genai_lib` ist in der virtuellen Umgebung installiert.
- Jupyter verwendet den Kernel **Python (GenAI)**.
- API-Schlüssel sind als Umgebungsvariablen geladen.
- Zusatzpakete des ausgewählten Notebooks sind installiert.
- Lokale Dateien liegen an den erwarteten Pfaden.
- Jupyter wurde aus dem GenAI-Repository-Verzeichnis gestartet.

## Weiterführende Dokumente

- [Zuerst lesen]({{ '/zuerst-lesen.html' | relative_url }})
- [Lernpfade]({{ '/lernpfade.html' | relative_url }})
- [LangSmith Best Practices]({{ '/06-frameworks/langsmith-best-practices.html' | relative_url }})
- [Google Colab: lokale Runtimes](https://research.google.com/colaboratory/local-runtimes.html)
- [JupyterLab installieren](https://jupyter.org/install)
- [IPython-Kernel in Jupyter installieren](https://ipython.readthedocs.io/en/stable/install/kernel_install.html)

---

**Version:** 1.2<br>
**Stand:** Oktober 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
