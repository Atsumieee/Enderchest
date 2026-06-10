---
title: "M106 – Indizes"
tags: [schule, modul-106, sql, indizes]
created: 2026-05-28
status: draft
publish: false
---
# Indizes – Grundlagen und Praxis

## Überblick
Indizes sind datenbankspezifische Strukturen, die das Auffinden von Zeilen erheblich beschleunigen. Sie funktionieren ähnlich wie ein **Inhaltsverzeichnis** in einem Buch: Der Index enthält den gesuchten Wert und einen Verweis (ROWID) auf die physische Speicherposition der Zeile. Während sie Lese‑Abfragen (SELECT) stark beschleunigen, erhöhen sie den Overhead für Schreib‑Operationen (INSERT, UPDATE, DELETE), weil der Index bei jeder Datenänderung aktualisiert werden muss.

## 1 Warum und wann Indizes einsetzen?
| Situation | Warum ein Index hilft | Hinweis |
|-----------|----------------------|--------|
| **Große Tabelle** mit mehreren hunderttausend Zeilen | Reduziert die zu scannenden Seiten von Millionen auf wenige Dutzend. | Je größer die Tabelle, desto größer der Nutzen.
| **Spalte wird häufig gefiltert** (`WHERE`, `JOIN`, `ORDER BY`) | Der Optimizer kann einen **Seek** statt eines **Scans** ausführen. | Nur sinnvoll, wenn die Spalte selektiv ist (viele unterschiedliche Werte). |
| **Fremdschlüssel‑Spalte** (für Joins) | Beschleunigt das Verbinden mehrerer Tabellen. | Für jede FK‑Spalte empfiehlt sich ein Index. |
| **Primärschlüssel** | Ein **clustered Index** wird implizit erstellt und definiert die physische Reihenfolge. | Nur ein clustered Index pro Tabelle möglich. |
| **Schreibintensive Tabelle** (z. B. Log‑ oder Queue‑Tabellen) | Jeder Index erhöht die Schreib‑Kosten. | Halten Sie die Anzahl der Indizes hier minimal. |

## 2 Index‑Typen in SQL Server
| Typ | Eigenschaften | Einsatzbeispiele |
|-----|----------------|-------------------|
| **Clustered Index** | Legt die physische Reihenfolge der Zeilen basierend auf den indizierten Spalten fest. Es kann **nur ein** pro Tabelle geben. | Primärschlüssel, häufig nach dieser Spalte sortierte Abfragen. |
| **Non‑clustered Index** | Separate Struktur; Blattknoten enthalten den indizierten Wert + **ROWID** zur Zeile. Mehrere pro Tabelle möglich. | Sekundäre Suchschlüssel, häufig gefilterte Spalten. |
| **Unique Index** | Erzwingt, dass alle Werte in den indizierten Spalten eindeutig sind. Kann sowohl clustered als auch non‑clustered sein. | Schlüsselspalten, Business‑Regeln (z. B. `Email` muss eindeutig sein). |

## 3 Erstellung und Syntax
### 3.1 Einfacher non‑clustered Index
```sql
CREATE INDEX ix_InvoiceDate
ON Sales.Invoices (InvoiceDate);
```
- Der Index wird *asynchron* erstellt, danach sofort nutzbar.

### 3.2 Clustered Index (oft über Primärschlüssel)
```sql
ALTER TABLE Sales.Invoices
ADD CONSTRAINT PK_Invoices PRIMARY KEY CLUSTERED (InvoiceID);
```
- Der **PRIMARY KEY** erzeugt implizit einen clustered Index, falls keiner vorhanden ist.

### 3.3 Unique Index
```sql
CREATE UNIQUE INDEX ux_CustomerEmail
ON Sales.Customers (Email);
```
- Verhindert Duplikate bereits auf Datenbank‑Ebene.

### 3.4 Index mit mehreren Spalten (Composite Index)
```sql
CREATE NONCLUSTERED INDEX ix_Order_CustomerDate
ON Sales.Orders (CustomerID, OrderDate);
```
- Reihenfolge der Spalten ist entscheidend: Der Index kann effektiv für Queries genutzt werden, die die **erste** Spalte (oder beide) im Filter angeben.

## 4 Best‑Practice‑Checkliste (Vor dem Anlegen)
1. **Statistiken prüfen** – `UPDATE STATISTICS` gibt dem Optimizer aktuelle Datenverteilung.
2. **Selektivität bestimmen** – Ideal ist eine Selektivität < 0.1 (weniger als 10 % der Zeilen treffen). Für sehr niedrige Selektivität (`BIT`, `TRUE/FALSE`) ist ein Index meist nutzlos.
3. **Abfrage‑Plan analysieren** – Siehe das **Ausführungsplan‑Kapitel**; wenn ein *Table Scan* erscheint, prüfen Sie einen passenden Index.
4. **Wartungsaufwand kalkulieren** – Jeder Index fügt Schreib‑Overhead hinzu. Für Tabellen mit > 100 000 Writes pro Tag sollte man sparsam sein.
5. **Index‑Fragmentierung überwachen** – `sys.dm_db_index_physical_stats` zeigt, wann ein Index neu aufgebaut (`ALTER INDEX REBUILD`) werden muss.

## 5 Wartung und Optimierung
- **Rebuild** bei hoher Fragmentierung (> 30 %): `ALTER INDEX ix_InvoiceDate ON Sales.Invoices REBUILD;`
- **Reorganize** bei geringerer Fragmentierung: `ALTER INDEX ix_InvoiceDate ON Sales.Invoices REORGANIZE;`
- **Drop** nicht genutzte Indizes: `DROP INDEX ix_OldIndex ON Sales.Invoices;`
- **Monitoring** – Verwenden Sie DMVs wie `sys.dm_db_index_usage_stats`, um zu sehen, wie oft ein Index verwendet wird.

## 6 Tipps für die Praxis
- **Index‑Namen** konsistent benennen, z. B. `ix_<Tabelle>_<Spalte>`.
- **Include‑Spalten** nutzen, um *Covering‑Indexes* zu bauen, sodass die Abfrage nur den Index und nicht die Tabelle lesen muss:
  ```sql
  CREATE NONCLUSTERED INDEX ix_Order_Cover
  ON Sales.Orders (CustomerID)
  INCLUDE (OrderDate, TotalAmount);
  ```
- **Filtered Indexes** für Teilmengen (z. B. nur aktive Kunden):
  ```sql
  CREATE NONCLUSTERED INDEX ix_ActiveCustomers
  ON Sales.Customers (CustomerID)
  WHERE IsActive = 1;
  ```

## Schlüsselbegriffe
- **Clustered Index**, **Non‑clustered Index**, **Unique Index**, **Composite Index**, **Include‑Spalten**, **Filtered Index**, **Selektivität**, **Fragmentierung**

## Verbindungen zu anderen Themen
| Thema | Verbindung |
|-------|------------|
| [[SQL - DQL]] | Der Ausführungsplan zeigt, ob ein Index genutzt wird. |
| [[SQL – Ausfuehrungsplan]] | Analyse von **Seek** vs. **Scan** – Kern des Index‑Diagnostik. |
| [[SQL – Funktionen]] | Nicht‑deterministische Funktionen verhindern Index‑Nutzung. |

## Bilder
<!-- Platzhalter für Bild(e) – bitte hier einfügen -->
![Index‑Struktur](/path/to/index-struktur.png)
