# Multimodales RAG Modul (Version 3.0)

## Übersicht

Das **Multimodale RAG Modul** ist ein produktionsreifes Retrieval-Augmented Generation (RAG) System, das Text- und Bilddokumente in einer einheitlichen Vektordatenbank verwaltet und intelligent durchsucht.

**Hauptmerkmale:**
- 🔍 **Hybride Suche**: Kombination aus Text-Embeddings (OpenAI) und Bild-Embeddings (CLIP)
- 🖼️ **Automatische Bildbeschreibungen**: KI-generierte Beschreibungen via GPT-4o-mini
- 🎯 **Multimodale Suchrichtungen**: Text→Text, Text→Bild, Bild→Bild, Bild→Text
- 📦 **ChromaDB Backend**: Persistente Vektordatenbank mit separaten Collections
- 🏗️ **Funktionale Architektur**: Klare Trennung von Konfiguration, Komponenten und Logik

---

## Installation

```python
# Erforderliche Pakete
pip install langchain langchain-openai langchain-chroma
pip install sentence-transformers chromadb
pip install markitdown pillow openai
```

---

## Schnellstart

```python
from multimodal_rag_modul import (
    init_rag_system_enhanced,
    process_directory,
    multimodal_search,
    search_text_by_image,
    search_similar_images
)

# 1. System initialisieren
rag = init_rag_system_enhanced()

# 2. Dokumente und Bilder verarbeiten
stats = process_directory(
    rag,
    './files',
    include_images=True,
    auto_describe_images=True
)

# 3. Multimodale Suche durchführen
result = multimodal_search(rag, "Was sind Cyborgs?")
print(result)
```

---

## Suchfunktionen

### 1. Text → Text/Bild Suche

```python
# Klassische textbasierte Suche mit optionaler Bildanreicherung
result = multimodal_search(
    rag,
    query="Roboter mit Emotionen",
    k_text=3,          # Anzahl Text-Ergebnisse
    k_images=3,        # Anzahl Bild-Ergebnisse
    enable_cross_modal=True
)
```

**Liefert:**
- LLM-generierte Antwort basierend auf Textdokumenten
- Relevante Textquellen mit Ähnlichkeitswerten
- Visuell passende Bilder via CLIP
- Cross-Modal gefundene Bilder über Textbeschreibungen

---

### 2. Bild → Bild Suche

```python
# Finde visuell ähnliche Bilder
similar_images = search_similar_images(
    rag,
    query_image_path="./mein_roboter.jpg",
    k=5
)

for img in similar_images:
    print(f"{img['filename']}: {img['similarity']}")
    print(f"  Beschreibung: {img['description']}")
```

**Nutzt:**
- CLIP-Embeddings für visuelle Ähnlichkeit
- Cosinus-Ähnlichkeit im Embedding-Raum

---

### 3. Bild → Text Suche (NEU in v3.0)

```python
# Finde Textinformationen zu einem Bild
result = search_text_by_image(
    rag,
    query_image_path="./cyborg_bild.png",
    k=3,        # Anzahl ähnlicher Bilder
    k_text=3    # Anzahl Text-Dokumente
)
```

**Funktionsweise:**
1. Findet visuell ähnliche Bilder via CLIP
2. Holt deren Beschreibungen aus der Datenbank
3. **NEU**: Nutzt Beschreibungen für semantische Textsuche
4. Findet relevante Text-Dokumente basierend auf Bildinhalten
5. Generiert Zusammenfassung aus Bildern UND Texten

**Ausgabe:**
- 📄 LLM-Zusammenfassung (Bilder + Texte)
- 🖼️ Ähnliche Bilder mit Beschreibungen
- 📚 Relevante Text-Dokumente mit Ähnlichkeitswerten

---

## Architektur

### Datenmodell

```
ChromaDB (./multimodal_rag_db/)
├── texts_collection (OpenAI Embeddings)
│   ├── Text-Dokumente (doc_type: "text_document")
│   │   └── Chunks mit Metadaten
│   └── Bildbeschreibungen (doc_type: "image_description")
│       └── GPT-4o-mini generierte Beschreibungen
│
└── images_collection (CLIP Embeddings)
    └── Bilder mit Cross-References zu text_collection
```

### Komponenten

**RAGConfig**
- Zentrale Konfigurationsklasse
- Anpassbare Parameter (chunk_size, models, thresholds)

**RAGComponents**
- Container für alle System-Komponenten
- Text-Embeddings, CLIP-Model, LLMs, Collections

**Hauptfunktionen**
- `init_rag_system_enhanced()`: System-Initialisierung
- `process_directory()`: Bulk-Import von Dateien
- `add_text_document()`: Einzelnes Dokument hinzufügen
- `add_image_with_description()`: Bild mit Auto-Beschreibung
- `search_texts()`: Text-Suche inkl. Bildbeschreibungen
- `search_images()`: CLIP-basierte Bildsuche
- `search_similar_images()`: Bild→Bild Ähnlichkeitssuche
- `search_text_by_image()`: Bild→Text Suche (NEU)
- `multimodal_search()`: Erweiterte multimodale Suche

---

## Unterstützte Dateiformate

### Text-Dokumente
- `.txt` - Plain Text
- `.md` - Markdown
- `.pdf` - PDF-Dokumente
- `.docx` - Word-Dokumente
- `.html` - HTML-Dateien

### Bilder
- `.jpg` / `.jpeg`
- `.png`
- `.gif`
- `.bmp`

---

## Konfigurationsoptionen

```python
from multimodal_rag_modul import RAGConfig

# Benutzerdefinierte Konfiguration
config = RAGConfig(
    chunk_size=200,                    # Text-Chunk-Größe
    chunk_overlap=20,                  # Overlap zwischen Chunks
    text_threshold=1.2,                # Text-Ähnlichkeits-Schwellwert
    image_threshold=0.8,               # Bild-Ähnlichkeits-Schwellwert
    clip_model='clip-ViT-B-32',       # CLIP-Modell
    text_model='text-embedding-3-small',  # OpenAI Embedding-Modell
    llm_model='gpt-4o-mini',          # LLM für Textgenerierung
    vision_model='gpt-4o-mini',       # Vision-LLM für Bildbeschreibungen
    db_path='./custom_rag_db'        # Datenbank-Pfad
)

rag = init_rag_system_enhanced(config)
```

---

## Modalitätsmatrix

| Eingabe (Query) | Ausgabe | Funktion | Status |
|-----------------|---------|----------|--------|
| **Text** | Text + Bilder | `multimodal_search()` | ✅ |
| **Text** | Nur Text | `search_texts()` | ✅ |
| **Text** | Nur Bilder | `search_images()` | ✅ |
| **Bild** | Ähnliche Bilder | `search_similar_images()` | ✅ |
| **Bild** | Text + Bilder | `search_text_by_image()` | ✅ |

---

## Performance-Optimierungen

### Implementiert in v3.0

1. **Batch-Retrieval**: Vermeidung von N+1 Query-Problem
   - Cross-Modal-Retrieval in einem einzigen Batch-Call

2. **Effiziente Filterung**: Trennung von Text-Dokumenten und Bildbeschreibungen
   - Direkte Filterung über Metadaten

3. **Score-Normalisierung**: ChromaDB L2-Distanz → Ähnlichkeitswert
   - Konsistente Ähnlichkeitswerte (0-1 Range)

4. **Optimierte Embeddings**: Wiederverwendung von bereits berechneten Embeddings
   - Keine doppelte Embedding-Berechnung

---

## Anwendungsfälle

### 1. Multimodale Wissensdatenbank
- Verwalte Produktkataloge mit Bildern und Beschreibungen
- Durchsuche technische Dokumentation mit Diagrammen
- Bilde-zu-Text Retrieval für wissenschaftliche Paper

### 2. Content Discovery
- "Finde ähnliche Produkte zu diesem Bild"
- "Welche Textinformationen passen zu diesem Screenshot?"
- "Zeige verwandte Artikel mit Bildern"

### 3. Forschung & Analyse
- Visuelle Ähnlichkeitsanalyse in Bildarchiven
- Semantische Suche über Multimodale Daten
- Cross-Modal Information Retrieval

---

## Fehlerbehebungen (v3.0)

### ChromaDB Where-Klausel Fix
**Problem**: ChromaDB erwartet `$and` Operator bei mehreren Filterbedingungen

**Lösung**:
```python
# Vorher (fehlerhaft)
components.text_collection.get(
    where={"source": path, "doc_type": "image_description"}
)

# Nachher (korrekt)
components.text_collection.get(
    where={
        "$and": [
            {"source": path},
            {"doc_type": "image_description"}
        ]
    }
)
```

---

## API-Referenz

### System-Management

**`init_rag_system_enhanced(config=None)`**
- Initialisiert das RAG-System
- Parameter: Optional RAGConfig Instanz
- Returns: RAGComponents

**`get_system_status(components)`**
- Gibt System-Status zurück
- Returns: Dict mit Statistiken

**`cleanup_database(db_path='./multimodal_rag_db')`**
- Löscht die Datenbank komplett

### Dokument-Verarbeitung

**`add_text_document(components, file_path)`**
- Fügt ein Text-Dokument hinzu
- Returns: bool (Erfolg)

**`add_image_with_description(components, image_path, auto_describe=True)`**
- Fügt Bild mit Beschreibung hinzu
- Returns: (success: bool, text_doc_id: str)

**`process_directory(components, directory, include_images=True, auto_describe_images=True)`**
- Verarbeitet alle Dateien rekursiv
- Returns: Dict mit Statistiken

---

## Lizenz

MIT License - Copyright (c) 2025 Ralf

---

## Version History

### v3.0 (Oktober 2025)
- ✨ NEU: `search_text_by_image()` mit Text-Dokumenten-Suche
- 🐛 FIX: ChromaDB where-Klausel für mehrere Bedingungen
- ⚡ Performance: N+1 Query Problem behoben
- 📊 Erweiterte LLM-Prompts für bessere Zusammenfassungen

### v2.0
- Bild→Bild Suche via CLIP
- Automatische Bildbeschreibungen
- Cross-Modal Retrieval

### v1.0
- Basis RAG-System
- Text-Suche
- ChromaDB Integration

---

## Support & Kontakt

- **Repository**: [GenAI/01 ipynb/multimodal_rag_modul.py](.)
- **Autor**: Enhanced by Claude
- **Datum**: Oktober 2025
