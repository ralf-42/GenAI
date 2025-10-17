


**Version 1.0** | Oktober 2025 | Funktionales RAG-System

---


# 3 Was ist M14?

M14 ist ein **funktionales multimodales RAG-System**, das Text- und Bilddokumente in einer einheitlichen Vektordatenbank verwaltet und durchsucht.

## 3.1 Modalitätsrichtungen

| Eingabe (Query) | Ausgabe (Antwort) | Beispiel / Beschreibung | Status |
|-----------------|-------------------|-------------------------|--------|
| **Text → Text** | Textbasierte Frage führt zu Textantwort | Klassisches RAG-System (z.B. Chatbot, Q&A) | ✅ |
| **Text → Bild** | Textanfrage findet relevante Bilder | "Zeige mir Roboter-Bilder" | ✅ |
| **Bild → Text** | Bildanalyse oder Captioning | "Was ist auf diesem Foto zu sehen?" | ❌ |
| **Bild → Bild** | Bildretrieval oder visuelle Transformation | "Finde ähnliche Bilder" | ❌ |
| **Text + Bild → Text** | Kombination zur Textgenerierung | "Welche Informationen enthält dieses Diagramm?" | ❌ |
| **Text + Bild → Bild** | Bedingte Bildgenerierung | "Mach aus diesem Bild eine Winterversion" | ❌ |

## 3.2 Hauptvorteile

1. **Funktionale Architektur**: Klare Trennung von Konfiguration, Komponenten und Funktionen
2. **Einheitliche Datenbank**: ChromaDB mit separaten Collections für Text und Bilder
3. **Hybride Suche**: Text-Embeddings (OpenAI) + Bild-Embeddings (CLIP)
4. **Flexible Konfiguration**: Alle Parameter über RAGConfig anpassbar
5. **Produktionsreif**: Mit Error-Handling, Duplikats-Prüfung und Status-Monitoring

---

# 2 Quick Start

```python
from pathlib import Path
from M14_functions import *

# 1. System initialisieren
config = RAGConfig(db_path='./multimodal_rag_db')
rag = init_rag_system(config)

# 2. Dokumente verarbeiten
results = process_directory(rag, './files', include_images=True)

# 3. Multimodale Suche
result = multimodal_search(rag, "Wer ist Thoren Navarro?", k_text=3, k_images=2)
print(result)
```

**Das war's!** Nur 3 Schritte für ein funktionales multimodales RAG-System.

---

# 4 Dateien

| Datei                             | Beschreibung                                                      |
| --------------------------------- | ----------------------------------------------------------------- |
| **M14_Multimodal_RAG_Demo.ipynb** | Notebook mit Demo                                                 |
| **M14_Multimodal_RAG_Modul.py**   | Python-Funktionen zur Erstellung und Nutzung des multimodalen RAG |
| **M14_README.md**                 | Vollständige Dokumentation                                        |

---

# 5 Installation

## 5.1 Voraussetzungen

```python
# Erforderliche Pakete
pip install markitdown[all]
pip install langchain_chroma
pip install langchain_openai
pip install sentence-transformers
pip install chromadb
pip install pillow
```

## 5.2 API-Keys

```python
import os
os.environ['OPENAI_API_KEY'] = 'your-api-key'
```

---

# 6 Systemarchitektur

## 6.1 Konfiguration & Setup

```
RAGConfig → init_rag_system() → RAGComponents
```

**RAGConfig**: Zentrale Konfiguration als Dataclass
**RAGComponents**: Container für alle System-Komponenten
**init_rag_system()**: Einmalige Initialisierung

## 6.2 Dokumenten-Verarbeitung

```
add_text_document() → Text-Dokument hinzufügen
add_image() → Einzelnes Bild hinzufügen
process_directory() → Gesamtes Verzeichnis verarbeiten
```

## 6.3 Suche & Abfrage

```
search_texts() → Reine Text-Suche
search_images() → Reine Bild-Suche
multimodal_search() → Kombinierte Suche
```

## 6.4 Datenfluss

```
Dokumente → Verarbeitung → Embeddings → Vektordatenbank → Suche → LLM → Antwort
```

---

# 7 Hauptfeatures

## 7.1 Dual-Collection-Architektur

**Text-Collection:**
- OpenAI Embeddings (`text-embedding-3-small`)
- Metadaten: source, filename, chunk_id
- Automatisches Chunking mit RecursiveCharacterTextSplitter

**Image-Collection:**
- CLIP Embeddings (`clip-ViT-B-32`, 512 Dimensionen)
- Metadaten: source, filename, description
- Duplikats-Prüfung über Dateiname

## 7.2 Dokumenten-Konvertierung

Unterstützte Formate via MarkItDown:
- Text: `.txt`, `.md`, `.html`
- Dokumente: `.pdf`, `.docx`
- Bilder: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`

## 7.3 Ähnlichkeitssuche mit normalisiertem Scoring

**Text-Suche:**
```python
Ähnlichkeit = 2.0 / (1 + Score)
```

**Bild-Suche:**
```python
Ähnlichkeit = max(0, 1 - Distanz)
```

**Wertebereich:** 0.0 (nicht ähnlich) bis 1.0 (identisch)

## 7.4 LLM-Integration

- GPT-4o-mini für Antwortgenerierung
- Kontext aus Top-k Dokumenten
- Quellenangaben mit Ähnlichkeitswerten

---

# 8 Verwendung

## 8.1 System initialisieren

```python
from pathlib import Path
import uuid
from dataclasses import dataclass
from markitdown import MarkItDown
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain_core.documents import Document
from sentence_transformers import SentenceTransformer
from PIL import Image
import chromadb

# Konfiguration
config = RAGConfig(db_path='./multimodal_rag_db')

# System initialisieren
rag = init_rag_system(config)
```

**Ausgabe:**
```
🚀 Initialisiere RAG-System in ./multimodal_rag_db
✅ OpenAI Text-Embeddings initialisiert
🖼️ Lade CLIP-Modell...
✅ CLIP-Modell geladen
✅ Collections initialisiert
```

## 8.2 Dokumente verarbeiten

```python
# Gesamtes Verzeichnis verarbeiten
results = process_directory(rag, './files', include_images=True)

print(f"📄 Text-Dokumente: {results['texts']}")
print(f"🖼️ Bilder: {results['images']}")
print(f"📦 Gesamt: {results['texts'] + results['images']}")
```

**Ausgabe:**
```
📊 Gefunden: 4 Text-Dateien, 3 Bilder
📄 biografien_1.txt
✅ 5 Chunks von 'biografien_1.txt' hinzugefügt
📄 biografien_2.md
✅ 6 Chunks von 'biografien_2.md' hinzugefügt
...
🖼️ apfel.jpg
🖼️ Bild-Embedding erstellt für apfel.jpg
✅ Bild 'apfel.jpg' hinzugefügt
```

## 8.3 Einzelnes Dokument hinzufügen

```python
# Text-Dokument
success = add_text_document(rag, './files/biografien_1.txt')

# Bild mit Beschreibung
success = add_image(rag, './files/robot.jpg', description="Futuristischer Roboter")
```

## 8.4 Text-Suche

```python
query = "Wer ist Thoren Navarro?"
result = search_texts(rag, query, k=3)
print(result)
```

**Ausgabe:**
```
Thoren Navarro ist eine fiktive Figur, spezialisiert auf Unterwasserarchäologie...

📚 Quellen (2):
   • biografien_2.md (Ähnlichkeit: 0.756)
   • biografien_1.txt (Ähnlichkeit: 0.423)
```

## 8.5 Bild-Suche

```python
query = "Roboter"
images = search_images(rag, query, k=3)

for i, img in enumerate(images, 1):
    print(f"{i}. {img['filename']} (Ähnlichkeit: {img['similarity']})")
    if img['description']:
        print(f"   📝 {img['description']}")
```

**Ausgabe:**
```
1. a_retro-futuristic_robot_dall_e.jpg (Ähnlichkeit: 0.742)
   📝 retro futuristic robot dall e
2. hedra_cyborg.png (Ähnlichkeit: 0.658)
   📝 hedra cyborg
```

## 8.6 Multimodale Suche

```python
result = multimodal_search(rag, "Zeige mir Roboter", k_text=2, k_images=2)
print(result)
```

**Ausgabe:**
```
🔍 Multimodale Suche: Zeige mir Roboter

📄 TEXT-ERGEBNISSE:
[Text-Antworten mit Quellen...]

🖼️ BILD-ERGEBNISSE (2 gefunden):
   1. a_retro-futuristic_robot_dall_e.jpg (Ähnlichkeit: 0.742)
      📝 retro futuristic robot dall e
   2. hedra_cyborg.png (Ähnlichkeit: 0.658)
      📝 hedra cyborg
```

## 8.7 System-Status

```python
status = get_system_status(rag)
print(f"📄 {status['text_chunks']} Text-Chunks")
print(f"🖼️ {status['images']} Bilder")
print(f"📦 {status['total_documents']} Dokumente insgesamt")
```

## 8.8 Datenbank löschen

```python
cleanup_database('./multimodal_rag_db')
```

---

# 9 API-Referenz

## 9.1 Datenstrukturen

## 9.2 `RAGConfig`

Zentrale Konfiguration als Dataclass.

**Attribute:**
```python
chunk_size = 200              # Chunk-Größe für Text-Splitting
chunk_overlap = 20            # Überlappung zwischen Chunks
text_threshold = 1.2          # Schwellenwert für Text-Suche
image_threshold = 0.8         # Schwellenwert für Bild-Suche
clip_model = 'clip-ViT-B-32'  # CLIP-Modell für Bilder
text_model = 'text-embedding-3-small'  # OpenAI Embedding-Modell
llm_model = 'gpt-4o-mini'     # LLM für Antwortgenerierung
db_path = './multimodal_rag_db'  # Pfad zur Datenbank
```

**Beispiel:**
```python
config = RAGConfig()
config.chunk_size = 500
config.db_path = './custom_db'
```

---

## 9.3 `RAGComponents`

Container für alle System-Komponenten.

**Attribute:**
```python
text_embeddings: OpenAIEmbeddings
clip_model: SentenceTransformer
llm: ChatOpenAI
text_splitter: RecursiveCharacterTextSplitter
markitdown: MarkItDown
chroma_client: chromadb.PersistentClient
text_collection: Chroma
image_collection: chromadb.Collection
```

---

## 9.4 Hauptfunktionen

## 9.5 `init_rag_system(config=None)`

Initialisiert alle RAG-Komponenten.

**Parameter:**
- `config`: RAGConfig-Instanz (optional, Standard: neue RAGConfig())

**Returns:** RAGComponents mit allen initialisierten Komponenten

**Beispiel:**
```python
config = RAGConfig(db_path='./my_db')
rag = init_rag_system(config)
```

---

## 9.6 `add_text_document(components, file_path)`

Fügt ein Text-Dokument zur Datenbank hinzu.

**Parameter:**
- `components`: RAGComponents-Instanz
- `file_path`: Pfad zum Dokument (str oder Path)

**Returns:** bool - True bei Erfolg, False bei Fehler oder Duplikat

**Features:**
- Automatische Duplikats-Erkennung über Dateipfad
- Konvertierung via MarkItDown (PDF, DOCX, TXT, MD, HTML)
- Automatisches Chunking mit konfigurierbarer Größe
- Metadaten: source, filename, chunk_id

**Beispiel:**
```python
success = add_text_document(rag, './files/document.pdf')
if success:
    print("✅ Dokument hinzugefügt")
```

---

## 9.7 `add_image(components, image_path, description="")`

Fügt ein Bild zur Datenbank hinzu.

**Parameter:**
- `components`: RAGComponents-Instanz
- `image_path`: Pfad zum Bild (str oder Path)
- `description`: Optionale Bildbeschreibung (str)

**Returns:** bool - True bei Erfolg, False bei Fehler

**Features:**
- CLIP-Embedding-Generierung (ViT-B-32, 512 Dimensionen)
- Automatische RGB-Konvertierung
- UUID-basierte ID-Generierung
- Metadaten: source, filename, description

**Beispiel:**
```python
success = add_image(rag, './files/robot.jpg', description="Futuristischer Roboter")
```

---

## 9.8 `process_directory(components, directory, include_images=True)`

Verarbeitet alle Dateien in einem Verzeichnis rekursiv.

**Parameter:**
- `components`: RAGComponents-Instanz
- `directory`: Verzeichnispfad (str oder Path)
- `include_images`: Bilder verarbeiten (bool, default: True)

**Returns:** Dictionary mit Statistiken:
```python
{
    "texts": int,   # Anzahl verarbeiteter Text-Dokumente
    "images": int   # Anzahl verarbeiteter Bilder
}
```

**Unterstützte Formate:**
- Text: `.pdf`, `.docx`, `.txt`, `.md`, `.html`
- Bilder: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`

**Beispiel:**
```python
results = process_directory(rag, './documents', include_images=True)
print(f"Verarbeitet: {results['texts']} Texte, {results['images']} Bilder")
```

---

## 9.9 `search_texts(components, query, k=3, config=None)`

Durchsucht Text-Dokumente mit Ähnlichkeitssuche.

**Parameter:**
- `components`: RAGComponents-Instanz
- `query`: Suchanfrage (str)
- `k`: Anzahl Top-Ergebnisse (int, default: 3)
- `config`: RAGConfig für Schwellenwerte (optional)

**Returns:** str - Formatierte LLM-Antwort mit Quellenangaben

**Ähnlichkeitsberechnung:**
```python
Ähnlichkeit = 2.0 / (1 + Score)
```

**Mindest-Ähnlichkeit:** 0.3 (konfigurierbar)

**Beispiel:**
```python
result = search_texts(rag, "Wer ist Thoren Navarro?", k=5)
print(result)
```

**Ausgabe:**
```
Thoren Navarro ist eine fiktive Figur...

📚 Quellen (2):
   • biografien_2.md (Ähnlichkeit: 0.756)
   • biografien_1.txt (Ähnlichkeit: 0.423)
```

---

## 9.10 `search_images(components, query, k=3, config=None)`

Durchsucht Bilder mit Text-Query über CLIP-Embeddings.

**Parameter:**
- `components`: RAGComponents-Instanz
- `query`: Suchanfrage (str)
- `k`: Anzahl Top-Ergebnisse (int, default: 3)
- `config`: RAGConfig für Schwellenwerte (optional)

**Returns:** Liste von Dictionaries:
```python
[
    {
        "filename": str,
        "path": str,
        "description": str,
        "similarity": float  # 0.0 - 1.0
    },
    ...
]
```

**Ähnlichkeitsberechnung:**
```python
Ähnlichkeit = max(0, 1 - Distanz)
```

**Schwellenwert:** config.image_threshold (default: 0.8)

**Beispiel:**
```python
images = search_images(rag, "futuristischer Roboter", k=3)
for img in images:
    print(f"{img['filename']}: {img['similarity']}")
```

---

## 9.11 `multimodal_search(components, query, k_text=3, k_images=3)`

Kombinierte multimodale Suche (Text + Bilder).

**Parameter:**
- `components`: RAGComponents-Instanz
- `query`: Suchanfrage (str)
- `k_text`: Anzahl Text-Ergebnisse (int, default: 3)
- `k_images`: Anzahl Bild-Ergebnisse (int, default: 3)

**Returns:** str - Formatierte Ausgabe mit Text- und Bild-Ergebnissen

**Features:**
- Parallele Suche in beiden Modalitäten
- Einheitliche Formatierung
- Separate Ausgabe von Text- und Bildquellen

**Beispiel:**
```python
result = multimodal_search(rag, "Künstliche Intelligenz", k_text=5, k_images=3)
print(result)
```

---

## 9.12 `get_system_status(components)`

Gibt System-Status zurück.

**Parameter:**
- `components`: RAGComponents-Instanz

**Returns:** Dictionary mit Statistiken:
```python
{
    "text_chunks": int,
    "images": int,
    "total_documents": int
}
```

**Beispiel:**
```python
status = get_system_status(rag)
print(f"Gesamt: {status['total_documents']} Dokumente")
```

---

## 9.13 `cleanup_database(db_path='./multimodal_rag_db')`

Löscht die Datenbank komplett.

**Parameter:**
- `db_path`: Pfad zur Datenbank (str, default: './multimodal_rag_db')

**Returns:** None

**Warnung:** Alle Daten werden unwiderruflich gelöscht!

**Beispiel:**
```python
cleanup_database('./multimodal_rag_db')
```

---

# 10 Best Practices

## 10.1 Datenbank-Organisation

```python
# Separate Datenbanken für verschiedene Projekte
config_project1 = RAGConfig(db_path='./projekt1_db')
rag1 = init_rag_system(config_project1)

config_project2 = RAGConfig(db_path='./projekt2_db')
rag2 = init_rag_system(config_project2)
```

## 10.2 Chunk-Größe optimieren

```python
# Für lange Dokumente: größere Chunks
config = RAGConfig()
config.chunk_size = 1000
config.chunk_overlap = 100

# Für präzise Suche: kleinere Chunks
config.chunk_size = 200
config.chunk_overlap = 20
```

## 10.3 Schwellenwerte anpassen

```python
config = RAGConfig()
config.text_threshold = 1.5  # Höher = weniger streng
config.image_threshold = 0.6  # Niedriger = mehr Ergebnisse
```

## 10.4 Batch-Verarbeitung

```python
from pathlib import Path

directories = ['./docs', './images', './pdfs']
total_results = {"texts": 0, "images": 0}

for directory in directories:
    results = process_directory(rag, directory)
    total_results["texts"] += results["texts"]
    total_results["images"] += results["images"]

print(f"Gesamt: {total_results['texts']} Texte, {total_results['images']} Bilder")
```

## 10.5 Fehlerbehandlung

```python
try:
    success = add_text_document(rag, file_path)
    if success:
        print(f"✅ {file_path} hinzugefügt")
    else:
        print(f"⚠️ {file_path} bereits vorhanden oder leer")
except Exception as e:
    print(f"❌ Fehler: {e}")
```

---

# 11 Use Cases

## 11.1 Dokumenten-Wissensdatenbank

```python
# Setup
rag = init_rag_system(RAGConfig(db_path='./knowledge_db'))
process_directory(rag, './company_docs')

# Abfrage
result = search_texts(rag, "Was ist unsere Datenschutzrichtlinie?")
```

## 11.2 Multimediale Produktkataloge

```python
# Produkt-Dokumente und Bilder laden
results = process_directory(rag, './products', include_images=True)

# Suche nach Produkten
result = multimodal_search(rag, "rote Sportschuhe", k_text=3, k_images=5)
```

## 11.3 Forschungsdatenbank

```python
# Papers und Diagramme indizieren
process_directory(rag, './research_papers')

# Spezifische Konzepte finden
result = search_texts(rag, "transformer architecture", k=10)
```

---

# 12 Performance & Monitoring

## 12.1 Performance-Messung

```python
import time
from functools import wraps

def measure_time(func):
    """Decorator für Performance-Messung"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        duration = time.time() - start
        print(f"⏱️ {func.__name__} dauerte {duration:.2f}s")
        return result
    return wrapper

@measure_time
def timed_search(components, query):
    return multimodal_search(components, query)

# Usage
result = timed_search(rag, "Test Query")
```

## 12.2 Benchmark-Tests

```python
def benchmark_function(func, *args, iterations=10):
    """Benchmarkt eine Funktion über mehrere Iterationen"""
    times = []

    for _ in range(iterations):
        start = time.time()
        func(*args)
        end = time.time()
        times.append(end - start)

    return {
        "avg_time": sum(times) / len(times),
        "min_time": min(times),
        "max_time": max(times),
        "total_time": sum(times)
    }

# Usage
stats = benchmark_function(search_texts, rag, "test query", iterations=10)
print(f"Durchschnitt: {stats['avg_time']:.3f}s")
print(f"Min: {stats['min_time']:.3f}s")
print(f"Max: {stats['max_time']:.3f}s")
```

## 12.3 Typische Performance-Werte

- **CLIP-Modell laden**: ~5 Sekunden (einmalig)
- **Text-Embedding erstellen**: ~0.1 Sekunden
- **Bild-Embedding erstellen**: ~0.2 Sekunden
- **Text-Suche (k=3)**: ~0.3 Sekunden
- **Bild-Suche (k=3)**: ~0.2 Sekunden
- **Multimodale Suche**: ~0.5 Sekunden

---

# 13 Troubleshooting

## 13.1 Problem: CLIP-Modell lädt sehr langsam

**Lösung:**
- Beim ersten Start wird das Modell heruntergeladen (~350 MB)
- Danach wird es gecacht
- Internetverbindung erforderlich

## 13.2 Problem: "No documents found" bei Suche

**Lösung:**
```python
status = get_system_status(rag)
print(status)  # Prüfen ob Dokumente geladen sind
```

## 13.3 Problem: Niedrige Ähnlichkeitswerte

**Lösung:**
```python
# Schwellenwerte senken
config = RAGConfig()
config.text_threshold = 2.0  # Weniger streng
config.image_threshold = 0.5
```

## 13.4 Problem: Duplikate werden nicht erkannt

**Lösung:**
- Duplikats-Prüfung basiert auf absolutem Dateipfad
- Gleiche Datei an verschiedenen Orten wird zweimal hinzugefügt
- Lösung: Datenbank löschen und neu aufbauen

```python
cleanup_database('./multimodal_rag_db')
rag = init_rag_system()
```

## 13.5 Problem: Out of Memory bei großen Bildern

**Lösung:**
```python
from PIL import Image

# Bilder vor Verarbeitung verkleinern
img = Image.open(path)
img.thumbnail((800, 800))
img.save(path)
```

---

# 14 Ähnlichkeitswerte verstehen

## 14.1 Wertebereich

**Ähnlichkeitswerte bewegen sich zwischen 0 und 1:**

- **1.0 = Identisch**: Perfekte Übereinstimmung (sehr selten)
- **0.8 - 0.99 = Sehr ähnlich**: Hohe thematische Übereinstimmung
- **0.6 - 0.79 = Ähnlich**: Starke thematische Verbindung
- **0.4 - 0.59 = Mäßig ähnlich**: Teilweise Übereinstimmung
- **0.2 - 0.39 = Schwach ähnlich**: Geringe Verbindung
- **0.0 - 0.19 = Nicht ähnlich**: Keine erkennbare Verbindung

## 14.2 Empfohlene Schwellenwerte

- **Text-Suche**: Mindestens 0.3 für brauchbare Ergebnisse
- **Bild-Suche**: Mindestens 0.2 für relevante Treffer
- **Hochpräzise Suche**: Mindestens 0.6 für spezifische Anfragen

## 14.3 Berechnungslogik

**Text-Ähnlichkeit (Cosine Similarity):**
```python
Ähnlichkeit = 2.0 / (1 + Score)

# Beispiele:
Score 0    → Ähnlichkeit 1.0  (perfekt)
Score 0.5  → Ähnlichkeit 0.67
Score 1.0  → Ähnlichkeit 0.5
Score 2.0  → Ähnlichkeit 0.25
```

**Bild-Ähnlichkeit (Cosine Distance):**
```python
Ähnlichkeit = max(0, 1 - Distanz)

# Beispiele:
Distanz 0    → Ähnlichkeit 1.0 (identisch)
Distanz 0.3  → Ähnlichkeit 0.7
Distanz 0.8  → Ähnlichkeit 0.2
Distanz ≥1.0 → Ähnlichkeit 0.0
```

---

# 15 Technologie-Stack

- **Text-Embeddings**: OpenAI `text-embedding-3-small` (1536 Dimensionen)
- **Bild-Embeddings**: CLIP `ViT-B-32` (SentenceTransformers, 512 Dimensionen)
- **LLM**: OpenAI GPT-4o-mini
- **Vektor-DB**: ChromaDB (persistiert)
- **Text-Chunking**: LangChain RecursiveCharacterTextSplitter
- **Dokument-Konvertierung**: MarkItDown

---

# 16 Erweiterte Funktionen

Das Notebook enthält zusätzliche Beispiele für:

- **Batch-Verarbeitung** mehrerer Verzeichnisse
- **Erweiterte Suchoptionen** mit Filtern
- **Performance-Monitoring** mit Decorators
- **Benchmark-Tests** für Funktionen
- **Gradio Interface** für Web-UI

Details siehe Notebook-Abschnitte 4-6.

---

# 17 Lizenz

MIT License - Copyright (c) 2025 Ralf

---

# 18 Autor & Version

**Version 1.0** (Oktober 2025)
- Funktionales multimodales RAG-System
- Features: Text-Suche, Bild-Suche, Multimodale Suche, Ähnlichkeits-Scoring

---

# 19 Weitere Ressourcen

- **Notebook**: `M14_Multimodal_RAG.ipynb`
- **Enhanced Version**: `M14a_standalone.py` (mit automatischen Bildbeschreibungen)
