import { test } from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { renderPage, escapeHtml } from '../src/components/page.mjs';
import { sessions, projects, navigation } from '../src/data/content.mjs';

const html = renderPage();
test('every navigation destination exists and IDs are unique', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [id] of navigation) assert.ok(ids.includes(id));
});
test('all local image, style, script and icon URLs resolve in the build', async () => {
  const urls = [...html.matchAll(/(?:src|href)="(\/(?!\/)[^"#]+)"/g)].map(match => match[1]);
  for (const url of urls) await access(path.join('dist', url));
  for (const session of sessions) await access(path.join('dist', session.image));
});
test('contact uses supplied profile and excludes unresolved email and CV', () => {
  assert.ok(html.includes('https://www.linkedin.com/in/nurmanaqil/'));
  assert.ok(!html.includes('mailto:'));
  assert.ok(!html.includes('Download CV'));
});
test('project URLs are source-backed and collaboration images are not software previews', () => {
  for (const project of projects) assert.ok(project.url.startsWith('https://github.com/nurmanaqil/'));
  assert.ok(sessions.every(session => session.projectId === null && session.publicationApproved === false));
});
test('document includes private-preview indexing policy and semantic fallbacks', () => {
  assert.ok(html.includes('noindex, nofollow'));
  assert.ok(!html.includes('project-list'));
  assert.ok(html.includes('https://github.com/nurmanaqil?tab=repositories'));
  assert.ok(html.includes('Project Controlling Manager (PCM)'));
  assert.ok(html.includes('chapter-inline'));
  assert.equal(escapeHtml('<script>"&'), '&lt;script&gt;&quot;&amp;');
});
test('browser modules parse and assets have been optimized', async () => {
  const content = await readFile('dist/scripts/content.js', 'utf8');
  assert.ok(content.includes('export const sessions'));
  assert.equal(sessions.length, 10);
});
