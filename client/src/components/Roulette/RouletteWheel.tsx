

import './RouletteWheel.css'

import { useEffect, useRef, useState } from 'react';

const ROULETTE_NUMBERS = [
    0, 32, 15, 19, 4, 21, 2,
    25, 17, 34, 6, 27,
    13, 36, 11, 30, 8,
    23, 10, 5, 24, 16,
    33, 1, 20, 14, 31,
    9, 22, 18, 29, 7,
    28, 12, 35, 3, 26
];

interface RouletteWheelProps {
    readonly spinTo: number; // -1 to idle
    readonly defaultPosition: number;
    readonly onEnd: () => void;
}

const SPIN_CYCLES = 3;
const NUMBER_WIDTH = 100;
const OFFSET_VARIATION = 15;

export default function RouletteWheel({ spinTo, defaultPosition, onEnd }: RouletteWheelProps) {
    const [, setPosition] = useState(defaultPosition);
    const numbersRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const repeated = SPIN_CYCLES + 5; // +1 to be safe
    const repeatedNumbers = Array(repeated).fill(ROULETTE_NUMBERS).flat();
    const baseIndex = Math.floor(repeated / 2) * ROULETTE_NUMBERS.length;

    const getFinalTranslateX = (index: number, offsetVariation: number) => {
        const wheelWidth = numbersRef.current?.parentElement?.offsetWidth || 0;
        const centerOffset = wheelWidth / 2 - NUMBER_WIDTH / 2;
        return getOffset(index) - offsetVariation - centerOffset;
    }

    useEffect(() => {
        if (!numbersRef.current) return;

        const numbersDiv = numbersRef.current;

        if (spinTo === -1) {
            const randomIndex = baseIndex + Math.floor(Math.random() * ROULETTE_NUMBERS.length);
            const offset = randomOffset();
            const finalTranslateX = getFinalTranslateX(randomIndex, offset);
            numbersDiv.style.transition = 'none';
            numbersDiv.style.transform = `translateX(-${finalTranslateX}px)`;
            setPosition(randomIndex % ROULETTE_NUMBERS.length);
            return;
        }

        // dalej w przypadku spinTo !== -1
        const currentNumber = repeatedNumbers[baseIndex];
        const currentLocalIndex = ROULETTE_NUMBERS.findIndex(n => n === currentNumber);
        const targetLocalIndex = ROULETTE_NUMBERS.findIndex(n => n === spinTo);

        if (currentLocalIndex === -1 || targetLocalIndex === -1) return;

        const distanceInNumbers = SPIN_CYCLES * ROULETTE_NUMBERS.length + ((targetLocalIndex - currentLocalIndex + ROULETTE_NUMBERS.length) % ROULETTE_NUMBERS.length);
        const targetIndex = baseIndex + distanceInNumbers;

        const randomOffsetPx = randomOffset();
        const finalTranslateX = getFinalTranslateX(targetIndex, randomOffsetPx);

        requestAnimationFrame(() => {
            numbersDiv.style.transition = 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
            numbersDiv.style.transform = `translateX(-${finalTranslateX}px)`;
        });

        if (animationRef.current) clearTimeout(animationRef.current);
        animationRef.current = setTimeout(() => {
            setPosition(targetLocalIndex);
            onEnd?.();
        }, 4000);
    }, [spinTo]);

    const getOffset = (index: number) => index * NUMBER_WIDTH;

    const randomOffset = () => {
        return Math.floor(Math.random() * OFFSET_VARIATION * 2) - OFFSET_VARIATION;
    };

    useEffect(() => {
        if (!numbersRef.current) return;

        const numbersDiv = numbersRef.current;

        if (defaultPosition === -1) {
            // losowa pozycja na start
            const randomIndex = baseIndex + Math.floor(Math.random() * ROULETTE_NUMBERS.length);
            const offset = randomOffset();
            const finalTranslateX = getFinalTranslateX(randomIndex, offset);
            numbersDiv.style.transition = 'none';
            numbersDiv.style.transform = `translateX(-${finalTranslateX}px)`;
            setPosition(randomIndex % ROULETTE_NUMBERS.length);
        } else {
            // ustawiamy defaultPosition dokładnie pod wskaźnik
            const targetLocalIndex = ROULETTE_NUMBERS.findIndex(n => n === defaultPosition);
            if (targetLocalIndex === -1) return;

            const targetIndex = baseIndex + targetLocalIndex;
            const offset = randomOffset();
            const finalTranslateX = getFinalTranslateX(targetIndex, offset);
            numbersDiv.style.transition = 'none';
            numbersDiv.style.transform = `translateX(-${finalTranslateX}px)`;
            setPosition(targetLocalIndex);
        }
    }, [defaultPosition]);

    return (
        <div className="roulette-wheel">
            <div className="indicator" />
            <div className="numbers" ref={numbersRef}>
                {repeatedNumbers.map((number, i) => (
                    <div
                        className="number"
                        key={`${i}-${number}`}
                        data-color={number === 0 ? null : (ROULETTE_NUMBERS.findIndex(n => n === number) % 2 === 0 ? "black" : "red")}
                    >
                        {number}
                    </div>
                ))}
            </div>
        </div>
    );
}
