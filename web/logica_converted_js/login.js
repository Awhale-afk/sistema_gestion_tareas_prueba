"use strict";
let correo = document.getElementById('emailInput');
let contraseña = document.getElementById('passwordInput');
let btnIngresar = document.getElementById('ingresarBtn');
btnIngresar.addEventListener('click', async function (c) {
    c.preventDefault();
    if (!correo || !contraseña) {
        alert("Se necesita correo y contraseña para ingresar");
        return;
    }
    let email = correo.value;
    let password = contraseña.value;
    try {
        //Conexión con backend//
        const send = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const result = await send.json();
        //Manejo de respuesta//
        if (send.ok) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', result.user.id);
            localStorage.setItem('username', result.user.username);
            alert("Bienvenido, será redirigido a su espacio de tareas");
            window.location.href = '/tareas';
        }
        else {
            alert("Error: " + result.message);
        }
    }
    catch (error) {
        console.error("Error interno al validar datos ");
        alert("No se pudo ingresar. Error interno de validación");
    }
});
