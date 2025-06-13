import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom' 
import { WalletProvider } from './hooks/useWallet.tsx'
import { GlobalErrorProvider } from './hooks/useGlobalError.tsx'

//console.log = () => void 0;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalErrorProvider>
        <WalletProvider>
          <App />
        </WalletProvider>
      </GlobalErrorProvider>
    </BrowserRouter>
  </StrictMode>,
)
