import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base/variables.css';
import "./styles/base/reset.css"
import "./styles/base/global.css"
import App from './App'; // O componente principal do seu aplicativo

const rootElement = document.getElementById('root'); // Obtendo o elemento "root" do HTML

const root = ReactDOM.createRoot(rootElement); // Criando o root do React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);