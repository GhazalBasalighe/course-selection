import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { IconButton, TextField, styled } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#A0AAB4",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
        borderRadius: "2rem",
        borderWidth: "2px",
      },
      "&:hover fieldset": {
        borderColor: "white",
        borderRadius: "2rem",
        borderWidth: "2px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  });

  const CssButton = styled(Button)({
    backgroundColor: "white",
    color: "black",
    padding: "0.8rem 0",
    borderRadius: "2rem",
    textTransform: "none",
    fontWeight: "700",
    fontSize: "1rem",
    lineHeight: "2rem",
    border: "none",
    outline: "none",
    width: "98%",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#f4f4f4",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#f4f4f4",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(147, 150, 154, 0.5)",
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-[url('../../public/login-bg.png')]">
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
              .min(6, "Password must be at least 6 characters")
              .required("Required"),
          })}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, touched, errors, handleChange }) => (
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <CssTextField
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
                <CssTextField
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
              <CssButton
                className="self-center"
                variant="contained"
                type="submit"
                disabled={!!errors.email || !!errors.password}
              >
                Login
              </CssButton>
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
