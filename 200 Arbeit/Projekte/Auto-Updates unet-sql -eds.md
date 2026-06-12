---
title: Auto-Updates unet-sql -eds
tags:
  - arbeit
  - projekt
  - scripting
created: 2026-06-12 08:10
status: active
publish: false
todo: true
due: 2026-06-26
---
> Drei Server (unetsql12, uneteds02, uneteds05) sollen auf 
> automatische Updates umgestellt werden. Das bestehende 
> Automatisierungs-Script wird dafür um eine neue Funktion ergänzt.

# Automatische Updates: unetsql12, uneteds02, uneteds05

## Auftrag & Kontext
Um weitere Server in den Pool an automatisierten Updates aufzunehmen und damit manuelle Arbeit zu reduzieren werden als nächstes folgende 3 Server aufgenommen.
- unetsql12
- uneteds02
- uneteds05

Eine Besonderheit welche dazu kommt warum diese automatisiert werden ist, dass die 2 eds-Server zusätzliche Schritte jeweils benötigten da diese Updates für Office Produkte von Microsoft beziehen müssen.

## Rahmenbedingungen
- Alle Server: Updates nur zu Randzeiten
- uneteds02 & uneteds05: Updates am Wochenende
- Reihenfolge eds: zuerst eds02, dann eds05
- eds02 & eds05: zuerst WSUS-Updates, danach Microsoft-Updates direkt

## Script-Anpassung
### Neue Funktion


### Umsetzung


## Ergebnis & Verifikation
- [ ] unetsql12 updatet automatisch
- [ ] uneteds02 updatet am Wochenende (WSUS → MS)
- [ ] uneteds05 updatet nach eds02 (WSUS → MS)
- [ ] Kein manueller Eingriff nötig


## Links
- [[Arbeits Übersicht]]