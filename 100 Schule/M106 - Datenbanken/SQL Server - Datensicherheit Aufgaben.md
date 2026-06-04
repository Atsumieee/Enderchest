---
title: M106 - SQL Server – Datensicherheit – Aufgaben
tags:
  - sql
  - sicherheit
  - dcl
  - autorisierung
  - authentifizierung
  - schule
  - modul-106
  - aufgaben
created: 2026-05-22
status: draft
publish: false
---

# SQL Server – Datensicherheit – Aufgaben

> Aufgaben aus dem Kursmodul Datensicherheit (Tag 3).
> Theorie: [[SQL Server - Datensicherheit]]

---

## Aufgabe 1 – Login für *ethan* erstellen

Login wird auf Serverebene in der `master`-Datenbank angelegt.

```sql
USE master;
CREATE LOGIN ethan
    WITH PASSWORD = 'WWI4eth!';
```

---

## Aufgabe 2 – User erstellen und Leserolle zuweisen

Die Rolle `db_datareader` gewährt SELECT-Zugriff auf alle Objekte der Datenbank.

```sql
USE WideWorldImporters;

-- User dem Login zuordnen
CREATE USER ethan FOR LOGIN ethan;

-- Datenbankrolle für Lesezugriff auf alle Objekte zuweisen
ALTER ROLE db_datareader ADD MEMBER ethan;
```

---

## Aufgabe 3 – UPDATE auf *Orders* und *OrderLines* erlauben

«Existierende Datensätze verändern» = `UPDATE` (kein INSERT oder DELETE).
In WideWorldImporters liegen diese Tabellen im Schema `Sales`.

```sql
USE WideWorldImporters;

GRANT UPDATE ON Sales.Orders TO ethan;
GRANT UPDATE ON Sales.OrderLines TO ethan;
```

---

## Aufgabe 4 – Mutationen auf *Invoices* und *InvoiceLines* verweigern

«Mutationen jeglicher Art» = INSERT, UPDATE, DELETE.
`DENY` überschreibt auch zukünftige Rollenmitgliedschaften.

```sql
USE WideWorldImporters;

DENY INSERT, UPDATE, DELETE ON Sales.Invoices TO ethan;
DENY INSERT, UPDATE, DELETE ON Sales.InvoiceLines TO ethan;
```

> Warum DENY statt nur kein GRANT? Weil ethan über `db_datareader` bereits in
> einer Rolle ist – und falls er künftig `db_datawriter` erhielte, würde DENY
> diese Schreibrechte auf den zwei Tabellen trotzdem blockieren.

---

## Aufgabe 5 – Login und User *stella* vollständig einrichten

Anforderungen im Überblick:
- Passwort läuft **nie** ab → `CHECK_EXPIRATION = OFF`
- Passwortrichtlinie gilt → `CHECK_POLICY = ON`
- Serverrolle `bulkadmin`
- User in WideWorldImporters
- INSERT-Berechtigung im Schema `Warehouse`

```sql
-- 1. Login erstellen (in master)
USE master;

CREATE LOGIN stella
    WITH PASSWORD = 'WWI4ste!',
         CHECK_EXPIRATION = OFF,
         CHECK_POLICY = ON;

-- 2. Serverrolle zuweisen
ALTER SERVER ROLE bulkadmin ADD MEMBER stella;

-- 3. User in WideWorldImporters erstellen
USE WideWorldImporters;

CREATE USER stella FOR LOGIN stella;

-- 4. INSERT-Berechtigung auf das gesamte Schema Warehouse erteilen
GRANT INSERT ON SCHEMA::Warehouse TO stella;
```

---

## Aufgabe 6 – CREATE TABLE im Schema *Warehouse* erlauben

Um Tabellen in einem bestimmten Schema erstellen zu dürfen, braucht stella zwei Berechtigungen:
1. `CREATE TABLE` – Anweisungsberechtigung auf Datenbankebene
2. `ALTER` auf dem Schema – erlaubt das Erstellen von Objekten darin

```sql
USE WideWorldImporters;

-- Anweisungsberechtigung: Tabellen erstellen dürfen (datenbankweit)
GRANT CREATE TABLE TO stella;

-- Schema-Berechtigung: Objekte im Schema Warehouse ablegen dürfen
GRANT ALTER ON SCHEMA::Warehouse TO stella;
```

---

## Gesamtübersicht: Berechtigungsmatrix

| Benutzer | Objekt                   | SELECT | INSERT | UPDATE | DELETE | Bemerkung                    |
|----------|--------------------------|:------:|:------:|:------:|:------:|------------------------------|
| ethan    | Alle Tabellen (WWI)      | ✓      |        |        |        | via `db_datareader`          |
| ethan    | Sales.Orders             | ✓      |        | ✓      |        | GRANT UPDATE                 |
| ethan    | Sales.OrderLines         | ✓      |        | ✓      |        | GRANT UPDATE                 |
| ethan    | Sales.Invoices           | ✓      | ✗      | ✗      | ✗      | DENY Mutationen              |
| ethan    | Sales.InvoiceLines       | ✓      | ✗      | ✗      | ✗      | DENY Mutationen              |
| stella   | Schema Warehouse         |        | ✓      |        |        | GRANT INSERT ON SCHEMA       |
| stella   | Schema Warehouse         |        |        | CREATE |        | GRANT CREATE TABLE + ALTER   |

---

## Schlüsselerkenntnisse aus den Aufgaben

- `db_datareader` ist die einfachste Methode für vollständigen Lesezugriff auf eine DB
- `GRANT UPDATE` erteilt nur Schreibrecht auf bestehende Zeilen – kein INSERT/DELETE
- `DENY` ist stärker als `GRANT` – es blockiert auch indirekte Rechte über Rollen
- Für CREATE TABLE in einem Schema braucht es immer **zwei** Berechtigungen:
  `CREATE TABLE` (DB-Ebene) + `ALTER ON SCHEMA` (Schema-Ebene)
- `CHECK_EXPIRATION = OFF` + `CHECK_POLICY = ON` ist die übliche Kombination für
  Service-Accounts: Richtlinie gilt, aber kein automatisches Ablaufen

---

## Quellen & Links
- Theorie: [[SQL Server - Datensicherheit]]
- Kursunterlagen: https://m106.ict-bz.ch/tag-3/datensicherheit/autorisierung
- Modul 106 – Datenbanken abfragen und bearbeiten (ICT-BZ)
