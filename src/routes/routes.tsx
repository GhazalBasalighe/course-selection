import React from "react";
import { createBrowserRouter } from "react-router-dom";

const LoginPageLazy = React.lazy(() => import("../pages/LoginPage"));
const SignUpPageLazy = React.lazy(() => import("../pages/SignUpPage"));
const NotFoundPageLazy = React.lazy(() => import("../pages/NotFound"));
const CourseSelectionPageLazy = React.lazy(
  () => import("../pages/CourseSelection")
);
const CourseManagementPageLazy = React.lazy(
  () => import("../pages/CourseManagement")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPageLazy />,
    errorElement: <NotFoundPageLazy />,
  },
  {
    path: "/sign-up",
    element: <SignUpPageLazy />,
    errorElement: <NotFoundPageLazy />,
  },
  {
    path: "/admin",
    element: <CourseManagementPageLazy />,
    errorElement: <NotFoundPageLazy />,
  },
  {
    path: "/courses",
    element: <CourseSelectionPageLazy />,
    errorElement: <NotFoundPageLazy />,
  },
]);

export { router };
