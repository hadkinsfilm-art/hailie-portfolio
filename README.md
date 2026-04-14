# Hailie — Portfolio Website

A minimal, clean portfolio site for a photographer and filmmaker. Pure static HTML/CSS/JS — ready for GitHub Pages.

## Structure

```
hailie/
├── index.html              # Home
├── bio.html                # Bio
├── resume.html             # Resume
├── works.html              # Photography + Film (inline viewers)
├── artist-statement.html   # Artist Statement
├── contact.html            # Contact form + info
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/                 # Drop your images here
    ├── photography/
    │   ├── gallery1/
    │   ├── gallery2/
    │   └── gallery3/
    └── film/
```

## Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push this folder to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to **Settings → Pages** in your repo
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch, **/ (root)** folder
6. Click Save — your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Customization

- Replace placeholder text in each `.html` file with your own content
- Drop images into `images/photography/` and `images/film/`
- Replace placeholder `<div>` elements with `<img>` tags pointing to your images
- For film projects, swap the video placeholder in `works.html` with an `<iframe>` embed (Vimeo, YouTube, etc.)
- Update contact info in `contact.html`

## No Build Step Required

This is plain HTML, CSS, and JavaScript — no Python, no Node, no build tools. Just edit in PyCharm and push.
