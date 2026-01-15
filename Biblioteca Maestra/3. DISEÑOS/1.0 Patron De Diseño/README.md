# Versiones y Variantes

| **Codigo del ECS** | **Descripcion del ECS**                                         | **Version/Variante** | **Fecha de creacion** | **Autor(es)**                                         | **Localizacion**                              | **Observaciones**                                                                 | **Variante de requisitos de usuario** | **Variante de plataforma**          |
|--------------------|------------------------------------------------------------------|-----------------------|------------------------|-------------------------------------------------------|-----------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------|-------------------------------------|
| PAT                | Implementacion del patron de diseño Modelo Vista Controlador + Observer | V1.0.0                | 14/01/2026             | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez | 27837_G6_ADS\DISEÑOS\1.0 Patron De Diseño     | Creacion del patron de diseño usando MVC y Observer para el desarrollo de Kairos Mix | Español                               | Windows                          |

## Descripcion

Este directorio contiene la documentacion del patron de diseño implementado en el proyecto Kairos Mix.

## Patrones Implementados

### MVC (Modelo-Vista-Controlador)
Patron arquitectonico que separa la aplicacion en tres componentes principales:
- **Modelo:** Gestion de datos y logica de negocio (MySQL, Entidades)
- **Vista:** Interfaz de usuario (React + Bootstrap)
- **Controlador:** Intermediario entre Modelo y Vista (Node.js Controllers)

### Observer
Patron de comportamiento para auditoría y seguridad:
- **Sujeto:** Entidades criticas (Producto, Pedido, Cliente, MezclaPersonalizada)
- **Observador:** LogObserver que registra automaticamente cambios
- **Proposito:** Trazabilidad completa de operaciones

## Beneficios del Diseño

1. **Modularidad:** Cambios en una capa no afectan las otras
2. **Mantenibilidad:** Codigo organizado y facil de mantener
3. **Seguridad:** Registro automatico de operaciones criticas
4. **Escalabilidad:** Estructura preparada para crecimiento futuro
