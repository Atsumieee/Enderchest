---
title: M106 - SQL – DQL
tags:
  - sql
  - dql
  - datenbank
  - schule
  - modul-106
created: 2026-05-22
status: draft
publish: true
---

# SQL – DQL

## Überblick

DQL (Data Query Language) ist der Teilbereich von SQL, der ausschliesslich dem **Lesen** von Daten dient. Der einzige DQL-Befehl ist `SELECT`. Mit DQL werden keine Daten verändert und keine Strukturen angepasst — es handelt sich um reine Leseoperationen.

Wenn du eine `SELECT`-Abfrage ausführst, gibt die Datenbank eine temporäre Ergebnistabelle zurück — eine Art Momentaufnahme der Daten, die deinen Bedingungen entspricht. Diese Tabelle existiert nur für die Dauer der Abfrage und wird nicht gespeichert.

Voraussetzungen für DQL: Die Tabellen müssen per **DDL** bereits existieren (`CREATE TABLE`), und die Daten müssen per **DML** bereits eingefügt worden sein (`INSERT`). DQL ist also immer der letzte Schritt.

```widget
DQL_SQL_Universum
```

---

## Inhalt

### 1. Grundstruktur einer SELECT-Abfrage

Jede DQL-Abfrage folgt demselben Grundmuster. Nur `SELECT` und `FROM` sind Pflicht — alle anderen Klauseln sind optional und werden nach Bedarf ergänzt:

```sql
SELECT spalte1, spalte2   -- Welche Spalten sollen angezeigt werden?
FROM tabelle              -- Aus welcher Tabelle?
WHERE bedingung           -- Optional: Welche Zeilen sollen gefiltert werden?
ORDER BY spalte ASC|DESC; -- Optional: In welcher Reihenfolge soll sortiert werden?
```

| Klausel    | Frage die sie beantwortet                      | Pflicht? |
|------------|------------------------------------------------|----------|
| `SELECT`   | Welche Spalten sollen zurückgegeben werden?    | Ja       |
| `FROM`     | Aus welcher Tabelle kommen die Daten?          | Ja       |
| `WHERE`    | Welche Zeilen sollen berücksichtigt werden?    | Nein     |
| `ORDER BY` | Wie soll das Ergebnis sortiert sein?           | Nein     |

Als Beispiel verwenden wir durchgehend diese fiktive `kunden`-Tabelle:

| id | vorname | nachname | land | alter | email                  |
|----|---------|----------|------|-------|------------------------|
| 1  | Anna    | Meier    | CH   | 32    | anna@example.com       |
| 2  | Ben     | Müller   | DE   | 17    | ben@example.com        |
| 3  | Clara   | Schmidt  | AT   | 25    | NULL                   |
| 4  | David   | Meier    | CH   | 41    | david@example.com      |
| 5  | Eva     | Braun    | DE   | 17    | eva@example.com        |

**Alle Spalten auswählen mit `*`:**

```sql
SELECT * FROM kunden;
```

Das `*` steht für „alle Spalten". In der Praxis sollte man es vermeiden und stattdessen explizit die gewünschten Spalten aufzählen — das ist lesbarer, schneller und robuster wenn sich die Tabellenstruktur ändert.

**Nur bestimmte Spalten auswählen:**

```sql
SELECT vorname, nachname, land FROM kunden;
```

Ergebnis: Die Datenbank gibt nur die drei genannten Spalten zurück — alle anderen werden ignoriert.

```widget
SELECT_Baukasten
```

---

### 2. Aliase – Spalten und Tabellen umbenennen

Manchmal ist ein Spaltenname in der Datenbank technisch, aber im Ergebnis soll er leserfreundlich erscheinen. Mit `AS` kannst du Spalten und Tabellen temporär umbenennen — nur für die Dauer der Abfrage, die Datenbank selbst ändert sich nicht.

```sql
-- Spalten-Alias: Spalte im Ergebnis umbenennen
SELECT vorname AS "Vorname", nachname AS "Nachname" FROM kunden;

-- Berechnete Spalte mit Alias
SELECT vorname, alter * 12 AS alter_in_monaten FROM kunden;

-- Tabellen-Alias: Kürzel für Tabellennamen (besonders nützlich bei JOINs)
SELECT k.vorname, k.nachname
FROM kunden AS k;
```

> Merkhilfe: `AS` = „nenn das ab jetzt so". Der Alias gilt nur im Ergebnis — in `WHERE` kann man ihn noch nicht verwenden (mehr dazu bei der Ausführungsreihenfolge).

---

### 3. WHERE – Zeilen filtern

`WHERE` schränkt ein, welche Zeilen aus der Tabelle berücksichtigt werden. Nur Zeilen bei denen die Bedingung `TRUE` ergibt, landen im Ergebnis.

**Vergleichsoperatoren:**

| Operator       | Bedeutung              | Beispiel                          |
|----------------|------------------------|-----------------------------------|
| `=`            | Gleich                 | `WHERE land = 'CH'`               |
| `<>` oder `!=` | Ungleich               | `WHERE land <> 'DE'`              |
| `>`, `<`       | Grösser / Kleiner      | `WHERE alter > 18`                |
| `>=`, `<=`     | Grösser-gleich / ...   | `WHERE alter >= 18`               |
| `BETWEEN`      | Wertebereich (inklusiv)| `WHERE alter BETWEEN 18 AND 30`   |
| `LIKE`         | Muster-Vergleich       | `WHERE nachname LIKE 'M%'`        |
| `IN`           | Liste von Werten       | `WHERE land IN ('CH', 'DE', 'AT')`|
| `IS NULL`      | Kein Wert vorhanden    | `WHERE email IS NULL`             |

**Logische Operatoren — mehrere Bedingungen kombinieren:**

```sql
-- AND: beide Bedingungen müssen zutreffen
SELECT * FROM kunden WHERE alter >= 18 AND land = 'CH';
-- Ergebnis: Anna (32, CH), David (41, CH)

-- OR: mindestens eine Bedingung muss zutreffen
SELECT * FROM kunden WHERE land = 'CH' OR land = 'AT';
-- Ergebnis: Anna, Clara, David

-- NOT: Bedingung umkehren
SELECT * FROM kunden WHERE NOT land = 'DE';
-- Ergebnis: Anna, Clara, David
```

#### BETWEEN – Wertebereich

`BETWEEN` prüft ob ein Wert innerhalb eines Bereichs liegt — **beide Grenzen sind inklusive**.

```sql
SELECT * FROM kunden WHERE alter BETWEEN 18 AND 35;
-- Ergebnis: Anna (32), Clara (25)
-- Ben (17) und Eva (17) fallen raus, David (41) auch
```

> Merkhilfe: `BETWEEN 18 AND 35` ist identisch mit `>= 18 AND <= 35`.

#### LIKE – Mustersuche

`LIKE` sucht nach Texten die einem bestimmten Muster entsprechen. Dafür gibt es zwei Platzhalterzeichen (Wildcards):

| Zeichen | Bedeutung                                  | Beispiel       | Trifft auf                  |
| ------- | ------------------------------------------ | -------------- | --------------------------- |
| `%`     | Beliebig viele Zeichen (auch kein Zeichen) | `LIKE 'M%'`    | Meier, Müller, Mo           |
| `_`     | Genau ein Zeichen                          | `LIKE 'M_ier'` | Meier, Maier — nicht Müller |

```sql
-- Alle Kunden deren Nachname mit 'M' beginnt
SELECT * FROM kunden WHERE nachname LIKE 'M%';
-- Ergebnis: Anna Meier, Ben Müller, David Meier

-- Alle Kunden deren Nachname 'ei' enthält
SELECT * FROM kunden WHERE nachname LIKE '%ei%';
-- Ergebnis: Anna Meier, David Meier
```

#### IN – Liste von Werten

`IN` ist eine kompakte Alternative zu mehreren `OR`-Bedingungen:

```sql
-- Ohne IN (umständlich)
SELECT * FROM kunden WHERE land = 'CH' OR land = 'DE';

-- Mit IN (übersichtlicher)
SELECT * FROM kunden WHERE land IN ('CH', 'DE');
-- Ergebnis: Anna, Ben, David, Eva
```

#### IS NULL – fehlende Werte

`NULL` bedeutet „kein Wert vorhanden" — es ist weder eine leere Zeichenkette noch eine `0`. Deshalb funktioniert `= NULL` **nicht**. Man muss immer `IS NULL` bzw. `IS NOT NULL` verwenden.

```sql
-- FALSCH: funktioniert nicht, gibt immer leer zurück
SELECT * FROM kunden WHERE email = NULL;

-- RICHTIG
SELECT * FROM kunden WHERE email IS NULL;
-- Ergebnis: Clara (hat keine E-Mail)

-- Alle Kunden MIT E-Mail
SELECT * FROM kunden WHERE email IS NOT NULL;
```

> Merkhilfe: `NULL` ist kein Wert, sondern das *Fehlen* eines Wertes. Gleichheitsvergleiche mit Nichts ergeben immer Nichts — deshalb braucht es den speziellen `IS NULL`-Operator.

---

### 4. ORDER BY – Ergebnis sortieren

`ORDER BY` legt fest in welcher Reihenfolge die Ergebniszeilen ausgegeben werden. Ohne `ORDER BY` gibt die Datenbank die Zeilen in einer nicht garantierten Reihenfolge zurück.

```sql
-- Aufsteigend sortieren (ASC ist der Standard, kann weggelassen werden)
SELECT vorname, alter FROM kunden ORDER BY alter ASC;
-- Ergebnis: Ben (17), Eva (17), Clara (25), Anna (32), David (41)

-- Absteigend sortieren
SELECT vorname, alter FROM kunden ORDER BY alter DESC;
-- Ergebnis: David (41), Anna (32), Clara (25), Ben (17), Eva (17)

-- Nach mehreren Spalten sortieren (erst nach Nachname, bei Gleichstand nach Vorname)
SELECT vorname, nachname FROM kunden ORDER BY nachname ASC, vorname ASC;
-- "Meier" kommt vor "Müller": Anna Meier, David Meier, Ben Müller, ...
```

---

### 5. DISTINCT – Duplikate entfernen

Wenn man nur wissen möchte welche unterschiedlichen Werte in einer Spalte vorkommen — ohne Wiederholungen — verwendet man `DISTINCT`.

```sql
-- Welche Länder sind in der Kundentabelle vertreten?
SELECT DISTINCT land FROM kunden;
-- Ergebnis: CH, DE, AT  (jedes Land nur einmal, obwohl z.B. 'CH' zweimal vorkommt)

-- Ohne DISTINCT: alle Zeilen
SELECT land FROM kunden;
-- Ergebnis: CH, DE, AT, CH, DE  (Duplikate sind sichtbar)
```

`DISTINCT` wirkt auf die gesamte Spaltenkombination. Wenn man `SELECT DISTINCT land, alter` schreibt, werden nur Zeilen entfernt bei denen sowohl `land` als auch `alter` identisch sind.

---

### 6. Aggregatfunktionen – Berechnungen über mehrere Zeilen

Aggregat-funktionen fassen mehrere Zeilen zu einem einzigen Ergebniswert zusammen. Sie sind besonders nützlich für Statistiken und Auswertungen.

| Funktion    | Bedeutung                              | Beispiel                             |
|-------------|----------------------------------------|--------------------------------------|
| `COUNT(*)`  | Anzahl aller Zeilen                    | `SELECT COUNT(*) FROM kunden`        |
| `COUNT(sp)` | Anzahl Zeilen wo Spalte nicht NULL ist | `SELECT COUNT(email) FROM kunden`    |
| `SUM(sp)`   | Summe aller Werte in der Spalte        | `SELECT SUM(alter) FROM kunden`      |
| `AVG(sp)`   | Durchschnitt der Werte                 | `SELECT AVG(alter) FROM kunden`      |
| `MIN(sp)`   | Kleinster Wert                         | `SELECT MIN(alter) FROM kunden`      |
| `MAX(sp)`   | Grösster Wert                          | `SELECT MAX(alter) FROM kunden`      |

**Wichtiger Unterschied: `COUNT(*)` vs `COUNT(spalte)`**

`COUNT(*)` zählt jede Zeile — egal ob Werte vorhanden sind oder nicht. `COUNT(spalte)` hingegen zählt nur Zeilen wo diese Spalte einen Wert hat (also nicht `NULL` ist).

```sql
SELECT COUNT(*) FROM kunden;       -- Ergebnis: 5  (alle 5 Zeilen)
SELECT COUNT(email) FROM kunden;   -- Ergebnis: 4  (Clara hat NULL, wird nicht gezählt)
```

---

### 7. GROUP BY & HAVING – Gruppieren und Gruppen filtern

`GROUP BY` fasst alle Zeilen mit demselben Wert in einer Spalte zu einer Gruppe zusammen. Aggregatfunktionen werden dann pro Gruppe berechnet — statt für die ganze Tabelle.

```sql
-- Wie viele Kunden kommen aus jedem Land?
SELECT land, COUNT(*) AS anzahl
FROM kunden
GROUP BY land;
```

Ergebnis:

| land | anzahl |
|------|--------|
| CH   | 2      |
| DE   | 2      |
| AT   | 1      |

Die Datenbank hat intern alle Zeilen nach `land` gruppiert und dann `COUNT(*)` pro Gruppe berechnet.

**HAVING – Gruppen filtern**

`HAVING` funktioniert wie `WHERE`, aber es greift erst nach der Gruppierung. Man braucht es wenn man Gruppen anhand von Aggregatwerten filtern möchte:

```sql
-- Nur Länder mit mehr als 1 Kunden anzeigen
SELECT land, COUNT(*) AS anzahl
FROM kunden
GROUP BY land
HAVING COUNT(*) > 1;
-- Ergebnis: CH (2), DE (2)  — AT fällt weg
```

**WHERE vs HAVING — der wichtigste Unterschied:**

```sql
-- WHERE filtert einzelne Zeilen BEVOR gruppiert wird
-- Hier: erst Minderjährige ausschliessen, dann pro Land zählen
SELECT land, COUNT(*) AS anzahl
FROM kunden
WHERE alter >= 18
GROUP BY land;

-- HAVING filtert Gruppen NACHDEM gruppiert wurde
-- Hier: erst pro Land zählen, dann nur Länder mit mehr als 1 Kunde zeigen
SELECT land, COUNT(*) AS anzahl
FROM kunden
GROUP BY land
HAVING COUNT(*) > 1;
```

> Merkhilfe: **WHERE** = Zeilen filtern (vor der Gruppe), **HAVING** = Gruppen filtern (nach der Gruppe). WHERE kann keine Aggregatfunktionen verwenden — dafür ist HAVING zuständig.

```widget
WHERE_Aggregat_Spielwiese
```

---

### 8. Die Ausführungsreihenfolge von SELECT

SQL-Abfragen werden **nicht** in der Reihenfolge ausgeführt, in der man sie schreibt. Die Datenbank verarbeitet die Klauseln intern in dieser Reihenfolge:

```
1. FROM       → Welche Tabelle(n) werden verwendet?
2. WHERE      → Welche Zeilen kommen in Frage?
3. GROUP BY   → Zeilen zu Gruppen zusammenfassen
4. HAVING     → Gruppen filtern
5. SELECT     → Welche Spalten / Berechnungen anzeigen?
6. ORDER BY   → Ergebnis sortieren
```

Diese Reihenfolge erklärt mehrere Dinge die anfangs verwirrend wirken:

**Warum kann ich meinen Alias in WHERE nicht verwenden?**
Weil `WHERE` (Schritt 2) ausgeführt wird bevor `SELECT` (Schritt 5) den Alias überhaupt definiert. Der Alias existiert zu dem Zeitpunkt noch nicht.

```sql
-- FALSCH: alias 'volljährig' ist in WHERE noch nicht bekannt
SELECT alter >= 18 AS volljährig FROM kunden WHERE volljährig = 1;

-- RICHTIG: Bedingung direkt formulieren
SELECT alter >= 18 AS volljährig FROM kunden WHERE alter >= 18;
```

**Warum kann ich in WHERE keine Aggregatfunktionen verwenden?**
Weil `WHERE` (Schritt 2) ausgeführt wird bevor `GROUP BY` (Schritt 3) die Gruppen überhaupt bildet. Aggregatwerte wie `COUNT(*)` existieren zu diesem Zeitpunkt noch nicht — dafür ist `HAVING` (Schritt 4) zuständig.

```sql
-- FALSCH
SELECT land, COUNT(*) FROM kunden WHERE COUNT(*) > 1 GROUP BY land;

-- RICHTIG
SELECT land, COUNT(*) FROM kunden GROUP BY land HAVING COUNT(*) > 1;
```

---

## Schlüsselbegriffe

- **DQL (Data Query Language)**: Teilbereich von SQL für reine Leseoperationen; einziger Befehl ist `SELECT`
- **Ergebnistabelle**: Temporäre Tabelle die eine `SELECT`-Abfrage zurückgibt; wird nicht gespeichert
- **Klausel**: Einzelner Bestandteil einer SQL-Anweisung (z.B. `WHERE`, `ORDER BY`)
- **Alias**: Temporärer Name für eine Spalte oder Tabelle, definiert mit `AS`; gilt nur im Ergebnis
- **Wildcard**: Platzhalterzeichen in `LIKE`-Ausdrücken (`%` = beliebig viele Zeichen, `_` = genau eines)
- **NULL**: Das Fehlen eines Wertes — kein Leerzeichen, keine 0. Vergleiche mit `= NULL` funktionieren nicht; stattdessen `IS NULL`
- **Aggregatfunktion**: Funktion die mehrere Zeilen zu einem Wert zusammenfasst (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`)
- **GROUP BY**: Fasst Zeilen mit gleichem Wert zu einer Gruppe zusammen; Aggregatfunktionen wirken dann pro Gruppe
- **HAVING**: Filterbedingung für Gruppen — wie `WHERE`, aber nach der Gruppierung
- **DISTINCT**: Entfernt doppelte Zeilen aus dem Ergebnis
- **Ausführungsreihenfolge**: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[SQL - DQL Joins]] | JOINs erweitern `SELECT` auf mehrere Tabellen gleichzeitig; alle hier gelernten Klauseln bleiben kombinierbar |
| [[SQL - Views]] | Eine View ist eine gespeicherte `SELECT`-Abfrage; sie wird selbst wieder mit DQL abgefragt |
| [[SQL – Funktionen]] | Vordefinierte Funktionen (`LEN`, `ROUND`, `GETDATE` etc.) können in `SELECT` und `WHERE` verwendet werden |
| [[SQL Server - Datensicherheit]] | `GRANT SELECT` (DCL) steuert wer DQL-Abfragen ausführen darf; Row-Level Security wirkt wie eine automatische `WHERE`-Klausel |
| SQL – DML | Gegenstück zu DQL: `INSERT`, `UPDATE`, `DELETE` schreiben Daten — DQL liest sie nur |
| SQL – DDL | Voraussetzung für DQL: DDL erstellt die Tabellenstruktur auf der SELECT arbeitet |

---

## Quellen & Links
- Kursunterlagen: https://m106.ict-bz.ch/tag-2/operationen-dql
- SQL Standard: ISO/IEC 9075
- Modul 106 – Datenbanken abfragen und bearbeiten (ICT-BZ)
