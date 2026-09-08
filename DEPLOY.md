# Deploying VP 3D Creations

**The site is LIVE on GitHub Pages:**
<https://vihaanpunjabi.github.io/vp-3d-creations/>

Repo: <https://github.com/vihaanpunjabi/vp-3d-creations>

Every `git push` to `main` redeploys automatically — usually live within
about a minute. No build step, no server, no database. Hosting is $0.

```bash
git add -A && git commit -m "your message" && git push
```

## Still to do (needs your input)

1. **Contact form** — `index.html` has `YOUR_WEB3FORMS_ACCESS_KEY`.
   Get a free key at <https://web3forms.com> and replace it, or the form
   submits nowhere. Your email stays off the public page.
2. **Visible email** — one `INSERT_YOUR_EMAIL_HERE` and one placeholder
   `you@domain.com` remain, if you want the address shown on the page.

Link-preview (`og:`) tags are already pointed at the live URL.

---

## After it is live — three things

### 1. Turn the contact form on
Without this, submissions go nowhere.

1. Go to <https://web3forms.com>, enter your email, get an access key.
2. In `index.html`, replace `YOUR_WEB3FORMS_ACCESS_KEY`.

Your email never appears in the public HTML — it lives on Web3Forms' side,
tied to the key, so scrapers cannot harvest it.

### 2. Fix the link previews — DONE
The `og:image` and `og:url` tags now point at
`https://vihaanpunjabi.github.io/vp-3d-creations`. If you later move to a
custom domain, update those two tags in `index.html`.

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
