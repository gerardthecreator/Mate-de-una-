// dibujos.js: Contiene toda la lógica para dibujar en el canvas, incluyendo el plano cartesiano, puntos, líneas y triángulos.

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Rango del plano cartesiano (ajustable según los ejercicios)
const X_MIN = -10;
const X_MAX = 10;
const Y_MIN = -10;
const Y_MAX = 10;

// Variables para el escalado y offset del dibujo
let scaleX = 1;
let scaleY = 1;
let offsetX = 0;
let offsetY = 0;

// Función para transformar coordenadas cartesianas a coordenadas de pixel del canvas
function toCanvasX(x) {
    return offsetX + x * scaleX;
}

function toCanvasY(y) {
    // El eje Y del canvas va hacia abajo, por eso (Y_MAX - y)
    return offsetY - y * scaleY;
}

// Función para transformar coordenadas de pixel del canvas a cartesianas (si fuera necesario, no para este caso)
function toCartesianX(px) {
    return (px - offsetX) / scaleX;
}

function toCartesianY(py) {
    return (offsetY - py) / scaleY;
}

// Función para redimensionar el canvas y recalcular el escalado
function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Calcular el escalado y el offset
    scaleX = canvas.width / (X_MAX - X_MIN);
    scaleY = canvas.height / (Y_MAX - Y_MIN);

    // Ajustar el escalado para que sea uniforme (misma proporción en X y Y)
    // Esto previene la distorsión de figuras como círculos
    const minScale = Math.min(scaleX, scaleY);
    scaleX = minScale;
    scaleY = minScale;

    // Recalcular offsets para centrar el origen (0,0)
    offsetX = -X_MIN * scaleX;
    offsetY = Y_MAX * scaleY; // Y_MAX * scaleY porque el origen Y del canvas está en la esquina superior izquierda

    // Volver a dibujar el contenido actual después de redimensionar
    if (window.drawCurrentStep && typeof window.drawCurrentStep === 'function') {
        // drawCurrentStep es una función global definida en script.js que llama a drawCanvas
        // Necesitamos llamarla sin datos específicos aquí, para que ella tome los datos del paso actual.
        window.drawCurrentStep();
    }
}

// Escuchar el evento de redimensionamiento de la ventana
window.addEventListener('resize', resizeCanvas);

// Inicializar el canvas al cargar la página
document.addEventListener('DOMContentLoaded', resizeCanvas);


// Función para dibujar el plano cartesiano (ejes, rejilla, etiquetas)
function drawCartesianPlane() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Estilo de la rejilla
    ctx.strokeStyle = '#e0e0e0'; // Color de la rejilla
    ctx.lineWidth = 0.5;

    // Dibujar rejilla vertical
    for (let x = Math.floor(X_MIN); x <= Math.ceil(X_MAX); x++) {
        const px = toCanvasX(x);
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, canvas.height);
        ctx.stroke();
    }

    // Dibujar rejilla horizontal
    for (let y = Math.floor(Y_MIN); y <= Math.ceil(Y_MAX); y++) {
        const py = toCanvasY(y);
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(canvas.width, py);
        ctx.stroke();
    }

    // Estilo de los ejes
    ctx.strokeStyle = '#333'; // Color de los ejes
    ctx.lineWidth = 1.5;

    // Dibujar eje X
    ctx.beginPath();
    ctx.moveTo(0, toCanvasY(0));
    ctx.lineTo(canvas.width, toCanvasY(0));
    ctx.stroke();

    // Dibujar eje Y
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), 0);
    ctx.lineTo(toCanvasX(0), canvas.height);
    ctx.stroke();

    // Dibujar flechas en los extremos de los ejes
    const arrowSize = 8;
    // Eje X (derecha)
    ctx.beginPath();
    ctx.moveTo(canvas.width - arrowSize, toCanvasY(0) - arrowSize / 2);
    ctx.lineTo(canvas.width, toCanvasY(0));
    ctx.lineTo(canvas.width - arrowSize, toCanvasY(0) + arrowSize / 2);
    ctx.fill();
    // Eje X (izquierda)
    ctx.beginPath();
    ctx.moveTo(arrowSize, toCanvasY(0) - arrowSize / 2);
    ctx.lineTo(0, toCanvasY(0));
    ctx.lineTo(arrowSize, toCanvasY(0) + arrowSize / 2);
    ctx.fill();
    // Eje Y (arriba)
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0) - arrowSize / 2, arrowSize);
    ctx.lineTo(toCanvasX(0), 0);
    ctx.lineTo(toCanvasX(0) + arrowSize / 2, arrowSize);
    ctx.fill();
    // Eje Y (abajo)
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0) - arrowSize / 2, canvas.height - arrowSize);
    ctx.lineTo(toCanvasX(0), canvas.height);
    ctx.lineTo(toCanvasX(0) + arrowSize / 2, canvas.height - arrowSize);
    ctx.fill();


    // Etiquetas de los ejes
    ctx.fillStyle = '#333';
    ctx.font = '12px Inter';
    ctx.fillText('X', canvas.width - 20, toCanvasY(0) + 20);
    ctx.fillText('Y', toCanvasX(0) - 20, 20);
    ctx.fillText('0', toCanvasX(0) - 15, toCanvasY(0) + 15); // Origen

    // Etiquetas de los números en los ejes
    ctx.font = '10px Inter';
    for (let x = Math.floor(X_MIN); x <= Math.ceil(X_MAX); x++) {
        if (x !== 0 && x % 1 === 0) { // Mostrar enteros
            ctx.fillText(x.toString(), toCanvasX(x) - (x.toString().length * 3), toCanvasY(0) + 15);
        }
    }
    for (let y = Math.floor(Y_MIN); y <= Math.ceil(Y_MAX); y++) {
        if (y !== 0 && y % 1 === 0) { // Mostrar enteros
            ctx.fillText(y.toString(), toCanvasX(0) - 20, toCanvasY(y) + 3);
        }
    }
}

// Función para dibujar un punto
function drawPoint(x, y, label, color = 'red') {
    const px = toCanvasX(x);
    const py = toCanvasY(y);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2); // Círculo de 5px de radio
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.font = '12px Inter';
    ctx.fillText(label, px + 8, py - 8); // Etiqueta del punto
}

// Función para dibujar una línea (dada por y = mx + b)
function drawLine(m, b, color = 'red', label = null) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    // Calcular puntos en los bordes del canvas
    // Usamos un rango extendido para asegurar que la línea cruza todo el canvas visible
    const y1 = m * X_MIN + b;
    const y2 = m * X_MAX + b;

    ctx.moveTo(toCanvasX(X_MIN), toCanvasY(y1));
    ctx.lineTo(toCanvasX(X_MAX), toCanvasY(y2));
    ctx.stroke();

    // Dibujar etiqueta de la línea si se proporciona
    if (label) {
        ctx.fillStyle = color;
        ctx.font = '14px Inter'; // Fuente ligeramente más grande para la etiqueta de línea
        // Posicionar la etiqueta cerca de la línea, ajustando un poco para visibilidad
        const labelX = toCanvasX(label.x);
        const labelY = toCanvasY(label.y);
        ctx.fillText(label.text, labelX + 10, labelY - 10);
    }
}

// Función para dibujar un triángulo (dado por sus vértices)
function drawTriangle(vertices, color = 'rgba(255, 165, 0, 0.4)') { // Naranja semitransparente
    if (vertices.length < 3) return;

    ctx.fillStyle = color;
    ctx.strokeStyle = 'orange'; // Borde del triángulo
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(toCanvasX(vertices[0].x), toCanvasY(vertices[0].y));
    for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(toCanvasX(vertices[i].x), toCanvasY(vertices[i].y));
    }
    ctx.closePath(); // Cierra la figura
    ctx.fill();
    ctx.stroke();
}


// Función principal para dibujar el contenido de un paso dado su 'drawingData'
window.drawCanvas = function(drawingData) {
    drawCartesianPlane(); // Siempre dibujar el plano primero

    // Dibujar puntos
    if (drawingData.points) {
        drawingData.points.forEach(point => {
            drawPoint(point.x, point.y, point.label, point.color);
        });
    }

    // Dibujar líneas
    if (drawingData.lines) {
        drawingData.lines.forEach(line => {
            // Asume que la línea está en formato {m: pendiente, b: ordenada_origen}
            drawLine(line.m, line.b, line.color);
        });
    }

    // Dibujar etiquetas de línea (separado para asegurar que estén por encima de las líneas)
    if (drawingData.lineLabels) {
        drawingData.lineLabels.forEach(label => {
            ctx.fillStyle = label.color;
            ctx.font = '14px Inter';
            // MathJax no funciona directamente en canvas.fillText.
            // Para mostrar LaTeX en canvas, tendríamos que renderizarlo a SVG o imagen,
            // o simplificar las etiquetas a texto plano.
            // Por simplicidad, aquí usaremos texto plano, o simplemente dejaremos que la
            // explicación textual en el HTML con MathJax maneje la simbología completa.
            // Para fines de esta demo, asumiré que las etiquetas son texto simple
            // o que MathJax en el HTML es suficiente.
            // Si necesitamos LaTeX en Canvas, se vuelve más complejo (ej. renderizar a SVG y luego a imagen de canvas)
            // Por ahora, solo dibujo el texto.
            const px = toCanvasX(label.x);
            const py = toCanvasY(label.y);
            ctx.fillText(label.text.replace(/(\$|\\)/g, ''), px + 10, py - 10); // Quita símbolos MathJax
        });
    }


    // Dibujar triángulo
    if (drawingData.triangle) {
        drawTriangle(drawingData.triangle);
    }

    // Mostrar el área si está disponible
    if (drawingData.area) {
        ctx.fillStyle = '#333';
        ctx.font = '16px Inter';
        ctx.fillText(`Área = ${drawingData.area.replace(/(\$|\\)/g, '')}`, toCanvasX(X_MIN) + 20, toCanvasY(Y_MAX) - 20);
    }
}

// Hacer que resizeCanvas sea global para que script.js pueda llamarla
window.resizeCanvas = resizeCanvas;

