const BLOCKED_TERMS = [
  'fuck', 'fucking', 'fucked', 'fucker', 'fuckers',
  'shit', 'shitty', 'bullshit', 'shithead',
  'bitch', 'bitches', 'bitchy',
  'asshole', 'arsehole', 'dumbass', 'jackass',
  'bastard', 'bastards', 'motherfucker', 'motherfuckers',
  'cunt', 'cunts', 'dickhead', 'dickheads',
  'pussy', 'wanker', 'wankers', 'twat', 'twats',
  'bollocks', 'prick', 'pricks', 'crap',
  'damn', 'goddamn', 'wtf', 'stfu',
  'nigger', 'niggers', 'nigga', 'niggas',
  'faggot', 'faggots', 'dyke', 'kike', 'chink',
  'spic', 'wetback', 'coon', 'retard', 'retards',
] as const;

const LEET_REPLACEMENTS: Record<string, string> = {
  '0': 'o',
  '1': 'i',
  '!': 'i',
  '|': 'i',
  '3': 'e',
  '4': 'a',
  '@': 'a',
  '5': 's',
  '$': 's',
  '7': 't',
  '8': 'b',
};

function normalizeForModeration(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[01!|34@5$78]/g, (character) => LEET_REPLACEMENTS[character] ?? character);
}

const BLOCKED_PATTERNS = BLOCKED_TERMS.map((term) => {
  const lettersWithFlexibleSeparators = [...term]
    .map((character) => character.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('[^\\p{L}\\p{N}]*');

  return new RegExp(
    `(^|[^\\p{L}\\p{N}])${lettersWithFlexibleSeparators}(?=$|[^\\p{L}\\p{N}])`,
    'u',
  );
});

/**
 * Detects common English profanity and abusive slurs, including simple
 * punctuation/spacing and leetspeak obfuscation. This is a practical filter,
 * not a complete multilingual classifier.
 */
export function containsBlockedLanguage(value: string): boolean {
  if (!value || typeof value !== 'string') return false;
  const normalized = normalizeForModeration(value);
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(normalized));
}
