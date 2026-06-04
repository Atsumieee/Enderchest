# CLAUDE.md — Enderchest Wiki Schema

Dieses Dokument ist die verbindliche Arbeitsanleitung für den Claude-Agenten.
Es definiert wie Notizen geschrieben, strukturiert, verlinkt und verwaltet werden.
Bei Unklarheiten gilt: dieses Dokument hat Vorrang vor allem anderen.

---

## 1. Vault-Übersicht

```
Enderchest/
├── CLAUDE.md                  ← dieses Dokument
├── Dashboard.md               ← Master-Übersicht: Tasks, Drafts, Todo-Notizen
├── index.md                   ← Öffentliche Homepage (publish: false)
├── _index.md                  ← Interner Master-Index (vom Agenten gepflegt, publish: false)
├── log.md                     ← Chronologisches Log aller Operationen
│
├── 000 Inbox/                 ← Rohmaterial, noch nicht verarbeitet
├── 100 Schule/                ← Schulnotizen (Berufsmatura + Module)
│   ├── _Übersichten/          ← MOC-Seiten pro Fachbereich
│   └── M[xxx] - [Name]/       ← Ein Ordner pro Modul
│       ├── [Modul] Übersicht.md
│       ├── [Themennotizen].md
│       └── Projekte/          ← Nur wenn das Modul ein Projekt enthält
│           └── [Projektname]/
│               ├── Übersicht.md
│               ├── Kanban.md
│               └── [Projektnotizen].md
├── 200 Arbeit/                ← Arbeitsnotizen (publish: false)
│   └── Projekt - [Name]/
│       ├── Übersicht.md
│       ├── Kanban.md
│       └── [Dokumentation].md
├── 300 Privat/                ← Persönliche Notizen (publish: false)
│   └── Projekt - [Name]/
│       ├── Übersicht.md
│       ├── Kanban.md
│       └── [Notizen].md
├── 400 Areas/                 ← Laufende Themenbereiche
├── 500 Ressources/            ← Quellmaterial, Referenzen
├── Archive/                   ← Abgeschlossenes, nicht mehr aktiv
├── files/                     ← Bilder und andere Anhänge
└── Templates/                 ← Notiz-Vorlagen (nicht bearbeiten)
```

---

## 2. Frontmatter-Regeln

Jede Notiz hat **genau diese Felder** — nicht mehr, nicht weniger:

```yaml
---
title: "Titel der Notiz"
tags: [tag1, tag2]
created: YYYY-MM-DD
status: draft | permanent | archived
publish: false | false
todo: true | false
---
```

### Felddefinitionen

**title** — Vollständiger, lesbarer Titel. Nicht der Dateiname.

**tags** — 1 bis 4 Tags total. Nur Tags die Navigation oder Filterung tatsächlich nützen.
Erlaubte Tags-Kategorien:

- **Fachbereich** (1–3 Tags): Das Themengebiet der Notiz. Mehrere Tags nur wenn der Inhalt wirklich mehrere Bereiche abdeckt — z.B. DDNS gehört zu `netzwerk` und `security`.
  Beispiele: `sql`, `powershell`, `netzwerk`, `security`, `python`, `linux`, `mathematik`, `englisch`, `französisch`, `physik`

- **Kontext/Modul** (1 Tag): Woher kommt der Inhalt? Modulnotizen bekommen ihre Modulnummer, alles andere bekommt den Bereich.
  Modulnotizen: `m106`, `m122`, `m164` etc.
  Nicht-Modul-Schulfächer: `schule`
  Sonstiges: `arbeit`, `privat`

- **Typ** (optional, 1 Tag): Nur setzen wenn der Typ für die Navigation relevant ist.
  `übersicht`, `aufgabe`, `projekt`, `referenz`

Kein Tag-Spam. Wenn ein Tag nicht als Dataview-Filter sinnvoll ist, gehört er nicht rein.

**created** — Erstellungsdatum im Format YYYY-MM-DD. Wird nie nachträglich geändert.

**status** — Aktueller Zustand der Notiz:
- `draft` — in Bearbeitung, unvollständig
- `permanent` — fertig, gepflegt, verlässlich
- `archived` — nicht mehr aktuell, aber historisch wertvoll

**publish** — Sichtbarkeit für die öffentliche Website:
- `true` — wird auf der öffentlichen Website publiziert
- `false` — bleibt privat, nur im eigenen Vault sichtbar

**todo** — Zeigt an ob diese Notiz noch offene Fragen oder unvollständige Abschnitte hat:
- `true` — es gibt noch etwas zu klären oder zu ergänzen
- `false` — Notiz ist inhaltlich vollständig (für den aktuellen Stand)

Statt einer "Offene Fragen"-Sektion in der Notiz selbst wird dieses Flag gesetzt. Der Dataview-Dashboard zeigt alle Notizen mit `todo: true` gebündelt an — offene Punkte gehen nicht vergessen.

---

## 3. Publish-Regeln (KRITISCH)

Dies ist die wichtigste Einschränkung beim Schreiben von Notizen.

**Regel:** Eine Notiz mit `publish: false` darf **niemals** auf eine Notiz mit `publish: false` verlinken.

Warum: Die publizierte Website ist ein eigenständiger, in sich geschlossener Graph. Kaputte Links zu nicht-publizierten Seiten führen zu Fehlerseiten.

**Beim Schreiben einer publish: false Notiz:**
1. Jeden `[[Link]]` prüfen — existiert die Zielnotiz?
2. Hat die Zielnotiz `publish: false`?
3. Wenn nein → entweder Link entfernen, oder Zielnotiz ebenfalls auf `publish: false` setzen (nur wenn inhaltlich sinnvoll)
4. Im Zweifel: Link weglassen, statt eine kaputte Referenz zu erstellen

**Faustregel für publish: false:**
- `100 Schule/` Lernnotizen → meistens `publish: false`
- `200 Arbeit/` → immer `publish: false`
- `300 Privat/` → immer `publish: false`
- Aufgabenblätter, Lösungen, Projektdokumente → `publish: false`
- Konzeptseiten, Erklärungen, Übersichten → `publish: false`

---

## 4. Schreibstil

### Zielgruppe
Klassenkameraden, die das Thema lernen wollen — keine Experten.
Schreib so, als würdest du jemandem in der Pause erklären, was ihr heute gelernt habt.

### Kernregeln

**Erkläre zuerst, dann zeige das Detail.**
Jedes Konzept bekommt zuerst einen Satz in einfachem Deutsch, bevor technische Details folgen.

Schlecht:
> `SELECT` gibt Spalten aus einer Tabelle zurück.

Gut:
> Mit `SELECT` sagst du der Datenbank: "Zeig mir diese Spalten." Es ist der Grundbefehl für jede Abfrage.

**Merkhilfen einbauen.**
Wenn es eine einfache Eselsbrücke gibt, schreib sie rein. Markiert mit:
> **Merkhilfe:** ...

**Konkrete Beispiele vor abstrakten Regeln.**
Zeig zuerst ein Beispiel, erkläre dann warum es so funktioniert.

**Warum erklären, nicht nur Was.**
Nicht nur was ein Befehl tut, sondern warum man ihn braucht und wann man ihn einsetzt.

**Sprache:** Deutsch. Fachbegriffe auf Englisch wenn sie im Original englisch sind (z.B. `SELECT`, `Pipeline`, `Commit`). Keine Mischsprache in Erklärungen.

**Länge:** So lang wie nötig, so kurz wie möglich. Lieber einen Abschnitt mehr als einen unverständlichen Satz weniger. Kein künstliches Kürzen.

---

## 5. Notizstruktur — Standard-Template

Jede Lernnotiz folgt dieser Struktur. Abschnitte die nicht relevant sind, können weggelassen werden — aber die Reihenfolge bleibt.

```markdown
---
title: "..."
tags: [...]
created: YYYY-MM-DD
status: draft
publish: false
todo: false
---

# [Titel]

## Überblick
_2–4 Sätze: Was ist das? Warum existiert es? Wann braucht man es?_
_Kein Vorwissen voraussetzen._

---

## Inhalt

### 1. [Erster Hauptpunkt]
...

### 2. [Zweiter Hauptpunkt]
...

---

## Schlüsselbegriffe

- **Begriff**: Einfache Definition in einem Satz.

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[Notiz]] | Warum hängt das zusammen? |

---

## Quellen & Links
- [Beschreibung](URL)
```

---

## 5b. Projektstruktur

Projekte sind eigenständige Einheiten mit Tasks, Dokumentation und verlinkten Wissensnotizen.
Ein Projekt besteht immer aus mindestens zwei Dateien: `Übersicht.md` und `Kanban.md`.

### Projekt-Übersicht Frontmatter

```yaml
---
title: "Projektname"
tags: [projekt, kontext-tag]
created: YYYY-MM-DD
status: active | completed | on-hold | archived
publish: false
due: YYYY-MM-DD
---
```

**due** — Abgabe- oder Zieldatum. Optional, aber empfohlen für Schulprojekte.
**status** für Projekte: `active` (läuft), `completed` (fertig), `on-hold` (pausiert), `archived` (abgeschlossen und archiviert)

### Projekt-Übersicht Struktur

```markdown
# [Projektname]

## Ziel
_Was soll am Ende erreicht sein? Ein Satz._

## Kontext
_Warum existiert dieses Projekt? Modul, Auftrag, persönliche Motivation._

## Wissensnotizen
_Notizen die durch dieses Projekt entstanden sind oder relevant sind._
- [[Notizname]] — warum relevant

## Entscheide & Notizen
_Wichtige Entscheide, Erkenntnisse, Probleme und wie sie gelöst wurden._

## Quellen & Links
- [Beschreibung](URL)
```

### Kanban-Board Struktur

Das Kanban-Board (`Kanban.md`) wird mit dem **Obsidian Kanban Plugin** verwaltet.
Spalten-Schema für alle Projekte:

```
Backlog | In Progress | Review / Warten | Erledigt
```

- **Backlog** — alles was noch nicht angefangen wurde
- **In Progress** — aktiv in Bearbeitung (max. 3 Karten gleichzeitig — Focus)
- **Review / Warten** — fertig aber wartet auf Feedback, Abgabe, oder externe Aktion
- **Erledigt** — abgeschlossen

Jede Karte kann einen internen Link enthalten: `[[Notizname]]` wenn die Task eine Notiz produziert hat.

### Schulaufgaben (kein eigenes Projekt)

Kleine Aufgaben die kein vollständiges Projekt rechtfertigen (einzelne Übungsblätter, kurze Hausaufgaben) bekommen **keinen eigenen Projektordner**. Stattdessen: eine Checkliste in der Modul-Übersicht.

```markdown
## Aufgaben
- [ ] Aufgabe 1 — DQL Grundlagen
- [x] Aufgabe 2 — WHERE-Klausel Übungen
```

Faustregel: Mehr als 3 zusammenhängende Tasks oder Abgabe mit Dokumentation → eigener Projektordner. Weniger → Checkliste in der Übersicht.


---

## 6. Namenskonventionen

### Dateinamen
- Lesbar, keine Sonderzeichen ausser `-` und `–`
- Modulnotizen: `SQL - DQL.md`, `SQL - DML.md`, `PowerShell - Variablen.md`
- Übersichten: `M106 Übersicht.md`
- MOC-Seiten: `_Übersicht Datenbanken.md` (Unterstrich = navigationsseite)
- Keine Nummern-Präfixe in Notizen (nur in Ordnernamen)

### Ordner
Bestehende Struktur beibehalten. Neue Ordner in `100 Schule/` folgen diesen Schemata:

Modulbasierte Fächer: `M[xxx] - [Modulname]/`
Beispiel: `M106 - Datenbanken/`, `M122 - PowerShell/`

Nicht-Modul-Schulfächer (Sprachen, Naturwissenschaften, Berufsmatura-Fächer):
`[Fachname]/`
Beispiel: `Englisch/`, `Mathematik/`, `Französisch/`, `Physik/`, `Berufsmatura/`

Innerhalb dieser Ordner gelten dieselben Dateinamen-Regeln wie bei Modulnotizen.

---

## 7. Verlinkung

**Interne Links:** `[[Dateiname]]` ohne Pfad — Obsidian findet sie automatisch.
Wenn der Anzeigetext angepasst werden soll: `[[Dateiname|Anzeigetext]]`

**Verbindungen aktiv pflegen:** Jede neue Notiz bekommt mindestens einen eingehenden Link von einer bestehenden Notiz oder MOC-Seite. Keine Waisen-Notizen.

**Backlinks nutzen:** Die "Verbindungen"-Tabelle am Ende jeder Notiz soll erklären *warum* zwei Themen verbunden sind — nicht nur dass sie es sind.

---

## 8. Navigation — MOC-Seiten und Dataview

### MOC-Seiten (Maps of Content)
Jeder Modulordner hat eine `[Modul] Übersicht.md` — die Einstiegsseite für dieses Modul.
Jeder Fachbereich hat eine `_Übersicht [Thema].md` in `100 Schule/_Übersichten/`.

MOC-Seiten listen alle Notizen im Bereich auf, gruppiert nach Thema.
Sie werden vom Agenten bei jeder neuen Notiz aktualisiert.

### Dataview-Queries
MOC-Seiten können dynamische Tabellen enthalten. Beispiele:

```dataview
TABLE status, created FROM "100 Schule/M106 - Datenbanken"
SORT created ASC
```

```dataview
TABLE status FROM "100 Schule"
WHERE contains(tags, "sql")
SORT file.name ASC
```

Dataview-Queries werden in MOC-Seiten eingebaut — nicht in regulären Notizen.
---

## 8b. Dashboard.md

`Dashboard.md` liegt im Vault-Root und ist die tägliche Startseite.
Sie wird vom Agenten nicht automatisch verändert — sie enthält nur statische Dataview-Queries die sich selbst aktualisieren.

### Inhalt des Dashboards

```markdown
# Dashboard

## Offene Tasks
_Alle unerledigten Aufgaben aus allen Projekten, gruppiert nach Projekt._

```dataview
TASK FROM "100 Schule" OR "200 Arbeit" OR "300 Privat"
WHERE !completed
GROUP BY file.link
```

---

## Notizen mit offenen Fragen (todo: true)
```dataview
TABLE file.folder AS Bereich, status, created
FROM ""
WHERE todo = true
SORT created DESC
```

---

## Drafts älter als 14 Tage
```dataview
TABLE file.folder AS Bereich, created
FROM ""
WHERE status = "draft" AND date(today) - date(created) > dur(14 days)
SORT created ASC
```

---

## Aktive Projekte
```dataview
TABLE due, status, file.folder AS Bereich
FROM ""
WHERE status = "active" AND contains(tags, "projekt")
SORT due ASC
```

---

## Zuletzt erstellt
```dataview
TABLE file.folder AS Bereich, status
FROM ""
WHERE file.name != "Dashboard" AND file.name != "index" AND file.name != "log"
SORT created DESC
LIMIT 10
```
```


---

## 9. Agent-Workflows

### Workflow A — Neue Notiz erstellen

Auslöser: "Erstelle eine Notiz über [Thema]" oder "Erkläre mir [Thema] und speichere es"

1. Prüfe ob eine Notiz zu diesem Thema bereits existiert → falls ja, aktualisieren statt neu erstellen
2. Bestimme den richtigen Ordner anhand des Themas
3. Schreibe die Notiz nach Template (Abschnitt 5) und Schreibstil (Abschnitt 4)
4. Setze `publish` korrekt gemäss Abschnitt 3
5. Aktualisiere die zugehörige MOC-Seite / Übersicht
6. Füge einen eingehenden Link von einer verwandten Notiz hinzu
7. Aktualisiere `_index.md`
8. Schreibe einen Eintrag in `log.md`

### Workflow B — Frage beantworten

Auslöser: Inhaltliche Frage zu einem Thema

1. Lese `_index.md` um relevante Notizen zu finden
2. Lese die relevanten Notizen
3. Beantworte die Frage — **mit Bezug auf die eigenen Notizen** wenn vorhanden
4. Falls das Thema nicht im Wiki ist: Web-Recherche → Antwort geben → neue Notiz erstellen (Workflow A)
5. Falls die vorhandene Notiz unvollständig ist: Lücke benennen und anbieten, sie zu füllen

### Workflow C — Quelle verarbeiten (Ingest)

Auslöser: "Verarbeite diese URL / diesen Text / dieses Dokument"

1. Lese die Quelle vollständig
2. Bespreche kurz die wichtigsten Erkenntnisse
3. Erstelle eine Notiz nach Workflow A
4. Verlinke mit bestehenden Notizen zum Thema
5. Aktualisiere `_index.md`
6. Notiere in `log.md`

### Workflow E — Neues Projekt erstellen

Auslöser: "Erstelle ein Projekt für [Name]" oder wenn eine Aufgabe klar mehr als 3 Tasks und eine Dokumentation erfordert

1. Bestimme Projekttyp: Schulprojekt (in Modul-Ordner unter `Projekte/`), Arbeit (`200 Arbeit/`), Privat (`300 Privat/`)
2. Erstelle den Projektordner
3. Erstelle `Übersicht.md` nach Projekt-Template (Abschnitt 5b)
4. Erstelle `Kanban.md` mit den vier Standardspalten (Backlog / In Progress / Review / Erledigt)
5. Frage nach bekannten Tasks um das Backlog initial zu befüllen
6. Verlinke das Projekt in der zugehörigen Modul-Übersicht oder MOC-Seite
7. Aktualisiere `_index.md` und `log.md`


### Workflow D — Wiki-Pflege (Lint)

Auslöser: "Pflege das Wiki" oder "Lint"

Prüfe auf:
- Notizen ohne eingehende Links (Waisen)
- `publish: false` Notizen die auf `publish: false` Notizen zeigen
- MOC-Seiten die neue Notizen noch nicht listen
- Notizen mit `status: draft` die älter als 30 Tage sind
- Fehlende Schlüsselbegriffe-Abschnitte

Bericht erstellen, Fixes vorschlagen, auf Bestätigung warten.

---

## 10. index.md und log.md

### _index.md
- Interner Master-Index, nur für den Agenten und dich
- Organisiert nach Ordner/Fachbereich
- Format pro Eintrag: `| [[Dateiname]] | Kurzbeschreibung |`
- Wird bei jedem Workflow A/C aktualisiert
- `publish: false` — wird nie publiziert

### index.md
- Öffentliche Homepage der Website
- Wird vom Agenten **nicht** automatisch bearbeitet
- Nur manuell oder auf explizite Anfrage anpassen
- `publish: false`

### log.md
- Append-only — niemals bestehende Einträge bearbeiten
- Format: `## [YYYY-MM-DD] [typ] | [Beschreibung]`
- Typen: `ingest`, `new-note`, `update`, `lint`, `query`
- Beispiel: `## [2026-05-29] new-note | SQL – Indizes erstellt, M106 Übersicht aktualisiert`

---

## 11. Was der Agent NICHT tut

- Keine Notizen löschen ohne explizite Bestätigung
- Keine bestehenden Notizen überschreiben ohne zu fragen
- Keine `publish: false` Notizen öffentlich machen
- Keine Tags hinzufügen die nicht in Abschnitt 2 definiert sind
- Keine Frontmatter-Felder hinzufügen die nicht im Schema stehen
- Nie in `Templates/` schreiben
- Nie `log.md` rückwirkend bearbeiten
