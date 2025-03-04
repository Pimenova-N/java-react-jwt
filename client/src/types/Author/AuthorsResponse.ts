import IAuthor from "./IAuthor"

export interface IFetchAuthorsSuccessResponse {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
    content: IAuthor[];
}

export interface IFetchAuthorSuccessResponse extends IAuthor{} 

export interface IAuthorsFailureResponse{
    message: string;
}

export interface ICreateAuthorSuccessResponse extends IAuthor{

}

export interface IUpdateAuthorSuccessResponse extends IAuthor{
    message: string;
}
