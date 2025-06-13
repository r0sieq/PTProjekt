import React, {
    createContext,
    useContext,
    useCallback,
    useState,
    useRef,
    useEffect,
    ReactNode,
    FC,
} from "react";

export type GlobalErrorItem = {
    id: string;
    message: ReactNode | string;
};

type GlobalErrorContextType = {
    errors: GlobalErrorItem[];
    addError: (message: ReactNode | string, timeout: number, id?: string) => void;
    clearErrors: () => void;
};

const GlobalErrorContext = createContext<GlobalErrorContextType | undefined>(undefined);

export const GlobalErrorProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [errors, setErrors] = useState<GlobalErrorItem[]>([]);
    const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

    const removeError = useCallback((id: string) => {
        setErrors(prev => prev.filter(error => error.id !== id));
        if (timeoutRefs.current[id]) {
        clearTimeout(timeoutRefs.current[id]);
        delete timeoutRefs.current[id];
        }
    }, []);

    const addError = useCallback((message: ReactNode | string, timeout: number, id?: string) => {
        const errorId = id ?? `${Date.now()}-${Math.random()}`;

        setErrors(prev => {
        const filtered = prev.filter(error => error.id !== errorId);
        return [{ id: errorId, message }, ...filtered];
        });

        if (timeoutRefs.current[errorId]) {
        clearTimeout(timeoutRefs.current[errorId]);
        }

        timeoutRefs.current[errorId] = setTimeout(() => {
        removeError(errorId);
        }, timeout * 1000);
    }, [removeError]);

    const clearErrors = useCallback(() => {
        setErrors([]);
        Object.values(timeoutRefs.current).forEach(clearTimeout);
        timeoutRefs.current = {};
    }, []);

    useEffect(() => {
        return () => {
        Object.values(timeoutRefs.current).forEach(clearTimeout);
        };
    }, []);

    return (
        <GlobalErrorContext.Provider value={{ errors, addError, clearErrors }}>
        {children}
        </GlobalErrorContext.Provider>
    );
};

// Default export: hook for usage
export default function useGlobalError(): GlobalErrorContextType {
    const context = useContext(GlobalErrorContext);
    if (!context) {
        throw new Error("useGlobalError must be used within a GlobalErrorProvider");
    }
    return context;
};

