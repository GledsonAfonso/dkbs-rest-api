import { getDatabaseClient } from "@config/database";
import { Resource } from "@models/resource";
import { CreateParams, IdParam, UpdateParams } from "@repositories/resource/types";

const databaseClient = getDatabaseClient();

const create = async (data: CreateParams): Promise<Resource> => {
  return databaseClient.resource.create({
    data,
  });
};

const findAll = async (): Promise<Resource[]> => {
  return databaseClient.resource.findMany({});
};

const findById = async (data: IdParam): Promise<Resource | null> => {
  return databaseClient.resource.findUnique({
    where: {
      id: data.id,
    },
  });
};

const update = async (data: UpdateParams): Promise<Resource> => {
  return databaseClient.resource.update({
    data,
    where: {
      id: data.id,
    },
  });
};

const _delete = async (data: IdParam) => {
  return databaseClient.resource.deleteMany({
    where: {
      id: data.id,
    }
  })
};

export const resourceRepository = {
  create,
  findAll,
  findById,
  update,
  delete: _delete,
};
