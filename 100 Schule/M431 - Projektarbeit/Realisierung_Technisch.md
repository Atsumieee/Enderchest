---
title: "M431 Realisierung Technisch"
tags: [m431, projekt, schule]
created: 2026-06-02
status: draft
publish: false
todo: false
---

# Realisierung – Technische Dokumentation
**IT Lernplattform | M431 INP25b | IPERKA Phase R**
*Sehr ausführliche technische Referenz — Ergänzung zur Hauptdokumentation [[Dokumentation_Final]]*

---

## Inhaltsübersicht

1. [Webserver & Plesk](#1-webserver--plesk)
2. [GitHub Repository & Deployment-Workflow](#2-github-repository--deployment-workflow)
3. [Projektarchitektur & Dateistruktur](#3-projektarchitektur--dateistruktur)
4. [modules.json — Single Source of Truth](#4-modulesjson--single-source-of-truth)
5. [app.js — Navigation, Theme, Mobile](#5-appjs--navigation-theme-mobile)
6. [quiz.js — Generischer Quiz-Renderer](#6-quizjs--generischer-quiz-renderer)
7. [Catppuccin Theme & Dark/Light Mode](#7-catppuccin-theme--darklight-mode)
8. [Prism.js — Syntax Highlighting](#8-prismjs--syntax-highlighting)
9. [Mobile Navigation](#9-mobile-navigation)
10. [Seitenaufbau eines Blocks (HTML-Template)](#10-seitenaufbau-eines-blocks-html-template)
11. [Fortschrittsverfolgung (localStorage)](#11-fortschrittsverfolgung-localstorage)
12. [Modul-Übersicht & Block-Struktur](#12-modul-übersicht--block-struktur)
13. [Bekannte Bugs & Lösungen](#13-bekannte-bugs--lösungen)

---

## 1. Webserver & Plesk

### Was ist Plesk?

Plesk ist ein webbasiertes Hosting-Control-Panel, das auf dem Schulwebserver des BBZW betrieben wird. Es ermöglicht die Verwaltung von Webseiten, Domains, Dateien und SSL-Zertifikaten ohne direkten SSH-Zugriff oder Root-Rechte.

### Einschränkungen des Schulservers

Der Schulserver ist ein Shared-Hosting-System. Das war der direkte Grund für den Abbruch von Projekt 1 (Nextcloud), da folgende Technologien nicht installierbar sind:

| Merkmal | Schulserver (Plesk) |
|---------|---------------------|
| Statische Dateien (HTML/CSS/JS) | ✅ Unterstützt |
| PHP | ✅ Verfügbar (nicht genutzt) |
| Node.js / Python serverseitig | ❌ Nicht verfügbar |
| Datenbank (MySQL, MariaDB) | ❌ Nicht konfigurierbar für unser Projekt |
| SSH / Root-Zugriff | ❌ Nicht verfügbar |
| HTTPS (Let's Encrypt) | ✅ Automatisch via Plesk-Integration |
| Git (serverseitig) | ✅ Via SSH-Key-Authentifizierung |

### Einrichtungsschritte

1. Login in das Plesk-Dashboard mit den Zugangsdaten der Schule
2. Subdomain `INP25bL.bbzwinf.ch` angelegt, Document Root auf `/httpdocs/` gesetzt
3. HTTPS via Let's Encrypt automatisch aktiviert (Plesk-integriert, automatische Erneuerung)
4. SSH-Key für Git-Deployment generiert und auf GitHub hinterlegt (→ Kap. 2)

### Warum kein PHP oder Backend?

Da das Projekt von Anfang an auf den Schulserver ausgerichtet war und alle Anforderungen (Quiz, Navigation, Fortschritt) clientseitig lösbar sind, wurde bewusst kein Backend eingesetzt. Das reduziert die Komplexität und macht das Projekt auf jedem statischen Webserver deploybar.

---

## 2. GitHub Repository & Deployment-Workflow

### Warum GitHub?

Manuelles Hochladen per FTP bei jeder Änderung wäre fehleranfällig und bei einem 4-Personen-Team nicht praktikabel. Mit GitHub hat jedes Teammitglied jederzeit Zugriff auf den aktuellen Stand, Änderungen sind nachvollziehbar (Commit-History), und Konflikte können aufgelöst werden.

### Repository initialisieren

```bash
# Lokales Projektverzeichnis initialisieren
git init
git add .
git commit -m "Initial commit – Projektstruktur"

# Remote Repository auf GitHub verknüpfen
git remote add origin https://github.com/[team]/M431.git
git push -u origin main
```

### Deployment-Workflow via SSH-Key

Der Schulserver hat keinen direkten GitHub-Deploy-Hook. Der gewählte Workflow funktioniert so:

1. **SSH-Key generieren** (auf dem Plesk-Server)
2. **Öffentlichen Key auf GitHub hinterlegen** (Repository → Settings → Deploy Keys)
3. **Repository auf dem Server klonen** (einmalig via Plesk File Manager oder SSH-Konsole)
4. **Updates deployen** via `git pull` im Projektverzeichnis auf dem Server

```bash
# Einmaliges Klonen auf dem Server (via Plesk SSH-Konsole)
cd /var/www/vhosts/bbzwinf.ch/INP25bL.bbzwinf.ch/httpdocs/
git clone git@github.com:[team]/M431.git .

# Jedes Deployment danach:
git pull
```

### Typischer Entwicklungs-Commit

```bash
# Änderungen stagen und committen
git add pages/M164/sql-block1.html pages/M164/questions/sql-block1.js
git commit -m "feat(M164): Block 1 DDL – Inhalte und Quizfragen fertig"
git push

# → Auf dem Server: git pull
```

### Warum nicht FTP?

FTP überträgt keine Versionsinformationen. Bei einem 4-Personen-Projekt würden Änderungen sich gegenseitig überschreiben. Git löst Konflikte explizit und verhindert Datenverlust.

---

## 3. Projektarchitektur & Dateistruktur

### Architekturentscheid: Multi-Page statt Single-Page

Die ursprüngliche Vorlage (`it-lernplattform.html`) war eine Single-Page-Application (SPA): alle Seiten in einer HTML-Datei, per JavaScript ein- und ausgeblendet. Wir haben uns bewusst dagegen entschieden.

**Vorteile Multi-Page:**

| Kriterium | Single-Page (alt) | Multi-Page (gewählt) |
|-----------|-------------------|----------------------|
| Browser-Navigation | ❌ Zurück-Taste funktioniert nicht | ✅ Nativ |
| Bookmarks | ❌ URL ändert sich nicht | ✅ Jeder Block bookmarkbar |
| Teamarbeit | ❌ Alle arbeiten in einer Datei (Konflikte) | ✅ Separate Dateien pro Block |
| Ladezeit | ❌ Alles auf einmal geladen | ✅ Nur aktuelle Seite |
| Wartbarkeit | ❌ Eine riesige Datei | ✅ Übersichtlich aufgeteilt |

### Vollständige Dateistruktur

```
M431/
├── index.html                      ← Dashboard / Startseite
├── modules.json                    ← Zentrale Modul- und Seitenkonfiguration
├── favicon.svg                     ← Favicon (Tabler Icon)
├── CLAUDE.md                       ← Architektur-Notizen für Entwicklung
├── README.md                       ← Projektübersicht
│
├── css/
│   └── style.css                   ← Alle Styles: Catppuccin, Layout, Komponenten
│
├── js/
│   ├── app.js                      ← Sidebar, Theme, Navigation, Mobile, Footer
│   └── quiz.js                     ← Generischer Quiz-Renderer
│
└── pages/
    ├── M117/                       ← Modul: Netzwerk (Roni)
    │   ├── block-1.html            ← Was ist ein Netzwerk?
    │   ├── block-2.html            ← IP-Adressen: Aufbau & Versionen
    │   ├── block-3.html            ← Subnetzmasken & Adressbereiche
    │   ├── block-4.html            ← MAC, privat, öffentlich & NAT
    │   ├── block-5.html            ← Netzwerktopologien
    │   ├── block-6.html            ← OSI-Modell & Netzwerkgeräte
    │   ├── block-7.html            ← TCP, UDP, DNS & DHCP
    │   ├── questions/
    │   │   ├── net-block1.js
    │   │   └── ... (net-block2 bis net-block7)
    │   └── v1/                     ← Archiv: 14-Block-Version (inaktiv)
    │
    ├── M122/                       ← Modul: PowerShell (Anna/Marvin)
    │   ├── block-1.html            ← Terminal & Grundlagen
    │   ├── block-2.html            ← Variablen & Datentypen
    │   ├── block-3.html            ← Kontrollstrukturen
    │   ├── block-4.html            ← Schleifen
    │   ├── block-5.html            ← Pipeline
    │   ├── block-6.html            ← Funktionen
    │   └── questions/
    │       └── ... (ps-block1 bis ps-block6)
    │
    ├── M162/                       ← Modul: Datenbankdesign (Milan)
    │   ├── block-1.html            ← Daten & Datentypen
    │   ├── block-2.html            ← ER-Modell
    │   ├── block-3.html            ← Relationales Modell
    │   ├── block-4.html            ← Normalisierung
    │   └── questions/
    │       └── ... (db-block1 bis db-block4)
    │
    ├── M164/                       ← Modul: SQL (Roni)
    │   ├── sql-block1.html         ← DDL (CREATE, ALTER, DROP)
    │   ├── sql-block2.html         ← DML (INSERT, UPDATE, DELETE)
    │   ├── sql-block3.html         ← SELECT & WHERE
    │   ├── sql-block4.html         ← Sortieren & Aggregieren
    │   ├── sql-block5.html         ← JOINs
    │   └── questions/
    │       └── ... (sql-block1 bis sql-block5)
    │
    ├── M187/                       ← Modul: ICT-Arbeitsplatz (Anna)
    │   ├── block-1.html            ← Hardware & Peripherie
    │   ├── block-2.html            ← BS installieren & VM
    │   ├── block-3.html            ← Linux Terminal
    │   ├── block-4.html            ← Netzwerk, Sicherheit & SSH
    │   ├── block-5.html            ← Benutzer & Berechtigungen
    │   ├── block-6.html            ← Diagnose & Ergonomie
    │   ├── block-7.html            ← OverTheWire Bandit
    │   └── questions/
    │       └── ... (ict-block1 bis ict-block7)
    │
    └── M319/                       ← Modul: Python (Milan/Marvin)
        ├── block-1.html            ← Wie funktioniert ein Programm?
        ├── block-2.html            ← Variablen & Datentypen
        ├── block-3.html            ← Kontrollstrukturen
        ├── block-4.html            ← Listen & Datenstrukturen
        ├── block-5.html            ← Funktionen
        └── questions/
            └── ... (py-block1 bis py-block5)
```

**Gesamt:** 34 Inhaltsblöcke, 34 Quizfragen-Dateien, 6 Module.

---

## 4. modules.json — Single Source of Truth

### Zweck

`modules.json` ist die einzige Stelle, an der Module und ihre Seiten definiert sind. `app.js` lädt diese Datei per XHR und baut die gesamte Sidebar, das Dashboard und alle Links daraus auf. Keine HTML-Datei enthält hartcodierte Navigationslinks — eine Änderung in `modules.json` wirkt sich sofort auf die gesamte Plattform aus.

### Warum XHR statt direktem Import?

Da `modules.json` eine externe JSON-Datei ist, kann sie nicht mit `<script src="">` geladen werden. Ein `fetch()` oder `XMLHttpRequest` ist nötig. Das bedeutet: Die Seite muss über HTTP(S) ausgeliefert werden — direktes Öffnen mit `file://` im Browser funktioniert nicht (CORS-Restriction).

```bash
# Lokal entwickeln: Python HTTP-Server starten
python -m http.server 8000
# http://localhost:8000 öffnen
```

### Struktur eines Modul-Eintrags

```json
{
  "id": "M117",
  "name": "M117",
  "title": "M117 – Netzwerk",
  "subtitle": "IP-Adressen, Protokolle, OSI-Modell",
  "icon": "ti-network",
  "color": "mi-blue",
  "dir": "pages/M117",
  "pages": [
    {
      "id": "net-block1",
      "label": "Block 1 – Was ist ein Netzwerk?",
      "icon": "ti-network",
      "href": "block-1.html"
    },
    {
      "id": "net-block2",
      "label": "Block 2 – IP-Adressen: Aufbau & Versionen",
      "icon": "ti-hash",
      "href": "block-2.html"
    }
  ]
}
```

### Wichtige Regeln

- `id` (Modul-Ebene): Wird für CSS-Klassen und DOM-IDs verwendet (`subnav-M117`, `chev-M117`)
- `id` (Seiten-Ebene, `pages[].id`): Muss **global einmalig** über alle Module sein — wird als `localStorage`-Key für Fortschritt verwendet
- `pages: null` oder fehlendes `pages` → Modul erscheint als einfacher Link ohne Sub-Navigation
- `_v1_pages`: Inaktive Seiten-Konfiguration (für M117 v1-Archiv) — wird von `app.js` ignoriert

### M117 Versions-Switch

M117 existiert in zwei Versionen (v1: 14 Blöcke granular, v2: 7 Blöcke konsolidiert). Um zwischen Versionen zu wechseln, in `modules.json` die Schlüssel tauschen:

```json
// v2 aktiv (aktuell):
"pages": [ ... 7 Blöcke ... ],
"_v1_pages": [ ... 14 Blöcke ... ]

// v1 aktiv:
"_v2_pages": [ ... 7 Blöcke ... ],
"pages": [ ... 14 Blöcke ... ]
```

---

## 5. app.js — Navigation, Theme, Mobile

`app.js` ist das zentrale Script der Plattform. Es wird auf jeder Seite geladen und übernimmt fünf Aufgaben:

1. **Theme-Management** (Dark/Light/System)
2. **Prism.js dynamisch laden**
3. **modules.json laden und Sidebar bauen**
4. **Dashboard rendern** (nur `index.html`)
5. **Mobile-Navigation einrichten**

### Initialisierungsablauf

Jede HTML-Seite setzt vor dem Laden von `app.js` drei globale Variablen:

```javascript
window.BASE         = '../../';      // Relativer Pfad zur index.html
window.CURRENT_PAGE = 'net-block1';  // ID der aktuellen Seite (für Nav-Highlighting)
```

`app.js` ist in einem IIFE (Immediately Invoked Function Expression) gekapselt, damit keine globalen Variablen ausser den bewusst mit `window.` exponierten Funktionen entstehen:

```javascript
(function () {
  // Alle app.js-Variablen sind hier lokal
  var MODULES = [];
  var BASE_PATH = window.BASE || '../';

  document.addEventListener('DOMContentLoaded', function () {
    loadModules();   // → fetchts modules.json → buildSidebar() → renderDashboard()
    setupMobile();   // → Hamburger-Button + Overlay ins DOM
    loadPrism();     // → Prism CSS + Core + Grammars dynamisch laden
    addFooter();     // → Disclaimer-Footer ans DOM hängen
  });
})();
```

### Sidebar-Aufbau (`buildSidebar`)

Die Sidebar wird als HTML-String aufgebaut und per `innerHTML` in `<div id="app-nav">` geschrieben. Das ist schneller als viele `createElement`-Aufrufe.

```javascript
function buildSidebar() {
  var nav = document.getElementById('app-nav');
  var cur = window.CURRENT_PAGE || '';
  var B   = window.BASE || '../';
  var html = '';

  // Logo + Theme-Button
  html += '<div class="sidebar-logo">...';

  // Module: jedes Modul mit Pages → collapsible Sub-Nav
  MODULES.forEach(function (mod) {
    var isOpen = mod.pages && mod.pages.some(function(p) { return p.id === cur; });

    if (mod.pages && mod.pages.length) {
      // Collapsible Header
      html += '<a id="header-' + mod.id + '" class="nav-item' + (isOpen ? ' open' : '') + '" ...>';
      html += '<i class="ti ' + mod.icon + '"></i> ' + mod.title;
      html += '<i id="chev-' + mod.id + '" class="ti ti-chevron-down nav-sql-chevron" ...></i>';
      html += '</a>';

      // Sub-Seiten
      html += '<div id="subnav-' + mod.id + '" style="display:' + (isOpen ? 'block' : 'none') + '">';
      mod.pages.forEach(function (pg) {
        var isActive = pg.id === cur;
        html += '<a class="nav-item nav-sub' + (isActive ? ' active' : '') + '" href="' + B + mod.dir + '/' + pg.href + '">';
        html += '<i class="ti ' + (pg.icon || 'ti-file') + '"></i> ' + pg.label;
        html += '</a>';
      });
      html += '</div>';
    }
  });

  // Fortschrittsbalken
  html += '<div class="sidebar-stats">...';

  nav.innerHTML = html;
  updateSidebarStats();
  refreshBadges();
}
```

Das Modul der aktuellen Seite wird automatisch aufgeklappt (`isOpen = true`), das aktive Nav-Item erhält die Klasse `.active`.

### Theme-Toggle

```javascript
var THEME_KEY = 'lp-theme';

function isDarkActive() {
  var html = document.documentElement;
  if (html.classList.contains('dark'))  return true;
  if (html.classList.contains('light')) return false;
  // Fallback: Systempräferenz
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(theme) {
  var html = document.documentElement;
  html.classList.remove('dark', 'light');
  if (theme === 'dark')  html.classList.add('dark');
  if (theme === 'light') html.classList.add('light');

  // Prism-Stylesheet synchron wechseln
  var link = document.getElementById('prism-theme-css');
  if (link) link.href = isDarkActive() ? PRISM_DARK : PRISM_LIGHT;

  // Icon wechseln
  var icon = document.getElementById('theme-icon');
  if (icon) icon.className = 'ti ' + (isDarkActive() ? 'ti-moon' : 'ti-sun');
}

// Theme sofort anwenden (vor DOMContentLoaded) um Flicker zu verhindern
applyTheme(localStorage.getItem(THEME_KEY) || 'system');

window.toggleTheme = function () {
  var next = isDarkActive() ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
};
```

Das Theme wird **vor `DOMContentLoaded`** angewendet, damit die Seite nicht kurz im falschen Modus aufblitzt (FOUC — Flash of Unstyled Content).

---

## 6. quiz.js — Generischer Quiz-Renderer

### Design-Entscheid: Ausgelagerte Funktion

Der Quiz-Code war in der ursprünglichen Vorlage direkt in jede Seite eingebettet. Wir haben ihn in `quiz.js` ausgelagert, damit:
- Änderungen an der Quiz-Logik nur an einer Stelle gemacht werden müssen
- Jede Seite nur die Fragen definieren muss, nicht die Render-Logik
- Die Fragen in separaten `.js`-Dateien unter `questions/` liegen können (saubere Trennung)

### Verwendung

```javascript
// In pages/M164/questions/sql-block1.js:
initQuiz('quiz-container', [
  {
    q: "Welcher SQL-Befehl erstellt eine neue Tabelle?",
    options: ["INSERT", "CREATE TABLE", "NEW TABLE", "MAKE TABLE"],
    correct: 1,
    explanation: "CREATE TABLE definiert eine neue Tabelle mit Spalten und Constraints."
  },
  {
    q: "Was ist ein PRIMARY KEY?",
    code: "CREATE TABLE kunden (\n  id INT PRIMARY KEY,\n  name VARCHAR(50)\n);",
    lang: "sql",
    options: [
      "Ein Passwort für die Tabelle",
      "Ein eindeutiger Bezeichner für jeden Datensatz",
      "Der Name der Tabelle",
      "Eine gespeicherte Abfrage"
    ],
    correct: 1,
    explanation: "Ein PRIMARY KEY identifiziert jeden Datensatz eindeutig und darf nicht NULL sein."
  }
]);
```

### Question-Objekt — alle Felder

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `q` | string | ✅ | Fragetext (plain text oder HTML) |
| `options` | string[] | ✅ | Array der Antwortmöglichkeiten |
| `correct` | number | ✅ | Index der richtigen Antwort (0-basiert) |
| `explanation` | string | ✅ | Feedback-Text nach Antwort |
| `code` | string | ❌ | Code-Snippet, wird als highlight.js-Block angezeigt |
| `lang` | string | ❌ | Sprache für Highlighting: `sql` \| `powershell` \| `python` \| `bash` (Default: `sql`) |
| `image` | string | ❌ | Pfad zu einem Bild, das unter der Frage angezeigt wird |

### Fortschritt-Integration

Am Ende des letzten Quiz-Blocks ruft `quiz.js` automatisch `markComplete()` aus `app.js` auf:

```javascript
// Im quiz.js, beim letzten beantwortetem Quiz:
if (window.CURRENT_PAGE && typeof markComplete === 'function') {
  markComplete(window.CURRENT_PAGE, questions.length - wrongCount, questions.length);
}
```

`markComplete(pageId, correct, total)` speichert den Status in `localStorage` und aktualisiert den Sidebar-Fortschrittsbalken in Echtzeit.

### States

| State | Bedingung | Anzeige |
|-------|-----------|---------|
| `mastered` | Alle Fragen richtig (`wrongCount === 0`) | Grüner Button "Gemeistert!", grüner Punkt in Sidebar |
| `review` | Mindestens 1 Fehler | Gelber Button "X Fehler – nochmals üben", gelber Punkt |
| (keine) | Noch nicht besucht | Grauer Punkt in Sidebar |

---

## 7. Catppuccin Theme & Dark/Light Mode

### Was ist Catppuccin?

Catppuccin ist ein Open-Source-Farbschema mit vier offiziellen Varianten. Wir nutzen:
- **Latte** (hell) — für Light Mode
- **Mocha** (dunkel) — für Dark Mode

Projektwebsite: https://catppuccin.com | Lizenz: MIT

### CSS-Implementierung

Alle Farben sind als CSS Custom Properties auf `:root` definiert. `html.dark` überschreibt sie mit den Mocha-Werten. `@media (prefers-color-scheme: dark)` dient als Fallback wenn keine manuelle Wahl gespeichert ist.

```css
/* style.css — Auszug */

:root {
  /* Catppuccin Latte */
  --bg:          #eff1f5;
  --sidebar-bg:  #e6e9ef;
  --surface:     #ccd0da;
  --text:        #4c4f69;
  --subtext:     #6c6f85;
  --accent:      #1e66f0;
  --green:       #40a02b;
  --red:         #d20f39;
  --yellow:      #df8e1d;
  --border:      #ccd0da;
}

html.dark {
  /* Catppuccin Mocha */
  --bg:          #1e1e2e;
  --sidebar-bg:  #181825;
  --surface:     #313244;
  --text:        #cdd6f4;
  --subtext:     #a6adc8;
  --accent:      #89b4fa;
  --green:       #a6e3a1;
  --red:         #f38ba8;
  --yellow:      #f9e2af;
  --border:      #313244;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Identisch wie html.dark — Fallback für Systempräferenz */
    --bg: #1e1e2e;
    /* ... */
  }
}
```

Da alle Komponenten ausschliesslich CSS Custom Properties für Farben verwenden, reicht das Hinzufügen/Entfernen der Klasse `.dark` auf `<html>`, um das gesamte UI umzufärben — kein einziger Farbwert ist hardcodiert.

### Modul-Farben

Jedes Modul hat eine eigene Akzentfarbe (CSS-Klasse `mi-*`), die in `modules.json` als `color`-Feld gesetzt wird:

```css
.mi-blue   { --mod-color: var(--accent); }
.mi-amber  { --mod-color: #df8e1d; }   /* M122 PowerShell */
.mi-purple { --mod-color: #8839ef; }   /* M319 Python */
.mi-teal   { --mod-color: #179299; }   /* M187 ICT */
.mi-coral  { --mod-color: #fe640b; }   /* M162 Datenbankdesign */
.mi-green  { --mod-color: var(--green); } /* M164 SQL */
```

---

## 8. Prism.js — Syntax Highlighting

### Warum Prism statt highlight.js?

Im Projektverlauf wurde zunächst highlight.js evaluiert (nur SQL nötig, einfachere Integration). Beim Ausbau der Plattform auf 6 Module mit PowerShell, Python und Bash wurde Prism.js bevorzugt, weil:
- Grammars einzeln ladbar sind (kleinerer Footprint als highlight.js All-in-one)
- Theme-Switching zwischen Dark und Light einfacher ist
- Die Catppuccin-Themes für Prism über CDN verfügbar sind

### Dynamisches Laden in app.js

Prism wird nicht statisch eingebunden, sondern nach `DOMContentLoaded` dynamisch ins `<head>` injiziert:

```javascript
function loadPrism() {
  // 1. Theme-CSS (wechselt mit Dark/Light Mode)
  if (!document.getElementById('prism-theme-css')) {
    var link = document.createElement('link');
    link.id = 'prism-theme-css';
    link.rel = 'stylesheet';
    link.href = isDarkActive()
      ? 'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-one-dark.css'
      : 'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-one-light.css';
    document.head.appendChild(link);
  }

  // 2. Prism Core
  if (!window.Prism) {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-core.min.js';
    script.onload = function () {
      // 3. Sprachgrammars parallel laden
      var langs = ['sql', 'powershell', 'python', 'bash'];
      var loaded = 0;
      langs.forEach(function (lang) {
        var s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-' + lang + '.min.js';
        s.onload = function () {
          if (++loaded === langs.length) Prism.highlightAll(); // ← erst wenn alle geladen
        };
        document.head.appendChild(s);
      });
    };
    document.head.appendChild(script);
  } else {
    Prism.highlightAll(); // Prism schon geladen (z.B. durch Navigation)
  }
}
```

### Verwendung in HTML-Seiten

```html
<!-- Codeblock in einem Block-HTML -->
<pre class="code-block"><code class="language-sql">
SELECT vorname, nachname
FROM kunden
WHERE land = 'CH'
ORDER BY nachname;
</code></pre>
```

Unterstützte Sprachen: `sql`, `powershell`, `python`, `bash`. Zeichen `<`, `>`, `&` müssen HTML-escaped sein (`&lt;`, `&gt;`, `&amp;`).

### Theme-Wechsel synchron mit App-Theme

Wenn der User das App-Theme wechselt, wird das Prism-Stylesheet-`href` sofort ausgetauscht:

```javascript
function applyTheme(theme) {
  // ...
  var link = document.getElementById('prism-theme-css');
  if (link) link.href = isDarkActive()
    ? 'https://cdn.jsdelivr.net/.../prism-one-dark.css'
    : 'https://cdn.jsdelivr.net/.../prism-one-light.css';
}
```

---

## 9. Mobile Navigation

### Verhalten

| Situation | Verhalten |
|-----------|-----------|
| Breite < 768px | Sidebar mit `transform: translateX(-100%)` ausgeblendet |
| Hamburger-Button | `position: fixed`, oben links, 38×38px, immer sichtbar |
| Sidebar öffnen | Klick auf Hamburger → Sidebar einblenden + Overlay |
| Sidebar schliessen | Klick auf Overlay oder X-Icon |
| Icon | `ti-menu-2` (geschlossen) ↔ `ti-x` (offen) |
| Beim Runterscrollen | Hamburger blendet sich aus |
| Beim Hochscrollen / oben | Hamburger erscheint wieder |
| Touch-Hover-Bug | `@media (hover: hover)` verhindert kleben bleibende Hover-States |

### Implementierung

Hamburger-Button und Overlay werden dynamisch von `app.js` ins DOM eingefügt — kein HTML muss dafür angepasst werden:

```javascript
function setupMobile() {
  var burger = document.createElement('button');
  burger.className = 'hamburger';
  burger.setAttribute('aria-label', 'Navigation öffnen');
  burger.innerHTML = '<i class="ti ti-menu-2"></i>';
  burger.addEventListener('click', toggleMobileNav);
  document.body.appendChild(burger);

  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.addEventListener('click', toggleMobileNav);
  document.body.appendChild(overlay);

  lastScroll = window.scrollY;  // ← Initialwert auf Modulebene setzen!
}
```

### lastScroll-Bug (behoben)

`lastScroll` muss auf **Modulebene** (ausserhalb von `setupMobile()`) deklariert sein, damit `toggleMobileNav()` den Wert zurücksetzen kann wenn die Sidebar geschlossen wird. Wäre die Variable innerhalb von `setupMobile()` deklariert, wäre sie ausserhalb nicht zugänglich:

```javascript
// RICHTIG — auf Modulebene (ausserhalb aller Funktionen)
var lastScroll = 0;

function setupMobile() {
  // ...
  lastScroll = window.scrollY; // Initialwert setzen
  window.addEventListener('scroll', function () {
    // ...
    lastScroll = current; // Wert aktualisieren
  }, { passive: true });
}

window.toggleMobileNav = function () {
  // ...
  if (!isOpen) {
    lastScroll = window.scrollY; // Wert zurücksetzen beim Schliessen
  }
};
```

`{ passive: true }` beim Scroll-Listener stellt sicher, dass der Browser die Scrollperformance nicht durch das Event-Handling beeinträchtigt.

### Touch-Hover-Bug (behoben)

Auf Touch-Geräten bleibt der Hover-State nach einem Tap "kleben" (das Gerät simuliert `:hover` nach dem Touch). Fix:

```css
/* Hover nur auf Geräten die echtes Hovering unterstützen */
@media (hover: hover) {
  .nav-item:hover {
    background: var(--surface);
    color: var(--text);
  }
}
```

---

## 10. Seitenaufbau eines Blocks (HTML-Template)

Jede Block-HTML-Datei folgt demselben Aufbau. Das `<div id="app-nav">` wird von `app.js` befüllt, der `<div id="quiz-container">` von `quiz.js`.

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../../favicon.svg" type="image/svg+xml">
  <title>M164 Block 1 – DDL | IT Lernplattform</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
  <link rel="stylesheet" href="../../css/style.css">
</head>
<body>
  <div class="platform">

    <!-- Sidebar wird von app.js befüllt -->
    <div class="sidebar" id="app-nav"></div>

    <div class="content">
      <!-- Breadcrumb & Titel -->
      <div class="breadcrumb">IT Lernplattform › M164 – SQL › Block 1</div>
      <div class="page-title"><i class="ti ti-hammer"></i> DDL — Tabellen erstellen</div>
      <div class="page-subtitle">M164 Block 1 von 5 — CREATE, ALTER, DROP</div>

      <!-- Info-Box (optional) -->
      <div class="info-box">
        <i class="ti ti-info-circle"></i>
        <div>Erklärungstext...</div>
      </div>

      <!-- Inhaltsblöcke -->
      <div class="section-block">
        <h3>Abschnittstitel</h3>
        <p>Fliesstext...</p>
        <pre class="code-block"><code class="language-sql">SELECT * FROM tabelle;</code></pre>
      </div>

      <!-- Quiz (von quiz.js gerendert) -->
      <div id="quiz-container"></div>

      <!-- Vor-/Zurück-Navigation -->
      <div class="page-nav">
        <a href="../../index.html" class="btn"><i class="ti ti-home"></i> Übersicht</a>
        <a href="./sql-block2.html" class="btn primary page-nav-right">
          Block 2: DML <i class="ti ti-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>

  <!-- Pflicht: Variablen vor app.js setzen -->
  <script>
    window.BASE         = '../../';
    window.CURRENT_PAGE = 'sql-block1';
  </script>
  <script src="../../js/app.js"></script>
  <script src="../../js/quiz.js"></script>
  <script src="./questions/sql-block1.js"></script>
</body>
</html>
```

### Verfügbare CSS-Klassen für Inhalte

| Klasse | Verwendung |
|--------|-----------|
| `.section-block` | Container für einen Inhaltsabschnitt (padding, border-left) |
| `.info-box` | Blauer Info-Hinweis mit Icon |
| `.warn-box` | Gelber Warnhinweis mit Icon |
| `.content-table` | Gestylte Tabelle (Kopfzeile farbig, Zeilen alternierend) |
| `.code-block` | Code-Block-Wrapper für `<pre><code>` |
| `.page-nav` | Footer-Navigation (Vor/Zurück) |
| `.quiz-container` | Ziel-Element für `initQuiz()` |

---

## 11. Fortschrittsverfolgung (localStorage)

### Datenstruktur

Fortschritt wird unter dem Schlüssel `lp-progress` in `localStorage` gespeichert. Format:

```json
{
  "net-block1": { "state": "mastered", "correct": 5, "total": 5 },
  "net-block2": { "state": "review",   "correct": 3, "total": 5 },
  "sql-block1": { "state": "mastered", "correct": 5, "total": 5 }
}
```

Der Key ist die `id` aus `modules.json` (`pages[].id`), was der Grund ist warum diese IDs global einmalig sein müssen.

### Debug-Befehle (Browser-Konsole)

```javascript
// Aktuellen Fortschritt anzeigen
JSON.parse(localStorage.getItem('lp-progress'))

// Fortschritt zurücksetzen
localStorage.removeItem('lp-progress')

// Einen Block manuell als abgeschlossen markieren
markComplete('net-block1', 5, 5)
```

### Sidebar-Fortschrittsbalken

Pro Modul wird ein segmentierter Balken angezeigt:
- **Grün** = Anteil `mastered`-Blöcke
- **Gelb** = Anteil `review`-Blöcke
- **Grau** = Noch nicht besucht
- **Zahl** = `(mastered + review) / total`

---

## 12. Modul-Übersicht & Block-Struktur

| Modul | Sprache | Blöcke | Themen |
|-------|---------|--------|--------|
| M117 Netzwerk | — | 7 | PAN/LAN/WAN, IPv4, Subnetting, NAT, Topologien, OSI, TCP/UDP/DNS/DHCP |
| M122 PowerShell | PowerShell | 6 | Terminal, Variablen, Kontrollstrukturen, Schleifen, Pipeline, Funktionen |
| M162 Datenbankdesign | — | 4 | Daten & Datentypen, ER-Modell, Relationales Modell, Normalisierung |
| M164 SQL | SQL | 5 | DDL, DML, SELECT & WHERE, Sortieren & Aggregieren, JOINs |
| M187 ICT-Arbeitsplatz | Bash | 7 | Hardware, VM-Installation, Linux Terminal, Netzwerk/SSH, Berechtigungen, Diagnose, OverTheWire Bandit |
| M319 Python | Python | 5 | EVA-Prinzip, Variablen, Kontrollstrukturen, Listen, Funktionen |

**Total:** 34 Blöcke, 34 Quizfragen-Sets (je 5 Fragen = ~170 Quizfragen gesamt)

### M117 Versions-Archiv

M117 wurde zunächst mit 14 granularen Blöcken entwickelt (v1), dann auf 7 konsolidierte Blöcke überarbeitet (v2). v1 ist unter `pages/M117/v1/` archiviert und über `_v1_pages` in `modules.json` reaktivierbar.

---

## 13. Bekannte Bugs & Lösungen

### Bug 1: lastScroll-Scope-Problem

**Symptom:** Hamburger-Button versteckte sich beim Öffnen der Sidebar und erschien nicht wieder beim Schliessen.

**Ursache:** `lastScroll` war innerhalb von `setupMobile()` deklariert und damit für `toggleMobileNav()` nicht zugänglich. Beim Schliessen der Sidebar konnte `lastScroll` nicht zurückgesetzt werden, was dazu führte, dass der Scroll-Handler den Burger versteckte.

**Lösung:** `var lastScroll = 0;` auf Modulebene (ausserhalb aller Funktionen) verschoben.

---

### Bug 2: Touch-Hover-State bleibt kleben

**Symptom:** Nav-Items blieben nach einem Tap auf Mobile-Geräten im Hover-Zustand (blauer Hintergrund) kleben.

**Ursache:** Mobile Browser simulieren `:hover` nach einem Touch-Event, um Web-Kompatibilität zu gewährleisten. Das `:hover`-CSS bleibt aktiv bis ein anderes Element getoucht wird.

**Lösung:** Hover-Styles nur für Geräte mit echtem Hover-Support aktivieren:

```css
@media (hover: hover) {
  .nav-item:hover { background: var(--surface); }
}
```

---

### Bug 3: Sidebar verschwindet (String-Konkatenation)

**Symptom:** Sidebar-Inhalt wurde leer dargestellt obwohl `buildSidebar()` aufgerufen wurde.

**Ursache:** Beim Aufbau des HTML-Strings wurden `html +=`-Anweisungen mit komplexen Template-Ausdrücken auf derselben Zeile kombiniert, was in bestimmten Fällen zu fehlerhaftem HTML führte.

**Lösung:** Jede `html +=`-Zuweisung auf eine eigene Zeile aufgeteilt und die HTML-Generierung schrittweise debuggt.

---

### Bug 4: modules.json lädt nicht (file://)

**Symptom:** Sidebar bleibt leer, Konsole zeigt `Failed to load modules.json. Status: 0`.

**Ursache:** XHR-Requests werden von Browsern geblockt wenn die Seite per `file://` geöffnet wird (CORS-Policy).

**Lösung:** Lokale Entwicklung immer über einen HTTP-Server:
```bash
python -m http.server 8000
```

---

*Erstellt: 02.06.2026 | Technische Referenz — Ergänzung zu [[Dokumentation_Final]]*
