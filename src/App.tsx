import { Suspense } from "react";
import "./App.css";
import { router } from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function App() {
  return (
    <Suspense
      fallback={
        <CircularProgress className="fixed top-1/2 left-1/2 text-[#a056b9]" />
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
