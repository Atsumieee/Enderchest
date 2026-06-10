# Claude Code — Session 1: Grundgerüst

Kopiere diesen Prompt am Anfang der Claude Code Session.

---

## Kontext

Ich baue eine statische Website aus meinem Obsidian-Vault.
Vault und Website sind bewusst in zwei separaten Repos — kein Konflikt
zwischen der Obsidian-CLAUDE.md und dieser Website-CLAUDE.md.

**Vault Repo:** `github.com/[user]/Enderchest`
**Website Repo:** `github.com/[user]/enderchest-web` (dieses Repo)
**Vault lokal:** `C:\Users\Public\Obsidian\Enderchest`
**Ziel-URL:** `[user].github.io/enderchest-web`

**Tech Stack:**
- Eleventy 3.x — Static Site Generator
- Pagefind 1.x — Statische Suche
- GitHub Actions — Automatisches Deployment
- GitHub Pages — Hosting

---

## Projektstruktur (erstellen)

```
enderchest-web/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── _data/
│   │   └── notes.js
│   ├── _includes/
│   │   ├── base.njk
│   │   └── note.njk
│   ├── _assets/
│   │   ├── research-base.css   ← Kopie aus Vault/500 Ressources/Design/
│   │   └── main.js
│   └── index.njk
├── .eleventy.js
├── package.json
└── CLAUDE.md                   ← diese Datei
```

---

## Vault-Struktur (Referenz, read-only)

```
C:\Users\Public\Obsidian\Enderchest\
├── CLAUDE.md                   ← Obsidian-Agent (NICHT für Website)
├── index.md                    ← publish: false
├── 100 Schule/
│   ├── M106 - Datenbanken/     ← Notizen mit publish: false/false
│   ├── M122 - PowerShell/
│   ├── M164 - SQL/
│   ├── M431 - Projektarbeit/   ← publish: false
│   └── Mathematik/
├── 200 Arbeit/                 ← Alles publish: false
├── 300 Privat/                 ← Alles publish: false
├── 400 Areas/
└── 500 Ressources/
    └── Design/
        └── research-base.css   ← Design System
```

---

## Frontmatter-Schema der Notizen

```yaml
---
title: "Titel"
tags: [sql, m106]
created: 2026-06-02
status: draft | permanent | archived
publish: false | false
todo: false
---
```

**Publish-Regel:** Nur `publish: false` wird gebaut. Alles andere ignorieren.

---

## Aufgaben dieser Session

### 1. package.json

```json
{
  "name": "enderchest-web",
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy"
  },
  "dependencies": {
    "@11ty/eleventy": "^3.0.0",
    "gray-matter": "^4.0.3",
    "slugify": "^1.6.6"
  },
  "devDependencies": {
    "pagefind": "^1.0.0"
  }
}
```

### 2. .eleventy.js Config

Wichtige Punkte:
- Input: `src/`, Output: `_site/`
- Vault-Pfad als globale Variable: `C:\Users\Public\Obsidian\Enderchest`
- Markdown-Files aus dem Vault lesen via `notes.js`
- Wikilinks `[[X]]` → echte URLs konvertieren (als Markdown-Transform)
- `research-base.css` inline einbetten (als Shortcode oder Filter)
- Passthrough: `_assets/`

### 3. notes.js — Vault-Daten aufbereiten

Liest rekursiv alle `.md` Files aus dem Vault-Pfad.
Filtert auf `publish: false`.
Gibt strukturiertes Array zurück:

```javascript
// Pro Notiz:
{
  title: "SQL - DQL",
  url: "/schule/m106/sql-dql/",
  section: "Schule",
  subsection: "M106",
  tags: ["sql", "m106"],
  status: "permanent",
  created: "2026-05-22",
  filePath: "C:\\...\\SQL - DQL.md"
}
```

### 4. URL-Schema aus Vault-Pfad

| Vault-Pfad | URL |
|-----------|-----|
| `100 Schule/M106 - Datenbanken/SQL - DQL.md` | `/schule/m106/sql-dql/` |
| `100 Schule/Mathematik/LLM.md` | `/schule/mathematik/llm/` |
| `100 Schule/_Übersichten/...` | Überspringen (interne MOC-Seiten) |
| `000 Inbox/...` | Überspringen |
| `200 Arbeit/...` | Überspringen (publish: false) |
| `300 Privat/...` | Überspringen (publish: false) |

**URL-Konvertierungsregeln:**
- Ordnernummer entfernen: `100 Schule` → `schule`
- Modul-Prefix behalten, Rest entfernen: `M106 - Datenbanken` → `m106`
- Nicht-Modul-Ordner: `Mathematik` → `mathematik`
- Dateiname slugify: `SQL - DQL` → `sql-dql`
- Umlaute ersetzen: `ü→u`, `ä→a`, `ö→o`, `ß→ss`

### 5. Wikilink-Konvertierung

Transform der `[[Notizname]]` in Markdown-Content auflöst:
1. Suche Notiz mit diesem Namen in der publizierten Liste
2. Gefunden → `[Notizname](/url/zur/notiz/)`
3. Nicht gefunden (privat) → reiner Text ohne Link

### 6. base.njk Layout

```njk
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }} — Enderchest</title>
  <style>
    {% include "../_assets/research-base.css" %}
  </style>
</head>
<body>
  <div class="ec-topbar">
    <a href="/" class="ec-site-name">Enderchest</a>
    <button class="ec-theme-toggle" onclick="ecToggleTheme()" id="ec-toggle-btn">
      Dark Mode
    </button>
  </div>

  {{ content | safe }}

  <script>
    {% include "../_assets/main.js" %}
  </script>
</body>
</html>
```

### 7. main.js

```javascript
function ecToggleTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('ec-toggle-btn');
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? '' : 'dark');
  btn.textContent = isDark ? 'Dark Mode' : 'Light Mode';
}

function ecCopyCode(blockId, btn) {
  const lines = document.querySelectorAll('#' + blockId + ' .ec-line-content');
  const text = Array.from(lines).map(l => l.textContent).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.querySelector('.ec-copy-icon').style.display = 'none';
    btn.childNodes[btn.childNodes.length - 1].textContent = ' Kopiert!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.querySelector('.ec-copy-icon').style.display = '';
      btn.childNodes[btn.childNodes.length - 1].textContent = ' Kopieren';
    }, 2000);
  });
}
```

### 8. note.njk Layout

```njk
---
layout: base.njk
---
<div class="ec-wrapper">

  <div class="ec-breadcrumb">
    <a href="/">Home</a><span class="sep">/</span>
    <a href="/{{ section }}/">{{ sectionLabel }}</a><span class="sep">/</span>
    {{ title }}
  </div>

  <div class="ec-page-header">
    <div class="ec-tag">{{ tags | join(' · ') }}</div>
    <h1>{{ title }}</h1>
    <div class="ec-page-meta">Erstellt {{ created }}</div>
  </div>

  {{ content | safe }}

</div>
```

### 9. Erste Test-Page

Nimm `100 Schule/M106 - Datenbanken/SQL - DQL.md` als erste Test-Notiz.
Rendere sie unter `/schule/m106/sql-dql/` und verifiziere:
- [x] Frontmatter wird korrekt gelesen ✅ 2026-06-10
- [x] Markdown → HTML korrekt ✅ 2026-06-10
- [x] Layout + CSS sichtbar ✅ 2026-06-10
- [x] Theme Toggle funktioniert ✅ 2026-06-10
- [x] Wikilinks werden aufgelöst ✅ 2026-06-10

### 10. GitHub Actions Workflow

```yaml
name: Build & Deploy Enderchest Website

on:
  push:
    branches: [main]
  repository_dispatch:
    types: [vault-updated]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout website repo
        uses: actions/checkout@v4

      - name: Checkout vault repo
        uses: actions/checkout@v4
        with:
          repository: [user]/Enderchest
          path: vault
          token: ${{ secrets.VAULT_ACCESS_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build Eleventy
        run: npm run build

      - name: Build Pagefind index
        run: npx pagefind --source _site

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

**Wichtig nach dem Erstellen:**
1. GitHub → Enderchest-web Repo → Settings → Pages → Source: `gh-pages` Branch
2. GitHub → Settings → Developer Settings → Personal Access Token erstellen
   mit `repo` Scope → als Secret `VAULT_ACCESS_TOKEN` in `enderchest-web` hinterlegen
3. Optional: In `Enderchest` Vault-Repo einen Trigger-Workflow hinzufügen der
   `repository_dispatch` an `enderchest-web` sendet wenn gepusht wird

---

## Definition of Done — Session 1

- [x] `enderchest-web/` Repo lokal aufgesetzt ✅ 2026-06-10
- [x] `npm run dev` startet ohne Fehler ✅ 2026-06-10
- [x] `SQL - DQL.md` rendert korrekt unter `/schule/m106/sql-dql/` ✅ 2026-06-10
- [x] CSS und Theme Toggle funktionieren ✅ 2026-06-10
- [x] Wikilinks werden korrekt aufgelöst oder als Text dargestellt ✅ 2026-06-10
- [x] `deploy.yml` existiert und ist korrekt konfiguriert ✅ 2026-06-10
- [x] `research-base.css` aus Vault kopiert nach `src/_assets/` ✅ 2026-06-10
