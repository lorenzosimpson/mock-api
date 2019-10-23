import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axiosWithAuth from './axiosWithAuth';
// axiosWithAuth

const Signup = props => {
  const { history } = props;
  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          // confirmPassword: ""
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Please enter your first and last name"),
          email: Yup.string().required("Please enter your email"), // check for @
          password: Yup.string().required("Please enter a password"),
             confirmPassword: Yup.string()
          .required("Please confirm your password")
          .oneOf([Yup.ref("password"), null], "Passwords must match") //check that passwords match
         })}
        onSubmit={values => {
          console.log(values);
          axiosWithAuth()
            .post(`/register`, values)
            .then(res => {
              console.log(res)
              history.push("/profile")
            })
            .catch(err => console.log(err))
        }}
        render={({ errors, status, touched }) => (
          <Form className="signup-form">
            <Field type="text" name="name" placeholder="Name (First, Last)" />
            {touched.name && errors.name && <p>{errors.name}</p>}

            <Field type="text" name="email" placeholder="email" />
            {touched.email && errors.email && <p>{errors.email}</p>}

            <Field type="password" name="password" placeholder="password" />
            {touched.password && errors.password && <p>{errors.password}</p>}

            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
            />
            {touched.confirmPassword && errors.confirmPassword && (<p>{errors.confirmPassword}</p>)}

            <button type="submit">Sign up</button>

            {/* form validation checks */}
          </Form>
        )}
      />
    </div>
  );
};

export default Signup;
