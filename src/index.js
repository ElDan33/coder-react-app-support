import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { initializeApp } from "firebase/app";
const firebaseConfig = {
apiKey: "AIzaSyADPhw53bg6rGX_s4fv7HHeoEsdQ26Dtl8",
authDomain: "greenshop-app.firebaseapp.com",
projectId: "greenshop-app",
storageBucket: "greenshop-app.appspot.com",
messagingSenderId: "545923260979",
appId: "1:545923260979:web:bf97c33fddeca464337946"
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();