import { CreateTopicParams as RepositoryCreateTopicParams, UpdateTopicParams as RepositoryUpdateTopicParams } from "@repositories/topic/types";

export type CreateTopicParams = RepositoryCreateTopicParams;

export type GetTopicByIdParams = {
  id: number;
};

export type UpdateTopicParams = RepositoryUpdateTopicParams & {
  id: number;
};
