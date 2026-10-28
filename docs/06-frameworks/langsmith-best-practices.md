---
layout: default
title: LangSmith Best Practices
parent: LangSmith
grand_parent: Frameworks
nav_order: 2
description: "Tracing, Evaluation und Prompt-Verwaltung im GenAI-Projekt"
has_toc: true
---

# LangSmith Best Practices

LangSmith macht Modell- und Agentenläufe nachvollziehbar. Traces helfen beim Untersuchen einzelner Verarbeitungsschritte; Datasets und Evaluatoren machen Qualitätsvergleiche wiederholbar.

---

## Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Tracing einrichten

Aktiviere Tracing mit Umgebungsvariablen. API-Schlüssel werden sicher in der lokalen Umgebung oder einem Secret Store verwaltet und nicht in Notebooks oder Quellcode geschrieben.

~~~python
import os

os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_PROJECT"] = "m06_structured_output"
# LANGSMITH_API_KEY wird sicher über die Umgebung bereitgestellt
~~~

Projekt-, Run-, Experiment-, Dataset- und Prompt-Namen folgen im Kurs dem Muster m##_snake_case. Verwende die Modul-ID des Notebooks. Für EU- und APAC-Accounts wird zusätzlich der passende LANGSMITH_ENDPOINT gesetzt, etwa https://eu.api.smith.langchain.com oder https://ap.api.smith.langchain.com.

## Runs benennen

Run-Namen, Tags und Metadaten erleichtern das Filtern und Vergleichen von Ausführungen. Der Projektname wird mit LANGSMITH_PROJECT aus der Umgebung festgelegt.

~~~python
run_config = {
    "run_name": "m06_structured_output",
    "tags": ["structured_output", "course"],
    "metadata": {"module": "m06"},
}

result = chain.invoke(
    {"question": "Was ist ein StateGraph?"},
    config=run_config,
)
~~~

In einem Notebook, dessen Setup globales Tracing deaktiviert, kann ein einzelner Referenzlauf explizit erfasst werden.

~~~python
from langsmith import tracing_context

with tracing_context(enabled=True):
    result = chain.invoke(
        {"question": "Was ist ein StateGraph?"},
        config=run_config,
    )
~~~

In einem Notebook wird der passende Projektname einmalig vor den Modell- und Agentenaufrufen gesetzt. show_trace(...) erhält exakt denselben Wert wie LANGSMITH_PROJECT.

## Traces und Datenschutz

Ein Trace zeigt den Ablauf vom Eingang bis zur Antwort, einschließlich Modellaufrufen, Tool-Schritten, Laufzeiten und Fehlern. Nutze die Daten, um die Wirkung einer Änderung zu beurteilen und wiederkehrende Fälle in Evaluationsbeispiele zu überführen.

Vor der Erfassung produktiver Daten werden Datenschutz und Zugriffsrechte festgelegt. Maskiere oder entferne personenbezogene und vertrauliche Inhalte, die für die Analyse nicht erforderlich sind. Tags und Metadaten enthalten keine sensiblen Werte.

## Evaluation mit Datasets

Ein Dataset enthält repräsentative Eingaben und bei Bedarf Referenzantworten oder erwartete Aktionen. Offline-Evaluationen vergleichen eine Änderung mit derselben Beispielsammlung. Online-Evaluationen beobachten ausgewählte Produktionsläufe.

1. Typische Anfragen und relevante Grenzfälle sammeln.
2. Kriterien wie Korrektheit, Quellenbezug oder Tool-Aufruf festlegen.
3. Eine Baseline ausführen und Ergebnisse speichern.
4. Änderungen mit denselben Beispielen und Kriterien vergleichen.
5. Geprüfte Beispiele aus beobachteten Läufen ergänzen.

Regelbasierte Evaluatoren passen zu klar prüfbaren Formaten und Aktionen. Ein LLM-as-judge kann semantische Qualität beurteilen.

## Prompts verwalten

LangSmith kann Prompts versionieren und über Umgebungen wie Staging und Production bereitstellen. Benenne Prompts nach m##_snake_case, teste eine Änderung mit einem repräsentativen Dataset und ordne die geprüfte Version der passenden Umgebung zu.

## Praxischeck

- Namen verwenden das Modulpräfix m##_ und snake_case.
- Schlüssel und regionale Endpunkte werden über die Umgebung konfiguriert.
- Traces enthalten nur erforderliche Informationen.
- Tags und Metadaten erleichtern die Filterung, ohne sensible Werte aufzunehmen.
- Offline-Evaluationen vergleichen Änderungen mit denselben Beispielen.
- Online-Evaluationen beobachten ausgewählte Produktionsläufe.
- Prompt-Versionen werden vor der Bereitstellung geprüft.

## Weiterführende Ressourcen

- [LangSmith: Tracing mit LangChain](https://docs.langchain.com/langsmith/trace-with-langchain)
- [LangSmith: Evaluationstypen](https://docs.langchain.com/langsmith/evaluation-types)
- [LangSmith: Prompts verwalten](https://docs.langchain.com/langsmith/manage-prompts)
- [LangSmith Python SDK](https://github.com/langchain-ai/langsmith-sdk)
- [Einsteiger: LangSmith](./einsteiger-langsmith.html)
- [LangChain Best Practices](./langchain-best-practices.html)
- [LangGraph Best Practices](./langgraph-best-practices.html)
- [Vom Modell zum Produkt](../10-deployment/vom-modell-zum-produkt.html)

---

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [LangChain Best Practices](langchain-best-practices.html) | Wie werden Agenten und Verarbeitungsketten erstellt? |
| [LangGraph Best Practices](langgraph-best-practices.html) | Wie wird der Ablauf eines zustandsbehafteten Workflows modelliert? |

---

**Version:** 2.0<br>
**Stand:** Oktober 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
