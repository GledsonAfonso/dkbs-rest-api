import { Role, User } from "@models/user";

export type IdParam = {
  id: number;
};

export type CreateParams = Omit<
  User,
  | "id"
  | "role"
  | "createdAt"
  | "updatedAt"
> & {
  role: Role;
};

export type UpdateParams = Partial<
  Omit<
    User,
    | "role"
    | "createdAt"
    | "updatedAt"
  > & {
    role: Role;
  }
>;
