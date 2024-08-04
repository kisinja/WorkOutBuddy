import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { WorkoutContextProvider } from './context/WorkoutContext.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);