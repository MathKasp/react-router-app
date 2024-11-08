//#region IMPORTS 
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Expense, {  loader as expenseLoader, action as expenseAction,} from "./routes/expense";
import Root, { loader as rootLoader, action as rootAction,} from "./routes/root";
import EditExpense, {  action as editAction,} from "./routes/edit";
import ThemeProvider from "./context/context";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";
import ProtectedRoute from "./routes/ProtectedRoute"; //
import Login from "./routes/Login"; //
import { AuthProvider } from "./context/authContext/AuthContext"; //
import Register from "./routes/Register";
//#endregion

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { 
            index: true, 
            element: (
              <ProtectedRoute>
                <Index /> 
              </ProtectedRoute>
            ),
          },
          {
            path: "expenses/:expenseId",
            element: (
            <ProtectedRoute>
              <Expense />
            </ProtectedRoute>
            ),
            loader: expenseLoader,
            action: expenseAction,
          },
          {
            path: "expenses/:expenseId/edit",
            element : (
              <ProtectedRoute>
                <EditExpense />
              </ProtectedRoute>
            ),
            loader: expenseLoader,
            action: editAction,
          },
          {
            path: "expenses/:expenseId/destroy",
            action: destroyAction,
            errorElement: <div>Opps! une erreur ! </div>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login/Register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
