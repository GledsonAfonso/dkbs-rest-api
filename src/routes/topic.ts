import { topicController } from "@controllers/topic";
import { controllerHandler } from "@middlewares/controller-handler";
import { Router } from "express";

const router = Router();

router.post("/", controllerHandler(topicController.create));
router.get("/:id", controllerHandler(topicController.getByParams));
router.get("/:id/children", controllerHandler(topicController.getWithChildren));
router.put("/:id", controllerHandler(topicController.update));
router.delete("/:id", controllerHandler(topicController.delete));

export default router;
