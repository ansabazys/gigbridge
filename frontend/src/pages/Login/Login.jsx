import React, { useContext, useState } from "react";
import { FiLock, FiEyeOff, FiUser, FiEye } from "react-icons/fi";
import { BiLogoApple, BiLogoGoogle, BiLogoFacebook } from "react-icons/bi";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../context/AuthContext";

// Validation Schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .matches(/^\S*$/, "Password must not contain spaces"),
});

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext); // Get the login function from AuthContext

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const initialValues = {
    email: "",
    password: "",
  };



  const onSubmit = async (values) => {
    try {
      await login(values); // Call the login function
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <main className="h-lvh flex flex-col justify-center items-center">
      <Navbar />
      <div className="container flex justify-center items-center h-full p-4">
        <div className="md:p-2 rounded-xl">
          <div className="bg-white rounded-xl grid gap-6 md:p-6 p-3">
            <div className="flex flex-col items-center justify-center">
              <div className="border h-10 w-10 rounded-lg inline-flex m-5 justify-center items-center border-black/15">
                <span className="text-2xl font-bold">G</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tighter">
                Find Work, <br />
                Post Jobs, Get Things Done!
              </h1>
              <p className="text-start w-full text-black/50">
                Log in to your gigBridge account
              </p>
            </div>

            {/* Formik Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form className="grid gap-3">
                  {/* email Field */}
                  <div>
                    <div
                      className={`flex items-center px-2 py-2 border rounded-lg ${
                        touched.email
                          ? errors.email
                            ? "border-red-500"
                            : "border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      <FiUser />
                      <Field
                        type="text"
                        name="email"
                        className="bg-transparent pl-2 outline-none w-full"
                        placeholder="Email"
                      />
                    </div>
                    <ErrorMessage
                      name="Email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <div
                      className={`flex items-center px-2 py-2 border rounded-lg ${
                        touched.password
                          ? errors.password
                            ? "border-red-500"
                            : "border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      <FiLock />
                      <Field
                        type={show ? "text" : "password"}
                        name="password"
                        className="bg-transparent pl-2 outline-none w-full"
                        placeholder="Password"
                      />
                      <div onClick={handleShow} className="cursor-pointer">
                        {show ? <FiEye /> : <FiEyeOff />}
                      </div>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-black rounded-lg py-2 text-white"
                    disabled={isSubmitting}
                  >
                    Sign in
                  </button>

                  <p className="text-center">Or continue with</p>

                  <div className="flex flex-nowrap gap-2">
                    <div className="border w-full flex items-center justify-center py-2 rounded-lg">
                      <BiLogoGoogle />
                    </div>
                    <div className="border w-full flex items-center justify-center py-2 rounded-lg">
                      <BiLogoFacebook />
                    </div>
                    <div className="border w-full flex items-center justify-center py-2 rounded-lg">
                      <BiLogoApple />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="flex items-center justify-center py-2">
            <p>
              Don't have an account?{" "}
              <Link to={"/register"} className="text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
