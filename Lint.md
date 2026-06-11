# LINT.md — Enderchest Wiki-Pflege

Dieses Dokument wird nur bei Workflow D (Lint) gelesen. Es definiert was geprüft wird, wie vorgegangen wird, und wie der Report aussieht.

---

## Vorgehen

1. Lies dieses Dokument vollständig
2. Scanne den Vault systematisch (Abschnitt 1 — Prüfliste)
3. Erstelle den Report im vorgeschriebenen Format (Abschnitt 2)
4. Zeige den Report und warte auf Bestätigung bevor du irgendetwas änderst
5. Nach Bestätigung: Auto-Fixes ausführen, manuelle Fixes vorschlagen

**Niemals etwas ändern ohne den Report zuerst zu zeigen.**

---

## 1. Prüfliste

### 1.1 Frontmatter-Vollständigkeit

Prüfe jede `.md` Datei (ausser Templates/, Dashboard.md, log.md, _index.md):

- Fehlt `title`?
- Fehlt `description` bei Notizen mit `publish: true`?
- Fehlt `tags`?
- Fehlt `created`?
- Fehlt `status`?
- Fehlt `publish`?
- Fehlt `todo`?
- Enthält das Frontmatter unerlaubte Felder (nicht im Schema in CLAUDE.md Abschnitt 2)?
- Enthält `tags` Tags die nicht im erlaubten Vokabular stehen?
- Hat `status` einen ungültigen Wert (nur `draft`, `permanent`, `archived` oder für Projekte `active`, `completed`, `on-hold`)?

### 1.2 Link-Integrität (nach Kontext)

Dies ist die wichtigste und differenzierteste Prüfung. Links haben je nach Kontext unterschiedliche Regeln — lies Abschnitt 3 von CLAUDE.md genau.

**Kritisch — muss gefixt werden:** Für jede Notiz mit `publish: true`:

- Scanne den Fliesstext (alles ausserhalb von "Verbindungen zu anderen Themen" und "Weiterführendes" und "Quellen & Links")
- Finde alle `[[Links]]` im Fliesstext
- Prüfe ob die Zielnotiz `publish: true` hat
- Wenn nicht → **kritischer Fehler**: Link im Erklärungstext zeigt auf unpublizierte Seite

**Akzeptabel — nur melden, nicht als Fehler markieren:**

- `[[Links]]` in der Verbindungen-Tabelle die auf `publish: false` zeigen → okay, melden als Info
- `[[Links]]` in "Weiterführendes" / "Quellen & Links" die auf `publish: false` zeigen → okay

**Strukturell — als Warnung melden:**

- `[[Links]]` die auf eine Datei zeigen die gar nicht existiert (weder published noch unpublished) → kaputte Referenz, muss bereinigt werden

### 1.3 Waisen-Notizen

Eine Waisen-Notiz hat keine eingehenden Links von anderen Notizen oder MOC-Seiten.

- Scanne alle `.md` Dateien
- Für jede Notiz: gibt es mindestens eine andere Datei die `[[Dateiname]]` enthält?
- Ausnahmen (diese dürfen Waisen sein): `index.md`, `_index.md`, `Dashboard.md`, `log.md`, `CLAUDE.md`, `LINT.md`, alle Dateien in `Templates/`

### 1.4 MOC-Seiten-Vollständigkeit

Für jede Modul-Übersicht (`[Modul] Übersicht.md`):

- Gibt es `.md` Dateien im Modulordner die nicht in der Übersicht verlinkt sind?
- Gibt es Links in der Übersicht die auf nicht existierende Dateien zeigen?

### 1.5 Stale Drafts

- Notizen mit `status: draft` deren `created`-Datum älter als 30 Tage ist
- Als Warnung melden — nicht automatisch ändern

### 1.6 Fehlende Pflicht-Abschnitte

Für Lernnotizen (nicht Projekte, nicht Übersichten, nicht System-Dateien):

- Fehlt `## Überblick`?
- Fehlt `## Schlüsselbegriffe`?
- Fehlt `## Verbindungen zu anderen Themen`?

### 1.7 Dataview in publizierten Notizen

Dataview rendert auf der statischen Website nicht.

- Suche nach ` ```dataview ` Blöcken in Notizen mit `publish: true`
- Als kritischen Fehler melden

### 1.8 Fehlende description bei publish: true

- Notizen mit `publish: true` aber ohne `description`-Feld
- Als Fehler melden (description ist Pflicht für Website-Cards)

---

## 2. Report-Format

Der Report wird immer in dieser Struktur ausgegeben:

```
# Lint-Report — [DATUM]

## Zusammenfassung
X kritische Fehler | Y Warnungen | Z Infos

---

## 🔴 Kritische Fehler (müssen gefixt werden)

### Fliesstext-Links zu unpublizierten Seiten
| Notiz | Link | Kontext (Satzausschnitt) |
|-------|------|--------------------------|
| [[SQL - DQL]] | [[SQL - DDL]] | "...wie in [[SQL - DDL]] beschrieben..." |

### Dataview in publizierten Notizen
| Notiz | Zeile |
|-------|-------|

### Fehlende description bei publish: true
| Notiz |
|-------|

### Kaputte Links (Zieldatei existiert nicht)
| Notiz | Link |
|-------|------|

---

## 🟡 Warnungen

### Stale Drafts (älter als 30 Tage)
| Notiz | Erstellt | Alter |
|-------|----------|-------|

### Fehlende Pflicht-Abschnitte
| Notiz | Fehlende Abschnitte |
|-------|---------------------|

### Frontmatter-Probleme
| Notiz | Problem |
|-------|---------|

### Waisen-Notizen (keine eingehenden Links)
| Notiz | Ordner |
|-------|--------|

### MOC-Lücken (Notizen die nicht in Übersicht verlinkt sind)
| Übersicht | Fehlende Notiz |
|-----------|----------------|

---

## 🔵 Info

### Links in Verbindungen-Tabelle → unpubliziert (akzeptabel)
| Notiz | Link |
|-------|------|

---

## Auto-Fix möglich
Folgende Probleme kann ich selbst beheben wenn du es bestätigst:
- [Liste der auto-fixbaren Probleme]

## Manuell zu prüfen
Folgende Probleme brauchen deine Entscheidung:
- [Liste der Probleme die eine inhaltliche Entscheidung erfordern]
```

---

## 3. Auto-Fix Regeln

Diese Fixes führe ich **nur nach expliziter Bestätigung** durch:

**Darf ich automatisch fixen:**

- Fehlende `todo: false` hinzufügen wenn kein Grund für `true` erkennbar
- Fehlende `publish: false` hinzufügen bei Notizen in `200 Arbeit/` und `300 Privat/`
- Kaputte Links (Zieldatei existiert nicht) aus der Verbindungen-Tabelle entfernen
- MOC-Seiten aktualisieren um fehlende Notizen hinzuzufügen

**Darf ich nie automatisch fixen — braucht deine Entscheidung:**

- `publish: false` → `publish: true` setzen (du entscheidest was publiziert wird)
- Links aus dem Fliesstext entfernen (du entscheidest ob der Link bleibt und die Zielnotiz publiziert wird, oder ob der Link entfernt wird)
- `status` von `draft` auf `permanent` setzen
- `description` schreiben (inhaltliche Entscheidung)
- Fehlende Pflicht-Abschnitte ergänzen (inhaltliche Entscheidung)

---

## 4. Log-Eintrag nach dem Lint

Nach abgeschlossenem Lint immer einen Eintrag in `log.md`:

```
## [YYYY-MM-DD] lint | X kritische Fehler, Y Warnungen — [kurze Beschreibung der wichtigsten Findings]
```

Beispiel:

```
## [2026-06-10] lint | 2 kritische Fehler (Fliesstext-Links), 4 Warnungen (Stale Drafts) — M106 DQL hat Link zu unpubliziertem DDL im Fliesstext
```