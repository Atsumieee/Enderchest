---
title: "Vom Neuron zum Netz" 
description: "Wie aus einzelnen Neuronen ein kleines Netz wird und warum jedes Neuron dieselben Eingaben mit eigenen Gewichten verarbeitet." 
tags: [ki, konzept, schule] 
created: 2026-06-12 
status: permanent 
publish: true 
todo: false 
moc: false
---

## Lernziele

Nach diesem Artikel kannst du...

- beschreiben wie ein kleines Netz aus mehreren Neuronen aufgebaut ist
- erklären warum jedes Neuron eigene Gewichte braucht
- ein 2x2-Netz Schritt für Schritt durchrechnen

## Voraussetzungen

- [[Erstes Neuron|Eingaben, Gewichte, Summe]] — Eingaben, Gewichte und die gewichtete Summe
- [[Aktivierungsfunktionen]] — Wie aus der Summe die Ausgabe wird

---

## Ein Neuron reicht nicht weit

Ein einzelnes Neuron kann nur eine Trennlinie ziehen. In [[Boolesche Funktionen|Boolesche Funktionen und lineare Trennbarkeit]] haben wir gesehen, dass das für viele Probleme zu wenig ist. Die Lösung war, mehrere Neuronen zu kombinieren.

Jetzt bauen wir das konkret. Wir verschalten mehrere Neuronen zu einem kleinen Netz.

## Was heisst 2x2 Netz?

Ein 2x2 Netz bedeutet hier: zwei Eingänge links, zwei Neuronen rechts.

Das Besondere: Jedes der zwei Neuronen bekommt beide Eingänge. Damit braucht jedes Neuron auch zwei Gewichte, eines für jeden Eingang.

> [!info] Schicht (Layer) 
> Eine Schicht ist eine Gruppe von Neuronen die parallel arbeiten und dieselben Eingaben bekommen. Die zwei Neuronen in unserem Beispiel bilden zusammen eine Schicht. Grosse Netze bestehen aus vielen Schichten hintereinander, wobei die Ausgabe einer Schicht zur Eingabe der nächsten wird.

Wir nehmen diese Werte:

```
Eingänge:              1.0  und  0.5
Gewichte zu Neuron 1:  0.9  und  0.3
Gewichte zu Neuron 2:  0.2  und  0.8
```

Beide Neuronen sehen also dieselben Eingaben `1.0` und `0.5`, aber sie haben verschiedene Gewichte.

## Warum verschiedene Gewichte?

Hier steckt der Kern. Wenn beide Neuronen dieselben Eingaben bekommen, warum sollten sie unterschiedliche Gewichte haben?

Weil jedes Neuron eine andere Frage an dieselben Daten stellt. In [[XOR|Zwei Linien kombinieren]] hatten wir genau das: Eine Linie prüfte OR, die andere prüfte AND, beide schauten auf dieselben zwei Eingänge. Die unterschiedlichen Gewichte sind das was die zwei Fragen voneinander unterscheidet.

Neuron 1 mit den Gewichten `0.9` und `0.3` achtet stark auf den ersten Eingang. Neuron 2 mit den Gewichten `0.2` und `0.8` achtet stark auf den zweiten. Sie ziehen verschiedene Trennlinien durch dieselben Daten.

## Das Netz durchrechnen

> [!example] Beide Neuronen Schritt für Schritt 
> **Neuron 1** (Gewichte 0.9 und 0.3): $1.0 * 0.9 = 0.90$ $0.5 * 0.3 = 0.15$ Summe: $0.90 + 0.15 = 1.05$
> 
> **Neuron 2** (Gewichte 0.2 und 0.8): $1.0 * 0.2 = 0.20$ $0.5 * 0.8 = 0.40$ Summe: $0.20 + 0.40 = 0.60$

Jedes Neuron hat jetzt seine gewichtete Summe: Neuron 1 hat `1.05`, Neuron 2 hat `0.60`. Auf beide wenden wir nun eine Aktivierungsfunktion an, wie in [[Aktivierungsfunktionen]].

**Mit der Stufenfunktion** (Schwelle 1.0): Neuron 1 liegt mit `1.05` über der Schwelle und gibt `1`. Neuron 2 liegt mit `0.60` darunter und gibt `0`. Die Ausgabe des Netzes ist also `1` und `0`.

**Mit der Sigmoidfunktion**: Neuron 1 gibt etwa `0.74`, Neuron 2 etwa `0.65`. Beide Ausgaben sind Zwischenwerte, die zeigen wie stark das jeweilige Neuron reagiert.

![Netzdiagramm mit zwei Eingängen 1.0 und 0.5 links, vier beschrifteten Pfeilen mit den Gewichten zu zwei Neuronen rechts, die ihre Summen 1.05 und 0.60 zeigen](https://claude.ai/chat/files/PLATZHALTER_2x2_netz.png) _Quelle: [Quelle einfügen] — Lizenz: [z.B. CC BY 4.0 / eigene Erstellung]_

## Selbst ausprobieren

Im Widget kannst du die Eingaben und alle vier Gewichte verändern und siehst sofort wie sich die Summen und Ausgaben ändern. Schalte zwischen Stufen- und Sigmoidfunktion um, um den Unterschied zu sehen.

```widget
widget_d3_netz_spielwiese
scale=1.2
width=wide
```

## Das ist die Bauform für XOR

Dieses 2x2 Netz ist fast die Architektur die XOR löst. In [[XOR|Zwei Linien kombinieren]] hatten wir zwei prüfende Neuronen, die OR und AND berechnen, genau wie unsere zwei Neuronen hier. Was noch fehlt, ist ein drittes Neuron das die zwei Ausgaben verknüpft, also eine zweite Schicht.

Mit anderen Worten: Unsere zwei Neuronen wären die versteckte Schicht, und ein weiteres Neuron dahinter wäre die Ausgabeschicht. So entsteht ein Netz das nicht linear trennbare Probleme lösen kann.

Bis hierher haben wir die Gewichte von Hand gesetzt. Wie ein Netz diese Gewichte selbst findet, also wie das Lernen in einem mehrschichtigen Netz funktioniert, ist das Thema von Block E, beginnend mit [[E1 - Vorwärtsdurchlauf]].

---

> [!summary] Das Wichtigste 
> Ein Netz besteht aus mehreren Neuronen. In einem 2x2 Netz bekommen zwei Neuronen dieselben zwei Eingänge, jedes mit eigenen Gewichten. Verschiedene Gewichte bedeuten verschiedene Fragen an dieselben Daten. Jedes Neuron berechnet seine eigene gewichtete Summe und wendet darauf eine Aktivierungsfunktion an. Diese Bauform aus mehreren Neuronen in Schichten ist die Grundlage jedes neuronalen Netzes.

## Schlüsselbegriffe

- **Schicht**: Eine Gruppe von Neuronen die parallel arbeiten und dieselben Eingaben bekommen.
- **2x2 Netz**: Ein kleines Netz aus zwei Eingängen und zwei Neuronen.

## Verbindungen zu anderen Themen

| Thema                              | Verbindung                                     |
| ---------------------------------- | ---------------------------------------------- |
| [[D1 - Eingaben, Gewichte, Summe]] | Wie ein einzelnes Neuron rechnet               |
| [[D2 - Aktivierungsfunktionen]]    | Wie aus jeder Summe eine Ausgabe wird          |
| [[C2 - Zwei Linien kombinieren]]   | Warum Schichten nicht trennbare Probleme lösen |
| [[E1 - Vorwärtsdurchlauf]]         | Wie eine Eingabe durch ein ganzes Netz läuft   |
