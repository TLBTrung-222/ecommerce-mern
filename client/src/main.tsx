// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import store from './redux/store.ts'
import { Provider } from 'react-redux'
import './main.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        {/* <StrictMode> */}
        <Provider store={store}>
            <App />
        </Provider>
        {/* </StrictMode> */}
    </QueryClientProvider>
)
