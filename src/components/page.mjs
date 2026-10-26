import { profile, navigation, sessions, chapters } from '../data/content.mjs';

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const e = escapeHtml;
const arrow = '<span aria-hidden="true">↗</span>';
const assetImage = (session, classes = '') => `<img class="${classes}" src="${session.image}" alt="${e(session.alt)}" width="1440" height="810" loading="lazy" decoding="async">`;

export function renderPage() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f6f5f1">
  <title>Aqil — Project Management & Team Coordination</title>
  <meta name="description" content="Nurman Aqil Wicaksono. Informatics undergraduate at Universitas Sebelas Maret, connecting project management, people, and a technical perspective.">
  <meta name="robots" content="noindex, nofollow">
  <meta property="og:title" content="Aqil — People, plans & possibilities.">
  <meta property="og:description" content="Project management, team coordination, and a technical perspective. Explore Aqil’s work and the person behind it.">
  <meta property="og:type" content="website">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles/main.css"><link rel="stylesheet" href="/styles/refinement.css">
  <script type="module" src="/scripts/main.js"></script>
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, url: profile.github, sameAs: [profile.github, profile.linkedin], description: 'Informatics undergraduate interested in project management, operations, and AI product development.' })}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><a class="wordmark" href="#intro" aria-label="Aqil, back to introduction">a<span class="wordmark-pixel">q</span>il<span class="wordmark-dot">.</span></a><div class="header-note mono">A PERSONAL PORTFOLIO <span>© 2026</span></div><a class="header-contact" href="#contact">LET’S TALK <span aria-hidden="true">↗</span></a></header>
  <nav class="section-nav" aria-label="Page sections">${navigation.map(([id, name], i) => `<a href="#${id}" ${i === 0 ? 'aria-current="location"' : ''}><span class="nav-index">0${i + 1}</span>${name}</a>`).join('')}</nav>
  <main id="main">
    <section id="intro" class="hero page-section" aria-labelledby="hero-title">
      <div class="hero-topline mono"><span><i class="status-dot" aria-hidden="true"></i> NURMAN AQIL WICAKSONO</span><span>SURAKARTA, ID</span></div>
      <div class="hero-title-wrap"><h1 id="hero-title">PEOPLE, PLANS<br>& <span class="hero-accent">possibilities.</span></h1><span class="hero-star" aria-hidden="true">✳</span></div>
      <div class="hero-bottom"><p class="hero-role mono">PROJECT MANAGEMENT<br>& TEAM COORDINATION</p><div class="hero-intro"><p>I’m Aqil. An Informatics undergraduate connecting people, thoughtful planning, and a technical perspective.</p><a class="button" href="#work">EXPLORE MY WORK <span aria-hidden="true">↘</span></a></div><a class="scroll-cue mono" href="#work"><span>SCROLL TO EXPLORE</span><span aria-hidden="true">↓</span></a></div>
      <div class="hero-rule"><span class="mono">A LITTLE STRUCTURE. A LOT OF CURIOSITY.</span><span class="mono">01 — 05</span></div>
    </section>

    <section id="archive" class="hero-archive" aria-label="Project collaboration gallery">
      <div class="archive-header"><div><h3 class="mono">THE COLLABORATION ARCHIVE</h3><p class="archive-role">My chapter as <strong>Project Controlling Manager (PCM)</strong><br>AIESEC in UNS · 2026–2027</p></div><span class="mono">SCROLL TO RISE / SELECT TO EXPLORE ↗</span></div><div class="archive-orbit"><div class="orbit-stage"><div class="orbit-center"><span class="eyebrow">PEOPLE & COORDINATION</span><strong>PCM<span>in motion.</span></strong><span class="mono">AIESEC IN UNS / 2026–2027</span></div>
      <div class="archive-grid orbit-ring">${sessions.map((session, i) => `<a href="${session.image}" class="archive-item" style="--angle:${i * 36}deg" data-archive-index="${i}" aria-label="Open Project ${i + 1}" aria-haspopup="dialog">${assetImage(session)}<span class="archive-caption mono"><span>PROJECT ${i + 1}</span><span aria-hidden="true">↗</span></span></a>`).join('')}</div></div></div>
    </section>

    <section id="work" class="work section-shell page-section" aria-labelledby="work-title">
      <div class="section-kicker mono"><span>01 / SELECTED WORK</span><span>EXPLORATIONS IN TECHNOLOGY</span></div>
      <div class="section-heading"><h2 id="work-title">A technical mind.<br>A <span class="serif">human</span> perspective.</h2><p>Software projects that shape how I think about problems, systems, and the people who use them.</p></div>
      <a class="github-destination" href="${profile.github}?tab=repositories" target="_blank" rel="noopener noreferrer"><span><span class="eyebrow">CODE, EXPERIMENTS & DOCUMENTATION</span><strong>Explore my GitHub.</strong><span class="github-description">All my software explorations, in one place.</span></span><span class="github-destination-arrow" aria-hidden="true">↗</span></a>
    </section>

    <section id="approach" class="collaboration section-shell page-section" aria-labelledby="approach-title">
      <div class="section-kicker mono"><span>02 / IN THE ROOM</span><span>PEOPLE MAKE THE DIFFERENCE</span></div>
      <h2 id="approach-title" class="collab-heading">GOOD WORK<br>STARTS WITH<br><span class="serif">connection.</span></h2>
      <div class="story-layout"><div class="story-chapters">${chapters.map(chapter => `<article class="story-chapter" data-session="${chapter.imageIndex}" id="${chapter.id}"><span class="mono chapter-number">/${chapter.number}</span><h3>${e(chapter.title)}</h3><p>${e(chapter.text)}</p><figure class="chapter-inline">${assetImage(sessions[chapter.imageIndex])}<figcaption class="mono">${sessions[chapter.imageIndex].caption}</figcaption></figure></article>`).join('')}</div><figure class="story-visual"><div class="story-frame">${chapters.map((chapter, i) => assetImage(sessions[chapter.imageIndex], `story-image ${i === 0 ? 'is-active' : ''}`)).join('')}<span class="frame-corner top-left" aria-hidden="true"></span><span class="frame-corner bottom-right" aria-hidden="true"></span></div><figcaption><span class="mono" data-story-caption>${sessions[0].caption}</span><span class="mono">A SHARED MOMENT</span></figcaption><p class="image-context">Moments from online group sessions. A glimpse of the people side of the work.</p></figure></div>

    </section>

    <section id="about" class="about section-shell page-section" aria-labelledby="about-title"><div class="section-kicker mono"><span>03 / A LITTLE ABOUT ME</span><span>THE PERSON BEHIND THE PLANS</span></div>
      <div class="about-layout"><figure class="portrait"><img src="${profile.portrait}" alt="Aqil seated, wearing glasses and a white shirt, with headphones around his neck." width="960" height="1200" loading="lazy" decoding="async"><figcaption class="mono"><span>NURMAN AQIL WICAKSONO</span></figcaption><span class="portrait-mark" aria-hidden="true">a.</span></figure><div class="about-copy"><p class="eyebrow">HI, I’M AQIL.</p><h2 id="about-title">Curious by nature.<br><span class="serif">Intentional</span><br>by practice.</h2><p>I’m an Informatics undergraduate at Universitas Sebelas Maret, based in Surakarta, Indonesia. My interests sit at the intersection of project management, operations, and software development.</p><p>I’m drawn to the space between a good idea and making it happen: understanding the problem, bringing people together, and giving work a clear direction. I’m developing toward AI product management, one project and one conversation at a time.</p><div class="experience"><span class="mono">CURRENT CHAPTER</span><h3>${profile.role}</h3><div><span>${profile.organization}</span><span class="mono">${profile.period}</span></div></div><div class="toolbox"><p class="mono">A FEW TOOLS IN MY CORNER</p><ul>${['Python', 'Java', 'Flask', 'JavaScript', 'Git & GitHub', 'OpenCV', 'NumPy'].map(tool => `<li>${tool}</li>`).join('')}</ul></div></div></div>
    </section>

    <section id="contact" class="contact section-shell page-section" aria-labelledby="contact-title"><div class="section-kicker mono"><span>04 / WHAT’S NEXT?</span><span>START WITH A CONVERSATION</span></div><p class="contact-intro">A project, a question, or a shared curiosity.</p><h2 id="contact-title">LET’S MAKE<br><span class="serif">something</span><br>HAPPEN<span class="contact-star" aria-hidden="true">✳</span></h2><div class="contact-bottom"><p>Interested in project management,<br>collaboration, or digital solutions?<br>I’d love to connect.</p><a class="button button-light" href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">SAY HELLO ON LINKEDIN ${arrow}</a></div></section>
  </main>
  <footer class="site-footer"><a class="wordmark" href="#intro" aria-label="Back to top">aqil.</a><span class="mono">© 2026 NURMAN AQIL WICAKSONO</span><div><a href="${profile.github}" target="_blank" rel="noopener noreferrer">GITHUB ${arrow}</a><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LINKEDIN ${arrow}</a><a href="#intro">BACK TO TOP ↑</a></div></footer>
  <div class="hover-preview" aria-hidden="true"><img alt="" width="440" height="248"><span class="mono"></span></div>
  <dialog class="archive-dialog" aria-label="Collaboration archive viewer"><div class="dialog-toolbar"><span class="mono" data-dialog-count></span><button type="button" class="dialog-close" aria-label="Close archive viewer">CLOSE <span aria-hidden="true">×</span></button></div><figure><img data-dialog-image alt="" width="1440" height="810"><figcaption class="mono" data-dialog-caption></figcaption></figure><div class="dialog-bottom"><button type="button" data-dialog-prev aria-label="Previous archive image">← PREVIOUS</button><p>PROJECTS 1–10 / COLLABORATION ARCHIVE</p><button type="button" data-dialog-next aria-label="Next archive image">NEXT →</button></div></dialog>
</body></html>`;
}
