const nombreUsuarioPlaceholder = document.getElementById('nombreUsuarioPlaceholder') as HTMLSpanElement;
const cuerpoTablaTareas = document.getElementById('cuerpoTablaTareas') as HTMLTableSectionElement;
const btnCerrarSesion = document.getElementById('btnCerrarSesion') as HTMLButtonElement;
const nuevaTareabtn = document.getElementById('btnNuevaTarea') as HTMLButtonElement

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
        console.log('Tareas recibidas; ', data)
        
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

        const fechaFormateada = tarea.limit_date 
        ? new Date(tarea.limit_date).toLocaleDateString(): '---';
        
        fila.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.title}</td>
            <td>${tarea.description || 'Sin descripción'}</td>
            <td><strong>${fechaFormateada}</strong></td>
            <td>
                <select class="selectEstado" data-id="${tarea.id}">
                    <option value="No lista" ${tarea.status === 'No lista' ? 'selected' : ''}>No lista</option>
                    <option value="En proceso" ${tarea.status === 'En proceso' ? 'selected' : ''}>En proceso</option>
                    <option value="Terminada" ${tarea.status === 'Terminada' ? 'selected' : ''}>Terminada</option>
                </select>
            </td>
            <td>
                <button class="btnEditar" data-id="${tarea.id}">Editar</button>
                
                <button class="btnAccion" data-id="${tarea.id}">Eliminar</button>
            </td>
        `;
        const selectEstado = fila.querySelector('.selectEstado') as HTMLSelectElement;
        selectEstado.onchange = () => actualizarEstadoTarea(tarea.id, selectEstado.value);

        const btnEdit = fila.querySelector('.btnEditar') as HTMLButtonElement;
        const btnDel = fila.querySelector('.btnAccion') as HTMLButtonElement;

        btnEdit.onclick = () => prepararEdicion(tarea);
        btnDel.onclick = () => ejecutarEliminacion(tarea.id);

        cuerpoTablaTareas.appendChild(fila);
    });
}


//Función para el botón "Eliminar" de cada tarea//
async function ejecutarEliminacion(id: number) {
    if (!confirm("¿Eliminar tarea?")) return;

    const response = await fetch(`/api/tasks/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
        obtenerTareas(); //Recarga la tabla para mostrar el restultado//
    }
}

//Función para modificar una tarea//
async function prepararEdicion(tarea: any) {
    
    const nuevoTitulo = prompt("Editar título:", tarea.title);
    if (nuevoTitulo === null) return; 
    const nuevaDescripcion = prompt("Editar descripción:", tarea.description);
    if (nuevaDescripcion === null) return;

    
    try {
        const response = await fetch(`/api/tasks/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id: tarea.id,      
                title: nuevoTitulo, 
                description: nuevaDescripcion 
            })
        });

        if (response.ok) {
            alert("Tarea editada");
            obtenerTareas(); 
        } else {
            const error = await response.json();
            alert("Error al editar: " + error.message);
        }
    } catch (err) {
        console.error("Error en la operación:", err);
    }
}

//Función para añadir una nueva tarea//
nuevaTareabtn.addEventListener('click', async () => {
    
    const title = prompt("Título de la nueva tarea:");
    const description = prompt("Descripción de la tarea:");

    if (!title) return; //Si no se registra información nueva, retorna//

    try {
        //Envía al backend la información registrada//
        const response = await fetch('/api/tasks/createTask', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                user_id: userId //El id de usuario que se envía al iniciar sesión y que se guarda en el localStorage//
            })
        });
            //Actualiza la vista de las tareas con la nueva que se agrega trayendo los datos de la tabla tasks//
        if (response.ok) {
            alert("Tarea creada con éxito");
            obtenerTareas(); 
        } else {
            
            const errorData = await response.json();
            console.error("Error en el back: ", errorData);
            alert("Error al crear la tarea" + errorData.message);
        }

    } catch (error) {
        console.error("Error en la petición:", error);
    }
});

//Cierre de sesión
btnCerrarSesion?.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});

function manejarSesionExpirada() {
    alert("Tu sesión ha expirado (1 hora) Serás redireccionado al inicio.");
    localStorage.clear();
    window.location.href = 'login.html';
}

//Función para actualizar el estado de una tarea//
async function actualizarEstadoTarea(id: number, nuevoEstado: string) {
    try {
        const response = await fetch(`/api/tasks/updateStatus/${id}`, {
            method: 'PATCH', //Se usa patch al solo actualizar una parte del dato//
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: nuevoEstado })
        });

        if (!response.ok) {
            alert("No se pudo actualizar el estado");
        }
    } catch (error) {
        console.error("Error actualizando estado:", error);
    }
}

//Ejecución inicial//
obtenerTareas();