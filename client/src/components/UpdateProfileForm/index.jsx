import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { axiosConfig } from "../../utils/axiosConfig";
import { VscArrowLeft } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const UpdateProfileForm = () => {
  const [cookies, setCookie] = useCookies(["USER_DATA", "JWT_TOKEN"]);
  const USER_DATA = cookies.USER_DATA;
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const updateValidationSchema = Yup.object().shape({
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

  const updateInitialValues = {
    username: USER_DATA.username,
    email: USER_DATA.email,
    password: "",
    pictureFile: "",
  };

  const logout = () => {
    setCookie("USER_DATA", null);
    setCookie("JWT_TOKEN", null);
    navigate("/");
  };

  const update = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picture", values.pictureFile.name);
      const updatedUserResponse = await axiosConfig.put(
        `/users/${USER_DATA._id}`,
        formData,
      );
      const updatedUser = await updatedUserResponse.data;
      updatedUser && logout();
      onSubmitProps.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = async (values, onSubmitProps) => {
    await update(values, onSubmitProps);
  };

  return (
    <div className="w-64 h-full">
      <div className="flex">
        <div className="font-bold text-3xl mb-2">Update.</div>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="text-2xl justify-end ml-auto"
        >
          <VscArrowLeft className="text-gray-100 hover:text-gray-300 mb-2" />
        </button>
      </div>

      <Formik
        initialValues={updateInitialValues}
        validationSchema={updateValidationSchema}
        onSubmit={handleUpdateSubmit}
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
                placeholder={USER_DATA.username}
                className={`${
                  errors.username && touched.username
                    ? "border-red-500"
                    : "border-gray-400"
                } border py-1 text-gray-900 rounded-md w-full text-sm px-1`}
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
              <label className="block  text-sm mb-1" htmlFor="email">
                Email
              </label>

              <Field
                className={`${
                  errors.username && touched.username
                    ? "border-red-500"
                    : "border-gray-400"
                } border py-1 text-gray-900 rounded-md w-full text-sm px-1`}
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
                      <div>{USER_DATA.picture}</div>
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
                } border py-1 rounded-md text-gray-900 w-full px-1`}
                type="password"
                name="password"
                id="password"
                value={values.password}
                placeholder="********"
              />
              <ErrorMessage
                className="text-red-500 text-xs"
                name="password"
                component="div"
              />
            </div>
            <div className="mb-4 h-14">
              <label className="block text-sm mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Field
                className={`${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-500"
                    : "border-gray-400"
                } border py-1 text-gray-900 rounded-md w-full px-1`}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="********"
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
                Update.
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProfileForm;
