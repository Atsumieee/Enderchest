---
title: "M106 - SQL – DML – Aufgaben"
tags: [sql, dml, insert, update, delete, aufgaben, schule, modul-106]
created: 2026-05-22
status: draft
publish: false
---

# SQL – DML – Aufgaben

> Aufgaben aus den Kursunterlagen Modul 106, Tag 1 – DML.
> Theorie: [[SQL - DML]]

---

## INSERT-Aufgaben

### Aufgabe 1 – Neue Kundin Barbara Traufer erfassen

```sql
INSERT INTO verkauf.kunden (vorname, nachname)
VALUES ('Barbara', 'Traufer');
```

> Mit expliziter Spaltenangabe — sicherer als ohne, da Spaltenreihenfolge der Tabelle keine Rolle spielt.

---

### Aufgabe 2 – Drei neue Produkte einfügen

```sql
INSERT INTO verkauf.produkte (produktname, preis, energielabel)
VALUES
    ('Wasserkocher', 49.90, 'A'),
    ('Toaster', 34.50, 'B'),
    ('Mikrowelle', 89.00, 'C');
```

> Produktname, Preis und Energielabel frei wählbar. Mehrere Records in einem Statement eingefügt.

---

### Aufgabe 3 – Zwei Bestellungen für Barbara Traufer erstellen

Zuerst die `kundenid` der neu erstellten Kundin ermitteln:

```sql
SELECT kundenid FROM verkauf.kunden
WHERE vorname = 'Barbara' AND nachname = 'Traufer';
```

Dann die Bestellungen mit der ermittelten ID erfassen (Beispiel mit kundenid = 5):

```sql
INSERT INTO verkauf.bestellungen (bestelldatum, kundenid)
VALUES
    ('20240315 09:15:00', 5),
    ('20240422 14:30:00', 5);
```

> Die genaue `kundenid` hängt davon ab, welche IDs bereits in der Tabelle vergeben sind (IDENTITY). Das Datum ist frei wählbar.

---

## UPDATE-Aufgaben

### Aufgabe 4 – Vorname von Kundin mit kundenid 3 ändern

```sql
UPDATE verkauf.kunden
SET vorname = 'Maria'
WHERE kundenid = 3;
```

> `WHERE kundenid = 3` ist präzise und sicher — trifft genau einen Datensatz.

---

### Aufgabe 5 – Produktname und Preis von Produkt mit Id 2 ändern

```sql
UPDATE verkauf.produkte
SET produktname = 'Zitruspresse',
    preis = preis + 10
WHERE produktid = 2;
```

> `preis = preis + 10` erhöht den bestehenden Preis um CHF 10, unabhängig vom aktuellen Wert.

---

## DELETE-Aufgaben

### Aufgabe 6 – Bestellungen von Bruno Moser löschen

Zuerst die `kundenid` von Bruno Moser ermitteln:

```sql
SELECT kundenid FROM verkauf.kunden
WHERE vorname = 'Bruno' AND nachname = 'Moser';
```

Dann nur seine Bestellungen löschen (Beispiel mit kundenid = 3):

```sql
DELETE FROM verkauf.bestellungen
WHERE kundenid = 3;
```

> Nur die Bestellungen löschen, nicht den Kunden selbst. Der WHERE-Filter über die `kundenid` stellt sicher, dass ausschliesslich seine Bestellungen betroffen sind.

---

### Aufgabe 7 – Kann Barbara Traufer gelöscht werden? (Analyse)

**Nein — nicht direkt**, solange noch Bestellungen zu ihr existieren.

**Begründung:**
In Aufgabe 3 wurden zwei Bestellungen für Barbara Traufer erfasst. Die Tabelle `verkauf.bestellungen` enthält einen Fremdschlüssel (`kundenid`), der auf `verkauf.kunden` verweist. Würde man Barbara direkt löschen, würde die Datenbank eine **FK-Verletzung (referentielle Integrität)** melden und die Operation ablehnen.

**Was müsste zuerst gemacht werden:**

```sql
-- Option A: Ihre Bestellungen zuerst manuell löschen
DELETE FROM verkauf.bestellungen
WHERE kundenid = (
    SELECT kundenid FROM verkauf.kunden
    WHERE vorname = 'Barbara' AND nachname = 'Traufer'
);

-- Danach erst die Kundin löschen
DELETE FROM verkauf.kunden
WHERE vorname = 'Barbara' AND nachname = 'Traufer';
```

```sql
-- Option B: ON DELETE CASCADE auf dem FK definieren (dann automatisch)
DELETE FROM verkauf.kunden
WHERE vorname = 'Barbara' AND nachname = 'Traufer';
```

> In der Praxis ist Option A sicherer. Option B (CASCADE) birgt das Risiko unbeabsichtigter Datenverluste, wenn man nicht genau weiss, welche abhängigen Daten mitgelöscht werden.

---

## Schlüsselerkenntnisse aus den Aufgaben

- `WHERE` über Primärschlüssel (`kundenid`, `produktid`) ist am sichersten — trifft immer genau einen Datensatz
- Bei INSERT: Zuerst referenzierte Datensätze erstellen (Kunden), dann abhängige (Bestellungen) — Reihenfolge wegen FK-Integrität
- `preis = preis + 10` im UPDATE: relativer Ausdruck, kein Hardcode des neuen Preises
- Vor einem DELETE auf Parent-Tabellen immer prüfen, ob Child-Datensätze existieren
- Subquery im WHERE beim DELETE: sichere Methode um IDs nicht hardcoden zu müssen

---

## Quellen & Links
- Theorie: [[SQL - DML]]
- Kursunterlagen: https://m106.ict-bz.ch/tag-1/operationen-dml/aufgaben-dml
- Modul 106 – Datenbanken abfragen und bearbeiten (ICT-BZ)
