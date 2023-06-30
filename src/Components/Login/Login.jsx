import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import noteImg from '../../images/notes3.png';
import { loginPost, alertError, loadingTrue, loadingFalse } from '../../Redux/LoginSlice.js';
import { toast } from 'react-toastify';
import { Alert } from '@mui/material';
import Helmet from 'react-helmet';

export default function Login() {

  let { alert } = useSelector(({ login }) => login)
  let { loading } = useSelector(({ login }) => login)
  let dispatch = useDispatch();
  let navigate = useNavigate();

  async function submit(values) {
    dispatch(loadingTrue());
    let { payload } = await dispatch(loginPost(values));
    if (payload.message === 'success') {
      localStorage.setItem('token', payload.token);
      navigate('/');
      toast.success('Login success');
    }
    else {
      dispatch(alertError(payload.message))
    }
    dispatch(loadingFalse());
  }

  const FormSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, at least one letter and one number'),
  });



  return (
    <>
    <Helmet>
      <title>Notes - Login</title>
    </Helmet>
      <li className='fixed-top p-3 pe-lg-5 d-lg-flex d-none'>
        <i class="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className='ps-2 fs-4 fw-bold'>Notes</p>
      </li>

      <div className="container w-75">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-conteent-center align-items-center">
            <img className='w-100 pe-5' src={noteImg} alt="note img" loading='lazy' />
          </div>

          <div className="col-lg-7">
            <div className='min-vh-100 d-flex justify-content-center align-items-center text-center'>
              <div className="bg-white shadow w-100 mx-auto p-5 rounded-2">
                <h1 className='fw-bold'>Login Now</h1>
                <div className="pt-3">
                  <Formik
                    initialValues={{
                      email: '',
                      password: '',
                    }}
                    validationSchema={FormSchema}
                    onSubmit={submit}
                  >
                    {({ values, errors, touched, isSubmitting }) => (
                      <Form>
                        {alert ? <Alert className='py-0 mb-3' severity="error">{alert}</Alert> : null}

                        <div className="mb-3">
                          <Field type="email" className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`} name="email" placeholder="Email" />
                          <ErrorMessage name="email" component="div" className="invalid-feedback text-start" />
                        </div>
                        <div className="mb-3">
                          <Field type="password" className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`} name="password" placeholder="Password" />
                          <ErrorMessage name="password" component="div" className="invalid-feedback text-start" />
                        </div>
                        {loading ? <div class="spinner-border text-primary" role="status">
                          <span class="visually-hidden"></span>
                        </div> : <button type="submit" className="btn btn-info text-light w-100 mt-2 rounded-2" disabled={isSubmitting}>Login</button>}

                        <p className='pt-2'>Don't have account ? <Link className='text-decoration-none' to={'/signup'}>Sign Up Now</Link></p>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
