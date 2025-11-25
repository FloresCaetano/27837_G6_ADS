# Guía para Pruebas y Evidencias del CRUD

## Instrucciones para Ejecutar el Proyecto

### Opción 1: Desde Maven (Terminal)

1. Abrir terminal en la carpeta del proyecto
2. Compilar el proyecto:
   ```bash
   mvn clean compile
   ```
3. Ejecutar la aplicación:
   ```bash
   mvn exec:java -Dexec.mainClass="ec.edu.espe.presentacion.Main"
   ```

### Opción 2: Desde IDE (IntelliJ IDEA / Eclipse / NetBeans)

1. Abrir el proyecto en el IDE
2. Localizar la clase `Main.java` en `src/main/java/ec/edu/espe/presentacion/`
3. Click derecho → Run 'Main.main()'

---

## Casos de Prueba para el CRUD

### ✅ PRUEBA 1: CREATE (Crear Estudiante)

**Objetivo:** Verificar que se puede agregar un estudiante correctamente

**Pasos:**
1. Ejecutar la aplicación
2. Ingresar en el formulario:
   - ID: `EST001`
   - Nombres: `Juan Pérez`
   - Edad: `20`
3. Click en botón "Guardar"

**Resultado Esperado:**
- Mensaje: "Estudiante guardado"
- El estudiante aparece en la tabla
- Los campos del formulario se limpian

**Captura requerida:** Pantalla con el estudiante agregado en la tabla

---

### ✅ PRUEBA 2: CREATE - Validación ID Duplicado

**Objetivo:** Verificar que no se pueden agregar estudiantes con ID duplicado

**Pasos:**
1. Intentar agregar otro estudiante con ID: `EST001`
2. Click en "Guardar"

**Resultado Esperado:**
- Mensaje de error: "ID ya existe"
- El estudiante NO se agrega a la tabla

**Captura requerida:** Mensaje de error mostrado

---

### ✅ PRUEBA 3: CREATE - Validación de Edad

**Objetivo:** Verificar validación de edad mayor a 0

**Pasos:**
1. Ingresar:
   - ID: `EST002`
   - Nombres: `María López`
   - Edad: `0` o `-5`
2. Click en "Guardar"

**Resultado Esperado:**
- Mensaje de error: "Edad debe ser mayor que 0"

**Captura requerida:** Mensaje de error

---

### ✅ PRUEBA 4: CREATE - Validación de Nombres Vacíos

**Objetivo:** Verificar que los nombres son obligatorios

**Pasos:**
1. Ingresar:
   - ID: `EST003`
   - Nombres: (dejar vacío)
   - Edad: `22`
2. Click en "Guardar"

**Resultado Esperado:**
- Mensaje de error: "Nombres son obligatorios"

---

### ✅ PRUEBA 5: READ (Listar Estudiantes)

**Objetivo:** Verificar que se listan todos los estudiantes

**Pasos:**
1. Agregar varios estudiantes:
   - EST001 - Juan Pérez - 20
   - EST002 - María López - 22
   - EST003 - Carlos García - 19
2. Click en botón "Listar"

**Resultado Esperado:**
- La tabla muestra todos los estudiantes agregados
- Columnas: ID, Nombres, Edad correctamente pobladas

**Captura requerida:** Tabla con múltiples estudiantes

---

### ✅ PRUEBA 6: UPDATE (Editar Estudiante)

**Objetivo:** Verificar que se puede actualizar un estudiante existente

**Pasos:**
1. Click en un estudiante de la tabla (ejemplo: EST001)
2. Los datos se cargan en el formulario
3. Modificar:
   - Nombres: `Juan Carlos Pérez`
   - Edad: `21`
4. Click en botón "Editar"

**Resultado Esperado:**
- Mensaje: "Estudiante actualizado"
- Los datos se actualizan en la tabla
- El ID permanece igual

**Captura requerida:** Estudiante con datos modificados en la tabla

---

### ✅ PRUEBA 7: UPDATE - ID No Existente

**Objetivo:** Verificar validación al editar ID que no existe

**Pasos:**
1. Escribir manualmente en el formulario:
   - ID: `EST999` (no existe)
   - Nombres: `Test`
   - Edad: `25`
2. Click en "Editar"

**Resultado Esperado:**
- Mensaje de error: "No existe estudiante con ese ID"

---

### ✅ PRUEBA 8: DELETE (Eliminar Estudiante)

**Objetivo:** Verificar que se puede eliminar un estudiante

**Pasos:**
1. Click en un estudiante de la tabla (ejemplo: EST002)
2. El ID se carga en el formulario
3. Click en botón "Eliminar"

**Resultado Esperado:**
- Mensaje: "Estudiante eliminado"
- El estudiante desaparece de la tabla

**Captura requerida:** Tabla sin el estudiante eliminado

---

### ✅ PRUEBA 9: DELETE - ID No Existente

**Objetivo:** Verificar validación al eliminar ID que no existe

**Pasos:**
1. Escribir en formulario ID: `EST999`
2. Click en "Eliminar"

**Resultado Esperado:**
- Mensaje de error: "No existe estudiante con ese ID"

---

### ✅ PRUEBA 10: Persistencia con Singleton

**Objetivo:** Demostrar que los datos persisten gracias al Singleton

**Pasos:**
1. Agregar 3 estudiantes
2. Realizar operaciones CRUD (editar, eliminar)
3. Listar nuevamente

**Resultado Esperado:**
- Los datos permanecen consistentes
- No se pierde información entre operaciones
- Todas las operaciones trabajan sobre la misma lista

**Explicación técnica:**
```java
// Cada vez que se llama, retorna LA MISMA instancia
EstudianteRepository repo = EstudianteRepository.getInstance();
```

**Captura requerida:** Secuencia de operaciones mostrando persistencia

---

## Checklist de Evidencias para Entregar

- [ ] Captura: Pantalla inicial de la aplicación
- [ ] Captura: Estudiante agregado correctamente (CREATE)
- [ ] Captura: Mensaje de error por ID duplicado
- [ ] Captura: Mensaje de error por validación de edad
- [ ] Captura: Tabla con múltiples estudiantes (READ)
- [ ] Captura: Estudiante actualizado (UPDATE)
- [ ] Captura: Estudiante eliminado (DELETE)
- [ ] Captura: Mensaje de error al editar/eliminar ID inexistente
- [ ] Captura: Operaciones CRUD completas demostrando persistencia

---

## Plantilla para Documentar Resultados

```
═══════════════════════════════════════════════════════════════════
PRUEBA: [Nombre de la prueba]
═══════════════════════════════════════════════════════════════════

Fecha: _______________
Ejecutado por: _______________

Datos de entrada:
- ID: _______________
- Nombres: _______________
- Edad: _______________

Acción realizada: _______________

Resultado obtenido:
[ ] Exitoso
[ ] Error

Mensaje del sistema: _______________

Observaciones: _______________

Captura de pantalla adjunta: [Sí/No]
═══════════════════════════════════════════════════════════════════
```

---

## Verificación de Requisitos Cumplidos

### U2T1 - Arquitectura MVC
- [x] CRUD funcional de Estudiante (ID, Nombres, Edad)
- [x] Separación en 3 capas (Datos, Negocio, Presentación)
- [x] Descripción de responsabilidades de cada capa
- [x] Diagrama de arquitectura
- [x] Explicación de mantenibilidad

### U2T2 - Patrón Singleton
- [x] Singleton implementado en EstudianteRepository
- [x] getInstance() funcional
- [x] Persistencia compartida demostrada
- [x] Integración con patrón NVC
- [x] Explicación del patrón

### U2T3 - Análisis Comparativo
- [x] Cuadro comparativo MVC vs Singleton
- [x] Análisis crítico de ambos patrones
- [x] Reflexión sobre impacto y ventajas
- [x] Identificación de limitaciones y riesgos

---

## Comandos Útiles para Testing

### Compilar el proyecto
```bash
mvn clean compile
```

### Ejecutar tests unitarios (si existen)
```bash
mvn test
```

### Generar documentación JavaDoc
```bash
mvn javadoc:javadoc
```

### Empaquetar el proyecto
```bash
mvn package
```

---

## Notas Importantes

1. **Antes de tomar capturas:** Asegúrate de que la aplicación esté ejecutándose correctamente
2. **Formato de capturas:** PNG o JPG, con buena resolución
3. **Organización:** Nombra las capturas de forma descriptiva (ej: `prueba_create_exitoso.png`)
4. **Evidencia completa:** Cada captura debe mostrar claramente la acción y el resultado
5. **Pruebas en secuencia:** Realiza las pruebas en orden para demostrar el flujo completo del CRUD

---

## ¿Problemas al Ejecutar?

### Error: "No se encuentra la clase Main"
**Solución:** Verificar que el mainClass en pom.xml sea correcto:
```xml
<mainClass>ec.edu.espe.presentacion.Main</mainClass>
```

### Error: "No se puede compilar"
**Solución:** 
```bash
mvn clean
mvn install
```

### La ventana no aparece
**Solución:** Verificar que se esté usando SwingUtilities.invokeLater en Main.java
