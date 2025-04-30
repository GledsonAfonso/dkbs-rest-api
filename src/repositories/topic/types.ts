import { Topic } from "@models/topic";

export type IdParam = {
  id: number;
};

export type IdAndVersionParams = IdParam & {
  version: number;
};

export type CreateTopicParams = Omit<
  Topic,
  | "id"
  | "version"
  | "parentTopicId"
  | "parentTopicVersion"
  | "createdAt"
  | "updatedAt"
> & {
  parentTopicId?: number | null;
  parentTopicVersion?: number | null;
};

export type UpdateTopicParams = Partial<Topic> & IdAndVersionParams;
