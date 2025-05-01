import { NotFoundError } from "@middlewares/error-handler";
import { Topic } from "@models/topic";
import topicRepository from "@repositories/topic";
import { IdAndVersionParams } from "@repositories/topic/types";
import { CreateTopicParams, UpdateTopicParams } from "@services/topic/types";
import { IdParams } from "@services/types";

const createTopic = async (data: CreateTopicParams): Promise<Topic> => {
  return topicRepository.createTopic(data);
};

const getTopicById = async (data: IdParams): Promise<Topic> => {
  const topic = await topicRepository.findLatestTopic(data);

  if (!topic) {
    throw new NotFoundError({
      message: `Topic with id ${data.id} was not found.`,
    });
  }

  return topic;
};

const getTopicByIdAndVersion = async (data: IdAndVersionParams): Promise<Topic> => {
  const topic = await topicRepository.findTopicByIdAndVersion(data);

  if (!topic) {
    throw new NotFoundError({
      message: `Topic with id ${data.id} and version ${data.version} was not found.`,
    });
  }

  return topic;
};

const updateTopic = async (data: UpdateTopicParams): Promise<Topic> => {
  return topicRepository.updateTopic(data);
};

const deleteTopic = async (data: IdParams): Promise<void> => {
  await topicRepository.deleteTopic(data);
};

export const topicService = {
  createTopic,
  getTopicById,
  getTopicByIdAndVersion,
  updateTopic,
  deleteTopic,
};
