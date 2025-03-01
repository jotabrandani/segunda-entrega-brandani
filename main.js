document.addEventListener("DOMContentLoaded", () => {
    const productos = [
        { nombre: "Remera", precio: 5000 },
        { nombre: "Pantalón", precio: 15000 },
        { nombre: "Campera", precio: 35000 }
    ];

    const productosDiv = document.getElementById("productos");
    productos.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `${producto.nombre} - $ ${producto.precio} <button data-index="${index}">Agregar</button>`;
        productosDiv.appendChild(div);
    });

    productosDiv.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const index = event.target.getAttribute("data-index");
            agregarAlCarrito(productos[index]);
        }
    });

    document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
    mostrarCarrito();
});

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();
    let encontrado = carrito.find(item => item.nombre === producto.nombre);
    if (encontrado) {
        encontrado.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito(carrito);
    mostrarCarrito();
}

function mostrarCarrito() {
    let carrito = obtenerCarrito();
    let carritoDiv = document.getElementById("carrito");
    let totalCompra = 0;
    carritoDiv.innerHTML = "";
    carrito.forEach((item, index) => {
        let totalProducto = item.precio * item.cantidad;
        totalCompra += totalProducto;
        const div = document.createElement("div");
        div.classList.add("carrito-item");
        div.innerHTML = `${item.nombre} - $ ${item.precio} x 
            <input type="number" class="cantidad-selector" data-index="${index}" value="${item.cantidad}" min="1">
            = $ ${totalProducto} <button data-index="${index}">Eliminar</button>`;
        carritoDiv.appendChild(div);
    });
    document.getElementById("totalCompra").innerText = `Total: $ ${totalCompra}`;

    document.querySelectorAll(".cantidad-selector").forEach(input => {
        input.addEventListener("change", (event) => {
            actualizarCantidad(event.target.getAttribute("data-index"), event.target.value);
        });
    });

    carritoDiv.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            eliminarDelCarrito(event.target.getAttribute("data-index"));
        }
    });
}

function actualizarCantidad(indice, nuevaCantidad) {
    let carrito = obtenerCarrito();
    if (nuevaCantidad < 1) return;
    carrito[indice].cantidad = parseInt(nuevaCantidad);
    guardarCarrito(carrito);
    mostrarCarrito();
}

function eliminarDelCarrito(indice) {
    let carrito = obtenerCarrito();
    carrito.splice(indice, 1);
    guardarCarrito(carrito);
    mostrarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}