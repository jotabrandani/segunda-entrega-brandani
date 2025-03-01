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
                div.innerHTML = `${producto.nombre} - $${producto.precio} <button data-index="${index}">Agregar</button>`;
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
                div.innerHTML = `${item.nombre} - $${item.precio} x ${item.cantidad} = $${totalProducto} <button data-index="${index}">Eliminar</button>`;
                carritoDiv.appendChild(div);
            });
            document.getElementById("totalCompra").innerText = `Total: $${totalCompra}`;
            carritoDiv.addEventListener("click", (event) => {
                if (event.target.tagName === "BUTTON") {
                    eliminarDelCarrito(event.target.getAttribute("data-index"));
                }
            });
        }

        function eliminarDelCarrito(indice) {
            let carrito = obtenerCarrito();
            if (carrito[indice].cantidad > 1) {
                carrito[indice].cantidad--;
            } else {
                carrito.splice(indice, 1);
            }
            guardarCarrito(carrito);
            mostrarCarrito();
        }

        function vaciarCarrito() {
            localStorage.removeItem("carrito");
            mostrarCarrito();
        }