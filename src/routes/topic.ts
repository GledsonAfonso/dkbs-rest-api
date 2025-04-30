import { createTopic, getTopicById, updateTopic } from "@controllers/topic";
import { controllerHandler } from "@middlewares/controller-handler";
import { Router } from "express";

const router = Router();

router.post("/", controllerHandler(createTopic));
router.get("/:id", controllerHandler(getTopicById));
router.put("/:id", controllerHandler(updateTopic));

export default router;
