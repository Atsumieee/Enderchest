---
title: "Aktivierungsfunktionen" 
description: "Wie ein Neuron aus der gewichteten Summe eine Ausgabe macht und warum eine weiche Entscheidung oft besser ist als eine harte." 
tags: [ki, konzept, schule] 
created: 2026-06-12 
status: permanent 
publish: true 
todo: false 
moc: false
---
## Lernziele

Nach diesem Artikel kannst du...

- erklären wozu eine Aktivierungsfunktion dient
- die Stufenfunktion auf eine gewichtete Summe anwenden
- den Unterschied zwischen Stufen- und Sigmoidfunktion beschreiben
- begründen warum weiche Entscheidungen beim Lernen helfen

## Voraussetzungen

- [[Erstes Neuron|Eingaben, Gewichte, Summe]] — Die gewichtete Summe

---

## Was nun mit der Summe?

In [[Erstes Neuron|Eingaben, Gewichte, Summe]] hat unser Neuron die gewichtete Summe `1.05` berechnet. Diese Zahl ist aber noch keine brauchbare Antwort. Wir wollten ja eine Entscheidung: Marienkäfer oder Raupe, 0 oder 1.

Die Aktivierungsfunktion macht aus der Summe die Ausgabe.

> [!info] Aktivierungsfunktion (Activation Function) 
> Die Aktivierungsfunktion ist der letzte Schritt in einem Neuron. Sie nimmt die gewichtete Summe und wandelt sie in die Ausgabe um. Sie entscheidet ob und wie stark das Neuron reagiert. Ohne sie wäre ein Neuron nur eine Addition und könnte keine Entscheidungen treffen.

Es gibt verschiedene Aktivierungsfunktionen. Wir schauen uns die zwei wichtigsten an: die Stufenfunktion und die Sigmoidfunktion.

## Die Stufenfunktion: hart

Die Stufenfunktion ist eine harte Ja-Nein-Entscheidung. Sie hat eine Schwelle. Liegt die Summe darunter, kommt 0 heraus. Erreicht oder überschreitet die Summe die Schwelle, kommt 1 heraus.

Das ist wie ein Lichtschalter: aus oder an, nichts dazwischen.

> [!example] Stufenfunktion auf unser Beispiel 
> Unsere gewichtete Summe ist `1.05`. Die Schwelle setzen wir auf `1.0`.
> 
> Ist `1.05` grösser oder gleich `1.0`? Ja.
> 
> Also gibt das Neuron `1` aus. Die harte Entscheidung lautet: an.

Hätte die Summe `0.95` betragen, wäre sie unter der Schwelle gelegen und das Neuron hätte `0` ausgegeben. Der Übergang ist abrupt: Bei `0.99` noch 0, bei `1.0` schon 1.

## Die Sigmoidfunktion: weich

Die Sigmoidfunktion macht etwas Ähnliches, aber viel weicher. Auch sie schaut auf die Summe, aber statt nur 0 oder 1 liefert sie jeden Zwischenwert zwischen 0 und 1.

So verhält sie sich:

- Bei einer sehr kleinen Summe liegt die Ausgabe nahe bei 0
- Bei einer mittleren Summe liegt sie irgendwo dazwischen
- Bei einer grossen Summe liegt sie nahe bei 1

Statt eines Schalters ist die Sigmoidfunktion ein Regler. Sie kann Ausgaben liefern wie:

- `0.20` → eher nein
- `0.48` → unklar, mittel
- `0.74` → eher ja
- `0.95` → fast sicher ja

![[KI_Funktionen_vergleich.png|697]]
## Warum weich oft besser ist

Eine weiche Ausgabe trägt mehr Information als eine harte. Sie sagt nicht nur ob, sondern wie sicher. Ein Wert von `0.95` bedeutet fast sicher ja, ein Wert von `0.55` bedeutet eher ja, aber knapp. Diese Abstufung geht bei der Stufenfunktion verloren, dort wäre beides einfach `1`.

Es gibt aber einen tieferen Grund, der mit dem Training zu tun hat.

Beim Training passt das Netz seine Gewichte in kleinen Schritten an, wie in [[Lernen durch Fehler]]. Damit das funktioniert, muss eine kleine Änderung an einem Gewicht auch eine kleine Änderung der Ausgabe bewirken. Genau das leistet die weiche Sigmoidfunktion: Drehst du ein Gewicht ein bisschen, verschiebt sich die Ausgabe ein bisschen.

Bei der Stufenfunktion ist das anders. Solange die Summe nicht über die Schwelle kippt, ändert sich die Ausgabe gar nicht, sie bleibt 0. Kippt die Summe dann über die Schwelle, springt die Ausgabe schlagartig auf 1. Es gibt kein "ein bisschen besser". Das Netz bekommt keine Rückmeldung in welche Richtung es seine Gewichte drehen soll. Mit harten Stufen lässt sich kaum lernen.

## Vergleich

> **Merkhilfe:** Die Stufenfunktion ist ein Lichtschalter, aus oder an. Die Sigmoidfunktion ist ein Dimmer, stufenlos von dunkel bis hell.

Die Stufenfunktion ist einfach zu verstehen und gut um das Prinzip zu zeigen. Die Sigmoidfunktion ist das was man in der Praxis braucht, weil sie Zwischenwerte liefert und das Training ermöglicht.

Jetzt haben wir alle Teile eines Neurons: Eingaben, Gewichte, Summe und Aktivierung. Im nächsten Schritt verschalten wir mehrere Neuronen zu einem kleinen Netz. Das ist das Thema von [[D3 - Vom Neuron zum Netz]].

---

> [!summary] Das Wichtigste 
> Die Aktivierungsfunktion macht aus der gewichteten Summe die Ausgabe des Neurons. Die Stufenfunktion entscheidet hart: unter der Schwelle 0, ab der Schwelle 1. Die Sigmoidfunktion entscheidet weich und liefert Zwischenwerte zwischen 0 und 1, die ausdrücken wie sicher das Neuron ist. Weiche Funktionen sind beim Training nötig, weil nur dann eine kleine Änderung am Gewicht eine kleine Änderung der Ausgabe bewirkt.

## Schlüsselbegriffe

- **Aktivierungsfunktion**: Der Schritt der aus der gewichteten Summe die Ausgabe macht.
- **Stufenfunktion**: Harte Aktivierung, liefert nur 0 oder 1 je nach Schwelle.
- **Sigmoidfunktion**: Weiche Aktivierung, liefert Zwischenwerte zwischen 0 und 1.
- **Schwelle**: Der Wert ab dem die Stufenfunktion von 0 auf 1 springt.

## Verbindungen zu anderen Themen

|Thema|Verbindung|
|---|---|
|[[D1 - Eingaben, Gewichte, Summe]]|Woher die gewichtete Summe kommt|
|[[B3 - Lernen durch Fehler]]|Warum weiche Übergänge das Training ermöglichen|
|[[D3 - Vom Neuron zum Netz]]|Aktivierung in einem Netz aus mehreren Neuronen|
|[[F2 - Andere Aktivierungsfunktionen]]|ReLU und warum Sigmoid in tiefen Netzen Probleme macht|