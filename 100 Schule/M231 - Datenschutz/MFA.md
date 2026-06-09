---
title: Zugriffsschutz - Authentifizierungsfaktoren & MFA
tags:
  - security
  - m231
  - schule
created: 2026-06-09
status: permanent
publish: true
todo: false
---

# Authentifizierungsfaktoren & MFA

## Überblick

Auf der vorherigen Seite haben wir geklärt was Authentifizierung ist — das Beweisen der eigenen Identität. Jetzt geht es darum wie dieser Beweis erbracht wird. Es gibt genau drei Kategorien von Beweismitteln, sogenannte Faktoren. Wer mehrere davon kombiniert, schützt sich deutlich besser als mit einem einzelnen allein.

---

## Die drei Authentifizierungsfaktoren

Jeder Faktor beantwortet eine andere Grundfrage darüber was du zur Authentifizierung einsetzt.

### Faktor 1 — Wissen (Something you know)

Du kennst eine Information die nur du kennen solltest. Das System vergleicht deine Eingabe mit dem gespeicherten Wert — stimmt es überein, bist du authentifiziert.

Beispiele: Passwort, PIN, Sicherheitsfrage, Passphrase.

Stärke: sehr bequem, kein Gerät nötig.
Schwäche: Wissen kann ausgespäht, erraten oder per Phishing gestohlen werden. Wer die Information kennt, kommt rein — egal ob er die richtige Person ist oder nicht.

### Faktor 2 — Besitz (Something you have)

Du besitzt ein physisches oder digitales Objekt das den Zugang ermöglicht. Ohne dieses Objekt kein Zugang — selbst wenn das Passwort bekannt ist.

Beispiele: Smartphone mit Authenticator-App, Chipkarte, YubiKey, Bankomatkarte, SMS-TAN.

Stärke: Ein Angreifer braucht nicht nur das Passwort, sondern auch das physische Gerät.
Schwäche: Das Gerät kann verloren gehen oder gestohlen werden. SMS-TAN ist zusätzlich anfällig für SIM-Swapping — ein Angreifer übernimmt die Telefonnummer und empfängt die Codes.

### Faktor 3 — Biometrie (Something you are)

Körperliche Merkmale die eindeutig zu dir gehören. Du kannst sie nicht vergessen und nicht verlieren.

Beispiele: Fingerabdruck, Face ID, Iris-Scan, Stimmerkennung.

Stärke: Sehr bequem, immer dabei, schwer zu fälschen bei guter Implementierung.
Schwäche: Biometrische Daten können nicht geändert werden — ein Datenleck ist permanent. Bei schlechter Implementierung ist Spoofing mit Fotos oder 3D-Modellen möglich.

> **Merkhilfe:** Die drei Faktoren lassen sich einfach merken als: etwas das du **weisst**, etwas das du **hast**, etwas das du **bist**.

---

## Multi-Faktor-Authentifizierung (MFA)

Ein einzelner Faktor ist grundsätzlich angreifbar. Ein Passwort kann gestohlen werden. Ein Handy kann verloren gehen. Die Lösung ist die Kombination mehrerer Faktoren — das nennt sich Multi-Faktor-Authentifizierung, kurz MFA.

Die entscheidende Regel dabei: die Faktoren müssen aus verschiedenen Kategorien stammen. Zwei Passwörter hintereinander sind kein MFA — das sind immer noch zwei Wissen-Faktoren. Ein Angreifer der eine Kategorie kompromittiert hat, hat damit automatisch beide.

Echtes MFA kombiniert zum Beispiel:
- Passwort (Wissen) + Authenticator-App (Besitz)
- PIN (Wissen) + Fingerabdruck (Biometrie)
- Chipkarte (Besitz) + Face ID (Biometrie)

Spricht man von genau zwei kombinierten Faktoren, nennt man das Zwei-Faktor-Authentifizierung (2FA). MFA ist der allgemeinere Begriff und schliesst auch drei Faktoren gleichzeitig ein.

> **Merkhilfe:** Der Bankomat macht es vor — Karte (Besitz) + PIN (Wissen) ist echtes 2FA. Wird die Karte gestohlen, nützt sie nichts ohne die PIN. Wird die PIN ausgespäht, nützt sie nichts ohne die Karte.

```widget
Authentifizierungsfaktoren & MFA Interaktiver Explorer
```

---

## Single Sign-On (SSO)

SSO ist ein Sonderfall der Authentifizierung: eine einmalige Anmeldung gibt Zugang zu mehreren verbundenen Systemen ohne erneuten Login. Typisches Beispiel ist der Google-Account — wer sich einmal anmeldet, kann Gmail, Drive und YouTube nutzen ohne sich je wieder separat einzuloggen.

In Firmen wird SSO oft über einen zentralen Identity Provider (IdP) wie Azure AD oder Okta realisiert.

**Vorteil:** Weniger Passwörter, einheitliche Sicherheitspolicy, komfortabler für Nutzer.

**Risiko:** Ein kompromittierter SSO-Account öffnet alle verbundenen Dienste gleichzeitig. SSO ist ein Single Point of Failure — deshalb ist MFA beim SSO-Login besonders wichtig.

---

## Welche MFA-Methode ist die beste?

Nicht alle MFA-Methoden sind gleich sicher. Von schwächster zu stärkster:

1. SMS-TAN: besser als nichts, aber anfällig für SIM-Swapping und Phishing.
2. Authenticator-App (TOTP): deutlich sicherer, Code gilt nur 30 Sekunden.
3. Push-Benachrichtigung: komfortabel, aber anfällig für MFA-Fatigue-Angriffe (Angreifer schickt so viele Anfragen bis der Nutzer aus Versehen bestätigt).
4. Hardware-Token (YubiKey / FIDO2): am sichersten, phishing-resistent, an die echte Domain gebunden.

> **Merkhilfe:** SMS ist wie ein Briefkasten — theoretisch nur für dich, aber jemand anders kann ihn öffnen. Eine Authenticator-App ist wie ein Tresor — nur mit dem richtigen Gerät zugänglich.

---

## Schlüsselbegriffe

- **Authentifizierungsfaktor**: Eine Kategorie von Beweismitteln zur Verifikation der Identität.
- **Wissen (Something you know)**: Faktor basierend auf einer geheimen Information — Passwort, PIN.
- **Besitz (Something you have)**: Faktor basierend auf einem physischen oder digitalen Objekt — Handy, Karte, Token.
- **Biometrie (Something you are)**: Faktor basierend auf körperlichen Merkmalen — Fingerabdruck, Gesicht.
- **MFA (Multi-Faktor-Authentifizierung)**: Kombination von mindestens zwei Faktoren aus verschiedenen Kategorien.
- **2FA (Zwei-Faktor-Authentifizierung)**: MFA mit genau zwei Faktoren.
- **SSO (Single Sign-On)**: Eine Authentifizierung gibt Zugang zu mehreren verbundenen Systemen.
- **SIM-Swapping**: Angriff bei dem ein Angreifer eine Telefonnummer übernimmt um SMS-TANs abzufangen.
- **MFA-Fatigue**: Angriff bei dem Nutzer mit Push-Anfragen überhäuft werden bis sie versehentlich bestätigen.

---

## Verbindungen zu anderen Themen

| Thema                                                      | Verbindung                                                                                                 |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [[AAA-Modell]]     | Authentifizierung ist die erste Stufe des AAA-Modells — diese Seite vertieft wie sie konkret funktioniert. |
| [[Hashing]]           | Der Wissen-Faktor im Detail: was ein sicheres Passwort ausmacht und wie Systeme es speichern.              |
| [[TOTP]] | Konkrete Werkzeuge für MFA: Authenticator-Apps, YubiKey, Passkeys.                                         |
| [[Angriffsmethoden]]      | Phishing, SIM-Swapping und Social Engineering greifen gezielt Authentifizierungsfaktoren an.               |

---

## Quellen & Links

- [NCSC: Starke Passwörter und MFA](https://www.ncsc.admin.ch)
- [iBarry: Zwei-Faktor-Authentifizierung](https://www.ibarry.ch)
- [Zwei-Faktor-Authentifizierung erklärt (YouTube)](https://www.youtube.com)