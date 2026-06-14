---
title: "Die Lernrate" 
description: "Warum die Schrittgrösse beim Training entscheidend ist und was bei einer zu kleinen oder zu grossen Lernrate passiert." 
tags: [ki, konzept, schule] 
created: 2026-06-12 
status: permanent
publish: true 
todo: false
moc: false
---

## Lernziele

Nach diesem Artikel kannst du...

- die drei Fälle einer zu kleinen, passenden und zu grossen Lernrate beschreiben
- erklären warum eine möglichst grosse Lernrate keine gute Idee ist

## Voraussetzungen

- [[Lernen durch Fehler]] — Die Update-Regel und der Begriff Lernrate

---

## Was die Lernrate macht

In [[Lernen durch Fehler]] haben wir die Lernrate eingeführt. Sie steht in der Update-Regel:

```
neue Steigung = alte Steigung + Lernrate * (Lücke / Breite)
```

Die Lernrate legt fest wie gross ein einzelner Lernschritt ist. Sie ist ein Faktor zwischen der reinen Korrektur und dem was tatsächlich an der Steigung verändert wird. Ein kleiner Wert macht kleine Schritte, ein grosser Wert grosse.

Die Wahl der Lernrate entscheidet ob das Training gut funktioniert. Es gibt drei Fälle.

## Zu klein: Lernen dauert ewig

Bei einer sehr kleinen Lernrate, etwa 0.01, verändert sich die Steigung pro Schritt kaum. Die Linie kriecht in winzigen Schritten auf die richtige Lage zu.

Das Training kommt zwar irgendwann an, braucht aber sehr viele Schritte. Bei grossen Datenmengen kostet das viel Zeit und Rechenleistung.

## Genau richtig: Zügig und stabil

Bei einer passenden Lernrate, etwa 0.5, macht die Linie spürbare Schritte und nähert sich zügig der guten Lage an, ohne über das Ziel hinauszuschiessen.

Diese Balance ist das Ziel: schnell genug um effizient zu sein, klein genug um stabil zu bleiben.

## Zu gross: Überschiessen und Pendeln

> [!warning] Viel hilft nicht viel  
> Eine möglichst grosse Lernrate klingt verlockend, weil das Training schneller gehen sollte. Das Gegenteil ist der Fall. Bei einer zu grossen Lernrate, etwa 2.0, überspringt die Linie die richtige Lage bei jedem Schritt. Sie schiesst über das Ziel hinaus, korrigiert in die andere Richtung, schiesst wieder hinaus. Die Steigung pendelt immer stärker und das Training wird unbrauchbar.

Ein zu grosser Schritt macht das Training also nicht schneller, sondern kaputt.

Probiere die drei Fälle selbst aus. Wähle eine Lernrate und starte das Auto-Training. Der rechte Graph zeigt wie sich der Fehler über die Schritte entwickelt.

```widget
widget_b5_lernrate
scale=1.2
width=wide
```

## Es gibt keine universell beste Lernrate

> [!tip] Lernrate finden 
> Die richtige Lernrate hängt vom Problem ab. In der Praxis probiert man verschiedene Werte aus und beobachtet wie sich der Fehler über die Schritte entwickelt. Sinkt der Fehler stetig, passt die Lernrate. Sinkt er zu langsam, ist sie zu klein. Springt er wild, ist sie zu gross. Ein üblicher Startwert liegt zwischen 0.01 und 0.1.

Stell dir vor du suchst den tiefsten Punkt in einem Tal, mit verbundenen Augen. Kleine Schritte bringen dich sicher ans Ziel, aber langsam. Riesige Sprünge katapultieren dich über das Tal hinweg auf die andere Seite, ohne den tiefsten Punkt je zu treffen. Die Lernrate ist die Schrittgrösse bei dieser Suche.

Dieses Bild der Suche nach dem tiefsten Punkt kommt später wieder, bei [[E4 - Gradient Descent]], dem allgemeinen Verfahren hinter dem Training tiefer Netze.

---

> [!summary] Das Wichtigste
> Die Lernrate bestimmt die Schrittgrösse beim Training. Zu klein bedeutet sehr langsames Lernen. Zu gross bedeutet Überschiessen und Pendeln, das Training wird unbrauchbar. Eine passende Lernrate nähert sich zügig und stabil an. Die richtige Wahl hängt vom Problem ab und wird in der Praxis ausprobiert.

## Verbindungen zu anderen Themen

| Thema                                           | Verbindung                                     |
| ----------------------------------------------- | ---------------------------------------------- |
| [[Lernen durch Fehler]]                         | Die Update-Regel in der die Lernrate steht     |
| [[Trainingsdaten\|Mehr Daten, mehr Sicherheit]] | Wie viele Daten die Linie braucht              |
| [[E4 - Gradient Descent]]                       | Die Lernrate im allgemeinen Trainingsverfahren |
