import { getDatabaseClient } from "@config/database";
import { NotFoundError } from "@middlewares/error-handler";
import { Topic } from "@models/topic";
import { CreateTopicParams, IdAndVersionParams, IdParam, UpdateTopicParams } from "@repositories/topic/types";

const databaseClient = getDatabaseClient();

const createTopic = async (data: CreateTopicParams): Promise<Topic> => {
  return databaseClient.topic.create({
    data: {
      ...data,
      version: data.version ?? 1, // first version should always be 1
    },
  });
};

const findTopicByIdAndVersion = async (data: IdAndVersionParams): Promise<Topic | null> => {
  return databaseClient.topic.findUnique({
    where: {
      topicId: {
        id: data.id,
        version: data.version,
      }
    },
  });
};

const findLatestTopic = async (data: IdParam): Promise<Topic | null> => {
  return databaseClient.topic.findFirst({
    where: {
      id: data.id,
    },
    orderBy: {
      createdAt: "desc",
    }
  });
};

const updateTopic = async (data: UpdateTopicParams): Promise<Topic> => {
  const previousTopic = await findLatestTopic({
    id: data.id,
  });

  if (!previousTopic) {
    throw new NotFoundError({
      message: `Topic with id ${data.id} was not found.`,
    });
  }

  const newTopic: Topic = {
    ...previousTopic,
    ...data,
    version: previousTopic.version + 1, // iterating the field for a new version

    // overriding dates to facilitate future searches for latest versions
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  console.log(newTopic);

  return createTopic(newTopic);
};

const deleteTopic = async (data: IdParam) => {
  return databaseClient.topic.deleteMany({
    where: {
      id: data.id,
    }
  })
};

export default {
  createTopic,
  findTopicByIdAndVersion,
  findLatestTopic,
  updateTopic,
  deleteTopic,
};
