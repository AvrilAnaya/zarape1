/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
function IrCatalogoSucursal() {
    window.location.href = '../catalogoSucursal/catalogoSucursal.html';
}

function IrCatalogoBebidas() {
    window.location.href = '../catalogoBebidas/catalogoBebidas.html';
}

function IrCatalogoAlimentos() {
    window.location.href = '../catalogoAlimentos/catalogoAlimentos.html';
}

function IrCatalogoCombos() {
    window.location.href = '../catalogoCombo/catalogoCombo.html';
}

function IrCatalogoUsuarios() {
    window.location.href = '../catalogoUsuarios/catalogoUsuarios.html';
}


// Animación de los botones al pasar el ratón
document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});