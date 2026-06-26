---
name: video_analyse
description: Analysiert Videoinhalt auf Basis von Transkript und Frame-Beschreibungen (8 Dimensionen)
variables: [transcribed_text, frame_descriptions]
---

## system

Du bist ein Experte für Videoanalyse.

## human

<Task>
Analysiere den folgenden Videoinhalt basierend auf dem Transkript und den Frame-Beschreibungen.
Gib eine detaillierte Zusammenfassung dessen, was im Video passiert.
</Task>

<Instructions>
Hauptpunkt: Inhaltsanalyse:
    Themen und Argumentationsstruktur: Was wird gesagt? Wie ist das Gesagte aufgebaut?
    Sprachstil: Alltagssprache vs. Fachsprache, formell vs. informell
    Rhetorische Mittel: Metaphern, Wiederholungen, Fragen, Ironie, Pausen
    Satzstruktur & Wortwahl: Einfach oder komplex? Viele Füllwörter?
    Erzählperspektive: Ich-Form, Du-Ansprache, distanziert?
    Tonfall und Haltung: Neutral, ironisch, kritisch, emotional?

Hauptpunkt: Parasprachliche Merkmale (Stimme, Ton, Sprechweise):
    Sprechtempo: Schnell, langsam, variierend
    Intonation: Monoton oder lebendig? Betonung gezielt eingesetzt?
    Lautstärke: Konstant, wechselnd, passend zur Situation?
    Stimmqualität: Klar, nasal, heiser, angespannt?
    Pausen: Natürlich oder unnatürlich? Strategisch gesetzt?
    Versprecher oder Selbstkorrekturen: Häufig? Sympathisch oder irritierend?

Hauptpunkt: Visuelle Elemente:
    Bildkomposition: Einstellungsgrößen, Perspektiven, Bildausschnitte
    Kameraführung: Statisch, dynamisch, Schwenks, Zooms
    Schnittrhythmus: Schnell, langsam, variierend, passend zum Inhalt?
    Lichtgestaltung: Natürliches vs. künstliches Licht, Farbstimmung
    Setting/Location: Bedeutung und Wirkung des Hintergrunds
    Kleidung/Styling: Formell, informell, thematisch passend?

Hauptpunkt: Nonverbale Kommunikation:
    Körperhaltung: Offen, geschlossen, angespannt, entspannt?
    Gestik: Häufigkeit, Natürlichkeit, unterstützend zum Gesagten?
    Mimik: Ausdrucksstark, zurückhaltend, authentisch?
    Blickkontakt: Direkt in die Kamera oder ablenkend?
    Bewegung im Raum: Statisch oder dynamisch?

Hauptpunkt: Zusammenspiel von Bild und Ton:
    Synchronität: Passen Bild und Ton zusammen?
    Ergänzung: Unterstützen visuelle Elemente das Gesagte?
    Musik/Soundeffekte: Einsatz und Wirkung auf die Gesamtwahrnehmung
    Grafiken/Einblendungen: Sinnvoll integriert und informativ?

Hauptpunkt: Wirkung auf die Zuschauer:innen
    Verständlichkeit: Wird der Inhalt klar transportiert?
    Authentizität: Wirkt die Person/Szene glaubwürdig und echt?
    Emotionale Ansprache: Berührt der Inhalt? Motiviert? Regt zum Denken an?
    Zielgruppenorientierung: Passt Sprache, Ton und Bild zum Publikum?

Hauptpunkt: Stimmungsanalyse:
    Stimmung: Positiv 😊, Neutral 😐, Negativ 😞
    Begründe Deine Einschätzung unter Berücksichtigung visueller und auditiver Elemente

Hauptpunkt: Technische Aspekte
    Audioqualität: Rauschfrei, Hall, Hintergrundgeräusche?
    Mikrofonierung: Richtiger Abstand, Pop-Geräusche, Aussteuerung?
    Bildqualität: Schärfe, Auflösung, Kontrast, Farbwiedergabe
    Schnitt & Nachbearbeitung: Erkennbar geschnitten? Übergänge sauber?
    Spezialeffekte/CGI: Sinnvoll eingesetzt und qualitativ hochwertig?

Hauptpunkt: Weitere Aspekte:
    Gibt es ethische Aspekte die angesprochen werden müssten?
    Gibt es versteckte Botschaften in Bild oder Ton?
    Wie ist die Konsistenz zwischen verbaler und visueller Kommunikation?
    Welche Punkte könnten noch interessant sein, an die ich nicht gedacht habe?
</Instructions>

<Hard Limits>
Vermeide unscharfe Formulierungen wie wahrscheinlich, möglicherweise, scheint, könnte oder sollte.
Nimm konkret Stellung.
</Hard Limits>

<Output>
Stelle bei der Ausgabe der Ergebnisse nur bei den Hauptpunkten zur besseren Unterscheidung ein "🔹" voran.
Zeige die Unterpunkte als dot-Aufzählung an.
</Output>

<Context>
### Video-Transkript:
{transcribed_text}

### Frame-Beschreibungen:
{frame_descriptions}
</Context>
