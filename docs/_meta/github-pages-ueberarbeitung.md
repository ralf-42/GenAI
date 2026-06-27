---
layout: default
title: GitHub-Pages-Überarbeitung GenAI
nav_exclude: true
description: Überarbeitungsplan für Struktur, Navigation und Linkpflege der GitHub Pages im Projekt GenAI
---

# GitHub-Pages-Überarbeitung im Projekt GenAI

Dieser Plan dokumentiert die geplante Überarbeitung der GitHub-Pages-Dokumentation im Projekt `GenAI`. Grundlage ist die bewährte Überarbeitungslogik aus `Agenten/docs/_meta/github-pages-ueberarbeitung.md`, adaptiert auf die GenAI-spezifische Themenstruktur.

---

## Vorabentscheidungen

Vor Migrationsbeginn sind folgende Punkte zu klären. Bereits getroffene Entscheidungen sind markiert.

- [x] **`rag-workshop.md` Platzierung** → `11-projekte/`
  Der Workshop ist ein benotetes Kursabschlussprojekt (M04–M13, 100-Punkte-Rubrik). Kein Orientierungs- und kein Deployment-Inhalt.

- [x] **`concepts/agentisch/` (6 Dateien)** → eigener Bereich `08-agenten/`
  Inhalte bleiben als schlanker Ausblick erhalten. Jede Seite verweist explizit auf den Agenten-Kurs für Implementierungsdetails.

- [x] **Modellauswahl-Konsolidierung** → `04-modelle-provider/modellauswahl.md`
  `concepts/entscheidungen-qualitaet/m19-modellauswahl.md` wird fachliche Basis. `frameworks/modell-auswahl/modell-auswahl-guide.md` wird integriert und danach entfernt. `provider-modell-mapping.md` bleibt als eigenständige Nachbarseite erhalten.

- [x] **`ki-reifegradmodell.md`** → `02-orientierung/`
  Thematisch passend als Orientierungshilfe vor Projekteinstieg, nicht als Ressource.

- [x] **`lesepfade.md`** — Dateiname und Navigationstitel bleiben unverändert.

---

## Ausgangslage

Die aktuelle Struktur folgt einem technisch geprägten Muster:

```
concepts/          (Umbrella mit 6 Unterbereichen)
frameworks/        (mit geschachtelten Hubs)
deployment/
regulatorisches/
ressourcen/
projekte/
legal/
```

Probleme:
- `concepts/` ist ein zu breiter Umbrella: Orientierung, Grundlagen, Anwendungsmethoden, Qualität, Agentik und Multimodalität landen im selben Bereich.
- `frameworks/best-practices.md` und `frameworks/einsteiger-guides.md` sind reine Hub-Listen ohne Leserführung.
- `frameworks/modell-auswahl/` ist tief verschachtelt statt als eigenständiger Bereich sichtbar.
- `zuerst-lesen.md` und `lesepfade.md` liegen im Root ohne klare Navigationslogik.
- Test- und Template-Dateien (`test-anchors.md`, `test-callout.md`, `markdown-template-guide.md`) sind sichtbar im Root.
- `rechtliches.md` (Datei) und `legal/` (Ordner) koexistieren inkonsistent.
- `projekte/` ist strukturell isoliert ohne didaktischen Anschluss.

---

## Zielstruktur

```
GenAI/docs/
├── index.md                             nav_order: 1   (Start)
├── zuerst-lesen.md                      nav_order: 2
├── lesepfade.md                         nav_order: 3   (Dateiname bleibt)
│
├── 02-orientierung/                     nav_order: 4
├── 03-grundlagen/                       nav_order: 5
├── 04-modelle-provider/                 nav_order: 6
├── 05-prompting-rag/                    nav_order: 7
├── 06-frameworks/                       nav_order: 8
├── 07-qualitaet-sicherheit/             nav_order: 9
├── 08-multimodal/                       nav_order: 10
├── 08-agenten/                          nav_order: 10
├── 10-deployment/                       nav_order: 12
├── 11-projekte/                         nav_order: 13
├── 12-regulatorik-verantwortung/        nav_order: 14
├── 13-ressourcen/                       nav_order: 15
├── 14-rechtliches/                      nav_order: 16
└── _meta/                               nav_exclude: true
```

Hinweis: Kein `01-`-Verzeichnis. Die Nummern beginnen bei `02-orientierung/`, weil `01-start-navigation/` bewusst nicht vorgesehen ist. `zuerst-lesen.md` und `lesepfade.md` erscheinen direkt auf der obersten Navigationsebene (Root).

---

## Datei-Mapping

### Root (bleiben im Root, Frontmatter wird aktualisiert)

| Datei | Änderung |
|---|---|
| `index.md` | `nav_order: 1`, Frontmatter prüfen |
| `zuerst-lesen.md` | `nav_order: 2`, `parent` entfernen, Links aktualisieren |
| `lesepfade.md` | `nav_order: 3`, `parent` entfernen, Links aktualisieren |

### 02-orientierung/

| Alt | Neu |
|---|---|
| `concepts/orientierung/lohnt-es-sich.md` | `02-orientierung/lohnt-es-sich.md` |
| `concepts/orientierung/aufgabenklassen-und-loesungswege.md` | `02-orientierung/aufgabenklassen-und-loesungswege.md` |
| `ressourcen/ki-reifegradmodell.md` | `02-orientierung/ki-reifegradmodell.md` |

### 03-grundlagen/

| Alt | Neu |
|---|---|
| `concepts/grundlagen/m05a-transformer.md` | `03-grundlagen/large-language-models.md` |
| `concepts/grundlagen/m08a-tokenizing-chunking.md` | `03-grundlagen/tokenizing-chunking.md` |
| `concepts/grundlagen/m08b-embeddings.md` | `03-grundlagen/embeddings.md` |

### 04-modelle-provider/

| Alt | Neu |
|---|---|
| `concepts/entscheidungen-qualitaet/m19-modellauswahl.md` + integrierte Inhalte aus `frameworks/modell-auswahl/modell-auswahl-guide.md` | `04-modelle-provider/modellauswahl.md` |
| `frameworks/modell-auswahl/provider-modell-mapping.md` | `04-modelle-provider/provider-modell-mapping.md` |

### 05-prompting-rag/

| Alt | Neu |
|---|---|
| `concepts/anwendungsmethoden/prompt-engineering.md` | `05-prompting-rag/prompt-engineering.md` |
| `frameworks/einsteiger/prompt-template.md` | `05-prompting-rag/prompt-template.md` |
| `concepts/anwendungsmethoden/rag-konzepte.md` | `05-prompting-rag/rag-konzepte.md` |
| `concepts/anwendungsmethoden/m21-context-engineering.md` | `05-prompting-rag/context-engineering.md` |

### 06-frameworks/

`06-frameworks/` erhält eine Sidebar-Unterstruktur mit vier Gruppen (analog zu `05-frameworks/` in Agenten/docs). Die Gruppenseiten liegen flach im Verzeichnis, ohne Unterordner. Inhaltsdateien nutzen `parent` = Gruppenname und `grand_parent: "Frameworks"`.

**Neue Gruppenseiten (neu erstellen):**

| Datei | Gruppe | Inhalt |
|---|---|---|
| `06-frameworks/langchain.md` | LangChain | Orientierungsseite für LangChain-Dokumente |
| `06-frameworks/langgraph.md` | LangGraph | Orientierungsseite für LangGraph-Dokumente |
| `06-frameworks/langsmith.md` | LangSmith | Orientierungsseite für LangSmith-Dokumente |
| `06-frameworks/weitere-tools.md` | Weitere Tools | Orientierungsseite für ChromaDB, GenAI-Lib |

**Inhaltsdateien:**

| Alt | Neu | Gruppe |
|---|---|---|
| `frameworks/einsteiger/einsteiger-langchain.md` | `06-frameworks/einsteiger-langchain.md` | LangChain |
| `frameworks/best-practices/langchain-best-practices.md` | `06-frameworks/langchain-best-practices.md` | LangChain |
| `frameworks/einsteiger/einsteiger-langgraph.md` | `06-frameworks/einsteiger-langgraph.md` | LangGraph |
| `frameworks/best-practices/langgraph-best-practices.md` | `06-frameworks/langgraph-best-practices.md` | LangGraph |
| `frameworks/einsteiger/einsteiger-langsmith.md` | `06-frameworks/einsteiger-langsmith.md` | LangSmith |
| `frameworks/best-practices/langsmith-best-practices.md` | `06-frameworks/langsmith-best-practices.md` | LangSmith |
| `frameworks/einsteiger/einsteiger-chromadb.md` | `06-frameworks/einsteiger-chromadb.md` | Weitere Tools |
| `frameworks/einsteiger/einsteiger-genai-lib.md` | `06-frameworks/einsteiger-genai-lib.md` | Weitere Tools |


### 07-qualitaet-sicherheit/

| Alt | Neu |
|---|---|
| `concepts/entscheidungen-qualitaet/evaluation-observability.md` | `07-qualitaet-sicherheit/evaluation-observability.md` |

### 08-multimodal/

| Alt | Neu |
|---|---|
| `concepts/multimodal/m09-multimodal-bild.md` | `08-multimodal/multimodal-bild.md` |
| `concepts/multimodal/m16-multimodal-audio.md` | `08-multimodal/multimodal-audio.md` |

### 08-agenten/ (Ausblick, verweist auf Agenten-Kurs)

| Alt | Neu |
|---|---|
| `concepts/agentisch.md` | `08-agenten/index.md` (transformiert zur Orientierungsseite) |
| `concepts/agentisch/agent-security.md` | `08-agenten/agent-security.md` |
| `concepts/agentisch/human-in-the-loop.md` | `08-agenten/human-in-the-loop.md` |
| `concepts/agentisch/memory-systeme.md` | `08-agenten/memory-systeme.md` |
| `concepts/agentisch/state-management.md` | `08-agenten/state-management.md` |
| `concepts/agentisch/tool-use-function-calling.md` | `08-agenten/tool-use-function-calling.md` |

### 10-deployment/

| Alt | Neu |
|---|---|
| `deployment/aus-entwicklung-ins-deployment.md` | `10-deployment/vom-notebook-zum-produkt.md` |
| `deployment/migration-openai-mistral.md` | `10-deployment/migration-openai-mistral.md` |
| `deployment/minimum-viable-genai-stack.md` | `10-deployment/minimum-viable-genai-stack.md` |
| `deployment/vom-modell-zum-produkt-langchain-oekosystem.md` | `10-deployment/vom-modell-zum-produkt.md` |

### 11-projekte/

| Alt | Neu |
|---|---|
| `projekte/rag-workshop.md` | `11-projekte/rag-workshop.md` |
| `projekte/m23-ki-challenge.md` | `11-projekte/ki-challenge.md` |

### 12-regulatorik-verantwortung/

| Alt | Neu |
|---|---|
| `regulatorisches/datenschutz-dsgvo.md` | `12-regulatorik-verantwortung/datenschutz-dsgvo.md` |
| `regulatorisches/digitale-souveraenitaet.md` | `12-regulatorik-verantwortung/digitale-souveraenitaet.md` |
| `regulatorisches/ethik-und-genai.md` | `12-regulatorik-verantwortung/ethik-und-genai.md` |
| `regulatorisches/eu-ai-act.md` | `12-regulatorik-verantwortung/eu-ai-act.md` |

### 13-ressourcen/

| Alt | Neu |
|---|---|
| `ressourcen/colab-zu-lokal.md` | `13-ressourcen/colab-zu-lokal.md` |
| `ressourcen/interaktive-visualisierungen.md` | `13-ressourcen/interaktive-visualisierungen.md` |
| `ressourcen/links.md` | `13-ressourcen/links.md` |
| `ressourcen/standards.md` | `13-ressourcen/standards.md` |
| `ressourcen/troubleshooting.md` | `13-ressourcen/troubleshooting.md` |

### 14-rechtliches/

| Alt | Neu |
|---|---|
| `legal/datenschutz.md` | `14-rechtliches/datenschutz.md` |
| `legal/haftungsausschluss.md` | `14-rechtliches/haftungsausschluss.md` |
| `legal/impressum.md` | `14-rechtliches/impressum.md` |

### _meta/

| Alt | Neu |
|---|---|
| `test-anchors.md` | `_meta/test-anchors.md` |
| `test-callout.md` | `_meta/test-callout.md` |
| `markdown-template-guide.md` | `_meta/markdown-template-guide.md` |

### Löschen (reine Hubs ohne Eigeninhalt)

`concepts.md` · `concepts/grundlagen.md` · `concepts/multimodal.md` · `concepts/orientierung.md` · `concepts/anwendungsmethoden.md` · `concepts/entscheidungen-qualitaet.md` · `frameworks.md` · `frameworks/best-practices.md` · `frameworks/einsteiger-guides.md` · `frameworks/modell-auswahl.md` · `deployment.md` · `regulatorisches.md` · `ressourcen.md` · `projekte.md` · `rechtliches.md`

### Alte Verzeichnisse entfernen (nach Verschiebung aller Inhalte)

`concepts/` · `frameworks/best-practices/` · `frameworks/einsteiger/` · `frameworks/modell-auswahl/` · `deployment/` · `regulatorisches/` · `ressourcen/` · `projekte/` · `legal/`

---

## URL- und Permalink-Strategie

Beim Verschieben von Dateien entstehen zwei Klassen von URL-Problemen, die vor Phase 4 entschieden sein müssen.

### 1. Explizite Permalinks in Frontmatter

Einige Dateien haben einen eigenen `permalink:`-Eintrag, der beim Verschieben nicht automatisch mitgezogen wird. Bekanntes Beispiel:

```
regulatorisches/datenschutz-dsgvo.md  →  permalink: /regulatorisches/datenschutz-dsgvo.html
```

Entscheidung je Datei (vor Phase 5 zu treffen):

| Option | Wann sinnvoll |
|---|---|
| Alten `permalink:` entfernen | URL darf brechen; keine externen Verlinkungen bekannt |
| Alten `permalink:` bewusst beibehalten | Stabile URL gewünscht; externe Links existieren |

Prüfliste: Alle verschobenen Dateien auf vorhandene `permalink:`-Einträge scannen und Entscheidung dokumentieren.

### 2. URLs gelöschter Hub-Seiten

Die folgenden Hub-Seiten haben eigene GitHub-Pages-URLs, die durch Löschen brechen:

`concepts.md` · `frameworks.md` · `deployment.md` · `regulatorisches.md` · `ressourcen.md` · `projekte.md` · `rechtliches.md`

Entscheidung je Seite:

| Option | Umsetzung |
|---|---|
| URL darf brechen | Datei löschen |
| URL soll erhalten bleiben | Datei behalten, `nav_exclude: true` setzen, Inhalt durch Weiterleitungshinweis auf neue Seite ersetzen |

---

## TODO-Liste

### Phase 0 — Vorabentscheidungen

- [x] `rag-workshop.md` → `11-projekte/`
- [x] `concepts/agentisch/` → `08-agenten/` als Ausblick-Bereich
- [x] `ki-reifegradmodell.md` → `02-orientierung/`
- [x] `lesepfade.md` — Dateiname und Navigationstitel bleiben unverändert
- [x] Modellauswahl-Konsolidierung entschieden: `m19-modellauswahl.md` ist fachliche Basis; `modell-auswahl-guide.md` wird integriert; Ergebnis: `04-modelle-provider/modellauswahl.md`

### Phase 1 — Vorbereitung

- [x] `_docs/Dokument_Standard.md` lesen (Pflicht laut CLAUDE.md)
- [x] Snapshot des aktuellen Zustands anlegen (Kopie oder `git status`)

### Phase 2 — Neue Verzeichnisse anlegen

- [x] `02-orientierung/` anlegen
- [x] `03-grundlagen/` anlegen
- [x] `04-modelle-provider/` anlegen
- [x] `05-prompting-rag/` anlegen
- [x] `06-frameworks/` anlegen
- [x] `07-qualitaet-sicherheit/` anlegen
- [x] `08-multimodal/` anlegen
- [x] `08-agenten/` anlegen
- [x] `10-deployment/` anlegen
- [x] `11-projekte/` anlegen
- [x] `12-regulatorik-verantwortung/` anlegen
- [x] `13-ressourcen/` anlegen
- [x] `14-rechtliches/` anlegen

### Phase 3 — Dateien verschieben

- [x] `02-orientierung/`: `lohnt-es-sich.md`, `aufgabenklassen-und-loesungswege.md`, `ki-reifegradmodell.md`
- [x] `03-grundlagen/`: `large-language-models.md`, `tokenizing-chunking.md`, `embeddings.md` (Dateinamen-Präfixe entfernt)
- [x] `04-modelle-provider/`: `modellauswahl.md` (Basis: m19), `provider-modell-mapping.md`, `fine-tuning.md`
- [x] Praxisanteile aus `modell-auswahl-guide.md` in `modellauswahl.md` integriert (Modelle im Kurs, Designregeln, Entscheidungsbaum, Modul-Mapping, Code-Muster, Kosten-Orientierung); Guide-Datei entfernt
- [x] `05-prompting-rag/`: `prompt-engineering.md`, `prompt-template.md`, `rag-konzepte.md`, `context-engineering.md`
- [x] `06-frameworks/`: alle 6 Einsteiger-Guides, alle 3 Best-Practices-Dateien; 4 Gruppenseiten erstellt
- [x] `07-qualitaet-sicherheit/`: `evaluation-observability.md`
- [x] `08-multimodal/`: `multimodal-bild.md`, `multimodal-audio.md` (Dateinamen-Präfixe entfernt)
- [x] `08-agenten/`: 5 Inhaltsdateien aus `concepts/agentisch/`
- [x] `10-deployment/`: alle 4 Deployment-Dateien
- [x] `11-projekte/`: `rag-workshop.md`, `ki-challenge.md` (Dateinamen-Präfix entfernt)
- [x] `12-regulatorik-verantwortung/`: alle 4 Regulatorik-Dateien
- [x] `13-ressourcen/`: 5 Ressourcen-Dateien
- [x] `14-rechtliches/`: `datenschutz.md`, `haftungsausschluss.md`, `impressum.md` aus `legal/`
- [x] `_meta/`: `test-anchors.md`, `test-callout.md`, `markdown-template-guide.md`

### Phase 4 — URL-Strategie entscheiden, Hub-Seiten transformieren und löschen

- [x] Alle verschobenen Dateien auf explizite `permalink:`-Einträge scannen — 1 Treffer (`datenschutz-dsgvo.md`): alter Permalink entfernt
- [x] Hub-Seiten-Entscheidung: alle löschen (Kursdokumentation ohne externe Verlinkungen)
- [x] Für jeden neuen Bereich eine `index.md` als Frage-Einstieg anlegen
- [x] `08-agenten/index.md`: transformiert — Ausblick-Rahmen + Agenten-Kurs-Verweis
- [x] Hub-Seiten gelöscht; `modell-auswahl-guide.md` Inhalte in `modellauswahl.md` integriert, Guide-Datei entfernt
- [x] Alte Verzeichnisse entfernt (`concepts/`, `frameworks/`, `deployment/`, etc.)
- [x] `_config.yml` Footer-Links auf `14-rechtliches/` aktualisiert

### Phase 5 — Frontmatter aktualisieren

- [x] `index.md` (Root): `nav_order: 1`, Frontmatter geprüft
- [x] `zuerst-lesen.md`: `nav_order: 2`, `parent` entfernt
- [x] `lesepfade.md`: `nav_order: 3`, `parent` entfernt
- [x] `02-orientierung/index.md`: `nav_order: 4`, `has_children: true`, `title: "Orientierung"`
- [x] Alle `02-orientierung/`-Dateien: `parent: "Orientierung"`, `nav_order` setzen
- [x] `03-grundlagen/index.md`: `nav_order: 5`, `has_children: true`, `title: "Grundlagen"`
- [x] Alle `03-grundlagen/`-Dateien: `parent: "Grundlagen"`, `nav_order` setzen
- [x] `04-modelle-provider/index.md`: `nav_order: 6`, `has_children: true`, `title: "Modelle & Provider"`
- [x] Alle `04-modelle-provider/`-Dateien: `parent: "Modelle & Provider"`, `nav_order` setzen
- [x] `05-prompting-rag/index.md`: `nav_order: 7`, `has_children: true`, `title: "Prompting & RAG"`
- [x] Alle `05-prompting-rag/`-Dateien: `parent: "Prompting & RAG"`, `nav_order` setzen
- [x] `06-frameworks/index.md`: `nav_order: 8`, `has_children: true`, `title: "Frameworks"`
- [x] Gruppenseiten: `parent: "Frameworks"`, `has_children: true`, `nav_order` setzen
  - `langchain.md` → `title: "LangChain"`
  - `langgraph.md` → `title: "LangGraph"`
  - `langsmith.md` → `title: "LangSmith"`
  - `weitere-tools.md` → `title: "Weitere Tools"`
- [x] Inhaltsdateien LangChain: `parent: "LangChain"`, `grand_parent: "Frameworks"`, `nav_order` setzen
- [x] Inhaltsdateien LangGraph: `parent: "LangGraph"`, `grand_parent: "Frameworks"`, `nav_order` setzen
- [x] Inhaltsdateien LangSmith: `parent: "LangSmith"`, `grand_parent: "Frameworks"`, `nav_order` setzen
- [x] Inhaltsdateien Weitere Tools: `parent: "Weitere Tools"`, `grand_parent: "Frameworks"`, `nav_order` setzen
- [x] `07-qualitaet-sicherheit/index.md`: `nav_order: 9`, `has_children: true`, `title: "Qualität & Sicherheit"`
- [x] Alle `07-qualitaet-sicherheit/`-Dateien: `parent: "Qualität & Sicherheit"`, `nav_order` setzen
- [x] `08-multimodal/index.md`: `nav_order: 10`, `has_children: true`, `title: "Multimodal"`
- [x] Alle `08-multimodal/`-Dateien: `parent: "Multimodal"`, `nav_order` setzen
- [x] `08-agenten/index.md`: `nav_order: 10`, `has_children: true`, `title: "Agenten"`
- [x] Detailseiten in `08-agenten/`: `parent: "Agenten"`, `nav_order` setzen
- [x] `10-deployment/index.md`: `nav_order: 12`, `has_children: true`, `title: "Deployment"`
- [x] Alle `10-deployment/`-Dateien: `parent: "Deployment"`, `nav_order` setzen
- [x] `11-projekte/index.md`: `nav_order: 13`, `has_children: true`, `title: "Projekte"`
- [x] Alle `11-projekte/`-Dateien: `parent: "Projekte"`, `nav_order` setzen
- [x] `12-regulatorik-verantwortung/index.md`: `nav_order: 14`, `has_children: true`, `title: "Regulatorik & Verantwortung"`
- [x] Alle `12-regulatorik-verantwortung/`-Dateien: `parent: "Regulatorik & Verantwortung"`, `nav_order` setzen
- [x] `13-ressourcen/index.md`: `nav_order: 15`, `has_children: true`, `title: "Ressourcen"`
- [x] Alle `13-ressourcen/`-Dateien: `parent: "Ressourcen"`, `nav_order` setzen
- [x] `14-rechtliches/index.md`: `nav_order: 16`, `has_children: true`, `title: "Rechtliches"`
- [x] Alle `14-rechtliches/`-Dateien: `parent: "Rechtliches"`, `nav_order` setzen
- [x] `_meta/`-Dateien: `nav_exclude: true`

### Phase 6 — Interne Links aktualisieren

- [x] `zuerst-lesen.md`: alle Zielpfade auf neue Struktur umstellen
- [x] `lesepfade.md`: alle Zielpfade auf neue Struktur umstellen
- [x] `index.md` (Root): Links prüfen und aktualisieren
- [x] `08-agenten/`: Links auf Agenten-Kurs ergänzen (je Datei einen expliziten Verweis)
- [x] `11-projekte/rag-workshop.md`: interne Links auf neue Pfade umstellen
- [x] `11-projekte/ki-challenge.md`: interne Links aktualisieren
- [x] `06-frameworks/`-Dateien: Querverweise untereinander prüfen
- [x] Alle Dateien: 96 defekte interne Links korrigiert (systematischer Python-Durchlauf + 1 Einzelfix); Scan ergibt 0 defekte Links

### Phase 7 — Feinschliff

- [x] Footer `**Stand:**` in den öffentlichen Kursseiten und relevanten `_meta/`-Dateien auf Mai 2026 vereinheitlicht
- [x] ASCII-Umlautschreibungen in Indexseiten korrigiert
- [x] Dateinamen-Präfixe (`m05a-`, `m08a-`, `m08b-`, `m09-`, `m16-`, `m21-`, `m23-`) entfernt
- [x] `08-agenten/index.md`: Ausblick-Rahmen formuliert, Agenten-Kurs-Verweis gesetzt
- [x] Alle `index.md`-Seiten: Frage-Einstieg umgesetzt

### Phase 8 — Validierung

- [x] Alle `parent:`-Werte haben ein passendes `title:`-Ziel (Scan: 0 Probleme)
- [x] Keine internen Links verweisen auf alte Pfade (Scan: 0 defekte Links)
- [x] `grand_parent == parent`-Fehler in `02-orientierung/` behoben (2 Dateien)
- [x] `_meta/`-Dateien erscheinen nicht in der Sidebar
- [x] Footer-Links in `_config.yml` auf `14-rechtliches/` aktualisiert
- [x] Frontmatter-Gesamtscan: 0 Probleme (parent-Titel, grand_parent-Titel, nav_order)

---

**Version:** 1.1<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
