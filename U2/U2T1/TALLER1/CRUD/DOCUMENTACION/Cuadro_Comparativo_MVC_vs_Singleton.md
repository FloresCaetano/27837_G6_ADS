# Cuadro Comparativo: MVC vs Singleton

## Análisis de Patrones Arquitectónicos

| **Criterio** | **MVC (Modelo-Vista-Controlador)** | **Singleton** |
|--------------|-----------------------------------|---------------|
| **¿Qué problema resuelve?** | Separa las responsabilidades de presentación, lógica de negocio y datos. Evita el código espagueti y facilita el mantenimiento. | Garantiza que una clase tenga una única instancia en toda la aplicación. Evita la creación de múltiples objetos innecesarios. |
| **¿En qué capa se utiliza?** | Se aplica en toda la arquitectura, organizando las 3 capas: Modelo (datos), Vista (presentación) y Controlador (lógica de negocio/coordinación). | Principalmente en la **capa de Datos** (`EstudianteRepository`), aunque puede aplicarse en otras capas según necesidad. |
| **¿Cómo influye en el mantenimiento?** | **Positivamente**: Permite modificar la interfaz sin tocar la lógica. Facilita agregar nuevas funcionalidades. Múltiples desarrolladores pueden trabajar en paralelo. | **Positivamente**: Simplifica el acceso a recursos compartidos. Reduce bugs por instancias duplicadas. Centraliza el punto de acceso. |
| **¿Cómo evita fallas de diseño?** | Previene el acoplamiento fuerte entre capas. Evita dependencias circulares. Facilita testing unitario. Promueve código reutilizable. | Previene problemas de sincronización de datos. Evita inconsistencias por múltiples instancias. Garantiza estado único compartido. |
| **Tipo de patrón** | **Patrón Arquitectónico** (estructura general del sistema) | **Patrón de Diseño Creacional** (cómo se crean objetos) |
| **Alcance** | **Global** - Afecta toda la aplicación | **Local** - Afecta clases específicas que lo implementan |
| **Complejidad de implementación** | Media-Alta (requiere planificación y disciplina) | Baja (simple de implementar) |
| **Ventaja principal** | **Separación de responsabilidades** y facilidad de cambio | **Control de instancias** y persistencia compartida |
| **Desventaja principal** | Puede sobre-complicar aplicaciones muy simples | Dificulta testing (estado compartido global) y puede crear acoplamiento |
| **Ejemplo en el proyecto** | `EstudianteUI` (Vista) ↔ `EstudianteService` (Controlador/Negocio) ↔ `Estudiante` (Modelo) | `EstudianteRepository.getInstance()` retorna siempre la misma instancia |

---

## Relación entre MVC y Singleton en el Proyecto

### ¿Son complementarios o excluyentes?
**Complementarios**. Pueden y deben usarse juntos:

- **MVC** define la **estructura general** del sistema
- **Singleton** define cómo se **crea e instancia** el repositorio dentro de esa estructura

### En nuestro proyecto:

```
MVC (Arquitectura)
    ├── Modelo: Estudiante.java
    ├── Vista: EstudianteUI.java
    └── Controlador/Servicio: EstudianteService.java
                                      ↓
                            usa Singleton (Patrón)
                                      ↓
                          EstudianteRepository.getInstance()
```

---

## Análisis Crítico: ¿Por qué usar ambos?

### Caso de Uso Real en el Proyecto:

**Sin Singleton (PROBLEMA):**
```java
// En EstudianteService
EstudianteRepository repo1 = new EstudianteRepository();
repo1.agregar(estudiante1);

// En otra instancia de Service
EstudianteRepository repo2 = new EstudianteRepository();
repo2.listar(); // ¡Lista vacía! Los datos se perdieron
```

**Con Singleton (SOLUCIÓN):**
```java
// En cualquier parte del código
EstudianteRepository repo = EstudianteRepository.getInstance();
// Siempre retorna la MISMA instancia con los MISMOS datos
```

---

## Reflexión sobre Impacto, Ventajas, Limitaciones y Riesgos

### **MVC**

#### ✅ Ventajas:
- Código organizado y predecible
- Fácil de entender para nuevos desarrolladores
- Permite cambiar tecnologías de presentación (Swing → Web → Mobile)
- Testing más sencillo (cada capa se prueba independiente)

#### ⚠️ Limitaciones:
- Overhead inicial en proyectos muy pequeños
- Curva de aprendizaje para principiantes
- Puede ser excesivo para aplicaciones triviales

#### ⚡ Riesgos:
- Si las capas no están bien definidas, se puede romper la separación
- Controladores pueden crecer demasiado (God Object)

---

### **Singleton**

#### ✅ Ventajas:
- Acceso global a la instancia
- Ahorro de memoria (una sola instancia)
- Persistencia durante el ciclo de vida de la app
- Implementación simple

#### ⚠️ Limitaciones:
- Dificulta testing unitario (estado global)
- Puede ocultar dependencias
- No es thread-safe en su forma básica
- Complica el uso de inyección de dependencias

#### ⚡ Riesgos:
- Sobreuso puede crear acoplamiento fuerte
- Dificulta el escalado a sistemas distribuidos
- Puede convertirse en una variable global disfrazada
- En aplicaciones multi-hilo puede causar condiciones de carrera

---

## Comparación de Escenarios

| **Escenario** | **Sin MVC** | **Con MVC** | **Sin Singleton** | **Con Singleton** |
|---------------|-------------|-------------|-------------------|-------------------|
| Cambiar interfaz de Swing a Web | Reescribir todo | Solo cambiar Vista | Sin impacto | Sin impacto |
| Agregar validación de negocio | Modificar en múltiples lugares | Solo en Service | Sin impacto | Sin impacto |
| Múltiples usuarios simultáneos | Caos total | Bien separado | Pérdida de datos | Datos compartidos |
| Testing automatizado | Muy difícil | Fácil por capas | Fácil | Complicado (mock necesario) |

---

## Conclusión del Análisis

### ¿Cuándo usar MVC?
- ✅ Aplicaciones de tamaño mediano a grande
- ✅ Cuando se prevén cambios en la interfaz
- ✅ Proyectos con múltiples desarrolladores
- ✅ Cuando se requiere testing exhaustivo

### ¿Cuándo usar Singleton?
- ✅ Para recursos compartidos (conexiones, caches, configuraciones)
- ✅ Cuando se necesita un punto de acceso global
- ✅ Para evitar instancias duplicadas de clases pesadas
- ⚠️ Con precaución en aplicaciones multi-hilo

### En nuestro CRUD de Estudiantes:
La combinación de **MVC + Singleton** es ideal porque:
1. MVC organiza el código en capas lógicas
2. Singleton garantiza que todos usen el mismo repositorio
3. Los datos persisten durante toda la ejecución
4. El mantenimiento es sencillo y predecible

### Recomendación Final:
Usar MVC como arquitectura base y Singleton solo cuando sea necesario (repositorios, configuraciones, loggers). No abusar de Singleton para evitar crear puntos de acoplamiento global.
