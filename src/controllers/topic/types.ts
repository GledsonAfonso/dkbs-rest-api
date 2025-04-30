import { Topic as ModelTopic } from "@models/topic";
import { z } from "zod";

export type Topic = Omit<
  ModelTopic,
  | "id"
  | "createdAt"
  | "updatedAt"
>;

export const createTopicSchema = z.object({
  name: z.string(),
  content: z.string(),
  parentTopicId: z.number().optional(),
  parentTopicVersion: z.number().optional(),
});

export const getTopicByIdSchema = z.object({
  id: z.coerce.number(),
});
