import { CreateTopicParams as RepositoryCreateTopicParams, UpdateTopicParams as RepositoryUpdateTopicParams } from "@repositories/topic/types";
import { IdParams } from "@services/types";

export type CreateTopicParams = RepositoryCreateTopicParams;
export type UpdateTopicParams = RepositoryUpdateTopicParams & IdParams;
