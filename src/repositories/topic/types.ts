import { Topic } from "@models/topic";

export type IdParam = {
  id: number;
};

export type IdAndVersionParams = IdParam & {
  version: number;
};

export type CreateTopicParams = Pick<
  Topic,
  | "name"
  | "content"
> & {
  version?: number;
  parentTopicId?: number | null;
  parentTopicVersion?: number | null;
};

export type UpdateTopicParams = Partial<Topic> & IdParam;

export type TopicWithChildren = Topic & {
  childTopics: Topic[];
};
