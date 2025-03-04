import IAuthor from "./IAuthor";

export interface AuthorsState {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  authors: IAuthor[];
  successMessage: string | null;
  isLoading: boolean;
  error: string | null;
}