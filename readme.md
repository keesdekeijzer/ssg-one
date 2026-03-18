# SSG-ONE

Static Site Generator

## Directory structuur

- 'content/posts/' Markdown-bestanden met metadata (titel, datum, tags)
- 'content/pages/' Markdown-bestanden met metadata (titel, datum, tags)
- 'templates/' met Jinja2, voor bijvoorbeeld 'base.html' en 'post.html'
- 'static' assets zoals CSS, JS, Afbeeldingen
- 'output/' waar de uiteindelijke HTML pagina's worden weggeschreven

## Acties

- Markdown inlezen
- Metadata (frontmatter) scheiden van de tekst
- Markdown naar HTML omzetten
- Elke pagina wegschrijven als 'index.html' naar een eigen directory zodat je mooie urls krijgt
- Alles uit 'static/' kopieren naar 'output/static/'

## Python libraries

- 'markdown' voor de omzetting van Markdown naar HTML
- 'python-frontmatter' voor de metadata
- 'jinja2' voor de templates

## Build functie

- Door alle bestanden in 'content/' lopen
- Voor elk bestand HTML generen
- Templates toepassen
- Assets kopieren

## Extra functionaliteit

- Blog index pagina's
- Tag pagina's
- RSS feed
- Sitemap.xml
- Live reload server
- Caching (alleen gewijzigde bestanden opnieuw generen)
- Plugin systeem voor uitbreidingen

## CLI-tool

Commandline interface met bijvoorbeeld: *ssg-one build*, *ssg-one serve* en '*sg-one new post 'titel'*.

## Configuratie

Configuratie via een 'config.yaml' bestand.

- sitetitel en beschrijving
- basis-URL
- paden voor content, templates en output
- menu's (navigatie)
- bloginstellingen (aantal posts op index, sortering)
- URL-structuur (bijvoorbeeld '/blog/slug/' i.p.v. '/posts/slug/')

## Live development server

Een lokale webserver die automatisch ververst als je iets aanpast.

Nodig:
- watchdog : voor het opmerken van bestandswijzigingen
- livereload : server draaien en browser verversen

## Gebruik

Normaal builden:

```
python ssg-one.py
```

Live server starten:

```
python ssg-one serve
```

Website wordt automatisch opnieuw gegenereerd op http://localhost:5500

