---
title: "M164 B3.2 — DQL Stundenplan Lösungen"
tags: [sql, m164, aufgabe]
created: 2026-05-27
status: draft
publish: false
todo: false
---

# M164 B3.2 — DQL Stundenplan Lösungen

Lösungen und Erklärungen zur Aufgabe B3.2 des Moduls M164.
Datenbank: **Stundenplan** — Tabellen: `Lehrbetrieb`, `Lernender`, `Lehrperson`, `Klasse`, `Lernender_Klasse`, `Fach`, `Raum`, `Klasse_Fach`

---

## Aufgabe 2 — Fächer

Alle Spalten, alle Zeilen — kein Filter, kein JOIN nötig. `SELECT *` ist hier explizit erlaubt weil das Ergebnis alle Spalten der Tabelle zeigen soll.

```sql
SELECT * FROM Fach;
```

---

## Aufgabe 3 — Lehrbetriebe

Nur der Firmenname ist gefragt → eine einzelne Spalte aus der Tabelle wählen.

```sql
SELECT Firmenname FROM Lehrbetrieb;
```

---

## Aufgabe 4 — Lernende (erste zehn)

`TOP 10` begrenzt die Ausgabe auf 10 Zeilen. Wichtig: erst sortieren, dann begrenzen — sonst bekommt man 10 zufällige Zeilen statt die ersten alphabetisch.

```sql
SELECT TOP 10 Vorname, Nachname
    FROM Lernender
    ORDER BY Nachname, Vorname ASC;
```

---

## Aufgabe 5 — Lernende mit Lehrbetrieben

Jeder Lernender hat eine `FK_Lehrbetrieb_Id`. `INNER JOIN` verbindet die beiden Tabellen — nur Lernende **mit** einem zugewiesenen Lehrbetrieb erscheinen.

```sql
SELECT Lehrbetrieb.Firmenname AS Lehrbetrieb, Lernender.Nachname, Lernender.Vorname
    FROM Lernender
        INNER JOIN Lehrbetrieb ON Lernender.FK_Lehrbetrieb_Id = Lehrbetrieb.Lehrbetrieb_Id
    ORDER BY Lehrbetrieb.Firmenname, Lernender.Nachname ASC;
```

---

## Aufgabe 6 — Klassen mit Klassenlehrpersonen

`Klasse` hat einen Fremdschlüssel `FK_Lehrperson_Id` für die Klassenlehrperson. Die Fächertabelle `Klasse_Fach` ist hier **nicht relevant** — sie enthält die Fachlehrpersonen, nicht die Klassenlehrperson.

```sql
SELECT Klasse.Bezeichnung AS Klasse,
       (Lehrperson.Nachname + ' ' + Lehrperson.Vorname) AS Klassenlehrperson
    FROM Klasse
        INNER JOIN Lehrperson ON Klasse.FK_Lehrperson_Id = Lehrperson.Lehrperson_Id
    ORDER BY Klasse.Bezeichnung ASC;
```

---

## Aufgabe 7 — Klassenlisten

Dreifach-Join: `Lernender` → `Lernender_Klasse` → `Klasse`. Die Zwischentabelle löst die m:n-Beziehung auf (ein Lernender kann in mehreren Klassen sein, eine Klasse hat mehrere Lernende).

```sql
SELECT Klasse.Bezeichnung AS Klasse, Lernender.Nachname, Lernender.Vorname
    FROM Lernender
        INNER JOIN Lernender_Klasse ON Lernender.Lernender_Id = Lernender_Klasse.FK_Lernender_Id
        INNER JOIN Klasse ON Lernender_Klasse.FK_Klasse_Id = Klasse.Klasse_Id
    ORDER BY Klasse.Bezeichnung, Lernender.Nachname, Lernender.Vorname ASC;
```

---

## Aufgabe 8 — Klassenliste EDB47a

Gleicher Join wie Aufgabe 7. `WHERE` filtert auf eine bestimmte Klasse. Vor- und Nachname mit `+` verbinden — das Ergebnis hat nur eine Spalte.

```sql
SELECT (Lernender.Vorname + ' ' + Lernender.Nachname) AS 'Klassenliste EDB47a'
    FROM Lernender
        INNER JOIN Lernender_Klasse ON Lernender.Lernender_Id = Lernender_Klasse.FK_Lernender_Id
        INNER JOIN Klasse ON Lernender_Klasse.FK_Klasse_Id = Klasse.Klasse_Id
    WHERE Klasse.Bezeichnung = 'EDB47a'
    ORDER BY Lernender.Vorname ASC;
```

---

## Aufgabe 9 — Anzahl Lernende pro Klasse

`RIGHT OUTER JOIN` stellt sicher, dass auch Klassen **ohne** Lernende im Ergebnis erscheinen (mit Anzahl 0). `COUNT` auf eine Lernender-Spalte zählt nur nicht-NULL-Werte — leere Klassen bekommen automatisch 0.

```sql
SELECT Klasse.Bezeichnung AS Klasse, COUNT(Lernender.Lernender_Id) AS 'Anzahl Lernende'
    FROM Lernender
        INNER JOIN Lernender_Klasse ON Lernender.Lernender_Id = Lernender_Klasse.FK_Lernender_Id
        RIGHT OUTER JOIN Klasse ON Lernender_Klasse.FK_Klasse_Id = Klasse.Klasse_Id
    GROUP BY Klasse.Klasse_Id, Klasse.Bezeichnung
    ORDER BY COUNT(Lernender.Lernender_Id) DESC;
```

---

## Aufgabe 10 — Anzahl Fächer pro Lehrperson

`LEFT OUTER JOIN` damit Lehrpersonen ohne Unterricht (Frick Robert) ebenfalls mit 0 erscheinen. `COUNT(DISTINCT ...)` zählt jedes Fach nur einmal, auch wenn eine Lehrperson es in mehreren Klassen unterrichtet.

```sql
SELECT (Lehrperson.Nachname + ' ' + Lehrperson.Vorname) AS Fachlehrperson,
       COUNT(DISTINCT Fach.Fach_Id) AS 'Anzahl Fächer'
    FROM Lehrperson
        LEFT OUTER JOIN Klasse_Fach ON Lehrperson.Lehrperson_Id = Klasse_Fach.FK_Lehrperson_Id
        LEFT OUTER JOIN Fach ON Klasse_Fach.FK_Fach_Id = Fach.Fach_Id
    GROUP BY Lehrperson.Lehrperson_Id, Lehrperson.Nachname, Lehrperson.Vorname
    ORDER BY Fachlehrperson ASC;
```

---

## Aufgabe 11 — Fächerliste INP47x

`LIKE 'INP47%'` matcht alle Klassen die mit "INP47" beginnen (INP47a und INP47b). `DISTINCT` verhindert Duplikate, falls ein Fach in beiden Klassen vorkommt.

```sql
SELECT DISTINCT Fach.Kurzbezeichnung AS Abkürzung, Fach.Langbezeichnung AS Fach
    FROM Klasse
        INNER JOIN Klasse_Fach ON Klasse.Klasse_Id = Klasse_Fach.FK_Klasse_Id
        INNER JOIN Fach ON Klasse_Fach.FK_Fach_Id = Fach.Fach_Id
    WHERE Klasse.Bezeichnung LIKE 'INP47%'
    ORDER BY Fach.Kurzbezeichnung ASC;
```

---

## Aufgabe 12 — Unterricht MMA47a

Vier Tabellen verknüpfen: `Klasse` → `Klasse_Fach` → `Fach`, `Lehrperson`, `Raum`. Die Zeilen in `Klasse_Fach` enthalten die Fremdschlüssel für alle drei.

```sql
SELECT Fach.Langbezeichnung AS Fach,
       (Lehrperson.Vorname + ' ' + Lehrperson.Nachname) AS Lehrperson,
       Raum.Nummer AS Zimmer
    FROM Klasse
        INNER JOIN Klasse_Fach ON Klasse.Klasse_Id = Klasse_Fach.FK_Klasse_Id
        INNER JOIN Fach ON Klasse_Fach.FK_Fach_Id = Fach.Fach_Id
        INNER JOIN Lehrperson ON Klasse_Fach.FK_Lehrperson_Id = Lehrperson.Lehrperson_Id
        INNER JOIN Raum ON Klasse_Fach.FK_Raum_Id = Raum.Raum_Id
    WHERE Klasse.Bezeichnung = 'MMA47a'
    ORDER BY Fach.Langbezeichnung ASC;
```

---

## Aufgabe 13 — Lernende ohne Unterricht

`LEFT OUTER JOIN` auf `Lernender_Klasse` — Lernende die in **keiner** Klasse eingetragen sind, haben NULL in der rechten Tabelle. `WHERE IS NULL` filtert genau diese heraus.

**Merkhilfe:** LEFT JOIN + WHERE [rechte Tabelle].Spalte IS NULL = "alles aus links, das keinen Match rechts hat"

```sql
SELECT Lernender.Lernender_Id, Lernender.Nachname, Lernender.Vorname
    FROM Lernender
        LEFT OUTER JOIN Lernender_Klasse ON Lernender.Lernender_Id = Lernender_Klasse.FK_Lernender_Id
    WHERE Lernender_Klasse.FK_Lernender_Id IS NULL
    ORDER BY Lernender.Lernender_Id ASC;
```

---

## Aufgabe 14 — Lehrpersonen ohne Unterricht

Gleiche Logik wie Aufgabe 13 — `LEFT OUTER JOIN` auf `Klasse_Fach` zeigt Lehrpersonen die nirgends als Fachlehrperson eingesetzt sind (Ergebnis: Frick Robert).

```sql
SELECT Lehrperson.Lehrperson_Id, Lehrperson.Nachname, Lehrperson.Vorname
    FROM Lehrperson
        LEFT OUTER JOIN Klasse_Fach ON Lehrperson.Lehrperson_Id = Klasse_Fach.FK_Lehrperson_Id
    WHERE Klasse_Fach.FK_Lehrperson_Id IS NULL
    ORDER BY Lehrperson.Lehrperson_Id ASC;
```

---

## Aufgabe 15 — Klassen ohne Fächer

`LEFT OUTER JOIN` auf `Klasse_Fach` — Klassen ohne zugewiesene Fächer haben NULL auf der rechten Seite (Ergebnis: INA47a).

```sql
SELECT Klasse.Bezeichnung AS Klasse
    FROM Klasse
        LEFT OUTER JOIN Klasse_Fach ON Klasse.Klasse_Id = Klasse_Fach.FK_Klasse_Id
    WHERE Klasse_Fach.FK_Klasse_Id IS NULL
    ORDER BY Klasse.Bezeichnung ASC;
```

---

## Aufgabe 16 — Lernende in mehreren Klassen

`GROUP BY` pro Lernender zählt die Klassen. `HAVING COUNT > 1` filtert Lernende mit mehr als einer Klasse (David Gisler und Lena Heer, je 2 Klassen).

```sql
SELECT Lernender.Lernender_Id,
       (Lernender.Vorname + ' ' + Lernender.Nachname) AS 'Lernende/r',
       COUNT(Lernender_Klasse.FK_Klasse_Id) AS 'Anzahl Klassen'
    FROM Lernender
        INNER JOIN Lernender_Klasse ON Lernender.Lernender_Id = Lernender_Klasse.FK_Lernender_Id
    GROUP BY Lernender.Lernender_Id, Lernender.Vorname, Lernender.Nachname
    HAVING COUNT(Lernender_Klasse.FK_Klasse_Id) > 1
    ORDER BY Lernender.Lernender_Id ASC;
```

---

## Aufgabe 17 — Lernende ohne Lehrbetrieb

`LEFT OUTER JOIN` auf `Lehrbetrieb` — Lernende ohne gültigen Lehrbetrieb haben NULL auf der rechten Seite. Wenn alle Lernenden einen Lehrbetrieb haben, ist das Ergebnis leer.

```sql
SELECT Lernender.Lernender_Id, Lernender.Nachname, Lernender.Vorname
    FROM Lernender
        LEFT OUTER JOIN Lehrbetrieb ON Lernender.FK_Lehrbetrieb_Id = Lehrbetrieb.Lehrbetrieb_Id
    WHERE Lehrbetrieb.Lehrbetrieb_Id IS NULL
    ORDER BY Lernender.Lernender_Id ASC;
```

---

## Aufgabe 18 — Klassengrösse

`INNER JOIN` schliesst leere Klassen aus — nur Klassen mit mindestens einem Lernenden werden geprüft. `HAVING NOT BETWEEN 13 AND 24` findet Klassen die die Norm verletzen (zu klein: EDB47a mit 11, zu gross: INP47b mit 25).

```sql
SELECT Klasse.Bezeichnung AS Klasse, COUNT(Lernender_Klasse.FK_Lernender_Id) AS 'Anzahl Lernende'
    FROM Klasse
        INNER JOIN Lernender_Klasse ON Klasse.Klasse_Id = Lernender_Klasse.FK_Klasse_Id
    GROUP BY Klasse.Klasse_Id, Klasse.Bezeichnung
    HAVING COUNT(Lernender_Klasse.FK_Lernender_Id) NOT BETWEEN 13 AND 24
    ORDER BY Klasse.Bezeichnung ASC;
```

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[M164 Übersicht]] | Modulübersicht M164 |
| [[M106 Übersicht\|M106]] | SQL-Grundlagen aus M106 (SELECT, WHERE, GROUP BY) |
