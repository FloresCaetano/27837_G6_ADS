# Versiones y Variantes

| **Codigo del ECS** | **Descripcion del ECS**         | **Version/Variante** | **Fecha de creacion** | **Autor(es)**                                   | **Localizacion**                                  | **Observaciones**                     | **Variante de requisitos de usuario** | **Variante de plataforma** |
| ------------------ | ------------------------------- | -------------------- | --------------------- | ----------------------------------------------- | ------------------------------------------------- | ------------------------------------- | ------------------------------------- | -------------------------- |
| COMP-BE-V3 | **Diagrama de Componentes Backend** | V3.0.0 (Completo) | 27/01/2026 | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez | 27837_G6_ADS\DISEÑOS\1.5 Diagrama De Componentes\ **COMP_BE_KairosMix_V3.pdf** | Vista técnica detallada, hooks y props | Español | Windows |

## Descripcion

Este directorio contiene los diagramas de componentes del sistema Kairos Mix, mostrando la organizacion modular tanto del backend como del frontend.

## Diagrama de Componentes - Backend (Node.js)

### Organizacion de Modulos

**Controllers (Controladores):**
- ProductoController
- ClienteController
- PedidoController
- **MezclaController** (Gestiona diseñador de mezclas)
- AuthController

**Services (Servicios):**
- **NutricionalService** (Calculo de valores nutricionales)
- AuthService
- EmailService
- ReporteService

**Models (Modelos):**
- ProductoModel
- ClienteModel
- PedidoModel
- MezclaModel
- UsuarioModel

**Observers:**
- **LogObserver** (Auditoria automatica)

**Database:**
- MySQLConnection
- QueryBuilder

### Flujo de Comunicacion Backend

```
[Router] -> [Controller] -> [Service] -> [Model] -> [Database]
                              |
                              v
                         [Observer] -> [Logs]
```

## Diagrama de Componentes - Frontend (React)

### Organizacion de Modulos

**Pages (Paginas):**
- MainPage
- ProfilePage
- **MixDesignerPage** (Diseñador de mezclas - DIFERENCIADOR)
- ProductsPage
- OrdersPage

**Components (Componentes):**
- Navbar
- ProductCard
- OrderList
- **MixBuilder** (Constructor de mezclas)
- **NutritionDisplay** (Visualizacion de valores nutricionales)
- ClientForm
- PedidoForm

**Services:**
- ApiService (Comunicacion con backend)
- AuthContext (Manejo de autenticacion)

**Utils:**
- Validators
- Formatters

### Flujo de Comunicacion Frontend

```
[Page] -> [Component] -> [ApiService] -> [Backend API]
            |
            v
         [Context] (Estado global)
```

## Comunicacion Frontend-Backend

**Protocolo:** HTTP/REST  
**Formato:** JSON

**Endpoints principales:**
- GET /api/productos
- POST /api/productos
- GET /api/pedidos
- POST /api/pedidos
- **POST /api/mezclas/calcular** (Calculo nutricional)
- **GET /api/mezclas/:id**

## Tecnologias por Componente

**Backend:**
- Express.js (Framework)
- Sequelize (ORM para MySQL)
- JWT (Autenticacion)

**Frontend:**
- React (Framework)
- Bootstrap (Estilos)
- Axios (Peticiones HTTP)
- React Router (Navegacion)
