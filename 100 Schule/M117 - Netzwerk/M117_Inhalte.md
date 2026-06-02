---
title: M117 - Netzwerk Grundlagen
tags:
  - netzwerk
  - ip-adressen
  - protokolle
  - topologien
  - osi-modell
  - schule
  - modul-117
created: 2026-05-31
status: draft
publish: false
---

# M117 – Netzwerk: Informatik- und Netzinfrastruktur betreiben
> Lerninhalt für die IT-Lernplattform | Basiert auf Modul 117 Grundlagen
> Struktur: 7 Inhaltsblöcke + Quizfragen (bereit zum Einfügen in HTML)

---

## ──────────────────────────────────────
## BLOCK 1 – Was ist ein Netzwerk & Netzwerktypen
## ──────────────────────────────────────

### Warum braucht man Netzwerke?

Computer, Handys und andere Geräte müssen miteinander kommunizieren können. Dafür braucht man ein **Netzwerk**. Ein Netzwerk verbindet zwei oder mehr Geräte so, dass sie Daten austauschen können.

Mit einem Netzwerk können Geräte:
- Daten und Dateien teilen
- Drucker oder andere Ressourcen gemeinsam nutzen
- auf das Internet zugreifen
- miteinander kommunizieren (z.B. Chat, E-Mail)

> **Merkhilfe:** Stell dir ein Netzwerk wie ein Postsystem vor. Jedes Gerät hat eine Adresse (IP-Adresse), Datenpakete sind die Briefe, und der Router ist der Postbote, der die Briefe zum richtigen Empfänger bringt.

### Netzwerktypen

Je nach Grösse und Zweck unterscheidet man verschiedene Netzwerktypen. Die wichtigste Unterscheidung ist die **geografische Ausdehnung**:

| Kürzel | Bedeutung | Ausdehnung | Beispiel |
|--------|-----------|------------|----------|
| PAN | Personal Area Network | Wenige Meter | Handy + Bluetooth-Kopfhörer |
| LAN | Local Area Network | Gebäude / Gelände | Schulnetz, Heimnetz |
| WLAN | Wireless LAN | Gebäude / Gelände | Kabelloses Heimnetz |
| VLAN | Virtual LAN | Logisch getrennt | Lehrer-/Schülernetz |
| MAN | Metropolitan Area Network | Stadt | Stadtnetz |
| WAN | Wide Area Network | Länder / Kontinente | Firmenstandorte weltweit |
| GAN | Global Area Network | Weltweit | Internet |
| VPN | Virtual Private Network | Über das Internet | Sicherer Homeoffice-Zugang |

### Die wichtigsten Typen im Detail

**LAN (Local Area Network)**
Das LAN ist der häufigste Netzwerktyp. Es verbindet Geräte innerhalb eines begrenzten Bereichs wie einem Haus, einer Schule oder einem Bürogebäude. LANs sind schnell, stabil und meist kabelgebunden.

**WLAN (Wireless LAN)**
Ein WLAN ist technisch dasselbe wie ein LAN – nur ohne Kabel. Die Geräte verbinden sich über Funkwellen mit einem **Access Point** (meistens der Router). Vorteile: Keine Kabel, flexibel. Nachteile: Etwas langsamer als Kabel, anfällig für Störungen durch Wände oder andere Funknetze.

**VLAN (Virtual LAN)**
Ein VLAN trennt Geräte **logisch**, auch wenn sie physisch am selben Switch hängen. Beispiel: In einer Schule sind Lehrer-PCs und Schüler-PCs am gleichen Switch – trotzdem kommunizieren sie nicht miteinander, weil sie in verschiedenen VLANs sind. Das erhöht die Sicherheit.

**VPN (Virtual Private Network)**
Ein VPN erstellt einen **verschlüsselten Tunnel** über das öffentliche Internet. So kann z.B. ein Mitarbeiter im Homeoffice so arbeiten, als wäre er direkt im Firmennetzwerk. Alle Daten werden verschlüsselt übertragen, sodass Dritte sie nicht mitlesen können.

---

### 🧩 Mini-Quiz – Block 1

**Frage 1:** Was bedeutet LAN?
- A) Long Area Network
- B) **Local Area Network** ✅
- C) Logical Access Network
- D) Local Access Node

*Erklärung: LAN steht für Local Area Network – ein lokales Netzwerk z.B. in einer Schule oder Firma.*

**Frage 2:** Was ist der Unterschied zwischen LAN und WLAN?
- A) WLAN ist schneller als LAN
- B) LAN gibt es nur in Schulen
- C) **WLAN ist ein kabelloses LAN – beide verbinden Geräte lokal** ✅
- D) WLAN verbindet Netzwerke weltweit

*Erklärung: WLAN (Wireless LAN) funktioniert genau wie LAN, nur ohne Kabel – über Funkwellen.*

**Frage 3:** Welches Netzwerk verbindet Standorte weltweit?
- A) PAN
- B) LAN
- C) MAN
- D) **GAN** ✅

*Erklärung: Ein GAN (Global Area Network) verbindet Netzwerke weltweit – das bekannteste Beispiel ist das Internet.*

**Frage 4:** Wofür wird ein VPN verwendet?
- A) Zum Drucken
- B) **Für sichere, verschlüsselte Verbindungen über das Internet** ✅
- C) Für Bluetooth-Geräte
- D) Für schnellere Computer

*Erklärung: Ein VPN erstellt einen verschlüsselten Tunnel über das Internet – ideal für sicheres Arbeiten im Homeoffice.*

---

## ──────────────────────────────────────
## BLOCK 2 – IP-Adressen: Aufbau, Netz-/Hostanteil & IPv6
## ──────────────────────────────────────

### Was ist eine IP-Adresse?

Jedes Gerät in einem Netzwerk braucht eine eindeutige Adresse, damit Datenpakete zum richtigen Empfänger gelangen – die **IP-Adresse** (Internet Protocol Address). Ohne IP-Adresse weiss das Netzwerk nicht, welches Gerät gemeint ist.

### Aufbau einer IPv4-Adresse

Eine IPv4-Adresse besteht aus **4 Zahlenblöcken**, getrennt durch Punkte. Jeder Block darf Werte von **0 bis 255** enthalten.

```
192 . 168 . 1 . 100
```

Technisch gesehen besteht eine IPv4-Adresse aus **32 Bit**, aufgeteilt in 4 Gruppen zu je 8 Bit (= 1 Byte). Daraus ergeben sich ca. **4.3 Milliarden** mögliche Adressen.

**Gültige und ungültige Adressen:**

| Adresse | Gültig? | Grund |
|---------|---------|-------|
| `192.168.1.10` | ✅ | Alle Blöcke zwischen 0–255 |
| `10.0.0.5` | ✅ | Alle Blöcke zwischen 0–255 |
| `300.1.1.1` | ❌ | 300 ist grösser als 255 |
| `192.168.1.1.5` | ❌ | 5 Blöcke statt 4 |
| `abc.1.1.1` | ❌ | Buchstaben sind nicht erlaubt |

### Netzanteil und Hostanteil

Jede IP-Adresse besteht aus zwei Teilen:

- **Netzanteil** → gibt an, zu welchem Netzwerk das Gerät gehört (wie die Strasse)
- **Hostanteil** → gibt an, welches Gerät innerhalb des Netzwerks gemeint ist (wie die Hausnummer)

```
192.168.1.100
└──────────┘ └─┘
 Netzanteil  Host
```

Geräte mit demselben Netzanteil gehören zum gleichen Netzwerk. Diese drei Geräte sind z.B. im gleichen Netz:
- `192.168.1.10`
- `192.168.1.25`
- `192.168.1.200`

Nur der letzte Block unterscheidet sich – das ist der Hostanteil, der das jeweilige Gerät beschreibt.

### IPv4 vs. IPv6

Da die IPv4-Adressen durch die Milliarden von Geräten weltweit knapp wurden, wurde **IPv6** entwickelt. IPv6-Adressen sind **128 Bit** lang und in Hexadezimal geschrieben:

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

| Merkmal | IPv4 | IPv6 |
|---------|------|------|
| Bits | 32 | 128 |
| Trennung | Punkte | Doppelpunkte |
| Schreibweise | Dezimal | Hexadezimal |
| Adressraum | ~4.3 Milliarden | ~340 Sextillionen |
| Verbreitung | Weit verbreitet | Zunehmend |

IPv6 löst das Problem der Adressknappheit dauerhaft – mit 128 Bit gibt es genug Adressen für jeden Sensor, jedes Gerät und jeden Server weltweit.

---

### 🧩 Mini-Quiz – Block 2

**Frage 1:** Welche IP-Adresse ist gültig?
- A) `300.1.1.1`
- B) **`192.168.1.10`** ✅
- C) `192.168.1.1.5`
- D) `abc.1.1.1`

*Erklärung: Eine IPv4-Adresse hat genau 4 Blöcke, jeder Wert liegt zwischen 0 und 255.*

**Frage 2:** Wie viele Bit besitzt eine IPv4-Adresse?
- A) 16
- B) 24
- C) **32** ✅
- D) 128

*Erklärung: IPv4 besteht aus 4 Blöcken × 8 Bit = 32 Bit.*

**Frage 3:** Was beschreibt der Hostanteil einer IP-Adresse?
- A) Das Netzwerk, zu dem das Gerät gehört
- B) **Das einzelne Gerät innerhalb eines Netzwerks** ✅
- C) Die Subnetzmaske
- D) Den Router

*Erklärung: Der Hostanteil identifiziert das konkrete Gerät – wie eine Hausnummer innerhalb einer Strasse.*

**Frage 4:** Warum wurde IPv6 entwickelt?
- A) Weil IPv4 zu langsam ist
- B) **Weil es zu wenige IPv4-Adressen gibt** ✅
- C) Weil IPv4 keine Router unterstützt
- D) Weil IPv4 kein WLAN unterstützt

*Erklärung: Mit Milliarden von Geräten weltweit reichen die ~4.3 Milliarden IPv4-Adressen nicht mehr aus.*

---

## ──────────────────────────────────────
## BLOCK 3 – Subnetzmasken, Adressbereiche & Hostberechnung
## ──────────────────────────────────────

### Was macht eine Subnetzmaske?

Die Subnetzmaske legt fest, **wie viele Bits einer IP-Adresse zum Netzwerk gehören** – und wie viele für Hosts (Geräte) übrig bleiben. Sie trennt also Netzanteil und Hostanteil einer IP-Adresse.

**Beispiel:**
```
IP-Adresse:   192.168.1.100
Subnetzmaske: 255.255.255.0
```

Die `255` in der Subnetzmaske bedeutet: dieser Block gehört vollständig zum Netzwerk. Die `0` bedeutet: dieser Block steht für Hosts zur Verfügung. Also:
- `192.168.1` = Netzwerk
- `100` = Gerät (Host)

### CIDR-Schreibweise

Heute verwendet man meistens die **CIDR-Schreibweise** (Classless Inter-Domain Routing). Die Zahl hinter dem Schrägstrich gibt an, wie viele Bits zum Netzwerk gehören:

```
192.168.1.100 / 24
               └──┘
        24 Bit Netzwerk → 8 Bit für Hosts übrig
```

**Häufige Subnetzmasken im Vergleich:**

| CIDR | Subnetzmaske | Netzwerkbits | Hostbits | Nutzbare Hosts |
|------|-------------|-------------|----------|----------------|
| `/8`  | `255.0.0.0` | 8 | 24 | 16'777'214 |
| `/16` | `255.255.0.0` | 16 | 16 | 65'534 |
| `/24` | `255.255.255.0` | 24 | 8 | 254 |
| `/25` | `255.255.255.128` | 25 | 7 | 126 |

### Netzwerkadresse und Broadcastadresse

In jedem Netzwerk sind zwei Adressen **fest reserviert** und dürfen niemals an Geräte vergeben werden:

**Netzwerkadresse** – alle Host-Bits = 0
- Beschreibt das Netzwerk selbst (nicht ein einzelnes Gerät)
- Beispiel bei `/24`: `192.168.1.0`

**Broadcastadresse** – alle Host-Bits = 1
- Wird verwendet, um Daten an **alle Geräte** im Netzwerk gleichzeitig zu senden
- Beispiel bei `/24`: `192.168.1.255`

### Hosts berechnen – Schritt für Schritt

Mit der CIDR-Schreibweise kann man berechnen, wie viele Geräte in einem Netzwerk möglich sind.

**Formel:** `2^Hostbits − 2`

Warum `-2`? Weil Netzwerkadresse und Broadcastadresse reserviert sind und nicht vergeben werden dürfen.

**Beispiel für `192.168.1.0/24`:**

```
Schritt 1: IPv4 = 32 Bit gesamt
Schritt 2: /24 → 24 Netzwerkbits
Schritt 3: 32 − 24 = 8 Hostbits
Schritt 4: 2^8 = 256 mögliche Adressen
Schritt 5: 256 − 2 = 254 nutzbare Hosts
```

**Vollständige Adressübersicht für `192.168.1.0/24`:**

| Typ | Adresse |
|-----|---------|
| Netzwerkadresse | `192.168.1.0` |
| Erste Hostadresse | `192.168.1.1` |
| Letzte Hostadresse | `192.168.1.254` |
| Broadcastadresse | `192.168.1.255` |

> **Merksatz:** Erste Adresse = Netzwerk. Letzte Adresse = Broadcast. Alles dazwischen = nutzbare Hosts.

---

### 🧩 Mini-Quiz – Block 3

**Frage 1:** Was macht eine Subnetzmaske?
- A) Sie macht das Internet schneller
- B) **Sie trennt den Netz- und Hostanteil einer IP-Adresse** ✅
- C) Sie ersetzt den Router
- D) Sie verschlüsselt Daten

*Erklärung: Die Subnetzmaske zeigt, wie viele Bits zum Netzwerk und wie viele zum Host gehören.*

**Frage 2:** Was bedeutet `/24` in der CIDR-Schreibweise?
- A) 24 Geräte im Netzwerk
- B) 24 Router
- C) **24 Bit gehören zum Netzwerkanteil** ✅
- D) 24 IP-Adressen verfügbar

*Erklärung: Die Zahl hinter dem Slash ist die Anzahl Netzwerk-Bits. Bei /24 bleiben 32-24 = 8 Bits für Hosts übrig.*

**Frage 3:** Welche Adresse ist die Broadcastadresse im Netz `192.168.1.0/24`?
- A) `192.168.1.0`
- B) `192.168.1.1`
- C) **`192.168.1.255`** ✅
- D) `255.255.255.0`

*Erklärung: Bei /24 hat der letzte Block 8 Hostbits. Alle auf 1 gesetzt ergibt 255 → das ist die Broadcastadresse.*

**Frage 4:** Wie viele nutzbare Hosts gibt es bei `/24`?
- A) 24
- B) 256
- C) 255
- D) **254** ✅

*Erklärung: 2^8 = 256 mögliche Adressen − 2 reservierte (Netzwerk + Broadcast) = 254 nutzbare Hosts.*

---

## ──────────────────────────────────────
## BLOCK 4 – MAC-Adresse, private/öffentliche IPs & NAT
## ──────────────────────────────────────

### MAC-Adresse vs. IP-Adresse

Netzwerkgeräte haben zwei verschiedene Arten von Adressen, die für unterschiedliche Zwecke eingesetzt werden:

**MAC-Adresse (Media Access Control)**

Die MAC-Adresse ist eine **Hardware-Adresse**, die direkt in die Netzwerkkarte eingebrannt ist. Sie ist weltweit eindeutig und kann im Normalfall nicht verändert werden.

- Format: `C0-33-5E-2E-B2-4D` (6 Gruppen Hexadezimal, getrennt durch Bindestriche)
- Wird auf **OSI-Schicht 2** (Sicherungsschicht) verwendet
- Funktioniert nur **innerhalb desselben Netzwerks** – über Netzwerkgrenzen hinweg verliert sie ihre Bedeutung

**IP-Adresse (Internet Protocol)**

Die IP-Adresse ist eine **logische Adresse**, die vom Netzwerk zugewiesen wird. Sie kann sich ändern – z.B. wenn ein Gerät in ein anderes Netzwerk wechselt oder eine neue Adresse per DHCP erhält.

- Wird auf **OSI-Schicht 3** (Vermittlungsschicht) verwendet
- Ermöglicht die Kommunikation **über Netzwerkgrenzen** hinweg (Routing)

**Vergleich:**

| Merkmal | MAC-Adresse | IP-Adresse |
|---------|-------------|------------|
| Art | Hardware (physisch) | Logisch (Software) |
| Eindeutigkeit | Weltweit eindeutig | Nur im Netzwerk eindeutig |
| Veränderbar? | Nein (fest) | Ja (via DHCP) |
| OSI-Schicht | Schicht 2 | Schicht 3 |
| Reichweite | Lokales Netzwerk | Netzwerkübergreifend |

### Private vs. öffentliche IP-Adressen

Nicht alle IP-Adressen sind im Internet sichtbar. Es gibt zwei Kategorien:

**Private IP-Adressen** funktionieren nur im lokalen Netzwerk und sind im Internet nicht direkt erreichbar. Sie sind für jeden frei verwendbar – deshalb hat dein Heimnetz dieselben Adressen wie tausende andere Heimnetze.

Reservierte private Adressbereiche:
- `10.0.0.0` – `10.255.255.255`
- `172.16.0.0` – `172.31.255.255`
- `192.168.0.0` – `192.168.255.255`

**Öffentliche IP-Adressen** sind weltweit eindeutig und werden vom Internetanbieter (ISP) zugewiesen. Dein Router hat eine solche Adresse – darüber ist dein Heimnetz aus dem Internet erreichbar.

### NAT – Network Address Translation

Da alle Geräte im Heimnetz private IPs haben, der Router aber nur eine einzige öffentliche IP besitzt, ist **NAT** notwendig. NAT übersetzt zwischen den privaten Adressen der Geräte und der öffentlichen Adresse des Routers.

```
Gerät 1: 192.168.1.10  ──┐
Gerät 2: 192.168.1.11  ──┼──→  Router (NAT)  ──→  85.1.2.3 (öffentlich)
Gerät 3: 192.168.1.12  ──┘
```

Der Router merkt sich, welches Gerät welche Anfrage gesendet hat, und leitet die Antwort korrekt zurück. So können viele Geräte gleichzeitig über **eine** öffentliche IP-Adresse kommunizieren.

---

### 🧩 Mini-Quiz – Block 4

**Frage 1:** Welche Adresse ist in die Netzwerkkarte eingebrannt und weltweit eindeutig?
- A) IP-Adresse
- B) **MAC-Adresse** ✅
- C) Subnetzmaske
- D) Broadcastadresse

*Erklärung: Die MAC-Adresse ist eine Hardware-Adresse, die fest in die Netzwerkkarte eingebrannt ist.*

**Frage 2:** Welche IP-Adresse ist eine private Adresse?
- A) `8.8.8.8`
- B) `150.200.1.1`
- C) **`192.168.1.10`** ✅
- D) `77.88.99.11`

*Erklärung: `192.168.x.x` gehört zum reservierten privaten Adressbereich und ist im Internet nicht direkt erreichbar.*

**Frage 3:** Was macht NAT?
- A) WLAN-Signal verstärken
- B) Daten verschlüsseln
- C) Drucker mit dem Netzwerk verbinden
- D) **Private IP-Adressen in eine öffentliche IP-Adresse übersetzen** ✅

*Erklärung: NAT ermöglicht es, dass viele Geräte mit privaten IPs über die eine öffentliche IP des Routers ins Internet gelangen.*

**Frage 4:** Was ist der Hauptunterschied zwischen MAC- und IP-Adresse?
- A) MAC-Adressen sind länger als IP-Adressen
- B) IP-Adressen funktionieren nur lokal
- C) **MAC-Adressen sind Hardware-Adressen (fest), IP-Adressen sind logisch (veränderbar)** ✅
- D) Es gibt keinen Unterschied

*Erklärung: Die MAC-Adresse ist physisch in der Hardware, die IP-Adresse wird logisch vom Netzwerk zugewiesen und kann sich ändern.*

---

## ──────────────────────────────────────
## BLOCK 5 – Netzwerktopologien
## ──────────────────────────────────────

### Was ist eine Netzwerktopologie?

Eine Netzwerktopologie beschreibt den **Aufbau eines Netzwerks** – also wie die Geräte physisch oder logisch miteinander verbunden sind. Die Wahl der Topologie beeinflusst Ausfallsicherheit, Erweiterbarkeit und Kosten erheblich.

### Stern-Topologie

Bei der Stern-Topologie ist jedes Gerät einzeln mit einem **zentralen Switch** verbunden. Alle Kommunikation läuft über diesen zentralen Punkt.

```
     PC1
      |
PC4 - Switch - PC2
      |
     PC3
```

**Vorteile:**
- ✅ Einfach erweiterbar – neues Gerät einfach am Switch einstecken
- ✅ Fehler betreffen nur das einzelne Gerät, nicht das ganze Netz
- ✅ Einfache Fehlersuche
- ✅ Heute die mit Abstand häufigste Topologie

**Nachteile:**
- ❌ Fällt der Switch aus, ist das gesamte Netzwerk unterbrochen
- ❌ Mehr Kabel notwendig als bei Bus

### Bus-Topologie

Bei der Bus-Topologie sind alle Geräte an **ein gemeinsames Kabel** (den „Bus") angeschlossen. Jedes Gerät empfängt alle Datenpakete, leitet aber nur die weiter, die an es selbst adressiert sind.

```
PC1 --- PC2 --- PC3 --- PC4
|__________________________|
           Bus
```

**Vorteile:**
- ✅ Einfacher Aufbau, wenig Kabel
- ✅ Günstig in der Installation

**Nachteile:**
- ❌ Kabelbruch an einer Stelle stoppt das gesamte Netzwerk
- ❌ Langsam bei vielen Geräten, da alle dasselbe Kabel teilen
- ❌ Fehlersuche schwierig
- ❌ Heute veraltet und kaum noch verwendet

### Ring-Topologie

Bei der Ring-Topologie sind die Geräte ringförmig miteinander verbunden. Datenpakete werden von Gerät zu Gerät weitergereicht, bis sie den Empfänger erreichen.

```
PC1 → PC2
↑       ↓
PC4 ← PC3
```

**Vorteile:**
- ✅ Geregelte Datenübertragung (Token-Ring-Verfahren)
- ✅ Keine Datenkollisionen

**Nachteile:**
- ❌ Fällt ein Gerät oder ein Kabelstück aus, kann das gesamte Netz unterbrochen werden
- ❌ Aufwändigerer Aufbau und Verwaltung
- ❌ Heute ebenfalls kaum noch in Verwendung

### Mesh-Topologie

Bei der Mesh-Topologie hat jedes Gerät **mehrere direkte Verbindungen** zu anderen Geräten. Es gibt dadurch immer alternative Wege für Datenpakete.

```
PC1 ─── PC2
 | ╲   ╱ |
 |  ╲ ╱  |
PC4 ─── PC3
```

**Vorteile:**
- ✅ Sehr hohe Ausfallsicherheit – fällt eine Verbindung aus, gibt es Alternativen
- ✅ Ideal für kritische Infrastrukturen (z.B. Rechenzentren, militärische Netze)

**Nachteile:**
- ❌ Sehr teuer durch den hohen Verkabelungsaufwand
- ❌ Komplex in Aufbau und Verwaltung

### Vergleich auf einen Blick

| Topologie | Ausfallsicherheit | Kosten | Erweiterbarkeit | Heute |
|-----------|------------------|--------|----------------|-------|
| Stern | Mittel | Mittel | ✅ Einfach | ✅ Standard |
| Bus | Niedrig | Günstig | ❌ Schwierig | ❌ Veraltet |
| Ring | Niedrig | Mittel | ❌ Schwierig | ❌ Selten |
| Mesh | ✅ Hoch | Teuer | ❌ Komplex | Spezialfälle |

---

### 🧩 Mini-Quiz – Block 5

**Frage 1:** Welche Topologie wird heute in den meisten Netzwerken verwendet?
- A) Bus
- B) Ring
- C) Mesh
- D) **Stern** ✅

*Erklärung: Die Stern-Topologie ist heute der Standard, da sie einfach zu erweitern und zu verwalten ist.*

**Frage 2:** Was ist der grösste Nachteil der Bus-Topologie?
- A) Sie braucht zu viele Kabel
- B) Sie ist zu teuer
- C) **Ein Kabelbruch stoppt das gesamte Netzwerk** ✅
- D) Sie unterstützt kein WLAN

*Erklärung: Da alle Geräte dasselbe Kabel teilen, reicht ein einziger Defekt, um das ganze Netz lahmzulegen.*

**Frage 3:** Welche Topologie ist besonders ausfallsicher und warum?
- A) Bus, weil wenig Kabel
- B) Ring, weil geregelte Übertragung
- C) Stern, weil zentraler Switch
- D) **Mesh, weil es mehrere alternative Verbindungswege gibt** ✅

*Erklärung: Bei Mesh hat jedes Gerät mehrere Verbindungen – fällt eine aus, läuft der Datenverkehr über eine andere Route.*

**Frage 4:** Welche Topologie hat einen zentralen Switch als Mittelpunkt?
- A) Bus
- B) Ring
- C) Mesh
- D) **Stern** ✅

*Erklärung: Bei der Stern-Topologie sind alle Geräte einzeln mit einem zentralen Switch verbunden.*

---

## ──────────────────────────────────────
## BLOCK 6 – Das OSI-Modell & Netzwerkgeräte
## ──────────────────────────────────────

### Was ist das OSI-Modell?

Das **OSI-Modell** (Open Systems Interconnection) ist ein Referenzmodell, das die Kommunikation in einem Netzwerk in **7 Schichten** aufteilt. Jede Schicht hat eine klar definierte Aufgabe und kommuniziert nur mit der Schicht direkt darunter und darüber.

Das Modell hilft dabei, Netzwerkprobleme gezielt zu analysieren und Protokolle klar voneinander abzugrenzen.

### Die 7 Schichten

| Schicht | Name | Aufgabe | Beispiele |
|---------|------|---------|-----------|
| 7 | Anwendung | Dienste für Anwendungen bereitstellen | HTTP, FTP, DNS, SMTP |
| 6 | Darstellung | Daten kodieren, verschlüsseln, komprimieren | SSL/TLS, JPEG, ASCII |
| 5 | Sitzung | Verbindungen aufbauen, verwalten, beenden | NetBIOS, RPC |
| 4 | Transport | Zuverlässige Übertragung, Segmentierung | TCP, UDP |
| 3 | Vermittlung | Routing, logische Adressierung | IP, Router |
| 2 | Sicherung | Fehlerkorrektur, physische Adressierung | MAC, Switch, Ethernet |
| 1 | Bitübertragung | Bits als Signal übertragen | Kabel, WLAN, Glasfaser |

> **Merkhilfe (von oben nach unten):** „**A**lle **D**eutschen **S**tudenten **T**rinken **V**erschiedene **S**orten **B**ier"

### Was passiert beim Öffnen einer Webseite?

Ein konkretes Beispiel verdeutlicht das Zusammenspiel der Schichten: Du tippst `google.com` in deinen Browser.

| Schicht | Was passiert |
|---------|-------------|
| 7 | Browser erstellt eine HTTP-Anfrage |
| 6 | Verbindung wird per TLS verschlüsselt (HTTPS) |
| 5 | Eine Sitzung zum Server wird geöffnet und verwaltet |
| 4 | Die Anfrage wird in TCP-Segmente aufgeteilt |
| 3 | IP-Adresse des Servers wird ermittelt, Router sucht den Weg |
| 2 | Switch leitet das Paket anhand der MAC-Adresse weiter |
| 1 | Bits werden als elektrische Signale oder Funkwellen übertragen |

### Router und Switch im OSI-Kontext

Die zwei wichtigsten aktiven Netzwerkgeräte sind Router und Switch – beide auf unterschiedlichen OSI-Schichten:

**Router (Schicht 3 – Vermittlung):**
- Verbindet **verschiedene Netzwerke** miteinander
- Leitet Pakete anhand von **IP-Adressen** weiter
- Hat eine Routing-Tabelle, in der er mögliche Wege kennt
- Beispiel: Verbindet dein Heimnetz mit dem Internet

**Switch (Schicht 2 – Sicherung):**
- Verbindet **Geräte innerhalb desselben Netzwerks**
- Leitet Pakete anhand von **MAC-Adressen** weiter
- Sendet Pakete nur an den richtigen Port, nicht an alle (im Gegensatz zum alten Hub)
- Zentrales Gerät in der Stern-Topologie

| Merkmal | Router | Switch |
|---------|--------|--------|
| OSI-Schicht | 3 (Vermittlung) | 2 (Sicherung) |
| Adressierung | IP-Adresse | MAC-Adresse |
| Verbindet | Verschiedene Netzwerke | Geräte im selben Netzwerk |
| Typischer Einsatz | Heimnetz ↔ Internet | Stern-Topologie im LAN |

---

### 🧩 Mini-Quiz – Block 6

**Frage 1:** Wie viele Schichten hat das OSI-Modell?
- A) 4
- B) 5
- C) **7** ✅
- D) 8

*Erklärung: Das OSI-Modell besteht aus sieben Schichten, von der Bitübertragung (Schicht 1) bis zur Anwendungsschicht (Schicht 7).*

**Frage 2:** Auf welcher OSI-Schicht arbeitet ein Router?
- A) Schicht 1
- B) Schicht 2
- C) **Schicht 3** ✅
- D) Schicht 7

*Erklärung: Router arbeiten auf der Vermittlungsschicht (Schicht 3) und nutzen IP-Adressen für das Routing.*

**Frage 3:** Welche Schicht ist für MAC-Adressen und Switches zuständig?
- A) Schicht 1
- B) **Schicht 2** ✅
- C) Schicht 3
- D) Schicht 4

*Erklärung: Schicht 2 (Sicherungsschicht) ist für MAC-Adressen und Switches zuständig.*

**Frage 4:** Was ist der Unterschied zwischen Router und Switch?
- A) Ein Switch verbindet Netzwerke, ein Router verbindet Geräte
- B) **Ein Router verbindet verschiedene Netzwerke (IP), ein Switch verbindet Geräte im selben Netzwerk (MAC)** ✅
- C) Beide machen dasselbe, aber auf verschiedenen Schichten
- D) Ein Router arbeitet mit MAC-Adressen, ein Switch mit IP-Adressen

*Erklärung: Router = Netzwerk zu Netzwerk (Schicht 3, IP). Switch = Gerät zu Gerät im selben Netz (Schicht 2, MAC).*

---

## ──────────────────────────────────────
## BLOCK 7 – Protokolle: TCP, UDP, DNS & DHCP
## ──────────────────────────────────────

### TCP vs. UDP

Beide Protokolle arbeiten auf **OSI-Schicht 4** (Transportschicht) und bestimmen, wie Datenpakete übertragen werden. Sie unterscheiden sich grundlegend in ihrer Philosophie: Zuverlässigkeit vs. Geschwindigkeit.

**TCP – Transmission Control Protocol**

TCP stellt eine **gesicherte Verbindung** her. Bevor Daten gesendet werden, findet ein sogenannter **Three-Way-Handshake** statt:

```
Client  →  SYN          →  Server   (Ich möchte verbinden)
Client  ←  SYN-ACK      ←  Server   (Verstanden, bereit)
Client  →  ACK          →  Server   (Verbindung aufgebaut)
```

Danach wird jedes gesendete Paket vom Empfänger bestätigt. Kommt keine Bestätigung, wird das Paket erneut gesendet. Das macht TCP zuverlässig, aber etwas langsamer.

→ Einsatz: Webseiten (HTTP/HTTPS), E-Mails, Datei-Downloads, alles wo Vollständigkeit wichtig ist

**UDP – User Datagram Protocol**

UDP sendet Pakete ohne Verbindungsaufbau und ohne Bestätigung – einfach los. Verlorene Pakete werden nicht erneut gesendet. Das macht UDP sehr schnell, aber ohne Garantie.

→ Einsatz: Online-Games, Livestreams, Video-Calls, DNS-Anfragen – alles wo Geschwindigkeit wichtiger ist als Vollständigkeit

**Vergleich:**

| Merkmal | TCP | UDP |
|---------|-----|-----|
| Verbindungsaufbau | ✅ Ja (Handshake) | ❌ Nein |
| Zuverlässigkeit | ✅ Hoch | ❌ Niedrig |
| Geschwindigkeit | Etwas langsamer | ✅ Schneller |
| Bestätigung | ✅ Ja | ❌ Nein |
| Typischer Einsatz | Downloads, Web, E-Mail | Games, Streams, VoIP |

### DNS – Domain Name System

Menschen merken sich Namen wie `google.com` viel besser als IP-Adressen wie `142.250.74.46`. **DNS** übersetzt diese Namen automatisch in IP-Adressen – wie ein digitales Telefonbuch.

**Ablauf einer DNS-Anfrage:**
```
Du tippst: google.com
    ↓
Browser fragt DNS-Server: "Was ist die IP von google.com?"
    ↓
DNS-Server antwortet: "142.250.74.46"
    ↓
Browser verbindet sich mit 142.250.74.46
```

Ohne DNS müsste man sich für jede Webseite die numerische IP-Adresse merken – unpraktisch bei tausenden von Websites.

> **Merkhilfe:** DNS ist wie ein Telefonbuch – du schlägst den Namen nach und bekommst die Nummer (IP-Adresse).

### DHCP – Dynamic Host Configuration Protocol

Damit ein Gerät im Netzwerk kommunizieren kann, braucht es mehrere Einstellungen: eine IP-Adresse, eine Subnetzmaske, einen Standard-Gateway und einen DNS-Server. **DHCP** vergibt all das **automatisch**, sobald sich ein neues Gerät im Netzwerk anmeldet.

**Ablauf einer DHCP-Anfrage:**
```
Gerät betritt Netzwerk → sendet DHCP-Discover (Broadcast)
    ↓
DHCP-Server antwortet → bietet IP-Adresse an (DHCP-Offer)
    ↓
Gerät akzeptiert → DHCP-Request
    ↓
Server bestätigt → DHCP-ACK → Gerät hat nun alle Einstellungen
```

**Was DHCP automatisch vergibt:**
- IP-Adresse (z.B. `192.168.1.42`)
- Subnetzmaske (z.B. `255.255.255.0`)
- Standard-Gateway (z.B. `192.168.1.1` = Router)
- DNS-Server-Adresse (z.B. `8.8.8.8`)

Ohne DHCP müsste jedes Gerät manuell konfiguriert werden – bei einem Schulnetzwerk mit hunderten Geräten wäre das sehr aufwändig.

---

### 🧩 Mini-Quiz – Block 7

**Frage 1:** Welches Protokoll stellt eine gesicherte Verbindung her und bestätigt jedes Paket?
- A) UDP
- B) **TCP** ✅
- C) DNS
- D) DHCP

*Erklärung: TCP baut eine Verbindung per Three-Way-Handshake auf und bestätigt jedes gesendete Paket.*

**Frage 2:** Welches Protokoll wird oft für Online-Games und Livestreams verwendet?
- A) TCP
- B) **UDP** ✅
- C) DNS
- D) DHCP

*Erklärung: UDP ist schneller als TCP, da kein Verbindungsaufbau und keine Bestätigungen nötig sind.*

**Frage 3:** Was macht DNS?
- A) Es verschlüsselt Datenpakete
- B) Es vergibt automatisch IP-Adressen
- C) **Es übersetzt Webseitennamen in IP-Adressen** ✅
- D) Es verbindet WLAN-Geräte

*Erklärung: DNS wandelt Namen wie `google.com` in die zugehörige IP-Adresse um – wie ein digitales Telefonbuch.*

**Frage 4:** Was macht DHCP?
- A) Webseiten öffnen
- B) Daten verschlüsseln
- C) Netzwerke miteinander verbinden
- D) **Automatisch IP-Adressen und Netzwerkeinstellungen an neue Geräte vergeben** ✅

*Erklärung: DHCP verteilt beim Beitritt eines neuen Geräts automatisch IP-Adresse, Subnetzmaske, Gateway und DNS-Server.*

---


---

*Erstellt: 2026-05-31 | Quelle: Modul 117 – Informatik- und Netzinfrastruktur betreiben*
*→ Nächster Schritt: Inhalte in `pages/m117.html` einfügen, quizData in `js/quiz.js` ergänzen*
