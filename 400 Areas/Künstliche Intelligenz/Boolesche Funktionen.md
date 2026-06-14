---
title: "Boolesche Funktionen und lineare Trennbarkeit" 
description: "Warum sich AND und OR mit einer einzigen Linie trennen lassen, XOR aber nicht und was lineare Trennbarkeit grundsätzlich bedeutet." 
tags: [ki, konzept, schule] 
created: 2026-06-12 
status: permanent 
publish: true 
todo: false 
moc: false
---

## Lernziele

Nach diesem Artikel kannst du...

- erklären was eine boolesche Funktion ist
- AND, OR und XOR als Punkte im Koordinatensystem darstellen
- begründen warum AND und OR linear trennbar sind, XOR aber nicht
- den Begriff lineare Trennbarkeit in eigenen Worten erklären

## Voraussetzungen

- [[B1 - Klassifikation]] — Das Koordinatensystem und die Idee der Trennlinie

---

## Boolesche Funktionen

Bisher hatten unsere Eingaben beliebige Werte: die Breite und Länge eines Insekts. Jetzt schauen wir uns den einfachsten möglichen Fall an, bei dem jede Eingabe nur zwei Werte annehmen kann: 0 oder 1.

> [!info] Boolesche Funktion 
> Eine boolesche Funktion nimmt Eingaben die nur 0 oder 1 sein können und gibt wieder 0 oder 1 zurück. 0 steht für "falsch" oder "aus", 1 für "wahr" oder "an". Benannt sind sie nach dem Mathematiker George Boole. Boolesche Funktionen sind die Grundlage jeder digitalen Schaltung, von der einfachsten Logik bis zum Prozessor.

Ein Alltagsbeispiel: Stell dir eine Lampe vor, die von zwei Schaltern abhängt. Jeder Schalter ist entweder aus (0) oder an (1). Ob die Lampe leuchtet (1) oder nicht (0), hängt davon ab wie die Funktion definiert ist. Genau diese Regeln schauen wir uns jetzt an.

Mit zwei Eingaben gibt es vier mögliche Kombinationen: (0,0), (0,1), (1,0) und (1,1). Diese vier Kombinationen lassen sich als vier Punkte in einem Koordinatensystem zeichnen, in den vier Ecken eines Quadrats.

## AND: Beide müssen an sein

Die Funktion AND (und) gibt nur dann 1 zurück, wenn beide Eingaben 1 sind.

|Eingabe 1|Eingabe 2|AND|
|---|---|---|
|0|0|0|
|0|1|0|
|1|0|0|
|1|1|1|

Im Koordinatensystem liegt nur ein einziger Punkt auf 1: die Ecke oben rechts (1,1). Die anderen drei Ecken sind 0.

Kannst du eine Linie ziehen, die den einen 1-Punkt von den drei 0-Punkten trennt? Ja. Eine Linie diagonal durch die obere rechte Ecke trennt (1,1) sauber von den übrigen drei. AND ist mit einer einzigen Linie trennbar.

## OR: Mindestens einer muss an sein

Die Funktion OR (oder) gibt 1 zurück, sobald mindestens eine Eingabe 1 ist.

|Eingabe 1|Eingabe 2|OR|
|---|---|---|
|0|0|0|
|0|1|1|
|1|0|1|
|1|1|1|

Jetzt ist es umgekehrt: Nur die Ecke unten links (0,0) ist 0, die anderen drei sind 1. Auch hier reicht eine Linie: Eine Diagonale die (0,0) abtrennt, lässt die drei 1-Punkte auf der anderen Seite. OR ist ebenfalls mit einer Linie trennbar.

![Drei kleine Koordinatensysteme nebeneinander für AND, OR und XOR, jeweils mit vier Eckpunkten markiert als 0 oder 1 und einer versuchten Trennlinie](https://claude.ai/chat/files/PLATZHALTER_and_or_xor.png) _Quelle: [Quelle einfügen] — Lizenz: [z.B. CC BY 4.0 / eigene Erstellung]_

## XOR: Genau einer muss an sein

Die Funktion XOR (exklusives oder) gibt 1 zurück, wenn genau eine Eingabe 1 ist, aber nicht beide.

> [!example] Die XOR-Wertetabelle
> 
> |Eingabe 1|Eingabe 2|XOR|
> |---|---|---|
> |0|0|0|
> |0|1|1|
> |1|0|1|
> |1|1|0|
> 
> Die beiden 1-Punkte sind (0,1) und (1,0), also die obere linke und die untere rechte Ecke. Die beiden 0-Punkte sind (0,0) und (1,1), die untere linke und die obere rechte Ecke.

Jetzt liegen die beiden 1-Punkte diagonal gegenüber, und die beiden 0-Punkte ebenfalls. Versuch eine Linie zu ziehen die beide 1-Punkte auf eine Seite bringt und beide 0-Punkte auf die andere.

Es geht nicht.

## Warum XOR nicht mit einer Linie geht

Schau dir die Lage genau an. Die zwei 1-Punkte (0,1) und (1,0) liegen sich diagonal gegenüber. Zwischen ihnen, genau in der Mitte, liegt der Schnittpunkt der beiden Diagonalen. Die zwei 0-Punkte (0,0) und (1,1) liegen auf der anderen Diagonale und kreuzen sich am selben Mittelpunkt.

Eine Gerade teilt die Ebene in zwei Hälften. Egal wie du sie legst, du kannst nie zwei diagonal gegenüberliegende Ecken auf eine Seite bringen, ohne dass mindestens eine der anderen beiden Ecken mit auf diese Seite rutscht. Sobald du die Linie so drehst dass (0,1) und (1,0) auf einer Seite liegen, ist immer mindestens einer der 0-Punkte mit dabei.

> [!important] Der Kernpunkt 
> XOR ist nicht linear trennbar. Es gibt keine einzige Gerade die die beiden 1-Punkte von den beiden 0-Punkten trennt. Das ist kein Problem der richtigen Steigung oder des richtigen Trainings. Es ist grundsätzlich unmöglich, weil die Punkte über Kreuz liegen.

Genau diese Erkenntnis stürzte die KI-Forschung 1969 in eine Krise, wie in [[Die Idee hinter neuronalen Netzen]] beschrieben. Ein einzelnes Neuron, das ja nichts anderes als eine Trennlinie ist, kann XOR nicht lernen.

## Was lineare Trennbarkeit bedeutet

Jetzt lässt sich der Begriff sauber fassen.

> [!info] Lineare Trennbarkeit 
> Zwei Gruppen von Punkten heissen linear trennbar, wenn es eine einzige Gerade gibt die alle Punkte der einen Gruppe von allen Punkten der anderen Gruppe trennt. Bei mehr als zwei Eingaben spricht man statt einer Geraden von einer Ebene oder Hyperebene, aber das Prinzip bleibt: ein einziger gerader Schnitt. AND und OR sind linear trennbar, XOR ist es nicht.

Lineare Trennbarkeit ist die Grenze dessen, was eine einzelne Trennlinie und damit ein einzelnes Neuron leisten kann. Alles was linear trennbar ist, kann ein Neuron lernen. Alles andere nicht.

## Der Ausweg

XOR ist nicht mit einer Linie lösbar. Aber was wäre, wenn man zwei Linien kombiniert? Wenn ein erster Prüfer eine Linie zieht und ein zweiter eine andere, und ein dritter ihre Ergebnisse verknüpft?

Genau das ist die Lösung, und sie führt direkt zum Aufbau eines mehrschichtigen Netzes. Das ist das Thema von [[C2 - Zwei Linien kombinieren]].

---

> [!summary] Das Wichtigste Boolesche Funktionen nehmen Eingaben aus 0 und 1 und geben 0 oder 1 zurück. AND und OR sind linear trennbar: eine einzige Gerade trennt die 1-Punkte von den 0-Punkten. XOR ist nicht linear trennbar, weil die 1-Punkte und 0-Punkte über Kreuz liegen und keine Gerade sie trennen kann. Lineare Trennbarkeit ist die Grenze eines einzelnen Neurons.

## Schlüsselbegriffe

- **Boolesche Funktion**: Eine Funktion deren Eingaben und Ausgabe nur 0 oder 1 sein können.
- **AND**: Gibt 1 zurück wenn beide Eingaben 1 sind.
- **OR**: Gibt 1 zurück wenn mindestens eine Eingabe 1 ist.
- **XOR**: Gibt 1 zurück wenn genau eine Eingabe 1 ist, aber nicht beide.
- **Lineare Trennbarkeit**: Eigenschaft zweier Punktgruppen, sich durch eine einzige Gerade trennen zu lassen.

## Verbindungen zu anderen Themen

|Thema|Verbindung|
|---|---|
|[[B1 - Klassifikation]]|Das Koordinatensystem und die Trennlinie|
|[[C2 - Zwei Linien kombinieren]]|Wie man XOR mit mehreren Linien doch löst|
|[[Die Idee hinter neuronalen Netzen]]|Warum XOR die KI-Forschung in eine Krise stürzte|
|[[D3 - Vom Neuron zum Netz]]|Mehrere Neuronen lösen, woran ein einzelnes scheitert|