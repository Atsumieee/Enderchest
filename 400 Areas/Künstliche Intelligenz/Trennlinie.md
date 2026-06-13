---
Description: Wie eine einfache Formel eine Linie beschreibt und wie diese Linie als Entscheidungsregel funktioniert.
Title: Die Trennlinie als Gleichung
Tags:
- ki
- konzept
- schule
Created: 2026-06-12
Status: permanent
publish: true
Todo: false
Moc: false
---
## Lernziele

Nach diesem Artikel kannst du...

- erklären was die Steigung einer Geraden bedeutet
- beschreiben wie eine Gleichung als Entscheidungsregel funktioniert
- den Begriff "Gewicht" in diesem Kontext einordnen

## Voraussetzungen

- [[B1 - Klassifikation]] — Was Klassifikation bedeutet und die Idee der Trennlinie

---

## Von der Linie zur Formel

In [[B1 - Klassifikation]] haben wir eine Linie zwischen Marienkäfer und Raupe gezogen. Jetzt bekommt diese Linie eine Formel.

Die einfachste Gerade durch den Ursprung lautet:

```
y = A × x
```

`x` ist die Breite des Insekts, `y` ist die Länge, und `A` ist die Steigung der Linie. Mehr über `A` gibt es im nächsten Abschnitt.

Diese Formel beschreibt jeden Punkt der exakt auf der Linie liegt. Punkte die nicht auf der Linie liegen, also alle echten Messpunkte, liegen entweder darüber oder darunter.

## Was bedeutet A?

`A` bestimmt wie steil die Linie ist. Ein grosses `A` ergibt eine steile Linie, ein kleines `A` eine flache.

Bild anzeigen _Quelle: [Quelle einfügen] — Lizenz: [z.B. CC BY 4.0 / eigene Erstellung]_

> [!example] Steigung konkret Wenn `A = 1` ist, steigt die Linie gleichmässig: Bei Breite 2 liegt die Linie bei Länge 2. Bei Breite 4 bei Länge 4. Wenn `A = 2` ist, steigt sie doppelt so schnell: Bei Breite 2 liegt die Linie bereits bei Länge 4. Die Steigung legt also fest wie die Linie das Koordinatensystem schneidet.

## Die Linie als Entscheidungsregel

Ein Punkt liegt auf der Linie wenn `y = A × x` gilt. Liegt er darüber, ist seine Länge grösser als `A × x`. Liegt er darunter, ist sie kleiner.

Das lässt sich als Entscheidungsregel schreiben:

```
A × x - y > 0   → Marienkäfer
A × x - y < 0   → Raupe
```

Bild anzeigen _Quelle: [Quelle einfügen] — Lizenz: [z.B. CC BY 4.0 / eigene Erstellung]_

Du berechnest für jeden neuen Punkt den Wert `A × x - y`. Ist er grösser als 0, liegt der Punkt auf der Marienkäfer-Seite. Ist er kleiner als 0, auf der Raupen-Seite.

## Gewicht

> [!info] Gewicht (Weight) In der KI nennt man den Faktor `A` ein Gewicht. Ein Gewicht gibt an wie stark eine Eingabe die Entscheidung beeinflusst. Ein grosses Gewicht bedeutet: Diese Eingabe zählt viel. Ein kleines Gewicht bedeutet: Diese Eingabe spielt kaum eine Rolle. Der Begriff taucht in jedem neuronalen Netz wieder auf, in [[D1 - Eingaben, Gewichte, Summe]] lernst du wie mehrere Gewichte zusammenspielen.

Im Insekten-Beispiel gibt es ein einziges Gewicht `A`. Es legt fest wie stark die Breite die Entscheidung beeinflusst.

## Die Linie passt noch nicht

Ein zufällig gewähltes `A` ergibt eine Linie die wahrscheinlich falsch liegt. Sie trennt die Insekten nicht sauber.

Der nächste Schritt ist deshalb: Wie findet der Computer selbst das beste `A`? Wie lernt er aus Fehlern?

Das ist das Thema von [[B3 - Lernen durch Fehler]].

---

> [!summary] Das Wichtigste Die Trennlinie hat die Formel `y = A × x`. Der Faktor `A` heisst Steigung und bestimmt wie steil die Linie ist. Mit der Entscheidungsregel `A × x - y` prüft man auf welcher Seite der Linie ein Punkt liegt. `A` ist das erste Gewicht: Es legt fest wie stark die Breite die Klassifikation beeinflusst.

## Verbindungen zu anderen Themen

|Thema|Verbindung|
|---|---|
|[[B1 - Klassifikation]]|Die Grundidee der Trennlinie ohne Formel|
|[[B3 - Lernen durch Fehler]]|Wie der Computer selbst das beste A findet|
|[[D1 - Eingaben, Gewichte, Summe]]|Gewichte in einem vollständigen Neuron|