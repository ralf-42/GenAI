---
layout: default
title: Troubleshooting
parent: Ressourcen
nav_order: 4
description: Lösungen für häufige Probleme
has_toc: true
---

# Troubleshooting
{: .no_toc }

> [!NOTE] Fehleranalyse<br>
> Die Übersicht sammelt typische Fehlerbilder aus LangChain, Structured Output und ChromaDB mit konkreten Diagnosehinweisen.

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## LangChain Expression Language & Chains


| **Problem**                    | **Ursache**                                                                                                                                                                                                                        | **Symptom**                                                                                          | **Lösung/Intervention**                                                                                                                                                                                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Falsches Input-Schema**      | Der Output eines `Runnable` **`<Pipe>`** passt nicht zum erwarteten Input des nächsten `Runnable`. Dies passiert oft, wenn ein LLM einen String liefert, aber das nächste Modul einen Dictionary-Key erwartet (z.B. `"messages"`). | `InputError: Key 'messages' not found` oder der Fehler `Expecting a single string input...`          | **Mappierung mit LCEL:** **`RunnablePassthrough`** oder **`RunnableParallel`** (`{...}`) explizit einsetzen, um Input-Keys zu mappen und die Datenstruktur zu transformieren.                                                          |
| **Pipe-Operator (\|) Fehler**  | Es wird versucht, eine reine Python-Funktion, die **nicht das `Runnable` Interface implementiert**, mit dem Pipe-Operator zu verbinden.                                                                                            | `TypeError: unsupported operand type(s) for <Pipe>: 'X' and 'Y'`                                     | **Kapselung:** Reine Python-Funktionen, die Teil der Chain sein sollen, explizit mit **`RunnableLambda(...)`** kapseln.                                                           |
| **Output-Formatierung fehlt**  | Die Chain endet mit dem LLM, aber der erwartete Output ist ein einfacher String oder ein Pydantic-Objekt, nicht das rohe `AIMessage`-Objekt.                                                                                       | Der Output ist ein komplexes `AIMessage`-Objekt anstatt des gewünschten formatierten Textes/Objekts. | **Parser ergänzen:** Am Ende der Chain einen Parser ergänzen: **`StrOutputParser()`** für einfachen Text oder den passenden Pydantic-Parser (`with_structured_output` oder `PydanticOutputParser`) für strukturierte Daten.          |
| **Input-Handling bei Prompts** | Ein Prompt-Template erwartet mehrere Variablen (z.B. `{context}` und `{question}`), erhält aber nur einen einzigen Wert (String) vom vorherigen Schritt.                                                                           | Die Prompt-Variablen werden nicht korrekt ersetzt (z.B. `{context}` bleibt im Prompt stehen).        | **Dictionary-Input:** **`RunnableParallel`** (`{...}`) oder **`RunnablePassthrough.assign(...)`** einsetzen, um die Variablen vor dem Prompt in ein Dictionary mit allen erforderlichen Schlüsseln zu verpacken.                     |
| **Asynchronität/Batching**     | Es wird versucht, `chain.batch()` oder `chain.stream()` zu verwenden, aber einer der Nodes ist nicht dafür ausgelegt.                                                                                                              | `NotImplementedError` oder die erwartete parallele Verarbeitung findet nicht statt.                  | **Interface-Check:** Prüfen, ob alle Komponenten in der Kette die asynchronen Methoden (z.B. `ainvoke`, `abatch`) unterstützen. **LangSmith** zur Performance-Analyse und Validierung der Batch-Calls nutzen.                        |
| **Chain-Debugging**            | Es ist unklar, an welcher Stelle in der Chain der Fehler auftritt oder welche Zwischenergebnisse falsch sind.                                                                                                                      | Die Fehlermeldung ist unpräzise und verweist auf die Kompilierung.                                   | **Trace-Analyse:** Die Chain über `invoke()` ausführen und den **LangSmith Trace** inspizieren. LangSmith zeigt den Input und Output **jedes einzelnen `Runnable`** in der Kette.                                                    |


## Structured Output & Pydantic


| **Problem**                         | **Ursache**                                                                                                                                                | **Symptom**                                                                                       | **Lösung/Intervention**                                                                                                                                                                                                                                |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Schema-Validierung schlägt fehl** | Das LLM ignoriert das Anweisungs-Prompt und liefert ein Format, das nicht zum `PydanticBaseModel` passt, oder das Schema enthält ungültige Typen.          | `ValidationError` wird ausgelöst, da die JSON-Struktur nicht mit dem Python-Objekt übereinstimmt. | **Prompt-Verstärkung:** Den **System-Prompt** so schärfen, dass die Wichtigkeit der JSON-Ausgabe deutlich wird ("Das bereitgestellte Schema muss strikt eingehalten werden."). `Field(description="...")` im Pydantic-Modell ergänzen. |
| **`with_structured_output` Fehler** | Die verwendete LLM-Instanz unterstützt natives Tool Calling oder JSON-Schema-Ausgaben nicht, oder das falsche Ausgabeformat wird angefordert. | `ValueError: The model X does not support JSON output...`                                         | **Modell-Check:** Kursmodell aus `model_config` verwenden, z. B. `openai:gpt-5.4-mini` oder `openai:gpt-5.4-nano`, und bei anderen Providern die aktuelle Tool-/Structured-Output-Unterstützung prüfen. |
| **Falsche Typ-Generierung**         | Das LLM generiert inkonsistente Typen (z.B. eine Zahl als String), obwohl der Pydantic-Typ `int` ist.                                                      | Validierung schlägt fehl oder die Logik bricht ab.                                                | **Typ-Definition:** **Python Type Hints** in Pydantic präzise verwenden (`int`, `str`, `List[str]`). Bei komplexen Listen oder verschachtelten Objekten die **Beschreibung** (`description=...`) im `Field` des Pydantic-Modells klar formulieren. |



## ChromaDB

| Problem                    | Ursache                     | Lösung                                              |
| -------------------------- | --------------------------- | --------------------------------------------------- |
| `sqlite3.OperationalError` | Falsche SQLite-Version      | `!pip install pysqlite3-binary` + sys.modules Patch |
| Alter Chroma-Import        | `langchain_community.vectorstores.Chroma` wird noch verwendet | `langchain-chroma` installieren und `from langchain_chroma import Chroma` verwenden |
| Collection existiert schon | Doppelter Name              | `get_or_create_collection()` verwenden              |
| Keine Ergebnisse           | Falsche Embedding-Dimension | Embedding-Modell prüfen                             |
| Langsame Queries           | Zu viele Dokumente          | Batch-Size anpassen                                 |


## Abgrenzung zu verwandten Dokumenten

| Dokument | Frage |
|---|---|
| [Zuerst lesen](../zuerst-lesen.html) | Welche Dokumente sind vor dem ersten Kursprojekt am wichtigsten? |
| [Lesepfade](../lesepfade.html) | Welche Reihenfolge passt zu Rolle, Ziel und Vorkenntnissen? |

---

**Version:** 1.1<br>
**Stand:** Mai 2026<br>
**Kurs:** Generative KI. Verstehen. Anwenden. Gestalten.
