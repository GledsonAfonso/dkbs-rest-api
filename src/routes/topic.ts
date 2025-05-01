import { createTopic, getTopicByParams, updateTopic } from "@controllers/topic";
import { controllerHandler } from "@middlewares/controller-handler";
import { Router } from "express";

const router = Router();

router.post("/", controllerHandler(createTopic));
router.get("/:id", controllerHandler(getTopicByParams));
router.put("/:id", controllerHandler(updateTopic));

export default router;
