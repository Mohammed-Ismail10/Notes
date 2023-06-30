import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import noteImg from '../../images/notes1.png';
import { signupPost, alertError, loadingTrue, loadingFalse } from '../../Redux/SignupSlice.js';
import { toast } from 'react-toastify';
import { Alert } from '@mui/material';
import Helmet from 'react-helmet';

export default function FormikForm() {
  let { alert } = useSelector(({ signup }) => signup)
  let { loading } = useSelector(({ signup }) => signup)
  let dispatch = useDispatch();
  let navigate = useNavigate();

  async function submit(values) {
    dispatch(loadingTrue());
    console.log(values);
    let { payload } = await dispatch(signupPost(values));
    console.log(payload);
    if (payload.message === 'success') {
      navigate('/login');
      toast.success('Sign up success');
    }
    else {
      dispatch(alertError(payload.errors.email.message))
    }
    dispatch(loadingFalse());
  }

  const FormSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required').min(3).max(20),
    last_name: Yup.string().required('Last name is required').min(3).max(20),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, at least one letter and one number'),
    age: Yup.number().required('Phone number is required').min(10).max(100),
  });

  return (
    <>
    <Helmet>
      <title>Notes - Sign up</title>
    </Helmet>
      <li className='fixed-top p-3 pe-lg-5 d-lg-flex d-none'>
        <i class="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className='ps-2 fs-4 fw-bold'>Notes</p>
      </li>

      <div className="container w-75 py-5">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-conteent-center align-items-center">
            <img className='w-100 pe-5' src={noteImg} alt="note img" loading='lazy' />
          </div>

          <div className="col-lg-7">
            <div className='min-vh-100 d-flex justify-content-center align-items-center text-center'>
              <div className="bg-white shadow w-100 mx-auto p-5 rounded-2">
                <h1 className='fw-bold'>Sign Up Now</h1>
                <div className="pt-3">
                  <Formik
                    initialValues={{
                      first_name: '',
                      last_name: '',
                      email: '',
                      password: '',
                      age: ''
                    }}
                    validationSchema={FormSchema}
                    onSubmit={submit}
                  >
                    {({ values, errors, touched, isSubmitting }) => (
                      <Form>
                        {alert ? <Alert className='py-0 mb-3' severity="error">{alert}</Alert> : null}
                        <div className="mb-3">
                          <Field type="text" className={`form-control${errors.first_name && touched.first_name ? ' is-invalid' : ''}`} name="first_name" placeholder="First Name" />
                          <ErrorMessage name="first_name" component="div" className="invalid-feedback text-start" />
                        </div>
                        <div className="mb-3">
                          <Field type="text" className={`form-control${errors.last_name && touched.last_name ? ' is-invalid' : ''}`} name="last_name" placeholder="Last Name" />
                          <ErrorMessage name="last_name" component="div" className="invalid-feedback text-start" />
                        </div>
                        <div className="mb-3">
                          <Field type="email" className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`} name="email" placeholder="Email" />
                          <ErrorMessage name="email" component="div" className="invalid-feedback text-start" />
                        </div>
                        <div className="mb-3">
                          <Field type="password" className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`} name="password" placeholder="Password" />
                          <ErrorMessage name="password" component="div" className="invalid-feedback text-start" />
                        </div>
                        <div className="mb-3">
                          <Field type="number" className={`form-control${errors.age && touched.age ? ' is-invalid' : ''}`} name="age" placeholder="Age" />
                          <ErrorMessage name="age" component="div" className="invalid-feedback text-start" />
                        </div>
                        {loading ? <div class="spinner-border text-primary" role="status">
                          <span class="visually-hidden"></span>
                        </div> : <button type="submit" className="btn btn-info text-light w-100 mt-2 rounded-2" disabled={isSubmitting}>Sign Up</button>}

                        <p className='pt-2'>Already have account ? <Link className='text-decoration-none' to={'/login'}>Login Now</Link></p>
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
  );
};