[M431-TODO](https://www.notion.so/365c4475be7f8066a329e752cf289e1a?pvs=21)

# Modulinhalte:

[M164](https://www.notion.so/M164-36dc4475be7f809bb73acfa66d4c9d99?pvs=21)

[M162](https://www.notion.so/M162-36dc4475be7f805da7bbfb020f08970a?pvs=21)

[M117](https://www.notion.so/M117-36dc4475be7f807b85c0d1450a55a00f?pvs=21)

[M187](https://www.notion.so/M187-36dc4475be7f8061b3efe7cfd997d9a1?pvs=21)

[M319](https://www.notion.so/M319-36dc4475be7f8093a95de795fcf51b77?pvs=21)

[M122](https://www.notion.so/M122-36dc4475be7f80849097dbac9d717dd1?pvs=21)

## Offene TODOs

### Hoch (blockiert andere Aufgaben)

- [x] Inhalte M117, M122, M319, M187, M162 in HTML-Seiten erstellen & einpflegen (31.05)
- [x] Quizfragen aller Module im quiz.js-Format einbauen (31.05–02.06)
- [x] Deployment auf Schulserver (finale Version, 02.06)

### Mittel

- [x] URL in Dokumentation (Kap. 4.6) eintragen
- [x] Fazit & Reflexion schreiben (Kap. 6)
- [x] Checkliste abschliessen (Kap. 5)

### Niedrig (Abschluss)

- [x] Screenshots erstellen und in Dokumentation einfügen
- [x] Responsivität auf Mobile abschliessend bestätigen
- [x] Präsentationsfolien erstellen
- [x] Dokumentation als PDF exportieren (Ctrl+P im Browser → `dokumentation-vorlage.html`)
- [x] Alles per E-Mail an [kuno.schuerch@sluz.ch](mailto:kuno.schuerch@sluz.ch) senden (08.06, 23:59)

# M431 – IT Lernplattform | Dokumentation Zwischenstand

**Klasse:** INP25b | **Schule:** BBZW | **Lehrperson:** Kuno Schürch

**Abgabe:** 08.06.2026 um 23:59 → [kuno.schuerch@sluz.ch](mailto:kuno.schuerch@sluz.ch)

**Präsentation:** 09.06.2026, 10 Minuten

---

## Team & Aufgabenverteilung

|Person|Rolle / Aufgaben|Module|
|---|---|---|
|Marvin|CSS-Layout, JavaScript, Webserver-Verwaltung (Plesk, Deployment, GitHub)|M122, M319|
|Milan|HTML-Struktur, CSS-Layout, Modulinhalt|M162|
|Anna|Dokumentation, Präsentation, Testing|M187|
|Roni|Dokumentation, Präsentation, Testing, Navigation-Testing|M117, M164|

---

## 1. Projektbeschreibung

### 1.1 Was ist unser Projekt?

Unser Projekt ist eine statische IT-Lernplattform für Berufseinsteiger und Anfänger im IT-Bereich. Ziel der Website ist es, grundlegende IT-Themen einfach und verständlich zu erklären, damit Neulinge einen besseren Einstieg in die Informatik bekommen.

Die Lernplattform enthält sechs Themenbereiche, die sich an Modulen aus dem Schweizer Modulbaukasten Informatik orientieren: Netzinfrastruktur (M117), Scriptsprachen/Algorithmen (M122), Applikationsentwicklung (M319), ICT-Services und Cloud (M187), Datenbankdesign (M162) sowie SQL-Abfragen (M164). Jede Seite erklärt die Grundlagen mit kurzen Texten und einer übersichtlichen Struktur. Über ein Navigationsmenü können Nutzer einfach zwischen den Themen wechseln. Zusätzlich ist pro Modul ein Quiz mit JavaScript eingebaut, mit dem Nutzer ihr Wissen testen können.

Das Projekt demonstriert grundlegende Kenntnisse in der Webentwicklung: HTML für die Struktur der einzelnen Seiten, CSS für das Design inklusive Dark/Light-Mode, und JavaScript für die Quiz-Logik, Navigation und interaktive Funktionen.

Zusätzlich erfordert das Projekt eine Reflexion der bisher absolvierten Module in unserer Ausbildung zur Erstellung der Inhalten.

### 1.2 Zielgruppe

Die Plattform richtet sich an Personen, die neu in die IT einsteigen – zum Beispiel Lernende am Anfang ihrer Ausbildung. Sie ist speziell für Nutzer gedacht, die noch wenig oder keine Vorkenntnisse haben.

Die Inhalte werden deshalb einfach und verständlich erklärt, ohne unnötig komplizierte Fachbegriffe. Ziel ist, dass auch Einsteiger die Themen gut nachvollziehen und Schritt für Schritt verstehen können.

### 1.3 Abgrenzung

Die Plattform ist rein statisch – es gibt keine Benutzerkonten, keine Datenbank und keine serverseitig gespeicherten Quizresultate. Der Fortschritt wird clientseitig via `localStorage` im Browser gehalten. Keine Mobile-App, keine Mehrsprachigkeit und kein Backend.

---

## 2. IPERKA-Planung

### 2.1 Projekt 1: Self-Hosted Cloud mit Nextcloud ❌ ABGEBROCHEN

### I – Informieren (12.05.2026, Unterricht)

- Modulanforderungen M431 analysiert
- Recherche zu Projektideen im Bereich Plattformentwicklung
- Entscheid für Self-Hosted Cloud mit Nextcloud auf einem Server der Berufsschule.
- Technologien recherchiert: Ubuntu Server, Nginx, MariaDB, WireGuard VPN, Let's Encrypt, Duck DNS
- Ziel: Nextcloud öffentlich per HTTPS erreichbar, SSH-Administration via WireGuard VPN

### P – Planen (12.05.2026, Unterricht)

- Systemarchitektur definiert: HTTPS → Nginx → Nextcloud für öffentlichen Zugang, WireGuard VPN für Admin-Zugriff
- Installationsreihenfolge mit Abhängigkeiten festgelegt
- Aufgaben grob auf Teammitglieder verteilt
- Zeitplan auf die verfügbaren Unterrichtstage aufgeteilt

### E – Entscheiden (19.05.2026, Unterricht) → **ABBRUCH**

**Abbruchgründe:**

- Der Schulserver ist ein reines Shared-Hosting-System (Plesk) ohne Root-Zugriff – Nextcloud und WireGuard sind nicht installierbar
- Betrieb auf einem privaten Heimserver verworfen: zu hohes Risiko bezüglich Verfügbarkeit, Netzwerkzugang, Sicherheit und Komplexität
- **Entscheid: Projektneustart** – methodisch korrekt nach IPERKA, da die E-Phase genau für solche Erkenntnisse vorgesehen ist

> Der bewusste Abbruch nach Phase E ist kein Scheitern, sondern ein Qualitätsmerkmal der IPERKA-Methode.

---

### 2.2 Projekt 2: IT Lernplattform ✅ AKTIV

### I – Informieren (19.05.2026, Unterricht)

- Neue Rahmenbedingungen analysiert: Schulserver (Plesk) unterstützt diverse Tools für Website Bereitstellung (HTML, CSS, PHP)
- Anforderungen neu definiert: statische Lernplattform für IT-Einsteiger
- Themen festgelegt anhand Schweizer Modulbaukasten Informatik (6 Module, s. Kap. 1.1)
- Inhalte werden aus eigenen Zusammenfassungen und Lernmaterialien des Teams erarbeitet

### P – Planen (19.05.2026, Unterricht + Abend)

- Seitenstruktur definiert: separate HTML-Datei pro Modul, gemeinsame Sidebar/Navigation via `app.js`
- Technologie-Stack festgelegt: HTML, CSS (Catppuccin Theme, Dark/Light Mode), JavaScript
- Versionskontrolle: GitHub Repository für gemeinsame Entwicklung und Deployment-Workflow
- Hosting: Schulwebserver BBZW via Plesk
- Aufgaben auf Teammitglieder verteilt (s. Kap. Team)
- Zeitplan auf Unterrichtstage und Eigenarbeit zuhause aufgeteilt

### E – Entscheiden (19.05.2026, Unterricht) ✅ GENEHMIGT

- Entscheid für statisches HTML/CSS/JS ohne externe Frameworks oder Backend
- Hosting auf dem Schulwebserver der BBZW via Plesk
- Inhalte basieren auf eigenen Lernmaterialien des Teams (Modulzusammenfassungen)
- Projekt durch Lehrperson Kuno Schürch genehmigt

### R – Realisieren (19.05.2026 – 02.06.2026)

Arbeit erfolgte sowohl an den Unterrichtstagen als auch zuhause unter der Woche (abends) und am Wochenende, da der Projektneustart zeitlichen Druck erzeugte.

- Webserver in Plesk eingerichtet: Domain/Subdomain angelegt, Document Root gesetzt, HTTPS via Let's Encrypt aktiviert
- GitHub Repository erstellt, alle Teammitglieder eingeladen, Deployment-Workflow via GIT-Pull auf dem Webserver
- Grundstruktur der Website erstellt: separate HTML-Seite pro Modul, gemeinsame Sidebar-Navigation via `app.js`, Quiz-Logik ausgelagert in `quiz.js`
- Catppuccin Theme implementiert (Latte/Light, Mocha/Dark) mit CSS Custom Properties und manuellem Theme-Toggle
- Syntax Highlighting für SQL-Codeblöcke mit highlight.js und Catppuccin-Theme integriert
- Mobile-Navigation implementiert: Hamburger-Menu, Overlay, Hide-on-scroll-down-Verhalten
- SQL-Modul (M164): vollständige Inhalte erarbeitet (DDL, DQL, DML, JOINs, Aggregatfunktionen) inklusive Quizfragen
- Inhalte der übrigen Module (M117, M122, M319, M187, M162) in Bearbeitung

### K – Kontrollieren (02.06.2026 – 08.06.2026)

- [x] Funktionstest aller Seiten und Quiz-Logik im Browser (Chrome, Firefox)
- [x] Test auf Schulserver (inkl. HTTPS)
- [x] Responsivitätstest auf Mobile-Geräten
- [x] Gegenseitiges Review der Inhalte auf Vollständigkeit und fachliche Korrektheit
- [x] Dokumentation auf Vollständigkeit geprüft

### A – Auswerten (08.06.2026)

- [x] Reflexion über den Projektverlauf inkl. Neustart
- [x] Was lief gut, was würden wir beim nächsten Projekt anders machen?
- [x] Dokumentation fertiggestellt und als PDF exportiert
- [x] Präsentation vorbereitet und geprobt

---

## 3. Projektplanung & Zeitplan

|Datum|Kontext|Aufgabe|Person|Status|
|---|---|---|---|---|
|12.05.2026|Unterricht|Kick-Off, Projektidee Cloud definiert, Recherche|Alle|✅ Erledigt|
|12.05.2026|Unterricht|Architektur & Zeitplan Projekt 1 definiert|Alle|✅ Erledigt|
|19.05.2026|Unterricht|Projektneustart: Abbruch Projekt 1, neue Idee genehmigt|Alle|✅ Erledigt|
|19.05.2026|Unterricht|Grundstruktur HTML/CSS, GitHub-Repository erstellt|Marvin & Milan|✅ Erledigt|
|19.05.2026|Unterricht|Plesk-Webserver eingerichtet, Domain/HTTPS konfiguriert|Marvin|✅ Erledigt|
|19.-25.05|Abends/Wochenende|HTML Templates erstellt|Milan|✅ Erledigt|
|19.–25.05|Abends/Wochenende|Catppuccin Theme + Dark/Light Mode implementiert|Marvin|✅ Erledigt|
|19.–25.05|Abends/Wochenende|Mobile-Navigation (Hamburger, Overlay, Scroll-Verhalten)|Marvin|✅ Erledigt|
|19.–25.05|Abends/Wochenende|app.js (Sidebar-Logik), quiz.js (Quiz-Renderer) ausgelagert|Marvin|✅ Erledigt|
|19.–25.05|Abends/Wochenende|SQL-Inhalte M164 vollständig erarbeitet + Quizfragen|“Roni”|✅ Erledigt|
|19.–25.05|Abends/Wochenende|Powershell-Inhalte M122 vollstädnig erarbteitet + Quizfragen|“Anna”|✅ Offen|
|19.–25.05|Abends/Wochenende|Python-Inhalte M319 vollstädnig erarbteitet + Quizfragen|“Milan”|⬜ Offen|
|19.–25.05|Abends/Wochenende|ERM-Inhalte M162 vollstädnig erarbteitet + Quizfragen|Milan|⬜ Offen|
|19.–25.05|Abends/Wochenende|Geräte-Inhalte M187 vollständig erarbeitet + Quizfragen|Anna|⬜ Offen|
|19.–25.05|Abends/Wochenende|Dokumentations Struktur erstellt|Anna/Roni|✅ Erledigt|
|30.05.2026|Abends/Wochenende|Inhalte M117 (Netzwerk) einpflegen|Roni|✅ Erledigt|
|26.05.2026|Unterricht|Inhalte M187 (Services/Cloud) einpflegen|Anna|⬜ Offen|
|26.05.2026|Unterricht|Inhalte M162 (Datenbankdesign) einpflegen|Milan|⬜ Offen|
|26.05.2026|Unterricht|Inhalte M122 (Algorithmen) einpflegen|Marvin/Anna|⬜ Offen|
|26.05.2026|Unterricht|Inhalte M319 (Applikationen/OOP) einpflegen|Milan/Marvin|⬜ Offen|
|26.–01.06|Abends/Wochenende|Quizfragen aller Module einbauen|Alle|⬜ Offen|
|02.06.2026|Unterricht|Design finalisieren, Navigation und Quizlogik testen|Marvin||
|⬜ Offen|||||
|02.06.2026|Unterricht|Responsivitätstest auf Mobile|Anna|⬜ Offen|
|02.06.2026|Unterricht|Deployment auf Schulserver (finale Version)|Marvin|⬜ Offen|
|02.06.2026|Unterricht|Screenshots der fertigen Plattform erstellen|Alle|⬜ Offen|
|02.–07.06|Abends/Wochenende|Dokumentation abschliessen (Checkliste, Fazit, Screenshots)|Anna, Roni|⬜ Offen|
|02.–07.06|Abends/Wochenende|Präsentation erstellen|Alle|⬜ Offen|
|08.06.2026|Abgabe|Dokumentation als PDF exportieren, E-Mail an Lehrperson|Milan|⬜ Offen|
|09.06.2026|Unterricht|Präsentation vor Klasse und Lehrperson (10 Min.)|Alle|⬜ Offen|

**Kritischer Pfad:** Grundstruktur → Inhalte einpflegen → Quizfragen einbauen → Testing → Deployment → Abgabe

---

## 4. Realisierung

### 4.1 Technologie-Entscheide

|Technologie|Einsatz|Begründung|
|---|---|---|
|HTML|Seitenstruktur (separate Datei pro Modul)|Standard-Technologie, kein Backend nötig, läuft auf jedem Webserver|
|CSS|Design, Layout, Catppuccin Theme|Volle Gestaltungskontrolle, CSS Custom Properties für Dark/Light Mode|
|JavaScript|Quiz-Logik, Navigation, Theme-Toggle, Mobile-Menu|Interaktivität ohne Backend, direkt im Browser ausführbar|
|Tabler Icons (CDN)|Icons in Navigation und Inhalten|Kostenloses, konsistentes Icon-Set (5000+ Icons)|
|prism.js (CDN)|Syntax-Highlighting für Codeblöcke|Einfache Integration, Catppuccin-Theme verfügbar|
|Catppuccin|Farbpalette (Light: Latte, Dark: Mocha)|Konsistente, angenehme Farbpalette, MIT-Lizenz, Dark/Light Mode|
|GitHub|Versionskontrolle, Teamarbeit|Änderungen nachvollziehbar, alle Mitglieder haben Zugriff auf aktuellen Stand|
|Plesk (Schulserver)|Hosting, Deployment|Einzige verfügbare Option am Schulserver, kein Root nötig|

### 4.2 Seitenstruktur der Plattform

Die Plattform wurde als Multi-Seiten-Anwendung mit separaten HTML-Dateien umgesetzt. Dies erlaubt natürliche Browser-Navigation (Zurück-Taste, Bookmarks) und eine klare Aufgabenteilung im Team.

**Dateistruktur:**

```
it-lernplattform/
├── index.html          → Startseite mit Modulkarten
├── css/
│   └── style.css       → Catppuccin Theme + Layout
├── js/
│   ├── app.js          → Sidebar, Navigation, Theme-Toggle, Mobile-Menu
│   └── quiz.js         → Generischer Quiz-Renderer (initQuiz() Funktion)
└── pages/
    ├── m117.html       → Modul: Netzinfrastruktur (Roni)
    ├── m122.html       → Modul: Scriptsprachen/Algorithmen (Anna)
    ├── m319.html       → Modul: Applikationsentwicklung (Milan)
    ├── m187.html       → Modul: ICT-Services & Cloud (Anna)
    ├── m162.html       → Modul: Datenbankdesign (Milan)
    ├── sql-block1.html → M164: DDL (Tabellen erstellen)
    ├── sql-block2.html → M164: DML (INSERT / UPDATE / DELETE)
    ├── sql-block3.html → M164: DQL – SELECT & WHERE
    ├── sql-block4.html → M164: Sortieren, Aggregieren, Gruppieren
    └── sql-block5.html → M164: JOINs
```

Jede Seite setzt drei JavaScript-Variablen, damit `app.js` die Sidebar korrekt aufbaut:

```jsx
window.BASE         = '../';        // Pfad zur Startseite
window.PAGES        = './';         // Pfad zu anderen Modulseiten
window.CURRENT_PAGE = 'sql-block1'; // Aktive Seite für Nav-Highlighting
```

### 4.3 Quiz-System

Das Quiz wurde als generische `initQuiz()`-Funktion in `quiz.js` ausgelagert. Jede Modulseite ruft diese Funktion mit einem Array von Fragen auf:

```jsx
initQuiz('quiz-container', [
  {
    q: "Welcher SQL-Befehl liest Daten aus einer Tabelle?",
    options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
    correct: 2,
    explanation: "SELECT ist der Grundbefehl von DQL..."
  }
]);
```

Der Renderer übernimmt: Fragen anzeigen, Antworten auswerten, sofortiges Richtig/Falsch-Feedback einblenden, Fortschritt im `localStorage` speichern. Der Fortschrittsbalken in der Sidebar aktualisiert sich automatisch sobald ein Modul abgeschlossen ist.

### 4.4 Dark/Light Mode (Catppuccin)

Alle Farben sind als CSS Custom Properties definiert. Light Mode verwendet Catppuccin Latte, Dark Mode Catppuccin Mocha:

```css
:root                           { --bg: #eff1f5; --accent: #1e66f0; /* Latte */ }
html.dark                       { --bg: #1e1e2e; --accent: #89b4fa; /* Mocha */ }
@media (prefers-color-scheme: dark) { :root { --bg: #1e1e2e; /* ... */ } }
```

Das Theme wird in `localStorage` gespeichert. Das Syntax-Highlighting-Stylesheet (prism.js) wechselt synchron mit dem App-Theme (Catppuccin Latte / Mocha).

### 4.5 Mobile-Navigation

|Feature|Umsetzung|
|---|---|
|Sidebar auf Mobile versteckt|`transform: translateX(-100%)`|
|Hamburger-Button|`position: fixed`, oben links, Icon wechselt zu X wenn offen|
|Sidebar öffnen/schliessen|Klick auf Hamburger oder Overlay|
|Hamburger beim Scrollen|Versteckt sich beim Runterscrollen, erscheint beim Hochscrollen|

### 4.6 Deployment

Deployment erfolgt manuell über den Plesk Schulwebserver BBZW mit einem Git-Pull:

1. Änderungen lokal entwickeln und im Browser testen
2. Commit und Push auf GitHub (`git push`)
3. Dateien via Git auf den Server hochladen

HTTPS ist über das in Plesk integrierte Let's Encrypt-Zertifikat automatisch aktiv.

**Erreichbarkeit:** _[URL nach Deployment eintragen]_

---

## 5. Checkliste

### Endprodukt

- [x] Navigationsmenü vorhanden (Sidebar mit allen 6 Modulen)
- [x] Mindestens 4 Themenseiten (6 Module umgesetzt)
- [x] Quiz mit JavaScript (generischer Renderer, pro Modul initialisierbar)
- [x] Richtig/Falsch-Feedback im Quiz
- [x] Dark/Light Mode
- [x] Mobile-Navigation (Hamburger-Menu)
- [x] GitHub Repository für Teamarbeit
- [x] Alle Modulinhalte vollständig eingefüllt
- [x] Alle Quizfragen aller Module eingebaut
- [x] Responsivität auf Mobile abschliessend getestet
- [x] Auf Schulserver deployed (finale Version)

### Abgabe & Prozess

- [x] IPERKA-Methode angewendet (inkl. Projektneustart)
- [x] Projektidee genehmigt durch Lehrperson
- [x] Zeitplan erstellt
- [x] Aufgaben auf Teammitglieder verteilt
- [x] Abhängigkeiten dokumentiert (kritischer Pfad)
- [x] Dokumentation fertiggestellt (8–10 Seiten als PDF)
- [x] Screenshots der fertigen Plattform erstellt
- [x] Präsentation erstellt (Herangehensweise, Herausforderungen, Produkt)
- [x] Alles bis 08.06.2026, 23:59 abgegeben

---

## 6. Fazit & Reflexion

_(Wird nach Projektabschluss ausgefüllt)_

### Was lief gut?

> _Nach Abschluss ausfüllen – z.B. Teamarbeit, technische Entscheide, Nutzung von GitHub, ..._

### Was war schwieriger als erwartet?

> _Nach Abschluss ausfüllen – z.B. zeitlicher Druck durch Projektneustart, Mobile-Navigation, ..._

### Was würden wir anders machen?

> _Nach Abschluss ausfüllen – z.B. frühere Analyse der Serverumgebung, ..._

### Lernmoment Projektneustart

Der Projektneustart hat gezeigt, dass eine sorgfältige Analyse der technischen Rahmenbedingungen vor dem eigentlichen Start entscheidend ist. Die IPERKA-Methode hat uns geholfen, den Abbruch strukturiert und begründet zu treffen – und schnell in ein realistischeres Projekt zu wechseln, das mit den gegebenen Mitteln tatsächlich umsetzbar ist.

---

## 7. Präsentationsstruktur (10 Minuten)

|Block|Dauer|Inhalt|Wer|
|---|---|---|---|
|Einstieg|1 Min|Projekttitel, Team vorstellen, kurzer Überblick|Alle|
|Herangehensweise|2 Min|IPERKA-Methode, Projektneustart begründen|Roni|
|Produkt-Demo|4 Min|Live-Vorführung: Navigation, Inhalt, Quiz, Dark/Light Mode|Marvin|
|Herausforderungen|2 Min|Cloud-Abbruch (technisch), Zeitdruck (organisatorisch)|Anna|
|Fazit|1 Min|Was haben wir gelernt?|Milan|

**Pflichtinhalte laut Briefing:**

- Herangehensweise (IPERKA-Methode)
- Herausforderungen (technisch & organisatorisch)
- Erstelltes Produkt (Live-Demo)

---

---

---

_Zwischenstand erstellt: 27.05.2026_

_→ Finale Dokumentation: `dokumentation-vorlage.html` (HTML → PDF via Ctrl+P)_