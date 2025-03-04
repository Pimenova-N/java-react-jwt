import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBookRequest } from '../redux/actions/BookAction';
import { AppDispatch } from '../redux/store'
import IBook from '../types/Book/IBook';
import BookItem from './BookItem';


interface BookProps {
  authorId: number;
  books: IBook[];
  setSelectedBook: React.Dispatch<React.SetStateAction<IBook | null>>;
  setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookList: React.FC<BookProps> = ({ authorId, books, setSelectedBook, setIsPopupVisible }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: number) => {
    dispatch(deleteBookRequest({ authorId, id }));
  }

  return (
    <>
      {books.map((book) => (
        <BookItem book={book} key={book.id} handleDelete={handleDelete} openPopupWithBok={(book) => {
          setSelectedBook(book);
          setIsPopupVisible(true);
        }} />
      ))}
    </>
  );
};

export default BookList;