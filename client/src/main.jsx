import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/index.css';
import { jsxDEV as _jsxDEV } from 'react/jsx-dev-runtime';
ReactDOM.createRoot(document.getElementById('root')).render(
  _jsxDEV(
    React.StrictMode,
    {
      children: _jsxDEV(
        BrowserRouter,
        {
          children: _jsxDEV(App, {}, void 0, false),
        },
        void 0,
        false
      ),
    },
    void 0,
    false
  )
);
