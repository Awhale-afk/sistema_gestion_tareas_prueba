"use strict";
let registroUsuario = document.getElementById('inputUsuario');
let registroContraseña = document.getElementById('inputContraseña');
let registroCorreo = document.getElementById('inputCorreo');
let btnRegistrarme = document.getElementById('registrarme');
btnRegistrarme.addEventListener('click', async function (c) {
    c.preventDefault();
    if (!registroUsuario || !registroContraseña || !registroCorreo) {
        alert("Todos los campos son obligatorios");
        return;
    }
    let username = registroUsuario.value;
    let password = registroContraseña.value;
    let email = registroCorreo.value;
    try {
        //Conexión con el backend//
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        const data = await response.json();
        //Manejo de la respuesta//
        if (response.ok) {
            alert("Te has registrado correctamente");
            window.location.href = '/login'; //Redirigir automáticamente al login//
        }
        else {
            //Muestra error si el correo ya existe//
            alert("Error: " + data.message);
        }
    }
    catch (error) {
        console.error("Error de conexión:", error);
        alert("No se pudo conectar con el servidor.");
    }
});
