---
title: "M431 Projektdokumentation Final"
tags: [m431, projekt, schule]
created: 2026-06-02
status: draft
publish: false
todo: false
---

# M431 – IT Lernplattform | Projektdokumentation
**Klasse:** INP25b | **Schule:** BBZW | **Lehrperson:** Kuno Schürch
**Abgabe:** 08.06.2026 um 23:59 → kuno.schuerch@sluz.ch
**Präsentation:** 09.06.2026, 10 Minuten

---

## Team & Aufgabenverteilung

| Person | Rolle / Aufgaben | Module |
|--------|-----------------|--------|
| Marvin | CSS-Layout, JavaScript, Webserver-Verwaltung (Plesk, Deployment, GitHub) | M122, M319 |
| Milan | HTML-Struktur, CSS-Layout, Modulinhalt | M162 |
| Anna | Dokumentation, Präsentation, Testing | M187, M122 |
| Roni | Dokumentation, Präsentation, Testing | M117, M164 |

---

## 1. Projektbeschreibung

### 1.1 Was ist unser Projekt?

Unser Projekt ist eine statische IT-Lernplattform für Berufseinsteiger und Anfänger im IT-Bereich. Ziel der Website ist es, grundlegende IT-Themen einfach und verständlich zu erklären, damit Neulinge einen besseren Einstieg in die Informatik bekommen.

Die Lernplattform enthält sechs Themenbereiche, die sich an offiziellen Modulen des Schweizer Modulbaukastens Informatik orientieren: Netzinfrastruktur (M117), Scriptsprachen (M122), Applikationsentwicklung (M319), ICT-Arbeitsplatz & Services (M187), Datenbankdesign (M162) sowie SQL-Abfragen (M164). Jedes Modul ist in mehrere thematische Blöcke aufgeteilt, die jeweils mit einem Multiple-Choice-Quiz abschliessen.

Das Projekt demonstriert Kenntnisse in der Webentwicklung: HTML für die Seitenstruktur, CSS für das Design inklusive Dark/Light-Mode, und JavaScript für Quiz-Logik, Navigation und Fortschrittsverfolgung.

### 1.2 Zielgruppe

Die Plattform richtet sich an Lernende am Anfang ihrer IT-Ausbildung mit wenig oder keinen Vorkenntnissen. Die Inhalte sind bewusst einfach und ohne unnötige Fachbegriffe gehalten, damit Einsteiger die Themen Schritt für Schritt nachvollziehen können.

### 1.3 Abgrenzung

Die Plattform ist rein statisch — es gibt keine Benutzerkonten, keine serverseitige Datenbank und kein Backend. Der Lernfortschritt wird clientseitig via `localStorage` im Browser gespeichert. Keine Mobile-App, keine Mehrsprachigkeit.

---

## 2. IPERKA-Planung

### 2.1 Projekt 1: Self-Hosted Cloud mit Nextcloud ❌ Abgebrochen

#### I – Informieren (12.05.2026, Unterricht)
- Modulanforderungen M431 analysiert
- Recherche zu Projektideen im Bereich Plattformentwicklung
- Entscheid für Self-Hosted Cloud mit Nextcloud auf einem Linux-Server
- Technologien recherchiert: Ubuntu Server, Nginx, MariaDB, WireGuard VPN, Let's Encrypt, Duck DNS

#### P – Planen (12.05.2026, Unterricht)
- Systemarchitektur definiert: HTTPS → Nginx → Nextcloud für öffentlichen Zugang, WireGuard VPN für Admin-Zugriff
- Installationsreihenfolge mit Abhängigkeiten festgelegt
- Aufgaben auf Teammitglieder verteilt, Zeitplan aufgestellt

#### E – Entscheiden (19.05.2026, Unterricht) → **ABBRUCH**

Abbruchgründe:
- Der Schulserver ist ein Shared-Hosting-System (Plesk) ohne Root-Zugriff → Nextcloud, MariaDB und WireGuard nicht installierbar
- Betrieb auf einem privaten Heimserver wurde aus Risikogründen verworfen (Verfügbarkeit, Netzwerk, Sicherheit)
- **Entscheid: Projektneustart** — methodisch korrekt nach IPERKA, da die E-Phase genau für solche Erkenntnisse vorgesehen ist

> Der bewusste Abbruch nach Phase E ist kein Scheitern, sondern ein Qualitätsmerkmal der IPERKA-Methode.

---

### 2.2 Projekt 2: IT Lernplattform ✅ Abgeschlossen

#### I – Informieren (19.05.2026, Unterricht)
- Neue Rahmenbedingungen analysiert: Schulserver (Plesk) unterstützt statische Dateien (HTML/CSS/JS)
- Anforderungen neu definiert: statische Lernplattform für IT-Einsteiger
- Themen festgelegt anhand des Schweizer Modulbaukastens Informatik (6 Module)
- Inhalte werden aus eigenen Zusammenfassungen und Lernmaterialien des Teams erarbeitet

#### P – Planen (19.05.2026, Unterricht + Abend)
- Seitenstruktur definiert: Startseite + 6 Module, jedes Modul mit mehreren Inhaltsblöcken + Quiz pro Block
- Technologie-Stack festgelegt: HTML, CSS (Catppuccin Theme), JavaScript, kein Backend
- GitHub Repository für Teamarbeit und Deployment eingerichtet
- Aufgaben auf Teammitglieder verteilt, Zeitplan auf verbleibende Unterrichtstage aufgeteilt

#### E – Entscheiden (19.05.2026, Unterricht) ✅ Genehmigt
- Entscheid für statisches HTML/CSS/JS ohne externe Frameworks oder Backend
- Hosting auf dem Schulwebserver der BBZW via Plesk
- Inhalte basieren auf eigenen Lernmaterialien des Teams
- **Projekt durch Lehrperson Kuno Schürch genehmigt**

#### R – Realisieren (19.05.2026 – 02.06.2026) ✅
- Webserver in Plesk eingerichtet: Subdomain angelegt, HTTPS via Let's Encrypt aktiviert
- GitHub Repository erstellt, Deployment-Workflow via Git + SSH-Key auf Plesk konfiguriert
- Dateistruktur aufgebaut: separate HTML-Datei pro Block, gemeinsame JS/CSS-Dateien
- Catppuccin Theme (Light: Latte, Dark: Mocha) mit CSS Custom Properties implementiert
- Quiz-System als generische `initQuiz()`-Funktion in `quiz.js` ausgelagert
- Mobile-Navigation mit Hamburger-Menü implementiert
- Alle 6 Module mit Inhalten und Quizfragen fertiggestellt
- Finale Version auf Schulserver deployed

#### K – Kontrollieren (02.06.2026 – 08.06.2026) ✅
- Funktionstest aller Seiten und Quiz-Logik (Chrome, Firefox)
- Test auf Schulserver inkl. HTTPS-Zertifikat
- Responsivitätstest auf Mobile
- Gegenseitiges Review der Inhalte auf fachliche Korrektheit
- Dokumentation auf Vollständigkeit geprüft

#### A – Auswerten (08.06.2026) ✅
- Reflexion über Projektverlauf inkl. Neustart
- Dokumentation fertiggestellt und als PDF exportiert
- Präsentation vorbereitet und geprobt

---

## 3. Projektplanung & Zeitplan

| Datum | Kontext | Aufgabe | Person | Status |
|-------|---------|---------|--------|--------|
| 12.05.2026 | Unterricht | Kick-Off, Projektidee Cloud definiert, Recherche | Alle | ✅ |
| 12.05.2026 | Unterricht | Architektur & Zeitplan Projekt 1 definiert | Alle | ✅ |
| 19.05.2026 | Unterricht | Projektneustart: Abbruch Projekt 1, neue Idee genehmigt | Alle | ✅ |
| 19.05.2026 | Unterricht | Plesk-Webserver eingerichtet, Domain/HTTPS konfiguriert | Marvin | ✅ |
| 19.05.2026 | Unterricht | GitHub Repository erstellt, Deployment-Workflow eingerichtet | Marvin | ✅ |
| 19.–25.05 | Eigenarbeit | Grundstruktur HTML/CSS, Templates erstellt | Milan | ✅ |
| 19.–25.05 | Eigenarbeit | Catppuccin Theme + Dark/Light Mode implementiert | Marvin | ✅ |
| 19.–25.05 | Eigenarbeit | Mobile-Navigation (Hamburger, Overlay, Scroll-Verhalten) | Marvin | ✅ |
| 19.–25.05 | Eigenarbeit | app.js (Sidebar, Navigation) und quiz.js ausgelagert | Marvin | ✅ |
| 19.–25.05 | Eigenarbeit | modules.json als zentrale Konfiguration eingeführt | Marvin | ✅ |
| 19.–31.05 | Eigenarbeit | M164 SQL: Inhalte & Quizfragen (5 Blöcke) | Roni | ✅ |
| 19.–31.05 | Eigenarbeit | M117 Netzwerk: Inhalte & Quizfragen (7 Blöcke) | Roni | ✅ |
| 19.–31.05 | Eigenarbeit | M122 PowerShell: Inhalte & Quizfragen (6 Blöcke) | Anna/Marvin | ✅ |
| 19.–31.05 | Eigenarbeit | M187 ICT-Arbeitsplatz: Inhalte & Quizfragen (7 Blöcke) | Anna | ✅ |
| 19.–31.05 | Eigenarbeit | M162 Datenbankdesign: Inhalte & Quizfragen (4 Blöcke) | Milan | ✅ |
| 19.–31.05 | Eigenarbeit | M319 Python: Inhalte & Quizfragen (5 Blöcke) | Milan/Marvin | ✅ |
| 19.–25.05 | Eigenarbeit | Dokumentationsstruktur erstellt | Anna/Roni | ✅ |
| 02.06.2026 | Unterricht | Design finalisiert, Navigation und Quiz getestet | Marvin | ✅ |
| 02.06.2026 | Unterricht | Responsivitätstest auf Mobile | Anna | ✅ |
| 02.06.2026 | Unterricht | Deployment finale Version auf Schulserver | Marvin | ✅ |
| 02.–07.06 | Eigenarbeit | Dokumentation abgeschlossen (Checkliste, Fazit, Screenshots) | Anna/Roni | ✅ |
| 02.–07.06 | Eigenarbeit | Präsentation erstellt | Alle | ✅ |
| 08.06.2026 | Abgabe | Dokumentation als PDF exportiert, E-Mail an Lehrperson | Milan | ✅ |
| 09.06.2026 | Unterricht | Präsentation vor Klasse und Lehrperson (10 Min.) | Alle | ✅ |

**Kritischer Pfad:** Grundstruktur → Inhalte einpflegen → Quizfragen einbauen → Testing → Deployment → Abgabe

---

## 4. Realisierung

> Detaillierte technische Dokumentation: [[Realisierung_Technisch]]

### 4.1 Technologie-Entscheide

| Technologie | Einsatz | Begründung |
|------------|---------|------------|
| HTML | Seitenstruktur (separate Datei pro Block) | Standard, kein Backend nötig, läuft auf jedem Webserver |
| CSS | Design, Layout, Catppuccin Theme | Volle Gestaltungskontrolle, CSS Custom Properties für Dark/Light Mode |
| JavaScript | Quiz-Logik, Navigation, Theme-Toggle, Mobile-Menü | Interaktivität ohne Backend, direkt im Browser ausführbar |
| Tabler Icons (CDN) | Icons in Navigation und Inhalten | Kostenloses, konsistentes Icon-Set (5000+ Icons) |
| Prism.js (CDN) | Syntax-Highlighting für Codeblöcke | Einfache Integration, unterstützt SQL, PowerShell, Python, Bash |
| Catppuccin | Farbpalette (Light: Latte, Dark: Mocha) | Konsistente, angenehme Farbpalette, MIT-Lizenz |
| GitHub | Versionskontrolle, Deployment-Workflow | Teamarbeit, Änderungen nachvollziehbar, Deployment via Git-Pull |
| Plesk (Schulserver) | Hosting | Einzige verfügbare Option am Schulserver |

### 4.2 Dateistruktur

Die Plattform wurde als Multi-Seiten-Anwendung mit separaten HTML-Dateien pro Lernblock umgesetzt. Eine zentrale Konfigurationsdatei (`modules.json`) dient als Single Source of Truth für alle Module und Seiten.

```
M431/
├── index.html              ← Startseite / Dashboard
├── modules.json            ← Zentrale Modul- und Seitenkonfiguration
├── css/
│   └── style.css           ← Catppuccin Theme + Layout
├── js/
│   ├── app.js              ← Sidebar, Navigation, Theme-Toggle, Mobile-Menü
│   └── quiz.js             ← Generischer Quiz-Renderer (initQuiz)
└── pages/
    ├── M117/               ← 7 Blöcke + questions/
    ├── M122/               ← 6 Blöcke + questions/
    ├── M162/               ← 4 Blöcke + questions/
    ├── M164/               ← 5 Blöcke + questions/
    ├── M187/               ← 7 Blöcke + questions/
    └── M319/               ← 5 Blöcke + questions/
```

**34 Inhaltsblöcke** insgesamt, jeder mit eigenem Quiz. Quizfragen sind in separaten `.js`-Dateien unter `questions/` abgelegt.

### 4.3 Kernfunktionen

**modules.json & Sidebar:** `app.js` lädt `modules.json` per XHR und baut die gesamte Sidebar dynamisch auf. Kein einziges HTML-File muss für Navigationsänderungen angefasst werden.

**Quiz-System:** Die Funktion `initQuiz()` in `quiz.js` ist ein generischer Renderer. Jede Seite ruft sie mit einem Array von Fragen auf — Anzeige, Auswertung, Feedback und Fortschrittsspeicherung werden automatisch übernommen.

**Fortschritt:** Wird pro Block in `localStorage` gespeichert (`lp-progress`). Status: `mastered` (alle richtig) oder `review` (Fehler gemacht). Der Fortschrittsbalken in der Sidebar aktualisiert sich in Echtzeit.

**Dark/Light Mode:** Alle Farben als CSS Custom Properties. System-Präferenz wird automatisch erkannt, manuelle Wahl wird in `localStorage` gespeichert. Prism.js-Theme wechselt synchron.

### 4.4 Deployment

Das Deployment läuft über einen Git-basierten Workflow:

1. Änderungen lokal entwickeln und im Browser testen
2. Commit und Push auf GitHub
3. SSH-Key von Plesk ist auf GitHub autorisiert → `git pull` auf dem Schulserver zieht die aktuellen Änderungen automatisch

HTTPS ist über das in Plesk integrierte Let's Encrypt-Zertifikat aktiv.

**Erreichbarkeit:** https://INP25bL.bbzwinf.ch

---

## 5. Checkliste

### Endprodukt

| Anforderung | Status |
|-------------|--------|
| Navigationsmenü (Sidebar mit allen 6 Modulen) | ✅ |
| Mindestens 4 Themenseiten (6 Module umgesetzt) | ✅ |
| Quiz mit JavaScript (generischer Renderer) | ✅ |
| Richtig/Falsch-Feedback im Quiz | ✅ |
| Fortschrittsverfolgung | ✅ |
| Dark/Light Mode | ✅ |
| Mobile-Navigation (Hamburger-Menü) | ✅ |
| Alle 34 Inhaltsblöcke mit Inhalten befüllt | ✅ |
| Alle Quizfragen aller Module eingebaut | ✅ |
| Responsivität auf Mobile getestet | ✅ |
| Auf Schulserver deployed (HTTPS) | ✅ |

### Abgabe & Prozess

| Anforderung | Status |
|-------------|--------|
| IPERKA-Methode angewendet (inkl. Projektneustart) | ✅ |
| Projektidee genehmigt durch Lehrperson | ✅ |
| Zeitplan erstellt | ✅ |
| Aufgaben auf Teammitglieder verteilt | ✅ |
| Abhängigkeiten dokumentiert (kritischer Pfad) | ✅ |
| Dokumentation fertiggestellt (8–10 Seiten als PDF) | ✅ |
| Screenshots der Plattform erstellt | ✅ |
| Präsentation erstellt (Herangehensweise, Herausforderungen, Produkt) | ✅ |
| Alles bis 08.06.2026, 23:59 abgegeben | ✅ |

---

## 6. Fazit & Reflexion

### 6.1 Was lief gut?

**Webserver-Einrichtung:** Die Konfiguration von Plesk, Let's Encrypt und dem Git-Deployment-Workflow lief reibungslos und war eine wertvolle praktische Erfahrung mit realer Infrastruktur.

**Teamaufteilung:** Die Aufgabenteilung nach Modulen hat funktioniert — jedes Teammitglied hatte einen klar definierten Verantwortungsbereich. Dadurch konnten alle Inhalte parallel erarbeitet werden.

**Catppuccin Theme:** Die Entscheidung für ein vorgefertigtes Farbschema war richtig. Das visuelle Ergebnis ist konsistent und professionell, ohne dass viel Zeit in Designentscheidungen geflossen ist.

### 6.2 Was war schwieriger als erwartet?

**Zeitplan und Abgabedisziplin:** Einzelne Aufgaben wurden später abgeliefert als geplant, was Druck auf die nachfolgenden Schritte erzeugte. Das ist eine wichtige Erkenntnis für zukünftige Projekte.

**Zeitdruck durch Projektneustart:** Der Abbruch von Projekt 1 und der Neustart ab 19.05 liessen wenig Spielraum. Ein Grossteil der Arbeit musste ausserhalb der Unterrichtszeit (abends, Wochenende) geleistet werden.

**Theoretische Inhalte erstellen:** Das Ausformulieren der Lerninhalte für 34 Blöcke war aufwändiger als erwartet. Fachinhalte verständlich und korrekt zu erklären erfordert mehr Aufwand als technische Umsetzung.

### 6.3 Was würden wir anders machen?

Eine klarere, verbindlichere Planung mit expliziten Deadlines pro Person hätte Engpässe verhindert. Gleichzeitig war dies für alle Teammitglieder das erste Mal, dass in dieser Teamkonstellation mit einer strukturierten Projektplanung gearbeitet wurde — das war explizit das Lernziel von M431. Die Erfahrung, was funktionierende Projektplanung braucht, wurde durch das Projekt selbst gemacht.

### 6.4 Lernmoment Projektneustart

Der Projektneustart war zunächst frustrierend, im Nachhinein aber lehrreich: Die E-Phase der IPERKA-Methode hat uns gezwungen, die technischen Rahmenbedingungen sorgfältig zu prüfen, bevor wir zu weit in die Umsetzung investiert haben. Der strukturierte Abbruch und Neustart ist ein reales Szenario in der IT-Praxis und zeigt, dass eine gute Methode auch unbequeme Entscheidungen ermöglicht.

---

## 7. Präsentationsstruktur (10 Minuten)

| Block | Dauer | Inhalt | Wer |
|-------|-------|--------|-----|
| Begrüssung & Agenda | 1 Min | Projekttitel, Team vorstellen, Ablauf der Präsentation | Milan |
| Projekterklärung & IPERKA | 2 Min | Was ist die Plattform? IPERKA-Methode, Projektneustart begründen | Anna |
| Technische Umsetzung & Herausforderungen | 2 Min | Stack, Architektur, technische & organisatorische Herausforderungen | Marvin |
| Live-Demo | 3 Min | Navigation, Inhalt, Quiz, Dark/Light Mode, Mobile | Roni |
| Rückblick, Learnings & Ausblick | 2 Min | Fazit, Was haben wir gelernt?, Was würden wir anders machen? | Milan |

**Pflichtinhalte laut Briefing:**
- ✅ Herangehensweise (IPERKA-Methode, Projektneustart)
- ✅ Herausforderungen (technisch: Cloud-Abbruch, Prism/App-Architektur; organisatorisch: Zeitdruck, Abgabedisziplin)
- ✅ Erstelltes Produkt (Live-Demo)

---

## 8. Anhang

### Links & Ressourcen

| Was | Link |
|-----|------|
| Lernplattform (Schulserver) | https://INP25bL.bbzwinf.ch |
| GitHub Repository | [Repository-Link eintragen] |
| Tabler Icons | https://tabler.io/icons |
| Catppuccin Theme | https://catppuccin.com |
| Prism.js | https://prismjs.com |

### Screenshots

→ Screenshots der fertigen Plattform hier einfügen (Startseite, Modulansicht, Quiz, Dark Mode, Mobile)

---

*Erstellt: 02.06.2026 | Finale Version*
*Technische Detaildokumentation: [[Realisierung_Technisch]]*
*→ Exportieren: `dokumentation-vorlage.html` im Browser mit Ctrl+P → Als PDF speichern*
