function ProductoCard({ nombre, precio, cantidad, tipo }) {
    return (
        <article className="tarjeta">
            <h3>{nombre}</h3>
            <p>Precio: ${precio}</p>
            <p>Existencias: {cantidad}</p>
            <p>Categoría: {tipo}</p>
        </article>
    )
}

export default ProductoCard