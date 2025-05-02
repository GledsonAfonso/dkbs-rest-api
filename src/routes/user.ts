import { userController } from "@controllers/user";
import { controllerHandler } from "@middlewares/controller-handler";
import { Router } from "express";

const router = Router();

router.post("/", controllerHandler(userController.create));
router.get("/", controllerHandler(userController.getAll));
router.get("/:id", controllerHandler(userController.getById));
router.put("/:id", controllerHandler(userController.update));
router.delete("/:id", controllerHandler(userController.delete));

export default router;
