/**
 * NutricionalService
 * Servicio responsable de calcular valores nutricionales
 * de las mezclas de frutos secos para KairosMix
 * 
 * Este servicio implementa el requisito del backlog:
 * "Sistema invoca NutricionalService.calcularValoresNutricionales()"
 * 
 * @module NutricionalService
 * @since v4.0
 * @author KairosMix Team
 */

class NutricionalService {
  /**
   * Base de datos nutricional de productos
   * Valores basados en 1 libra (453.6g) de producto
   * Fuentes: USDA FoodData Central
   * 
   * @static
   * @type {Object}
   */
  static nutritionalDatabase = {
    'A01': { // Almendras Premium
      name: 'Almendras Premium',
      calories: 579,
      protein: 21.2,
      fat: 49.9,
      carbs: 21.6,
      fiber: 12.5,
      vitamins: ['E', 'B2', 'Niacina'],
      minerals: ['Magnesio', 'Calcio', 'Hierro'],
      description: 'Almendras crudas, ricas en vitamina E'
    },
    'N01': { // Nueces de Castilla
      name: 'Nueces de Castilla',
      calories: 654,
      protein: 15.2,
      fat: 65.2,
      carbs: 13.7,
      fiber: 6.7,
      vitamins: ['E', 'B6', 'Folato'],
      minerals: ['Manganeso', 'Cobre', 'Magnesio'],
      description: 'Nueces con alto contenido de ácidos grasos Omega-3'
    },
    'P01': { // Pasas Sultan
      name: 'Pasas Sultan',
      calories: 299,
      protein: 3.1,
      fat: 0.5,
      carbs: 79.2,
      fiber: 3.7,
      vitamins: ['K', 'B6', 'Tiamina'],
      minerals: ['Potasio', 'Hierro', 'Manganeso'],
      description: 'Pasas dulces, excelente fuente de energía'
    },
    'P02': { // Pistachos Tostados
      name: 'Pistachos Tostados',
      calories: 560,
      protein: 20.2,
      fat: 45.3,
      carbs: 27.2,
      fiber: 10.6,
      vitamins: ['B6', 'Tiamina', 'E'],
      minerals: ['Cobre', 'Manganeso', 'Fósforo'],
      description: 'Pistachos tostados sin sal, proteína vegetal completa'
    },
    'A02': { // Avellanas Enteras
      name: 'Avellanas Enteras',
      calories: 628,
      protein: 14.9,
      fat: 60.8,
      carbs: 16.7,
      fiber: 9.7,
      vitamins: ['E', 'B6', 'Folato'],
      minerals: ['Manganeso', 'Cobre', 'Magnesio'],
      description: 'Avellanas premium, ricas en antioxidantes'
    },
    'C01': { // Castañas de Cajú
      name: 'Castañas de Cajú',
      calories: 553,
      protein: 18.2,
      fat: 43.8,
      carbs: 30.2,
      fiber: 3.3,
      vitamins: ['K', 'B6', 'Tiamina'],
      minerals: ['Cobre', 'Magnesio', 'Fósforo'],
      description: 'Anacardos tostados, ricos en minerales'
    },
    'M01': { // Maní Tostado
      name: 'Maní Tostado',
      calories: 567,
      protein: 25.8,
      fat: 49.2,
      carbs: 16.1,
      fiber: 8.5,
      vitamins: ['E', 'Niacina', 'Folato'],
      minerals: ['Magnesio', 'Fósforo', 'Zinc'],
      description: 'Cacahuates tostados, alta proteína'
    },
    'D01': { // Dátiles Medjool
      name: 'Dátiles Medjool',
      calories: 277,
      protein: 1.8,
      fat: 0.2,
      carbs: 75.0,
      fiber: 6.7,
      vitamins: ['B6', 'Niacina', 'Ácido Pantoténico'],
      minerals: ['Potasio', 'Magnesio', 'Cobre'],
      description: 'Dátiles naturales, endulzante natural'
    },
    'S01': { // Semillas de Girasol
      name: 'Semillas de Girasol',
      calories: 584,
      protein: 20.8,
      fat: 51.5,
      carbs: 20.0,
      fiber: 8.6,
      vitamins: ['E', 'B1', 'B6'],
      minerals: ['Selenio', 'Fósforo', 'Magnesio'],
      description: 'Semillas peladas, ricas en vitamina E'
    },
    'S02': { // Semillas de Calabaza
      name: 'Semillas de Calabaza',
      calories: 559,
      protein: 30.2,
      fat: 49.1,
      carbs: 10.7,
      fiber: 6.0,
      vitamins: ['K', 'E', 'B2'],
      minerals: ['Zinc', 'Magnesio', 'Hierro'],
      description: 'Pepitas verdes, alto contenido de zinc'
    }
  };

  /**
   * Calcula los valores nutricionales de una mezcla
   * Este es el método principal especificado en el backlog
   * 
   * @param {Array} components - Array de componentes de la mezcla
   * @param {string} components[].productCode - Código del producto (ej: 'A01')
   * @param {number} components[].quantity - Cantidad en libras
   * @returns {Object} Objeto con valores nutricionales totales
   * 
   * @example
   * const mixture = [
   *   { productCode: 'A01', quantity: 0.5 },
   *   { productCode: 'N01', quantity: 0.3 }
   * ];
   * const nutrition = NutricionalService.calcularValoresNutricionales(mixture);
   * console.log(nutrition.calories); // 486.1
   */
  static calcularValoresNutricionales(components) {
    if (!components || components.length === 0) {
      return {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        fiber: 0,
        vitamins: [],
        minerals: [],
        totalWeight: 0,
        calculatedAt: new Date().toISOString()
      };
    }

    const totalNutrition = {
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      fiber: 0,
      vitamins: new Set(),
      minerals: new Set()
    };

    let totalWeight = 0;

    // Iterar sobre cada componente y acumular valores
    components.forEach(component => {
      const nutrition = this.nutritionalDatabase[component.productCode];
      
      if (nutrition) {
        const factor = component.quantity; // quantity está en libras
        totalWeight += factor;
        
        // Multiplicar valores nutricionales por la cantidad
        totalNutrition.calories += nutrition.calories * factor;
        totalNutrition.protein += nutrition.protein * factor;
        totalNutrition.fat += nutrition.fat * factor;
        totalNutrition.carbs += nutrition.carbs * factor;
        totalNutrition.fiber += nutrition.fiber * factor;
        
        // Agregar vitaminas y minerales (usar Set para evitar duplicados)
        nutrition.vitamins.forEach(v => totalNutrition.vitamins.add(v));
        nutrition.minerals.forEach(m => totalNutrition.minerals.add(m));
      }
    });

    // Convertir Sets a Arrays y redondear valores
    return {
      calories: Math.round(totalNutrition.calories * 10) / 10,
      protein: Math.round(totalNutrition.protein * 10) / 10,
      fat: Math.round(totalNutrition.fat * 10) / 10,
      carbs: Math.round(totalNutrition.carbs * 10) / 10,
      fiber: Math.round(totalNutrition.fiber * 10) / 10,
      vitamins: Array.from(totalNutrition.vitamins),
      minerals: Array.from(totalNutrition.minerals),
      totalWeight: Math.round(totalWeight * 100) / 100,
      calculatedAt: new Date().toISOString()
    };
  }

  /**
   * Obtiene el perfil nutricional de un producto específico
   * 
   * @param {string} productCode - Código del producto
   * @returns {Object|null} Datos nutricionales o null si no existe
   */
  static obtenerNutricionProducto(productCode) {
    return this.nutritionalDatabase[productCode] || null;
  }

  /**
   * Valida si un código de producto tiene datos nutricionales
   * 
   * @param {string} productCode - Código del producto
   * @returns {boolean} true si existe, false si no
   */
  static tieneNutricion(productCode) {
    return productCode in this.nutritionalDatabase;
  }

  /**
   * Calcula calorías por porción personalizada
   * 
   * @param {number} caloriesPerPound - Calorías por libra
   * @param {number} grams - Cantidad en gramos
   * @returns {number} Calorías en la porción especificada
   */
  static calcularCaloriasPorPorcion(caloriesPerPound, grams) {
    const gramsPerPound = 453.6;
    return Math.round((caloriesPerPound * grams / gramsPerPound) * 10) / 10;
  }

  /**
   * Obtiene todos los productos disponibles con información nutricional
   * 
   * @returns {Array} Array de objetos con código y nombre de productos
   */
  static obtenerProductosDisponibles() {
    return Object.entries(this.nutritionalDatabase).map(([code, data]) => ({
      code,
      name: data.name,
      description: data.description
    }));
  }

  /**
   * Calcula el promedio nutricional de una mezcla por libra
   * 
   * @param {Array} components - Componentes de la mezcla
   * @returns {Object|null} Valores nutricionales promedio por libra o null si está vacío
   */
  static calcularPromedioNutricional(components) {
    if (!components || components.length === 0) {
      return null;
    }

    const totalNutrition = this.calcularValoresNutricionales(components);
    const totalPounds = components.reduce((sum, c) => sum + c.quantity, 0);

    if (totalPounds === 0) return null;

    return {
      caloriesPerPound: Math.round((totalNutrition.calories / totalPounds) * 10) / 10,
      proteinPerPound: Math.round((totalNutrition.protein / totalPounds) * 10) / 10,
      fatPerPound: Math.round((totalNutrition.fat / totalPounds) * 10) / 10,
      carbsPerPound: Math.round((totalNutrition.carbs / totalPounds) * 10) / 10,
      fiberPerPound: Math.round((totalNutrition.fiber / totalPounds) * 10) / 10
    };
  }

  /**
   * Genera un resumen nutricional para mostrar al usuario
   * 
   * @param {Array} components - Componentes de la mezcla
   * @returns {Object} Resumen con información formateada para UI
   */
  static generarResumenNutricional(components) {
    const nutrition = this.calcularValoresNutricionales(components);
    const promedio = this.calcularPromedioNutricional(components);

    return {
      total: nutrition,
      promedioPorLibra: promedio,
      resumen: {
        esAltoEnProteinas: nutrition.protein > 20,
        esAltoEnFibra: nutrition.fiber > 10,
        esBajoEnGrasas: nutrition.fat < 30,
        caloriasPorcion100g: this.calcularCaloriasPorPorcion(
          promedio?.caloriesPerPound || 0, 
          100
        )
      },
      recomendaciones: this.generarRecomendaciones(nutrition)
    };
  }

  /**
   * Genera recomendaciones nutricionales basadas en la mezcla
   * 
   * @param {Object} nutrition - Datos nutricionales
   * @returns {Array} Array de strings con recomendaciones
   */
  static generarRecomendaciones(nutrition) {
    const recomendaciones = [];

    if (nutrition.protein > 25) {
      recomendaciones.push('✅ Excelente fuente de proteínas para deportistas');
    }
    if (nutrition.fiber > 15) {
      recomendaciones.push('✅ Alto contenido en fibra para digestión saludable');
    }
    if (nutrition.vitamins.includes('E')) {
      recomendaciones.push('✅ Rica en vitamina E, antioxidante natural');
    }
    if (nutrition.minerals.includes('Magnesio')) {
      recomendaciones.push('✅ Contiene magnesio para salud muscular');
    }
    if (nutrition.calories > 800) {
      recomendaciones.push('⚠️ Alto contenido calórico, consumir con moderación');
    }

    return recomendaciones;
  }

  /**
   * Agrega información nutricional para un nuevo producto
   * 
   * @param {string} productCode - Código del producto
   * @param {Object} nutritionData - Datos nutricionales
   * @returns {boolean} true si se agregó correctamente
   */
  static agregarProducto(productCode, nutritionData) {
    if (this.nutritionalDatabase[productCode]) {
      console.warn(`Producto ${productCode} ya existe en la base de datos`);
      return false;
    }

    this.nutritionalDatabase[productCode] = {
      ...nutritionData,
      vitamins: nutritionData.vitamins || [],
      minerals: nutritionData.minerals || []
    };

    return true;
  }

  /**
   * Actualiza información nutricional de un producto existente
   * 
   * @param {string} productCode - Código del producto
   * @param {Object} nutritionData - Nuevos datos nutricionales
   * @returns {boolean} true si se actualizó correctamente
   */
  static actualizarProducto(productCode, nutritionData) {
    if (!this.nutritionalDatabase[productCode]) {
      console.warn(`Producto ${productCode} no existe en la base de datos`);
      return false;
    }

    this.nutritionalDatabase[productCode] = {
      ...this.nutritionalDatabase[productCode],
      ...nutritionData
    };

    return true;
  }
}

export default NutricionalService;
