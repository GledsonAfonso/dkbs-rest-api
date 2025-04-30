import { NotFoundError } from "@middlewares/error-handler";
import { Topic } from "@models/topic";
import topicRepository from "@repositories/topic";
import {
  CreateTopicParams,
  IdParam,
} from "@repositories/topic/types";

const createTopic = async (data: CreateTopicParams): Promise<Topic> => {
  return topicRepository.createTopic(data);
};

const getTopicById = async (data: IdParam): Promise<Topic> => {
  const topic = await topicRepository.findLatestTopicWithChildTopics(data);

  if (!topic) {
    throw new NotFoundError({
      message: `Topic with id ${data.id} was not found.`,
    });
  }

  return topic;
};

export const topicService = {
  createTopic,
  getTopicById,
};
