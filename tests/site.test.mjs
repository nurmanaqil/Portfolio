import { test } from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { sessions, navigation, archiveSessions, chapters, sessionsById } from '../src/data/content.mjs';

const html = await readFile('dist/index.html', 'utf8');
test('React prerender includes core content, valid anchors and unique IDs', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [id] of navigation) assert.ok(ids.includes(id));
  assert.ok(html.includes('PEOPLE, PLANS'));
  assert.ok(html.includes('Project Controlling Manager (PCM)'));
  assert.ok(html.includes('Explore my GitHub.'));
});
test('all generated local asset links resolve', async () => {
  for (const match of html.matchAll(/(?:src|href)="(\/(?!\/)[^"#]+)"/g)) await access(path.join('dist', match[1]));
  for (const session of sessions) await access(path.join('dist', session.image));
});
test('archive contains only the 11 retained photos and each has its own caption', () => {
  assert.equal(sessions.length, 11);
  assert.equal(new Set(archiveSessions.map(session => session.id)).size, 11);
  for (const session of sessions) {
    assert.ok(session.caption.trim());
    assert.ok(html.includes(`Open ${session.caption}`));
  }
  for (const number of [1, 8, 6, 9]) {
    assert.ok(!html.includes(`/assets/session-${String(number).padStart(2, '0')}.webp`));
  }
  for (const chapter of chapters) assert.ok(sessionsById[chapter.imageId]);
  assert.ok(!html.includes('AKA. AQIL'));
});

test('source-backed contact and direct GitHub work link remain intact', () => {
  assert.ok(html.includes('https://www.linkedin.com/in/nurmanaqil/'));
  assert.ok(html.includes('href="https://github.com/nurmanaqil"'));
  assert.ok(!html.includes('?tab=repositories'));
  assert.ok(!html.includes('mailto:'));
  assert.ok(!html.includes('project-list'));
});
test('preview policy and progressive fallback content survive migration', () => {
  assert.ok(html.includes('noindex, nofollow'));
  assert.ok(html.includes('chapter-inline'));
  assert.ok(html.includes('href="/assets/session-15.webp"'));
  assert.ok(html.includes('type="module"'));
});
