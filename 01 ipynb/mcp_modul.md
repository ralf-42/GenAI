


# Model Context Protocol (MCP) - Funktionales Modul

Das Modul `mcp_modul.py` bietet eine vollständige, funktionale Implementierung der drei Hauptkomponenten einer MCP-Architektur: **Server**, **Client** und **AI-Assistent**. Es dient primär zu Demonstrationszwecken, um den Kommunikationsfluss und die Logik hinter dem Protokoll zu verdeutlichen. Die Wahl eines funktionalen Ansatzes, anstelle eines klassischen objektorientierten Designs, fördert dabei die **Klarheit**, **Testbarkeit** und **Wartbarkeit** der einzelnen Komponenten. Dies macht das Modul ideal für das Prototyping und das Verständnis der MCP-Spezifikation.

# 1. Konfiguration

Die Basiskonfigurationen definieren die Identitäten und Fähigkeiten der Komponenten innerhalb der simulierten MCP-Umgebung.

|   |   |   |   |   |
|---|---|---|---|---|
|**Komponente**|**Name**|**Version**|**Wichtigste Tools (Server)**|**Detail und Zweck**|
|**Server**|`file-server`|`1.0.0`|`read_file`, `write_file`, `list_files`, `get_system_info`|Stellt grundlegende System- und Dateizugriffe bereit. Er fungiert als **Datendienst-Connector**.|
|**Client**|`demo-client`|`1.0.0`|-|Verwaltet die Netzwerkverbindungen und die Tool-Liste des Servers. Er kapselt die MCP-Kommunikationslogik.|
|**Assistant**|`Functional-MCP-Assistant`|`1.0.0`|Nutzt das konfigurierte OpenAI-Modell (`gpt-4o-mini`)|Die zentrale Intelligenz, die menschliche Sprache in strukturierte MCP-Aufrufe übersetzt und die Ergebnisse für den Nutzer aufbereitet.|

# 2. Server-Funktionen (Connector)

Der Server implementiert die Logik zur Verarbeitung von **JSON-RPC**-basierten MCP-Anfragen. Er ist die einzige Komponente, die direkt mit den externen Ressourcen (hier: das Dateisystem und das Betriebssystem) interagiert.

|   |   |   |
|---|---|---|
|**Funktion**|**Beschreibung**|**Kernaufgabe**|
|`handle_mcp_request(request)`|**Haupt-Handler:** Verarbeitet alle eingehenden MCP-Anfragen (`initialize`, `tools/list`, `tools/call`). Er validiert das JSON-RPC-Format und sorgt für eine konsistente Fehlerbehandlung.|Leitet Requests an die entsprechenden Tool-Funktionen weiter.|
|`get_server_info()`|Gibt die Metadaten des Servers (Name, Version) und die Liste der verfügbaren Tool-Namen zurück.|Statusabfrage und Discovery-Unterstützung für den Client.|
|`register_new_tool(name, description, parameters, function)`|Erweitert den Server zur Laufzeit um neue Tools und deren Implementierung. Dies ermöglicht eine **dynamische Server-Anpassung** an neue Datenquellen oder APIs.|Erweiterbarkeit des Tool-Sets ohne Neustart des Servers.|

**Implementierte Tools (`tool_functions`):**

- `read_file_tool(filepath)`: Liest den Inhalt einer Datei. Gibt neben dem Inhalt auch Metadaten wie Dateipfad, Größe und den Zeitstempel des Zugriffs zurück.
    
- `list_files_tool(directory)`: Listet die Dateien im angegebenen Verzeichnis auf. Das Tool liefert detaillierte Informationen wie Dateiname, Pfad, Größe und ob es sich um eine Datei oder ein Verzeichnis handelt.
    
- `write_file_tool(filepath, content)`: Schreibt Inhalt in eine Datei. Dies demonstriert die **bidirektionale Natur** von MCP (Lesen **und Schreiben** von Daten), im Gegensatz zu reinen Retrieval-Ansätzen.
    
- `get_system_info_tool()`: Gibt grundlegende Informationen über das laufende System zurück (z. B. Betriebssystem, Python-Version). Dies dient als einfacher Test für die Tool-Ausführungsumgebung.
    

# 3. Client-Funktionen (API-Wrapper)

Der Client fungiert als zuverlässige Vermittlungsschicht. Seine Hauptaufgabe ist die **Schnittstellen-Normalisierung** und das Management des Server-Zustands.

|   |   |   |
|---|---|---|
|**Funktion**|**Beschreibung**|**Workflow-Schritt**|
|`setup_full_connection(server_name, server_handler)`|Führt die vollständige Verbindung in einem Schritt aus: `connect_to_server` (Verbindung herstellen), `initialize_server_connection` (Protokoll-Handshake durchführen) und `discover_server_tools` (Tool-Liste abrufen).|**1. Connect** → **2. Initialize** → **3. Discover Tools**|
|`call_server_tool(server_name, tool_name, arguments)`|Erstellt eine `tools/call`-Anfrage im standardisierten MCP-Format und sendet sie asynchron an den Server-Handler. Die Funktion kapselt die Fehlerbehandlung des RPC-Aufrufs.|Tool-Ausführung.|
|`list_connected_servers()`|Listet alle aktuell verbundenen Server auf, die für den Client verfügbar sind.|Status.|
|`get_available_tools()`|Gibt eine aggregierte Übersicht aller vom Client entdeckten Tools zurück. Diese Liste wird verwendet, um den AI-Assistenten über seine **externen Fähigkeiten** zu informieren.|Status.|

# 4. AI-Assistant-Funktionen (LLM-Logik)

Der Assistent ist das Herzstück der Interaktion. Er nutzt das LLM in einem **Multi-Step-Reasoning-Prozess**, um auf MCP-Tools gestützte Antworten zu liefern.

|   |   |   |
|---|---|---|
|**Funktion**|**Beschreibung**|**Prozess-Schritt**|
|`process_user_query(user_query, use_mcp=True)`|**Haupt-Loop:** Verarbeitet die Anfrage in zwei Schritten:|**Die Kernlogik des Assistenten.**|
||1. **Initial Call (Reasoning):** Das LLM erhält den `system_prompt` mit der Anweisung, MCP-Aufrufe zu generieren. Die rohe LLM-Antwort (mit potenziellen Tool-Calls) wird abgerufen.|Reasoning.|
||2. **Execute Calls (Tool-Nutzung):** Die Funktion `extract_mcp_calls_from_text` parst die rohe Antwort. Die extrahierten Aufrufe werden synchron/asynchron über den Client ausgeführt, um reale Daten zu erhalten.|Tool-Nutzung.|
||3. **Final Call (Ergebnisgenerierung):** Die ursprüngliche Benutzeranfrage und die Ergebnisse der Tool-Aufrufe (`mcp_results`) werden dem LLM in einem neuen Prompt als **Kontext** präsentiert. Die resultierende Antwort ist die endgültige, natürliche und fundierte Ausgabe an den Benutzer.|Ergebnisgenerierung.|
|`setup_assistant_mcp_connection(server_name)`|Konfiguriert den Assistenten, um einen bestimmten, bereits verbundenen Server für Tool-Aufrufe zu nutzen, und aktiviert den MCP-Modus.|Einbindung.|
|`get_assistant_status()`|Gibt den aktuellen Zustand des Assistenten zurück, einschließlich des verbundenen Servers, der Aktivierung des MCP-Modus und einer Liste aller dem Assistenten bekannten Tools.|Status.|
|`toggle_mcp_mode(enabled)`|Schaltet die MCP-Nutzung für den Assistenten ein oder aus. Im deaktivierten Zustand antwortet das LLM nur mit seinem internen Wissen.|Steuerung.|

# 5. Kommunikations-Konventionen

Das Modul verwendet die folgende Konvention für den LLM-Output, um MCP-Aufrufe zu identifizieren und zu parsen. Diese Formatierung ist kritisch, da sie es dem Code ermöglicht, die **Aktionsabsicht** des Modells zu erkennen.

```
[MCP_CALL: <tool_name>({<arguments_json>})] [/MCP_CALL]
```

**Erklärung der Syntax:**

- `[MCP_CALL: ...]` und `[/MCP_CALL]`: Beginnt und beendet den Aufruf-Block.
    
- `<tool_name>`: Entspricht einem der im Server registrierten Tool-Namen (z. B. `write_file`).
    
- `{<arguments_json>}`: Ein gültiges JSON-Objekt, das die notwendigen Parameter für das aufgerufene Tool enthält.
    

**Beispiel:**

```
[MCP_CALL: write_file({"filepath": "todos.txt", "content": "1. Meeting vorbereiten"})] [/MCP_CALL]
```