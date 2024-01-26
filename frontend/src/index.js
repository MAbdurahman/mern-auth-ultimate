import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {BrowserRouter} from 'react-router-dom';
import ThemeProvider from './context/themeContext';
import NotificationProvider from './context/notificationContext';
import AuthProvider from './context/authContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>

   <NotificationProvider>
      <AuthProvider>
         <ThemeProvider>
            <App/>
         </ThemeProvider>
      </AuthProvider>
   </NotificationProvider>

</BrowserRouter>);