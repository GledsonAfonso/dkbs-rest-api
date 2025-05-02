import { findByIdAndVersionSchema, findByIdSchema, findShortestPathToDestinationSchema, createSchema, updateSchema } from "@controllers/topic/types";
import { topicService } from "@services/topic";
import { Request, Response } from "express";

const create = async (req: Request, res: Response): Promise<void> => {
  const requestBody = createSchema.parse(req.body);
  const response = await topicService.create(requestBody);

  res.status(201).json(response);
};

const getByParams = async (req: Request, res: Response): Promise<void> => {
  const params = findByIdAndVersionSchema.parse({
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
  const params = findByIdAndVersionSchema.parse(req.params);
  const response = await topicService.findWithChildren(params);
  
  res.status(200).json(response);
};

const getShortestPathToDestination = async (req: Request, res: Response): Promise<void> => {
  const params = findShortestPathToDestinationSchema.parse(req.body);
  const response = await topicService.findShortestPathToDestination(params);
  
  res.status(200).json(response);
};

const update = async (req: Request, res: Response): Promise<void> => {
  const requestBody = updateSchema.parse({
    ...req.params,
    ...req.body,
  });
  const response = await topicService.update(requestBody);

  res.status(200).json(response);
};

const _delete = async (req: Request, res: Response): Promise<void> => {
  const params = findByIdSchema.parse(req.params);
  await topicService.delete(params);

  res.status(200).end();
};

export const topicController = {
  create,
  getByParams,
  getWithChildren,
  getShortestPathToDestination,
  update,
  delete: _delete,
};
