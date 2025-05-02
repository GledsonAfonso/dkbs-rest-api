import { resourceController } from "@controllers/resource";
import { controllerHandler } from "@middlewares/controller-handler";
import { Router } from "express";

const router = Router();

router.post("/", controllerHandler(resourceController.create));
router.get("/", controllerHandler(resourceController.getAll));
router.get("/:id", controllerHandler(resourceController.getById));
router.put("/:id", controllerHandler(resourceController.update));
router.delete("/:id", controllerHandler(resourceController.delete));

export default router;
