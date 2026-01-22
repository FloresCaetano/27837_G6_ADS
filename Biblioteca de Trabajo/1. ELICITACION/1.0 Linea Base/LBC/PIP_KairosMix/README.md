#  KairosMix - Sistema de Gestión de Frutos Secos

![KairosMix Logo](https://img.shields.io/badge/KairosMix-Frutos%20Secos%20Premium-8B4513?style=for-the-badge&logo=leaf)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-7952B3?style=for-the-badge&logo=bootstrap)
![Vite](https://img.shields.io/badge/Vite-7.0.6-646CFF?style=for-the-badge&logo=vite)


KairosMix es una aplicación web moderna y profesional para la gestión integral de un negocio de frutos secos premium. Desarrollada con React y Bootstrap, ofrece una interfaz intuitiva y funcionalidades completas para administrar productos, clientes, pedidos y crear mezclas personalizadas.

##  Características Principales

###  **Implementado (v1.0)**
- ** Gestión Completa de Productos**
  -  Agregar, editar y eliminar productos
  -  Control de stock inteligente con alertas automáticas
  -  Categorización por tipo de fruto seco
  -  Gestión de proveedores y fechas de vencimiento
  -  Búsqueda y filtrado avanzado en tiempo real
  -  Validación completa de formularios

- ** Diseño Profesional**
  -  Paleta de colores café y verde (temática de frutos secos)
  -  Interfaz responsive con Bootstrap 5
  -  Iconos profesionales con Lucide React
  -  Experiencia de usuario optimizada

###  **Próximamente (Roadmap)**
- ** Gestión de Clientes**: Base de datos de clientes y preferencias
- ** Gestión de Pedidos**: Control completo de órdenes y ventas
- ** Mezcla Personalizada**: Herramientas para crear combinaciones únicas

##  Tecnologías

- **Frontend**: React 19.1.0 + JavaScript ES6+
- **UI Framework**: Bootstrap 5.3.7
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Build Tool**: Vite 7.0.6
- **Deployment**: GitHub Pages

##  Instalación y Desarrollo

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Git

## 📁 Estructura del Proyecto

```
KairosMix/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx & .css
│   │   │   └── Sidebar.jsx & .css
│   │   └── Products/
│   │       ├── ProductManager.jsx & .css
│   │       └── ProductForm.jsx & .css
│   ├── pages/
│   │   ├── ProductsPage.jsx
│   │   ├── ClientsPage.jsx
│   │   ├── OrdersPage.jsx
│   │   └── CustomMixPage.jsx
│   ├── App.jsx & .css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

##  Funcionalidades de Productos

###  Gestión de Inventario
- Agregar productos con información completa
- Editar productos existentes con pre-llenado
- Eliminar productos con confirmación de seguridad
- Control de stock con indicadores visuales:
  - **En Stock**: > 10 unidades
  - **Stock Bajo**: ≤ 10 unidades  
  - **Agotado**: 0 unidades

###  Búsqueda y Filtrado
- Búsqueda instantánea por nombre y categoría
- Filtrado por categoría de productos
- Resultados en tiempo real

###  Información Detallada
-  Nombre y descripción completa
-  Precio por libra (lb) - unidad estándar
-  Stock actual con alertas automáticas
-  Información del proveedor
-  Control de fechas de vencimiento
-  Categorización inteligente

##  Roadmap de Desarrollo

###  Versión 1.1 - Gestión de Clientes
- [ ] CRUD completo de clientes
- [ ] Historial de compras por cliente
- [ ] Sistema de preferencias de productos
- [ ] Programa de puntos y descuentos

###  Versión 1.2 - Gestión de Pedidos  
- [ ] Creación y gestión de pedidos
- [ ] Estados de pedido (pendiente, procesando, enviado, entregado)
- [ ] Sistema de facturación integrado
- [ ] Reportes de ventas y analytics

###  Versión 1.3 - Mezclas Personalizadas
- [ ] Creador visual de mezclas
- [ ] Calculadora automática de costos
- [ ] Biblioteca de mezclas populares
- [ ] Sistema de recetas y proporciones

##  Despliegue

### GitHub Pages
El proyecto está configurado para despliegue automático en GitHub Pages:

1. **Fork** este repositorio
2. Ve a **Settings** > **Pages**
3. Selecciona **Source**: Deploy from a branch
4. Selecciona **Branch**: `gh-pages`
5. Ejecuta `npm run deploy` desde tu fork

### Otras Opciones
- **Netlify**: Conecta tu repositorio para despliegue automático
- **Vercel**: Ideal para proyectos React con zero-config
- **Firebase Hosting**: Escalable y con CDN global

## Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el proyecto
2. Crea una rama feature (`git checkout -b feature/NuevaFuncionalidad`)
3. **Commit** tus cambios (`git commit -m 'Add: Nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abre un **Pull Request**

### Convenciones de Commits
- `Add:` Nueva funcionalidad
- `Fix:` Corrección de bugs
- `Update:` Actualización de funcionalidad existente
- `Style:` Cambios de estilo/CSS
- `Docs:` Cambios en documentación

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.


<div align="center">

** Desarrollado con React + Vite para máximo rendimiento**  
** Diseñado específicamente para el negocio de frutos secos premium**  
** Desplegado con GitHub Pages para accesibilidad global**

</div>
