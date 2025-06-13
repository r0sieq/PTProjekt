import React, { useEffect, useRef, useState } from "react";
import './SlotMachineDrum.css';

interface DrumProps {
    spinTo: number;
    defaultPosition: number;
    onEnd?: () => void;
    spinSessionId: number;
};

const SYMBOLS = ["🍒", "🍋", "🍇", "🍉", "💎", "🔥", "💀"];

const Drum: React.FC<DrumProps> = ({ spinTo, defaultPosition, onEnd, spinSessionId }) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(null);
    const startTimeRef = useRef<number>(null);
    const [currentPos, setCurrentPos] = useState(defaultPosition);
    const [, setIsSpinning] = useState(false);
    const [forceAnimation, setForceAnimation] = useState(0);

    const symbolHeight = 100;
    const drumHeight = symbolHeight * 3;
    const baseRotations = 5;
    const duration = 2500;
    
    const symbolBuffer = SYMBOLS.length * 20;
    const repeatedSymbols = Array.from({ length: symbolBuffer }, (_, i) => 
        SYMBOLS[i % SYMBOLS.length]
    );

    const resetToDefault = () => {
        if (innerRef.current) {
            innerRef.current.style.transition = 'none';
            innerRef.current.style.transform = `translateY(${-defaultPosition * symbolHeight}px)`;
        }
        setCurrentPos(defaultPosition);
        setIsSpinning(false);
    };

    const startSpin = () => {
        setIsSpinning(true);
        const visibleSymbolsOffset = SYMBOLS.length * 5;
        
        // Zawsze minimum 1 dodatkowy obrót
        const extraRotations = Math.max(1, Math.floor(Math.random() * 3));
        const totalRotations = baseRotations + extraRotations;
        
        const adjustedStart = currentPos + visibleSymbolsOffset;
        const adjustedEnd = spinTo + visibleSymbolsOffset + SYMBOLS.length * totalRotations;

        const startTranslateY = -adjustedStart * symbolHeight;
        const endTranslateY = -adjustedEnd * symbolHeight;

        const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuint(progress);

            const currentTranslateY = startTranslateY + (endTranslateY - startTranslateY) * easedProgress;

            if (innerRef.current) {
                innerRef.current.style.transform = `translateY(${currentTranslateY}px)`;
            }

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setIsSpinning(false);
                setCurrentPos(spinTo);
                startTimeRef.current = null;
                
                if (innerRef.current) {
                    innerRef.current.style.transition = 'none';
                    innerRef.current.style.transform = `translateY(${-adjustedEnd * symbolHeight}px)`;
                }
                onEnd?.();
            }
        };

        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        
        if (innerRef.current) {
            innerRef.current.style.transition = 'none';
            innerRef.current.style.transform = `translateY(${startTranslateY}px)`;
        }
        
        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (spinTo === -1) {
            resetToDefault();
            return;
        }
        
        // Wymuszamy animację za każdym razem
        setForceAnimation(prev => prev + 1);
        
    }, [spinTo, spinSessionId]);

    useEffect(() => {
        if (forceAnimation > 0) {
            startSpin();
        }
    }, [forceAnimation]);

    useEffect(() => {
        resetToDefault();
    }, []);

    return (
        <div className="drum-container" style={{ height: drumHeight, overflow: "hidden" }}>
            <div 
                ref={innerRef} 
                className="drum-inner" 
                style={{
                    display: "flex", 
                    flexDirection: "column",
                    willChange: 'transform'
                }}
            >
                {repeatedSymbols.map((sym, idx) => (
                    <div 
                        key={`${sym}-${idx}`} 
                        className="drum-symbol" 
                        style={{ 
                            height: symbolHeight, 
                            fontSize: symbolHeight * 0.8, 
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} 
                        aria-hidden="true"
                    >
                        {sym}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Drum;