import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface LetterTileProps {
    id: string; // Unique ID for drag and drop
    char: string;
    size?: 'sm' | 'md' | 'lg';
    isDraggable?: boolean;
    dragMode?: 'move' | 'copy'; // 'move' = standard, 'copy' = stays in place (for palette)
    onClick?: () => void;
    className?: string;
    count?: number; // Like scrabble points, optional
}

export const LetterTile: React.FC<LetterTileProps> = ({
    id,
    char,
    size = 'md',
    isDraggable = false,
    dragMode = 'move',
    onClick,
    className = '',
    count
}) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
        disabled: !isDraggable,
        data: { char }
    });

    const style = {
        // If 'copy' mode, we DON'T apply transform to the source element, so it stays visualy in place.
        // The visual dragging will be handled by a global DragOverlay in the parent.
        transform: dragMode === 'move' ? CSS.Translate.toString(transform) : undefined,
        opacity: isDragging && dragMode === 'move' ? 0.5 : (isDragging ? 0.8 : 1), // Slight dim if copying
    };

    const sizeClasses = {
        sm: 'w-10 h-10 text-lg',
        md: 'w-14 h-14 text-2xl',
        lg: 'w-20 h-20 text-4xl',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={onClick}
            className={`
        tile-base relative flex items-center justify-center font-bold text-slate-800
        ${sizeClasses[size]}
        ${isDraggable ? 'cursor-grab touch-none' : 'cursor-pointer'}
        ${isDragging ? 'cursor-grabbing z-50' : ''}
        ${className}
      `}
        >
            <span className="relative -top-0.5">{char}</span>
            {count !== undefined && (
                <span className="absolute bottom-1 right-1 text-[0.6em] font-normal text-slate-500 opacity-60 leading-none">
                    {count}
                </span>
            )}
        </div>
    );
};
