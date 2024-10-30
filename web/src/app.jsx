import ReactDOM from 'react-dom/client'
import './assets/css/global.css'
import { StateProvider } from './context/StateContext.jsx'
import reducer, { initialState } from './context/StateReducers.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import 'normalize.css'
import { StrictMode } from 'react'
import { STRICT_MODE } from './constants/Env'

const renderApp = () => {
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <AppRoutes />
        </StateProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    STRICT_MODE
        ? <StrictMode>{renderApp()}</StrictMode>
        : renderApp()
)