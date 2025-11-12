// ===== SECCIÓN 1: CALCULADORA =====

// Funciones de lógica de operaciones
function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        return null;
    }
    return a / b;
}

// Función de validación para calculadora
function validarNumeros(num1, num2) {
    if (num1 === '' || num2 === '') {
        return { valido: false, mensaje: 'Por favor, complete ambos campos' };
    }
    if (isNaN(num1) || isNaN(num2)) {
        return { valido: false, mensaje: 'Debe ingresar números válidos' };
    }
    return { valido: true };
}

// Función de actualización de interfaz para calculadora
function mostrarResultadoCalc(resultado, operacion, color) {
    const resultadoDiv = document.getElementById('resultadoCalc');
    resultadoDiv.textContent = `Resultado de ${operacion}: ${resultado}`;
    resultadoDiv.style.color = color;
    resultadoDiv.style.display = 'block';
}

function mostrarErrorCalc(mensaje) {
    const resultadoDiv = document.getElementById('resultadoCalc');
    resultadoDiv.textContent = mensaje;
    resultadoDiv.style.color = '#e74c3c';
    resultadoDiv.style.display = 'block';
}

// Función principal para realizar operaciones
function realizarOperacion(operacion) {
    const num1Input = document.getElementById('num1').value;
    const num2Input = document.getElementById('num2').value;
    
    const validacion = validarNumeros(num1Input, num2Input);
    
    if (!validacion.valido) {
        mostrarErrorCalc(validacion.mensaje);
        return;
    }
    
    const num1 = parseFloat(num1Input);
    const num2 = parseFloat(num2Input);
    let resultado;
    let nombreOp;
    let color;
    
    switch(operacion) {
        case 'sumar':
            resultado = sumar(num1, num2);
            nombreOp = 'Suma';
            color = '#27ae60';
            break;
        case 'restar':
            resultado = restar(num1, num2);
            nombreOp = 'Resta';
            color = '#3498db';
            break;
        case 'multiplicar':
            resultado = multiplicar(num1, num2);
            nombreOp = 'Multiplicación';
            color = '#9b59b6';
            break;
        case 'dividir':
            if (num2 === 0) {
                mostrarErrorCalc('Error: No se puede dividir entre cero');
                return;
            }
            resultado = dividir(num1, num2);
            nombreOp = 'División';
            color = '#e67e22';
            break;
    }
    
    mostrarResultadoCalc(resultado.toFixed(2), nombreOp, color);
}

// ===== SECCIÓN 2: FORMULARIO DE REGISTRO =====

// Función de validación de campos
function validarNombre(nombre) {
    if (nombre.trim() === '') {
        return { valido: false, mensaje: 'El nombre no puede estar vacío' };
    }
    if (nombre.trim().length < 3) {
        return { valido: false, mensaje: 'El nombre debe tener al menos 3 caracteres' };
    }
    return { valido: true };
}

function validarCorreo(correo) {
    if (correo.trim() === '') {
        return { valido: false, mensaje: 'El correo no puede estar vacío' };
    }
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
        return { valido: false, mensaje: 'El formato del correo no es válido' };
    }
    return { valido: true };
}

function validarContrasena(contrasena) {
    if (contrasena === '') {
        return { valido: false, mensaje: 'La contraseña no puede estar vacía' };
    }
    if (contrasena.length < 6) {
        return { valido: false, mensaje: 'La contraseña debe tener al menos 6 caracteres' };
    }
    return { valido: true };
}

function validarFechaNacimiento(fecha) {
    if (fecha === '') {
        return { valido: false, mensaje: 'La fecha de nacimiento es obligatoria' };
    }
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    if (fechaSeleccionada > hoy) {
        return { valido: false, mensaje: 'La fecha de nacimiento no puede ser futura' };
    }
    return { valido: true };
}

// Función de actualización de interfaz para mensajes
function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById('mensajeRegistro');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = 'mensaje';
    
    if (tipo === 'exito') {
        mensajeDiv.classList.add('mensaje-exito');
    } else {
        mensajeDiv.classList.add('mensaje-error');
    }
    
    mensajeDiv.style.display = 'block';
}

// Función para actualizar contador de caracteres
function actualizarContador(inputId, contadorId, minimo) {
    const input = document.getElementById(inputId);
    const contador = document.getElementById(contadorId);
    const longitud = input.value.length;
    
    contador.textContent = `${longitud}/${minimo} caracteres`;
    
    if (longitud >= minimo) {
        contador.style.color = '#27ae60';
    } else {
        contador.style.color = '#e74c3c';
    }
}

// Función principal de validación del formulario
function validarFormulario(evento) {
    evento.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    
    const validacionNombre = validarNombre(nombre);
    if (!validacionNombre.valido) {
        mostrarMensaje(validacionNombre.mensaje, 'error');
        return;
    }
    
    const validacionCorreo = validarCorreo(correo);
    if (!validacionCorreo.valido) {
        mostrarMensaje(validacionCorreo.mensaje, 'error');
        return;
    }
    
    const validacionContrasena = validarContrasena(contrasena);
    if (!validacionContrasena.valido) {
        mostrarMensaje(validacionContrasena.mensaje, 'error');
        return;
    }
    
    const validacionFecha = validarFechaNacimiento(fechaNacimiento);
    if (!validacionFecha.valido) {
        mostrarMensaje(validacionFecha.mensaje, 'error');
        return;
    }
    
    mostrarMensaje('¡Registro exitoso! Todos los datos son válidos.', 'exito');
    
    // Limpiar formulario después de registro exitoso
    setTimeout(() => {
        document.getElementById('formRegistro').reset();
        document.getElementById('contadorNombre').textContent = '';
        document.getElementById('contadorContrasena').textContent = '';
    }, 2000);
}

// ===== SECCIÓN 3: CÁLCULO DE FECHAS =====

// Función de lógica para calcular diferencia
function calcularDiferenciaDias(fecha1, fecha2) {
    const f1 = new Date(fecha1);
    const f2 = new Date(fecha2);
    
    const diferenciaMilisegundos = Math.abs(f2 - f1);
    const diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    
    return diferenciaDias;
}

// Función de validación de fechas
function validarFechas(fecha1, fecha2) {
    if (fecha1 === '' || fecha2 === '') {
        return { valido: false, mensaje: 'Por favor, seleccione ambas fechas' };
    }
    return { valido: true };
}

// Función de actualización de interfaz para fechas
function mostrarResultadoFechas(dias, fecha1, fecha2) {
    const resultadoDiv = document.getElementById('resultadoFechas');
    const f1 = new Date(fecha1);
    const f2 = new Date(fecha2);
    
    resultadoDiv.innerHTML = `
        <p>La diferencia entre las fechas es:</p>
        <p class="resultado-grande">${dias} días</p>
        <p class="fecha-detalle">Desde: ${f1.toLocaleDateString('es-ES')}</p>
        <p class="fecha-detalle">Hasta: ${f2.toLocaleDateString('es-ES')}</p>
    `;
    resultadoDiv.style.display = 'block';
}

function mostrarErrorFechas(mensaje) {
    const resultadoDiv = document.getElementById('resultadoFechas');
    resultadoDiv.textContent = mensaje;
    resultadoDiv.style.color = '#e74c3c';
    resultadoDiv.style.display = 'block';
}

// Función principal para calcular fechas
function procesarCalculoFechas() {
    const fecha1 = document.getElementById('fecha1').value;
    const fecha2 = document.getElementById('fecha2').value;
    
    const validacion = validarFechas(fecha1, fecha2);
    
    if (!validacion.valido) {
        mostrarErrorFechas(validacion.mensaje);
        return;
    }
    
    const diferenciaDias = calcularDiferenciaDias(fecha1, fecha2);
    mostrarResultadoFechas(diferenciaDias, fecha1, fecha2);
}

// ===== EVENTOS =====

// Eventos de la calculadora
document.getElementById('btnSumar').addEventListener('click', () => realizarOperacion('sumar'));
document.getElementById('btnRestar').addEventListener('click', () => realizarOperacion('restar'));
document.getElementById('btnMultiplicar').addEventListener('click', () => realizarOperacion('multiplicar'));
document.getElementById('btnDividir').addEventListener('click', () => realizarOperacion('dividir'));

// Eventos del formulario
document.getElementById('formRegistro').addEventListener('submit', validarFormulario);

// Contadores de caracteres
document.getElementById('nombre').addEventListener('input', () => {
    actualizarContador('nombre', 'contadorNombre', 3);
});

document.getElementById('contrasena').addEventListener('input', () => {
    actualizarContador('contrasena', 'contadorContrasena', 6);
});

// Bloquear fechas futuras en fecha de nacimiento
const fechaNacimientoInput = document.querySelector('#fechaNacimiento');
const hoy = new Date().toISOString().split('T')[0];
fechaNacimientoInput.setAttribute('max', hoy);

// Eventos del cálculo de fechas
document.getElementById('btnCalcularFechas').addEventListener('click', procesarCalculoFechas);