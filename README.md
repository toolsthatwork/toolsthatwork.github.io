# Tools That Work

A static developer portal for three AI-powered API products: **ClipCraft**, **AutoTube**, and **MeshReady**.

## Stack

Pure HTML, CSS, and JavaScript. No build tools, no frameworks, no npm. Just open `index.html` in a browser.

## Structure

```
index.html          — Landing page (hero, products, pricing preview, CTA)
clipcraft.html      — ClipCraft product page (AI video generation)
autotube.html       — AutoTube product page (YouTube automation SaaS)
meshready.html      — MeshReady product page (3D asset generation)
pricing.html        — Unified pricing with monthly/annual toggle
docs.html           — Interactive API documentation with try-it panels
about.html          — Company info
contact.html        — Contact form and support info
css/style.css       — Main stylesheet
css/docs.css        — Documentation-specific styles
js/main.js          — Navigation, scroll animations, mobile menu, FAQ, copy-to-clipboard
js/pricing.js       — Monthly/annual pricing toggle
js/docs.js          — Interactive API docs (sidebar tracking, try-it fetch panels)
deploy.sh           — SCP deploy template (edit with your server details)
```

## Local Development

Open `index.html` directly in a browser, or serve with any static file server:

```bash
# Python
python -m http.server 8000

# Node.js (npx, no install)
npx serve .

# PHP
php -S localhost:8000
```

## Deployment

1. Edit `deploy.sh` with your VPS credentials and remote path.
2. Run `chmod +x deploy.sh && ./deploy.sh`.

Or deploy to any static host: Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3 + CloudFront, etc.

## License

Proprietary. All rights reserved.
