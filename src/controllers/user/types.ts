import { User as Model, Role } from "@models/user";
import { z } from "zod";

export type User = Omit<
  Model,
  | "id"
  | "createdAt"
  | "updatedAt"
>;

export const createSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.nativeEnum(Role),
});

export const findByIdSchema = z.object({
  id: z.coerce.number(),
});

export const deleteSchema = findByIdSchema;

export const updateSchema = z.object({
  id: z.coerce.number(),
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
});
