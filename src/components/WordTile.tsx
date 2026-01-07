import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface WordTileProps {
    id: string;
    word: string;
    isDraggable?: boolean;
    dragMode?: 'move' | 'copy';
    onClick?: () => void;
    className?: string;
}

export const WordTile: React.FC<WordTileProps> = ({
    id,
    word,
    isDraggable = false,
    dragMode = 'move',
    onClick,
    className = ''
}) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
        disabled: !isDraggable,
        data: { word, type: 'word' }
    });

    const style = {
        transform: dragMode === 'move' ? CSS.Translate.toString(transform) : undefined,
        opacity: isDragging && dragMode === 'move' ? 0.5 : (isDragging ? 0.8 : 1),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={onClick}
            className={`
        relative flex items-center justify-center font-bold text-slate-800
        px-4 py-2 bg-indigo-50 border-2 border-indigo-200 rounded-lg shadow-sm select-none
        ${isDraggable ? 'cursor-grab touch-none' : 'cursor-pointer'}
        ${isDragging ? 'cursor-grabbing z-50 ring-2 ring-indigo-500' : ''}
        ${className}
      `}
        >
            <span className="text-lg md:text-xl">{word}</span>
        </div>
    );
};
