# Nova Peak Studio — Website

Polished, static site for **Nova Peak Studio** — indie games & apps. Built to deploy directly to **GitHub Pages** with no backend, no API keys, and no build step.

Live URL (after deploy): `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/`  +  `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/app-ads.txt`

---

## ✨ Features

- Dark, premium indie-studio aesthetic (not templated)
- Fully responsive + subtle reveal animations
- **Single data file** for projects: `assets/js/data.js`
- Dedicated page per project + per-app privacy policy URLs (required for Google Play / AdMob)
- `app-ads.txt` at root with placeholder publisher line
- SEO + Open Graph tags, sitemap, robots, 404, favicon, accessible nav
- Relative paths — works on both `username.github.io` and `username.github.io/repo-name/`

---

## 📁 Structure

```
/
├── index.html                 → Home
├── projects/
│   ├── index.html             → Grid of all projects
│   ├── echo-drift/index.html  → Individual project (copy for new)
│   ├── lumina-quest/index.html
│   └── orbit-utils/index.html
├── privacy/
│   ├── index.html             → Hub
│   ├── echo-drift/index.html  → Per-app policy (copy for new)
│   ├── lumina-quest/index.html
│   └── orbit-utils/index.html
├── about/index.html           → About + Contact (mailto form)
├── assets/
│   ├── css/style.css
│   ├── js/data.js             → ★ Edit this to add projects
│   ├── js/main.js
│   └── img/placeholder-*.svg  → Replace with real art
├── app-ads.txt                → Must be at site root
├── sitemap.xml, robots.txt, 404.html, .nojekyll, favicon.svg
```

---

## 🚀 Deploy to GitHub Pages (exact steps)

### 1. Create the repo
1. Go to GitHub → New repository → e.g. `nova-peak-studio` (can be any name).
2. **Do not** initialize with README if you’ll push this folder — or initialize and then overwrite.
3. Keep it **Public** (private repos can still use Pages on Pro).

### 2. Push this folder
```bash
cd "C:\Projects\nova peak studio website"   # or wherever you cloned
git init
git add .
git commit -m "Initial site: Nova Peak Studio"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 3. Enable Pages
1. GitHub → your repo → **Settings → Pages**
2. **Build and deployment → Source:** `Deploy from a branch`
3. **Branch:** `main` · **Folder:** `/ (root)` → **Save**
4. Wait ~30–60s. Your site appears at `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/`
   - If you use a **custom domain** (`novapeak.studio` etc.), set it under Pages → Custom domain and add the `CNAME` DNS record. Then update all placeholder URLs.

> The `.nojekyll` file is already included so folders like `_` and assets are served correctly. Don’t delete it.

### 4. Verify `app-ads.txt`
After deploy, open:
```
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/app-ads.txt
```
You should see:
```
google.com, pub-YOUR-PUBLISHER-ID, DIRECT, f08c47fec0942fa0
```
Replace `pub-YOUR-PUBLISHER-ID` with your real AdMob Publisher ID (AdMob → Settings → Account). Google will crawl it within 24h. For a custom domain it must also be at `https://YOUR_DOMAIN/app-ads.txt`.

---

## 🔧 Before you publish — mandatory replacements

Search the project for `YOUR_` placeholders:

| Placeholder | Where | Replace with |
|---|---|---|
| `YOUR_GITHUB_USERNAME` / `YOUR_REPO` / `YOUR_DOMAIN` | `index.html`, `sitemap.xml`, `robots.txt`, `app-ads.txt` | Your real GitHub/user and repo or custom domain |
| `pub-YOUR-PUBLISHER-ID` | `app-ads.txt` | AdMob Publisher ID (`pub-1234...`) |
| `com.YOUR_DOMAIN.*` | `assets/js/data.js` + project pages | Real Play package names |
| `https://play.google.com/store/apps/dev?id=YOUR_DEVELOPER_ID` | `data.js` + pages | Real Play developer URL |
| `hello@YOUR_DOMAIN.com` | `data.js` + privacy pages | Real support email |
| `[SET DATE]` / `[DESCRIBE …]` | `privacy/*` | Actual dates & data practices |
| Placeholder SVGs | `assets/img/` | Real icons (512×512), heroes (1200×680), screenshots (800×500) |
| `YOUR_HANDLE` (X/GitHub) | `data.js`, `about/` | Real handles or remove button |

**Privacy policies:** Each `privacy/<slug>/index.html` has highlighted `CUSTOMIZE` callouts. **Delete** ad/analytics blocks if that app truly has no ads/analytics. Do not invent data uses. Google Play will reject inaccurate policies.

---

## ➕ Adding a new project (2 minutes)

1. **Data:** Open `assets/js/data.js` → duplicate one object in `projects[]`, change `id/slug/name/description/playUrl/accent`.
2. **Project page:** Copy `projects/echo-drift/` → `projects/your-slug/` → edit title, copy, features, links, and replace the three `.shot` divs with `<img src="../../assets/img/your-shot.jpg" alt="">`.
3. **Privacy page:** Copy `privacy/echo-drift/` → `privacy/your-slug/` → replace app name, date, contact, and fill every `CUSTOMIZE` section factually.
4. **Links:** The grid on Home and `/projects/` auto-renders from `data.js`; your new card appears immediately. Verify the detail page and its “Privacy Policy” link.
5. Update `sitemap.xml` with the two new URLs.

No build step, no bundler.

---

## 🖼️ Replacing placeholder art

- **Icon:** `assets/img/placeholder-icon.svg` → export 512×512 PNG/WebP, update `<div class="project-icon-large">` to `<img src="../../assets/img/echo-drift-icon.png">`
- **Hero:** `placeholder-hero.svg` → 1200×680, place in `assets/img/` and swap the `.ph` div for `<img>`.
- **Screenshots:** `placeholder-shot.svg` → 800×500 or 1080×1920 portrait. Replace `.shot` divs similarly.
- **Favicon:** `favicon.svg` is inline — replace with a PNG + `<link rel="icon">` if you prefer, or keep the SVG (works in modern browsers).

Keep filenames lowercase & hyphenated, compress with any image optimizer before commit.

---

## ♿ Accessibility & SEO

- Semantic HTML, `aria-label` on nav toggle, `sr-only` helpers, focus-visible styles (in CSS).
- All buttons have ≥44px hit areas, color contrast ≥4.5:1 on dark bg.
- `theme-color`, `og:image`, `canonical`, `sitemap.xml` included — replace placeholder domains before launch.
- No localhost URLs. No JS-required content for core info (grid degrades gracefully; privacy content is static).

---

## 🧪 Local test

No install needed — it’s static. Either:

```bash
# Python
python -m http.server 8000
# then open http://localhost:8000

# or VS Code Live Server
```

Click through: Home → Projects → each project → each privacy → About → Contact (mailto) → verify `app-ads.txt` at `http://localhost:8000/app-ads.txt`.

---

## 📝 License

© Nova Peak Studio. Template code is yours to modify. Placeholder art is CC0 — replace before commercial use if desired.

---

## ✅ Pre-launch checklist

- [ ] Replaced all `YOUR_*` placeholders
- [ ] Real `app-ads.txt` publisher line live at `/app-ads.txt`
- [ ] Privacy policies customized per app (no leftover `[PLACEHOLDER]`)
- [ ] Play store links point to real packages (or removed if unpublished)
- [ ] Icons/heroes/screenshots replaced & compressed
- [ ] `sitemap.xml` & `robots.txt` domains updated
- [ ] Tested on phone + desktop
- [ ] Pages enabled and site loads from GitHub Pages URL

Need a custom domain? Add a `CNAME` file with your domain name and set DNS `CNAME` to `YOUR_GITHUB_USERNAME.github.io.` — GitHub verifies automatically.
