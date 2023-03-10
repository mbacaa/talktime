import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { formAxiosConfig, axiosConfig } from "../../utils/axiosConfig";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, setCookie] = useCookies(["USER_DATA", "JWT_TOKEN"]);
  const navigate = useNavigate();

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
      .min(8, "Password must be at least 8 characters")
      .matches(confirmPassword, "Passwords must match"),
    pictureFile: Yup.string().required("required"),
  });

  const loginInitialValues = { username: "", password: "" };
  const registerInitialValues = {
    username: "",
    email: "",
    password: "",
    pictureFile: "",
  };

  const register = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picture", values.pictureFile.name);
      const savedUserResponse = await formAxiosConfig.post(
        "/auth/register",
        formData,
      );
      const savedUser = await savedUserResponse.data;
      onSubmitProps.resetForm();
      savedUser && setIsLogin(true);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      const loggedInResponse = await axiosConfig.post("/auth/login", formData);
      const loggedIn = await loggedInResponse.data;

      setCookie("JWT_TOKEN", loggedIn.token, {
        path: "/",
        expires: new Date(Date.now() + 900000),
      });
      setCookie("USER_DATA", loggedIn.user, {
        path: "/",
        expires: new Date(Date.now() + 900000),
      });
      onSubmitProps.resetForm();
      loggedIn && navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };
  const handleRegisterSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
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
                  <label className="block text-sm mb-1" htmlFor="username">
                    Username
                  </label>

                  <Field
                    className={`${
                      errors.username && touched.username
                        ? "border-red-500"
                        : "border-gray-400"
                    } border py-1 rounded-md w-full text-sm px-1 text-gray-900`}
                    type="text"
                    name="username"
                    id="username"
                    value={values.username}
                  />

                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="username"
                    component="div"
                  />
                </div>
                <div className="mb-4 h-14">
                  <label className="block text-sm mb-1" htmlFor="password">
                    Password
                  </label>
                  <Field
                    className={`${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-400"
                    } border py-1 rounded-md w-full px-1 text-gray-900`}
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="password"
                    component="div"
                  />
                </div>
                <div className="flex flex-row justify-between items-center">
                  <button
                    className="bg-slate-800 text-white text-sm rounded-md py-1 px-4 mt-2 hover:bg-slate-900 transition duration-200"
                    type="submit"
                  >
                    Login.
                  </button>
                  <button
                    className="text-sm rounded-md p-2 mt-2 underline hover:text-gray-300 transition duration-200"
                    onClick={() => {
                      setIsLogin(!isLogin);
                    }}
                    type="button"
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
                  <label className="block text-sm mb-1" htmlFor="username">
                    Username
                  </label>

                  <Field
                    className={`${
                      errors.username && touched.username
                        ? "border-red-500"
                        : "border-gray-500"
                    } border py-1 rounded-md w-full text-gray-900 text-sm px-1`}
                    type="text"
                    name="username"
                    id="username"
                    value={values.username}
                  />

                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="username"
                    component="div"
                  />
                </div>
                <div className="mb-4 h-14">
                  <label className="blocktext-sm mb-1" htmlFor="email">
                    Email
                  </label>

                  <Field
                    className={`${
                      errors.username && touched.username
                        ? "border-red-500"
                        : "border-gray-400"
                    } border py-1 rounded-md w-full text-gray-900 text-sm px-1`}
                    type="text"
                    name="email"
                    id="email"
                    value={values.email}
                  />

                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="email"
                    component="div"
                  />
                </div>
                <div className="text-sm border-dashed border-2 border-blue2 rounded-lg mt-4 mb-2 py-5 px-6 text-blue2 font-bold text-center cursor-pointer">
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("pictureFile", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!values.pictureFile ? (
                          <div>Drop here a picture!</div>
                        ) : (
                          <div>
                            <div>{values.pictureFile.name}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
                <div className="mb-4 h-14">
                  <label className="block  text-sm mb-1" htmlFor="password">
                    Password
                  </label>
                  <Field
                    className={`${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-400"
                    } border py-1 rounded-md w-full text-gray-900  px-1`}
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="password"
                    component="div"
                  />
                </div>
                <div className="mb-4 h-14">
                  <label
                    className="block text-sm mb-1"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <Field
                    className={`${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-400"
                    } border py-1 rounded-md w-full text-gray-900 px-1`}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <ErrorMessage
                    className="text-red-500 text-xs"
                    name="confirmPassword"
                    component="div"
                  />
                </div>
                <div className="flex flex-row justify-between items-center">
                  <button
                    className="bg-slate-800 text-white text-sm rounded-md py-1 px-4 mt-2 hover:bg-slate-900 transition duration-200"
                    type="submit"
                  >
                    Register.
                  </button>
                  <button
                    className="text-sm rounded-md p-2 mt-2 underline hover:text-gray-300 transition duration-200"
                    onClick={() => {
                      setIsLogin(!isLogin);
                    }}
                    type="button"
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
