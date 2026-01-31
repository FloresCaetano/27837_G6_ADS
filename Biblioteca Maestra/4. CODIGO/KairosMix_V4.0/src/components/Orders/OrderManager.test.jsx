/**
 * Pruebas unitarias para el módulo de gestión de pedidos
 * Cubre: CRUD de pedidos, cambios de estado, filtros, validaciones
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockOrders, mockClients, mockProducts } from '../../test/testUtils'

describe('Gestión de Estados de Pedidos', () => {
  
  const orderStatuses = {
    'client_pending': {
      color: 'info',
      nextStates: ['Pendiente', 'En Proceso', 'Cancelado'],
      description: 'Pedido enviado por cliente, pendiente de revisión'
    },
    'Pendiente': { 
      color: 'warning', 
      nextStates: ['En Proceso', 'Cancelado'],
      description: 'El pedido ha sido creado, pero aún no se procesa'
    },
    'En Proceso': { 
      color: 'primary', 
      nextStates: ['En Espera', 'Completado', 'Cancelado'],
      description: 'Se está preparando el pedido'
    },
    'En Espera': { 
      color: 'info', 
      nextStates: ['En Proceso', 'Cancelado'],
      description: 'El pedido está detenido temporalmente'
    },
    'Completado': { 
      color: 'success', 
      nextStates: [],
      description: 'El pedido se ha entregado exitosamente'
    },
    'Cancelado': { 
      color: 'danger', 
      nextStates: [],
      description: 'El pedido fue cancelado'
    }
  }

  describe('Transiciones de estado válidas', () => {
    it('estado Pendiente puede cambiar a En Proceso o Cancelado', () => {
      const validNextStates = orderStatuses['Pendiente'].nextStates
      expect(validNextStates).toContain('En Proceso')
      expect(validNextStates).toContain('Cancelado')
      expect(validNextStates).not.toContain('Completado')
    })

    it('estado En Proceso puede cambiar a En Espera, Completado o Cancelado', () => {
      const validNextStates = orderStatuses['En Proceso'].nextStates
      expect(validNextStates).toContain('En Espera')
      expect(validNextStates).toContain('Completado')
      expect(validNextStates).toContain('Cancelado')
    })

    it('estado Completado no puede cambiar a ningún otro estado', () => {
      const validNextStates = orderStatuses['Completado'].nextStates
      expect(validNextStates).toHaveLength(0)
    })

    it('estado Cancelado no puede cambiar a ningún otro estado', () => {
      const validNextStates = orderStatuses['Cancelado'].nextStates
      expect(validNextStates).toHaveLength(0)
    })

    it('estado En Espera puede volver a En Proceso o Cancelarse', () => {
      const validNextStates = orderStatuses['En Espera'].nextStates
      expect(validNextStates).toContain('En Proceso')
      expect(validNextStates).toContain('Cancelado')
    })
  })

  describe('Validación de transición de estado', () => {
    const canChangeStatus = (currentStatus, newStatus) => {
      const statusConfig = orderStatuses[currentStatus]
      if (!statusConfig) return false
      return statusConfig.nextStates.includes(newStatus)
    }

    it('debe permitir transición válida Pendiente -> En Proceso', () => {
      expect(canChangeStatus('Pendiente', 'En Proceso')).toBe(true)
    })

    it('debe rechazar transición inválida Pendiente -> Completado', () => {
      expect(canChangeStatus('Pendiente', 'Completado')).toBe(false)
    })

    it('debe rechazar transición desde estado final', () => {
      expect(canChangeStatus('Completado', 'Pendiente')).toBe(false)
      expect(canChangeStatus('Cancelado', 'Pendiente')).toBe(false)
    })

    it('debe manejar estado no reconocido', () => {
      expect(canChangeStatus('EstadoInvalido', 'Pendiente')).toBe(false)
    })
  })
})

describe('Validación de fecha de pedido', () => {
  
  const validateDate = (dateString) => {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
    const match = dateString.match(dateRegex)
    
    if (!match) return { valid: false, error: 'Formato inválido' }
    
    const day = parseInt(match[1])
    const month = parseInt(match[2])
    const year = parseInt(match[3])
    
    if (month < 1 || month > 12) return { valid: false, error: 'Mes inválido' }
    if (day < 1 || day > 31) return { valid: false, error: 'Día inválido' }
    if (year < 2020 || year > 2030) return { valid: false, error: 'Año fuera de rango' }
    
    // Validar fecha real
    const date = new Date(year, month - 1, day)
    const isValidDate = date.getDate() === day && 
                        date.getMonth() === month - 1 && 
                        date.getFullYear() === year
    
    if (!isValidDate) return { valid: false, error: 'Fecha no existe' }
    
    return { valid: true, date }
  }

  it('debe aceptar fecha con formato DD/MM/YYYY válido', () => {
    expect(validateDate('15/01/2026').valid).toBe(true)
    expect(validateDate('01/12/2025').valid).toBe(true)
    expect(validateDate('31/12/2024').valid).toBe(true)
  })

  it('debe rechazar fecha con formato incorrecto', () => {
    expect(validateDate('2026-01-15').valid).toBe(false)
    expect(validateDate('15-01-2026').valid).toBe(false)
    expect(validateDate('01/15/2026').valid).toBe(false) // Mes 15 inválido
  })

  it('debe rechazar mes inválido', () => {
    const result = validateDate('15/13/2026')
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Mes inválido')
  })

  it('debe rechazar día inválido', () => {
    const result = validateDate('32/01/2026')
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Día inválido')
  })

  it('debe rechazar año fuera de rango', () => {
    expect(validateDate('15/01/2019').valid).toBe(false)
    expect(validateDate('15/01/2035').valid).toBe(false)
  })

  it('debe rechazar fechas que no existen (ej: 31 de febrero)', () => {
    const result = validateDate('31/02/2026')
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Fecha no existe')
  })

  it('debe aceptar 29 de febrero en año bisiesto', () => {
    expect(validateDate('29/02/2024').valid).toBe(true)
  })

  it('debe rechazar 29 de febrero en año no bisiesto', () => {
    expect(validateDate('29/02/2025').valid).toBe(false)
  })
})

describe('Cálculo de totales de pedido', () => {
  
  const calculateOrderTotals = (products, taxRate = 0.15) => {
    const subtotal = products.reduce((sum, item) => {
      return sum + (item.quantity * item.price)
    }, 0)
    
    const taxes = subtotal * taxRate
    const total = subtotal + taxes
    
    return {
      subtotal: Math.round(subtotal * 100) / 100,
      taxes: Math.round(taxes * 100) / 100,
      total: Math.round(total * 100) / 100
    }
  }

  it('debe calcular subtotal correctamente', () => {
    const products = [
      { quantity: 5, price: 10.00 },
      { quantity: 3, price: 15.00 }
    ]
    
    const result = calculateOrderTotals(products)
    expect(result.subtotal).toBe(95.00)
  })

  it('debe calcular IVA (15%) correctamente', () => {
    const products = [{ quantity: 10, price: 10.00 }]
    
    const result = calculateOrderTotals(products)
    expect(result.taxes).toBe(15.00) // 100 * 0.15
  })

  it('debe calcular total (subtotal + IVA) correctamente', () => {
    const products = [{ quantity: 10, price: 10.00 }]
    
    const result = calculateOrderTotals(products)
    expect(result.total).toBe(115.00) // 100 + 15
  })

  it('debe manejar lista vacía de productos', () => {
    const result = calculateOrderTotals([])
    expect(result.subtotal).toBe(0)
    expect(result.taxes).toBe(0)
    expect(result.total).toBe(0)
  })

  it('debe redondear a 2 decimales', () => {
    const products = [{ quantity: 3, price: 10.33 }]
    
    const result = calculateOrderTotals(products)
    expect(result.subtotal).toBe(30.99)
    expect(result.taxes).toBe(4.65) // 30.99 * 0.15 = 4.6485 -> 4.65
  })
})

describe('Filtros de pedidos', () => {
  
  const applyFilters = (orders, filters) => {
    let filtered = [...orders]
    
    // Filtro por término de búsqueda
    if (filters.searchTerm?.trim()) {
      const term = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(order => 
        order.id.toString().includes(term) ||
        order.clientName.toLowerCase().includes(term) ||
        order.clientId.includes(term)
      )
    }
    
    // Filtro por estado
    if (filters.status) {
      filtered = filtered.filter(order => order.status === filters.status)
    }
    
    // Filtro por rango de fechas
    if (filters.dateFrom) {
      filtered = filtered.filter(order => {
        const [day, month, year] = order.date.split('/')
        const orderDate = new Date(year, month - 1, day)
        return orderDate >= new Date(filters.dateFrom)
      })
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(order => {
        const [day, month, year] = order.date.split('/')
        const orderDate = new Date(year, month - 1, day)
        return orderDate <= new Date(filters.dateTo)
      })
    }
    
    return filtered
  }

  it('debe filtrar por ID de pedido', () => {
    const result = applyFilters(mockOrders, { searchTerm: '1001' })
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(1001)
  })

  it('debe filtrar por nombre de cliente', () => {
    const result = applyFilters(mockOrders, { searchTerm: 'María' })
    expect(result.length).toBe(1)
    expect(result[0].clientName).toBe('María González')
  })

  it('debe filtrar por estado', () => {
    const result = applyFilters(mockOrders, { status: 'En Proceso' })
    expect(result.length).toBe(1)
    expect(result[0].status).toBe('En Proceso')
  })

  it('debe combinar múltiples filtros', () => {
    const result = applyFilters(mockOrders, { 
      status: 'Pendiente',
      searchTerm: 'María'
    })
    expect(result.length).toBe(1)
  })

  it('debe retornar todos los pedidos sin filtros', () => {
    const result = applyFilters(mockOrders, {})
    expect(result.length).toBe(mockOrders.length)
  })

  it('debe retornar vacío si no hay coincidencias', () => {
    const result = applyFilters(mockOrders, { searchTerm: 'NoExiste' })
    expect(result.length).toBe(0)
  })
})

describe('Validación de stock en pedidos', () => {
  
  const validateStock = (orderProducts, availableProducts) => {
    const errors = []
    
    orderProducts.forEach((item, index) => {
      const product = availableProducts.find(p => p.code === item.code)
      
      if (!product) {
        errors.push({
          index,
          code: item.code,
          error: 'Producto no encontrado'
        })
        return
      }
      
      if (item.quantity > product.stock) {
        errors.push({
          index,
          code: item.code,
          error: `Stock insuficiente. Disponible: ${product.stock}, Solicitado: ${item.quantity}`
        })
      }
    })
    
    return {
      valid: errors.length === 0,
      errors
    }
  }

  it('debe validar stock suficiente', () => {
    const orderProducts = [{ code: 'A01', quantity: 5 }]
    const result = validateStock(orderProducts, mockProducts)
    expect(result.valid).toBe(true)
  })

  it('debe detectar stock insuficiente', () => {
    const orderProducts = [{ code: 'A01', quantity: 100 }]
    const result = validateStock(orderProducts, mockProducts)
    expect(result.valid).toBe(false)
    expect(result.errors[0].error).toContain('Stock insuficiente')
  })

  it('debe detectar producto no encontrado', () => {
    const orderProducts = [{ code: 'NOEXISTE', quantity: 5 }]
    const result = validateStock(orderProducts, mockProducts)
    expect(result.valid).toBe(false)
    expect(result.errors[0].error).toBe('Producto no encontrado')
  })

  it('debe validar múltiples productos', () => {
    const orderProducts = [
      { code: 'A01', quantity: 5 },
      { code: 'N01', quantity: 100 } // Stock insuficiente
    ]
    const result = validateStock(orderProducts, mockProducts)
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBe(1)
    expect(result.errors[0].code).toBe('N01')
  })
})

describe('Generación de ID de pedido', () => {
  
  const generateOrderId = (existingOrders) => {
    if (existingOrders.length === 0) return 1001
    
    const maxId = Math.max(...existingOrders.map(o => o.id))
    return maxId + 1
  }

  it('debe generar ID 1001 para primer pedido', () => {
    expect(generateOrderId([])).toBe(1001)
  })

  it('debe incrementar desde el ID más alto', () => {
    expect(generateOrderId(mockOrders)).toBe(1003)
  })

  it('debe manejar IDs no secuenciales', () => {
    const ordersWithGaps = [{ id: 1001 }, { id: 1005 }, { id: 1003 }]
    expect(generateOrderId(ordersWithGaps)).toBe(1006)
  })
})
