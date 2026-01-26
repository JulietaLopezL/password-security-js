# password-security-js
Web app para generar contraseñas seguras en JavaScript, con perfiles de seguridad, análisis de fuerza, historial y estadísticas de uso. 
Proyecto enfocado en **JavaScript**, **HTML/CSS** y buenas prácticas de organización de código.

> Estado: finalizado ✅

# Estructura del proyecto
index.html --> estructura principal de la interfaz

css/styles.css --> estilos

js/main.js --> punto de entrada (manejo de eventos)

js/generator.js --> lógica de generación de contraseñas

js/strength.js --> lógica de cálculo de fortaleza

js/storage.js --> lógica de almacenamiento del historial y estadísticas

# Cómo se usa?
**Como desarrollador:** 
  1. Clonar el repositorio
  2. Abrir la carpeta del proyecto.
  3. Abrir `index.html` en el navegador **o** usar una extensión tipo *Live Server*.

**Como usuario final:**
  1. Entrar a: `https://tu-usuario.github.io/password-security-js/`.
  2. Elegir un perfil de seguridad (Simple, Recomendado, Alta seguridad o Personalizado).
  3. Ajustar longitud / tipos de caracteres si es necesario.
  4. Hacer clic en **Generar**.
  5. Ver la fuerza de la contraseña y, si quiere, copiarla o consultar el historial.

# Demo:
<img width="692" height="589" alt="image" src="https://github.com/user-attachments/assets/4828f2ce-3b33-4283-a50c-e2047ca1643e" />

<img width="703" height="508" alt="image" src="https://github.com/user-attachments/assets/4058c95c-17c1-413e-925f-2f97ed8c948c" />

<img width="575" height="383" alt="image" src="https://github.com/user-attachments/assets/a2bc0946-b49d-478f-8801-4c8f8551cfee" />


# Decisiones: 
Al inicio probé separar ramas por HTML/CSS/JS, pero al ser un proyecto pequeño y
desarrollado por una sola persona, ese enfoque solo agregaba complejidad innecesaria.
La rama html-css quedó como registro del proceso y continué el trabajo únicamente
desde develop.
