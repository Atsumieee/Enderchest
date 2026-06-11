# CLAUDE.md — Enderchest Wiki Schema

Dieses Dokument ist die verbindliche Arbeitsanleitung für den Claude-Agenten. Es definiert wie Notizen geschrieben, strukturiert, verlinkt und verwaltet werden. Bei Unklarheiten gilt: dieses Dokument hat Vorrang vor allem anderen.

Für den Lint-Workflow: Lies zuerst `LINT.md` vollständig bevor du beginnst.

---

## 1. Vault-Übersicht

```
Enderchest/
├── CLAUDE.md                  ← dieses Dokument
├── LINT.md                    ← Detaillierte Lint-Regeln (nur bei Workflow D lesen)
├── Dashboard.md               ← Master-Übersicht: Tasks, Drafts, Todo-Notizen
├── index.md                   ← Öffentliche Homepage (publish: true)
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

### Hierarchie: Areas über Modulen

Module (`100 Schule/M…`) repräsentieren jeweils gewisse **Areas** (`400 Areas/`).
In der Hierarchie steht die **Area über dem Modul**:

- Die Inhalte eines Moduls sind **in der zugehörigen Area enthalten** (das Modul speist die Area).
- **Nicht umgekehrt:** Eine Area ist breiter als ein einzelnes Modul und enthält modulübergreifendes, dauerhaftes Wissen.
- Inhaltliche **Überschneidungen** zwischen Modul und Area sind normal und gewollt — z.B. `M106 - Datenbanken` ↔ `Areas/Datenbanken`.
- Faustregel: Modulnotizen dokumentieren den Lernstand eines Moduls; Area-Notizen destillieren daraus das langlebige Wissen.

---

## 2. Frontmatter-Regeln

Jede Notiz hat **genau diese Felder** — nicht mehr, nicht weniger:

```yaml
---
title: "Titel der Notiz"
description: "1–2 Sätze für Website-Card und SEO"
tags: [tag1, tag2]
created: YYYY-MM-DD
status: draft | permanent | archived
publish: true | false
todo: true | false
---
```

### Felddefinitionen

**title** — Vollständiger, lesbarer Titel. Nicht der Dateiname.

**description** — 1–2 Sätze die den Inhalt zusammenfassen. Wird als Card-Text auf der Website und für SEO verwendet. Pflichtfeld bei `publish: true`. Bei `publish: false` kann es weggelassen werden.

**tags** — 1 bis 4 Tags total. Nur Tags die Navigation oder Filterung tatsächlich nützen. Tag-Kategorien (die Liste ist **erweiterbar**, siehe Hinweis unten):

- **Fachbereich** (1–3 Tags): Das Themengebiet der Notiz. Mehrere Tags nur wenn der Inhalt wirklich mehrere Bereiche abdeckt — z.B. DDNS gehört zu `netzwerk` und `security`. Bekannt: `sql`, `powershell`, `netzwerk`, `security`, `python`, `linux`, `windows`, `server`, `cloud`, `virtualisierung`, `iot`, `ml`, `mathematik`, `englisch`, `französisch`, `physik`
    
- **Bereich/Kontext** (1 Tag): Woher kommt der Inhalt? Modulnotizen: `m106`, `m122`, `m164`, `m231`, `m431` etc. Nicht-Modul-Schulfächer: `schule`. Top-Level-Bereiche: `arbeit`, `privat`, `areas`, `ressources`
    
- **Typ** (optional, 1 Tag): Nur setzen wenn der Typ für die Navigation relevant ist. `übersicht`, `aufgabe`, `projekt`, `referenz`, `konzept`, `anleitung`, `patchday`
    

**Die Tag-Liste ist nicht abschliessend.** Wenn ein sinnvoller neuer Tag fehlt, **schlage ihn vor und frage nach**, bevor du ihn verwendest — nach Bestätigung wird er hier ergänzt. Trotzdem gilt: kein Tag-Spam, keine Tags die nicht als Navigations- oder Dataview-Filter taugen.

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

---

## 3. Publish-Regeln (KRITISCH)

Die Website rendert Links zu nicht-publizierten Seiten ausgegraut. Das Verhalten ist je nach Kontext akzeptabel oder ein Fehler:

**Akzeptabel — Verbindungen-Tabelle / Weiterführendes:** Ausgegraute Links am Ende einer Notiz (Abschnitte "Verbindungen zu anderen Themen" und "Weiterführendes") sind okay. Sie signalisieren bewusst: "Hier gibt es noch mehr, das noch nicht veröffentlicht ist." Der Leser versteht das.

**Nicht akzeptabel — aktiver Erklärungstext:** Ein Link der im laufenden Fliesstext oder in Beispielen vorkommt und ausgegraut ist, unterbricht den Lesefluss und macht die Erklärung kaputt. Das ist ein Fehler.

**Regel beim Schreiben einer `publish: true` Notiz:**

1. Jeden `[[Link]]` im Fliesstext und in Beispielen prüfen — hat die Zielnotiz `publish: true`?
2. Wenn nicht → Link aus dem Fliesstext entfernen, oder Zielnotiz ebenfalls auf `publish: true` setzen
3. Links in der Verbindungen-Tabelle und im Weiterführendes-Abschnitt dürfen auf `publish: false` Notizen zeigen — das ist explizit erlaubt

**Faustregel für publish:**

- `100 Schule/` Lernnotizen (Konzepte, Erklärungen, Übersichten) → `publish: true`
- `200 Arbeit/` → immer `publish: false`
- `300 Privat/` → immer `publish: false`
- Aufgabenblätter, Lösungen, Projektdokumente → `publish: false`
- Modulübersichten, MOC-Seiten, Bereichs-Übersichten → `publish: false` (interne Navigationsseiten — die öffentliche Website hat ihre eigene Navigation)
- `index.md` (öffentliche Homepage) → `publish: true` — einzige Ausnahme unter den Übersichtsseiten

---

## 4. Schreibstil

### Zielgruppe

Klassenkameraden, die das Thema lernen wollen — keine Experten. Schreib so, als würdest du jemandem in der Pause erklären, was ihr heute gelernt habt.

### Kernregeln

**Erkläre zuerst, dann zeige das Detail.** Jedes Konzept bekommt zuerst einen Satz in einfachem Deutsch, bevor technische Details folgen.

Schlecht:

> `SELECT` gibt Spalten aus einer Tabelle zurück.

Gut:

> Mit `SELECT` sagst du der Datenbank: "Zeig mir diese Spalten." Es ist der Grundbefehl für jede Abfrage.

**Merkhilfen einbauen.** Wenn es eine einfache Eselsbrücke gibt, schreib sie rein. Format:

> **Merkhilfe:** ...

**Konkrete Beispiele vor abstrakten Regeln.** Zeig zuerst ein Beispiel, erkläre dann warum es so funktioniert.

**Warum erklären, nicht nur Was.** Nicht nur was ein Befehl tut, sondern warum man ihn braucht und wann man ihn einsetzt.

**Sprache:** Deutsch. Fachbegriffe auf Englisch wenn sie im Original englisch sind (z.B. `SELECT`, `Pipeline`, `Commit`). Keine Mischsprache in Erklärungen.

**Länge:** So lang wie nötig, so kurz wie möglich. Kein künstliches Kürzen.

### Dataview-Warnung

Dataview-Queries (`TABLE`, `LIST`, `TASK`) funktionieren nur in Obsidian — nicht auf der statischen Website. Dataview nur in MOC-Seiten und Dashboard verwenden, nie in regulären Notizen die `publish: true` haben.

---

## 5. Notizstruktur — Standard-Template

Jede Lernnotiz folgt dieser Struktur. Abschnitte die nicht relevant sind können weggelassen werden — aber die Reihenfolge bleibt.

```markdown
---
title: "..."
description: "..."
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

Projekte sind eigenständige Einheiten mit Tasks, Dokumentation und verlinkten Wissensnotizen. Ein Projekt besteht immer aus mindestens zwei Dateien: `Übersicht.md` und `Kanban.md`.

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

**due** — Abgabe- oder Zieldatum. Optional, aber empfohlen für Schulprojekte. **status** für Projekte: `active`, `completed`, `on-hold`, `archived`

### Projekt-Übersicht Struktur

```markdown
# [Projektname]

## Ziel
_Was soll am Ende erreicht sein? Ein Satz._

## Kontext
_Warum existiert dieses Projekt? Modul, Auftrag, persönliche Motivation._

## Wissensnotizen
- [[Notizname]] — warum relevant

## Entscheide & Notizen
_Wichtige Entscheide, Erkenntnisse, Probleme und Lösungen._

## Quellen & Links
- [Beschreibung](URL)
```

### Kanban-Board Struktur

```
Backlog | In Progress | Review / Warten | Erledigt
```

- **In Progress** max. 3 Karten gleichzeitig — Focus
- Jede Karte kann `[[Notizname]]` enthalten wenn sie eine Notiz produziert hat

### Schulaufgaben (kein eigenes Projekt)

Faustregel: Mehr als 3 zusammenhängende Tasks oder Abgabe mit Dokumentation → eigener Projektordner. Weniger → Checkliste in der Modul-Übersicht.

---

## 6. Namenskonventionen

### Dateinamen

- Lesbar, keine Sonderzeichen ausser `-` und `–`
- Modulnotizen: `SQL - DQL.md`, `PowerShell - Variablen.md`
- Übersichten: `M106 Übersicht.md`
- MOC-Seiten: `_Übersicht Datenbanken.md` (Unterstrich = Navigationsseite)
- Keine Nummern-Präfixe in Notizen (nur in Ordnernamen)

### Ordner

Modulbasierte Fächer: `M[xxx] - [Modulname]/` Nicht-Modul-Schulfächer: `[Fachname]/` (z.B. `Mathematik/`, `Englisch/`)

---

## 7. Verlinkung

**Interne Links:** `[[Dateiname]]` ohne Pfad. Mit Anzeigetext: `[[Dateiname|Anzeigetext]]`

**Keine Waisen-Notizen:** Jede neue Notiz bekommt mindestens einen eingehenden Link von einer bestehenden Notiz oder MOC-Seite.

**Verbindungen erklären:** Die Verbindungen-Tabelle soll erklären _warum_ zwei Themen verbunden sind — nicht nur dass sie es sind.

**Link-Kontexte beachten:** Siehe Abschnitt 3 — Links im Fliesstext und Links in der Verbindungen-Tabelle haben unterschiedliche Regeln.

---

## 8. Navigation — MOC-Seiten und Dataview

### MOC-Seiten (Maps of Content)

Jeder Modulordner hat eine `[Modul] Übersicht.md`. Jeder Fachbereich hat eine `_Übersicht [Thema].md` in `100 Schule/_Übersichten/`.

MOC-Seiten listen alle Notizen im Bereich auf, gruppiert nach Thema. Sie werden vom Agenten bei jeder neuen Notiz aktualisiert.

### Dataview-Queries

Nur in MOC-Seiten und Dashboard — nie in regulären Notizen mit `publish: true`.

```dataview
TABLE status, created FROM "100 Schule/M106 - Datenbanken"
SORT created ASC
```

---

## 8b. Dashboard.md

Liegt im Vault-Root. Wird vom Agenten nicht automatisch verändert — enthält nur statische Dataview-Queries. `publish: false`.

---

## 9. Agent-Workflows

### Workflow A — Neue Notiz erstellen

Auslöser: "Erstelle eine Notiz über [Thema]"

1. Prüfe ob eine Notiz zum Thema bereits existiert → aktualisieren statt neu erstellen
2. Bestimme den richtigen Ordner
3. Schreibe die Notiz nach Template (Abschnitt 5) und Schreibstil (Abschnitt 4)
4. Setze `publish` korrekt gemäss Abschnitt 3
5. Prüfe alle Links im Fliesstext gemäss Link-Regel (Abschnitt 3)
6. Aktualisiere die zugehörige MOC-Seite
7. Füge einen eingehenden Link von einer verwandten Notiz hinzu
8. Aktualisiere `_index.md`
9. Schreibe einen Eintrag in `log.md`

### Workflow B — Frage beantworten

Auslöser: Inhaltliche Frage zu einem Thema

1. Lese `_index.md` um relevante Notizen zu finden
2. Lese die relevanten Notizen
3. Beantworte die Frage mit Bezug auf eigene Notizen wenn vorhanden
4. Falls Thema nicht im Wiki: Web-Recherche → Antwort → Notiz erstellen (Workflow A)
5. Falls Notiz unvollständig: Lücke benennen und anbieten sie zu füllen

### Workflow C — Quelle verarbeiten (Ingest)

Auslöser: "Verarbeite diese URL / diesen Text / dieses Dokument"

1. Lese die Quelle vollständig
2. Bespreche kurz die wichtigsten Erkenntnisse
3. Erstelle eine Notiz nach Workflow A
4. Aktualisiere `_index.md` und `log.md`

### Workflow D — Wiki-Pflege (Lint)

Auslöser: "Lint" oder "Pflege das Wiki"

**Lies zuerst `LINT.md` vollständig** — dort steht die detaillierte Prüfliste, die genauen Regeln und das Report-Format. Dieser Workflow-Eintrag ist nur der Auslöser, nicht die Anleitung.

### Workflow E — Neues Projekt erstellen

Auslöser: "Erstelle ein Projekt für [Name]"

1. Bestimme Projekttyp und Ordner
2. Erstelle `Übersicht.md` nach Projekt-Template (Abschnitt 5b)
3. Erstelle `Kanban.md` mit Standardspalten
4. Frage nach bekannten Tasks für das Backlog
5. Verlinke in der zugehörigen Modul-Übersicht oder MOC-Seite
6. Aktualisiere `_index.md` und `log.md`

---

## 10. index.md, _index.md und log.md

### _index.md

- Interner Master-Index, nur für Agent und Vault-Besitzer
- Format pro Eintrag: `| [[Dateiname]] | Kurzbeschreibung |`
- Wird bei Workflow A/C aktualisiert
- `publish: false`

### index.md

- Öffentliche Homepage der Website
- Wird vom Agenten **nicht** automatisch bearbeitet — **ausser auf ausdrückliche Anweisung** des Besitzers
- `publish: true`
- Keine Dataview-Queries (rendern auf der statischen Website nicht) — dynamische Listen gehören ins `Dashboard.md`

### log.md

- Append-only — bestehende Einträge nie bearbeiten
- Format: `## [YYYY-MM-DD] [typ] | [Beschreibung]`
- Typen: `ingest`, `new-note`, `update`, `lint`, `query`

---

## 11. Was der Agent NICHT tut

- Keine Notizen löschen ohne explizite Bestätigung
- Keine bestehenden Notizen überschreiben ohne zu fragen
- Keine `publish: false` Notizen auf `publish: true` setzen
- Keine neuen Tags ohne Rückfrage hinzufügen — die Tag-Liste in Abschnitt 2 ist erweiterbar, aber jede Erweiterung wird vorgeschlagen und bestätigt
- Keine Frontmatter-Felder hinzufügen die nicht im Schema stehen
- Nie in `Templates/` schreiben
- Nie `log.md` rückwirkend bearbeiten
- Nie Dataview-Queries in Notizen mit `publish: true` einfügen