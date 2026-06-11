---
title: "Arbeits Übersicht"
tags: [übersicht, arbeit]
created: 2026-06-11
status: permanent
publish: false
todo: false
---

# 💼 Arbeits Übersicht

Zentrale Übersicht aller Arbeitsbereiche: Projekte, Patchdays, Meetings und Dokumentationen.

---

## 📦 Patchdays

→ **[[Regular Tasks/Patchday/Patchdays Übersicht|Patchdays Übersicht anzeigen]]**

```dataview
TABLE created AS Datum
FROM "200 Arbeit/Regular Tasks/Patchday"
WHERE file.name != "Patchdays Übersicht"
LIMIT 5
SORT created DESC
```

---

## 🎯 Projekte

```dataview
TABLE due AS Fällig, status
FROM "200 Arbeit/Projekte"
SORT due ASC
```

---

## 🤝 Meetings

```dataview
TABLE created AS Datum
FROM "200 Arbeit/Meetings"
LIMIT 5
SORT created DESC
```

---

## 📚 Dokumentationen

```dataview
TABLE created AS Erstellt
FROM "200 Arbeit/Dokumentation"
LIMIT 5
SORT created DESC
```

---

## 🔗 Schnellzugriff

- [[Regular Tasks/Patchday/Patchdays Übersicht|📦 Patchdays Übersicht]]
- [[WSUS Upgrade|🎯 Projekt: WSUS Upgrade]]

> Projekte, Meetings und Dokumentation findest du in den jeweiligen Listen oben (Ordner `Projekte/`, `Meetings/`, `Dokumentation/`).

---

> Zurück zum [[index|🏠 Vault Index]] · [[Dashboard|🧭 Dashboard]]
