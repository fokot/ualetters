

export interface SentenceData {
    id: number;
    text: string;
    translation: string;
    words: string[];
}

export const createSentence = (id: number, text: string, translation: string): SentenceData => {
    // Basic word tokenizer (splits by space, removes punctuation)
    const words = text
        .toUpperCase()
        .replace(/[.,!?;:]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 0);

    return {
        id,
        text,
        translation,
        words
    };
};

export const SENTENCES: SentenceData[] = [
    // --- GREETINGS & BASICS ---
    createSentence(1, "ПРИВІТ ЯК ТИ", "Hi, how are you?"),
    createSentence(2, "ДОБРОГО РАНКУ", "Good morning"),
    createSentence(3, "ДОБРИЙ ДЕНЬ", "Good afternoon"),
    createSentence(4, "ДОБРИЙ ВЕЧІР", "Good evening"),
    createSentence(5, "ЯК СПРАВИ", "How are things?"),
    createSentence(6, "МЕНЕ ЗВАТИ АНДРІЙ", "My name is Andrii"), // Example name
    createSentence(7, "ДУЖЕ ПРИЄМНО", "Very nice to meet you"),
    createSentence(8, "ДО ПОБАЧЕННЯ", "Goodbye"),
    createSentence(9, "Я НЕ РОЗУМІЮ", "I don't understand"),
    createSentence(10, "Я НЕ ЗНАЮ", "I don't know"),
    createSentence(11, "ВИ ГОВОРИТЕ АНГЛІЙСЬКОЮ", "Do you speak English?"),
    createSentence(12, "ДЯКУЮ ЗА ДОПОМОГУ", "Thanks for the help"),

    // --- TRAVEL & DIRECTIONS ---
    createSentence(20, "ДЕ ТУАЛЕТ", "Where is the toilet?"),
    createSentence(21, "МЕНІ ПОТРІБНА ДОПОМОГА", "I need help"),
    createSentence(22, "СКІЛЬКИ ЦЕ КОШТУЄ", "How much does this cost?"),
    createSentence(23, "Я ХОЧУ КУПИТИ КВИТОК", "I want to buy a ticket"),
    createSentence(24, "ДЕ ЗНАХОДИТЬСЯ ГОТЕЛЬ", "Where is the hotel located?"),
    createSentence(25, "Я КУДИСЬ ЇДУ", "I am going somewhere"), // Generic
    createSentence(26, "НАЛІВО ЧИ НАПРАВО", "Left or right?"),
    createSentence(27, "ЗУПИНІТЬ ТУТ БУДЬ ЛАСКА", "Stop here please"),
    createSentence(28, "Я ЗАГУБИВСЯ", "I am lost (male)"),
    createSentence(29, "Я ЗАГУБИЛАСЯ", "I am lost (female)"),

    // --- FOOD & DINING ---
    createSentence(40, "Я ХОЧУ ЇСТИ", "I want to eat"),
    createSentence(41, "Я ХОЧУ ПИТИ", "I want to drink"),
    createSentence(42, "МОЖНА МЕНЮ БУДЬ ЛАСКА", "Can I have the menu please?"),
    createSentence(43, "ЦЕ ДУЖЕ СМАЧНО", "This is very tasty"),
    createSentence(44, "Я БУДУ КАВУ", "I will have coffee"),
    createSentence(45, "РАХУНОК БУДЬ ЛАСКА", "The bill please"),
    createSentence(46, "Я НЕ ЇМ М'ЯСО", "I don't eat meat"),
    createSentence(47, "ЩО ТИ РЕКОМЕНДУЄШ", "What do you recommend?"),

    // --- SMALL TALK ---
    createSentence(60, "ЯКА ГАРНА ПОГОДА", "What beautiful weather"),
    createSentence(61, "Я ЛЮБЛЮ УКРАЇНУ", "I love Ukraine"),
    createSentence(62, "ЗВІДКИ ВИ", "Where are you from?"),
    createSentence(63, "ЩО ТИ РОБИШ", "What are you doing?"),
    createSentence(64, "Я ВЧУ УКРАЇНСЬКУ МОВУ", "I am learning the Ukrainian language"),
    createSentence(65, "ЦЕ БУЛО ЦІКАВО", "That was interesting"),
    createSentence(66, "ТИ МАЄШ ЧАС", "Do you have time?"),
    createSentence(67, "Я ЛЮБЛЮ ПОДОРОЖУВАТИ", "I like to travel"),

    // --- EMERGENCIES ---
    createSentence(80, "ВИКЛИЧІТЬ ПОЛІЦІЮ", "Call the police"),
    createSentence(81, "МЕНІ ПОТРІБЕН ЛІКАР", "I need a doctor"),
    createSentence(82, "ДЕ АПТЕКА", "Where is the pharmacy?")
];
