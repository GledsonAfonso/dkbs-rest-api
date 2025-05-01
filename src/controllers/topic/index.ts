import { byIdAndVersionSchema, topicSchema, updateTopicSchema } from "@controllers/topic/types";
import { topicService } from "@services/topic";
import { Request, Response } from "express";

const create = async (req: Request, res: Response): Promise<void> => {
  const requestBody = topicSchema.parse(req.body);
  const response = await topicService.create(requestBody);

  res.status(201).json(response);
};

const getByParams = async (req: Request, res: Response): Promise<void> => {
  const params = byIdAndVersionSchema.parse({
    ...req.params,
    ...req.query,
  });

  let response;
  if (params.version) {
    response = await topicService.findByIdAndVersion({
      id: params.id,
      version: params.version!,
    });
  } else {
    response = await topicService.findById(params);
  }

  res.status(200).json(response);
};

const getWithChildren = async (req: Request, res: Response): Promise<void> => {
  const params = byIdAndVersionSchema.parse(req.params);
  const response = await topicService.findWithChildren(params);
  
  res.status(200).json(response);
};

const update = async (req: Request, res: Response): Promise<void> => {
  const requestBody = updateTopicSchema.parse({
    ...req.params,
    ...req.body,
  });
  const response = await topicService.update(requestBody);

  res.status(200).json(response);
};

const _delete = async (req: Request, res: Response): Promise<void> => {
  const params = byIdAndVersionSchema.parse(req.params);
  await topicService.delete(params);

  res.status(200).end();
};

export const topicController = {
  create,
  getByParams,
  getWithChildren,
  update,
  delete: _delete,
};
