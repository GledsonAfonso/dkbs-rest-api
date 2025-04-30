import { Topic as ModelTopic } from "@models/topic";
import { z } from "zod";

export type Topic = Omit<
  ModelTopic,
  | "id"
  | "createdAt"
  | "updatedAt"
>;

export const topicSchema = z.object({
  name: z.string(),
  content: z.string(),
  parentTopicId: z.number().optional(),
  parentTopicVersion: z.number().optional(),
});

export const byIdSchema = z.object({
  id: z.coerce.number(),
});

export const updateTopicSchema = z.object({
  id: z.coerce.number(),
  name: z.string().optional(),
  content: z.string().optional(),
  parentTopicId: z.number().optional(),
  parentTopicVersion: z.number().optional(),
});
