
  ## Ziel
  Erstelle einen Multi-Agent-Workflow mit **SupervisorRouter**, **Recherche**, **Analyse** und **Report**.
  Der Supervisor entscheidet nur das Routing (`start_recherche`, `start_analyse`, `start_report`), der Report wird immer als letzter Schritt erzeugt.

  ## Anforderungen
  - Nutze das gegebene Schema:
    - `start_recherche: bool`
    - `start_analyse: bool`
    - `start_report: bool` (immer `true`)
  - Implementiere die erlaubten Pfade:
    - `Report`
    - `Recherche -> Report`
    - `Analyse -> Report`
    - `Recherche -> Analyse -> Report`
  - Übergib Ergebnisse über `state`:
    - `state.recherche_result`
    - `state.analyse_result`
  - Erzeuge am Ende einen strukturierten Markdown-Report.

  ## Abgabe
  - Funktionsfähiger `run_workflow(...)`-Ablauf
  - Nachweis, dass mindestens 2 unterschiedliche Routing-Pfade korrekt funktionieren
  - Beispielausgabe eines finalen Reports in Markdown

  ## Testfälle
  1. **Nur Report erforderlich** -> `false, false, true`
  2. **Recherche + Report** -> `true, false, true`
  3. **Analyse + Report** -> `false, true, true`
  4. **Recherche + Analyse + Report** -> `true, true, true`