import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store'
import { registerRequest } from '../redux/actions/UserActions';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTypedSelector } from '../redux/hooks/useTypedSelector';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required field'),
  email: Yup.string().email('Must be a valid email')
    .required('Required field'),
  password: Yup.string()
    .required('Required field'),
});

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useTypedSelector(state => state.users.error)

  const initialValues = {
    username: '',
    email: '',
    password: '',
  }

  const onSubmit = (values: typeof initialValues) => {
    dispatch(registerRequest(values, navigate));
  }

  return (
    <>
      <div className="form-bg">

        <div className="form-area">
          <Formik validationSchema={SignupSchema} initialValues={initialValues} onSubmit={onSubmit} >
            {({ errors, touched, values }) => (
              <Form className="main-form">
                <div className="form-heading">
                  <span>Register</span>
                  <p>Please fill out this form to register</p>
                </div>

                <div className="input-box">
                  {error && <div className="field-error">{error}</div>}
                  <label>Username</label>

                  <Field type="text" name="username" placeholder="Username"></Field>
                  {errors.username && touched.username ? (
                    <div className="field-error">{errors.username}</div>
                  ) : null}

                  <label>Email Address</label>

                  <Field type="text" name="email" placeholder="Email address"></Field>
                  {errors.email && touched.email ? (
                    <div className="field-error">{errors.email}</div>
                  ) : null}

                  <label>Password</label>

                  <Field type="password" name="password" placeholder="Enter Password"></Field>
                  {errors.password && touched.password ? (
                    <div className="field-error">{errors.password}</div>
                  ) : null}

                </div>
                <div className="form-footer">
                  <p>Already have an account? <Link to="/login">Login</Link> here</p>
                  <button className="submit-btn" disabled={!!errors.username || !!errors.password || !!errors.email
                    || !values.username || !values.password || !values.email}>Register</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

      </div>
    </>
  );
};

export default RegisterPage;