import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ScheduleProvider } from './context/ScheduleContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ScheduleProvider>
      <App />
    </ScheduleProvider>
  </React.StrictMode>
);