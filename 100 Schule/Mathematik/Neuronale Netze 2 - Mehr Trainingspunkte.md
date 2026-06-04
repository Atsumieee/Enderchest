---
title: "Neuronale Netze 2 — Mehr Trainingspunkte und die automatische Lernschleife"
tags: [mathematik, schule]
created: 2026-06-02
status: permanent
publish: true
todo: false
---

# Neuronale Netze 2 — Mehr Trainingspunkte und die Lernschleife

## Überblick

In [[Neuronale Netze 1 - Eine Trennlinie lernen]] haben wir die Steigung der Trennlinie noch fast von Hand mit zwei Punkten angepasst. Jetzt geht es einen Schritt weiter: Wir geben dem Computer **viele** Marienkäfer und Raupen und lassen ihn **dieselbe kleine Lernregel immer wieder selbst anwenden**.

Dieses automatische Wiederholen nennt man eine **Lernschleife**. Es ist der Moment, in dem aus vielen winzigen Korrekturen ein echter Lernprozess wird — und am Ende kann die Linie sogar Insekten einordnen, die sie nie gesehen hat.

---

## Inhalt

### 1. Viele Trainingspunkte statt zwei

Statt zwei sicheren Beispielen nehmen wir jetzt mehrere Messungen — z.B. 6 Marienkäfer und 6 Raupen. Marienkäfer sind tendenziell breiter und kürzer, Raupen schmaler und länger. Mehr Punkte geben der Linie mehr Orientierung, wo genau die Grenze liegen soll.

### 2. Die Lernregel bleibt gleich

```
neue Steigung = alte Steigung + Lernrate × (Lücke / Breite)
```

Neu ist nur, dass der Computer diese Regel automatisch auf jeden Punkt anwendet. Die Startwerte hier: `A = 0.25`, Lernrate `0.02`, Sicherheitsabstand `0.15`.

### 3. Was ist eine "Runde"?

> **Merkhilfe:** Eine **Runde** = einmal durch *alle* Trainingspunkte durch.

Der Computer arbeitet Punkt für Punkt: anschauen → Lücke berechnen → A ein winziges Stück anpassen. Wenn er alle Punkte einmal durchhat, ist eine Runde fertig. Dann fängt er von vorne an. (Im echten maschinellen Lernen heisst eine solche Runde **Epoche**.)

### 4. Die Linie wird Runde für Runde besser

So entwickelt sich die Trefferquote (wie viele der 12 Punkte richtig getrennt sind):

| Runde | Steigung A | richtig getrennt | Trefferquote |
|-------|-----------|------------------|--------------|
| 0 (Start) | 0.25 | 6 / 12 | 50 % |
| 1 | 0.46 | 6 / 12 | 50 % |
| 2 | 0.62 | 8 / 12 | 67 % |
| 3 | 0.75 | 12 / 12 | 100 % |
| 8 | 1.08 | 12 / 12 | 100 % |

Wichtig: Die Linie springt nicht in einem Riesensatz ans Ziel, sondern nähert sich in vielen kleinen Schritten. Ab Runde 3 sitzt sie perfekt; danach wird sie nur noch leicht feiner.

### 5. Eine Beobachtung zur Breite

Weil in der Formel durch die **Breite** geteilt wird, lösen Raupen (kleine Breite) bei gleicher Lücke grössere Änderungen aus als Marienkäfer (grosse Breite). Das ist kein Fehler, sondern eine direkte Folge der einfachen Lernregel.

### 6. Vorhersage für unbekannte Insekten

Sobald die Linie trainiert ist, kann man neue Punkte einordnen, die *nicht* im Training waren: Liegt der Punkt über der Linie → Raupe, darunter → Marienkäfer. Genau das ist der Sinn des Trainings — auf Neues verallgemeinern zu können.

---

## Schlüsselbegriffe

- **Trainingspunkt**: Ein einzelnes Beispiel (ein Insekt mit Breite und Länge), aus dem die Linie lernt.
- **Lernschleife**: Das automatische, wiederholte Anwenden der Lernregel.
- **Runde (Epoche)**: Einmal durch alle Trainingspunkte hindurch.
- **Trefferquote**: Anteil der Punkte, die aktuell richtig getrennt werden.
- **Vorhersage**: Einordnung eines neuen, nicht trainierten Punktes mit der gelernten Linie.

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[Neuronale Netze 1 - Eine Trennlinie lernen]] | Grundlage: die Lernregel und die Idee der Trennlinie |
| [[Neuronale Netze 3 - Gute und schlechte Lernraten]] | Nutzt genau dieselben Trainingsdaten, variiert aber die Lernrate |
| [[Mathematik Übersicht]] | Übergeordnete Fachübersicht |

---

## Quellen & Links
- Colab 2: "Mehr Trainingspunkte und automatische Lernschleife" — Markus Ineichen
- [Theorie Neuronale Netze](https://github.com/IneichenEdulu/NNML/blob/main/Neuronale_Netze.md)
- [Lernzettel neuronale Netze](https://github.com/IneichenEdulu/NNML/blob/main/Lernzettel_neuronale_Netze.md)
