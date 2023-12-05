import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";
import BioskopListPage from "./pages/BioskopListPage.tsx";
import AccountPage from "./pages/account/AccountPage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import MovieListPage from "./pages/movieList/MovieList.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.tsx";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/bioskop/:id", element: <BioskopListPage /> },
  { path: "/account", element: <AccountPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/movie", element: <MovieListPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
