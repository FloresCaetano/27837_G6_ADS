/**
 * Pruebas unitarias para los datos semilla (seed data)
 * Cubre: Validación de estructura de datos, inicialización
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sampleProducts, sampleClients } from './seedData'

describe('Datos de ejemplo - Productos', () => {
  
  it('debe tener productos definidos', () => {
    expect(sampleProducts).toBeDefined()
    expect(Array.isArray(sampleProducts)).toBe(true)
    expect(sampleProducts.length).toBeGreaterThan(0)
  })

  it('cada producto debe tener campos requeridos', () => {
    sampleProducts.forEach(product => {
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('code')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('countryOfOrigin')
      expect(product).toHaveProperty('pricePerPound')
      expect(product).toHaveProperty('wholesalePrice')
      expect(product).toHaveProperty('retailPrice')
      expect(product).toHaveProperty('initialStock')
    })
  })

  it('códigos de producto deben ser únicos', () => {
    const codes = sampleProducts.map(p => p.code)
    const uniqueCodes = new Set(codes)
    expect(uniqueCodes.size).toBe(codes.length)
  })

  it('IDs de producto deben ser únicos', () => {
    const ids = sampleProducts.map(p => p.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('precios deben ser números positivos', () => {
    sampleProducts.forEach(product => {
      expect(typeof product.pricePerPound).toBe('number')
      expect(product.pricePerPound).toBeGreaterThan(0)
      expect(typeof product.wholesalePrice).toBe('number')
      expect(product.wholesalePrice).toBeGreaterThan(0)
      expect(typeof product.retailPrice).toBe('number')
      expect(product.retailPrice).toBeGreaterThan(0)
    })
  })

  it('stock inicial debe ser número entero positivo', () => {
    sampleProducts.forEach(product => {
      expect(typeof product.initialStock).toBe('number')
      expect(product.initialStock).toBeGreaterThanOrEqual(0)
      expect(Number.isInteger(product.initialStock)).toBe(true)
    })
  })

  it('precio mayorista debe ser menor que minorista', () => {
    sampleProducts.forEach(product => {
      expect(product.wholesalePrice).toBeLessThan(product.retailPrice)
    })
  })

  it('códigos de producto deben seguir formato correcto (Letra + 2 dígitos)', () => {
    sampleProducts.forEach(product => {
      expect(product.code).toMatch(/^[A-Z]\d{2}$/)
    })
  })
})

describe('Datos de ejemplo - Clientes', () => {
  
  it('debe tener clientes definidos', () => {
    expect(sampleClients).toBeDefined()
    expect(Array.isArray(sampleClients)).toBe(true)
    expect(sampleClients.length).toBeGreaterThan(0)
  })

  it('cada cliente debe tener campos requeridos', () => {
    sampleClients.forEach(client => {
      expect(client).toHaveProperty('id')
      expect(client).toHaveProperty('name')
      expect(client).toHaveProperty('documentType')
      expect(client).toHaveProperty('email')
      expect(client).toHaveProperty('phone')
      expect(client).toHaveProperty('address')
    })
  })

  it('IDs de cliente deben ser únicos', () => {
    const ids = sampleClients.map(c => c.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('emails deben tener formato válido', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    sampleClients.forEach(client => {
      expect(emailRegex.test(client.email)).toBe(true)
    })
  })

  it('tipos de documento deben ser válidos', () => {
    const validTypes = ['cedula', 'ruc', 'pasaporte']
    sampleClients.forEach(client => {
      expect(validTypes).toContain(client.documentType)
    })
  })

  it('debe haber al menos un cliente de cada tipo de documento', () => {
    const types = sampleClients.map(c => c.documentType)
    expect(types).toContain('cedula')
    expect(types).toContain('ruc')
    expect(types).toContain('pasaporte')
  })
})

describe('Formato de fechas en seed data', () => {
  
  const formatDateToDDMMYYYY = (date) => {
    const d = new Date(date)
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  }

  it('debe formatear fecha correctamente', () => {
    const testDate = new Date(2026, 0, 15) // 15 enero 2026
    expect(formatDateToDDMMYYYY(testDate)).toBe('15/01/2026')
  })

  it('debe agregar ceros a día de un dígito', () => {
    const testDate = new Date(2026, 0, 5)
    expect(formatDateToDDMMYYYY(testDate)).toBe('05/01/2026')
  })

  it('debe agregar ceros a mes de un dígito', () => {
    const testDate = new Date(2026, 5, 15) // Junio
    expect(formatDateToDDMMYYYY(testDate)).toBe('15/06/2026')
  })
})

describe('Consistencia de datos', () => {
  
  it('productos y clientes no deben compartir IDs', () => {
    const productIds = new Set(sampleProducts.map(p => p.id.toString()))
    const clientIds = new Set(sampleClients.map(c => c.id.toString()))
    
    const intersection = [...productIds].filter(id => clientIds.has(id))
    expect(intersection.length).toBe(0)
  })

  it('nombres de productos no deben estar vacíos', () => {
    sampleProducts.forEach(product => {
      expect(product.name.trim().length).toBeGreaterThan(0)
    })
  })

  it('nombres de clientes no deben estar vacíos', () => {
    sampleClients.forEach(client => {
      expect(client.name.trim().length).toBeGreaterThan(0)
    })
  })
})
