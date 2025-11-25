# Documentación del Proyecto CRUD Estudiantes

## 1. Explicación de la Arquitectura de 3 Capas

### Arquitectura Implementada: Modelo-Vista-Controlador (MVC) con 3 Capas

El proyecto sigue una arquitectura de software de 3 capas que separa las responsabilidades en:

---

### **Capa 1: DATOS (Modelo + Repositorio)**
**Paquete:** `ec.edu.espe.datos`

#### Responsabilidades:
- **Modelo (`Estudiante.java`)**: Define la estructura de datos del estudiante con sus atributos (ID, Nombres, Edad). Representa la entidad de negocio.
- **Repositorio (`EstudianteRepository.java`)**: Gestiona el almacenamiento y recuperación de datos en memoria. Implementa el patrón Singleton para garantizar una única instancia y persistencia compartida durante la ejecución.

#### Operaciones del Repositorio:
- `agregar()` - Añade un estudiante a la lista
- `editar()` - Modifica datos de un estudiante existente
- `eliminar()` - Remueve un estudiante por ID
- `listar()` - Obtiene todos los estudiantes
- `getById()` - Busca un estudiante específico

---

### **Capa 2: LÓGICA DE NEGOCIO (Servicio)**
**Paquete:** `ec.edu.espe.logica_negocio`

#### Responsabilidades:
- **Service (`EstudianteService.java`)**: Contiene las reglas de negocio y validaciones antes de interactuar con el repositorio.

#### Reglas de Negocio Implementadas:
- Validación de datos no nulos
- Validación de ID obligatorio y único
- Validación de nombres obligatorios
- Validación de edad mayor a 0
- Mensajes de error descriptivos
- Coordinación entre la presentación y los datos

---

### **Capa 3: PRESENTACIÓN (Vista)**
**Paquete:** `ec.edu.espe.presentacion`

#### Responsabilidades:
- **Vista (`EstudianteUI.java`)**: Interfaz gráfica Swing que permite la interacción del usuario con el sistema.
- **Main (`Main.java`)**: Punto de entrada de la aplicación.

#### Funcionalidades de la UI:
- Formulario para captura de datos (ID, Nombres, Edad)
- Botones para operaciones CRUD (Guardar, Editar, Eliminar, Listar)
- Tabla para visualizar todos los estudiantes
- Selección de registros desde la tabla
- Mensajes de confirmación y error

---

## 2. Patrón Singleton en EstudianteRepository

### Implementación:

```java
private static final EstudianteRepository INSTANCE = new EstudianteRepository();

private EstudianteRepository() {
    // Constructor privado
}

public static EstudianteRepository getInstance() {
    return INSTANCE;
}
```

### Ventajas del Singleton:
1. **Una única instancia**: Garantiza que solo exista una lista de estudiantes en memoria
2. **Persistencia compartida**: Múltiples servicios o controladores acceden a los mismos datos
3. **Evita duplicación**: No se crean múltiples repositorios con listas diferentes
4. **Coherencia de datos**: Todas las operaciones CRUD se realizan sobre la misma colección

### Problema que resuelve:
Sin Singleton, cada vez que se crea un `EstudianteService` podría crear un nuevo repositorio, perdiendo los datos anteriores. Con Singleton, todos comparten la misma instancia y los datos persisten durante la ejecución.

---

## 3. Patrón NVC (Negocio-Vista-Control)

El proyecto implementa una variante del patrón MVC conocida como NVC:

- **Negocio**: `EstudianteService` - Lógica y validaciones
- **Vista**: `EstudianteUI` - Interfaz gráfica
- **Control**: Implícito en la Vista (listeners de botones)

### Flujo de Operaciones:

```
Usuario → [Vista/UI] → [Service/Negocio] → [Repository/Datos] → [Modelo]
                ↓                ↓                  ↓
            Eventos         Validaciones      Persistencia
```

---

## 4. Cómo la Arquitectura MVC Facilita el Mantenimiento

### Separación de Responsabilidades:
- **Cambios en la UI** no afectan la lógica de negocio
- **Cambios en el almacenamiento** no afectan la presentación
- **Nuevas reglas de negocio** se agregan solo en el Service

### Ventajas:
1. **Modularidad**: Cada capa es independiente y reutilizable
2. **Testabilidad**: Se puede probar cada capa por separado
3. **Escalabilidad**: Fácil agregar nuevas funcionalidades
4. **Mantenibilidad**: Errores más fáciles de localizar
5. **Trabajo en equipo**: Diferentes desarrolladores pueden trabajar en capas distintas

### Ejemplo Práctico:
Si se desea cambiar de Swing a JavaFX o Web, solo se modifica la capa de Presentación. La lógica de negocio y el repositorio permanecen intactos.

---

## 5. Estructura de Paquetes del Proyecto

```
ec.edu.espe
├── datos
│   ├── model
│   │   └── Estudiante.java          [Modelo]
│   └── repository
│       └── EstudianteRepository.java [Datos + Singleton]
├── logica_negocio
│   └── EstudianteService.java        [Negocio]
└── presentacion
    ├── EstudianteUI.java             [Vista]
    └── Main.java                      [Punto de entrada]
```

---

## 6. Operaciones CRUD Implementadas

### CREATE (Crear)
- **Acción**: Botón "Guardar"
- **Validación**: ID único, nombres no vacíos, edad > 0
- **Flujo**: UI → Service (validaciones) → Repository (agregar a lista)

### READ (Leer)
- **Acción**: Botón "Listar" / Carga automática de tabla
- **Flujo**: UI → Service → Repository → Retorna lista completa

### UPDATE (Actualizar)
- **Acción**: Botón "Editar"
- **Validación**: ID debe existir, datos válidos
- **Flujo**: UI → Service (validaciones) → Repository (modifica existente)

### DELETE (Eliminar)
- **Acción**: Botón "Eliminar"
- **Validación**: ID debe existir
- **Flujo**: UI → Service → Repository (remueve de lista)

---

## 7. Tecnologías Utilizadas

- **Lenguaje**: Java
- **GUI**: Swing (javax.swing)
- **Almacenamiento**: En memoria (ArrayList)
- **Arquitectura**: MVC + 3 Capas
- **Patrones**: Singleton
- **Build**: Maven

---

## 8. Instrucciones de Ejecución

1. Compilar el proyecto con Maven:
   ```bash
   mvn clean compile
   ```

2. Ejecutar la aplicación:
   ```bash
   mvn exec:java -Dexec.mainClass="ec.edu.espe.presentacion.Main"
   ```

3. O ejecutar directamente desde el IDE la clase `Main.java`

---

## Conclusión

El proyecto demuestra la aplicación correcta de:
- ✅ Arquitectura de 3 capas
- ✅ Patrón MVC/NVC
- ✅ Patrón Singleton
- ✅ CRUD completo funcional
- ✅ Separación de responsabilidades
- ✅ Buenas prácticas de programación
