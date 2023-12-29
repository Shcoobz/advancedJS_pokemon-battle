/**
 * Entry point of the React application.
 * Renders the main `App` component inside a `StrictMode` wrapper.
 *
 * @module index
 * @requires React
 * @requires ReactDOM
 * @requires App
 * @requires './css/index.css'
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './css/index.css';

/**
 * Create a React root and render the `App` component within a `StrictMode` wrapper.
 *
 * @function
 * @name renderApp
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
