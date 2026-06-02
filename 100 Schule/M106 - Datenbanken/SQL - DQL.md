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
DQL (Data Query Language) ist der Teilbereich von SQL, der ausschliesslich dem Lesen und Abfragen von Daten dient. Der zentrale Befehl ist `SELECT`. Mit DQL werden keine Daten verändert – es handelt sich um reine Leseoperationen.

---

## Inhalt

### 1. Grundstruktur einer SELECT-Abfrage

```sql
SELECT spalte1, spalte2
FROM tabelle
WHERE bedingung
ORDER BY spalte ASC|DESC;
```

| Klausel    | Bedeutung                                      | Pflicht? |
|------------|------------------------------------------------|----------|
| `SELECT`   | Welche Spalten sollen zurückgegeben werden?    | Ja       |
| `FROM`     | Aus welcher Tabelle?                           | Ja       |
| `WHERE`    | Filterkriterium für Zeilen                     | Nein     |
| `ORDER BY` | Sortierung des Ergebnisses                     | Nein     |

**Alle Spalten auswählen:**
```sql
SELECT * FROM kunden;
```
> Hinweis: `*` sollte in der Praxis vermieden werden – explizite Spaltennamen sind lesbarer und performanter.

---

### 2. WHERE – Zeilen filtern

Vergleichsoperatoren:

| Operator       | Bedeutung              | Beispiel                          |
|----------------|------------------------|-----------------------------------|
| `=`            | Gleich                 | `WHERE alter = 18`                |
| `<>` oder `!=` | Ungleich               | `WHERE status <> 'inaktiv'`       |
| `>`, `<`       | Grösser / Kleiner      | `WHERE preis > 100`               |
| `>=`, `<=`     | Grösser-gleich / ...   | `WHERE alter >= 18`               |
| `BETWEEN`      | Wertebereich           | `WHERE alter BETWEEN 18 AND 30`   |
| `LIKE`         | Muster-Vergleich       | `WHERE name LIKE 'M%'`            |
| `IN`           | Liste von Werten       | `WHERE land IN ('CH', 'DE', 'AT')`|
| `IS NULL`      | Kein Wert vorhanden    | `WHERE email IS NULL`             |

**Logische Operatoren:**
```sql
WHERE alter >= 18 AND land = 'CH'
WHERE alter < 18 OR land = 'AT'
WHERE NOT status = 'gesperrt'
```

---

### 3. LIKE – Mustersuche

Wildcards (Platzhalter):

| Zeichen | Bedeutung              | Beispiel              | Trifft auf         |
|---------|------------------------|-----------------------|--------------------|
| `%`     | Beliebig viele Zeichen | `LIKE 'M%'`           | Müller, Max, Mo    |
| `_`     | Genau ein Zeichen      | `LIKE 'M_ller'`       | Müller, Maller     |

```sql
-- Alle Kunden deren Name mit 'A' beginnt
SELECT * FROM kunden WHERE name LIKE 'A%';

-- Alle Produkte mit 'Pro' irgendwo im Namen
SELECT * FROM produkte WHERE bezeichnung LIKE '%Pro%';
```

---

### 4. ORDER BY – Sortierung

```sql
-- Aufsteigend (Standard)
SELECT * FROM produkte ORDER BY preis ASC;

-- Absteigend
SELECT * FROM produkte ORDER BY preis DESC;

-- Mehrere Spalten
SELECT * FROM kunden ORDER BY nachname ASC, vorname ASC;
```

---

### 5. DISTINCT – Duplikate entfernen

```sql
-- Alle einzigartigen Länder in der Kundentabelle
SELECT DISTINCT land FROM kunden;
```

---

### 6. Aggregatfunktionen – Berechnungen über Zeilen

| Funktion  | Bedeutung                    | Beispiel                        |
|-----------|------------------------------|---------------------------------|
| `COUNT()` | Anzahl Zeilen zählen         | `SELECT COUNT(*) FROM kunden`   |
| `SUM()`   | Summe berechnen              | `SELECT SUM(preis) FROM orders` |
| `AVG()`   | Durchschnitt berechnen       | `SELECT AVG(alter) FROM users`  |
| `MIN()`   | Kleinster Wert               | `SELECT MIN(preis) FROM prod`   |
| `MAX()`   | Grösster Wert                | `SELECT MAX(preis) FROM prod`   |

---

### 7. GROUP BY & HAVING – Gruppieren und filtern

`GROUP BY` fasst Zeilen mit gleichem Wert zusammen.
`HAVING` filtert **nach** der Gruppierung (analog zu WHERE, aber für Gruppen).

```sql
-- Anzahl Bestellungen pro Kunde
SELECT kunden_id, COUNT(*) AS anzahl_bestellungen
FROM bestellungen
GROUP BY kunden_id;

-- Nur Kunden mit mehr als 5 Bestellungen
SELECT kunden_id, COUNT(*) AS anzahl_bestellungen
FROM bestellungen
GROUP BY kunden_id
HAVING COUNT(*) > 5;
```

> Merkhilfe: `WHERE` filtert **vor** der Gruppierung, `HAVING` **nach** der Gruppierung.

---

### 8. Ausführungsreihenfolge von SELECT

SQL verarbeitet Klauseln intern in dieser Reihenfolge (nicht wie sie geschrieben werden):

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
```

Das ist wichtig, um zu verstehen warum z.B. Alias-Namen aus `SELECT` in `WHERE` nicht verfügbar sind.

---

### 9. Aliase – Lesbarkeit verbessern

```sql
-- Spalten umbenennen
SELECT vorname AS "Vorname", nachname AS "Nachname" FROM kunden;

-- Tabellen-Alias (besonders nützlich bei JOINs)
SELECT k.vorname, b.bestelldatum
FROM kunden AS k, bestellungen AS b;
```

---

## Schlüsselbegriffe

- **DQL (Data Query Language)**: Teilbereich von SQL für reine Leseoperationen
- **SELECT**: Grundbefehl zum Abfragen von Daten
- **Klausel**: Einzelner Bestandteil einer SQL-Anweisung (z.B. WHERE, ORDER BY)
- **Wildcard**: Platzhalterzeichen in LIKE-Ausdrücken (`%`, `_`)
- **Aggregatfunktion**: Funktion die mehrere Zeilen zu einem Wert zusammenfasst
- **GROUP BY**: Gruppiert Ergebniszeilen anhand eines gemeinsamen Wertes
- **HAVING**: Filterbedingung die nach einer Gruppierung angewendet wird
- **Alias**: Temporärer Name für eine Spalte oder Tabelle im Ergebnis
- **DISTINCT**: Entfernt doppelte Zeilen aus dem Ergebnis
- **NULL**: Fehlender oder unbekannter Wert (kein Leerzeichen, kein 0)

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[SQL - Views]] | Views basieren vollständig auf SELECT; sie kapseln DQL-Abfragen und werden selbst mit DQL abgefragt |
| [[SQL Server - Datensicherheit]] | `GRANT SELECT` (DCL) steuert, wer SELECT/DQL-Abfragen auf Objekten ausführen darf; RLS wirkt wie eine automatische WHERE-Klausel auf Abfragen |
| [[SQL - DQL Joins]] | JOINs erweitern SELECT auf mehrere Tabellen; alle DQL-Klauseln (WHERE, GROUP BY, ORDER BY) bleiben kombinierbar |
| SQL – DML (INSERT/UPDATE/DELETE) | Gegenstück zu DQL: schreibender Zugriff auf Daten |

---

## Quellen & Links
- Kursunterlagen: https://m106.ict-bz.ch/tag-2/operationen-dql
- SQL Standard: ISO/IEC 9075
- Modul 106 – Datenbanken abfragen und bearbeiten (ICT-BZ)
