---
layout: default
title: Agenten-Architekturen
nav_order: 2
parent: Agenten
description: Architekturmuster und Design-Prinzipien für KI-Agenten und agentische Systeme
has_toc: true
---

# Agenten-Architekturen
{: .no_toc }

> **Die Architektur entscheidet, wie ein System denkt, handelt, Grenzen einhält und mit Fehlern umgeht.**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Warum die Architekturfrage früh geklärt werden muss

Viele GenAI-Projekte scheitern nicht am Modell, sondern an einer unpassenden Grundstruktur. Eine Anwendung soll vielleicht nur ein Werkzeug aufrufen, wird aber als komplexes Multi-Agent-System geplant. Oder ein eigentlich mehrstufiger Prozess wird als freier ReAct-Loop modelliert und verliert dadurch Kontrolle, Nachvollziehbarkeit und Kostenstabilität.

Architektur meint in diesem Zusammenhang nicht zuerst Framework oder Programmiersprache. Gemeint ist die Entscheidung, wie ein System Aufgaben zerlegt, wie viel Entscheidungsfreiheit es erhält und an welchen Stellen deterministische Logik wichtiger ist als modellbasierte Flexibilität. Diese Unterscheidung ist zentral, weil sie viele spätere Probleme bereits vorwegnimmt.

Typischer Fehler: Zu früh die technisch eindrucksvollste Architektur zu wählen. In der Praxis ist die einfachste Struktur oft die robusteste.

## Ein einfaches Beispiel

Ein Support-System soll drei Arten von Anfragen bearbeiten: Lieferstatus nennen, Rechnung erneut senden und komplexe Sonderfälle an einen Menschen weiterleiten. Schon dieses kleine Beispiel zeigt, dass Architektur keine akademische Zusatzfrage ist. Für den Lieferstatus reicht meist ein gezielter Tool-Aufruf. Für die Rechnung braucht es eventuell mehrere Schritte. Für Sonderfälle wird eine sichere Eskalation benötigt.

Aus genau solchen Anforderungen ergibt sich die Architektur. Nicht jede Aufgabe braucht einen frei planenden Agenten. Häufig genügt ein klarer Workflow oder ein Tool-Calling-Muster mit wenigen kontrollierten Entscheidungen.

## Zwei Blickrichtungen auf Agentische Systeme

Systeme mit agentischen Fähigkeiten lassen sich aus zwei Blickrichtungen beschreiben. Die erste fragt, wie ein Modell grundsätzlich zu einer Entscheidung kommt. Die zweite fragt, wie diese Logik technisch organisiert wird.

Die **Intelligenzperspektive** beschreibt das Entscheidungsprinzip. Handelt ein System streng regelbasiert, zustandsbasiert, zielorientiert oder nutzenmaximierend? Die **Architekturperspektive** beschreibt dagegen das praktische Baumuster, etwa ReAct, Tool-Calling, Workflow oder Multi-Agent. Beide Ebenen hängen zusammen, sind aber nicht identisch.

## Harness Engineering: die Steuerungsschicht um das Modell

Viele Probleme entstehen nicht, weil das Modell zu schwach ist, sondern weil die Steuerungsschicht um das Modell herum fehlt oder schlecht gestaltet ist. Dieses Konzept trägt den Namen **Harness Engineering**.

Harness Engineering bezeichnet die Praxis, die Kontroll- und Steuerungsschicht rund um ein LLM zu gestalten — also alles, was zwischen der Rohmodellausgabe und einer realen Aktion liegt.

```mermaid
flowchart TB
    subgraph Harness ["<b>Harness Engineering</b>"]
        direction TB
        H_Info["Gesamte Steuerungsinfrastruktur"]
        
        subgraph Context ["<b>Context Engineering</b>"]
            direction TB
            C_Info["Kontextzusammenstellung & Retrieval"]
            
            subgraph Prompt ["<b>Prompt Engineering</b>"]
                P_Info["Instruktionen an das Modell"]
            end
            
            C_Info --> P_Info
        end
        
        H_Info --> C_Info
    end

    style Harness fill:#f9f9f9,stroke:#333,stroke-width:2px
    style Context fill:#e1f5fe,stroke:#01579b
    style Prompt fill:#fff9c4,stroke:#fbc02d
```

**Prompt Engineering** ist die innerste Schicht: Instruktionen, Rollenbeschreibungen, Beispiele — was dem Modell gesagt wird.

**Context Engineering** bestimmt, was überhaupt in den Kontext fließt und wann: Retrieval, Kompression, Zusammensetzung.

**Harness Engineering** umfasst alles darüber hinaus: Werkzeugorchestrierung, Speichersysteme, Berechtigungsgrenzen, Fehlerbehandlung und Wiederherstellungslogik.

Die wichtigste Erkenntnis: Selbst das beste Modell scheitert ohne eine durchdachte Steuerungsschicht. Instabilität, Halluzinationen oder Endlosschleifen werden dann oft dem Modell zugeschrieben — meistens liegt das Problem aber in einem unstrukturierten Kontext, inkonsistentem Speicher oder fehlender Fehlerbehandlung.

## Welche Entscheidungslogik hinter einem Agenten steckt

Eine einfache **Regelarchitektur** reagiert auf klar definierte Muster. Das entspricht einem Simple-Reflex-Agenten: Wenn Bedingung A erfüllt ist, folgt Aktion B. Solche Systeme sind schnell und gut kontrollierbar, kommen aber bei unerwarteten Situationen an ihre Grenzen.

Ein **zustandsbasierter Agent** berücksichtigt zusätzlich, was bereits bekannt ist. Diese Form ist nützlich, wenn ein Verlauf oder ein interner Status mitgeführt werden muss (z.B. in LangGraph).

**Zielorientierte Agenten** bewerten, welche Aktion dem gewünschten Ergebnis näherkommt. **ReAct-Systeme** verhalten sich oft so: Sie planen nicht vollständig im Voraus, sondern nähern sich dem Ziel iterativ durch Nachdenken und Handeln.

## ReAct: wenn der Lösungsweg noch nicht feststeht

ReAct kombiniert Nachdenken (*Reason*), Handeln (*Act*) und Beobachten (*Observe*) in einem wiederholten Zyklus. Der Agent prüft den aktuellen Stand, führt eine Aktion aus, liest das Ergebnis und entscheidet anschließend über den nächsten Schritt.

```mermaid
flowchart LR
    A[Aufgabe] --> B[Denken]
    B --> C[Handeln]
    C --> D[Beobachten]
    D --> E{Ziel erreicht?}
    E -->|Nein| B
    E -->|Ja| F[Antwort]
```

Ein typisches Beispiel ist eine Rechercheaufgabe. Der Vorteil liegt in der Flexibilität. Der Nachteil liegt in den Schleifen: Ohne gute Begrenzung wachsen Kosten, Latenz und Fehlerrisiken schnell an.

In der Praxis relevant, wenn: Die Aufgabe offen ist, mehrere Zwischenschritte nötig sind und vorab nicht feststeht, welche Aktion als Nächstes sinnvoll ist.

## Explore → Plan → Act: ReAct für den Produktionseinsatz

ReAct ist flexibel, aber oft schwer zu kontrollieren. Produktive Systeme unterteilen ihre Arbeit deshalb häufig in **drei klar getrennte Phasen**:

```mermaid
flowchart LR
    E["<b>Explore</b><br/>nur lesen"] --> P["<b>Plan</b><br/>nur lesen"] --> A["<b>Act</b><br/>voller Zugriff"]
```

1. **Explore** — das System liest, sucht und sammelt Informationen (Dateien lesen, Suchen), ohne etwas zu verändern.
2. **Plan** — das Modell entscheidet, welche Schritte notwendig sind, und skizziert die Änderungen. Noch kein Schreiben, kein Ausführen.
3. **Act** — erst jetzt darf das System verändernd eingreifen: Dateien schreiben, APIs aufrufen, Daten speichern.

Diese Phasentrennung reduziert destruktive Fehler erheblich, weil ein Agent nicht im selben Schritt erkunden und gleichzeitig schreiben kann.

## Tool-Calling: wenn das Modell Werkzeuge steuern soll

Beim Tool-Calling entscheidet das Modell, welches Werkzeug mit welchen Parametern aufgerufen werden soll. Dieses Muster ist oft der sinnvollste Einstieg, weil die Freiheitsgrade begrenzt bleiben und das System trotzdem handlungsfähig wird.

```mermaid
flowchart TD
    A[Anfrage] --> B[LLM analysiert]
    B --> C{Tool nötig?}
    C -->|Ja| D[Tool auswählen]
    D --> E[Tool ausführen]
    E --> F[Ergebnis einbinden]
    F --> B
    C -->|Nein| G[Antwort]
```

Die Stärke liegt darin, dass das Modell flexibel formulieren kann, während die eigentliche Aktion in deterministischem Code oder in einer externen API stattfindet.

## Workflow-basierte Architektur: wenn der Ablauf kontrolliert sein muss

Workflow-basierte Architekturen modellieren einen klaren Ablauf aus Knoten und Verzweigungen. Das System entscheidet nicht in jeder Runde völlig frei, sondern bewegt sich entlang eines vorgegebenen Prozesses.

```mermaid
flowchart TD
    START((Start)) --> A[Eingabe analysieren]
    A --> B{Kategorie?}
    B -->|Technik| C[Technik-Knoten]
    B -->|Vertrieb| D[Vertrieb-Knoten]
    B -->|Sonstiges| E[Fallback]
    C --> F[Qualitätsprüfung]
    D --> F
    E --> F
    F --> END((Ende))
```

Diese Struktur ist weniger flexibel als ReAct, dafür aber robuster, erklärbarer und leichter abzusichern (z.B. durch Human-in-the-Loop-Schritte).

## Multi-Agent: wenn Arbeitsteilung einen Mehrwert bringt

In Multi-Agent-Architekturen arbeiten mehrere spezialisierte Agenten zusammen. Ein Supervisor kann Aufgaben verteilen, oder die Agenten tauschen Ergebnisse direkt untereinander aus.

```mermaid
flowchart TD
    A[Aufgabe] --> S[Supervisor]
    S --> R[Research-Agent]
    S --> W[Writer-Agent]
    S --> C[Code-Agent]
    R --> S
    W --> S
    C --> S
    S --> E[Finale Antwort]
```

Multi-Agent-Systeme sind komplexer in der Orchestrierung und verursachen höheren Koordinationsaufwand. Sie lohnen sich erst, wenn die Teilaufgaben fachlich oder technisch wirklich eine Spezialisierung erfordern.

## Welche Architektur meist zuerst gewählt werden sollte

Die Wahl der Architektur sollte der Komplexität der Aufgabe folgen:

| Situation | Naheliegende Wahl |
| :--- | :--- |
| FAQ plus Datenbankzugriff | Tool-Calling |
| Mehrstufiger Genehmigungsprozess | Workflow |
| Offene Rechercheaufgabe | ReAct |
| Arbeitsteilige Content-Erstellung | Multi-Agent |

## Welche Design-Prinzipien immer gelten

1. **Verantwortung trennen:** Komponenten sollten eine klar abgegrenzte Aufgabe haben.
2. **Kontrolle wahren:** Kritische Aktionen (Schreiben, Senden, Bezahlen) sollten validiert oder manuell freigegeben werden.
3. **Nachvollziehbarkeit:** Entscheidungen und Werkzeugaufrufe müssen geloggt werden (Tracing).
4. **Fehlerpfade mitdenken:** Was passiert, wenn ein Tool fehlschlägt oder das Modell eine ungültige Ausgabe liefert?

## Geschäftsregeln gehören in Code

Wenn Freigabegrenzen, Erstattungsbeträge oder Compliance-Vorgaben gelten, gehören diese Regeln in deterministischen Code und nicht allein in den System-Prompt. Ein Prompt kann umschrieben werden; eine Regel im Code garantiert die Einhaltung.

```python
# Beispiel: Deterministische Prüfung statt "Modell-Gefühl"
def check_refund_policy(amount, customer_tier):
    limits = {"basic": 100, "premium": 500}
    return amount <= limits.get(customer_tier, 0)
```

## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
| :--- | :--- |
| [Aufgaben & Lösungswege]({{ '/02-orientierung/aufgabenklassen-und-loesungswege.html' | relative_url }}) | Wann ist ein Agent sinnvoll und wann eher Workflow, RAG oder klassischer Code? |
| [Tool Use & Function Calling]({{ '/08-agenten/tool-use-function-calling.html' | relative_url }}) | Wie werden Werkzeuge technisch beschrieben, aufgerufen und abgesichert? |
| [LangGraph Einsteiger]({{ '/06-frameworks/einsteiger-langgraph.html' | relative_url }}) | Wie werden zustandsbasierte Workflows technisch umgesetzt? |
| [Memory-Systeme]({{ '/03-grundlagen/memory-systeme.html' | relative_url }}) | Wie behält ein System Kontext über die aktuelle Nachricht hinaus? |

---

**Version:** 1.6<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
