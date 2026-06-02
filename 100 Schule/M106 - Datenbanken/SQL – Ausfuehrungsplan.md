---
title: "M106 – Ausführungsplan"
tags: [schule, modul-106, sql, ausfuehrungsplan]
created: 2026-05-28
status: draft
publish: false
---
# Ausführungsplan (Explain Plan)

## Überblick
Der **Ausführungsplan** (auch *Explain Plan* genannt) ist das wichtigste Diagnose‑Werkzeug, um zu verstehen, wie der SQL‑Server eine Abfrage intern ausführt. Er liefert eine grafische bzw. tabellarische Darstellung der Operatoren, ihrer Reihenfolge und der geschätzten bzw. tatsächlichen Kosten (CPU, I/O, Speicher).

## 1 Warum und wann verwenden?
- **Performance‑Optimierung**: Erkennen von teuren Scans, fehlenden Indexen oder ineffizienten Joins.
- **Ressourcen‑Planung**: Abschätzen, welche Server‑Ressourcen (CPU, Disk‑I/O) eine Abfrage verbraucht.
- **Debugging von Dead‑locks**: Sichtbare Reihenfolge von Operatoren kann Konfliktquellen aufdecken.
- **Entwicklung**: Beim Schreiben neuer Queries sofort prüfen, ob ein Index verwendet wird.

## 2 Arten von Plänen
| Plan‑Typ | Beschreibung |
|----------|--------------|
| **Estimated (geschätzt)** | Der Optimizer berechnet Kosten anhand von Statistiken, ohne die Abfrage auszuführen. Schnell, aber kann abweichen, wenn Statistiken veraltet sind. |
| **Actual (tatsächlich)** | Der Plan wird zusammen mit dem echten Ausführungs‑Ergebnis zurückgegeben und enthält reale Laufzeit‑ und Speicher‑Metriken. Nutzt mehr Ressourcen, da die Query tatsächlich laufen muss. |

## 3 Wie aktivieren in Azure Data‑Studio (ADS)
1. **Estimated Plan** – Klick auf den Button *“Explain”* (oder *“Estimated Plan”*) – die Abfrage wird nicht ausgeführt, nur der geschätzte Plan angezeigt.
2. **Actual Plan** – Öffne ein neues Query‑Fenster und setze die folgenden Optionen, bevor du die eigentliche Abfrage ausführst:
   ```sql
   SET SHOWPLAN_TEXT ON;      -- liefert den Plan als Text‑Ausgabe
   SET SHOWPLAN_ALL ON;       -- detaillierter Plan inkl. Operator‑IDs
   SET SHOWPLAN_XML ON;       -- XML‑Version für grafische Anzeige
   SET STATISTICS PROFILE ON; -- liefert tabellarischen Plan mit Laufzeit‑Daten
   SET STATISTICS XML ON;     -- XML‑Ausgabe des tatsächlichen Plans
   ```
   Danach führe deine eigentliche Abfrage aus – das Ergebnis wird zusammen mit dem Plan zurückgegeben.

## 4 Beispiel‑Abfrage und Interpretation
```sql
-- Beispiel: Alle Rechnungen eines bestimmten Datums anzeigen
EXPLAIN SELECT *
FROM Sales.Invoices
WHERE InvoiceDate = '2014-03-15';
```
### Typische Elemente im Plan
- **Clustered Index Scan / Seek** – Zeigt, ob ein Index genutzt wird (Seek ist schneller). Wenn ein *Scan* erscheint, prüfe, ob ein passender Index fehlt.
- **Nested Loops / Hash Join / Merge Join** – Auswahl des Join‑Typs; Nested Loops sind für kleine Datenmengen geeignet, Hash‑ bzw. Merge‑Joins für große Mengen.
- **Estimated I/O Cost / Estimated CPU Cost** – Relative Kosten; hohe I/O‑Kosten deuten auf viele Seitenzugriffe hin.
- **Actual Rows** vs. **Estimated Rows** – Abweichungen zeigen falsche Statistiken.

### Praxis‑Checkliste nach Ansicht des Plans
1. **Index‑Nutzung prüfen** – Gibt es einen *Seek*? Wenn nicht, index anlegen.
2. **Zeilen‑Schätzung kontrollieren** – Abweichungen > 30 % → STATISTICS aktualisieren (`UPDATE STATISTICS`).
3. **Join‑Typ beurteilen** – Teure *Hash Joins* bei kleinen Tabellen evtl. zu *Nested Loops* ändern, indem man Filter hinzufügt.
4. **Kosten vergleichen** – Hohe CPU‑Kosten vs. I/O‑Kosten, entscheiden, ob Partitionierung oder Index‑Optimierung sinnvoll ist.

## 5 Tipps für den täglichen Einsatz
- **Standard‑Workflow**: Erst *Estimated Plan* prüfen, dann ggf. Index ergänzen, anschließend *Actual Plan* ausführen, um die Verbesserung zu bestätigen.
- **Plan‑Export**: In ADS kannst du den Plan als Bild oder XML speichern – nützlich für Ticket‑Dokumentation.
- **Statistiken aktuell halten**: `UPDATE STATISTICS` nach großen Datenänderungen, sonst führt das zu falschen Schätzungen.
- **Vermeide nicht‑deterministische Funktionen** (`GETDATE()`, `NEWID()`) in Spalten, die indexiert werden sollen – der Optimizer kann dann keinen Index nutzen.

## Schlüsselbegriffe
- **Estimated Plan**, **Actual Plan**, **Operator**, **Kosten**, **Seek**, **Scan**, **Nested Loops**, **Hash Join**, **Merge Join**, **Statistiken**

## Verbindungen zu anderen Themen
| Thema | Verbindung |
|-------|------------|
| [[SQL – DQL]] | Grundlegende SELECT‑Abfragen, für die ein Plan erstellt wird. |
| [[SQL – Indizes]] | Der Plan zeigt, ob ein Index verwendet wird – zentrale Optimierungshilfe. |
| [[SQL – Funktionen]] | Nicht‑deterministische Funktionen verhindern Index‑Nutzung im Plan. |

## Bilder
<!-- Platzhalter für Bild(e) – bitte hier einfügen -->
![Ausführungsplan‑Beispiel](/path/to/ausfuehrungsplan-beispiel.png)
