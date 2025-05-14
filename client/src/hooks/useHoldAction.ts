import { useRef } from "react";

export default function useHoldAction(action: () => void, delay = 100){
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = () => {
        action();
        stop();
        intervalRef.current = setInterval(action, delay);
    }

    const stop = () => {
        if(intervalRef.current){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    return { start, stop }
}