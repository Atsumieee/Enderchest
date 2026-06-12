---
title: Datenbanken — Knowledge Area
tags:
  - datenbanken
  - sql
  - übersicht
created: 2026-06-04
status: permanent
publish: false
todo: false
---

# 🗄️ Datenbanken — Knowledge Area

Umfassende Sammlung von Datenbankwissen aus allen Modulen, organisiert nach Themen.
Diese Area verbindet praktisches SQL-Wissen (M106, M164) mit konzeptuellem Verständnis.

---

## 📍 Überblick

**Datenbanken** sind das Herz moderner Anwendungen. Diese Area deckt ab:
- **Abfragen** (DQL): Daten lesen und analysieren
- **Manipulation** (DML): Daten ändern, einfügen, löschen
- **Struktur & Design**: Views, Indizes, Backup
- **Sicherheit**: Benutzer, Rollen, Berechtigungen
- **Performance**: Ausführungspläne optimieren

---

## 🎓 Module & Lernpfad

### Grundlagen (M106 — Datenbanken)
[[M106 Übersicht|M106 Datenbanken]] ist dein Einstiegspunkt. Es deckt alle SQL-Grundlagen ab:

| Thema                   | Notiz                                                        |
| ----------------------- | ------------------------------------------------------------ |
| **DQL Grundlagen**      | [[SQL - DQL]] — SELECT, WHERE, Filterung                     |
| **Joins**               | [[SQL - DQL Joins]] — INNER, LEFT, RIGHT, FULL JOIN          |
| **DML Operationen**     | [[SQL - DML]] — INSERT, UPDATE, DELETE                       |
| **Erweiterte Features** | [[SQL - Views]] — Views als virtuelle Tabellen               |
| **Funktionen**          | [[SQL – Funktionen]] — Aggregat und Skalarfunktionen         |
| **Optimierung**         | [[SQL – Indizes]] — Indizes für schnellere Abfragen          |
| **Debugging**           | [[SQL – Ausfuehrungsplan]] — Abfragepläne verstehen          |
| **Datenschutz**         | [[SQL – Backup & Restore]] — Daten sichern                   |
| **Sicherheit**          | [[SQL Server - Datensicherheit]] — Rollen und Berechtigungen |

### Praktische Anwendung (M164 — SQL Vertiefung)
[[M164 Übersicht|M164 SQL Vertiefung]] zeigt, wie SQL in realen Projekten eingesetzt wird:

| Projekt | Beschreibung |
|---------|-------------|
| **Stundenplan-Projekt** | [[M164 - Stundenplan Skript]] — Praktische SQL-Anwendung mit komplexen Abfragen |

---

## 🧠 Wissensstruktur

### 1️⃣ Abfragen (DQL — Data Query Language)
Die Kunst, Fragen an eine Datenbank zu stellen.

- **Basis**: [[SQL - DQL]] — Einfache SELECT-Abfragen
- **Verknüpfungen**: [[SQL - DQL Joins]] — Mehrere Tabellen kombinieren
- **Funktionen**: [[SQL – Funktionen]] — COUNT, SUM, AVG, etc.

### 2️⃣ Datenverwaltung (DML — Data Manipulation Language)
Wie du Daten änderst, einfügst und löschst.

- **Operative Befehle**: [[SQL - DML]] — INSERT, UPDATE, DELETE
- **Aufgaben**: [[SQL – DML Aufgaben]] — Übungen zur DML

### 3️⃣ Struktur & Effizienz
Das Fundament einer guten Datenbank.

- **Views**: [[SQL - Views]] — Logische Sichten auf Daten
- **Indizes**: [[SQL – Indizes]] — Schnellere Abfragen durch richtige Indizes
- **Pläne**: [[SQL – Ausfuehrungsplan]] — Warum eine Abfrage langsam ist

### 4️⃣ Betrieb & Sicherheit
Datenbanken sicher halten.

- **Backup & Restore**: [[SQL – Backup & Restore]] — Datenverlust verhindern
- **Zugriffskontrolle**: [[SQL Server - Datensicherheit]] — Wer darf was?

---

## 📊 Alle Datenbanknotizen

```dataview
TABLE status, file.folder AS Bereich, created
FROM "100 Schule"
WHERE contains(tags, "sql") OR contains(tags, "datenbanken")
AND file.name != "Datenbanken"
SORT file.folder ASC, file.name ASC
```

---

## 🔗 Verbindungen zu anderen Areas

| Area | Verbindung |
|------|-----------|
| **Programmierung** | Datenbanken sind Backend aller Anwendungen |
| **Netzwerk** | Datenbanken laufen auf Servern, benötigen Netzwerkzugriff |
| **Security** | Datensicherheit ist ein kritischer Aspekt jeder Datenbank |

---

## 📝 Notizen & Aufgaben

Praktische Übungen und Projekte:
- [[SQL – DML Aufgaben]] — Trainiere INSERT, UPDATE, DELETE
- [[SQL – Projekt‑Aufgaben]] — Größeres Projekt mit echten Anforderungen

---

## 💡 Lernstrategie

1. **Start mit DQL** ([[SQL - DQL]]) — verstehe wie man Daten liest
2. **Dann DML** ([[SQL - DML]]) — lerne wie man Daten ändert
3. **Joins meistern** ([[SQL - DQL Joins]]) — das ist der Dreh- und Angelpunkt
4. **Performance verstehen** ([[SQL – Indizes]], [[SQL – Ausfuehrungsplan]])
5. **Sicherheit ernst nehmen** ([[SQL Server - Datensicherheit]])
6. **Praktizieren** mit echten Projekten ([[M164 - Stundenplan Skript]])

---

## Quellen & Weiterführendes

_Siehe die einzelnen Modul-Übersichten für spezifische Ressourcen._
