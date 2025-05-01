import { getDatabaseClient } from "@config/database";
import { NotFoundError } from "@middlewares/error-handler";
import { Topic } from "@models/topic";
import { CreateTopicParams, IdAndVersionParams, IdParam, TopicWithChildren, UpdateTopicParams } from "@repositories/topic/types";

const databaseClient = getDatabaseClient();

const create = async (data: CreateTopicParams): Promise<Topic> => {
  return databaseClient.topic.create({
    data: {
      ...data,
      version: data.version ?? 1, // first version should always be 1
    },
  });
};

const findAllVersionsById = async (data: IdParam): Promise<Topic[]> => {
  return databaseClient.topic.findMany({
    where: {
      id: data.id,
    },
  });
};

const findByIdAndVersion = async (data: IdAndVersionParams): Promise<Topic | null> => {
  return databaseClient.topic.findUnique({
    where: {
      topicId: {
        id: data.id,
        version: data.version,
      }
    },
  });
};

const findLatest = async (data: IdParam): Promise<Topic | null> => {
  return databaseClient.topic.findFirst({
    where: {
      id: data.id,
    },
    orderBy: {
      createdAt: "desc",
    }
  });
};

const findLatestWithChildren = async (data: IdParam): Promise<TopicWithChildren | null> => {
  const latestTopic = await findLatest(data);

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

const update = async (data: UpdateTopicParams): Promise<Topic> => {
  const previousTopic = await findLatest({
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

  return create(newTopic);
};

const _delete = async (data: IdParam) => {
  const topics = await findAllVersionsById(data);

  return databaseClient.topic.deleteMany({
    where: {
      id: data.id,
      version: {
        in: topics.map(it => it.version),
      }
    }
  })
};

export const topicRepository = {
  create,
  findByIdAndVersion,
  findLatest,
  findLatestWithChildren,
  update,
  delete: _delete,
};
