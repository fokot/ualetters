export const playSound = (text: string, lang: string = 'uk-UA') => {
    if (!window.speechSynthesis) return;

    // Hack to prevent reading "Capital letter..."
    const textToPlay = text.length === 1 ? `_${text}` : text;
    const utterance = new SpeechSynthesisUtterance(textToPlay);
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for clarity

    // Try to find a Ukrainian voice specifically if possible
    const voices = window.speechSynthesis.getVoices();
    const uaVoice = voices.find(v => v.lang.includes('uk'));
    if (uaVoice) {
        utterance.voice = uaVoice;
    }

    window.speechSynthesis.cancel(); // Stop previous
    window.speechSynthesis.speak(utterance);
};
