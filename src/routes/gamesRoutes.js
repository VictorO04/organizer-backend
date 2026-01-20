import * as gamesController from "../controllers/gamesController.js";
import { Router } from "express";

const router = Router();

router.post("/import", gamesController.importGame);

export default router;