# Data Engineer Portfolio - Dynamic Edition

A modern, premium portfolio website with **JSON-driven dynamic content**. Update your portfolio by simply editing `portfolio-data.json` - no HTML knowledge required!

## 🎯 What's New - Dynamic Content System

✅ **Edit JSON, Not HTML**: All content in one `portfolio-data.json` file
✅ **Auto-scroll to Home**: Page always starts at top on refresh
✅ **Custom Favicon**: Professional branding with gradient logo  
✅ **Instant Updates**: Change JSON, refresh browser - that's it!

## 📁 Project Structure

```
portfolio/
├── index.html              # Structure (rarely edit)
├── styles.css              # Styling
├── app.js                  # Dynamic loader + interactions
├── portfolio-data.json     # 👈 EDIT THIS to update all content
├── favicon.svg             # Your logo
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Edit `portfolio-data.json`
```json
{
  "personal": {
    "name": "Your Name",
    "email": "your.email@example.com"
  }
}
```

### 2. Save & Refresh Browser
Changes appear instantly - no build process needed!

## 📝 How to Update Content

### Personal Info
```json
"personal": {
  "name": "John Doe",
  "title": "Senior Data Engineer",
  "email": "john@example.com",
  "linkedin": "https://linkedin.com/in/johndoe"
}
```

### Hero Section
```json
"hero": {
  "title": {
    "part1": "I turn complex data into",
    "highlight": "business-critical solutions",
    "part2": "that save millions"
  },
  "stats": [
    { "value": "$2M+", "label": "Cost Savings" }
  ]
}
```

### Add Projects
```json
"projects": {
  "items": [
    {
      "title": "Project Name",
      "problem": { "description": "..." },
      "solution": { "description": "..." },
      "techStack": ["Python", "FastAPI"],
      "impact": [
        { "value": "$1.8M", "label": "Savings" }
      ]
    }
  ]
}
```

### Update Skills
```json
"skills": {
  "categories": [
    {
      "name": "Backend",
      "skills": [
        { "name": "Python", "percentage": 95 }
      ]
    }
  ]
}
```

## 🎨 Customization

### Colors
Edit `styles.css`:
```css
:root {
    --color-primary-500: #0C66E4;
}
```

### Favicon
Edit `favicon.svg` with your initials or logo

## 🚀 Deployment

### GitHub Pages
1. Create repo
2. Upload all files
3. Settings → Pages → Deploy
4. Live at `yourusername.github.io/repo`

### Netlify / Vercel
Drag & drop folder for instant deployment

## 💡 Tips for Recruiters

### Use Real Metrics
- $2M saved → Use YOUR actual number
- 50M records → Use YOUR scale
- 99.97% uptime → Use YOUR metrics

### Update Regularly
- Add new projects monthly
- Update achievements quarterly
- Keep skills current

### JSON Validation
Check syntax at [JSONLint.com](https://jsonlint.com) before saving

## 🔧 Troubleshooting

**Content not updating?**
- Clear cache (Ctrl+Shift+R)
- Validate JSON at JSONLint.com
- Check browser console (F12)

**JSON Syntax Rules:**
- Use `"double quotes"` not `'single'`
- Add commas between items
- No comma after last item
- Match brackets: `{}` and `[]`

## 📊 What Recruiters See

**First 6 seconds:**
✅ $2M+ in headline
✅ 99.97% uptime stat
✅ "Immediate Joiner" badge
✅ Clear metrics

## 📝 JSON Quick Reference

```json
{
  "string": "text in quotes",
  "number": 123,
  "boolean": true,
  "array": ["item1", "item2"],
  "object": { "key": "value" }
}
```

## 📧 Contact Form

Currently client-side. To make functional:
- **Formspree**: Easiest (add action URL)
- **EmailJS**: Free tier available  
- **Custom**: Modify `app.js`

## 📈 Optional Analytics

Add to `index.html` before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

## 💬 Support

- Validate JSON: JSONLint.com
- Check console: Press F12
- Compare to template structure

---

**Update once, impress everyone** | JSON-powered simplicity
