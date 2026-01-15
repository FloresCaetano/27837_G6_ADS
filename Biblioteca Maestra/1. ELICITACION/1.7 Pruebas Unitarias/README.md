# Pruebas Unitarias

Este directorio contiene la documentacion y casos de prueba unitaria para validar los componentes individuales del sistema **Kairos Mix**.

## Informacion del ECS

- **Codigo del ECS:** TU
- **Nombre del ECS:** Pruebas Unitarias
- **Autor:** Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez
- **Proyecto:** Kairos Mix - Sistema de Gestion para "Kairos de Dios"
- **Linea base:** LBC - Linea Base Codigo
- **Localizacion:** 27837_G6_ADS\PROPIAS\Biblioteca de Trabajo\1. ELICITACION\1.7 Pruebas Unitarias
- **Tipo de ECS:** Documento (PDF) y Scripts de Prueba (JS)
- **Fecha de creacion:** 14/01/2026
- **ID del proyecto:** 27837_G6_ADS

## Objetivo

Verificar que cada componente del codigo funcione correctamente de forma aislada, cumpliendo con los requisitos especificados.

## Alcance de Pruebas

### Backend (Node.js):

**ProductoController:**
- TC-PR-001: Crear producto con datos validos
- TC-PR-002: Validar campos obligatorios
- TC-PR-003: Actualizar precio de producto

**NutricionalService (CRITICO):**
- TC-NS-001: Calcular calorias totales de mezcla
- TC-NS-002: Calcular proteinas basadas en proporciones
- TC-NS-003: Calcular precio total de mezcla
- TC-NS-004: Validar suma de porcentajes = 100%

**PedidoController:**
- TC-PE-001: Crear pedido con estado inicial "Por preparar"
- TC-PE-002: Transicion valida de estados
- TC-PE-003: Rechazar transicion invalida

### Frontend (React):
- TC-UI-001: Renderizado de lista de productos
- TC-UI-002: Validacion de formularios
- TC-UI-003: Diseñador de mezclas - agregar ingrediente

## Herramientas

- **Backend:** Jest / Mocha
- **Frontend:** Jest + React Testing Library
- **Cobertura:** >= 80% de cobertura de codigo
