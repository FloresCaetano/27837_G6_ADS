# Versiones y Variantes

| **Codigo del ECS** | **Descripcion del ECS** | **Version/Variante** | **Fecha de creacion** | **Autor(es)** | **Localizacion** | **Observaciones** | **Variante de requisitos de usuario** | **Variante de plataforma** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| COMP-BE | Diagrama de Componente Backend | V1.0.0 | 14/01/2026 | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez | 27837_G6_ADS\DISEÑOS\1.5 Diagrama De Componentes | Primera version del diagrama backend | Español | Windows |
| COMP-FE-V1 | **Diagrama de Componentes Frontend - Nivel 1** | V1.0.0 (Básico) | 27/01/2026 | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez | 27837_G6_ADS\DISEÑOS\1.5 Diagrama De Componentes\ **Diagrama_De_Componentes_KairosMix_V1.pdf** | Vista general de arquitectura y navegación | Español | Windows |
| COMP-FE-V2 | **Diagrama de Componentes Frontend - Nivel 2** | V1.0.0 (Intermedio) | 27/01/2026 | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez | 27837_G6_ADS\DISEÑOS\1.5 Diagrama De Componentes\ **Diagrama_De_Componentes_KairosMix_V2.pdf** | Vista de estructura funcional y contenedores | Español | Windows |
| COMP-FE-V3 | **Diagrama de Componentes Frontend - Nivel 3** | V1.0.0 (Completo) | 27/01/2026 | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez | 27837_G6_ADS\DISEÑOS\1.5 Diagrama De Componentes\ **Diagrama_De_Componentes_KairosMix_V3.pdf** | Vista técnica detallada, hooks y props | Español | Windows |

## Descripcion

Este directorio contiene los diagramas de componentes del sistema Kairos Mix. Para el frontend, se han generado 3 variantes que permiten visualizar la arquitectura desde diferentes niveles de abstracción (V1, V2, V3).

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

```mermaid
graph LR
    Router --> Controller
    Controller --> Service
    Service --> Model
    Model --> Database
    Service -.-> Observer
    Observer -.-> Logs