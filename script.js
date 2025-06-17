// script.js: Lógica principal para la navegación de ejercicios y pasos, y actualización del contenido.

// Variables globales para rastrear el ejercicio y el paso actuales
let currentExerciseIndex = 0;
let currentStepIndex = 0;

// Referencias a elementos del DOM
const exerciseTitleElem = document.getElementById('exerciseTitle');
const exerciseProblemElem = document.getElementById('exerciseProblem');
const stepContentElem = document.getElementById('stepContent');
const exerciseCounterElem = document.getElementById('exerciseCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Estructura de datos para los primeros 5 ejercicios (los originales)
const originalExercises = [
    // Ejercicio 1: Ecuación de la recta a partir de dos puntos y sus intersecciones
    {
        title: "Ejercicio 1: Recta por Dos Puntos e Intersecciones",
        problem: "Dada la recta $L_1$ que pasa por los puntos $P_1(1, 2)$ y $P_2(5, 4)$.",
        steps: [
            {
                text: `<h4>Paso 1: Entendiendo el Plano Cartesiano y los Puntos</h4>
                       <p>El <strong>plano cartesiano</strong> es un sistema de coordenadas que nos permite ubicar puntos en un espacio bidimensional. Está formado por dos ejes perpendiculares:</p>
                       <ul>
                           <li>El <strong>eje X (horizontal)</strong>, también llamado eje de las abscisas.</li>
                           <li>El <strong>eje Y (vertical)</strong>, también llamado eje de las ordenadas.</li>
                       </ul>
                       <p>Un <strong>punto</strong> se representa como $(x, y)$, donde $x$ es su posición en el eje X e $y$ es su posición en el eje Y.</p>
                       <p>Para este ejercicio, tenemos dos puntos:</p>
                       <ul>
                           <li><strong>Punto 1 ($P_1$):</strong> $(1, 2)$. Esto significa que avanzamos 1 unidad en el eje X y 2 unidades en el eje Y.</li>
                           <li><strong>Punto 2 ($P_2$):</strong> $(5, 4)$. Esto significa que avanzamos 5 unidades en el eje X y 4 unidades en el eje Y.</li>
                       </ul>
                       <p>En el gráfico, verás estos dos puntos marcados.</p>`,
                drawingData: {
                    points: [{x: 1, y: 2, label: 'P1 (1,2)', color: 'red'}, {x: 5, y: 4, label: 'P2 (5,4)', color: 'blue'}],
                    lines: [],
                    triangle: null,
                    lineLabels: []
                }
            },
            {
                text: `<h4>Paso 2: Calculando la Pendiente ($m$) de la Recta</h4>
                       <p>La <strong>pendiente ($m$)</strong> es una medida de la inclinación de la recta. Nos dice cuánto sube o baja la recta por cada unidad que avanza horizontalmente. Se calcula con la fórmula:</p>
                       <p>$$m = \\frac{y_2 - y_1}{x_2 - x_1}$$</p>
                       <p>Usando nuestros puntos $P_1(1, 2)$ y $P_2(5, 4)$:</p>
                       <ul>
                           <li>$x_1 = 1, y_1 = 2$</li>
                           <li>$x_2 = 5, y_2 = 4$</li>
                       </ul>
                       <p>Sustituyendo los valores:</p>
                       <p>$$m = \\frac{4 - 2}{5 - 1} = \\frac{2}{4} = \\frac{1}{2}$$</p>
                       <p>La pendiente de la recta $L_1$ es $1/2$. Esto significa que por cada 2 unidades que avanza en X, la recta sube 1 unidad en Y.</p>`,
                drawingData: {
                    points: [{x: 1, y: 2, label: 'P1 (1,2)', color: 'red'}, {x: 5, y: 4, label: 'P2 (5,4)', color: 'blue'}],
                    lines: [],
                    triangle: null,
                    lineLabels: []
                }
            },
            {
                text: `<h4>Paso 3: Formando la Ecuación Punto-Pendiente</h4>
                       <p>Una vez que tenemos la pendiente y un punto por donde pasa la recta, podemos usar la <strong>forma punto-pendiente</strong> de la ecuación de la recta:</p>
                       <p>$$y - y_1 = m(x - x_1)$$</p>
                       <p>Podemos usar cualquiera de los dos puntos. Elegiremos $P_1(1, 2)$ y la pendiente $m = 1/2$:</p>
                       <p>$$y - 2 = \\frac{1}{2}(x - 1)$$</p>
                       <p>Esta es una forma válida de la ecuación de la recta $L_1$.</p>`,
                drawingData: {
                    points: [{x: 1, y: 2, label: 'P1 (1,2)', color: 'red'}, {x: 5, y: 4, label: 'P2 (5,4)', color: 'blue'}],
                    lines: [],
                    triangle: null,
                    lineLabels: []
                }
            },
            {
                text: `<h4>Paso 4: Simplificando a la Forma Pendiente-Ordenada al Origen ($y = mx + b$)</h4>
                       <p>La forma más común de la ecuación de una recta es la <strong>pendiente-ordenada al origen</strong> ($y = mx + b$), donde $b$ es el punto donde la recta corta el eje Y.</p>
                       <p>Vamos a despejar $y$ de nuestra ecuación punto-pendiente:</p>
                       <p>$$y - 2 = \\frac{1}{2}(x - 1)$$</p>
                       <p>$$y - 2 = \\frac{1}{2}x - \\frac{1}{2}$$</p>
                       <p>$$y = \\frac{1}{2}x - \\frac{1}{2} + 2$$</p>
                       <p>$$y = \\frac{1}{2}x + \\frac{3}{2}$$</p>
                       <p>Así, la ecuación de la recta $L_1$ es $y = \frac{1}{2}x + \frac{3}{2}$. Ahora puedes ver la recta dibujada en el gráfico.</p>`,
                drawingData: {
                    points: [{x: 1, y: 2, label: 'P1 (1,2)', color: 'red'}, {x: 5, y: 4, label: 'P2 (5,4)', color: 'blue'}],
                    lines: [{m: 0.5, b: 1.5, color: '#4A90E2'}], // y = 0.5x + 1.5
                    triangle: null,
                    lineLabels: [{x: 5, y: 0.5*5 + 1.5, text: '$L_1: y = \\frac{1}{2}x + \\frac{3}{2}$', color: '#4A90E2'}]
                }
            },
            {
                text: `<h4>Paso 5: Encontrando el Punto de Corte con el Eje Y</h4>
                       <p>El <strong>punto de corte con el eje Y</strong> es donde la recta cruza la línea vertical del eje Y. En este punto, la coordenada $x$ siempre es $0$.</p>
                       <p>Sustituimos $x = 0$ en la ecuación de $L_1$ ($y = \frac{1}{2}x + \frac{3}{2}$):</p>
                       <p>$$y = \\frac{1}{2}(0) + \\frac{3}{2}$$</p>
                       <p>$$y = \\frac{3}{2}$$</p>
                       <p>Así, el punto de corte con el eje Y es $(0, \frac{3}{2})$ o $(0, 1.5)$.</p>`,
                drawingData: {
                    points: [{x: 1, y: 2, label: 'P1 (1,2)', color: 'red'}, {x: 5, y: 4, label: 'P2 (5,4)', color: 'blue'}, {x: 0, y: 1.5, label: 'Corte Y (0, 1.5)', color: 'green'}],
                    lines: [{m: 0.5, b: 1.5, color: '#4A90E2'}],
                    triangle: null,
                    lineLabels: [{x: 5, y: 0.5*5 + 1.5, text: '$L_1: y = \\frac{1}{2}x + \\frac{3}{2}$', color: '#4A90E2'}]
                }
            },
            {
                text: `<h4>Paso 6: Encontrando el Punto de Corte con el Eje X</h4>
                       <p>El <strong>punto de corte con el eje X</strong> es donde la recta cruza la línea horizontal del eje X. En este punto, la coordenada $y$ siempre es $0$.</p>
                       <p>Sustituimos $y = 0$ en la ecuación de $L_1$ ($y = \frac{1}{2}x + \frac{3}{2}$):</p>
                       <p>$$0 = \\frac{1}{2}x + \\frac{3}{2}$$</p>
                       <p>Para despejar $x$:</p>
                       <p>$$-\\frac{3}{2} = \\frac{1}{2}x$$</p>
                       <p>Multiplicamos ambos lados por 2:</p>
                       <p>$$-3 = x$$</p>
                       <p>Así, el punto de corte con el eje X es $(-3, 0)$.</p>
                       <p>Ahora, en el gráfico, puedes ver la recta $L_1$ junto con sus dos puntos de corte con los ejes, marcados claramente.</p>`,
                drawingData: {
                    points: [{x: 1, y: 2, label: 'P1 (1,2)', color: 'red'}, {x: 5, y: 4, label: 'P2 (5,4)', color: 'blue'}, {x: 0, y: 1.5, label: 'Corte Y (0, 1.5)', color: 'green'}, {x: -3, y: 0, label: 'Corte X (-3, 0)', color: 'purple'}],
                    lines: [{m: 0.5, b: 1.5, color: '#4A90E2'}],
                    triangle: null,
                    lineLabels: [{x: 5, y: 0.5*5 + 1.5, text: '$L_1: y = \\frac{1}{2}x + \\frac{3}{2}$', color: '#4A90E2'}]
                }
            }
        ]
    },

    // Ejercicio 2: Ecuación de la recta a partir de un punto y un ángulo
    {
        title: "Ejercicio 2: Recta por Punto y Ángulo",
        problem: "Dada la recta $L_2$ que pasa por el punto $P_3(-2, 3)$ y forma un ángulo de $135^\circ$ con el eje X positivo.",
        steps: [
            {
                text: `<h4>Paso 1: Ubicando el Punto y Entendiendo el Ángulo</h4>
                       <p>Tenemos un punto $P_3(-2, 3)$, lo que significa -2 unidades en X y 3 unidades en Y.</p>
                       <p>El <strong>ángulo ($\theta$)</strong> que una recta forma con el eje X positivo se mide en sentido antihorario desde la parte positiva del eje X. Un ángulo de $135^\circ$ indica que la recta es decreciente (va "hacia abajo" de izquierda a derecha), ya que es mayor que $90^\circ$ pero menor que $180^\circ$.</p>
                       <p>En el gráfico, verás el punto $P_3$ marcado.</p>`,
                drawingData: {
                    points: [{x: -2, y: 3, label: 'P3 (-2,3)', color: 'red'}],
                    lines: [],
                    triangle: null,
                    lineLabels: []
                }
            },
            {
                text: `<h4>Paso 2: Calculando la Pendiente ($m$) a partir del Ángulo</h4>
                       <p>La pendiente ($m$) de una recta está directamente relacionada con el ángulo ($\theta$) que forma con el eje X positivo mediante la función tangente:</p>
                       <p>$$m = \\tan(\\theta)$$</p>
                       <p>Para nuestro caso, $\theta = 135^\circ$:</p>
                       <p>$$m = \\tan(135^\\circ)$$</p>
                       <p>Recordando los valores de la tangente para ángulos especiales o usando una calculadora, sabemos que:</p>
                       <p>$$m = -1$$</p>
                       <p>La pendiente de la recta $L_2$ es $-1$. Esto confirma que la recta es decreciente.</p>`,
                drawingData: {
                    points: [{x: -2, y: 3, label: 'P3 (-2,3)', color: 'red'}],
                    lines: [],
                    triangle: null,
                    lineLabels: []
                }
            },
            {
                text: `<h4>Paso 3: Formando la Ecuación Punto-Pendiente</h4>
                       <p>Con el punto $P_3(-2, 3)$ y la pendiente $m = -1$, usamos la forma punto-pendiente:</p>
                       <p>$$y - y_1 = m(x - x_1)$$</p>
                       <p>Sustituyendo los valores:</p>
                       <p>$$y - 3 = -1(x - (-2))$$</p>
                       <p>$$y - 3 = -1(x + 2)$$</p>
                       <p>$$y - 3 = -x - 2$$</p>
                       <p>Esta es la ecuación de la recta $L_2$ en forma punto-pendiente.</p>`,
                drawingData: {
                    points: [{x: -2, y: 3, label: 'P3 (-2,3)', color: 'red'}],
                    lines: [],
                    triangle: null,
                    lineLabels: []
                }
            },
            {
                text: `<h4>Paso 4: Simplificando a la Forma Pendiente-Ordenada al Origen ($y = mx + b$)</h4>
                       <p>Despejamos $y$ para obtener la forma $y = mx + b$:</p>
                       <p>$$y - 3 = -x - 2$$</p>
                       <p>$$y = -x - 2 + 3$$</p>
                       <p>$$y = -x + 1$$</p>
                       <p>La ecuación de la recta $L_2$ es $y = -x + 1$. Observa cómo la recta se dibuja en el gráfico, pasando por $P_3$ y con la inclinación correcta.</p>`,
                drawingData: {
                    points: [{x: -2, y: 3, label: 'P3 (-2,3)', color: 'red'}],
                    lines: [{m: -1, b: 1, color: '#6a67ce'}], // y = -x + 1
                    triangle: null,
                    lineLabels: [{x: -2, y: -1*(-2)+1, text: '$L_2: y = -x + 1$', color: '#6a67ce'}]
                }
            },
            {
                text: `<h4>Paso 5: Encontrando el Punto de Corte con el Eje Y</h4>
                       <p>Para encontrar el punto de corte con el eje Y, hacemos $x = 0$ en la ecuación $y = -x + 1$:</p>
                       <p>$$y = -(0) + 1$$</p>
                       <p>$$y = 1$$</p>
                       <p>El punto de corte con el eje Y es $(0, 1)$.</p>`,
                drawingData: {
                    points: [{x: -2, y: 3, label: 'P3 (-2,3)', color: 'red'}, {x: 0, y: 1, label: 'Corte Y (0,1)', color: 'green'}],
                    lines: [{m: -1, b: 1, color: '#6a67ce'}],
                    triangle: null,
                    lineLabels: [{x: -2, y: -1*(-2)+1, text: '$L_2: y = -x + 1$', color: '#6a67ce'}]
                }
            },
            {
                text: `<h4>Paso 6: Encontrando el Punto de Corte con el Eje X</h4>
                       <p>Para encontrar el punto de corte con el eje X, hacemos $y = 0$ en la ecuación $y = -x + 1$:</p>
                       <p>$$0 = -x + 1$$</p>
                       <p>Despejamos $x$:</p>
                       <p>$$x = 1$$</p>
                       <p>El punto de corte con el eje X es $(1, 0)$.</p>
                       <p>En el gráfico, verás la recta $L_2$ con sus puntos de corte con ambos ejes.</p>`,
                drawingData: {
                    points: [{x: -2, y: 3, label: 'P3 (-2,3)', color: 'red'}, {x: 0, y: 1, label: 'Corte Y (0,1)', color: 'green'}, {x: 1, y: 0, label: 'Corte X (1,0)', color: 'purple'}],
                    lines: [{m: -1, b: 1, color: '#6a67ce'}],
                    triangle: null,
                    lineLabels: [{x: -2, y: -1*(-2)+1, text: '$L_2: y = -x + 1$', color: '#6a67ce'}]
                }
            }
        ]
    },

    // Ejercicio 3: Cálculo de ecuaciones de tres rectas y área del triángulo
    {
        title: "Ejercicio 3: Triángulo Formado por Tres Rectas (Parte 1)",
        problem: "Calcula las ecuaciones de las siguientes tres rectas y el área del triángulo que forman:<br>" +
                 "1. $L_1$: Pasa por $A(1, 2)$ y $B(4, 5)$.<br>" +
                 "2. $L_2$: Pasa por $C(-2, 1)$ y es paralela a la recta $y = 2x - 3$.<br>" +
                 "3. $L_3$: Pasa por $D(5, -1)$ y es perpendicular a la recta $y = 0.5x + 2$.",
        steps: [
            {
                text: `<h4>Paso 1: Encontrando la Ecuación de $L_1$</h4>
                       <p>La recta $L_1$ pasa por $A(1, 2)$ y $B(4, 5)$.</p>
                       <p><strong>Calculamos la pendiente ($m_1$):</strong></p>
                       <p>$$m_1 = \\frac{5 - 2}{4 - 1} = \\frac{3}{3} = 1$$</p>
                       <p><strong>Usamos la forma punto-pendiente con $A(1, 2)$:</strong></p>
                       <p>$$y - 2 = 1(x - 1)$$</p>
                       <p>$$y = x - 1 + 2$$</p>
                       <p>$$L_1: y = x + 1$$</p>
                       <p>En el gráfico, verás los puntos A y B, y la recta $L_1$ dibujada.</p>`,
                drawingData: {
                    points: [{x: 1, y: 2, label: 'A (1,2)', color: 'red'}, {x: 4, y: 5, label: 'B (4,5)', color: 'blue'}],
                    lines: [{m: 1, b: 1, color: '#4A90E2'}],
                    triangle: null,
                    lineLabels: [{x: 3, y: 1*3+1, text: '$L_1: y = x + 1$', color: '#4A90E2'}]
                }
            },
            {
                text: `<h4>Paso 2: Encontrando la Ecuación de $L_2$</h4>
                       <p>La recta $L_2$ pasa por $C(-2, 1)$ y es <strong>paralela</strong> a la recta $y = 2x - 3$.</p>
                       <p><strong>Propiedad de rectas paralelas:</strong> Tienen la misma pendiente.</p>
                       <p>La pendiente de la recta $y = 2x - 3$ es $2$. Por lo tanto, $m_2 = 2$.</p>
                       <p><strong>Usamos la forma punto-pendiente con $C(-2, 1)$:</strong></p>
                       <p>$$y - 1 = 2(x - (-2))$$</p>
                       <p>$$y - 1 = 2(x + 2)$$</p>
                       <p>$$y - 1 = 2x + 4$$</p>
                       <p>$$L_2: y = 2x + 5$$</p>
                       <p>En el gráfico, se añade el punto C y la recta $L_2$.</p>`,
                drawingData: {
                    points: [{x: 1, y: 2, label: 'A', color: 'red'}, {x: 4, y: 5, label: 'B', color: 'blue'}, {x: -2, y: 1, label: 'C (-2,1)', color: 'green'}],
                    lines: [
                        {m: 1, b: 1, color: '#4A90E2'}, // L1
                        {m: 2, b: 5, color: '#FFC107'}  // L2
                    ],
                    triangle: null,
                    lineLabels: [
                        {x: 3, y: 1*3+1, text: '$L_1: y = x + 1$', color: '#4A90E2'},
                        {x: 0, y: 2*0+5, text: '$L_2: y = 2x + 5$', color: '#FFC107'}
                    ]
                }
            },
            {
                text: `<h4>Paso 3: Encontrando la Ecuación de $L_3$</h4>
                       <p>La recta $L_3$ pasa por $D(5, -1)$ y es <strong>perpendicular</strong> a la recta $y = 0.5x + 2$.</p>
                       <p><strong>Propiedad de rectas perpendiculares:</strong> El producto de sus pendientes es $-1$.</p>
                       <p>La pendiente de la recta $y = 0.5x + 2$ es $0.5$ (o $1/2$).</p>
                       <p>Así, $m_3 \\cdot 0.5 = -1 \\implies m_3 = -1 / 0.5 \\implies m_3 = -2$.</p>
                       <p><strong>Usamos la forma punto-pendiente con $D(5, -1)$:</strong></p>
                       <p>$$y - (-1) = -2(x - 5)$$</p>
                       <p>$$y + 1 = -2x + 10$$</p>
                       <p>$$y = -2x + 10 - 1$$</p>
                       <p>$$L_3: y = -2x + 9$$</p>
                       <p>Ahora, las tres rectas están dibujadas en el gráfico.</p>`,
                drawingData: {
                    points: [{x: 1, y: 2, label: 'A', color: 'red'}, {x: 4, y: 5, label: 'B', color: 'blue'}, {x: -2, y: 1, label: 'C', color: 'green'}, {x: 5, y: -1, label: 'D (5,-1)', color: 'purple'}],
                    lines: [
                        {m: 1, b: 1, color: '#4A90E2'},     // L1
                        {m: 2, b: 5, color: '#FFC107'},     // L2
                        {m: -2, b: 9, color: '#6a67ce'}     // L3
                    ],
                    triangle: null,
                    lineLabels: [
                        {x: 3, y: 1*3+1, text: '$L_1: y = x + 1$', color: '#4A90E2'},
                        {x: 0, y: 2*0+5, text: '$L_2: y = 2x + 5$', color: '#FFC107'},
                        {x: 6, y: -2*6+9, text: '$L_3: y = -2x + 9$', color: '#6a67ce'}
                    ]
                }
            },
            {
                text: `<h4>Paso 4: Encontrando el Vértice $V_1$ (Intersección de $L_1$ y $L_2$)</h4>
                       <p>Para encontrar dónde se cruzan $L_1: y = x + 1$ y $L_2: y = 2x + 5$, igualamos sus ecuaciones:</p>
                       <p>$$x + 1 = 2x + 5$$</p>
                       <p>Restamos $x$ de ambos lados:</p>
                       <p>$$1 = x + 5$$</p>
                       <p>Restamos $5$ de ambos lados:</p>
                       <p>$$x = -4$$</p>
                       <p>Ahora sustituimos $x = -4$ en la ecuación de $L_1$ (o $L_2$):</p>
                       <p>$$y = -4 + 1$$</p>
                       <p>$$y = -3$$</p>
                       <p>El primer vértice es $V_1(-4, -3)$.</p>
                       <p>En el gráfico, $V_1$ se marca.</p>`,
                drawingData: {
                    points: [
                        {x: 1, y: 2, label: 'A', color: 'red'}, {x: 4, y: 5, label: 'B', color: 'blue'},
                        {x: -2, y: 1, label: 'C', color: 'green'}, {x: 5, y: -1, label: 'D', co
