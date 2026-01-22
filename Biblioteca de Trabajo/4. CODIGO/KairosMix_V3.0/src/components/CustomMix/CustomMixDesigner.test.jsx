/**
 * Pruebas unitarias para el diseñador de mezclas personalizadas
 * Cubre: Creación de mezclas, cálculos nutricionales, validaciones
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockProducts, mockMixes } from '../../test/testUtils'

describe('Validación de nombre de mezcla', () => {
  
  const validateMixName = (name) => {
    if (!name || name.trim().length === 0) {
      return { valid: false, error: 'El nombre es requerido' }
    }
    
    if (name.length < 3 || name.length > 25) {
      return { valid: false, error: 'El nombre debe tener entre 3 y 25 caracteres' }
    }
    
    if (!/^[a-zA-Z0-9\s_áéíóúÁÉÍÓÚñÑ]+$/.test(name)) {
      return { valid: false, error: 'Solo se permiten caracteres alfanuméricos, espacios y guiones bajos' }
    }
    
    return { valid: true }
  }

  it('debe aceptar nombres válidos', () => {
    expect(validateMixName('Mezcla Energética').valid).toBe(true)
    expect(validateMixName('Mix_Premium').valid).toBe(true)
    expect(validateMixName('Mezcla123').valid).toBe(true)
  })

  it('debe rechazar nombres muy cortos (< 3 caracteres)', () => {
    const result = validateMixName('AB')
    expect(result.valid).toBe(false)
    expect(result.error).toContain('entre 3 y 25')
  })

  it('debe rechazar nombres muy largos (> 25 caracteres)', () => {
    const longName = 'Esta es una mezcla con nombre demasiado largo'
    const result = validateMixName(longName)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('entre 3 y 25')
  })

  it('debe rechazar nombres con caracteres especiales', () => {
    expect(validateMixName('Mezcla@Premium').valid).toBe(false)
    expect(validateMixName('Mezcla#1').valid).toBe(false)
    expect(validateMixName('Mezcla-Especial').valid).toBe(false)
  })

  it('debe rechazar nombres vacíos', () => {
    expect(validateMixName('').valid).toBe(false)
    expect(validateMixName('   ').valid).toBe(false)
  })
})

describe('Validación de cantidad de componentes', () => {
  
  const validateQuantity = (qty, availableStock) => {
    const numQty = parseFloat(qty)
    
    if (isNaN(numQty) || numQty <= 0) {
      return { valid: false, error: 'La cantidad debe ser un número positivo' }
    }
    
    if (numQty > availableStock) {
      return { valid: false, error: `Solo hay ${availableStock} libras disponibles` }
    }
    
    return { valid: true, quantity: numQty }
  }

  it('debe aceptar cantidades válidas', () => {
    expect(validateQuantity('5', 50).valid).toBe(true)
    expect(validateQuantity('0.5', 50).valid).toBe(true)
    expect(validateQuantity('50', 50).valid).toBe(true)
  })

  it('debe rechazar cantidades negativas', () => {
    const result = validateQuantity('-5', 50)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('número positivo')
  })

  it('debe rechazar cero', () => {
    const result = validateQuantity('0', 50)
    expect(result.valid).toBe(false)
  })

  it('debe rechazar cantidades que exceden el stock', () => {
    const result = validateQuantity('100', 50)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('Solo hay 50 libras')
  })

  it('debe rechazar valores no numéricos', () => {
    expect(validateQuantity('abc', 50).valid).toBe(false)
    expect(validateQuantity('', 50).valid).toBe(false)
  })
})

describe('Cálculo de precios de mezcla', () => {
  
  const calculateProductPrice = (products, productCode, quantity) => {
    const product = products.find(p => p.code === productCode)
    if (!product) return 0
    return product.retailPrice * quantity
  }

  const calculateTotalPrice = (products, components) => {
    return components.reduce((total, component) => {
      return total + calculateProductPrice(products, component.productCode, component.quantity)
    }, 0)
  }

  it('debe calcular precio de un producto correctamente', () => {
    // Almendras Premium tiene retailPrice: 17.99
    const price = calculateProductPrice(mockProducts, 'A01', 2)
    expect(price).toBeCloseTo(35.98, 2)
  })

  it('debe calcular precio total de mezcla correctamente', () => {
    const components = [
      { productCode: 'A01', quantity: 2 }, // 17.99 * 2 = 35.98
      { productCode: 'P01', quantity: 1 }  // 10.99 * 1 = 10.99
    ]
    
    const total = calculateTotalPrice(mockProducts, components)
    expect(total).toBeCloseTo(46.97, 2)
  })

  it('debe retornar 0 para producto no encontrado', () => {
    const price = calculateProductPrice(mockProducts, 'NOEXISTE', 5)
    expect(price).toBe(0)
  })

  it('debe manejar mezcla vacía', () => {
    const total = calculateTotalPrice(mockProducts, [])
    expect(total).toBe(0)
  })
})

describe('Cálculos nutricionales', () => {
  
  const nutritionalData = {
    'A01': { calories: 579, protein: 21.2, fat: 49.9, carbs: 21.6, fiber: 12.5 },
    'N01': { calories: 654, protein: 15.2, fat: 65.2, carbs: 13.7, fiber: 6.7 },
    'P01': { calories: 299, protein: 3.1, fat: 0.5, carbs: 79.2, fiber: 3.7 },
    'P02': { calories: 560, protein: 20.2, fat: 45.3, carbs: 27.2, fiber: 10.6 },
    'A02': { calories: 628, protein: 14.9, fat: 60.8, carbs: 16.7, fiber: 9.7 }
  }

  const calculateMixNutrition = (components) => {
    const totals = {
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      fiber: 0
    }

    components.forEach(component => {
      const nutrition = nutritionalData[component.productCode]
      if (nutrition) {
        const factor = component.quantity
        totals.calories += nutrition.calories * factor
        totals.protein += nutrition.protein * factor
        totals.fat += nutrition.fat * factor
        totals.carbs += nutrition.carbs * factor
        totals.fiber += nutrition.fiber * factor
      }
    })

    return {
      calories: Math.round(totals.calories * 100) / 100,
      protein: Math.round(totals.protein * 100) / 100,
      fat: Math.round(totals.fat * 100) / 100,
      carbs: Math.round(totals.carbs * 100) / 100,
      fiber: Math.round(totals.fiber * 100) / 100
    }
  }

  it('debe calcular calorías totales correctamente', () => {
    const components = [
      { productCode: 'A01', quantity: 1 } // 579 calorías
    ]
    
    const nutrition = calculateMixNutrition(components)
    expect(nutrition.calories).toBe(579)
  })

  it('debe sumar nutrientes de múltiples componentes', () => {
    const components = [
      { productCode: 'A01', quantity: 1 }, // 579 cal
      { productCode: 'P01', quantity: 1 }  // 299 cal
    ]
    
    const nutrition = calculateMixNutrition(components)
    expect(nutrition.calories).toBe(878) // 579 + 299
  })

  it('debe multiplicar por cantidad correctamente', () => {
    const components = [
      { productCode: 'A01', quantity: 2 } // 579 * 2 = 1158
    ]
    
    const nutrition = calculateMixNutrition(components)
    expect(nutrition.calories).toBe(1158)
  })

  it('debe ignorar productos sin datos nutricionales', () => {
    const components = [
      { productCode: 'NOEXISTE', quantity: 1 }
    ]
    
    const nutrition = calculateMixNutrition(components)
    expect(nutrition.calories).toBe(0)
  })

  it('debe calcular todos los macronutrientes', () => {
    const components = [
      { productCode: 'A01', quantity: 1 }
    ]
    
    const nutrition = calculateMixNutrition(components)
    expect(nutrition.protein).toBe(21.2)
    expect(nutrition.fat).toBe(49.9)
    expect(nutrition.carbs).toBe(21.6)
    expect(nutrition.fiber).toBe(12.5)
  })
})

describe('Gestión de componentes de mezcla', () => {
  
  const addComponent = (components, newComponent) => {
    // Verificar si el producto ya existe en la mezcla
    const existingIndex = components.findIndex(
      c => c.productCode === newComponent.productCode
    )
    
    if (existingIndex !== -1) {
      // Actualizar cantidad existente
      const updated = [...components]
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + newComponent.quantity
      }
      return updated
    }
    
    return [...components, newComponent]
  }

  const removeComponent = (components, productCode) => {
    return components.filter(c => c.productCode !== productCode)
  }

  const updateComponentQuantity = (components, productCode, newQuantity) => {
    return components.map(c => 
      c.productCode === productCode 
        ? { ...c, quantity: newQuantity }
        : c
    )
  }

  it('debe agregar nuevo componente', () => {
    const initial = []
    const result = addComponent(initial, { productCode: 'A01', quantity: 2 })
    
    expect(result.length).toBe(1)
    expect(result[0].productCode).toBe('A01')
    expect(result[0].quantity).toBe(2)
  })

  it('debe sumar cantidad si el producto ya existe', () => {
    const initial = [{ productCode: 'A01', quantity: 2 }]
    const result = addComponent(initial, { productCode: 'A01', quantity: 3 })
    
    expect(result.length).toBe(1)
    expect(result[0].quantity).toBe(5)
  })

  it('debe eliminar componente', () => {
    const initial = [
      { productCode: 'A01', quantity: 2 },
      { productCode: 'N01', quantity: 1 }
    ]
    
    const result = removeComponent(initial, 'A01')
    expect(result.length).toBe(1)
    expect(result[0].productCode).toBe('N01')
  })

  it('debe actualizar cantidad de componente', () => {
    const initial = [{ productCode: 'A01', quantity: 2 }]
    const result = updateComponentQuantity(initial, 'A01', 5)
    
    expect(result[0].quantity).toBe(5)
  })

  it('no debe modificar otros componentes al actualizar', () => {
    const initial = [
      { productCode: 'A01', quantity: 2 },
      { productCode: 'N01', quantity: 1 }
    ]
    
    const result = updateComponentQuantity(initial, 'A01', 5)
    expect(result[1].quantity).toBe(1)
  })
})

describe('Persistencia de mezclas guardadas', () => {
  
  const saveMix = (savedMixes, newMix) => {
    const mix = {
      ...newMix,
      id: `mix-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    return [...savedMixes, mix]
  }

  const deleteMix = (savedMixes, mixId) => {
    return savedMixes.filter(m => m.id !== mixId)
  }

  const getMixById = (savedMixes, mixId) => {
    return savedMixes.find(m => m.id === mixId)
  }

  it('debe guardar nueva mezcla con ID único', () => {
    const newMix = {
      name: 'Mi Mezcla',
      components: [{ productCode: 'A01', quantity: 2 }]
    }
    
    const result = saveMix([], newMix)
    expect(result.length).toBe(1)
    expect(result[0].id).toContain('mix-')
    expect(result[0].createdAt).toBeDefined()
  })

  it('debe eliminar mezcla guardada', () => {
    const result = deleteMix(mockMixes, 'mix-1')
    expect(result.length).toBe(0)
  })

  it('debe encontrar mezcla por ID', () => {
    const mix = getMixById(mockMixes, 'mix-1')
    expect(mix).toBeDefined()
    expect(mix.name).toBe('Mezcla Energética')
  })

  it('debe retornar undefined para ID inexistente', () => {
    const mix = getMixById(mockMixes, 'noexiste')
    expect(mix).toBeUndefined()
  })
})

describe('Validación completa de mezcla', () => {
  
  const validateMix = (mix, products) => {
    const errors = []
    
    // Validar nombre
    if (!mix.name || mix.name.trim().length < 3) {
      errors.push('El nombre de la mezcla es requerido (mínimo 3 caracteres)')
    }
    
    // Validar componentes
    if (!mix.components || mix.components.length === 0) {
      errors.push('La mezcla debe tener al menos un componente')
    } else {
      // Verificar stock de cada componente
      mix.components.forEach(comp => {
        const product = products.find(p => p.code === comp.productCode)
        if (!product) {
          errors.push(`Producto ${comp.productCode} no encontrado`)
        } else if (comp.quantity > product.stock) {
          errors.push(`Stock insuficiente para ${product.name}`)
        }
      })
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }

  it('debe validar mezcla correcta', () => {
    const mix = {
      name: 'Mezcla Test',
      components: [{ productCode: 'A01', quantity: 5 }]
    }
    
    const result = validateMix(mix, mockProducts)
    expect(result.valid).toBe(true)
  })

  it('debe detectar nombre faltante', () => {
    const mix = {
      name: '',
      components: [{ productCode: 'A01', quantity: 5 }]
    }
    
    const result = validateMix(mix, mockProducts)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('El nombre de la mezcla es requerido (mínimo 3 caracteres)')
  })

  it('debe detectar componentes vacíos', () => {
    const mix = {
      name: 'Mezcla Test',
      components: []
    }
    
    const result = validateMix(mix, mockProducts)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('La mezcla debe tener al menos un componente')
  })

  it('debe detectar múltiples errores', () => {
    const mix = {
      name: '',
      components: []
    }
    
    const result = validateMix(mix, mockProducts)
    expect(result.errors.length).toBeGreaterThanOrEqual(2)
  })
})
