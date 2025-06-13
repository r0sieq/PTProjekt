import './GlobalError.css'

import { createPortal } from "react-dom";
import useGlobalError, { GlobalErrorItem } from "../../hooks/useGlobalError";
import { useEffect, useState } from 'react';

const portal = document.getElementById("global-error-portal")!;

interface RenderedError extends GlobalErrorItem {
    readonly expired: boolean
}

const ERROR_FADING_AWAY_TIME = 300;

export default function GlobalErrors(){

    const { errors } = useGlobalError()
    const [ renderedErrors, setRenderedErrors ] = useState<RenderedError[]>([]);

    useEffect(() => {
        setRenderedErrors(prev => {
            const stillActiveIds = errors.map(e => e.id);
            const updated = prev.map(err => ({
                ...err,
                expired: !stillActiveIds.includes(err.id),
            }));

            const newErrors = errors.filter(e => !prev.some(p => p.id === e.id)).map(e => ({
                id: e.id,
                message: e.message,
                expired: false,
            }));

            return [...newErrors, ...updated];
        });
    }, [errors])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRenderedErrors(prev => prev.filter(e => !e.expired));
        }, ERROR_FADING_AWAY_TIME);
        return () => clearTimeout(timeout);
    }, [renderedErrors]);

    return createPortal(
        <div className="global-errors">
            {renderedErrors.map((error, i) => (
                <div className="global-error" style={{bottom: `${70 * i}px`}} key={error.id} data-expired={error.expired || false}>
                    {error.message}
                </div>
            ))}
        </div>
    , portal)
}