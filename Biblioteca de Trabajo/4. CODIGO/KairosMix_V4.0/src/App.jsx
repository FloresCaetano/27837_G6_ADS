import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { productSubject } from './patterns/observer/ProductSubject';
import { ConsoleObserver } from './patterns/observer/ConsoleObserver';
import Layout from './components/Layout/Layout';
import ProductsPage from './pages/ProductsPage';
import ClientsPage from './pages/ClientsPage';
import OrdersPage from './pages/OrdersPage';
import CustomMixPage from './pages/CustomMixPage';
import { initializeSampleData } from './data/seedData';
import './App.css';

function App() {
  useEffect(() => {
    console.log('App montado correctamente');
    
    // Inicializar datos de ejemplo y suscribir observadores
    initializeSampleData();

    const logger = new ConsoleObserver();
    productSubject.subscribe(logger);

    return () => {
      productSubject.unsubscribe(logger);
    };
  }, []);

  // Detectar el entorno y configurar basename apropiado
  // En Vercel siempre usar '/', en GitHub Pages usar '/KairosMix/'
  const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
  const basename = import.meta.env.DEV || isVercel ? '/' : '/KairosMix/';

  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/productos" replace />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/pedidos" element={<OrdersPage />} />
          <Route path="/mezcla-personalizada" element={<CustomMixPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
