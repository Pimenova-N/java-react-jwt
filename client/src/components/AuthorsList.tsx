import React from 'react';
import AuthorCard from './AuthorCard'
import IAuthor from '../types/Author/IAuthor';

interface Props {
  authors: IAuthor[];
}

const AuthorsList: React.FC<Props> = ({ authors }) => {

  return (
    <>
      {authors?.length === 0 && <div>No Authors. Please add a new Author</div>}
      <ul className="author-items">
        {authors.map((author, index) => (
          <AuthorCard author={author} key={author.id} />
        ))}
      </ul>
    </>
  );
};

export default AuthorsList;
