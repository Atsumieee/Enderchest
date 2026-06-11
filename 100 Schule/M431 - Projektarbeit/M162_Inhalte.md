---
title: "M162 Inhalte"
tags: [m431, schule]
created: 2026-06-01
status: draft
publish: false
todo: false
---

# M162 – Daten analysieren und modellieren
> Lerninhalt für die IT-Lernplattform | Basiert auf M162 Unterrichtsmaterial BBZW Sursee
> Roter Faden: Wir bauen gemeinsam eine Schulverwaltung für das BBZW — von der Datenanalyse bis zur normalisierten Datenbank.
> Struktur: 4 Inhaltsblöcke + Quizfragen (bereit zum Einfügen in HTML)

---

## ──────────────────────────────────────
## BLOCK 1 – Was sind Daten? Formen, Typen und Qualität
## ──────────────────────────────────────

> **Roter Faden:** In Block 1 analysieren wir die Daten. In Block 2 zeichnen wir das ER-Modell. In Block 3 überführen wir es in Tabellen. In Block 4 normalisieren wir alles — damit die Datenbank wirklich gut funktioniert.

---

### Schritt 1 — Daten begegnen dir überall

Du öffnest morgens Spotify. Die App zeigt dir genau die Musik, die du magst. Sie weiss, was du gestern gehört hast, wie lange, ob du den Song übersprungen hast — und schlägt dir heute etwas Passendes vor.

Das ist kein Zufall und keine Magie. Hinter dieser App liegt eine **Datenbank** mit Millionen von gespeicherten Werten. Jedes Mal wenn du einen Song spielst, wird ein neuer Datensatz geschrieben.

Dasselbe gilt für Instagram (wer folgt wem?), für dein Lehrbetrieb-System (welche Stunden hast du geleistet?), für das schulNetz (welche Noten hast du?). **Überall wo eine App "sich merkt", steckt eine Datenbank dahinter.**

> 💡 **Und genau das lernst du in M162:** Wie man diese Daten sinnvoll strukturiert, modelliert und in einer Datenbank ablegt — so dass sie später schnell und zuverlässig abgefragt werden können. Das ist das Handwerk hinter jeder App die du täglich nutzt.

---

### Schritt 2 — Was genau ist ein "Datum"?

Stell dir vor, jemand gibt dir einen Zettel mit der Zahl `17`. Was bedeutet das? Das Alter eines Lernenden? Eine Zimmernummer? Eine Note? Die Anzahl Lektionen?

Du kannst es nicht wissen — weil dir der Kontext fehlt. **Genau das ist ein Datum:** ein roher, uninterpretierter Wert. Er existiert, aber er sagt alleine noch nichts Sinnvolles aus.

Erst wenn du weisst: *"Das ist das Alter von Lernenden Marvin in Klasse INP25b"* — entsteht daraus eine **Information**: etwas, das du verstehen, verwenden und auswerten kannst.

| Begriff | Was ist es? | Beispiel |
|---------|-------------|---------|
| **Datum** | Roher Wert, noch ohne Bedeutung | `17` — man weiss nicht was das ist |
| **Information** | Datum + Kontext = Bedeutung | "Marvin ist 17 Jahre alt" — jetzt ergibt es Sinn |
| **Datenbestand** | Viele Daten zum gleichen Thema gesammelt | Alle Lernenden, Klassen und Noten der BBZW |

> → **Warum ist das wichtig?** Eine Datenbank speichert Daten — aber damit sie nützlich ist, müssen wir von Anfang an festlegen, was jeder Wert bedeutet: Was speichern wir hier? Von wem? In welchem Format? Genau dafür gibt es Datentypen — dazu kommen wir in Schritt 4.

---

### Schritt 3 — Nicht alle Daten sind gleich

Wenn wir wissen wollen ob ein Lernender die Prüfung bestanden hat, brauchen wir eine Zahl (Note). Wenn wir ihm ein Zeugnis schicken wollen, brauchen wir Text (Adresse). Wenn wir sein Bewerbungsfoto archivieren, brauchen wir eine Bilddatei. Jede dieser Datenformen wird anders gespeichert — und lässt sich unterschiedlich gut auswerten.

| Datenform | Was steckt drin? | Beispiel Schulverwaltung | Auswertbarkeit |
|-----------|-----------------|--------------------------|----------------|
| **Zahlen** | Mess- oder Klassifikationswerte | Note 5.5, Alter 17, Zimmernummer 12 | Hoch — rechnen, sortieren, Durchschnitt |
| **Text** | Buchstaben, Wörter, Sätze | Name "Marvin", Adresse, Klasse "INP25b" | Mittel — suchen, vergleichen, filtern |
| **Medien** | Bilder, Audio, Video | Passfoto, Sprachnotiz, Lernvideo | Niedrig — braucht Spezialsoftware |

> ⚠️ **Falle: Zahlen sind nicht immer Messdaten**
> Die Zimmernummer `12` sieht aus wie eine Zahl — aber es macht keinen Sinn, Zimmer 12 + Zimmer 4 = Zimmer 16 zu rechnen. Oder einen "Durchschnitt aller Zimmernummern" zu berechnen. Das ist eine **Klassifikation** — eine Kategorie in Zahlenform, kein Messwert. Dieser Unterschied wird beim nächsten Schritt entscheidend.

---

### Schritt 4 — Datentypen: Wir legen Spielregeln fest

Wir wissen jetzt, dass wir Zahlen, Text und Medien haben. Aber das reicht noch nicht. Wenn wir eine Datenbank bauen, müssen wir für jedes einzelne Feld genau festlegen: Welche Werte sind erlaubt? Wie viel Speicherplatz belegt das? Kann man damit rechnen? Das ist die Aufgabe der **Datentypen**.

> 💡 **Du kennst das bereits aus Excel:** Wenn du in Excel eine Spalte als "Datum" formatierst, akzeptiert sie keine normalen Zahlen mehr. Wenn du "Text" wählst, kann Excel nicht damit rechnen. Datentypen in einer Datenbank funktionieren genauso — aber viel strenger und konsequenter.

| Datentyp | Was speichert er? | Beispiel in der Schulverwaltung | Warum nicht einfach "Text"? |
|----------|------------------|----------------------------------|------------------------------|
| `INT` | Ganze Zahl ohne Komma | Alter, LernenderID, Anzahl Lektionen | Mit Text kann man nicht rechnen: "17" + "3" = "173" |
| `DECIMAL(3,1)` | Kommazahl, hier: 3 Stellen, 1 davon nach dem Komma | Note: 5.5, 4.0, 3.5 | Erlaubt Durchschnitt, Vergleich, Berechnung |
| `VARCHAR(50)` | Text, variabel, max. 50 Zeichen | Vorname, Nachname, Strassenname | Flexibel — nicht jeder Name gleich lang |
| `CHAR(2)` | Text, fix genau 2 Zeichen | Kanton: "LU", "ZH", "BE" | Immer gleich lang — spart Speicher bei fixen Codes |
| `DATE` | Datum (Tag, Monat, Jahr) | Geburtsdatum, Prüfungsdatum | Erlaubt Berechnungen: Wie alt ist jemand heute? |
| `BIT` | Ja oder Nein (1 oder 0) | IstAktiv: Ist der Lernende noch in Ausbildung? | Eindeutig — kein "vielleicht", kein "ja, aber" |

> ⚠️ **Der häufigste Anfängerfehler: alles als Text speichern**
> "Ich speichere das Alter einfach als Text, dann kann ich nie falsch liegen." — Das klingt sicher, ist aber ein Problem: Die Datenbank kann dann nicht prüfen ob "abc" ein gültiges Alter ist. Und du kannst nicht berechnen, wie alt jemand in 5 Jahren ist. Der richtige Typ schützt die Daten und ermöglicht Auswertungen.

---

### Schritt 5 — Skalenniveaus: Was darf man mit Daten machen?

Wir wissen jetzt was Daten sind und wie wir sie typisieren — aber dürfen wir mit allen Daten gleich rechnen?

Die Antwort ist nein. Und das **Skalenniveau** erklärt warum. Es ist die Antwort auf die Frage: *"Welche Berechnungen ergeben bei diesem Wert überhaupt Sinn?"* Das ist keine rein akademische Frage — es verhindert, dass Auswertungen zu falschen Schlüssen führen.

> ⚠️ **Konkretes Beispiel: Macht ein Durchschnitt der Lehrberufe Sinn?**
> In der Schulverwaltung haben wir Lehrberufe: Informatiker (1), Kaufmann (2), Elektriker (3). Der "Durchschnitt" wäre (1+2+3)/3 = 2 = Kaufmann. Das ist kompletter Unsinn. Die Zahlen sind nur Abkürzungen für Kategorien — es gibt keine sinnvolle Reihenfolge oder Abstand zwischen ihnen. **Skalenniveau = Nominalskala → kein Durchschnitt erlaubt.**

| Skalentyp | Was kann man sagen? | Was ist erlaubt? | Was ist verboten? | Beispiel (Schulverwaltung) |
|-----------|--------------------|-----------------|--------------------|---------------------------|
| **Nominal** | Gleich oder verschieden | Zählen, Häufigkeit, Modus | Sortieren, Durchschnitt, Differenzen | Lehrberuf, Kanton, Geschlecht |
| **Ordinal** | Gleich, verschieden, grösser/kleiner | Median, Rang, Häufigkeit | Durchschnitt (Abstände unklar) | Notenstufe (gut/genügend/ungenügend), Priorität |
| **Metrisch** | Alles — inkl. exakte Abstände | Alles: Mittelwert, Standardabweichung, Verhältnisse | Nichts sinnvolles ist verboten | Note 5.5, Alter, Lektionsdauer |

> ✅ **Merkhilfe — aufsteigend denken:**
> Nominal → nur Namen/Kategorien. Ordinal → zusätzlich eine Reihenfolge. Metrisch → zusätzlich gleiche, messbare Abstände. Jede Stufe enthält alles der darunter liegenden Stufe — und erlaubt mehr.

---

### Schritt 6 — Datenqualität: Warum sorgfältig sein lohnt

Wir können jetzt Daten beschreiben, einteilen und typisieren. Aber was wenn die Daten selbst fehlerhaft sind?

Datentypen und Skalenniveaus sind die Theorie. In der Praxis schleichen sich Fehler ein: Ein Lernender ist doppelt erfasst. Eine Adresse widerspricht sich selbst. Ein Feld ist leer das nicht leer sein darf. Eine Datenbank mit falschen Daten liefert falsche Auswertungen — egal wie gut sie modelliert ist. Deshalb gibt es vier Qualitätsmerkmale, die wir beim Design im Kopf behalten müssen.

| Merkmal | Was bedeutet es? | Negativbeispiel (Schulverwaltung) | Konsequenz wenn verletzt |
|---------|-----------------|-----------------------------------|--------------------------|
| **Vollständigkeit** | Alle nötigen Felder sind vorhanden | Lernender hat keine gespeicherte Adresse | Zeugnis kann nicht verschickt werden |
| **Widerspruchsfreiheit** | Angaben passen zueinander | PLZ "6210" (Sursee) aber Kanton "ZH" gespeichert | Briefe landen in der falschen Stadt |
| **Redundanzfreiheit** | Gleiche Info nur einmal gespeichert | Name "Marvin Muster" in 3 Tabellen → bei Heirat muss man 3× ändern, vergisst man eine, sind die Daten widersprüchlich | Inkonsistenz, Mehraufwand bei Änderungen |
| **Eindeutigkeit** | Jeder Datensatz klar identifizierbar | Zwei Lernende heissen "Thomas Meier" — welcher hat die Note 5.5 bekommen? | Falsche Zuordnung von Prüfungen und Noten |

> → **Das führt direkt zu Block 2 und 4:** Eindeutigkeit lösen wir in Block 2 mit Primärschlüsseln im ER-Modell. Redundanzfreiheit lösen wir in Block 4 mit der Normalisierung. Diese Qualitätsmerkmale sind kein abstraktes Konzept — sie sind der Grund warum wir die Datenbank so aufbauen wie wir es tun.

---

## 🧩 QUIZFRAGEN BLOCK 1 (JavaScript quizData, Schlüssel: m162_b1)

```javascript
m162_b1: {
  questions: [
    {
      q: "Du siehst in einer Datenbank den Wert \"INP25b\". Warum ist das ein Datum und noch keine Information?",
      options: [
        "Weil es aus Buchstaben und Zahlen gemischt ist",
        "Weil der Wert ohne Kontext keine Bedeutung hat — man weiss nicht was INP25b ist",
        "Weil es kein gültiger Datentyp ist",
        "Weil Datenbanken keine Texte speichern können"
      ],
      correct: 1,
      explanation: "Ein Datum ist ein roher Wert ohne Kontext. \"INP25b\" allein sagt nichts aus. Erst mit dem Wissen, dass es sich um einen Klassennamen an der BBZW handelt, wird daraus eine Information."
    },
    {
      q: "Die Zimmernummer wird als Zahl gespeichert (12, 4, 27). Warum sollte man trotzdem keinen Durchschnitt der Zimmernummern berechnen?",
      options: [
        "Weil Zimmernummern zu kurz sind",
        "Weil INT der falsche Datentyp ist",
        "Weil Zimmernummern Kategorien sind — Zimmer 12 + Zimmer 4 = Zimmer 16 ergibt keinen Sinn",
        "Weil der Durchschnitt immer eine Kommazahl wäre"
      ],
      correct: 2,
      explanation: "Zimmernummern sind Klassifikationen, keine Messgrössen. Die Zahl dient nur zur Identifikation, nicht zur Berechnung. Das ist der Unterschied zwischen nominalen Werten und metrischen Messdaten."
    },
    {
      q: "Warum speichert man das Alter als INT und nicht einfach als VARCHAR (Text)?",
      options: [
        "Weil INT weniger Buchstaben braucht",
        "Weil VARCHAR nur für lange Texte ist",
        "Weil man mit Text nicht rechnen kann: \"17\" + 5 ergibt \"175\", nicht 22",
        "Weil die Datenbank sonst abstürzt"
      ],
      correct: 2,
      explanation: "Datentypen legen die Spielregeln fest. Als INT kann die Datenbank prüfen ob der Wert eine gültige Zahl ist, und man kann damit rechnen (Alter + 5 = 22). Als Text würde die Verkettung \"17\"+\"5\" = \"175\" ergeben — ein schwer zu findender Fehler."
    },
    {
      q: "In der Schulverwaltung wird der Lehrberuf gespeichert: Informatiker, Kaufmann, Elektriker. Welches Skalenniveau hat dieses Merkmal?",
      options: [
        "Metrisch — man kann den Durchschnittslehrberuf berechnen",
        "Ordinal — man kann Lehrberufe in eine sinnvolle Rangfolge bringen",
        "Nominal — die Berufe sind Kategorien ohne Reihenfolge, nur Zählen und Häufigkeiten sind sinnvoll",
        "Binär — weil es nur zwei Möglichkeiten gibt"
      ],
      correct: 2,
      explanation: "Lehrberufe haben keine natürliche Reihenfolge und keine messbaren Abstände zueinander. Das ist Nominalskala. Erlaubt sind: Häufigkeiten zählen und den häufigsten Wert bestimmen. Ein Durchschnitt wäre sinnlos."
    },
    {
      q: "Lernender \"Thomas Meier\" ist versehentlich zweimal in der Datenbank gespeichert. Welche zwei Qualitätsmerkmale sind verletzt?",
      options: [
        "Vollständigkeit und Widerspruchsfreiheit",
        "Widerspruchsfreiheit und Skalenniveau",
        "Eindeutigkeit und Redundanzfreiheit",
        "Datentyp und Vollständigkeit"
      ],
      correct: 2,
      explanation: "Redundanzfreiheit ist verletzt, weil die gleichen Daten doppelt vorliegen. Eindeutigkeit ist verletzt, weil nicht klar ist welcher Eintrag der echte Thomas Meier ist — bei einer Notenauswertung könnte man die Note dem falschen Datensatz zuordnen."
    }
  ]
}
```

---

## ──────────────────────────────────────
## BLOCK 2 – Das ER-Modell: Die Schulverwaltung auf Papier zeichnen
## ──────────────────────────────────────

> **Wo stehen wir?** Block 1 ✅ Daten analysiert. Block 2 ← wir sind hier: Struktur modellieren. Block 3 Tabellen ableiten. Block 4 Normalisieren.

---

### Schritt 1 — Warum nicht einfach direkt eine Tabelle bauen?

Stell dir vor, du öffnest Excel und tippst alle Daten der Schulverwaltung in eine einzige riesige Tabelle: Name, Klasse, Lehrperson, Fach, Note, Zimmer — alles in einer Zeile pro Eintrag.

Das klingt simpel. Aber nach ein paar Wochen merkst du: Lehrerin "Frau Müller" steht 200 Mal drin — und als sie heiratet und "Frau Keller" heisst, musst du 200 Zeilen anfassen. Vergisst du eine einzige, stimmt die Datenbank nicht mehr. Das ist genau das Redundanz-Problem aus Block 1.

Die Lösung: Bevor wir irgendwas in eine Datenbank schreiben, überlegen wir zuerst die **Struktur**. Wer gehört zu wem? Was hängt wovon ab? Dieses Nachdenken nennt man **Datenmodellierung** — und das Werkzeug dafür ist das ER-Modell.

> 💡 **ER-Modell = Bauplan der Datenbank**
> Ein Architekt zeichnet zuerst den Plan, bevor er baut. Ein Datenbankentwickler zeichnet zuerst das ER-Modell, bevor er die Datenbank erstellt. Fehler auf dem Papier sind günstig — Fehler in der fertigen Datenbank mit echten Daten sind teuer.

---

### Schritt 2 — Die drei Bausteine des ER-Modells

Das ER-Modell wurde 1976 von Pin-Shan Chen entwickelt und ist heute noch der weltweite Standard. Es besteht aus genau drei Zutaten:

| Symbol | Name | Darstellung | Beispiel |
|--------|------|-------------|---------|
| Rechteck | **Entitätstyp** | Rechteck, Bezeichnung im Singular | `Lernender`, `Klasse`, `Lehrperson` |
| Ellipse | **Attribut** | Ellipse, Primärschlüssel unterstrichen | `LernenderID`, `Vorname`, `Geburtsdatum` |
| Raute | **Beziehungstyp** | Raute, Verb in 3. Person Singular | `besucht`, `unterrichtet`, `belegt` |

> → **Entität vs. Entitätstyp:** Ein Entitätstyp ist die Schublade mit der Aufschrift "alle Lernenden". Eine Entität ist ein konkretes Objekt darin: Lernender "Marvin, ID 42". Im ER-Diagramm zeichnen wir immer den Typen, nie die einzelne Entität.

---

### Schritt 3 — Schritt für Schritt: die Schulverwaltung modellieren

Der Modellierungsprozess folgt immer denselben 5 Schritten:

1. **Entitätstypen identifizieren** — Was sind die "Dinge" im System? → Lernender, Klasse, Lehrperson, Raum
2. **Attribute festlegen** — Was wissen wir über jedes Ding? → Lernender hat LernenderID, Vorname, Nachname, Geburtsdatum
3. **Beziehungstypen bestimmen** — Wie hängen die Dinge zusammen? → Lernender "besucht" Klasse
4. **Kardinalitäten setzen** — Wie viele? → Ein Lernender besucht genau 1 Klasse, eine Klasse hat mc Lernende
5. **Modell prüfen** — Passt alles? Kann man alle Fragen des Systems beantworten?

---

### Schritt 4 — Kardinalitäten: Wie viele von was?

Kardinalitäten sagen aus, wie viele Entitäten an einer Beziehung teilnehmen können. Sie bestimmen später ob wir einen Fremdschlüssel oder eine Zwischentabelle brauchen.

> ⚠️ **Wichtige Notation (gemäss BBZW-Unterlagen):**
> Die Kardinalität steht neben der Raute, auf der Seite des Entitätstyps **zu dem sie zeigt**. Beispiel aus dem Lehrmittel: `Abteilung —1— beschäftigt —n— Mitarbeiter` — die `1` zeigt zur Abteilung (eine Abteilung pro Mitarbeiter), die `n` zeigt zum Mitarbeiter (mehrere Mitarbeiter pro Abteilung).

| Symbol | Bedeutung | Lesart |
|--------|-----------|--------|
| `1` | Genau eine Entität | "Genau ein/e..." |
| `c` | Keine oder eine (0 oder 1) — Kann-Beziehung | "Kein/e oder ein/e..." |
| `m` | Eine oder mehrere (mind. 1) — Muss-Beziehung | "Mindestens ein/e..." |
| `mc` | Keine, eine oder mehrere — Kann-Mehrfachbeziehung | "Beliebig viele (auch keine)..." |

**Lesart am Beispiel:**
```
Lernender ——mc—— besucht ——1—— Klasse
```
- Von Klasse aus gelesen: `mc` neben Lernender → "Eine Klasse hat mc Lernende" (auch 0, z.B. neue Klasse)
- Von Lernender aus gelesen: `1` neben Klasse → "Ein Lernender besucht genau 1 Klasse"

---

### Schritt 5 — Die drei Beziehungsarten in der Schulverwaltung

**1:mc — Eine Klasse hat viele Lernende**
```
Lernender ——mc—— besucht ——1—— Klasse
```
Ein Lernender gehört zu genau einer Klasse. Eine Klasse hat beliebig viele Lernende (mc, da eine neue Klasse auch 0 Lernende haben kann). → Lösung in Block 3: **Fremdschlüssel** `fk_KlasseID` in der Lernenden-Tabelle.

**mc:mc — Lehrperson unterrichtet viele Fächer, Fach wird von vielen Lehrpersonen unterrichtet**
```
Lehrperson ——mc—— unterrichtet ——mc—— Fach
```
Frau Müller unterrichtet Mathe und Deutsch. Mathe wird von Frau Müller und Herrn Koch unterrichtet. → Lösung in Block 3: **Zwischentabelle** (direkt nicht speicherbar).

**1:1 — Jede Klasse belegt genau einen Hauptraum**
```
Klasse ——1—— belegt ——1—— Raum
```
Eine Klasse hat genau einen Hauptraum, ein Raum ist genau einer Klasse zugewiesen. → Lösung in Block 3: **Fremdschlüssel** auf einer der beiden Seiten.

---

### Schritt 6 — Primärschlüssel: das Eindeutigkeits-Problem aus Block 1 lösen

Erinnerst du dich an das Problem aus Block 1? Zwei "Thomas Meier" — welcher ist welcher? Genau das löst der Primärschlüssel. Im ER-Modell wird er **unterstrichen** dargestellt.

| Entitätstyp | Primärschlüssel | Warum dieser? | Was wäre falsch? |
|-------------|-----------------|---------------|-----------------|
| Lernender | `LernenderID` (INT, auto) | Jede ID wird nur einmal vergeben — auch bei gleichen Namen | Name: kann doppelt vorkommen |
| Klasse | `KlasseID` (INT, auto) | Stabil, auch wenn die Klasse umbenannt wird | Bezeichnung "INP25b": kann sich ändern |
| Lehrperson | `PersonalNr` (INT, auto) | Eindeutig, auch bei Namensänderung (Heirat) | Name: ändert sich, kann doppelt vorkommen |
| Raum | `RaumNr` (CHAR(5)) | Raumbezeichnungen wie "A201" sind bereits eindeutig | Stockwerk allein nicht eindeutig |

> ✅ **Faustregel für gute Primärschlüssel:**
> Ändert sich nie. Ist immer eindeutig. Ist so kurz wie möglich. Hat keine inhaltliche Bedeutung (reine ID). Vermeide alles was sich ändern könnte — Namen, E-Mails, Telefonnummern.

---

### Schritt 7 — Das vollständige ER-Diagramm der Schulverwaltung

```
                    [LernenderID]  [Vorname]  [Nachname]  [Geburtsdatum]
                          |            |           |             |
                          +------------+-----------+-------------+
                                            |
                                      [Lernender]
                                            |
                                           mc
                                            |
                                        <besucht>
                                            |
                                            1
                                            |
                        [KlasseID]----[Klasse]----[Bezeichnung]
                                            |
                                            1
                                            |
                                        <belegt>
                                            |
                                            1
                                            |
                          [RaumNr]------[Raum]------[Bezeichnung]

        [PersonalNr]  [Vorname]  [Nachname]
              |            |          |
              +------------+----------+
                           |
                      [Lehrperson]
                           |
                          mc
                           |
                    <unterrichtet in>
                           |
                          mc
                           |
                         [Raum]
```

> → **Was passiert mit mc:mc in Block 3?** Die Beziehung "Lehrperson unterrichtet in Raum" ist mc:mc — das lässt sich nicht direkt als Fremdschlüssel abbilden. In Block 3 lösen wir das mit einer Zwischentabelle.

---

## 🧩 QUIZFRAGEN BLOCK 2 (JavaScript quizData, Schlüssel: m162_b2)

```javascript
m162_b2: {
  questions: [
    {
      q: "Warum zeichnet man zuerst ein ER-Modell, bevor man die Datenbank erstellt?",
      options: [
        "Weil das eine Schulvorschrift ist",
        "Weil man damit die Datenbank automatisch generieren kann",
        "Weil Fehler in der Struktur auf Papier günstig zu korrigieren sind — in einer fertigen Datenbank mit echten Daten sind Strukturänderungen aufwändig und riskant",
        "Weil ER-Modelle schneller sind als Datenbanken"
      ],
      correct: 2,
      explanation: "Ein ER-Modell ist der Bauplan. Fehler beim Modellieren kosten Minuten. Dieselben Fehler in einer laufenden Datenbank — z.B. falsch verknüpfte Tabellen — können Tage dauern zu korrigieren und Datenverlust riskieren."
    },
    {
      q: "Was stellt eine Raute im ER-Diagramm dar?",
      options: [
        "Einen Entitätstyp — ein Ding das gespeichert wird",
        "Einen Primärschlüssel",
        "Einen Beziehungstyp — wie zwei Entitäten miteinander verbunden sind",
        "Ein Attribut mit besonderer Bedeutung"
      ],
      correct: 2,
      explanation: "Im ER-Modell: Rechteck = Entitätstyp (Ding), Ellipse = Attribut (Eigenschaft), Raute = Beziehungstyp (Verknüpfung). Die Raute steht immer zwischen zwei Entitätstypen und beschreibt deren Verbindung als Verb."
    },
    {
      q: "Im Diagramm steht: Lernender ——mc—— besucht ——1—— Klasse. Was bedeutet die mc neben dem Lernender-Rechteck?",
      options: [
        "Ein Lernender kann mc Klassen besuchen",
        "Eine Klasse hat mc Lernende — die Kardinalität neben Lernender zeigt zur Klasse hin und beschreibt wie viele Lernende eine Klasse hat",
        "mc bedeutet dass Lernende optional sind",
        "Die Beziehung ist ungültig"
      ],
      correct: 1,
      explanation: "Die Kardinalität steht neben der Raute auf der Seite des Entitätstyps zu dem sie zeigt. mc neben Lernender bedeutet: von der Klasse aus gesehen hat eine Klasse mc (beliebig viele) Lernende. Die 1 neben Klasse bedeutet: ein Lernender besucht genau 1 Klasse."
    },
    {
      q: "Lehrerin Frau Müller unterrichtet Mathe und Deutsch. Mathe wird von Frau Müller und Herrn Koch unterrichtet. Welche Kardinalität hat die Beziehung zwischen Lehrperson und Fach?",
      options: [
        "1:1 — eine Lehrperson unterrichtet genau ein Fach",
        "1:mc — eine Lehrperson unterrichtet viele Fächer, aber ein Fach hat nur eine Lehrperson",
        "mc:mc — eine Lehrperson kann viele Fächer unterrichten, ein Fach kann von vielen Lehrpersonen unterrichtet werden",
        "m:1 — mindestens eine Lehrperson pro Fach, aber Lehrpersonen nur ein Fach"
      ],
      correct: 2,
      explanation: "Frau Müller → Mathe und Deutsch (mc). Mathe → Frau Müller und Herr Koch (mc). Das ist mc:mc. Diese Beziehung braucht in Block 3 eine Zwischentabelle, weil sie sich nicht direkt mit einem Fremdschlüssel abbilden lässt."
    },
    {
      q: "Warum ist der Vorname kein guter Primärschlüssel für die Tabelle Lernender?",
      options: [
        "Weil VARCHAR der falsche Datentyp für einen Primärschlüssel ist",
        "Weil ein Vorname zu kurz ist",
        "Weil zwei Lernende den gleichen Vornamen haben könnten — ein Primärschlüssel muss jeden Datensatz eindeutig identifizieren",
        "Weil Primärschlüssel immer Zahlen sein müssen"
      ],
      correct: 2,
      explanation: "Ein Primärschlüssel muss eindeutig sein — er darf in der ganzen Tabelle nur einmal vorkommen. Vornamen können doppelt vorkommen. Deshalb verwendet man eine auto-generierte ID-Nummer, die garantiert eindeutig ist und sich nie ändert."
    }
  ]
}
```

---

*Aktualisiert: 01.06.2026 | Block 2 hinzugefügt*
*Kardinalitäts-Notation: gemäss BBZW-Unterlagen INF_M162_B02_ER-Modell.pdf — Kardinalität steht neben der Raute auf der Seite des Entitätstyps zu dem sie zeigt*
*→ Nächster Schritt: Block 3 (Relationales Modell) erstellen*
