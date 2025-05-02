import { Topic } from "@models/topic";

export type IdParam = {
  id: number;
};

export type IdAndVersionParams = IdParam & {
  version: number;
};

export type CreateParams = Pick<
  Topic,
  | "name"
  | "content"
> & {
  version?: number;
  parentTopicId?: number | null;
  parentTopicVersion?: number | null;
};

export type FindShortestPathToDestinationParams = {
  startingTopic: number;
  destinationTopic: number;
};

export type UpdateParams = Partial<Topic> & IdParam;
