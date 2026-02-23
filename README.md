# Gestión de Tareas – Prueba Técnica (Angular + .NET)

# Objetivo
Desarrollar una aplicación web que permita administrar tareas demostrando:
- Implementación completa de CRUD (Crear, Leer, Actualizar, Eliminar)
- Comunicación cliente-servidor mediante API REST
- Uso de Entity Framework Core
- Consumo de API con HttpClient en Angular
- Organización y buenas prácticas de desarrollo

# Funcionalidades Implementadas
- ✔ Listar todas las tareas  
- ✔ Crear nuevas tareas  
- ✔ Editar tareas existentes  
- ✔ Eliminar tareas  
- ✔ Marcar tareas como completadas o pendientes  
- ✔ Interfaz visual clara y funcional  

# Tecnologías Utilizadas

# Backend
- .NET 8 Web API
- Entity Framework Core
- Base de datos en memoria (InMemory)
- Swagger (documentación y pruebas)

# Frontend
- Angular
- HttpClient
- FormsModule (Two-way data binding)
- Standalone Components

# Estructura del Proyecto

Task_CRUD/
Task_Api/        → Backend (.NET Web API)
frontend/        → Frontend (Angular)

# Instrucciones de Ejecución

# 1. Ejecutar el Backend (.NET)

1. Abrir una terminal en la carpeta: Task_Api

2. Ejecutar: dotnet run

3. El backend se ejecutará en: https://localhost:7007

4. Swagger estará disponible en: https://localhost:7007/swagger


# 2. Ejecutar el Frontend (Angular)

1. Abrir una nueva terminal en la carpeta: frontend

2. Instalar dependencias: npm install

3. Ejecutar la aplicación:ng serve

4. Abrir en el navegador:http://localhost:4200


# Comunicación Frontend - Backend

El frontend consume la API mediante: https://localhost:7007/api/Tasks

Se encuentra habilitado CORS para permitir conexión desde: http://localhost:4200

# Base de Datos

Se utiliza una base de datos en memoria (InMemory).

Los datos se pierden al reiniciar el backend.

# Endpoints Principales

| Método | Endpoint        | Descripción          |
|--------|-----------------|----------------------|
| GET    | /api/Tasks      | Listar tareas        |
| GET    | /api/Tasks/{id} | Obtener tarea por ID |
| POST   | /api/Tasks      | Crear tarea          |
| PUT    | /api/Tasks/{id} | Actualizar tarea     |
| DELETE | /api/Tasks/{id} | Eliminar tarea       |


# Requisitos Previos

- .NET SDK 8 o superior
- Node.js 18 o superior
- Angular CLI

# Buenas Prácticas Aplicadas

- Separación de responsabilidades
- Código organizado por capas
- Servicios para consumo de API
- Manejo de estado en Angular
- Estructura clara del repositorio
- Implementación completa de CRUD

# Desarrollado por
Cristian Hernández

Proyecto desarrollado como prueba técnica Fullstack (Angular + .NET).