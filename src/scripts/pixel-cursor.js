/** Small, bounded DOM particle trail. Never replaces the native pointer. */
export function initPixelCursor(reducedMotion, finePointer) {
  const layer = document.createElement('div');
  layer.className = 'pixel-cursor-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.append(layer);
  const particles = new Map();
  let lastX = -100, lastY = -100, lastTime = 0;
  const clear = () => {
    for (const [node, animation] of particles) { animation.cancel(); node.remove(); }
    particles.clear();
  };
  document.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || reducedMotion.matches || !finePointer.matches || document.hidden) return;
    if (event.timeStamp - lastTime < 28 || Math.hypot(event.clientX - lastX, event.clientY - lastY) < 9) return;
    lastX = event.clientX; lastY = event.clientY; lastTime = event.timeStamp;
    const interactive = Boolean(event.target.closest('a,button,summary'));
    for (let i = 0; i < (interactive ? 3 : 2); i++) {
      if (particles.size >= 30) {
        const [oldest, animation] = particles.entries().next().value;
        animation.cancel(); oldest.remove(); particles.delete(oldest);
      }
      const pixel = document.createElement('span');
      pixel.className = 'cursor-pixel';
      const size = interactive ? 8 : 5;
      const x = Math.round(event.clientX / 10) * 10 + (i - 1) * 10;
      const y = Math.round(event.clientY / 10) * 10 + i * 7;
      Object.assign(pixel.style, { left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size}px` });
      layer.append(pixel);
      const animation = pixel.animate([
        { opacity: .55, transform: 'translate(0,0) rotate(0deg) scale(1)' },
        { opacity: 0, transform: `translate(${(i - 1) * 18}px,-32px) rotate(90deg) scale(.15)` },
      ], { duration: 620, easing: 'cubic-bezier(.2,.65,.3,1)' });
      particles.set(pixel, animation);
      animation.onfinish = () => { pixel.remove(); particles.delete(pixel); };
    }
  }, { passive: true });
  reducedMotion.addEventListener('change', clear);
  finePointer.addEventListener('change', clear);
  document.addEventListener('visibilitychange', clear);
  document.documentElement.addEventListener('pointerleave', clear);
}
