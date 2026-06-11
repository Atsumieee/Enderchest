---
title: "_Index"
tags: [übersicht]
created: 2026-06-02
status: permanent
publish: false
todo: false
---

# 📚 Enderchest — Interner Master Index

_Dieser Index wird vom Agenten gepflegt. Jede neue Notiz wird hier eingetragen.
Nicht manuell bearbeiten — Änderungen werden beim nächsten Agenten-Lauf überschrieben._

---

## 100 Schule

### Übersichten
| Notiz | Beschreibung |
|-------|-------------|
| [[_Übersicht Schule]] | Einstiegsseite Schule: Module & Fächer |
| [[Modulkatalog]] | Alle Module aller Lehrjahre mit Beschreibung und Area-Zuordnung |

### M106 — Datenbanken
| Notiz | Beschreibung |
|-------|-------------|
| [[M106 Übersicht]] | Modulübersicht und Aufgabenliste |
| [[SQL - DDL]] | CREATE TABLE, ALTER TABLE, DROP — Datenbankstruktur |
| [[SQL - DQL]] | SELECT, WHERE, GROUP BY, HAVING, ORDER BY |
| [[SQL - DQL Joins]] | INNER, LEFT, RIGHT, FULL JOIN |
| [[SQL - DML]] | INSERT, UPDATE, DELETE |
| [[SQL - Views]] | Views erstellen und verwenden |
| [[SQL – Funktionen]] | Aggregat- und Skalarfunktionen |
| [[SQL – Indizes]] | Indizes erstellen und optimieren |
| [[SQL – Ausfuehrungsplan]] | Ausführungspläne lesen und verstehen |
| [[SQL – Backup & Restore]] | Datenbank sichern und wiederherstellen |
| [[SQL Server - Datensicherheit]] | Benutzer, Rollen, Berechtigungen |
| [[SQL Server - Datensicherheit Aufgaben]] | Aufgaben zur Datensicherheit |
| [[SQL – DML Aufgaben]] | Aufgaben zu DML |
| [[SQL – Projekt‑Aufgaben]] | Projektaufgaben M106 |

### M122 — PowerShell
| Notiz | Beschreibung |
|-------|-------------|
| [[M122 Übersicht]] | Modulübersicht PowerShell |
| [[M122_Inhalte]] | Alle 6 Blöcke: Terminal, Variablen, Kontrollstrukturen, Schleifen, Pipeline, Funktionen |

### M164 — SQL Vertiefung
| Notiz | Beschreibung |
|-------|-------------|
| [[M164 Übersicht]] | Modulübersicht M164 |
| [[M164 - Stundenplan Skript]] | SQL-Skript Stundenplan-Projekt |
| [[M164 - ArtikelKauf Skript]] | SQL-Skript ArtikelKauf-Projekt |

### M231 — Datenschutz
| Notiz | Beschreibung |
|-------|-------------|
| [[M231 Übersicht]] | Modulübersicht Datenschutz |
| [[AAA-Modell]] | Authentifizierung, Autorisierung, Accounting |
| [[Angriffsmethoden]] | Phishing, Brute Force, Social Engineering und Gegenmassnahmen |
| [[Berechtigungskonzept]] | Rollen, Rechte, Least Privilege |
| [[Hashing]] | MD5, SHA, Salting, Passwort-Sicherheit |
| [[MFA]] | Multi-Faktor-Authentifizierung |
| [[TOTP]] | Time-Based One-Time Password |

### M431 — Projektarbeit
| Notiz | Beschreibung |
|-------|-------------|
| [[M431 Übersicht]] | Modulübersicht und Projektdokumente |
| [[IPERKA_Planung]] | Projektplanung nach IPERKA |
| [[Projektplan]] | Detaillierter Projektplan |
| [[Dokumentation_Final]] | Abschlussdokumentation |

### Mathematik
| Notiz | Beschreibung |
|-------|-------------|
| [[Mathematik Übersicht]] | Fachübersicht Mathematik |
| [[Neuronale Netze - Grundlagen]] | Konzept-Einstieg: Neuron, Gewicht, Lernen, Schichten + roter Faden der Serie |
| [[Neuronale Netze 1 - Eine Trennlinie lernen]] | Trennlinie y = A·x lernt mit der Regel Lücke/Breite × Lernrate |
| [[Neuronale Netze 2 - Mehr Trainingspunkte]] | Automatische Lernschleife mit vielen Punkten, Runden und Vorhersage |
| [[Neuronale Netze 3 - Gute und schlechte Lernraten]] | Lernrate: zu klein, gut, zu gross — Tempo vs. Stabilität |
| [[Neuronale Netze 4 - XOR und mehrere Schichten]] | XOR ist nicht linear trennbar — zwei Linien / versteckte Schicht |

---

## 200 Arbeit
_Alle Einträge hier sind `publish: false`_

| Notiz | Beschreibung |
|-------|-------------|
| _Noch keine Notizen_ | |

---

## 300 Privat
_Alle Einträge hier sind `publish: false`_

| Notiz | Beschreibung |
|-------|-------------|
| _Noch keine Notizen_ | |

---

## 400 Areas

Wissensgebiete, die Inhalte mehrerer Module bündeln. Zuordnung Modul→Area: [[Modulkatalog]]. Einstieg: [[Areas Übersicht]].

| Area-MOC | Beschreibung |
|----------|-------------|
| [[Datenbanken/Datenbanken]] | Datenbankwissen: DQL, DML, Modellierung, Performance (M106, 162, 164, 141, 110) |
| [[Linux]] | Betriebssysteme, Shell, Arbeitsplatz-Administration (M187) |
| [[Netzwerk]] | LAN, Protokolle, Dienste-Integration (M117, 129, 145, 300) |
| [[Scripting]] | PowerShell & Automatisierung (M122) |
| [[Webentwicklung]] | Software-/App-Entwicklung, OOP, Mobile/Web (M319, 223, 335) |
| [[Server & Dienste]] | Serverdienste, AD, Backup, Monitoring (M123, 143, 158, 188, 159, 157) |
| [[Cloud & Virtualisierung]] | Virtualisierung, Container, Public Cloud (M109, 169, 190, 210, 346) |
| [[Security]] | Datenschutz, Verschlüsselung, Netz-/Systemsicherheit (M231, 114, 184, 185, 182) |
| [[Projektmanagement]] | IPERKA, Projekte, Geschäftsprozesse (M431, 254, 306, 241, 245) |
| [[Emerging Tech]] | IoT, Blockchain, Machine Learning (M216, 107, 248, 259, 217) |

---

## 500 Ressources

| Notiz | Beschreibung |
|-------|-------------|
| _Noch keine Notizen_ | |

---

## Hinweise für den Agenten

- Neue Notizen immer in der richtigen Sektion eintragen
- Format: `| [[Dateiname]] | Kurze Beschreibung in einem Satz |`
- Beschreibung max. 1 Satz — was ist der Kern der Notiz?
- Neue Module oder Fächer als eigene Untersektion unter `100 Schule` anlegen
- Beim Umbenennen einer Notiz: Link hier aktualisieren
