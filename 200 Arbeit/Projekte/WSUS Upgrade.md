---
title: Upgrade WSUS Server 2012 R2 => 2025
tags:
  - projekt
  - arbeit
created: 2026-05-11
status: active
publish: false
todo: true
due: 2026-06-30
---

---

# WSUS01 Migration auf Windows Server 2025

> **Zusammenfassung:** 
> Der WSUS01 läuft aktuell auf Windows Server 2012 R2, welches nicht mehr unterstützt wird. Diese Analyse prüft ob ein In-Place Upgrade auf Windows Server 2025 technisch machbar ist. 
> Ergebnis: Ein Upgrade ist möglich, wird aber ein Installationsmedium erfordern und sollte mit einem Backup abgesichert werden.

---

## 1. Ausgangslage

Der Server `WSUS01` betreibt aktuell Windows Server 2012 R2 — eine Version die seit Oktober 2023 keinen Support mehr erhält. Das Ziel ist ein In-Place Upgrade auf Windows Server 2025 ohne Neuinstallation, um die bestehende Konfiguration und Serverrollen zu erhalten.

---

## 2. Machbarkeitsanalyse

### 2.1 Hardware

Referenz: [Upgrade Windows Server an Ort und Stelle (Microsoft Learn)](https://learn.microsoft.com/de-de/windows-server/get-started/perform-in-place-upgrade)

Die Hardware des WSUS01 erfüllt alle Anforderungen für Windows Server 2025. Kritisch sind dabei die CPU-Instruktionssätze, da diese — im Gegensatz zu RAM oder Storage — nicht nachgerüstet werden können.

Alle relevanten Anforderungen wurden manuell geprüft (das Tool `Coreinfo.exe` steht auf Server 2012 R2 nicht zur Verfügung):

|Anforderung|Status|Nachweis|
|---|---|---|
|NX-Bit / DEP|✅ Erfüllt|Registry-Prüfung|
|SLAT / NPT|✅ Erfüllt|Server ist eine VM — standardmässig unterstützt|
|AMD-V / SVM|✅ Erfüllt|Registry-Prüfung|
|SSE4.2 & POPCNT|✅ Erfüllt|POPCNT bereits Anforderung für 2012 R2; SSE4.2 durch AMD Zen unterstützt|

### 2.2 Betriebssystem-Kompatibilität

Ein direktes Upgrade von Server 2012 R2 auf 2025 ist laut Microsoft möglich, erfordert aber zwingend ein **Installationsmedium (ISO)** — ein einfaches Windows Update reicht nicht aus.

Wichtig: Die Sprache des Installationsmediums muss mit der bestehenden Installation übereinstimmen. Da der WSUS01 auf Englisch installiert wurde, muss die ISO ebenfalls Englisch sein.

### 2.3 Serverrollen-Kompatibilität

Beide aktiven Serverrollen unterstützen das Upgrade:

- **Windows Server Update Services (WSUS)** — kompatibel
- **Webserver (IIS)** — kompatibel

---

## 3. Risiken & Einschränkungen

Ein Upgrade ist technisch machbar, aber folgende Punkte müssen berücksichtigt werden:

- **Sonderfälle:** Spezifische Serverkonfigurationen oder Gruppenrichtlinien können unerwartete Probleme verursachen, die erst während der Installation sichtbar werden.
- **Kein Rollback ohne Backup:** Ein In-Place Upgrade ist nicht automatisch rückgängig zu machen — ein verifiziertes Backup ist zwingend notwendig.
- **Downtime:** Während des Upgrades ist der WSUS-Dienst nicht verfügbar. Dies sollte ausserhalb der Patchzeiten eingeplant werden.

---

## 4. Empfehlung

Das Upgrade kann durchgeführt werden. Empfohlene Reihenfolge:

1. Diagnosedaten sammeln (vor dem Upgrade)
2. Backup über Job `INFRA_14` erstellen und Restore testen
3. Englische ISO für Windows Server 2025 bereitstellen
4. Upgrade durchführen
5. Funktionalität prüfen (WSUS-Dienst, IIS, Clients)

---

## 5. Umsetzung

> **Status:** Ausstehend — wird nach Freigabe durchgeführt

### 5.1 Diagnosedaten sammeln

Vor dem Upgrade werden aktuelle Systemdaten gesichert:

```powershell
systeminfo.exe | Out-File -FilePath systeminfo.txt
ipconfig /all | Out-File -FilePath ipconfig.txt
```

Da `Get-ComputerInfo` auf PowerShell 2.0 (Server 2012 R2) nicht verfügbar ist, werden folgende Registry-Werte manuell notiert:

```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion
├── BuildLabEx
└── EditionID
```

### 5.2 Backup

Der WSUS01 ist im Backup-Job `INFRA_14` enthalten. Vor dem Upgrade:

- [ ] Backup manuell ausführen
- [ ] Restore testen und dokumentieren

### 5.3 Upgrade-Durchführung

1. Englische ISO für Windows Server 2025 mounten
2. `setup.exe` im Root des Images ausführen (erfordert Adminrechte)
3. Bei "Updates herunterladen" → **Nein** auswählen
4. Product-Key eingeben
5. Edition auswählen (entsprechend der aktuellen Lizenz)
6. Lizenzbedingungen akzeptieren
7. Installationstyp → **"Dateien, Einstellungen und Apps beibehalten"** auswählen
8. Installation starten

### 5.4 Abschluss & Verifikation

- [ ] WSUS-Dienst läuft und ist erreichbar
- [ ] IIS antwortet korrekt
- [ ] Clients erhalten weiterhin Updates
- [ ] Systeminfo nach Upgrade dokumentieren

---

## 6. Quellen

- [Microsoft Learn: In-Place Upgrade Windows Server](https://learn.microsoft.com/de-de/windows-server/get-started/perform-in-place-upgrade)
- [Microsoft: Hardwareanforderungen Windows Server](https://learn.microsoft.com/de-de/windows-server/get-started/hardware-requirements)
- [Wikipedia: Liste der AMD-Ryzen-Prozessoren](https://de.wikipedia.org/wiki/Liste_der_AMD-Ryzen-Prozessoren)