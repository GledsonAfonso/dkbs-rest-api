import { healthCheck } from "@controllers/health";
import { controllerHandler } from "@middlewares/controller-handler";
import { Router } from "express";

const router = Router();

router.get("/", controllerHandler(healthCheck));

export default router;
