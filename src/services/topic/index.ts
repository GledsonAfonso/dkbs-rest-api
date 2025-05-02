import { NotFoundError } from "@middlewares/error-handler";
import { Topic, TopicWithChildren } from "@models/topic";
import { topicRepository } from "@repositories/topic";
import {
  CreateParams,
  FindShortestPathToDestinationParams,
  FindShortestPathToDestinationResponse,
  IdAndVersionParams,
  IdParam,
  UpdateParams
} from "@services/topic/types";

const create = async (data: CreateParams): Promise<Topic> => {
  return topicRepository.create(data);
};

const findById = async (data: IdParam): Promise<Topic> => {
  const topic = await topicRepository.findLatest(data);

  if (!topic) {
    throw new NotFoundError({
      message: `Topic with id ${data.id} was not found.`,
    });
  }

  return topic;
};

const findByIdAndVersion = async (data: IdAndVersionParams): Promise<Topic> => {
  const topic = await topicRepository.findByIdAndVersion(data);

  if (!topic) {
    throw new NotFoundError({
      message: `Topic with id ${data.id} and version ${data.version} was not found.`,
    });
  }

  return topic;
};

const findWithChildren = async (data: IdParam): Promise<TopicWithChildren> => {
  const topic = await topicRepository.findLatestWithChildren(data);

  if (!topic) {
    throw new NotFoundError({
      message: `Topic with id ${data.id} was not found.`,
    });
  }

  return topic;
};

const findShortestPathToDestination = async (data: FindShortestPathToDestinationParams): Promise<FindShortestPathToDestinationResponse> => {
  const path = await topicRepository.findShortestPathToDestination(data);

  return {
    path,
  };
};

const update = async (data: UpdateParams): Promise<Topic> => {
  return topicRepository.update(data);
};

const _delete = async (data: IdParam): Promise<void> => {
  await topicRepository.delete(data);
};

export const topicService = {
  create,
  findById,
  findByIdAndVersion,
  findWithChildren,
  findShortestPathToDestination,
  update,
  delete: _delete,
};
