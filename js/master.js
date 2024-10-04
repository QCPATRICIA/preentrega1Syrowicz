// Definir especialidades
const Especialidad1 = "1- Pediatra";
const Especialidad2 = "2- Cirujano";
const Especialidad3 = "3- Dermatólogo";

// Definir horarios para cada especialidad
const horariosPediatra = ["8", "8.30", "9","14","14.30", "15", "15.15", ];
const horariosCirujano = ["11", "11.20", "12", "13", "15.20", "15.40" ];
const horariosDermatologo = ["14", "15", "15.20", "15.50", "16"];

// Función para filtrar horarios entre 14:00 y 16:00
function filtrarHorarios(horarios) {
    return horarios.filter(horario => {
        // Extraer la hora y el período (AM/PM)
        let [hora, periodo] = horario.split(" ");
        let [horas, minutos] = hora.split(":").map(Number);

        // Convertir la hora a formato 24 horas
        if (periodo === "PM" && horas !== 12) {
            horas += 12;
        }

        // Filtrar horarios entre 14:00 (2 PM) y 16:00 (4 PM)
        return horas >= 14 && horas <= 16;
    });
}

// Función para otorgar hasta 8 turnos
function otorgarTurno() {
    let nombreIngresado = prompt("Ingrese su Nombre:");
    console.log(nombreIngresado);

    if (nombreIngresado === null || nombreIngresado.trim() === "") {
        alert("Error! No ingresaste un Nombre!");
        return false;
    } else {
        alert("Hola, " + nombreIngresado + "! ¿Qué especialista buscas hoy?");
        
        let mensaje = "Solicite su turno:\n" + Especialidad1 + "\n" + Especialidad2 + "\n" + Especialidad3;
        let especialidad = parseInt(prompt(mensaje));
        console.log("Especialidad seleccionada:", especialidad);

        if (isNaN(especialidad) || especialidad < 1 || especialidad > 3) {
            alert("Error! Especialidad no válida.");
            return false;
        } else {
            let horariosDisponibles;
            
            // Asignar los horarios según la especialidad seleccionada
            switch (especialidad) {
                case 1:
                    horariosDisponibles = filtrarHorarios(horariosPediatra);
                    break;
                case 2:
                    horariosDisponibles = filtrarHorarios(horariosCirujano);
                    break;
                case 3:
                    horariosDisponibles = filtrarHorarios(horariosDermatologo);
                    break;
            }

            // Verificar si hay horarios disponibles después del filtro
            if (horariosDisponibles.length === 0) {
                alert("No hay horarios disponibles entre las 14:00 y las 16:00.");
                return false;
            }

            // Mostrar horarios disponibles
            let mensajeHorarios = "Horarios disponibles entre 14:00 y 16:00:\n" + horariosDisponibles.join("\n");
            let horarioSeleccionado = prompt(mensajeHorarios);
            console.log("Horario seleccionado:", horarioSeleccionado);

            // Validar que el horario seleccionado esté en la lista de horarios disponibles
            if (!horariosDisponibles.includes(horarioSeleccionado)) {
                alert("Error! El horario seleccionado no es válido.");
                return false;
            }

            mensaje = "Turno otorgado, " + nombreIngresado + " a las " + horarioSeleccionado + ".";
            alert(mensaje);
        }
    }

    mensaje = "Te esperamos en la fecha indicada. Por favor, si debes cancelar la consulta no olvides hacerlo 24 horas antes para que no se te cobre la misma. Muchas gracias por tu comprensión.";
    alert(mensaje);
    return true;
}

// Repetir la función hasta 8 veces
for (let i = 0; i < 8; i++) {
    let turnoExitoso = otorgarTurno();
    if (!turnoExitoso) break;
}

alert("No hay más turnos disponibles en el momento.");
console.log("Terminó el programa");