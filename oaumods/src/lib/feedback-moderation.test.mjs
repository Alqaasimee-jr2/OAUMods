import test from 'node:test';
import assert from 'node:assert/strict';
import { containsBlockedLanguage } from './feedback-moderation.ts';

test('blocks common profanity', () => {
  for (const message of [
    'This is fucking useless.',
    'What the shit is happening?',
    'That was a damn bad experience.',
    'You are an asshole.',
    'This is bullshit.',
  ]) {
    assert.equal(containsBlockedLanguage(message), true, message);
  }
});

test('blocks simple punctuation, spacing and leetspeak obfuscation', () => {
  for (const message of [
    'That is f.u.c.k.e.d.',
    'You are a b i t c h.',
    'This is sh!t.',
    'That is f@ggot.',
    'n1gger',
  ]) {
    assert.equal(containsBlockedLanguage(message), true, message);
  }
});

test('blocks abusive slurs', () => {
  assert.equal(containsBlockedLanguage('That word is a slur: nigger.'), true);
  assert.equal(containsBlockedLanguage('Stop calling people faggots.'), true);
});

test('allows legitimate negative feedback', () => {
  for (const message of [
    'The website is terrible and confusing.',
    'The map is disappointing and slow.',
    'The search feature is frustrating.',
    'The classroom directory needs better information.',
    'The assessment page is difficult to understand.',
    'Scunthorpe is a place name, not abuse.',
  ]) {
    assert.equal(containsBlockedLanguage(message), false, message);
  }
});

test('allows empty and non-string-safe input to be handled by callers', () => {
  assert.equal(containsBlockedLanguage(''), false);
});
