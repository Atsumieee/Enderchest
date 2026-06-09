---
title: Zugriffsschutz - Angriffsmethoden
tags:
  - security
  - m231
  - schule
created: 2026-06-09
status: permanent
publish: true
todo: false
---

# Angriffsmethoden

## Überblick

Passwörter und Accounts werden nicht zufällig kompromittiert — Angreifer nutzen systematische Methoden, viele davon vollautomatisiert. Das Verständnis wie ein Angriff funktioniert macht den Unterschied zwischen einer theoretischen Warnung und echtem Schutzverhalten. Diese Seite erklärt die wichtigsten Methoden, wie sie ablaufen und was konkret dagegen hilft.

---

## Zwei Kategorien von Angriffen

Angriffe auf Zugangsdaten lassen sich in zwei grundlegende Kategorien einteilen:

**Technische Angriffe** richten sich gegen das System selbst — sie nutzen Schwächen in Passwörtern, Datenbanken oder Protokollen aus. Sie laufen automatisiert und skalieren auf Millionen von Versuchen pro Sekunde.

**Menschliche Angriffe** richten sich gegen den Nutzer — sie nutzen Vertrauen, Unaufmerksamkeit oder Unwissen aus. Kein technisches System schützt dagegen wenn der Mensch selbst das schwächste Glied ist.

In der Praxis kombinieren Angreifer oft beide Kategorien: Phishing um Zugangsdaten zu stehlen, dann Credential Stuffing um sie auf anderen Plattformen zu testen.

---

## Technische Angriffe

### Brute Force Attack

Der Angreifer probiert systematisch alle möglichen Zeichenkombinationen durch — von `aaa` bis `zzz9999!`. Mit moderner Hardware können Milliarden Versuche pro Sekunde gemacht werden.

Wie der Angriff läuft: Ein automatisiertes Script versucht jede mögliche Kombination auf einem Login-Formular oder direkt gegen eine gestohlene Hash-Datenbank. Gegen eine lokale Hash-Datenbank gibt es keine Sperrung — der Angreifer kann so lange probieren wie er will.

Schutz:
- Langes Passwort ab 16 Zeichen macht Brute Force praktisch unmöglich — die Anzahl möglicher Kombinationen explodiert mit jedem zusätzlichen Zeichen
- Account-Sperrung nach mehreren Fehlversuchen auf Login-Formularen
- Rate Limiting auf Server-Seite verlangsamt automatisierte Angriffe

### Dictionary Attack

Statt aller Kombinationen werden nur realistische Passwörter ausprobiert — aus Wörterbüchern, bekannten Mustern und früheren Datenlecks. Viel effizienter als reines Brute Force, weil Menschen vorhersehbare Passwörter wählen.

Wie der Angriff läuft: Werkzeuge wie Hashcat laden eine Liste mit Millionen bekannter Passwörter und Varianten (`Pizza123`, `Sommer2024!`, `qwerty!`) und testen sie systematisch. Typische Substitutionsmuster wie `@` statt `a` oder `3` statt `e` sind alle enthalten.

Schutz:
- Keine Wörter aus dem Wörterbuch als Basis verwenden
- Passphrase mit unerwarteter Wortkombination — nicht `Hund-liebt-Knochen` sondern `Kaffeekanne-fliegt-Mond-42`
- Passwortmanager generiert vollständig zufällige Strings die in keinem Wörterbuch stehen

### Credential Stuffing

Gestohlene Nutzername-Passwort-Paare aus einem Datenleck werden automatisch auf hunderten anderen Websites ausprobiert. Funktioniert weil viele Menschen dasselbe Passwort auf mehreren Plattformen verwenden.

Wie der Angriff läuft: Ein Gaming-Forum wird gehackt, zwei Millionen Passwörter landen im Darknet. Angreifer laden die Liste und testen sie automatisiert bei Banken, Netflix, Gmail — und finden tausende Treffer bei Nutzern die ihr Passwort mehrfach verwendet haben.

Schutz:
- Jeder Account braucht ein einzigartiges Passwort — ist eines kompromittiert, sind die anderen sicher
- MFA: selbst mit richtigem Passwort kein Zugang ohne zweiten Faktor
- Have I Been Pwned prüft ob die eigene E-Mail-Adresse in bekannten Datenlecks vorkommt

### Password Spraying

Das Gegenteil von Brute Force: ein einzelnes Passwort wird gegen viele verschiedene Accounts getestet. Dadurch wird die Account-Sperrung umgangen, die bei zu vielen Fehlversuchen pro Account greift.

Wie der Angriff läuft: Der Angreifer wählt ein häufiges Passwort wie `Winter2024!` und testet es gegen zehntausend Firmen-Accounts. Nur ein Versuch pro Account — die Sperrung greift nie. Statistisch gesehen verwenden aber ein bis zwei Prozent aller Nutzer genau dieses Passwort.

Schutz:
- Keine saisonalen oder vorhersehbaren Passwörter (`Frühling2025!`, `Firma2024`)
- MFA macht den einzigen Versuch wertlos selbst wenn das Passwort stimmt
- Monitoring auf ungewöhnliche Login-Muster erkennt koordinierte Spraying-Angriffe

---

## Menschliche Angriffe

### Phishing

Täuschend echte gefälschte Websites oder E-Mails verleiten dich dazu, deine Zugangsdaten freiwillig einzugeben. Der Angreifer muss das System nicht hacken — du gibst ihm den Schlüssel selbst.

Wie der Angriff läuft: Eine E-Mail von `noreply@paypa1.com` (mit einer Eins statt einem kleinen L) warnt: "Ihr Konto wurde gesperrt." Der Link führt zu einer perfekten PayPal-Kopie. Du loggst dich ein — und gibst dem Angreifer deine Zugangsdaten. Die gefälschte Seite leitet dich danach sogar zur echten Seite weiter, damit du nichts merkst.

Schutz:
- URL genau prüfen bevor Daten eingegeben werden — insbesondere auf ähnlich aussehende Zeichen achten
- Passwortmanager füllt nur auf der echten Domain aus — auf einer gefälschten Seite passiert nichts, was den Angriff sofort entlarvt
- Hardware-Token nach FIDO2-Standard ist phishing-resistent: er ist an die echte Domain gebunden und funktioniert auf Fälschungen strukturell nicht

### Social Engineering

Manipulation statt Technik: der Angreifer gibt sich als Kollege, IT-Support oder Behörde aus und überzeugt dich, Zugangsdaten herauszugeben oder eine Aktion auszuführen. Kein technisches System schützt gegen überzeugend klingende Menschen.

Wie der Angriff läuft: "Hallo, ich bin vom IT-Support. Wir haben ein dringendes Sicherheitsproblem auf deinem Account festgestellt. Kannst du mir kurz dein Passwort geben damit ich es zurücksetzen kann?" — Legitimer IT-Support fragt nie nach dem Passwort. Aber unter Zeitdruck und mit autoritärer Stimme geben viele Menschen trotzdem nach.

Schutz:
- Echte IT-Abteilungen fragen nie nach dem Passwort — dieser Satz ist absolut
- Identität immer über offizielle Kanäle verifizieren, nicht über die Kontaktdaten aus der verdächtigen Nachricht
- Im Zweifel: auflegen und die offizielle Nummer der IT direkt anrufen

### Keylogger

Schadsoftware zeichnet alle Tastatureingaben auf und sendet sie an den Angreifer. Jedes eingegebene Passwort wird abgefangen — bevor es gehasht oder verschlüsselt werden kann.

Wie der Angriff läuft: Du lädst einen kostenlosen Software-Crack herunter. Im Hintergrund installiert sich ein Keylogger der jede Taste aufzeichnet und regelmässig an einen Server des Angreifers sendet. Jedes Passwort, jede Kreditkartennummer, jede private Nachricht — alles mitgelesen.

Schutz:
- Keine Software aus unbekannten oder unseriösen Quellen herunterladen
- Aktuelles Antivirenprogramm erkennt viele bekannte Keylogger
- MFA schützt teilweise: selbst mit abgefangenem Passwort fehlt dem Angreifer der zweite Faktor
- Passwortmanager mit Auto-Fill umgeht teilweise Keylogger da das Passwort nicht getippt wird

---

## Zusammenfassung: Angriff und Gegenmassnahme

Die folgende Übersicht zeigt welche Schutzmassnahmen gegen welche Angriffe wirken. Auffällig ist dass MFA und einzigartige Passwörter gegen fast alle technischen Angriffe helfen — sie sind deshalb keine optionalen Extras sondern Grundschutz.

| Angriff | Langer Passwort | Einzigartiges PW | MFA | Passwortmanager |
|---|---|---|---|---|
| Brute Force | Sehr effektiv | — | Effektiv | — |
| Dictionary Attack | Effektiv | — | Effektiv | Sehr effektiv |
| Credential Stuffing | — | Sehr effektiv | Sehr effektiv | Sehr effektiv |
| Password Spraying | Effektiv | — | Sehr effektiv | — |
| Phishing | — | — | Teilweise | Sehr effektiv |
| Keylogger | — | — | Teilweise | Teilweise |
| Social Engineering | — | — | — | — |

Social Engineering ist die einzige Methode gegen die kein technisches Werkzeug vollständig schützt — nur Wissen und gesundes Misstrauen helfen.

```widget
Angriffsmethoden — interaktiver Explorer mit Szenarien und Schutzmassnahmen
```

---

## Schlüsselbegriffe

- **Brute Force Attack**: Systematisches Durchprobieren aller möglichen Passwortkombinationen.
- **Dictionary Attack**: Angriff mit einer Liste bekannter Passwörter und Muster — effizienter als reines Brute Force.
- **Credential Stuffing**: Gestohlene Passwörter aus einem Datenleck werden auf anderen Plattformen getestet.
- **Password Spraying**: Ein einzelnes Passwort wird gegen viele Accounts getestet um Sperrmechanismen zu umgehen.
- **Phishing**: Gefälschte Websites oder E-Mails die zur freiwilligen Eingabe von Zugangsdaten verleiten.
- **Social Engineering**: Manipulation von Menschen um Zugangsdaten oder sicherheitsrelevante Aktionen zu erlangen.
- **Keylogger**: Schadsoftware die Tastatureingaben aufzeichnet und an Angreifer sendet.
- **Rate Limiting**: Serverseitige Begrenzung der Anzahl Anfragen pro Zeiteinheit — erschwert automatisierte Angriffe.
- **SIM-Swapping**: Übernahme einer Telefonnummer um SMS-TANs abzufangen.

---

## Verbindungen zu anderen Themen

| Thema | Verbindung |
|-------|------------|
| [[Hashing]] | Brute Force, Dictionary Attack und Rainbow Tables setzen direkt an Passwort-Schwächen an — die technischen Grundlagen stehen dort. |
| [[MFA]] | MFA ist die wirksamste Gegenmassnahme gegen die meisten technischen Angriffe. |
| [[TOTP]] | Passwortmanager und FIDO2-Token schützen konkret gegen Phishing und Credential Stuffing. |
| [[Berechtigungskonzept]] | Least Privilege begrenzt den Schaden wenn ein Account trotz aller Massnahmen kompromittiert wird. |

---

## Quellen & Links

- [Have I Been Pwned — Datenleck-Prüfung](https://haveibeenpwned.com)
- [NCSC: Phishing erkennen](https://www.ncsc.admin.ch)
- [iBarry: Phishing und Social Engineering](https://www.ibarry.ch)