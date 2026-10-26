function abrirPopup() {
    document.getElementById("popup").style.display = "flex";
}

function abrirPopupEdicion(producto) {
    productoEditando = producto;

    document.getElementById("popup").style.display = "flex";

    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("cantidad").value = producto.cantidad;
    document.querySelector(`input[name="tipo"][value="${producto.tipo}"]`).checked = true;
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";

    document.getElementById("nombre").value = null;
    document.getElementById("precio").value = null;
    document.getElementById("cantidad").value = null;
    document.querySelector(`input[name="tipo"]`).checked = false;
}

class Producto {
    constructor(nombre, precio, cantidad, tipo) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.tipo = tipo;
    }

    actualizar(producto) {
        this.nombre = producto.nombre;
        this.precio = producto.precio;
        this.cantidad = producto.cantidad;
        this.tipo = producto.tipo;
    }
}

class GestorProductos {
    constructor() {
        this.container = document.getElementById("lista-elementos");

        const datosGuardados = JSON.parse(
            localStorage.getItem("productos") || "[]"
        );

        this.productos = datosGuardados.map(
            (p) => new Producto(
                p.nombre,
                p.precio,
                p.cantidad,
                p.tipo
            )
        );

        this.render();
    }

    getProductos() {
        return this.productos;
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.guardarProductos();
        this.render();
    }

    eliminarProducto(producto) {
        this.productos = this.productos.filter((p) => p !== producto);
        this.guardarProductos();
        this.render();
    }

    editarProducto(producto) {
        abrirPopupEdicion(producto);
    }

    guardarProductos() {
        localStorage.setItem(
            "productos",
            JSON.stringify(this.productos)
        );
    }

    render() {
        this.container.innerHTML = "";

        if(this.productos.length === 0) {
            this.container.textContent = "No hay ningun producto registrado. Añade algunos productos primero.";
            return;
        }

        this.productos.forEach((p) => {
            const prod = document.createElement("div");
            prod.className = "tarjeta";
            prod.innerHTML = `
            <div>
                <h2>${p.nombre}</h2>
                <p>Precio: $${p.precio.toFixed(2)}</p>
                <p>Stock: ${p.cantidad} unidades</p>
                <p>Tipo: ${p.tipo}</p>
            </div>
        `;

            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Eliminar";
            btnDelete.className = "boton-negativo";
            btnDelete.addEventListener("click", () => {
                this.eliminarProducto(p);
            });

            const btnEdit = document.createElement("button");
            btnEdit.textContent = "Editar";
            btnEdit.className = "boton-intermedio";
            btnEdit.addEventListener("click", () => {
                this.editarProducto(p);
            });

            const botones = document.createElement("div");
            botones.className = "botones-opuestos";
            botones.appendChild(btnDelete);
            botones.appendChild(btnEdit);

            prod.appendChild(botones);
            this.container.appendChild(prod);
        });
    }
}

const gestor = new GestorProductos();
const form = document.getElementById("form-productos");

let productoEditando = null;
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = Number(document.getElementById("precio").value);
    const cantidad = Number(document.getElementById("cantidad").value);
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    const nuevoProducto = new Producto(nombre, precio, cantidad, tipo);

    if(productoEditando !== null) {
        productoEditando.actualizar(nuevoProducto);
        gestor.guardarProductos();
        gestor.render();
        productoEditando = null;
    } else {
        gestor.agregarProducto(nuevoProducto);
    }

    form.reset();
    cerrarPopup();
});