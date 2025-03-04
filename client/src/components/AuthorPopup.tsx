import React from 'react';
import { useDispatch } from 'react-redux';
import { createAuthorRequest, updateAuthorRequest } from '../redux/actions/AuthorAction';
import IAuthor from '../types/Author/IAuthor';
import { AppDispatch } from '../redux/store'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

interface Props {
  isEditing: boolean;
  onClose: () => void;
  author?: IAuthor | null;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'At least 2 characters')
    .required('Required field'),
  lastName: Yup.string()
    .min(2, 'At least 2 characters')
    .required('Required field'),
});

const AuthorPopup: React.FC<Props> = ({ isEditing, onClose, author }) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    firstName: author ? author.firstName : '',
    lastName: author ? author.lastName : '',
    description: author ? author.description : '',
  }

  const onSubmit = (values: typeof initialValues) => {
    if (isEditing && author) {
      const id = author.id;
      dispatch(updateAuthorRequest({ ...values, id }));
    } else {
      dispatch(createAuthorRequest(values));
    }
  }

  return (

    <div className="popup-overlay">
      <div className="popup">
        <div className="form-area">
          <Formik validationSchema={SignupSchema} initialValues={initialValues} onSubmit={onSubmit} >
            {({ errors, touched, values }) => (
              <Form className="main-form">
                <div className="form-heading">
                  <span>{isEditing ? "Edit Author" : "New Author"}</span>
                </div>

                <div className="input-box">
                  <label>First Name</label>

                  <Field type="text" name="firstName" placeholder="First Name"></Field>
                  {errors.firstName && touched.firstName ? (
                    <div className="field-error">{errors.firstName}</div>
                  ) : null}


                  <label>Last Name</label>

                  <Field type="text" name="lastName" placeholder="Last Name"></Field>
                  {errors.lastName && touched.lastName ? (
                    <div className="field-error">{errors.lastName}</div>
                  ) : null}

                  <label>Description</label>

                  <Field as="textarea" name="description" placeholder="Description"></Field>
                  {errors.description && touched.description ? (
                    <div className="field-error">{errors.description}</div>
                  ) : null}

                </div>
                <div className="form-footer">
                  <button onClick={onClose}>Cancel</button>
                  <button className="submit-btn" disabled={!!errors.firstName || !!errors.lastName || !values.firstName || !values.lastName}>Save</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>

  );
}

export default AuthorPopup; 