---
title: "Lernen durch Fehler — Die Update-Regel" 
description: "Wie ein Computer aus falschen Vorhersagen lernt und seine Trennlinie schrittweise verfeinert." 
tags: [ki, konzept, schule] 
created: 2026-06-12 
status: permanent 
publish: true 
todo: false 
moc: false
---
## Lernziele

Nach diesem Artikel kannst du...

- erklären was eine Lücke (Fehler) im Kontext von maschinellem Lernen bedeutet
- die Update-Regel mit Lernrate in eigenen Worten beschreiben
- erklären warum ein Computer in kleinen Schritten lernt statt die Lösung direkt zu berechnen

## Voraussetzungen

- [[Trennlinie|Die Trennlinie als Gleichung]] — Die Trennlinie als Formel und das Gewicht A

---

## Die Linie liegt falsch

Ein zu flaches `A` ergibt eine Linie die die Insekten nicht sauber trennt. Manche Punkte landen auf der falschen Seite.

Der Computer braucht eine Methode um `A` zu verbessern. Der Ausgangspunkt dafür ist die Lücke zwischen der Linie und einem Punkt.

## Die Lücke messen

Nimm einen Marienkäfer-Punkt mit Breite `x = 3` und Länge `y = 1.1`. Die aktuelle Steigung ist `A = 0.25`.

Wo liegt die Linie bei `x = 3`? Setze ein:

```
Linie bei x = 3:  A * x = 0.25 * 3 = 0.75
```

Der Punkt liegt bei `y = 1.1`, die Linie bei `0.75`. Die Lücke ist der Abstand dazwischen:

```
Lücke = y - A * x = 1.1 - 0.75 = 0.35
```

Die Lücke sagt: Der Punkt liegt 0.35 über der Linie. Die Linie müsste also steiler werden um näher an den Punkt zu kommen.

## Warum nicht einfach ausrechnen?

Du könntest die perfekte Steigung für diesen Punkt direkt berechnen: `1.1 / 3 = 0.367`. Damit läge die Linie genau auf dem Punkt.

Beim maschinellen Lernen will man das aber nicht. Wenn man die Lösung direkt ausrechnet, findet kein Training statt. Bei einem einzelnen Punkt wirkt das umständlich. Sobald aber viele Punkte zusammenkommen, die sich teils widersprechen, gibt es keine perfekte Steigung mehr die man ausrechnen kann. Dann braucht es ein Verfahren das sich Schritt für Schritt einer guten Lösung annähert.

Genau dafür gibt es die Lernrate.

## Die Update-Regel mit Lernrate

> [!info] 
> Lernrate (Learning Rate) Die Lernrate ist eine Zahl die festlegt wie gross ein einzelner Lernschritt ist. Sie sorgt dafür, dass der Computer den Fehler nicht auf einmal korrigiert, sondern in kleinen kontrollierten Schritten. Im Beispiel verwenden wir die Lernrate `0.5`.

Die Update-Regel lautet:

```
neue Steigung = alte Steigung + Lernrate * (Lücke / Breite)
```

Die Lücke wird durch die Breite geteilt, weil die Lücke in y-Richtung gemessen wird, die Steigung sich aber auf das Verhältnis von y zu x bezieht. Geteilt durch die Breite wird aus der y-Lücke eine Steigungs-Korrektur.

> [!example] 
> >Ein konkreter Schritt Gegeben: alte Steigung `A = 0.25`, Lücke `0.35`, Breite `x = 3`, Lernrate `0.5`.
> 
> Korrektur: `0.35 / 3 = 0.1167`
> 
> Mit Lernrate: `0.5 * 0.1167 = 0.0583`
> 
> Neue Steigung: `0.25 + 0.0583 = 0.3083`
> 
> Die Linie wird also nicht sofort auf die perfekte Steigung 0.367 gesetzt, sondern rückt nur ein Stück näher: von 0.25 auf 0.3083.

Klicke im Widget auf "Nächsten Punkt prüfen". Das Widget prüft abwechselnd den Marienkäfer und die Raupe und passt die Steigung nach jedem Punkt an.

```widget
widget_b3_update_regel
scale=1.2
width=wide
```

> [!note] 
> Warum wird die Linie nicht perfekt? Im Widget pendelt die Steigung: Der Marienkäfer zieht die Linie flacher, die Raupe zieht sie wieder steiler. Eine einzelne Linie durch den Ursprung kann diese beiden Punkte nicht beide perfekt treffen. Das ist kein Fehler, sondern eine ehrliche Eigenschaft des Verfahrens. Die Linie pendelt sich auf einen Kompromiss ein der beide Gruppen so gut wie möglich trennt. Wann eine einzelne Linie grundsätzlich nicht mehr reicht, ist das Thema von [[C2 - Lineare Trennbarkeit]].

![Koordinatensystem mit alter flacher Trennlinie gestrichelt und neuer steilerer Trennlinie durchgezogen, Marienkäfer-Punkt liegt über der alten Linie](https://claude.ai/chat/files/PLATZHALTER_update_schritt.png) _Quelle: [Quelle einfügen] — Lizenz: [z.B. CC BY 4.0 / eigene Erstellung]_

## Schritt für Schritt statt auf einmal

Ein einzelner Schritt bringt die Linie näher an den Punkt, aber nicht ganz hin. Erst nach mehreren Schritten nähert sich die Steigung der guten Lösung an.

Dieses schrittweise Vorgehen ist der Kern des Trainings. Die Lernrate steuert dabei das Tempo: Eine grosse Lernrate macht grosse Schritte, eine kleine Lernrate kleine.

> [!info] 
> Epoche (Epoch) Eine Epoche ist ein vollständiger Durchlauf durch alle Trainingspunkte. Nach jeder Epoche hat der Computer jeden Punkt einmal gesehen und `A` entsprechend angepasst. Mehrere Epochen hintereinander verfeinern die Linie. Wie viele Epochen nötig sind, hängt vom Problem ab.

Was passiert wenn die Lernrate zu gross oder zu klein gewählt wird, kommt in [[B5 - Die Lernrate]]. Warum mehr Trainingspunkte eine zuverlässigere Linie ergeben, kommt in [[B4 - Mehr Daten, mehr Sicherheit]].

---

> [!summary] 
> Das Wichtigste Die Lücke misst den Abstand zwischen einem Punkt und der Trennlinie in y-Richtung. Die Update-Regel verfeinert die Steigung schrittweise: `neue Steigung = alte Steigung + Lernrate * (Lücke / Breite)`. Die Lernrate legt fest wie gross ein Schritt ist. Der Computer rechnet die Lösung bewusst nicht direkt aus, sondern nähert sich ihr durch Training in mehreren Schritten an.

## Verbindungen zu anderen Themen

| Thema                                           | Verbindung                                            |
| ----------------------------------------------- | ----------------------------------------------------- |
| [[Trennlinie\|Die Trennlinie als Gleichung]]    | Die Formel hinter der Lücke                           |
| [[Trainingsdaten\|Mehr Daten, mehr Sicherheit]] | Warum mehr Trainingspunkte eine bessere Linie ergeben |
| [[Lernrate\|Die Lernrate]]                      | Was passiert wenn die Lernrate falsch gewählt wird    |
| [[E4 - Gradient Descent]]                       | Die allgemeine Form der Update-Regel in tiefen Netzen |
