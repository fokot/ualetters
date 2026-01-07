import { useState, useEffect } from 'react';
import { DndContext, useDroppable, type DragEndEvent, TouchSensor, MouseSensor, useSensor, useSensors, DragOverlay, type DragStartEvent } from '@dnd-kit/core';
import { LetterTile } from './LetterTile';
import { WORDS } from '../data/words';
import { SENTENCES } from '../data/sentences';
import { ALPHABET } from '../data/alphabet';
import { playSound } from '../utils/audio';
import { transliterate } from '../utils/text';
import { RefreshCw, Play, Wand2 } from 'lucide-react';

type GameMode = 'letters' | 'words' | 'sentences';

// --- SLOTS ---

const LetterSlot = ({ char, index, isMissing, filledChar, isSelected, onSelect }:
    { char: string, index: number, isMissing: boolean, filledChar: string | null, isSelected: boolean, onSelect: () => void }) => {

    const { setNodeRef, isOver } = useDroppable({
        id: `slot-${index}`,
        disabled: !isMissing || filledChar !== null,
        data: { index, type: 'letter' }
    });

    if (!isMissing) {
        return (
            <LetterTile id={`static-${index}`} char={char} className="bg-slate-100 dark:bg-slate-700 !cursor-default" />
        );
    }

    return (
        <div
            ref={setNodeRef}
            onClick={!filledChar ? onSelect : undefined}
            className={`
        relative flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer
        ${isOver ? 'bg-indigo-100 ring-2 ring-indigo-400 scale-105' : 'bg-slate-50 dark:bg-slate-800 ring-2 ring-dashed'}
        ${isSelected ? 'ring-indigo-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 shadow-md transform scale-105' : 'ring-slate-300'}
        ${filledChar ? '!ring-green-500 !bg-green-50 !ring-offset-0 !shadow-none !scale-100' : ''}
        w-14 h-14 md:w-20 md:h-20
      `}
        >
            {filledChar ? (
                <LetterTile id={`filled-${index}`} char={filledChar} className="!bg-green-500 !text-white !border-green-600 shadow-sm" />
            ) : (
                <span className={`text-3xl font-bold ${isSelected ? 'text-indigo-400' : 'text-slate-300'}`}>?</span>
            )}
        </div>
    );
};

// --- MAIN GAME AREA ---

export const GameArea: React.FC = () => {
    const [gameMode, setGameMode] = useState<GameMode>('letters'); // Default to 'Letters' (Easy)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

    // State for Words/Letters (Unified for Sentences too)
    // For sentences, index is a global flattened index of all letters
    const [filledSlots, setFilledSlots] = useState<Record<number, string>>({});
    const [missingIndices, setMissingIndices] = useState<number[]>([]);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

    const [activeDragId, setActiveDragId] = useState<string | null>(null);
    const [activeDragData, setActiveDragData] = useState<{ char?: string } | null>(null);

    // Helper to shuffle
    const shuffleArray = (array: number[]) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    // Initialize/Reset Shuffled Indices on Mode Change
    useEffect(() => {
        const total = gameMode === 'sentences' ? SENTENCES.length : WORDS.length;
        const indices = Array.from({ length: total }, (_, i) => i);
        setShuffledIndices(shuffleArray(indices));
        setCurrentIndex(0);
    }, [gameMode]);

    // Handle reshuffle if we went past the end
    useEffect(() => {
        const total = gameMode === 'sentences' ? SENTENCES.length : WORDS.length;
        if (currentIndex >= total && total > 0) {
            // Reshuffle and restart
            const indices = Array.from({ length: total }, (_, i) => i);
            setShuffledIndices(shuffleArray(indices));
            setCurrentIndex(0);
        }
    }, [currentIndex, gameMode]);

    // Derived Data
    // Guard against empty shuffle array on first render
    const safeIndex = shuffledIndices.length > 0 ? shuffledIndices[currentIndex % shuffledIndices.length] : 0;

    const currentWordData = WORDS[safeIndex];
    const currentSentenceData = SENTENCES[safeIndex]; // If sentence mode

    // -----------------------------------------------------
    // LOGIC: Reset & Setup
    // -----------------------------------------------------
    useEffect(() => {
        setFilledSlots({});
        setSelectedSlotIndex(null);
        setMissingIndices([]);

        if (gameMode === 'letters') {
            const len = currentWordData.word.length;
            // 1 missing letter logic
            let missingIdx = currentWordData.missingIndex;
            if (missingIdx >= len) missingIdx = Math.floor(Math.random() * len);

            setMissingIndices([missingIdx]);
            // Auto Select
            setTimeout(() => setSelectedSlotIndex(missingIdx), 50);

        } else if (gameMode === 'words') {
            // All letters missing
            const len = currentWordData.word.length;
            const missing = Array.from({ length: len }, (_, i) => i);
            setMissingIndices(missing);
            // Auto Select first
            setTimeout(() => setSelectedSlotIndex(0), 50);

        } else if (gameMode === 'sentences') {
            // Flatten sentence into character slots
            // Calculate total length
            const totalChars = currentSentenceData.words.reduce((acc, word) => acc + word.length, 0);
            const missing = Array.from({ length: totalChars }, (_, i) => i);
            setMissingIndices(missing);

            // Auto select first slot
            setTimeout(() => setSelectedSlotIndex(0), 50);
        }

        setActiveDragId(null);
    }, [gameMode, currentIndex, shuffledIndices]); // Re-run when shuffle changes or index changes

    // -----------------------------------------------------
    // LOGIC: Completion
    // -----------------------------------------------------
    const getTargetString = () => {
        if (gameMode === 'sentences') {
            return currentSentenceData.words.join('');
        }
        return currentWordData.word;
    };

    const isComplete = missingIndices.length > 0 && missingIndices.every(idx => filledSlots[idx] === getTargetString()[idx]);

    useEffect(() => {
        if (isComplete) {
            const textToSay = gameMode === 'sentences' ? currentSentenceData.text : currentWordData.word;
            playSound(textToSay);
            setSelectedSlotIndex(null);
        }
    }, [isComplete]);


    // -----------------------------------------------------
    // DND HANDLERS
    // -----------------------------------------------------
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveDragId(event.active.id as string);
        setActiveDragData(event.active.data.current as any);
    };

    const handleAttemptFill = (char: string, index: number) => {
        const targetStr = getTargetString();
        const targetChar = targetStr[index];

        if (char === targetChar) {
            setFilledSlots(prev => ({ ...prev, [index]: char }));
            // playSound(char); // Quiet on success
            autoSelectNextSlot(index);
        } else {
            playSound(char); // Say the clicked letter on error
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { over, active } = event;
        setActiveDragId(null);
        setActiveDragData(null);

        if (!over) return;

        const slotIdStr = String(over.id);
        if (!slotIdStr.startsWith('slot-')) return;

        const slotIndex = parseInt(slotIdStr.replace('slot-', ''), 10);
        const { char } = active.data.current || {};

        if (char) {
            handleAttemptFill(char, slotIndex);
            // Select slot if failed to provide feedback/retry? 
            // Logic in handleAttemptFill handles success/fail. 
            // We can optionally select the target slot here if drag failed.
            if (char !== getTargetString()[slotIndex]) {
                // But only if it's not already filled?
                // Actually maybe just let user click.
            }
        }
    };

    const autoSelectNextSlot = (filledIndex: number) => {
        // Find next missing slot
        const allMissing = [...missingIndices].sort((a, b) => a - b);
        const remaining = allMissing.filter(i => i !== filledIndex && !filledSlots[i]);
        if (remaining.length > 0) {
            const next = remaining.find(i => i > filledIndex) ?? remaining[0];
            setSelectedSlotIndex(next);
        } else {
            setSelectedSlotIndex(null);
        }
    };

    const handlePaletteClick = (item: string) => {
        // item is always char now
        if (selectedSlotIndex === null) {
            playSound(item);
            return;
        }

        handleAttemptFill(item, selectedSlotIndex);
    };

    const nextLevel = () => {
        setCurrentIndex(prev => prev + 1);
    };

    const handleSolve = () => {
        const targetStr = getTargetString();
        const newFilled = { ...filledSlots };
        missingIndices.forEach(idx => {
            newFilled[idx] = targetStr[idx];
        });
        setFilledSlots(newFilled);
    };

    // Helper to render sentence mode slots
    const renderSentenceSlots = () => {
        let globalIdx = 0;
        return (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 px-2">
                {currentSentenceData.words.map((word, wIdx) => {
                    const wordNodes = word.split('').map((char, cIdx) => {
                        const currentIdx = globalIdx;
                        globalIdx++; // Increment for next inner loop
                        return (
                            <LetterSlot
                                key={`s-${wIdx}-${cIdx}`}
                                char={char}
                                index={currentIdx}
                                isMissing={true} // In sentence mode, all are missing
                                filledChar={filledSlots[currentIdx] || null}
                                isSelected={selectedSlotIndex === currentIdx}
                                onSelect={() => setSelectedSlotIndex(currentIdx)}
                            />
                        );
                    });

                    return (
                        <div key={wIdx} className="flex gap-1.5 p-1 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-dotted border-slate-300 dark:border-slate-700">
                            {wordNodes}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="flex flex-col items-center gap-6 py-4 w-full max-w-4xl mx-auto min-h-[calc(100vh-100px)]">

                {/* Mode Selector */}
                <div className="flex items-center justify-between w-full px-4">
                    <div className="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-1 gap-1 overflow-x-auto max-w-[70vw]">
                        <button onClick={() => setGameMode('letters')} className={`whitespace-nowrap px-4 py-1.5 rounded-md text-sm font-bold transition-all ${gameMode === 'letters' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}>
                            Letters
                        </button>
                        <button onClick={() => setGameMode('words')} className={`whitespace-nowrap px-4 py-1.5 rounded-md text-sm font-bold transition-all ${gameMode === 'words' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}>
                            Words
                        </button>
                        <button onClick={() => setGameMode('sentences')} className={`whitespace-nowrap px-4 py-1.5 rounded-md text-sm font-bold transition-all ${gameMode === 'sentences' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}>
                            Sentences
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm font-mono">#{currentIndex + 1}</span>
                        <button onClick={handleSolve} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-500" title="Solve">
                            <Wand2 size={24} />
                        </button>
                        <button onClick={() => playSound(gameMode === 'sentences' ? currentSentenceData.text : currentWordData.word)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                            <Play size={24} />
                        </button>
                        <button onClick={nextLevel} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-indigo-500" title="Skip">
                            <RefreshCw size={24} />
                        </button>
                    </div>
                </div>

                {/* --- DISPLAY AREA --- */}

                {/* 1) LETTERS / WORDS */}
                {gameMode !== 'sentences' && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex flex-wrap justify-center gap-2 p-6 min-h-[140px] items-center">
                            {currentWordData.word.split('').map((char, idx) => (
                                <LetterSlot
                                    key={idx}
                                    char={char}
                                    index={idx}
                                    isMissing={missingIndices.includes(idx)}
                                    filledChar={filledSlots[idx] || null}
                                    isSelected={selectedSlotIndex === idx}
                                    onSelect={() => setSelectedSlotIndex(idx)}
                                />
                            ))}
                        </div>
                        <div className="text-xl font-medium text-slate-500 flex flex-col items-center gap-1">
                            <span>{currentWordData.translation}</span>
                            <span className="text-sm font-mono opacity-60">/{transliterate(currentWordData.word)}/</span>
                        </div>
                    </div>
                )}

                {/* 2) SENTENCES (Letter Based) */}
                {gameMode === 'sentences' && (
                    <div className="flex flex-col items-center gap-4 w-full">
                        {renderSentenceSlots()}
                        <div className="text-xl font-medium text-slate-500 text-center px-4 mt-4 flex flex-col items-center gap-1">
                            <span>{currentSentenceData.translation}</span>
                            <span className="text-sm font-mono opacity-60">/{transliterate(currentSentenceData.text)}/</span>
                        </div>
                    </div>
                )}


                {/* SUCCESS */}
                {isComplete && (
                    <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center gap-4 my-4">
                        <div className="text-green-500 font-bold text-2xl">Чудово! (Great!)</div>
                        <button
                            onClick={nextLevel}
                            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full shadow-lg font-bold text-lg"
                        >
                            <RefreshCw size={24} className={isComplete ? "animate-spin-once" : ""} /> Далі (Next)
                        </button>
                    </div>
                )}

                {/* --- SOURCE PALETTE --- */}

                {!isComplete && (
                    <div className="grow w-full flex flex-col mt-4">
                        <div className="text-center text-slate-400 text-sm mb-2 uppercase tracking-widest font-semibold">
                            {'Перетягни або Клікни (Drag or Click)'}
                        </div>

                        <div className="flex-1 overflow-y-auto min-h-[200px] border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-t-3xl p-4 shadow-inner">
                            {/* ALPHABET (Infinite) - Used for ALL modes now */}
                            <div className="flex flex-wrap justify-center gap-3 pb-20">
                                {ALPHABET.map((letter) => (
                                    <LetterTile
                                        key={letter.id}
                                        id={`source-${letter.id}`}
                                        char={letter.upper}
                                        isDraggable={true}
                                        dragMode="copy"
                                        onClick={() => handlePaletteClick(letter.upper)}
                                        size="md"
                                        className="hover:shadow-lg hover:-translate-y-1 transition-all bg-white"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <DragOverlay>
                    {activeDragId ? (
                        <LetterTile
                            id="overlay-letter"
                            char={activeDragData?.char || '?'}
                            size="md"
                            className="shadow-2xl scale-110 rotate-3 cursor-grabbing"
                        />
                    ) : null}
                </DragOverlay>

            </div>
        </DndContext>
    );
};
