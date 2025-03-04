import IBook from "../Book/IBook";

export default interface IAuthor {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    books: IBook[]; 
} 