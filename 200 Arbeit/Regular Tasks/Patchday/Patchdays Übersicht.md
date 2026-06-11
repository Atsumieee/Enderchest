---
title: "Patchdays Übersicht"
tags: [übersicht, patchday, arbeit]
created: 2026-06-11
status: permanent
publish: false
todo: false
---

# 📦 Patchdays Übersicht

Übersicht aller durchgeführten und geplanten Patchdays mit ihrem Status und Findings.

---

## 📋 Alle Patchday-Einträge

```dataview
TABLE 
  created AS Datum,
  split(file.name, " ")[1] AS Monat,
  file.link AS Link
FROM "200 Arbeit/Regular Tasks/Patchday"
WHERE file.name != "Patchdays Übersicht"
SORT created DESC
```

---

## 🔴 Kritische Patchdays

```dataview
TABLE file.link AS Patchday, created AS Datum
FROM "200 Arbeit/Regular Tasks/Patchday"
WHERE contains(file.path, "Patchday") AND file.name != "Patchdays Übersicht"
SORT created DESC
```

---

## 📊 Statistik

**Letzte Patchdays:** [Siehe oben in der Tabelle]

> Zurück zur [[Arbeits Übersicht|Arbeitsübersicht]]
