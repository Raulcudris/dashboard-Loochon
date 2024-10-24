
# Loochon Dashboard - Gestión de Usuarios y Administración de la App

Bienvenido al proyecto **Loochon Dashboard**, una aplicación basada en **Next.js** y **React** para gestionar usuarios y administrar todos los aspectos relevantes del sistema **Loochon**. Este dashboard proporciona un entorno centralizado donde se pueden gestionar usuarios, acceder a reportes, configurar parámetros del sistema y más.

---

## Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Uso](#uso)
- [Variables de Entorno](#variables-de-entorno)
- [Estilo de Código](#estilo-de-código)
- [Contribución](#contribución)

---

## Requisitos

Asegúrate de tener instalado:

- **Node.js** (v16+)
- **npm** o **yarn**

---

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/loochon-dashboard.git
   cd loochon-dashboard
   ```

2. **Instalar las dependencias:**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar las variables de entorno:**  
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```plaintext
   NEXT_PUBLIC_API_URL=https://api.loochon.com
   ```

---

## Estructura del Proyecto

```plaintext
/loochon-dashboard
│
├── /public              # Archivos públicos (imágenes, íconos).
├── /src
│   ├── /components      # Componentes reutilizables (Sidebar, Navbar, etc.).
│   ├── /layouts         # Layouts del dashboard.
│   ├── /modules         # Módulos funcionales (Usuarios, Reportes, etc.).
│   ├── /pages           # Páginas del dashboard (Next.js).
│   ├── /context         # Contextos de React (estado global).
│   ├── /hooks           # Custom Hooks.
│   ├── /services        # Servicios API (axios o fetch).
│   ├── /styles          # Estilos globales y específicos.
│   └── /utils           # Funciones de utilidad.
│
├── .env                 # Variables de entorno.
├── .gitignore           # Archivos ignorados por Git.
├── next.config.js       # Configuración de Next.js.
├── package.json         # Dependencias y scripts del proyecto.
└── README.md            # Documentación del proyecto.
```

---

## Scripts Disponibles

### **`npm run dev`**
Inicia el servidor de desarrollo en `http://localhost:3000`.

### **`npm run build`**
Compila el proyecto para producción.

### **`npm start`**
Inicia la aplicación en modo producción.

### **`npm run lint`**
Verifica el estilo del código con ESLint.

---

## Uso

### **Gestión de Usuarios**
- Ver la lista de usuarios registrados.
- Crear, editar y eliminar usuarios desde el módulo de **Usuarios**.
- Acceso rápido a información relevante (nombre, correo, roles).

### **Autenticación**
- Uso del **Contexto de Autenticación** para controlar el acceso.
- Redirección automática a la página de inicio de sesión si no hay sesión activa.

### **Reportes y Estadísticas**
- Acceso a informes básicos desde el módulo de **Reportes**.
- Descarga de reportes en formatos CSV/PDF.

### **Navegación**
- **Sidebar:** Navegación por las secciones del dashboard.
- **Navbar:** Acceso rápido a configuraciones y al perfil del usuario actual.

---

## Variables de Entorno

Las variables de entorno permiten configurar la conexión con APIs externas o servicios internos:

```plaintext
NEXT_PUBLIC_API_URL=URL_DE_LA_API
NEXT_PUBLIC_ENV=development # o production
```

- **NEXT_PUBLIC_API_URL:** Define la URL base de la API de Loochon.

---

## Estilo de Código

Este proyecto sigue las siguientes normas de estilo:

- **Eslint** y **Prettier** para mantener el código limpio y formateado.
- Usa **CSS Modules** o **Sass** para estilos, y evita el uso de estilos en línea.

Ejecuta el siguiente comando para validar el estilo del código:

```bash
npm run lint
```

---

## Contribución

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama con la funcionalidad que deseas añadir:  
   ```bash
   git checkout -b nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:  
   ```bash
   git commit -m "Añade nueva funcionalidad"
   ```
4. Sube tus cambios al repositorio:  
   ```bash
   git push origin nueva-funcionalidad
   ```
5. Crea un **Pull Request** desde tu repositorio fork hacia el principal.

---

## Créditos

Este proyecto fue desarrollado para la administración del sistema **Loochon** y permite gestionar usuarios y configurar aspectos clave del sistema.

---

## Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.
