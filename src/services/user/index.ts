import { NotFoundError } from "@middlewares/error-handler";
import { User } from "@models/user";
import { userRepository } from "@repositories/user";
import { CreateParams, IdParam, UpdateParams } from "@services/user/types";

const create = async (data: CreateParams): Promise<User> => {
  return userRepository.create(data);
};

const findAll = async (): Promise<User[]> => {
  return userRepository.findAll();
};

const findById = async (data: IdParam): Promise<User> => {
  const user = await userRepository.findById(data);

  if (!user) {
    throw new NotFoundError({
      message: `User with id ${data.id} was not found.`,
    });
  }

  return user;
};

const update = async (data: UpdateParams): Promise<User> => {
  return userRepository.update(data);
};

const _delete = async (data: IdParam): Promise<void> => {
  await userRepository.delete(data);
};

export const userService = {
  create,
  findAll,
  findById,
  update,
  delete: _delete,
};
