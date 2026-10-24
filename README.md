# Kavita Yadav: Portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html   structure and content
style.css    design system and layouts
script.js    menu, animations, form validation
```

## 1. Fill in your real details

Search `index.html` for these and replace them. Placeholders are highlighted in orange on the page so you can spot them.

| What         | Where                                                               |
| ------------ | ------------------------------------------------------------------- |
| Email        | `kavita.yadav196876@gmail.com` (contact list, form `data-email`, footer)  |
| LinkedIn     | `https://www.linkedin.com/in/kavita-yadav-433209338/?isSelfProfile=true` (contact list, footer)               |
| Company page | `linkedin.com/company/your-company` and the "Visit Elevonix" button |
| GitHub       | `github.com/your-username` (footer)                                 |
| City         | `[Your city, country]` in the About section                         |
| Projects     | Three project blocks: name, description, role, tech, links          |
| Site URL     | `your-domain.example` in the meta tags and structured data          |

Use only facts you can stand behind. Add a degree, years of experience or other details in the About section if you want them.

### Hero photo

The right side of the hero shows your photo in an arch frame. Save your portrait as `assets/hero.jpg` and it appears automatically. Until then, an "Add your photo" placeholder is shown.

- Use a portrait photo, about 800 x 1000 px (4:5), JPG or WebP, under 250 KB. Keep your face in the upper half.
- Different file name: change `src="assets/hero.jpg"` in the `<!-- YOUR IMAGE GOES HERE -->` block in `index.html`, and update the `alt` text.
- Shape: in `style.css`, change `aspect-ratio` and `border-radius` on `.photo-frame` (for example `1 / 1` for a square, `28px` for rounded corners instead of the arch).
- Crop: change `object-position` on `.photo-img` (`center top` shows more of the head).
- The name badge and the two skill chips are plain text in `index.html`. Edit or delete them freely.

### Project screenshots

Each project shows a styled preview until you add a real image. Put your screenshot in an `assets/` folder and replace the `<div class="shot-screen">...</div>` with:

```html
<img
  src="assets/project-1.jpg"
  alt="Screenshot of PROJECT NAME"
  loading="lazy"
  width="1600"
  height="1000"
/>
```

Use JPG or WebP at about 1600px wide and under 300 KB. Change the link on each project card from `#contact` to the live demo.

### Contact form

By default, the form checks the fields and opens the visitor's email app with the message filled in. This needs no server. If you want messages delivered directly, use a form service (Formspree, Web3Forms or Netlify Forms) and point the form's `action` at it.

## 2. Run locally

Double-click `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## 3. Deploy online (all free)

- **Netlify:** drag the folder onto app.netlify.com/drop.
- **GitHub Pages:** push the files to a repository, then Settings > Pages > deploy from the main branch.
- **Vercel:** import the repository, with no build settings needed.

After deploying, update the `og:url`, `og:image` and structured data URLs, and add a 1200x630 `assets/og-image.jpg` for social previews.
