import express from "express";
import dotenv from "dotenv";
import gamesRoutes from "./src/routes/gamesRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Server online");
});

app.use("/games", gamesRoutes);

app.listen(serverPort, () => {
    console.log(`🚀 Server online at: http://localhost:${serverPort}`);
});