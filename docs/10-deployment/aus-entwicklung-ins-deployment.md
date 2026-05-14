---
layout: default
title: Aus Entwicklung ins Deployment
parent: Deployment
nav_order: 1
description: Notebook-Code in eine betreibbare GenAI-Anwendung überführen
has_toc: true
---

# Aus Entwicklung ins Deployment
{: .no_toc }

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Ausgangspunkt

Ein Notebook ist ein guter Ort für Exploration, aber kein stabiles Betriebsartefakt. Für Deployment braucht die Anwendung reproduzierbare Abhängigkeiten, klare Konfiguration, Tests, Logging, Health Checks und eine Schnittstelle, die von einer Plattform gestartet und überwacht werden kann.

```text
Notebook
  -> Python-Package
  -> API oder Worker
  -> Container oder Managed Runtime
  -> Monitoring und Betrieb
```

Die wichtigste Entscheidung fällt vor dem ersten Dockerfile: Soll die Anwendung als API, Batch-Job, interner Worker oder interaktiver Demo-Service laufen? Davon hängen Projektstruktur, Startkommando, Secrets-Verwaltung und Skalierung ab.

> [!WARNING] Architektur-Entscheidung<br>
> Die Deployment-Variante beeinflusst Projektstruktur, CI/CD und Betriebsverantwortung. Managed Plattformen beschleunigen erste Releases, Container erleichtern reproduzierbare Builds und Portabilität.

## Betriebsmodell festlegen

Für GenAI-Projekte sind drei Betriebsmodelle besonders häufig relevant. Ein API-Service passt, wenn andere Systeme Prompts, Dateien oder Suchanfragen senden. Ein Batch- oder Worker-Prozess passt, wenn regelmäßig Dokumente verarbeitet, Embeddings erstellt oder Reports generiert werden. Ein Demo-Service wie Streamlit, Gradio oder Hugging Face Spaces passt, wenn ein Ergebnis gezeigt, aber noch nicht robust betrieben werden muss.

| Betriebsmodell | Geeignet für | Typische Plattformen | Grenze |
|---|---|---|---|
| API-Service | Chat-, RAG- und Klassifikationsfunktionen für andere Systeme | FastAPI, Cloud Run, Azure Container Apps, Railway, Render | Benötigt Authentifizierung, Rate Limits und Monitoring |
| Worker oder Batch | Indexierung, Evaluation, periodische Verarbeitung | Container Jobs, GitHub Actions, Airflow, Prefect | Nicht für interaktive Nutzung geeignet |
| Demo-Service | Kursdemos, Prototypen, interne Abstimmung | Hugging Face Spaces, Streamlit Community Cloud, Gradio | Nicht automatisch produktionsreif |

Container sind kein Muss, aber ein guter Standard für Team-Setups: Sie fixieren Python-Version, Systemabhängigkeiten und Startkommando. Managed Runtimes sind sinnvoll, wenn schneller Betrieb wichtiger ist als maximale Kontrolle.

## Phase 1: Notebook bereinigen

Vor der Extraktion wird das Notebook einmal von oben nach unten ausführbar gemacht. Experimentelle Zellen, doppelte Imports und alte Promptvarianten werden entfernt. Hardcodierte API-Keys, lokale Pfade und Modellnamen werden markiert, weil sie später in Umgebungsvariablen gehören.

**Mindestcheck vor der Extraktion:**

- Kernel neu starten und alle Zellen in Reihenfolge ausführen
- Produktiven Pfad von Experimenten trennen
- Eingaben, Ausgaben und Fehlermeldungen sichtbar machen
- Secrets, lokale Dateipfade und Modellnamen externalisieren
- Große Testdaten aus dem Notebook entfernen

Typischer Fehler: Notebook-Zellen werden 1:1 in eine Python-Datei kopiert. Dadurch bleiben globale Zustände, versteckte Seiteneffekte und zufällige Ausführungsreihenfolgen erhalten.

## Phase 2: Projektstruktur anlegen

Eine kleine GenAI-Anwendung braucht keine komplexe Architektur. Entscheidend ist, dass Anwendungscode, Tests und Konfiguration getrennt sind.

```text
mein-genai-projekt/
|-- src/
|   |-- __init__.py
|   |-- main.py
|   |-- llm_client.py
|   `-- settings.py
|-- tests/
|   `-- test_llm_client.py
|-- .env.example
|-- .gitignore
|-- requirements.txt
|-- Dockerfile
`-- README.md
```

`src/main.py` enthält den Einstiegspunkt. `src/llm_client.py` kapselt den Provider-Zugriff. `src/settings.py` liest Konfiguration aus Umgebungsvariablen. Diese Trennung verhindert, dass Provider-Code, API-Endpunkte und lokale Testlogik ineinanderlaufen.

## Phase 3: Code extrahieren

Im Notebook ist direkter API-Code akzeptabel. In einer Anwendung sollte der Zugriff auf das Modell gekapselt werden, damit Modellname, Fehlerbehandlung und Tests an einer Stelle bleiben.

**Vorher im Notebook:**

```python
from openai import OpenAI

client = OpenAI(api_key="sk-abc123...")

def frage_llm(prompt):
    response = client.responses.create(
        model="gpt-5.4-mini",
        input=prompt,
    )
    return response.output_text
```

**Nachher in `src/settings.py`:**

```python
import os


def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Umgebungsvariable fehlt: {name}")
    return value
```

**Nachher in `src/llm_client.py`:**

```python
from openai import OpenAI

from .settings import require_env


class LLMClient:
    def __init__(self) -> None:
        self.client = OpenAI(api_key=require_env("OPENAI_API_KEY"))
        self.model = require_env("MODEL_NAME")

    def frage(self, prompt: str) -> str:
        response = self.client.responses.create(
            model=self.model,
            input=prompt,
        )
        return response.output_text
```

Die OpenAI Responses API ist für neue Beispiele die robustere Grundlage als ältere Chat-Completions-Beispiele, weil sie Text, multimodale Eingaben, Tools und Conversation State über eine einheitliche Schnittstelle abbildet.

## Phase 4: Konfiguration externalisieren

Konfiguration gehört nicht in Code und nicht in Notebooks. Lokal kann eine `.env`-Datei helfen; im Deployment kommen dieselben Werte aus der Plattformkonfiguration oder einem Secret Store.

```bash
# .env.example
OPENAI_API_KEY=OPENAI_API_KEY_HIER_EINTRAGEN
MODEL_NAME=gpt-5.4-mini
LOG_LEVEL=INFO
```

**Lokaler CLI-Einstieg in `src/main.py`:**

```python
from dotenv import load_dotenv

from .llm_client import LLMClient


def main() -> None:
    load_dotenv()
    client = LLMClient()
    print(client.frage("Was ist GenAI?"))


if __name__ == "__main__":
    main()
```

> [!DANGER] Security-Baseline<br>
> Secrets niemals in Code, Notebooks oder Commit-Historie speichern. Ein eingecheckter Key gilt als kompromittiert und wird rotiert.

## Phase 5: Abhängigkeiten fixieren

Für kleine Kursprojekte reicht eine gepflegte `requirements.txt`. Wichtig ist, nur direkt benötigte Pakete aufzunehmen und Versionen nicht durch ein ungeprüftes `pip freeze` aufzublähen.

```txt
openai>=2.32.0
python-dotenv>=1.2.2
fastapi>=0.136.1
uvicorn[standard]>=0.46.0
pytest>=9.0.3
```

Für Anwendungen, die länger betrieben werden, ist ein `pyproject.toml` mit Lockfile vorzuziehen. `uv` unterstützt diese Projektstruktur direkt und erzeugt reproduzierbare Installationen über `uv.lock`.

## Phase 6: Smoke-Tests ergänzen

Smoke-Tests prüfen nicht die Modellqualität. Sie stellen sicher, dass Konfiguration, Provider-Kapselung und Rückgabetypen nicht versehentlich brechen.

> [!SUCCESS] Mindeststandard<br>
> Schon wenige Tests verhindern viele Ausfälle beim Deployment, weil fehlende Umgebungsvariablen und geänderte Provider-Antworten früh auffallen.

```python
# tests/test_llm_client.py
from unittest.mock import Mock, patch


def test_llm_client_initialisiert():
    with patch.dict(
        "os.environ",
        {"OPENAI_API_KEY": "test-key", "MODEL_NAME": "test-model"},
    ):
        from src.llm_client import LLMClient

        client = LLMClient()

        assert client is not None


def test_frage_gibt_string_zurueck():
    with patch.dict(
        "os.environ",
        {"OPENAI_API_KEY": "test-key", "MODEL_NAME": "test-model"},
    ):
        with patch("src.llm_client.OpenAI") as mock_openai:
            mock_response = Mock()
            mock_response.output_text = "Test-Antwort"
            mock_openai.return_value.responses.create.return_value = mock_response

            from src.llm_client import LLMClient

            client = LLMClient()
            antwort = client.frage("Test")

            assert antwort == "Test-Antwort"
            assert isinstance(antwort, str)
```

Tests werden mit `pytest tests/` ausgeführt.

## Phase 7: API-Endpunkt erstellen

Wenn die Anwendung von anderen Systemen genutzt werden soll, ist FastAPI ein naheliegender Einstieg. Der Endpunkt bleibt dünn: Validierung und HTTP-Antworten liegen in `main.py`, Provider-Logik bleibt in `llm_client.py`.

```python
# src/main.py
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel

from .llm_client import LLMClient

load_dotenv()

app = FastAPI(title="Meine GenAI App")
client = LLMClient()


class Anfrage(BaseModel):
    prompt: str


class Antwort(BaseModel):
    antwort: str


@app.post("/frage", response_model=Antwort)
def stelle_frage(anfrage: Anfrage) -> Antwort:
    ergebnis = client.frage(anfrage.prompt)
    return Antwort(antwort=ergebnis)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
```

Lokal wird die API aus dem Projektverzeichnis gestartet:

```bash
uvicorn src.main:app --reload
```

Typischer Fehler: Das Startkommando passt nicht zur Paketstruktur. Wenn die Datei unter `src/main.py` liegt, muss auch der Importpfad `src.main:app` lauten.

## Phase 8: Containerisierung

Ein Container fixiert Python-Version, Abhängigkeiten und Startkommando. Für produktive Systeme sollten Secrets nicht ins Image kopiert werden; sie werden beim Start als Umgebungsvariablen oder über die Plattform bereitgestellt.

```dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN useradd --create-home appuser

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/

USER appuser

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t meine-genai-app .

docker run -p 8000:8000 \
  -e OPENAI_API_KEY="OPENAI_API_KEY_HIER_EINTRAGEN" \
  -e MODEL_NAME="gpt-5.4-mini" \
  meine-genai-app
```

In Cloud-Deployments wird der API-Key nicht in Shell-Historien oder Build-Logs geschrieben, sondern als Secret der Plattform hinterlegt.

## Phase 9: Deployment auf der Zielplattform

Die Plattform wird nach Betriebsmodell gewählt, nicht nach Popularität. Für Demos reichen häufig Spaces, Streamlit oder Gradio. Für APIs mit planbarem Traffic sind Cloud Run, Azure Container Apps, Render oder Railway oft einfacher als ein eigenes Kubernetes-Cluster. Kubernetes lohnt sich erst, wenn mehrere Services, eigene Netzwerkanforderungen, interne Plattformteams oder strenge Betriebsstandards vorhanden sind.

| Ziel | Passende Option | Mindestanforderung |
|---|---|---|
| Demo im Kurs | Hugging Face Spaces, Streamlit, Gradio | Keine Secrets im Repository |
| Kleine API | Render, Railway, Cloud Run, Azure Container Apps | Health Check, Logs, Secrets |
| Interner Produktivdienst | Container-Plattform oder Kubernetes | Authentifizierung, Monitoring, Rollback |
| Regelmäßige Verarbeitung | Container Job, GitHub Actions, Airflow, Prefect | Wiederholbarkeit und Fehlerstatus |

Grenze: Ein erfolgreich gebautes Image ist noch kein produktionsreifes System. Betrieb beginnt erst mit Logs, Metriken, Alarmen, Fehlerbehandlung und dokumentiertem Rollback.

## Go-Live-Check

Vor dem ersten produktiven Start werden wenige Punkte konsequent geprüft. Diese Liste ersetzt keine Sicherheitsprüfung, verhindert aber die häufigsten Deployment-Fehler in kleinen GenAI-Projekten.

> [!WARNING] Go-Live-Regel<br>
> Kein Produktionsstart, wenn Secrets, Health Check oder Basis-Tests offen sind.

- [ ] Notebook-Code in Module extrahiert
- [ ] Keine Secrets im Code, Notebook oder Repository
- [ ] `MODEL_NAME` und Provider-Keys über Umgebungsvariablen konfiguriert
- [ ] Abhängigkeiten dokumentiert und installierbar
- [ ] Smoke-Tests laufen lokal
- [ ] API hat `/health`
- [ ] Startkommando passt zur Paketstruktur
- [ ] Docker-Image baut reproduzierbar
- [ ] Logs sind auf der Zielplattform sichtbar
- [ ] Rollback-Pfad ist bekannt

## Typische Fehler

API-Keys im Code sind der kritischste Fehler, weil ein Git-Commit nicht einfach verschwindet. Der Key wird rotiert, auch wenn die Datei später gelöscht wurde.

Ein zweiter Fehler ist die direkte Übernahme des Notebooks. Globale Variablen und versteckte Zellreihenfolgen funktionieren lokal, brechen aber im Serverprozess. Der produktive Pfad wird deshalb in Funktionen und Klassen übertragen.

Häufig wird auch `pip freeze` ungeprüft übernommen. Dadurch landen Entwicklungswerkzeuge, alte Experimente und plattformspezifische Pakete im Deployment. Besser ist eine kleine Liste direkter Abhängigkeiten.

Ohne Health Check kann die Plattform nicht zuverlässig erkennen, ob der Dienst läuft. Ohne Fehlerbehandlung wirkt jeder Provider-Ausfall wie ein Anwendungsfehler. Beides gehört vor den ersten Rollout.

## Quellen und weiterführende Dokumentation

| Thema | Quelle |
|---|---|
| OpenAI Responses API | [OpenAI API Reference](https://platform.openai.com/docs/api-reference/responses) |
| Migration von Chat Completions | [OpenAI Migration Guide](https://developers.openai.com/api/docs/guides/migrate-to-responses) |
| FastAPI Deployment | [FastAPI Deployment](https://fastapi.tiangolo.com/10-deployment/) |
| Reproduzierbare Python-Projekte | [uv Projects](https://docs.astral.sh/uv/concepts/projects/) |

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Vom Modell zur Anwendung](./vom-modell-zum-produkt.html) | Wie wird aus einem Modell ein technisches Anwendungssystem? |
| [Migration OpenAI zu Mistral](./migration-openai-mistral.html) | Wie wird ein bestehendes Projekt auf einen anderen Provider vorbereitet? |
| [Minimum Viable GenAI Stack](./minimum-viable-genai-stack.html) | Welche Komponenten braucht ein tragfähiger GenAI-Stack mindestens? |

---

**Version:** 1.1<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
