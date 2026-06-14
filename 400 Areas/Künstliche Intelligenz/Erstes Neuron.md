---

title: "Eingaben, Gewichte, Summe" 
description: "Wie ein künstliches Neuron Eingaben mit Gewichten verrechnet und woher die gewichtete Summe kommt." 
tags: [ki, konzept, schule] 
created: 2026-06-12 
status: permanent 
publish: true 
todo: false 
moc: false
---

## Lernziele

Nach diesem Artikel kannst du...

- erklären was Eingaben und Gewichte in einem Neuron sind
- eine gewichtete Summe selbst berechnen
- beschreiben was ein grosses und ein kleines Gewicht bewirkt

## Voraussetzungen

- [[Trennlinie|Die Trennlinie als Gleichung]] — Das Gewicht A und die Idee der Trennlinie

---

## Wir kennen das Neuron schon

In Block B haben wir eine Trennlinie trainiert. Diese Linie war bereits ein Neuron, nur in einfacher Form. Jetzt schauen wir uns den allgemeinen Aufbau an, mit mehreren Eingaben statt nur einer.

Ein künstliches Neuron ist ein kleiner Rechner. Es sammelt Eingaben und macht daraus eine Entscheidung. Der Weg dahin hat drei Stufen: Eingaben, Gewichte, Summe. Die vierte Stufe, die eigentliche Entscheidung, kommt in [[D2 - Aktivierungsfunktionen]].

## Eingaben

Die Eingaben sind die Zahlen die in das Neuron hereinkommen. Bei den Insekten waren das Breite und Länge. Allgemein kann es jede Art von Messwert sein: die Helligkeit eines Bildpunkts, die Lautstärke eines Tons, der Wert eines Sensors.

In unserem Beispiel hat das Neuron zwei Eingänge:


Eingabe 1 = 1.0
Eingabe 2 = 0.5
```

## Gewichte

Jede Eingabe bekommt ein Gewicht. Das Gewicht legt fest wie stark diese Eingabe zählt.

> [!info] Gewicht (Weight) 
> Ein Gewicht ist eine Zahl die festlegt wie stark eine Eingabe in die Entscheidung eingeht. Ein grosses Gewicht bedeutet, dass diese Eingabe viel Einfluss hat. Ein kleines Gewicht bedeutet, dass sie kaum zählt. Die Gewichte sind genau die Werte die ein Netz beim Training anpasst, so wie die Steigung A in [[Lernen durch Fehler]].

> **Merkhilfe:** Ein Gewicht ist wie ein Lautstärkeregler. Grosses Gewicht heisst diese Eingabe wird laut aufgedreht. Kleines Gewicht heisst sie bleibt leise.

In unserem Beispiel haben die zwei Eingänge diese Gewichte:

```
Gewicht 1 = 0.9
Gewicht 2 = 0.3
```

Eingabe 1 zählt also stark (Gewicht 0.9), Eingabe 2 zählt schwächer (Gewicht 0.3).

## Die gewichtete Summe

Jetzt verrechnet das Neuron Eingaben und Gewichte. Jede Eingabe wird mit ihrem Gewicht multipliziert, und die Ergebnisse werden zusammengezählt.

> [!example] Die gewichtete Summe berechnen 
> 
> Eingabe 1 mal Gewicht 1: `1.0 * 0.9 = 0.90`
> 
> Eingabe 2 mal Gewicht 2: `0.5 * 0.3 = 0.15`
> 
> Summe: `0.90 + 0.15 = 1.05`
> 
> Die gewichtete Summe ist also `1.05`.

Diese Zahl, die gewichtete Summe, fasst alle Eingaben zu einem einzigen Wert zusammen. Sie sagt: Wie stark wird das Neuron insgesamt angeregt?

Allgemein, bei beliebig vielen Eingaben, lautet die Rechnung:

```
gewichtete Summe = Eingabe1 * Gewicht1 + Eingabe2 * Gewicht2 + ...
```

## Was die Summe bedeutet

Die gewichtete Summe ist noch nicht die Ausgabe des Neurons. Sie ist eine Zwischengrösse. Ein hoher Wert bedeutet, dass die wichtigen Eingaben stark aktiv waren. Ein niedriger Wert bedeutet das Gegenteil.

Was das Neuron mit dieser Summe macht, also ob am Ende eine 0, eine 1 oder ein Zwischenwert herauskommt, entscheidet die Aktivierungsfunktion. Das ist das Thema von [[D2 - Aktivierungsfunktionen]].

![Diagramm eines Neurons mit zwei Eingängen 1.0 und 0.5, die über Gewichte 0.9 und 0.3 in eine gewichtete Summe von 1.05 fliessen](https://claude.ai/chat/files/PLATZHALTER_neuron_summe.png) _Quelle: [Quelle einfügen] — Lizenz: [z.B. CC BY 4.0 / eigene Erstellung]_

---

> [!summary] Das Wichtigste 
> Ein Neuron bekommt Eingaben, also Zahlen die hereinkommen. Jede Eingabe hat ein Gewicht das festlegt wie stark sie zählt, vergleichbar mit einem Lautstärkeregler. Jede Eingabe wird mit ihrem Gewicht multipliziert und alles wird zusammengezählt: das ist die gewichtete Summe. Im Beispiel ergibt sich aus den Eingaben 1.0 und 0.5 mit den Gewichten 0.9 und 0.3 die Summe 1.05.

## Schlüsselbegriffe

- **Eingabe**: Eine Zahl die in das Neuron hereinkommt.
- **Gewicht**: Eine Zahl die festlegt wie stark eine Eingabe zählt.
- **Gewichtete Summe**: Die Summe aller Eingaben, jeweils multipliziert mit ihrem Gewicht.

## Verbindungen zu anderen Themen

|Thema|Verbindung|
|---|---|
|[[B2 - Die Trennlinie als Gleichung]]|Das Gewicht A als erster Spezialfall|
|[[B3 - Lernen durch Fehler]]|Wie Gewichte beim Training angepasst werden|
|[[D2 - Aktivierungsfunktionen]]|Was das Neuron aus der Summe macht|
|[[D3 - Vom Neuron zum Netz]]|Mehrere Neuronen mit je eigenen Gewichten|