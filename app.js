function abrirPopup() {
    document.getElementById("popup").style.display = "flex";
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
}

class Producto {
    constructor(nombre, precio, cantidad, tipo) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.tipo = tipo;
    }

    venta() {
        if(tipo <= 0) {
            alert("No hay existencias que vender");
            return
        }

        this.cantidad--;
    }
}

class GestorProductos {
    constructor() {
        this.productos = [];
        this.container = document.getElementById("lista-elementos");
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.render()
    }

    eliminarProducto(producto) {
        this.productos = this.productos.filter((p) => p !== producto);
        this.render();
    }

    editarProducto(producto) {
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("precio").value = producto.precio;
        document.getElementById("cantidad").value = producto.cantidad;
        document.querySelector(`input[name="tipo"][value="${producto.tipo}"]`).checked = true;

        abrirPopup();
    }

    render() {
        this.container.innerHTML = "";
        this.productos.forEach((p) => {
            const prod = document.createElement("div");
            prod.className = "tarjeta tarjeta-sin-mov";
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
            })

            const botones = document.createElement("div");
            botones.className = "botones-opuestos"
            botones.appendChild(btnDelete);
            botones.appendChild(btnEdit);

            prod.appendChild(botones);
            this.container.appendChild(prod);
        });
    }
}

const productos = new GestorProductos();
const form = document.getElementById("form-productos");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = Number(document.getElementById("precio").value);
    const cantidad = Number(document.getElementById("cantidad").value);
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    const nuevoProducto = new Producto(nombre, precio, cantidad, tipo)
    productos.agregarProducto(nuevoProducto);

    form.reset();
    cerrarPopup();
});