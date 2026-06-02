---
title: "M106 – Projekt‑Aufgaben"
tags: [schule, modul-106, sql, projekt-aufgaben]
created: 2026-05-28
status: draft
publish: false
---
# Projekt‑Aufgaben (M106)

## Überblick
Dieses Dokument fasst die praktischen Labor‑Aufgaben des M106‑Moduls in einem fortlaufenden Textformat zusammen. Jede Aufgabe ist nummeriert, enthält eine Zielbeschreibung, die zugehörigen Kern‑SQL‑Befehle und Hinweise zum zu übenden Konzept. Bild‑Platzhalter markieren Stellen, an denen später Screenshots, Diagramme oder Ergebnis‑Tabellen eingefügt werden können.

---
### Aufgabe 1 – Northwind‑Datenbank erstellen
**Ziel / Lerninhalt**: Eine komplette Beispiel‑Datenbank aus dem mitgelieferten Skript `Northwind‑SQLServer.sql` anlegen.

**Kern‑SQL‑Befehle**
```sql
CREATE DATABASE Northwind;
GO
-- Skript ausführen (z. B. über sqlcmd oder SSMS)
:ON ERROR EXIT
:r "Northwind‑SQLServer.sql"
```
**Hinweis**: Nach dem Import das ER‑Diagramm prüfen.

**Bild‑Platzhalter**
![ER‑Diagramm nach Import](/path/to/er-diagramm.png)

---
### Aufgabe 2 – Vollständiges Backup
**Ziel**: Die gesamte Datenbank in einer `.bak`‑Datei sichern.

**SQL**
```sql
BACKUP DATABASE [WideWorldImporters]
TO DISK = N'C:\Backups\WideWorldImporters_full.bak'
WITH NOFORMAT, NOINIT,
     NAME = N'WideWorldImporters Vollständige Sicherung',
     SKIP, STATS = 10;
```
**Hinweis**: Das Log‑Fenster zeigt den Fortschritt an.

**Bild‑Platzhalter**
![Backup‑Log](/path/to/backup-log.png)

---
### Aufgabe 3 – Backup‑Wiederherstellung
**Ziel**: Eine zuvor gesicherte Datenbank löschen und aus dem Backup wiederherstellen.

**SQL**
```sql
DROP DATABASE IF EXISTS WideWorldImporters;
GO
RESTORE DATABASE [WideWorldImporters]
FROM DISK = N'C:\Backups\WideWorldImporters_full.bak';
```
**Hinweis**: Nach dem Restore den Datenbank‑Status prüfen.

**Bild‑Platzhalter**
![Wiederhergestellter Status](/path/to/restore-status.png)

---
### Aufgabe 4 – Produkt‑Datentyp‑Übersicht
**Ziel**: Alle Spalten‑Datentypen der Tabelle `Products` ausgeben.

**SQL**
```sql
SELECT COLUMN_NAME, DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Products';
```
**Bild‑Platzhalter**
![Datentyp‑Ergebnis](/path/to/datentyp-ergebnis.png)

---
### Aufgabe 5 – Lohn‑Tabelle anlegen (`payroll_accounting`)
**Ziel**: Neues Schema `hr` und Tabelle für Gehaltsinformationen erstellen.

**SQL**
```sql
CREATE SCHEMA hr;
GO
CREATE TABLE hr.payroll_accounting (
title VARCHAR(100) NOT NULL,
salary MONEY NOT NULL
);

GO

INSERT INTO hr.payroll_accounting VALUES
	('Inside Sales Coordinator', 80000),
	('Vice President, Sales', 100000),
	('Sales Representative', 80000),
	('Sales Manager', 90000);
```
**Hinweis**: Keine Primär‑/Foreign‑Keys erforderlich – Fokus liegt auf `INSERT`.

**Bild‑Platzhalter**
![Tabelle payroll_accounting](/path/to/payroll-table.png)

---
### Aufgabe 6 – Lohn‑View `lohnuebersicht`
**Ziel**: View erzeugen, das Namen, Grundgehalt und kumulierte jährliche Erhöhungen (30 $ / Monat) anzeigt; optional Bonus für 1993‑Einstellungen.

**SQL**
```sql
SELECT 
    E.FirstName,
    E.LastName,
    Calculated.Monate,
    P.salary,
    Calculated.Lohnerhoehung,
    Calculated.Bonus,
    (P.salary + Calculated.Lohnerhoehung + Calculated.Bonus) AS Total
FROM Employees AS E
    INNER JOIN hr.payroll_accounting AS P ON E.Title = P.title
    CROSS APPLY (
        SELECT 
            DATEDIFF(MONTH, E.HireDate, GETDATE()) AS Monate,
            (30 * DATEDIFF(MONTH, E.HireDate, GETDATE())) AS Lohnerhoehung,
            CASE WHEN YEAR(E.HireDate) = 1993 THEN (DATEDIFF(YEAR, E.HireDate, GETDATE()) * 1000) ELSE 0 END AS Bonus
    ) AS Calculated;
```
**Bild‑Platzhalter**
![View‑Definition](/path/to/view-definition.png)

---
### Aufgabe 7 – Mitarbeiter‑Bewertung
**Ziel**: Spalte `valuation` (A‑D) mit Default‑Wert `B` hinzufügen und Vorgabewerte setzen.

**SQL**
```sql
ALTER TABLE Employees 
ADD valuation CHAR(1) NOT NULL DEFAULT 'B'
    CONSTRAINT CK_Employees_valuation CHECK (valuation IN ('A', 'B', 'C', 'D'));

GO;

UPDATE Employees SET valuation = 'A' WHERE FirstName = 'Nancy'  AND LastName = 'Davolio';
UPDATE Employees SET valuation = 'C' WHERE FirstName = 'Robert' AND LastName = 'King';
```
**Hinweis**: In Aufgabe 8 wird diese Spalte umbenannt.

---
### Aufgabe 8 – Spalte umbenennen (`valuation` → `rating`)
**Ziel**: Den bestehenden Constraint entfernen, die Spalte umbenennen und einen neuen Check‑Constraint anlegen.

**SQL**
```sql
SELECT name FROM sys.check_constraints WHERE parent_object_id = OBJECT_ID('Employees');

ALTER TABLE Employees DROP CONSTRAINT CK_Employees_valuation;

EXEC sp_rename 'Employees.valuation', 'rating', 'COLUMN';

ALTER TABLE Employees 
ADD CONSTRAINT CK_Employees_rating CHECK (rating IN ('A', 'B', 'C', 'D'));
```
**Bild‑Platzhalter**
![sp_rename‑Ausgabe](/path/to/sp_rename.png)

---
### Aufgabe 9 – Tabelle umbenennen (`hr.payroll_accounting` → `salaries`)
**SQL**
```sql
EXEC sp_rename 'hr.payroll_accounting', 'salaries';
GO
```
**Bild‑Platzhalter**
![Schema‑Baum‑nach‑Umbenennung](/path/to/schema-tree.png)

---
### Aufgabe 10 – Kopie von `Products` (`products_backup`) ohne Constraints
**SQL**
```sql
SELECT * INTO products_backup FROM Products;
GO
```
**Bild‑Platzhalter**
![Backup‑Tabellen‑Properties](/path/to/backup-properties.png)

---
### Aufgabe 11 – Transaktion – Löschung rückgängig
**SQL**
```sql
BEGIN TRANSACTION;
    DELETE FROM products_backup;
    SELECT COUNT(*) FROM products_backup;
ROLLBACK;
GO
SELECT COUNT(*) FROM products_backup; 
```
**Hinweis**: Nach dem Rollback die Zeilen‑Anzahl prüfen – sie muss unverändert bleiben.

---
### Aufgabe 12 – DDL‑Löschung (`TRUNCATE`)
**SQL**
```sql
TRUNCATE TABLE products_backup;
GO
```
**Hinweis**: `TRUNCATE` ist nicht rückgängig zu machen – kein Log‑Eintrag.

---
### Aufgabe 13 – Tabelle komplett entfernen
**SQL**
```sql
DROP TABLE products_backup;
GO
```
---
### Aufgabe 14 – Kopie neu anlegen & `MERGE`‑Rollback
**SQL**
```sql
SELECT * INTO products_backup FROM Products;
GO

UPDATE Products SET ProductName = 'TestName' WHERE ProductID = 1;
GO

SELECT ProductID, ProductName FROM Products WHERE ProductID = 1;
GO

MERGE INTO Products AS target
USING products_backup AS source
    ON target.ProductID = source.ProductID
WHEN MATCHED AND target.ProductName <> source.ProductName THEN
    UPDATE SET target.ProductName = source.ProductName;
GO

SELECT ProductID, ProductName FROM Products WHERE ProductID = 1;

```
---
### Aufgabe 15 – Login `test` anlegen & Leserechte testen
**SQL**
```sql
CREATE LOGIN test WITH PASSWORD = 'Test1234!';
GO

USE Northwind;
GO

CREATE USER test FOR LOGIN test;
GO

ALTER ROLE db_datareader ADD MEMBER test;
GO
```
**Hinweis**: Der UPDATE‑Fehler bestätigt, dass nur Lese‑Rechte vergeben wurden.
---
### Aufgabe 16 – Update‑Rechte für `test`
**SQL**
```sql
GRANT UPDATE ON Products TO test;
GO
```
---
### Aufgabe 17 – Alle Rechte entfernen, nur `hr`‑Leserechte
**SQL**
```sql
REVOKE UPDATE ON Products FROM test;
GO

ALTER ROLE db_datareader DROP MEMBER test;
GO

ALTER SCHEMA hr TRANSFER dbo.Employees;
GO

GRANT SELECT ON SCHEMA::hr TO test;
GO
```
**Hinweis**: Vorher `Employees` in das Schema `hr` verschieben (siehe Hinweis unten).
---
### Aufgabe 18 – Maskierung für Gehalts‑Spalte
**SQL**
```sql
ALTER TABLE hr.salaries 
ALTER COLUMN salary ADD MASKED WITH (FUNCTION = 'default()');
GO

-- Maske entfernen (optional):
ALTER TABLE hr.salaries ALTER COLUMN salary DROP MASKED;
GO
```
---
### Aufgabe 19 – Umsatz 1997 inkl. Rabatt
**SQL**
```sql
SELECT 
    ROUND(SUM(OD.Quantity * OD.UnitPrice * (1 - OD.Discount)), 2) AS Gesamtumsatz_1997
FROM [Order Details] AS OD
INNER JOIN Orders AS O ON OD.OrderID = O.OrderID
WHERE YEAR(O.OrderDate) = 1997;
GO
```
---
### Aufgabe 20 – Kunden‑Bestell‑Summen (ohne Rabatt)
**SQL**
```sql
SELECT 
    C.CustomerID,
    C.CompanyName,
    SUM(OD.Quantity * OD.UnitPrice) AS Gesamtbestellsumme
FROM Customers AS C
INNER JOIN Orders AS O             ON C.CustomerID = O.CustomerID
INNER JOIN [Order Details] AS OD   ON O.OrderID    = OD.OrderID
GROUP BY C.CustomerID, C.CompanyName
ORDER BY Gesamtbestellsumme DESC;
GO
```
---
### Aufgabe 21 – Lieferanten mit mehr als 4 Produkten
**SQL**
```sql
SELECT 
    S.SupplierID,
    S.CompanyName,
    COUNT(P.ProductID) AS AnzahlProdukte
FROM Suppliers AS S
INNER JOIN Products AS P ON S.SupplierID = P.SupplierID
GROUP BY S.SupplierID, S.CompanyName
HAVING COUNT(P.ProductID) > 4
ORDER BY AnzahlProdukte DESC;
GO
```
---
### Aufgabe 22 – Mitarbeiter mit meisten Tofu‑Verkäufen
**SQL**
```sql
SELECT TOP 1
    E.FirstName,
    E.LastName,
    SUM(OD.Quantity) AS AnzahlTofu
FROM hr.Employees AS E                 
INNER JOIN Orders AS O             ON E.EmployeeID = O.EmployeeID
INNER JOIN [Order Details] AS OD   ON O.OrderID    = OD.OrderID
INNER JOIN Products AS P           ON OD.ProductID = P.ProductID
WHERE P.ProductName = 'Tofu'
GROUP BY E.EmployeeID, E.FirstName, E.LastName
ORDER BY AnzahlTofu DESC;
GO
```
---
### Aufgabe 23 – Längste Betriebszugehörigkeit
**SQL**
```sql
SELECT TOP 1 LastName, FirstName, HireDate
FROM hr.Employees
ORDER BY HireDate ASC;
GO
```
---
### Aufgabe 24 – Benutzername aus Vor‑/Nachname generieren
**SQL**
```sql
SELECT 
    FirstName,
    LastName,
    LOWER(LEFT(LastName, 3) + LEFT(FirstName, 3)) AS Username
FROM hr.Employees;
GO
```
---
### Aufgabe 25 – Personalnummer nach Formel
**SQL**
```sql
SELECT 
    EmployeeID,
    FirstName,
    LastName,
    (
        CAST(YEAR(HireDate)  AS BIGINT) * 10000 +
        CAST(MONTH(HireDate) AS BIGINT) * 100   +
        CAST(DAY(HireDate)   AS BIGINT)
    ) * EmployeeID AS Personalnummer
FROM hr.Employees;
GO
```
---
### Aufgabe 26 – Alter in Jahren
**SQL**
```sql
SELECT 
    FirstName,
    LastName,
    BirthDate,
    DATEDIFF(YEAR, BirthDate, GETDATE()) -
        CASE 
            WHEN MONTH(BirthDate) > MONTH(GETDATE()) 
              OR (MONTH(BirthDate) = MONTH(GETDATE()) 
             AND DAY(BirthDate)   > DAY(GETDATE()))
            THEN 1 ELSE 0 
        END AS [Alter]
FROM hr.Employees;
GO
```
---
### Aufgabe 27 – Index‑Analyse für `ProductName`
**Ziel**: Vorhandenen Index entfernen, Performance messen, Index neu anlegen und erneut messen.

**SQL**
```sql
SET STATISTICS IO ON;
SELECT ProductName FROM Products;
SET STATISTICS IO OFF;
GO


DROP INDEX IX_Products_ProductName ON Products;
GO


SET STATISTICS IO ON;
SELECT ProductName FROM Products;
SET STATISTICS IO OFF;
GO

CREATE INDEX IX_Products_ProductName ON Products(ProductName);
GO
```
**Bild‑Platzhalter**
- Ohne Index: hohe
(77 rows affected)
Table 'Products'. Scan count 1, logical reads **4**, physical reads 0, page server reads 0, read-ahead reads 0, page server read-ahead reads 0, lob logical reads 0, lob physical reads 0, lob page server reads 0, lob read-ahead reads 0, lob page server read-ahead reads 0.

- Nach Neu‑Anlage
(77 rows affected)
Table 'Products'. Scan count 1, logical reads **2**, physical reads 0, page server reads 0, read-ahead reads 0, page server read-ahead reads 0, lob logical reads 0, lob physical reads 0, lob page server reads 0, lob read-ahead reads 0, lob page server read-ahead reads 0.

---

---
## Bilder
<!-- Platzhalter für weitere Bild(e) – bitte hier einfügen -->
![Aufgaben‑Übersicht](/path/to/aufgaben-uebersicht.png)
