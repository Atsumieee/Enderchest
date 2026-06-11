---
title: "Areas Übersicht"
tags: [übersicht, areas]
created: 2026-06-11
status: permanent
publish: false
todo: false
---

# 🧠 Areas — Wissensbereiche

Modulübergreifendes, dauerhaftes Wissen. Hier sammelt sich Know-how nach Themengebiet,
unabhängig von Schule oder Arbeit. Jede Area bündelt die Inhalte mehrerer Ausbildungs-Module
(→ [[Modulkatalog]]).

> **Hierarchie:** Die Area steht über dem Modul — Modulinhalte fliessen in die Area,
> nicht umgekehrt. Überschneidungen zwischen Areas sind normal und gewollt.

---

## Themengebiete

| Area | Inhalt | Module |
|------|--------|--------|
| [[Datenbanken/Datenbanken\|🗄️ Datenbanken]] | DQL, DML, Datenmodellierung, Performance | 106, 162, 164, 141, 110 |
| [[Linux\|🐧 Linux & Betriebssysteme]] | OS, Shell, Arbeitsplatz-Administration | 187 |
| [[Netzwerk\|🌐 Netzwerk & Infrastruktur]] | LAN, Protokolle, Dienste-Integration | 117, 129, 145, 300 |
| [[Scripting\|⚙️ Scripting & Automatisierung]] | PowerShell, Automatisierung | 122 |
| [[Webentwicklung\|💻 Software-Entwicklung]] | App-Design, OOP, Mobile/Web | 319, 223, 335 |
| [[Server & Dienste\|🖥️ Server & Dienste]] | Serverdienste, AD, Backup, Monitoring | 123, 143, 158, 188, 159, 157 |
| [[Cloud & Virtualisierung\|☁️ Cloud & Virtualisierung]] | Virtualisierung, Container, Public Cloud | 109, 169, 190, 210, 346 |
| [[Security\|🔐 Security & Datenschutz]] | Datenschutz, Verschlüsselung, Netz-/Systemsicherheit | 231, 114, 184, 185, 182 |
| [[Projektmanagement\|📋 Projekt- & Prozessmanagement]] | IPERKA, Projekte, Geschäftsprozesse | 431, 254, 306, 241, 245 |
| [[Emerging Tech\|🚀 Emerging Tech]] | IoT, Blockchain, Machine Learning | 216, 107, 248, 259, 217 |

---

## Alle Area-Notizen

```dataview
TABLE file.folder AS Bereich, status, created AS Erstellt
FROM "400 Areas"
WHERE file.name != "Areas Übersicht"
SORT file.folder ASC, created DESC
```

---

> Zurück zum [[index|🏠 Vault Index]]
