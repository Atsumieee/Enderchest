# Zeitplanung

- [x] Ist Stand in Dokumentation schreiben
	
- [ ]
    
- Was sind unsere Schwierigkeiten
    
- Was war einfach?
    

# IPERKA

<aside> 💡

## Informieren

- Was ist unser Projekt?
- Wie machen wir das?
- Mit was für Tools machen wir das?
- Wer nutzt es?
- Wann muss es beendet sein?
- Offene Fragen / Ist etwas unklar? </aside>

**Unser Projekt - Was ist unser Projekt**

Wir machen eine Lernplattform welche für Neulinge im IT Wesen zur verfügung steht.

Unser Projekt ist eine kleine IT-Lernplattform für Berufseinsteiger und Anfänger im IT-Bereich. Ziel der Website ist es, grundlegende IT-Themen einfach und verständlich zu erklären, damit Neulinge einen besseren Einstieg in die Informatik bekommen.

Die Lernplattform enthält mehrere Themenbereiche wie Netzwerke, Hardware und Betriebssysteme. Jede Seite erklärt die Grundlagen mit kurzen Texten, Beispielen und einer übersichtlichen Struktur. Damit Nutzer sich leichter zurechtfinden, gibt es ein Navigationsmenü, über das man zwischen den Themen wechseln kann. Zusätzlich wird ein kleines Quiz mit JavaScript eingebaut. Dadurch können Benutzer ihr Wissen testen und die Inhalte besser verstehen.

Das Projekt ist besonders sinnvoll, weil viele Menschen Schwierigkeiten haben, komplexe IT-Themen am Anfang zu verstehen. Die Plattform soll deshalb Informationen einfach darstellen und beim Lernen helfen.

Gleichzeitig zeigt das Projekt wichtige Kenntnisse in der Webentwicklung. HTML wird für die Struktur der Seiten verwendet, CSS für das Design und JavaScript für interaktive Funktionen wie das Quiz.

Wichtige Punkte bei diesem Projekt sind eine klare Benutzeroberfläche, verständliche Erklärungen und eine einfache Navigation. Außerdem muss darauf geachtet werden, dass die Website übersichtlich bleibt und auf verschiedenen Geräten funktioniert. Das Quiz sollte korrekt arbeiten und dem Nutzer direkt zeigen, ob Antworten richtig oder falsch sind

Zielgruppe – Wer nutzt die Plattform?

Die Plattform richtet sich an Personen, die neu in die IT einsteigen, zum Beispiel Lernende am Anfang ihrer Ausbildung. Sie ist speziell für Nutzer gedacht, die noch wenig oder keine Vorkenntnisse haben.

Die Inhalte werden deshalb einfach und verständlich erklärt, ohne unnötig komplizierte Fachbegriffe. Ziel ist, dass auch Einsteiger die Themen gut nachvollziehen und Schritt für Schritt verstehen können.

Zusätzlich gibt es ein Quiz, mit dem überprüft werden kann, ob die behandelten Inhalte verstanden wurden. So können Nutzer ihr Wissen direkt testen und erkennen, bei welchen Themen sie noch unsicher sind.

Tools - Mit was für Tools machen wir das?

Wir verwenden verschiedene Tools und Hilfsmittel die uns helfen unser Projekt bestmöglich zu erarbeiten. EIne

KI (ClaudeAI, ChatGPT)

<aside> 📝

## Planen

- Welche Ressourcen stehen zur Verfügung? (Material, Infrastruktur, Personal, Zeitbedarf)
- Was für Prioritäten hat unser Projekt?
- Haben wir noch eine Erweiterung?
- Wer bearbeitet welche Teil-Aufgaben?
- Ist die Zeitliche Planung realistisch?
- Sind die Meilensteine zeitlich definiert?
- Welches sind die Prüfkriterien?

</aside>

Für den Inhalt unserer Webseite verwenden wir verschiedenen Module von unserem ersten Lehrjahr das erste Semester. Jedes Mitglied unserer Gruppe schaut mindestens ein Modul an. Hier eine Tabelle für den Überblick wer welches Modul von unserer Gruppe anschaut.

|NAME|MODUL|INFO|
|---|---|---|
|Milan|M162||
|Marvin|M122, M316, M164|M164 (Haben wir schon eine komplette Zusammenfassung)|
|Roni|M117||
|Anna|M187 ÜK||

<aside> ⚖️

## Entscheiden

</aside>

<aside> ⚒️

## Realisieren

</aside>

<aside> 🔎

## Kontrollieren

</aside>

<aside> ⚙

## Auswerten

</aside>

## 🔴 Projekt 1: Self-Hosted Cloud

> Nextcloud & WireGuard VPN **Zeitraum:** 12.05.2026 – 19.05.2026

### I – Informieren

- Anforderungen des Moduls analysiert
- Recherche zu möglichen Projektideen im Bereich Plattformentwicklung
- Entscheid für eine Self-Hosted Cloud-Infrastruktur mit Nextcloud auf einem Linux-PC bei einem Teammitglied zuhause
- Technologien recherchiert: Ubuntu Server, WireGuard VPN, Nginx, MariaDB, Let’s Encrypt, Duck DNS

### P – Planen

- Systemarchitektur definiert: zwei Zugriffsebenen (öffentlich via HTTPS für Nextcloud, VPN via WireGuard für SSH-Administration)
- Installationsreihenfolge mit Abhängigkeiten festgelegt
- Aufgaben grob auf Teammitglieder verteilt
- Zeitplan auf die verfügbaren Unterrichtstage aufgeteilt

### E – Entscheiden

> ⚠️ **Projektneustart notwendig**

- Der von der Schule zur Verfügung gestellte Server ist ein reiner Webserver ohne Root-Zugriff
- Installation von Nextcloud, WireGuard und MariaDB nicht möglich
- Eigener Heimserver wurde ebenfalls verworfen aufgrund von Risiken (Verfügbarkeit, Netzwerk, Komplexität)

---

## 🟢 Projekt 2: IT-Lernplattform / Lexikon

> Statische Webseite auf Schulserver **Zeitraum:** 19.05.2026 – 08.06.2026

### I – Informieren

- Neue Rahmenbedingungen analysiert: Schulserver ist ein reiner Webserver (HTML/CSS/JS)
- Anforderungen neu definiert: statische Webseite die auf dem Schulserver läuft
- Ziel: Lernplattform für Einsteiger zu grundlegenden IT-Themen mit integrierten Mini-Tests
- Themen: Netzwerk, Hardware, Betriebssysteme, SQL
- Inhalte werden durch das Team selbst erarbeitet und aufbereitet

### P – Planen

- Struktur festgelegt: Startseite, 4 Themen-Seiten, pro Thema mehrere Inhaltsabschnitte + Multiple-Choice-Quiz
- Technologien: HTML, CSS, JavaScript (statisch, kein Backend nötig)
- Aufgaben verteilt: Inhalt pro Thema, Design/Navigation, Quiz-Logik, Testing
- Zeitplan auf die verbleibenden Unterrichtstage aufgeteilt

### E – Entscheiden

> ✅ **Projekt genehmigt – Realisierung startet**

- Umsetzung mit reinem HTML/CSS/JS ohne externe Abhängigkeiten
- Hosting auf dem Schulwebserver
- Inhalte basieren auf eigenen Zusammenfassungen und Lernmaterialien des Teams

# Projekt 1

# Projekt 2

<aside> 📝

## Planen

### Website

### Lerninhalte

#### M117

- IP
- Routing

#### M122

- Basic Language

#### M319

- Basic Language

#### M162

</aside>