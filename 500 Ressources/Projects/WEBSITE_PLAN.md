# Enderchest Website — Projektplanung

## Übersicht

Statische Website die automatisch aus dem Obsidian-Vault generiert wird.
Notizen mit `publish: false` werden als Pages gebaut, alles andere bleibt privat.

**Tech Stack:**
- **Eleventy 3.x** — Static Site Generator, versteht Markdown nativ
- **Pagefind 1.x** — statischer Search-Index, läuft ohne Server
- **GitHub Actions** — automatisches Deployment bei jedem Push
- **GitHub Pages** — Hosting

---

## Repositories

```
github.com/Atsumieee/Enderchest        ← Vault (Obsidian + CLAUDE.md für Agenten)
github.com/Atsumieee/enderchest-web    ← Website-Projekt (Eleventy + eigene CLAUDE.md)
```

Die beiden Repos sind bewusst getrennt:
- Kein Konflikt zwischen Obsidian-CLAUDE.md und Website-CLAUDE.md
- Claude Code Sessions für die Website haben ihren eigenen klaren Kontext
- Vault und Website können unabhängig versioniert werden

---

## Projektstruktur

```
enderchest-web/                     ← Eigenes GitHub Repo
│
├── .github/
│   └── workflows/
│       └── deploy.yml              ← Checkt Vault aus, baut, deployed
│
├── src/
│   ├── _data/
│   │   └── notes.js                ← Liest Vault-Frontmatter, generiert Metadaten
│   │
│   ├── _includes/
│   │   ├── base.njk                ← Basis-Layout (Topbar, Wrapper, Scripts)
│   │   ├── note.njk                ← Layout für einzelne Notiz-Pages
│   │   └── section.njk            ← Layout für Fachbereich-Übersichten
│   │
│   ├── _assets/
│   │   ├── research-base.css       ← Das Design System (Kopie aus Vault)
│   │   └── main.js                 ← Theme Toggle, ecCopyCode, Pagefind Init
│   │
│   └── index.njk                   ← Homepage (Hero + Bento + Search)
│
├── .eleventy.js                    ← Eleventy Config
├── package.json
└── CLAUDE.md                       ← Anleitung für Claude Code Sessions (Website)
```

---

## Seiten & Routing

| URL | Inhalt |
|-----|--------|
| `/` | Homepage — Hero, Bento-Sektionen, Omni Search |
| `/schule/` | Übersicht Schule — alle publizierten Module |
| `/schule/m106/` | M106 Übersicht — alle SQL Notizen |
| `/schule/m106/sql-dql/` | Einzelne Notiz |
| `/mathematik/` | Mathematik Übersicht |
| `/mathematik/llm/` | Einzelne Notiz |

Routing wird automatisch aus dem Vault-Pfad und Frontmatter generiert.
`100 Schule/M106 - Datenbanken/SQL - DQL.md` → `/schule/m106/sql-dql/`

---

## Homepage Aufbau

```
Topbar
  └── Site Name + Theme Toggle

Hero
  └── Label ("Lernnotizen & IT-Wissen")
  └── H1 mit Italic Gradient ("Wissen das wirklich erklärt.")
  └── Subtitle
  └── Omni Search Bar (Pagefind)

Bento-Sektion: Informatik-Module
  └── Bento Grid (featured + normale Items)
  └── Jedes Item = ein Modul/Fachbereich

Bento-Sektion: Berufsmatura
  └── Bento Grid

Stats Row
  └── Anzahl Notizen · Fachbereiche · Letzte Aktualisierung
```

---

## Omni Search — Pagefind

Pagefind generiert nach dem Build automatisch einen Suchindex aus allen Pages.

**Scoring für Bento-Darstellung:**
- Score > 0.8 → grosse Karte (Treffer im Titel oder H2)
- Score 0.4–0.8 → normale Karte
- Score < 0.4 → kleine Karte (Treffer im Fliesstext)

**Suchverhalten:**
- Ohne Suche → normale Bento-Sektionen sichtbar
- Mit Suche → Sektionen ausblenden, Ergebnisse als dynamisches Bento
- Leere Suche → zurück zur normalen Ansicht

---

## Vault → Website Pipeline

```
Obsidian Git (auto-push)
  └── github.com/[user]/Enderchest
      └── GitHub Actions in enderchest-web (auf push zu Enderchest/main)
          └── Vault auschecken → publish: false Filter
          └── Eleventy build
          └── Pagefind index
          └── Deploy → GitHub Pages
              └── [user].github.io/enderchest-web
```

**Trigger:** Der Workflow in `enderchest-web` wird ausgelöst wenn der
Vault-Repo (`Enderchest`) gepusht wird — via `repository_dispatch` oder
`workflow_dispatch` Event vom Vault-Repo.

**Publish-Filter Regel:**
Nur Files mit `publish: false` im Frontmatter werden gebaut.
Links zu nicht-publizierten Pages werden entfernt.

**Wikilink-Konvertierung:**
`[[SQL - DQL]]` → `[SQL - DQL](/schule/m106/sql-dql/)` — aufgelöst im Build.

**Research HTML-Files:**
HTML-Files aus dem Research Project werden direkt als statische Files
in den Build kopiert — kein Konvertierungsschritt nötig.

---

## GitHub Actions Workflow

```yaml
# In: enderchest-web/.github/workflows/deploy.yml
# Trigger: Push auf Enderchest main ODER manuell
# Steps:
# 1. enderchest-web auschecken
# 2. Vault (Enderchest) auschecken nach ./vault/
# 3. npm install
# 4. eleventy build (liest aus ./vault/)
# 5. pagefind --source _site
# 6. Deploy zu GitHub Pages
```

---

## Phasen

### Phase 1 — Grundgerüst (Claude Code Session 1)
- [ ] `enderchest-web` Repo aufsetzen
- [ ] `package.json` mit Eleventy + Pagefind Dependencies
- [ ] `.eleventy.js` Config — Markdown, Wikilinks, Publish-Filter
- [ ] `base.njk` Layout mit `research-base.css` eingebettet
- [ ] `notes.js` — Vault-Files lesen und filtern
- [ ] Erste Test-Page aus einer Vault-Notiz rendern
- [ ] Lokal verifizieren: `npm run dev`

### Phase 2 — Homepage (Claude Code Session 2)
- [ ] `index.njk` — Hero + Bento-Sektionen statisch
- [ ] Bento-Sektionen dynamisch aus Vault-Daten generieren
- [ ] Stats Row (Notizanzahl, Fachbereiche, Datum)
- [ ] Pagefind integrieren
- [ ] Omni Search mit Score-basierter Bento-Darstellung

### Phase 3 — Notiz-Pages (Claude Code Session 2-3)
- [ ] `note.njk` Layout — Breadcrumb, Header, Content
- [ ] Wikilink-Konvertierung (`[[X]]` → `/pfad/x/`)
- [ ] Syntax Highlighting
- [ ] Fachbereich-Übersichtsseiten (`section.njk`)
- [ ] Breadcrumb-Navigation

### Phase 4 — Deployment (Claude Code Session 3)
- [ ] `deploy.yml` GitHub Actions Workflow
- [ ] Cross-Repo Trigger (Vault push → Website rebuild)
- [ ] GitHub Pages aktivieren
- [ ] Erster Live-Deploy testen
- [ ] Custom Domain vorbereiten (optional, später)

### Phase 5 — Polish (ongoing)
- [ ] Research HTML-Files in Build integrieren
- [ ] Mobile Optimierung prüfen
- [ ] Open Graph Meta Tags für Social Sharing
- [ ] Lint-Workflow: fehlende publish-Flags identifizieren