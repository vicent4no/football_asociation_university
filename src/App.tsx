import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router";
import Router from "./router/Router.tsx";

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
