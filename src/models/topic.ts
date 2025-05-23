import { Topic as DatabaseEntity } from "@database";

export type Topic = DatabaseEntity;

export type TopicWithChildren = Topic & {
  childTopics: Topic[];
};
