---
title: SQL – DQL Joins
tags:
  - sql
  - dql
  - joins
  - inner-join
  - outer-join
  - cross-join
  - self-join
  - schule
  - modul-106
created: 2026-05-23
status: draft
publish: true
---

# SQL – DQL Joins

## Überblick
JOINs verbinden mehrere Tabellen anhand von Schlüsselfeldern zu einem gemeinsamen Resultset. Die meisten JOINs sind sogenannte EQUI JOINs, bei denen zwei Tabellen über übereinstimmende Spalten mit dem Gleichheitsoperator verknüpft werden. Die verbundenen Spalten müssen dabei nicht zwingend PK/FK-Paare sein.

> Voraussetzung: [[SQL - DQL]] — JOINs sind eine Erweiterung der SELECT-Abfrage.
> Verbindung: [[SQL - Views]] — Views kapseln häufig komplexe JOIN-Abfragen.

---

## Inhalt

### 1. Überblick JOIN-Arten

![[SQL_JOIN_Arten.png]]

Gegeben sind zwei Tabellen A und B mit je einer Spalte:

| Tabelle A | Tabelle B |
|-----------|-----------|
| 1         | 3         |
| 2         | 4         |
| 3         | 5         |
| 4         | 6         |

Werte 3 und 4 existieren in beiden Tabellen (Schnittmenge).
Werte 1, 2 nur in A — Werte 5, 6 nur in B.

| JOIN-Art         | Was wird zurückgegeben                      | Resultat (a / b)                          |
|------------------|---------------------------------------------|-------------------------------------------|
| INNER JOIN       | Nur die Schnittmenge                        | 3/3, 4/4                                  |
| LEFT OUTER JOIN  | Alle Zeilen aus A + Schnittmenge (B = NULL) | 1/NULL, 2/NULL, 3/3, 4/4                 |
| RIGHT OUTER JOIN | Alle Zeilen aus B + Schnittmenge (A = NULL) | 3/3, 4/4, NULL/5, NULL/6                 |
| FULL OUTER JOIN  | Alle Zeilen beider Tabellen                 | 1/NULL, 2/NULL, 3/3, 4/4, NULL/5, NULL/6 |

---

### 2. Beispieldatensatz

Alle nachfolgenden Beispiele basieren auf diesen zwei Tabellen:

**Kundentabelle:**

| KundenId | Vorname | Nachname |
|----------|---------|----------|
| 1        | Hans    | Meier    |
| 2        | Ueli    | Muster   |
| 3        | Sepp    | Hofer    |

**Bestelltabelle:**

| BestellId | KundenId | Preis |
|-----------|----------|-------|
| 1         | 4        | 10    |
| 2         | 2        | 13    |
| 3         | 1        | 20    |

> Bestellung 1 hat KundenId 4 — dieser Kunde existiert nicht in der Kundentabelle.
> Kunde 3 (Sepp Hofer) hat keine Bestellung.

---

### 3. INNER JOIN

Gibt **nur die Schnittmenge** zurück — Zeilen, die in **beiden** Tabellen einen übereinstimmenden Wert haben. Nicht verknüpfbare Zeilen werden ausgeblendet.

```sql
SELECT bestellung.bestellid, kunde.vorname, kunde.nachname, bestellung.preis
FROM bestellung
INNER JOIN kunde ON bestellung.kundenId = kunde.KundenId;
```

| BestellId | Vorname | Nachname | Preis |
|-----------|---------|----------|-------|
| 3         | Hans    | Meier    | 20    |
| 2         | Ueli    | Muster   | 13    |

> Bestellung 1 (KundenId 4 existiert nicht) fehlt im Resultat.
> Sepp Hofer (keine Bestellung) fehlt im Resultat.

---

### 4. LEFT JOIN / LEFT OUTER JOIN

Gibt **alle Zeilen der linken Tabelle** zurück. Wo kein Match existiert, werden die Spalten der rechten Tabelle mit NULL befüllt.

«Links» = die Tabelle, die **vor** dem Keyword JOIN steht.

```sql
SELECT bestellung.bestellid, kunde.vorname, kunde.nachname, bestellung.preis
FROM bestellung
LEFT JOIN kunde ON bestellung.kundenId = kunde.KundenId;
```

| BestellId | Vorname | Nachname | Preis |
|-----------|---------|----------|-------|
| 1         | NULL    | NULL     | 10    |
| 2         | Ueli    | Muster   | 13    |
| 3         | Hans    | Meier    | 20    |

> Use-Case: Alle Bestellungen anzeigen — auch jene ohne gültigen Kunden.

---

### 5. RIGHT JOIN / RIGHT OUTER JOIN

Gibt **alle Zeilen der rechten Tabelle** zurück. Wo kein Match existiert, werden die Spalten der linken Tabelle mit NULL befüllt.

«Rechts» = die Tabelle, die **nach** dem Keyword JOIN steht.

```sql
SELECT bestellung.bestellid, kunde.vorname, kunde.nachname, bestellung.preis
FROM bestellung
RIGHT JOIN kunde ON bestellung.kundenId = kunde.KundenId;
```

| BestellId | Vorname | Nachname | Preis |
|-----------|---------|----------|-------|
| 3         | Hans    | Meier    | 20    |
| 2         | Ueli    | Muster   | 13    |
| NULL      | Sepp    | Hofer    | NULL  |

> Use-Case: Alle Kunden anzeigen — auch jene ohne Bestellungen.
> Merkhilfe: A LEFT JOIN B ist identisch zu B RIGHT JOIN A — symmetrisch durch Tauschen der Tabellenreihenfolge.

---

### 6. FULL OUTER JOIN

Gibt **alle Zeilen beider Tabellen** zurück. Nicht verknüpfbare Zeilen erhalten auf der fehlenden Seite NULL-Werte.

```sql
SELECT bestellung.bestellid, kunde.vorname, kunde.nachname, bestellung.preis
FROM bestellung
FULL JOIN kunde ON bestellung.kundenId = kunde.KundenId;
```

| BestellId | Vorname | Nachname | Preis |
|-----------|---------|----------|-------|
| 1         | NULL    | NULL     | 10    |
| 2         | Ueli    | Muster   | 13    |
| 3         | Hans    | Meier    | 20    |
| NULL      | Sepp    | Hofer    | NULL  |

> Use-Case: Vollständige Übersicht beider Tabellen unabhängig vom Match.

---

### 7. CROSS JOIN

Bildet das **kartesische Produkt** (Kreuzprodukt): jede Zeile der linken Tabelle wird mit jeder Zeile der rechten kombiniert. Resultatgrösse = Anzahl Zeilen A multipliziert mit Anzahl Zeilen B (hier: 3 x 3 = 9 Zeilen).

```sql
SELECT * FROM kunde CROSS JOIN bestellung;

-- Ältere alternative Syntax (ohne JOIN-Keyword)
SELECT KundenId, Vorname, Nachname FROM kunde, bestellung;
```

> Use-Case: Selten in der Praxis — z.B. für Kombinationstabellen oder Tests.
> Achtung: Bei grossen Tabellen explodiert das Resultat schnell.

---

### 8. SELF JOIN

Verknüpft eine Tabelle **mit sich selbst**. Typischer Use-Case: Hierarchien (z.B. Mitarbeiter und Vorgesetzter in derselben Tabelle). Technisch ein normaler INNER JOIN mit zwei Tabellen-Aliasen auf derselben Tabelle.

```sql
SELECT
    MA1.Id,
    MA1.Vorname,
    MA1.Nachname,
    MA2.Vorname AS V_Vorname,
    MA2.Nachname AS V_Nachname
FROM Mitarbeiter MA1
JOIN Mitarbeiter MA2 ON MA1.VorgesetzerId = MA2.Id;
```

| Id | Vorname | Nachname | V_Vorname | V_Nachname |
|----|---------|----------|-----------|------------|
| 1  | Hans    | Meier    | Roland    | Bühler     |
| 2  | Roland  | Bühler   | Erich     | Muster     |
| 3  | Erich   | Muster   | Sepp      | Müller     |

> Tabellen-Aliase (hier MA1, MA2) sind beim Self-Join **zwingend** — ohne sie ist die Abfrage nicht eindeutig auflösbar.

---

### 9. Mehrere JOINs kombinieren

JOINs können verkettet werden um mehr als zwei Tabellen zu verbinden. Bei n:m-Beziehungen wird immer über die Zwischentabelle gejoint:

```sql
-- Produkt -> Zwischentabelle -> Produktgruppe (3 Tabellen)
SELECT si.StockItemID, si.StockItemName, sg.StockGroupName
FROM Warehouse.StockItems si
INNER JOIN Warehouse.StockItemStockGroups sisg
    ON sisg.StockItemID = si.StockItemID
INNER JOIN Warehouse.StockGroups sg
    ON sg.StockGroupID = sisg.StockGroupID
ORDER BY si.StockItemID ASC;
```

> Muster: StockItems <-> StockItemStockGroups <-> StockGroups (n:m-Auflösung über Zwischentabelle).

---

### 10. Ausführungsreihenfolge mit JOIN

JOINs werden direkt nach FROM verarbeitet — vor WHERE, GROUP BY und SELECT:

```
FROM + JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY
```

> Alle DQL-Klauseln aus [[SQL - DQL#8. Ausführungsreihenfolge von SELECT]] bleiben in Kombination mit JOINs gültig.

---

## Aufgaben (WWI-Datenbank)

### Aufgabe 1 – In welchem Staat liegt Tucson?

Tabellen im Schema Application. Spalten: StateProvinceName, CityName.

```sql
SELECT sp.StateProvinceName, c.CityName
FROM Application.Cities c
INNER JOIN Application.StateProvinces sp
    ON sp.StateProvinceID = c.StateProvinceID
WHERE c.CityName = 'Tucson';
```

---

### Aufgabe 2a – Kunden der Kategorie Supermarket

```sql
SELECT c.CustomerName, cc.CustomerCategoryName
FROM Sales.Customers c
INNER JOIN Sales.CustomerCategories cc
    ON cc.CustomerCategoryID = c.CustomerCategoryID
WHERE cc.CustomerCategoryName = 'Supermarket';
```

---

### Aufgabe 2b – Leere Kundenkategorien (ohne zugeordnete Kunden)

```sql
-- Mit RIGHT JOIN
SELECT c.CustomerName, cc.CustomerCategoryName
FROM Sales.Customers c
RIGHT JOIN Sales.CustomerCategories cc
    ON cc.CustomerCategoryID = c.CustomerCategoryID
WHERE c.CustomerName IS NULL;

-- Äquivalent mit LEFT JOIN (Tabellenreihenfolge getauscht)
SELECT c.CustomerName, cc.CustomerCategoryName
FROM Sales.CustomerCategories cc
LEFT JOIN Sales.Customers c
    ON cc.CustomerCategoryID = c.CustomerCategoryID
WHERE c.CustomerName IS NULL;
```

> Beide Varianten liefern dasselbe Resultat — LEFT und RIGHT JOIN sind symmetrisch.

---

### Aufgabe 3 – Produkte mit Produktgruppen (3-Tabellen-JOIN)

```sql
SELECT si.StockItemID, si.StockItemName, sg.StockGroupName
FROM Warehouse.StockItems si
INNER JOIN Warehouse.StockItemStockGroups sisg
    ON sisg.StockItemID = si.StockItemID
INNER JOIN Warehouse.StockGroups sg
    ON sg.StockGroupID = sisg.StockGroupID
ORDER BY si.StockItemID ASC;
```

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[SQL - DQL]] | JOINs erweitern SELECT auf mehrere Tabellen; alle DQL-Klauseln bleiben kombinierbar |
| [[SQL - Views]] | Views kapseln häufig komplexe JOINs um die Abfrage-Komplexität zu reduzieren |
| [[SQL - DML]] | DML-Statements betreffen immer nur eine einzelne Tabelle — JOINs sind ausschliesslich DQL |

---

## Schlüsselbegriffe

- **JOIN**: Verknüpfung mehrerer Tabellen anhand übereinstimmender Spalten
- **EQUI JOIN**: JOIN mit dem Gleichheitsoperator als Verknüpfungsoperator (häufigste Form)
- **INNER JOIN**: Gibt nur die Schnittmenge beider Tabellen zurück
- **LEFT OUTER JOIN**: Alle Zeilen der linken Tabelle plus Schnittmenge; rechte Seite ggf. NULL
- **RIGHT OUTER JOIN**: Alle Zeilen der rechten Tabelle plus Schnittmenge; linke Seite ggf. NULL
- **FULL OUTER JOIN**: Alle Zeilen beider Tabellen; fehlende Seite jeweils NULL
- **CROSS JOIN**: Kartesisches Produkt — jede Zeile mal jede Zeile (n x m Resultate)
- **SELF JOIN**: Eine Tabelle wird mit sich selbst verknüpft; benötigt zwingend Tabellen-Aliase
- **Kartesisches Produkt**: Alle möglichen Kombinationen zweier Mengen (n x m)
- **Tabellen-Alias**: Kurzname für eine Tabelle innerhalb einer Abfrage (z.B. FROM kunden AS k)
- **Schnittmenge**: Menge der Zeilen, die in beiden Tabellen einen übereinstimmenden Wert haben
- **NULL**: Wert der entsteht wenn beim OUTER JOIN kein Match gefunden wird
- **n:m-Beziehung**: Tabellenbeziehung die eine Zwischentabelle erfordert; wird über zwei JOINs aufgelöst

---

## Offene Fragen
- [ ] Was ist der Unterschied zwischen JOIN und INNER JOIN syntaktisch — sind sie identisch?
- [ ] Warum funktioniert WHERE spalte = NULL nicht — und wie filtert man korrekt auf NULL-Werte?
- [ ] Was sind Non-EQUI JOINs und wann werden sie eingesetzt?
- [ ] Was passiert wenn beide Tabellen beim INNER JOIN mehrere Matches haben?
- [ ] Wie beeinflusst die JOIN-Reihenfolge bei mehreren JOINs die Performance?

---

## Quellen & Links
- Kursunterlagen: https://m106.ict-bz.ch/tag-2/operationen-dql/join
- Diagramm: [[SQL_JOIN_Arten.png]]
- Modul 106 – Datenbanken abfragen und bearbeiten (ICT-BZ)
- Verwandte Notizen: [[SQL - DQL]] | [[SQL - Views]] | [[SQL - DML]]
