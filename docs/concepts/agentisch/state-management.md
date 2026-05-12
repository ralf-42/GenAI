---
layout: default
title: State Management
parent: Produktive Anwendungen
grand_parent: Konzepte
nav_order: 3
description: "Zustandsverwaltung in GenAI-Workflows: State, Reducer, TypedDict und Persistenz"
has_toc: true
---

# State Management
{: .no_toc }

> **State Management hält zusammen, was ein mehrstufiger Workflow wissen muss.**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Warum State Management überhaupt nötig ist

Ein einfacher Chat mit einer einzelnen Anfrage braucht kaum mehr als die letzte Nachricht. Sobald ein Agent aber mehrere Schritte ausführt, Tools aufruft, Entscheidungen vorbereitet oder zwischen verschiedenen Pfaden routet, reicht ein loses Weiterreichen einzelner Variablen nicht mehr aus. Dann muss klar sein, welche Informationen an welcher Stelle vorhanden sind und wie sie sich verändern dürfen.

Genau das leistet **State Management**. Es bündelt die relevanten Daten eines Workflows in einer zentralen Struktur, die von Schritt zu Schritt mitgeführt wird. Ohne diese Struktur gehen Informationen verloren, werden versehentlich überschrieben oder lassen sich später kaum noch debuggen.

Typischer Fehler: State nur als technische Nebensache zu behandeln. In der Praxis entscheidet die Qualität des State-Designs oft darüber, ob ein LangGraph-Workflow nachvollziehbar oder fragil wird.

## Ein einfaches Beispiel

Ein Support-Agent soll eine Anfrage klassifizieren, dann entweder an einen Technikpfad oder einen Rechnungs-Pfad weiterleiten und am Ende eine Antwort erzeugen. Dafür muss er mindestens wissen, welche Nachricht zuletzt einging, welcher Typ erkannt wurde und ob die Bearbeitung bereits abgeschlossen ist. Diese Informationen entstehen nicht alle auf einmal. Sie werden während des Workflows aufgebaut.

Genau deshalb braucht ein Agent einen State. Er ist das gemeinsame Arbeitsgedächtnis des Graphen. Jeder Knoten liest daraus, was bisher bekannt ist, und schreibt zurück, was neu hinzugekommen ist.

## Was mit „State“ gemeint ist

Der State ist das zentrale Datenobjekt eines Workflows. Er enthält die Informationen, die ein Agent oder Graph zwischen Knoten behalten muss. Ein Knoten liest daraus relevante Felder, verarbeitet sie und gibt anschließend nur die Änderungen zurück.

```text
[Node A] -> State -> [Node B] -> State' -> [Node C] -> State'' -> ...
```

Ein guter State ist nicht einfach nur groß, sondern passend zugeschnitten. Er speichert nur, was wirklich benötigt wird, ist typisiert, bleibt möglichst serialisierbar und vermeidet unnötige Seiteneffekte.

| Eigenschaft | Warum sie wichtig ist |
|---|---|
| Minimal | unnötige Daten machen Debugging und Persistenz schwerer |
| Typisiert | Fehler werden früher sichtbar |
| Serialisierbar | State muss für Checkpointing speicherbar bleiben |
| Änderungsfreundlich | Knoten sollen gezielt neue Werte zurückgeben können |

## Ein erster State in LangGraph

Ein einfacher Chat-State kann bereits mehrere nützliche Felder enthalten: Nachrichtenverlauf, Benutzerkennung und einen kleinen Zähler oder Statuswert. Damit wird sichtbar, dass State mehr ist als nur `messages`.

```text
State: ChatState (TypedDict)

Felder:
- messages: Liste von Nachrichten, kombiniert mit Reducer add_messages
- user_id: Text
- step_count: Zahl
```

Dieses Muster ist für Entwickler besonders hilfreich, weil es klar trennt zwischen Gesprächsverlauf und zusätzlichen Ablaufdaten.

## Warum TypedDict für den Graph-State meist die beste Wahl ist

Für den internen State eines LangGraph-Workflows ist `TypedDict` in der Regel die beste Wahl. Es ist leichtgewichtig, gehört zur Standardbibliothek und reicht aus, um dem Code klare Feldnamen und Typen zu geben. Gerade in mehrstufigen Graphen hilft das enorm bei Lesbarkeit und IDE-Unterstützung.

```text
State: WorkflowState (TypedDict)

Felder:
- messages: Nachrichtenverlauf mit Reducer add_messages
- context: aktueller Kontext als Text
- approved: Freigabestatus als Wahr/Falsch-Wert
```

Pydantic ist dagegen besonders nützlich an Schnittstellen, also bei API-Eingaben oder strukturierten LLM-Ausgaben. Dort zählt Laufzeitvalidierung stärker als maximale Leichtgewichtigkeit.

```text
Eingabemodell: UserInput (Pydantic)

Felder:
- query: Benutzerfrage als Pflichtfeld
- temperature: Zahl mit Standardwert und erlaubtem Wertebereich

Zweck:
- Eingaben an der Schnittstelle prüfen
- ungültige Werte früh abfangen
```

| Einsatz | Naheliegende Wahl |
|---|---|
| Interner Graph-State | TypedDict |
| API-Eingaben | Pydantic |
| Strukturierte LLM-Ausgabe | Pydantic |

> [!TIP] Faustregel<br>
> TypedDict für den laufenden Graphen, Pydantic für valide Ein- und Ausgaben.

## Reducer: warum Werte nicht einfach überschrieben werden dürfen

Sobald mehrere Knoten an denselben Feldern arbeiten, reicht ein einfaches „letzter Wert gewinnt“ oft nicht mehr aus. Genau hier kommen Reducer ins Spiel. Sie bestimmen, wie neue Werte mit bestehenden Werten kombiniert werden.

Ohne Reducer wird ein Feld bei jeder Rückgabe ersetzt. Für Nachrichtenverläufe ist das fast immer falsch, weil sonst frühere Nachrichten verloren gehen.

```text
Ohne Reducer:

Vorheriger State:
- messages enthält: "Hallo"

Rückgabe des nächsten Knotens:
- messages enthält: "Wie geht's?"

Ergebnis:
- messages enthält nur noch: "Wie geht's?"
- die erste Nachricht ist verloren
```

Mit `add_messages` verhält sich das Feld wie ein kontrolliert wachsender Verlauf.

```text
Mit Reducer add_messages:

State-Feld:
- messages ist eine Liste von Nachrichten
- neue Nachrichten werden an den vorhandenen Verlauf angehängt
- vorhandene Nachrichten werden nicht ersetzt
```

> [!WARNING] Reducer sind kein Detail<br>
> Bei Feldern wie `messages` ist ein passender Reducer keine Komfortfunktion, sondern notwendig, damit der Graph korrekt arbeitet.

## Welche Reducer typischerweise gebraucht werden

Für Chat-Verläufe wird meist `add_messages` verwendet. Für Zähler, Listen von Funden oder Log-Einträge reicht oft ein Additions-Reducer. Damit lassen sich Ergebnisse akkumulieren, statt sie bei jedem Schritt zu überschreiben.

```text
State: AnalysisState (TypedDict)

Felder mit Reducern:
- messages: Nachrichtenverlauf, kombiniert mit add_messages
- findings: Liste von Funden, neue Funde werden angehängt
- total_tokens: Zahl, neue Token-Werte werden addiert
```

Der praktische Effekt ist einfach: Ein Knoten fügt neue Findings hinzu, statt die vorhandenen zu ersetzen. Ein Token-Zähler wächst weiter, statt bei jedem Schritt neu zu starten.

## Wie ein Knoten mit State arbeitet

In LangGraph empfängt jeder Knoten den aktuellen State und gibt danach nur die Änderungen zurück. Genau dieses Prinzip hält den Workflow übersichtlich.

```text
State: AgentState
- messages: Nachrichtenverlauf mit Reducer
- current_task: aktuelle Aufgabe
- completed: Bearbeitungsstatus

Knoten: process
1. liest current_task aus dem State
2. verarbeitet die Aufgabe
3. gibt nur die Änderungen zurück:
   - neue Nachricht mit dem Ergebnis
   - completed = wahr

Graph:
START -> process -> END
```

Typischer Fehler: Den gesamten State zurückzugeben oder ihn direkt zu mutieren, obwohl sich nur ein Feld geändert hat. Dadurch wird der Code unnötig unübersichtlich und kann spätere Checkpoints oder Reducer-Mechanismen stören.

## Ein mehrstufiger Analyse-Workflow

Ein gutes Kursbeispiel ist ein Workflow, der ein Dokument zusammenfasst, danach ein Sentiment bestimmt und am Ende Schlüsselwörter extrahiert. Hier zeigt sich, dass verschiedene Knoten nacheinander auf unterschiedliche Felder desselben States aufbauen.

```text
State: AnalysisState (TypedDict)
- messages: Nachrichtenverlauf mit Reducer add_messages
- document: Ausgangsdokument
- summary: Zusammenfassung
- sentiment: erkannte Stimmung
- keywords: Liste von Schlüsselwörtern
- analysis_complete: Abschlussstatus

Knoten: summarize
1. liest document
2. erstellt eine Zusammenfassung
3. gibt zurück: summary

Knoten: sentiment
1. liest summary
2. bestimmt die Stimmung der Zusammenfassung
3. gibt zurück: sentiment

Knoten: keywords
1. liest document
2. extrahiert Schlüsselwörter
3. gibt zurück: keywords und analysis_complete = wahr
```

An diesem Beispiel lässt sich gut zeigen, dass State Management nicht abstrakt ist. Ohne das Feld `summary` könnte der nächste Schritt nicht sauber auf dem Ergebnis des ersten aufbauen.

## Routing funktioniert über State

State ist nicht nur Speicher, sondern auch Entscheidungsgrundlage. Wenn ein Workflow nach einer Klassifikation unterschiedlich weiterlaufen soll, liest die Routing-Funktion den aktuellen State und entscheidet den nächsten Pfad.

```text
State: RouterState (TypedDict)
- messages: Nachrichtenverlauf mit Reducer add_messages
- query_type: erkannte Anfrageklasse
- response: spätere Antwort

Knoten: classify
1. liest die letzte Nachricht aus messages
2. klassifiziert die Anfrage
3. gibt zurück: query_type

Routing-Funktion: route_by_type
- wenn query_type = technical: weiter zu tech_agent
- wenn query_type = billing: weiter zu billing_agent
- sonst: weiter zu general_agent
```

In der Praxis relevant, wenn: Ein Graph nach Klassifikation, Freigabe, Risikostufe oder Tool-Ergebnis unterschiedliche Wege nehmen soll.

## Was in der Praxis schnell schiefgeht

Viele Probleme entstehen nicht im Modell, sondern im schlecht gepflegten State. Häufig wird `messages` ohne Reducer definiert. Oder ein Knoten mutiert Listen direkt im bestehenden State. Ebenso problematisch sind untypisierte States, bei denen Fehler erst zur Laufzeit auffallen.

```text
Ungünstig:
1. Knoten liest items aus dem State
2. Knoten verändert diese Liste direkt
3. Knoten gibt dieselbe veränderte Liste zurück

Besser:
1. Knoten liest items aus dem State
2. Knoten erstellt eine neue Liste mit dem zusätzlichen Eintrag
3. Knoten gibt nur das geänderte Feld items zurück
```

```text
Ungünstiger State:
- messages ist nur eine einfache Liste
- neue Rückgaben ersetzen den bisherigen Verlauf

Besserer State:
- messages ist eine Liste mit Reducer add_messages
- neue Nachrichten werden kontrolliert an den Verlauf angehängt
```

Grenze: Auch ein sauberer State ersetzt keine gute Workflow-Logik. Er sorgt nur dafür, dass die Logik nachvollziehbar und stabil mit Daten arbeiten kann.

## Best Practices für Projekte

Der State sollte flach und sprechend benannt sein. Felder wie `user_query`, `current_step` oder `analysis_complete` sind hilfreicher als kryptische Kurzformen. Sensible personenbezogene Daten gehören nicht unreflektiert in den State, besonders wenn Checkpointing oder Logging mitgedacht wird.

Reducer sollten nur dort eingesetzt werden, wo wirklich akkumuliert wird. Knoten sollten nur Änderungen zurückgeben. Und Debugging wird einfacher, wenn eingehender State und Rückgabe im Zweifel kurz protokolliert werden.

```text
Knoten: debug
1. protokolliert den eingehenden State
2. verarbeitet den State
3. protokolliert die geplante Rückgabe
4. gibt nur die Änderungen zurück
```

## Was für Entwickler zuerst wichtig ist

Für einen ersten LangGraph-Workflow reichen meist drei Regeln. **Erstens**: State explizit definieren, statt mit beliebigen Dictionaries zu arbeiten. **Zweitens**: `messages` fast immer mit `add_messages` absichern. **Drittens**: Knoten geben nur die Änderungen zurück, nicht den gesamten State.

Entwickler unterschätzen oft, wie stark diese drei Regeln spätere Erweiterungen erleichtern. Wer sie früh sauber anlegt, kann Routing, Checkpointing, Human-in-the-Loop und Memory wesentlich einfacher ergänzen.

## Abgrenzung zu verwandten Dokumenten

| Dokument                                                                                       | Frage                                                            |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [Wie erinnern sich Agenten über mehrere Schritte und Sitzungen hinweg?](./memory-systeme.html) | Wie wird aus dem laufenden State ein längerfristiges Gedächtnis? |
| [LangGraph Einsteiger](../../frameworks/einsteiger/einsteiger-langgraph.html)                  | Wie wird State in konkreten LangGraph-Workflows verwendet?       |

---

**Version:** 1.1<br>
**Stand:** April 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
