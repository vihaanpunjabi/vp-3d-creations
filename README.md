# PRINTLAB — 3D printing services site

Static single-page site. No framework, no build step, no backend.
Three files do all the work: `index.html`, `styles.css`, `script.js`.

```
print-lab-site/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/img/        ← placeholder SVGs, swap for your photos
```

---

## 1. Run it locally

```bash
python3 -m http.server 4321
```

Then open <http://localhost:4321>. (Opening `index.html` by double-clicking works
too, but the contact form's `fetch` behaves better over `http://`.)

---

## 2. Wire up the contact form

The form posts to **Web3Forms**, which emails submissions straight to you. Free,
no account, no server.

1. Go to <https://web3forms.com> and enter **your email address**.
2. They email you an **access key** (a UUID).
3. In `index.html`, find this line and paste the key in:

   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
   ```

Your email address lives on Web3Forms' side, tied to the key — it never appears
in your public HTML, so scrapers can't harvest it.

Until you paste a real key, the form shows an inline "not connected yet" message
instead of silently failing.

**Also swap the two `INSERT_YOUR_EMAIL_HERE` strings** in the contact block if you
want your email shown on the page:

```bash
sed -i '' 's/INSERT_YOUR_EMAIL_HERE/you@yourdomain.com/g' index.html
```

---

## 3. Fill in your content

| What | Where |
|---|---|
| Prices (`$XX.XX`) | `index.html` → `.price-value` (3 of them) |
| Review text + names | `index.html` → `#reviews`, 3 `<blockquote>` blocks |
| Project titles / build notes | `index.html` → `.tile` `data-*` attributes |
| Stats (340+, 48 hrs…) | `index.html` → `.hero-stats` |
| Brand name "PRINTLAB" | `index.html` → `.brand-text` + `<title>` |
| Colors | `styles.css` → `:root` (`--blue`, `--orange`) |

### Gallery prints (the pop-up on each specialty)

`catalog.js` holds them — it is the only file you edit to add a print:

```js
{ img: 'assets/img/gallery/art-05.jpg',
  name: 'Dark Side of the Moon',
  price: '$45.00',
  desc:  'Four-colour relief, 220 mm.' },
```

Drop the photo in `assets/img/gallery/`, add the block, save. The grid
resizes itself and the "View gallery (N)" count updates automatically.
Roughly 4:3 photos look best. An empty list shows "Photos going up soon."

### Images

Drop your photos into `assets/img/` and change the `src`. Recommended sizes:

- `hero` — 1920×1080, landscape shot of the printer mid-print
- `service-*` — 900×675 (4:3)
- `work-1…6` — 800×800 square (`work-1` and `work-6` render as 2:1 wide tiles)

Two tiles need the `src` changed in **two** places — the `<img src>` and the
`data-img` attribute the lightbox reads.

---

## 4. Deploy free — Netlify drag-and-drop (fastest, no install)

1. Go to <https://app.netlify.com/drop>
2. Drag the whole `print-lab-site` folder onto the page.
3. It's live in ~20 seconds at `random-name.netlify.app`.

Rename it under **Site settings → Change site name**. To update later, drag the
folder again (or connect the GitHub repo for auto-deploy on push).

---

## 5. Deploy free — GitHub Pages

```bash
git init
git add .
git commit -m "PRINTLAB site"
```

```bash
gh repo create print-lab-site --public --source=. --push
```

(No `gh` CLI? Create the repo on github.com, then
`git remote add origin https://github.com/USERNAME/print-lab-site.git && git push -u origin main`.)

Turn Pages on:

```bash
gh api -X POST repos/:owner/print-lab-site/pages -f "source[branch]=main" -f "source[path]=/"
```

Live at `https://USERNAME.github.io/print-lab-site/` in about a minute. Every
`git push` redeploys.

> Want it at the root — `https://USERNAME.github.io` — instead? Name the repo
> exactly `USERNAME.github.io`.

---

## 6. Deploy free — Netlify via CLI (alternative)

```bash
npm install -g netlify-cli
```

```bash
netlify deploy --dir . --prod
```

First run opens a browser to log in and asks to create a site. You get a
`random-name.netlify.app` URL; rename it under **Site settings → Change site name**.

Netlify gives you instant rollbacks and deploy previews; GitHub Pages is simpler
if the code already lives on GitHub. Either is free and both include HTTPS.

---

## 7. Custom domain (optional, ~$10/yr)

- **GitHub Pages:** add a `CNAME` file containing `yourdomain.com`, then point an
  `ALIAS`/`ANAME` record at `USERNAME.github.io` in your registrar's DNS.
- **Netlify:** Site settings → Domain management → Add custom domain, then follow
  its DNS instructions.

HTTPS is issued automatically on both.

---

## Social preview (do this after deploying)

`index.html` has three tags containing `REPLACE_WITH_ABSOLUTE_URL`. Link previews
in iMessage, Slack, and Discord need **absolute** URLs, so once you know your live
address, run:

```bash
sed -i '' 's|REPLACE_WITH_ABSOLUTE_URL|https://yoursite.netlify.app|g' index.html
```

---

## Notes

- Accessibility: skip link, keyboard-navigable carousel and lightbox, focus trap,
  `prefers-reduced-motion` honored throughout.
- No tracking, no cookies, no third-party JS. Only Google Fonts is external —
  delete the `<link>` in `index.html` to go fully self-contained (the CSS falls
  back to system fonts).
- The form's honeypot (`botcheck`) filters most spam bots automatically.
