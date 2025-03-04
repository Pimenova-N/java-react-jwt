import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBookRequest, updateBookRequest } from '../redux/actions/BookAction';
import IBook from '../types/Book/IBook';
import { AppDispatch } from '../redux/store'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { IUpdateBookRequest } from '../types/Book/BookRequest';

interface Props {
  isEditing: boolean;
  book?: IBook | null;
  authorId: number;
  onClose: () => void;
}

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'At least 5 characters')
    .required('Required field')
});

const BookPopup: React.FC<Props> = ({ isEditing, onClose, book, authorId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    title: book ? book.title : '',
    description: book ? book.description : '',
  }

  const onSubmit = (values: typeof initialValues) => {
    if (isEditing && book) {
      const id = book.id;
      dispatch(updateBookRequest({ ...values, authorId, id }));
    } else {
      dispatch(createBookRequest({ ...values, authorId }));
    }
  }

  return (
    <div>
      <div className="popup-overlay"></div>
      <div className="popup">
        <div className="form-area">
          <Formik validationSchema={SignupSchema} initialValues={initialValues} onSubmit={onSubmit} >
            {({ errors, touched, values }) => (
              <Form className="main-form">
                <div className="form-heading">
                  <span>{isEditing ? "Edit Book" : "New Book"}</span>
                </div>

                <div className="input-box">
                  <label>Title</label>

                  <Field type="text" name="title" placeholder="Title"></Field>
                  {errors.title && touched.title ? (
                    <div className="field-error">{errors.title}</div>
                  ) : null}


                  <label>Description</label>

                  <Field as="textarea" name="description" placeholder="Description"></Field>
                  {errors.description && touched.description ? (
                    <div className="field-error">{errors.description}</div>
                  ) : null}

                </div>
                <div className="form-footer">
                  <button onClick={onClose}>Cancel</button>
                  <button className="submit-btn" disabled={!!errors.title || !values.title}>Save</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default BookPopup;