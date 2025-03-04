export interface IDeleteBookRequest{
    authorId: number;
    id: number;
}

export interface ICreateBookRequest {
    authorId: number;
    title: string;
    description: string;
}

export interface IUpdateBookRequest{
    authorId: number;
    id: number;
    title: string;
    description: string;
}