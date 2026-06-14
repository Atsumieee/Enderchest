---
title: "Mehr Daten, mehr Sicherheit" 
description: "Warum eine Trennlinie viele Trainingspunkte braucht und was passiert wenn sie die Daten nur auswendig lernt." 
tags: [ki, konzept, schule] 
created: 2026-06-12 
status: permanent 
publish: true 
todo: false 
moc: false
---
# Mehr Daten, mehr Sicherheit

## Lernziele

Nach diesem Artikel kannst du...

- erklären warum wenige Trainingspunkte zu einer unzuverlässigen Linie führen
- den Unterschied zwischen Trainings- und Testdaten beschreiben
- in eigenen Worten erklären was Overfitting bedeutet

## Voraussetzungen

- [[Lernen durch Fehler]] — Wie der Computer die Steigung schrittweise verfeinert

---

## Eine Linie für zwei Punkte ist Glückssache

In [[Lernen durch Fehler]] haben wir die Linie an einem Marienkäfer und einer Raupe trainiert. Das Problem dabei: Durch zwei Punkte lassen sich beliebig viele Linien legen, die beide korrekt trennen.

Stell dir vor, du hast nur diese zwei Insekten gemessen. Die trainierte Linie trennt sie sauber. Dann kommt ein drittes Insekt, das knapp neben der Linie liegt, und wird falsch einsortiert. Die Linie hat zufällig für die zwei bekannten Punkte gepasst, aber nicht für die Wirklichkeit.

## Mehr Punkte zwingen die Linie in Form

Je mehr Insekten du misst und einträgst, desto weniger Spielraum hat die Linie. Mit zwanzig Marienkäfern und zwanzig Raupen gibt es nur noch wenige Linien die alle korrekt trennen. Die Linie wird in die Lage gezwungen die tatsächlich zwischen den beiden Gruppen liegt.

>Zwei Koordinatensysteme nebeneinander: links wenige Punkte mit einer unsicher liegenden Trennlinie, rechts viele Punkte mit einer stabil zwischen den Gruppen liegenden Trennlinie
![[KI_Trainingsdaten.png]]
>*Created with matplotlib*

Mehr Daten bedeuten also nicht nur mehr Arbeit, sondern eine zuverlässigere Trennung. Das ist einer der Gründe warum moderne KI-Systeme mit riesigen Datenmengen trainiert werden.

## Hat die Linie wirklich gelernt?

Eine Linie die alle Trainingspunkte korrekt trennt, sieht erstmal gut aus. Aber das eigentliche Ziel ist, neue unbekannte Insekten richtig einzuordnen. Wie prüft man das?

> [!info] Trainingsdaten und Testdaten 
> Die gemessenen Insekten werden in zwei Gruppen geteilt. Mit den Trainingsdaten lernt die Linie ihre Lage. Die Testdaten hält man zurück und zeigt sie der Linie erst am Ende. Schneidet die Linie bei den Testdaten gut ab, hat sie das Muster wirklich gelernt. Schneidet sie schlecht ab, hat sie nur die Trainingspunkte auswendig gelernt.

Die Testdaten sind der ehrliche Prüfstein. Sie zeigen ob die Linie verallgemeinert oder nur memoriert.

## Wenn die Linie auswendig lernt

> [!warning] Overfitting 
> Overfitting (Überanpassung) bedeutet, dass ein Modell die Trainingsdaten zu genau lernt, samt aller Zufälle und Messfehler. Es trennt die Trainingspunkte perfekt, versagt aber bei neuen Daten. Ein überangepasstes Modell hat die Beispiele auswendig gelernt statt das zugrunde liegende Muster zu verstehen. Mehr Trainingsdaten und einfachere Modelle helfen dagegen.

Bei der einfachen Trennlinie aus dem Insekten-Beispiel ist Overfitting kaum möglich, weil eine Gerade sehr einfach ist. Sobald Modelle komplexer werden, wird Overfitting zu einem der wichtigsten Probleme im maschinellen Lernen. Mehr dazu in [[F3 - Overfitting und Generalisierung]].

## Die nächste Stellschraube

Mit genug Daten findet die Linie eine gute Lage. Aber wie schnell sie das tut, hängt von der Lernrate ab, die wir in [[Lernen durch Fehler]] eingeführt haben.

Was passiert wenn die Lernrate zu klein oder zu gross gewählt wird, ist das Thema von [[Lernrate|Die Lernrate]].

---

> [!summary] Das Wichtigste 
> Wenige Trainingspunkte ergeben eine unzuverlässige Linie, weil viele Linien zufällig passen. Mehr Daten zwingen die Linie in die richtige Lage. Mit Testdaten prüft man ob die Linie das Muster wirklich gelernt hat oder nur auswendig. Lernt ein Modell die Trainingsdaten zu genau und versagt bei neuen Daten, spricht man von Overfitting.

## Verbindungen zu anderen Themen

| Thema                                    | Verbindung                                        |
| ---------------------------------------- | ------------------------------------------------- |
| [[Lernen durch Fehler]]                  | Wie die Linie an einzelnen Punkten trainiert wird |
| [[Lernrate\|Die Lernrate]]               | Wie schnell die Linie ihre Lage findet            |
| [[F3 - Overfitting und Generalisierung]] | Overfitting bei komplexen Modellen                |




