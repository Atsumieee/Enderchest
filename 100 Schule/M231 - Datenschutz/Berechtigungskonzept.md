---
title: Zugriffsschutz - Berechtigungskonzepte
tags:
  - security
  - m231
  - schule
created: 2026-06-09
status: permanent
publish: true
todo: false
---

# Berechtigungskonzepte

## Überblick

Zugriffsschutz endet nicht beim Login. Wer erfolgreich authentifiziert ist, muss trotzdem beschränkt werden — nicht aus Misstrauen gegenüber Mitarbeitenden, sondern weil ein kompromittierter Account nur so viel Schaden anrichten kann wie die Rechte erlauben die er hat. Diese Seite erklärt wie Berechtigungen strukturiert, vergeben und begründet werden.

---

## Berechtigung und Privileg

Eine **Berechtigung** ist das Recht eine bestimmte Aktion auf einer bestimmten Ressource auszuführen. Typische Abstufungen sind Lesen, Schreiben, Ausführen und Löschen. Ein Nutzer kann auf denselben Ordner Leserecht haben aber kein Schreibrecht — das sind zwei verschiedene Berechtigungen auf derselben Ressource.

Ein **Privileg** ist eine erhöhte Berechtigung die besondere Aktionen erlaubt — zum Beispiel Systemkonfigurationen ändern, andere Nutzer verwalten oder auf sensitive Daten zugreifen. Privilegien werden sparsam vergeben und sind das Hauptziel bei gezielten Angriffen.

---

## Least Privilege

Least Privilege ist das Grundprinzip aller Berechtigungskonzepte: jede Person, jeder Prozess und jedes System erhält exakt die minimalen Rechte die für die aktuelle Aufgabe nötig sind — und nicht mehr.

Das klingt selbstverständlich, wird in der Praxis aber oft vernachlässigt. Es ist bequemer einmal `Admin` zu vergeben als feingranular zu konfigurieren. Oder Rechte bleiben aktiv "für den Fall dass sie noch gebraucht werden". Das Ergebnis nennt sich Privilege Creep — angesammelte Rechte über Zeit die niemand mehr bewusst vergeben hat.

Warum Least Privilege so wichtig ist: wenn ein Account kompromittiert wird, kann der Angreifer nur so viel Schaden anrichten wie die Rechte dieses Accounts erlauben. Ein kompromittierter Praktikanten-Account mit Leserecht auf Marketingdaten ist ein anderes Sicherheitsereignis als ein kompromittierter Admin-Account.

> **Merkhilfe:** Least Privilege ist wie ein Schlüsselbund — jeder Mitarbeitende trägt nur die Schlüssel mit die er wirklich braucht. Nicht den Generalschlüssel "für alle Fälle".

---

## Need-to-Know

Need-to-Know verfeinert Least Privilege auf Informationsebene: Zugriff auf Daten wird nur gewährt wenn diese für die aktuelle Aufgabe konkret benötigt werden — auch wenn die Rolle es technisch erlauben würde.

Der Unterschied zu Least Privilege: Least Privilege definiert was eine Rolle darf. Need-to-Know definiert wann dieser Zugriff tatsächlich gewährt wird. Ein Arzt in einem Spital hat durch seine Rolle grundsätzlich Zugriff auf Patientendaten — aber per Need-to-Know-Prinzip nur auf die Daten seiner eigenen Patienten, nicht auf alle Patientendaten des Spitals.

---

## RBAC — Role-Based Access Control

RBAC löst ein praktisches Problem: in einer Organisation mit hundert Mitarbeitenden jedem einzeln Berechtigungen zuzuweisen wäre ein Verwaltungsalbtraum. Stattdessen definiert man Rollen — und weist Nutzern Rollen zu.

Eine Rolle bündelt alle Berechtigungen die für eine bestimmte Funktion nötig sind. Der Nutzer erbt automatisch alle Rechte seiner Rolle. Wechselt jemand die Abteilung, ändert man die Rolle — nicht hunderte einzelne Berechtigungen.

### Beispiel: Firma mit sechs Rollen

In einer kleinen Firma mit zwanzig Mitarbeitenden könnten die Rollen so aussehen:

- **Geschäftsleitung**: Leserecht auf alle Bereiche für Controlling, kein Admin-Zugang (Separation of Duties)
- **Buchhaltung**: Lesen und Schreiben auf Buchhaltungsdaten, kein Zugriff auf andere Bereiche
- **Verkauf**: Lesen und Schreiben auf Verkaufsdaten, Leserecht auf Marketing für Koordination
- **Marketing**: Lesen und Schreiben auf Marketingdaten, Leserecht auf Verkauf für Kampagnenplanung
- **IT-Admin**: Admin-Rechte für Systemverwaltung, aber kein Zugriff auf Buchhaltung oder Personaldaten
- **Praktikum**: Minimale Rechte — nur Leserecht auf nicht-sensitive Bereiche

Jede dieser Rollendefinitionen folgt Least Privilege und Need-to-Know. Die IT-Admins haben bewusst keinen Zugang zu Buchhaltungsdaten — sie brauchen diese für ihre Arbeit nicht, und Admin-Zugang kombiniert mit Datenzugang wäre zu viel Macht in einer Hand.

### Privilege Creep verhindern

Ein häufiges Problem in der Praxis: jemand wechselt von Marketing zu Buchhaltung. Die alten Marketing-Rechte bleiben aktiv "für den Fall dass sie noch gebraucht werden". Nach fünf Jahren und drei Rollenwechseln hat diese Person Rechte aus allen Abteilungen die sie je durchlaufen hat.

RBAC mit konsequentem Rollenwechsel-Prozess verhindert das: beim Rollenwechsel werden alle alten Rechte sofort entzogen und die neuen Rolle zugewiesen. Keine Ausnahmen.

---

## Separation of Duties

Separation of Duties (Aufgabentrennung) geht über Least Privilege hinaus: keine einzelne Person soll eine kritische Aktion vollständig alleine ausführen können. Kritische Prozesse werden auf mindestens zwei Personen aufgeteilt.

Das klassische Beispiel aus der Buchhaltung: wer eine Zahlung erfasst, darf sie nicht auch genehmigen. Wer Bestellungen aufgibt, darf die Lieferungen nicht auch selbst kontrollieren. Damit ist Betrug oder Sabotage durch eine einzelne kompromittierte Person strukturell erschwert — der Angreifer müsste zwei verschiedene Accounts gleichzeitig kontrollieren.

In der IT heisst das konkret: wer Code schreibt, sollte ihn nicht auch selbst in Produktion deployen dürfen. Wer Nutzerkonten erstellt, sollte nicht auch Berechtigungen vergeben dürfen.

Das Vier-Augen-Prinzip ist die bekannteste Umsetzung: jede kritische Entscheidung braucht die Zustimmung von zwei Personen.

> **Merkhilfe:** Separation of Duties ist wie eine Bankdoppelunterschrift — beide Schlüssel müssen gleichzeitig umgedreht werden. Ein einzelner Schlüssel öffnet den Tresor nicht.

---

## Zero Trust

Zero Trust ist das modernste Paradigma im Bereich Zugriffsschutz. Es bricht mit einer jahrzehntelangen Grundannahme der IT-Sicherheit: dass das interne Netzwerk einer Organisation vertrauenswürdig ist.

Die alte Annahme war: wer im Büro-WLAN ist, ist sicher. Die Firewall schützt den Perimeter. Wer drinnen ist, darf.

Zero Trust ersetzt das durch einen einzigen Grundsatz: **vertraue niemandem automatisch — verifiziere jeden Zugriff einzeln.** Auch nicht Nutzer innerhalb des Firmennetzwerks. Auch nicht Server die miteinander kommunizieren. Auch nicht Geräte die als firmeneigen registriert sind.

In der Praxis bedeutet Zero Trust:
- Jeder Zugriff auf eine Ressource erfordert explizite Authentifizierung — auch innerhalb des Netzwerks
- Sessions sind zeitlich begrenzt und laufen automatisch ab
- Geräte werden kontinuierlich auf Gesundheit geprüft (aktuelles OS, aktiver Virenscanner)
- Netzwerksegmentierung verhindert dass ein kompromittiertes Gerät das gesamte Netzwerk gefährdet

Zero Trust ist keine einzelne Technologie sondern ein Designprinzip. Es ist besonders relevant seit Homeoffice und Cloud-Dienste die klare Grenze zwischen "drinnen" und "draussen" aufgelöst haben.

> **Merkhilfe:** Zero Trust ist wie ein Hotel statt einem Privathaus. Im Hotel muss sich jeder Gast jedes Mal ausweisen — auch wenn er gestern schon da war. Die Zimmernummer gibt keinen automatischen Generalzugang.

---

## Die Prinzipien im Zusammenspiel

Die vier Prinzipien sind keine Alternativen — sie ergänzen sich auf verschiedenen Ebenen:

**Least Privilege** definiert: wie viel Recht bekommt eine Rolle überhaupt?
**Need-to-Know** verfeinert: wann wird dieses Recht konkret aktiviert?
**Separation of Duties** verhindert: dass kritische Aktionen von einer Person allein ausgeführt werden.
**Zero Trust** setzt voraus: dass kein Kontext automatisch Vertrauen schafft — weder Ort noch Netzwerk noch Gerät.

Ein System das alle vier Prinzipien umsetzt ist strukturell widerstandsfähig — selbst wenn ein einzelner Account kompromittiert wird, begrenzen die Prinzipien den Schaden auf das Minimum.

```widget
Berechtigungskonzepte — Matrix, RBAC-Simulator, Prinzipien, Szenario-Quiz
```

---

## Schlüsselbegriffe

- **Berechtigung**: Das Recht eine bestimmte Aktion auf einer bestimmten Ressource auszuführen — Lesen, Schreiben, Ausführen, Löschen.
- **Privileg**: Erhöhte Berechtigung für besondere Aktionen wie Systemverwaltung oder Zugriff auf sensitive Daten.
- **Least Privilege**: Jede Person und jedes System erhält nur die minimalen Rechte die für die Aufgabe nötig sind.
- **Need-to-Know**: Zugriff auf Informationen nur wenn diese für die aktuelle Aufgabe konkret benötigt werden.
- **Privilege Creep**: Angesammelte Rechte über Zeit und Rollenwechsel hinweg die niemand mehr bewusst vergeben hat.
- **RBAC (Role-Based Access Control)**: Berechtigungssystem bei dem Rechte an Rollen vergeben werden — Nutzer erben die Rechte ihrer Rolle.
- **Separation of Duties**: Aufteilung kritischer Aktionen auf mindestens zwei Personen — verhindert Missbrauch durch Einzelpersonen.
- **Vier-Augen-Prinzip**: Konkrete Umsetzung von Separation of Duties — jede kritische Entscheidung braucht zwei Zustimmungen.
- **Zero Trust**: Sicherheitsparadigma das keinem Kontext automatisch vertraut — jeder Zugriff wird einzeln verifiziert.
- **Netzwerksegmentierung**: Aufteilung des Netzwerks in isolierte Bereiche — begrenzt die Ausbreitung bei einem kompromittierten Gerät.

---

## Verbindungen zu anderen Themen

| Thema                | Verbindung                                                                                                                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [[AAA-Modell]]       | Autorisierung ist die zweite Stufe des AAA-Modells — diese Seite erklärt wie sie strukturiert und umgesetzt wird.                                                                                               |
| [[MFA]]              | Starke Authentifizierung und durchdachte Autorisierung sind zwei Seiten desselben Schutzes — beide zusammen bilden vollständigen Zugriffsschutz.                                                                |
| [[Angriffsmethoden]] | Least Privilege begrenzt den Schaden wenn ein Account trotz aller Massnahmen kompromittiert wird. Separation of Duties verhindert dass ein einzelner kompromittierter Account kritische Aktionen auslösen kann. |

---

## Quellen & Links

- [NCSC: Berechtigungskonzepte](https://www.ncsc.admin.ch)
- [NIST: Zero Trust Architecture](https://www.nist.gov/publications/zero-trust-architecture)
- [Microsoft: Was ist Zero Trust?](https://www.microsoft.com/security/business/zero-trust)