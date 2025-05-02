import { Topic as Model } from "@models/topic";
import { z } from "zod";

export type Topic = Omit<
  Model,
  | "id"
  | "createdAt"
  | "updatedAt"
>;

export const createSchema = z.object({
  name: z.string(),
  content: z.string(),
  parentTopicId: z.number().optional(),
  parentTopicVersion: z.number().optional(),
});

export const findByIdSchema = z.object({
  id: z.coerce.number(),
});

export const findByIdAndVersionSchema = z.object({
  id: z.coerce.number(),
  version: z.coerce.number().optional(),
});

export const findShortestPathToDestinationSchema = z.object({
  startingTopic: z.number(),
  destinationTopic: z.number(),
});

export const updateSchema = z.object({
  id: z.coerce.number(),
  name: z.string().optional(),
  content: z.string().optional(),
  parentTopicId: z.number().optional(),
  parentTopicVersion: z.number().optional(),
});
