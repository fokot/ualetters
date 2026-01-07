export type SentenceData = {
    id: string;
    text: string;
    translation: string;
    words: string[]; // Ordered list of words
};

export const SENTENCES: SentenceData[] = [
    { id: '1', text: "МАМА ЛЮБИТЬ ТАТА", translation: "Mom loves dad", words: ["МАМА", "ЛЮБИТЬ", "ТАТА"] },
    { id: '2', text: "Я ЛЮБЛЮ УКРАЇНУ", translation: "I love Ukraine", words: ["Я", "ЛЮБЛЮ", "УКРАЇНУ"] },
    { id: '3', text: "ЦЕ МІЙ ДІМ", translation: "This is my house", words: ["ЦЕ", "МІЙ", "ДІМ"] },
    { id: '4', text: "КІТ П'Є МОЛОКО", translation: "The cat drinks milk", words: ["КІТ", "П'Є", "МОЛОКО"] },
    { id: '5', text: "МИ ЙДЕМО В ШКОЛУ", translation: "We go to school", words: ["МИ", "ЙДЕМО", "В", "ШКОЛУ"] },
    { id: '6', text: "СЬОГОДНІ ГАРНИЙ ДЕНЬ", translation: "Today is a beautiful day", words: ["СЬОГОДНІ", "ГАРНИЙ", "ДЕНЬ"] },
    { id: '7', text: "ДЕ ТВОЯ КНИГА", translation: "Where is your book?", words: ["ДЕ", "ТВОЯ", "КНИГА"] },
    { id: '8', text: "ВІН ЧИТАЄ КНИГУ", translation: "He is reading a book", words: ["ВІН", "ЧИТАЄ", "КНИГУ"] },
    { id: '9', text: "СОНЦЕ СВІТИТЬ", translation: "The sun is shining", words: ["СОНЦЕ", "СВІТИТЬ"] },
    { id: '10', text: "Я БАЧУ ПТАХА", translation: "I see a bird", words: ["Я", "БАЧУ", "ПТАХА"] },
    { id: '11', text: "ТУТ Є ВОДА", translation: "There is water here", words: ["ТУТ", "Є", "ВОДА"] },
    { id: '12', text: "ЦЕ ВЕЛИКЕ МІСТО", translation: "This is a big city", words: ["ЦЕ", "ВЕЛИКЕ", "МІСТО"] },
    { id: '13', text: "ВОНА МАЄ МАШИНУ", translation: "She has a car", words: ["ВОНА", "МАЄ", "МАШИНУ"] },
    { id: '14', text: "Я ХОЧУ ЇСТИ", translation: "I want to eat", words: ["Я", "ХОЧУ", "ЇСТИ"] },
    { id: '15', text: "ДОБРОГО РАНКУ", translation: "Good morning", words: ["ДОБРОГО", "РАНКУ"] },
];
