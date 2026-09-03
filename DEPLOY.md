# Deploying VP 3D Creations — free, no card required

The site is static: HTML, CSS, JS and images. No server, no build step,
no database. That is why hosting it costs nothing.

---

## Fastest route — Netlify Drop (about 60 seconds)

1. Open <https://app.netlify.com/drop>
2. Drag **`vp-3d-creations-site.zip`** onto the page (or drag the
   `print-lab-site` folder itself).
3. It goes live at something like `random-words-123.netlify.app`.
4. Create a free account when prompted, or the site expires in an hour.
5. **Site settings → Change site name** to get `vp3dcreations.netlify.app`.

Free tier: 100 GB bandwidth/month. This site is 1.5 MB, so that is roughly
65,000 visits a month. HTTPS is automatic.

To update later: drag the folder again, or connect the GitHub repo for
automatic deploys on every push.

---

## Alternative — GitHub Pages (ties deploys to git)

The repo is already initialised and committed.

```bash
gh repo create vp-3d-creations --public --source=. --push
```

```bash
gh api -X POST repos/:owner/vp-3d-creations/pages -f "source[branch]=main" -f "source[path]=/"
```

Needs the GitHub CLI first: `brew install gh && gh auth login`.

Lands at `https://USERNAME.github.io/vp-3d-creations/`. Note the site is
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
sed -i '' 's|REPLACE_WITH_ABSOLUTE_URL|https://vp3dcreations.netlify.app|g' index.html
```

### 3. Show your email on the page
Two `INSERT_YOUR_EMAIL_HERE` placeholders, if you want it visible:

```bash
sed -i '' 's/INSERT_YOUR_EMAIL_HERE/you@yourdomain.com/g' index.html
```

---

## Domain — free options first

### Free forever, zero effort (recommended to start)
`vp3dcreations.netlify.app` — confirmed unclaimed. Set it in Netlify under
Site configuration -> Change site name. No cost, no expiry, no card, HTTPS
included. The only downside is "netlify.app" in the name.

`vp3dcreations.github.io` is also unclaimed if you go the GitHub Pages
route (name the repo exactly `vp3dcreations.github.io`).

### Free real domain for one year — if you are a student
The **GitHub Student Developer Pack** (education.github.com/pack) includes a
free domain for a year. Historically: a `.me` from Namecheap and a `.tech`.
Needs student verification with a school email or ID.

`vp3dcreations.me` was available when checked.

Note this renews at normal price after year one (~$20/yr for `.me`), so it
is free to start, not free forever. Offers in the pack change, so check the
current list.

### Free forever real domain, but clunky
`nic.eu.org` grants permanent free subdomains like `vp3dcreations.eu.org`.
Genuinely free with no renewal, but approval is manual and can take weeks.

### Do not use
Freenom (`.tk`, `.ml`, `.ga`, `.cf`) is the old "free domain" answer. It
stopped new registrations and is effectively defunct. Do not build a
business address on it.

### Paid, if you want the .com
`vp3dcreations.com` was available, roughly $11-12/yr at **Cloudflare
Registrar** (wholesale cost, no markup, no renewal hikes). Avoid GoDaddy.

### Pointing any custom domain at the site
**Netlify:** Domain management -> Add a domain -> enter it -> add the DNS
records Netlify shows you, at your registrar. HTTPS is automatic.

**GitHub Pages:** add a `CNAME` file containing just the domain, then at the
registrar add an ALIAS/ANAME on the root pointing to `USERNAME.github.io`
and a CNAME on `www` pointing to the same.

## What stays free

| | Cost |
|---|---|
| Hosting (Netlify or GitHub Pages) | $0 |
| HTTPS certificate | $0 |
| Contact form (Web3Forms, 250 submissions/mo) | $0 |
| `.netlify.app` / `.github.io` subdomain | $0 |
| `vp3dcreations.netlify.app` subdomain | $0 forever |
| Custom `.com` | ~$12/yr, entirely optional |
