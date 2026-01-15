# Reportes de Errores

Este directorio contiene el registro y seguimiento de defectos encontrados durante las fases de desarrollo y pruebas del proyecto **Kairos Mix**.

## Informacion del ECS

- **Codigo del ECS:** BUG
- **Nombre del ECS:** Reportes de Errores
- **Autor:** Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez
- **Proyecto:** Kairos Mix - Sistema de Gestion para "Kairos de Dios"
- **Linea base:** LBC - Linea Base Codigo
- **Localizacion:** 27837_G6_ADS\PROPIAS\Biblioteca de Trabajo\1. ELICITACION\1.8 Reportes de errores
- **Tipo de ECS:** Documento (XLSX) y Tickets de Issues
- **Fecha de creacion:** 14/01/2026
- **ID del proyecto:** 27837_G6_ADS

## Proposito

Sistematizar la deteccion, documentacion y resolucion de errores para garantizar la calidad del software.

## Ciclo de Vida del Error

1. **Reportado:** Error detectado e ingresado al sistema
2. **Asignado:** Desarrollador responsable asignado
3. **En Correccion:** Trabajo en curso para resolver el defecto
4. **Resuelto:** Fix implementado y listo para verificacion
5. **Verificado:** QA confirma que el error esta solucionado
6. **Cerrado:** Error completamente resuelto

## Clasificacion de Severidad

### Critico:
- Sistema no funcional o perdida de datos
- Ejemplo: NutricionalService devuelve valores incorrectos

### Alta:
- Funcionalidad principal afectada
- Ejemplo: No se pueden crear pedidos

### Media:
- Funcionalidad secundaria con workaround
- Ejemplo: Reportes muestran formato incorrecto

### Baja:
- Problemas cosmeticos o de UI
- Ejemplo: Alineacion de botones incorrecta

## Campos del Reporte

- **ID del Error:** BUG-XXX
- **Titulo:** Descripcion breve
- **Severidad:** Critico/Alta/Media/Baja
- **Modulo:** ProductoController, MezclaController, etc.
- **Pasos para reproducir:** Secuencia detallada
- **Resultado esperado:** Comportamiento correcto
- **Resultado actual:** Comportamiento erroneo
- **Asignado a:** Desarrollador responsable
- **Estado:** Reportado/Asignado/En Correccion/Resuelto/Verificado/Cerrado
