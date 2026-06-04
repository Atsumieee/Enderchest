---
title: "Neuronale Netze 4 — Wenn eine Linie nicht reicht (XOR und Schichten)"
tags: [mathematik, schule]
created: 2026-06-02
status: permanent
publish: false
todo: false
---

# Neuronale Netze 4 — XOR und mehrere Schichten

## Überblick

Bisher hat eine einzige Trennlinie genügt. Diese Notiz zeigt, **wann eine Linie nicht mehr reicht** — und was man dann tut. Als Beispiel nehmen wir die boolschen Funktionen AND, OR und XOR.

Die zentrale Erkenntnis: Manche Probleme kann eine einzelne Gerade nicht lösen (XOR). Aber wenn **zwei Linien zusammenarbeiten** — oder anders gesagt: eine **versteckte Schicht** dazwischenkommt — klappt es doch. Genau das ist die Idee hinter mehrschichtigen neuronalen Netzen.

---

## Inhalt

### 1. Die boolschen Funktionen

`A` und `B` sind je 0 oder 1. Daraus ergeben sich drei Funktionen:

| A | B | AND | OR | XOR |
|---|---|-----|----|----|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 |

- **AND**: nur 1, wenn *beide* 1 sind
- **OR**: 1, wenn *mindestens einer* 1 ist
- **XOR**: 1, wenn *genau einer* 1 ist

### 2. AND und OR — eine Linie reicht

Zeichnet man die vier Eingabepaare als Punkte, lässt sich bei **AND** der einzige grüne Punkt `(1,1)` mit einer Geraden von den roten abtrennen. Bei **OR** genauso — nur `(0,0)` muss abgetrennt werden. Solche Probleme heissen **linear trennbar**: eine Linie genügt.

### 3. XOR — hier scheitert eine einzelne Linie

Bei XOR sind die grünen Punkte `(0,1)` und `(1,0)`. Sie liegen **diagonal**, die roten `(0,0)` und `(1,1)` ebenfalls diagonal — über Kreuz.

> **Merkhilfe:** Eine Gerade teilt die Fläche immer nur in zwei Hälften. Bei XOR liegen die richtigen Punkte über Kreuz — keine einzelne Gerade bekommt beide grünen auf eine Seite.

XOR ist also **nicht linear trennbar**. Genau hier reicht ein einzelner Klassifizierer nicht mehr.

### 4. XOR mit zwei Linien lösen

Der Trick: zwei Linien statt einer.
- untere Linie: `A + B = 0.5`
- obere Linie: `A + B = 1.5`

Dazwischen entsteht ein **Band**. Genau in diesem mittleren Streifen liegen die beiden grünen XOR-Punkte. Ein Punkt gehört zu XOR, wenn er **über der unteren, aber unter der oberen Linie** liegt.

### 5. Von zwei Linien zu zwei Schichten

Man kann die beiden Linien als zwei kleine Prüfer (Neuronen) verstehen:
- **h1** prüft: `A + B > 0.5` ? (nicht mehr zu tief)
- **h2** prüft: `A + B > 1.5` ? (schon zu hoch)

Die Endentscheidung kombiniert beide: **XOR = 1, wenn h1 = 1 und h2 = 0** (also im Band dazwischen).

| A | B | h1 (>0.5) | h2 (>1.5) | XOR = h1 und nicht h2 |
|---|---|-----------|-----------|------------------------|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 0 |

Das ist bereits ein kleines neuronales Netz mit drei Schichten:
- **Eingabeschicht**: A und B
- **Versteckte Schicht**: die zwei Prüfer h1 und h2
- **Ausgabeschicht**: kombiniert h1 und h2 zur Endentscheidung

### 6. Was hier noch fehlt (zum echten Netz)

Dieses Beispiel ist absichtlich vereinfacht: Die Regeln und Schwellen sind **fest vorgegeben**, nichts wird gelernt, und die Ausgaben sind hart (nur 0 oder 1). Ein echtes neuronales Netz **lernt** seine Gewichte selbst (wie in den Notizen 1–3) und arbeitet mit weichen Zwischenwerten wie 0.73 oder 0.12. Die Grundidee bleibt aber genau dieselbe:

> Mehrere einfache Teilentscheidungen werden zu einer grösseren Entscheidung zusammengesetzt.

---

## Schlüsselbegriffe

- **Boolsche Funktion**: Eine Funktion mit Eingaben/Ausgaben aus nur 0 und 1 (AND, OR, XOR).
- **Linear trennbar**: Ein Problem, bei dem eine einzige Gerade die Klassen trennen kann.
- **XOR**: Ausgabe 1, wenn genau einer der Eingänge 1 ist — nicht linear trennbar.
- **Versteckte Schicht**: Zwischenschicht aus mehreren kleinen Prüfern (Neuronen) zwischen Eingabe und Ausgabe.
- **Schicht (Layer)**: Eine Stufe im Netz; mehrere Schichten erlauben komplexere Entscheidungen.

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[Neuronale Netze 1 - Eine Trennlinie lernen]] | Zeigt das Lernen *einer* Linie; hier sehen wir deren Grenzen |
| [[Neuronale Netze 3 - Gute und schlechte Lernraten]] | Vorheriger Schritt der Serie; echtes Lernen statt fester Regeln |
| [[Mathematik Übersicht]] | Übergeordnete Fachübersicht |

---

## Quellen & Links
- Colab 4: "Wenn eine Linie nicht reicht — boolsche Funktionen mit Ausgaben" — Markus Ineichen
- [Theorie Neuronale Netze](https://github.com/IneichenEdulu/NNML/blob/main/Neuronale_Netze.md)
- [Lernzettel neuronale Netze](https://github.com/IneichenEdulu/NNML/blob/main/Lernzettel_neuronale_Netze.md)
