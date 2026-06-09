---
title: Zugriffsschutz - Grundlagen & AAA-Modell
tags:
  - security
  - m231
  - schule
created: 2026-06-09
status: permanent
publish: true
todo: false
---

# Zugriffsschutz — Grundlagen & AAA-Modell

## Überblick

Zugriffsschutz regelt wer auf digitale Systeme, Daten und Funktionen zugreifen darf — und wer nicht. Bevor ein System entscheiden kann was jemand darf, muss es zuerst wissen wer diese Person überhaupt ist. Genau darum dreht sich diese Seite: die drei Grundstufen die zusammen vollständigen Zugriffsschutz bilden.

---

## Zugriffsschutz vs. Zutrittsschutz

Diese zwei Begriffe klingen ähnlich, meinen aber völlig verschiedene Dinge.

**Zutrittsschutz** ist physisch: Türen, Schlösser, Sicherheitspersonal, Ausweiskontrolle am Eingang. Er schützt Räume und Gebäude.

**Zugriffsschutz** ist digital: Passwörter, Berechtigungen, Authentifizierungssysteme. Er schützt Daten, Anwendungen und Systeme.

In der IT ist immer der digitale Zugriffsschutz gemeint. Beide Konzepte können sich ergänzen — ein Rechenzentrum hat typischerweise beides.

---

## Identität und Authentizität

Bevor ein System schützen kann, braucht es zwei Dinge:

**Identität** ist das *Wer bist du?* — eine Behauptung. Jeder kann sagen "Ich bin Max Müller" oder einen Benutzernamen eingeben. Das allein beweist noch nichts.

**Authentizität** ist der Beweis dieser Behauptung — *kannst du das belegen?* Erst wenn die Authentizität bestätigt ist, beginnt der eigentliche Schutzprozess.

---

## Authentifizierung vs. Autorisierung

Das ist der häufigste Verwechslungsfehler im Bereich Zugriffsschutz — und gleichzeitig einer der prüfungsrelevantesten Unterschiede.

**Authentifizierung** (Authentication) beantwortet die Frage: *Wer bist du?* Der Nutzer weist nach, dass er derjenige ist den er vorgibt zu sein. Das System vergleicht die präsentierten Informationen mit dem was es gespeichert hat. Erst wenn dieser Vergleich erfolgreich ist, geht es weiter.

Alltägliche Beispiele für Authentifizierung:
- Login mit Benutzername und Passwort bei Instagram
- Entsperren des iPhones mit Face ID
- Karte + PIN am Bankomaten
- Ausweis zeigen beim Konzerteingang

**Autorisierung** (Authorization) beantwortet die Frage: *Was darfst du?* Nachdem die Identität feststeht, entscheidet das System welche Ressourcen und Aktionen erlaubt sind — basierend auf Rollen oder Rechten. Zwei Personen können denselben Login-Prozess durchlaufen und trotzdem völlig unterschiedliche Rechte haben.

Alltägliche Beispiele für Autorisierung:
- Instagram: eigene Posts löschen, fremde nur lesen
- Schulnetzwerk: bestimmte Ordner und Drucker zugänglich, andere nicht
- Online-Banking: Überweisungen bis zu einem bestimmten Limit

> **Merkhilfe:** Authentifizierung kommt zuerst — du beweist wer du bist. Autorisierung kommt danach — du bekommst was dir zusteht. Authentifizierung ist die Türkontrolle. Autorisierung ist der Raumplan dahinter.

---

## Das AAA-Modell

Das AAA-Modell (Authentication, Authorization, Accounting) beschreibt drei Stufen die zusammen vollständigen Zugriffsschutz bilden. Jede Stufe baut auf der vorherigen auf.

### Authentication — Wer bist du?

Die erste Stufe. Der Nutzer beweist seine Identität. Ohne erfolgreiche Authentifizierung kommen die nächsten Stufen gar nicht erst zum Zug.

### Authorization — Was darfst du?

Die zweite Stufe. Basierend auf der verifizierten Identität werden Rechte vergeben. Das System entscheidet welche Ressourcen zugänglich sind und welche Aktionen erlaubt sind.

### Accounting — Was hast du getan?

Die dritte Stufe. Jede Aktion wird protokolliert — wer hat wann was getan. Das ermöglicht im Nachhinein Sicherheitsvorfälle nachzuvollziehen und ist in regulierten Branchen wie Banken oder Spitälern oft gesetzlich vorgeschrieben.

Ohne Accounting gibt es nach einem Sicherheitsvorfall keine Spur: man weiss nicht wer welche Daten verändert oder abgerufen hat. Ein System das alle drei Stufen umsetzt nennt man AAA-konform.

> **Merkhilfe:** Accounting ist wie ein Gästebuch — alle Besuche werden eingetragen, auch wenn niemand direkt zuschaut.

### Warum alle drei Stufen nötig sind

Die drei Stufen sind kein optionales Set — sie bedingen einander:

- Nur Authentifizierung ohne Autorisierung: das System weiss wer jemand ist, aber nicht was er darf. Jeder Eingeloggte hätte denselben Zugriff.
- Autorisierung ohne Authentifizierung: das System vergibt Rechte ohne zu wissen an wen. Sinnlos und gefährlich.
- Authentifizierung und Autorisierung ohne Accounting: bei einem Vorfall gibt es keine Spur. Wer hat was verändert? Nicht nachvollziehbar.

```widget
AAA-Modell — Interaktives Diagramm
```

---

## Schlüsselbegriffe

- **Zutrittsschutz**: Physischer Schutz von Räumen und Gebäuden durch Schlösser, Türen, Personal.
- **Zugriffsschutz**: Digitaler Schutz von Systemen, Daten und Funktionen durch Authentifizierung und Autorisierung.
- **Identität**: Die Behauptung wer man ist — noch kein Beweis.
- **Authentizität**: Der Beweis der Identität — bestätigt durch das System.
- **Authentifizierung (Authentication)**: Prozess bei dem eine Identität verifiziert wird. Erste Stufe des AAA-Modells.
- **Autorisierung (Authorization)**: Vergabe von Rechten nach erfolgreicher Authentifizierung. Zweite Stufe des AAA-Modells.
- **Accounting**: Protokollierung aller Aktionen für spätere Nachvollziehbarkeit. Dritte Stufe des AAA-Modells.
- **AAA-Modell**: Rahmenwerk aus Authentication, Authorization und Accounting für vollständigen Zugriffsschutz.

---

## Verbindungen zu anderen Themen

| Thema                                                    | Verbindung                                                                                             |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [[MFA]]               | Die Authentifizierungsstufe des AAA-Modells wird hier vertieft: wie genau beweist man seine Identität? |
| [[Berechtigungskonzept]]               | Die Autorisierungsstufe des AAA-Modells wird hier vertieft: Rollen, RBAC, Least Privilege.             |
| [[Angriffsmethoden]]    | Was passiert wenn Authentifizierung und Autorisierung versagen oder umgangen werden.                   |

---

## Quellen & Links

- [NCSC: Zugriffsschutz Grundlagen](https://www.ncsc.admin.ch)
- [CY-S-4-U: Modul Passwortsicherheit](https://www.cybersecurity4schools.ch)