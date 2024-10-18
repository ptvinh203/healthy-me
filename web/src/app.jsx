import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes/AppRoutes.jsx'
import { StateProvider } from './context/StateContext.jsx'
import reducer, { initialState } from './context/StateReducers.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppRoutes />
    </StateProvider>
  </React.StrictMode>
)