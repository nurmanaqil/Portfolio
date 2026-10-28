import React, { useEffect, useRef, useState } from 'react';
import { archiveSessions as sessions } from '../data/content.mjs';

export function ArchiveImage({ session, className = '', ...props }) {
  return <img className={className} src={session.image} alt={session.alt} width={session.width || 1440} height={session.height || 810} loading="lazy" decoding="async" {...props} />;
}

export default function Archive() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null), preview = useRef(null), lastTrigger = useRef(null);
  const image = selected === null ? null : sessions[selected];
  const hidePreview = () => preview.current?.classList.remove('is-visible');
  useEffect(() => {
    const controller = new AbortController();
    addEventListener('scroll', hidePreview, { passive: true, signal: controller.signal });
    return () => { controller.abort(); document.body.classList.remove('dialog-open'); };
  }, []);
  useEffect(() => {
    if (selected === null) return;
    if (!dialog.current.open) {
      dialog.current.showModal(); document.body.classList.add('dialog-open');
      dialog.current.querySelector('.dialog-close').focus();
    }
  }, [selected]);
  function open(event, index) {
    event.preventDefault(); lastTrigger.current = event.currentTarget; hidePreview(); setSelected(index);
  }
  function showPreview(event, session) {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches || innerWidth <= 700) return;
    const element = preview.current;
    element.querySelector('img').src = session.image;
    element.querySelector('span').textContent = session.caption;
    element.classList.add('is-visible');
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || box.left, y = event.clientY || box.top;
    element.style.left = `${Math.max(16, Math.min(x + 22, innerWidth - element.offsetWidth - 18))}px`;
    element.style.top = `${Math.max(16, Math.min(y - element.offsetHeight - 22, innerHeight - element.offsetHeight - 18))}px`;
  }
  const step = delta => setSelected(value => (value + delta + sessions.length) % sessions.length);
  return <>
    <section id="archive" className="hero-archive mx-[9%] pt-[25px] max-[700px]:mx-[6%]" aria-label="Project collaboration gallery">
      <div className="archive-header"><div><h3 className="mono">THE COLLABORATION ARCHIVE</h3><p className="archive-role">My chapter as <strong>Project Controlling Manager (PCM)</strong><br />AIESEC in UNS · 2026–2027</p></div><span className="mono">SCROLL TO RISE / SELECT TO EXPLORE ↗</span></div>
      <div className="archive-orbit" style={{ '--archive-count': sessions.length }}><div className="orbit-stage">
        <div className="orbit-center"><span className="eyebrow">PEOPLE & COORDINATION</span><strong>PCM<span>in motion.</span></strong><span className="mono">AIESEC IN UNS / 2026–2027</span></div>
        <div className="archive-grid orbit-ring">{sessions.map((session, index) => <a key={session.id} href={session.image} className="archive-item" data-archive-index={index} aria-label={`Open ${session.caption}`} aria-haspopup="dialog"
          onClick={event => open(event, index)} onPointerEnter={event => showPreview(event, session)} onPointerMove={event => showPreview(event, session)} onPointerLeave={hidePreview} onFocus={event => showPreview(event, session)} onBlur={hidePreview}>
          <ArchiveImage session={session} /><span className="archive-caption mono"><span>{session.caption.toUpperCase()}</span><span aria-hidden="true">↗</span></span>
        </a>)}</div>
      </div></div>
    </section>
    <div className="hover-preview" ref={preview} aria-hidden="true"><img alt="" width="440" height="248" /><span className="mono" /></div>
    <dialog className="archive-dialog" ref={dialog} aria-label="Collaboration archive viewer"
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
      }}
      onClose={() => { setSelected(null); document.body.classList.remove('dialog-open'); lastTrigger.current?.focus(); hidePreview(); }}
      onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); step(event.key === 'ArrowRight' ? 1 : -1); } }}>
      <div className="dialog-toolbar mb-5 flex items-center justify-between"><span className="mono">{selected === null ? '' : `${String(selected + 1).padStart(2, '0')} / ${sessions.length}`}</span><button type="button" className="dialog-close" onClick={() => dialog.current.close()} aria-label="Close archive viewer">CLOSE <span aria-hidden="true">×</span></button></div>
      <figure>{image && <img src={image.image} alt={image.alt} width={image.width || 1440} height={image.height || 810} />}<figcaption className="mono">{image?.caption}</figcaption></figure>
      <div className="dialog-bottom mt-4 flex items-center justify-between gap-[15px]"><button type="button" onClick={() => step(-1)} aria-label="Previous archive image">← PREVIOUS</button><p>PROJECTS 1–{sessions.length} / COLLABORATION ARCHIVE</p><button type="button" onClick={() => step(1)} aria-label="Next archive image">NEXT →</button></div>
    </dialog>
  </>;
}
