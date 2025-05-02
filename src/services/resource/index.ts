import { NotFoundError } from "@middlewares/error-handler";
import { Resource } from "@models/resource";
import { resourceRepository } from "@repositories/resource";
import { CreateParams, IdParam, UpdateParams } from "@services/resource/types";

const create = async (data: CreateParams): Promise<Resource> => {
  return resourceRepository.create(data);
};

const findAll = async (): Promise<Resource[]> => {
  return resourceRepository.findAll();
};

const findById = async (data: IdParam): Promise<Resource> => {
  const resource = await resourceRepository.findById(data);

  if (!resource) {
    throw new NotFoundError({
      message: `Resource with id ${data.id} was not found.`,
    });
  }

  return resource;
};

const update = async (data: UpdateParams): Promise<Resource> => {
  return resourceRepository.update(data);
};

const _delete = async (data: IdParam): Promise<void> => {
  await resourceRepository.delete(data);
};

export const resourceService = {
  create,
  findAll,
  findById,
  update,
  delete: _delete,
};
