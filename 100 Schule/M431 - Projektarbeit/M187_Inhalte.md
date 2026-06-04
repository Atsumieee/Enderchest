---
title: M187 - ICT-Arbeitsplatz mit Betriebssystem in Betrieb nehmen
tags:
  - hardware
  - betriebssystem
  - linux
  - terminal
  - vm
  - virtualisierung
  - ergonomie
  - schule
  - modul-187
created: 2026-05-31
status: draft
publish: false
source: https://m187.ict-bz.ch/
---

# M187 – ICT-Arbeitsplatz mit Betriebssystem in Betrieb nehmen
> Lerninhalt für die IT-Lernplattform | Basiert auf Modul 187 – ICT-Berufsbildung Schweiz
> Handlungsziele: Hardware verbinden, BS installieren, Netzwerk einrichten, Fehler beheben, Ergonomie
> Roter Faden: Im Verlauf der Blöcke wird eine Linux-VM aufgesetzt und schrittweise in Betrieb genommen.
> Struktur: 7 Inhaltsblöcke + Quizfragen (bereit zum Einfügen in HTML)

---

## ──────────────────────────────────────
## BLOCK 1 – Hardware verbinden & Peripheriegeräte
## ──────────────────────────────────────
> Handlungsziele 1 & 6: Komponenten verbinden, Hardwareanforderungen prüfen, Treiber beschaffen

### Aufbau eines ICT-Arbeitsplatzes

Ein ICT-Arbeitsplatz besteht aus dem Computer selbst und den **Peripheriegeräten** – also allen Geräten, die daran angeschlossen werden.

| Kategorie | Geräte | Anschlüsse |
|-----------|--------|-----------|
| **Eingabe** | Tastatur, Maus, Scanner, Webcam | USB, PS/2, Bluetooth |
| **Ausgabe** | Monitor, Drucker, Lautsprecher | HDMI, DisplayPort, USB, 3.5mm Klinke |
| **Speicher** | Externe Festplatte, USB-Stick | USB, USB-C, Thunderbolt |
| **Netzwerk** | Netzwerkkabel, WLAN-Adapter | RJ-45 (LAN), USB |

### Wichtige Anschlüsse kennen

| Anschluss | Aussehen | Verwendung |
|-----------|---------|-----------|
| **USB-A** | Rechteckig | Tastatur, Maus, USB-Stick |
| **USB-C** | Oval, klein | Neuere Geräte, Laden, Datenübertragung |
| **HDMI** | Trapezförmig | Monitor, TV – Bild + Ton |
| **DisplayPort** | Ähnlich HDMI, eine Ecke abgeschrägt | Monitor – höhere Auflösungen |
| **RJ-45** | Breiteres Telefonkabel | Netzwerk (LAN) |
| **3.5mm Klinke** | Runder Audiostecker | Kopfhörer, Mikrofon, Lautsprecher |

### Hardwareanforderungen prüfen (HZ 6)

Vor der Installation eines Betriebssystems oder einer Anwendung müssen die **Mindestanforderungen** geprüft werden.

**Beispiel: Windows 11 Mindestanforderungen**

| Komponente | Mindestanforderung |
|-----------|-------------------|
| Prozessor | 1 GHz, 2 Kerne, 64-Bit |
| RAM | 4 GB |
| Speicher | 64 GB freier Platz |
| Grafik | DirectX 12, WDDM 2.0 |
| TPM | Version 2.0 |

**Wie prüft man die eigene Hardware?**
- `Win + R` → `msinfo32` oder `dxdiag` → zeigt alle Systeminfos
- Rechtsklick auf „Dieser PC" → Eigenschaften
- Task-Manager (`Strg + Shift + Esc`) → Reiter „Leistung"

### Treiber – Brücke zwischen Hardware und Betriebssystem

Ein **Treiber** ist Software, die dem Betriebssystem erklärt, wie es mit einem Gerät kommunizieren soll. Ohne den richtigen Treiber funktioniert ein Gerät nicht oder nur eingeschränkt.

**Treiber beschaffen:**
1. Automatisch via Windows Update oder Geräte-Manager
2. Hersteller-Website (z.B. nvidia.com, hp.com) – immer die aktuellste Version
3. Geräte-Manager: `Win + X` → Geräte-Manager → Rechtsklick auf Gerät → „Treiber aktualisieren"

> **Tipp:** Nach einer Neuinstallation zuerst Grafiktreiber, dann Chipsatz-Treiber installieren.

---

### 🧩 Mini-Quiz: Block 1

**Frage 1:** Welchen Anschluss verwendet man für einen Monitor, wenn man Bild und Ton gleichzeitig übertragen will?
- A) USB-A
- B) VGA
- C) **HDMI** ✅
- D) RJ-45

*Erklärung: HDMI überträgt gleichzeitig digitales Bild und Ton. VGA ist ein älterer Standard und überträgt nur analoges Bild.*

**Frage 2:** Warum braucht ein Gerät einen Treiber?
- A) Um Strom zu sparen
- B) **Damit das Betriebssystem weiss, wie es mit dem Gerät kommunizieren soll** ✅
- C) Um das Gerät schneller zu machen
- D) Nur ältere Geräte brauchen Treiber

*Erklärung: Ein Treiber übersetzt die allgemeinen Betriebssystem-Befehle in gerätespezifische Anweisungen – ohne ihn erkennt das System das Gerät nicht korrekt.*

---

## ──────────────────────────────────────
## BLOCK 2 – Betriebssystem installieren & erste VM aufsetzen
## ──────────────────────────────────────
> Handlungsziele 2 & 7: BS + Anwendungen installieren, Partitionen und Dateisysteme einrichten, Bootmanager
> 🖥️ Praxis: Ubuntu Linux in VirtualBox installieren

### Installationsablauf (allgemein)

Das Installieren eines Betriebssystems läuft immer nach dem gleichen Grundprinzip ab:

1. **Boot-Medium erstellen** – ISO-Datei auf USB-Stick schreiben (z.B. mit Rufus)
2. **BIOS/UEFI konfigurieren** – Bootreihenfolge auf USB-Stick setzen (`F2`, `F12` oder `Del`)
3. **Von USB booten** – Computer startet den Installer
4. **Partitionieren** – Festplatte aufteilen
5. **Installation** – Dateien werden kopiert (~10–30 Min.)
6. **Erstkonfiguration** – Sprache, Benutzerkonto, Netzwerk

### Partitionen und Dateisysteme (HZ 7)

Eine **Partition** ist ein logisch abgetrennter Bereich einer Festplatte. Jede Partition bekommt ein eigenes **Dateisystem**.

**Typische Partitionsstruktur unter Windows:**

| Partition | Grösse | Zweck |
|-----------|--------|-------|
| EFI-Partition | 100–500 MB | Boot-Informationen (UEFI) |
| Systempartition (C:\\) | 50–500 GB | Betriebssystem + Programme |
| Datenpartition (D:\\) | Rest | Benutzerdaten, optional |

**Typische Partitionsstruktur unter Linux:**

| Partition | Dateisystem | Zweck |
|-----------|------------|-------|
| `/` (Root) | ext4 | Alles – Betriebssystem und Daten |
| `/boot/efi` | FAT32 | Bootloader (UEFI) |
| `swap` | swap | Auslagerung bei vollem RAM |

**Verbreitete Dateisysteme:**

| Dateisystem | Betriebssystem | Besonderheiten |
|-------------|---------------|----------------|
| **NTFS** | Windows | Zugriffsrechte, Journaling, grosse Dateien |
| **ext4** | Linux | Standard unter Linux, stabil, schnell |
| **FAT32** | Alle | Kompatibel, max. 4 GB pro Datei |
| **exFAT** | Alle | Wie FAT32 aber ohne Dateigrössen-Limit |

### Bootmanager

Der **Bootmanager** läuft beim PC-Start und entscheidet, welches Betriebssystem gestartet wird.
- **Windows:** `bcdedit` im Terminal
- **Linux:** GRUB – Konfiguration unter `/etc/default/grub`

---

### 🖥️ Praktische Übung: Linux-VM in VirtualBox aufsetzen

Statt Linux direkt auf dem Computer zu installieren, nutzen wir eine **virtuelle Maschine (VM)**. Die VM läuft wie ein normales Programm auf deinem Windows-Computer, verhält sich aber wie ein eigenständiger Computer.

**Was ist VirtualBox?**
VirtualBox ist ein kostenloser **Typ-2-Hypervisor** von Oracle. Es läuft als normales Programm auf Windows, macOS oder Linux und ermöglicht das Ausführen weiterer Betriebssysteme in einer isolierten Umgebung.

**Schritt 1 – VirtualBox installieren:**
1. Gehe auf https://www.virtualbox.org und lade die aktuelle Version für Windows herunter
2. Installiere VirtualBox mit dem Installer (Standardeinstellungen sind in Ordnung)

**Schritt 2 – Ubuntu ISO herunterladen:**
1. Gehe auf https://ubuntu.com/download/server und lade **Ubuntu Server 24.04 LTS** herunter
2. Die ISO-Datei ist ca. 2.5 GB gross

> **Warum Ubuntu Server?** Die Server-Edition hat keine grafische Oberfläche – nur ein Terminal. Das zwingt uns, mit Befehlen zu arbeiten, was genau das Ziel ist.

**Schritt 3 – Neue VM erstellen:**
1. VirtualBox öffnen → „Neu"
2. Name: `Ubuntu-M187`, Typ: `Linux`, Version: `Ubuntu (64-bit)`
3. RAM: mindestens **2048 MB** (2 GB)
4. Neue virtuelle Festplatte erstellen: **20 GB**, Format VDI, dynamisch alloziert
5. ISO-Datei unter „Massenspeicher" → optisches Laufwerk einlegen

**Schritt 4 – Ubuntu Server installieren:**
1. VM starten → Ubuntu-Installer startet
2. Sprache wählen: English (empfohlen für Terminal-Arbeit)
3. Partitionierung: „Use an entire disk" (Standard)
4. Benutzername und Passwort setzen – gut merken!
5. **OpenSSH Server installieren** ✅ (Häkchen setzen – wird in Block 4 gebraucht)
6. Installation abwarten und VM neu starten

**Schritt 5 – Erster Login:**
```
Ubuntu 24.04 LTS ubuntu tty1
ubuntu login: deinbenutzername
Password: ••••••••

Welcome to Ubuntu 24.04 LTS
$
```
Du siehst nur den Prompt `$` – das ist das **Terminal**. Willkommen in Linux!

---

### 🧩 Mini-Quiz: Block 2

**Frage 1:** Was ist eine Partition auf einer Festplatte?
- A) Ein Fehler auf der Festplatte
- B) **Ein logisch abgetrennter Bereich der Festplatte mit eigenem Dateisystem** ✅
- C) Eine Sicherungskopie aller Daten
- D) Ein Typ von Datei

*Erklärung: Partitionen unterteilen eine physische Festplatte in logische Bereiche mit eigenem Dateisystem – z.B. eine Partition für das Betriebssystem und eine für Daten.*

**Frage 2:** Welches Dateisystem ist Standard unter Windows und unterstützt Zugriffsrechte?
- A) FAT32
- B) ext4
- C) exFAT
- D) **NTFS** ✅

*Erklärung: NTFS unterstützt Zugriffsrechte, Verschlüsselung, Journaling und Dateien über 4 GB. FAT32 hat diese Funktionen nicht.*

**Frage 3:** Was ist der Vorteil einer virtuellen Maschine gegenüber einer Direkt-Installation?
- A) VMs sind immer schneller als echte Installationen
- B) VMs brauchen keine Festplatte
- C) **VMs laufen isoliert – Fehler oder Experimente beeinflussen das Host-System nicht** ✅
- D) VMs können kein Netzwerk nutzen

*Erklärung: Eine VM ist vollständig vom Host-System getrennt. Man kann darin experimentieren, Fehler machen oder das System neu aufsetzen, ohne den eigenen Computer zu gefährden.*

---

## ──────────────────────────────────────
## BLOCK 3 – Linux kennenlernen: Terminal & Grundbefehle
## ──────────────────────────────────────
> 🐧 Praxis: Erste Schritte in der Ubuntu-VM aus Block 2

### Warum Terminal?

Unter Linux – besonders bei Servern – läuft fast alles über das **Terminal** (auch Shell oder Kommandozeile genannt). Grafische Oberflächen gibt es zwar auch, aber:

- Server haben meist **keine grafische Oberfläche** (spart Ressourcen)
- Terminal-Befehle sind **präziser, schneller und automatisierbar**
- Fast alle Cloud-Server und Produktionssysteme werden über das Terminal verwaltet

Die Standard-Shell unter Linux heisst **bash** (Bourne Again Shell).

### Navigation im Dateisystem

```bash
pwd                   # Print Working Directory – zeigt aktuellen Pfad
                      # Ausgabe: /home/marvin

ls                    # List – Inhalt des aktuellen Ordners anzeigen
ls -l                 # Detaillierte Ansicht (Rechte, Grösse, Datum)
ls -la                # Wie -l, aber auch versteckte Dateien (beginnen mit .)
ls -lh                # Dateigrössen in lesbarem Format (KB, MB)

cd /home              # Change Directory – in Ordner wechseln
cd ..                 # Eine Ebene nach oben
cd ~                  # In den eigenen Home-Ordner wechseln
cd -                  # Zum vorherigen Verzeichnis zurück
```

**Die Linux-Verzeichnisstruktur:**

```
/
├── home/             → Benutzerordner (wie C:\Users unter Windows)
│   └── marvin/       → Dein persönlicher Ordner (~)
├── etc/              → Konfigurationsdateien des Systems
├── var/              → Logs und variable Daten (z.B. /var/log/)
├── usr/              → Installierte Programme und Bibliotheken
├── tmp/              → Temporäre Dateien (werden beim Neustart gelöscht)
├── root/             → Home-Ordner des root-Benutzers (Superuser)
└── bin/ und sbin/    → Systemwichtige Programme (ls, cp, mv ...)
```

> **Absolute vs. relative Pfade:**
> - Absolut: beginnt mit `/` – z.B. `/home/marvin/dokumente` (immer eindeutig)
> - Relativ: von aktuellem Ordner aus – z.B. `../dokumente` (von aktuellem Ort)

### Dateien und Ordner verwalten

```bash
# Ordner erstellen
mkdir projekte                   # Erstellt Ordner "projekte"
mkdir -p projekte/m187/uebungen  # Erstellt verschachtelte Ordner auf einmal

# Dateien erstellen und bearbeiten
touch notizen.txt                # Leere Datei erstellen
nano notizen.txt                 # Datei im Editor öffnen (Strg+O = speichern, Strg+X = beenden)

# Dateien lesen
cat notizen.txt                  # Gesamten Inhalt ausgeben
less notizen.txt                 # Seitenweise lesen (Q = beenden, Pfeiltasten = scrollen)
head -5 notizen.txt              # Erste 5 Zeilen anzeigen
tail -5 notizen.txt              # Letzte 5 Zeilen anzeigen

# Kopieren, Verschieben, Löschen
cp notizen.txt backup.txt        # Datei kopieren
cp -r projekte/ backup_projekte/ # Ordner rekursiv kopieren
mv notizen.txt dokumente/        # Datei verschieben
mv alt.txt neu.txt               # Datei umbenennen
rm datei.txt                     # Datei löschen (KEIN Papierkorb!)
rm -r ordner/                    # Ordner mit Inhalt löschen
```

> ⚠️ `rm` löscht **ohne Bestätigung und ohne Papierkorb**. Einmal gelöscht, ist die Datei weg.

### Suchen und Filtern

```bash
# Dateien suchen
find / -name "*.txt"             # Alle .txt-Dateien ab Root suchen
find /home -name "notizen*"      # Dateien die mit "notizen" beginnen
find . -type d                   # Nur Verzeichnisse suchen

# Textinhalt suchen (grep)
grep "fehler" logdatei.txt       # Zeilen mit "fehler" anzeigen
grep -i "fehler" logdatei.txt    # Gross-/Kleinschreibung ignorieren
grep -r "TODO" /home/marvin/     # Rekursiv in allen Dateien suchen

# Ausgaben kombinieren (Pipe |)
ls -l | grep ".txt"              # Nur .txt-Dateien aus ls anzeigen
cat datei.txt | grep "wichtig"   # Inhalt filtern
```

### Systeminformationen

```bash
uname -a          # Linux-Version und Kernel anzeigen
hostname          # Computername anzeigen
whoami            # Aktuell eingeloggter Benutzer
uptime            # Wie lange läuft das System schon?
df -h             # Festplattenauslastung (disk free, human readable)
free -h           # RAM-Auslastung
top               # Laufende Prozesse und Ressourcen (Q = beenden)
htop              # Schönere Version von top (muss installiert werden)
```

### Paketverwaltung mit apt

Unter Ubuntu werden Programme über den **Paketmanager apt** installiert – kein manuelles Herunterladen nötig.

```bash
sudo apt update               # Paketquellen aktualisieren (immer zuerst!)
sudo apt upgrade              # Alle installierten Pakete aktualisieren
sudo apt install htop         # Programm installieren
sudo apt remove htop          # Programm deinstallieren
sudo apt search nmap          # Paket suchen
apt show wget                 # Infos über ein Paket anzeigen
```

> **Was ist `sudo`?** `sudo` (Super User Do) führt einen Befehl mit Administrator-Rechten aus. Linux fragt dann nach deinem Passwort. Es ist wie „Als Administrator ausführen" unter Windows.

---

### 🧩 Mini-Quiz: Block 3

**Frage 1:** Welcher Befehl zeigt den aktuellen Verzeichnispfad an?
- A) `ls`
- B) `cd`
- C) `whoami`
- D) **`pwd`** ✅

*Erklärung: `pwd` (Print Working Directory) zeigt den vollständigen Pfad des aktuellen Verzeichnisses an – z.B. `/home/marvin/projekte`.*

**Frage 2:** Du willst in Linux einen Ordner namens „projekte" erstellen. Welcher Befehl ist richtig?
- A) `create projekte`
- B) `new folder projekte`
- C) **`mkdir projekte`** ✅
- D) `touch projekte`

*Erklärung: `mkdir` (Make Directory) erstellt einen neuen Ordner. `touch` erstellt eine leere Datei. Mit `mkdir -p` können verschachtelte Ordner auf einmal erstellt werden.*

**Frage 3:** Was macht `grep "fehler" log.txt`?
- A) Ersetzt das Wort "fehler" in der Datei
- B) Löscht alle Zeilen mit "fehler"
- C) Zählt wie oft "fehler" vorkommt
- D) **Zeigt alle Zeilen der Datei an, die das Wort "fehler" enthalten** ✅

*Erklärung: `grep` (Global Regular Expression Print) durchsucht Text nach einem Muster und gibt nur die passenden Zeilen aus. Extrem nützlich beim Durchsuchen von Log-Dateien.*

**Frage 4:** Welcher Befehl installiert unter Ubuntu ein Programm?
- A) `install htop`
- B) `get htop`
- C) **`sudo apt install htop`** ✅
- D) `apt-get download htop`

*Erklärung: `apt` ist der Paketmanager von Ubuntu/Debian. `sudo` ist nötig, weil Installationen Administrator-Rechte benötigen. `apt update` sollte immer zuerst ausgeführt werden.*

---

## ──────────────────────────────────────
## BLOCK 4 – Netzwerk einrichten, Sicherheit & SSH
## ──────────────────────────────────────
> Handlungsziel 3: Netzwerkzugang einrichten, Schutzmassnahmen treffen
> 🐧 Praxis: Netzwerk in der VM prüfen, per SSH verbinden

### Netzwerkverbindung einrichten

Ein ICT-Arbeitsplatz braucht eine Netzwerkverbindung – entweder per Kabel (LAN) oder drahtlos (WLAN).

| Verbindungstyp | Eigenschaften | Einrichtung |
|---------------|--------------|-------------|
| **LAN (Kabel)** | Stabil, schnell, kein Passwort | RJ-45-Kabel einstecken, meist automatisch via DHCP |
| **WLAN** | Flexibel, etwas langsamer | Netzwerkname (SSID) + Passwort, WPA3 bevorzugen |

**Wichtige Netzwerkbegriffe:**

| Begriff | Bedeutung |
|---------|-----------|
| **IP-Adresse** | Eindeutige Adresse eines Geräts im Netzwerk (z.B. `192.168.1.10`) |
| **Subnetzmaske** | Definiert welcher Teil der IP das Netz und welcher das Gerät ist |
| **Gateway** | Adresse des Routers – der Ausgang ins Internet |
| **DNS-Server** | Übersetzt Domainnamen (google.com) in IP-Adressen |
| **DHCP** | Protokoll, das IP-Adressen automatisch vergibt |

**Netzwerk unter Windows prüfen:**
```
cmd → ipconfig              # IP-Adresse, Gateway, DNS anzeigen
cmd → ping 8.8.8.8          # Verbindung ins Internet testen
cmd → ping google.com       # DNS-Auflösung testen
```

**Netzwerk unter Linux (in der VM) prüfen:**
```bash
ip a                        # Alle Netzwerkinterfaces und IP-Adressen anzeigen
ip r                        # Routing-Tabelle (Gateway) anzeigen
ping -c 4 8.8.8.8           # 4 Pakete an Google DNS senden
ping -c 4 google.com        # DNS-Auflösung testen
cat /etc/resolv.conf        # Konfigurierten DNS-Server anzeigen
```

### Schutzmassnahmen

**Firewall (Linux – ufw):**
```bash
sudo ufw status             # Firewall-Status anzeigen
sudo ufw enable             # Firewall aktivieren
sudo ufw allow ssh          # SSH-Verbindungen erlauben (Port 22)
sudo ufw allow 80/tcp       # HTTP erlauben
sudo ufw deny 23/tcp        # Telnet blockieren
sudo ufw status verbose     # Alle Regeln anzeigen
```

**System aktuell halten:**
```bash
sudo apt update && sudo apt upgrade -y   # Alles auf einmal aktualisieren
```

**Passwort ändern:**
```bash
passwd                      # Eigenes Passwort ändern
sudo passwd benutzername    # Passwort eines anderen Benutzers ändern (als root)
```

### SSH – Secure Shell

**SSH** (Secure Shell) ermöglicht es, sich verschlüsselt von einem Computer auf einen anderen zu verbinden und dort Befehle auszuführen. In der IT-Praxis ist SSH allgegenwärtig – fast alle Server werden so verwaltet.

```
Dein Windows-PC  ──SSH──▶  Ubuntu-VM (oder entfernter Server)
(Client)                    (Server, läuft OpenSSH)
```

**SSH in der VM aktivieren** (wurde in Block 2 beim Setup installiert):
```bash
# Prüfen ob SSH-Dienst läuft
sudo systemctl status ssh

# Falls nicht installiert:
sudo apt install openssh-server
sudo systemctl enable ssh
sudo systemctl start ssh
```

**IP-Adresse der VM herausfinden:**
```bash
ip a | grep inet
# Ausgabe z.B.: inet 192.168.56.101/24
```

**Von Windows aus per SSH verbinden:**
```
Windows-Terminal (PowerShell oder cmd):
ssh benutzername@192.168.56.101

# Beim ersten Mal erscheint eine Warnung – mit "yes" bestätigen
# Dann Passwort eingeben
```

> **VirtualBox Netzwerkeinstellung:** Damit Windows die VM erreicht, muss das VM-Netzwerk auf **„Host-only Adapter"** oder **„Bridged Adapter"** gestellt sein (VirtualBox → VM → Einstellungen → Netzwerk).

**SSH-Schlüssel statt Passwort (sicherer):**

In der Praxis wird statt Passwort ein **SSH-Schlüsselpaar** verwendet:
- **Privater Schlüssel** – bleibt auf deinem Computer, nie weitergeben
- **Öffentlicher Schlüssel** – wird auf dem Server hinterlegt

```bash
# Auf Windows: Schlüsselpaar generieren
ssh-keygen -t ed25519

# Öffentlichen Schlüssel auf Server kopieren
ssh-copy-id benutzername@192.168.56.101

# Jetzt ohne Passwort verbinden
ssh benutzername@192.168.56.101
```

---

### 🧩 Mini-Quiz: Block 4

**Frage 1:** Welches Protokoll vergibt automatisch IP-Adressen an Geräte im Netzwerk?
- A) DNS
- B) HTTP
- C) **DHCP** ✅
- D) FTP

*Erklärung: DHCP vergibt automatisch IP-Adresse, Subnetzmaske, Gateway und DNS-Server – man muss nichts manuell konfigurieren.*

**Frage 2:** Wofür wird SSH verwendet?
- A) Um Websites aufzurufen
- B) Um Dateien per USB zu übertragen
- C) **Um sich verschlüsselt auf einen entfernten Computer zu verbinden und Befehle auszuführen** ✅
- D) Um E-Mails zu versenden

*Erklärung: SSH (Secure Shell) ist das Standard-Protokoll für die sichere Fernadministration von Servern. Die gesamte Verbindung ist verschlüsselt – niemand kann mitlesen.*

**Frage 3:** Welcher Linux-Befehl zeigt alle Netzwerkinterfaces und ihre IP-Adressen an?
- A) `ifconfig -a`
- B) `netstat`
- C) `ping`
- D) **`ip a`** ✅

*Erklärung: `ip a` (oder `ip address`) ist der moderne Befehl unter Linux um Netzwerkinterfaces und IP-Adressen anzuzeigen. `ifconfig` ist veraltet, funktioniert aber noch auf vielen Systemen.*

---

## ──────────────────────────────────────
## BLOCK 5 – Datei- & Verzeichnisstruktur, Benutzer & Rechte
## ──────────────────────────────────────
> Handlungsziel 8: Datei-/Verzeichnisstrukturen aufbauen, Benutzer/Gruppen administrieren, Rechte vergeben
> 🐧 Praxis: Benutzer in der VM anlegen, Berechtigungen setzen

### Verzeichnisstruktur verstehen

**Windows:**
```
C:\
├── Windows\          Betriebssystemdateien
├── Program Files\    Installierte Programme
└── Users\
    └── Marvin\
        ├── Desktop\
        ├── Documents\
        └── Downloads\
```

**Linux:**
```
/
├── etc/      Konfigurationsdateien (z.B. /etc/hosts, /etc/passwd)
├── home/     Benutzerordner (wie C:\Users)
│   └── marvin/
├── var/      Logs und variable Daten
│   └── log/  Systemlogs (z.B. syslog, auth.log)
├── usr/      Programme und Bibliotheken
└── tmp/      Temporäre Dateien
```

### Benutzer und Gruppen

Mehrere Personen können denselben Computer mit **getrennten Benutzerkonten** nutzen.

**Benutzertypen unter Linux:**

| Typ | UID | Rechte |
|-----|-----|--------|
| **root** | 0 | Superuser – absolute Kontrolle über alles |
| **Systembenutzer** | 1–999 | Für Dienste (z.B. www-data für Apache) |
| **Normaler Benutzer** | 1000+ | Eingeschränkte Rechte, eigener Home-Ordner |

**Benutzerverwaltung Linux (in der VM ausprobieren):**
```bash
# Neuen Benutzer erstellen
sudo useradd -m -s /bin/bash anna
sudo passwd anna                    # Passwort für anna setzen

# Benutzer anzeigen
cat /etc/passwd                     # Alle Benutzer (Datei lesen)
id marvin                           # UID, GID und Gruppen von marvin

# Gruppen verwalten
sudo groupadd entwickler            # Neue Gruppe erstellen
sudo usermod -aG entwickler anna    # anna zur Gruppe hinzufügen
groups anna                         # Gruppen von anna anzeigen

# Zu einem anderen Benutzer wechseln
su - anna                           # Als anna einloggen
exit                                # Zurück zum ursprünglichen Benutzer

# Benutzer löschen
sudo userdel -r anna                # anna + Home-Ordner löschen
```

### Linux-Dateiberechtigungen (chmod)

Jede Datei hat **drei Berechtigungsebenen** und **drei Berechtigungstypen**:

```bash
ls -l datei.txt
# -rw-r--r-- 1 marvin users 1024 Mai 31 datei.txt
#  ||| ||| |||
#  ||| ||| └── Alle anderen (others): r-- = nur lesen
#  ||| └────── Gruppe (group):        r-- = nur lesen
#  └────────── Eigentümer (user):     rw- = lesen + schreiben
#
# r = read (lesen)    = 4
# w = write (schreiben) = 2
# x = execute (ausführen) = 1
```

**Berechtigungen mit Zahlen (oktal):**

| Zahl | Binär | Berechtigung |
|------|-------|-------------|
| 7 | 111 | rwx (lesen + schreiben + ausführen) |
| 6 | 110 | rw- (lesen + schreiben) |
| 5 | 101 | r-x (lesen + ausführen) |
| 4 | 100 | r-- (nur lesen) |
| 0 | 000 | --- (keine Rechte) |

```bash
# Berechtigungen setzen
chmod 755 skript.sh      # rwxr-xr-x  → Eigentümer alles, Gruppe/Andere lesen+ausführen
chmod 644 dokument.txt   # rw-r--r--  → Eigentümer lesen+schreiben, Andere nur lesen
chmod 600 privat.txt     # rw-------  → Nur Eigentümer darf lesen und schreiben
chmod +x skript.sh       # Alle dürfen ausführen (x hinzufügen)
chmod u-w datei.txt      # Eigentümer darf nicht mehr schreiben (w entfernen)

# Eigentümer ändern
sudo chown anna datei.txt           # Eigentümer zu anna ändern
sudo chown anna:entwickler datei.txt # Eigentümer UND Gruppe ändern
sudo chown -R marvin /home/marvin/  # Rekursiv (ganzen Ordner)
```

**Praxisbeispiel – Skript ausführbar machen:**
```bash
nano backup.sh                # Skript erstellen
chmod +x backup.sh            # Ausführbar machen
./backup.sh                   # Skript ausführen
```

> **Prinzip der minimalen Rechte:** Jeder Benutzer soll nur die Rechte erhalten, die er für seine Aufgabe wirklich benötigt – nicht mehr. Dateien mit `777` (alle Rechte für alle) sind fast immer ein Fehler.

---

### 🧩 Mini-Quiz: Block 5

**Frage 1:** Was bedeutet die Berechtigung `chmod 644` auf einer Datei?
- A) Alle dürfen lesen, schreiben und ausführen
- B) Niemand darf die Datei lesen
- C) **Eigentümer darf lesen und schreiben, alle anderen dürfen nur lesen** ✅
- D) Nur der Eigentümer darf die Datei sehen

*Erklärung: 6 = rw- (lesen+schreiben), 4 = r-- (nur lesen), 4 = r-- (nur lesen). Also: Eigentümer rw-, Gruppe r--, Andere r--. Typisch für normale Textdateien.*

**Frage 2:** Welcher Befehl fügt den Benutzer "anna" zur Gruppe "entwickler" hinzu?
- A) `sudo groupadd anna entwickler`
- B) `sudo adduser anna entwickler`
- C) `sudo useradd -g entwickler anna`
- D) **`sudo usermod -aG entwickler anna`** ✅

*Erklärung: `usermod -aG` fügt einen Benutzer zu einer zusätzlichen Gruppe hinzu. Das `-a` steht für "append" (anhängen) – ohne `-a` würde der Benutzer aus allen anderen Gruppen entfernt.*

**Frage 3:** Was ist der root-Benutzer unter Linux?
- A) Der erste erstellte normale Benutzer
- B) Ein Benutzer ohne Passwort
- C) **Der Superuser mit absoluten Rechten über das gesamte System** ✅
- D) Ein gesperrter Systembenutzer

*Erklärung: root (UID 0) ist der mächtigste Benutzer unter Linux – er kann alles lesen, ändern und löschen. Deshalb arbeitet man normalerweise als normaler Benutzer und nutzt `sudo` nur wenn nötig.*

---

## ──────────────────────────────────────
## BLOCK 6 – Fehlerdiagnose, Monitoring & Ergonomie
## ──────────────────────────────────────
> Handlungsziele 4, 5 & 9: Defekte eingrenzen, Ressourcen überwachen, Ergonomie
> 🐧 Praxis: Systemlogs lesen, Prozesse überwachen

### Systematische Fehlerdiagnose (HZ 4)

Wenn etwas nicht funktioniert, hilft ein strukturiertes Vorgehen:

1. **Problem genau beschreiben** – Was funktioniert nicht? Fehlermeldung notieren
2. **Ursache eingrenzen** – Hardware? Software? Netzwerk? Benutzer?
3. **Eine Sache auf einmal ändern** – nie mehrere Änderungen gleichzeitig
4. **Testen** – funktioniert es jetzt?
5. **Dokumentieren** – was war das Problem, was war die Lösung?

**Häufige Fehlerquellen:**

| Problem | Mögliche Ursache | Erste Massnahme |
|---------|-----------------|-----------------|
| Kein Bild | Kabel, Monitor aus, falsche Eingangsquelle | Kabel prüfen, Monitor einschalten |
| Kein Netzwerk | Kabel, WLAN-Passwort, IP-Konflikt | `ipconfig` / `ip a` / `ping 8.8.8.8` |
| Programm startet nicht | Fehlende Abhängigkeit, Treiberproblem | Neuinstallation, Logs prüfen |
| Computer langsam | Zu wenig RAM, volle Festplatte, Malware | Task-Manager / `top` / `df -h` |

### Hilfsprogramme – Windows vs. Linux

| Aufgabe | Windows | Linux |
|---------|---------|-------|
| Prozesse & Ressourcen | Task-Manager (`Strg+Shift+Esc`) | `top` oder `htop` |
| Systemlogs | Ereignisanzeige (`eventvwr.msc`) | `journalctl` / `/var/log/syslog` |
| Treiber / Geräte | Geräte-Manager (`devmgmt.msc`) | `lspci`, `lsusb`, `dmesg` |
| Netzwerk prüfen | `ipconfig`, `ping` | `ip a`, `ping`, `ss -tulpn` |
| Festplattenauslastung | Datenträgerbereinigung | `df -h`, `du -sh *` |

**Wichtige Linux-Diagnose-Befehle (in der VM ausprobieren):**
```bash
# Systemlogs lesen
sudo journalctl -n 50          # Letzte 50 Log-Einträge
sudo journalctl -f             # Live-Log (wie tail -f, Strg+C zum Beenden)
sudo journalctl -u ssh         # Logs nur für den SSH-Dienst
cat /var/log/auth.log          # Login-Versuche und Authentifizierungen

# Prozesse überwachen
top                            # Laufende Prozesse (Q = beenden)
ps aux                         # Alle laufenden Prozesse auflisten
ps aux | grep ssh              # Nur SSH-Prozesse anzeigen
kill 1234                      # Prozess mit PID 1234 beenden
sudo kill -9 1234              # Prozess zwingend beenden

# Speicher und Festplatte
df -h                          # Festplattenauslastung aller Partitionen
du -sh /home/marvin/           # Grösse des Home-Ordners
free -h                        # RAM-Nutzung anzeigen

# Dienste verwalten (systemd)
sudo systemctl status ssh      # Status des SSH-Dienstes
sudo systemctl restart ssh     # Dienst neu starten
sudo systemctl stop ssh        # Dienst stoppen
sudo systemctl enable ssh      # Dienst beim Start automatisch starten
```

### Ressourcen überwachen (HZ 9)

**top / htop in der VM:**
- `top` zeigt Prozesse nach CPU-Auslastung sortiert
- `htop` ist benutzerfreundlicher (installieren mit `sudo apt install htop`)
- Wichtige Spalten: PID (Prozess-ID), %CPU, %MEM, COMMAND

```bash
# Hohe CPU-Auslastung simulieren und beobachten
yes > /dev/null &              # Prozess startet im Hintergrund (& = Hintergrund)
top                            # Auslastung beobachten
# PID des "yes"-Prozesses notieren, dann:
kill <PID>                     # Prozess beenden
```

### Ergonomie am Arbeitsplatz (HZ 5)

**Ergonomie** bedeutet, den Arbeitsplatz so einzurichten, dass der Körper möglichst wenig belastet wird.

| Bereich | Empfehlung |
|---------|-----------|
| **Monitor** | Oberkante auf Augenhöhe oder leicht darunter, Abstand 50–70 cm |
| **Stuhl** | Füsse flach auf dem Boden, Oberschenkel waagrecht, Rücken gerade |
| **Tastatur & Maus** | Ellbogen ca. 90°, Handgelenke gerade (nicht abgeknickt) |
| **Beleuchtung** | Keine direkte Lichtquelle hinter oder vor dem Monitor |
| **Pausen** | 5 Min. Pause pro Stunde, Blick in die Ferne |

**20-20-20-Regel gegen Augenermüdung:**
> Alle **20 Minuten** für **20 Sekunden** auf ein Objekt **20 Fuss** (ca. 6 m) entfernt schauen.

| Fehler | Mögliche Folge |
|--------|---------------|
| Monitor zu hoch/tief | Nackenschmerzen |
| Schlechte Sitzhaltung | Rückenschmerzen |
| Maus/Tastatur falsch | Sehnenscheidenentzündung (RSI) |
| Zu wenig Licht | Kopfschmerzen, Augenermüdung |

---

### 🧩 Mini-Quiz: Block 6

**Frage 1:** Welcher Linux-Befehl zeigt die Festplattenauslastung in lesbarem Format?
- A) `free -h`
- B) `top`
- C) **`df -h`** ✅
- D) `ps aux`

*Erklärung: `df` (disk free) zeigt den freien und belegten Speicherplatz aller Partitionen. Das `-h` (human readable) gibt die Grössen in KB/MB/GB aus statt in Blöcken.*

**Frage 2:** Auf welcher Höhe sollte der Monitor idealerweise stehen?
- A) Deutlich über Augenhöhe
- B) So tief wie möglich
- C) **Oberkante des Monitors auf Augenhöhe oder leicht darunter** ✅
- D) Die Höhe ist irrelevant

*Erklärung: Ist der Monitor zu hoch, belastet man die Halswirbelsäule durch Zurückneigen des Kopfes. Zu tief führt zu vorgebeugter Haltung.*

**Frage 3:** Was macht `sudo systemctl restart ssh`?
- A) Installiert SSH neu
- B) Löscht alle SSH-Verbindungen dauerhaft
- C) Zeigt den SSH-Status an
- D) **Startet den SSH-Dienst neu** ✅

*Erklärung: `systemctl` verwaltet Dienste (Services) unter Linux. `restart` stoppt den Dienst und startet ihn wieder – nützlich nach Konfigurationsänderungen.*

---

## ──────────────────────────────────────
## BLOCK 7 – 🎯 Nebenaufgabe: OverTheWire Bandit
## ──────────────────────────────────────
> 🐧 SSH-Übung: Linux-Befehle in einer echten Herausforderung anwenden
> Keine Handlungsziel-Pflicht – freiwillige Vertiefung

### Was ist OverTheWire Bandit?

**OverTheWire Bandit** (https://overthewire.org/wargames/bandit/) ist ein kostenloses, webbasiertes Lernspiel für Linux und SSH. Du verbindest dich per SSH auf einen echten Server und löst dort Aufgaben – jede gelöste Aufgabe gibt dir das Passwort für die nächste Stufe.

Bandit ist das perfekte Training für alle Befehle aus den Blöcken 3–6:

| Bandit-Level | Geübte Befehle |
|-------------|----------------|
| 0–4 | `ls`, `cat`, `cd`, `find`, Versteckte Dateien |
| 5–9 | `find` mit Optionen, `file`, `du`, Pipes `\|` |
| 10–15 | `grep`, `sort`, `uniq`, `strings`, `base64`, `tr` |
| 16–20 | SSH-Schlüssel, Port-Scanning mit `nmap` |
| 20+ | Fortgeschrittene Shell-Techniken |

### Einstieg: Level 0

**Verbindung herstellen:**
```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
# Passwort: bandit0
```

> Du verbindest dich auf einen echten Linux-Server von OverTheWire! Alles was du hier tust, betrifft nur dein eigenes Bandit-Konto.

**Level 0 → Level 1:**

Aufgabe: Das Passwort für Level 1 liegt in einer Datei namens `readme` im Home-Verzeichnis.

```bash
# Nach dem Login:
ls                    # Was liegt hier?
cat readme            # Datei lesen
# Du siehst ein Passwort → notieren!

# Ausloggen:
exit

# Mit Level 1 verbinden:
ssh bandit1@bandit.labs.overthewire.org -p 2220
# Passwort: <das gerade gefundene Passwort>
```

**Level 1 → Level 2:**

Aufgabe: Das Passwort liegt in einer Datei namens `-` (ein Bindestrich als Dateiname).

```bash
ls -la               # Datei "-" sehen
cat ./-              # Trick: ./ vor dem Dateinamen, sonst denkt Shell es sei ein Flag
```

**Level 2 → Level 3:**

Aufgabe: Passwort in einer Datei mit Leerzeichen im Namen (`spaces in this filename`).

```bash
ls
cat "spaces in this filename"    # Anführungszeichen um Namen mit Leerzeichen
# oder:
cat spaces\ in\ this\ filename   # Leerzeichen mit \ escapen
```

**Level 3 → Level 4:**

Aufgabe: Passwort in einer **versteckten Datei** im Ordner `inhere`.

```bash
cd inhere
ls -la               # -a zeigt versteckte Dateien (beginnen mit .)
cat .hidden          # Versteckte Datei lesen
```

**Level 4 → Level 5:**

Aufgabe: Passwort ist in der einzigen **menschenlesbaren Datei** im Ordner `inhere` (es gibt 10 Dateien).

```bash
cd inhere
file ./-file0*       # file-Befehl zeigt Dateityp aller Dateien
# Suche nach "ASCII text"
cat ./-file07        # Die lesbare Datei lesen (Nummer kann variieren)
```

### Nützliche Befehle für Bandit

Diese Befehle brauchst du für spätere Level – schau sie dir an und probiere sie in deiner VM aus:

```bash
# Dateiinhalt sortieren und Duplikate entfernen
sort datei.txt | uniq            # Sortiert und entfernt Duplikate
sort datei.txt | uniq -u         # Nur Zeilen die genau einmal vorkommen

# Text enkodieren/dekodieren
echo "hallo" | base64            # Base64 enkodieren
echo "aGFsbG8=" | base64 -d     # Base64 dekodieren

# Zeichen ersetzen (tr = translate)
echo "HALLO" | tr 'A-Z' 'a-z'   # Grossbuchstaben → Kleinbuchstaben
cat datei.txt | tr -d '\n'       # Zeilenumbrüche entfernen

# Hexdump – Rohdaten anzeigen
xxd datei.txt | head             # Inhalt in Hex anzeigen

# Strings in Binärdateien finden
strings binaerdatei              # Lesbare Textstücke aus einer Binärdatei extrahieren

# Netzwerk-Tools
nc -l 1234                       # Netcat: auf Port 1234 lauschen
nc localhost 1234                # Netcat: zu localhost Port 1234 verbinden
```

### Tipps für Bandit

- **Nicht aufgeben** – bei jeder Stufe ist der Lösungsweg mit Standard-Linux-Tools möglich
- **`man befehl`** – das Handbuch zu jedem Befehl öffnen (z.B. `man find`)
- **Lösungen nachschauen** ist erlaubt wenn du wirklich nicht weiterkommst – aber erst selbst versuchen!
- Die Passwörter ändern sich periodisch – arbeite die Levels in einer Session durch oder notiere sie
- Offizielle Hilfeseite: https://overthewire.org/wargames/bandit/bandit0.html

---

### 🧩 Mini-Quiz: Block 7

**Frage 1:** Mit welchem Befehl verbindest du dich per SSH auf den Bandit-Server (Port 2220)?
- A) `ssh bandit.labs.overthewire.org -user bandit0`
- B) `connect -ssh bandit0@bandit.labs.overthewire.org 2220`
- C) **`ssh bandit0@bandit.labs.overthewire.org -p 2220`** ✅
- D) `ssh -port 2220 bandit0@bandit.labs.overthewire.org`

*Erklärung: `ssh benutzer@host -p port` ist die Standard-Syntax. `-p` gibt den Port an. Ohne `-p` versucht SSH den Standard-Port 22. Bandit nutzt Port 2220.*

**Frage 2:** Du willst eine Datei namens `-` (Bindestrich) lesen. Welcher Befehl funktioniert?
- A) `cat -`
- B) `read -`
- C) `open ./-`
- D) **`cat ./-`** ✅

*Erklärung: `cat -` interpretiert das `-` als "lies von der Standardeingabe" – das ist ein Shell-Sonderzeichen. Mit `./` wird explizit gesagt: es ist eine Datei im aktuellen Verzeichnis.*

**Frage 3:** Welcher Befehl zeigt auch versteckte Dateien (beginnend mit `.`) an?
- A) `ls -v`
- B) `ls --hidden`
- C) `ls -l`
- D) **`ls -la`** ✅

*Erklärung: Das `-a` Flag bei `ls` zeigt alle Dateien inklusive versteckter (die mit `.` beginnen). `-l` gibt das lange Format aus. Kombination `-la` zeigt alles detailliert.*

---

## ──────────────────────────────────────
## QUIZFRAGEN FÜR HTML (JavaScript quizData)
## ──────────────────────────────────────

Folgende Fragen direkt in das `quizData`-Objekt in `it-lernplattform.html` einfügen.
Schlüssel: `m187`

```javascript
m187: {
  questions: [
    {
      q: "Welchen Anschluss verwendet man für einen Monitor, wenn man Bild und Ton übertragen will?",
      options: ["USB-A", "VGA", "HDMI", "RJ-45"],
      correct: 2,
      explanation: "HDMI überträgt gleichzeitig digitales Bild und Ton. VGA ist ein älterer Standard und überträgt nur analoges Bild ohne Ton."
    },
    {
      q: "Was ist eine Partition auf einer Festplatte?",
      options: [
        "Ein Fehler auf der Festplatte",
        "Ein Typ von Dateisystem",
        "Ein logisch abgetrennter Bereich der Festplatte mit eigenem Dateisystem",
        "Eine Sicherungskopie aller Daten"
      ],
      correct: 2,
      explanation: "Partitionen unterteilen eine physische Festplatte in logische Bereiche mit eigenem Dateisystem – z.B. eine Partition für das Betriebssystem (C:) und eine für Daten (D:)."
    },
    {
      q: "Welcher Linux-Befehl zeigt den aktuellen Verzeichnispfad an?",
      options: ["ls", "cd", "whoami", "pwd"],
      correct: 3,
      explanation: "pwd (Print Working Directory) zeigt den vollständigen Pfad des aktuellen Verzeichnisses an – z.B. /home/marvin/projekte."
    },
    {
      q: "Welches Protokoll vergibt automatisch IP-Adressen an Geräte im Netzwerk?",
      options: ["DNS", "HTTP", "DHCP", "FTP"],
      correct: 2,
      explanation: "DHCP vergibt automatisch IP-Adresse, Subnetzmaske, Gateway und DNS-Server – man muss nichts manuell konfigurieren."
    },
    {
      q: "Wofür wird SSH verwendet?",
      options: [
        "Um Websites aufzurufen",
        "Um Dateien per USB zu übertragen",
        "Um sich verschlüsselt auf einen entfernten Computer zu verbinden",
        "Um E-Mails zu versenden"
      ],
      correct: 2,
      explanation: "SSH (Secure Shell) ist das Standard-Protokoll für die sichere Fernadministration von Servern. Die gesamte Verbindung ist verschlüsselt."
    },
    {
      q: "Was bedeutet die Berechtigung chmod 644 auf einer Datei?",
      options: [
        "Alle dürfen lesen, schreiben und ausführen",
        "Niemand darf die Datei lesen",
        "Eigentümer darf lesen und schreiben, alle anderen dürfen nur lesen",
        "Nur der Eigentümer darf die Datei sehen"
      ],
      correct: 2,
      explanation: "6 = rw- (lesen+schreiben für Eigentümer), 4 = r-- (nur lesen für Gruppe), 4 = r-- (nur lesen für andere). Typisch für normale Textdateien."
    },
    {
      q: "Auf welcher Höhe sollte der Monitor idealerweise stehen?",
      options: [
        "Deutlich über Augenhöhe",
        "So tief wie möglich auf dem Tisch",
        "Oberkante des Monitors auf Augenhöhe oder leicht darunter",
        "Die Höhe ist für die Ergonomie irrelevant"
      ],
      correct: 2,
      explanation: "Ist der Monitor zu hoch, belastet man die Halswirbelsäule. Zu tief führt zu vorgebeugter Haltung. Oberkante auf Augenhöhe ist ergonomisch optimal."
    }
  ]
}
```

---

*Erstellt: 31.05.2026 | Quelle: M187 – ICT-Arbeitsplatz mit Betriebssystem in Betrieb nehmen*
*Modulbeschreibung: ICT-Berufsbildung Schweiz (Handlungsziele 1–9)*
*Nebenaufgabe: OverTheWire Bandit – https://overthewire.org/wargames/bandit/*
*→ Nächster Schritt: Inhalte in `it-lernplattform.html` einfügen, quizData um `m187` ergänzen*
