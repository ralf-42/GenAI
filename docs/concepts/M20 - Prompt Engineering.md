---
layout: default
title: Prompt Engineering
parent: Konzepte
nav_order: 17
description: "Effektive Prompts gestalten: Patterns, Techniken und Best Practices"
has_toc: true
---

# Prompt Engineering
{: .no_toc }

> **Effektive Prompts gestalten: Patterns, Techniken und Best Practices**

---

# Inhaltsverzeichnis
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Stand: 07.2025

# 1 Intro


Bei Prompt Engineering geht es darum, effektive Eingaben zu erstellen, um Sprachmodelle wie GPT-4 zur Generierung nützlicher und präziser Ergebnisse zu führen. Eine gute Beherrschung des Prompt Engineerings ist entscheidend, um präzise Informationen zu erhalten, überzeugende Kommunikation zu erstellen und fundierte Entscheidungen zu treffen.

**Spezifische und vollständige Anweisungen geben**

Durch präzise Anweisungen versteht das KI-Modell genau, was benötigt wird. Dies reduziert Unklarheiten und erhöht die Relevanz der Antwort.

**Ineffektiver Prompt:**
```
Erkläre die Arten von Versicherungspolicen
```

**Effektiver Prompt:**
```
Als Versicherungsfachperson bitte die wichtigsten Unterschiede zwischen Kapitallebensversicherung und Risikolebensversicherung zusammenfassen, mit Fokus auf Leistungen, Laufzeit und typische Kundenprofile.
```

**Ausnahmesituationen berücksichtigen**

Durch Vorhersehen potenzieller Ausnahmen und Anweisungen zum Umgang mit diesen können unvollständige oder irreführende Antworten vermieden werden.

```
Liste die fünf besten Versicherungsanbieter in Deutschland nach Kundenzufriedenheit auf. Falls aktuelle Daten nicht verfügbar sind, bitte die neuesten Statistiken aus seriösen Quellen nennen und das Jahr der Daten angeben.
```

**Ausgabeformat erklären**

Die Definition des gewünschten Ausgabeformats erleichtert die Verwendung der Informationen und kann die Integration mit anderen Dokumenten oder Präsentationen erleichtern.

```
Erstelle eine Vergleichstabelle für Risikolebensversicherungen und Kapitallebensversicherungen mit den Spalten "Merkmale", "Vorteile" und "Ideal für". Präsentiere die Informationen im Markdown-Format.
```


<div style="page-break-after: always;"></div>



# 2 Fünf Kern-Techniken 


## 2.1 Kontextbasiertes Prompting

**Wann anwenden:** Wenn KI-Antworten zu oberflächlich sind oder den Kern der spezifischen Situation verfehlen.

**Grundprinzip:** Bevor die eigentliche Frage oder Aufgabe formuliert wird, werden der KI alle relevanten Hintergrundinformationen gegeben. Dies können spezifische Rahmenbedingungen, wichtige Annahmen, Auszüge aus Dokumenten oder Situationsbeschreibungen sein.

**Vorteil:** Die KI wird mit den notwendigen Informationen versorgt und kann eine Antwort generieren, die präzise auf die individuelle Situation zugeschnitten ist.

### 2.1.1 Beispiel: Versicherungsberatung mit Kontext

**Ohne Kontext:**
```
Welche Lebensversicherung ist die beste?
```

**Mit Kontext:**
```
KONTEXT:
- Kunde: 35-jähriger Familienvater, zwei Kinder (5 und 8 Jahre)
- Beruf: Selbständiger IT-Berater, schwankendes Einkommen
- Finanzielle Situation: 50.000€ Jahreseinkommen (Durchschnitt), 20.000€ Rücklagen
- Ziele: Absicherung der Familie bei Todesfall, zusätzlicher Vermögensaufbau
- Risikobereitschaft: Moderat
- Bestehende Absicherung: Gesetzliche Krankenversicherung, private Berufsunfähigkeitsversicherung

AUFGABE:
Empfehle eine passende Lebensversicherungslösung und begründe deine Wahl unter Berücksichtigung der spezifischen Situation.
```

### 2.1.2 Weitere Anwendungsbereiche:
- **Unternehmensberatung:** Firmenspezifische Daten vor Strategieempfehlungen
- **Technische Dokumentation:** Systemspezifikationen vor Implementierungsanleitungen
- **Kundenservice:** Kundenhistorie vor Problemlösung

---

## 2.2 Rollenbasiertes Prompting

**Wann anwenden:** Wenn eine Antwort aus einer bestimmten Sichtweise, mit einem spezifischen Tonfall oder implizitem Fachwissen benötigt wird.

**Grundprinzip:** Der KI wird explizit eine Rolle zugewiesen, in die sie schlüpfen soll. Dies kann ein Beruf, eine historische Persönlichkeit oder eine fiktive Figur sein.

**Vorteil:** Die Perspektive, der Stil und oft auch der implizite Wissensschatz der KI werden gelenkt.

### 2.2.1 Persona-Muster

```
Du bist ein erfahrener Versicherungsberater mit 20 Jahren Erfahrung, spezialisiert auf Familienpolicen. Du sprichst verständlich und empathisch. Erkläre einem neuen Kunden die Vorteile einer Kapitallebensversicherung.
```

### 2.2.2 Zielgruppen-Persona

```
Du bist ein Finanzberater, der sich auf junge Erwachsene spezialisiert hat. Erkläre einem 25-jährigen Hochschulabsolventen, der gerade ins Berufsleben eingestiegen ist, warum eine Lebensversicherung sinnvoll sein könnte. Verwende eine lockere, verständliche Sprache ohne Fachjargon.
```

### 2.2.3 Rollenspiel-Prompts

```
ROLLENSPIEL-SETUP:
Du bist ein skeptischer Kunde, der zum ersten Mal eine Lebensversicherung abschließen möchte. Du hast Bedenken bezüglich der Kosten und zweifelst am Nutzen. Stelle kritische Fragen zu Versicherungsprodukten und äußere typische Einwände.

Beginne das Gespräch mit einem Versicherungsberater.
```

### 2.2.4 Umgedrehtes Interaktionsmuster

```
Du bist mein persönlicher Finanzberater mit Expertise in Versicherungsprodukten. Führe ein strukturiertes Beratungsgespräch mit mir. Stelle mir gezielte Fragen, um den besten Lebensversicherungsplan für meine Bedürfnisse zu ermitteln. Beginne mit der Analyse meiner aktuellen Situation.
```

---

## 2.3 Few-Shot Prompting

**Wann anwenden:** Wenn eine sehr spezifische Antwortstruktur, ein bestimmtes Format oder Muster in der Ausgabe benötigt wird.

**Grundprinzip:** Statt die KI "kalt" an eine Aufgabe heranzuführen, werden ihr einige wenige, aber aussagekräftige Beispiele direkt im Prompt mitgegeben.

**Vorteil:** Die KI erkennt das gewünschte Muster und kann es auf neue Anfragen anwenden.

### 2.3.1 Beispiel 1: Risikoklassifizierung

```
Klassifiziere die folgenden Antragsteller basierend auf ihrer Krankengeschichte in die Risikokategorien "Niedrig", "Mittel" oder "Hoch":

BEISPIELE:
Antragsteller 1: 45 Jahre, Raucher, leichte Hypertonie, regelmäßiger Sport
Klassifizierung: Mittleres Risiko
Begründung: Rauchen und Bluthochdruck erhöhen das Risiko, Sport wirkt kompensierend

Antragsteller 2: 30 Jahre, Nichtraucher, keine Vorerkrankungen, gesunder Lebensstil
Klassifizierung: Niedriges Risiko
Begründung: Junges Alter, keine Risikofaktoren, gesunder Lebensstil

Antragsteller 3: 55 Jahre, Diabetes Typ 2, Herzinfarkt vor 3 Jahren, Übergewicht
Klassifizierung: Hohes Risiko
Begründung: Multiple schwerwiegende Vorerkrankungen in Kombination

NEUE BEWERTUNG:
Antragsteller 4: 42 Jahre, Nichtraucher, hoher Cholesterinspiegel, familiäre Vorbelastung Herzkrankheiten
Klassifizierung:
```

### 2.3.2 Beispiel 2: Kundentyp-Analyse

```
Analysiere den Kundentyp anhand der Kommunikation und empfehle eine passende Beratungsstrategie:

BEISPIELE:
Kunde A: "Ich möchte schnell eine Versicherung abschließen. Was ist am günstigsten?"
Typ: Preisfokussierter Schnellentscheider
Strategie: Direkte Produktvergleiche, klare Kostenübersicht, schnelle Abwicklung

Kunde B: "Können Sie mir alle Details erklären? Ich möchte alles genau verstehen."
Typ: Analytischer Informationssammler
Strategie: Ausführliche Erklärungen, Zahlen/Daten/Fakten, Bedenkzeit einräumen

NEUE ANALYSE:
Kunde C: "Meine Familie ist mir das Wichtigste. Wie kann ich sie am besten absichern?"
Typ:
Strategie:
```

---

## 2.4 Chain-of-Thought Prompting

**Wann anwenden:** Bei komplexen Aufgaben, die logisches Denken, Schlussfolgerungen oder mehrere aufeinander aufbauende Schritte erfordern.

**Grundprinzip:** Die KI wird explizit aufgefordert, ihre Überlegungen und Lösungswege Schritt für Schritt offenzulegen und jeden einzelnen Schritt logisch zu begründen.

**Vorteil:** Erhöht Transparenz und Qualität bei komplexen, mehrstufigen Aufgaben durch strukturiertes "lautes Denken".

### 2.4.1 Beispiel 1: Komplexe Risikobewertung

```
Führe eine umfassende Risikobewertung für den folgenden Antragsteller durch und erkläre dabei jeden Schritt deiner Überlegungen:

ANTRAGSTELLER:
- 52 Jahre, männlich
- Bluthochdruck (seit 5 Jahren, medikamentös eingestellt)
- Nichtraucher (seit 10 Jahren, vorher 20 Jahre Raucher)
- Regelmäßiger Sport (3x pro Woche Joggen)
- Familiäre Vorgeschichte: Vater Herzinfarkt mit 65, Mutter Diabetes Typ 2
- Beruf: Büroangestellter, niedriger Stress
- BMI: 27 (leichtes Übergewicht)

AUFGABE:
Bewerte das Risiko Schritt für Schritt und begründe deine Einschätzung. Berücksichtige dabei:
1. Positive und negative Risikofaktoren
2. Gewichtung der einzelnen Faktoren
3. Wechselwirkungen zwischen den Faktoren
4. Endgültige Risikoeinstufung mit Begründung
```

### 2.4.2 Beispiel 2: Optimale Versicherungsstrategie

```
Entwickle eine optimale Versicherungsstrategie für den folgenden Fall und dokumentiere dabei jeden Überlegungsschritt:

KUNDE:
- 35 Jahre, verheiratet, zwei Kinder (3 und 6 Jahre)
- Haushaltsnettoeinkommern: 85.000€ jährlich
- Beruf: Angestellter Ingenieur (stabiler Job)
- Partnerin: Teilzeit arbeitend, 20.000€ jährlich
- Immobilie: Eigenheim mit 250.000€ Restschuld
- Vorhandene Absicherung: Gesetzliche Krankenversicherung, BU-Versicherung (beide)
- Sparziel: 500€ monatlich für Altersvorsorge verfügbar

DENK-PROZESS:
Gehe systematisch vor:
1. Analysiere den Absicherungsbedarf
2. Identifiziere Versicherungslücken  
3. Priorisiere die Absicherungsbausteine
4. Berechne angemessene Versicherungssummen
5. Empfehle konkrete Produktkombination
6. Begründe jede Entscheidung
```

---

## 2.5 Meta Prompting

**Wann anwenden:** Wenn man unsicher ist, ob der eigene Prompt bereits gut ist oder das Maximum aus der KI herausholt.

**Grundprinzip:** Die KI wird nicht nur als Antwortgeber, sondern auch als Berater zur Optimierung des Prompts selbst eingesetzt.

**Vorteil:** KI-gestütztes Coaching für das eigene Prompt-Design, um Prompts deutlich klarer, präziser und effektiver zu gestalten.

### 2.5.1 Beispiel 1: Prompt-Analyse und Verbesserung

```
AUFGABE: Analysiere den folgenden Prompt und gib konkrete Verbesserungsvorschläge:

URSPRÜNGLICHER PROMPT:
"Schreibe eine E-Mail über Versicherungen für Kunden."

ANALYSE-KRITERIEN:
1. Klarheit und Spezifität
2. Zielgruppendefinition  
3. Gewünschtes Ergebnis
4. Fehlende Kontextinformationen
5. Strukturierung der Anfrage

Bewerte jeden Aspekt und formuliere einen optimierten Prompt.
```

### 2.5.2 Beispiel 2: Prompt-Coaching für komplexe Aufgaben

```
Ich möchte einen Prompt entwickeln, um KI bei der Erstellung von personalisierten Versicherungsempfehlungen zu unterstützen. 

MEIN BISHERIGER ANSATZ:
"Empfiehl eine Versicherung basierend auf Kundendaten."

HILF MIR DABEI:
1. Welche spezifischen Informationen sollte ich der KI zur Verfügung stellen?
2. Wie strukturiere ich den Prompt für optimale Ergebnisse?
3. Welche Prompt-Techniken würden hier am besten funktionieren?
4. Erstelle einen beispielhaften optimierten Prompt
5. Erkläre, warum diese Version besser funktioniert

Berücksichtige dabei, dass die Empfehlungen rechtlich korrekt und ethisch vertretbar sein müssen.
```

### 2.5.3 Beispiel 3: Iterative Prompt-Optimierung

```
PROMPT-OPTIMIERUNGS-WORKFLOW:

Schritt 1: Analysiere diesen Prompt
"Erstelle Verkaufstexte für Lebensversicherungen"

Schritt 2: Identifiziere die 3 größten Schwächen

Schritt 3: Formuliere 3 alternative Versionen mit unterschiedlichen Schwerpunkten:
- Version A: Fokus auf Zielgruppe
- Version B: Fokus auf Struktur  
- Version C: Fokus auf Kontext

Schritt 4: Bewerte jede Version und empfiehl die beste Lösung

Schritt 5: Erkläre die wichtigsten Lernpunkte für zukünftige Prompts
```


<div style="page-break-after: always;"></div>


# 3 Erweiterte Prompt-Techniken


## 3.1 Frage- und Prüfmuster

### 3.1.1 Fragenverfeinerungsmuster
Beim Fragenverfeinerungsmuster beginnt man mit einer allgemeinen Frage und verfeinert sie dann schrittweise.

```
Was sind die Hauptvorteile einer Lebensversicherung? Konzentriere dich nun speziell darauf, wie eine Lebensversicherung als Anlagevehikel für die Altersvorsorge dienen kann.
```

### 3.1.2 Kognitives Prüfmuster
Das kognitive Prüfmuster fordert die KI auf, Informationen zu verifizieren oder zu überprüfen.

```
Erkläre, wie fondsgebundene Lebensversicherungspolicen funktionieren. Verifiziere die Informationen, indem du die wichtigsten Merkmale und damit verbundenen Risiken zusammenfasst.
```

### 3.1.3 Faktenchecklisten-Muster
```
Liste die erforderlichen Schritte zur Umwandlung einer Risikolebensversicherung in eine Kapitallebensversicherung auf und erkläre jeden Schritt kurz.
```

### 3.1.4 Vergleichs-/Kontrast-Prompts
```
Vergleiche und kontrastiere fondsgebundene Lebensversicherungen und Universal-Lebensversicherungen in Bezug auf Anlageoptionen, Risiko und Flexibilität. Erstelle eine übersichtliche Gegenüberstellung.
```

## 3.2 Inhalt- und Struktur-Muster

### 3.2.1 Vorlagenmuster
```
Erstelle anhand der folgenden Vorlage eine Zusammenfassung einer Lebensversicherungspolice:

**Police-Übersicht:**
- Name der Police: [Produktname]
- Art der Police: [Typ]
- Deckungssumme: [Betrag]
- Prämiendetails: [Kosten und Zahlweise]
- Hauptvorteile: [3-5 Punkte]
- Ausschlüsse: [Wichtigste Einschränkungen]
- Zusätzliche Bausteine: [Optionen]
- Zielgruppe: [Für wen geeignet]
```

### 3.2.2 Meta-Sprachmuster
```
Entwerfe eine personalisierte E-Mail an [KUNDENNAME], um ihn über die Vorteile einer Erweiterung seiner aktuellen [VERSICHERUNGSTYP] um [NEUES_FEATURE] zu informieren. Berücksichtige dabei sein Profil als [KUNDENTYP] und verwende einen [KOMMUNIKATIONSSTIL].
```

### 3.2.3 Gliederungserweiterungsmuster
```
Erweitere die folgenden Punkte zu einem umfassenden Artikel über Risikolebensversicherungen:

1. Definition der Risikolebensversicherung
2. Erschwinglichkeit und Einfachheit  
3. Ideale Kandidaten für Risikolebensversicherungen
4. Vergleich mit Kapitallebensversicherungen
5. Wie wählt man die richtige Laufzeit
6. Häufige Fehler bei der Auswahl

Jeder Abschnitt soll 200-300 Wörter umfassen und praxisnahe Beispiele enthalten.
```


<div style="page-break-after: always;"></div>


# 4 Prompting für verschiedene Modelltypen



## 4.1 Prompting für Chat-Modelle

**Optimiert für:**
- Natürliche Gespräche
- Kundenservice
- Informationsanfragen  
- Kreative Inhalte

**Effektive Strategien:**

1. **Konversationeller Ton:**
```
Als Versicherungsberater möchte ich einen Kunden über fondsgebundene Lebensversicherungen informieren. Wie würdest du in einfacher Sprache die Vor- und Nachteile erklären?
```

2. **Rollenbasierte Interaktionen:**
```
Du bist ein freundlicher Versicherungsberater. Ein Kunde fragt, warum er eine Risikolebensversicherung abschließen sollte. Wie würdest du antworten?
```

3. **Strukturierte Formatvorgaben:**
```
Erkläre die Unterschiede zwischen Risiko- und Kapitallebensversicherung in einer übersichtlichen Tabelle mit maximal 5 Vergleichspunkten.
```

## 4.2 Prompting für Reasoning-Modelle

**Optimiert für:**
- Logisches Schlussfolgern
- Komplexe Berechnungen
- Mehrstufige Entscheidungsfindung
- Tiefgreifende Analysen

**Effektive Strategien:**

1. **Schrittweise Analyse:**
```
Analysiere die optimale Versicherungsstrategie für einen 45-jährigen Selbständigen mit zwei Kindern, der für seine Altersvorsorge und den Vermögensaufbau plant. Führe deine Überlegungen Schritt für Schritt durch und begründe jede Empfehlung.
```

2. **Kritisches Denken:**
```
Beurteile kritisch die Vor- und Nachteile einer fondsgebundenen Rentenversicherung im Vergleich zu direkten ETF-Investments für die langfristige Altersvorsorge. Berücksichtige dabei steuerliche Aspekte, Kostenstrukturen und Flexibilität. Begründe jede Schlussfolgerung und betrachte verschiedene Szenarien.
```

3. **Strukturierte Gedankengänge:**
```
Entwickle ein Entscheidungsmodell für die Auswahl einer geeigneten Lebensversicherung. Strukturiere deine Analyse in folgende Schritte:
1. Identifiziere die relevanten Kundenfaktoren
2. Analysiere die verfügbaren Versicherungsoptionen  
3. Bewerte Vor- und Nachteile jeder Option
4. Entwickle Entscheidungskriterien
5. Empfehle eine begründete Vorgehensweise
```

4. **"Let's think step by step":**
```
Ein 40-jähriger Familienvater möchte eine Risikolebensversicherung abschließen. Welche Versicherungssumme wäre angemessen? Lass uns Schritt für Schritt überlegen.
```

## 4.3 Unterschiede im Prompting

- **Detailgrad:** Reasoning-Modelle profitieren von detaillierteren, strukturierteren Anweisungen
- **Reflexion:** Explizite Aufforderung zur kritischen Überprüfung von Annahmen
- **Mehrstufige Prompts:** Zerlegung komplexer Probleme in Teilschritte

```
Nachdem du die Empfehlung für die Versicherungslösung gegeben hast, hinterfrage kritisch deine eigenen Annahmen und diskutiere alternative Szenarien oder mögliche Schwachstellen in deiner Argumentation.
```

# 5 Best Practices und Tipps



## 5.1 Do's
- **Seien Sie spezifisch:** Je präziser der Prompt, desto besser das Ergebnis
- **Geben Sie Kontext:** Hintergrundinformationen verbessern die Antwortqualität
- **Strukturieren Sie komplexe Anfragen:** Zerlegen Sie große Aufgaben in Teilschritte
- **Nutzen Sie Beispiele:** Few-Shot Learning funktioniert oft besser als reine Beschreibungen
- **Fordern Sie Begründungen:** Lassen Sie sich den Denkprozess erklären
- **Iterieren Sie:** Verfeinern Sie Prompts basierend auf den Ergebnissen

## 5.2 Don'ts
- **Vermeiden Sie Mehrdeutigkeiten:** Unklare Formulierungen führen zu unbrauchbaren Ergebnissen
- **Überlasten Sie nicht:** Zu viele Anforderungen in einem Prompt verwirren das Modell
- **Vergessen Sie nicht die Zielgruppe:** Antworten müssen für den Empfänger verständlich sein
- **Vernachlässigen Sie nicht die Ethik:** Achten Sie auf faire und ausgewogene Darstellungen
- **Ignorieren Sie nicht Feedback:** Nutzen Sie Meta-Prompting zur Verbesserung

## 5.3 Voreingenommenheit berücksichtigen

Prompt Engineering kann strategisch eingesetzt werden, um Voreingenommenheit in KI-generierten Antworten zu reduzieren:

```
Erkläre die Vor- und Nachteile verschiedener Lebensversicherungsarten. Achte dabei auf eine neutrale, ausgewogene Darstellung ohne Bevorzugung bestimmter Produkte. Berücksichtige unterschiedliche Lebenssituationen und finanzielle Möglichkeiten.
```

## 5.4 Vorschläge zum Prompt einholen

```
Ich möchte eine E-Mail an einen Kunden verfassen, die die Vorteile einer Zusatzversicherung für schwere Krankheiten zu seiner Lebensversicherung erklärt. Mein aktueller Prompt ist: 'Schreibe eine E-Mail über die Ergänzung mit einer Zusatzversicherung.' Hast du Vorschläge zur Verbesserung dieses Prompts für detailliertere und überzeugendere Inhalte?
```


> [!Note] Fazit
Erfolgreiches Prompt Engineering erfordert das Verständnis der verschiedenen Techniken und deren situationsgerechte Anwendung. Die Kombination von Kontext, Rolle, Beispielen, strukturiertem Denken und kontinuierlicher Optimierung führt zu den besten Ergebnissen. Experimentieren Sie mit verschiedenen Ansätzen und nutzen Sie Meta-Prompting, um Ihre Fähigkeiten kontinuierlich zu verbessern.



<div style="page-break-after: always;"></div>


# 6 Aufgabe


<p><font color='black' size="5">
Few-Shot-Prompting für Kundenfeedback-Analyse
</font></p>

**Ziel:** Entwickeln Sie einen Few-Shot-Prompt zur Kategorisierung von Kundenfeedback.

**Aufgabenstellung:**
1. Formulieren Sie einen Prompt, der Kundenfeedback zu einem KI-gestützten Versicherungsprodukt in folgende Kategorien einordnet: "Benutzerfreundlichkeit", "Funktionsumfang", "Technische Probleme" und "Sonstiges"
2. Integrieren Sie mindestens drei Beispiele (Few-Shot-Ansatz)
3. Testen Sie Ihren Prompt mit fünf fiktiven Kundenfeedbacks
4. Fügen Sie eine Stimmungsbewertung hinzu (positiv, neutral, negativ)


<p><font color='black' size="5">
Chain-of-Thought für ML-Modellauswahl
</font></p>

**Ziel:** Anwendung des Chain-of-Thought-Ansatzes für eine fundierte ML-Modellempfehlung.

**Aufgabenstellung:**
1. Erstellen Sie einen Prompt für die Empfehlung eines ML-Algorithmus
2. Szenario: "Ein Versicherungsunternehmen möchte Betrugsversuche erkennen, Schadenshöhen vorhersagen und Kundensegmente identifizieren"
3. Der Prompt soll das Modell anweisen, den Entscheidungsprozess Schritt für Schritt darzulegen
4. Identifizierung von Implementierungsherausforderungen

<p><font color='black' size="5">
Persona-basierte Zielgruppen-Kommunikation
</font></p>


**Ziel:** Erstellung zielgruppenspezifischer Erklärungen mit Persona-Prompting.

**Aufgabenstellung:**
1. Wählen Sie ein komplexes KI-Konzept (z.B. maschinelles Lernen in der Risikomodellierung)
2. Entwickeln Sie drei Persona-Prompts für:
   - C-Level Executive ohne technischen Hintergrund
   - Versicherungsmathematiker mit Grundkenntnissen
   - IT-Entwickler für die Implementierung
3. Vergleichen Sie die Ergebnisse hinsichtlich Fachsprache, Detailtiefe und Praxisbezug
4. Fügen Sie branchenspezifische Anwendungsbeispiele hinzu



