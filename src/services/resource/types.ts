import { CreateParams as RepositoryCreateParams, UpdateParams as RepositoryUpdateParams } from "@repositories/resource/types";

export type IdParam = {
  id: number;
};

export type CreateParams = RepositoryCreateParams;
export type UpdateParams = RepositoryUpdateParams & IdParam;
