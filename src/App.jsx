import React from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Board, { loader as boardLoader } from "./routes/board";
import ErrorPage from "./routes/error-page";
import Overview from "./routes/overview";
import Root from "./routes/root";
import { action as deleteAction } from "./routes/delete";
import TableList from "./components/Boards/TableList/list";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SignUp from "./components/Login/SignUp";
import LogIn from "./components/Login/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "login",
      element: <LogIn />,
    },
    {
      path: "SignUp",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          loader: () => redirect("/boards"),
          errorElement: <ErrorPage />,
        },
        {
          path: "boards",
          element: <Overview />,
        },
        {
          path: "mytask",
          element: <TableList />,
        },
        {
          path: "boards/:boardId",
          element: <Board />,
          loader: boardLoader,
        },
        {
          path: "boards/:boardId/delete",
          action: deleteAction,
          loader: () => redirect("/boards"),
          element: null,
        },
      ],
    },
  ]);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </>
  );
}

export default App;
