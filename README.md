# gp_sec

My personal site. Notes on security, writeups of bugs I've found, and a bit about me.

Live at [gowriprasad07.github.io](https://gowriprasad07.github.io).

## What it is

A plain static site. Hand-written HTML and CSS, one small script for the clock and the scroll bar, no framework and no build step. It's hosted on GitHub Pages, so pushing to `main` puts it live.

## How it's laid out

```
index.html          the home page
notes.html          all notes
findings.html       all findings
styles.css          styling for every page
tree.png            the tree in the stats section
thumbs/             small icons used on the cards
writing/            every note and finding, one file each
```

The two kinds of writing:

- **Notes** are things I had to sit with before they made sense, written down so I don't forget.
- **Findings** are bugs I've found, explained simply. I keep the cause and the fix and leave out anything internal.

## Adding a new post

1. Copy an existing file in `writing/` and rename it.
2. Change the title, date, tag and body.
3. Add a card for it on `index.html` and on `notes.html` or `findings.html`.

Tags are kept short: `web`, `infra`, `auth`, `xss`, `sqli`, `notes`, `career`.

## Running it locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Use a local server rather than opening the file directly, so the links behave the same as they do live.

## Deploying

```bash
git add .
git commit -m "your message"
git push
```

That's it. GitHub Pages rebuilds on push.
