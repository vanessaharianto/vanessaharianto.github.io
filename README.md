# vanessa.github.io

Personal portfolio site — minimalist, three-page layout.

## Files

```
index.html   — main HTML (all three pages)
style.css    — all styles
script.js    — navigation + publication filter
photo.jpg    — YOUR photo (add this yourself!)
```

## Setup (5 minutes)

### 1. Create the GitHub repo
- Go to GitHub → New repository
- Name it **exactly**: `yourusername.github.io`
  (replace `yourusername` with your actual GitHub username)
- Set it to **Public**
- Don't add a README

### 2. Upload the files
- Upload `index.html`, `style.css`, `script.js` to the repo
- Add your photo as `photo.jpg` (any square-ish photo works)

### 3. Enable GitHub Pages
- Go to repo → **Settings** → **Pages**
- Under "Source", select **Deploy from a branch**
- Branch: `main`, folder: `/ (root)`
- Click Save

### 4. Wait ~1 minute, then visit:
```
https://yourusername.github.io
```

---

## Customising

### Change your info
Open `index.html` and edit:
- Your name, role, university, bio (in the Home section)
- All the `href="..."` links (LinkedIn, GitHub, Letterboxd, Goodreads, Scholar, email)
- Publication titles, years, tags, and PDF/code links

### Add a new publication
Copy a `<div class="pub-card">` block in `index.html` and paste it inside `.pub-list`.
Set `data-type="paper"` or `data-type="thesis"` for the filter to work.

### Change colours
Open `style.css` and edit the `:root` variables at the top:
```css
:root {
  --bg:      #faf9f7;   /* page background */
  --surface: #f2f0ec;   /* hover surfaces   */
  --border:  #e0ddd8;   /* borders          */
  --text:    #1a1916;   /* main text        */
  --muted:   #7a786f;   /* secondary text   */
}
```

### Add more tabs
1. Add a nav link in `<nav>`: `<a href="#" class="nav-link" data-page="yourpage">yourpage</a>`
2. Add a `<main id="pg-yourpage" class="page">` section in `index.html`
3. That's it — the JS handles the rest automatically.
