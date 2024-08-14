/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
function iniciarSesion() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'http://localhost:8080/zarape_7/modulos/Menu_Principal/MenuPrincipal.html'; // URL de la página de destino
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorrectos',
            confirmButtonColor: '#FF8C42',
            background: '#fff',
            customClass: {
                popup: 'animated fadeInDown'
            }
        });
    }
}
