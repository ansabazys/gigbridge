import React, { useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FiLock, FiEyeOff, FiUser, FiEye } from "react-icons/fi";
import { BiLogoApple, BiLogoFacebook, BiLogoGoogle } from "react-icons/bi";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation Schema
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be less than 20 characters"),
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

const Register = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    alert("Form submitted successfully:\n" + JSON.stringify(values, null, 2));
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
              <p className="md:text-center text-black/50">
                Please sign up to start your gig work application
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, isSubmitting, values, handleBlur, handleChange }) => (
                <Form className="grid gap-3">
                  {/* Username Field */}
                  <div>
                    <div
                      className={`flex items-center px-2 py-2 border rounded-lg ${
                        touched.username
                          ? errors.username
                            ? "border-red-500"
                            : "border-green-500"
                          : "border"
                      }`}
                    >
                      <FiUser />
                      <Field
                        name="username"
                        type="text"
                        className="bg-transparent pl-2 outline-none w-full"
                        placeholder="Username"
                        value={values.username.toLowerCase()}
                        onChange={(e) => {
                          const {value} = e.target;
                          handleChange(e)
                          e.target.value = value.toLowerCase()
                        }}
                        onBlur={handleBlur}
                      />
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <div
                      className={`flex items-center px-2 py-2 border rounded-lg ${
                        touched.email
                          ? errors.email
                            ? "border-red-500"
                            : "border-green-500"
                          : "border"
                      }`}
                    >
                      <MdOutlineAlternateEmail />
                      <Field
                        name="email"
                        type="text"
                        className="bg-transparent pl-2 outline-none w-full"
                        placeholder="Email"
                    
                      />
                    </div>
                    <ErrorMessage
                      name="email"
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
                          : "border"
                      }`}
                    >
                      <FiLock />
                      <Field
                        name="password"
                        type={show ? "text" : "password"}
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-black rounded-lg py-2 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                  </button>

                  <p className="text-center">Or continue with</p>

                  {/* Social Media Login Buttons */}
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
              <Link to={"/login"} className="text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
