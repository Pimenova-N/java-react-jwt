export interface IFetchAuthorsRequest{
    page: number;
    size: number;
    sort: string;
    direction: string;
} 

export interface ICreateAuthorRequest {
   firstName: string;
   lastName: string;
   description: string;
}

export interface IUpdateAuthorRequest{
   id: number;
   firstName: string;
   lastName: string;
}

export interface IDeleteAuthorRequest{
   id: number;
}

export interface IFetchAuthorRequest{
   id: string;
}