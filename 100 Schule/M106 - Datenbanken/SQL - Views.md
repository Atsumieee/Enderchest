---
title: M106 - SQL – Views
tags:
  - sql
  - views
  - datenbank
  - schule
  - modul-106
created: 2026-05-22
status: draft
publish: false
---

# SQL – Views

## Überblick
Eine View (virtuelle Tabelle) ist eine gespeicherte `SELECT`-Anweisung auf dem Datenbankserver, die sich für den Benutzer wie eine normale Tabelle verhält. Sie speichert keine Daten, sondern nur die Abfragelogik. Views vereinfachen komplexe Abfragen und erlauben eine gezielte Rechtevergabe.

> Verbindung zu [[SQL - DQL]]: Views werden mit DQL-Mitteln erstellt (`SELECT`) und auch mit DQL abgefragt. Alle DQL-Konzepte (WHERE, JOIN, Aggregatfunktionen etc.) können innerhalb einer View verwendet werden – mit den unten beschriebenen Einschränkungen.

---

## Inhalt

### 1. Was ist eine View?

- Gespeicherte `SELECT`-Anweisung auf dem Server
- Verhält sich nach aussen wie eine Tabelle (virtuelle Tabelle)
- Speichert **keine Daten**, nur die Abfragelogik → benötigt (praktisch) keinen Speicherplatz
- Wird bei jeder Abfrage neu ausgeführt (dynamisch)
- Kann eine oder mehrere Tabellen abstrahieren

---

### 2. View erstellen

```sql
CREATE VIEW view_name [WITH ENCRYPTION] AS
    SELECT ...
[WITH CHECK OPTION];
```

| Option              | Bedeutung                                                                                      |
|---------------------|------------------------------------------------------------------------------------------------|
| `WITH ENCRYPTION`   | View-Definition wird in den Systemtabellen verschlüsselt (nur SQL Server)                     |
| `WITH CHECK OPTION` | DML-Operationen dürfen nur Werte schreiben, die von der View auch angezeigt werden             |

**Beispiel `WITH CHECK OPTION`:**
Wenn die View `WHERE feld1 > 10` enthält, schlägt folgendes fehl:
```sql
UPDATE meine_view SET feld1 = 5; -- Fehler: Wert liegt ausserhalb der View-Bedingung
```

---

### 3. View abfragen

Eine View wird exakt wie eine Tabelle mit DQL abgefragt:

```sql
SELECT * FROM view_name;

-- Mit Filterung (wie bei normalen Tabellen)
SELECT * FROM view_name WHERE spalte = 'wert';
```

---

### 4. View ändern und löschen

```sql
-- View ändern (alle Optionen müssen neu gesetzt werden)
ALTER VIEW view_name [WITH ENCRYPTION] AS
    SELECT ...
[WITH CHECK OPTION];

-- View löschen
DROP VIEW view_name;
```

---

### 5. Rechtevergabe über Views

Views ermöglichen eine granulare Zugriffskontrolle:
- Benutzer erhält **keinen** direkten Zugriff auf eine Tabelle
- Benutzer erhält **Zugriff auf eine View**, die nur bestimmte Spalten/Zeilen zeigt
- Sensible Spalten (z.B. Passwörter, Gehälter) können so ausgeblendet werden

---

### 6. Einschränkungen

#### In der SELECT-Anweisung der View nicht erlaubt:

| Element             | Grund                                              |
|---------------------|----------------------------------------------------|
| `ORDER BY`          | Views sind mengenbasiert, haben keine Reihenfolge  |
| `INTO`              | Views schreiben keine Daten                        |
| Temporäre Tabellen  | Nicht persistent genug für View-Definitionen       |

#### DML (INSERT/UPDATE/DELETE) auf eine View nicht möglich, wenn sie enthält:

- Aggregatfunktionen (`COUNT`, `SUM`, etc.)
- `GROUP BY`
- `TOP`
- `UNION`
- `DISTINCT`
- Berechnete Spalten in `SELECT`

---

### 7. Praxisbeispiel

```sql
-- View erstellen: Nur Städte aus Kalifornien
CREATE VIEW CalifornianCities AS
    SELECT c.CityID, c.CityName, sp.StateProvinceCode, sp.StateProvinceName
    FROM Application.Cities c
    INNER JOIN Application.StateProvinces sp
        ON c.StateProvinceID = sp.StateProvinceID
    WHERE sp.StateProvinceName = 'California';

-- View abfragen
SELECT * FROM CalifornianCities WHERE CityName = 'Los Angeles';

-- View löschen
DROP VIEW CalifornianCities;
```

---

## Schlüsselbegriffe

- **View**: Gespeicherte SELECT-Anweisung, die wie eine virtuelle Tabelle wirkt
- **Virtuelle Tabelle**: Tabelle ohne eigene Datenspeicherung
- **WITH ENCRYPTION**: Verschlüsselt die View-Definition im Systemkatalog
- **WITH CHECK OPTION**: Stellt sicher, dass DML die View-Bedingung nicht verletzt
- **DML (Data Manipulation Language)**: INSERT, UPDATE, DELETE – Datenschreiboperationen
- **Systemkatalog**: Interne Datenbank-Metadaten-Tabellen des DBMS

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[SQL - DQL]] | Views basieren auf SELECT; alle DQL-Klauseln anwendbar |
| [[SQL Server - Datensicherheit]] | Views als Sicherheitswerkzeug: Zugriff auf View statt direkt auf Tabelle; `GRANT CREATE VIEW` ist eine Anweisungsberechtigung (DCL) |
| SQL – DML (INSERT/UPDATE/DELETE) | Eingeschränkte DML auf Views möglich |
| SQL – JOINs | Views kapseln häufig komplexe JOINs |

---

## Quellen & Links
- Kursunterlagen: https://m106.ict-bz.ch/tag-3/views
- Modul 106 – Datenbanken abfragen und bearbeiten (ICT-BZ)
