---
title: M106 - SQL – DML
tags:
  - sql
  - dml
  - insert
  - update
  - delete
  - merge
  - cascading
  - schule
  - modul-106
created: 2026-05-22
status: draft
publish: false
---

# SQL – DML

## Überblick
DML (Data Manipulation Language) ist der Teilbereich von SQL, mit dem Daten in Tabellen erfasst, verändert und gelöscht werden. Die drei Kernbefehle sind `INSERT`, `UPDATE` und `DELETE`. Ergänzend gibt es `MERGE`, das alle drei in einem Statement vereint. Im Gegensatz zu DQL (reines Lesen) **verändern DML-Befehle den Datenbestand dauerhaft** – ohne Vorwarnung.

> Gegenstück: [[SQL - DQL]] — DQL liest Daten, DML schreibt/verändert/löscht sie.
> Verbindung: [[SQL Server - Datensicherheit]] — DCL steuert, wer DML auf welchen Objekten ausführen darf (`GRANT INSERT`, `DENY DELETE` etc.).

---

## Inhalt

### 1. Grundprinzipien

- SQL ist eine **deskriptive Sprache** (4GL): Man beschreibt *was* man will, nicht *wie* es technisch umgesetzt wird.
- DML-Statements arbeiten immer auf **ganzen Records** (Zeilen) — einzelne Feldinhalte löschen ist ein `UPDATE`, kein `DELETE`.
- Pro Statement kann jeweils nur **eine Tabelle** bearbeitet werden.
- DML-Statements können einzeln oder in **Transaktionen** ausgeführt werden (ACID-Prinzip — folgt in einem späteren Kapitel).

> Achtung: Es gibt **keine Rückfrage** vor Mutationen oder Löschungen. Ohne `WHERE` betreffen `UPDATE` und `DELETE` **alle** Zeilen der Tabelle.

---

### 2. INSERT – Daten erfassen

Fügt einen oder mehrere neue Datensätze in eine Tabelle ein.

```sql
INSERT [INTO] <[schema.]tabelle> (<spalte1>, <spalte2>)
VALUES (wert1, wert2);
```

**Varianten:**

```sql
-- Mit expliziter Spaltenangabe (empfohlen)
INSERT INTO verkauf.kunden (vorname, nachname) VALUES ('Hans', 'Meier');

-- Ohne Spaltenangabe (alle Spalten, Reihenfolge muss stimmen)
INSERT INTO verkauf.kunden VALUES ('Peter', 'Müller');

-- Nur Pflichtfelder, Rest greift DEFAULT-Constraint
INSERT INTO verkauf.kunden (nachname) VALUES ('Matter');

-- Fremdschlüssel-Verletzung (kundenid 10 existiert nicht → Fehler)
INSERT INTO verkauf.bestellungen (bestelldatum, kundenid)
VALUES ('20230721 10:34:05', 10);

-- CHECK-Constraint-Verletzung (Energielabel 'G' nicht erlaubt → Fehler)
INSERT INTO verkauf.produkte (produktname, energielabel) VALUES ('Elektrogrill', 'G');
```

> Spalten mit `NOT NULL` ohne `DEFAULT`-Wert dürfen nicht ausgelassen werden.

**Mehrere Datensätze in einem Statement:**

```sql
INSERT INTO verkauf.kunden (vorname, nachname)
VALUES ('Bruno', 'Moser'), ('Heinz', 'Manser');

INSERT INTO verkauf.produkte VALUES
('Zitronenpresse', 4.9, 'A'),
('Gartenlounge', 224, NULL),
('Fahrradträger', 334.5, NULL),
('Weinkühlschrank', 139, 'C');
```

**Aus SELECT einfügen (Daten kopieren):**

```sql
INSERT INTO verkauf.kunden
SELECT vorname, nachname FROM intern.mitarbeiter;
```

> Mehr zu SELECT: [[SQL - DQL]]

---

### 3. UPDATE – Daten mutieren

Verändert Felder in bestehenden Datensätzen.

```sql
UPDATE <[schema.]tabelle>
SET <spalte1> = wert1, <spalte2> = wert2, ...
[WHERE <kondition>];
```

```sql
-- Vorname und Nachname eines bestimmten Kunden ändern
UPDATE verkauf.kunden
SET vorname = 'Pete', nachname = 'Muller'
WHERE kundenid = 2;

-- Alle Kunden mit Nachname 'Meier' umbenennen
UPDATE verkauf.kunden
SET nachname = 'Meyer'
WHERE nachname = 'Meier';
```

> **Ohne `WHERE` werden alle Datensätze der Tabelle überschrieben!**

---

### 4. DELETE – Daten löschen

Löscht ganze Zeilen aus einer Tabelle.

```sql
DELETE FROM <[schema.]tabelle>
[WHERE <kondition>];
```

```sql
-- Einzelnes Produkt löschen
DELETE FROM verkauf.produkte WHERE produktid = 3;
```

> **Ohne `WHERE` werden alle Datensätze der Tabelle gelöscht!**

**DELETE vs. TRUNCATE:**

| Merkmal                  | `DELETE`                        | `TRUNCATE`                      |
|--------------------------|--------------------------------|---------------------------------|
| Einzelne Zeilen löschbar | Ja (mit `WHERE`)               | Nein (immer alles)              |
| Protokollierung          | Ja (langsamer)                 | Nein (schneller)                |
| IDENTITY-Zähler          | Wird nicht zurückgesetzt       | Wird zurückgesetzt              |
| WHERE-Klausel            | Möglich                        | Nicht möglich                   |

**Referentielle Integrität:**
Wenn ein Fremdschlüssel aus einer anderen Tabelle auf den zu löschenden Datensatz zeigt, schlägt das `DELETE` fehl:

```sql
-- Fehler: Kunde 2 hat noch Bestellungen → FK-Verletzung
DELETE FROM verkauf.kunden WHERE kundenid = 2;
```

Lösung: Entweder zuerst die abhängigen Datensätze löschen oder Cascading aktivieren (→ Abschnitt 5).

---

### 5. Cascading – Weitergabe von Mutationen

Cascading steuert, was mit verknüpften Child-Datensätzen passiert, wenn ein Parent-Datensatz geändert oder gelöscht wird.

| Option              | Verhalten                                                                              |
|---------------------|----------------------------------------------------------------------------------------|
| `ON UPDATE CASCADE` | Änderung am PK der Parent-Tabelle wird automatisch an Child-Records weitergegeben     |
| `ON DELETE CASCADE` | Löschen eines Parent-Records löscht automatisch alle zugehörigen Child-Records        |

```sql
-- Bestehenden FK entfernen (Voraussetzung für Änderung)
ALTER TABLE verkauf.bestellungen DROP CONSTRAINT fk_bestellungen_kunden;

-- DELETE CASCADE aktivieren
ALTER TABLE verkauf.bestellungen
ADD CONSTRAINT fk_bestellungen_kunden FOREIGN KEY (kundenid)
REFERENCES verkauf.kunden(kundenid) ON DELETE CASCADE;

-- UPDATE und DELETE CASCADE kombiniert
ALTER TABLE verkauf.bestellungen
ADD CONSTRAINT fk_bestellungen_kunden FOREIGN KEY (kundenid)
REFERENCES verkauf.kunden(kundenid) ON UPDATE CASCADE ON DELETE CASCADE;
```

> `ON UPDATE CASCADE` sollte gut überlegt sein — Primärschlüssel sollten grundsätzlich nicht verändert werden.
> Cascading-Regeln werden als **Trigger** nach Veränderung des Datenbestands ausgeführt.

---

### 6. MERGE – INSERT, UPDATE und DELETE in einem Statement

`MERGE` vergleicht eine Quell- mit einer Zieltabelle und führt je nach Übereinstimmung der Primärschlüssel verschiedene Aktionen aus. Wird häufig in Data-Warehouse- und Business-Intelligence-Umgebungen eingesetzt.

**Grundstruktur:**

```sql
MERGE <ziel-tabelle> AS TARGET
USING <quell-tabelle> AS SOURCE
ON <kondition>
WHEN MATCHED
    THEN UPDATE SET TARGET.spalte = SOURCE.spalte
WHEN NOT MATCHED BY TARGET
    THEN INSERT (spalten) VALUES (SOURCE.spalten)
WHEN NOT MATCHED BY SOURCE
    THEN DELETE;
```

**Vorgehen (Checkliste):**
1. Ziel-Tabelle definieren
2. Quell-Tabelle definieren
3. Kondition (JOIN-Bedingung) spezifizieren
4. Aktionen definieren: MATCHED → UPDATE, NOT MATCHED BY TARGET → INSERT, NOT MATCHED BY SOURCE → DELETE
5. Logik implementieren

**Vollständiges Beispiel:**

```sql
MERGE produkte AS TARGET
USING updatedprodukte AS SOURCE
ON (TARGET.produktid = SOURCE.produktid)
WHEN MATCHED AND (TARGET.produktname <> SOURCE.produktname OR TARGET.preis <> SOURCE.preis)
    THEN UPDATE SET TARGET.produktname = SOURCE.produktname,
                    TARGET.preis       = SOURCE.preis
WHEN NOT MATCHED BY TARGET
    THEN INSERT (produktid, produktname, preis)
         VALUES (SOURCE.produktid, SOURCE.produktname, SOURCE.preis)
WHEN NOT MATCHED BY SOURCE
    THEN DELETE;
```

**Resultat nach MERGE:**

| produktid | produktname | preis | Aktion         |
|-----------|-------------|-------|----------------|
| 1         | Tee         | 10.00 | Unverändert    |
| 2         | Kaffee      | 25.00 | UPDATE (Preis) |
| 3         | Muffin      | 35.00 | UPDATE (Preis) |
| 4         | Kuchen      | —     | DELETE         |
| 5         | Pizza       | 60.00 | INSERT         |

---

## Schlüsselbegriffe

- **DML (Data Manipulation Language)**: SQL-Teilbereich für datenverändernde Operationen (INSERT, UPDATE, DELETE, MERGE)
- **INSERT**: Fügt neue Datensätze in eine Tabelle ein
- **UPDATE**: Verändert Felder in bestehenden Datensätzen
- **DELETE**: Löscht ganze Zeilen aus einer Tabelle
- **TRUNCATE**: Löscht alle Zeilen einer Tabelle ohne Protokollierung; setzt IDENTITY zurück
- **MERGE**: Kombiniert INSERT, UPDATE und DELETE basierend auf einem Quell-Ziel-Vergleich
- **WHERE-Klausel**: Filterbedingung, die bestimmt welche Zeilen von DML betroffen sind
- **Referentielle Integrität**: Sicherstellung, dass Fremdschlüssel auf existierende Primärschlüssel zeigen
- **ON DELETE CASCADE**: Automatisches Löschen von Child-Datensätzen bei Löschung des Parent
- **ON UPDATE CASCADE**: Automatische Weitergabe von PK-Änderungen an Child-Datensätze
- **DEFAULT-Constraint**: Standardwert, der greift wenn kein Wert für eine Spalte angegeben wird
- **NOT NULL**: Spalten-Constraint, der einen Wert erzwingt
- **IDENTITY**: Auto-Increment-Mechanismus für Primärschlüssel-Spalten
- **Transaktion**: Atomare Einheit von DML-Operationen (ACID — folgt in späterem Kapitel)

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[SQL - DQL]] | DQL liest Daten; `INSERT INTO ... SELECT` kombiniert DML mit DQL; WHERE-Regeln gelten in beiden |
| [[SQL - Views]] | DML auf Views ist eingeschränkt möglich (kein MERGE, keine Aggregatfunktionen etc.) |
| [[SQL Server - Datensicherheit]] | DCL (`GRANT`/`DENY`) steuert, wer INSERT/UPDATE/DELETE auf welchen Objekten ausführen darf |

---

## Aufgaben
- [[SQL – DML Aufgaben]]

---

## Quellen & Links
- Kursunterlagen Grundlagen: https://m106.ict-bz.ch/tag-1/operationen-dml/grundlagen
- Kursunterlagen INSERT: https://m106.ict-bz.ch/tag-1/operationen-dml/insert
- Kursunterlagen UPDATE: https://m106.ict-bz.ch/tag-1/operationen-dml/update
- Kursunterlagen DELETE: https://m106.ict-bz.ch/tag-1/operationen-dml/delete
- Kursunterlagen Cascading: https://m106.ict-bz.ch/tag-1/operationen-dml/cascading
- Kursunterlagen MERGE: https://m106.ict-bz.ch/tag-1/operationen-dml/merge
- Modul 106 – Datenbanken abfragen und bearbeiten (ICT-BZ)
