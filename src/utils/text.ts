import { ALPHABET } from '../data/alphabet';

// Map for fast lookups
const charMap = new Map<string, string>();
ALPHABET.forEach(item => {
    charMap.set(item.upper, item.latin);
    charMap.set(item.lower, item.latin.toLowerCase());
});

export const transliterate = (text: string): string => {
    return text.split('').map(char => {
        // Check direct map first
        if (charMap.has(char)) return charMap.get(char);
        // Be robust to case
        const upper = char.toUpperCase();
        if (charMap.has(upper)) {
            const val = charMap.get(upper)!;
            return char === upper ? val : val.toLowerCase();
        }
        return char; // Return original if not found (e.g. space, punctuation)
    }).join('');
};
