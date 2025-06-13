import React from 'react';
import ReactDOM from 'react-dom/client';
import "../src/global.css"; // Aqui você pode importar seu arquivo CSS global
import App from './App'; // O componente principal do seu aplicativo

const rootElement = document.getElementById('root'); // Obtendo o elemento "root" do HTML

const root = ReactDOM.createRoot(rootElement); // Criando o root do React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);