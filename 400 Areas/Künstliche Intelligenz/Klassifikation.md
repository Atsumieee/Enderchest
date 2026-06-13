---
Description: Wie man zwei Gruppen in einem Koordinatensystem darstellt und warum eine Trennlinie reicht um Entscheidungen zu treffen.
Title: Klassifikation — Was bedeutet trennen?
Tags:
  - ki
  - konzept
  - schule
Created: 2026-06-12
Status: permanent
publish: true
Todo: false
---

## Lernziele

Nach diesem Artikel kannst du...

- erklären was Klassifikation bedeutet
- beschreiben wie man zwei Merkmale in einem Koordinatensystem darstellt
- die Idee einer Trennlinie in eigenen Worten erklären

## Voraussetzungen

- [[Warum KI|Warum KI?]] - Warum klassische Programme bei bestimmten Aufgaben versagen

---

## Das Problem

Du hast zwei Insekten vor dir: einen Marienkäfer und eine Raupe. Du misst bei jedem Tier zwei Dinge, die Breite und die Länge. Marienkäfer sind eher breit und kurz. Raupen sind eher schmal und lang.

Jetzt kommt ein neues, unbekanntes Insekt. Du misst es. Kannst du allein aus Breite und Länge entscheiden, um welches Tier es sich handelt?

## Zwei Merkmale, ein Koordinatensystem

Breite und Länge lassen sich als Punkt in einem Koordinatensystem darstellen. Die x-Achse zeigt die Breite, die y-Achse die Länge. Jedes gemessene Insekt wird zu einem Punkt.

Bild anzeigen _Quelle: [Quelle einfügen] — Lizenz: [z.B. CC BY 4.0 / eigene Erstellung]_

> [!example] 
> Marienkäfer und Raupe im Koordinatensystem Der Marienkäfer hat Breite 3 und Länge 1 — er landet unten rechts im Koordinatensystem. Die Raupe hat Breite 1 und Länge 3, sie landet oben links. Die beiden Punkte liegen weit auseinander. Genau das macht dieses Problem lösbar.

Mit mehr Messpunkten entsteht ein Muster: Marienkäfer sammeln sich in einer Ecke, Raupen in einer anderen.

## Die Idee der Trennlinie

Wenn zwei Gruppen in verschiedenen Ecken des Koordinatensystems liegen, kannst du eine Linie dazwischen ziehen. Alles auf der einen Seite der Linie ist ein Marienkäfer, alles auf der anderen Seite eine Raupe.

Ein neues unbekanntes Insekt trägst du als Punkt ein. Du schaust auf welcher Seite der Linie es liegt und hast deine Antwort.

Das klingt fast zu einfach. Und für zwei Punkte ist es das auch. Die Frage ist: Wo genau ziehst du die Linie? Und was passiert wenn du zwanzig Messpunkte hast statt zwei?

Darum geht es in [[B2 - Die Trennlinie als Gleichung]]: Die Linie bekommt eine Formel, und der Computer lernt selbst wo er sie hinzieht.

## Klassifikation

> [!info] 
> Klassifikation Klassifikation (Einordnung) bedeutet: Ein Objekt einer von mehreren Gruppen zuordnen. Im Beispiel oben gibt es zwei Gruppen — Marienkäfer und Raupe. Das unbekannte Insekt wird klassifiziert indem man prüft auf welcher Seite der Trennlinie es liegt. Klassifikation ist eine der häufigsten Aufgaben in der KI, von Spam-Erkennung bis zur medizinischen Diagnose.

Im Alltag klassifiziert KI ständig:

- Dein E-Mail-Programm trennt Spam von normalen Mails
- Eine App erkennt ob ein Hautfleck auf einem Foto bedenklich aussieht
- Ein Kreditinstitut entscheidet ob ein Kredit gewährt wird

In jedem Fall steckt dieselbe Grundidee dahinter: Merkmale messen, als Punkt darstellen, Seite der Trennlinie prüfen.

---

> [!summary] 
> Das Wichtigste Klassifikation ordnet ein Objekt einer Gruppe zu. Zwei Merkmale lassen sich als Punkt in einem Koordinatensystem darstellen. Eine Trennlinie teilt das Koordinatensystem in zwei Bereiche. Ein unbekanntes Objekt wird klassifiziert indem man prüft auf welcher Seite es liegt.

## Verbindungen zu anderen Themen

|Thema|Verbindung|
|---|---|
|[[Warum KI\|Warum KI?]]|Motivation: Warum klassische Regeln bei solchen Problemen versagen|
|[[B2 - Die Trennlinie als Gleichung]]|Die Trennlinie bekommt eine Formel|
|[[B3 - Lernen durch Fehler]]|Wie der Computer selbst lernt wo er die Linie hinzieht|