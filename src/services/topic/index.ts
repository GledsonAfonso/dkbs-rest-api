import { NotFoundError } from "@middlewares/error-handler";
import { Topic } from "@models/topic";
import topicRepository from "@repositories/topic";
import { CreateTopicParams, GetTopicByIdParams, UpdateTopicParams } from "@services/topic/types";

const createTopic = async (data: CreateTopicParams): Promise<Topic> => {
  return topicRepository.createTopic(data);
};

const getTopicById = async (data: GetTopicByIdParams): Promise<Topic> => {
  const topic = await topicRepository.findLatestTopic(data);

  if (!topic) {
    throw new NotFoundError({
      message: `Topic with id ${data.id} was not found.`,
    });
  }

  return topic;
};

const updateTopic = async (data: UpdateTopicParams): Promise<Topic> => {
  return topicRepository.updateTopic(data);
};

export const topicService = {
  createTopic,
  getTopicById,
  updateTopic,
};
