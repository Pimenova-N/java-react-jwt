import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store'
import { loginRequest, removeError } from '../redux/actions/UserActions';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTypedSelector } from '../redux/hooks/useTypedSelector';

const SignupSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .required('Required field'),
  password: Yup.string()
    .required('Required field'),
});

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useTypedSelector(state =>  state.users.error)

  const initialValues = {
    usernameOrEmail: '',
    password: '',
  }

  const onSubmit = (values: typeof initialValues) => {
    dispatch(loginRequest(values, navigate));
  }

  const navigateRegister = ()  =>{
    dispatch(removeError());
    navigate('/register');
  }
  return (
    <>

      <div className="form-bg">

        <div className="form-area">
          <Formik validationSchema={SignupSchema} initialValues={initialValues} onSubmit={onSubmit} >
            {({ errors, touched, values }) => (
              <Form className="main-form">
                <div className="form-heading">
                  <span>Login</span>
                  <p>Enter Login details to get access</p>
                </div>
                
                <div className="input-box">
                {error && <div className="field-error">{error}</div>}
                  <label>Username or Email Address</label>

                  <Field type="text" name="usernameOrEmail" placeholder="Username / Email address"></Field>
                  {errors.usernameOrEmail && touched.usernameOrEmail ? (
                    <div className="field-error">{errors.usernameOrEmail}</div>
                  ) : null}


                  <label>Password</label>

                  <Field type="password" name="password" placeholder="Enter Password"></Field>
                  {errors.password && touched.password ? (
                    <div className="field-error">{errors.password}</div>
                  ) : null}

                </div>
                <div className="form-footer">
                  <p>Don’t have an account? <a onClick={navigateRegister}>Sign Up</a>  here</p>
                  <button className="submit-btn" disabled={!!errors.usernameOrEmail || !!errors.password || !values.usernameOrEmail || !values.password}>Login</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

      </div>
    </>
  );
};

export default LoginPage;