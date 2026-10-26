import { test } from 'node:test';
import assert from 'node:assert/strict';
import { archivePose } from '../src/scripts/archive-motion.js';

test('every archive image travels upward as scroll progresses', () => {
  for (let index = 0; index < 10; index++) {
    const start = archivePose(index, 10, 0, 720);
    const middle = archivePose(index, 10, .5, 720);
    const end = archivePose(index, 10, 1, 720);
    assert.ok(start.y > middle.y && middle.y > end.y);
    assert.ok(Math.abs(middle.rotateY) <= 48);
    assert.ok(middle.opacity >= .4 && middle.opacity <= 1);
  }
});
test('motion clamps overscroll and keeps mobile horizontal displacement bounded', () => {
  assert.deepEqual(archivePose(0, 10, -5, 720), archivePose(0, 10, 0, 720));
  assert.deepEqual(archivePose(0, 10, 5, 720), archivePose(0, 10, 1, 720));
  for (let i = 0; i < 10; i++) assert.ok(Math.abs(archivePose(i, 10, .6, 520, true).x) <= 68);
});

test('gallery starts and ends invisible with a blurred transition', () => {
  for (const progress of [0, 1]) {
    const pose = archivePose(4, 10, progress, 720);
    assert.equal(pose.opacity, 0);
    assert.equal(pose.blur, 15);
  }
  const middle = archivePose(4, 10, .5, 720);
  assert.ok(middle.opacity > 0);
  assert.equal(middle.blur, 0);
});
