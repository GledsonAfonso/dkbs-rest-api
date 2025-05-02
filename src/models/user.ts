import { User as DatabaseEntity } from "@database";

export type User = DatabaseEntity;
export enum Role {
  Admin = "Admin",
  Editor = "Editor",
  Viewer = "Viewer",
}
