import IBook from "./IBook";

export interface IBookFailureResponse{
    message: string;
}

export interface IDeleteBookSuccessResponse{
    message: string;
    authorId: number;
    id: number;
}

export interface ICreateBookSuccessResponse{
    book: IBook;
    authorId: number;
    message: string;
}

export interface IUpdateBookSuccessResponse{
    book: IBook;
    authorId: number;
    message: string;
}