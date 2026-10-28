/** Low-resolution smoke field: softened base and a faint pixelated overlay. */
export function initSmokeBackground(reducedMotion) {
  const controller = new AbortController();
  const { signal } = controller;
  const layer = document.createElement('div');
  layer.className = 'smoke-background';
  layer.setAttribute('aria-hidden', 'true');
  const soft = document.createElement('canvas');
  const pixels = document.createElement('canvas');
  soft.className = 'smoke-soft'; pixels.className = 'smoke-pixels';
  layer.append(soft, pixels); document.body.prepend(layer);
  const context = soft.getContext('2d');
  const pixelContext = pixels.getContext('2d');
  if (!context || !pixelContext) { layer.remove(); return; }
  let frame = 0, lastTime = 0, phase = 0;
  function resize() {
    soft.width = pixels.width = 96;
    soft.height = pixels.height = Math.max(48, Math.round(96 * innerHeight / innerWidth));
    draw(phase);
  }
  function draw(time) {
    const w = soft.width, h = soft.height;
    context.clearRect(0, 0, w, h);
    // Overlapping soft wisps follow an elliptical path rather than a solid disk.
    for (let arm = 0; arm < 3; arm++) {
      for (let step = 0; step < 15; step++) {
        const angle = time * .13 + arm * 2.1 + step * .14;
        const radius = 15 + Math.sin(step * .4 + time * .1) * 6;
        const x = w * .62 + Math.cos(angle) * w * .25 + Math.sin(angle * 2.2) * 4;
        const y = h * .45 + Math.sin(angle) * h * .27;
        const cloud = context.createRadialGradient(x, y, 0, x, y, radius);
        cloud.addColorStop(0, 'rgba(75,78,72,0.065)');
        cloud.addColorStop(.5, 'rgba(95,98,91,0.028)');
        cloud.addColorStop(1, 'rgba(95,98,91,0)');
        context.fillStyle = cloud;
        context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }
    }
    pixelContext.clearRect(0, 0, w, h);
    pixelContext.drawImage(soft, 0, 0);
  }
  function animate(now) {
    if (now - lastTime >= 60) { phase += Math.min(now - lastTime, 100) / 1000; draw(phase); lastTime = now; }
    frame = requestAnimationFrame(animate);
  }
  function sync() {
    cancelAnimationFrame(frame);
    if (!document.hidden && !reducedMotion.matches) { lastTime = performance.now(); frame = requestAnimationFrame(animate); }
    else draw(phase);
  }
  window.addEventListener('resize', resize, { passive: true, signal });
  document.addEventListener('visibilitychange', sync, { signal });
  reducedMotion.addEventListener('change', sync, { signal });
  resize(); sync();
  return () => { controller.abort(); cancelAnimationFrame(frame); layer.remove(); };
}
