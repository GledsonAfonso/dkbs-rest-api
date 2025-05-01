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
  return databaseClient.$queryRaw<TopicWithChildren | null>`
    WITH RECURSIVE json_tree AS (
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
      WHERE t."id" = ${data.id}
      ORDER BY t."createdAt" DESC

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
      JOIN json_tree jt ON t.parent_id = jt.id
    ),
    final_tree AS (
      SELECT
        jt_outer.*,
        (
          SELECT jsonb_agg(jsonb_build_object(
            'id', jt_inner."id",
            'name', jt_inner."name",
            'content', jt_inner."content",
            'version', jt_inner."version",
            'parentTopicId', jt_inner."parentTopicId",
            'parentTopicVersion', jt_inner."parentTopicVersion",
            'createdAt', jt_inner."createdAt",
            'updatedAt', jt_inner."updatedAt",
            'childTopics', jt_inner."childTopics"
          ))
          FROM json_tree jt_inner
          WHERE jt_inner.parent_id = jt_outer.id
        ) AS "childTopics"
      FROM json_tree jt_outer
    )

    SELECT jsonb_build_object(
      'id', ft."id",
      'name', ft."name",
      'content', ft."content",
      'version', ft."version",
      'parentTopicId', ft."parentTopicId",
      'parentTopicVersion', ft."parentTopicVersion",
      'createdAt', ft."createdAt",
      'updatedAt', ft."updatedAt",
      'childTopics', ft."childTopics"
    )
    FROM final_tree ft
    WHERE ft.id = ${data.id};
  `;
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
