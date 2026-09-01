# Personal site

Static site, hand-written HTML and CSS, hosted on GitHub Pages.

## Files

```
index.html                  the whole main page
styles.css                  all styling for every page
writing/ssti-explained.html example blog post — copy this to make new ones
.nojekyll                   tells GitHub Pages to serve files as-is
resume.pdf                  add this yourself
```

## Things to change before publishing

Search `index.html` for `EDIT` — every spot needing your details is marked.

- [ ] Email address (appears 3 times: hero button, contact list)
- [ ] LinkedIn URL
- [ ] GitHub URL
- [ ] Host line in the HTTP panel (change to your real site URL)
- [ ] The two "What I do" paragraphs
- [ ] The facts table (location, focus, certifications, availability)
- [ ] Capability groups — delete any that aren't true yet
- [ ] Tool list
- [ ] All three findings — replace with your own, sanitised
- [ ] Add `resume.pdf` to the repo root

## Adding a blog post

1. Copy `writing/ssti-explained.html` to `writing/your-new-post.html`
2. Change the `<title>`, `<h1>`, dateline, and body
3. Add a `<li>` to the `.posts` list in `index.html` linking to it

## Local preview

```bash
cd path/to/this/folder
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Use this rather than opening the file
directly — relative paths behave the same way they will in production.

## Deploying

Commit and push to `main`. GitHub Pages rebuilds automatically, usually
within a minute.
