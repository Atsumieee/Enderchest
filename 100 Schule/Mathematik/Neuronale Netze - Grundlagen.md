---
title: "Neuronale Netze — Grundlagen und roter Faden"
tags: [mathematik, schule]
created: 2026-06-02
status: permanent
publish: true
todo: false
---
# Neuronale Netze — Grundlagen und roter Faden

## Überblick

Ein **neuronales Netz** ist ein Programm, das aus Beispielen lernt, statt fest programmiert zu werden. Man zeigt ihm viele Beispiele („das ist ein Marienkäfer, das eine Raupe"), und es stellt sich selbst so ein, dass es danach auch neue Fälle richtig einordnet.

Diese Notiz ist der **Einstieg und rote Faden** für die ganze Serie. Sie erklärt die Grundbausteine — Neuron, Gewicht, Lernen, Schicht — und zeigt, wie die vier aufeinander aufbauenden Lektionen zusammenpassen. Du brauchst kein Vorwissen; jeder Begriff wird zuerst in einfachen Worten erklärt.

> **Merkhilfe:** Ein neuronales Netz ist kein „Gehirn". Es ist eine Maschine, die durch ständiges *Raten → Fehler messen → ein bisschen nachjustieren* immer besser wird.

---

## Inhalt

### 1. Die Grundidee: Lernen statt Programmieren

Bei klassischem Programmieren schreibst du die Regel selbst: *„Wenn breiter als 2, dann Marienkäfer."* Beim maschinellen Lernen gibst du **keine Regel** vor. Du gibst nur Beispiele, und das Netz findet die Regel selbst, indem es eine Stellschraube immer wieder leicht verstellt, bis die Beispiele passen.

Das ist der gemeinsame Kern aller vier Notizen — nur wird er Schritt für Schritt realistischer.

### 2. Das Neuron — der kleinste Baustein

Ein **Neuron** ist eine winzige Rechenstelle. Es nimmt Eingaben, multipliziert sie mit **Gewichten**, zählt alles zusammen und entscheidet dann: „feuere ich oder nicht?"

In der Serie ist die Trennlinie `y = A · x` genau so ein einzelnes Neuron:
- die Eingabe ist die Breite `x`
- das **Gewicht** ist die Steigung `A`
- die Entscheidung ist: liegt der Punkt über oder unter der Linie?

> **Merkhilfe:** Ein Gewicht ist nichts Geheimnisvolles — es ist einfach die Zahl, an der das Netz dreht, um besser zu werden. In Lektion 1–3 ist das die Steigung `A`.

### 3. Wie ein Netz lernt — die Lernregel

Das Lernen folgt immer demselben Vierschritt:

1. **Raten** — das Netz gibt mit den aktuellen Gewichten eine Antwort
2. **Fehler messen** — wie weit liegt die Antwort daneben? (die *Lücke*)
3. **Anpassen** — Gewichte ein kleines Stück in die richtige Richtung verschieben
4. **Wiederholen** — mit dem nächsten Beispiel von vorne

Die konkrete Lernregel der Serie:

```
neue Steigung = alte Steigung + Lernrate × (Lücke / Breite)
```

Die **Lernrate** steuert dabei, wie mutig jeder Schritt ist. Dieses „schrittweise in Richtung weniger Fehler bewegen" ist das Herz von maschinellem Lernen (Fachbegriff: *Gradientenabstieg*).

### 4. Training, Runden und Verallgemeinern

Ein einzelnes Beispiel reicht nicht. Das Netz läuft viele Male durch **alle** Trainingsdaten — jeder solche Durchlauf ist eine **Runde** (Epoche). Nach genügend Runden sitzen die Gewichte so, dass das Netz auch **neue, ungesehene Fälle** richtig einordnet. Dieses Übertragen auf Neues nennt man **Verallgemeinern** — und es ist der eigentliche Sinn des Trainings.

### 5. Warum mehrere Schichten?

Ein einzelnes Neuron (eine Linie) kann nur Probleme lösen, die sich mit einer Geraden trennen lassen (*linear trennbar*). Manche Aufgaben — wie XOR — können das nicht. Die Lösung: mehrere Neuronen in **Schichten** anordnen. Eine **versteckte Schicht** zwischen Eingabe und Ausgabe kombiniert mehrere einfache Teilentscheidungen zu einer komplexeren. So entsteht aus einzelnen Linien ein echtes Netz.

> **Merkhilfe:** Eine Linie = eine Entscheidung. Mehrere Schichten = mehrere Entscheidungen, die zusammenarbeiten.


```widget
llm_von_trennlinie_zu_llm
```

### 6. Der Lernpfad durch diese Serie

So bauen die vier Notizen aufeinander auf:

| # | Notiz | Was neu dazukommt |
|---|-------|-------------------|
| 1 | [[Neuronale Netze 1 - Eine Trennlinie lernen]] | Ein Neuron, die Lernregel, der Begriff Fehler/Lücke |
| 2 | [[Neuronale Netze 2 - Mehr Trainingspunkte]] | Viele Daten, automatische Lernschleife, Runden, Verallgemeinern |
| 3 | [[Neuronale Netze 3 - Gute und schlechte Lernraten]] | Die Lernrate richtig wählen — Tempo gegen Stabilität |
| 4 | [[Neuronale Netze 4 - XOR und mehrere Schichten]] | Grenzen einer Linie, mehrere Schichten, der Schritt zum echten Netz |

Empfehlung: in dieser Reihenfolge lesen. Jede Notiz setzt die vorherige voraus.

---

## Schlüsselbegriffe

- **Neuronales Netz**: Ein Programm, das aus Beispielen lernt, indem es Stellschrauben (Gewichte) schrittweise anpasst.
- **Neuron**: Kleinste Rechenstelle; gewichtet Eingaben und trifft eine einfache Entscheidung.
- **Gewicht**: Die Zahl, an der das Netz dreht, um besser zu werden (in der Serie: die Steigung A).
- **Lernrate**: Steuert, wie stark die Gewichte pro Schritt verändert werden.
- **Gradientenabstieg**: Das schrittweise Bewegen in Richtung kleinerer Fehler.
- **Verallgemeinern**: Gelerntes korrekt auf neue, ungesehene Fälle übertragen.
- **Linear trennbar**: Problem, das eine einzige Gerade lösen kann.
- **Versteckte Schicht**: Zwischenschicht aus mehreren Neuronen, die komplexere Entscheidungen ermöglicht.

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[Neuronale Netze 1 - Eine Trennlinie lernen]] | Erste konkrete Umsetzung: ein Neuron lernt |
| [[Neuronale Netze 2 - Mehr Trainingspunkte]] | Macht aus einem Schritt einen echten Trainingsprozess |
| [[Neuronale Netze 3 - Gute und schlechte Lernraten]] | Vertieft die wichtigste Stellschraube des Trainings |
| [[Neuronale Netze 4 - XOR und mehrere Schichten]] | Erweitert ein Neuron zum mehrschichtigen Netz |
| [[Mathematik Übersicht]] | Übergeordnete Fachübersicht |

---

## Quellen & Links
- Serie "Neuronale Netze" (Colab 1–4) — Markus Ineichen
- [Theorie Neuronale Netze](https://github.com/IneichenEdulu/NNML/blob/main/Neuronale_Netze.md)
- [Lernzettel neuronale Netze](https://github.com/IneichenEdulu/NNML/blob/main/Lernzettel_neuronale_Netze.md)


```widget
forward_pass_deep_dive_fixed
```


---

```widget
text_zu_antwort_pipeline
```