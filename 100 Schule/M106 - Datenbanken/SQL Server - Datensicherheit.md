---
title: M106 - SQL Server – Datensicherheit
tags:
  - sql
  - sicherheit
  - authentifizierung
  - autorisierung
  - dcl
  - rls
  - masking
  - schule
  - modul-106
created: 2026-05-22
status: draft
publish: false
---

# SQL Server – Datensicherheit

## Überblick
SQL Server schützt Daten auf mehreren Ebenen: Zuerst muss sich ein Benutzer am Server **authentifizieren** (wer bist du?), dann wird geprüft, wozu er **autorisiert** ist (was darfst du?). Darüber hinaus gibt es erweiterte Features wie RLS (Row Level Security) und DDM (Dynamic Data Masking) für feingranulare Datenzugriffskontrolle.

> Verbindung zu [[SQL - Views]]: Views sind ein praktisches Werkzeug zur Zugriffskontrolle – Benutzer erhalten Zugriff auf eine View statt direkt auf die Tabelle.
> Verbindung zu [[SQL - DQL]]: DCL-Berechtigungen wie `GRANT SELECT` steuern, wer DQL-Abfragen auf welchen Objekten ausführen darf.

---

## Inhalt

### 1. Berechtigungskonzept – Zweistufiger Zugriff

SQL Server trennt den Zugriff in zwei klar getrennte Ebenen:

```
Benutzer → [Server Login] → SQL Server
                          → [Database User] → Datenbank A
                                            → Datenbank B
```

| Ebene           | Objekt            | Zweck                                              | Gespeichert in  |
|-----------------|-------------------|----------------------------------------------------|-----------------|
| Serverebene     | **Server Login**  | Anmeldung am SQL Server                            | `master`-DB     |
| Datenbankebene  | **Database User** | Zugriff auf eine spezifische Datenbank             | Jeweilige DB    |

- Für **jede** Datenbank, auf die ein Benutzer zugreifen soll, wird ein separater User benötigt
- Der Endanwender interagiert nur mit dem Login (Benutzername + Passwort)
- Empfehlung: Login und User denselben Namen geben → einfachere Verwaltung

---

### 2. Authentifizierung – Wer bist du?

#### Zwei Authentifizierungsmodi

| Modus                           | Beschreibung                                                                 |
|---------------------------------|------------------------------------------------------------------------------|
| **Windows-Authentifizierung**   | Windows-Domänenkonto wird als Login registriert. Kein separates Passwort nötig. Nur für Domänenmitglieder. |
| **SQL Server-Authentifizierung**| Eigener SQL-Login mit Passwort. Für externe Benutzer ausserhalb der Domäne. |

#### Principal erstellen und löschen

```sql
-- SQL Server-Login erstellen (in master-DB)
USE master;
CREATE LOGIN anmelde_name
    WITH PASSWORD = 'passwort',
    CHECK_POLICY = OFF;

-- Datenbank-User für das Login erstellen
USE myDatabase;
CREATE USER user_name FOR LOGIN anmelde_name;

-- Login löschen
DROP LOGIN anmelde_name;

-- User löschen
DROP USER user_name;
```

#### Login-Optionen

| Option                          | Beschreibung                                   | Standard |
|---------------------------------|------------------------------------------------|----------|
| `DEFAULT_DATABASE = database`   | Setzt die Standarddatenbank                    | master   |
| `CHECK_EXPIRATION = ON/OFF`     | Ob Passwort ablaufen soll                      | OFF      |
| `CHECK_POLICY = ON/OFF`         | Ob Windows-Passwortrichtlinie gelten soll      | ON       |

> Neu angelegte User sind automatisch Mitglied der Datenbankrolle `public`.

---

### 3. Autorisierung – Was darfst du?

#### 3.1 Rollen

Rollen sind Sammlungen von logisch zusammengehörigen Berechtigungen zur vereinfachten Verwaltung.

**Vordefinierte Serverrollen (Auswahl):**

| Rolle            | Beschreibung                         |
|------------------|--------------------------------------|
| `sysadmin`       | Vollzugriff auf den SQL Server       |
| `serveradmin`    | Serverkonfiguration verwalten        |
| `securityadmin`  | Logins und Berechtigungen verwalten  |
| `bulkadmin`      | BULK INSERT-Operationen ausführen    |

**Vordefinierte Datenbankrollen (Auswahl):**

| Rolle             | Beschreibung                              |
|-------------------|-------------------------------------------|
| `db_datareader`   | SELECT auf alle Objekte der Datenbank     |
| `db_datawriter`   | INSERT/UPDATE/DELETE auf alle Objekte     |
| `public`          | Standardrolle für alle neuen User         |

> Die Berechtigungen fester Datenbankrollen können nicht geändert werden (Ausnahme: `public`).

**Rollen zuweisen und entziehen:**

```sql
-- Serverrolle zuweisen
USE master;
ALTER SERVER ROLE rollen_name ADD MEMBER anmelde_name;

-- Serverrolle entziehen
ALTER SERVER ROLE rollen_name DROP MEMBER anmelde_name;

-- Datenbankrolle zuweisen
USE mydatabase;
ALTER ROLE rollen_name ADD MEMBER user_name;

-- Datenbankrolle entziehen
ALTER ROLE rollen_name DROP MEMBER user_name;
```

---

#### 3.2 DCL – Data Control Language

DCL ermöglicht feingranulare Berechtigungsverwaltung über drei Befehle:

| Befehl   | Wirkung                                                          |
|----------|------------------------------------------------------------------|
| `GRANT`  | Berechtigung erteilen                                            |
| `REVOKE` | Bereits erteilte Berechtigung entziehen                          |
| `DENY`   | Berechtigung explizit verweigern (überschreibt Rollenmitgliedschaft) |

> Grundsatz: **Alles was nicht explizit erlaubt ist, ist verboten.**

**Berechtigungstypen:**

| Anweisungsberechtigungen | Objektberechtigungen |
|--------------------------|----------------------|
| `CREATE TABLE/VIEW/...`  | `SELECT`             |
| `BACKUP DATABASE`        | `INSERT`             |
| `CREATE PROCEDURE`       | `UPDATE`             |
|                          | `DELETE`             |
|                          | `EXECUTE`            |
|                          | `REFERENCES`         |

**GRANT – Berechtigung erteilen:**

```sql
-- Objektberechtigung erteilen
GRANT SELECT, INSERT, UPDATE, DELETE ON table_name TO database_user;

-- Allen Usern erteilen
GRANT UPDATE ON table_name TO PUBLIC;

-- Mit Weitergaberecht
GRANT INSERT ON table_name TO database_user WITH GRANT OPTION;

-- Anweisungsberechtigung erteilen
GRANT CREATE TABLE TO database_user;

-- Berechtigung auf ganzes Schema
GRANT SELECT, UPDATE ON SCHEMA::schema_name TO database_user;
```

**REVOKE – Berechtigung entziehen:**

```sql
-- Objektberechtigung entziehen
REVOKE SELECT, INSERT, UPDATE, DELETE ON table_name FROM database_user;

-- Weitergaberecht entziehen (CASCADE: auch alle weitergegebenen Rechte entziehen)
REVOKE GRANT OPTION FOR INSERT ON table_name FROM database_user CASCADE;

-- Anweisungsberechtigung entziehen
REVOKE CREATE TABLE FROM database_user;

-- Berechtigung auf Schema entziehen
REVOKE SELECT, UPDATE ON SCHEMA::schema_name FROM database_user;
```

**DENY – Berechtigung explizit verweigern:**

```sql
-- Verhindert Zugriff auch über Rollenmitgliedschaft
DENY SELECT, INSERT, UPDATE, DELETE ON table_name TO database_user;

-- Allen Usern verweigern
DENY UPDATE ON table_name TO PUBLIC;

-- Anweisungsberechtigung verweigern
DENY CREATE TABLE TO database_user;

-- Auf Schema-Ebene verweigern
DENY SELECT, UPDATE ON SCHEMA::schema_name TO database_user;
```

> Merkhilfe DENY vs. REVOKE: `REVOKE` entfernt eine Erlaubnis. `DENY` setzt eine aktive Sperre – auch wenn der User später einer Rolle mit dem Recht beitritt, bleibt das DENY aktiv.

---

### 4. RLS – Row Level Security

RLS ermöglicht es, den Zugriff auf **einzelne Zeilen** einer Tabelle benutzerabhängig zu steuern – ohne dass der Benutzer davon etwas bemerkt.

**Konzept:** Wie eine unsichtbare WHERE-Klausel, die automatisch auf jede Abfrage angewendet wird.

| Komponente              | Beschreibung                                                     |
|-------------------------|------------------------------------------------------------------|
| **Prädikats-Funktion**  | Inline-Tabellenwertfunktion, bestimmt Zugriff auf Zeilen         |
| **Filter-Prädikat**     | Limitiert Lesezugriff (SELECT)                                   |
| **Block-Prädikat**      | Limitiert Schreibzugriff (INSERT, UPDATE, DELETE)                |
| **Security Policy**     | Sammlung von Sicherheits-Prädikaten, aktiviert RLS               |

**Implementierung in 4 Schritten:**

```sql
-- Schritt 1: User erstellen
USE WideWorldImporters;
CREATE USER Sophia WITHOUT LOGIN;
CREATE USER Eric WITHOUT LOGIN;
GO

-- Schritt 2: Schema und Prädikats-Funktion erstellen
CREATE SCHEMA Security;
GO

CREATE FUNCTION Security.fn_SecurityPredicateOrders(@personID int)
RETURNS TABLE
WITH SCHEMABINDING AS
RETURN (
    SELECT 1 AS fn_SecurityPredicateOrders_Result
    FROM Application.People
    WHERE @personID = PersonID
      AND PreferredName = USER_NAME()
      AND IsSalesperson = 1
);
GO

-- Schritt 3: Security Policy erstellen
CREATE SECURITY POLICY Security.fn_SecurityPredicates
ADD FILTER PREDICATE Security.fn_SecurityPredicateOrders(SalespersonPersonID)
ON Sales.Orders
WITH (STATE = ON);
GO

-- Schritt 4: Testen
GRANT SELECT ON Sales.Orders TO Sophia;
GRANT SELECT ON Sales.Orders TO Eric;

EXECUTE AS USER = 'Sophia';
SELECT * FROM Sales.Orders; -- Sieht nur ihre eigenen Zeilen
REVERT;
```

---

### 5. DDM – Dynamic Data Masking

DDM versteckt sensitive Daten für unbefugte Benutzer **ohne** die gespeicherten Daten zu verändern. Die Maskierung erfolgt zur Abfragezeit.

**Vier Maskierungsfunktionen:**

| Funktion        | Beschreibung                                               | Beispiel         |
|-----------------|------------------------------------------------------------|------------------|
| `default()`     | Vollständige Maskierung                                    | `XXXX`           |
| `email()`       | Erstes Zeichen + Domain sichtbar                           | `aXXX@XXXX.com`  |
| `random(x, y)`  | Zufallszahl im Bereich x–y                                 | `531264`         |
| `partial(x,s,y)`| x Zeichen vorne, Zeichenkette s, y Zeichen hinten sichtbar | `aMASKEDg`       |

```sql
-- Default: Vollständige Maskierung
ALTER TABLE Application.People
ALTER COLUMN LogonName ADD MASKED WITH (FUNCTION = 'default()');

-- Email-Maskierung
ALTER TABLE Application.People
ALTER COLUMN EmailAddress ADD MASKED WITH (FUNCTION = 'email()');

-- Zufallszahl
ALTER TABLE Sales.Orders
ALTER COLUMN PickedByPersonID ADD MASKED WITH (FUNCTION = 'random(1, 99)');

-- Teilmaskierung (1 Zeichen vorne, "XXXXXXX", 0 Zeichen hinten)
ALTER TABLE Application.People
ALTER COLUMN PhoneNumber ADD MASKED WITH (FUNCTION = 'partial(1,"XXXXXXX",0)');
```

> Um maskierte Daten im Klartext zu sehen, braucht ein User die `UNMASK`-Berechtigung.

---

### 6. Sicherheitskonzept – Leitfragen

Beim Erstellen eines Sicherheitskonzepts folgende Fragen klären:

- Wird von ausserhalb des Firmennetzwerks zugegriffen?
- Auf wie viele Datenbanken benötigt der User Zugriff?
- Auf welche Objekte (Tabellen, Views, Schemas) braucht er Zugriff?
- Existiert bereits ein Server Login?
- Gibt es passende vordefinierte Rollen?
- Welche Benutzergruppen dürfen auf welche Daten zugreifen?
- Welche Daten sind besonders schützenswert (→ RLS, DDM, Verschlüsselung)?

---

## Schlüsselbegriffe

- **Authentifizierung**: Identitätsprüfung – wer meldet sich an?
- **Autorisierung**: Berechtigungsprüfung – was darf die Person tun?
- **Server Login**: Anmeldeobjekt auf Serverebene (gespeichert in `master`)
- **Database User**: Zugangsobjekt auf Datenbankebene
- **Principal**: Sammelbezeichnung für Sicherheitsobjekte (Login, User, Rolle)
- **Rolle**: Sammlung von Berechtigungen zur vereinfachten Verwaltung
- **DCL (Data Control Language)**: SQL-Teilbereich für Berechtigungsverwaltung (GRANT, REVOKE, DENY)
- **GRANT**: Berechtigung erteilen
- **REVOKE**: Erteilte Berechtigung entziehen
- **DENY**: Berechtigung aktiv verweigern (überschreibt Rollenmitgliedschaft)
- **WITH GRANT OPTION**: Erlaubt dem User, die erhaltene Berechtigung weiterzugeben
- **RLS (Row Level Security)**: Zeilenbezogene Zugriffskontrolle über Sicherheits-Prädikate
- **Prädikats-Funktion**: Inline-Tabellenwertfunktion, definiert Zugriffsregeln für RLS
- **Security Policy**: Aktiviert und bündelt RLS-Prädikate für eine Tabelle
- **DDM (Dynamic Data Masking)**: Ausblendefunktion sensitiver Daten zur Abfragezeit
- **UNMASK**: Berechtigung zum Anzeigen maskierter Daten im Klartext
- **public**: Standardrolle, der jeder neue User automatisch angehört

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[SQL - Views]] | Views als Sicherheitsschicht: Benutzer erhält Zugriff auf View statt direkt auf Tabelle |
| [[SQL - DQL]] | `GRANT SELECT` steuert, wer DQL-Abfragen ausführen darf; RLS wirkt wie eine automatische WHERE-Klausel |
| SQL – DML | `GRANT/DENY INSERT, UPDATE, DELETE` kontrolliert schreibende Operationen |

---

## Aufgaben
- [[SQL Server - Datensicherheit Aufgaben]]

---

## Quellen & Links
- Kursunterlagen Authentifizierung: https://m106.ict-bz.ch/tag-3/datensicherheit/sql-server-berechtigungskonzept
- Kursunterlagen Autorisierung: https://m106.ict-bz.ch/tag-3/datensicherheit/autorisierung
- Kursunterlagen RLS: https://m106.ict-bz.ch/tag-3/datensicherheit/row-level-security
- Kursunterlagen DDM: https://m106.ict-bz.ch/tag-3/datensicherheit/dynamic-data-masking
- Microsoft Docs Serverrollen: https://docs.microsoft.com/de-de/sql/relational-databases/security/authentication-access/server-level-roles
- Microsoft Docs Datenbankrollen: https://docs.microsoft.com/de-de/sql/relational-databases/security/authentication-access/database-level-roles
- Modul 106 – Datenbanken abfragen und bearbeiten (ICT-BZ)
