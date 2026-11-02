import { useState } from "react"

function Productos () {
    const [popupAbierto, setPopupAbierto] = useState(false);

    return (
        <>
            <header>
                <h1>Productos</h1>

                <article>
                    <p>
                        Desde este espacio puede ver una lista de todos los 
                        productos que Ofrecemos. Esperamos que encuentre algo 
                        de su agrado.                        
                    </p>
                </article>

                <article>
                    <button onClick={() => setPopupAbierto(true)}>
                        Añadir producto
                    </button>
                </article>
            </header>

            <main>
                {popupAbierto && (
                    <article id="popup" className="popup">
                        <form className="poup-contenido">

                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" required />

                            <label htmlFor="precio">Precio:</label>
                            <input type="number" id="precio" required />

                            <label htmlFor="cantidad">Cantidad:</label>
                            <input type="number" id="cantidad" required />

                            <label>Tipo de producto:</label>

                            <div className="opciones-radio">
                                <label>
                                    <input type="radio" name="tipo" value="juegos" required />
                                    Videojuegos
                                </label>

                                <label>
                                    <input type="radio" name="tipo" value="consola" />
                                    Consolas
                                </label>

                                <label>
                                    <input type="radio" name="tipo" value="accesorio" />
                                    Accesorios
                                </label>
                            </div>

                            <div className="botones-opuestos">
                                <button 
                                    type="button" 
                                    onClick={() => setPopupAbierto(false)}
                                    className="boton-negativo"
                                >
                                    Cerrar
                                </button>

                                <button type="submit">Enviar</button>
                            </div>
                        </form>
                    </article>
                )}

                <article id="lista-elementos" className="grid-elementos">

                </article>
            </main>
        </>
    );
}

export default Productos