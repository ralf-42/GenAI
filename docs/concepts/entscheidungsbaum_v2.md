# Aufgabenklassen & Lösungswege – Entscheidungsbaum v2

## Überarbeiteter Entscheidungsbaum (symmetrische Struktur)

```mermaid
graph TD
    Start[Aufgabe für KI vorhanden] --> QData{⚠️ DATENSCHUTZ<br/>KRITISCH?}

    %% === DATENSCHUTZ KRITISCH (On-Premise) ===
    QData -->|Ja| Q1a{Einmalig &<br/>persönlich?}
    
    Q1a -->|Ja| Chat_Local[<b>CHAT</b><br/>Ollama / LM Studio]
    
    Q1a -->|Nein| Q2a{Große Datenmengen<br/>oder komplexe<br/>Logik?}
    
    Q2a -->|Ja| Python_Local[<b>PYTHON + Ollama</b><br/><i>Lokale Verarbeitung</i>]
    
    Q2a -->|Nein| Q3a{Vollautomatisch?<br/>Event-Trigger?}
    
    Q3a -->|Ja| Workflow_Local[<b>n8n self-hosted</b><br/><i>Lokale Automatisierung</i>]
    
    Q3a -->|Nein| Q4a{Tool für Dritte?<br/>Interface nötig?}
    
    Q4a -->|Ja| AppBuilder_Local[<b>Dify self-hosted</b><br/><i>Lokales RAG / UI</i>]
    
    Q4a -->|Nein| Q5a{Lösungsweg<br/>unklar?}
    
    Q5a -->|Ja| Agents_Local[<b>AGENTEN lokal</b><br/>Claude Code + Ollama]
    
    Q5a -->|Nein| Custom_Local[<b>Lokale Assistenten</b><br/>Ollama + Open WebUI]

    %% === DATENSCHUTZ UNKRITISCH (Cloud) ===
    QData -->|Nein| Q1b{Einmalig &<br/>persönlich?}
    
    Q1b -->|Ja| Chat_Cloud[<b>CHAT</b><br/>ChatGPT, Claude]
    
    Q1b -->|Nein| Q2b{Große Datenmengen<br/>oder komplexe<br/>Logik?}
    
    Q2b -->|Ja| Python_Cloud[<b>PYTHON & APIs</b><br/><i>Cloud-LLM-APIs</i>]
    
    Q2b -->|Nein| Q3b{Vollautomatisch?<br/>Event-Trigger?}
    
    Q3b -->|Ja| Workflow_Cloud[<b>Make / n8n Cloud</b><br/><i>Automatisierung</i>]
    
    Q3b -->|Nein| Q4b{Tool für Dritte?<br/>Interface nötig?}
    
    Q4b -->|Ja| AppBuilder_Cloud[<b>Dify / Stack AI</b><br/><i>App-Builder / RAG</i>]
    
    Q4b -->|Nein| Q5b{Lösungsweg<br/>unklar?}
    
    Q5b -->|Ja| Agents_Cloud[<b>AGENTEN</b><br/>Claude Code, LangGraph]
    
    Q5b -->|Nein| Custom_Cloud[<b>Custom GPTs / Skills</b>]

    %% === STYLING ===
    
    %% Datenschutz-Knoten (Orange)
    style QData fill:#ffcc80,stroke:#e65100,stroke-width:3px
    
    %% On-Premise Pfad (Rot-Töne)
    style Chat_Local fill:#ffcdd2,stroke:#c62828
    style Python_Local fill:#ffcdd2,stroke:#c62828
    style Workflow_Local fill:#ffcdd2,stroke:#c62828
    style AppBuilder_Local fill:#ffcdd2,stroke:#c62828
    style Agents_Local fill:#ffcdd2,stroke:#c62828
    style Custom_Local fill:#ffcdd2,stroke:#c62828
    
    %% Cloud Pfad (Blau/Grün-Töne)
    style Chat_Cloud fill:#c8e6c9,stroke:#2e7d32
    style Python_Cloud fill:#bbdefb,stroke:#1565c0
    style Workflow_Cloud fill:#b3e5fc,stroke:#0277bd
    style AppBuilder_Cloud fill:#fff9c4,stroke:#f9a825
    style Agents_Cloud fill:#e1bee7,stroke:#7b1fa2
    style Custom_Cloud fill:#c8e6c9,stroke:#2e7d32
```

## Kompakte Alternativ-Darstellung

Falls die symmetrische Darstellung zu breit wird, hier eine kompaktere Version mit gemeinsamen Entscheidungsknoten:

```mermaid
graph TD
    Start[Aufgabe für KI] --> QData{⚠️ DATENSCHUTZ<br/>KRITISCH?}
    
    QData --> Q1{Einmalig &<br/>persönlich?}
    
    Q1 -->|Ja| EndChat[<b>CHAT</b>]
    
    Q1 -->|Nein| Q2{Große Datenmengen<br/>/ komplexe Logik?}
    
    Q2 -->|Ja| EndPython[<b>PYTHON</b>]
    
    Q2 -->|Nein| Q3{Vollautomatisch?<br/>Event-Trigger?}
    
    Q3 -->|Ja| EndWorkflow[<b>WORKFLOW</b>]
    
    Q3 -->|Nein| Q4{Tool für Dritte?<br/>Interface nötig?}
    
    Q4 -->|Ja| EndAppBuilder[<b>APP-BUILDER</b>]
    
    Q4 -->|Nein| Q5{Lösungsweg<br/>unklar?}
    
    Q5 -->|Ja| EndAgents[<b>AGENTEN</b>]
    
    Q5 -->|Nein| EndCustom[<b>CUSTOM ASSISTANTS</b>]

    %% Legende/Subgraph für Tool-Zuordnung
    subgraph Legende["🔒 On-Premise | ☁️ Cloud"]
        L1["Chat: Ollama | ChatGPT"]
        L2["Python: +Ollama | +Cloud-APIs"]
        L3["Workflow: n8n self-hosted | Make/n8n"]
        L4["App-Builder: Dify self-hosted | Dify/Stack AI"]
        L5["Agenten: +Ollama | Claude Code"]
        L6["Custom: Open WebUI | Custom GPTs"]
    end

    style QData fill:#ffcc80,stroke:#e65100,stroke-width:3px
    style EndChat fill:#c8e6c9,stroke:#333
    style EndPython fill:#bbdefb,stroke:#333
    style EndWorkflow fill:#b3e5fc,stroke:#333
    style EndAppBuilder fill:#fff9c4,stroke:#333
    style EndAgents fill:#e1bee7,stroke:#333
    style EndCustom fill:#c8e6c9,stroke:#333
```

## Aufgabenklassen-Übersicht (ersetzt "Problemklassen")

| Aufgabenklasse | Kernfrage | 🔒 On-Premise | ☁️ Cloud |
|----------------|-----------|---------------|----------|
| **Ad-hoc-Hilfe** | Einmalig & persönlich? | Ollama, LM Studio | ChatGPT, Claude |
| **Datenverarbeitung** | Große Mengen / komplex? | Python + Ollama | Python + Cloud-APIs |
| **Automatisierung** | Event-basiert / 24/7? | n8n self-hosted | Make, n8n Cloud |
| **Team-Tools** | Interface für Dritte? | Dify self-hosted | Dify, Stack AI |
| **Exploration** | Lösungsweg unklar? | Agenten + Ollama | Claude Code, LangGraph |
| **Persönliche Erweiterung** | Wiederkehrend, klar? | Open WebUI | Custom GPTs |

## Änderungen gegenüber v1

1. **Symmetrische Struktur:** Beide Pfade (On-Premise / Cloud) durchlaufen identische Entscheidungsknoten
2. **Konsistente Logik:** Die Aufgabenklasse bestimmt den Lösungsweg, der Datenschutz nur die Deployment-Variante
3. **Begriffswechsel:** "Problemklassen" → "Aufgabenklassen"
4. **Lokale Chat-Option ergänzt:** Für datenschutzkritische Ad-hoc-Aufgaben (Ollama/LM Studio)
5. **Klarere Farbcodierung:** Rot = On-Premise, Grün/Blau = Cloud
