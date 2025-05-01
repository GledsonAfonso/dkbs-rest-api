import { CreateTopicParams as RepositoryCreateTopicParams, UpdateTopicParams as RepositoryUpdateTopicParams } from "@repositories/topic/types";

export type IdParam = {
  id: number;
};

export type IdAndVersion = IdParam & {
  version: number;
};

export type CreateTopicParams = RepositoryCreateTopicParams;
export type UpdateTopicParams = RepositoryUpdateTopicParams & IdParam;
