import React, { useState, useEffect } from 'react';
import CustomMixDesigner from '../components/CustomMix/CustomMixDesigner';
import Swal from 'sweetalert2';

const CustomMixPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Load products from localStorage
        const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
        
        // Filter products with available stock
        const availableProducts = savedProducts.filter(product => 
            product.initialStock > 0
        );
        
        setProducts(availableProducts);
    }, []);

    const handleCreateOrder = async (mixData) => {
        try {
            // Show order creation form with mix data
            const { value: formData } = await Swal.fire({
                title: 'Crear Pedido con Mezcla Personalizada',
                html: `
                    <div style="text-align: left;">
                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Cliente (Cédula/RUC/Pasaporte):</label>
                            <input id="clientId" class="swal2-input" placeholder="Ej: 1234567890" style="margin: 0;">
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; display: block; margin-bottom: 5px;">Observaciones:</label>
                            <textarea id="observations" class="swal2-textarea" placeholder="Observaciones adicionales..." style="margin: 0; height: 80px;"></textarea>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 15px;">
                            <h5 style="margin: 0 0 10px 0; color: #495057;">Resumen de la Mezcla:</h5>
                            <p style="margin: 5px 0;"><strong>Nombre:</strong> ${mixData.name}</p>
                            <p style="margin: 5px 0;"><strong>Total:</strong> $${mixData.totalPrice.toFixed(2)}</p>
                            <p style="margin: 5px 0;"><strong>Productos:</strong> ${mixData.components.length}</p>
                        </div>
                    </div>
                `,
                width: '500px',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Crear Pedido',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#6c757d',
                preConfirm: () => {
                    const clientId = document.getElementById('clientId').value;
                    const observations = document.getElementById('observations').value;
                    
                    if (!clientId.trim()) {
                        Swal.showValidationMessage('El ID del cliente es requerido');
                        return false;
                    }
                    
                    return {
                        clientId: clientId.trim(),
                        observations: observations.trim()
                    };
                }
            });

            if (formData) {
                // Verify client exists
                const clients = JSON.parse(localStorage.getItem('clients') || '[]');
                const client = clients.find(c => c.id === formData.clientId);
                
                if (!client) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Cliente no encontrado',
                        text: 'No se encontró un cliente con ese ID. Registra el cliente primero.',
                        confirmButtonText: 'Entendido'
                    });
                    return;
                }

                // Create order
                const newOrder = {
                    id: Date.now(),
                    clientId: formData.clientId,
                    clientName: client.name,
                    type: 'custom_mix',
                    mixData: mixData,
                    products: mixData.components.map(component => ({
                        code: component.productCode,
                        name: component.productName,
                        quantity: component.quantity,
                        unitPrice: component.price / component.quantity,
                        totalPrice: component.price
                    })),
                    totalAmount: mixData.totalPrice,
                    status: 'pending',
                    observations: formData.observations,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                // Save order
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                orders.push(newOrder);
                localStorage.setItem('orders', JSON.stringify(orders));

                // Update product stock
                const currentProducts = JSON.parse(localStorage.getItem('products') || '[]');
                const updatedProducts = currentProducts.map(product => {
                    const orderComponent = mixData.components.find(comp => comp.productCode === product.code);
                    if (orderComponent) {
                        return {
                            ...product,
                            initialStock: product.initialStock - orderComponent.quantity
                        };
                    }
                    return product;
                });
                localStorage.setItem('products', JSON.stringify(updatedProducts));

                await Swal.fire({
                    icon: 'success',
                    title: '¡Pedido creado exitosamente!',
                    html: `
                        <div style="text-align: left;">
                            <p><strong>ID del Pedido:</strong> ${newOrder.id}</p>
                            <p><strong>Cliente:</strong> ${client.name}</p>
                            <p><strong>Mezcla:</strong> ${mixData.name}</p>
                            <p><strong>Total:</strong> $${mixData.totalPrice.toFixed(2)}</p>
                            <p><strong>Estado:</strong> Pendiente</p>
                        </div>
                    `,
                    confirmButtonText: 'Continuar'
                });

                // Refresh products list
                const refreshedProducts = JSON.parse(localStorage.getItem('products') || '[]');
                const availableProducts = refreshedProducts.filter(product => 
                    product.initialStock > 0
                );
                setProducts(availableProducts);
            }

        } catch (error) {
            console.error('Error creating order:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Error del sistema',
                text: 'No se pudo crear el pedido. Por favor, inténtalo de nuevo.',
                confirmButtonText: 'Reintentar'
            });
        }
    };

    return (
        <div className="custom-mix-page">
            {products.length === 0 ? (
                <div className="no-products-available">
                    <div className="alert alert-warning" style={{ 
                        textAlign: 'center', 
                        padding: '30px', 
                        margin: '50px auto',
                        maxWidth: '600px',
                        borderRadius: '15px',
                        border: '2px solid #ffc107'
                    }}>
                        <h4>⚠️ No hay productos disponibles</h4>
                        <p>No hay productos con stock disponible para crear mezclas personalizadas.</p>
                        <p>Ve a la sección de <strong>Productos</strong> para agregar nuevos productos o verificar el inventario.</p>
                    </div>
                </div>
            ) : (
                <CustomMixDesigner 
                    products={products}
                    onCreateOrder={handleCreateOrder}
                />
            )}
        </div>
    );
};

export default CustomMixPage;
