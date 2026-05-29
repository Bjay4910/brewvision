# BrewVision

A premium, cinematic landing page for a fictional craft beer brand — built to showcase what's possible when you treat the modern web like a stage rather than a document.

**Live demo:** [brewvision.vercel.app](https://brewvision.vercel.app)

![BrewVision Hero](assets/beer-glass.jpg)

## About

BrewVision is a single-page experience designed to feel less like a website and more like a short film. Every section earns its place: a video hero with drifting particles, a tabbed product showcase lit by an animated spotlight, dual-row scrolling testimonials, and a typewritten call-to-action that re-triggers each time it enters the viewport.

This is a portfolio piece by [Orductive](https://instagram.com/orductive) — a small studio building premium websites for ambitious small businesses.

## Features

- **Cinematic hero** with looping video background, mouse-parallax particle canvas, and a sticky navigation that fades to frosted glass on scroll
- **Tabbed product showcase** ("The Experience") with an animated CSS lamp effect, Intersection Observer reveal animations, and hover lift on product imagery
- **Dual-row infinite marquee** testimonials with edge-fade gradients and pause-on-hover
- **Scroll-triggered typewriter headline** that retypes itself each time the user re-enters the section
- **macOS-style animated dock** in the footer using a window-level mouse listener for smooth icon magnification
- **Smooth-scroll navigation** wired across the header, mobile menu, and footer
- **Fully responsive** with a fullscreen mobile hamburger overlay

## Tech Stack

Vanilla HTML, CSS, and JavaScript — no framework, no build step, no dependencies. The whole site is a static page that runs anywhere.

- HTML5
- CSS3 (CSS Grid, custom properties, backdrop-filter, conic gradients)
- Vanilla JavaScript (Intersection Observer, requestAnimationFrame, Canvas 2D)
- Satoshi font via Fontshare CDN

## Project Structure
## Running Locally

Clone the repo and open it in a local server (the video and image paths need a real server to resolve correctly):

```bash
git clone https://github.com/Bjay4910/brewvision.git
cd brewvision
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Design Notes

The whole site uses a deep navy (`#050a14`) and a warm gold (`#C9A84C`) as its only two accent colors. Typography is Satoshi — heavy 700–900 weight for headlines with tight negative tracking, light 300 for body text. The contrast in weight is what makes the type feel sculpted instead of flat.

Animations stay in the 300–800ms range. Anything longer feels sluggish; anything shorter feels jittery.

## Process

Built using a modern AI-assisted workflow — the kind of approach that lets a small studio like Orductive deliver premium, custom sites in days instead of months. Every design decision, debug loop, and polish detail was directed by hand; the AI is a collaborator, not the author.

UI inspiration drawn from the broader creative web community.

## License

MIT — feel free to study, fork, or use this as a starting point for your own work.

---

Built by [Orductive](https://instagram.com/orductive) — websites that earn attention.
