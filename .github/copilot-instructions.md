# Contexto del Producto y Proyecto: Sistema de Gestión de Inventario

## Parte 1: Contexto del Negocio y Producto

### 1. Visión General del Negocio
Este software está diseñado para la gestión operativa de negocios (grandes o pequeños). El núcleo del sistema es el control de stock mediante *lotes* y la administración de productos por *categorías*, garantizando la trazabilidad de cada movimiento.

### 2. Entidades Principales
* *Producto:* Cada ítem tiene un nombre, una categoría asignada y un estado (activo o inactivo).
* *Categoría:* Clasificación lógica de los productos.
* *Ingresos (Entradas):* Registran la entrada de mercancía. Campos: Producto, Número de Lote, Fecha de Ingreso, Fecha de Vencimiento, Cantidad, Precio Costo y Precio Venta.
* *Egresos (Salidas):* Registran la salida de mercancía. Campos: Producto, Número de Lote, Fecha de Egreso, Cantidad, Precio Costo y Precio Venta.

### 3. Modelo de Usuarios y Seguridad
El acceso al sistema requiere registro con Nombre, Email y Contraseña. La activación de cuentas es gestionada por el rol *Cliente*.

*Matriz de Roles y Permisos (RBAC)*

| Rol | Identidad | Permisos y Acceso |
| :--- | :--- | :--- |
| *Administrador* | Programador / Soporte | Acceso total al código, base de datos y todas las funciones del sistema. |
| *Cliente* | Dueño del Negocio | Gestión completa de productos, visualización de movimientos y control de usuarios (activar/desactivar). |
| *Empleado* | Operador del Negocio | Acceso operativo: Puede registrar ingresos/egresos, filtrar productos por vencimiento, categoría y otras variables. Prohibida la edición o modificación de registros. |

### 4. Reglas de Negocio Críticas
1. *Validación de Lote:* Todo ingreso y egreso debe estar vinculado a un número de lote para control de vencimientos.
2. *Estado de Usuario:* Un usuario solo puede operar si su estado es activo.
3. *Inmutabilidad para Empleados:* El rol Empleado puede crear nuevos registros y usar filtros, pero *no tiene permisos para modificar ni eliminar* ningún dato una vez registrado.
4. *Jerarquía de Precios:* El sistema debe manejar siempre el precio de costo y el precio de venta en cada transacción de inventario.

---

## Parte 2: Contexto Técnico y del Proyecto (Backend)

### Visión General del Proyecto
* *Nombre:* Stock Manager Backend
* *Descripción corta:* API REST para gestionar productos, ingresos y egresos de inventario.
* *Estado actual:* Desarrollo activo (prototipo estable).
* *Propietario / Contacto:* Gonzalo — gonza@example.com

### Tecnologías Utilizadas
* *Backend:* Node.js 18, Express 4.x
* *Base de Datos:* MySQL 8
* *ORM / Consultas:* Conexión manual con mysql2 (sin ORM)
* *Pruebas:* Jest, Supertest
* *Linting / Formateo:* ESLint + Prettier
* *CI / CD:* GitHub Actions (lint, test, build)
* *Otros servicios:* N/A (despliegue local)

### Arquitectura y Diseño
* API REST con rutas que llaman a validaciones y a modelos de datos.
* Capas divididas en: rutas (controladores), validaciones (reglas de entrada), modelos de base de datos (acceso a DB) y middleware (autenticación y autorización).
* No se utilizan patrones complejos; la lógica se mantiene ligera en los controladores.

### Estructura de Carpetas
* */ (raíz):* Incluye index.js como punto de entrada.
* *routes/:* Archivos que definen endpoints por recurso.
* *modelos_db/:* Esquemas de tablas y funciones CRUD.
* *middleware/:* Validadores de token y roles.
* *validaciones/:* Esquemas de validación para cada entidad.
* *dbdata/:* Scripts de esquema (db_schema.sql) y datos iniciales (seed.sql).

### Convenciones de Código
* JavaScript con ES6+ (uso de const/let y funciones flecha).
* Formato controlado estrictamente por Prettier.
* Reglas de ESLint: punto y coma opcional, preferencia por comillas simples.
* Nomenclatura: camelCase para variables y funciones, PascalCase para clases.
* Modularidad: Un módulo por archivo, utilizando exportación por defecto para funciones únicas.

### Entorno y Credenciales
* Variables gestionadas en archivo .env (incluye DB_HOST, DB_USER, DB_PASS, DB_NAME, JWT_SECRET, PORT).
* Es necesario copiar .env.example para iniciar la aplicación en el entorno local.

### Configuración y Ejecución (Desarrollo)
1. Clonar el repositorio.
2. Copiar .env.example a .env y completar las credenciales.
3. Ejecutar npm install.
4. Crear la base de datos y ejecutar los scripts ubicados en la carpeta dbdata/.
5. Ejecutar npm run dev (o node index.js).
6. Ejecutar npm test para correr la suite de pruebas.

### Base de Datos y Migraciones
* El esquema principal reside en dbdata/db_schema.sql.
* Los datos iniciales (semillas) se proveen en dbdata/seed.sql.
* No se utiliza un sistema de migraciones automatizado en este proyecto.

### Visión General de la API
* *Autenticación:* Basada en JWT, con endpoint de inicio de sesión en /auth/login.
* *Recursos principales:* usuarios, productos, ingresos, egresos, categorias.
* *Formato de respuesta estándar:* { ok: true, data: ..., error: null }.
* *Códigos de estado HTTP:* 200 (éxito), 201 (creado), 400 (error de validación), 401 (no autorizado), 403 (prohibido), 500 (error interno del servidor).

### Reglas de Pruebas
* Pruebas unitarias gestionadas con Jest y pruebas de integración con Supertest.
* Se ejecutan mediante npm test o npm run test:watch.
* El proyecto requiere una cobertura de código mínima del 80%.

### Integración Continua (CI) y Controles de Calidad
* Flujo de trabajo en GitHub Actions con pasos de linting y testing.
* Se recomienda implementar husky y lint-staged para hooks locales (pendiente de configuración).

### Seguridad y Privacidad
* Autenticación mediante JWT con tiempos de expiración configurados.
* Validación exhaustiva de todas las entradas a través de la capa de validaciones.
* Prohibición estricta de almacenar datos sensibles en texto plano.

### Despliegue
* Entornos soportados: desarrollo y producción.
* El despliegue se realiza copiando los archivos al servidor, ejecutando npm install y aplicando las migraciones manualmente.
* Alojamiento: Servidor privado (los detalles son externos al repositorio).

### Operaciones y Monitoreo
* Los registros (logs) se imprimen en consola con niveles de información básicos.
* Existe un endpoint de comprobación de salud en /health que devuelve un estado 200 OK.

### Archivos Importantes y Dónde Encontrarlos
* index.js: Archivo principal y punto de arranque de la aplicación.
* Base de datos: dbdata/db_schema.sql y dbdata/seed.sql.
* Lógica principal: Carpetas modelos_db/, routes/, middleware/, y validaciones/.

### Notas de Incorporación y Cómo Hacer Cambios
* *Para agregar una nueva ruta:* Definir el archivo en routes/, agregar las reglas en validaciones/, crear las funciones CRUD correspondientes en modelos_db/ y finalmente registrar la nueva ruta en index.js.
* Es obligatorio actualizar la carpeta dbdata/ si se realiza algún cambio estructural en la base de datos.

### Registro de Cambios e Historial
* Se debe mantener una tabla actualizada con los cambios principales en esta sección.