export type LetterData = {
  id: string;
  char: string;
  upper: string;
  lower: string;
  latin: string;
  pronunciation?: string; // e.g. "a" as in "father"
};

export const ALPHABET: LetterData[] = [
  { id: 'a', char: 'А', upper: 'А', lower: 'а', latin: 'A', pronunciation: 'Like "a" in "father"' },
  { id: 'b', char: 'Б', upper: 'Б', lower: 'б', latin: 'B', pronunciation: 'Like "b" in "book"' },
  { id: 'v', char: 'В', upper: 'В', lower: 'в', latin: 'V', pronunciation: 'Like "v" in "very"' },
  { id: 'h', char: 'Г', upper: 'Г', lower: 'г', latin: 'H', pronunciation: 'Like "h" in "home"' },
  { id: 'g', char: 'Ґ', upper: 'Ґ', lower: 'ґ', latin: 'G', pronunciation: 'Like "g" in "go"' },
  { id: 'd', char: 'Д', upper: 'Д', lower: 'д', latin: 'D', pronunciation: 'Like "d" in "dog"' },
  { id: 'e', char: 'Е', upper: 'Е', lower: 'е', latin: 'E', pronunciation: 'Like "e" in "pet"' },
  { id: 'je', char: 'Є', upper: 'Є', lower: 'є', latin: 'Ye', pronunciation: 'Like "ye" in "yes"' },
  { id: 'zh', char: 'Ж', upper: 'Ж', lower: 'ж', latin: 'Zh', pronunciation: 'Like "s" in "pleasure"' },
  { id: 'z', char: 'З', upper: 'З', lower: 'з', latin: 'Z', pronunciation: 'Like "z" in "zoo"' },
  { id: 'y', char: 'И', upper: 'И', lower: 'и', latin: 'Y', pronunciation: 'Like "i" in "ill" but harder' },
  { id: 'i', char: 'І', upper: 'І', lower: 'і', latin: 'I', pronunciation: 'Like "ee" in "feet"' },
  { id: 'yi', char: 'Ї', upper: 'Ї', lower: 'ї', latin: 'Yi', pronunciation: 'Like "yie" in "yield"' },
  { id: 'j', char: 'Й', upper: 'Й', lower: 'й', latin: 'Y', pronunciation: 'Like "y" in "boy"' },
  { id: 'k', char: 'К', upper: 'К', lower: 'к', latin: 'K', pronunciation: 'Like "k" in "kite"' },
  { id: 'l', char: 'Л', upper: 'Л', lower: 'л', latin: 'L', pronunciation: 'Like "l" in "love"' },
  { id: 'm', char: 'М', upper: 'М', lower: 'м', latin: 'M', pronunciation: 'Like "m" in "mom"' },
  { id: 'n', char: 'Н', upper: 'Н', lower: 'н', latin: 'N', pronunciation: 'Like "n" in "no"' },
  { id: 'o', char: 'О', upper: 'О', lower: 'о', latin: 'O', pronunciation: 'Like "o" in "more"' },
  { id: 'p', char: 'П', upper: 'П', lower: 'п', latin: 'P', pronunciation: 'Like "p" in "pot"' },
  { id: 'r', char: 'Р', upper: 'Р', lower: 'р', latin: 'R', pronunciation: 'Trilled "r"' },
  { id: 's', char: 'С', upper: 'С', lower: 'с', latin: 'S', pronunciation: 'Like "s" in "sun"' },
  { id: 't', char: 'Т', upper: 'Т', lower: 'т', latin: 'T', pronunciation: 'Like "t" in "top"' },
  { id: 'u', char: 'У', upper: 'У', lower: 'у', latin: 'U', pronunciation: 'Like "oo" in "moon"' },
  { id: 'f', char: 'Ф', upper: 'Ф', lower: 'ф', latin: 'F', pronunciation: 'Like "f" in "fun"' },
  { id: 'kh', char: 'Х', upper: 'Х', lower: 'х', latin: 'Kh', pronunciation: 'Like "ch" in "loch"' },
  { id: 'ts', char: 'Ц', upper: 'Ц', lower: 'ц', latin: 'Ts', pronunciation: 'Like "ts" in "cats"' },
  { id: 'ch', char: 'Ч', upper: 'Ч', lower: 'ч', latin: 'Ch', pronunciation: 'Like "ch" in "chip"' },
  { id: 'sh', char: 'Ш', upper: 'Ш', lower: 'ш', latin: 'Sh', pronunciation: 'Like "sh" in "ship"' },
  { id: 'shch', char: 'Щ', upper: 'Щ', lower: 'щ', latin: 'Shch', pronunciation: 'Like "sh-ch" in "fresh cheese"' },
  { id: 'soft', char: 'Ь', upper: 'Ь', lower: 'ь', latin: "'", pronunciation: 'Soft sign, softens previous consonant' },
  { id: 'yu', char: 'Ю', upper: 'Ю', lower: 'ю', latin: 'Yu', pronunciation: 'Like "u" in "use"' },
  { id: 'ya', char: 'Я', upper: 'Я', lower: 'я', latin: 'Ya', pronunciation: 'Like "ya" in "yard"' },
];
