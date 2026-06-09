---
title: Zugriffsschutz - Passwörter & Hashing
tags:
  - security
  - m231
  - schule
created: 2026-06-09
status: permanent
publish: true
todo: false
---

# Passwörter & Hashing

## Überblick

Passwörter sind der am häufigsten genutzte Authentifizierungsfaktor — und gleichzeitig der am häufigsten falsch verwendete. Diese Seite erklärt zwei Dinge: was ein Passwort wirklich sicher macht, und was im Hintergrund passiert wenn du eines eingibst. Beides ist prüfungsrelevant und im Alltag direkt anwendbar.

---

## Was macht ein Passwort sicher?

Das grösste Missverständnis bei Passwörtern ist, dass Komplexität mehr zählt als Länge. Das stimmt nicht.

`P@ssw0rd!` sieht kompliziert aus — hat aber nur 9 Zeichen und folgt einem vorhersehbaren Muster (Buchstaben durch Zahlen und Symbole ersetzen). Solche Substitutionsmuster sind in jedem modernen Angriffs-Wörterbuch enthalten. Das Passwort fällt in Sekunden.

`Mein-Hund-liebt-Pizza-123!` ist länger, leichter merkbar — und trotzdem sicherer. Das nennt man eine Passphrase: mehrere Wörter die eine merkbare Aussage bilden, kombiniert mit einem Trennzeichen und einer Zahl oder einem Symbol.

**Faustregel:** Ab 16 Zeichen ist ein Passwort mit heutiger Hardware praktisch nicht per Brute Force knackbar — selbst wenn es keine Sonderzeichen enthält. Länge schlägt Komplexität.

### Was eine gute Passwort-Policy verlangt

Eine Passwort-Policy ist ein Regelwerk das Mindestanforderungen an Passwörter definiert. Typische Anforderungen:

- Mindestlänge von 12–16 Zeichen
- Kombination aus Gross- und Kleinbuchstaben, Zahlen und Sonderzeichen
- Kein Passwort aus dem Wörterbuch oder bekannten Listen
- Kein Passwort das Benutzername, Firmenname oder Datum enthält
- Regelmässiger Wechsel bei Verdacht auf Kompromittierung

> **Merkhilfe:** Ein gutes Passwort ist wie ein langer, zufälliger Satz — nicht wie ein kurzes Wort mit verkleideten Buchstaben.

```widget
Passwort-Stärke-Tester — interaktiv
```

---

## Wie Systeme Passwörter speichern

Kein seriöses System speichert dein Passwort im Klartext. Würde eine Datenbank gestohlen, hätte ein Angreifer sofort Zugriff auf alle Passwörter. Stattdessen wird das Passwort durch eine Hash-Funktion verarbeitet — bevor es gespeichert wird.

### Hash-Funktion — der Einwegprozess

Eine Hash-Funktion ist ein mathematischer Einwegprozess. Sie nimmt eine beliebig lange Eingabe und erzeugt daraus eine fixe Zeichenkette — den Hash. Die wichtigste Eigenschaft: der Prozess ist nicht umkehrbar. Aus dem Hash kommt man nicht mehr zum Original zurück.

Beispiel mit SHA-256:
- Eingabe: `Pizza123`
- Hash: `5f4dcc3b5aa765d61d8327deb882cf99...`

Egal wie lang das Passwort ist — der Hash ist immer gleich lang. Und dieselbe Eingabe ergibt immer denselben Hash. Das System speichert beim Registrieren nur den Hash. Beim Login hasht es das eingegebene Passwort und vergleicht es mit dem gespeicherten Wert — das Original verlässt die Datenbank nie.

### Das Problem: Rainbow Tables

Wenn zwei Nutzer dasselbe Passwort verwenden, haben sie denselben Hash. Das ist eine Schwachstelle.

Angreifer nutzen sogenannte Rainbow Tables — riesige vorberechnete Tabellen die Passwörter auf ihre Hashes mappen. Wenn sie eine gestohlene Datenbank bekommen, schlagen sie den Hash einfach nach. `5f4dcc3b5aa7...` → `Pizza123` — fertig. Das dauert Millisekunden, nicht Stunden.

### Die Lösung: Salting

Vor dem Hashing wird ein zufälliger Wert — der Salt — an das Passwort angehängt. Jeder Nutzer bekommt einen eigenen, zufällig generierten Salt. Der Salt wird zusammen mit dem Hash gespeichert.

Ablauf:
1. Nutzer wählt Passwort: `Pizza123`
2. System generiert zufälligen Salt: `x7k2m9`
3. System kombiniert beides: `Pizza123x7k2m9`
4. Ergebnis wird gehasht: `a3f8b2c91d7e...`
5. Gespeichert wird: Salt `x7k2m9` + Hash `a3f8b2c91d7e...`

Beim Login holt das System den gespeicherten Salt, hängt ihn an das eingegebene Passwort, hasht das Resultat — und vergleicht es mit dem gespeicherten Hash.

Selbst wenn zwei Nutzer dasselbe Passwort `Pizza123` verwenden, sind ihre Hashes durch die verschiedenen Salts völlig unterschiedlich. Rainbow Tables werden damit nutzlos — sie müssten für jeden einzelnen Salt neu berechnet werden, was praktisch unmöglich ist.

> **Merkhilfe:** Der Salt ist wie das Würzen von Essen — er macht jede Portion einzigartig, auch wenn der Grundgeschmack gleich ist. Selbst der Datenbankadministrator kann dein Passwort nicht lesen — er sieht nur Hash und Salt.

```widget
hashing_pipeline_stepper
```

---

## Passwörter im Alltag richtig handhaben

Das beste Passwort nützt nichts wenn es falsch eingesetzt wird. Drei Regeln die direkt aus den technischen Grundlagen folgen:

**Jeder Account braucht ein einzigartiges Passwort.** Wird eine Datenbank gestohlen und das Passwort geknackt, können Angreifer es auf anderen Plattformen testen — das nennt sich Credential Stuffing. Wer dasselbe Passwort überall verwendet, verliert bei einem einzigen Leck alle Accounts.

**Passwörter nicht aufschreiben — ausser das Masterpasswort.** Passwörter auf Haftnotizen, in Textdateien oder in unverschlüsselten Notizen sind ein physisches Sicherheitsrisiko. Das Masterpasswort des Passwortmanagers ist die Ausnahme — es muss auf Papier, sicher aufbewahrt, existieren.

**Einen Passwortmanager verwenden.** Kein Mensch kann sich 50 verschiedene starke Passwörter merken. Das ist keine Schwäche — das ist Biologie. Passwortmanager lösen dieses Problem: sie generieren, speichern und füllen Passwörter automatisch aus. Das einzige Passwort das man sich noch merken muss ist das Masterpasswort.

---

## Schlüsselbegriffe

- **Passphrase**: Mehrere Wörter als Passwort kombiniert — lang, merkbar, sicher. Beispiel: `Mein-Hund-liebt-Pizza-123!`
- **Passwort-Policy**: Regelwerk mit Mindestanforderungen an Passwörter in einem System.
- **Hash-Funktion**: Mathematischer Einwegprozess der eine beliebige Eingabe in eine fixe Zeichenkette umwandelt.
- **Hash**: Das Resultat einer Hash-Funktion — kann nicht zurück in die Ursprungseingabe umgewandelt werden.
- **Salt**: Zufälliger Wert der vor dem Hashing an das Passwort angehängt wird — macht jeden Hash einzigartig.
- **Salted Hash**: Hash der aus Passwort + Salt berechnet wurde — Standard in modernen Systemen.
- **Rainbow Table**: Vorberechnete Tabelle von Passwort-zu-Hash-Zuordnungen — wird durch Salting nutzlos gemacht.
- **Credential Stuffing**: Angriff bei dem gestohlene Passwörter auf anderen Plattformen ausprobiert werden.

---

## Verbindungen zu anderen Themen

| Thema                                                    | Verbindung                                                                                                                    |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [[MFA]] | Passwörter sind der Wissen-Faktor — diese Seite erklärt wie sie technisch funktionieren und gespeichert werden.               |
| [[Angriffsmethoden]]                    | Brute Force, Dictionary Attack und Rainbow Tables greifen direkt Passwörter an — die technischen Grundlagen dazu stehen hier. |
| [[TOTP]]   | Passwortmanager und Passkeys bauen auf den hier erklärten Grundlagen auf.                                                     |

---

## Quellen & Links

- [NCSC: Starke Passwörter](https://www.ncsc.admin.ch)
- [iBarry: Sichere Passwörter](https://www.ibarry.ch)
- [Have I Been Pwned — Prüfe ob deine E-Mail in Datenlecks war](https://haveibeenpwned.com)
- [Bitwarden Password Strength Tool](https://bitwarden.com/password-strength)