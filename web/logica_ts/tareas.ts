const nombreUsuarioPlaceholder = document.getElementById('nombreUsuarioPlaceholder') as HTMLSpanElement;
const cuerpoTablaTareas = document.getElementById('cuerpoTablaTareas') as HTMLTableSectionElement;
const btnCerrarSesion = document.getElementById('btnCerrarSesion') as HTMLButtonElement;

//Guardar las credenciales en el almacenamiento local//
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
const username = localStorage.getItem('username');

//Validación de seguridad para mostrar los datos al usuario correspondiente//
if (!token || !userId) {
    alert("Sesión inválida. Por favor, inicia sesión.");
    window.location.href = 'login.html'; 
}

//Mostrar el nombre del usuario al entrar//
if (nombreUsuarioPlaceholder && username) {
    nombreUsuarioPlaceholder.textContent = username;
}

//Función para obtener las tareas guardadas en tabla tasks//
async function obtenerTareas() {
    try {
        //Ruta del backend para mostrar las tareas asociadas al usuario//
        const response = await fetch(`/api/tasks/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401 || response.status === 403) {
            manejarSesionExpirada();
            return;
        }

        const data = await response.json();
        
        
        const listaTareas = data.tasks || data; 
        renderizarTabla(listaTareas);

    } catch (error) {
        console.error("Error al conectar con la API de tareas:", error);
    }
}

//Función para crear las tablas en html//
function renderizarTabla(tareas: any[]) {
    if (!cuerpoTablaTareas) return;

    cuerpoTablaTareas.innerHTML = ""; //Limpia la tabla antes de insertar datos//

    if (tareas.length === 0) {
        cuerpoTablaTareas.innerHTML = `<tr><td colspan="5" style="text-align:center;">No tienes tareas pendientes.</td></tr>`;
        return;
    }

    tareas.forEach((tarea) => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.title}</td>
            <td>${tarea.description || 'Sin descripción'}</td>
            <td>
                <span class="estado-tag" style="color: ${tarea.status === 'completed' ? 'green' : 'orange'}">
                    ${tarea.status}
                </span>
            </td>
            <td>
                <button class="btnAccion" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
            </td>
        `;
        cuerpoTablaTareas.appendChild(fila);
    });
}

// 7. Lógica de Cerrar Sesión
btnCerrarSesion?.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});

function manejarSesionExpirada() {
    alert("Tu sesión ha expirado (1 hora).");
    localStorage.clear();
    window.location.href = 'login.html';
}

// Ejecución inicial
obtenerTareas();