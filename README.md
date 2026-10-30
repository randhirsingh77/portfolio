# Portfolio Website

My personal portfolio — I'm a MERN Stack & React Native developer based in New Delhi.

🌐 **Live:** https://randhirsingh77.github.io/portfolio/

## About

I built this portfolio by hand: a sticky sidebar layout with a scrolling content
column, one soft accent colour, and plain first-person copy. No frameworks and no
build step — plain HTML, CSS and JavaScript, hosted on GitHub Pages.

## Features

- Sticky sidebar navigation that highlights the section currently in view
- About, Experience, Projects, Activity and Contact sections
- Project case studies for Foodie and my LMS, plus a case study for Sarthi,
  and project entries for Production RAG and Ask Randhir
- Recent GitHub activity rendered from a daily snapshot file
  (`github-activity.json`) — no live API calls from the page
- Contact form that sends via FormSubmit and falls back to email if sending fails
- AI assistant widget (Ask Randhir) embedded on the page
- `sitemap.xml` and `robots.txt` for search engines

## Run locally

Open `index.html` in a browser, or:

```bash
npx serve .
```

## Project structure

```
index.html              Main page
style.css               All styling
script.js               Side-nav highlighting, contact form, activity feed
case-study-foodie.html  Foodie case study
case-study-lms.html     LMS case study
case-study-sarthi.html  Sarthi case study
github-activity.json    Daily snapshot of recent GitHub activity
sitemap.xml             Search-engine sitemap
robots.txt              Search-engine crawler rules
```

## Tech

- Plain HTML, CSS and JavaScript — no frameworks, no build step
- Inter font from Google Fonts
- Hosted on GitHub Pages
