/**
 * Pruebas unitarias para funciones de utilidad
 * Cubre: Configuración de SweetAlert, formateo de datos, helpers
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('Formateo de fechas', () => {
  
  const formatDateToDDMMYYYY = (date) => {
    const d = new Date(date)
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  }

  const parseDDMMYYYYToDate = (dateString) => {
    const [day, month, year] = dateString.split('/')
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  }

  it('debe formatear fecha a DD/MM/YYYY', () => {
    const date = new Date(2026, 0, 15) // 15 de enero de 2026
    expect(formatDateToDDMMYYYY(date)).toBe('15/01/2026')
  })

  it('debe agregar ceros al día y mes cuando es necesario', () => {
    const date = new Date(2026, 0, 5) // 5 de enero de 2026
    expect(formatDateToDDMMYYYY(date)).toBe('05/01/2026')
  })

  it('debe parsear fecha desde DD/MM/YYYY', () => {
    const dateString = '15/01/2026'
    const parsed = parseDDMMYYYYToDate(dateString)
    
    expect(parsed.getDate()).toBe(15)
    expect(parsed.getMonth()).toBe(0) // Enero = 0
    expect(parsed.getFullYear()).toBe(2026)
  })

  it('parseo y formateo deben ser inversos', () => {
    const original = '25/12/2025'
    const parsed = parseDDMMYYYYToDate(original)
    const formatted = formatDateToDDMMYYYY(parsed)
    
    expect(formatted).toBe(original)
  })
})

describe('Formateo de moneda', () => {
  
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`
  }

  const formatCurrencyWithSeparators = (amount) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  it('debe formatear cantidad con 2 decimales', () => {
    expect(formatCurrency(15.99)).toBe('$15.99')
    expect(formatCurrency(100)).toBe('$100.00')
    expect(formatCurrency(0.5)).toBe('$0.50')
  })

  it('debe redondear a 2 decimales', () => {
    expect(formatCurrency(15.999)).toBe('$16.00')
    expect(formatCurrency(15.991)).toBe('$15.99')
  })

  it('debe formatear con separadores de miles', () => {
    const formatted = formatCurrencyWithSeparators(1234567.89)
    expect(formatted).toContain('1')
    expect(formatted).toContain('234')
  })
})

describe('Validaciones comunes', () => {
  
  describe('Validación de campos vacíos', () => {
    const isEmpty = (value) => {
      if (value === null || value === undefined) return true
      if (typeof value === 'string') return value.trim() === ''
      if (Array.isArray(value)) return value.length === 0
      return false
    }

    it('debe detectar strings vacíos', () => {
      expect(isEmpty('')).toBe(true)
      expect(isEmpty('   ')).toBe(true)
      expect(isEmpty('texto')).toBe(false)
    })

    it('debe detectar null y undefined', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
    })

    it('debe detectar arrays vacíos', () => {
      expect(isEmpty([])).toBe(true)
      expect(isEmpty([1, 2, 3])).toBe(false)
    })
  })

  describe('Validación de números', () => {
    const isValidNumber = (value, min = -Infinity, max = Infinity) => {
      const num = parseFloat(value)
      if (isNaN(num)) return false
      return num >= min && num <= max
    }

    it('debe validar números en rango', () => {
      expect(isValidNumber('50', 0, 100)).toBe(true)
      expect(isValidNumber('150', 0, 100)).toBe(false)
      expect(isValidNumber('-10', 0, 100)).toBe(false)
    })

    it('debe rechazar valores no numéricos', () => {
      expect(isValidNumber('abc')).toBe(false)
      expect(isValidNumber('')).toBe(false)
      expect(isValidNumber(NaN)).toBe(false)
    })

    it('debe aceptar decimales', () => {
      expect(isValidNumber('15.99', 0, 100)).toBe(true)
      expect(isValidNumber('0.01', 0, 1)).toBe(true)
    })
  })
})

describe('Generación de IDs únicos', () => {
  
  const generateUniqueId = (prefix = '') => {
    return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  it('debe generar IDs con prefijo', () => {
    const id = generateUniqueId('order-')
    expect(id.startsWith('order-')).toBe(true)
  })

  it('debe generar IDs únicos consecutivos', () => {
    const ids = new Set()
    for (let i = 0; i < 100; i++) {
      ids.add(generateUniqueId())
    }
    expect(ids.size).toBe(100)
  })

  it('debe incluir timestamp', () => {
    const before = Date.now()
    const id = generateUniqueId()
    const after = Date.now()
    
    const timestamp = parseInt(id.split('-')[0])
    expect(timestamp).toBeGreaterThanOrEqual(before)
    expect(timestamp).toBeLessThanOrEqual(after)
  })
})

describe('Normalización de texto', () => {
  
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
  }

  it('debe convertir a minúsculas', () => {
    expect(normalizeText('HOLA MUNDO')).toBe('hola mundo')
  })

  it('debe remover acentos', () => {
    expect(normalizeText('María José')).toBe('maria jose')
    expect(normalizeText('café')).toBe('cafe')
    expect(normalizeText('niño')).toBe('nino')
  })

  it('debe eliminar espacios extra', () => {
    expect(normalizeText('  texto  ')).toBe('texto')
  })

  it('debe manejar strings vacíos', () => {
    expect(normalizeText('')).toBe('')
  })
})

describe('Comparación de objetos', () => {
  
  const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false
    if (obj1 === null || obj2 === null) return false
    
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    
    if (keys1.length !== keys2.length) return false
    
    return keys1.every(key => deepEqual(obj1[key], obj2[key]))
  }

  it('debe detectar objetos iguales', () => {
    const obj1 = { a: 1, b: { c: 2 } }
    const obj2 = { a: 1, b: { c: 2 } }
    expect(deepEqual(obj1, obj2)).toBe(true)
  })

  it('debe detectar objetos diferentes', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 3 }
    expect(deepEqual(obj1, obj2)).toBe(false)
  })

  it('debe comparar primitivos', () => {
    expect(deepEqual(1, 1)).toBe(true)
    expect(deepEqual('a', 'a')).toBe(true)
    expect(deepEqual(1, 2)).toBe(false)
  })

  it('debe manejar null', () => {
    expect(deepEqual(null, null)).toBe(true)
    expect(deepEqual(null, {})).toBe(false)
  })
})

describe('Cálculos de porcentajes', () => {
  
  const calculatePercentage = (value, total) => {
    if (total === 0) return 0
    return (value / total) * 100
  }

  const applyPercentage = (value, percentage) => {
    return value * (percentage / 100)
  }

  it('debe calcular porcentaje correctamente', () => {
    expect(calculatePercentage(25, 100)).toBe(25)
    expect(calculatePercentage(50, 200)).toBe(25)
    expect(calculatePercentage(15, 100)).toBe(15)
  })

  it('debe manejar total cero', () => {
    expect(calculatePercentage(10, 0)).toBe(0)
  })

  it('debe aplicar porcentaje correctamente', () => {
    expect(applyPercentage(100, 15)).toBe(15) // 15% de 100
    expect(applyPercentage(200, 10)).toBe(20) // 10% de 200
  })
})

describe('Configuración de SweetAlert', () => {
  
  const swalConfig = {
    confirmDialog: {
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      reverseButtons: true
    },
    deleteDialog: {
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      reverseButtons: true
    },
    successDialog: {
      confirmButtonColor: '#28a745'
    },
    errorDialog: {
      confirmButtonColor: '#dc3545'
    }
  }

  it('debe tener configuración para diálogo de confirmación', () => {
    expect(swalConfig.confirmDialog).toBeDefined()
    expect(swalConfig.confirmDialog.confirmButtonColor).toBe('#28a745')
  })

  it('debe tener configuración para diálogo de eliminación', () => {
    expect(swalConfig.deleteDialog).toBeDefined()
    expect(swalConfig.deleteDialog.confirmButtonColor).toBe('#dc3545')
  })

  it('debe tener botones invertidos para confirmación', () => {
    expect(swalConfig.confirmDialog.reverseButtons).toBe(true)
    expect(swalConfig.deleteDialog.reverseButtons).toBe(true)
  })
})

describe('Manejo de localStorage', () => {
  
  const safeGetFromStorage = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error)
      return defaultValue
    }
  }

  const safeSetToStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
      return false
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe retornar valor por defecto si key no existe', () => {
    localStorage.getItem.mockReturnValue(null)
    
    const result = safeGetFromStorage('nonexistent', [])
    expect(result).toEqual([])
  })

  it('debe parsear JSON correctamente', () => {
    localStorage.getItem.mockReturnValue('{"name":"test"}')
    
    const result = safeGetFromStorage('key')
    expect(result).toEqual({ name: 'test' })
  })

  it('debe manejar errores de parseo', () => {
    localStorage.getItem.mockReturnValue('invalid json')
    
    const result = safeGetFromStorage('key', 'default')
    expect(result).toBe('default')
  })
})
