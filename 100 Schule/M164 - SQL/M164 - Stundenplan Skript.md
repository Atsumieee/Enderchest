---
title: M164 - Stundenplan skript
tags:
  - sql
  - dql
  - schule
  - modul-164
  - aufgaben
created: 2026-05-27
status: draft
publish: false
---
## Aufgabe 2 Fächer

Erstelle mit dem SELECT-Befehl eine Liste aller Fächer. Schreibe den SQL-Befehl so einfach und kurz wie möglich.
```SQL
SELECT * FROM Fach;
```

## Aufgabe 3 Lehrbetriebe

Erstelle mit dem SELECT-Befehl eine Liste aller Lehrbetriebe.
```SQL
SELECT Firmenname FROM Lehrbetrieb;
```

## Aufgabe 4 Lernende - die ersten zehn

```SQL
SELECT TOP 10 Vorname, Nachname 
	FROM Lernender
		ORDER BY Nachname, Vorname; 
```

## Aufgabe 5 Lernende mit Lehrbetrieben

Erstelle eine Liste aller Lernenden inklusive Lehrbetrieb. Beachte die Reihenfolge (Lehrbetrieb, Nachname, Vorname) und die Spaltenüberschriften.

```SQL
SELECT b.Firmenname AS Lehrbetrieb, L.Nachname AS Nachname, L.Vorname AS Vorname
	FROM Lernender AS L
		INNER JOIN Lehrbetrieb AS b ON L.FK_Lehrbetrieb_Id = b.Lehrbetrieb_Id
	ORDER BY Lehrbetrieb, Nachname;
```

## Aufgabe 6 Klassen mit Klassenlehrpersonen
Erstelle eine Liste aller Klassen mit der dazugehörigen Klassenlehrperson. Hinweis: Die Klassen haben alle nur eine Klassenlehrperson. Mit der Tabelle «Klasse_Fach» werden die Fach- lehrpersonen für den Unterricht verknüpft, diese Tabelle ist hier nicht relevant.

```SQL
SELECT K.Bezeichnung AS Klasse, (L.Nachname + ' ' + L.Vorname) AS Klassenlehrperson 
	FROM Klasse AS K
		INNER JOIN Lehrperson AS L ON K.FK_Lehrperson_Id = L.Lehrperson_Id
	ORDER BY Klasse;
```

## Aufgabe 7 Klassenlisten
Erstelle eine Liste aller Lernenden aller Klassen. Beachte die Reihenfolge (Klasse, Nachname, Vorname) und die Spaltenüberschriften

```SQL
SELECT K.Bezeichnung AS Klasse, L.Nachname AS Nachname, L.Vorname AS Vorname
	FROM Lernender AS L
		INNER JOIN Lernender_Klasse AS M ON L.Lernender_Id = M.FK_Lernender_Id
		INNER JOIN Klasse AS K ON M.FK_Klasse_Id = K.Klasse_Id
	ORDER BY Klasse, Nachname, Vorname;
```

## Aufgabe 8 Klassenliste EDB47a
Erstelle eine Liste aller Lernenden der Klasse «EDB47a».

```SQL
SELECT ( L.Vorname + ' ' + L.Nachname ) AS 'Klassenliste EDB47A'
	FROM Lernender AS L
		INNER JOIN Lernender_Klasse AS M ON L.Lernender_Id = M.FK_Lernender_Id
		INNER JOIN Klasse AS K ON M.FK_Klasse_Id = K.Klasse_Id
	WHERE K.Bezeichnung = 'EDB47a'
	ORDER BY Vorname;
```

## Aufgabe 9 Anzahl Lernende pro Klasse
Erstelle eine Liste aller Klassen mit der Anzahl der Lernenden pro Klasse.

```SQL
SELECT K.Bezeichnung AS Klasse, COUNT(L.lernender_ID) AS 'Anzahl Lendende'
	FROM Lernender AS L
		INNER JOIN Lernender_Klasse AS M ON L.Lernender_Id = M.FK_Lernender_Id
		RIGHT JOIN Klasse AS K ON M.FK_Klasse_Id = K.Klasse_Id
	GROUP BY K.Bezeichnung
	ORDER BY [Anzahl Lendende] DESC;
```

## Aufgabe 10 Anzahl Fächer pr Lehrperson

```SQL
SELECT 
        (L.Nachname + ' ' + L.Vorname) AS Fachlehrperson,
        COUNT(DISTINCT F.Fach_Id) AS Anzahl_Faecher
    FROM Lehrperson AS L
        LEFT JOIN Klasse_Fach AS KF ON L.Lehrperson_Id = KF.FK_Lehrperson_Id
        LEFT JOIN Fach AS F ON KF.FK_Fach_Id = F.Fach_Id
    GROUP BY L.Lehrperson_Id, L.Nachname, L.Vorname
    ORDER BY Fachlehrperson ASC;
```

## Anzahl 11 Fächerliste INP47x
```SQL
SELECT DISTINCT F.Kurzbezeichnung AS Abkürzung, F.Langbezeichnung AS Fach
		FROM Klasse AS K
			INNER JOIN Klasse_Fach AS KF ON K.Klasse_Id = KF.FK_Klasse_Id
			INNER JOIN Fach AS F ON F.Fach_Id = KF.FK_Fach_Id
		WHERE K.Bezeichnung LIKE 'INP47%'
```

Marvin: CSS-Layout + Javascript + Webserver verwalten

Milan: HTML + CSS-Layout ( Module M162 + M319 )

Anna: Doku/Präsi + Testing ( Modul M187, M122 )

Roni: Doku/Präsi + Testing ( Modul M117, M164 )