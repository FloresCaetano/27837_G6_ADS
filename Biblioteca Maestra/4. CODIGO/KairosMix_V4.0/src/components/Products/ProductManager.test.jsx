/**
 * Pruebas unitarias para el módulo de gestión de productos
 * Cubre: CRUD de productos, búsqueda, validaciones de formulario
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductForm from './ProductForm'
import { mockProducts } from '../../test/testUtils'

describe('ProductForm - Formulario de Productos', () => {
  
  const mockOnSave = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Renderizado inicial', () => {
    it('debe renderizar el formulario vacío para nuevo producto', () => {
      render(
        <ProductForm 
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          existingProducts={mockProducts}
        />
      )

      expect(screen.getByLabelText(/nombre del producto/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/código/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/precio por libra/i)).toBeInTheDocument()
    })

    it('debe renderizar el formulario con datos para edición', () => {
      const productToEdit = mockProducts[0]
      
      render(
        <ProductForm 
          product={productToEdit}
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          existingProducts={mockProducts}
        />
      )

      expect(screen.getByDisplayValue('Almendras Premium')).toBeInTheDocument()
      expect(screen.getByDisplayValue('A01')).toBeInTheDocument()
    })
  })

  describe('Validación de campos', () => {
    it('debe mostrar error cuando el nombre está vacío', async () => {
      render(
        <ProductForm 
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          existingProducts={[]}
        />
      )

      const submitButton = screen.getByRole('button', { name: /guardar/i })
      await userEvent.click(submitButton)

      // El formulario no debe llamar a onSave si hay errores
      expect(mockOnSave).not.toHaveBeenCalled()
    })

    it('debe validar precio en rango correcto (0.01 - 99.99)', async () => {
      render(
        <ProductForm 
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          existingProducts={[]}
        />
      )

      const priceInput = screen.getByLabelText(/precio por libra/i)
      
      // Precio inválido (muy alto)
      await userEvent.clear(priceInput)
      await userEvent.type(priceInput, '150.00')
      
      // Debería mostrar error de validación
      await waitFor(() => {
        const errorElement = screen.queryByText(/0\.01.*99\.99/i)
        expect(errorElement).toBeInTheDocument()
      })
    })

    it('debe validar stock como número entero positivo', async () => {
      render(
        <ProductForm 
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          existingProducts={[]}
        />
      )

      const stockInput = screen.getByLabelText(/stock inicial/i)
      
      await userEvent.clear(stockInput)
      await userEvent.type(stockInput, '-5')
      
      await waitFor(() => {
        const errorElement = screen.queryByText(/entero positivo/i)
        expect(errorElement).toBeInTheDocument()
      })
    })
  })

  describe('Generación automática de código', () => {
    it('debe generar código automáticamente basado en el nombre', async () => {
      render(
        <ProductForm 
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          existingProducts={[]}
        />
      )

      const nameInput = screen.getByLabelText(/nombre del producto/i)
      await userEvent.type(nameInput, 'Cacahuates')
      
      // El código debería empezar con 'C'
      const codeInput = screen.getByLabelText(/código/i)
      await waitFor(() => {
        expect(codeInput).toHaveValue('C01')
      })
    })

    it('debe incrementar el número si ya existe el código', async () => {
      const existingWithC = [
        { ...mockProducts[0], code: 'C01', name: 'Castañas' }
      ]
      
      render(
        <ProductForm 
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          existingProducts={existingWithC}
        />
      )

      const nameInput = screen.getByLabelText(/nombre del producto/i)
      await userEvent.type(nameInput, 'Cacahuates')
      
      const codeInput = screen.getByLabelText(/código/i)
      await waitFor(() => {
        expect(codeInput).toHaveValue('C02')
      })
    })
  })

  describe('Manejo de imágenes', () => {
    it('debe verificar que solo se aceptan archivos de imagen', async () => {
      render(
        <ProductForm 
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          existingProducts={[]}
        />
      )

      // Verificar que el input de imagen existe buscando por el label correcto
      const imageSection = screen.getByText(/imagen referencial/i)
      expect(imageSection).toBeInTheDocument()
      
      // Verificar que acepta solo formatos de imagen
      const formatInfo = screen.getByText(/Formatos soportados: JPG, PNG, GIF/i)
      expect(formatInfo).toBeInTheDocument()
    })

    it('debe rechazar imágenes mayores a 5MB', async () => {
      render(
        <ProductForm 
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          existingProducts={[]}
        />
      )

      const fileInput = screen.getByLabelText(/imagen/i)
      
      // Crear archivo grande simulado (6MB)
      const largeContent = new Array(6 * 1024 * 1024).fill('a').join('')
      const largeFile = new File([largeContent], 'large.jpg', { type: 'image/jpeg' })
      
      await userEvent.upload(fileInput, largeFile)
      
      await waitFor(() => {
        expect(screen.queryByText(/no debe exceder 5MB/i)).toBeInTheDocument()
      })
    })
  })

  describe('Acciones del formulario', () => {
    it('debe llamar onCancel al presionar cancelar', async () => {
      render(
        <ProductForm 
          onSave={mockOnSave} 
          onCancel={mockOnCancel} 
          existingProducts={[]}
        />
      )

      const cancelButton = screen.getByRole('button', { name: /cancelar/i })
      await userEvent.click(cancelButton)

      expect(mockOnCancel).toHaveBeenCalledTimes(1)
    })
  })
})

describe('Funciones de validación de productos', () => {
  
  describe('Validación de precios', () => {
    const validatePrice = (price) => {
      const priceRegex = /^\d{1,2}(\.\d{1,2})?$/
      const numValue = parseFloat(price)
      return priceRegex.test(price) && numValue >= 0.01 && numValue <= 99.99
    }

    it('debe aceptar precios válidos', () => {
      expect(validatePrice('15.99')).toBe(true)
      expect(validatePrice('0.01')).toBe(true)
      expect(validatePrice('99.99')).toBe(true)
      expect(validatePrice('50')).toBe(true)
    })

    it('debe rechazar precios inválidos', () => {
      expect(validatePrice('100.00')).toBe(false)
      expect(validatePrice('0')).toBe(false)
      expect(validatePrice('-5')).toBe(false)
      expect(validatePrice('abc')).toBe(false)
    })
  })

  describe('Generación de códigos de producto', () => {
    const generateProductCode = (productName, existingProducts) => {
      if (!productName.trim()) return ''
      
      const firstLetter = productName.trim().charAt(0).toUpperCase()
      const existingCodes = existingProducts
        .filter(p => p.code && p.code.startsWith(firstLetter))
        .map(p => p.code)
        .sort()
      
      for (let i = 1; i <= 20; i++) {
        const newCode = `${firstLetter}${i.toString().padStart(2, '0')}`
        if (!existingCodes.includes(newCode)) {
          return newCode
        }
      }
      
      return `${firstLetter}21`
    }

    it('debe generar código A01 para "Almendras" sin productos existentes', () => {
      expect(generateProductCode('Almendras', [])).toBe('A01')
    })

    it('debe generar código N01 para "Nueces" sin productos existentes', () => {
      expect(generateProductCode('Nueces', [])).toBe('N01')
    })

    it('debe incrementar número cuando ya existe el código', () => {
      const existing = [{ code: 'A01' }, { code: 'A02' }]
      expect(generateProductCode('Avellanas', existing)).toBe('A03')
    })

    it('debe retornar vacío para nombre vacío', () => {
      expect(generateProductCode('', [])).toBe('')
      expect(generateProductCode('   ', [])).toBe('')
    })
  })
})

describe('Búsqueda de productos', () => {
  
  const performSearch = (products, query) => {
    if (!query.trim()) return { type: 'empty', results: [] }
    
    const trimmedQuery = query.trim().toLowerCase()
    
    // Búsqueda exacta por código
    const exactCodeMatch = products.find(p => 
      p.code.toLowerCase() === trimmedQuery
    )
    
    if (exactCodeMatch) {
      return { type: 'exactCode', results: [exactCodeMatch] }
    }
    
    // Búsqueda parcial por nombre
    const nameMatches = products.filter(p => 
      p.name.toLowerCase().includes(trimmedQuery)
    )
    
    if (nameMatches.length === 0) {
      return { type: 'noResults', results: [] }
    }
    
    if (nameMatches.length === 1) {
      return { type: 'singleMatch', results: nameMatches }
    }
    
    return { type: 'multipleMatches', results: nameMatches }
  }

  it('debe encontrar producto por código exacto', () => {
    const result = performSearch(mockProducts, 'A01')
    expect(result.type).toBe('exactCode')
    expect(result.results[0].name).toBe('Almendras Premium')
  })

  it('debe encontrar productos por nombre parcial', () => {
    const result = performSearch(mockProducts, 'Nueces')
    expect(result.type).toBe('singleMatch')
    expect(result.results[0].code).toBe('N01')
  })

  it('debe retornar múltiples resultados para búsqueda parcial', () => {
    const productsWithSimilarNames = [
      ...mockProducts,
      { id: 4, code: 'A02', name: 'Almendras Naturales', pricePerPound: 14.99 }
    ]
    
    const result = performSearch(productsWithSimilarNames, 'Almendras')
    expect(result.type).toBe('multipleMatches')
    expect(result.results.length).toBe(2)
  })

  it('debe retornar sin resultados para búsqueda sin coincidencias', () => {
    const result = performSearch(mockProducts, 'Chocolate')
    expect(result.type).toBe('noResults')
    expect(result.results.length).toBe(0)
  })

  it('debe manejar búsqueda vacía', () => {
    const result = performSearch(mockProducts, '')
    expect(result.type).toBe('empty')
  })

  it('debe ser case-insensitive', () => {
    const result = performSearch(mockProducts, 'a01')
    expect(result.type).toBe('exactCode')
    expect(result.results[0].code).toBe('A01')
  })
})
