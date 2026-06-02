# M164 – SQL: Datenbanken abfragen und manipulieren
> Lerninhalt für die IT-Lernplattform | Basiert auf M106-Zusammenfassungen
> Struktur: 4 Inhaltsblöcke + Quizfragen (bereit zum Einfügen in HTML)

---

## ──────────────────────────────────────
## BLOCK 3 – SELECT & WHERE: Daten abfragen
## ──────────────────────────────────────

### Was ist DQL?
DQL (Data Query Language) ist der Teil von SQL, mit dem Daten **gelesen** werden. Der zentrale Befehl ist `SELECT`. DQL **verändert keine Daten** – es sind reine Leseoperationen.

### Grundstruktur einer SELECT-Abfrage

```sql
SELECT spalte1, spalte2
FROM tabelle
WHERE bedingung
ORDER BY spalte ASC;
```

| Klausel    | Bedeutung                                   | Pflicht? |
|------------|---------------------------------------------|----------|
| `SELECT`   | Welche Spalten werden zurückgegeben?        | ✅ Ja    |
| `FROM`     | Aus welcher Tabelle?                        | ✅ Ja    |
| `WHERE`    | Filterkriterium für Zeilen                  | ❌ Nein  |
| `ORDER BY` | Sortierung des Ergebnisses (ASC / DESC)     | ❌ Nein  |

**Alle Spalten abfragen:**
```sql
SELECT * FROM kunden;
```
> Tipp: `*` gibt alle Spalten zurück. In der Praxis besser explizit die Spalten nennen.

### WHERE – Zeilen filtern

```sql
-- Alle Kunden aus der Schweiz
SELECT vorname, nachname FROM kunden WHERE land = 'CH';

-- Produkte zwischen 10 und 50 Franken
SELECT * FROM produkte WHERE preis BETWEEN 10 AND 50;

-- Alle Namen die mit 'M' beginnen
SELECT * FROM kunden WHERE nachname LIKE 'M%';
```

**Wichtige Operatoren:**

| Operator    | Beispiel                              | Bedeutung             |
|-------------|---------------------------------------|-----------------------|
| `=`         | `WHERE alter = 18`                    | Gleich                |
| `<>`        | `WHERE status <> 'inaktiv'`           | Ungleich              |
| `>`  `<`    | `WHERE preis > 100`                   | Grösser / Kleiner     |
| `BETWEEN`   | `WHERE alter BETWEEN 18 AND 30`       | Wertebereich          |
| `LIKE 'M%'` | `WHERE name LIKE 'M%'`                | Beginnt mit M         |
| `IN`        | `WHERE land IN ('CH', 'DE', 'AT')`    | Liste von Werten      |
| `IS NULL`   | `WHERE email IS NULL`                 | Kein Wert vorhanden   |

> **Merkhilfe LIKE-Wildcards:** `%` = beliebig viele Zeichen, `_` = genau ein Zeichen

---

### 🧩 Mini-Quiz: Block 3

**Frage 1:** Welcher SQL-Befehl wird verwendet um Daten aus einer Tabelle zu lesen?
- A) INSERT
- B) UPDATE
- C) **SELECT** ✅
- D) DELETE

*Erklärung: SELECT ist der Grundbefehl von DQL und dient ausschliesslich zum Lesen von Daten.*

**Frage 2:** Was macht der Operator `LIKE 'A%'` in einer WHERE-Klausel?
- A) Gibt alle Werte zurück die mit einem beliebigen Buchstaben enden
- B) **Gibt alle Werte zurück die mit 'A' beginnen** ✅
- C) Gibt genau den Wert 'A%' zurück
- D) Gibt alle Werte ausser 'A' zurück

*Erklärung: Das `%`-Zeichen ist ein Wildcard für beliebig viele Zeichen. 'A%' bedeutet: beginnt mit A, danach egal.*

**Frage 3:** Welche Klausel ist in einer SELECT-Abfrage zwingend erforderlich?
- A) WHERE
- B) ORDER BY
- C) GROUP BY
- D) **FROM** ✅

*Erklärung: SELECT und FROM sind die einzigen Pflichtklauseln. Alle anderen (WHERE, ORDER BY, GROUP BY) sind optional.*

---

## ──────────────────────────────────────
## BLOCK 4 – Sortieren, Gruppieren & Aggregieren
## ──────────────────────────────────────

### ORDER BY – Ergebnisse sortieren

```sql
-- Aufsteigend (Standard)
SELECT * FROM produkte ORDER BY preis ASC;

-- Absteigend
SELECT * FROM produkte ORDER BY preis DESC;

-- Nach mehreren Spalten sortieren
SELECT * FROM kunden ORDER BY nachname ASC, vorname ASC;
```

### DISTINCT – Duplikate entfernen

```sql
-- Alle einzigartigen Länder in der Kundentabelle
SELECT DISTINCT land FROM kunden;
```

### Aggregatfunktionen – Berechnungen über Zeilen

Aggregatfunktionen fassen mehrere Zeilen zu **einem Ergebniswert** zusammen.

| Funktion    | Bedeutung             | Beispiel                          |
|-------------|----------------------|-----------------------------------|
| `COUNT(*)`  | Anzahl Zeilen zählen  | `SELECT COUNT(*) FROM kunden`     |
| `SUM(preis)`| Summe berechnen       | `SELECT SUM(preis) FROM orders`   |
| `AVG(alter)`| Durchschnitt          | `SELECT AVG(alter) FROM users`    |
| `MIN(preis)`| Kleinster Wert        | `SELECT MIN(preis) FROM produkte` |
| `MAX(preis)`| Grösster Wert         | `SELECT MAX(preis) FROM produkte` |

### GROUP BY & HAVING – Gruppieren und filtern

`GROUP BY` fasst Zeilen mit gleichem Wert zusammen.
`HAVING` filtert **nach** der Gruppierung (wie WHERE, aber für Gruppen).

```sql
-- Anzahl Bestellungen pro Kunde
SELECT kunden_id, COUNT(*) AS anzahl
FROM bestellungen
GROUP BY kunden_id;

-- Nur Kunden mit mehr als 5 Bestellungen
SELECT kunden_id, COUNT(*) AS anzahl
FROM bestellungen
GROUP BY kunden_id
HAVING COUNT(*) > 5;
```

> **Merkhilfe:** `WHERE` filtert **vor** dem Gruppieren, `HAVING` **nach** dem Gruppieren.

### Ausführungsreihenfolge

SQL verarbeitet Klauseln intern in dieser Reihenfolge (nicht wie sie geschrieben stehen):

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY
```

---

### 🧩 Mini-Quiz: Block 4

**Frage 1:** Welche Aggregatfunktion berechnet den Durchschnitt einer Spalte?
- A) COUNT()
- B) SUM()
- C) **AVG()** ✅
- D) MAX()

*Erklärung: AVG() (Average) berechnet den Durchschnittswert aller Werte einer Spalte.*

**Frage 2:** Was ist der Unterschied zwischen WHERE und HAVING?
- A) Es gibt keinen Unterschied
- B) WHERE funktioniert nur mit JOINs
- C) **WHERE filtert vor der Gruppierung, HAVING nach der Gruppierung** ✅
- D) HAVING kann nur mit COUNT() verwendet werden

*Erklärung: WHERE filtert einzelne Zeilen bevor sie gruppiert werden. HAVING filtert die fertigen Gruppen nach GROUP BY.*

**Frage 3:** Was macht SELECT DISTINCT?
- A) Sortiert die Ergebnisse alphabetisch
- B) Wählt eine zufällige Zeile aus
- C) Gibt nur Zeilen zurück, die eine bestimmte Bedingung erfüllen
- D) **Entfernt doppelte Zeilen aus dem Ergebnis** ✅

*Erklärung: DISTINCT gibt jeden Wert nur einmal zurück – Duplikate werden gefiltert.*

---

## ──────────────────────────────────────
## BLOCK 5 – JOINs: Tabellen verknüpfen
## ──────────────────────────────────────

### Was ist ein JOIN?

Mit JOINs können Daten aus **mehreren Tabellen** in einer Abfrage kombiniert werden. Die Verknüpfung erfolgt über übereinstimmende Spalten (meistens Primär- und Fremdschlüssel).

**Beispieldaten:**

| kunden (KundenId / Vorname) | bestellungen (BestellId / KundenId / Preis) |
|-----------------------------|---------------------------------------------|
| 1 / Hans                    | 1 / 4 / 10 (KundenId 4 existiert nicht!)   |
| 2 / Ueli                    | 2 / 2 / 13                                  |
| 3 / Sepp                    | 3 / 1 / 20                                  |

### INNER JOIN – Nur die Schnittmenge

Gibt **nur Zeilen zurück, die in beiden Tabellen** einen übereinstimmenden Wert haben. Zeilen ohne Match werden weggelassen.

```sql
SELECT k.vorname, b.bestellid, b.preis
FROM bestellungen b
INNER JOIN kunden k ON b.kundenid = k.kundenid;
```

Ergebnis: Hans (20), Ueli (13) → Sepp (keine Bestellung) und BestellId 1 (ungültige KundenId) fehlen.

### LEFT JOIN – Alle Zeilen der linken Tabelle

Gibt **alle Zeilen der linken Tabelle** zurück. Wo kein Match existiert, werden die Spalten der rechten Tabelle mit `NULL` gefüllt.

```sql
SELECT k.vorname, b.bestellid, b.preis
FROM bestellungen b
LEFT JOIN kunden k ON b.kundenid = k.kundenid;
```

Ergebnis: Alle Bestellungen werden angezeigt — auch Bestellung 1 mit NULL bei vorname.

### RIGHT JOIN – Alle Zeilen der rechten Tabelle

Gibt **alle Zeilen der rechten Tabelle** zurück. Wo kein Match existiert, werden die Spalten der linken Tabelle mit `NULL` gefüllt.

```sql
SELECT k.vorname, b.bestellid, b.preis
FROM bestellungen b
RIGHT JOIN kunden k ON b.kundenid = k.kundenid;
```

Ergebnis: Alle Kunden werden angezeigt — auch Sepp mit NULL bei bestellid und preis.

### FULL OUTER JOIN – Alles aus beiden Tabellen

Gibt **alle Zeilen beider Tabellen** zurück. Nicht verknüpfbare Zeilen erhalten auf der fehlenden Seite NULL.

```sql
SELECT k.vorname, b.bestellid, b.preis
FROM bestellungen b
FULL JOIN kunden k ON b.kundenid = k.kundenid;
```

### Übersicht aller JOIN-Arten

| JOIN-Art         | Was wird zurückgegeben                        |
|------------------|-----------------------------------------------|
| `INNER JOIN`     | Nur die Schnittmenge (Match in beiden Tabellen)|
| `LEFT JOIN`      | Alle linken Zeilen + Schnittmenge             |
| `RIGHT JOIN`     | Alle rechten Zeilen + Schnittmenge            |
| `FULL OUTER JOIN`| Alle Zeilen beider Tabellen                   |

> **Merkhilfe:** INNER = nur Überschneidung. LEFT/RIGHT = eine Seite immer vollständig. FULL = alles.

---

### 🧩 Mini-Quiz: Block 5

**Frage 1:** Was gibt ein INNER JOIN zurück?
- A) Alle Zeilen der linken Tabelle
- B) Alle Zeilen beider Tabellen
- C) **Nur Zeilen die in beiden Tabellen einen übereinstimmenden Wert haben** ✅
- D) Alle Zeilen der rechten Tabelle

*Erklärung: INNER JOIN gibt nur die Schnittmenge zurück – Zeilen ohne passendes Gegenstück auf der anderen Seite werden weggelassen.*

**Frage 2:** Du hast eine Tabelle Kunden und eine Tabelle Bestellungen. Du willst ALLE Kunden sehen, auch jene ohne Bestellungen. Welcher JOIN ist richtig?
- A) INNER JOIN
- B) **RIGHT JOIN (Kunden als rechte Tabelle) oder LEFT JOIN (Kunden als linke Tabelle)** ✅
- C) FULL OUTER JOIN
- D) CROSS JOIN

*Erklärung: Um alle Kunden zu sehen, muss die Kunden-Tabelle die "vollständige" Seite sein. Das erreicht man mit LEFT JOIN (Kunden links) oder RIGHT JOIN (Kunden rechts).*

**Frage 3:** Welchen Wert erhält eine Spalte, wenn beim OUTER JOIN kein übereinstimmender Datensatz gefunden wird?
- A) 0
- B) Leer ("")
- C) Fehler
- D) **NULL** ✅

*Erklärung: Bei OUTER JOINs wird NULL eingesetzt wenn auf einer Seite kein passender Datensatz existiert.*

---

## ──────────────────────────────────────
## BLOCK 2 – DML: Daten einfügen, ändern, löschen
## ──────────────────────────────────────

### Was ist DML?

DML (Data Manipulation Language) umfasst alle Befehle, die **Daten verändern**. Die drei Kernbefehle:

| Befehl   | Aktion                          |
|----------|---------------------------------|
| `INSERT` | Neue Datensätze hinzufügen      |
| `UPDATE` | Bestehende Datensätze ändern    |
| `DELETE` | Datensätze löschen              |

> ⚠️ **Wichtig:** DML-Befehle verändern den Datenbestand dauerhaft und ohne Rückfrage. Ohne `WHERE` betreffen UPDATE und DELETE **alle** Zeilen der Tabelle.

### INSERT – Daten einfügen

```sql
-- Einzelnen Datensatz einfügen
INSERT INTO kunden (vorname, nachname, land)
VALUES ('Hans', 'Meier', 'CH');

-- Mehrere Datensätze auf einmal
INSERT INTO kunden (vorname, nachname)
VALUES ('Anna', 'Müller'), ('Roni', 'Bauer');
```

### UPDATE – Daten ändern

```sql
-- Einen bestimmten Kunden aktualisieren
UPDATE kunden
SET nachname = 'Meyer', land = 'DE'
WHERE kundenid = 2;
```

> ⚠️ Vergisst man das `WHERE`, werden **alle** Kunden geändert!

### DELETE – Daten löschen

```sql
-- Einen bestimmten Datensatz löschen
DELETE FROM produkte WHERE produktid = 5;
```

> ⚠️ Ohne `WHERE` → alle Zeilen der Tabelle werden gelöscht!

### DELETE vs. TRUNCATE

| Merkmal                  | DELETE               | TRUNCATE                 |
|--------------------------|----------------------|--------------------------|
| Einzelne Zeilen löschbar | ✅ Ja (mit WHERE)    | ❌ Nein (immer alles)    |
| Protokollierung          | ✅ Ja (langsamer)    | ❌ Nein (schneller)      |
| WHERE-Klausel            | ✅ Möglich           | ❌ Nicht möglich         |

### Referentielle Integrität

Wenn ein Fremdschlüssel auf einen Datensatz zeigt, der gelöscht werden soll, schlägt das DELETE fehl:

```sql
-- Fehler: Kunde 2 hat noch Bestellungen → Fremdschlüssel-Verletzung
DELETE FROM kunden WHERE kundenid = 2;
```

Lösung: Erst die abhängigen Datensätze löschen oder `ON DELETE CASCADE` aktivieren.

---

### 🧩 Mini-Quiz: Block 2

**Frage 1:** Welcher Befehl fügt einen neuen Datensatz in eine Tabelle ein?
- A) UPDATE
- B) SELECT INTO
- C) **INSERT** ✅
- D) ADD

*Erklärung: INSERT INTO fügt neue Zeilen in eine Tabelle ein. Die Werte werden nach VALUES angegeben.*

**Frage 2:** Was passiert bei folgendem Befehl? `UPDATE kunden SET land = 'DE'`
- A) Nur der erste Kunde wird geändert
- B) Es wird ein Fehler ausgegeben
- C) Nichts, weil WHERE fehlt
- D) **Alle Kunden in der Tabelle erhalten land = 'DE'** ✅

*Erklärung: Ohne WHERE-Klausel betrifft UPDATE alle Zeilen der Tabelle. Immer zuerst mit SELECT prüfen welche Zeilen betroffen wären.*

**Frage 3:** Was ist der Unterschied zwischen DELETE und TRUNCATE?
- A) TRUNCATE löscht nur eine Zeile, DELETE alle
- B) **DELETE kann mit WHERE einzelne Zeilen löschen, TRUNCATE löscht immer die ganze Tabelle** ✅
- C) Es gibt keinen Unterschied
- D) DELETE ist schneller als TRUNCATE

*Erklärung: DELETE ist flexibel (WHERE möglich, protokolliert), TRUNCATE löscht alles ohne Protokollierung und ist deshalb schneller.*

---

## ──────────────────────────────────────
## QUIZFRAGEN FÜR HTML (JavaScript quizData)
## ──────────────────────────────────────

Folgende Fragen direkt in das `quizData`-Objekt in `it-lernplattform.html` einfügen.
Schlüssel: `sql` (ersetzt die bestehenden 2 Beispielfragen).

```javascript
sql: {
  questions: [
    {
      q: "Welcher SQL-Befehl liest Daten aus einer Tabelle?",
      options: [
        "INSERT",
        "UPDATE",
        "SELECT",
        "DELETE"
      ],
      correct: 2,
      explanation: "SELECT ist der Grundbefehl von DQL (Data Query Language) und dient ausschliesslich zum Lesen von Daten – ohne Daten zu verändern."
    },
    {
      q: "Was macht der Operator LIKE 'A%' in einer WHERE-Klausel?",
      options: [
        "Gibt alle Werte zurück, die mit einem beliebigen Buchstaben enden",
        "Gibt alle Werte zurück, die mit 'A' beginnen",
        "Gibt genau den Wert 'A%' zurück",
        "Gibt alle Werte ausser 'A' zurück"
      ],
      correct: 1,
      explanation: "Das %-Zeichen ist ein Wildcard für beliebig viele Zeichen. 'A%' bedeutet: beginnt mit A, danach egal – z.B. Anna, Anton oder Alpen."
    },
    {
      q: "Was gibt ein INNER JOIN zurück?",
      options: [
        "Alle Zeilen der linken Tabelle, auch ohne Match",
        "Alle Zeilen beider Tabellen",
        "Nur Zeilen, die in beiden Tabellen einen übereinstimmenden Wert haben",
        "Alle Zeilen der rechten Tabelle, auch ohne Match"
      ],
      correct: 2,
      explanation: "INNER JOIN gibt nur die Schnittmenge zurück – Zeilen ohne passendes Gegenstück auf der anderen Seite werden weggelassen."
    },
    {
      q: "Was passiert bei: UPDATE kunden SET land = 'DE'  (ohne WHERE)?",
      options: [
        "Nur der erste Kunde wird geändert",
        "Es wird ein Fehler ausgegeben",
        "Nichts – ohne WHERE passiert nichts",
        "Alle Kunden in der Tabelle erhalten land = 'DE'"
      ],
      correct: 3,
      explanation: "Ohne WHERE-Klausel betrifft UPDATE alle Zeilen der Tabelle. Daher immer zuerst mit SELECT prüfen, welche Zeilen betroffen wären."
    },
    {
      q: "Was ist der Unterschied zwischen WHERE und HAVING?",
      options: [
        "Es gibt keinen Unterschied",
        "WHERE funktioniert nur mit JOINs",
        "WHERE filtert vor der Gruppierung, HAVING nach der Gruppierung",
        "HAVING kann nur mit COUNT() verwendet werden"
      ],
      correct: 2,
      explanation: "WHERE filtert einzelne Zeilen bevor sie gruppiert werden. HAVING filtert die fertigen Gruppen nach GROUP BY – z.B. nur Gruppen mit COUNT(*) > 5."
    },
    {
      q: "Welcher JOIN zeigt ALLE Kunden an – auch jene ohne Bestellung?",
      options: [
        "INNER JOIN",
        "CROSS JOIN",
        "FULL OUTER JOIN",
        "LEFT JOIN (Kunden als linke Tabelle)"
      ],
      correct: 3,
      explanation: "LEFT JOIN gibt alle Zeilen der linken Tabelle zurück. Steht die Kunden-Tabelle links, erscheinen alle Kunden – auch jene ohne Bestellung (Bestellspalten = NULL)."
    }
  ]
}
```

---

## ──────────────────────────────────────
## HTML-VORLAGE: Blöcke zum Einfügen
## ──────────────────────────────────────

Die folgenden section-blocks sind bereit zum Einfügen in `<div id="page-sql">`.
Einfach den jeweiligen `placeholder-text`-Absatz durch den Inhalt ersetzen.

```
BLOCK 1 → "Grundbefehle: SELECT, INSERT, UPDATE, DELETE"
          Inhalt: SELECT-Grundstruktur + WHERE-Tabelle

BLOCK 2 → "Sortieren, Filtern, Aggregieren"
          Inhalt: ORDER BY, DISTINCT, Aggregatfunktionen, GROUP BY / HAVING

BLOCK 3 → "JOINs und Beziehungen"
          Inhalt: INNER / LEFT / RIGHT / FULL JOIN mit Beispielresultaten

BLOCK 4 → "Datenbankdesign & Normalisierung"
          Hinweis: Normalisierung ist M162-Inhalt (Milan).
          Hier DML-Fokus: INSERT / UPDATE / DELETE + Referentielle Integrität
```

---

## ──────────────────────────────────────
## BLOCK 1 – DDL: Tabellen erstellen und verwalten
## ──────────────────────────────────────

### Was ist DDL?

DDL (Data Definition Language) ist der Teil von SQL, mit dem die **Struktur** einer Datenbank definiert wird – also Tabellen, Spalten, Datentypen und Constraints. DDL verändert keine Daten, sondern den **Aufbau** der Datenbank.

| Befehl    | Aktion                                   |
|-----------|------------------------------------------|
| `CREATE`  | Tabelle, Datenbank oder Schema erstellen |
| `ALTER`   | Bestehende Tabelle verändern             |
| `DROP`    | Tabelle oder Datenbank löschen           |

### CREATE TABLE – Tabelle erstellen

Beim Erstellen einer Tabelle werden Spaltenname, Datentyp und optionale Constraints festgelegt.

```sql
CREATE TABLE kunden (
  kundenid   INT           PRIMARY KEY IDENTITY,
  vorname    VARCHAR(50)   NOT NULL,
  nachname   VARCHAR(50)   NOT NULL,
  email      VARCHAR(100)  UNIQUE,
  land       CHAR(2)       DEFAULT 'CH',
  geburtsjahr INT          CHECK (geburtsjahr > 1900)
);
```

**Wichtige Datentypen:**

| Datentyp       | Beschreibung                              | Beispiel          |
|----------------|-------------------------------------------|-------------------|
| `INT`          | Ganzzahl                                  | 42, -7, 0         |
| `DECIMAL(p,s)` | Dezimalzahl (p Stellen, s Nachkommastellen)| 19.90, 1234.50    |
| `VARCHAR(n)`   | Text mit variabler Länge (max. n Zeichen) | 'Hallo', 'Meier'  |
| `CHAR(n)`      | Text mit fixer Länge (genau n Zeichen)    | 'CH', 'DE'        |
| `DATE`         | Datum                                     | '2026-05-26'      |
| `BIT`          | Wahrheitswert (0 oder 1)                  | 1 (= true)        |

**Wichtige Constraints:**

| Constraint      | Bedeutung                                                       |
|-----------------|-----------------------------------------------------------------|
| `PRIMARY KEY`   | Eindeutiger Bezeichner jeder Zeile – darf nicht NULL sein       |
| `IDENTITY`      | Wert wird automatisch hochgezählt (Auto-Increment)             |
| `NOT NULL`      | Spalte muss immer einen Wert enthalten                          |
| `UNIQUE`        | Kein doppelter Wert erlaubt (z.B. E-Mail-Adresse)              |
| `DEFAULT`       | Standardwert wenn kein Wert angegeben wird                      |
| `CHECK`         | Wert muss eine Bedingung erfüllen (z.B. Alter > 0)             |
| `FOREIGN KEY`   | Verknüpfung mit dem Primärschlüssel einer anderen Tabelle       |

### FOREIGN KEY – Tabellen verknüpfen

Ein Fremdschlüssel stellt sicher, dass ein Wert in einer Spalte immer in der referenzierten Tabelle existiert (referentielle Integrität).

```sql
CREATE TABLE bestellungen (
  bestellid   INT     PRIMARY KEY IDENTITY,
  bestelldatum DATE   NOT NULL,
  kundenid    INT     NOT NULL,

  CONSTRAINT fk_bestellungen_kunden
    FOREIGN KEY (kundenid)
    REFERENCES kunden(kundenid)
    ON DELETE CASCADE
);
```

> Ein INSERT in `bestellungen` mit einer `kundenid`, die in `kunden` nicht existiert, schlägt fehl.

### ALTER TABLE – Tabelle nachträglich ändern

```sql
-- Neue Spalte hinzufügen
ALTER TABLE kunden ADD telefon VARCHAR(20);

-- Spalte löschen
ALTER TABLE kunden DROP COLUMN telefon;

-- Datentyp einer Spalte ändern
ALTER TABLE kunden ALTER COLUMN nachname VARCHAR(100);

-- Constraint nachträglich hinzufügen
ALTER TABLE kunden ADD CONSTRAINT chk_land CHECK (land IN ('CH', 'DE', 'AT'));
```

### DROP TABLE – Tabelle löschen

```sql
-- Tabelle vollständig löschen (Struktur + alle Daten)
DROP TABLE bestellungen;
```

> ⚠️ DROP löscht die Tabelle **unwiderruflich** – Struktur und alle Daten sind weg. Zuerst abhängige Tabellen (mit Fremdschlüsseln) löschen oder `ON DELETE CASCADE` setzen.

> **Merkhilfe DDL vs. DML:** DDL verändert die **Struktur** (Tabellen), DML verändert die **Daten** (Zeilen). CREATE/ALTER/DROP vs. INSERT/UPDATE/DELETE.

---

### 🧩 Mini-Quiz: Block 1

**Frage 1:** Was ist die Aufgabe von DDL (Data Definition Language)?
- A) Daten in Tabellen abfragen
- B) Benutzerrechte vergeben
- C) **Datenbankstrukturen wie Tabellen und Spalten erstellen und verändern** ✅
- D) Daten einfügen und löschen

*Erklärung: DDL definiert die Struktur der Datenbank (CREATE, ALTER, DROP). Das Befüllen mit Daten ist Aufgabe von DML (INSERT, UPDATE, DELETE).*

**Frage 2:** Was bewirkt das Constraint `NOT NULL` auf einer Spalte?
- A) Die Spalte darf nur den Wert 0 enthalten
- B) Die Spalte wird automatisch hochgezählt
- C) Die Spalte muss einen eindeutigen Wert haben
- D) **Die Spalte muss immer einen Wert enthalten – NULL ist nicht erlaubt** ✅

*Erklärung: NOT NULL erzwingt, dass beim INSERT immer ein Wert für diese Spalte angegeben werden muss. Wird kein Wert übergeben und kein DEFAULT gesetzt, gibt SQL einen Fehler aus.*

**Frage 3:** Was ist ein FOREIGN KEY?
- A) Ein zweiter Primärschlüssel einer Tabelle
- B) Ein automatisch hochgezählter Wert
- C) **Eine Spalte, die auf den Primärschlüssel einer anderen Tabelle verweist** ✅
- D) Ein verschlüsselter Spaltenwert

*Erklärung: Ein Fremdschlüssel (FOREIGN KEY) stellt sicher, dass der Wert in der Spalte in der referenzierten Tabelle existiert – er sorgt für referentielle Integrität zwischen Tabellen.*

---

> ➕ **quizData-Ergänzung** – diese 2 Fragen zum `sql`-Objekt hinzufügen:

```javascript
    {
      q: "Was ist die Aufgabe von DDL (Data Definition Language)?",
      options: [
        "Daten in Tabellen abfragen",
        "Benutzerrechte vergeben",
        "Datenbankstrukturen wie Tabellen und Spalten erstellen und verändern",
        "Daten einfügen und löschen"
      ],
      correct: 2,
      explanation: "DDL (CREATE, ALTER, DROP) definiert die Struktur der Datenbank. Das Befüllen mit Daten übernimmt DML (INSERT, UPDATE, DELETE)."
    },
    {
      q: "Was bewirkt das Constraint NOT NULL auf einer Spalte?",
      options: [
        "Die Spalte darf nur den Wert 0 enthalten",
        "Die Spalte wird automatisch hochgezählt",
        "Die Spalte muss einen eindeutigen Wert haben",
        "Die Spalte muss immer einen Wert enthalten – NULL ist nicht erlaubt"
      ],
      correct: 3,
      explanation: "NOT NULL erzwingt, dass beim INSERT immer ein Wert angegeben wird. Ohne DEFAULT führt ein fehlender Wert zu einem Fehler."
    }
```

---

*Erstellt: 26.05.2026 | Quelle: M106 Zusammenfassungen (SQL-DQL, DQL-Joins, DML)*
*→ Nächster Schritt: Inhalte in `it-lernplattform.html` einfügen, quizData ersetzen*
