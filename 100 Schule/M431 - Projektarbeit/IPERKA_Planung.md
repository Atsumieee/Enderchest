---
title: "M431 IPERKA Planung"
tags: [m431, projekt, schule]
created: 2026-06-04
status: draft
publish: false
todo: false
---

# IPERKA Planung – M431 IT Lernplattform

---

## Projekt 1: Self-Hosted Cloud mit Nextcloud ❌ ABGEBROCHEN

### I – Informieren (12.05.2026)
- Modulanforderungen M431 analysiert
- Recherche zu Projektideen im Bereich Plattformentwicklung
- Entscheid für Self-Hosted Cloud mit Nextcloud auf privatem Linux-PC
- Technologien recherchiert: Ubuntu Server, Nginx, MariaDB, WireGuard VPN, Let's Encrypt, Duck DNS
- Ziel: Nextcloud öffentlich per HTTPS erreichbar, SSH-Verwaltung via WireGuard VPN

### P – Planen (12.05.2026)
- Systemarchitektur definiert: HTTPS → Nginx → Nextcloud, VPN für Admin-Zugriff
- Installationsreihenfolge mit Abhängigkeiten festgelegt
- Aufgaben auf Teammitglieder verteilt
- Zeitplan auf verfügbare Unterrichtstage aufgeteilt

### E – Entscheiden (19.05.2026) → ABBRUCH
**Abbruchgründe:**
1. Schulserver ist reiner Webserver (shared hosting) → kein Root-Zugriff → Nextcloud, MariaDB, WireGuard nicht installierbar
2. Heimserver-Betrieb: zu hohes Risiko (Verfügbarkeit, Netzwerk, Sicherheit, Komplexität)
3. **Entscheid: Projektneustart** — IPERKA-konform, da in der E-Phase erkannt

> 💡 Der bewusste Abbruch nach Phase E ist kein Scheitern, sondern ein Qualitätsmerkmal der IPERKA-Methode.

---

## Projekt 2: IT Lernplattform ✅ AKTIV

### I – Informieren (19.05.2026)
- Neue Rahmenbedingungen analysiert: Schulserver = statischer Webserver (HTML/CSS/JS only)
- Anforderungen neu definiert: statische Lernplattform für IT-Einsteiger
- Themen festgelegt anhand Schweizer Modulbaukasten:
  - M117 Netzinfrastruktur (Roni)
  - M122 Scriptsprache (Marvin)
  - M319 Applikationen (Marvin)
  - M187 Services/Cloud (Anna)
  - M162 Datenbanken (Milan)
  - M164 SQL (bereits vorhanden)
- Inhalte basieren auf eigenen Zusammenfassungen des Teams

### P – Planen (19.05.2026)
- Seitenstruktur definiert: Startseite + 6 Themen-Seiten, pro Thema 4 Blöcke + Quiz
- Technologie-Stack festgelegt: HTML / CSS / JavaScript, kein Backend, kein Framework
- Hosting: Schulwebserver BBZW
- Aufgabenverteilung (Details in [[Projektplan]])
- Zeitplan:
  - 26.05: Inhalte & Quizfragen
  - 02.06: Testing & Deployment
  - 08.06: Abgabe
  - 09.06: Präsentation

### E – Entscheiden (19.05.2026) ✅ GENEHMIGT
- Entscheid für statisches HTML/CSS/JS ohne externe Frameworks
- Hosting auf Schulwebserver der BBZW
- Inhalte aus eigenen Lernmaterialien des Teams
- **Projekt genehmigt durch Lehrperson Kuno Schürch**

### R – Realisieren (19.05.2026 – 02.06.2026)
- [x] Grundstruktur der Website (Navigation, Sidebar, Seitenaufbau) ✅ erstellt
- [x] Quiz-Logik mit JavaScript implementiert ✅
- [x] Inhalte M117 (Roni) einfügen
- [x] Inhalte M122 (Marvin) einfügen
- [x] Inhalte M319 (Marvin) einfügen
- [x] Inhalte M187 (Anna) einfügen
- [x] Inhalte M162 (Milan) einfügen
- [x] Quizfragen aller Module einbauen
- [x] Design verfeinern
- [x] Website auf Schulserver deployed

### K – Kontrollieren (02.06.2026 – 08.06.2026)
- [x] Funktionstest aller Seiten und Quiz-Logik
- [x] Inhalte fachlich geprüft (gegenseitiges Review)
- [x] Test auf Schulserver (Chrome, Firefox, Mobile)
- [x] Dokumentation auf Vollständigkeit geprüft

### A – Auswerten (08.06.2026)
- [x] Reflexion über Projektverlauf inkl. Neustart
- [x] Was lief gut / was würden wir anders machen?
- [x] Dokumentation fertiggestellt und als PDF exportiert
- [x] Präsentation vorbereitet und geprobt

---

## Reflexionsnotizen (nach Abschluss ausfüllen)

### Was lief gut?
> *Hier nach Projektabschluss ausfüllen*

### Was war schwieriger als erwartet?
> *Hier nach Projektabschluss ausfüllen*

### Was würden wir beim nächsten Projekt anders machen?
> *Hier nach Projektabschluss ausfüllen*

### Lernmoment Projektneustart
> *Was hat der Neustart gezeigt? Wie hat IPERKA geholfen?*

---

*Zuletzt aktualisiert: 26.05.2026*
