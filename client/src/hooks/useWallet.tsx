import { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
    balance: number,
    setBalance: (value: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({children}: {children: ReactNode}){
    const [balance, setBalance] = useState<number>(0);

    return (
        <WalletContext.Provider value={{ balance, setBalance }}>
            {children}
        </WalletContext.Provider>
    )
} 

export default function useWallet(){
    const context = useContext(WalletContext);
    if(!context) {
        throw new Error("useWallet must be used within WalletProvider");
    }
    return context;
}