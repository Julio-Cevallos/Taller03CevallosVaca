/* ==== SECCION 1: CALCULADORA ====*/
function sumar(a,b){
    return a+b;
}

function restar(a,b){
    return a-b;
}

function multiplicar(a,b){
    return a*b;
}

function dividir(a,b){
    if(b === 0){
        return null;
    }
    return a/b;
}

//Funciones de validacion para la calculadora
function validarNumeros(num1, num2){
    if(num1 === '' || num2 === ''){
        return{valido: false, mensaje:'Por favor, complete ambos campos'};
    }
    if(isNaN(num1) || isNaN(num2)){
        return{valido: false, mensaje: 'Debe ingresar números nalidos'};
    }
    return {valido:true};
}

//Funciones de Actualizacion d einterfaz
function mostrarResultadoCalc(resultado, operacion, color){
    const resultadoDiv = document.getElementById('resultadoCalc');
    resultadoDiv.textContent = mensaje;
    resultadoDiv.style.color = color;
    resultadoDiv.style.display='block';
}

function mostrarErrorCalc(mensaje){
    const resultadoDiv=document.getElementById('resultadoCalc');
    resultadoDiv.textContent=mensaje;
    resultadoDiv.style.color='#e74c3c';
    resultadoDiv.style.display='block';
}

//Funcion principal para realizar operaicones
function realizarOperacion(operacion){
    const num1Input= document.getElementById('num1').value;
    const num2Input= document.getElementById('num2').value;

    const validacion=validarNumeros(num1Input, num2Input);

    if(!validacion.valido){
        mostrarErrorCalc(validacion.mensaje);
        return;
    }

    const num1 = parseFloat(num1Input);
    const num2 = parseFloat(num2Input);
    let resultado;
    let nombreOp;
    let color;

    switch(operacion){
        case 'suma':
            resultado = sumar(num1, num2);
            nombreOp='Suma';
            color='#27ae60';
            break;
        case 'resta':
            resultado = restar(num1, num2);
            nombreOp='Resta';
            color='#3498db';
            break;
        case 'multiplicar':
            resultado = multiplicar(num1, num2);
            nombreOp='Multiplicación';
            color='#9b59b6';
            break;
        case 'dividir':
            if(num2 === 0){
                mostrarErrorCalc('Error: No se puede dividr para 0');
                return;
            }
            resultado = dividir(num1, num2);
            nombreOp='División';
            color='#e67e22';
            break;
    }

    mostrarResultadoCalc(resultado.toFiexed(2), nombreOp, color);
}

/* ==== SECCION 1: CALCULADORA ====*/

function validarNombre(nombre){
    if(nombre.trin() === ''){
        return{valido:false, mensaje: 'El nombre no puede estar vacio'};
    }
    if(nombre.trin() < 3){
        return {valido:false, mensaje:'El nombre debe tener minimo 3 caracteres'};
    }
    return {valido: true};
}

function validarCorreo(correo){
    if(correo.trin() === ''){
        return {valido:false, mensaje: 'El correo no puede estar vacio'};
    }
    const formatoCorreo= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formatoCorreo.test(correo)){
        return{valido:false, mensaje:'El formato del correo no es valido'};
    }

    return {valido:true};
}

function validarContrasena(contrasena){
    if(contrasena === ''){
        return {valido:false, mensaje:'La contraseña no puede estar vacia'};
    }
    if(contrasena.length <6){
        return {valido:false, mesnaje:'La contraseña debe tener minimo 6 caracteres'};
    }
    return {valido:true};
}

function validarFechaNacimiento(fecha){
    if(fecha === ''){
        return {valido:false, mensaje:'La fecha de nacimiento no puede estar vacia'};
    }
    const fechaSeleccion=new Date(fecha);
    const hoy=new Date();
    if(fechaSeleccion > hoy){
        return{valido:false, mensaje:'Fecha de nacimiento invalida'};
    }
    return {valido:true};
}

//Funcion para actualizar la interfaz - mensaje
function mostrarMesnaje(mensaje, tipo){
    const mensajeDiv=document.getElementById('mensajeRegistro');
    mensajeDiv.textContent=mensaje;
    mensajeDiv.className='mensaje';

    if(tipo === 'exito'){
        mensajeDiv.classList.add('mensaje-exito');
    } else{
        mensajeDiv.classList.add('mensaje-error');
    }
    mensajeDiv.style.display='block';
}

//Funcion para actualizar contador de caracteres
function actualizarContador(inputId, contadorId, minimo){
    const input=document.getElementById(inputId);
    const contador=document.getElementById(contadortId);
    const longitud=input.value.length;

    comtador.textContent= '${longitud}/${minimo} caracteres';
    if(longitud>= minimo){
        contador.style.color='#27ae60';
    }else{
        contador.style.color='#e74c3c'
    }
}

//Funcion principal de validacion del Formulario
function validarFormulario(evento){
    evento.preventDefault();

    const nombre= document.getElementById('nombre').value;
    const correo= document.getElementById('correo').value;
    const contrasena= document.getElementById('contrasena').value;
    const fechaNacimiento= document.getElementById('fechaNacimiento').value;

    const validacionNombre= validarNombre(nombre);
    if(!validacionNombre.valido){
        mostrarMesnaje(validacionNombre.mensaje, 'error');
        return;
    }

    const validacionCorreo= validarCorreo(correo);
    if(!validacionCorreo.valido){
        mostrarMesnaje(validacionCorreo.mensaje, 'error');
        return;
    }

    const validacionContrasena= validarContrasena(contrasena);
    if(!validacionContrasena.valido){
        mostrarMesnaje(validacionContrasena.mensaje, 'error');
        return;
    }

    const validacionFecha= validarFechaNacimiento(fecha);
    if(!validacionFecha.valido){
        mostrarMesnaje(validacionFecha.mensaje, 'error');
        return;
    }

    mostrarMesnaje('¡Registro Exitoso! Todos los datos son validos');

    setTimeout(() => {
        document.getElementById('formRegistro').reset();
        document.getElementById('contadorNombre').textContent='';
        document.getElementById('contadorContrasena').textContent='';
    }, 2000);
}

/* ==== SECCION 3: Calculo Fechas ==== */
function calcularDiferenciaDias(fecha1, fecha2){
    const f1 =new Date(fecha1);
    const f2 =new Date(fecha2);

    const diferenciaMilisegundos=Math.abs(f2-f1);
    const diferenciaDias=Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    return diferenciaDias;
}

function validarFechas(fecha1, fecha2){
    if(fecha1 === '' || fecha2 === ''){
        return {valido:false, mensaje: 'Por favor, seleccione ambas fechas'};
    }
    return {valido:true};
}

function mostrarResultadoFechas(dias, fecha1, fecha2){
    const resultadoDiv= document.getElementById('resultadoFechas');
    const f1= new Date(fecha1); 
    const f2= new Date(fecha2); 

    resultadoDiv.innerHTML = '<p>La diferencia de fechas es:</p><p class="resultado-grande">${dias} dias</p><p class="fecha-detalle"> Desde: ${f1.toLocaleDateString(´es-Es´)}</p><p class="fecha-detalle"> Hasta: ${f2.toLocaleDateString(´es-Es´)}</p>';
    resultadoDiv.style.display='block'
}

function mostrarErrorFechas(mensaje){
    const resultadoDiv= document.getElementById('resultadoFechas');
    resultadoDiv.textContent=mensaje;
    resultadoDiv.style.color='#e74c3c';
    resultadoDiv.style.display= 'block';
}

function procesarCalculoFechas(){
    const fecha1 =document.getElementById('fecha1').value;
    const fecha2 =document.getElementById('fecha2').value;

    const validacion = validarFechas(fecha1, fecha2);
    if(!validacion.valido){
        mostrarErrorFechas(validacion.mensaje);
        return;
    }
    const diferenciasDias=calcularDiferenciaDias(fecha1, fecha2);
    mostrarResultadoFechas(diferenciasDias, fecha1, fecha2);
}

/* ==== EVENTOS ==== */
document.getElementById('btnSumar').addEventListener('click', () => realizarOperacion('suma'));
document.getElementById('btnRestar').addEventListener('click', () => realizarOperacion('resta'));
document.getElementById('btnMultiplicar').addEventListener('click', () => realizarOperacion('multiplicar'));
document.getElementById('btnDividir').addEventListener('click', () => realizarOperacion('dividir'));

document.getElementById('formRegistro').addEventListener('submit', validarFormulario);

document.getElementById('nombre').addEventListener('input', () =>{
    actualizarContador('nombre', 'contadorNombre', 3);
});

document.getElementById('contrasena').addEventListener('input', () =>{
    actualizarContador('contrasena', 'contadorContrasena', 6);
});

const fechaNacimientoInput= document.querySelector('#fechaNacimiento');
const hoy = new Date().toISOString.split('T')[0];
fechaNacimientoInput.setAttribute('max', hoy);
document.getElementById('btnCalcularFechas').addEventListener('click', procesarCalculoFechas);