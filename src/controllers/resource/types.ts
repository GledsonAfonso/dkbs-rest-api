import { Resource as Model } from "@models/resource";
import { z } from "zod";

export type Resource = Omit<
  Model,
  | "id"
  | "createdAt"
  | "updatedAt"
>;

export const createSchema = z.object({
  description: z.string(),
  url: z.string(),
  type: z.string(),
  topicId: z.number(),
  topicVersion: z.number(),
});

export const findByIdSchema = z.object({
  id: z.coerce.number(),
});

export const deleteSchema = findByIdSchema;

export const updateSchema = z.object({
  id: z.coerce.number(),
  description: z.string().optional(),
  url: z.string().optional(),
  type: z.string().optional(),
  topicId: z.number().optional(),
  topicVersion: z.number().optional(),
});
