import React, {useEffect} from 'react'
import axiosWithAuth from './axiosWithAuth';

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Login = (props) => {
    const { history } = props;
    return (
        <div className="login-container">
        <h1>Log In</h1>
        <Formik
          className="form-control"
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string().required("Please enter user's username"),
            password: Yup.string().required("Please enter user's password")
          })}
          onSubmit={values => {
            console.log(values);
            axiosWithAuth()
              .post('/login', values)
              .then(res => {
                console.log(res)
                localStorage.setItem("token", res.data.token);
              })
              .catch(err => console.log(err.response))
            
          }}
          render={({ errors, status, touched }) => (
            <Form className='login-form'>
              <Field type="text" name="email" placeholder="email" />
              {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
              )}
  
              <Field
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              {touched.password && errors.password && (
                <p className="error">{errors.password}</p>
              )}
  
              <button type="submit">Log In</button>
            </Form>
          )}
        />
      </div>
    )
}

export default Login;