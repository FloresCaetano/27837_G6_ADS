# README - Proyecto CRUD Estudiantes

## 📋 Descripción del Proyecto

Sistema CRUD (Create, Read, Update, Delete) para gestión de estudiantes, desarrollado como parte de los talleres U2T1, U2T2 y U2T3 de la materia Arquitectura de Software.

El proyecto implementa:
- ✅ Arquitectura MVC (Modelo-Vista-Controlador)
- ✅ Arquitectura de 3 Capas
- ✅ Patrón Singleton
- ✅ Patrón NVC (Negocio-Vista-Control)
- ✅ Interfaz gráfica con Swing
- ✅ Persistencia en memoria

---

## 👥 Información del Grupo

- **Asignatura:** Arquitectura de Software
- **Grupo:** G6
- **Código:** 27837
- **Unidad:** U2
- **Talleres:** T1, T2, T3

---

## 🏗️ Arquitectura del Sistema

### Estructura de Capas

```
├── CAPA DE PRESENTACIÓN (Vista)
│   └── EstudianteUI.java - Interfaz gráfica Swing
│
├── CAPA DE LÓGICA DE NEGOCIO (Servicio)
│   └── EstudianteService.java - Validaciones y reglas de negocio
│
└── CAPA DE DATOS (Modelo + Repositorio)
    ├── Estudiante.java - Entidad de dominio
    └── EstudianteRepository.java - Persistencia con Singleton
```

### Paquetes

- `ec.edu.espe.datos.model` - Modelo de datos
- `ec.edu.espe.datos.repository` - Repositorio con Singleton
- `ec.edu.espe.logica_negocio` - Servicios y lógica de negocio
- `ec.edu.espe.presentacion` - Interfaz de usuario

---

## 🚀 Ejecución del Proyecto

### Requisitos Previos

- Java JDK 8 o superior
- Maven 3.6 o superior

### Compilar

```bash
mvn clean compile
```

### Ejecutar

```bash
mvn exec:java -Dexec.mainClass="ec.edu.espe.presentacion.Main"
```

### Desde IDE

1. Importar proyecto Maven
2. Ejecutar clase `Main.java`

---

## 📚 Funcionalidades Implementadas

### Operaciones CRUD

| Operación | Descripción | Validaciones |
|-----------|-------------|--------------|
| **CREATE** | Agregar nuevo estudiante | ID único, nombres no vacíos, edad > 0 |
| **READ** | Listar todos los estudiantes | - |
| **UPDATE** | Actualizar estudiante existente | ID debe existir, datos válidos |
| **DELETE** | Eliminar estudiante por ID | ID debe existir |

### Validaciones de Negocio

- ✅ ID obligatorio y único
- ✅ Nombres obligatorios
- ✅ Edad debe ser mayor que 0
- ✅ Mensajes de error descriptivos

---

## 🎯 Características Técnicas

### Patrón Singleton

```java
public class EstudianteRepository {
    private static final EstudianteRepository INSTANCE = new EstudianteRepository();
    
    private EstudianteRepository() { }
    
    public static EstudianteRepository getInstance() {
        return INSTANCE;
    }
}
```

**Ventajas:**
- Una única instancia del repositorio
- Persistencia compartida en memoria
- Consistencia de datos

### Patrón MVC/NVC

- **Modelo:** `Estudiante.java` - Estructura de datos
- **Vista:** `EstudianteUI.java` - Interfaz gráfica
- **Controlador/Negocio:** `EstudianteService.java` - Lógica de negocio

---

## 📁 Estructura del Proyecto

```
CRUD/
├── pom.xml
├── README.md
├── INSTRUCCIONES/
│   ├── U2T1_Taller_Arquitectura-1.txt
│   ├── U2T2_Taller_Singleton_NVC-1.txt
│   └── U2T3_Taller_MVC_Singleton-1.txt
├── DOCUMENTACION/
│   ├── Explicacion_Arquitectura.md
│   ├── Cuadro_Comparativo_MVC_vs_Singleton.md
│   ├── Diagrama_Arquitectura.txt
│   └── Guia_Pruebas.md
└── src/
    ├── main/java/ec/edu/espe/
    │   ├── datos/
    │   │   ├── model/
    │   │   │   └── Estudiante.java
    │   │   └── repository/
    │   │       └── EstudianteRepository.java
    │   ├── logica_negocio/
    │   │   └── EstudianteService.java
    │   └── presentacion/
    │       ├── EstudianteUI.java
    │       └── Main.java
    └── test/java/...
```

---

## 📖 Documentación Adicional

En la carpeta `DOCUMENTACION/` se encuentran:

1. **Explicacion_Arquitectura.md**
   - Responsabilidades de cada capa
   - Descripción del patrón Singleton
   - Beneficios de MVC
   - Estructura de paquetes

2. **Cuadro_Comparativo_MVC_vs_Singleton.md**
   - Análisis comparativo
   - Ventajas y desventajas
   - Casos de uso
   - Reflexión crítica

3. **Diagrama_Arquitectura.txt**
   - Diagrama de capas
   - Diagrama de flujo
   - Diagramas de patrones
   - Responsabilidades

4. **Guia_Pruebas.md**
   - Casos de prueba
   - Instrucciones de ejecución
   - Checklist de evidencias

---

## 🧪 Casos de Prueba

### Prueba Básica del CRUD

1. **Agregar estudiante:**
   - ID: EST001
   - Nombres: Juan Pérez
   - Edad: 20
   - ✅ Debe guardar exitosamente

2. **Intentar duplicar ID:**
   - ID: EST001
   - ❌ Debe mostrar error "ID ya existe"

3. **Editar estudiante:**
   - Seleccionar EST001
   - Cambiar edad a 21
   - ✅ Debe actualizar

4. **Eliminar estudiante:**
   - Seleccionar EST001
   - ✅ Debe eliminar de la tabla

5. **Listar estudiantes:**
   - ✅ Debe mostrar todos los registros

---

## 🎓 Conceptos Aplicados

### Arquitectura de 3 Capas
- **Separación de responsabilidades**
- **Bajo acoplamiento**
- **Alta cohesión**

### Patrones de Diseño
- **Singleton:** Control de instancias únicas
- **MVC:** Separación modelo-vista-controlador
- **Repository:** Abstracción de persistencia

---

## 📝 Rúbricas Cumplidas

### U2T1 - Arquitectura (20 puntos)
- [x] Comprensión de la arquitectura (6 pts)
- [x] Implementación técnica (6 pts)
- [x] Diagrama y organización (6 pts)
- [x] Claridad de explicación (2 pts)

### U2T2 - Singleton (20 puntos)
- [x] Implementación del Singleton (6 pts)
- [x] Integración con NVC (6 pts)
- [x] Funcionalidad CRUD (6 pts)
- [x] Claridad y orden (2 pts)

### U2T3 - Análisis Comparativo (20 puntos)
- [x] Análisis arquitectónico (6 pts)
- [x] Aplicación técnica (6 pts)
- [x] Comparación crítica (6 pts)
- [x] Claridad y profundidad (2 pts)

---

## 🛠️ Tecnologías Utilizadas

- **Lenguaje:** Java 8+
- **Framework UI:** Swing (javax.swing)
- **Build Tool:** Maven
- **Almacenamiento:** En memoria (ArrayList)
- **Patrones:** Singleton, MVC, Repository

---

## 📞 Soporte

Para dudas o problemas:
1. Revisar la documentación en `/DOCUMENTACION`
2. Consultar la guía de pruebas
3. Verificar los casos de uso implementados

---

## ✅ Estado del Proyecto

**✅ COMPLETADO**

- Código fuente implementado
- Arquitectura MVC aplicada
- Patrón Singleton funcionando
- CRUD completo y funcional
- Validaciones de negocio
- Interfaz gráfica operativa
- Documentación completa
- Diagramas de arquitectura
- Análisis comparativo
- Guía de pruebas

---

## 📄 Licencia

Proyecto académico - Universidad ESPE - 2024
