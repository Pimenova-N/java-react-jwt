import React from 'react';
import IAuthor from '../types/Author/IAuthor';
import { useNavigate } from 'react-router-dom';

interface Props {
  author: IAuthor;
}

const substringStr = (description: string, maxLength: number = 220): string => {
  if (description.length <= maxLength) {
    return description;
  }

  return `${description.substring(0, maxLength)}...`;
}

const AuthorCard: React.FC<Props> = ({ author }) => {

  const navigate = useNavigate();
  return (
    <li className="author-item" key={author.id} onClick={() => navigate('/authors/' + author.id)}>
      <div className="author-content">
        <div className="author-title">{author.firstName} {author.lastName}</div>
        <p className="author-text">{substringStr(author.description)}</p>
      </div>
    </li>
  );
}

export default AuthorCard;