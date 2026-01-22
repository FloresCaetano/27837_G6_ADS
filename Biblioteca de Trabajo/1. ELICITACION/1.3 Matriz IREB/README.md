# Matriz de Requisitos IREB (IREB)

Este directorio contiene los documentos que forman parte del Elemento de Configuracion del Software (ECS) relacionado con la matriz de requisitos basada en el estandar IREB para el proyecto **Kairos Mix**.

## Informacion del ECS

- **Codigo del ECS:** IREB
- **Nombre del ECS:** Matriz de Requisitos IREB
- **Autor:** Caetano Flores, Jordan Guaman, Anthony Morales, Leonardo Narvaez
- **Proyecto:** Kairos Mix - Tienda de frutos secos "Kairos de Dios"
- **Linea base:** LBR - Linea Base Requisitos
- **Localizacion:** 27837_G6_ADS\PROPIAS\Biblioteca de Trabajo\1. ELICITACION\1.3 Matriz IREB
- **Tipo de ECS:** Documento (CSV/XLSX)
- **Fecha de creacion:** 14/01/2026
- **ID del proyecto:** 27837_G6_ADS

# Historial de Versiones de la Matriz IREB

| Version                   | Fecha      | Responsable     | Aprobado por                                                  |
| ------------------------- | ---------- | --------------- | ------------------------------------------------------------- |
| `G6_Matriz_IREB_V1.xlsx` | 14/01/2026 | Caetano Flores  | Jordan Guaman y Anthony Morales   |
| `G6_Matriz_IREB_V2.xlsx` | 15/01/2026 | Caetano Flores  | Jordan Guaman y Anthony Morales   |
| `G6_Informe_Matriz_IREB_V1.docx` | 15/01/2026 | Caetano Flores  | Jordan Guaman y Leonardo Narvaez   |
| `G6_Informe_Matriz_IREB_V2.docx` | 20/01/2026 | Caetano Flores  | Jordan Guaman y Leonardo Narvaez   |


Estas versiones reflejan la evolucion del analisis de requisitos conforme al enfoque propuesto por el estandar IREB. Cada version representa una validacion formal en la linea base de requisitos.

## Trazabilidad de Requisitos

La matriz IREB mapea:
- Requisitos Funcionales (RF) -> Casos de Uso (CU)
- Casos de Uso (CU) -> Componentes de Diseño (Clases/Servicios)
- Componentes de Diseño -> Casos de Prueba (TC)

### Ejemplo de Trazabilidad:
**RF-005: Calculo Nutricional**
- CU-004: KM_Diseñar Mezcla Personalizada
- Clase: NutricionalService
- Metodo: calcularValoresNutricionales()
- Prueba: TC-005-001 (Verificar suma correcta de calorias)
