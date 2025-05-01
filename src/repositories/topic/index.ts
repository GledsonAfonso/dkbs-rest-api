import { getDatabaseClient } from "@config/database";
import { NotFoundError } from "@middlewares/error-handler";
import { Topic } from "@models/topic";
import { CreateTopicParams, IdAndVersionParams, IdParam, TopicWithChildren, UpdateTopicParams } from "@repositories/topic/types";

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

const findLatestTopicWithChildren = async (data: IdParam): Promise<TopicWithChildren | null> => {
  const latestTopic = await findLatestTopic(data);

  if (!latestTopic) {
    return null;
  }

  const result = await databaseClient.$queryRaw<TopicWithChildren[] | null>`
    WITH RECURSIVE all_child_connections AS (
      SELECT
        t."id",
        t."name",
        t."content",
        t."version",
        t."parentTopicId",
        t."parentTopicVersion",
        t."createdAt",
        t."updatedAt",
        '[]'::jsonb AS "childTopics"
      FROM "Topic" t
      WHERE t."id" = ${latestTopic.id} AND t."version" = ${latestTopic.version}

      UNION ALL

      SELECT
        t."id",
        t."name",
        t."content",
        t."version",
        t."parentTopicId",
        t."parentTopicVersion",
        t."createdAt",
        t."updatedAt",
        '[]'::jsonb AS "childTopics"
      FROM "Topic" t
      INNER JOIN all_child_connections acc ON t."parentTopicId" = acc."id"
    )

    SELECT *
    FROM all_child_connections acc
  `;

  return combineParentWithChildren(result);
};

const combineParentWithChildren = (topics: TopicWithChildren[] | null): TopicWithChildren | null => {
  if (!topics) {
    return null;
  }

  const topicMap = new Map<number, TopicWithChildren>();

  for (const topic of topics) {
    topicMap.set(topic.id, topic);
  }

  let root: TopicWithChildren | null = null;

  for (const topic of topics) {
    if (topic.parentTopicId === null) {
      root = topic;
      continue;
    }
    
    const parent = topicMap.get(topic.parentTopicId);
    parent!.childTopics.push(topic);
  }

  return root;
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
  findLatestTopicWithChildren,
  updateTopic,
  deleteTopic,
};
