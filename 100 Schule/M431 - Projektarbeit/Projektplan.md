# M431 – Projektplan: IT Lernplattform
**Klasse:** INP25b | **Schule:** BBZW | **Lehrperson:** Kuno Schürch
**Abgabe:** 08.06.2026 um 23:59 → kuno.schuerch@sluz.ch
**Präsentation:** 09.06.2026, 10 Minuten

---

## 👥 Team & Modulzuständigkeiten

| Person | Modul | Thema |
|--------|-------|-------|
| Roni | M117 | Informatik- und Netzinfrastruktur (IP, Protokolle, Topologien, OSI) |
| Marvin | M122 | Scriptsprache / Algorithmen (Variablen, Schleifen, Skripte) |
| Marvin | M319 | Applikationen entwerfen (OOP Grundlagen, UML) |
| Anna | M187 | Services mit ICT (Server, Cloud, Virtualisierung) |
| Milan | M162 | Datenbanken erstellen (ER-Modell, Normalisierung) |
| — | M164 | SQL Abfragen (bereits vorhanden, kein Autor nötig) |

---

## 📅 Aufgabenplan mit Deadlines

### Unterrichtstag 26.05.2026

| Aufgabe | Person | Status |
|---------|--------|--------|
| Inhalte M117 (Netzwerk) in `it-lernplattform.html` einfügen | Roni | ⬜ Offen |
| Inhalte M122 (Scriptsprache) in `it-lernplattform.html` einfügen | Marvin | ⬜ Offen |
| Inhalte M319 (Applikationen) in `it-lernplattform.html` einfügen | Marvin | ⬜ Offen |
| Inhalte M187 (Services) in `it-lernplattform.html` einfügen | Anna | ⬜ Offen |
| Inhalte M162 (Datenbanken) in `it-lernplattform.html` einfügen | Milan | ⬜ Offen |
| Quizfragen pro Modul ausarbeiten (je 2–3 Fragen, Vorlage unten) | Alle | ⬜ Offen |
| Dokumentation Kapitel 3 (Zeitplan) mit Namen befüllen | Milan | ⬜ Offen |

### Unterrichtstag 02.06.2026

| Aufgabe | Person | Status |
|---------|--------|--------|
| Design verfeinern, Navigation testen | Roni | ⬜ Offen |
| Responsivität auf Mobile prüfen | Anna | ⬜ Offen |
| Deployment auf Schulwebserver BBZW | Marvin | ⬜ Offen |
| Screenshots der fertigen Plattform erstellen | Alle | ⬜ Offen |
| Dokumentation Kapitel 5 (Checkliste) aktualisieren | Milan | ⬜ Offen |
| Dokumentation Kapitel 6 (Fazit & Reflexion) schreiben | Alle | ⬜ Offen |
| URL in Dokumentation (Kapitel 4.4 & Anhang) eintragen | Marvin | ⬜ Offen |

### Bis 08.06.2026 (Abgabe)

| Aufgabe | Person | Status |
|---------|--------|--------|
| Screenshots in Dokumentation (Kapitel 7) einfügen | Anna | ⬜ Offen |
| Dokumentation als PDF exportieren (Ctrl+P im Browser) | Milan | ⬜ Offen |
| Präsentation erstellen (Vorlage unten) | Alle | ⬜ Offen |
| Alles per E-Mail an kuno.schuerch@sluz.ch senden | Milan | ⬜ Offen |

---

## 📦 Inhaltsskizze pro Modul

Jedes Modul braucht **4 Inhaltsblöcke** + **2–3 Quizfragen** in der Plattform.
Die `placeholder-text`-Absätze in den `section-block`-Divs ersetzen.

### M117 – Netzwerk (Roni)
> Dateistelle: `<div id="page-netzwerk">` in `it-lernplattform.html`

- **Block 1 – Was ist ein Netzwerk?**
  Def. Netzwerk, Zweck (Ressourcenteilung, Kommunikation), Beispiele: LAN, WAN, Internet
- **Block 2 – IP-Adressen & Subnetting**
  IPv4-Format (32 Bit, dotted decimal), IPv6 kurz erwähnen, Subnetzmaske, CIDR-Notation (/24 etc.)
- **Block 3 – Netzwerktopologien**
  Stern (häufigste heute), Bus, Ring, Mesh — je 1 Satz Beschreibung + Vor/Nachteil
- **Block 4 – Protokolle**
  OSI-Modell (7 Schichten, kurz), TCP vs UDP, DNS (Namen→IP), DHCP (IP automatisch vergeben)

### M122 – Scriptsprache / Algorithmen (Marvin)
> Dateistelle: neues `<div id="page-m122">` anlegen (Sidebar-Eintrag nicht vergessen!)

- **Block 1 – Was ist ein Algorithmus?**
  Definition, Alltagsbeispiel (Kochrezept), Eigenschaften (endlich, eindeutig, ausführbar)
- **Block 2 – Variablen & Datentypen**
  Variable = Datenbehälter, Typen: int, string, bool, float — je 1 Beispiel
- **Block 3 – Kontrollstrukturen**
  if/else, for-Schleife, while-Schleife — je 1 Pseudocode-Beispiel
- **Block 4 – Einfache Skripte**
  Was kann ein Skript automatisieren? Beispiel: Dateien umbenennen, Backup erstellen

### M319 – Applikationen entwerfen (Marvin)
> Dateistelle: neues `<div id="page-m319">` anlegen

- **Block 1 – Softwareentwicklungsprozess**
  Analyse → Design → Implementierung → Test → Wartung
- **Block 2 – OOP Grundlagen**
  Klasse, Objekt, Attribut, Methode — Beispiel: Klasse `Auto` mit Attributen Farbe/Marke
- **Block 3 – UML Klassendiagramm**
  Was zeigt ein Klassendiagramm? Einfaches Beispiel mit 2 Klassen und Beziehung
- **Block 4 – Grundprinzipien OOP**
  Kapselung (private/public), Vererbung (Elternklasse → Kindklasse), kurzes Beispiel

### M187 – Services mit ICT (Anna)
> Dateistelle: neues `<div id="page-m187">` anlegen

- **Block 1 – Was ist ein Server?**
  Client-Server-Modell, Unterschied Client/Server, Beispiele (Webserver, Mailserver)
- **Block 2 – Dienste & Protokolle**
  HTTP/HTTPS, FTP, SSH, SMTP — je 1 Satz was der Dienst macht
- **Block 3 – Cloud-Konzepte**
  IaaS / PaaS / SaaS erklären, Beispiele (AWS, Azure, Google Cloud), Vor-/Nachteile
- **Block 4 – Virtualisierung**
  Was ist eine VM? Hypervisor Typ 1 vs 2, Container (Docker kurz erwähnen)

### M162 – Datenbanken erstellen (Milan)
> Dateistelle: neues `<div id="page-m162">` anlegen

- **Block 1 – Was ist eine relationale Datenbank?**
  Tabellen, Zeilen (Datensätze), Spalten (Attribute), Primärschlüssel
- **Block 2 – ER-Modell**
  Entität, Attribut, Beziehung (1:1, 1:n, m:n) — einfaches Beispiel (Schule: Schüler ↔ Klasse)
- **Block 3 – Normalisierung**
  1NF (atomare Werte), 2NF (volle Abhängigkeit vom PK), 3NF (keine transitiven Abhängigkeiten) — je 1 kurzes Beispiel
- **Block 4 – Von ER zum Schema**
  Wie wird ein ER-Modell in Tabellen umgewandelt? Fremdschlüssel einführen

### M164 – SQL Abfragen (bereits vorhanden)
> Dateistelle: `<div id="page-sql">` — Inhalte bereits als Platzhalter vorhanden

- SELECT, INSERT, UPDATE, DELETE (Syntax + je 1 Beispiel)
- WHERE-Klausel, ORDER BY, LIMIT
- INNER JOIN, LEFT JOIN mit Beispiel
- Datenbankdesign kurz (bereits durch M162 abgedeckt, hier SQL-fokussiert)

---

## ❓ Quizfragen-Vorlage (JavaScript)

Jedes Modul braucht mindestens 2 Fragen im `quizData`-Objekt in `it-lernplattform.html`.
**Format:**
```javascript
{
  q: "Frage hier?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correct: 0,  // Index der richtigen Antwort (0 = A, 1 = B, ...)
  explanation: "Kurze Erklärung warum diese Antwort richtig ist."
}
```

### Beispiel-Quizfragen pro Modul (zum Anpassen)

**M117 – Netzwerk**
```javascript
{ q: "Auf welcher Schicht des OSI-Modells arbeitet ein Switch?",
  options: ["Schicht 1 (Bitübertragung)", "Schicht 2 (Sicherung)", "Schicht 3 (Vermittlung)", "Schicht 7 (Anwendung)"],
  correct: 1,
  explanation: "Ein Switch arbeitet auf Schicht 2 (Data Link) und leitet Frames anhand von MAC-Adressen weiter." }

{ q: "Was bedeutet die CIDR-Notation /24?",
  options: ["24 Geräte im Netz", "Die ersten 24 Bit sind Netzanteil", "24 freie IP-Adressen", "24 Bit für Hostanteil"],
  correct: 1,
  explanation: "/24 bedeutet, dass die ersten 24 Bit der IP-Adresse den Netzanteil definieren (Subnetzmaske 255.255.255.0)." }
```

**M122 – Scriptsprache**
```javascript
{ q: "Was ist eine Variable in der Programmierung?",
  options: ["Ein fester Wert der sich nie ändert", "Ein benannter Speicherbereich für Daten", "Eine mathematische Formel", "Ein Programmbefehl"],
  correct: 1,
  explanation: "Eine Variable ist ein benannter Speicherbereich, der einen Wert enthält, der sich ändern kann." }

{ q: "Was macht eine for-Schleife?",
  options: ["Sie führt Code genau einmal aus", "Sie wiederholt Code eine bestimmte Anzahl von Malen", "Sie verzweigt das Programm", "Sie beendet das Programm"],
  correct: 1,
  explanation: "Eine for-Schleife wiederholt einen Codeblock eine vorab bekannte Anzahl von Durchläufen." }
```

**M319 – Applikationen**
```javascript
{ q: "Was ist eine Klasse in der OOP?",
  options: ["Eine Variable", "Ein Schulzimmer", "Eine Vorlage für Objekte", "Eine Datenbankabfrage"],
  correct: 2,
  explanation: "Eine Klasse ist ein Bauplan/Vorlage, aus dem Objekte mit bestimmten Attributen und Methoden erzeugt werden." }

{ q: "Was beschreibt Vererbung in der OOP?",
  options: ["Daten werden gelöscht", "Eine Klasse übernimmt Eigenschaften einer anderen Klasse", "Objekte werden kopiert", "Methoden werden versteckt"],
  correct: 1,
  explanation: "Vererbung erlaubt es einer Kindklasse, Attribute und Methoden der Elternklasse zu übernehmen und zu erweitern." }
```

**M187 – Services**
```javascript
{ q: "Was ist IaaS?",
  options: ["Internet as a Service", "Infrastructure as a Service", "Integration as a Service", "Information as a Service"],
  correct: 1,
  explanation: "IaaS (Infrastructure as a Service) stellt virtuelle Hardware wie Server, Speicher und Netzwerk über die Cloud bereit." }

{ q: "Was ist der Unterschied zwischen einer VM und einem Container?",
  options: ["Kein Unterschied", "Container teilen den OS-Kernel des Hosts, VMs haben ein eigenes OS", "VMs sind schneller als Container", "Container brauchen mehr Speicher"],
  correct: 1,
  explanation: "Container teilen den OS-Kernel des Hostsystems und sind deshalb leichtgewichtiger als VMs, die ein vollständiges Betriebssystem virtualisieren." }
```

**M162 – Datenbanken**
```javascript
{ q: "Was ist ein Primärschlüssel (Primary Key)?",
  options: ["Ein Passwort für die Datenbank", "Ein eindeutiger Bezeichner für jeden Datensatz", "Der Name der Tabelle", "Eine gespeicherte Abfrage"],
  correct: 1,
  explanation: "Ein Primärschlüssel ist ein Attribut (oder eine Kombination), das jeden Datensatz in einer Tabelle eindeutig identifiziert." }

{ q: "Was fordert die erste Normalform (1NF)?",
  options: ["Alle Tabellen müssen verknüpft sein", "Alle Attributwerte müssen atomar (unteilbar) sein", "Jede Tabelle braucht einen Fremdschlüssel", "Es darf nur eine Tabelle geben"],
  correct: 1,
  explanation: "Die 1. Normalform verlangt, dass alle Spalten nur atomare (nicht weiter teilbare) Werte enthalten – keine Listen oder Gruppen in einer Zelle." }
```

---

## 🗂️ IPERKA-Checkliste

Vollständige Planung in [[IPERKA_Planung]] — hier die Kurzübersicht.

### Projekt 1 (Self-Hosted Cloud) – ABGEBROCHEN ❌
- [x] I – 12.05: Nextcloud-Stack recherchiert
- [x] P – 12.05: Architektur & Zeitplan definiert
- [x] E – 19.05: Abbruch (Schulserver kein Root, Heimserver zu riskant)

### Projekt 2 (IT Lernplattform) – AKTIV ✅
- [x] I – 19.05: Neue Anforderungen analysiert, Themen festgelegt
- [x] P – 19.05: Struktur, Aufgaben, Zeitplan definiert
- [x] E – 19.05: Projekt genehmigt durch Lehrperson
- [ ] R – 19.05–02.06: **Inhalte einfügen, Quiz fertigstellen, Deployment**
- [ ] K – 02.06–08.06: Testing, Review, Fehlerbehebung
- [ ] A – 08.06: Reflexion, Dokumentation, Abgabe

---

## 🎤 Präsentationsstruktur (10 Minuten)

> Empfehlung: 3–4 Slides + Live-Demo der Plattform

| Block | Dauer | Inhalt | Wer |
|-------|-------|--------|-----|
| **Einstieg** | 1 Min | Projekttitel, Team vorstellen, kurzer Überblick | Alle |
| **Herangehensweise** | 2 Min | IPERKA-Methode erklärt, Projektneustart begründen | Roni |
| **Produkt-Demo** | 4 Min | Live-Vorführung der Plattform: Navigation, Inhalt, Quiz | Marvin |
| **Herausforderungen** | 2 Min | Technisch (Cloud-Abbruch, statisches HTML) & organisatorisch | Anna |
| **Fazit** | 1 Min | Was haben wir gelernt? Ausblick | Milan |

**Pflichtinhalte laut Briefing:**
- [x] Herangehensweise (IPERKA)
- [x] Herausforderungen (technisch & organisatorisch)
- [x] Erstelltes Produkt (Live-Demo)

---

## ✅ Offene TODOs nach Priorität

### 🔴 Hoch (blockiert andere Aufgaben)
- [ ] Inhalte aller Module in `it-lernplattform.html` einfüllen (26.05)
- [ ] Quizfragen pro Modul ins `quizData`-Objekt eintragen (26.05)
- [ ] Namen im Titelblatt der Dokumentation eintragen

### 🟡 Mittel (wichtig, aber nicht blockierend)
- [ ] Zeitplan in Dokumentation mit Verantwortlichen befüllen
- [ ] Deployment auf Schulserver (02.06)
- [ ] URL in Dokumentation eintragen

### 🟢 Niedrig (polish & abschluss)
- [ ] Screenshots erstellen und in Dokumentation einfügen
- [x] Fazit & Reflexion schreiben (Kapitel 6)
- [x] Responsivität auf Mobile testen
- [x] Präsentation als Datei erstellen
- [x] Alles als PDF exportieren und abgeben (08.06, 23:59)

---

## 🔗 Wichtige Links & Pfade

| Was | Wo |
|-----|-----|
| Lernplattform (Datei) | `it-lernplattform.html` |
| Dokumentation (Datei) | `dokumentation-vorlage.html` |
| IPERKA-Notizen | [[IPERKA_Planung]] |
| Schulserver URL | *nach Deployment eintragen* |
| Abgabe-Mail | kuno.schuerch@sluz.ch |

---

*Zuletzt aktualisiert: 26.05.2026*
