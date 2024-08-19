import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/home";
import ProtectedRoute from "./routes/root";
import LoginPage from "./routes/login";
import NotFoundPage from "./routes/not-found";
import RegisterPage from "./routes/register";
import { UserProvider } from "./context/userContext";
import ProductDetail from "./views/product detail/product-detail";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
