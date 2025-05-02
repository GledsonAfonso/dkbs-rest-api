import {
  CreateParams as RepositoryCreateParams,
  FindShortestPathToDestinationParams as RepositoryFindShortestPathToDestinationParams,
  UpdateParams as RepositoryUpdateParams
} from "@repositories/topic/types";

export type IdParam = {
  id: number;
};

export type IdAndVersionParams = IdParam & {
  version: number;
};

export type CreateParams = RepositoryCreateParams;
export type FindShortestPathToDestinationParams = RepositoryFindShortestPathToDestinationParams;
export type FindShortestPathToDestinationResponse = { path: string };
export type UpdateParams = RepositoryUpdateParams & IdParam;
