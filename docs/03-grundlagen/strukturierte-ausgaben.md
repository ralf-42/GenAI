---
layout: default
title: Strukturierte Ausgaben
parent: Grundlagen
nav_order: 4
has_toc: true
description: "Der Übergang von natürlicher Sprache zu maschinenlesbaren Datenstrukturen"
---

# Strukturierte Ausgaben
{: .no_toc }

> **Der Übergang von natürlicher Sprache zu maschinenlesbaren Datenstrukturen**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Das Konzept der Strukturierten Ausgabe

Generative Sprachmodelle erzeugen in ihrer Grundform eine Wahrscheinlichkeitsverteilung über mögliche nächste Token, was zu unstrukturiertem Fließtext führt. Strukturierte Ausgaben erzwingen, dass das Modell diese Wahrscheinlichkeiten so einschränkt, dass das Ergebnis einem vorab definierten Schema wie JSON oder Pydantic entspricht. Im ML-Workflow ist dies der entscheidende Schritt, um die unscharfen Antworten eines Modells an deterministische Systeme wie Datenbanken oder APIs zu übergeben. Eine häufige Fehlerquelle besteht darin, komplexe Logik in die Schema-Definition auszulagern, woran das Modell dann beim Mapping scheitert.

## Vom Prompt zur API-Ebene

Frühe Ansätze verließen sich ausschließlich auf Anweisungen im Prompt, um das Modell zur Ausgabe von JSON zu bewegen. Entwickler fügten Formatanweisungen wie "Antworte ausschließlich in gültigem JSON" hinzu und bauten robuste Parser, die den Text bereinigten. In der Praxis zeigt sich oft, dass Modelle diese Anweisungen ignorieren, sobald der Kontext komplexer wird, und zusätzlichen Text vor oder nach dem JSON generieren.

Moderne Provider-APIs verlagern dieses Problem auf die Serverseite. Über Mechanismen wie den "JSON-Mode" oder "Structured Outputs" (z.B. bei OpenAI) garantiert die API, dass die Rückgabe syntaktisch korrekt ist. Das Modell wird serverseitig so gesteuert, dass nur Token generiert werden dürfen, die dem übergebenen Schema entsprechen. Diese Entwicklung macht komplexe Parsing-Logik im Anwendungscode zunehmend überflüssig, verschiebt die Herausforderung aber auf die präzise Definition der Datenstrukturen.

## Herausforderungen und Grenzen

Auch wenn die Syntax durch moderne APIs garantiert wird, bleibt die inhaltliche Richtigkeit eine Herausforderung für den Entwickler. Ein valides JSON-Objekt bedeutet nicht zwingend, dass die extrahierten Daten korrekt sind.

Typische Fehlerquellen bei der Schema-Definition:
- **Zu komplexe Verschachtelungen:** Modelle scheitern oft daran, tiefe Hierarchien oder bedingte Abhängigkeiten zwischen Feldern korrekt aufzulösen.
- **Fehlende Beschreibungen:** Wenn ein Schema-Feld nur "status" heißt, rät das Modell den Inhalt. Eindeutige Pydantic-Descriptions (z.B. "Zustand des Tickets: offen, in_bearbeitung, geschlossen") sind für die Modellsteuerung essenziell.
- **Halluzination in Listen:** Bei der Extraktion von Listen erfinden Modelle gelegentlich Einträge, um Felder zu füllen, besonders wenn das Schema minimale Längen vorgibt.

Strukturierte Ausgaben stoßen an ihre Grenzen, wenn kreative Aufgaben gelöst werden sollen. Wenn der Denkprozess (Reasoning) des Modells in ein enges JSON-Feld gezwungen wird, sinkt die Qualität der eigentlichen Problemlösung oft spürbar. Es empfiehlt sich in solchen Fällen, dem Modell ein Freitext-Feld für den Lösungsweg anzubieten, bevor die eigentlichen Datenfelder gefüllt werden.

## Validierung durch Verträge

In der Entwicklung von GenAI-Anwendungen übernimmt das Schema die Rolle eines Vertrages zwischen dem unvorhersehbaren Sprachmodell und dem deterministischen Programmcode. Entwickler definieren diese Verträge in Python fast ausschließlich über Pydantic. Pydantic-Modelle prüfen nicht nur Datentypen zur Laufzeit, sondern erzeugen auch die von den Providern benötigten JSON-Schemas automatisch.

Ein typisches Pydantic-Modell für die Extraktion von Informationen kombiniert Datentypen mit beschreibenden Metadaten:

```python
from pydantic import BaseModel, Field
from typing import List, Optional

class AnalyseErgebnis(BaseModel):
    hauptthema: str = Field(description="Das zentrale Thema des Textes")
    dringlichkeit: int = Field(ge=1, le=5, description="Skala von 1 bis 5")
    schlagworte: List[str] = Field(description="Liste relevanter Fachbegriffe")
    nachfassaktion: Optional[str] = Field(None, description="Vorgeschlagener nächster Schritt")
```

Aus diesem Python-Code generiert das Framework (z.B. LangChain) intern ein JSON-Schema, das an die Modell-API gesendet wird. Dieses Schema dient dem Modell als präzise Schablone für die Generierung:

```json
{
  "title": "AnalyseErgebnis",
  "type": "object",
  "properties": {
    "hauptthema": { "type": "string", "description": "Das zentrale Thema des Textes" },
    "dringlichkeit": { "type": "integer", "minimum": 1, "maximum": 5 },
    "schlagworte": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["hauptthema", "dringlichkeit", "schlagworte"]
}
```

Ein sauberer Workflow extrahiert die Informationen, validiert sie gegen das Pydantic-Modell und fängt Fehlerfälle kontrolliert ab. Schlägt die Validierung fehl, weil das Sprachmodell beispielsweise einen String statt eines Integers liefert, ist ein erneuter Versuch mit angepasstem Fehlerhinweis oft erfolgreicher als der Versuch, den Datentyp im Code selbst zu korrigieren.

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Prompt Engineering](../05-prompting-rag/prompt-engineering.html) | Wie formuliere ich Anweisungen, damit das Modell Aufgaben zuverlässig löst? |
| [Einsteiger LangChain](../06-frameworks/einsteiger-langchain.html) | Wie nutze ich `with_structured_output()` im Code? |
| [Large Language Models](./large-language-models.html) | Wie generieren Modelle Token und warum entsteht dabei unstrukturierter Text? |

---

**Version:** 1.0<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
