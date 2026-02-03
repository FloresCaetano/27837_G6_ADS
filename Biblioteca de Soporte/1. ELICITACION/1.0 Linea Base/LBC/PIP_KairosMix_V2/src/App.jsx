import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProductsPage from './pages/ProductsPage';
import ClientsPage from './pages/ClientsPage';
import OrdersPage from './pages/OrdersPage';
import CustomMixPage from './pages/CustomMixPage';
import { initializeSampleData } from './data/seedData';
import './App.css';

function App() {
  useEffect(() => {
    // Inicializar datos de ejemplo al cargar la aplicación
    initializeSampleData();
  }, []);

  // Detectar si estamos en GitHub Pages o desarrollo local
  const basename = import.meta.env.DEV ? '/' : '/KairosMix/';

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
