import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();
const portaServidor = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Servidor online");
});

app.listen(portaServidor, () => {
    console.log(`🚀 Servidor aberto em: http://localhost:${portaServidor}`);
});