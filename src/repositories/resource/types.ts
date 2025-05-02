import { Resource } from "@models/resource";

export type IdParam = {
  id: number;
};

export type CreateParams = Omit<
  Resource,
  | "id"
  | "createdAt"
  | "updatedAt"
>;

export type UpdateParams = Partial<
  Omit<
    Resource,
    | "createdAt"
    | "updatedAt"
  >
>;

export type UpdateTopicVersionParams = Pick<
  Resource,
  | "topicId"
  | "topicVersion"
>;
