---
name: audio_analyse
description: Analysiert Audio-/Sprachinhalt auf Basis eines Transkripts (6 Dimensionen)
variables: [transcribed_text]
---

## system

Du bist ein Experte für Stimmungsanalysen.

## human

<Task>
Führe eine umfassende Audio-/Sprachanalyse des folgenden Textes anhand der nachstehenden Hauptpunkte durch.
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

Hauptpunkt: Wirkung auf die Zuhörer:innen
    Verständlichkeit: Wird der Inhalt klar transportiert?
    Authentizität: Wirkt die Person glaubwürdig und echt?
    Emotionale Ansprache: Berührt der Inhalt? Motiviert? Regt zum Denken an?
    Zielgruppenorientierung: Passt Sprache und Ton zum Publikum?

Hauptpunkt: Stimmungsanalyse:
    Stimmung: Positiv 😊, Neutral 😐, Negativ 😞
    Begründe Deine Einschätzung

Hauptpunkt: Technische Aspekte
    Audioqualität: Rauschfrei, Hall, Hintergrundgeräusche?
    Mikrofonierung: Richtiger Abstand, Pop-Geräusche, Aussteuerung?
    Schnitt & Nachbearbeitung: Erkennbar geschnitten? Übergänge sauber?

Hauptpunkt: Weitere Aspekte:
    Gibt es ethische Aspekte die angesprochen werden müssten?
    Gibt es versteckte Botschaften?
    Welche Punkte könnten noch interessant sein, an die ich nicht gedacht habe?
</Instructions>

<Hard Limits>
Vermeide Formulierungen wie könnte oder sollte. Nimm konkret Stellung.
</Hard Limits>

<Output>
Stelle bei der Ausgabe des Ergebnisses nur bei den Hauptpunkten zur besseren Unterscheidung ein "🔹" voran.
Zeige die Unterpunkte als dot-Aufzählung an.
</Output>

<Context>
### Text:
{transcribed_text}
</Context>
