const turnos = []; // Array para almacenar los turnos asignados 

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
        
        // Mostrar mensaje de éxito
        mensaje.textContent = `¡Turno asignado correctamente para ${nombre} en ${especialidad} a las ${horaSeleccionada}!`;
        mensaje.classList.remove('error');
        mensaje.classList.add('exito');
        
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

// Recuperar los turnos del localStorage al cargar la página
window.onload = function() {
    const turnosGuardados = JSON.parse(localStorage.getItem('turnos'));
    if (turnosGuardados) {
        turnos.push(...turnosGuardados); // Cargar los turnos previos
        mostrarTurnosEnDOM(); // Mostrar los turnos en el DOM
    }
}