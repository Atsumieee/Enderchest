---
title: TCP
tags:
  - protokolle
  - netzwerk
created: 2026-06-18
status: draft
publish: true
todo: false
---

# TCP

## Warum existiert das?
Das Transmission Control Protocol, kurz TCP, ist ein Übertragungsprotokoll welches sich auf der OSI-Transportschicht befindet (Schicht 4). Es wurde konzipiert um ein Grundlegendes Problem bei der Übertragung im Internet zu lösen. ***Wie kann man zuverlässig Daten zwischen 2 Endpunkten transportieren ohne Risiko unvollständige Daten zu erhalten?*** 

TCP stellt sicher, dass Daten:
- vollständig ankommen
- in der richtigen Reihenfolge ankommen
- ohne Fehler übertragen werden
- doppelte Daten verworfen werden
- verloren gegangene Pakete erneut gesendet werden.

Dadurch bildet das TCP auf Ebene 4 des OSI-Modells die Grundlage für viele höherliegende Protokolle.

---

## Wie funktioniert es?

TCP kann man in etwa 4 Phasen aufteilen. Die Einigungs-Phase, die Handshake-Phase, die Übertragungs-Phase & die Beendigungs-Phase. Wobei die 1. Phase eher in der Handshake-Phase integriert ist.

### Einigungs-Phase

In der Einigungs-Phase geht es zuerst darum, dass sich die 2 Endpunkte auf gewisse Standards einigen. Diese Phase geht so gut wie jedes Netzwerk Protokoll zuerst durch damit beide Punkte sozusagen die selbe *Sprache* sprechen. Beispiele dafür sind:

- Welche Ports 
- welchen Algorithmus wird für die Prüfsumme verwendet
- was ist die Fenstergrösse 
- usw.

### Handshake-Phase

Die Handshake-Phase ist die eigentliche Initialisierung des TCP-Protokolls.
In dieser Phase wird eine Verbindung auf Basis des 3-Way-Handshake hergestellt.

Für das TCP-Protokoll spielen sogenannte Flags eine wichtige Rolle wie auch in diesem 3-Way-Handshake. Verwendete Flags sind folgende:

- **SYN** → *Verbindungsanfrage / Synchronize*
		Wird verwendet um eine TCP Session zu starten.

- **ACK** → *Bestätigung / Acknowledgment*
		Wird verwendet um den erhalt eines Pakets dem Sender zu bestätigen.

- **FIN** → *Beenden / Finish*
		Wird verwendet um die TCP Session korrekt zu beenden.

- **RST** → *Zurücksetzen / Reset*
		Wird verwendet um die Session im Falle eines unlösbaren Fehlers zurückzusetzen.

- **PSH** → *Durchdrücken / Push*
		Wird verwendet um Pakete direkt an den Application Layer vorzudrücken, statt es im Buffer zu lagern.

- **URG** → *Dringend / Urgent*
		Wird verwendet um das Paket sofort an die Process queue durchzugeben um es so schnell wie möglich zu verarbeiten.

Mit diesen Flags können wir nun auf das 3-way-handshake Prinzip genauer eingehen.
Die Verbindung wird gestartet indem ein Client eine Anfrage startet: **SYN**
> Client → Server : SYN

Wenn der Server diese Anfrage annimmt sendet er zuerst ein **ACK** als Bestätigung und zugleich ein **SYN** um die Verbindung zum Client aufzubauen.
> Server → Client : ACK, SYN

Am ende der Initialisierung sendet der Client nochmals ein **ACK** an den Server als Bestätigung, dass er das Paket erhalten hat.
> Client → Server : ACK

Somit ist die komplette Verbindung aufgebaut & es kann zur 3. Phase übergegangen werden.

### Übertragungs-Phase
Mit einer bestehenden TCP-Verbindung werden sämtliche weiteren Übertragungen in der Übertragungs-Phase jeweils mit einer **Sequenznummer** versendet. Diese wird verwendet damit:
1. Klar ist, welche Reihenfolge die Pakete haben
2. Mehrere Pakete hintereinander gesendet werden können
3. Der Client oder Server klar mitteilen kann welches Paket er bestätigt.

Mit der Sequenznummer eines Pakets bestätigt der Empfänger mit einem **ACK** das Paket, der Sender wartet auf dieses Signal und würde im Falle eines ausbleibenden **ACK** das Paket erneut senden.

### Beendigungs-Phase

Die Letzte Phase wird verwendet um die TCP-Verbindung zu beenden, denn wie in der Übertragungs-Phase erwähnt, erwarten beide Endgeräte jeweils Nachrichten auf der vereinbarten Schnittstelle aus der Einigungs-Phase. Daher ist es wichtig TCP-Sessions zu beenden um keine *TCP-Leichen* im System zu haben.

Dafür wird auch wieder ein Handshake verfahren verwendet allerdings dieses mal nicht mit **SYN** sondern mit **FIN**. Das Prinzip bleibt aber das gleiche.


### TCP-Paket

Den genauen Aufbau eines TCP-Pakets wird in einer seperaten Note behandelt 
[[TCP-Packages]]

---

## Wann benutze man es?

Der Vorteil von TCP ist seine zuverlässigkeit, diese kommt allerdings zum Preis von Geschwindigkeit. Das ganze hin & her + Checksummen prüfen braucht alles Rechenleistung und Zeit.
Dies merkt man eventuell selten, dies hat aber auch einen Grund. TCP wird bewusst verwendet wenn Datenvollständigkeit wichtiger ist als Geschwindigkeit.

Schauen wir uns mal ein Beispiel an wann TCP schlecht und wann es gut wäre

>[!example] YouTube 🔴
>Angenommen man würde TCP für YouTube Videos verwenden, dann müsste für jedes Bild welches angezeigt wird + Audio dieser Prozess durchgegangen werden. Klingt jetzt nicht nach viel aber bei 60 FPS müssen jede Sekund 60 1080p Bilder über diesen Vorgang laufen, dabei ist die Audio noch nicht einmal mit inbegriffen. Zudem muss auch noch jedes dieser Bilder geprüft werden ob jetzt auch jedes Pixel korrekt übertragen wurde. Das würde das ganze enorm verlangsamen.
>Dabei spielt es aber doch keine Rolle wenn bei einem Video mal 4-5 Pixel nicht Perfekt sitzen denn das fällt dem Menschlichen Auge kaum auf.
>Deswegen wird in einem solchen Fall auf TCP verzichtet denn bei einem Video geht es um Geschwindigkeit und nicht um Vollständigkeit


>[!example] HTTP-Request 🟢
>Bei einem Aufruf auf eine Website wird das TCP Protokoll als Basis verwendet. Jetzt denkt man aber vielleicht: *Aber das Aufrufen einer Website ist ja trotzdem schnell?* Das stimmt auch aber man muss auch bedenken, dass eine Website erstens um einiges kleiner im Thema Datengrösse ist und viele Websites nicht alles aufeinmal laden. Aber gehen wir etwas genauer auf das Beispiel ein. Angenommen man würde jetzt für eine solche Anfrage kein TCP verwenden.
>Vorhin haben wir gesagt, dass 4-5 Pixel keine Rolle spielen aber wie sieht es bei einer Website aus? Da wird kein Bild sondern Source-Code in Form von HTML gesendet. Wäre es da schlimm wenn aufeinmal Zeichen Fehlen? Die Antwort ist klar ja. Sobald in dem übermittelten HTML File ein *bracket* `<` könnte es passieren, dass die Website nicht lädt. Daher wird das TCP Protokoll für solche zwecke verwendet

---

## Beispiele

Gehen wir am besten gleich auf das eben genannte Beispiel ein.
Ein Client möchte eine Website aufrufen und hat die benötigte IP + Port für den Request.

Zuerst sendet er eine **SYN** Anfrage an den Webserver

> Client → Server : SYN

Wenn der Server diese Anfrage annimmt sendet er zuerst ein **ACK** als Bestätigung und zugleich ein **SYN** um die Verbindung zum Client aufzubauen.
> Server → Client : ACK, SYN

Am ende der Initialisierung sendet der Client nochmals ein **ACK** an den Server als Bestätigung, dass er das Paket erhalten hat.
> Client → Server : ACK

Somit steht die Verbindung nun. Jetzt kommt die eigentliche Anfrage für die HTML Datei
Der Client sendet ein HTTP-GET Request mit Sequenznummer **1**
> Client → Server: HTTP-GET **1**

Der Server bestätigt als erstes den Erhalt der Nachricht.
> Server → Client: ACK **1**

Erst jetzt antwortet er wirklich auf die Nachricht mit der nächsten Sequenznummer **2**
> Server → Client: HTTP-Response **2**

Der Client bestätigt anschliessend wieder den erhalt mit:
> Client → Server: ACK **2**

Nach X Anfragen / Antworten wird die Session wieder mit dem 3-way-handshake Prinzip mit **FIN** beendet.

---

## Quellen & Links
- 
