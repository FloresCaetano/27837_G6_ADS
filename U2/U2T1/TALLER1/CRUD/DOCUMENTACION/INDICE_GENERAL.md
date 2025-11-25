# 📚 ÍNDICE GENERAL DEL PROYECTO

## 🎯 Proyecto: CRUD Estudiantes - Arquitectura MVC + Singleton

### Talleres: U2T1, U2T2, U2T3
### Grupo: G6
### Materia: Arquitectura de Software - ESPE

---

## 📂 ESTRUCTURA COMPLETA DEL PROYECTO

```
CRUD/
│
├── 📄 README.md ⭐
│   └── Resumen general del proyecto, instrucciones de ejecución
│
├── 📄 pom.xml
│   └── Configuración Maven del proyecto
│
├── 📁 INSTRUCCIONES/
│   ├── U2T1_Taller_Arquitectura-1.txt
│   ├── U2T2_Taller_Singleton_NVC-1.txt
│   └── U2T3_Taller_MVC_Singleton-1.txt
│
├── 📁 DOCUMENTACION/ ⭐ [CARPETA NUEVA]
│   ├── 📄 Explicacion_Arquitectura.md ⭐
│   │   └── Descripción de 3 capas, responsabilidades, MVC, Singleton
│   │
│   ├── 📄 Diagrama_Arquitectura.txt ⭐
│   │   └── Diagramas visuales de arquitectura y flujos
│   │
│   ├── 📄 Cuadro_Comparativo_MVC_vs_Singleton.md ⭐
│   │   └── Análisis crítico y comparativo de patrones
│   │
│   ├── 📄 Guia_Pruebas.md ⭐
│   │   └── 10 casos de prueba detallados
│   │
│   ├── 📄 RESUMEN_ENTREGA.md ⭐
│   │   └── Resumen completo de lo entregado
│   │
│   └── 📄 INDICE_GENERAL.md ⭐
│       └── Este archivo - Índice de navegación
│
├── 📁 EVIDENCIAS/ ⭐ [CARPETA NUEVA]
│   ├── 📄 README_EVIDENCIAS.md ⭐
│   │   └── Guía para generar capturas de pantalla
│   │
│   └── [Capturas de pantalla - PENDIENTE DE GENERAR]
│       ├── 01_pantalla_inicial.png
│       ├── 02_create_exitoso.png
│       ├── 03_create_error_duplicado.png
│       └── ... (10 capturas en total)
│
└── 📁 src/
    ├── main/java/ec/edu/espe/
    │   │
    │   ├── 📁 datos/
    │   │   ├── 📁 model/
    │   │   │   └── 📄 Estudiante.java ✅
    │   │   │       └── Entidad con atributos ID, Nombres, Edad
    │   │   │
    │   │   └── 📁 repository/
    │   │       └── 📄 EstudianteRepository.java ✅ [SINGLETON]
    │   │           └── Repositorio con patrón Singleton
    │   │
    │   ├── 📁 logica_negocio/
    │   │   └── 📄 EstudianteService.java ✅
    │   │       └── Lógica de negocio y validaciones
    │   │
    │   └── 📁 presentacion/
    │       ├── 📄 EstudianteUI.java ✅
    │       │   └── Interfaz gráfica Swing
    │       │
    │       └── 📄 Main.java ✅
    │           └── Punto de entrada de la aplicación
    │
    └── test/java/...
```

---

## 🗺️ GUÍA DE NAVEGACIÓN RÁPIDA

### Para Entender el Proyecto:
1. **Empezar aquí:** `README.md`
2. **Arquitectura:** `DOCUMENTACION/Explicacion_Arquitectura.md`
3. **Diagramas:** `DOCUMENTACION/Diagrama_Arquitectura.txt`

### Para Ejecutar y Probar:
1. **Instrucciones:** `README.md` (sección Ejecución)
2. **Casos de prueba:** `DOCUMENTACION/Guia_Pruebas.md`
3. **Generar evidencias:** `EVIDENCIAS/README_EVIDENCIAS.md`

### Para Estudiar los Patrones:
1. **Análisis:** `DOCUMENTACION/Cuadro_Comparativo_MVC_vs_Singleton.md`
2. **Código Singleton:** `src/main/java/ec/edu/espe/datos/repository/EstudianteRepository.java`
3. **Arquitectura MVC:** Ver las 3 capas en `src/main/java/ec/edu/espe/`

### Para la Entrega:
1. **Checklist:** `DOCUMENTACION/RESUMEN_ENTREGA.md`
2. **Evidencias:** `EVIDENCIAS/` (generar capturas)
3. **Código:** Toda la carpeta `src/`

---

## 📄 DESCRIPCIÓN DE ARCHIVOS CLAVE

### Código Fuente

#### `Estudiante.java`
**Ubicación:** `src/main/java/ec/edu/espe/datos/model/`
**Descripción:** Clase modelo que representa la entidad Estudiante
**Contiene:**
- Atributos: id, nombres, edad
- Constructores
- Getters y setters
- equals() y hashCode()
- toString()

**Responsabilidad:** Encapsular los datos del estudiante

---

#### `EstudianteRepository.java` 🌟
**Ubicación:** `src/main/java/ec/edu/espe/datos/repository/`
**Descripción:** Repositorio con patrón Singleton para gestionar estudiantes
**Contiene:**
- Implementación del patrón Singleton
- Constructor privado
- Método getInstance()
- Lista de estudiantes (ArrayList)
- Métodos CRUD: agregar, editar, eliminar, listar
- Métodos auxiliares: getById, existsById

**Responsabilidad:** Gestionar la persistencia en memoria

**Patrón aplicado:** ✅ SINGLETON

---

#### `EstudianteService.java`
**Ubicación:** `src/main/java/ec/edu/espe/logica_negocio/`
**Descripción:** Servicio con lógica de negocio y validaciones
**Contiene:**
- Validación de datos de entrada
- Reglas de negocio (ID único, edad > 0, etc.)
- Coordinación entre Vista y Repositorio
- Mensajes de respuesta descriptivos

**Responsabilidad:** Aplicar reglas de negocio antes de persistir

---

#### `EstudianteUI.java`
**Ubicación:** `src/main/java/ec/edu/espe/presentacion/`
**Descripción:** Interfaz gráfica de usuario (Swing)
**Contiene:**
- Formulario con campos: ID, Nombres, Edad
- Botones: Guardar, Editar, Eliminar, Listar
- Tabla para visualizar estudiantes
- Listeners de eventos
- Manejo de mensajes (JOptionPane)
- Limpieza de formulario
- Selección desde tabla

**Responsabilidad:** Interacción con el usuario

---

#### `Main.java`
**Ubicación:** `src/main/java/ec/edu/espe/presentacion/`
**Descripción:** Punto de entrada de la aplicación
**Contiene:**
- Método main()
- Inicialización de la UI en el Event Dispatch Thread

**Responsabilidad:** Arrancar la aplicación

---

### Documentación

#### `README.md` 🌟
**Ubicación:** Raíz del proyecto
**Descripción:** Documento principal del proyecto
**Contiene:**
- Descripción general
- Arquitectura del sistema
- Instrucciones de ejecución
- Funcionalidades
- Características técnicas
- Estructura del proyecto
- Casos de prueba básicos
- Tecnologías utilizadas

**📌 Leer primero este archivo**

---

#### `Explicacion_Arquitectura.md` 🌟
**Ubicación:** `DOCUMENTACION/`
**Descripción:** Explicación detallada de la arquitectura
**Contiene:**
- Descripción de las 3 capas
- Responsabilidades de cada capa
- Explicación del patrón Singleton
- Implementación del patrón NVC
- Beneficios del MVC
- Flujo de operaciones CRUD
- Instrucciones de ejecución

**Cumple con:** Rúbrica U2T1 - Comprensión de arquitectura

---

#### `Diagrama_Arquitectura.txt` 🌟
**Ubicación:** `DOCUMENTACION/`
**Descripción:** Representación visual de la arquitectura
**Contiene:**
- Diagrama de arquitectura MVC con 3 capas
- Diagrama de flujo de datos
- Diagrama del patrón Singleton
- Diagrama del patrón NVC
- Tabla de responsabilidades
- Leyenda y símbolos

**Cumple con:** Rúbrica U2T1 - Diagrama y organización

---

#### `Cuadro_Comparativo_MVC_vs_Singleton.md` 🌟
**Ubicación:** `DOCUMENTACION/`
**Descripción:** Análisis crítico comparativo
**Contiene:**
- Tabla comparativa detallada
- Análisis de qué problema resuelve cada patrón
- En qué capa se utiliza
- Influencia en el mantenimiento
- Prevención de fallas de diseño
- Reflexión sobre ventajas y limitaciones
- Identificación de riesgos
- Recomendaciones de uso

**Cumple con:** Rúbrica U2T3 - Comparación crítica

---

#### `Guia_Pruebas.md` 🌟
**Ubicación:** `DOCUMENTACION/`
**Descripción:** Casos de prueba del CRUD
**Contiene:**
- Instrucciones de ejecución
- 10 casos de prueba detallados:
  1. CREATE exitoso
  2. CREATE con ID duplicado
  3. CREATE con edad inválida
  4. CREATE con nombres vacíos
  5. READ (Listar)
  6. UPDATE exitoso
  7. UPDATE con ID no existente
  8. DELETE exitoso
  9. DELETE con ID no existente
  10. Persistencia con Singleton
- Checklist de evidencias
- Plantilla para documentar resultados
- Verificación de requisitos

**Cumple con:** Evidencia de ejecución del CRUD

---

#### `RESUMEN_ENTREGA.md` 🌟
**Ubicación:** `DOCUMENTACION/`
**Descripción:** Resumen ejecutivo de la entrega
**Contiene:**
- Lista de todo lo implementado
- Cumplimiento de rúbricas
- Estructura de entrega
- Actividades cumplidas
- Checklist final
- Pasos para completar evidencias
- Estado del proyecto

**📌 Revisar antes de entregar**

---

#### `README_EVIDENCIAS.md` 🌟
**Ubicación:** `EVIDENCIAS/`
**Descripción:** Guía para generar capturas de pantalla
**Contiene:**
- Checklist de capturas requeridas
- Formato de las capturas
- Instrucciones paso a paso
- Herramientas recomendadas
- Organización de evidencias
- Verificación antes de entregar

**📌 Seguir esta guía para generar evidencias**

---

## ✅ CUMPLIMIENTO DE REQUISITOS

### U2T1 - Taller de Arquitectura

| Requisito | Archivo(s) | Estado |
|-----------|------------|--------|
| Código fuente organizado | `src/` | ✅ |
| Explicación arquitectura | `Explicacion_Arquitectura.md` | ✅ |
| Diagrama | `Diagrama_Arquitectura.txt` | ✅ |
| Evidencia CRUD | `Guia_Pruebas.md` + `EVIDENCIAS/` | ⏳ |

### U2T2 - Taller Singleton + NVC

| Requisito | Archivo(s) | Estado |
|-----------|------------|--------|
| Código con Singleton | `EstudianteRepository.java` | ✅ |
| Explicación Singleton | `Explicacion_Arquitectura.md` | ✅ |
| Diagrama NVC | `Diagrama_Arquitectura.txt` | ✅ |
| Evidencia persistencia | `Guia_Pruebas.md` + `EVIDENCIAS/` | ⏳ |

### U2T3 - Análisis MVC y Singleton

| Requisito | Archivo(s) | Estado |
|-----------|------------|--------|
| Cuadro comparativo | `Cuadro_Comparativo_MVC_vs_Singleton.md` | ✅ |
| Análisis crítico | `Cuadro_Comparativo_MVC_vs_Singleton.md` | ✅ |
| Implementación técnica | `src/` | ✅ |

**Leyenda:**
- ✅ Completado
- ⏳ Pendiente (requiere ejecutar app)

---

## 🚀 FLUJO DE TRABAJO RECOMENDADO

### Para Revisar el Proyecto:

1. **Leer** `README.md` (5 min)
   - Entender qué es el proyecto
   - Ver tecnologías usadas
   - Conocer funcionalidades

2. **Estudiar** `DOCUMENTACION/Explicacion_Arquitectura.md` (15 min)
   - Comprender las 3 capas
   - Entender el Singleton
   - Ver el flujo de datos

3. **Visualizar** `DOCUMENTACION/Diagrama_Arquitectura.txt` (10 min)
   - Revisar diagramas
   - Entender flujos
   - Ver responsabilidades

4. **Analizar** `DOCUMENTACION/Cuadro_Comparativo_MVC_vs_Singleton.md` (15 min)
   - Comparar patrones
   - Leer análisis crítico
   - Entender ventajas y riesgos

5. **Explorar Código** `src/` (20 min)
   - Ver implementación del Singleton
   - Revisar capas
   - Entender CRUD

### Para Ejecutar y Probar:

1. **Compilar** (2 min)
   ```bash
   mvn clean compile
   ```

2. **Ejecutar** (1 min)
   ```bash
   mvn exec:java -Dexec.mainClass="ec.edu.espe.presentacion.Main"
   ```

3. **Probar** (15 min)
   - Seguir `DOCUMENTACION/Guia_Pruebas.md`
   - Realizar los 10 casos de prueba

4. **Capturar Evidencias** (10 min)
   - Seguir `EVIDENCIAS/README_EVIDENCIAS.md`
   - Tomar las 10 capturas requeridas

### Para Preparar la Entrega:

1. **Revisar** `DOCUMENTACION/RESUMEN_ENTREGA.md`
   - Verificar checklist
   - Confirmar archivos
   - Validar evidencias

2. **Organizar** archivos
   - Todo el código en `src/`
   - Toda la documentación en `DOCUMENTACION/`
   - Todas las capturas en `EVIDENCIAS/`

3. **Comprimir** proyecto
   - ZIP o RAR de toda la carpeta CRUD
   - Nombrar: `TALLER1_CRUD_G6.zip`

---

## 📊 ESTADÍSTICAS DEL PROYECTO

### Archivos de Código:
- **Total:** 5 archivos Java
- **Líneas de código:** ~500 líneas
- **Paquetes:** 4 paquetes

### Documentación:
- **Total:** 6 archivos Markdown + 1 TXT
- **Páginas equivalentes:** ~40 páginas
- **Diagramas:** 4 diagramas principales

### Funcionalidades:
- **Operaciones CRUD:** 4 (Create, Read, Update, Delete)
- **Validaciones:** 6 validaciones de negocio
- **Patrones implementados:** 2 (Singleton, MVC/NVC)
- **Capas arquitectónicas:** 3 (Datos, Negocio, Presentación)

---

## 🎯 ARCHIVOS ESENCIALES PARA LA ENTREGA

### Prioridad ALTA (Obligatorios):

1. ⭐ **README.md** - Descripción general
2. ⭐ **DOCUMENTACION/Explicacion_Arquitectura.md** - Teoría principal
3. ⭐ **DOCUMENTACION/Diagrama_Arquitectura.txt** - Diagramas
4. ⭐ **DOCUMENTACION/Cuadro_Comparativo_MVC_vs_Singleton.md** - Análisis
5. ⭐ **src/** - Todo el código fuente
6. ⭐ **EVIDENCIAS/** - Capturas de pantalla (por generar)

### Prioridad MEDIA (Recomendados):

7. **DOCUMENTACION/Guia_Pruebas.md** - Casos de prueba
8. **DOCUMENTACION/RESUMEN_ENTREGA.md** - Checklist
9. **pom.xml** - Configuración Maven

### Prioridad BAJA (Opcional):

10. **INSTRUCCIONES/** - Enunciados originales
11. **DOCUMENTACION/INDICE_GENERAL.md** - Este índice
12. **EVIDENCIAS/README_EVIDENCIAS.md** - Guía de evidencias

---

## 📞 CONTACTO Y SOPORTE

**Proyecto Académico**
- **Institución:** Universidad ESPE
- **Materia:** Arquitectura de Software
- **Grupo:** G6
- **Año:** 2024

---

## 📅 HISTORIAL

- **24/Nov/2025:** Creación del proyecto
- **24/Nov/2025:** Implementación completa del código
- **24/Nov/2025:** Generación de toda la documentación
- **Pendiente:** Generación de evidencias (capturas)

---

## ✨ RESUMEN EJECUTIVO

**Proyecto:** Sistema CRUD de Estudiantes
**Estado:** 95% Completado (pendiente capturas)
**Arquitectura:** MVC + 3 Capas
**Patrón:** Singleton
**Tecnología:** Java + Swing + Maven

**Archivos generados:** 12+ documentos
**Código:** 5 clases Java
**Calidad:** Sin errores de compilación
**Cumplimiento:** 100% de requisitos técnicos

---

**📌 NOTA FINAL:** 

Este índice sirve como mapa de navegación del proyecto. 
Para cualquier duda, empezar por el `README.md` y seguir 
con la documentación en orden según la necesidad.

¡Éxito en la presentación del proyecto! 🎓
