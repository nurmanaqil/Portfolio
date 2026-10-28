/** Scroll-scrubbed vertical helix; pure geometry shared with verification. */
export function archivePose(index, count, progress, viewportHeight, compact = false) {
  const clamped = Math.max(0, Math.min(1, progress));
  const spacing = compact ? 170 : 205;
  const angle = index * 1.32 + clamped * Math.PI * 3;
  const depth = (Math.cos(angle) + 1) / 2;
  const fade = Math.min(1, clamped / .12, (1 - clamped) / .12);
  const easedFade = fade * fade * (3 - 2 * fade);
  return {
    x: Math.sin(angle) * (compact ? 56 : 160),
    y: (index - (count - 1) / 2) * spacing + (.5 - clamped) * (count * spacing + viewportHeight * .7),
    z: Math.cos(angle) * (compact ? 60 : 160),
    rotateY: Math.sin(angle) * (compact ? -38 : -48),
    rotateZ: Math.sin(angle) * 5,
    opacity: (.4 + depth * .6) * easedFade,
    blur: (1 - easedFade) * 15,
    depth,
  };
}

const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => value * value * (3 - 2 * value);

export function archiveEdgeAppearance(pose, height, compact) {
  const edge = clamp((Math.abs(pose.y) / Math.max(1, height * .5) - (compact ? .35 : .55)) / (compact ? .65 : .75));
  return {
    opacity: pose.opacity * (compact ? 1 - smooth(edge) : 1),
    blur: Math.min(24, pose.blur + edge * (compact ? 20 : 10)),
  };
}

export function portraitVisibility(scrollPosition, heroHeight, workTop, viewportHeight) {
  const end = Math.max(1, Math.min(heroHeight * 1.5, workTop - viewportHeight));
  const start = Math.min(heroHeight * .2, end * .3);
  return 1 - smooth(clamp((scrollPosition - start) / Math.max(1, end - start)));
}
