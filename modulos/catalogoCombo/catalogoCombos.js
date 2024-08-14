let alimentos = [];
let bebidas = [];
let combos = [];
let alimentosSeleccionados = [];
let bebidasSeleccionadas = [];
let cantidadesAlimentos = [];
let cantidadesBebidas = [];
let comboEditIndex = -1; // Índice del combo a editar, -1 significa que no se está editando

function cargarAlimentosYBebidas() {
    fetch("../catalogoAlimentos/datosAlimentos.json")
        .then(response => response.json())
        .then(data => {
            alimentos = data;
            actualizarListaAlimentos();
        });

    fetch("../catalogoBebidas/catalogoBebidas.json") // Cambiado aquí
        .then(response => response.json())
        .then(data => {
            bebidas = data;
            actualizarListaBebidas();
        });
}

function actualizarListaAlimentos() {
    let lista = document.getElementById("listaAlimentos");
    lista.innerHTML = "";
    alimentos.forEach((alimento, index) => {
        let item = `<li class='list-group-item' onclick='seleccionarAlimento(${index})'>
                        ${alimento.nombre} (${alimento.descripcion})
                    </li>`;
        lista.innerHTML += item;
    });
}

function actualizarListaBebidas() {
    let lista = document.getElementById("listaBebidas");
    lista.innerHTML = "";
    bebidas.forEach((bebida, index) => {
        let item = `<li class='list-group-item' onclick='seleccionarBebida(${index})'>
                        ${bebida.nombre} (${bebida.descripcion})
                    </li>`;
        lista.innerHTML += item;
    });
}

function seleccionarAlimento(index) {
    let alimentoSeleccionado = alimentos[index];
    let cantidad = prompt(`Ingrese la cantidad para ${alimentoSeleccionado.nombre}:`);
    if (cantidad && !isNaN(cantidad) && cantidad > 0) {
        let cantidadNumerica = parseInt(cantidad);
        if (!alimentosSeleccionados.includes(alimentoSeleccionado)) {
            alimentosSeleccionados.push(alimentoSeleccionado);
            cantidadesAlimentos.push(cantidadNumerica);
        } else {
            let idx = alimentosSeleccionados.indexOf(alimentoSeleccionado);
            cantidadesAlimentos[idx] = cantidadNumerica;
        }
        mostrarAlimentosSeleccionados();
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Cantidad inválida',
            text: 'Por favor ingrese una cantidad válida',
            confirmButtonText: 'Aceptar'
        });
    }
}

function seleccionarBebida(index) {
    let bebidaSeleccionada = bebidas[index];
    let cantidad = prompt(`Ingrese la cantidad para ${bebidaSeleccionada.nombre}:`);
    if (cantidad && !isNaN(cantidad) && cantidad > 0) {
        let cantidadNumerica = parseInt(cantidad);
        if (!bebidasSeleccionadas.includes(bebidaSeleccionada)) {
            bebidasSeleccionadas.push(bebidaSeleccionada);
            cantidadesBebidas.push(cantidadNumerica);
        } else {
            let idx = bebidasSeleccionadas.indexOf(bebidaSeleccionada);
            cantidadesBebidas[idx] = cantidadNumerica;
        }
        mostrarBebidasSeleccionadas();
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Cantidad inválida',
            text: 'Por favor ingrese una cantidad válida',
            confirmButtonText: 'Aceptar'
        });
    }
}

function mostrarAlimentosSeleccionados() {
    let lista = document.getElementById("selectedAlimentos");
    lista.innerHTML = "";
    alimentosSeleccionados.forEach((alimento, index) => {
        let item = `<li class='list-group-item'>
                        ${alimento.nombre} (${alimento.descripcion}) - Cantidad: ${cantidadesAlimentos[index]}
                        <button class='btn btn-outline-danger btn-sm float-end' onclick='removerAlimento(${index})'>Eliminar</button>
                    </li>`;
        lista.innerHTML += item;
    });
}

function mostrarBebidasSeleccionadas() {
    let lista = document.getElementById("selectedBebidas");
    lista.innerHTML = "";
    bebidasSeleccionadas.forEach((bebida, index) => {
        let item = `<li class='list-group-item'>
                        ${bebida.nombre} (${bebida.descripcion}) - Cantidad: ${cantidadesBebidas[index]}
                        <button class='btn btn-outline-danger btn-sm float-end' onclick='removerBebida(${index})'>Eliminar</button>
                    </li>`;
        lista.innerHTML += item;
    });
}

function removerAlimento(index) {
    alimentosSeleccionados.splice(index, 1);
    cantidadesAlimentos.splice(index, 1);
    mostrarAlimentosSeleccionados();
}

function removerBebida(index) {
    bebidasSeleccionadas.splice(index, 1);
    cantidadesBebidas.splice(index, 1);
    mostrarBebidasSeleccionadas();
}

function agregarCombo() {
    let nombre = document.getElementById("txtNombreCombo").value;
    let descripcion = document.getElementById("txtDescripcionCombo").value;
    let precio = document.getElementById("txtPrecioCombo").value;
    let imagen = document.getElementById("fileImagenCombo").files[0];

    if (nombre && descripcion && precio && alimentosSeleccionados.length > 0 && bebidasSeleccionadas.length > 0) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let nuevoCombo = {
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                imagen: e.target.result,
                alimentos: alimentosSeleccionados.map((a, i) => ({ nombre: a.nombre, cantidad: cantidadesAlimentos[i] })),
                bebidas: bebidasSeleccionadas.map((b, i) => ({ nombre: b.nombre, cantidad: cantidadesBebidas[i] }))
            };

            if (comboEditIndex === -1) {
                combos.push(nuevoCombo);
            } else {
                combos[comboEditIndex] = nuevoCombo;
                comboEditIndex = -1; // Resetear el índice de edición
            }

            mostrarCombos();
            Swal.fire({
                icon: 'success',
                title: 'Combo guardado',
                text: 'El combo ha sido agregado/actualizado exitosamente',
                confirmButtonText: 'Aceptar'
            });

            // Limpiar selección
            document.getElementById("formCombo").reset();
            alimentosSeleccionados = [];
            bebidasSeleccionadas = [];
            cantidadesAlimentos = [];
            cantidadesBebidas = [];
            mostrarAlimentosSeleccionados();
            mostrarBebidasSeleccionadas();
        }
        reader.readAsDataURL(imagen);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Campos obligatorios',
            text: 'Por favor llena todos los campos y selecciona al menos un alimento y una bebida',
            confirmButtonText: 'Aceptar'
        });
    }
}

function mostrarCombos() {
    let tabla = document.getElementById("tblCombos");
    let cuerpo = ""; // Usa esta variable para construir el contenido de la tabla

    combos.forEach((combo, index) => {
        let fila = `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${combo.nombre}</td>
                        <td>${combo.descripcion}</td>
                        <td>${combo.precio}</td>
                        <td><img src="${combo.imagen}" class="combo-img" alt="${combo.nombre}"></td>
                        <td>${combo.alimentos.map(a => `${a.nombre} (${a.cantidad})`).join(', ')}</td>
                        <td>${combo.bebidas.map(b => `${b.nombre} (${b.cantidad})`).join(', ')}</td>
                        <td>
                            <button class='btn btn-outline-primary btn-sm' onclick='editarCombo(${index})'>Editar</button>
                            <button class='btn btn-outline-danger btn-sm' onclick='eliminarCombo(${index})'>Eliminar</button>
                        </td>
                    </tr>`;
        cuerpo += fila; // Construye el contenido en la variable cuerpo
    });

    tabla.innerHTML = cuerpo; // Asigna todo el contenido de una vez
}

// Asegúrate de llamar a esta función cuando la página esté completamente cargada
document.addEventListener('DOMContentLoaded', function() {
    mostrarCombos();
});

function editarCombo(index) {
    let combo = combos[index];
    document.getElementById("txtNombreCombo").value = combo.nombre;
    document.getElementById("txtDescripcionCombo").value = combo.descripcion;
    document.getElementById("txtPrecioCombo").value = combo.precio;

    // Limpiar selecciones actuales
    alimentosSeleccionados = combo.alimentos.map(a => ({ nombre: a.nombre, descripcion: '' }));
    cantidadesAlimentos = combo.alimentos.map(a => a.cantidad);
    bebidasSeleccionadas = combo.bebidas.map(b => ({ nombre: b.nombre, descripcion: '' }));
    cantidadesBebidas = combo.bebidas.map(b => b.cantidad);
    
    mostrarAlimentosSeleccionados();
    mostrarBebidasSeleccionadas();
    
    comboEditIndex = index; // Establecer el índice del combo a editar
}

function eliminarCombo(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás recuperar este combo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
        if (result.isConfirmed) {
            combos.splice(index, 1);
            mostrarCombos();
            Swal.fire(
                'Eliminado!',
                'El combo ha sido eliminado.',
                'success'
            );
        }
    });
}

document.getElementById("btnAgregarCombo").addEventListener("click", agregarCombo);

cargarAlimentosYBebidas();
document.addEventListener('DOMContentLoaded', function() {
    mostrarCombos();
});