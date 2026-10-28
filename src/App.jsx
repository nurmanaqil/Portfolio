import React from 'react';
import { profile, navigation, chapters, sessions } from './data/content.mjs';
import Archive, { ArchiveImage } from './components/Archive.jsx';
import { usePortfolioMotion } from './hooks/usePortfolioMotion.js';

const sectionClasses = 'section-shell page-section mx-[9%] border-t border-line py-28 max-[1100px]:py-[85px] max-[700px]:mx-[6%] max-[700px]:py-[65px]';

const Arrow = () => <span aria-hidden="true">↗</span>;
const ExternalLink = ({ href, children, ...props }) => <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;

function Header({ activeSection }) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header absolute top-0 z-10 flex h-[106px] w-full items-center justify-between px-[5%] max-[700px]:h-[85px]"><a className="wordmark" href="#intro" aria-label="Aqil, back to introduction">a<span className="wordmark-pixel">q</span>il<span className="wordmark-dot">.</span></a><div className="header-note mono">A PERSONAL PORTFOLIO <span>© 2026</span></div><a className="header-contact" href="#contact">LET’S TALK <Arrow /></a></header>
    <nav className="section-nav glass-surface fixed bottom-[max(22px,env(safe-area-inset-bottom))] left-1/2 z-25 flex max-w-[calc(100vw-24px)] -translate-x-1/2 flex-row gap-1 rounded-full p-1.5 max-[700px]:bottom-[max(12px,env(safe-area-inset-bottom))] max-[700px]:gap-px max-[700px]:p-1" aria-label="Page sections">{navigation.map(([id, name], index) => <a key={id} href={`#${id}`} className="flex min-h-11 items-center whitespace-nowrap rounded-full px-[21px] py-[13px] font-sans text-xs tracking-[.01em] text-[#666c61] hover:bg-[#e8ebe4] hover:text-ink aria-[current=location]:bg-[#252c23] aria-[current=location]:text-white max-[700px]:px-3.5 max-[700px]:py-3 max-[700px]:text-[11px]" aria-current={activeSection === id ? 'location' : undefined}><span className="nav-index">0{index + 1}</span>{name}</a>)}</nav>
  </>;
}

function Hero() {
  return <section id="intro" className="hero page-section" aria-labelledby="hero-title">
    <div className="hero-topline mono"><span><i className="status-dot" aria-hidden="true" />NURMAN AQIL WICAKSONO</span><span>SURAKARTA, ID</span></div>
    <div className="relative"><h1 id="hero-title">PEOPLE, PLANS<br />& <span className="hero-accent">possibilities.</span></h1></div>
    <div className="hero-bottom"><p className="hero-role mono">PROJECT MANAGEMENT<br />& TEAM COORDINATION</p><div className="hero-intro"><p>I’m Aqil. An Informatics undergraduate connecting people, thoughtful planning, and a technical perspective.</p><a className="button" href="#work">EXPLORE MY WORK <span aria-hidden="true">↘</span></a></div></div>
    <div className="hero-rule"><span className="mono">A LITTLE STRUCTURE. A LOT OF CURIOSITY.</span><span className="mono">01 — 05</span></div>
  </section>;
}

function SelectedWork() {
  return <section id="work" className={`work ${sectionClasses}`} aria-labelledby="work-title">
    <div className="section-kicker mono"><span>01 / SELECTED WORK</span><span>EXPLORATIONS IN TECHNOLOGY</span></div>
    <div className="section-heading mb-[65px] grid grid-cols-[1.6fr_1fr] items-end gap-[65px] max-[1100px]:gap-[30px] max-[700px]:mb-10 max-[700px]:grid-cols-1 max-[700px]:gap-[25px]"><h2 id="work-title">A technical mind.<br />A <span className="serif">human</span> perspective.</h2><p>Software projects that shape how I think about problems, systems, and the people who use them.</p></div>
    <ExternalLink className="group flex items-center justify-between gap-[25px] border-y border-line py-[42px] max-[700px]:py-[30px]" href={`${profile.github}?tab=repositories`}><span><span className="eyebrow">CODE, EXPERIMENTS & DOCUMENTATION</span><strong className="my-3.5 block text-[clamp(30px,4.6vw,65px)] font-normal tracking-[-.055em]">Explore my GitHub.</strong><span className="text-sm text-muted">All my software explorations, in one place.</span></span><span className="text-[70px] transition-transform duration-250 group-hover:translate-x-2 group-hover:-translate-y-2 max-[700px]:text-[45px] motion-reduce:transform-none" aria-hidden="true">↗</span></ExternalLink>
  </section>;
}

function Approach({ activeStory, storyImage }) {
  return <section id="approach" className={`collaboration ${sectionClasses}`} aria-labelledby="approach-title">
    <div className="section-kicker mono"><span>02 / IN THE ROOM</span><span>PEOPLE MAKE THE DIFFERENCE</span></div>
    <h2 id="approach-title" className="collab-heading">GOOD WORK<br />STARTS WITH<br /><span className="serif">connection.</span></h2>
    <div className="story-layout"><div className="story-chapters">{chapters.map(chapter => <article key={chapter.id} className="story-chapter" data-session={chapter.imageIndex} id={chapter.id}><span className="mono chapter-number">/{chapter.number}</span><h3>{chapter.title}</h3><p>{chapter.text}</p><figure className="chapter-inline"><ArchiveImage session={sessions[chapter.imageIndex]} /><figcaption className="mono">{sessions[chapter.imageIndex].caption}</figcaption></figure></article>)}</div>
      <figure className="story-visual"><div className="story-frame">{chapters.map((chapter, index) => <ArchiveImage key={chapter.id} session={sessions[chapter.imageIndex]} className={`story-image ${index === activeStory ? 'is-active' : ''}`} aria-hidden={index !== activeStory} />)}<span className="frame-corner top-left" aria-hidden="true" /><span className="frame-corner bottom-right" aria-hidden="true" /></div><figcaption><span className="mono">{sessions[storyImage].caption}</span><span className="mono">A SHARED MOMENT</span></figcaption><p className="image-context">Moments from online group sessions. A glimpse of the people side of the work.</p></figure>
    </div>
  </section>;
}

function About() {
  return <section id="about" className={`about ${sectionClasses}`} aria-labelledby="about-title">
    <div className="section-kicker mono"><span>03 / A LITTLE ABOUT ME</span><span>THE PERSON BEHIND THE PLANS</span></div>
    <div className="grid grid-cols-[.9fr_1.1fr] items-start gap-[70px] max-[1100px]:gap-10 max-[700px]:grid-cols-1 max-[700px]:gap-[43px]"><figure className="portrait"><img src={profile.portrait} alt="Aqil seated, wearing glasses and a white shirt, with headphones around his neck." width="960" height="1200" loading="lazy" decoding="async" /><figcaption className="mono"><span>{profile.name.toUpperCase()}</span></figcaption></figure>
      <div className="about-copy"><p className="eyebrow">HI, I’M AQIL.</p><h2 id="about-title">Curious by nature.<br /><span className="serif">Intentional</span><br />by practice.</h2><p>I’m an Informatics undergraduate at Universitas Sebelas Maret, based in Surakarta, Indonesia. My interests sit at the intersection of project management, operations, and software development.</p><p>I’m drawn to the space between a good idea and making it happen: understanding the problem, bringing people together, and giving work a clear direction. I’m developing toward AI product management, one project and one conversation at a time.</p>
        <div className="experience"><span className="mono">CURRENT CHAPTER</span><h3>{profile.role}</h3><div><span>{profile.organization}</span><span className="mono">{profile.period}</span></div></div>
        <div className="toolbox"><p className="mono">A FEW TOOLS IN MY CORNER</p><ul className="mt-[15px] flex list-none flex-wrap gap-2 p-0">{['Python', 'Java', 'Flask', 'JavaScript', 'Git & GitHub', 'OpenCV', 'NumPy'].map(tool => <li key={tool} className="border border-[#cbd0c4] px-2.5 py-2 text-[10px] text-[#535b4d]">{tool}</li>)}</ul></div>
      </div>
    </div>
  </section>;
}

function Contact() {
  return <section id="contact" className={`contact ${sectionClasses} pb-20`} aria-labelledby="contact-title"><div className="section-kicker mono"><span>04 / WHAT’S NEXT?</span><span>START WITH A CONVERSATION</span></div><p className="contact-intro">A project, a question, or a shared curiosity.</p><h2 id="contact-title">LET’S MAKE<br /><span className="serif">something</span><br />HAPPEN</h2><div className="contact-bottom mt-[50px] flex items-center justify-between gap-6 max-[700px]:mt-[35px] max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[25px]"><p>Interested in project management,<br />collaboration, or digital solutions?<br />I’d love to connect.</p><ExternalLink className="button button-light" href={profile.linkedin}>SAY HELLO ON LINKEDIN <Arrow /></ExternalLink></div></section>;
}

function Footer() {
  return <footer className="site-footer mx-[9%] flex items-center justify-between gap-[25px] border-t border-line pt-[33px] pb-[125px] max-[700px]:mx-[6%] max-[700px]:flex-wrap max-[700px]:gap-[22px] max-[700px]:pt-[25px]"><a className="wordmark" href="#intro" aria-label="Back to top">aqil.</a><span className="mono">© 2026 NURMAN AQIL WICAKSONO</span><div><ExternalLink href={profile.github}>GITHUB <Arrow /></ExternalLink><ExternalLink href={profile.linkedin}>LINKEDIN <Arrow /></ExternalLink><a href="#intro">BACK TO TOP ↑</a></div></footer>;
}

export default function App() {
  const motion = usePortfolioMotion();
  return <>
    <div className="portrait-background" aria-hidden="true"><img src="/assets/background-portrait.webp" alt="" width="882" height="1400" fetchPriority="high" decoding="async" /></div>
    <Header activeSection={motion.activeSection} />
    <main id="main"><Hero /><Archive /><SelectedWork /><Approach {...motion} /><About /><Contact /></main>
    <Footer />
    <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, sameAs: [profile.github, profile.linkedin], description: 'Informatics undergraduate interested in project management, operations, and AI product development.' })}</script>
  </>;
}
