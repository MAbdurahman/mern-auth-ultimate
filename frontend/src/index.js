import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {BrowserRouter} from 'react-router-dom';
import ThemeProvider from './context/themeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
   <ThemeProvider>
      <App/>
   </ThemeProvider>
</BrowserRouter>);