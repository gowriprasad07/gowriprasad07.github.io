# gp_sec — personal site

Static site. Hand-written HTML and CSS, one small script, no build step,
no dependencies. Hosted on GitHub Pages.

## Files

```
index.html                 the whole main page
styles.css                 all styling, every page
favicon-16.png             tab icon
favicon-32.png             tab icon
apple-touch-icon.png       home-screen icon
og-image.png               link-preview image (use the gp_sec logo here)
resume.pdf                 add this yourself
.nojekyll                  serve files as-is, no Jekyll
writing/
  ssti-explained.html      example post — copy this to make new ones
  origins-and-credentials.html
```

## Adding a post

1. Copy an existing file in `writing/` to `writing/your-slug.html`
2. Change the `<title>`, `<h1>`, dateline and body
3. In `index.html`, copy the commented `<li>` block in the `.posts` list,
   uncomment it, and point it at the new file. Newest at the top.

Post tags: keep the vocabulary small — `web`, `infra`, `notes`, `tooling`.

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. Use this rather than opening the file
directly, so relative paths behave as they will in production.

## Deploying

```bash
git add .
git commit -m "message"
git push
```

Live within about a minute. Favicons cache hard — hard-reload with
Cmd+Shift+R if the tab icon looks stale.

## Notes on the design

- Dark only. Depth comes from layered surfaces (`--bg`, `--surface`,
  `--surface-2`) and low-contrast rules, not from glow.
- Teal accent appears in a handful of places on purpose. Adding more
  will make it look like every other security site.
- Motion: one staggered reveal of the hero panel on load, a slow pulse on
  the live dot, scroll progress bar, scrollspy nav, live Chennai clock.
  All of it disabled under `prefers-reduced-motion` except the clock.
- Careful with CSS `padding` shorthand on `.wrap` children — a shorthand
  will wipe the horizontal gutter. Use `padding-top` / `padding-bottom`.
