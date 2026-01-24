# Versiones y Variantes

| **Codigo del ECS** | **Descripcion del ECS** | **Version/Variante** | **Fecha de creacion** | **Autor(es)**                                   | **Localizacion**                               | **Observaciones**                    | **Variante de requisitos de usuario** | **Variante de plataforma** |
| ------------------ | ----------------------- | -------------------- | --------------------- | ----------------------------------------------- | ---------------------------------------------- | ------------------------------------ | ------------------------------------- | -------------------------- |
| DC                 | Diagrama de Clases      | V1.0.0               | 10/01/2026            | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez | 27837_G6_ADS\DISEÑOS\1.4 Diagrama De Clases | Primera version del diagrama         | Español                               | Windows                 |
| DC                 | Diagrama de Clases      | V2.0.0               | 14/01/2026            | Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez | 27837_G6_ADS\DISEÑOS\1.4 Diagrama De Clases | Segunda version del diagrama         | Español                               | Windows                 |

## Descripcion

Este directorio contiene el diagrama de clases del sistema Kairos Mix, representando la estructura logica del software segun el viewpoint "Logical" del estandar IEEE Std 1016-2009.

## Clases Principales

### Producto
**Atributos:**
- idProducto: int
- nombre: String
- categoria: String
- precio: float
- stock: int
- valorNutricional: ValorNutricional

**Metodos:**
- crear()
- actualizar()
- eliminar()
- consultarStock()

### Cliente
**Atributos:**
- idCliente: int
- nombre: String
- email: String
- telefono: String
- direccion: String

**Metodos:**
- registrar()
- actualizar()
- consultar()

### Pedido
**Atributos:**
- idPedido: int
- cliente: Cliente
- productos: List<Producto>
- estado: EstadoPedido (Por preparar, Preparado, Entregado)
- fechaCreacion: Date
- total: float

**Metodos:**
- crear()
- cambiarEstado()
- calcularTotal()
- generarReporte()

### MezclaPersonalizada
**Atributos:**
- idMezcla: int
- nombre: String
- ingredientes: List<Ingrediente>
- proporciones: Map<Ingrediente, float>
- precioTotal: float
- valorNutricionalTotal: ValorNutricional

**Metodos:**
- agregarIngrediente()
- calcularPrecio()
- calcularNutricion()

### NutricionalService (CLASE CLAVE)
**Tipo:** Servicio
**Responsabilidad:** Calcular valores nutricionales de mezclas

**Metodos:**
- calcularValoresNutricionales(mezcla: MezclaPersonalizada): ValorNutricional
- calcularCalorias(ingredientes, proporciones): float
- calcularProteinas(ingredientes, proporciones): float
- calcularGrasas(ingredientes, proporciones): float
- calcularCarbohidratos(ingredientes, proporciones): float

### LogObserver (PATRON OBSERVER)
**Tipo:** Observador
**Responsabilidad:** Registrar operaciones criticas para auditoria

**Metodos:**
- notificar(entidad: Object, operacion: String)
- registrarLog(entidad, operacion, timestamp)

### ValorNutricional
**Atributos:**
- calorias: float
- proteinas: float
- grasas: float
- carbohidratos: float
- fibra: float

## Relaciones

- Cliente **1..n** Pedido
- Pedido **n..n** Producto
- MezclaPersonalizada **n..n** Producto (como ingredientes)
- NutricionalService **utiliza** MezclaPersonalizada
- LogObserver **observa** Producto, Pedido, Cliente, MezclaPersonalizada

## Principios SOLID Aplicados

1. **Single Responsibility:** Cada clase tiene una unica razon para cambiar
2. **Open/Closed:** NutricionalService extensible sin modificar codigo existente
3. **Dependency Inversion:** Controladores dependen de abstracciones (interfaces)
