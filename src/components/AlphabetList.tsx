import React from 'react';
import { ALPHABET } from '../data/alphabet';
import { LetterTile } from './LetterTile';
import { playSound } from '../utils/audio';

export const AlphabetList: React.FC = () => {
    return (
        <div className="p-4 w-full max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">Абетка (Alphabet)</h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 justify-items-center">
                {ALPHABET.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <LetterTile
                            id={`ref-${item.id}`}
                            char={item.upper}
                            onClick={() => playSound(item.char)}
                            className="hover:scale-105 transition-transform"
                        />
                        <div className="text-sm text-slate-500 font-medium font-mono text-center">
                            <div>{item.char}{item.lower}</div>
                            <div className="text-xs opacity-75">/{item.latin}/</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
