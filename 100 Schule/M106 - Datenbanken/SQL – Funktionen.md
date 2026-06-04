---
title: "M106 – Vordefinierte SQL‑Funktionen"
tags: [schule, modul-106, sql, funktionen]
created: 2026-05-28
status: draft
publish: false
---
# Vordefinierte SQL‑Funktionen

## Überblick
Dieses Kapitel erklärt, wie man die integrierten (vordefinierten) Funktionen von SQL Server verwendet. Sie können sowohl in **SELECT**‑Listen als auch in **WHERE**‑Klauseln und anderen Ausdruckskontexten eingesetzt werden, um Daten zu transformieren, zu berechnen oder zu prüfen.

## 1 Best Practices & Anwendungsbeispiele
### 1.1 Deterministische vs. nicht‑deterministische Funktionen
- **Deterministisch**: Liefert bei identischen Eingabewerten immer das gleiche Ergebnis. Ideal für Index‑Ausdrücke und persistente Berechnungen.
  ```sql
  SELECT LOWER('ABC') AS lower_name;  -- immer "abc"
  ```
- **Nicht‑deterministisch**: Ergebnis kann sich ändern, selbst wenn die Eingaben gleich sind (z. B. `GETDATE()`, `NEWID()`). Diese Funktionen dürfen nicht in indizierten Views oder Computed Columns verwendet werden.
  ```sql
  SELECT GETDATE() AS current_time;  -- aktueller Timestamp bei jedem Aufruf
  ```

### 1.2 Funktionsarten
- **Single‑Row‑ (Skalar‑)Funktionen** geben für jede Zeile exakt einen Wert zurück und können überall dort eingesetzt werden, wo ein Ausdruck zulässig ist.
- **Multiple‑Row‑ (Aggregat‑)Funktionen** arbeiten über mehrere Zeilen und geben einen einzigen zusammengefassten Wert zurück (z. B. `COUNT()`, `SUM()`).

## 2 Kategorien von integrierten Funktionen (SQL Server)
| Kategorie | Zweck | Häufige Funktionen | Beispiel‑SQL |
|-----------|-------|-------------------|--------------|
| **Zeichenfolgen** | Manipulation von `CHAR`/`VARCHAR`‑Werten | `LEN()`, `LEFT()`, `RIGHT()`, `SUBSTRING()`, `LOWER()`, `UPPER()`, `LTRIM()`, `RTRIM()`, `REPLACE()`, `CONCAT()` | `SELECT SUBSTRING(Name,1,5) FROM Kunden;` |
| **Mathematisch** | Numerische Berechnungen | `ROUND()`, `FLOOR()`, `CEILING()`, `ABS()`, `POWER()`, `SQRT()`, `LOG()`, `EXP()` | `SELECT ROUND(Preis*1.19,2) FROM Produkte;` |
| **Datum & Uhrzeit** | Arbeiten mit Datum/Zeit‑Werten | `GETDATE()`, `DATEADD()`, `DATEDIFF()`, `DATENAME()`, `YEAR()`, `MONTH()`, `DAY()` | `SELECT DATEADD(day,7,GETDATE()) AS next_week;` |
| **Konvertierung** | Typumwandlung zwischen Daten‑Typen | `CAST()`, `CONVERT()` (mit Stil‑Codes für Datums‑Formate) | `SELECT CONVERT(date,'24.12.2025',104) AS german_date;` |
| **System** | Informationen zum Server/Session | `CURRENT_USER`, `HOST_NAME()`, `ISNULL()`, `NEWID()` | `SELECT NEWID() AS guid;` |

### Hinweis zu Oracle‑Entsprechungen
Falls Sie dieselben Konzepte in Oracle benötigen, finden Sie in der Original‑Datei die Oracle‑Äquivalente (z. B. `LOWER()` ↔ `LOWER()`, `SUBSTRING()` ↔ `SUBSTR()`).

## 3 Typische Einsatzszenarien
1. **Formatieren von Ausgaben** – z. B. Telefonnummern oder Postleitzahlen mit `LEFT()`/`RIGHT()`.  
2. **Berechnen von Kennzahlen** – Preis‑auf‑Steuer‑Berechnung mit `ROUND()` und `CAST()`.  
3. **Filtern nach dynamischen Bedingungen** – aktuelle Woche mit `DATEPART()` und `GETDATE()`.  
4. **Erstellen von eindeutigen Schlüsseln** – `NEWID()` in Kombination mit `INSERT`.

## 4 Tipps zum Einsatz in Indizes & Views
- Verwenden Sie **nur deterministische Funktionen**, wenn Sie sie in **indexierten Views** oder **computed columns** platzieren wollen.
- Vermeiden Sie teure Funktionen (z. B. `RAND()`) in häufig ausgeführten Abfragen, da sie die Ausführungszeit erhöhen können.

## Schlüsselbegriffe
- **Deterministisch**
- **Single‑Row‑Funktion**
- **Aggregat‑Funktion**
- **Computed Column**

## Verbindungen zu anderen Themen
| Thema | Verbindung |
|-------|------------|
| [[SQL – DQL]] | Nutzung von Funktionen innerhalb von `SELECT`‑ und `WHERE`‑Klauseln. |
| [[SQL – DML]] | Funktionen in `INSERT`‑ oder `UPDATE`‑Statements, z. B. `SET Preis = ROUND(Preis*1.07,2)`. |
| [[SQL – Views]] | Funktionen in der Definition von Views, wobei deterministische Funktionen erlaubt sind. |

## Bilder
<!-- Platzhalter für Bild(e) – bitte hier einfügen -->
![Funktionen‑Übersicht](/path/to/funktionen-uebersicht.png)

