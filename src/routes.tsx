import { createBrowserRouter } from "react-router-dom";
import App from "./Layout";
import ErrorPage from "./ErrorPage";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Offers from "./pages/Offers";
import Cart from "./pages/Cart";
import Favourite from "./pages/Favourite";
import Account from "./pages/Account";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/offers", element: <Offers /> },
      { path: "/cart", element: <Cart /> },
      { path: "/favourite", element: <Favourite /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/account",
            element: <Account />,
          },
        ],
      },
    ],
  },
  { path: "/search", element: <Search /> },
]);
export default router;
