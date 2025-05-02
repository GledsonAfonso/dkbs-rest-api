import { getDatabaseClient } from "@config/database";
import { User } from "@models/user";
import { CreateParams, IdParam, UpdateParams } from "@repositories/user/types";

const databaseClient = getDatabaseClient();

const create = async (data: CreateParams): Promise<User> => {
  return databaseClient.user.create({
    data,
  });
};

const findAll = async (): Promise<User[]> => {
  return databaseClient.user.findMany({});
};

const findById = async (data: IdParam): Promise<User | null> => {
  return databaseClient.user.findUnique({
    where: {
      id: data.id,
    },
  });
};

const update = async (data: UpdateParams): Promise<User> => {
  return databaseClient.user.update({
    data,
    where: {
      id: data.id,
    },
  });
};

const _delete = async (data: IdParam) => {
  return databaseClient.user.deleteMany({
    where: {
      id: data.id,
    }
  })
};

export const userRepository = {
  create,
  findAll,
  findById,
  update,
  delete: _delete,
};
