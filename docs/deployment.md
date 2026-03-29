---
layout: default
title: Deployment
nav_order: 6
has_children: true
description: "Von der Entwicklung zur produktionsreifen Anwendung"
---

# Deployment

Deployment beginnt im Kurs nicht erst bei Docker oder Hosting. Relevant wird es in dem Moment, in dem aus einem Notebook ein System werden soll, das wiederholbar läuft, konfigurierbar bleibt und nicht nur in genau einer Colab-Session funktioniert.

## Übersicht

### Architektur & Ökosystem

Diese Seite ordnet die Werkzeuge ein, bevor Architekturentscheidungen zu früh verfestigt werden.

- **[Vom Modell zum Produkt](https://ralf-42.github.io/GenAI/deployment/Vom_Modell_zum_Produkt_LangChain_Oekosystem.html)** – *Wie wird aus einem Modell ein System?*

### Deployment-Prozess

Der praktische Übergang von Notebook zu Anwendung scheitert selten an einer einzelnen Technologie. Häufiger fehlen saubere Projektstruktur, Konfiguration und Testbarkeit. Genau dort setzt diese Seite an.

- **[Aus Entwicklung ins Deployment](https://ralf-42.github.io/GenAI/deployment/aus-entwicklung-ins-deployment.html)** – *Was muss zwischen Notebook und Anwendung passieren?*

### Migration & Provider-Wechsel

Providerwechsel wirken auf den ersten Blick technisch, sind in der Praxis aber meist Architekturfragen. Die Migrationsseite zeigt, warum ein gut strukturiertes LangChain-Projekt nicht bei null anfängt.

- **[Migration OpenAI → Mistral](https://ralf-42.github.io/GenAI/deployment/Migration_OpenAI_Mistral.html)** – *Wie wird ein Providerwechsel ohne Neubau angegangen?*
