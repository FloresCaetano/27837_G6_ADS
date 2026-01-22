import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Wrapper para componentes que necesitan Router
export function renderWithRouter(ui, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route)
  return {
    ...render(ui, { wrapper: BrowserRouter }),
  }
}

// Datos de prueba para productos
export const mockProducts = [
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
  }
]

// Datos de prueba para clientes
export const mockClients = [
  {
    id: 1,
    name: 'María González',
    idNumber: '1234567890',
    idType: 'cedula',
    email: 'maria.gonzalez@email.com',
    phone: '0987654321',
    address: 'Av. Principal 123, Quito, Ecuador'
  },
  {
    id: 2,
    name: 'Juan Pérez',
    idNumber: '0987654321098',
    idType: 'ruc',
    email: 'juan.perez@empresa.com',
    phone: '0998877665',
    address: 'Calle Secundaria 456, Guayaquil, Ecuador'
  },
  {
    id: 3,
    name: 'Ana Silva',
    idNumber: 'AB123456',
    idType: 'pasaporte',
    email: 'ana.silva@international.com',
    phone: '0912345678',
    address: 'Zona Residencial 789, Cuenca, Ecuador'
  }
]

// Datos de prueba para pedidos
export const mockOrders = [
  {
    id: 1001,
    clientId: '1234567890',
    clientName: 'María González',
    status: 'Pendiente',
    date: '15/01/2026',
    products: [
      { code: 'A01', name: 'Almendras Premium', quantity: 5, price: 17.99 }
    ],
    subtotal: 89.95,
    taxes: 13.49,
    total: 103.44,
    paymentMethod: 'Efectivo'
  },
  {
    id: 1002,
    clientId: '0987654321098',
    clientName: 'Juan Pérez',
    status: 'En Proceso',
    date: '14/01/2026',
    products: [
      { code: 'N01', name: 'Nueces de Castilla', quantity: 3, price: 25.99 }
    ],
    subtotal: 77.97,
    taxes: 11.70,
    total: 89.67,
    paymentMethod: 'Tarjeta'
  }
]

// Datos de prueba para mezclas
export const mockMixes = [
  {
    id: 'mix-1',
    name: 'Mezcla Energética',
    components: [
      { productCode: 'A01', productName: 'Almendras Premium', quantity: 2 },
      { productCode: 'P01', productName: 'Pasas Sultan', quantity: 1 }
    ],
    totalPrice: 46.97,
    createdAt: '2026-01-10T10:00:00.000Z'
  }
]

// Helper para simular localStorage con datos
export function setupLocalStorageWithData(data = {}) {
  const storage = {
    products: JSON.stringify(data.products || mockProducts),
    clients: JSON.stringify(data.clients || mockClients),
    orders: JSON.stringify(data.orders || mockOrders),
    savedMixes: JSON.stringify(data.savedMixes || mockMixes)
  }

  return (key) => storage[key] || null
}

// Helper para esperar por cambios asíncronos
export function waitFor(callback, options = { timeout: 1000 }) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    
    const checkCondition = () => {
      try {
        const result = callback()
        if (result) {
          resolve(result)
        } else if (Date.now() - startTime > options.timeout) {
          reject(new Error('Timeout esperando condición'))
        } else {
          setTimeout(checkCondition, 50)
        }
      } catch (error) {
        if (Date.now() - startTime > options.timeout) {
          reject(error)
        } else {
          setTimeout(checkCondition, 50)
        }
      }
    }
    
    checkCondition()
  })
}
