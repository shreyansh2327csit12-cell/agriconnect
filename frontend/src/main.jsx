import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import App from './App'
import { ThemeProvider } from "../src/components/theme-provider"
import { Toaster } from "../src/components/ui/sonner"


// Create a new QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <App />
      <Toaster position="bottom-right" richColors closeButton expand={true} />
    </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
