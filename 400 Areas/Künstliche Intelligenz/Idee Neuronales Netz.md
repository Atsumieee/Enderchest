---
Description: Vom echten Neuron im Gehirn zur abstrakten Recheneinheit — wie Biologen und Mathematiker gemeinsam die Grundlage der modernen KI legten.
Title: Die Idee hinter neuronalen Netzen
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


# Die Idee hinter neuronalen Netzen

## Lernziele

Nach diesem Artikel kannst du...

- erklären woher die Idee eines "künstlichen Neurons" stammt
- den Weg vom echten Neuron zur abstrakten Recheneinheit nachvollziehen
- einordnen warum KI kein linearer Fortschritt war, sondern einen langen Umweg genommen hat

## Voraussetzungen

- [[Warum KI?]] — Warum klassische Programme bei bestimmten Aufgaben versagen

---

## Das Vorbild: Ein echtes Neuron

Dein Gehirn besteht aus etwa 86 Milliarden Nervenzellen, sogenannten Neuronen. Jedes Neuron ist mit tausenden anderen verbunden. Es empfängt Signale von seinen Nachbarn, summiert sie, und schickt ein Signal weiter, aber nur wenn die Summe gross genug ist.

Bild anzeigen _Quelle: [Quelle einfügen] — Lizenz: [z.B. CC BY 4.0 / eigene Erstellung]_

Diese Eigenschaft ist der Kern: Ein Neuron feuert erst ab einer bestimmten Schwelle. Darunter passiert nichts, darüber wird das Signal weitergegeben. Aus diesem Prinzip entsteht, zusammengeschaltet mit Milliarden anderer Neuronen, die Fähigkeit zu denken und zu erinnern.

## 1943: Die erste Abstraktion

Der Neurologe Warren McCulloch und der Mathematiker Walter Pitts stellten sich 1943 eine Frage: Was wenn man dieses Prinzip auf dem Papier nachbaut, ohne die Biologie?

> [!info] 
> McCulloch & Pitts (1943) Die beiden beschrieben das erste mathematische Modell eines Neurons. Eine Recheneinheit bekommt mehrere Eingaben, summiert sie, und gibt eine Ausgabe,  aber nur wenn die Summe eine Schwelle überschreitet. Kein Blut, keine Chemie, nur Zahlen.

Ihr Modell konnte nichts lernen. Es zeigte aber, dass sich Denkprozesse grundsätzlich in Mathematik übersetzen lassen und das war der entscheidende Schritt.
![[mcculloch_pitt_neuron.webp|696]]


## 1958: Das erste lernende Modell

Frank Rosenblatt baute die Idee weiter aus. Er entwickelte den **Perceptron** (Wahrnehmungseinheit), das erste Modell das nicht nur rechnen, sondern auch lernen konnte.

Das Perceptron bekommt Eingaben, gewichtet sie, und passt diese Gewichte schrittweise an — genau wie die Trennlinie aus [[B2 - Die Trennlinie als Gleichung]] ihre Steigung anpasst. Rosenblatt trainierte sein Modell darauf, einfache Bilder zu unterscheiden.

Die Presse übertrieb stark: Die New York Times schrieb, die Marine habe eine Maschine erfunden die denken, sprechen und sich selbst reproduzieren könne. Die Forschung war davon weit entfernt.

## Der erste KI-Winter

> [!warning] 
> KI ist kein linearer Fortschritt 1969 zeigten Marvin Minsky und Seymour Papert mathematisch, dass ein einzelnes Perceptron grundlegende Probleme nicht lösen kann — zum Beispiel das [[XOR-Problem]], das du in [[C2 - Lineare Trennbarkeit]] kennenlernst. Die Forschungsgelder wurden gestrichen. Dieser Einbruch dauerte über ein Jahrzehnt und wird heute als "erster KI-Winter" bezeichnet.

Das Problem war nicht die Grundidee. Ein einzelnes Neuron kann schlicht zu wenig. Mehrere Schichten übereinander hätten geholfen, aber die Methode um solche Netze zu trainieren fehlte noch.

## 1986: Schichten lernen

Die fehlende Methode hiess [[Backpropagation]] (Rückwärtsdurchlauf). Sie verteilt den Fehler eines Netzes rückwärts durch alle Schichten und macht so auch tiefe Netze trainierbar. Rumelhart, Hinton und Williams machten das Verfahren 1986 einer breiten Öffentlichkeit zugänglich.

Trotzdem blieben neuronale Netze jahrzehntelang eine Nischentechnologie. Datensätze waren zu klein, Rechner zu langsam.

## 2012: ImageNet

Beim ImageNet-Wettbewerb 2012 — einem jährlichen Vergleich von Bilderkennungssystemen — gewann ein tiefes neuronales Netz namens AlexNet mit einem Vorsprung der alle überraschte. Der Fehler des zweitplatzierten Systems lag bei 26 %. AlexNet erreichte 15 %.

Ab diesem Punkt investierten Forschung und Industrie massiv in neuronale Netze. Drei Dinge kamen zusammen: grosse Datensätze, günstige Grafikkarten und verbesserte Trainingsverfahren.

---

> [!summary] Das Wichtigste McCulloch und Pitts übersetzten das echte Neuron 1943 in Mathematik. Rosenblatt baute 1958 das erste lernende Modell daraus. Jahrzehntelange Rückschläge folgten, weil ein einzelnes Neuron zu wenig kann und die Trainingsmethoden für tiefe Netze fehlten. Erst 2012 wurden neuronale Netze zum Standard — getrieben von Daten, Rechenleistung und Backpropagation.

## Verbindungen zu anderen Themen

|Thema|Verbindung|
|---|---|
|[[Warum KI?]]|Motivation: Warum klassische Programme versagen|
|[[B2 - Die Trennlinie als Gleichung]]|Das Perceptron ist die mathematische Grundlage der Trennlinie|
|[[C2 - Lineare Trennbarkeit]]|Der Schwachpunkt des einzelnen Perceptrons|
|[[Backpropagation]]|Die Methode die tiefe Netze trainierbar machte|

## Quellen & Links

- [McCulloch, Pitts (1943) — A Logical Calculus of Ideas Immanent in Nervous Activity](https://www.cs.cmu.edu/~./epxing/Class/10715/reading/McCulloch.and.Pitts.pdf)
- [ImageNet Large Scale Visual Recognition Challenge](https://image-net.org/challenges/LSVRC/)
- 