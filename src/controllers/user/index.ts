import { createSchema, deleteSchema, findByIdSchema, updateSchema } from "@controllers/user/types";
import { userService } from "@services/user";
import { Request, Response } from "express";

const create = async (req: Request, res: Response): Promise<void> => {
  const requestBody = createSchema.parse(req.body);
  const response = await userService.create(requestBody);

  res.status(201).json(response);
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  const response = await userService.findAll();
  res.status(200).json(response);
};

const getById = async (req: Request, res: Response): Promise<void> => {
  const params = findByIdSchema.parse(req.params);
  const response = await userService.findById(params);
  
  res.status(200).json(response);
};

const update = async (req: Request, res: Response): Promise<void> => {
  const requestBody = updateSchema.parse({
    ...req.params,
    ...req.body,
  });
  const response = await userService.update(requestBody);

  res.status(200).json(response);
};

const _delete = async (req: Request, res: Response): Promise<void> => {
  const params = deleteSchema.parse(req.params);
  await userService.delete(params);

  res.status(200).end();
};

export const userController = {
  create,
  getAll,
  getById,
  update,
  delete: _delete,
};
