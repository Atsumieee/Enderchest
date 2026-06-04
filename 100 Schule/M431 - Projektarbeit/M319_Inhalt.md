---
title: M319 - Python Grundlagen
tags:
  - python
  - programmierung
  - scripting
  - schule
  - modul-319
created: 2026-05-31
status: draft
publish: false
source: https://af81.github.io/python-school/
---

# M319 – Python: Applikationen entwerfen und implementieren
> Lerninhalt für die IT-Lernplattform | Basiert auf Modul 319 Grundlagen (Dr. Andreas Fischer, BBZW Sursee)
> Struktur: 5 Inhaltsblöcke + Quizfragen (bereit zum Einfügen in HTML)

---

## ──────────────────────────────────────
## BLOCK 1 – Wie funktioniert ein Computerprogramm?
## ──────────────────────────────────────

### Das EVA-Prinzip

Jedes Computerprogramm – egal wie gross oder klein – folgt dem gleichen Grundprinzip:

**Eingabe → Verarbeitung → Ausgabe** (EVA-Prinzip)

| Schritt | Name | Beispiel |
|---------|------|---------|
| 1 | **Eingabe** | Benutzer tippt eine Zahl ein (Tastatur, Maus, Sensor) |
| 2 | **Verarbeitung** | Programm führt Berechnungen oder Vergleiche durch |
| 3 | **Ausgabe** | Ergebnis wird auf dem Bildschirm angezeigt oder gespeichert |

> **Merkhilfe:** Ein Programm ist wie ein Rezept – es beschreibt Schritt für Schritt, was zu tun ist, damit ein gewünschtes Ergebnis entsteht.

**Beispiel in Python:**

```python
# 1. Eingabe: Benutzer gibt seinen Namen ein
name = input("Wie heisst du? ")

# 2. Verarbeitung: Text zusammensetzen
begruessung = "Hallo, " + name + "! Schön, dich zu sehen."

# 3. Ausgabe: Ergebnis anzeigen
print(begruessung)
```

### Was ist ein Algorithmus?

Hinter jedem Programm steckt ein **Algorithmus**: eine präzise, schrittweise Anleitung, um ein Problem zu lösen.

**Eigenschaften eines guten Algorithmus:**

| Eigenschaft | Bedeutung |
|-------------|-----------|
| **Korrektheit** | Liefert immer das richtige Ergebnis |
| **Eindeutigkeit** | Jeder Schritt ist klar definiert, keine Interpretationsspielräume |
| **Endlichkeit** | Der Algorithmus hört irgendwann auf |
| **Effizienz** | Benötigt vertretbare Zeit und Ressourcen |

**Beispiel – Algorithmus "Grösste Zahl finden":**
1. Nimm die erste Zahl als "bisherige Grösste"
2. Vergleiche jede weitere Zahl mit der "bisherigen Grössten"
3. Wenn eine Zahl grösser ist → sie wird die neue "bisherige Grösste"
4. Am Ende ist die "bisherige Grösste" die gesuchte Zahl

### Ablauf im Computer

Wenn ein Python-Programm gestartet wird:

1. **Laden** – Das Programm wird von der Festplatte in den **Arbeitsspeicher (RAM)** geladen
2. **Interpretieren** – Python liest den Quellcode **Zeile für Zeile** (Python ist ein Interpreter)
3. **Ausführen** – Die CPU führt die Maschinenbefehle aus
4. **Kontrollstrukturen** – `if`/`else` und Schleifen steuern den Ablauf je nach Daten

### Compiler vs. Interpreter

Programme müssen in Maschinensprache (0 und 1) übersetzt werden, damit der Computer sie versteht.

| Merkmal | Compiler | Interpreter |
|---------|----------|-------------|
| **Arbeitsweise** | Übersetzt den **gesamten** Code auf einmal | Liest und führt den Code **Zeile für Zeile** aus |
| **Geschwindigkeit** | Ausführung danach schneller | Langsamer, da Übersetzung während der Laufzeit |
| **Fehlererkennung** | Meldet Fehler erst nach vollständiger Übersetzung | Meldet Fehler sofort bei der fehlerhaften Zeile |
| **Beispiele** | C, C++ | **Python**, JavaScript |

> **Python ist ein Interpreter.** Deshalb kannst du Python-Code direkt Zeile für Zeile in der Konsole eingeben und sofort das Ergebnis sehen.

### Binärcode – die Sprache des Computers

Alles im Computer ist letztlich **0 und 1** (Binärcode). Jede Zahl, jeder Buchstabe, jedes Bild.

- 1 **Bit** = ein einzelnes 0 oder 1
- 8 **Bits** = 1 **Byte**
- Dezimalzahl 44 → Binär: `101100`

**Dezimal → Binär umrechnen (Restmethode):**

| Dezimalzahl | ÷ 2 | Ergebnis | Rest |
|-------------|-----|---------|------|
| 44 | 2 | 22 | 0 |
| 22 | 2 | 11 | 0 |
| 11 | 2 | 5 | 1 |
| 5 | 2 | 2 | 1 |
| 2 | 2 | 1 | 0 |
| 1 | 2 | 0 | 1 |

Reste von unten nach oben lesen → `101100` = 44

---

### 🧩 Mini-Quiz: Block 1

**Frage 1:** Was bedeutet das EVA-Prinzip in der Informatik?
- A) Ein Programm braucht immer eine grafische Oberfläche
- B) **Eingabe → Verarbeitung → Ausgabe – der grundlegende Ablauf jedes Programms** ✅
- C) Drei verschiedene Programmiersprachen
- D) Eine Methode zum Testen von Software

*Erklärung: EVA steht für Eingabe, Verarbeitung, Ausgabe. Jedes Programm nimmt Daten entgegen, verarbeitet sie und gibt ein Ergebnis aus – egal ob Taschenrechner oder soziales Netzwerk.*

**Frage 2:** Was unterscheidet einen Interpreter von einem Compiler?
- A) Ein Interpreter ist schneller als ein Compiler
- B) Compiler gibt es nur für ältere Sprachen
- C) **Ein Interpreter führt den Code Zeile für Zeile aus, ein Compiler übersetzt alles auf einmal vorher** ✅
- D) Es gibt keinen Unterschied

*Erklärung: Python verwendet einen Interpreter – du kannst jede Zeile sofort ausführen und siehst Fehler direkt. Ein Compiler (z.B. für C++) übersetzt erst das gesamte Programm, dann läuft es.*

**Frage 3:** Was ist ein Algorithmus?
- A) Eine Programmiersprache wie Python
- B) Ein Fehler im Code
- C) Eine spezielle Hardware-Komponente
- D) **Eine präzise, schrittweise Anleitung zur Lösung eines Problems** ✅

*Erklärung: Algorithmen sind die Denkgrundlage aller Programme. Bevor man Code schreibt, überlegt man: Welche Schritte brauche ich? In welcher Reihenfolge? Das ist der Algorithmus.*

---

## ──────────────────────────────────────
## BLOCK 2 – Variablen & Datentypen
## ──────────────────────────────────────

### Was ist eine Variable?

Eine Variable ist ein **benannter Speicherplatz** im Arbeitsspeicher. Du kannst darin einen Wert ablegen, ihn später wieder abrufen oder verändern.

In Python brauchst du **kein Schlüsselwort** wie `var` oder `int` – du schreibst einfach den Namen und weist einen Wert zu:

```python
number = 18
modul_name = "Applikationen entwerfen und implementieren"
ist_aktiv = True
```

Du kannst auch **mehrere Variablen auf einmal** zuweisen:

```python
a, b, c = 5, 3.2, "Hello"

print(a)  # 5
print(b)  # 3.2
print(c)  # Hello
```

### Regeln für Variablennamen

| ✅ Erlaubt | ⛔ Nicht erlaubt |
|-----------|----------------|
| `number` | `Number` (Grossbuchstabe am Anfang) |
| `h4acker` | `8ung` (beginnt mit Zahl) |
| `first_name` | `first-name` (Bindestrich nicht erlaubt) |
| `speed_in_percent` | `speedin%` (Sonderzeichen verboten) |

> **Konvention:** Variablennamen beginnen mit einem Kleinbuchstaben, zusammengesetzte Begriffe werden mit `_` verbunden (`snake_case`).

### Datentypen

Python erkennt den Datentyp **automatisch** – du musst ihn nicht angeben.

| Typ (DE) | Typ (EN) | Kurzform | Beispiele |
|----------|----------|----------|-----------|
| Zeichenkette | String | `str` | `"Hallo"`, `"abc123"`, `"0.62"` |
| Ganzzahl | Integer | `int` | `-5`, `0`, `8`, `54` |
| Fliesskommazahl | Float | `float` | `-1.25`, `0.0`, `7.6543` |
| Wahrheitswert | Boolean | `bool` | `True`, `False` |

**Datentyp prüfen mit `type()`:**

```python
name = "Naruto"
print(type(name))  # <class 'str'>

age = 16
print(type(age))   # <class 'int'>

hero = True
print(type(hero))  # <class 'bool'>
```

> 🤓 Tipp: Grosse Zahlen kannst du mit `_` besser lesbar machen: `1_000_000` hat denselben Wert wie `1000000`.

### Konvertieren – Typen umwandeln

Der `input()`-Befehl gibt **immer einen String** zurück – auch wenn der Benutzer eine Zahl eingibt! Um damit rechnen zu können, muss man konvertieren:

```python
# Eingabe ist immer ein String
eingabe = input("Wie alt bist du? ")
print(type(eingabe))  # <class 'str'>

# Konvertieren zu Integer
alter = int(eingabe)
print(type(alter))    # <class 'int'>

# Jetzt kann man rechnen
print("In 10 Jahren bist du", alter + 10, "Jahre alt.")
```

**Konvertierungsfunktionen:**

| Funktion | Konvertiert zu | Beispiel |
|----------|---------------|---------|
| `int(x)` | Ganzzahl | `int("42")` → `42` |
| `float(x)` | Fliesskommazahl | `float("3.14")` → `3.14` |
| `str(x)` | Text | `str(100)` → `"100"` |
| `bool(x)` | Wahrheitswert | `bool(0)` → `False` |

### String-Operationen

Strings sind Zeichenketten – sie haben viele nützliche Methoden.

**Index – Position in einem String:**

Jedes Zeichen hat eine Position (Index), die bei **0** beginnt:

```
H  A  C  K  E  R
0  1  2  3  4  5
```

```python
text = "HACKER"
print(text[0])   # H
print(text[3])   # K
print(text[-1])  # R (letztes Zeichen)
```

**Substrings ausschneiden (Slicing):**

```python
text = "HACKER"
print(text[1:4])  # ACK  (Index 1 bis 3, 4 ist nicht mehr dabei!)
print(text[0:3])  # HAC
print(text[3:])   # KER  (bis zum Ende)
```

> ⚠️ Der Endindex ist **nicht** mehr im Ergebnis enthalten! `text[1:4]` gibt die Zeichen 1, 2, 3 zurück – nicht 4.

**Nützliche String-Methoden:**

```python
text = "hallo welt"

print(len(text))                    # 10 (Länge des Strings)
print(text.upper())                 # HALLO WELT
print(text.lower())                 # hallo welt
print(text.replace("welt","python")) # hallo python
print(text.index("w"))             # 6 (Position von "w")

# Strings zusammensetzen
text1 = "Hello"
text2 = "World!"
print(text1 + " " + text2)         # Hello World!

# f-Strings – Variablen in Text einbetten (empfohlen!)
name = "Kim"
language = "Python"
print(f"My name is {name} and I am learning {language}.")
# My name is Kim and I am learning Python.

# Zeilenumbruch mit \n
print("Erste Zeile.\nZweite Zeile.")
```

---

### 🧩 Mini-Quiz: Block 2

**Frage 1:** Wie erstellt man in Python eine Variable mit dem Wert 42?
- A) `var zahl = 42`
- B) `int zahl = 42`
- C) `zahl := 42`
- D) **`zahl = 42`** ✅

*Erklärung: In Python braucht man kein Schlüsselwort wie `var` oder einen Typ wie `int`. Man schreibt einfach Name = Wert. Python erkennt den Typ automatisch.*

**Frage 2:** Was gibt `type("Hallo")` zurück?
- A) `<class 'int'>`
- B) `<class 'bool'>`
- C) **`<class 'str'>`** ✅
- D) `<class 'float'>`

*Erklärung: Text in Anführungszeichen ist immer ein String (str). Die Funktion `type()` zeigt den Datentyp einer Variable oder eines Wertes an.*

**Frage 3:** Der Benutzer gibt `"17"` über `input()` ein. Was muss man tun, um damit rechnen zu können?
- A) Nichts, Python erkennt es automatisch
- B) Den Wert in eine Liste umwandeln
- C) **Mit `int()` zu einer Ganzzahl konvertieren** ✅
- D) Das Programm neu starten

*Erklärung: `input()` gibt immer einen String zurück, egal was eingegeben wird. Mit `int(eingabe)` oder `float(eingabe)` wandelt man den String in eine Zahl um, mit der gerechnet werden kann.*

**Frage 4:** Was gibt `"HACKER"[1:4]` aus?
- A) `HAC`
- B) `ACKE`
- C) **`ACK`** ✅
- D) `CKER`

*Erklärung: Beim Slicing ist der Startindex enthalten (1 = A), der Endindex nicht mehr (4 = E). Deshalb erhält man die Zeichen an Position 1, 2, 3 → ACK.*

---

## ──────────────────────────────────────
## BLOCK 3 – Kontrollstrukturen (if / elif / else / match)
## ──────────────────────────────────────

### Was sind Kontrollstrukturen?

Ohne Kontrollstrukturen läuft ein Programm immer von oben nach unten – Zeile für Zeile. Mit Kontrollstrukturen kann ein Programm **Entscheidungen treffen** oder **Code wiederholen**.

```
flowchart TD
    A([▶ Start]) --> B{Bedingung wahr?}
    B -- Ja --> C[Code Block ausführen]
    B -- Nein --> D[Überspringen / Alternative]
    C --> E([⏹ Weiter])
    D --> E
```

Python kennt zwei Arten von Kontrollstrukturen:
- **Bedingungen** (`if`, `elif`, `else`) – entscheiden welcher Code läuft
- **Schleifen** (`for`, `while`) – wiederholen Code mehrfach

> **Wichtig in Python:** Statt geschweifter Klammern `{}` wie in anderen Sprachen verwendet Python **Einrückungen** (4 Leerzeichen oder 1 Tab). Der eingerückte Code gehört zum Block darüber.

### if / elif / else – Bedingungen

**Einfaches if:**

```python
x = 5
if x > 0:
    print("x ist positiv")
```

**if + else:**

```python
x = -3
if x > 0:
    print("x ist positiv")
else:
    print("x ist nicht positiv")
```

**if + elif + else (mehrere Fälle):**

```python
x = 0
if x > 0:
    print("x ist positiv")
elif x == 0:
    print("x ist null")
else:
    print("x ist negativ")
```

**Praxisbeispiel – Notensystem:**

```python
note = int(input("Gib deine Note ein (1-6): "))

if note == 6:
    print("Ausgezeichnet!")
elif note >= 5:
    print("Sehr gut!")
elif note >= 4:
    print("Genügend.")
else:
    print("Nicht genügend.")
```

> **Wichtig:** `=` ist eine **Zuweisung** (`x = 5`), `==` ist ein **Vergleich** (`x == 5`). Das ist ein häufiger Anfängerfehler!

### Vergleichsoperatoren

| Operator | Bedeutung | Beispiel | Ergebnis |
|----------|-----------|---------|---------|
| `==` | Gleich | `5 == 5` | `True` |
| `!=` | Ungleich | `5 != 3` | `True` |
| `>` | Grösser als | `10 > 7` | `True` |
| `<` | Kleiner als | `3 < 8` | `True` |
| `>=` | Grösser gleich | `5 >= 5` | `True` |
| `<=` | Kleiner gleich | `4 <= 5` | `True` |

### Logische Operatoren

Mehrere Bedingungen kombinieren:

```python
alter = 17
hat_ausweis = True

if alter >= 18 and hat_ausweis:
    print("Zutritt erlaubt")

if alter < 16 or not hat_ausweis:
    print("Zutritt verweigert")
```

| Operator | Bedeutung |
|----------|-----------|
| `and` | Beide Bedingungen müssen wahr sein |
| `or` | Mindestens eine Bedingung muss wahr sein |
| `not` | Kehrt den Wahrheitswert um |

### match-case (ab Python 3.10)

Für viele Fälle ist `match-case` übersichtlicher als viele `if/elif`:

```python
farbe = "rot"

match farbe:
    case "rot":
        print("Stopp")
    case "gruen":
        print("Los")
    case "gelb":
        print("Vorsicht")
    case _:
        print("Unbekannte Farbe")
# case _ = der Default-Fall (wie "else")
```

> `case _` ist der Auffang-Fall – er wird ausgeführt wenn kein anderer Fall passt. Entspricht dem `else` beim if.

### Schleifen – for und while

**for-Schleife – über eine Sequenz iterieren:**

```python
# Über einen String iterieren
for buchstabe in "Python":
    print(buchstabe)
# Gibt jeden Buchstaben einzeln aus

# Mit Zahlenbereich (range)
for i in range(5):
    print(i)   # 0, 1, 2, 3, 4

# range(start, stop, schritt)
for i in range(0, 10, 2):
    print(i)   # 0, 2, 4, 6, 8
```

**while-Schleife – solange eine Bedingung wahr ist:**

```python
i = 0
while i < 5:
    print(i)
    i += 1   # i = i + 1
# Ausgabe: 0, 1, 2, 3, 4
```

> ⚠️ Bei `while` immer darauf achten, dass die Bedingung irgendwann `False` wird – sonst entsteht eine **Endlosschleife**!

**break und continue:**

```python
# break – Schleife sofort beenden
for i in range(10):
    if i == 5:
        break
    print(i)
# Ausgabe: 0 1 2 3 4

# continue – aktuellen Durchlauf überspringen
for i in range(6):
    if i == 3:
        continue
    print(i)
# Ausgabe: 0 1 2 4 5
```

---

### 🧩 Mini-Quiz: Block 3

**Frage 1:** Welches Symbol wird in Python für einen Vergleich verwendet (nicht für Zuweisung)?
- A) `=`
- B) `-eq`
- C) **`==`** ✅
- D) `===`

*Erklärung: In Python ist `=` eine Zuweisung (Variable einen Wert geben) und `==` ein Vergleich (zwei Werte auf Gleichheit prüfen). Das ist ein sehr häufiger Anfängerfehler!*

**Frage 2:** Wie erkennt Python, welche Zeilen zu einem `if`-Block gehören?
- A) Durch geschweifte Klammern `{}`
- B) Durch das Schlüsselwort `end`
- C) **Durch Einrückungen (4 Leerzeichen oder 1 Tab)** ✅
- D) Durch Semikolons `;`

*Erklärung: Python ist einrückungsbasiert – der eingerückte Code gehört zum Block darüber. Falsche Einrückungen führen zu Fehlern (`IndentationError`).*

**Frage 3:** Was gibt folgender Code aus? `for i in range(3): print(i)`
- A) `1 2 3`
- B) `0 1 2 3`
- C) **`0 1 2`** ✅
- D) `1 2`

*Erklärung: `range(3)` erzeugt die Zahlen 0, 1, 2. Wie bei Arrays beginnt man in Python bei 0. Die Zahl in `range()` selbst ist nicht mehr enthalten.*

**Frage 4:** Was macht `break` in einer Schleife?
- A) Überspringt nur den aktuellen Durchlauf
- B) Pausiert die Schleife für eine Sekunde
- C) Gibt eine Fehlermeldung aus
- D) **Beendet die Schleife sofort, auch wenn die Bedingung noch wahr wäre** ✅

*Erklärung: `break` bricht die gesamte Schleife sofort ab. `continue` hingegen überspringt nur den aktuellen Durchlauf und macht mit dem nächsten weiter.*

---

## ──────────────────────────────────────
## BLOCK 4 – Listen & grundlegende Datenstrukturen
## ──────────────────────────────────────

### Was ist eine Liste?

Eine **Liste** (engl. *list*) ist eine geordnete Sammlung von Werten. Sie kann verschiedene Datentypen enthalten und ist eine der meistgenutzten Datenstrukturen in Python.

```python
# Liste erstellen
farben = ["Rot", "Grün", "Blau"]
zahlen = [1, 2, 3, 4, 5]
gemischt = ["Max", 17, True, 3.14]

# Leere Liste
leer = []
```

### Auf Elemente zugreifen (Index)

Genau wie bei Strings beginnt der Index bei **0**:

```python
farben = ["Rot", "Grün", "Blau", "Gelb"]

print(farben[0])   # Rot
print(farben[1])   # Grün
print(farben[-1])  # Gelb (letztes Element)
print(farben[-2])  # Blau (vorletztes)
```

**Slicing bei Listen (genau wie bei Strings):**

```python
farben = ["Rot", "Grün", "Blau", "Gelb", "Lila"]
print(farben[1:4])   # ['Grün', 'Blau', 'Gelb']
print(farben[:3])    # ['Rot', 'Grün', 'Blau']
print(farben[2:])    # ['Blau', 'Gelb', 'Lila']
```

### Listen bearbeiten

```python
farben = ["Rot", "Grün", "Blau"]

# Element hinzufügen (am Ende)
farben.append("Gelb")
print(farben)  # ['Rot', 'Grün', 'Blau', 'Gelb']

# Element an bestimmter Position einfügen
farben.insert(1, "Orange")
print(farben)  # ['Rot', 'Orange', 'Grün', 'Blau', 'Gelb']

# Element entfernen (nach Wert)
farben.remove("Grün")

# Element entfernen (nach Index)
farben.pop(0)   # entfernt erstes Element (Rot)

# Liste sortieren
zahlen = [3, 1, 4, 1, 5, 9, 2, 6]
zahlen.sort()
print(zahlen)  # [1, 1, 2, 3, 4, 5, 6, 9]

# Anzahl Elemente
print(len(farben))  # Anzahl der Elemente

# Element vorhanden?
print("Blau" in farben)  # True oder False
```

### Mit Listen und Schleifen arbeiten

```python
noten = [5, 4, 6, 3, 5, 4]

# Jedes Element ausgeben
for note in noten:
    print(f"Note: {note}")

# Durchschnitt berechnen
summe = 0
for note in noten:
    summe += note
durchschnitt = summe / len(noten)
print(f"Durchschnitt: {durchschnitt:.1f}")

# Oder mit eingebauten Funktionen:
print(f"Summe: {sum(noten)}")
print(f"Bestes: {max(noten)}")
print(f"Schlechtestes: {min(noten)}")
```

### Tuples – unveränderliche Listen

Ein **Tuple** ist wie eine Liste, aber **unveränderlich** (man kann nichts hinzufügen oder entfernen):

```python
# Tuple mit runden Klammern (oder gar keinen)
koordinaten = (47.0502, 8.3093)
wochentage = ("Mo", "Di", "Mi", "Do", "Fr")

# Zugriff genau wie bei Listen
print(koordinaten[0])   # 47.0502
print(wochentage[-1])   # Fr

# Tuple entpacken
lat, lon = koordinaten
print(f"Breite: {lat}, Länge: {lon}")
```

> **Wann Tuple, wann Liste?**
> - **Liste** → Daten können sich ändern (z.B. Einkaufsliste)
> - **Tuple** → Daten sind fix (z.B. GPS-Koordinaten, Wochentage)

---

### 🧩 Mini-Quiz: Block 4

**Frage 1:** Was gibt `farben[0]` zurück, wenn `farben = ["Rot", "Grün", "Blau"]`?
- A) `"Grün"`
- B) `"Blau"`
- C) Einen Fehler, da Listen bei 1 beginnen
- D) **`"Rot"`** ✅

*Erklärung: In Python (und fast allen Programmiersprachen) beginnt der Index bei 0. Das erste Element ist also `liste[0]`, das zweite `liste[1]` usw.*

**Frage 2:** Welche Methode fügt ein Element am Ende einer Liste hinzu?
- A) `liste.add("Element")`
- B) `liste.insert("Element")`
- C) `liste.push("Element")`
- D) **`liste.append("Element")`** ✅

*Erklärung: `append()` fügt ein Element ans Ende der Liste an. `insert(index, wert)` fügt es an einer bestimmten Position ein.*

**Frage 3:** Was ist der Hauptunterschied zwischen einer Liste und einem Tuple?
- A) Tuples können nur Zahlen speichern
- B) Listen können nur Strings speichern
- C) **Tuples sind unveränderlich – nach der Erstellung können keine Elemente hinzugefügt oder entfernt werden** ✅
- D) Es gibt keinen Unterschied

*Erklärung: Listen `[...]` sind veränderlich (mutable). Tuples `(...)` sind unveränderlich (immutable) – sie eignen sich für feste Daten die sich nicht ändern sollen.*

---

## ──────────────────────────────────────
## BLOCK 5 – Funktionen
## ──────────────────────────────────────

### Was ist eine Funktion?

Eine **Funktion** ist ein benannter, **wiederverwendbarer Code-Block**, der eine bestimmte Aufgabe erfüllt. Statt denselben Code mehrfach zu schreiben, schreibt man ihn einmal als Funktion und ruft ihn so oft auf wie nötig.

**Ohne Funktion (schlecht – Code-Wiederholung):**
```python
print("Hallo, Max!")
print("Hallo, Milan!")
print("Hallo, Marvin!")
```

**Mit Funktion (besser – einmal schreiben, mehrfach nutzen):**
```python
def begruesse(name):
    print(f"Hallo, {name}!")

begruesse("Max")
begruesse("Milan")
begruesse("Marvin")
```

### Funktion definieren mit `def`

```python
def begruesse():
    print("Hello World!")
```

Aufbau:
- `def` → Schlüsselwort zum **Def**inieren einer Funktion
- `begruesse` → Name der Funktion (kleingeschrieben, snake_case)
- `()` → Klammern für Parameter (hier leer)
- `:` → Doppelpunkt am Ende
- Eingerückter Code → Gehört zum Funktionskörper

> **Wichtig:** Das Definieren führt die Funktion nicht aus! Man muss sie separat **aufrufen**.

### Funktion aufrufen

```python
def begruesse():
    print("Hello World!")

# Aufruf:
begruesse()
print("Ausserhalb der Funktion")

# Ausgabe:
# Hello World!
# Ausserhalb der Funktion
```

**Ablauf:**
1. Programmsteuerung springt zur Funktion
2. Code innerhalb wird ausgeführt
3. Steuerung kehrt zurück zum nächsten Befehl nach dem Aufruf

### Funktionen mit Parametern

Parameter machen Funktionen flexibel – sie empfangen Werte von aussen:

```python
def begruesse(name):
    print(f"Hallo, {name}!")

begruesse("John")   # Hallo, John!
begruesse("David")  # Hallo, David!
```

**Mehrere Parameter:**

```python
def addiere(zahl1, zahl2):
    summe = zahl1 + zahl2
    print(f"Summe: {summe}")

addiere(5, 4)    # Summe: 9
addiere(100, 200) # Summe: 300
```

**Parameter mit Standardwert:**

```python
def begruesse(name, sprache="Deutsch"):
    if sprache == "Deutsch":
        print(f"Hallo, {name}!")
    else:
        print(f"Hello, {name}!")

begruesse("Max")           # Hallo, Max!
begruesse("Max", "Englisch")  # Hello, Max!
```

### Rückgabewert mit `return`

Funktionen können einen **Wert zurückgeben**, der weiterverwendet werden kann:

```python
def quadrat(zahl):
    ergebnis = zahl * zahl
    return ergebnis

# Rückgabewert in Variable speichern
q = quadrat(3)
print(f"Quadrat: {q}")   # Quadrat: 9

# Direkt weiterrechnen
print(quadrat(3) + quadrat(4))   # 9 + 16 = 25
```

> Nach `return` wird **nichts mehr** in der Funktion ausgeführt – sie endet sofort.

**Beispiel mit sinnvollem return:**

```python
def berechne_mwst(betrag, satz=7.7):
    mwst = betrag * (satz / 100)
    return round(betrag + mwst, 2)

preis = berechne_mwst(100)
print(f"Preis inkl. MwSt: CHF {preis}")  # CHF 107.7
```

### Platzhalter mit `pass`

Manchmal möchte man eine Funktion vorab definieren, ohne Code hineinzuschreiben:

```python
def zukuenftige_funktion():
    pass   # Kein Fehler, kein Output

zukuenftige_funktion()  # funktioniert, tut aber nichts
```

### Python-Bibliotheksfunktionen

Python kommt mit vielen eingebauten Funktionen – und noch mehr können mit `import` geladen werden:

```python
# Eingebaute Funktionen (immer verfügbar)
print(len("Hallo"))     # 5
print(max(3, 7, 2))     # 7
print(min([5, 1, 9]))   # 1
print(sum([1, 2, 3]))   # 6
print(abs(-42))         # 42

# Mathematik-Modul importieren
import math

print(math.sqrt(16))    # 4.0
print(math.pow(2, 8))   # 256.0
print(math.pi)          # 3.141592653589793
```

> Funktionen aus Modulen müssen mit `import modulname` zuerst geladen werden.

### Übersicht: Aufbau einer Funktion

```python
def funktionsname(parameter1, parameter2="Standardwert"):
    # Code-Block (eingerückt)
    ergebnis = parameter1 + len(parameter2)
    return ergebnis   # optional

# Aufruf
wert = funktionsname("Hallo", "Welt")
```

| Element | Bedeutung |
|---------|-----------|
| `def` | Startet die Funktionsdefinition |
| Funktionsname | Bezeichnung (snake_case) |
| Parameter | Eingabewerte (optional) |
| Einrückung | Gehört zum Funktionskörper |
| `return` | Gibt Wert zurück (optional) |
| Aufruf | Führt die Funktion aus |

---

### 🧩 Mini-Quiz: Block 5

**Frage 1:** Mit welchem Schlüsselwort definiert man in Python eine Funktion?
- A) `function`
- B) `func`
- C) `fun`
- D) **`def`** ✅

*Erklärung: In Python leitet `def` (von "define") die Definition einer Funktion ein. Anders als in JavaScript (`function`) oder PowerShell (`function`) verwendet Python das kürzere `def`.*

**Frage 2:** Was passiert, wenn man eine Funktion nur definiert, aber nicht aufruft?
- A) Sie wird automatisch beim Programmstart ausgeführt
- B) Python meldet einen Fehler
- C) **Nichts – der Code in der Funktion wird erst ausgeführt wenn man sie aufruft** ✅
- D) Sie wird genau einmal ausgeführt

*Erklärung: Eine Funktionsdefinition (`def ...`) teilt Python nur mit, was die Funktion tun soll. Erst der Aufruf (`funktionsname()`) führt den Code tatsächlich aus.*

**Frage 3:** Was macht `return` in einer Funktion?
- A) Gibt eine Fehlermeldung aus
- B) Springt an den Anfang der Funktion zurück
- C) Beendet das gesamte Programm
- D) **Gibt einen Wert aus der Funktion zurück und beendet die Funktion** ✅

*Erklärung: `return wert` gibt den Wert an den Aufrufer zurück. Alles nach `return` in der gleichen Funktion wird nicht mehr ausgeführt.*

**Frage 4:** Welche Ausgabe erzeugt `print(max(3, 7, 2))`?
- A) `3`
- B) `2`
- C) `3 7 2`
- D) **`7`** ✅

*Erklärung: `max()` ist eine eingebaute Python-Funktion, die den grössten Wert aus einer Reihe von Zahlen oder einer Liste zurückgibt. Hier ist 7 das Maximum.*

---

## ──────────────────────────────────────
## AUFGABEN (Coding-Challenges)
## ──────────────────────────────────────

> Diese Aufgaben sind zum selbst Lösen. Musterlösungen kannst du dir nach eigenem Versuch anschauen.

### 🟢 Aufgabe 1 – Hallo Welt mit Eingabe
Schreibe ein Programm, das den Benutzer nach seinem Namen fragt und ihn dann mit "Hallo, [Name]! Willkommen bei Python!" begrüsst.

```
Erwartete Ausgabe (Beispiel):
Wie heisst du? Max
Hallo, Max! Willkommen bei Python!
```

---

### 🟢 Aufgabe 2 – Gerade oder ungerade
Frage den Benutzer nach einer ganzen Zahl und gib aus, ob sie gerade oder ungerade ist.

**Tipp:** Eine Zahl ist gerade wenn `zahl % 2 == 0` (Modulo-Operator `%` gibt den Rest der Division zurück).

```
Erwartete Ausgabe (Beispiel):
Gib eine Zahl ein: 7
7 ist ungerade.
```

---

### 🟡 Aufgabe 3 – Notendurchschnitt
Erstelle eine Liste mit 5 Noten (1–6). Berechne und gib aus:
- Den Durchschnitt (auf 1 Dezimalstelle gerundet)
- Die beste Note
- Die schlechteste Note

---

### 🟡 Aufgabe 4 – Multiplikationstabelle
Schreibe ein Programm, das die Multiplikationstabelle für eine vom Benutzer eingegebene Zahl ausgibt (1× bis 10×).

```
Erwartete Ausgabe (Beispiel, Eingabe: 7):
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70
```

---

### 🔴 Aufgabe 5 – Passwort-Checker (Funktion)
Schreibe eine Funktion `pruefe_passwort(passwort)`, die prüft:
- Mindestens 8 Zeichen lang?
- Enthält eine Zahl?

Gibt `True` zurück wenn beide Bedingungen erfüllt sind, sonst `False`. Gib dem Benutzer eine entsprechende Rückmeldung.

**Tipp:** Mit `any(zeichen.isdigit() for zeichen in passwort)` kann man prüfen ob ein String eine Zahl enthält.

---

*Erstellt: 31.05.2026 | Quelle: Modul 319 – Applikationen entwerfen und implementieren*
*Basierend auf Unterrichtsmaterial von Dr. Andreas Fischer, BBZW Sursee*
*→ Nächster Schritt: Inhalte in `it-lernplattform.html` einfügen, quizData ergänzen*
