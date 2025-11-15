# 🎯 Trivia de Programación Web

Aplicación web interactiva que genera preguntas de opción múltiple sobre JavaScript, CSS y HTML utilizando inteligencia artificial. Perfecta para estudiantes y desarrolladores que desean poner a prueba sus conocimientos de programación web.

## 📋 Descripción

Esta aplicación genera dinámicamente preguntas de trivia sobre diversos temas de desarrollo web utilizando la API de Gemini AI. Cada pregunta incluye cuatro opciones de respuesta y proporciona una explicación detallada después de responder.

## ✨ Características

- 🤖 **Generación dinámica de preguntas** con Gemini AI
- 📚 **15 temas diferentes** de JavaScript, CSS y HTML
- ✅ **Sistema de puntuación** que registra respuestas correctas e incorrectas
- 💾 **Persistencia de datos** mediante localStorage
- 📱 **Diseño responsive** adaptable a móviles, tablets y escritorio
- 🎨 **Interfaz moderna** con animaciones y gradientes
- 💬 **Feedback inmediato** con explicaciones educativas
- 🔄 **Reinicio de contadores** para comenzar de nuevo

## 🚀 Instalación y Configuración

### Requisitos previos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet
- API Key de Google AI Studio

### Pasos de instalación

1. **Obtener una API Key de Google AI Studio**
   - Visita [Google AI Studio](https://aistudio.google.com/apikey)
   - Inicia sesión con tu cuenta de Google
   - Crea una nueva API Key
   - Copia la clave generada

2. **Configurar la aplicación**
   - Abre el archivo `script.js`
   - Localiza la línea 2 donde dice `const API_KEY = 'TU_API_KEY_AQUI';`
   - Reemplaza `'TU_API_KEY_AQUI'` con tu clave API real:
     ```javascript
     const API_KEY = 'tu-clave-api-de-google-aqui';
     ```

3. **Ejecutar la aplicación**
   - Abre el archivo `index.html` en tu navegador
   - La aplicación cargará automáticamente la primera pregunta
   - ¡Comienza a responder!

## 📁 Estructura del Proyecto

```
trivia-programacion-web/
│
├── index.html      # Página principal de la aplicación
├── styles.css      # Estilos y diseño visual
├── script.js       # Lógica de la aplicación y conexión con API
└── README.md       # Este archivo
```

## 🎮 Cómo Usar

1. **Inicio**: Al abrir la aplicación, se carga automáticamente una pregunta aleatoria
2. **Responder**: Selecciona una de las cuatro opciones disponibles
3. **Feedback**: 
   - ✅ Si es correcta: el botón se pone verde y aumenta el contador de correctas
   - ❌ Si es incorrecta: el botón se pone rojo y se muestra la respuesta correcta en verde
4. **Explicación**: Se muestra una explicación detallada de la respuesta
5. **Continuar**: Presiona el botón "Siguiente Pregunta" para obtener una nueva pregunta
6. **Reiniciar**: Usa el botón "🔄 Reiniciar Contadores" para resetear tu progreso

## 📚 Temas Cubiertos

La aplicación genera preguntas sobre los siguientes temas:

1. Concepto de arreglos y operaciones sobre arreglos
2. Concepto de diccionarios y funciones básicas
3. Operadores lógicos, aritméticos, de comparación y ternario
4. Uso de la consola para debugging
5. Funciones con parámetros por default
6. Eventos en JavaScript
7. DOM manipulation y selectores
8. Promesas y async/await
9. CSS Flexbox y Grid
10. Selectores CSS y especificidad
11. Métodos de arrays (map, filter, reduce)
12. Scope y hoisting en JavaScript
13. This y arrow functions
14. Clases y programación orientada a objetos
15. Fetch API y peticiones HTTP

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la aplicación
- **CSS3**: Estilos, animaciones y diseño responsive
- **JavaScript ES6+**: Lógica de la aplicación
- **Bootstrap 5.3.8**: Framework CSS para componentes
- **Gemini AI API**: Generación de preguntas dinámicas
- **localStorage**: Persistencia de datos del navegador

## 💡 Funcionalidades Técnicas

### Sistema de Contadores
- Los contadores se guardan automáticamente en localStorage
- Persisten incluso después de cerrar el navegador
- Se pueden reiniciar en cualquier momento

### Generación de Preguntas
- Selección aleatoria de temas
- Formato JSON estructurado
- Cuatro opciones de respuesta por pregunta
- Explicación educativa incluida

### Interfaz de Usuario
- Animaciones suaves en cada interacción
- Efectos hover en botones
- Feedback visual con colores intuitivos
- Spinner de carga mientras se genera la pregunta

## ⚙️ Personalización

### Modificar temas
Puedes agregar o modificar los temas editando el array `temas` en `script.js`:

```javascript
const temas = [
    "tu tema personalizado aquí",
    "otro tema personalizado",
    // ... más temas
];
```

### Cambiar el modelo de IA
Puedes cambiar el modelo de Gemini modificando la constante `MODEL` en `script.js`:

```javascript
const MODEL = 'gemini-pro'; // o 'gemini-1.5-pro-latest'
```

## ⚠️ Consideraciones Importantes

- **Conexión a Internet**: Requerida para la generación de preguntas
- **API Key**: Necesaria y debe ser válida
- **Límites de uso**: La API de Gemini tiene límites de uso gratuitos
- **Privacidad**: Los contadores se guardan localmente en tu navegador
- **Compatibilidad**: Funciona en navegadores modernos con soporte para ES6+

## 🔧 Solución de Problemas

### La aplicación muestra "Error al cargar la pregunta"
- Verifica que tu API Key sea correcta
- Asegúrate de tener conexión a internet
- Revisa la consola del navegador para más detalles
- Confirma que la API Key esté activa en Google AI Studio

### Los contadores no se guardan
- Verifica que tu navegador permita localStorage
- No estés en modo incógnito/privado
- Revisa la configuración de privacidad del navegador

### La pregunta tarda mucho en cargar
- Normal en la primera carga
- Depende de la velocidad de internet
- La API puede tener latencia variable

## 📱 Compatibilidad

- ✅ Google Chrome (recomendado)
- ✅ Microsoft Edge
- ✅ Mozilla Firefox
- ✅ Safari
- ✅ Opera

## 👨‍💻 Uso Educativo

Esta aplicación fue desarrollada como proyecto de práctica para el curso de Desarrollo Web en la Universidad Tecnológica de la Mixteca. Es ideal para:

- Estudiantes que quieren practicar conceptos de programación web
- Desarrolladores que desean repasar fundamentos
- Instructores que buscan una herramienta de evaluación interactiva
- Autodidactas aprendiendo JavaScript, CSS y HTML

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

---

**¡Diviértete aprendiendo programación web! 🚀**

Para preguntas o sugerencias, consulta con tu instructor de Desarrollo Web.