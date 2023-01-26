import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Dropzone from "react-dropzone";

const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const registerValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  picture: Yup.string().required("required"),
});

const loginInitialValues = { username: "", password: "" };

const registerInitialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  picture: "",
};

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true); 

  const handleLoginSubmit = (values) => {
    console.log(values);
    // Implement login logic here
  };

  const handleRegisterSubmit = (values) => {
    console.log(values);
    // Implement register logic here
  };

  return (
    <div className="w-64 h-full">
      {isLogin && (
        <div>
          <div>
            <div className="font-bold text-3xl mb-2">Login.</div>
          </div>
          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleLoginSubmit}
          >
            {({
              errors,
              touched,
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <Form className="py-4">
                <div className="mb-4 h-14">
                  <label
                    className="block text-gray-600 text-sm mb-1"
                    htmlFor="username"
                  >
                    Username
                  </label>

                  <Field
                    className={`${
                      errors.username && touched.username
                        ? "border-red-500"
                        : "border-gray-400"
                    } border py-1 rounded-md w-full text-sm px-1`}
                    type="text"
                    name="username"
                    id="username"
                  />

                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="username"
                    component="div"
                  />
                </div>
                <div className="mb-4 h-14">
                  <label
                    className="block text-gray-600 text-sm mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Field
                    className={`${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-400"
                    } border py-1 rounded-md w-full px-1`}
                    type="password"
                    name="password"
                    id="password"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="password"
                    component="div"
                  />
                </div>
                <div className="flex flex-row justify-between items-center">
                  <button
                    className="bg-gray-800 text-white text-sm rounded-md  py-1 px-4 mt-2 hover:bg-gray-700"
                    type="submit"
                  >
                    Login.
                  </button>
                  <button
                    className="text-sm rounded-md p-2 mt-2 underline hover:text-gray-500"
                    onClick={() => {
                      setIsLogin(!isLogin);
                    }}
                    type="submit"
                  >
                    Register here.
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {!isLogin && (
        <div>
          <div>
            <div className="font-bold text-3xl mb-2">Register.</div>
          </div>
          <Formik
            initialValues={registerInitialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleRegisterSubmit}
          >
            {({
              errors,
              touched,
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <Form className="py-4">
                <div className="mb-4 h-14">
                  <label
                    className="block text-gray-600 text-sm mb-1"
                    htmlFor="username"
                  >
                    Username
                  </label>

                  <Field
                    className={`${
                      errors.username && touched.username
                        ? "border-red-500"
                        : "border-gray-400"
                    } border py-1 rounded-md w-full text-sm px-1`}
                    type="text"
                    name="username"
                    id="username"
                  />

                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="username"
                    component="div"
                  />
                </div>
                <div className="mb-4 h-14">
                  <label
                    className="block text-gray-600 text-sm mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>

                  <Field
                    className={`${
                      errors.username && touched.username
                        ? "border-red-500"
                        : "border-gray-400"
                    } border py-1 rounded-md w-full text-sm px-1`}
                    type="text"
                    name="email"
                    id="email"
                  />

                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="email"
                    component="div"
                  />
                </div>
                <div className="text-sm border-dashed border-2 border-blue2 rounded-lg my-2 py-5 px-6 text-blue2 font-bold 	text-center">
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Click to Add Picture</p>
                        ) : (
                          <div>
                            <div>{values.picture.name}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
                <div className="mb-4 h-14">
                  <label
                    className="block text-gray-600 text-sm mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Field
                    className={`${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-400"
                    } border py-1 rounded-md w-full px-1`}
                    type="password"
                    name="password"
                    id="password"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="password"
                    component="div"
                  />
                </div>
                <div className="mb-4 h-14">
                  <label
                    className="block text-gray-600 text-sm mb-1"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <Field
                    className={`${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-400"
                    } border py-1 rounded-md w-full px-1`}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="confirmPassword"
                    component="div"
                  />
                </div>
                <div className="flex flex-row justify-between items-center">
                  <button
                    className="bg-gray-800 text-white text-sm rounded-md  py-1 px-4 mt-2 hover:bg-gray-700"
                    type="submit"
                  >
                    Register.
                  </button>
                  <button
                    className="text-sm rounded-md p-2 mt-2 underline hover:text-gray-500"
                    onClick={() => {
                      setIsLogin(!isLogin);
                    }}
                    type="submit"
                  >
                    Login here.
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
