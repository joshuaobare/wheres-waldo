import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {firebaseConfig} from "./firebase-config"
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";




// Initialize Firebase






const app = initializeApp(firebaseConfig);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


