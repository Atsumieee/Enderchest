---
title: "Zwei Linien kombinieren" 
description: "Wie zwei Trennlinien und ein verknüpfender Schritt das XOR-Problem lösen und warum das genau eine versteckte Schicht ist." 
tags: [ki, konzept, schule] 
created: 2026-06-12 
status: permanent 
publish: true 
todo: false 
moc: false
---


## Lernziele

Nach diesem Artikel kannst du...

- erklären wie zwei Trennlinien zusammen XOR lösen
- beschreiben welche Rolle ein dritter, verknüpfender Schritt spielt
- die Verbindung zwischen zwei Linien plus Verknüpfung und einer versteckten Schicht herstellen

## Voraussetzungen

- [[Boolesche Funktionen|Boolesche Funktionen und lineare Trennbarkeit]] — Warum XOR nicht mit einer Linie trennbar ist

---

## Das Problem in einem Satz

In [[Boolesche Funktionen|Boolesche Funktionen und lineare Trennbarkeit]] haben wir gesehen: Eine einzige Linie kann XOR nicht trennen, weil die zwei 1-Punkte über Kreuz liegen. Eine Gerade schafft das nie.

Die Lösung ist überraschend einfach. Wenn eine Linie nicht reicht, nimm zwei.

## XOR in zwei einfachere Fragen zerlegen

Schau dir an wann XOR den Wert 1 hat: bei (0,1) und (1,0), also wenn genau einer der beiden Eingänge an ist. Das lässt sich in zwei Bedingungen aufteilen, die beide gleichzeitig gelten müssen:

1. Mindestens einer ist an. Das ist genau die Funktion OR.
2. Nicht beide sind an. Das ist genau die Funktion AND, aber verneint.

XOR ist also: "mindestens einer an" UND "nicht beide an". In Kurzform:
$XOR = OR \text{ und (nicht AND)}$

Jede dieser beiden Teilbedingungen ist für sich linear trennbar, wie wir in [[Boolesche Funktionen|Boolesche Funktionen und lineare Trennbarkeit]] gesehen haben. Für jede gibt es also eine Linie.

## Die zwei Linien

Wir legen zwei Linien fest. Statt mit der Form $y = A * x$ arbeiten wir hier mit der Summe der Eingaben $x + y$, weil das die booleschen Funktionen direkt abbildet.

**Linie 1 (OR):** Sie prüft ob die Summe der Eingaben mindestens 0.5 erreicht.

$x + y ≥ 0.5$   →   mindestens einer ist an


**Linie 2 (AND):** Sie prüft ob die Summe mindestens 1.5 erreicht, also ob beide an sind.

$x + y ≥ 1.5$   →   beide sind an

> Koordinatensystem mit den vier XOR-Eckpunkten und zwei parallelen Trennlinien, die einen diagonalen Streifen bilden in dem die beiden 1-Punkte liegen
![[Pasted image 20260614170610.png]]
>*Created with matplotlib*

Die beiden Linien bilden einen diagonalen Streifen. Innerhalb dieses Streifens liegt genau das, was wir suchen: die Punkte bei denen einer an ist, aber nicht beide.

## Durchgerechnet

> [!example] Alle vier Punkte durch beide Linien
> 
> |Punkt|x + y|OR (≥ 0.5)|AND (≥ 1.5)|OR und nicht AND|XOR soll|
> |---|---|---|---|---|---|
> |(0,0)|0|nein (0)|nein (0)|0|0|
> |(0,1)|1|ja (1)|nein (0)|1|1|
> |(1,0)|1|ja (1)|nein (0)|1|1|
> |(1,1)|2|ja (1)|ja (1)|0|0|
> 
> Die vorletzte Spalte stimmt in jeder Zeile mit der XOR-Spalte überein. Die zwei Linien lösen XOR vollständig.

Geh die Tabelle Zeile für Zeile durch. Der Punkt (1,1) ist der entscheidende: Er erfüllt OR (mindestens einer an), aber er erfüllt auch AND (beide an). Weil die Verknüpfung "nicht AND" verlangt, fällt er raus und bekommt eine 0. Genau das unterscheidet XOR von OR.

Verschiebe die zwei Linien im Widget und beobachte den Streifen dazwischen. Nur wenn beide Linien richtig liegen, fallen genau die zwei 1-Punkte in die Streifen.

```widget
widget_c2_zwei_linien
scale=1.2
width=wide
```
## Der dritte Schritt: Verknüpfen

Die zwei Linien allein geben dir zwei Zwischenergebnisse: erfüllt der Punkt OR? Erfüllt er AND? Diese zwei Antworten müssen noch zusammengeführt werden zu einer einzigen XOR-Antwort.

Diese Zusammenführung ist selbst wieder eine einfache logische Verknüpfung: "OR ja UND AND nein". Sie nimmt die zwei Zwischenergebnisse als Eingaben und liefert das Endergebnis. Und diese Verknüpfung ist linear trennbar, also wieder eine einzige Linie.

Wir haben jetzt drei Prüfer:

- Prüfer 1 zieht die OR-Linie und meldet sein Ergebnis
- Prüfer 2 zieht die AND-Linie und meldet sein Ergebnis
- Prüfer 3 nimmt die zwei Meldungen und verknüpft sie zur XOR-Antwort

## Das ist eine versteckte Schicht

Jetzt kommt der Brückenschlag, der den Rest des Themas trägt.

> [!info] Versteckte Schicht (Hidden Layer) 
> Die zwei Prüfer die OR und AND berechnen sind nicht die Endausgabe, sondern ein Zwischenschritt. Sie bilden eine versteckte Schicht: eine Ebene von Recheneinheiten zwischen Eingabe und Ausgabe, deren Ergebnisse nicht direkt nach aussen gehen, sondern an die nächste Schicht weitergereicht werden. Der dritte Prüfer ist die Ausgabeschicht. Genau dieser Aufbau, Eingaben in eine versteckte Schicht und von dort in die Ausgabe, macht aus einzelnen Neuronen ein neuronales Netz.

Jeder dieser Prüfer ist nichts anderes als das was wir in Block B trainiert haben: eine Trennlinie, also ein einzelnes Neuron. XOR braucht drei davon, in zwei Schichten angeordnet.

Damit ist die zentrale Erkenntnis erreicht: Ein einzelnes Neuron kann nur linear trennbare Probleme lösen. Mehrere Neuronen in Schichten können auch Probleme lösen die nicht linear trennbar sind, indem die erste Schicht das Problem in trennbare Teile zerlegt und die nächste Schicht sie zusammensetzt.

## Weiter

Wir haben die Linien hier von Hand festgelegt. In der Praxis lernt das Netz diese Linien selbst, mit demselben Training aus Block B, nur für mehrere Neuronen gleichzeitig.

Wie ein einzelnes Neuron formal aufgebaut ist, mit Eingaben, Gewichten und einer Summe, ist das Thema von [[D1 - Eingaben, Gewichte, Summe]]. Wie mehrere davon zu einem Netz werden, kommt in [[D3 - Vom Neuron zum Netz]].

---

> [!summary] Das Wichtigste 
> XOR lässt sich in zwei linear trennbare Teilfragen zerlegen: mindestens einer an (OR) und nicht beide an (nicht AND). Jede Teilfrage ist eine eigene Linie. Ein dritter Schritt verknüpft die zwei Zwischenergebnisse zur XOR-Antwort. Diese Anordnung aus zwei prüfenden Neuronen und einem verknüpfenden Neuron ist eine versteckte Schicht plus Ausgabe, also der Grundaufbau eines neuronalen Netzes.

## Schlüsselbegriffe

- **Versteckte Schicht**: Eine Ebene von Recheneinheiten zwischen Eingabe und Ausgabe, deren Ergebnisse an die nächste Schicht weitergereicht werden.
- **Ausgabeschicht**: Die letzte Schicht eines Netzes, die das Endergebnis liefert.

## Verbindungen zu anderen Themen

| Thema                                                                   | Verbindung                                            |
| ----------------------------------------------------------------------- | ----------------------------------------------------- |
| [[Boolesche Funktionen\|Boolesche Funktionen und lineare Trennbarkeit]] | Warum eine Linie für XOR nicht reicht                 |
| [[Erstes Neuron\|Eingaben, Gewichte, Summe]]                            | Wie ein einzelnes Neuron formal rechnet               |
| [[Neuronennetz\|Vom Neuron zum Netz]]                                   | Wie mehrere Neuronen zu einem Netz verschaltet werden |
| [[E3 - Backpropagation]]                                                | Wie ein Netz die Linien selbst lernt                  |
