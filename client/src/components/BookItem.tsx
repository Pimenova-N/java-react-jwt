import React from 'react';
import IBook from '../types/Book/IBook';

interface BookItemProps {
  book: IBook;
  openPopupWithBok: (book: IBook) => void;
  handleDelete: (id: number) => void;
}
const BookItem: React.FC<BookItemProps> = ({ book, openPopupWithBok, handleDelete }) => {

  return (
    <div key={book.id}>
      <h3>{book.title}</h3>
      <p>{book.description}</p>
      <div>
        <button onClick={() => openPopupWithBok(book)}>Edit</button>
        <button onClick={() => handleDelete(book.id)}>Delete</button>
      </div>
    </div>
  );
}

export default BookItem;