import { useRef, useState } from "react";

import './CustomSlider.css'

interface CustomSliderProps {
    readonly min?: number,
    readonly max?: number,
    readonly roundTo?: number,
    readonly defaultValue?: number, 
    onChange?: (value: number) => void;
    onSet?: (value: number) => void;
}

export default function CustomSlider(props: CustomSliderProps){

    const min = props.min ?? 0;
    const max = props.max ?? 100;
    const roundTo = props.roundTo ?? 0;
    const defaultValue = props.defaultValue ?? min;

    const trackRef = useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = useState<number>(defaultValue);

    function roundValue(value: number){
        if(roundTo > 0) return Math.round(value / roundTo) * roundTo;
        return value;
    }

    function calculateValue(clientX: number){
        const track = trackRef.current;
        if(!track) return min;
        const rect = track.getBoundingClientRect();
        const rx = Math.min(Math.max(clientX - rect.left, 0), rect.width);
        const percentage = rx / rect.width;
        const rawValue = min + (max - min) * percentage;
        return Math.min(max, Math.max(min, roundValue(rawValue)));
    }

    function handleMove(e: MouseEvent){
        const newValue = calculateValue(e.clientX);
        setInternalValue(newValue);
        props.onChange && props.onChange(newValue);
    }

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>){
        const newValue = calculateValue(e.clientX);
        setInternalValue(newValue);
        props.onChange && props.onChange(newValue);
        const moveListener = (moveEvent: MouseEvent) => handleMove(moveEvent);
        const upListener = (upEvent: MouseEvent) => {
            const finalValue = calculateValue(upEvent.clientX);
            setInternalValue(finalValue);
            props.onSet && props.onSet(finalValue);
            document.removeEventListener("mousemove", moveListener);
            document.removeEventListener("mouseup", upListener);
        }

        document.addEventListener("mousemove", moveListener);
        document.addEventListener("mouseup", upListener);
    }

    function generateMarks(){
        if(roundTo === 0) return [];
        const marks = [];
        for(let i = min; i < max; i += roundTo){
            const percentage = ((i - min) / (max - min)) * 100;
            marks.push(percentage);
        }
        return marks;
    }

    const CSSPosition = `${((internalValue - min) / (max - min)) * 100}%`;

    return (
        <div className="custom-slider" onMouseDown={handleMouseDown}>
            <div ref={trackRef} className="custom-slider-track">
                {generateMarks().map((mark, index) => <div className="slider-mark" key={index} style={{left: `${mark}%`}}></div>)}
                <div className="custom-slider-thumb" style={{ width: CSSPosition }}></div>
            </div>
        </div>
    )
}