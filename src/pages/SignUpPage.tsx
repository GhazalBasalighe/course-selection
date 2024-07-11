import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import CustomizedTextInput from "../components/CustomizedTextInput/CustomizedTextInput";
import CustomizedButton from "../components/CustomizedButton/CustomizedButton";
import axios from "axios";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSignUp = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/signup",
        {
          email: values.email,
          password: values.password,
        }
      );
      const userData = response.data.token;
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/courses");
    } catch (error: any) {
      console.error(
        "Error signing up:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[url('/login-bg.png')]">
      <div className="relative max-w-md w-full bg-white/20 p-8 rounded-xl backdrop-blur-md bg-opacity-10 h-[35rem]">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign Up
        </h1>
        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email format")
              .required("Required"),
            password: Yup.string()
              .min(4, "Password must be at least 4 characters")
              .required("Required"),
            confirmPassword: Yup.string()
              //@ts-ignore
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Required"),
          })}
          onSubmit={handleSignUp}
        >
          {({ values, touched, errors, handleChange, handleBlur }) => (
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <CustomizedTextInput
                  id="email"
                  name="email"
                  label="Email ID"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    style: {
                      borderColor: "white",
                      color: "white",
                    },
                    className: "bg-transparent rounded-full",
                  }}
                  InputLabelProps={{
                    style: { color: "white", padding: "0 0.5rem" },
                  }}
                />
                <CustomizedTextInput
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type={showPassword ? "text" : "password"}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility sx={{ color: "white" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "white" }} />
                        )}
                      </IconButton>
                    ),
                    style: { borderColor: "white", color: "white" },
                    className: "bg-transparent rounded-full",
                  }}
                  InputLabelProps={{
                    style: { color: "white", padding: "0 0.5rem" },
                  }}
                />
                <CustomizedTextInput
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type={showPassword ? "text" : "password"}
                  error={
                    touched.confirmPassword && !!errors.confirmPassword
                  }
                  helperText={
                    touched.confirmPassword && errors.confirmPassword
                  }
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility sx={{ color: "white" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "white" }} />
                        )}
                      </IconButton>
                    ),
                    style: { borderColor: "white", color: "white" },
                    className: "bg-transparent rounded-full",
                  }}
                  InputLabelProps={{
                    style: { color: "white", padding: "0 0.5rem" },
                  }}
                />
              </div>
              <CustomizedButton
                className="self-center"
                variant="contained"
                type="submit"
                disabled={
                  !!errors.email ||
                  !!errors.password ||
                  !!errors.confirmPassword
                }
              >
                Sign Up
              </CustomizedButton>
              <div className="text-center text-white mt-4">
                Already have an account?{" "}
                <Link to="/" className="underline">
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUpPage;
