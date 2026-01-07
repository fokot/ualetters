export type WordData = {
    id: string;
    word: string;
    missingIndex: number;
    translation: string;
};

// Helper to create word entry
const createWord = (id: number, word: string, translation: string, missingIndex?: number): WordData => {
    // If no missing index provided, pick random one (but not first letter if possible, or just random)
    const idx = missingIndex !== undefined ? missingIndex : Math.floor(Math.random() * word.length);
    return { id: id.toString(), word, missingIndex: idx, translation };
};

export const WORDS: WordData[] = [
    // Family & People
    createWord(1, "МАМА", "Mother"),
    createWord(2, "ТАТО", "Father"),
    createWord(3, "БРАТ", "Brother"),
    createWord(4, "СЕСТРА", "Sister"),
    createWord(5, "ДІД", "Grandfather"),
    createWord(6, "БАБА", "Grandmother"),
    createWord(7, "ДРУГ", "Friend"),
    createWord(8, "СІМ'Я", "Family"),
    createWord(9, "ЛЮДИНА", "Human/Person"),
    createWord(10, "ДИТИНА", "Child"),

    // Nature
    createWord(11, "СОНЦЕ", "Sun"),
    createWord(12, "МІСЯЦЬ", "Moon"),
    createWord(13, "ЗОРЯ", "Star"),
    createWord(14, "НЕБО", "Sky"),
    createWord(15, "ХМАРА", "Cloud"),
    createWord(16, "ДОЩ", "Rain"),
    createWord(17, "СНІГ", "Snow"),
    createWord(18, "ВІТЕР", "Wind"),
    createWord(19, "ДЕРЕВО", "Tree"),
    createWord(20, "КВІТКА", "Flower"),
    createWord(21, "ЛІС", "Forest"),
    createWord(22, "РІЧКА", "River"),
    createWord(23, "МОРЕ", "Sea"),
    createWord(24, "ГОРА", "Mountain"),

    // Animals
    createWord(25, "КІТ", "Cat"),
    createWord(26, "ПЕС", "Dog"),
    createWord(27, "ПТАХ", "Bird"),
    createWord(28, "РИБА", "Fish"),
    createWord(29, "КІНЬ", "Horse"),
    createWord(30, "КОРОВА", "Cow"),

    // Home & Objects
    createWord(31, "ДІМ", "House"),
    createWord(32, "ХАТА", "House (rural)"),
    createWord(33, "СТІЛ", "Table"),
    createWord(34, "СТІЛЕЦЬ", "Chair"),
    createWord(35, "ВІКНО", "Window"),
    createWord(36, "ДВЕРІ", "Door"),
    createWord(37, "ЛІЖКО", "Bed"),
    createWord(38, "КНИГА", "Book"),
    createWord(39, "РУЧКА", "Pen"),
    createWord(40, "ТЕЛЕФОН", "Phone"),
    createWord(41, "МАШИНА", "Car"),
    createWord(42, "АВТОБУС", "Bus"),

    // Food
    createWord(43, "ХЛІБ", "Bread"),
    createWord(44, "ВОДА", "Water"),
    createWord(45, "МОЛОКО", "Milk"),
    createWord(46, "ЯБЛУКО", "Apple"),
    createWord(47, "БОРЩ", "Borsch"),
    createWord(48, "М'ЯСО", "Meat"),
    createWord(49, "СІК", "Juice"),
    createWord(50, "ЧАЙ", "Tea"),
    createWord(51, "КАВА", "Coffee"),

    // Body
    createWord(52, "ОКО", "Eye"),
    createWord(53, "НІС", "Nose"),
    createWord(54, "РОТ", "Mouth"),
    createWord(55, "ВУХО", "Ear"),
    createWord(56, "РУКА", "Hand"),
    createWord(57, "НОГА", "Leg"),
    createWord(58, "ГОЛОВА", "Head"),

    // Verbs (Infinitive or common forms useful for simple sentences)
    createWord(59, "ЧИТАТИ", "To read"),
    createWord(60, "ПИСАТИ", "To write"),
    createWord(61, "ЇСТИ", "To eat"),
    createWord(62, "ПИТИ", "To drink"),
    createWord(63, "СПАТИ", "To sleep"),
    createWord(64, "ЙТИ", "To go (walk)"),
    createWord(65, "ЛЮБИТИ", "To love"),
    createWord(66, "ЗНАТИ", "To know"),
    createWord(67, "БАЧИТИ", "To see"),
    createWord(68, "ХОТІТИ", "To want"),
    createWord(69, "МАТИ", "To have"),
    createWord(70, "ЖИТИ", "To live"),

    // Pronouns & Common Words for Sentences
    createWord(71, "Я", "I"),
    createWord(72, "ТИ", "You"),
    createWord(73, "ВІН", "He"),
    createWord(74, "ВОНА", "She"),
    createWord(75, "МИ", "We"),
    createWord(76, "ВОНИ", "They"),
    createWord(77, "ЦЕ", "This is"),
    createWord(78, "ТУТ", "Here"),
    createWord(79, "ТАМ", "There"),
    createWord(80, "ДЕ", "Where"),

    // Adjectives / Adverbs
    createWord(81, "ДОБРЕ", "Good/Well"),
    createWord(82, "ПОГАНО", "Bad"),
    createWord(83, "ВЕЛИКИЙ", "Big"),
    createWord(84, "МАЛИЙ", "Small"),
    createWord(85, "НОВИЙ", "New"),
    createWord(86, "СТАРИЙ", "Old"),
    createWord(87, "ГАРНИЙ", "Beautiful"),
    createWord(88, "БІЛИЙ", "White"),
    createWord(89, "ЧОРНИЙ", "Black"),
    createWord(90, "ЧЕРВОНИЙ", "Red"),

    // Time
    createWord(91, "ДЕНЬ", "Day"),
    createWord(92, "НІЧ", "Night"),
    createWord(93, "РАНОК", "Morning"),
    createWord(94, "СЬОГОДНІ", "Today"),
    createWord(95, "ЗАВТРА", "Tomorrow"),

    // Places
    createWord(96, "ШКОЛА", "School"),
    createWord(97, "РОБОТА", "Work"),
    createWord(98, "МІСТО", "City"),
    createWord(99, "СЕЛО", "Village"),
    createWord(100, "УКРАЇНА", "Ukraine"),
    createWord(101, "КИЇВ", "Kyiv"),
];
