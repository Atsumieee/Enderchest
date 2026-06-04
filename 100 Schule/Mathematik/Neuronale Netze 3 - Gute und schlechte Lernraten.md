---
title: "Neuronale Netze 3 — Gute und schlechte Lernraten"
tags: [mathematik, schule]
created: 2026-06-02
status: permanent
publish: false
todo: false
---

# Neuronale Netze 3 — Gute und schlechte Lernraten

## Überblick

Die **Lernrate** entscheidet, wie mutig wir die Trennlinie bei jedem Schritt verändern. Sie ist eine winzige Zahl in der Lernregel — aber sie hat einen riesigen Einfluss darauf, *ob* und *wie ruhig* die Linie überhaupt ans Ziel kommt.

Diese Notiz vergleicht drei Fälle (zu klein, gut, zu gross) anhand derselben Insekten-Trainingsdaten wie in [[Neuronale Netze 2 - Mehr Trainingspunkte]]. Die Erkenntnis: Eine gute Lernrate ist nicht einfach möglichst gross — sie muss gross genug zum Lernen, aber klein genug für Stabilität sein.

---

## Inhalt

### 1. Wo steckt die Lernrate?

In der bekannten Regel:

```
neue Steigung = alte Steigung + Lernrate × (Lücke / Breite)
```

Die Lernrate ist der Faktor vor der Korrektur. Klein = vorsichtige Schritte, gross = grosse Sprünge. Alle anderen Werte bleiben gleich (`A = 0.25`, Sicherheitsabstand `0.15`, 8 Runden) — wir verändern **nur** die Lernrate.

### 2. Drei Fälle im Vergleich

| Lernrate | Verhalten | richtig am Ende | erste volle Runde (12/12) |
|----------|-----------|-----------------|---------------------------|
| 0.005 (zu klein) | lernt, aber viel zu langsam | 7 / 12 | nie erreicht in 8 Runden |
| 0.02 (gut) | klar, ruhig, zielsicher | 12 / 12 | Runde 3 |
| 1.2 (zu gross) | springt wild hin und her | 7 / 12 | nie stabil |

### 3. Zu kleine Lernrate

Die Steigung A bewegt sich nur in winzigen Schritten (0.25 → 0.30 nach einer ganzen Runde). Die Richtung stimmt, aber nach 8 Runden ist die Linie noch lange nicht fertig. Man bräuchte sehr viele Runden.

> **Merkhilfe:** Zu klein = richtig, aber zu langsam.

### 4. Gute Lernrate

A geht ruhig und stetig in die richtige Richtung und erreicht schon nach 3 Runden 12/12. Das ist das Wunschverhalten: schnell genug, aber kontrolliert.

### 5. Zu grosse Lernrate

Hier wird es wild: A springt z.B. von 0.85 auf 2.05, dann zurück auf 0.47, dann wieder hoch. Jede Korrektur schiesst über das Ziel hinaus, der nächste Punkt korrigiert in die Gegenrichtung — die Linie **pendelt** und wird nie stabil. Die Trefferquote zappelt zwischen 6 und 7 von 12.

> **Merkhilfe:** Zu gross = überschiesst ständig und wird instabil.

### 6. Die Kernaussage

Eine gute Lernrate ist ein **Kompromiss**:
- **gross genug**, damit überhaupt in vernünftiger Zeit gelernt wird
- **klein genug**, damit das Lernen ruhig und stabil bleibt

Genau dieses Abwägen ist im echten maschinellen Lernen eine der wichtigsten Einstellungen (ein sogenannter Hyperparameter).

---

## Schlüsselbegriffe

- **Lernrate**: Faktor, der bestimmt, wie stark die Steigung pro Schritt geändert wird.
- **Stabilität**: Ob sich die Linie ruhig einem Ziel nähert oder unkontrolliert hin- und herspringt.
- **Überschiessen**: Wenn ein Schritt so gross ist, dass er über das Ziel hinausschiesst.
- **Konvergenz**: Das ruhige Annähern an einen stabilen Endwert (Gegenteil von wildem Pendeln).

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[Neuronale Netze 2 - Mehr Trainingspunkte]] | Liefert die Lernschleife und Trainingsdaten, die hier untersucht werden |
| [[Neuronale Netze 1 - Eine Trennlinie lernen]] | Hier wurde die Lernrate erstmals eingeführt |
| [[Neuronale Netze 4 - XOR und mehrere Schichten]] | Nächster Schritt: Grenzen einer einzelnen Linie |
| [[Mathematik Übersicht]] | Übergeordnete Fachübersicht |

---

## Quellen & Links
- Colab 3: "Gute und schlechte Lernraten" — Markus Ineichen
- [Theorie Neuronale Netze](https://github.com/IneichenEdulu/NNML/blob/main/Neuronale_Netze.md)
- [Lernzettel neuronale Netze](https://github.com/IneichenEdulu/NNML/blob/main/Lernzettel_neuronale_Netze.md)
