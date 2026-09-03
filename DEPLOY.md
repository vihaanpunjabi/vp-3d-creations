# Deploying VP 3D Printing — free, no card required

The site is static: HTML, CSS, JS and images. No server, no build step,
no database. That is why hosting it costs nothing.

---

## Fastest route — Netlify Drop (about 60 seconds)

1. Open <https://app.netlify.com/drop>
2. Drag **`vp-3d-printing-site.zip`** onto the page (or drag the
   `print-lab-site` folder itself).
3. It goes live at something like `random-words-123.netlify.app`.
4. Create a free account when prompted, or the site expires in an hour.
5. **Site settings → Change site name** to get `vp3dprinting.netlify.app`.

Free tier: 100 GB bandwidth/month. This site is 1.5 MB, so that is roughly
65,000 visits a month. HTTPS is automatic.

To update later: drag the folder again, or connect the GitHub repo for
automatic deploys on every push.

---

## Alternative — GitHub Pages (ties deploys to git)

The repo is already initialised and committed.

```bash
gh repo create vp-3d-printing --public --source=. --push
```

```bash
gh api -X POST repos/:owner/vp-3d-printing/pages -f "source[branch]=main" -f "source[path]=/"
```

Needs the GitHub CLI first: `brew install gh && gh auth login`.

Lands at `https://USERNAME.github.io/vp-3d-printing/`. Note the site is
served from a **subfolder** there — every path in this project is relative,
so that works, but it is why you should not introduce paths starting with `/`.

---

## After it is live — three things

### 1. Turn the contact form on
Without this, submissions go nowhere.

1. Go to <https://web3forms.com>, enter your email, get an access key.
2. In `index.html`, replace `YOUR_WEB3FORMS_ACCESS_KEY`.

Your email never appears in the public HTML — it lives on Web3Forms' side,
tied to the key, so scrapers cannot harvest it.

### 2. Fix the link previews
Three tags contain `REPLACE_WITH_ABSOLUTE_URL`. iMessage, Slack and Discord
ignore relative URLs, so shared links show no image until you run:

```bash
sed -i '' 's|REPLACE_WITH_ABSOLUTE_URL|https://vp3dprinting.netlify.app|g' index.html
```

### 3. Show your email on the page
Two `INSERT_YOUR_EMAIL_HERE` placeholders, if you want it visible:

```bash
sed -i '' 's/INSERT_YOUR_EMAIL_HERE/you@yourdomain.com/g' index.html
```

---

## Custom domain (optional, ~$12/yr — the only thing that costs money)

`vp3dprinting.com` is taken. These were free when checked:

| Domain | Note |
|---|---|
| **vp3dprints.com** | Closest to the brand |
| vp3dlab.com | Shorter, workshop feel |
| vp3dstudio.com | Studio framing |
| vp3dworks.com | |
| vp3dprintco.com | |
| printvp.com | Shortest |
| vpprintlab.com | |
| vp3dprinting.net | Exact name, .net |

Buy at Cloudflare Registrar (at-cost, no markup) or Namecheap. Then:

- **Netlify:** Site settings → Domain management → Add custom domain, follow
  its DNS instructions.
- **GitHub Pages:** add a `CNAME` file containing your domain, then point an
  ALIAS/ANAME record at `USERNAME.github.io`.

HTTPS is issued automatically either way.

---

## What stays free

| | Cost |
|---|---|
| Hosting (Netlify or GitHub Pages) | $0 |
| HTTPS certificate | $0 |
| Contact form (Web3Forms, 250 submissions/mo) | $0 |
| `.netlify.app` / `.github.io` subdomain | $0 |
| Custom domain | ~$12/yr, optional |
