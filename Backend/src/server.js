import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import conectarDB from "./config/database.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

conectarDB();

app.get("/", (req, res) => {
    res.send("Bienvenido a la API de Arcadex");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});