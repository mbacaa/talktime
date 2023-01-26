import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const initialValues = { username: "", password: "" };

const LoginForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
    // Implement login logic here
  };
  return (
    <div className="w-64 h-full">
      <div>
        <div className="font-bold text-3xl mb-2">Login.</div>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
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
              <button
                className="bg-gray-700 text-white text-sm rounded-md py-1 px-4 hover:bg-gray-800 my-1"
                type="submit"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
