---
title: "Dashboard"
tags: [übersicht]
created: 2026-06-02
status: permanent
publish: false
todo: false
---

# 🧭 Dashboard

---

## 📋 Offene Tasks
_Alle unerledigten Aufgaben aus allen Projekten, gruppiert nach Projekt._

```dataview
TASK FROM "100 Schule" OR "200 Arbeit" OR "300 Privat"
WHERE !completed
GROUP BY file.link
```

---

## ⚠️ Notizen mit offenen Fragen
_Notizen die noch geklärt oder ergänzt werden müssen._

```dataview
TABLE file.folder AS Bereich, status, created
FROM ""
WHERE todo = true AND file.name != "Dashboard"
SORT created DESC
```

---

## 🗂️ Aktive Projekte
_Alle laufenden Projekte, sortiert nach Abgabedatum._

```dataview
TABLE due AS Abgabe, status, file.folder AS Bereich
FROM ""
WHERE status = "active" AND contains(tags, "projekt")
SORT due ASC
```

---

## ✏️ Drafts älter als 14 Tage
_Notizen die schon länger offen sind und abgeschlossen werden sollten._

```dataview
TABLE file.folder AS Bereich, created AS Erstellt
FROM ""
WHERE status = "draft" AND date(today) - date(created) > dur(14 days)
AND file.name != "Dashboard"
SORT created ASC
```

---

## 🕐 Zuletzt erstellt
_Die 10 zuletzt erstellten Notizen._

```dataview
TABLE file.folder AS Bereich, status
FROM ""
WHERE file.name != "Dashboard" AND file.name != "index" AND file.name != "log"
SORT created DESC
LIMIT 10
```
