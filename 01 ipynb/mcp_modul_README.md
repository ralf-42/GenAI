# MCP (Model Context Protocol) Modul

## Übersicht

Das **MCP-Modul** ist eine funktionale Python-Implementierung des Model Context Protocol, das die Kommunikation zwischen AI-Assistenten und externen Tools standardisiert.

**Version**: 1.0.0
**Autor**: Enhanced by Claude
**Datum**: Oktober 2025

---

## Features

✅ **Funktionaler Ansatz** - Keine Klassen, nur pure Functions
✅ **MCP-Server** - Datei-Operationen und System-Informationen
✅ **MCP-Client** - Verbindungs-Management und Tool-Discovery
✅ **AI-Assistant** - OpenAI-Integration mit MCP-Support
✅ **Erweiterbar** - Einfaches Hinzufügen neuer Tools
✅ **Production-Ready** - Error-Handling und State-Management

---

## Installation

```python
# Modul ist bereits im Verzeichnis verfügbar
# Einfach importieren:
from mcp_modul import *
```

**Dependencies**:
```bash
pip install openai  # Für AI-Assistant (optional)
```

---

## Schnellstart

### 1. Server erstellen

```python
from mcp_modul import handle_mcp_request, get_server_info

# Server-Info anzeigen
info = get_server_info()
print(info)

# MCP-Request verarbeiten
request = {
    "jsonrpc": "2.0",
    "id": "test-1",
    "method": "tools/list"
}

response = await handle_mcp_request(request)
print(response)
```

### 2. Client nutzen

```python
from mcp_modul import setup_full_connection, call_server_tool, handle_mcp_request

# Vollständige Verbindung herstellen
await setup_full_connection("file-server", handle_mcp_request)

# Tool aufrufen
response = await call_server_tool(
    "file-server",
    "get_system_info",
    {}
)
```

### 3. AI-Assistant verwenden

```python
from mcp_modul import (
    setup_assistant_mcp_connection,
    process_user_query
)

# Assistant mit Server verbinden
setup_assistant_mcp_connection("file-server")

# Query verarbeiten
answer = await process_user_query(
    "Was für ein System läuft hier?"
)
print(answer)
```

---

## API-Referenz

### Server-Funktionen

#### `handle_mcp_request(request: Dict) -> Dict`
Haupt-Handler für MCP-Requests.

**Parameter**:
- `request`: MCP-Request im JSON-RPC Format

**Returns**: MCP-Response

**Beispiel**:
```python
request = {
    "jsonrpc": "2.0",
    "id": "1",
    "method": "initialize"
}
response = await handle_mcp_request(request)
```

#### `get_server_info() -> Dict`
Gibt Server-Informationen zurück.

**Returns**: Dict mit name, version, available_tools

#### `register_new_tool(name, description, parameters, function) -> bool`
Registriert ein neues Tool.

**Parameter**:
- `name`: Tool-Name
- `description`: Beschreibung
- `parameters`: JSON-Schema für Parameter
- `function`: Async-Funktion, die das Tool implementiert

---

### Client-Funktionen

#### `setup_full_connection(server_name: str, server_handler: Callable) -> bool`
Stellt vollständige Server-Verbindung her (Connect + Initialize + Discover).

**Parameter**:
- `server_name`: Name des Servers
- `server_handler`: Handler-Funktion (z.B. `handle_mcp_request`)

**Returns**: True bei Erfolg

**Beispiel**:
```python
success = await setup_full_connection(
    "file-server",
    handle_mcp_request
)
```

#### `call_server_tool(server_name: str, tool_name: str, arguments: Dict) -> Dict`
Ruft ein Tool auf einem Server auf.

**Parameter**:
- `server_name`: Name des Servers
- `tool_name`: Name des Tools
- `arguments`: Tool-Argumente

**Returns**: MCP-Response

#### `get_available_tools() -> Dict[str, List[str]]`
Gibt alle verfügbaren Tools zurück.

**Returns**: Dict mit Server → Tool-Namen Mapping

#### `get_client_status() -> Dict`
Gibt aktuellen Client-Status zurück.

---

### Assistant-Funktionen

#### `setup_assistant_mcp_connection(server_name: str) -> bool`
Verbindet Assistant mit MCP-Server.

**Parameter**:
- `server_name`: Name des Servers

**Returns**: True bei Erfolg

#### `process_user_query(query: str, use_mcp: bool = True) -> str`
Verarbeitet User-Anfrage mit oder ohne MCP.

**Parameter**:
- `query`: User-Anfrage
- `use_mcp`: MCP verwenden (default: True)

**Returns**: AI-Antwort als String

**Beispiel**:
```python
# Mit MCP
answer = await process_user_query(
    "Welche Dateien sind im aktuellen Verzeichnis?"
)

# Ohne MCP (zum Vergleich)
answer = await process_user_query(
    "Was ist KI?",
    use_mcp=False
)
```

#### `toggle_mcp_mode(enabled: bool) -> str`
Schaltet MCP-Modus ein/aus.

#### `get_assistant_status() -> Dict`
Gibt Assistant-Status zurück.

---

## Verfügbare Tools

### Datei-Tools

**`read_file`**
```python
await call_server_tool(
    "file-server",
    "read_file",
    {"filepath": "example.txt"}
)
```

**`write_file`**
```python
await call_server_tool(
    "file-server",
    "write_file",
    {
        "filepath": "test.txt",
        "content": "Hello World!"
    }
)
```

**`list_files`**
```python
await call_server_tool(
    "file-server",
    "list_files",
    {"directory": "."}
)
```

### System-Tools

**`get_system_info`**
```python
await call_server_tool(
    "file-server",
    "get_system_info",
    {}
)
```

---

## Eigene Tools hinzufügen

### Schritt 1: Tool-Funktion implementieren

```python
async def my_custom_tool(param1: str, param2: int) -> Dict[str, Any]:
    """Mein eigenes Tool"""
    try:
        # Tool-Logik hier
        result = f"Verarbeite {param1} mit {param2}"

        return {
            "success": True,
            "result": result
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
```

### Schritt 2: Tool registrieren

```python
from mcp_modul import register_new_tool

success = register_new_tool(
    name="my_custom_tool",
    description="Mein eigenes Tool",
    parameters={
        "type": "object",
        "properties": {
            "param1": {"type": "string"},
            "param2": {"type": "integer"}
        },
        "required": ["param1", "param2"]
    },
    function=my_custom_tool
)
```

### Schritt 3: Tool verwenden

```python
response = await call_server_tool(
    "file-server",
    "my_custom_tool",
    {"param1": "test", "param2": 42}
)
```

---

## Architektur

### Komponentenübersicht

```
┌──────────────────────────────────────────────┐
│ AI-Assistant (OpenAI)                        │
│ - process_user_query()                       │
│ - extract_mcp_calls_from_text()             │
└────────────────┬─────────────────────────────┘
                 │
                 ↓
┌──────────────────────────────────────────────┐
│ MCP-Client                                   │
│ - setup_full_connection()                    │
│ - call_server_tool()                         │
└────────────────┬─────────────────────────────┘
                 │
                 ↓
┌──────────────────────────────────────────────┐
│ MCP-Server                                   │
│ - handle_mcp_request()                       │
│ - handle_tool_call()                         │
└────────────────┬─────────────────────────────┘
                 │
                 ↓
┌──────────────────────────────────────────────┐
│ Tools (Datei, System, Custom)                │
│ - read_file_tool()                           │
│ - write_file_tool()                          │
│ - list_files_tool()                          │
│ - get_system_info_tool()                     │
└──────────────────────────────────────────────┘
```

### Datenfluss

```
1. User → AI-Assistant
2. Assistant extrahiert MCP-Calls
3. Client ruft Server-Tools auf
4. Server führt Tools aus
5. Ergebnisse zurück zu Assistant
6. Assistant generiert finale Antwort
```

---

## State-Management

Das Modul verwendet globale Dictionaries für State:

```python
# Server-State
server_config = {...}
tools_registry = {...}
tool_functions = {...}

# Client-State
connected_servers = {}
available_tools = {}

# Assistant-State
assistant_state = {
    "connected_server": None,
    "mcp_enabled": True,
    "conversation_history": []
}
```

**Hinweis**: Für Production-Systeme sollte ein robusteres State-Management (z.B. mit Context-Manager oder State-Klassen) verwendet werden.

---

## Best Practices

### 1. Error-Handling

```python
try:
    response = await call_server_tool(...)

    if "error" in response:
        print(f"Fehler: {response['error']['message']}")
    else:
        # Verarbeite Erfolg
        pass
except Exception as e:
    print(f"Exception: {e}")
```

### 2. Tool-Validation

```python
# Prüfe vor Tool-Aufruf
tool_details = get_tool_details("file-server", "read_file")
if tool_details:
    required = tool_details['parameters'].get('required', [])
    # Validiere Argumente
```

### 3. Async/Await

```python
# RICHTIG: Async-Funktionen mit await
response = await call_server_tool(...)

# FALSCH: Fehlende await
response = call_server_tool(...)  # Gibt Coroutine zurück!
```

### 4. Robuste Tool-Implementierung

```python
async def my_tool(param: str) -> Dict[str, Any]:
    try:
        # Tool-Logik
        result = do_something(param)

        return {
            "success": True,
            "result": result,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "param": param
        }
```

---

## Beispiele

### Vollständiges Beispiel: Datei-Operation

```python
import asyncio
from mcp_modul import (
    setup_full_connection,
    handle_mcp_request,
    call_server_tool
)

async def main():
    # Server-Verbindung
    await setup_full_connection("file-server", handle_mcp_request)

    # Datei schreiben
    write_response = await call_server_tool(
        "file-server",
        "write_file",
        {
            "filepath": "test.txt",
            "content": "Hello from MCP!"
        }
    )

    # Datei lesen
    read_response = await call_server_tool(
        "file-server",
        "read_file",
        {"filepath": "test.txt"}
    )

    # Ergebnis anzeigen
    import json
    result = json.loads(
        read_response["result"]["content"][0]["text"]
    )
    print(f"Dateiinhalt: {result['content']}")

# Ausführen
asyncio.run(main())
```

### AI-Assistant mit MCP

```python
from mcp_modul import (
    setup_full_connection,
    setup_assistant_mcp_connection,
    process_user_query,
    handle_mcp_request
)

async def demo_assistant():
    # Setup
    await setup_full_connection("file-server", handle_mcp_request)
    setup_assistant_mcp_connection("file-server")

    # Queries
    queries = [
        "Was für ein System läuft hier?",
        "Welche Dateien sind im aktuellen Verzeichnis?",
        "Erstelle eine Datei test.txt mit dem Inhalt 'Hello World'"
    ]

    for query in queries:
        print(f"\n❓ {query}")
        answer = await process_user_query(query)
        print(f"🤖 {answer}")

asyncio.run(demo_assistant())
```

---

## Fehlerbehebung

### Problem: "OpenAI package nicht installiert"

```bash
pip install openai
```

### Problem: "Server nicht verbunden"

```python
# Prüfe verbundene Server
from mcp_modul import list_connected_servers

servers = list_connected_servers()
print(f"Verbundene Server: {servers}")

# Falls leer: Verbindung herstellen
await setup_full_connection("file-server", handle_mcp_request)
```

### Problem: "Tool nicht gefunden"

```python
# Prüfe verfügbare Tools
from mcp_modul import get_available_tools

tools = get_available_tools()
print(tools)
```

### Problem: "Async/Await Fehler"

```python
# RICHTIG: In async-Funktion
async def my_function():
    response = await call_server_tool(...)

# Oder mit asyncio.run()
asyncio.run(my_function())
```

---

## Performance-Tipps

1. **Verbindung wiederverwenden**: Stelle Verbindung einmal her, rufe dann mehrere Tools auf
2. **Batch-Requests**: Wenn möglich, mehrere Tool-Calls parallel ausführen
3. **Caching**: Cache Tool-Discovery Ergebnisse
4. **Error-Handling**: Vermeide Exception-Handling in Loops

---

## Erweiterungsmöglichkeiten

### 1. Neue Tool-Kategorien

- **Mathematik-Tools**: calculate, solve_equation, statistics
- **Web-Tools**: fetch_url, parse_json, validate_email
- **Datenbank-Tools**: create_table, insert_data, query_data

### 2. Authentication

```python
# Token-basierte Auth
def authenticate_request(request, token):
    if request.get("auth_token") != token:
        return create_error_response("Unauthorized")
    return None
```

### 3. Rate-Limiting

```python
from functools import wraps
import time

def rate_limit(max_calls, time_window):
    """Rate-Limiting Decorator"""
    calls = []

    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            now = time.time()
            # Alte Calls entfernen
            calls[:] = [c for c in calls if now - c < time_window]

            if len(calls) >= max_calls:
                raise Exception("Rate limit exceeded")

            calls.append(now)
            return await func(*args, **kwargs)
        return wrapper
    return decorator
```

### 4. Logging

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("mcp_modul")

# In Funktionen
logger.info(f"Tool {tool_name} aufgerufen")
logger.error(f"Fehler: {error}")
```

---

## Lizenz

MIT License - Copyright (c) 2025 Ralf

---

## Support & Kontakt

- **Repository**: GenAI/01 ipynb/mcp_modul.py
- **Notebook**: M17_MCP_Model_Context_Protocol.ipynb
- **Analyse**: M17_Modularisierung_Analyse.md

---

## Version History

### v1.0.0 (Oktober 2025)
- ✨ Initiales Release
- ✅ Server-Funktionen (Datei-Operationen, System-Info)
- ✅ Client-Funktionen (Verbindungs-Management, Tool-Discovery)
- ✅ Assistant-Funktionen (OpenAI-Integration)
- ✅ Funktionaler Ansatz (Pure Functions, keine Klassen)
- 📚 Vollständige Dokumentation

---

**Viel Erfolg mit MCP! 🚀**
