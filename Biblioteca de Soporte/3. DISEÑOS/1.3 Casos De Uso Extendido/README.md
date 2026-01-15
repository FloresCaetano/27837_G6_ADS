# Versiones y Variantes

| **Codigo del ECS** | **Descripcion del ECS**  | **Version/Variante** | **Fecha de creacion** | **Autor(es)**                                   | **Localizacion**                      | **Observaciones**                             | **Variante de requisitos de usuario** | **Variante de plataforma** |
| ------------------ | ------------------------ | -------------------- | --------------------- | ----------------------------------------------- | ------------------------------------- | --------------------------------------------- | ------------------------------------- | -------------------------- |
| CU                 | Casos de uso del sistema | V1.0.0               | 14/01/2026            | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez | 27837_G6_ADS\DISEÑOS\1.3 Casos De Uso Extendido | Primera version del documento de casos de uso extendidos | Español                               | Windows                 |

## Descripcion

Este directorio contiene la documentacion detallada de los casos de uso del sistema Kairos Mix.

## Casos de Uso Principales

### CU-001: KM_Gestionar Productos
**Actor Principal:** Propietario  
**Proposito:** Mantener el inventario de frutos secos actualizado  
**Flujo Principal:**
1. Propietario accede al modulo de productos
2. Realiza operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
3. Sistema valida y almacena la informacion
4. LogObserver registra la operacion

### CU-002: KM_Gestionar Clientes
**Actor Principal:** Propietario  
**Proposito:** Administrar la informacion de compradores  
**Flujo Principal:**
1. Propietario accede al modulo de clientes
2. Registra o consulta datos de clientes
3. Sistema almacena la informacion

### CU-003: KM_Gestionar Pedidos
**Actor Principal:** Propietario  
**Proposito:** Controlar el ciclo de vida de los pedidos  
**Estados:** Por preparar -> Preparado -> Entregado  
**Flujo Principal:**
1. Cliente o Propietario crea un pedido
2. Sistema asigna estado inicial "Por preparar"
3. Propietario cambia estado segun avanza la preparacion
4. Sistema genera reportes de ventas

### CU-004: KM_Diseñar Mezcla Personalizada (DIFERENCIADOR)
**Actores:** Cliente, Propietario  
**Proposito:** Crear mezclas personalizadas con calculo nutricional  
**Flujo Principal:**
1. Usuario accede al diseñador de mezclas
2. Selecciona ingredientes disponibles
3. Define proporciones de cada ingrediente
4. Sistema invoca **NutricionalService.calcularValoresNutricionales()**
5. Sistema calcula precio total y valores nutricionales:
   - Calorias
   - Proteinas
   - Grasas
   - Carbohidratos
   - Fibra
6. Usuario confirma y guarda la mezcla
7. Sistema puede convertir la mezcla en un pedido

## Diagramas de Secuencia

Los casos de uso estan acompañados de diagramas de secuencia que muestran la interaccion entre:
- Vista (React)
- Controlador (Node.js)
- Servicio (NutricionalService)
- Modelo/Base de Datos (MySQL)
