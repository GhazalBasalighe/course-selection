import React from "react";
import { createBrowserRouter } from "react-router-dom";

const LoginPageLazy = React.lazy(() => import("../pages/LoginPage"));
const SignUpPageLazy = React.lazy(() => import("../pages/SignUpPage"));
const NotFoundPageLazy = React.lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPageLazy />,
    errorElement: <NotFoundPageLazy />,
    // children: [
    //   { index: true, element: <ProductsPage /> },
    //   {
    //     path: "products/subgroup/:subgroupId",
    //     element: <SubGroupProductsPage />,
    //   },
    //   {
    //     path: "products/group/:groupId",
    //     element: <GroupProductsPage />,
    //   },
    //   {
    //     path: "products/details/:productId",
    //     element: <ProductDetailsPage />,
    //   },
    //   {
    //     path: "successful_payment",
    //     element: <PaymentSuccess />,
    //   },
    //   {
    //     path: "unsuccessful_payment",
    //     element: <PaymentFailure />,
    //   },
    //   {
    //     path: "cart",
    //     element: <CartPage />,
    //   },
    //   {
    //     path: "confirm_purchase",
    //     element: <ConfirmPurchase />,
    //   },
    //   {
    //     path: "add_user",
    //     element: <AddUserInfo />,
    //   },
    //   {
    //     path: "date_picker",
    //     element: <DatePicker />,
    //   },
    // ],
  },
  {
    path: "/sign-up",
    element: <SignUpPageLazy />,
    errorElement: <NotFoundPageLazy />,
  },
  //   {
  //     path: "/admin",
  //     element: <AdminPageTemplate />,
  //     errorElement: <NotFound />,
  //     children: [
  //       {
  //         path: "product_manage",
  //         element: <ProductManagementPage />,
  //       },
  //       {
  //         path: "stock_price_manage",
  //         element: <StockAndPriceManagementPage />,
  //       },
  //       {
  //         path: "orders_manage",
  //         element: <OrdersManagementPage />,
  //       },
  //     ],
  //   },
]);

export { router };
