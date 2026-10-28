import { test } from 'node:test';
import assert from 'node:assert/strict';
import { archivePose, archiveEdgeAppearance, portraitVisibility } from '../src/scripts/archive-motion.js';

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

test('mobile cards fade and blur completely before crossing the stage edges', () => {
  const center = archiveEdgeAppearance({ y: 0, opacity: .8, blur: 0 }, 844, true);
  const nearEdge = archiveEdgeAppearance({ y: 330, opacity: .8, blur: 0 }, 844, true);
  const edge = archiveEdgeAppearance({ y: 422, opacity: .8, blur: 0 }, 844, true);
  assert.equal(center.opacity, .8);
  assert.ok(nearEdge.opacity > 0 && nearEdge.opacity < center.opacity);
  assert.ok(nearEdge.blur > 0);
  assert.equal(edge.opacity, 0);
  assert.ok(edge.blur >= 20);
});

test('background portrait is visible initially and gone before Selected Work', () => {
  assert.equal(portraitVisibility(0, 844, 4500, 844), 1);
  assert.ok(portraitVisibility(600, 844, 4500, 844) < 1);
  assert.equal(portraitVisibility(1300, 844, 4500, 844), 0);
  assert.equal(portraitVisibility(500, 844, 1100, 844), 0);
});
