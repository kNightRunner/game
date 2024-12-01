// Lista de preguntas y respuestas
const preguntas = [
    {
        pregunta: "¿Cómo se llama el ratón más famoso de Disney?",
        respuesta: "Mickey"
    },
    {
        pregunta: "¿Cuál es el nombre de la novia de Mickey?",
        respuesta: "Minnie"
    },
    {
        pregunta: "¿Cómo se llama el pato más famoso de Disney?",
        respuesta: "Donald"
    },
    {
        pregunta: "¿Cuál es el nombre del perro de Mickey?",
        respuesta: "Pluto"
    },
    {
        pregunta: "¿Cómo se llama el león protagonista de 'El Rey León'?",
        respuesta: "Simba"
    },
    {
        pregunta: "¿Cuál es el nombre de la sirenita en la película de Disney?",
        respuesta: "Ariel"
    },
    {
        pregunta: "¿Cómo se llama la princesa que pierde su zapato de cristal?",
        respuesta: "Cenicienta"
    },
    {
        pregunta: "¿Cuál es el nombre del elefante volador de Disney?",
        respuesta: "Dumbo"
    },
    {
        pregunta: "¿Cómo se llama el muñeco de madera que quería ser un niño de verdad?",
        respuesta: "Pinocho"
    },
    {
        pregunta: "¿Cuál es el nombre del hada que acompaña a Peter Pan?",
        respuesta: "Campanita"
    },
    {
        pregunta: "¿Cómo se llama el juguete vaquero en 'Toy Story'?",
        respuesta: "Woody"
    },
    {
        pregunta: "¿Cuál es el nombre del astronauta en 'Toy Story'?",
        respuesta: "Buzz"
    },
    {
        pregunta: "¿Cómo se llama la princesa que vive con siete enanitos?",
        respuesta: "Blancanieves"
    },
    {
        pregunta: "¿Cuál es el nombre del dragón en 'Mulan'?",
        respuesta: "Mushu"
    },
    {
        pregunta: "¿Cómo se llama el pez payaso en 'Buscando a Nemo'?",
        respuesta: "Nemo"
    },
    {
        pregunta: "¿Cómo se llama la mejor pelicua de viajes en el tiempo?",
        respuesta: "Volver al futuro"
    }
];

// Variables globales
let puntaje = 0;
let preguntaIndex = 0;
let intentos = 0;

// Cargar sonidos
const sonidoCorrecto = new Audio('ok.mp4');
const sonidoIncorrecto = new Audio('fail.mp4');

// Función para normalizar las cadenas eliminando tildes y convirtiendo a minúsculas
function normalizar(cadena) {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Función para obtener un color pastel aleatorio excepto verde y rojo
function obtenerColorAleatorio() {
    const colores = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E0BBE4'];
    return colores[Math.floor(Math.random() * colores.length)];
}

// Función para mostrar la pregunta
function mostrarPregunta() {
    if (preguntaIndex < preguntas.length) {
        document.body.style.backgroundColor = obtenerColorAleatorio(); // Cambiar el fondo a un color aleatorio
        document.getElementById('pregunta').innerText = preguntas[preguntaIndex].pregunta;
        document.getElementById('pregunta').style.color = 'violet'; // Resetear color de la pregunta
        document.querySelector('h1').style.color = 'violet'; // Resetear color del título
        document.querySelector('footer').style.color = 'violet'; // Resetear color de "by China"
        document.getElementById('enviar').style.display = 'inline-block'; // Mostrar el botón "Enviar"
        intentos = 0; // Resetear intentos
    } else {
        document.getElementById('pregunta').innerText = 'Juego terminado.';
        document.getElementById('puntaje').innerText = `Tu puntaje es: ${puntaje}/${preguntas.length}`;
        document.getElementById('respuesta').style.display = 'none';
        document.getElementById('resultado').style.display = 'none';
    }
}

// Función para enviar la respuesta
function enviarRespuesta() {
    const respuestaUsuario = document.getElementById('respuesta').value;
    document.getElementById('enviar').style.display = 'none'; // Ocultar el botón "Enviar"
    if (normalizar(respuestaUsuario).includes(normalizar(preguntas[preguntaIndex].respuesta))) {
        sonidoCorrecto.play(); // Reproducir sonido correcto
        document.getElementById('resultado').innerHTML = '¡CORRECTO! <img src="trophy.png" alt="Trofeo" style="vertical-align: middle;">';
        document.body.style.backgroundColor = 'lightgreen'; // Cambiar el fondo a verde pastel
        setTimeout(() => {
            document.getElementById('resultado').innerText = '';
            preguntaIndex++;
            document.getElementById('respuesta').value = '';
            mostrarPregunta();
        }, 3000);
        puntaje++;
    } else {
        sonidoIncorrecto.play(); // Reproducir sonido incorrecto
        intentos++;
        document.getElementById('respuesta').value = ''; // Borrar el contenido del campo de respuesta
        document.body.style.backgroundColor = 'lightcoral'; // Cambiar el fondo a rojo pastel
        document.getElementById('pregunta').style.color = 'white'; // Cambiar color de la pregunta a blanco
        document.querySelector('h1').style.color = 'white'; // Cambiar color del título a blanco
        document.querySelector('footer').style.color = 'white'; // Cambiar color de "by China" a blanco
        if (intentos < 3) {
            document.getElementById('resultado').innerText = '¡INCORRECTO!';
            setTimeout(() => {
                document.getElementById('resultado').innerText += '\nintenta de nuevo';
                setTimeout(() => {
                    document.getElementById('resultado').innerText = '';
                    document.getElementById('enviar').style.display = 'inline-block'; // Mostrar el botón "Enviar"
                }, 1000);
            }, 2000);
        } else {
            document.getElementById('resultado').innerText = `Incorrecto. La respuesta correcta es ${preguntas[preguntaIndex].respuesta}.`;
            setTimeout(() => {
                document.getElementById('resultado').innerText = '';
                preguntaIndex++;
                document.getElementById('respuesta').value = '';
                mostrarPregunta();
            }, 3000);
        }
    }
}

// Iniciar el juego
mostrarPregunta();
