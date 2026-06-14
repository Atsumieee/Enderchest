---
title: "Lernen durch Fehler - Die Update-Regel"
description: "Wie ein Computer aus falschen Vorhersagen lernt und seine Trennlinie Schritt für Schritt verbessert."
tags: 
- ki 
- konzept 
- schule
created: 2026-06-12 
status: permanent 
publish: true 
todo: false 
moc: false
---
# Lernen durch Fehler - Die Update-Regel

## Lernziele

Nach diesem Artikel kannst du...

- erklären was ein Fehler im Kontext von maschinellem Lernen bedeutet
- die Update-Regel in eigenen Worten beschreiben
- erklären warum die Schrittgrösse proportional zum Fehler sein soll

## Voraussetzungen

- [[Trennlinie|Die Trennlinie als Gleichung]] Die Trennlinie als Formel und das Gewicht A

---

## Die Linie liegt falsch

Ein zufälliges `A` ergibt eine Linie die die Insekten nicht sauber trennt. Manche Punkte landen auf der falschen Seite.

Der Computer braucht eine Methode um `A` zu verbessern. Der Ausgangspunkt dafür ist der Fehler.

## Den Fehler messen

Aus *[[Trennlinie|Die Trennlinie als Gleichung]]* kennen wir die Entscheidungsregel:

```
Fehler = A * x - y
```

Für einen Punkt der korrekt klassifiziert wird, ist der Fehler nahe bei 0. Für einen falsch klassifizierten Punkt ist er gross, positiv oder negativ, je nach welcher Seite der Linie der Punkt liegt.

Der Fehler hat also zwei Eigenschaften: sein Vorzeichen zeigt die Richtung des Fehlers, sein Betrag zeigt wie gross er ist.

## Die Update-Regel

Wenn der Fehler bekannt ist, lässt sich `A` anpassen:

```
A_neu = A_alt + Fehler * x
```

Das ist die Update-Regel. Sie sagt: Passe das Gewicht um den Fehler multipliziert mit der Eingabe an.

Warum multipliziert mit `x`? Weil `x` bestimmt wie stark eine Änderung von `A` überhaupt etwas bewirkt. Bei einem grossen `x` dreht eine kleine Änderung von `A` die Linie stark. Bei einem kleinen `x` kaum.

> [!example] 
> >Ein konkreter Durchlauf Ein Marienkäfer hat Breite `x = 3` und Länge `y = 1`. Das aktuelle Gewicht ist `A = 0.5`.
> 
> Fehler: `0.5 * 3 - 1 = 0.5`
> 
> Update: `A_neu = 0.5 + 0.5 * 3 = 0.5 + 1.5 = 2.0`
> 
> Das neue Gewicht `A = 2.0` ergibt eine steilere Linie. Der Marienkäfer-Punkt landet jetzt auf der richtigen Seite.

Klicke "Update-Schritt" und beobachte wie sich A und die Trennlinie nach jedem Punkt verändern:

```widget
widget_b3_update_regel
scale=1.0
width=wide
```

![Koordinatensystem mit alter Trennlinie gestrichelt und neuer Trennlinie durchgezogen, Marienkäfer-Punkt liegt nach dem Update auf der richtigen Seite](https://claude.ai/chat/files/PLATZHALTER_update_schritt.png) _Quelle: [Quelle einfügen] — Lizenz: [z.B. CC BY 4.0 / eigene Erstellung]_

## Warum proportional?

Die Schrittgrösse ist proportional zum Fehler. Kleiner Fehler, kleiner Schritt. Grosser Fehler, grosser Schritt.

Das ist sinnvoll: Wenn die Linie nur leicht falsch liegt, reicht eine kleine Korrektur. Wenn sie weit daneben liegt, braucht es einen grossen Schritt. Ein fixer Schritt unabhängig vom Fehler würde entweder zu langsam lernen oder ständig überschiessen.

Was "zu langsam" und "überschiessen" konkret bedeuten, kommt in [[B5 - Die Lernrate]].

## Eine Runde reicht nicht

Ein einziger Update-Schritt verbessert die Linie für einen Punkt. Aber das Koordinatensystem hat viele Punkte. Nach dem Update für den Marienkäfer könnte die Linie für die Raupe wieder schlechter passen.

Der Computer geht deshalb alle Punkte mehrmals durch und passt `A` bei jedem Punkt an.

> [!info]
> Epoche (Epoch) Eine Epoche ist ein vollständiger Durchlauf durch alle Trainingspunkte. Nach jeder Epoche hat der Computer jeden Punkt einmal gesehen und `A` entsprechend angepasst. Mehrere Epochen hintereinander verbessern die Linie schrittweise. Wie viele Epochen nötig sind, hängt vom Problem ab.

Nach genug Epochen liegt die Linie so, dass sie die meisten Punkte korrekt trennt. Wie viele Punkte man dafür braucht und warum zwei Punkte nicht reichen, kommt in [[B4 - Mehr Daten, mehr Sicherheit]].

---

> [!summary] 
> Das Wichtigste Der Fehler misst wie weit eine Vorhersage von der richtigen Antwort entfernt ist. Die Update-Regel passt das Gewicht `A` proportional zum Fehler an. Grosser Fehler bedeutet grossen Schritt, kleiner Fehler bedeutet kleinen Schritt. Ein vollständiger Durchlauf durch alle Trainingspunkte heisst Epoche. Mehrere Epochen verbessern die Trennlinie schrittweise.

## Verbindungen zu anderen Themen

| Thema                                        | Verbindung                                              |
| -------------------------------------------- | ------------------------------------------------------- |
| [[Trennlinie\|Die Trennlinie als Gleichung]] | Die Formel hinter dem Fehler                            |
| [[B4 - Mehr Daten, mehr Sicherheit]]         | Warum mehr Trainingspunkte eine bessere Linie ergeben   |
| [[B5 - Die Lernrate]]                        | Was passiert wenn die Schrittgrösse falsch gewählt wird |
| [[E4 - Gradient Descent]]                    | Die allgemeine Form der Update-Regel in tiefen Netzen   |
