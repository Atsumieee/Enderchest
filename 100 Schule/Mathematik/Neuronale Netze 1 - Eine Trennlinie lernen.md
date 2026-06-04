---
title: "Neuronale Netze 1 — Eine Trennlinie lernen"
tags: [mathematik, schule]
created: 2026-06-02
status: permanent
publish: false
todo: false
---

# Neuronale Netze 1 — Eine Trennlinie lernen

## Überblick

Stell dir vor, du willst aus zwei Eigenschaften eines Insekts erraten, ob es ein **Marienkäfer** oder eine **Raupe** ist. Du zeichnest jedes Tier als Punkt in ein Koordinatensystem (Breite auf der x-Achse, Länge auf der y-Achse) und legst eine Linie dazwischen. Alles oberhalb der Linie = Raupe, alles unterhalb = Marienkäfer.

Diese Notiz zeigt, wie so eine **Trennlinie** Schritt für Schritt besser wird. Genau dieses Prinzip — *Fehler anschauen, ein bisschen nachjustieren, nochmal probieren* — ist der Kern von maschinellem Lernen und neuronalen Netzen. Du brauchst kein Vorwissen, nur die Idee einer Geraden.

---

## Inhalt

### 1. Die Linie hat die Form y = A × x

Unsere Trennlinie ist bewusst einfach: Sie geht durch den Nullpunkt und hat nur **eine einzige Stellschraube** — die Steigung **A**.

> **Merkhilfe:** Grosses A → steile Linie. Kleines A → flache Linie.

Beispiel: Bei `A = 0.25` ist die Linie bei `x = 4` erst auf Höhe `y = 1`. Sie ist also ziemlich flach.

Die Punkte:
- **Marienkäfer**: breit und kurz, z.B. Breite 3, Länge 1 → soll *unterhalb* der Linie liegen
- **Raupe**: schmal und lang, z.B. Breite 1, Länge 3 → soll *oberhalb* der Linie liegen

### 2. Die Lernregel

Wenn die Linie an einem Punkt falsch liegt, ändern wir die Steigung. Aber wie stark? Die Formel:

```
neue Steigung = alte Steigung + Lernrate × (Lücke / Breite)
```

- **Lücke** = Wie weit ist die Linie vom gewünschten Ort entfernt? (gewünschte Höhe − tatsächliche Höhe)
- **Lernrate** = Wie mutig korrigieren wir? (hier z.B. 0.5)
- **proportional**: grosse Lücke → grosse Änderung, kleine Lücke → kleine Änderung

### 3. Sicherheitsabstand

Die Linie soll nicht genau *durch* einen Punkt gehen, sondern ein kleines Stück daneben. Beim Marienkäfer bei Breite 3 zielen wir nicht auf Höhe 1.0, sondern auf 1.1 — so bleibt eine kleine **Sicherheitsdistanz** zwischen Linie und Tier.

### 4. Ein Lernschritt am Beispiel

Marienkäfer bei Breite 3, Startsteigung `A = 0.25`:
- Linie bei x = 3: `0.25 × 3 = 0.75`
- gewünschte Höhe: `1.1`
- Lücke: `1.1 − 0.75 = 0.35`
- Änderung: `0.5 × (0.35 / 3) ≈ 0.058`
- neue Steigung: `0.25 + 0.058 ≈ 0.308`

Die Lücke war positiv → die Linie muss **steiler** werden. Genau das passiert. Danach prüft man die Raupe und korrigiert wieder. Nach nur zwei solchen Schritten trennt die Linie die beiden Tiere schon brauchbar.

### 5. Warum trainieren statt rechnen?

Man könnte die perfekte Steigung direkt ausrechnen. Beim *maschinellen Lernen* geht das aber meistens nicht — darum übt man das schrittweise Annähern hier an einem einfachen Beispiel. Genau diese Schleife (prüfen → Fehler → anpassen → wiederholen) skaliert später auf riesige neuronale Netze.

---

## Schlüsselbegriffe

- **Trennlinie (Klassifizierungsfunktion)**: Eine Linie, die zwei Gruppen voneinander unterscheidet.
- **Steigung A**: Die einzige Stellschraube der Linie `y = A · x`; bestimmt, wie steil sie ist.
- **Lücke (Fehler)**: Abstand zwischen dem gewünschten und dem tatsächlichen Ort der Linie.
- **Lernrate**: Faktor, der bestimmt, wie stark pro Schritt korrigiert wird.
- **proportional**: Grosse Lücke führt zu grosser Änderung, kleine Lücke zu kleiner.
- **Sicherheitsabstand**: Kleiner Puffer, damit die Linie nicht genau durch einen Punkt verläuft.

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[Neuronale Netze - Grundlagen]] | Das grosse Bild: was ein Neuron, ein Gewicht und Lernen überhaupt sind |
| [[Neuronale Netze 2 - Mehr Trainingspunkte]] | Nächster Schritt: dieselbe Regel automatisch auf viele Punkte anwenden |
| [[Neuronale Netze 3 - Gute und schlechte Lernraten]] | Vertieft, wie die Lernrate aus dieser Notiz das Lernen beeinflusst |
| [[Mathematik Übersicht]] | Übergeordnete Fachübersicht |

---

## Quellen & Links
- Colab 1: "Marienkäfer oder Raupe? Eine Trennlinie lernt Schritt für Schritt" — Markus Ineichen
- [Theorie Neuronale Netze](https://github.com/IneichenEdulu/NNML/blob/main/Neuronale_Netze.md)
- [Lernzettel neuronale Netze](https://github.com/IneichenEdulu/NNML/blob/main/Lernzettel_neuronale_Netze.md)
