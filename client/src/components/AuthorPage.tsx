import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../redux/hooks/useTypedSelector';
import { ToastContainer, toast } from 'react-toastify';
import { IDeleteAuthorRequest } from '../types/Author/AuthorsRequest';
import { fetchAuthorRequest, deleteAuthorRequest, removeMessages } from '../redux/actions/AuthorAction';
import IBook from '../types/Book/IBook';
import BookList from './BookList';
import BookPopup from './BookPopup';
import AuthorPopup from './AuthorPopup';
import Header from './Header';


const AuthorPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { error, authors, successMessage, isLoading } = useTypedSelector(state => state.authors)
    const { id } = useParams<{ id: string; }>();
    const [isPopupBookVisible, setIsPopupBookVisible] = useState(false);
    const [isPopupAuthorVisible, setIsPopupAuthorVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
    const [isEditingBook, setIsEditingBook] = useState(true);

    React.useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            onCloseBookPopup();
        } else if (error) {
            toast.error(error);
            onCloseBookPopup();
        }
    }, [error, successMessage]);


    React.useEffect(() => {
        if (id !== undefined) {
            const author = authors.find(author => author.id === +id);
            if (!author) {
                dispatch(fetchAuthorRequest({ id }))
            }
        }
    }, []);

    const onCloseBookPopup = () => {
        setIsEditingBook(true);
        setSelectedBook(null);
        setIsPopupBookVisible(false);
        setIsPopupAuthorVisible(false);
    }

    const handleDelete = (data: IDeleteAuthorRequest) => {
        dispatch(deleteAuthorRequest(data, navigate));
    }

    const navigateAuthors = () => {
        dispatch(removeMessages());
        navigate('/authors');
    }

    const author = id !== undefined ? authors.find(author => author.id === +id) : null;
    return (<div>
        <Header />
        {isLoading && <div>loading...</div>}
        {!author && <div>{error}</div>}
        {author &&

            <div className="author-container">
                <div className="author-main">
                    <div>
                        <button onClick={navigateAuthors}>Back to authors</button>
                        <h2>{author.firstName} {author.lastName}</h2>
                    </div>
                    <div className="author-description">
                        <p>{author.description}</p>
                    </div>
                    <div >
                        <button onClick={() => {
                            setIsPopupAuthorVisible(true);
                        }}>Edit</button>

                        <button onClick={() => {
                            handleDelete({ id: author.id });
                        }}>Delete</button>
                    </div>
                </div>
                <div className='author-books'>
                    <div className="book-item" >
                        <div className="title">
                            <h2>Books  </h2>
                            <button onClick={() => {
                                setIsEditingBook(false);
                                setIsPopupBookVisible(true);
                            }}>Add book</button>
                        </div>
                        <BookList authorId={author.id} books={author.books} setSelectedBook={setSelectedBook} setIsPopupVisible={setIsPopupBookVisible} />
                    </div>
                </div>
            </div>
        }

        {author && isPopupBookVisible &&
            <BookPopup onClose={onCloseBookPopup} authorId={author?.id} isEditing={isEditingBook} book={selectedBook} />
        }

        {author && isPopupAuthorVisible &&
            <AuthorPopup onClose={onCloseBookPopup} author={author} isEditing={true} />
        }

        <ToastContainer />
    </div>)
}

export default AuthorPage;