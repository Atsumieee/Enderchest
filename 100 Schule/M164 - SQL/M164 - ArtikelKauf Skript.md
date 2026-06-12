---
title: "M164 B3.3 — DQL ArtikelKauf Lösungen"
tags: [sql, m164, aufgabe]
created: 2026-06-03
status: draft
publish: false
todo: false
---

# M164 B3.3 — DQL ArtikelKauf Lösungen

Lösungen und Erklärungen zur Aufgabe B3.3 des Moduls M164.
Datenbank: **ArtikelKauf** — Tabellen: `Kunden`, `Artikel`, `Gruppe`, `Ort`, `Kauf`

### Datenbankstruktur

```
Ort          (Ort_Id, PLZ, Ort)
Kunden       (Kunden_Id, Vorname, Nachname, FK_Ort_Id)
Gruppe       (Gruppe_Id, Bezeichnung)
Artikel      (Artikel_Id, Bezeichnung, Preis, FK_Gruppe_Id)
Kauf         (Kauf_Id, FK_Kunden_Id, FK_Artikel_Id, Menge)
```

Beziehungen:
- Ein Kunde wohnt an einem Ort (`Kunden.FK_Ort_Id` → `Ort.Ort_Id`)
- Ein Kunde kauft einen oder mehrere Artikel (`Kauf` als Zwischentabelle)
- Ein Artikel gehört zu einer Gruppe (`Artikel.FK_Gruppe_Id` → `Gruppe.Gruppe_Id`)

---

## Aufgabe 1 — Liste aller Kunden

Alle Kunden anzeigen, sortiert nach Nachname und Vorname. Nur die `Kunden`-Tabelle, kein JOIN nötig.

```sql
SELECT Kunden_Id, Vorname, Nachname
    FROM Kunden
    ORDER BY Nachname, Vorname ASC;
```

---

## Aufgabe 2 — Liste gekaufter Artikel

Dreifach-Join: `Kauf` verbindet Kunden und Artikel. Nur Artikel die mindestens einmal gekauft wurden erscheinen (`INNER JOIN`).

```sql
SELECT Artikel.Bezeichnung, Kunden.Nachname, Kunden.Vorname
    FROM Kauf
        INNER JOIN Artikel ON Kauf.FK_Artikel_Id = Artikel.Artikel_Id
        INNER JOIN Kunden ON Kauf.FK_Kunden_Id = Kunden.Kunden_Id
    ORDER BY Artikel.Bezeichnung, Kunden.Nachname, Kunden.Vorname ASC;
```

---

## Aufgabe 3 — Umsatz von Carla Heggli

`SUM(Preis * Menge)` berechnet den Gesamtumsatz. `WHERE` filtert auf eine bestimmte Person — kein `GROUP BY` nötig da das Ergebnis nur eine Zahl ist.

```sql
SELECT SUM(Artikel.Preis * Kauf.Menge) AS Umsatz
    FROM Kunden
        INNER JOIN Kauf ON Kunden.Kunden_Id = Kauf.FK_Kunden_Id
        INNER JOIN Artikel ON Kauf.FK_Artikel_Id = Artikel.Artikel_Id
    WHERE Kunden.Vorname = 'Carla' AND Kunden.Nachname = 'Heggli';
```

---

## Aufgabe 4 — Anzahl gekaufter Artikel pro Kunde

`GROUP BY` gruppiert nach Kunde. `COUNT` zählt die Einträge in `Kauf` pro Kunde. Alle Kunden erscheinen — auch jene ohne Käufe wenn `LEFT OUTER JOIN` verwendet wird.

```sql
SELECT Kunden.Nachname, Kunden.Vorname, COUNT(Kauf.Kauf_Id) AS 'Anzahl Artikel'
    FROM Kunden
        LEFT OUTER JOIN Kauf ON Kunden.Kunden_Id = Kauf.FK_Kunden_Id
    GROUP BY Kunden.Kunden_Id, Kunden.Nachname, Kunden.Vorname
    ORDER BY COUNT(Kauf.Kauf_Id) DESC, Kunden.Nachname, Kunden.Vorname ASC;
```

---

## Aufgabe 5 — Anzahl Artikel pro Gruppe

Alle Gruppen sollen erscheinen — auch Gruppen ohne Artikel → `LEFT OUTER JOIN` von `Gruppe` zu `Artikel`. `COUNT` auf eine Artikel-Spalte gibt 0 für leere Gruppen.

```sql
SELECT Gruppe.Bezeichnung AS Gruppe, COUNT(Artikel.Artikel_Id) AS 'Anzahl Artikel'
    FROM Gruppe
        LEFT OUTER JOIN Artikel ON Gruppe.Gruppe_Id = Artikel.FK_Gruppe_Id
    GROUP BY Gruppe.Gruppe_Id, Gruppe.Bezeichnung
    ORDER BY Gruppe.Bezeichnung ASC;
```

---

## Aufgabe 6 — Artikel ohne Gruppe

`LEFT OUTER JOIN` von `Artikel` zu `Gruppe` — Artikel ohne zugewiesene Gruppe oder mit ungültigem FK haben NULL in `Gruppe.Gruppe_Id`.

```sql
SELECT Artikel.Bezeichnung
    FROM Artikel
        LEFT OUTER JOIN Gruppe ON Artikel.FK_Gruppe_Id = Gruppe.Gruppe_Id
    WHERE Gruppe.Gruppe_Id IS NULL
    ORDER BY Artikel.Bezeichnung ASC;
```

---

## Aufgabe 7 — Nicht gekaufte Artikel

`LEFT OUTER JOIN` von `Artikel` zu `Kauf` — Artikel ohne Kaufeintrag haben NULL in `Kauf.FK_Artikel_Id`. Absteigend nach Preis sortiert.

```sql
SELECT Artikel.Bezeichnung, Artikel.Preis
    FROM Artikel
        LEFT OUTER JOIN Kauf ON Artikel.Artikel_Id = Kauf.FK_Artikel_Id
    WHERE Kauf.FK_Artikel_Id IS NULL
    ORDER BY Artikel.Preis DESC;
```

---

## Aufgabe 8 — Alle Artikel mit Gruppe

Alle Artikel anzeigen, auch jene ohne Gruppe → `LEFT OUTER JOIN` von `Artikel` zu `Gruppe`. Artikel ohne Gruppe erscheinen mit NULL als Gruppenname.

```sql
SELECT Artikel.Bezeichnung AS Artikel, Gruppe.Bezeichnung AS Artikelgruppe
    FROM Artikel
        LEFT OUTER JOIN Gruppe ON Artikel.FK_Gruppe_Id = Gruppe.Gruppe_Id
    ORDER BY Gruppe.Bezeichnung, Artikel.Bezeichnung ASC;
```

---

## Aufgabe 9 — Käufer von Mineralwasser

Dreifach-Join: `Kunden` → `Kauf` → `Artikel`. `WHERE` filtert auf den Artikelnamen. `DISTINCT` verhindert Duplikate wenn jemand Mineralwasser mehrfach gekauft hat.

```sql
SELECT DISTINCT Kunden.Nachname, Kunden.Vorname
    FROM Kunden
        INNER JOIN Kauf ON Kunden.Kunden_Id = Kauf.FK_Kunden_Id
        INNER JOIN Artikel ON Kauf.FK_Artikel_Id = Artikel.Artikel_Id
    WHERE Artikel.Bezeichnung = 'Mineralwasser'
    ORDER BY Kunden.Nachname, Kunden.Vorname ASC;
```

---

## Aufgabe 10 — Umsatz aller Kunden

`SUM(Preis * Menge)` pro Kunde, `GROUP BY` nach Kunden. Absteigend nach Umsatz, bei Gleichstand alphabetisch nach Nachname.

```sql
SELECT Kunden.Nachname, Kunden.Vorname, SUM(Artikel.Preis * Kauf.Menge) AS Umsatz
    FROM Kunden
        INNER JOIN Kauf ON Kunden.Kunden_Id = Kauf.FK_Kunden_Id
        INNER JOIN Artikel ON Kauf.FK_Artikel_Id = Artikel.Artikel_Id
    GROUP BY Kunden.Kunden_Id, Kunden.Nachname, Kunden.Vorname
    ORDER BY Umsatz DESC, Kunden.Nachname, Kunden.Vorname ASC;
```

---

## Aufgabe 11 — Kunden mit Ort

Zwei Abfragen: Teil A zeigt alle Kunden mit ihrem Ort (auch ohne Ort). Teil B zeigt nur Kunden ohne gültigen Ort.

**Teil A — Alle Kunden mit Ort (inkl. ohne Ort):**

`LEFT OUTER JOIN` von `Kunden` zu `Ort` — Kunden ohne gültigen Ort erscheinen mit NULL als Ort.

```sql
SELECT Kunden.Nachname, Kunden.Vorname, Ort.PLZ, Ort.Ort
    FROM Kunden
        LEFT OUTER JOIN Ort ON Kunden.FK_Ort_Id = Ort.Ort_Id
    ORDER BY Kunden.Nachname, Kunden.Vorname ASC;
```

**Teil B — Kunden ohne gültigen Ort:**

Gleiche Abfrage, aber `WHERE IS NULL` filtert nur die Kunden ohne Ort.

```sql
SELECT Kunden.Nachname, Kunden.Vorname
    FROM Kunden
        LEFT OUTER JOIN Ort ON Kunden.FK_Ort_Id = Ort.Ort_Id
    WHERE Ort.Ort_Id IS NULL
    ORDER BY Kunden.Nachname, Kunden.Vorname ASC;
```

---

## Aufgabe 12 — Anzahl Kunden pro Ort

Alle Orte sollen erscheinen, auch jene ohne Kunden → `LEFT OUTER JOIN` von `Ort` zu `Kunden`. `COUNT` auf eine Kunden-Spalte gibt 0 für leere Orte.

```sql
SELECT Ort.PLZ, Ort.Ort, COUNT(Kunden.Kunden_Id) AS 'Anzahl Kunden'
    FROM Ort
        LEFT OUTER JOIN Kunden ON Ort.Ort_Id = Kunden.FK_Ort_Id
    GROUP BY Ort.Ort_Id, Ort.PLZ, Ort.Ort
    ORDER BY COUNT(Kunden.Kunden_Id) DESC, Ort.PLZ ASC;
```

**Challenge — mit RIGHT OUTER JOIN:**

Genau dasselbe Ergebnis, aber die Tabellenreihenfolge ist umgekehrt. `Kunden` ist jetzt links, `Ort` wird von rechts eingebunden — `RIGHT OUTER JOIN` stellt sicher dass alle `Ort`-Zeilen erscheinen.

```sql
SELECT Ort.PLZ, Ort.Ort, COUNT(Kunden.Kunden_Id) AS 'Anzahl Kunden'
    FROM Kunden
        RIGHT OUTER JOIN Ort ON Kunden.FK_Ort_Id = Ort.Ort_Id
    GROUP BY Ort.Ort_Id, Ort.PLZ, Ort.Ort
    ORDER BY COUNT(Kunden.Kunden_Id) DESC, Ort.PLZ ASC;
```

**Merkhilfe:** LEFT JOIN und RIGHT JOIN sind spiegelbildlich — `A LEFT JOIN B` ist dasselbe wie `B RIGHT JOIN A`. Man dreht einfach die Tabellenreihenfolge um.

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[M164 Übersicht]] | Modulübersicht M164 |
| [[M164 - Stundenplan Skript]] | B3.2 — ähnliche JOIN-Patterns mit anderem Schema |
| [[SQL - DQL Joins]] | Theorie zu INNER JOIN, LEFT/RIGHT OUTER JOIN |
