---
title: WSUS Migration
tags:
  - projekt
  - arbeit
  - server
  - 
created: 2026-06-12
status: active
publish: false
todo: true
due: 2026-06-30
---

 
>[!Info]
Dieses Dokument beschreibt die Planung & Umsetzung der Server Migration des WSUS01 von **`2012R2`** zu **`2025`**

# WSUS Migration 2012 R2 => 2025

## Kontext

Der WSUS-Server 01 sollte auf einen neuere Version aktualisiert werden. Da der Versionssprung von 2012 R2 auf 2025 ein relativ großer ist wurde sich gegen ein In-Place Upgrade entschieden.

Nun ist das Ziel einen neuen 2025 Server aufzusetzen und den WSUS Dienst auf diesen zu migrieren.

## Details

### Mögliche Migrationswege

#### Kopieren der Einstellung des WSUS
>**Quelle:** [4sysops.com](https://4sysops.com/archives/migrate-wsus-install-role-and-move-data-to-windows-server-2025/)  

Diese Methode eignet sich, wenn ein sauberer Neustart gewünscht wird und auf die bisherige Approval-History verzichtet werden kann. Besonders bei grossen oder veralteten WSUS-Datenbanken ist das oft die bessere Wahl.

Auf dem neuen Server wird zuerst die WSUS-Rolle über den Server Manager installiert. Der Konfigurations-Wizard wird direkt wieder geschlossen, ohne eine Synchronisation zu starten. Anschliessend werden auf dem alten Server alle relevanten Einstellungen notiert: Produkte, Klassifikationen, Proxy-Konfiguration, Synchronisationszeitplan und Computer Groups.

Diese Einstellungen werden auf dem neuen Server manuell nachgepflegt oder alternativ mit dem PSWSUSMigration-Modul übertragen (siehe Methode 3). Der WSUS-Content-Ordner vom alten Server wird auf den neuen Server kopiert, typischerweise ein dediziertes Laufwerk wie `D:\WSUS`. Danach wird folgender Befehl ausgeführt, damit WSUS den Inhalt erkennt:

```
wsusutil.exe postinstall CONTENT_DIR=<Pfad>
```

Zum Abschluss wird die GPO auf den neuen Server umgebogen 
(`http://unetwsus01.unet.unilu.ch:8530`). Die Clients melden sich beim nächsten Update-Zyklus automatisch am neuen Server an.

**Vorteil:** Sauberer Zustand ohne veraltete Daten in der Datenbank.  
**Nachteil:** Die Approval-History geht verloren und Update-Approvals müssen neu gesetzt werden.


#### Downstream Replica
>**Quelle:** [ajtek.ca](https://www.ajtek.ca/wsus/how-to-migrate-or-upgrade-wsus/)  

Das ist der empfohlene Standardweg bei einer Migration auf neue Hardware. Alle Daten, Computer Groups und Approvals bleiben vollständig erhalten.

Auf dem neuen Server wird die WSUS-Rolle installiert. Im Konfigurations-Wizard wird "Synchronize from another Windows Server Update Services server" gewählt, der Name oder die IP des alten Servers eingetragen und der Replica-Modus aktiviert. Port 8530 muss zwischen den beiden Servern erreichbar sein.

Die erste Synchronisation wird gestartet und vollständig abgewartet. Dabei zieht der neue Server alle Updates, Computer Groups und Approvals vom alten Server. Nach dem Sync wird geprüft, ob alle Gruppen und Approvals korrekt übernommen wurden.

Danach wird die GPO auf den neuen Server umgestellt. Sobald alle Clients in der WSUS-Konsole am neuen Server sichtbar sind, wird unter "Options > Update Source and Proxy Server" der Replica-Modus deaktiviert und auf "Synchronize from Microsoft Update" umgestellt. Damit wird der neue Server zum eigenständigen Upstream und der alte Server kann abgeschaltet werden.

**Vorteil:** Vollständige Datenübernahme mit minimalem Risiko, kein manuelles Nachpflegen notwendig.  
**Nachteil:** Der initiale Sync kann in grossen Umgebungen sehr lange dauern. Vorher mit dem WSUS Cleanup Wizard auf dem alten Server aufräumen verkürzt die Sync-Zeit erheblich.


#### GitHub PSWSUSMigration-Tool
>**Quelle:** [https://github.com/reiikei/PSWSUSMigration](https://github.com/reiikei/PSWSUSMigration)  

Dieses Community-Tool ergänzt Methode 1 sinnvoll: Es überträgt Einstellungen, Computer Groups und Approvals strukturiert per PowerShell, ohne die gesamte Datenbank kopieren zu müssen. Einzelne Gruppen können gezielt exportiert und importiert werden.

**Voraussetzungen:** PowerShell 3.0 oder neuer, WSUS-Rolle auf dem Zielserver bereits installiert.

**Installation über die PowerShell Gallery:**
```powershell
Install-Module -Name PSWSUSMigration
```

Alternativ kann das ZIP vom GitHub-Repository heruntergeladen und manuell importiert werden:
```powershell
Import-Module <Pfad>\PSWSUSMigration.psd1
```

**Export auf dem alten Server:**
```powershell
Export-WSUSOptions -XmlPath C:\Migration\wsus-options.xml
Export-WSUSComputerGroups -XmlPath C:\Migration\wsus-groups.xml -IncludeComputerMembership
Export-WSUSUpdateApprovals -XmlPath C:\Migration\wsus-approvals.xml -All
```

Die drei XML-Dateien werden auf den neuen Server kopiert.

**Import auf dem neuen Server:**
```powershell
Import-WSUSOptions -XmlPath C:\Migration\wsus-options.xml
Import-WSUSComputerGroups -XmlPath C:\Migration\wsus-groups.xml -IncludeComputerMembership
Import-WSUSUpdateApprovals -XmlPath C:\Migration\wsus-approvals.xml -All
```

Achtung: `Import-WSUSComputerGroups` löscht bestehende Gruppen auf dem Zielserver vor dem Import.

**Vorteil:** Genauere Kontrolle, kein unnötigen Daten aus der alten Datenbank. 
**Nachteil:** Update-Binaries müssen separat übertragen oder neu synchronisiert werden. Das Modul wird von der Community gepflegt und hat keinen offiziellen Microsoft-Support.


## Ergebnis

[Was ist der aktuelle Stand / Was wurde erreicht?]

## Quellen & Referenzen

- [Downstream Replica WSUS](https://www.ajtek.ca/wsus/how-to-migrate-or-upgrade-wsus/)

## Verwandte Notes

- [[Arbeits Übersicht]]
- [[WSUS Upgrade In-Place]]

