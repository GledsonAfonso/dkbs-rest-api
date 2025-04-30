import { createTopicSchema, getTopicByIdSchema } from "@controllers/topic/types";
import { topicService } from "@services/topic";
import { Request, Response } from "express";

export const createTopic = async (req: Request, res: Response): Promise<void> => {
  const requestBody = createTopicSchema.parse(req.body);
  const response = await topicService.createTopic(requestBody);

  res.status(201).json(response);
};

export const getTopicById = async (req: Request, res: Response): Promise<void> => {
  const params = getTopicByIdSchema.parse(req.params);
  const response = await topicService.getTopicById(params);

  res.status(200).json(response);
};
