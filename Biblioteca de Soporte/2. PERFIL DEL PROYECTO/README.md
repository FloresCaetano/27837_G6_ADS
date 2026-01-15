# 2. PERFIL DEL PROYECTO - Kairos Mix

## Información General

**Nombre del Proyecto:** Kairos Mix  
**Cliente:** Tienda de frutos secos "Kairos de Dios"  
**Tipo:** Sistema Web (MVP)

---

## Resumen Ejecutivo

Kairos Mix es un sistema web diseñado para digitalizar y optimizar los procesos de una tienda de frutos secos, transformando operaciones manuales en un sistema automatizado que mejora la eficiencia operativa y proporciona un diferenciador competitivo único.

---

## Contexto del Negocio

**Negocio:** Tienda de frutos secos "Kairos de Dios"

**Problemática Actual:**
- Procesos manuales de venta
- Gestión ineficiente de inventario
- Falta de control de pedidos
- Ausencia de herramientas para personalización

**Solución Propuesta:**  
Sistema web que digitaliza operaciones y añade funcionalidad innovadora de diseño de mezclas personalizadas con cálculo nutricional automático.

---

## Objetivos del Proyecto

### Objetivos Principales:
1. Digitalizar procesos de venta y gestión
2. Implementar sistema de inventario automatizado
3. Crear funcionalidad de mezclas personalizadas
4. Proporcionar análisis nutricional en tiempo real
5. Generar reportes de ventas y operaciones

---

## Alcance

### Incluye:
- Gestión de productos (CRUD)
- Gestión de clientes
- Gestión de pedidos con estados
- Diseñador de mezclas personalizadas
- Cálculo nutricional automático
- Reportes de ventas
- Sistema de autenticación

### No Incluye (Fuera del MVP):
- Pasarela de pagos online
- App móvil nativa
- Sistema de delivery en tiempo real
- Integración con ERPs externos

---

## Stakeholders

### Cliente:
- Propietario de "Kairos de Dios"

### Equipo de Desarrollo:
1. Caetano Flores
2. Jordan Guaman
3. Anthony Morales
4. Leonardo Narváez

### Usuarios Finales:
- **Propietario:** Gestión completa del sistema
- **Clientes:** Diseño de mezclas y consulta de pedidos

---

## Stack Tecnológico

### Frontend:
- React
- Bootstrap

### Backend:
- Node.js (JavaScript)

### Base de Datos:
- MySQL

### APIs:
- Google Maps API (geolocalización)

---

## Arquitectura

**Tipo:** Multi-capa (3 capas)
- Capa de Presentación
- Capa de Lógica de Negocio
- Capa de Persistencia

**Patrones de Diseño:**
- MVC (Modelo-Vista-Controlador)
- Observer (para logging y seguridad)

---

## Estándar de Documentación

**Diseño:** IEEE Std 1016-2009

**Viewpoints:**
- Lógico (Diagrama de Clases)
- Interacción (Diagramas de Secuencia)
- Información (Diagrama ER)
- Dinámica de Estados

---

## Funcionalidades Clave

### KM_Gestionar Productos
CRUD completo para inventario de frutos secos.

### KM_Gestionar Clientes
Registro y consulta de compradores.

### KM_Gestionar Pedidos
Control de ventas con estados: por preparar, preparado, entregado.

### KM_Diseñar Mezcla Personalizada
Funcionalidad diferenciadora que permite:
- Selección de ingredientes
- Definición de proporciones
- **Cálculo automático de precio total**
- **Cálculo automático de valores nutricionales**

---

## Métricas de Éxito

1. Reducción del tiempo de procesamiento de pedidos
2. Incremento en ventas de mezclas personalizadas
3. Mejora en control de inventario
4. Satisfacción del cliente con la funcionalidad nutricional
