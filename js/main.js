const turnos = []; // Array para almacenar los turnos asignados

function mostrarHorarios(especialidad) {
    const horarios = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];
    let mensaje = `Seleccione un horario para ${especialidad}:\n`;
    
    horarios.forEach((hora, index) => {
        mensaje += `${index + 1}. ${hora}\n`;
    });
    
    let seleccion = prompt(mensaje);
    
    if (seleccion > 0 && seleccion <= horarios.length) {
        asignarTurno(especialidad, horarios[seleccion - 1]);
    } else {
        alert("Selección inválida. Por favor, intente de nuevo.");
    }
}

function asignarTurno(especialidad, hora) {
    const nombre = prompt("Ingrese su nombre:");
    if (nombre) {
        const turno = { nombre, especialidad, hora };
        turnos.push(turno); // Guardar el turno en el array
        alert(`¡Gracias, ${nombre}! Su turno para ${especialidad} ha sido asignado a las ${hora}.`);
    } else {
        alert("Debe ingresar el nombre del paciente, por favor, intentelo de nuevo.");
    }
}