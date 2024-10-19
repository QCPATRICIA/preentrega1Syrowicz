const turnos = []; // Array para almacenar los turnos asignados 

// Función para mostrar horarios
function mostrarHorarios(elemento, especialidad) {
    const horarios = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];
    const horariosContainer = elemento.nextElementSibling.nextElementSibling; // Obtenemos el contenedor de los horarios
    const selectHorarios = horariosContainer.querySelector('select');
    selectHorarios.innerHTML = ""; // Limpiar opciones previas
    
    // Rellenar el select con los horarios
    horarios.forEach(hora => {
        const option = document.createElement('option');
        option.value = hora;
        option.textContent = hora;
        selectHorarios.appendChild(option);
    });
    
    horariosContainer.style.display = 'block'; // Mostrar el contenedor de los horarios
}

// Función para confirmar el turno
function confirmarTurno(especialidad, nombreInputId, horarioSelectId) {
    const nombreInput = document.getElementById(nombreInputId); // Obtenemos el input de nombre específico de la especialidad
    const nombre = nombreInput.value;
    const selectHorario = document.getElementById(horarioSelectId); // Obtenemos el select de horarios específico de la especialidad
    const horaSeleccionada = selectHorario.value;
    const mensaje = document.getElementById('mensaje'); // Elemento de mensaje

    if (nombre && horaSeleccionada) {
        const turno = { nombre, especialidad, hora: horaSeleccionada };
        turnos.push(turno); // Guardar el turno en el array

        // Guardar en localStorage
        localStorage.setItem('turnos', JSON.stringify(turnos));

        // Mostrar el turno en el DOM
        mostrarTurnosEnDOM();

        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
            title: '¡Turno asignado!',
            text: `Turno asignado correctamente para ${nombre} en ${especialidad} a las ${horaSeleccionada}.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Resetear el formulario
        nombreInput.value = "";
        selectHorario.value = "";
    } else {
        // Mostrar mensaje de error si faltan datos
        mensaje.textContent = "Por favor, ingrese su nombre y seleccione un horario.";
        mensaje.classList.remove('exito');
        mensaje.classList.add('error');
    }
}


// Función para mostrar los turnos en el DOM
function mostrarTurnosEnDOM() {
    const listaTurnos = document.getElementById('lista-turnos');
    listaTurnos.innerHTML = ""; // Limpiar la lista

    turnos.forEach((turno, index) => {
        const li = document.createElement('li');
        li.textContent = `${turno.nombre} tiene un turno para ${turno.especialidad} a las ${turno.hora}.`;
        
        // Crear botón para borrar el turno
        const botonBorrar = document.createElement('button');
        botonBorrar.textContent = "Borrar";
        botonBorrar.style.marginLeft = '10px';
        botonBorrar.onclick = () => borrarTurno(index); // Asignar el índice del turno al botón
        
        li.appendChild(botonBorrar); // Añadir el botón al item de la lista
        listaTurnos.appendChild(li);
    });
}

// Función para borrar un turno
function borrarTurno(index) {
    // Eliminar el turno del array de turnos
    turnos.splice(index, 1);
    
    // Actualizar el localStorage
    localStorage.setItem('turnos', JSON.stringify(turnos));
    
    // Actualizar la lista en el DOM
    mostrarTurnosEnDOM();

    // Mostrar mensaje de éxito
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent = "Turno eliminado correctamente.";
    mensaje.classList.remove('error');
    mensaje.classList.add('exito');
}

// Función para agregar eventos a las especialidades
function agregarEventosEspecialidades() {
    const especialidades = document.querySelectorAll('.especialidad img');
    especialidades.forEach((img) => {
        const especialidad = img.parentElement.dataset.especialidad;
        img.addEventListener('click', () => {
            mostrarHorarios(img, especialidad);
        });
    });

    // Agregar eventos a los botones de confirmación
    const botonesConfirmar = document.querySelectorAll('.btn-confirmar');
    botonesConfirmar.forEach((boton) => {
        const especialidad = boton.dataset.especialidad;
        const nombreInputId = boton.dataset.nombre;
        const horarioSelectId = boton.dataset.horario;
        boton.addEventListener('click', () => {
            confirmarTurno(especialidad, nombreInputId, horarioSelectId);
        });
    });
}

// Recuperar los turnos del localStorage al cargar la página
window.onload = function() {
    const turnosGuardados = JSON.parse(localStorage.getItem('turnos'));
    if (turnosGuardados) {
        turnos.push(...turnosGuardados); // Cargar los turnos previos
        mostrarTurnosEnDOM(); // Mostrar los turnos en el DOM
    }

    // Agregar eventos a los elementos dinámicos
    agregarEventosEspecialidades();
};

// Función para obtener la hora de Uruguay
async function fetchCurrentTime() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/America/Montevideo');
        const data = await response.json();
        const dateTime = new Date(data.datetime);
        
        // Formatear la hora
        const options = { timeZone: 'America/Montevideo', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const timeString = dateTime.toLocaleTimeString('es-UY', options);
        
        document.getElementById('clock').innerText = `Hora de Uruguay: ${timeString}`;
    } catch (error) {
        console.error('Error al obtener la hora:', error);
        document.getElementById('clock').innerText = 'Error al cargar la hora';
    }
}

// Actualizar la hora cada minuto
setInterval(fetchCurrentTime, 60000);
fetchCurrentTime(); // Obtener la hora inmediatamente al cargar