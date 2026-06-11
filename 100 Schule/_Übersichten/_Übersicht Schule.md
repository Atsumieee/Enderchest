---
title: "Übersicht Schule"
tags: [übersicht, schule]
created: 2026-06-02
status: permanent
publish: false
todo: false
---

# 🏫 Schule — Übersicht

Einstiegsseite für alle Schulinhalte. Wähle ein Modul oder Fach um direkt zu den Notizen zu gelangen.

> 📚 Vollständige Modul-Liste aller Lehrjahre: [[Modulkatalog]] · Wissensgebiete: [[Areas Übersicht]]

---

## Informatik-Module (Plattformentwicklung)

| Modul | Thema | Status |
|-------|-------|--------|
| [[M106 Übersicht\|M106 — Datenbanken]] | SQL, Datenbankbearbeitung, Sicherheit | `permanent` |
| [[M122 Übersicht\|M122 — PowerShell]] | Scripting, Automatisierung, Pipeline | `draft` |
| [[M164 Übersicht\|M164 — SQL Vertiefung]] | DQL, Stundenplan-Projekt | `draft` |
| [[M431 Übersicht\|M431 — Projektarbeit]] | IPERKA, Lernplattform-Projekt | `active` |
| [[M231 Übersicht\|M231 — Datenschutz]] | AAA, MFA, Hashing, Angriffsmethoden | `permanent` |

---

## Berufsmatura-Fächer

| Fach | Thema | Status |
|------|-------|--------|
| [[Mathematik Übersicht\|Mathematik]] | LLMs, Analysis, Statistik | `draft` |

---

## Alle Schulnotizen

```dataview
TABLE status, created AS Erstellt
FROM "100 Schule"
WHERE file.name != "_Übersicht Schule"
SORT file.folder ASC, created ASC
```

---

> Zurück zum [[index|🏠 Vault Index]]
