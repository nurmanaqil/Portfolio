/** Scroll-scrubbed vertical helix; pure geometry shared with verification. */
export function archivePose(index, count, progress, viewportHeight, compact = false) {
  const clamped = Math.max(0, Math.min(1, progress));
  const spacing = compact ? 170 : 205;
  const angle = index * 1.32 + clamped * Math.PI * 3;
  const depth = (Math.cos(angle) + 1) / 2;
  const fade = Math.min(1, clamped / .12, (1 - clamped) / .12);
  const easedFade = fade * fade * (3 - 2 * fade);
  return {
    x: Math.sin(angle) * (compact ? 68 : 160),
    y: (index - (count - 1) / 2) * spacing + (.5 - clamped) * (count * spacing + viewportHeight * .7),
    z: Math.cos(angle) * (compact ? 80 : 160),
    rotateY: Math.sin(angle) * -48,
    rotateZ: Math.sin(angle) * 5,
    opacity: (.4 + depth * .6) * easedFade,
    blur: (1 - easedFade) * 15,
    depth,
  };
}
