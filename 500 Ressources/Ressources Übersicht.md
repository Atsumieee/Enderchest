---
title: "Ressources Übersicht"
tags: [übersicht, ressources]
created: 2026-06-11
status: permanent
publish: false
todo: false
---

# 📦 Ressources — Übersicht

Sammlung von Hilfsmitteln: Design-Vorlagen, Bilder, Tools, Tutorials und interaktive Widgets.

---

## Kategorien

| Kategorie | Inhalt |
|-----------|--------|
| 🎨 Design | Vorlagen, Layouts, Design-Assets |
| 🖼️ Pictures | Diagramme, Screenshots, Grafiken |
| 📁 Projects | Projekt-Ressourcen und Pläne |
| 🧰 Tools | Werkzeuge und Hilfsprogramme |
| 📺 Tutorials | Anleitungen und Lernmaterial |
| 🧩 Widgets | Interaktive HTML-Widgets & Visualisierungen |

---

## 🧩 Interaktive Widgets

_HTML-Widgets im Ordner `500 Ressources/Widgets` — direkt im Browser öffnen._

| Widget | Thema |
|--------|-------|
| `dql_sql_universum.html` | SQL DQL Visualisierung |
| `join_query_builder.html` | JOIN Query Builder |
| `join_venn_visualizer.html` | JOIN Venn-Diagramme |
| `select_baukasten.html` | SELECT Baukasten |
| `where_aggregat_spielwiese.html` | WHERE & Aggregate |
| `hashing_pipeline_stepper.html` | Hashing-Pipeline |
| `llm_von_trennlinie_zu_llm.html` | Von Trennlinie zu LLM |
| `forward_pass_deep_dive_fixed.html` | Forward Pass Deep Dive |
| `text_zu_antwort_pipeline.html` | Text-zu-Antwort Pipeline |

---

## Alle Markdown-Ressourcen

```dataview
TABLE file.folder AS Kategorie, created AS Erstellt
FROM "500 Ressources"
WHERE file.name != "Ressources Übersicht"
SORT file.folder ASC, created DESC
```

---

> Zurück zum [[index|🏠 Vault Index]]
