---
title: M231 Übersicht — Zugriffsschutz
tags:
  - m231
  - übersicht
  - schule
created: 2026-06-09
status: permanent
publish: true
todo: false
moc: true
---

# M231 — Zugriffsschutz

## Modulbeschreibung

Zugriffsschutz regelt **wer** auf digitale Systeme zugreifen darf, **was** diese Personen dürfen, und **wie** diese Aktionen protokolliert werden. Das Modul verbindet die theoretischen Grundlagen (AAA-Modell) mit praktischen Schutzmassnahmen und realen Angriffsmethoden.

---

## Grundlagen & Konzepte

| Notiz | Zusammenfassung |
|-------|---|
| [[AAA-Modell]] | Authentifizierung, Autorisierung, Accounting — die drei Säulen des Zugriffsschutzes. |
| [[MFA]] | Die drei Authentifizierungsfaktoren (Wissen, Besitz, Biometrie) und Multi-Faktor-Authentifizierung. |
| [[Berechtigungskonzept]] | Least Privilege, Need-to-Know, RBAC, Separation of Duties und Zero Trust. |

---

## Technische Tiefe

| Notiz | Zusammenfassung |
|-------|---|
| [[Hashing]] | Passwörter, Hash-Funktionen, Salt und Rainbow Tables — wie Systeme Passwörter speichern und schützen. |
| [[TOTP]] | Passwortmanager, Authenticator-Apps, YubiKey und Passkeys — konkrete Werkzeuge für MFA. |

---

## Praktische Anwendung & Sicherheit

| Notiz | Zusammenfassung |
|-------|---|
| [[Angriffsmethoden]] | Brute Force, Phishing, Social Engineering, Keylogger — wie Angriffe funktionieren und wie Schutzmassnahmen dagegen helfen. |

---

## Thematische Übersicht

```dataview
TABLE status, created FROM "100 Schule/M231"
WHERE file.name != "M231 Übersicht"
SORT file.name ASC
```

---

## Lernpfad (empfohlene Reihenfolge)

**Anfänger:** Starten Sie mit [[AAA-Modell]] um die Grundkonzepte zu verstehen.

**Fortgeschritten:** Dann [[MFA]] und [[Hashing]] für die technischen Grundlagen.

**Praktisch:** Abschliessend [[TOTP]] für konkrete Werkzeuge und [[Angriffsmethoden]] um zu verstehen, wie Angreifer vorgehen.

**Experte:** [[Berechtigungskonzept]] für fortgeschrittene Designprinzipien wie Zero Trust und Separation of Duties.

---

## Schlüsselbegriffe pro Modul

- **AAA:** Authentication, Authorization, Accounting, Identität, Authentizität, Authentifizierung vs. Autorisierung
- **MFA:** Wissen-Faktor, Besitz-Faktor, Biometrie, Multi-Faktor-Authentifizierung, SSO
- **Berechtigungen:** Least Privilege, Need-to-Know, RBAC, Privilege Creep, Separation of Duties, Zero Trust
- **Hashing:** Hash-Funktion, Salt, Rainbow Table, Passwort-Policy, Passphrase
- **Tools:** Passwortmanager, Zero-Knowledge, TOTP, HMAC-SHA1, YubiKey, Passkeys, FIDO2, WebAuthn
- **Angriffe:** Brute Force, Dictionary Attack, Credential Stuffing, Password Spraying, Phishing, Social Engineering, Keylogger

---

## Quellen & Links

- [NCSC — Schweizer Cybersicherheitsagentur](https://www.ncsc.admin.ch)
- [iBarry — Cybersicherheit für Schulen](https://www.ibarry.ch)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [OWASP — Open Web Application Security Project](https://owasp.org)
