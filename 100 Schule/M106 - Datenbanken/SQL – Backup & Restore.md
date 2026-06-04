---
title: "M106 – Datenbanksicherung & Wiederherstellung"
tags: [schule, modul-106, sql, backup]
created: 2026-05-28
status: draft
publish: false
---
# Datenbanksicherung & Wiederherstellung

## Überblick
Beschreibt die verschiedenen Sicherungs‑Varianten von SQL Server, deren Optionen und die zugehörigen Wiederherstellungs‑Modelle.

## Inhalt
### 1. Sicherungs‑Varianten
| Variante | Beschreibung |
|----------|--------------|
| **Vollständige Sicherung** | Sichert die gesamte Datenbank zum Zeitpunkt der Sicherung. |
| **Differenzielle Sicherung** | Enthält nur Änderungen seit der letzten Vollsicherung. Benötigt die zugehörige Vollsicherung zum Wiederherstellen. |
| **Transaktionsprotokoll‑Sicherung** | Sichert alle Änderungen seit der letzten Log‑Sicherung. Nur bei Wiederherstellungsmodell **vollständig** möglich. |

#### Optionen (Beispiel‑Befehl)
```sql
BACKUP DATABASE [WideWorldImporters]
TO DISK = N'C:\Path\WideWorldImporters.bak'
WITH NOFORMAT, NOINIT, NAME = N'WideWorldImporters vollständige Sicherung', SKIP, STATS = 10;
```
| Option | Bedeutung |
|--------|-----------|
| `WITH FORMAT` | Überschreibt vorhandene Backups. |
| `WITH NOFORMAT` | Fügt zum bestehenden Backup‑Set hinzu (Standard). |
| `NOINIT` | Belässt Header existierender Backups. |
| `SKIP` | In Kombination mit `NOINIT` behält vorhandene Backups. |
| `STATS = N` | Fortschrittsanzeige pro N %. |

### 2. Wiederherstellungs‑Modelle
| Modell | Eigenschaften |
|--------|----------------|
| **Einfach** | Log wird automatisch gekürzt; kein Log‑Backup möglich – geeignet für Test‑/Entwicklungsdatenbanken. |
| **Vollständig** | Log‑Einträge werden behalten bis ein Log‑Backup erfolgt – ermöglicht point‑in‑time‑Recovery. |
| **Massenprotokolliert** | Log‑Wachstum ist geringer; gut für Bulk‑Operationen. |

### 3. Wiederherstellung
```sql
RESTORE DATABASE [WideWorldImporters]
FROM DISK = N'C:\Path\WideWorldImporters.bak';
```
*Beispiel für Wiederherstellung einer neueren Version auf einer älteren SQL Server‑Instanz (Hinweis: nicht möglich, daher Warnung im Original‑Text).* 

## Schlüsselbegriffe
- **Backup‑Set**, **Log‑Backup**, **Point‑in‑Time‑Recovery**, **Wiederherstellungsmodell**

## Verbindungen zu anderen Themen
| Thema | Verbindung |
|-------|------------|
| [[SQL Server - Datensicherheit]] | Sicherungen schützen vor Datenverlust; Log‑Sicherung ist Teil der Sicherheits‑Strategie. |

## Bilder
<!-- Platzhalter für Bild(e) – bitte hier einfügen -->
![Backup‑Optionen](/path/to/backup-optionen.png)
