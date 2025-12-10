# Project Showcase Files

This directory contains comprehensive project showcase materials designed for submission to awards sites like Awwwards, CSS Design Awards, and portfolio platforms.

## Files Overview

### 📄 PROJECT_SHOWCASE.md
**Purpose:** Comprehensive markdown documentation
**Use Case:**
- GitHub repository showcase
- Portfolio website content
- Press kit material
- Documentation reference

**Contents:**
- Detailed project overview
- Feature breakdown
- Technical specifications
- Character and boss descriptions
- Architecture details
- Awards categories
- Press kit information

**Best For:** Developers, technical audiences, GitHub visitors

---

### 🌐 PROJECT_SHOWCASE.html
**Purpose:** Styled HTML presentation
**Use Case:**
- Standalone showcase page
- Embed in portfolio sites
- Awards site submission
- Client presentations

**Features:**
- Responsive design
- Modern CSS styling
- Gradient effects
- Hover animations
- Mobile-optimized
- Print-friendly

**Best For:** Visual presentations, non-technical audiences, awards judges

**Preview:** Open directly in any browser for immediate viewing

---

### 📊 project-data.json
**Purpose:** Structured project data
**Use Case:**
- API integrations
- Awards site submissions
- Portfolio automation
- Data-driven websites
- CMS integration

**Structure:**
```json
{
  "project": {
    "title": "...",
    "description": {...},
    "metrics": {...},
    "features": [...],
    "characters": [...],
    "technologies": {...},
    "awards": {...}
  }
}
```

**Best For:** Developers building portfolio sites, API consumers, automated systems

---

## Usage Examples

### For Awwwards Submission

1. **Site of the Day Nomination:**
   - Use `PROJECT_SHOWCASE.html` as submission preview
   - Copy relevant sections from `PROJECT_SHOWCASE.md` to submission form
   - Include metrics from `project-data.json` for category selection

2. **Developer Award:**
   - Highlight technical sections from markdown
   - Reference architecture details
   - Emphasize zero-dependency approach

### For CSS Design Awards

1. Use the HTML file as primary showcase
2. Reference design philosophy from markdown
3. Include performance metrics from JSON

### For Portfolio Website

**Option 1 - Static HTML:**
```html
<!-- Embed directly -->
<iframe src="PROJECT_SHOWCASE.html" width="100%" height="100%"></iframe>
```

**Option 2 - Dynamic Integration:**
```javascript
// Fetch JSON data
fetch('project-data.json')
  .then(res => res.json())
  .then(data => {
    // Build custom UI with project data
    displayProject(data.project);
  });
```

**Option 3 - Markdown Processing:**
```javascript
// Use markdown parser
import { marked } from 'marked';
const showcase = await fetch('PROJECT_SHOWCASE.md').then(r => r.text());
document.getElementById('content').innerHTML = marked(showcase);
```

### For GitHub

Add to main README.md:
```markdown
## 🏆 Awards & Recognition

For detailed project information and showcase materials, see [PROJECT_SHOWCASE.md](./PROJECT_SHOWCASE.md)
```

---

## Customization Guide

### Updating Links

In all files, replace placeholder URLs:

**Markdown (PROJECT_SHOWCASE.md):**
```markdown
**Live Demo:** [Play Now](https://YOUR-ACTUAL-URL.com)
**GitHub Repository:** [View Source](https://github.com/eres2k/amzlwhsquest)
```

**HTML (PROJECT_SHOWCASE.html):**
```html
<a href="https://YOUR-ACTUAL-URL.com" class="cta-button">Play Now</a>
```

**JSON (project-data.json):**
```json
"links": {
  "demo": "https://YOUR-ACTUAL-URL.com",
  "github": "https://github.com/eres2k/amzlwhsquest",
  "download": "https://YOUR-DOWNLOAD-URL.com/app.apk"
}
```

### Adding Screenshots

**For HTML:**
1. Add images to `/screenshots` directory
2. Update HTML with image tags:
```html
<img src="screenshots/gameplay.png" alt="Gameplay Screenshot" />
```

**For JSON:**
```json
"media": {
  "screenshots": [
    "/screenshots/title-screen.png",
    "/screenshots/character-select.png",
    "/screenshots/gameplay.png"
  ]
}
```

### Customizing Colors

In `PROJECT_SHOWCASE.html`, modify CSS variables:
```css
/* Change primary gradient */
.hero {
  background: linear-gradient(135deg, #YOUR-COLOR-1 0%, #YOUR-COLOR-2 100%);
}

.section-title::after {
  background: linear-gradient(90deg, #YOUR-COLOR-1 0%, #YOUR-COLOR-2 100%);
}
```

---

## Submission Checklist

### Before Submitting to Awards Sites

- [ ] Update all placeholder URLs with actual links
- [ ] Add screenshots to showcase visual design
- [ ] Test HTML file in multiple browsers
- [ ] Validate JSON structure
- [ ] Proofread all text content
- [ ] Ensure demo link is live and working
- [ ] Test mobile responsiveness
- [ ] Add social media images (Open Graph tags)
- [ ] Verify all external links work
- [ ] Create video walkthrough (if required)

### Recommended Additions

1. **Screenshots** - Capture key moments:
   - Title screen
   - Character selection
   - Gameplay with HUD
   - Boss battle
   - Hazard fixing
   - Game over screen

2. **Video Demo** - Record 2-3 minute walkthrough:
   - Character selection
   - First hazard
   - Boss encounter
   - Victory screen

3. **SEO Metadata** - Add to HTML:
```html
<meta property="og:title" content="AMZL WHS Coordinator Quest">
<meta property="og:description" content="A retro 16-bit warehouse safety adventure">
<meta property="og:image" content="https://yoursite.com/screenshot.png">
<meta name="twitter:card" content="summary_large_image">
```

---

## File Sizes

- **PROJECT_SHOWCASE.md:** ~45 KB (text)
- **PROJECT_SHOWCASE.html:** ~25 KB (single file, no dependencies)
- **project-data.json:** ~8 KB (structured data)

**Total:** ~78 KB (extremely lightweight)

---

## Maintenance

### Keeping Content Updated

When updating the project:

1. **Add new features:**
   - Update feature list in all three files
   - Increment metrics in JSON
   - Add to changelog section in markdown

2. **New achievements:**
   - Add to awards section
   - Update recognition list
   - Include press mentions

3. **Performance improvements:**
   - Update metrics section
   - Revise technical highlights
   - Adjust benchmark numbers

---

## Integration Examples

### WordPress Portfolio
```php
<?php
$json = file_get_contents('project-data.json');
$project = json_decode($json);
?>
<h1><?php echo $project->title; ?></h1>
<p><?php echo $project->description->long; ?></p>
```

### React Component
```jsx
import projectData from './project-data.json';

function ProjectShowcase() {
  return (
    <div>
      <h1>{projectData.project.title}</h1>
      <p>{projectData.project.tagline}</p>
      <div className="features">
        {projectData.project.features.map(f => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </div>
  );
}
```

### Static Site Generator (11ty)
```javascript
// _data/projects.js
module.exports = require('./project-data.json');
```

---

## Awards Site Specific Tips

### Awwwards
- Focus on innovation and technical achievement
- Emphasize zero-dependency architecture
- Highlight procedural generation
- Showcase AI integration

### CSS Design Awards
- Emphasize visual design in retro style
- Show responsive capabilities
- Demonstrate animation effects
- Include mobile screenshots

### FWA (Favourite Website Awards)
- Focus on user experience
- Highlight interactive elements
- Show cross-platform compatibility
- Demonstrate performance

### Webby Awards
- Emphasize educational impact
- Show accessibility features
- Highlight innovation in learning
- Demonstrate social value

---

## Contact Information

For questions about showcase materials:
- **Developer:** eres2k
- **Repository:** https://github.com/eres2k/amzlwhsquest

---

## License

These showcase materials are provided for promotional purposes of the AMZL WHS Coordinator Quest project. Feel free to adapt for your own project submissions.

---

**Last Updated:** December 2024
**Version:** 1.0
