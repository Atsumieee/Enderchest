---
title: "Privat Übersicht"
tags: [übersicht, privat]
created: 2026-06-11
status: permanent
publish: false
todo: false
---

# 🔒 Privat — Übersicht

Persönlicher Bereich: Journal-Einträge, eigenes Wissen und private Projekte.

---

## 📓 Journal

```dataview
TABLE created AS Datum, status
FROM "300 Privat/Journal"
SORT created DESC
LIMIT 10
```

---

## 🧠 Knowledge

```dataview
TABLE created AS Erstellt, status
FROM "300 Privat/Knowledge"
SORT created DESC
```

---

## 🛠️ Projekte

```dataview
TABLE created AS Erstellt, status
FROM "300 Privat/Projekte"
SORT created DESC
```

---

> Zurück zum [[index|🏠 Vault Index]]
