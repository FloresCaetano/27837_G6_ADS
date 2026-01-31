# Versiones y Variantes

| **Codigo del ECS** | **Descripcion del ECS**              | **Version/Variante** | **Fecha de creacion** | **Autor(es)**                                   | **Localizacion**                                | **Observaciones**                                             | **Variante de requisitos de usuario** | **Variante de plataforma** |
| ------------------ | ------------------------------------ | -------------------- | --------------------- | ----------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------- | ------------------------------------- | -------------------------- |
| ARQ                | Arquitectura 3 capas para el sistema | V2.0.0               | 14/01/2026            | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez | 27837_G6_ADS\DISEÑOS\1.2 Diseño De Arquitectura | Primera version de la arquitectura del proyecto Kairos Mix | Español                               | Windows                 |

## Descripcion

Este directorio contiene la documentacion de la arquitectura del sistema Kairos Mix basada en el patron de 3 capas.

## Arquitectura de 3 Capas

### Capa de Presentacion
**Tecnologia:** React + Bootstrap
- Componentes de interfaz de usuario
- Paginas: Main, Profile, Mix Designer
- Comunicacion con backend via API REST

### Capa de Logica de Negocio
**Tecnologia:** Node.js (JavaScript)
- Controladores:
  - ProductoController
  - ClienteController
  - PedidoController
  - MezclaController
- Servicios:
  - **NutricionalService** (Calculo de valores nutricionales)
  - AuthService (Autenticacion)
- Validaciones y reglas de negocio

### Capa de Persistencia
**Tecnologia:** MySQL
- Base de datos relacional
- Tablas: productos, clientes, pedidos, mezclas, ingredientes
- Gestion de transacciones y consultas

## Comunicacion entre Capas

```
[React Frontend] <--HTTP/REST--> [Node.js Backend] <--SQL--> [MySQL Database]
```

## Ventajas de esta Arquitectura

1. **Separacion de Responsabilidades:** Cada capa tiene un proposito claro
2. **Independencia:** Cambios en una capa no afectan directamente a las otras
3. **Escalabilidad:** Facil de escalar horizontalmente
4. **Mantenibilidad:** Codigo organizado y facil de localizar
