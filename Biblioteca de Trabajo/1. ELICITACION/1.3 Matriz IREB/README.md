# Matriz de Requisitos IREB - Kairos Mix

Este directorio contiene los documentos que forman parte del Elemento de Configuración del Software (ECS) relacionado con la matriz de requisitos basada en el estándar IREB para el proyecto **Kairos Mix**.

## Información del ECS

- **Código del ECS:** IREB
- **Nombre del ECS:** Matriz de Requisitos IREB
- **Autor:** Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez
- **Proyecto:** Kairos Mix - Tienda de frutos secos "Kairos de Dios"
- **Línea base:** LBR - Línea Base Requisitos
- **Tipo de ECS:** Documentos (DOCX/XLSX)
- **Fecha de creación:** 14/01/2026
- **ID del proyecto:** 27837_G6_ADS

## Contenido del Directorio

### Matrices IREB (Excel)
- `Matriz_IREB-KairosMix_V1.xlsx` - Primera versión de la matriz de requisitos
- `Matriz_IREB-KairosMix_V2.xlsx` - Segunda versión actualizada de la matriz

### Informes (Word)
- `Informe_Matriz_IREB-KairosMix_V1.docx` - Informe descriptivo de la matriz V1
- `Informe_Matriz_IREB-KairosMix_V2.docx` - Informe descriptivo actualizado de la matriz V2

### Documentación
- `README.md` - Este archivo de documentación

## Historial de Versiones

| Archivo | Versión | Fecha | Tamaño | Responsable | Aprobado por |
|---------|---------|-------|--------|-------------|--------------|
| `Matriz_IREB-KairosMix_V1.xlsx` | V1 | 14/01/2026 | 94 KB | Caetano Flores | Jordan Guaman, Anthony Morales |
| `Matriz_IREB-KairosMix_V2.xlsx` | V2 | 15/01/2026 | 94 KB | Caetano Flores | Jordan Guaman, Anthony Morales |
| `Informe_Matriz_IREB-KairosMix_V1.docx` | V1 | 15/01/2026 | 2,857 KB | Caetano Flores | Jordan Guaman, Leonardo Narvaez |
| `Informe_Matriz_IREB-KairosMix_V2.docx` | V2 | 20/01/2026 | 2,857 KB | Caetano Flores | Jordan Guaman, Leonardo Narvaez |

## Descripción de la Matriz IREB

La Matriz IREB (International Requirements Engineering Board) es un documento estructurado que organiza y relaciona todos los requisitos del sistema Kairos Mix siguiendo las mejores prácticas internacionales de ingeniería de requisitos.

### Propósito

- Documentar de forma sistemática todos los requisitos funcionales y no funcionales
- Establecer la trazabilidad entre requisitos, casos de uso, diseño y pruebas
- Facilitar la gestión de cambios y el control de versiones
- Garantizar la completitud y coherencia de los requisitos

## Trazabilidad de Requisitos

La matriz IREB establece las siguientes relaciones de trazabilidad:

1. **Requisitos Funcionales (RF)** → **Casos de Uso (CU)**
2. **Casos de Uso (CU)** → **Componentes de Diseño** (Clases/Servicios)
3. **Componentes de Diseño** → **Casos de Prueba (TC)**

### Ejemplo de Trazabilidad

**RF-005: Cálculo Nutricional**
- **Caso de Uso:** CU-004 - KM_Diseñar Mezcla Personalizada
- **Componente:** NutricionalService
- **Método:** `calcularValoresNutricionales()`
- **Prueba:** TC-005-001 (Verificar suma correcta de calorías)

## Estructura de la Matriz

La matriz incluye los siguientes elementos:

- **ID de Requisito:** Identificador único del requisito
- **Descripción:** Descripción detallada del requisito
- **Prioridad:** Alta, Media o Baja
- **Tipo:** Funcional o No Funcional
- **Casos de Uso Relacionados:** Referencias a CU asociados
- **Componentes de Diseño:** Clases y servicios que implementan el requisito
- **Estado:** En desarrollo, Completado, Validado, etc.
- **Casos de Prueba:** Tests que verifican el requisito

## Uso de los Documentos

### Matriz Excel (*.xlsx)
Contiene la matriz completa con todas las relaciones de trazabilidad en formato tabular, permitiendo filtrado, ordenación y análisis de datos.

### Informe Word (*.docx)
Proporciona un documento narrativo que describe la matriz, su estructura, metodología aplicada y análisis de los requisitos identificados.

## Gestión de Versiones

Todas las versiones de estos documentos están bajo control de configuración y forman parte de la línea base de requisitos del proyecto. Cualquier modificación debe seguir el proceso de gestión de cambios establecido.

## Última Actualización

**Fecha:** 27/01/2026  
