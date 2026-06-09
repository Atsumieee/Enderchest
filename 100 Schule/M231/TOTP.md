---
title: Zugriffsschutz - Tools & moderne Authentifizierung
tags:
  - security
  - m231
  - schule
created: 2026-06-09
status: permanent
publish: true
todo: false
---

# Tools & moderne Authentifizierung

## Überblick

Theorie allein schützt nicht. Diese Seite zeigt die konkreten Werkzeuge die heute im Einsatz sind — und wie sie technisch funktionieren. Der Fokus liegt auf dem Verständnis der Funktionsweise, nicht nur auf der Bedienung. Wer weiss wie ein Passwortmanager oder eine Authenticator-App intern arbeitet, kann besser einschätzen wann und warum sie sicher sind.

---

## Passwortmanager

Der wichtigste Grundsatz zuerst: kein Mensch kann sich 50 verschiedene starke Passwörter merken. Das ist keine Schwäche — das ist Biologie. Die Lösung ist nicht mehr Disziplin, sondern das richtige Werkzeug.

Ein Passwortmanager ist eine verschlüsselte Datenbank für alle Zugangsdaten. Das einzige Passwort das der Nutzer sich merken muss ist das Masterpasswort — alles andere wird vom Manager generiert, gespeichert und beim Login automatisch ausgefüllt.

### Wie ein Passwortmanager technisch funktioniert

Die gesamte Passwort-Datenbank wird lokal mit dem Masterpasswort verschlüsselt — bevor sie den Geräten des Nutzers verlässt. Das Verschlüsselungsverfahren (typischerweise AES-256) ist so ausgelegt dass selbst der Anbieter die gespeicherten Passwörter nicht lesen kann. Dieses Prinzip nennt sich Zero-Knowledge-Architektur.

Ablauf beim Login auf einer Website:
1. Nutzer öffnet eine Website
2. Browser-Extension erkennt die Domain
3. Manager prüft ob ein Eintrag für diese Domain existiert
4. Passwort wird automatisch ausgefüllt — ohne dass der Nutzer es je sieht oder tippt

Der letzte Punkt hat einen wichtigen Nebeneffekt: weil das Passwort nie getippt wird, können Keylogger es nicht abfangen. Und weil der Manager die Domain prüft, füllt er auf Phishing-Seiten nichts aus — die gefälschte Domain stimmt nicht mit dem gespeicherten Eintrag überein.

### Das Masterpasswort

Das Masterpasswort ist der einzige Schlüssel zur gesamten Passwort-Datenbank. Es gibt keine Hintertür und keine Wiederherstellungsoption die der Anbieter öffnen könnte — das ist gewollt und ist der Kern der Zero-Knowledge-Architektur.

Das bedeutet aber auch: Masterpasswort verloren gleich alle Passwörter verloren. Deshalb gelten für das Masterpasswort besondere Regeln:

- Eine lange Passphrase wählen: `Mein-Hund-heisst-Bello-42!`
- Auf Papier aufschreiben und sicher aufbewahren — nicht am Computer, nicht in der Cloud
- Backup-Codes erstellen und extern lagern
- Nirgendwo sonst verwenden

### Empfohlene Passwortmanager

Bitwarden ist Open Source, kostenlos und plattformübergreifend verfügbar — der Quellcode ist öffentlich einsehbar und regelmässig auditiert. 1Password ist eine kostenpflichtige Alternative mit starkem Fokus auf Usability. KeePass speichert die Datenbank lokal ohne Cloud-Synchronisation — maximale Kontrolle, weniger Komfort.

---

## Authenticator-Apps und TOTP

Eine Authenticator-App ist die häufigste Implementierung des Besitz-Faktors bei MFA. Sie generiert alle 30 Sekunden einen neuen 6-stelligen Code — ohne Internetverbindung, ohne SMS.

### Wie TOTP funktioniert

TOTP steht für Time-based One-Time Password. Das Verfahren basiert auf einem gemeinsamen Geheimnis zwischen Handy und Server.

Bei der Einrichtung wird ein geheimes Seed per QR-Code auf die App übertragen. Danach kennen sowohl die App als auch der Server dieses Geheimnis. Alle 30 Sekunden berechnen beide Seiten unabhängig voneinander denselben Code — basierend auf dem Geheimnis und dem aktuellen 30-Sekunden-Zeitfenster. Der Algorithmus dahinter heisst HMAC-SHA1.

Beim Login gibt der Nutzer den aktuell angezeigten Code ein. Der Server berechnet seinerseits den erwarteten Code und vergleicht. Stimmt beides überein — Zugang gewährt.

Warum das sicher ist: Ein abgefangener Code ist nach 30 Sekunden wertlos. Ein Angreifer müsste den Code in diesem Fenster abfangen und sofort einsetzen — während der Nutzer gerade selbst einloggt. Das ist in der Praxis kaum realisierbar.

> **Merkhilfe:** TOTP ist wie ein Einmal-Schlüssel der sich alle 30 Sekunden selbst zerstört. Selbst wenn jemand zuschaut, ist der Code schon abgelaufen bevor er ihn einsetzen kann.

```widget
Tools & moderne Authentifizierung — Passwortmanager, TOTP-Simulator, Passkeys, Vergleich
```

---

## Hardware-Token: YubiKey

Ein YubiKey ist ein physischer USB- oder NFC-Stick der als zweiter Faktor eingesetzt wird. Er implementiert den FIDO2/WebAuthn-Standard und ist damit die sicherste Form von MFA die heute für Konsumenten verfügbar ist.

Beim Login wird der YubiKey eingesteckt und ein Knopf gedrückt. Der Key signiert eine Anfrage des Servers kryptografisch — ohne je ein Passwort oder Code zu übertragen. Der private Schlüssel verlässt den Hardware-Token nie.

Der entscheidende Vorteil gegenüber TOTP: der YubiKey ist phishing-resistent. Er ist an die exakte Domain gebunden die bei der Einrichtung registriert wurde. Auf einer gefälschten Seite schlägt die Authentifizierung strukturell fehl — der Token erkennt dass die Domain nicht stimmt und verweigert die Signatur.

---

## Passkeys und WebAuthn / FIDO2

Passkeys sind die modernste Entwicklung im Bereich Authentifizierung und könnten Passwörter langfristig ablösen. Grosse Plattformen wie Apple, Google und Microsoft unterstützen Passkeys bereits.

### Wie Passkeys funktionieren

Statt eines Passworts wird bei der Registrierung ein kryptografisches Schlüsselpaar erzeugt. Der öffentliche Schlüssel geht an den Server, der private Schlüssel bleibt auf dem Gerät — gesichert durch Biometrie oder Geräte-PIN.

Beim Login schickt der Server eine zufällige Challenge — eine einmalige mathematische Aufgabe die nur mit dem richtigen privaten Schlüssel lösbar ist. Das Gerät entsperrt den privaten Schlüssel per Face ID oder Fingerabdruck, signiert die Challenge und schickt die Signatur zurück. Der Server prüft sie mit dem gespeicherten öffentlichen Schlüssel — kein Passwort wurde je übertragen.

### Warum Passkeys phishing-resistent sind

Der private Schlüssel ist kryptografisch an die exakte Domain gebunden die bei der Registrierung verwendet wurde. Auf einer gefälschten Seite — selbst einer perfekten Kopie — stimmt die Domain nicht. Die Authentifizierung schlägt strukturell fehl, bevor überhaupt Daten übertragen werden.

Das ist ein grundlegender Unterschied zu Passwörtern: ein Passwort kann auf jeder beliebigen Seite eingegeben werden. Ein Passkey kann nur auf der einen echten Seite eingesetzt werden.

> **Merkhilfe:** Ein Passkey ist wie ein Schlüssel der nur in ein bestimmtes Schloss passt — kopieren hilft nicht, weil das Schloss die Fälschung sofort erkennt.

---

## Biometrie: Stärken und Grenzen

Biometrische Authentifizierung ist bequem und bei guter Implementierung sicher. Aber sie hat strukturelle Grenzen die verstanden werden müssen.

Stärken: immer dabei, nicht vergessbar, schwer zu fälschen bei moderner Implementierung. Face ID auf dem iPhone verwendet ein 3D-Infrarot-Modell — ein Foto reicht nicht.

Grenzen: biometrische Daten können nicht geändert werden. Wird ein Passwort gestohlen, wählt man ein neues. Wird ein Fingerabdruck kompromittiert, kann man keinen neuen Finger wachsen lassen. Deshalb werden biometrische Daten in modernen Systemen nie direkt verglichen — stattdessen wird ein mathematisches Merkmal (Template) lokal auf dem Gerät gespeichert und verglichen. Das Template verlässt das Gerät nie.

---

## Schlüsselbegriffe

- **Passwortmanager**: Verschlüsselte Datenbank für alle Zugangsdaten, geschützt durch ein einziges Masterpasswort.
- **Zero-Knowledge-Architektur**: Systemdesign bei dem der Anbieter keinen Zugang zu den Nutzerdaten hat — nur der Nutzer selbst kann entschlüsseln.
- **Masterpasswort**: Das einzige Passwort das der Nutzer sich merken muss — Schlüssel zur gesamten Passwort-Datenbank.
- **TOTP (Time-based One-Time Password)**: Zeitbasierter Einmalcode der alle 30 Sekunden neu berechnet wird — Basis für Authenticator-Apps.
- **HMAC-SHA1**: Kryptografischer Algorithmus den TOTP zur Code-Berechnung verwendet.
- **YubiKey**: Physischer Hardware-Token der FIDO2/WebAuthn implementiert — die sicherste Consumer-MFA-Methode.
- **Passkey**: Kryptografisches Schlüsselpaar das Passwörter ersetzt — phishing-resistent und an eine Domain gebunden.
- **WebAuthn**: Web-Standard für passwortlose Authentifizierung, Teil des FIDO2-Frameworks.
- **FIDO2**: Industriestandard für starke Authentifizierung ohne Passwort — entwickelt von der FIDO Alliance.
- **Challenge-Response**: Authentifizierungsverfahren bei dem der Server eine Aufgabe stellt die nur mit dem richtigen Schlüssel lösbar ist.
- **Biometrisches Template**: Mathematische Repräsentation eines biometrischen Merkmals — ersetzt die direkte Speicherung von Fingerabdruck oder Gesichtsdaten.

---

## Verbindungen zu anderen Themen

| Thema                                                    | Verbindung                                                                                                                                          |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [[MFA]] | Passwortmanager implementieren den Wissen-Faktor, Authenticator-Apps den Besitz-Faktor, Passkeys kombinieren Besitz und Biometrie.                  |
| [[Hashing]]         | Passwortmanager bauen auf den Grundlagen von sicheren Passwörtern und Hashing auf — Zero-Knowledge-Verschlüsselung ist verwandt mit Salted Hashing. |
| [[Angriffsmethoden]]    | Passwortmanager schützen gegen Phishing und Keylogger. FIDO2-Token schützen strukturell gegen Phishing.                                             |

---

## Quellen & Links

- [Bitwarden (Open Source Passwortmanager)](https://bitwarden.com)
- [1Password](https://1password.com)
- [Google Authenticator](https://support.google.com/accounts/answer/1066447)
- [Authy](https://authy.com)
- [FIDO Alliance: Was sind Passkeys?](https://fidoalliance.org/passkeys)
- [iBarry: Passkeys erklärt](https://www.ibarry.ch)