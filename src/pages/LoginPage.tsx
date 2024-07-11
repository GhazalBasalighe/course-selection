import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import CustomizedButton from "../components/CustomizedButton/CustomizedButton";
import CustomizedTextInput from "../components/CustomizedTextInput/CustomizedTextInput";
import axios from "axios";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log(response.data.role);
      const token = response.data.token;
      localStorage.setItem("token", token);
      if (response.data.role === "admin") {
        navigate("/admin");
      } else if (response.data.role === "student") {
        navigate("/courses");
      }
    } catch (error: any) {
      console.error(
        "Error signing up:",
        error.response?.data?.message || error.message
      );
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-[url('/login-bg.png')]">
      <div className="relative max-w-md w-full bg-white/20 p-8 rounded-xl backdrop-blur-md bg-opacity-10 h-[30rem]">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email format")
              .required("Required"),
            password: Yup.string()
              .min(4, "Password must be at least 4 characters")
              .required("Required"),
          })}
          onSubmit={handleLogin}
        >
          {({ values, touched, errors, handleChange }) => (
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <CustomizedTextInput
                  id="email"
                  name="email"
                  label="Email ID"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={touched.email && errors.email}
                  value={values.email}
                  onChange={handleChange}
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
                  error={!!errors.password}
                  helperText={touched.password && errors.password}
                  value={values.password}
                  onChange={handleChange}
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
                disabled={!!errors.email || !!errors.password}
              >
                Login
              </CustomizedButton>
              <div className="text-center text-white mt-4">
                Don't have an account?{" "}
                <Link to="/sign-up" className="underline">
                  Register
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
