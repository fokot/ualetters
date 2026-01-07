import { useState, useEffect } from 'react';
import { AlphabetList } from './components/AlphabetList';
import { GameArea } from './components/GameArea';
import { BookOpen, Gamepad2 } from 'lucide-react';

function App() {
  const [mode, setMode] = useState<'learn' | 'game'>('learn');
  const [voiceStatus, setVoiceStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const checkVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return; // Still loading

      const hasUA = voices.some(v => v.lang.includes('uk'));
      setVoiceStatus(hasUA ? 'success' : 'error');
    };

    checkVoice();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = checkVoice;
    }

    // Fallback if voices never load (some browsers)
    const timer = setTimeout(() => {
      if (window.speechSynthesis.getVoices().length === 0) {
        // Assuming checking failed or no voices, but let's try one last check
        const voices = window.speechSynthesis.getVoices();
        const hasUA = voices.some(v => v.lang.includes('uk'));
        setVoiceStatus(hasUA ? 'success' : 'error');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (voiceStatus === 'loading') {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Завантаження голосів... (Loading voices...)</div>;
  }

  if (voiceStatus === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center gap-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
        <div className="text-4xl">⚠️</div>
        <h1 className="text-2xl font-bold">Український голос не знайдено (Ukrainian voice not found)</h1>
        <p className="max-w-md">
          Ця гра потребує українського голосу синтезу мовлення для роботи. Будь ласка, перевірте налаштування вашого пристрою та встановіть українську мову.
          <br /><br />
          (This game requires a Ukrainian Text-to-Speech voice to function. Please check your device settings and install Ukrainian language pack.)
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 flex items-center justify-center px-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
          UA Letters
        </h1>
      </header>

      <main className="pt-24 px-4">
        {mode === 'learn' ? <AlphabetList /> : <GameArea />}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 flex gap-2 z-50">
        <button
          onClick={() => setMode('learn')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${mode === 'learn'
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-bold'
            : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
        >
          <BookOpen size={20} />
          <span>Вчити (Learn)</span>
        </button>
        <button
          onClick={() => setMode('game')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${mode === 'game'
            ? 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 font-bold'
            : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
        >
          <Gamepad2 size={20} />
          <span>Грати (Play)</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
