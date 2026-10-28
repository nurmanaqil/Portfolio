import { useEffect, useState } from 'react';
import { archivePose, archiveEdgeAppearance, portraitVisibility } from '../scripts/archive-motion.js';
import { initSmokeBackground } from '../scripts/smoke-background.js';
import { initPixelCursor } from '../scripts/pixel-cursor.js';
import { chapters } from '../data/content.mjs';

export function usePortfolioMotion() {
  const [activeSection, setActiveSection] = useState('intro');
  const [activeStory, setActiveStory] = useState(0);
  useEffect(() => {
    document.documentElement.dataset.enhanced = 'true';
    const controller = new AbortController();
    const { signal } = controller;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    const stopSmoke = initSmokeBackground(reduced);
    const stopPixels = initPixelCursor(reduced, pointer);
    const sections = [...document.querySelectorAll('.page-section')];
    const story = [...document.querySelectorAll('.story-chapter')];
    const orbit = document.querySelector('.archive-orbit');
    const stage = orbit.querySelector('.orbit-stage');
    const cards = [...document.querySelectorAll('.orbit-ring .archive-item')];
    const portrait = document.querySelector('.portrait-background');
    const hero = document.getElementById('intro');
    const work = document.getElementById('work');
    let frame = 0;
    function update() {
      frame = 0;
      let active = 'intro';
      for (const section of sections) if (section.getBoundingClientRect().top <= innerHeight * .44) active = section.id;
      setActiveSection(active);
      const workTop = work.getBoundingClientRect().top + scrollY;
      const portraitOpacity = portraitVisibility(scrollY, hero.offsetHeight, workTop, innerHeight);
      portrait.style.setProperty('--portrait-opacity', portraitOpacity);
      portrait.style.visibility = portraitOpacity < .005 ? 'hidden' : 'visible';
      let closest = 0, distance = Infinity;
      story.forEach((item, index) => {
        const bounds = item.getBoundingClientRect();
        const delta = Math.abs(bounds.top + bounds.height / 2 - innerHeight / 2);
        if (delta < distance) { closest = index; distance = delta; }
      });
      setActiveStory(closest);
      const bounds = orbit.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - innerHeight)));
      const height = stage.clientHeight;
      cards.forEach((card, index) => {
        if (reduced.matches) { card.removeAttribute('style'); return; }
        const pose = archivePose(index, cards.length, progress, height, innerWidth <= 700);
        const appearance = archiveEdgeAppearance(pose, height, innerWidth <= 700);
        const variables = { x: `${pose.x}px`, y: `${pose.y}px`, z: `${pose.z}px`, turn: `${pose.rotateY}deg`, tilt: `${pose.rotateZ}deg`, opacity: appearance.opacity,
          blur: `${appearance.blur}px` };
        for (const [key, value] of Object.entries(variables)) card.style.setProperty(`--card-${key}`, value);
        card.style.visibility = appearance.opacity < .005 ? 'hidden' : 'visible';
      });
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', schedule, { passive: true, signal });
    addEventListener('resize', schedule, { passive: true, signal });
    reduced.addEventListener('change', schedule, { signal });
    update();
    return () => {
      controller.abort(); cancelAnimationFrame(frame);
      stopSmoke?.(); stopPixels?.(); delete document.documentElement.dataset.enhanced;
    };
  }, []);
  return { activeSection, activeStory, storyImage: chapters[activeStory].imageId };
}
