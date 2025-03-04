import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store'
import { fetchAuthorsRequest } from '../redux/actions/AuthorAction';
import { IFetchAuthorsRequest } from '../types/Author/AuthorsRequest'
import { useTypedSelector } from '../redux/hooks/useTypedSelector';
import { ToastContainer, toast } from 'react-toastify';
import AuthorPopup from './AuthorPopup'
import AuthorsList from './AuthorsList';
import Header from './Header';
import Paginate from './Paginate';

const AuthorsPage: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { authors, totalPages, successMessage, error } = useTypedSelector(state => state.authors);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [sortBy, setSortBy] = useState('firstName');
  const [size, setSize] = useState(9);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState('ASC');
  const data: IFetchAuthorsRequest = { page: page, size: size, sort: sortBy, direction: direction };

  React.useEffect(() => {
    dispatch(fetchAuthorsRequest(data));
  }, [dispatch, page, size, sortBy, direction]);

  React.useEffect(() => {
    setPage(0)
  }, [size])

  React.useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      onClose();
    } else if (error) {
      toast.error(error);
      onClose();
    }
  }, [error, successMessage]);

  const handlePagination = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected)
  }

  const handleSize = (sizePerPage: number) => {
    setSize(sizePerPage);
  }

  const onClose = () => { 
    setIsPopupVisible(false);
  }

  const handleAdd = () => {
    setIsPopupVisible(true);
  }
  return (
    <div>
      <Header />
      <div className="button-groups">
        <button className="active-btn" onClick={handleAdd}>Add author</button>
        <div className="button-group">          
          <span>Per Page: </span>
          <div>
          <button className={'btn-small ' + (size === 6 ? 'active-btn' : '')} onClick={() => handleSize(6)}>6</button>
          <button className={'btn-small ' + (size === 9 ? 'active-btn' : '')} onClick={() => handleSize(9)}>9</button>
          <button className={'btn-small ' + (size === 18 ? 'active-btn' : '')} onClick={() => handleSize(18)}>18</button>
          </div>
        </div>
        <div className="button-group">
          <span>Sort By: </span>
          <div>
          <button className={'btn-small ' + (sortBy === 'firstName' ? 'active-btn' : '')} onClick={() => setSortBy('firstName')}>First Name</button>
          <button className={'btn-small ' + (sortBy === 'lastName' ? 'active-btn' : '')} onClick={() => setSortBy('lastName')}>Last Name</button>
          </div>
        </div>
        <div className="button-group">
          <span>Order By: </span>
          <div>
          <button className={'btn-small ' + (direction === 'ASC' ? 'active-btn' : '')} onClick={() => setDirection('ASC')}>ASC</button>
          <button className={'btn-small ' + (direction === 'DESC' ? 'active-btn' : '')} onClick={() => setDirection('DESC')}>DESC</button>
          </div>
        </div>
      </div>
      <AuthorsList authors={authors}/>
      <Paginate page={page} totalPages={totalPages} handlePagination={handlePagination} />
      <ToastContainer />
      {
        isPopupVisible &&
        <AuthorPopup onClose={onClose} author = {null} isEditing={false} />
      }
    </div>
  );
};

export default AuthorsPage;