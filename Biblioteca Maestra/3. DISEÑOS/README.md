# 3. DISEÑOS - Kairos Mix

## Resumen General de Diseños

| **Código** | **Nombre**                      | **Especificación**                                        | **Encargados**                                                                    |
| ---------- | ------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| PAT        | Patrón Modelo Vista Controlador | Implementación del patrón MVC + Observer para Kairos Mix  | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narváez                  |
| ARQ        | Arquitectura                    | Arquitectura de 3 capas para el sistema Kairos Mix        | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narváez                  |
| CU         | Casos de Uso Extendidos         | Documentación y definición de casos de uso del sistema    | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narváez                  |
| DC         | Diagrama de Clases              | Diagramas UML de clases para el sistema                   | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narváez                  |
| COMP       | Diagrama de Componentes         | Diseño de componentes backend y frontend                  | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narváez                  |

---

## Estructura de Carpetas

### 1.0 Patrón de Diseño
Documentación de los patrones implementados:
- **MVC:** Separación de responsabilidades entre Modelo, Vista y Controlador
- **Observer:** Sistema de logging y auditoría para trazabilidad

### 1.2 Diseño de Arquitectura
Arquitectura de 3 capas del sistema:
- Capa de Presentación (React + Bootstrap)
- Capa de Lógica de Negocio (Node.js)
- Capa de Persistencia (MySQL)

### 1.3 Casos de Uso Extendido
Casos de uso detallados del sistema:
- KM_Gestionar Productos
- KM_Gestionar Clientes
- KM_Gestionar Pedidos
- KM_Diseñar Mezcla Personalizada

### 1.4 Diagrama de Clases
Diagrama UML de clases principales:
- Producto
- Cliente
- Pedido
- MezclaPersonalizada
- NutricionalService
- LogObserver

### 1.5 Diagrama de Componentes
Diagramas de componentes para:
- Backend (Controllers, Services, Models)
- Frontend (Components, Views, Pages)

---

## Estándar Aplicado

**IEEE Std 1016-2009** - Software Design Descriptions

### Viewpoints Implementados:

#### 1. Lógico (Logical)
Diagrama de Clases con todas las entidades del sistema.

#### 2. Interacción (Interaction)
Diagramas de Secuencia mostrando el flujo desde la Vista hasta la Base de Datos.

#### 3. Información (Information)
- Diagrama Entidad-Relación (ER)
- Diccionario de Datos

#### 4. Dinámica de Estados
- Estados de Pedidos: Por Preparar → Preparado → Entregado
- Navegación entre páginas: Main → Profile → Mix Designer

---

## Principios de Diseño

### Modularidad
Cada componente puede modificarse sin afectar otros módulos del sistema.

### Alta Cohesión
Cada controlador tiene una responsabilidad única y bien definida:
- `PedidoController`: Gestión de pedidos
- `MezclaController`: Diseño de mezclas
- `ProductoController`: Gestión de inventario
- `ClienteController`: Gestión de clientes

### Bajo Acoplamiento
Las capas se comunican a través de interfaces bien definidas.

### Seguridad por Diseño
- Validación de entradas en todos los controladores
- Sistema de logging mediante patrón Observer
- Auditoría automática de operaciones críticas

---

## Matriz de Trazabilidad

Cada Requisito Funcional (RF) del SRS está mapeado directamente a:
- Un componente del diseño
- Una clase o servicio específico
- Un caso de uso extendido

---

## Diferenciador Competitivo

### Servicio Nutricional
Algoritmo que calcula automáticamente:
- **Precio total** de la mezcla basado en proporciones
- **Valores nutricionales** finales:
  - Calorías
  - Proteínas
  - Grasas
  - Carbohidratos
  - Fibra
  - Vitaminas y minerales

Este servicio se implementa como clase separada (`NutricionalService`) siguiendo el principio de responsabilidad única.
