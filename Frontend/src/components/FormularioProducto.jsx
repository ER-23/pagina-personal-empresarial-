import { useState } from "react"

function FormularioProducto({ agregarProducto }) {
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [tipo, setTipo] = useState("juegos")

    return (
        <form>
            <h2>Agregar producto</h2>

            <label>Nombre:</label>
            <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)}
            />

            <label>Precio:</label>
            <input 
                type="number" 
                value={precio} 
                onChange={(e) => setPrecio(e.target.value)}
            />

            <label>Cantidad:</label>
            <input 
                type="number" 
                value={cantidad} 
                onChange={(e) => setCantidad(e.target.value)}
            />

            <label>Tipo de producto:</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="juegos">Videojuegos</option>
                <option value="consola">Consolas</option>
                <option value="accesorio">Accesorios</option>
            </select>

            <button type="submit">Agregar Producto</button>
        </form>
    )
}

function manejarEnvio(e) {
    e.prevenDefault()

    const nuevoProducto = {
        i
    }
}

export default FormularioProducto