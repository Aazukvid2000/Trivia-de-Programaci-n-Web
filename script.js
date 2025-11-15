// Configuración de la API de Gemini
const API_KEY = 'LA-API-DE-GEMINI-AQUI'; // Reemplaza con tu clave API de Google AI Studio
const MODEL = 'gemini-2.0-flash';

// Lista de temas para las preguntas
const temas = [
    "concepto de arreglo y operaciones sobre arreglos",
    "concepto de diccionarios y funciones básicas",
    "operadores lógicos, aritméticos, de comparación, ternario",
    "uso de la consola para debuggear",
    "funciones con parámetros por default",
    "eventos en JavaScript",
    "DOM manipulation y selectores",
    "promesas y async/await",
    "CSS flexbox y grid",
    "selectores CSS y especificidad",
    "métodos de arrays como map, filter y reduce",
    "scope y hoisting en JavaScript",
    "this y arrow functions",
    "clases y programación orientada a objetos",
    "fetch API y peticiones HTTP"
];

// Variables globales para los contadores
let correctas = 0;
let incorrectas = 0;
let respuestaCorrecta = '';
let preguntaRespondida = false;

// Función para obtener pregunta de la API de Gemini
async function respuestaAPI() {
    // Seleccionar tema aleatorio
    const temaAleatorio = temas[Math.floor(Math.random() * temas.length)];
    
    // Crear el prompt
    const prompt = `En el contexto de JavaScript, CSS y HTML. Genera una pregunta de opción múltiple sobre el siguiente tema: ${temaAleatorio}. 

Proporciona cuatro opciones de respuesta y señala cuál es la correcta.

IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional.

El formato debe ser exactamente así:
{
  "question": "¿Cuál de los siguientes métodos agrega un elemento al final de un arreglo en JavaScript?",
  "options": [
    "a) shift()",
    "b) pop()",
    "c) push()",
    "d) unshift()"
  ],
  "correct_answer": "c) push()",
  "explanation": "El método push() agrega uno o más elementos al final de un arreglo y devuelve la nueva longitud del arreglo."
}`;

    // URL de la API de Gemini
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.25
                }
            })
        });

        // Manejo de errores de HTTP
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error HTTP ${response.status}: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log("Respuesta de Gemini:", data);

        // Extracción del texto de la respuesta
        const textResult = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResult) {
            console.log("No se pudo extraer el texto de la respuesta.");
            return null;
        }

        // Limpiar el texto y extraer el JSON
        let textResultTrimmed = textResult.trim();
        
        // Remover bloques de código markdown si existen
        textResultTrimmed = textResultTrimmed.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        
        const firstBraceIndex = textResultTrimmed.indexOf('{');
        const lastBraceIndex = textResultTrimmed.lastIndexOf('}');
        
        if (firstBraceIndex === -1 || lastBraceIndex === -1) {
            console.log("No se encontró un objeto JSON válido en la respuesta.");
            return null;
        }
        
        const jsonString = textResultTrimmed.substring(firstBraceIndex, lastBraceIndex + 1);

        const questionData = JSON.parse(jsonString);
        console.log("Pregunta generada:", questionData);
        return questionData;

    } catch (error) {
        console.error("Hubo un error en la petición:", error);
        document.getElementById('question').innerHTML = '❌ Error al cargar la pregunta. Por favor, verifica tu clave API o revisa la consola.';
        document.getElementById('question').classList.remove('text-warning');
        document.getElementById('question').style.color = '#ef476f';
        return null;
    }
}

// Función para desplegar los contadores
function desplegarContadores() {
    document.getElementById('correctas').textContent = correctas;
    document.getElementById('incorrectas').textContent = incorrectas;
    
    // Animación de actualización
    animarContador('correctas');
    animarContador('incorrectas');
}

// Función para animar contadores
function animarContador(id) {
    const elemento = document.getElementById(id);
    elemento.style.transform = 'scale(1.3)';
    setTimeout(() => {
        elemento.style.transform = 'scale(1)';
    }, 300);
}

// Función para cargar contadores desde localStorage
function cargarContadores() {
    const correctasGuardadas = localStorage.getItem('correctas');
    const incorrectasGuardadas = localStorage.getItem('incorrectas');
    
    if (correctasGuardadas !== null) {
        correctas = parseInt(correctasGuardadas);
    }
    if (incorrectasGuardadas !== null) {
        incorrectas = parseInt(incorrectasGuardadas);
    }
    
    desplegarContadores();
}

// Función para guardar contadores en localStorage
function guardarContadores() {
    localStorage.setItem('correctas', correctas);
    localStorage.setItem('incorrectas', incorrectas);
}

// Función para resetear contadores
function resetearContadores() {
    if (confirm('¿Estás seguro de que quieres reiniciar los contadores?')) {
        correctas = 0;
        incorrectas = 0;
        localStorage.removeItem('correctas');
        localStorage.removeItem('incorrectas');
        desplegarContadores();
        
        // Mostrar mensaje de confirmación
        const feedbackArea = document.getElementById('feedback-area');
        feedbackArea.innerHTML = `
            <div class="alert alert-info" role="alert">
                ✨ Contadores reiniciados correctamente. ¡Comienza de nuevo!
            </div>
        `;
        
        setTimeout(() => {
            feedbackArea.innerHTML = '';
        }, 3000);
    }
}

// Función para desplegar la pregunta y opciones
function desplegarPregunta(datosPregunta) {
    // Resetear estado
    preguntaRespondida = false;
    
    // Mostrar la pregunta
    const questionElement = document.getElementById('question');
    questionElement.className = 'question-text';
    questionElement.innerHTML = datosPregunta.question;
    
    // Guardar la respuesta correcta
    respuestaCorrecta = datosPregunta.correct_answer;
    
    // Crear los botones de opciones
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    datosPregunta.options.forEach((opcion, index) => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary';
        button.textContent = opcion;
        button.onclick = () => verificarRespuesta(opcion, datosPregunta.explanation, button);
        
        // Agregar animación escalonada
        button.style.animation = `fadeInUp 0.4s ease-out ${index * 0.1}s both`;
        
        optionsContainer.appendChild(button);
    });
}

// Función para verificar la respuesta seleccionada
function verificarRespuesta(opcionSeleccionada, explicacion, botonSeleccionado) {
    // Si ya se respondió, no hacer nada
    if (preguntaRespondida) return;
    
    preguntaRespondida = true;
    
    // Obtener todos los botones
    const botones = document.querySelectorAll('#options button');
    
    // Verificar si la respuesta es correcta
    if (opcionSeleccionada === respuestaCorrecta) {
        correctas++;
        botonSeleccionado.className = 'btn btn-success';
        
        // Mostrar mensaje de éxito
        mostrarMensaje('🎉 ¡Correcto! ' + explicacion, 'success');
    } else {
        incorrectas++;
        botonSeleccionado.className = 'btn btn-danger';
        
        // Resaltar la respuesta correcta
        botones.forEach(boton => {
            if (boton.textContent === respuestaCorrecta) {
                boton.className = 'btn btn-success';
            }
        });
        
        // Mostrar mensaje de error
        mostrarMensaje('❌ Incorrecto. ' + explicacion, 'danger');
    }
    
    // Deshabilitar todos los botones
    botones.forEach(boton => {
        boton.disabled = true;
    });
    
    // Actualizar contadores
    desplegarContadores();
    guardarContadores();
    
    // Botón para siguiente pregunta
    crearBotonSiguiente();
}

// Función para mostrar mensaje de feedback
function mostrarMensaje(texto, tipo) {
    const feedbackArea = document.getElementById('feedback-area');
    
    feedbackArea.innerHTML = `
        <div class="alert alert-${tipo}" role="alert">
            ${texto}
        </div>
    `;
}

// Función para crear botón de siguiente pregunta
function crearBotonSiguiente() {
    const nextButtonArea = document.getElementById('next-button-area');
    
    nextButtonArea.innerHTML = `
        <button class="btn btn-primary" onclick="cargarPregunta()">
            ➡️ Siguiente Pregunta
        </button>
    `;
}

// Función para cargar pregunta
async function cargarPregunta() {
    // Limpiar áreas de feedback y botón
    document.getElementById('feedback-area').innerHTML = '';
    document.getElementById('next-button-area').innerHTML = '';
    
    // Mostrar mensaje de carga
    const questionElement = document.getElementById('question');
    questionElement.className = 'question-text text-warning';
    questionElement.innerHTML = '<span class="loading-spinner"></span> Cargando pregunta de Gemini...';
    document.getElementById('options').innerHTML = '';

    const datosPregunta = await respuestaAPI();
    console.log(datosPregunta);

    if (datosPregunta) {
        console.log("Datos de la pregunta recibidos:", datosPregunta);
        desplegarPregunta(datosPregunta);
    }
}

// Event listener para el botón de reset
document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', resetearContadores);
    }
});

// Cargar contadores y la primera pregunta al iniciar
window.onload = () => {
    console.log("Página cargada y función inicial ejecutada.");
    cargarContadores();
    cargarPregunta();    
};