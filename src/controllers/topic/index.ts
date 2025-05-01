import { byIdAndVersionSchema, topicSchema, updateTopicSchema } from "@controllers/topic/types";
import { topicService } from "@services/topic";
import { Request, Response } from "express";

export const createTopic = async (req: Request, res: Response): Promise<void> => {
  const requestBody = topicSchema.parse(req.body);
  const response = await topicService.createTopic(requestBody);

  res.status(201).json(response);
};

export const getTopicByParams = async (req: Request, res: Response): Promise<void> => {
  const params = byIdAndVersionSchema.parse({
    ...req.params,
    ...req.query,
  });

  let response;
  if (params.version) {
    response = await topicService.getTopicByIdAndVersion({
      id: params.id,
      version: params.version!,
    });
  } else {
    response = await topicService.getTopicById(params);
  }

  res.status(200).json(response);
};

export const updateTopic = async (req: Request, res: Response): Promise<void> => {
  const requestBody = updateTopicSchema.parse({
    ...req.params,
    ...req.body,
  });
  const response = await topicService.updateTopic(requestBody);

  res.status(200).json(response);
};

export const deleteTopic = async (req: Request, res: Response): Promise<void> => {
  const params = byIdAndVersionSchema.parse(req.params);
  await topicService.deleteTopic(params);

  res.status(200).end();
};
