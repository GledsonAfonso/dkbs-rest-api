import { createTopic, getTopicById } from "@controllers/topic";
import { controllerHandler } from "@middlewares/controller-handler";
import { Router } from "express";

const router = Router();

router.post("/", controllerHandler(createTopic));
router.get("/:id", controllerHandler(getTopicById));

export default router;
