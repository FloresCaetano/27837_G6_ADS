import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
// import Swal from 'sweetalert2'; // Ya no se usa directamente
import ProductForm from './ProductForm';
import { productSubject } from '../../patterns/observer/ProductSubject';
import { SweetAlertFactory } from '../../patterns/factory/SweetAlertFactory';
import './ProductManager.css';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo para productos de frutos secos
  useEffect(() => {
    // Cargar productos desde localStorage o usar datos de ejemplo
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const sampleProducts = [
        {
          id: 1,
          code: 'A01',
          name: 'Almendras Premium',
          countryOfOrigin: 'Estados Unidos',
          pricePerPound: 15.99,
          wholesalePrice: 14.50,
          retailPrice: 17.99,
          initialStock: 50,
          stock: 50,
          image: null
        },
        {
          id: 2,
          code: 'N01',
          name: 'Nueces de Castilla',
          countryOfOrigin: 'Chile',
          pricePerPound: 22.50,
          wholesalePrice: 20.00,
          retailPrice: 25.99,
          initialStock: 30,
          stock: 30,
          image: null
        },
        {
          id: 3,
          code: 'P01',
          name: 'Pasas Sultan',
          countryOfOrigin: 'Turquía',
          pricePerPound: 8.75,
          wholesalePrice: 7.50,
          retailPrice: 10.99,
          initialStock: 75,
          stock: 75,
          image: null
        },
        {
          id: 4,
          code: 'A02',
          name: 'Avellanas',
          countryOfOrigin: 'Italia',
          pricePerPound: 18.25,
          wholesalePrice: 16.50,
          retailPrice: 20.99,
          initialStock: 40,
          stock: 40,
          image: null
        },
        {
          id: 5,
          code: 'P02',
          name: 'Pistachos Tostados',
          countryOfOrigin: 'Estados Unidos',
          pricePerPound: 28.75,
          wholesalePrice: 26.00,
          retailPrice: 32.99,
          initialStock: 25,
          stock: 25,
          image: null
        }
      ];

      setProducts(sampleProducts);
      localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
  }, []);

  // New advanced search system
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchError, setSearchError] = useState('');

  // Instancia de la Abstract Factory
  const notificationFactory = new SweetAlertFactory();

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearchPerformed(false);
      setSelectedProduct(null);
      setSearchError('');
      return;
    }

    try {
      setSearchError('');
      const query = searchQuery.trim();

      // 4.1: Exact code search
      const exactCodeMatch = products.find(product =>
        product.code.toLowerCase() === query.toLowerCase()
      );

      if (exactCodeMatch) {
        setSelectedProduct(exactCodeMatch);
        setSearchResults([]);
        setSearchPerformed(true);

        await notificationFactory.createSuccess(
          'Producto encontrado',
          '',
          {
            html: `
                            <div style="text-align: left;">
                                <strong>Código:</strong> ${exactCodeMatch.code}<br>
                                <strong>Nombre:</strong> ${exactCodeMatch.name}<br>
                                <strong>País:</strong> ${exactCodeMatch.countryOfOrigin}<br>
                                <strong>Precio base:</strong> $${exactCodeMatch.pricePerPound}/lb<br>
                                <strong>Stock:</strong> ${exactCodeMatch.initialStock} libras
                            </div>
                        `,
            confirmButtonText: 'Entendido',
            timer: undefined
          }
        );
        return;
      }

      // 4.2 & 4.3: Partial name search
      const nameMatches = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );

      if (nameMatches.length === 0) {
        setSearchResults([]);
        setSelectedProduct(null);
        setSearchPerformed(true);
        setSearchError('No se encontraron productos');

        await notificationFactory.createWarning(
          'Sin resultados',
          `No existe ningún producto que coincida con "${query}"`
        );
        return;
      }

      if (nameMatches.length === 1) {
        const singleProduct = nameMatches[0];
        setSelectedProduct(singleProduct);
        setSearchResults([]);
        setSearchPerformed(true);

        await notificationFactory.createSuccess(
          'Producto encontrado',
          '',
          {
            html: `
                            <div style="text-align: left;">
                                <strong>Código:</strong> ${singleProduct.code}<br>
                                <strong>Nombre:</strong> ${singleProduct.name}<br>
                                <strong>País:</strong> ${singleProduct.countryOfOrigin}<br>
                                <strong>Precio base:</strong> $${singleProduct.pricePerPound}/lb<br>
                                <strong>Mayorista:</strong> $${singleProduct.wholesalePrice}/lb<br>
                                <strong>Minorista:</strong> $${singleProduct.retailPrice}/lb<br>
                                <strong>Stock:</strong> ${singleProduct.initialStock} libras
                            </div>
                        `,
            confirmButtonText: 'Entendido',
            timer: undefined
          }
        );
        return;
      }

      // 4.2: Multiple results - show list
      setSearchResults(nameMatches);
      setSelectedProduct(null);
      setSearchPerformed(true);

      const resultsList = nameMatches.map(product =>
        `• ${product.code} - ${product.name} ($${product.pricePerPound}/lb)`
      ).join('<br>');

      await notificationFactory.createInfo(
        `${nameMatches.length} productos encontrados`,
        `<div style="text-align: left;">${resultsList}</div>`
      );

    } catch (error) {
      setSearchError('Error en la búsqueda');
      await notificationFactory.createError(
        'Error del sistema',
        'No se pudo completar la búsqueda. Por favor, inténtalo de nuevo.'
      );
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setSearchPerformed(false);
    setSelectedProduct(null);
    setSearchError('');
  };

  // Display logic for products
  const displayProducts = searchPerformed ?
    (searchResults.length > 0 ? searchResults :
      selectedProduct ? [selectedProduct] : []) :
    products;

  const handleAddProduct = async (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      stock: productData.initialStock
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Patrón Observer: Notificar creación
    productSubject.notifyProductAdded(newProduct);

    setShowForm(false);

    // No necesitamos alerta aquí si el form ya maneja su propio feedback, 
    // pero si queremos confirmar:
    await notificationFactory.createSuccess(
      '¡Creado!',
      `El producto ${newProduct.name} ha sido agregado correctamente.`
    );
  };

  const handleEditProduct = async (productData) => {
    const updatedProducts = products.map(p =>
      p.id === editingProduct.id ? { ...productData, id: editingProduct.id, stock: productData.initialStock } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Patrón Observer: Notificar actualización
    productSubject.notifyProductUpdated({ ...productData, id: editingProduct.id });

    setEditingProduct(null);
    setShowForm(false);

    await notificationFactory.createSuccess(
      '¡Actualizado!',
      'El producto ha sido actualizado correctamente.'
    );
  };

  const handleDeleteProduct = async (id) => {
    const product = products.find(p => p.id === id);

    const result = await notificationFactory.createConfirmation(
      '¿Estás seguro?',
      `Vas a eliminar el producto:<br><strong>${product.name}</strong><br><br>Esta acción no se puede deshacer.`,
      'Sí, eliminar',
      'Cancelar'
    );

    if (result.isConfirmed) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      // Patrón Observer: Notificar eliminación
      productSubject.notifyProductDeleted(id);

      await notificationFactory.createSuccess(
        '¡Eliminado!',
        'El producto ha sido eliminado correctamente.'
      );
    }
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return 'out-of-stock';
    if (stock <= 10) return 'low-stock';
    return 'in-stock';
  };

  return (
    <div className="product-manager">
      <div className="page-header">
        <div className="header-content">
          <h1>
            <Package className="page-icon" />
            Gestión de Productos
          </h1>
          <p className="page-description">
            Administra tu inventario de frutos secos y productos premium
          </p>
        </div>
        <button
          className="btn btn-success d-flex align-items-center"
          onClick={() => setShowForm(true)}
        >
          <Plus size={20} className="me-2" />
          Nuevo Producto
        </button>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por código exacto o nombre del producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control search-input"
            />
          </div>
          <div className="search-actions">
            <button
              type="submit"
              className="btn btn-primary me-2"
              disabled={!searchTerm.trim()}
            >
              <Search size={18} className="me-1" />
              Buscar
            </button>
            {searchPerformed && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={clearSearch}
              >
                Limpiar
              </button>
            )}
          </div>
        </form>

        {searchPerformed && (
          <div className="search-status">
            {selectedProduct && (
              <div className="alert alert-success">
                <strong>Producto encontrado:</strong> {selectedProduct.name} ({selectedProduct.code})
              </div>
            )}
            {searchResults.length > 0 && (
              <div className="alert alert-info">
                <strong>{searchResults.length} productos encontrados</strong> - Se muestran abajo
              </div>
            )}
            {searchError && (
              <div className="alert alert-warning">
                <strong>Sin resultados:</strong> {searchError}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="products-grid">
        {displayProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div className="image-placeholder">
                  <Package size={40} />
                </div>
              )}
            </div>

            <div className="product-info">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h3 className="product-name">{product.name}</h3>
                <span className="badge bg-secondary">{product.code}</span>
              </div>
              <p className="text-muted small mb-3">Origen: {product.countryOfOrigin}</p>

              <div className="product-details">
                <div className="detail-item">
                  <span className="detail-label">Precio Base:</span>
                  <span className="product-price">${product.pricePerPound}/lb</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Mayorista:</span>
                  <span className="text-success">${product.wholesalePrice}/lb</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Minorista:</span>
                  <span className="text-info">${product.retailPrice}/lb</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Stock:</span>
                  <span className={`stock-badge ${getStockStatus(product.initialStock)}`}>
                    {product.initialStock} libras
                  </span>
                </div>
              </div>
            </div>

            <div className="product-actions">
              <button
                className="btn btn-warning btn-sm rounded-circle me-2"
                onClick={() => openEditForm(product)}
                title="Editar producto"
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Edit size={16} />
              </button>
              <button
                className="btn btn-danger btn-sm rounded-circle"
                onClick={() => handleDeleteProduct(product.id)}
                title="Eliminar producto"
                style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {displayProducts.length === 0 && !searchPerformed && (
        <div className="empty-state">
          <Package size={64} />
          <h3>No hay productos registrados</h3>
          <p>Agrega tu primer producto usando el botón "Nuevo Producto"</p>
        </div>
      )}

      {displayProducts.length === 0 && searchPerformed && (
        <div className="empty-state">
          <Search size={64} />
          <h3>Sin resultados de búsqueda</h3>
          <p>No se encontraron productos que coincidan con tu búsqueda</p>
        </div>
      )}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={editingProduct ? handleEditProduct : handleAddProduct}
          onCancel={closeForm}
          existingProducts={products}
        />
      )}
    </div>
  );
};

export default ProductManager;
