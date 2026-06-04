---
title: SQL – DQL Joins
tags:
  - sql
  - dql
  - joins
  - schule
  - m106
created: 2026-05-23
status: draft
publish: false
todo: false
---

# SQL – DQL Joins

## Überblick

Eine normalisierte Datenbank speichert Informationen bewusst auf mehrere Tabellen verteilt — Kunden in einer Tabelle, Bestellungen in einer anderen, Produkte in einer dritten. Das verhindert Redundanz und Inkonsistenz (→ [[SQL - DDL]]). Der Nachteil: Eine einzelne SELECT-Abfrage liefert immer nur eine Tabelle zurück.

JOINs lösen dieses Problem. Sie verknüpfen zwei oder mehr Tabellen anhand übereinstimmender Spalten — meistens ein Fremdschlüssel der auf einen Primärschlüssel zeigt — und liefern das Ergebnis als eine gemeinsame Ergebnistabelle. Der JOIN findet während `FROM` statt, noch bevor `WHERE` oder `SELECT` ausgeführt werden.

> Voraussetzung: [[SQL - DQL]] — JOINs sind eine Erweiterung der SELECT-Abfrage und kombinieren sich mit allen DQL-Klauseln.
> Verbindung: [[SQL - Views]] — Views kapseln häufig komplexe JOIN-Abfragen um sie wiederverwendbar zu machen.

---

## Inhalt

### 1. Überblick JOIN-Arten

Um die verschiedenen JOIN-Typen zu verstehen hilft eine einfache Vorstellung: Zwei Tabellen A und B haben je eine Spalte mit Zahlen. Manche Zahlen kommen in beiden Tabellen vor (die **Schnittmenge**), manche nur in A, manche nur in B.

| Tabelle A | Tabelle B |
|-----------|-----------|
| 1         | 3         |
| 2         | 4         |
| 3         | 5         |
| 4         | 6         |

Die Werte 3 und 4 existieren in beiden Tabellen — das ist die Schnittmenge. Die Werte 1 und 2 gibt es nur in A, die Werte 5 und 6 nur in B. Je nach JOIN-Typ entscheidet man welcher Teil dieser Mengen im Ergebnis erscheint:

| JOIN-Art         | Was wird zurückgegeben                            | Ergebnis (a / b)                                  |
|------------------|---------------------------------------------------|---------------------------------------------------|
| INNER JOIN       | Nur die Schnittmenge                              | 3/3, 4/4                                          |
| LEFT OUTER JOIN  | Alle Zeilen aus A + Schnittmenge (B-Seite = NULL) | 1/NULL, 2/NULL, 3/3, 4/4                          |
| RIGHT OUTER JOIN | Alle Zeilen aus B + Schnittmenge (A-Seite = NULL) | 3/3, 4/4, NULL/5, NULL/6                          |
| FULL OUTER JOIN  | Alle Zeilen beider Tabellen                       | 1/NULL, 2/NULL, 3/3, 4/4, NULL/5, NULL/6          |
| CROSS JOIN       | Jede Zeile A × jede Zeile B (kartesisches Produkt)| 4 × 4 = 16 Kombinationen                         |

```widget
JOIN Venn-Visualizer
```

---

### 2. Beispieldatensatz

Alle nachfolgenden Beispiele verwenden diese zwei Tabellen. Wichtig: Die Daten sind absichtlich so gewählt dass nicht alles zusammenpasst — genau daran sieht man den Unterschied zwischen den JOIN-Typen.

**Tabelle `kunde`:**

| KundenId | Vorname | Nachname |
|----------|---------|----------|
| 1        | Hans    | Meier    |
| 2        | Ueli    | Muster   |
| 3        | Sepp    | Hofer    |

**Tabelle `bestellung`:**

| BestellId | KundenId | Preis |
|-----------|----------|-------|
| 1         | 4        | 10    |
| 2         | 2        | 13    |
| 3         | 1        | 20    |

Zwei absichtliche "Lücken" sind eingebaut:
- Bestellung 1 hat `KundenId = 4` — dieser Kunde existiert **nicht** in der Kundentabelle (verwaiste Bestellung).
- Kunde 3 (Sepp Hofer) hat **keine Bestellung** (Kunde ohne Bestellung).

Diese zwei Fälle tauchen in jedem JOIN-Ergebnis unterschiedlich auf — das ist der zentrale Lernpunkt dieses Abschnitts.

```widget
JOIN Query Builder
```

---

### 3. INNER JOIN

Der INNER JOIN gibt **nur die Schnittmenge** zurück — also nur Zeilen bei denen in beiden Tabellen ein übereinstimmender Wert gefunden wird. Zeilen ohne Match werden auf beiden Seiten komplett weggelassen.

```sql
SELECT bestellung.bestellid, kunde.vorname, kunde.nachname, bestellung.preis
FROM bestellung
INNER JOIN kunde ON bestellung.kundenid = kunde.kundenid;
```

| BestellId | Vorname | Nachname | Preis |
|-----------|---------|----------|-------|
| 3         | Hans    | Meier    | 20    |
| 2         | Ueli    | Muster   | 13    |

Bestellung 1 fehlt weil `KundenId 4` in der Kundentabelle nicht existiert. Sepp Hofer fehlt weil er keine Bestellung hat. Der INNER JOIN ist der strengste JOIN — er zeigt nur was auf beiden Seiten vollständig vorhanden ist.

**Wann verwenden:** Wenn man nur vollständige, konsistente Datensätze möchte und unvollständige Zeilen das Ergebnis verfälschen würden.

> `JOIN` ohne weiteres Keyword ist identisch mit `INNER JOIN` — beides ist gültige SQL-Syntax.

---

### 4. LEFT JOIN / LEFT OUTER JOIN

Der LEFT JOIN gibt **alle Zeilen der linken Tabelle** zurück — egal ob ein Match existiert oder nicht. Wo kein passender Eintrag in der rechten Tabelle gefunden wird, werden die Spalten der rechten Seite mit `NULL` befüllt.

**Merkhilfe: Was ist "links"?** Links bedeutet die Tabelle die **vor dem JOIN-Keyword** steht — also in `FROM bestellung LEFT JOIN kunde` ist `bestellung` die linke Tabelle. Es geht nicht darum wo die Tabelle auf dem Papier steht, sondern um die Reihenfolge im SQL-Statement.

```sql
SELECT bestellung.bestellid, kunde.vorname, kunde.nachname, bestellung.preis
FROM bestellung
LEFT JOIN kunde ON bestellung.kundenid = kunde.kundenid;
```

| BestellId | Vorname | Nachname | Preis |
|-----------|---------|----------|-------|
| 1         | NULL    | NULL     | 10    |
| 2         | Ueli    | Muster   | 13    |
| 3         | Hans    | Meier    | 20    |

Bestellung 1 erscheint diesmal — mit `NULL` wo die Kundenangaben wären. Sepp Hofer fehlt weiterhin, weil `bestellung` die linke Tabelle ist und er dort keinen Eintrag hat.

**Wann verwenden:** Wenn man alle Datensätze der linken Tabelle sehen möchte und fehlende Verknüpfungen zur rechten Tabelle als `NULL` akzeptiert — z.B. alle Bestellungen anzeigen, auch jene ohne gültigen Kunden.

---

### 5. RIGHT JOIN / RIGHT OUTER JOIN

Der RIGHT JOIN ist das Spiegelbild des LEFT JOIN: Er gibt **alle Zeilen der rechten Tabelle** zurück. Wo kein Match in der linken Tabelle existiert werden die Spalten der linken Seite mit `NULL` befüllt.

**Rechts** bedeutet die Tabelle die **nach dem JOIN-Keyword** steht.

```sql
SELECT bestellung.bestellid, kunde.vorname, kunde.nachname, bestellung.preis
FROM bestellung
RIGHT JOIN kunde ON bestellung.kundenid = kunde.kundenid;
```

| BestellId | Vorname | Nachname | Preis |
|-----------|---------|----------|-------|
| 3         | Hans    | Meier    | 20    |
| 2         | Ueli    | Muster   | 13    |
| NULL      | Sepp    | Hofer    | NULL  |

Jetzt erscheint Sepp Hofer — mit `NULL` bei BestellId und Preis. Bestellung 1 fehlt weiterhin, weil sie keinen passenden Kunden hat und `kunde` die rechte (vollständig angezeigte) Tabelle ist.

**Wann verwenden:** Wenn man alle Datensätze der rechten Tabelle sehen möchte — z.B. alle Kunden anzeigen, auch jene ohne Bestellungen.

> **Merkhilfe:** `A LEFT JOIN B` liefert dasselbe Ergebnis wie `B RIGHT JOIN A` — man kann jeden RIGHT JOIN durch Tauschen der Tabellenreihenfolge in einen LEFT JOIN umschreiben. In der Praxis wird LEFT JOIN deutlich häufiger verwendet weil er intuitiver zu lesen ist.

---

### 6. FULL OUTER JOIN

Der FULL OUTER JOIN kombiniert LEFT und RIGHT JOIN: Er gibt **alle Zeilen beider Tabellen** zurück. Zeilen ohne Match bekommen auf der fehlenden Seite `NULL`-Werte — egal auf welcher Seite der Match fehlt.

```sql
SELECT bestellung.bestellid, kunde.vorname, kunde.nachname, bestellung.preis
FROM bestellung
FULL JOIN kunde ON bestellung.kundenid = kunde.kundenid;
```

| BestellId | Vorname | Nachname | Preis |
|-----------|---------|----------|-------|
| 1         | NULL    | NULL     | 10    |
| 2         | Ueli    | Muster   | 13    |
| 3         | Hans    | Meier    | 20    |
| NULL      | Sepp    | Hofer    | NULL  |

Jetzt erscheinen sowohl Bestellung 1 (ohne Kunde) als auch Sepp Hofer (ohne Bestellung) — beide mit `NULL` auf der jeweils fehlenden Seite.

**Wann verwenden:** Wenn man eine vollständige Übersicht beider Tabellen braucht und keine Zeile verloren gehen darf — z.B. zur Datenqualitätsprüfung: Welche Bestellungen haben keinen Kunden, und welche Kunden haben keine Bestellung?

---

### 7. CROSS JOIN

Der CROSS JOIN bildet das **kartesische Produkt**: Jede Zeile der linken Tabelle wird mit jeder Zeile der rechten Tabelle kombiniert. Es gibt keine `ON`-Bedingung — alle Kombinationen werden erzeugt.

Die Ergebnismenge wächst multiplikativ: Bei 3 Kunden und 3 Bestellungen entstehen 3 × 3 = 9 Zeilen. Bei 1000 × 1000 Zeilen wären es bereits 1 Million Zeilen.

```sql
SELECT * FROM kunde CROSS JOIN bestellung;

-- Ältere alternative Syntax ohne JOIN-Keyword (gleiches Ergebnis)
SELECT * FROM kunde, bestellung;
```

**Wann verwenden:** Selten — typische Use-Cases sind das Erzeugen aller möglichen Kombinationen (z.B. alle Produkte × alle Farboptionen) oder Test-Datengenerierung. In produktiven Abfragen auf grossen Tabellen ist der CROSS JOIN gefährlich weil die Ergebnismenge unkontrolliert explodieren kann.

---

### 8. SELF JOIN

Ein SELF JOIN verknüpft eine Tabelle **mit sich selbst**. Das klingt zunächst seltsam — man stellt es sich am einfachsten vor als ob die Tabelle zweimal existiert: einmal als "linke" und einmal als "rechte" Version. Tabellen-Aliase sind dabei **zwingend notwendig**, sonst weiss die Datenbank nicht welche "Kopie" gemeint ist.

Der typische Use-Case sind **Hierarchien**: Wenn Mitarbeiter und ihre Vorgesetzten in derselben Tabelle stehen, braucht man den SELF JOIN um den Namen des Vorgesetzten aufzulösen.

```sql
SELECT
    ma1.id,
    ma1.vorname,
    ma1.nachname,
    ma2.vorname AS vorgesetzter_vorname,
    ma2.nachname AS vorgesetzter_nachname
FROM mitarbeiter ma1
JOIN mitarbeiter ma2 ON ma1.vorgesetzterid = ma2.id;
```

| Id | Vorname | Nachname | Vorgesetzter_Vorname | Vorgesetzter_Nachname |
|----|---------|----------|----------------------|-----------------------|
| 1  | Hans    | Meier    | Roland               | Bühler                |
| 2  | Roland  | Bühler   | Erich                | Muster                |
| 3  | Erich   | Muster   | Sepp                 | Müller                |

`ma1` ist die "Mitarbeiter-Kopie", `ma2` ist die "Vorgesetzten-Kopie". Der JOIN verbindet `ma1.vorgesetzterid` mit `ma2.id` — so wird aus einer Zeile mit einer ID-Spalte ein lesbarer Name.

---

### 9. Mehrere JOINs kombinieren

JOINs können verkettet werden um mehr als zwei Tabellen zu verbinden. Besonders häufig ist das bei **n:m-Beziehungen**: Diese haben immer eine Zwischentabelle (z.B. `StockItemStockGroups` zwischen `StockItems` und `StockGroups`) und brauchen deshalb zwei JOINs.

Das Muster ist immer gleich: Man joiniert von der ersten Tabelle zur Zwischentabelle, dann von der Zwischentabelle zur zweiten Tabelle.

```sql
-- Produkte mit ihren Produktgruppen (3 Tabellen, n:m über Zwischentabelle)
SELECT si.StockItemID, si.StockItemName, sg.StockGroupName
FROM Warehouse.StockItems si
INNER JOIN Warehouse.StockItemStockGroups sisg
    ON sisg.StockItemID = si.StockItemID
INNER JOIN Warehouse.StockGroups sg
    ON sg.StockGroupID = sisg.StockGroupID
ORDER BY si.StockItemID ASC;
```

Muster: `StockItems` → `StockItemStockGroups` (Zwischentabelle) → `StockGroups`. Jeder JOIN hat seine eigene `ON`-Bedingung.

---

### 10. Ausführungsreihenfolge mit JOIN

JOINs gehören zur `FROM`-Phase — sie werden als erstes ausgeführt, bevor `WHERE`, `GROUP BY` oder `SELECT` zum Zug kommen:

```
FROM + JOIN  →  WHERE  →  GROUP BY  →  HAVING  →  SELECT  →  ORDER BY
```

Das hat eine wichtige Konsequenz: `WHERE` kann bereits auf dem JOIN-Ergebnis filtern — also auf Spalten beider Tabellen gleichzeitig. Und `SELECT` wählt aus dem bereits verknüpften Ergebnis aus, nicht aus den Originaltabellen.

```sql
-- WHERE filtert auf dem JOIN-Ergebnis: beide Tabellen sind bereits verknüpft
SELECT k.vorname, b.preis
FROM kunde k
INNER JOIN bestellung b ON k.kundenid = b.kundenid
WHERE b.preis > 15;  -- greift auf bestellung-Spalte zu, obwohl FROM auf kunde zeigt
```

> Alle DQL-Klauseln aus [[SQL - DQL#8. Ausführungsreihenfolge von SELECT]] bleiben in Kombination mit JOINs vollständig gültig.

---

## Aufgaben (WWI-Datenbank)

### Aufgabe 1 – In welchem Staat liegt Tucson?

Tabellen im Schema `Application`. Spalten: `StateProvinceName`, `CityName`.

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

> Beide Varianten liefern dasselbe Resultat — LEFT und RIGHT JOIN sind symmetrisch durch Tauschen der Tabellenreihenfolge.

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

## Schlüsselbegriffe

- **JOIN**: Verknüpfung mehrerer Tabellen anhand übereinstimmender Spalten
- **EQUI JOIN**: JOIN mit dem Gleichheitsoperator als Verknüpfungsbedingung — die häufigste Form
- **INNER JOIN**: Gibt nur die Schnittmenge zurück; Zeilen ohne Match fallen auf beiden Seiten weg
- **LEFT OUTER JOIN**: Alle Zeilen der linken Tabelle (vor JOIN-Keyword); rechte Seite ggf. NULL
- **RIGHT OUTER JOIN**: Alle Zeilen der rechten Tabelle (nach JOIN-Keyword); linke Seite ggf. NULL
- **FULL OUTER JOIN**: Alle Zeilen beider Tabellen; fehlende Seite jeweils NULL
- **CROSS JOIN**: Kartesisches Produkt — jede Zeile × jede Zeile; kein ON; Ergebnis = n × m Zeilen
- **SELF JOIN**: Eine Tabelle wird mit sich selbst verknüpft; Aliase sind zwingend
- **Kartesisches Produkt**: Alle möglichen Kombinationen zweier Mengen (n × m)
- **Tabellen-Alias**: Kurzname für eine Tabelle in einer Abfrage (`FROM kunden AS k` oder `FROM kunden k`)
- **Schnittmenge**: Zeilen die in beiden Tabellen einen übereinstimmenden Wert haben
- **n:m-Beziehung**: Tabellenbeziehung die eine Zwischentabelle erfordert; wird über zwei JOINs aufgelöst

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[SQL - DQL]] | JOINs erweitern SELECT auf mehrere Tabellen; alle DQL-Klauseln bleiben kombinierbar |
| [[SQL - DDL]] | Normalisierung im DDL erzwingt mehrere Tabellen — JOINs machen sie wieder zusammen lesbar |
| [[SQL - Views]] | Views kapseln häufig komplexe JOINs um Abfrage-Komplexität zu verstecken |
| [[SQL - DML]] | DML-Statements (INSERT, UPDATE, DELETE) betreffen immer nur eine Tabelle — JOINs sind ausschliesslich DQL |

---

## Quellen & Links
- Kursunterlagen: https://m106.ict-bz.ch/tag-2/operationen-dql/join
- Modul 106 – Datenbanken abfragen und bearbeiten (ICT-BZ)
- Verwandte Notizen: [[SQL - DQL]] | [[SQL - Views]] | [[SQL - DML]] | [[SQL - DDL]]
