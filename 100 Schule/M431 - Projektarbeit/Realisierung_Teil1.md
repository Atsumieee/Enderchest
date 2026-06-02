# Realisierung – IT Lernplattform
**IPERKA Phase R | M431 INP25b | 19.05.2026 – 02.06.2026**

---

## Übersicht

In der Realisierungsphase wurde die IT Lernplattform von Grund auf aufgebaut. Die Umsetzung gliedert sich in fünf aufeinanderfolgende Schritte, die aufeinander aufbauen:

1. Webserver einrichten (Plesk)
2. GitHub Repository erstellen und mit dem Server verbinden
3. Website-Basis erstellen (Struktur, Navigation, Quiz-Logik)
4. Catppuccin Theme anwenden (Dark / Light Mode)
5. Syntax Highlighting (Prism) und UX-Verbesserungen

---

## 1. Webserver – Plesk

### Was ist Plesk?
Plesk ist ein webbasiertes Hosting-Control-Panel, das auf dem Schulwebserver des BBZW betrieben wird. Es ermöglicht die Verwaltung von Webseiten, Domains, Dateien und Datenbanken ohne direkten SSH-Zugriff oder Root-Rechte. Da der Schulserver ein Shared-Hosting-System ist, bietet Plesk die einzige verfügbare Verwaltungsoberfläche.

### Vorgehen
1. Login in das Plesk-Dashboard mit den von der Schule bereitgestellten Zugangsdaten
2. Neue Domain / Subdomain für das Projekt angelegt
3. Document Root auf das Projektverzeichnis gesetzt (`/httpdocs/lernplattform`)
4. HTTPS automatisch über das integrierte Let's Encrypt-Zertifikat aktiviert

### Einschränkungen des Schulservers
Der Schulserver unterstützt ausschliesslich statische Dateien (HTML, CSS, JavaScript). Es stehen keine serverseitigen Sprachen (PHP, Python, Node.js) und keine Datenbanken zur Verfügung. Das Projekt wurde deshalb von Anfang an als vollständig statische Webanwendung konzipiert — kein Backend, kein Framework, keine Datenbank.

| Merkmal | Schulserver (Plesk) |
|---------|---------------------|
| Statische Dateien (HTML/CSS/JS) | ✅ Unterstützt |
| PHP / Node.js / Python | ❌ Nicht verfügbar |
| Datenbank (MySQL, MariaDB) | ❌ Nicht verfügbar |
| SSH / Root-Zugriff | ❌ Nicht verfügbar |
| HTTPS (Let's Encrypt) | ✅ Automatisch |
| FTP / SFTP Upload | ✅ Verfügbar |

---

## 2. GitHub Repository

### Warum GitHub?
Ein lokales Entwickeln und manuelles Hochladen per FTP bei jeder Änderung wäre fehleranfällig und zeitaufwändig. Mit einem GitHub Repository haben alle Teammitglieder jederzeit Zugriff auf den aktuellen Stand und Änderungen sind nachvollziehbar.

### Repository erstellen

```bash
# Lokales Projektverzeichnis initialisieren
git init
git add .
git commit -m "Initial commit – Projektstruktur"

# Remote Repository auf GitHub verknüpfen
git remote add origin https://github.com/[team]/it-lernplattform.git
git push -u origin main
```

### Ordnerstruktur im Repository

```
it-lernplattform/
├── index.html              ← Startseite
├── css/
│   └── style.css           ← Catppuccin Theme + Layout
├── js/
│   ├── app.js              ← Navigation, Theme Toggle, Mobile
│   └── quiz.js             ← Quiz-Logik (generischer Renderer)
└── pages/
    ├── m117.html           ← Modul Netzwerk
    ├── m122.html           ← Modul Scriptsprache
    ├── m319.html           ← Modul Applikationen
    ├── m187.html           ← Modul Services
    ├── m162.html           ← Modul Datenbankdesign
    ├── sql-block1.html     ← M164: SELECT & WHERE
    ├── sql-block2.html     ← M164: Sortieren & Aggregieren
    ├── sql-block3.html     ← M164: JOINs
    ├── sql-block4.html     ← M164: DML
    └── sql-block5.html     ← M164: DDL
```

### Deployment-Workflow
Da Plesk keinen direkten GitHub-Deploy-Hook unterstützt, wurde ein manueller Workflow definiert:

1. Änderungen lokal entwickeln und testen (`index.html` direkt im Browser öffnen)
2. Commit und Push auf GitHub (`git push`)
3. Dateien per Plesk File Manager oder SFTP auf den Server hochladen

```bash
# Typischer Entwicklungs-Commit
git add css/style.css js/app.js
git commit -m "feat: Catppuccin Theme Dark/Light Mode"
git push
```

---

## 3. Website-Basis

### Architekturentscheid: Eine Seite pro Modul
Statt einer einzigen grossen HTML-Datei mit JavaScript-Seitenwechseln (wie in der ursprünglichen Vorlage) wurde die Plattform in separate HTML-Dateien aufgeteilt. Dies hat folgende Vorteile:

- Jede Seite ist eigenständig ladbar und bookmarkbar
- Bessere Lesbarkeit und Wartbarkeit des Codes
- Klare Aufteilung der Verantwortlichkeiten im Team
- Browser-History und Zurück-Button funktionieren nativ

### Shared Files (einmal definiert, überall verfügbar)
Die Sidebar-Navigation, der Theme-Toggle, die Fortschrittsanzeige und der Footer werden nicht auf jeder Seite einzeln definiert, sondern durch `app.js` dynamisch ins DOM eingebaut. Jede Seite setzt vor dem Laden von `app.js` drei Variablen:

```javascript
window.BASE         = '../';        // Pfad zur index.html
window.PAGES        = './';         // Pfad zu anderen Pages
window.CURRENT_PAGE = 'sql-block1'; // Aktive Seite (für Nav-Highlighting)
```

`app.js` liest diese Variablen und baut die Sidebar mit korrekten Links und dem aktiven Nav-Item automatisch auf.

### Quiz-System
Die Quiz-Logik wurde als generische Funktion in `quiz.js` ausgelagert. Jede Seite ruft `initQuiz()` mit einem Array von Fragen auf:

```javascript
initQuiz('quiz-container', [
  {
    q: "Welcher SQL-Befehl liest Daten?",
    options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
    correct: 2,
    explanation: "SELECT ist der Grundbefehl von DQL..."
  }
]);
```

Der Renderer übernimmt: Fragen anzeigen, Antworten auswerten, Feedback einblenden, Fortschritt speichern. Beim letzten abgeschlossenen Quiz einer Seite wird `markComplete(pageId)` aufgerufen — der Fortschrittsbalken in der Sidebar aktualisiert sich automatisch via `localStorage`.

---

## 4. Catppuccin Theme

### Was ist Catppuccin?
Catppuccin ist ein Open-Source-Farbschema mit vier offiziellen Varianten: Latte (hell), Frappé, Macchiato und Mocha (dunkel). Es wurde speziell für Code-Editoren und UI-Anwendungen entwickelt und bietet konsistente Farbpaletten für beide Modi.

Projektwebsite: [catppuccin.com](https://catppuccin.com)
Lizenz: MIT

### Farbpalette im Projekt

| Variable | Latte (Light) | Mocha (Dark) | Verwendung |
|----------|--------------|--------------|------------|
| `--bg` | `#eff1f5` | `#1e1e2e` | Seitenhintergrund |
| `--sidebar-bg` | `#e6e9ef` | `#181825` | Sidebar, Cards |
| `--surface` | `#ccd0da` | `#313244` | Borders, Hover |
| `--text` | `#4c4f69` | `#cdd6f4` | Haupttext |
| `--subtext` | `#6c6f85` | `#a6adc8` | Sekundärtext |
| `--accent` | `#1e66f0` | `#89b4fa` | Links, Buttons, Icons |
| `--green` | `#40a02b` | `#a6e3a1` | Richtig, Abgeschlossen |
| `--red` | `#d20f39` | `#f38ba8` | Falsch, Fehler |
| `--yellow` | `#df8e1d` | `#f9e2af` | Warnungen |

### Implementierung mit CSS Custom Properties

Alle Farben sind als CSS-Variablen auf `:root` (Light) und `html.dark` (Dark) definiert. Das System-Theme wird via `@media (prefers-color-scheme: dark)` als Fallback berücksichtigt. Der User kann jederzeit manuell wechseln — die Wahl wird in `localStorage` gespeichert.

```css
:root {
  --bg:     #eff1f5;
  --accent: #1e66f0;
  /* ... */
}

html.dark {
  --bg:     #1e1e2e;
  --accent: #89b4fa;
  /* ... */
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg:     #1e1e2e;
    --accent: #89b4fa;
    /* ... */
  }
}
```

### Theme Toggle
Der Theme-Toggle ist ein kleiner Icon-Button rechts neben dem Sidebar-Titel. Er zeigt bei Light Mode ein Sonnen-Icon (`ti-sun`) und bei Dark Mode ein Mond-Icon (`ti-moon`). Das Wechseln fügt die Klasse `.dark` oder `.light` auf `<html>` hinzu und tauscht gleichzeitig das Syntax-Highlighting-Stylesheet aus.

---

## 5. Syntax Highlighting (Prism) & UX

### Syntax Highlighting
Für die Darstellung von SQL-Codeblöcken wurde Prism.js über das Catppuccin-Highlightjs-Package integriert. Das Highlighting-Theme wechselt synchron mit dem App-Theme: Catppuccin Latte bei Light Mode, Catppuccin Mocha bei Dark Mode.

```javascript
// Laden in app.js – dynamisch nachgeladen
var HLJS_DARK  = 'https://cdn.jsdelivr.net/npm/@catppuccin/highlightjs/css/catppuccin-mocha.css';
var HLJS_LIGHT = 'https://cdn.jsdelivr.net/npm/@catppuccin/highlightjs/css/catppuccin-latte.css';
```

Codeblöcke in den HTML-Seiten werden mit der Klasse `language-sql` markiert, damit highlight.js die richtige Sprache erkennt:

```html
<pre class="code-block"><code class="language-sql">
  SELECT * FROM kunden WHERE land = 'CH';
</code></pre>
```

### UX-Anpassungen Desktop

| Feature | Umsetzung |
|---------|-----------|
| Sidebar immer sichtbar | `position: fixed`, Breite 240px |
| Content verschoben | `margin-left: 240px` auf `.content` |
| SQL-Navigation einklappbar | Klick auf Gruppe öffnet/schliesst Subitems, Chevron-Icon dreht sich per CSS-Transition |
| Theme-Button | Klein, im Sidebar-Header neben Titel |
| Aktives Nav-Item | Blaue Left-Border + farbiger Hintergrund via `.active`-Klasse |

### UX-Anpassungen Mobile (< 768px)

| Feature | Umsetzung |
|---------|-----------|
| Sidebar versteckt | `transform: translateX(-100%)` |
| Hamburger-Button | `position: fixed`, oben links, 38×38px |
| Sidebar öffnen | Klick auf Hamburger → `.mobile-open`-Klasse |
| Sidebar schliessen | Klick auf Overlay oder X-Icon |
| Icon wechselt | `ti-menu-2` → `ti-x` wenn offen |
| Hamburger beim Scrollen | Versteckt sich beim Runterscrollen, erscheint beim Hochscrollen |
| Hover-Fix Touch | `@media (hover: hover)` verhindert kleben bleibende Hover-States |
| Responsive Grid | Module-Karten: 2-spaltig → 1-spaltig, SQL-Blöcke: 5-spaltig → 2-spaltig |

### Scroll-Verhalten des Hamburger-Buttons
Das Hide-on-scroll-down / Show-on-scroll-up-Verhalten wurde mit einem einfachen Scroll-Event-Listener umgesetzt. `lastScroll` wird auf Modulebene als geteilte Variable definiert, damit `toggleMobileNav()` beim Schliessen der Sidebar den Referenzwert zurücksetzen kann:

```javascript
var lastScroll = 0; // Modulebene

// In setupMobile():
lastScroll = window.scrollY; // Initialwert beim Laden

window.addEventListener('scroll', function () {
  if (sidebar.classList.contains('mobile-open')) return;
  var current = window.scrollY;
  if (current <= 10) {
    burger.classList.remove('hidden');
  } else if (current > lastScroll) {
    burger.classList.add('hidden');
  } else {
    burger.classList.remove('hidden');
  }
  lastScroll = current;
}, { passive: true });

// In toggleMobileNav() beim Schliessen:
if (!isOpen) { lastScroll = window.scrollY; }
```

`{ passive: true }` stellt sicher dass der Scroll-Handler die Performance nicht beeinträchtigt.

---

## Offene Punkte (folgen in Phase R Teil 2)

- [x] Inhalte aller Module einfüllen (M117, M122, M319, M187, M162)
- [x] Quizfragen aller Module einbauen
- [x] Finales Testing auf Schulserver (Chrome, Firefox, Mobile)
- [x] Screenshots für Dokumentation erstellen
- [x] URL in Dokumentation eintragen

---

*Erstellt: 26.05.2026 | Phase R – Teil 1 abgeschlossen*
*→ Weiter: [[IPERKA_Planung]] | Dokumentationsvorlage: `dokumentation-vorlage.html`*
