// Definir especialidades
const Especialidad1 = "1- Pediatra";
const Especialidad2 = "2- Cirujano";
const Especialidad3 = "3- Dermatólogo";

// Función para otorgar hasta 8 turnos.
function otorgarTurno() 
{
    // Ingresar nombre
    let nombreIngresado = prompt("Ingrese su Nombre:");
    console.log(nombreIngresado);

    // Validar si el nombre ingresado no es null o vacío
    if (nombreIngresado === null || nombreIngresado.trim() === "") {
        alert("Error! No ingresaste un Nombre!");
        return false; // Salir de la función si no hay nombre
    } else {
        alert("Hola, " + nombreIngresado + "! ¿Qué especialista buscas hoy?");

        // Solicitar especialidad
        let mensaje = "Solicite su turno:\n" + Especialidad1 + "\n" + Especialidad2 + "\n" + Especialidad3;
        let especialidad = parseInt(prompt(mensaje));
        console.log("Especialidad seleccionada:", especialidad);

        // Validar si la especialidad es un número entre 1 y 3
        if (isNaN(especialidad) || especialidad < 1 || especialidad > 3) {
            alert("Error! Especialidad no válida.");
            return false; // Salir si la especialidad es inválida
        } else {
            mensaje = "Turno otorgado, " + nombreIngresado + ".";
            alert(mensaje);
        }
    }

    // Mensaje final
    mensaje = "Te esperamos en la fecha indicada. Por favor, si debes cancelar la consulta no olvides hacerlo 24 horas antes para que no se te cobre la misma. Muchas gracias por tu comprensión.";
    alert(mensaje);
    return true; // Turno otorgado con éxito
}

// Repetir la función hasta 8 veces
for (let i = 0; i < 8; i++) {
    let turnoExitoso = otorgarTurno();
    if (!turnoExitoso) break; // Si algo sale mal, salir del ciclo
}

    mensaje = "No hay más turnos disponibles en el momento.";
    alert(mensaje);

    console.log("Terminó el programa");