---
Description: Warum klassische Programme bei bestimmten Aufgaben versagen und was maschinelles Lernen anders macht.
Title: Warum KI?
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

- erklären, warum klassische Programme bei bestimmten Aufgaben versagen
- den Unterschied zwischen "Regeln programmieren" und "aus Beispielen lernen" in eigenen Worten beschreiben

## Voraussetzungen

Keine Vorkenntnisse nötig.

---

## Ein Programm ist ein Rezept

Stell dir vor, du schreibst ein Programm das prüft, ob eine Zahl gerade ist. Du schreibst: "Teile die Zahl durch 2. Bleibt kein Rest, ist sie gerade." Fertig. Das Programm folgt deinem Rezept und liefert jedes Mal die richtige Antwort.

Klassische Programme funktionieren so. Du als Entwickler kennst die Regeln, schreibst sie auf, und der Computer führt sie aus. Das klappt gut, solange die Regeln klar formulierbar sind.

## Das Rezept versagt

Schreibe jetzt ein Programm das erkennt, ob auf einem Foto eine Katze zu sehen ist.

Erste Idee: "Prüfe ob das Tier spitze Ohren hat." Aber was ist mit Hunden? Die haben auch spitze Ohren. Also ergänzt du: "...und Schnurrhaare." Aber was wenn die Katze von der Seite fotografiert wurde und die Schnurrhaare nicht sichtbar sind?

> [!example] 
> Das Regelwerk bricht zusammen Du kannst Regeln stapeln so lange du willst. Für jede neue Regel findest du ein Foto, das sie bricht. Nicht weil du schlechte Regeln schreibst, sondern weil "Katze" kein Regelwerk ist. Es ist ein Konzept das du durch tausende gesehener Katzen verinnerlicht hast, ohne es je in Worte gefasst zu haben.

Dasselbe Problem taucht überall auf:

- Spam-E-Mails erkennen: Spammer passen ihren Text laufend an
- Gesprochene Sprache verstehen: Jeder Mensch spricht anders
- Handgeschriebene Ziffern lesen: Kein "9" sieht aus wie ein anderes

## Der andere Ansatz

Anstatt dem Computer Regeln zu geben, gibst du ihm Beispiele.

Tausende Fotos, beschriftet mit "Katze" oder "keine Katze". Das Programm schaut sich diese Beispiele an, findet selbst Muster, und entwickelt eine eigene interne Regel, die du nie explizit geschrieben hast.

Dieser Ansatz heisst [[Maschinelles Lernen]]. Das Programm lernt aus Daten statt aus deinen Anweisungen.

Das klingt einfach, wirft aber sofort eine Frage auf: Wie genau "findet" ein Programm Muster in Daten? Die Antwort führt direkt zu [[Idee Neuronales Netz|Neuronale Netze - Einführung]].

## KI heute

Diesen Ansatz findest du überall:

- Sprachassistenten wie Siri oder Google verstehen deine Aussprache, weil sie auf Millionen Sprachaufnahmen trainiert wurden
- Netflix empfiehlt Filme weil das System aus dem Verhalten von Millionen Nutzern gelernt hat
- Dein E-Mail-Programm sortiert Spam aus ohne dass jemand eine Regel für jede neue Spam-Masche geschrieben hat

---

> [!summary] 
> Das Wichtigste Klassische Programme folgen Regeln die ein Mensch aufschreibt. Viele Alltagsprobleme lassen sich aber nicht in klare Regeln fassen. Maschinelles Lernen löst das: Du gibst dem Computer Beispiele statt Regeln, und er findet selbst Muster in den Daten.

## Verbindungen zu anderen Themen

| Thema                                                   | Verbindung                                                   |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| [[Maschinelles Lernen]]                                 | Vertiefung: Was "Lernen" für einen Computer konkret bedeutet |
| [[Idee Neuronales Netz \|Neuronale Netze - Einführung]] | Woher die Idee kommt, ein Gehirn nachzubauen                 |
