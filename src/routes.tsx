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
import BrandsPage from "./pages/BrandsPage";

import {
  brandDetailsItemPath,
  categoryDetailsItemPath,
  itemDetailPath,
  statusDetailsItemPath,
} from "./utils/constant";
import BrandDetailItems from "./pages/BrandDetailItems";
import StatusDetailItems from "./pages/StatusDetailItems";
import CategoryDetailItems from "./pages/CategoryDetailItems";
import ItemDetail from "./pages/ItemDetail";
import UploadItem from "./pages/admin/UploadItem";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import ManageItem from "./pages/admin/ManageItem";
import ManageAdvertisement from "./pages/admin/ManageAdvertisement";
import UploadAdvertisement from "./pages/admin/UploadAdvertisement";
import ManageAdvertisementTwo from "./pages/admin/ManagementAdvertisementTwo";
import UploadAdvertisementTwo from "./pages/admin/UploadAdvertisementTwo";
import ManagementCategory from "./pages/admin/ManagementCategory";
import UploadCategory from "./pages/admin/UploadCategory";
import ManageBrand from "./pages/admin/ManageBrand";
import UploadBrand from "./pages/admin/UploadBrand";
import ManageStatus from "./pages/admin/ManageStatus";
import UploadStatus from "./pages/admin/UploadStatus";
import ManageTag from "./pages/admin/ManageTag";
import UploadTag from "./pages/admin/UploadTag";
import ManagePromotion from "./pages/admin/ManagePromotion";
import UploadPromotion from "./pages/admin/UploadPromotion";
import ManageReviews from "./pages/admin/ManageReviews";
import ManageCoupons from "./pages/admin/ManageCoupon";
import UploadCoupon from "./pages/admin/UploadCoupon";
import ManageAddress from "./pages/admin/ManageAddress";
import StockManagement from "./pages/admin/StockManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/brands", element: <BrandsPage /> },
      { path: "/offers", element: <Offers /> },
      { path: "/cart", element: <Cart /> },
      { path: "/favourite", element: <Favourite /> },
      { path: `${brandDetailsItemPath}:slug`, element: <BrandDetailItems /> },
      { path: `${statusDetailsItemPath}:slug`, element: <StatusDetailItems /> },
      {
        path: `${categoryDetailsItemPath}:slug`,
        element: <CategoryDetailItems />,
      },

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
  { path: `${itemDetailPath}:id`, element: <ItemDetail /> },
  {
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "/upload-item",
        element: <UploadItem />,
      },
      {
        path: "/manage-item",
        element: <ManageItem />,
      },
      {
        path: "/manage-advertisement-one",
        element: <ManageAdvertisement />,
      },
      {
        path: "/upload-advertisement-one",
        element: <UploadAdvertisement />,
      },
      {
        path: "/manage-advertisement-two",
        element: <ManageAdvertisementTwo />,
      },
      {
        path: "/upload-advertisement-two",
        element: <UploadAdvertisementTwo />,
      },
      {
        path: "/manage-category",
        element: <ManagementCategory />,
      },
      {
        path: "/upload-category",
        element: <UploadCategory />,
      },
      {
        path: "/manage-brand",
        element: <ManageBrand />,
      },
      {
        path: "/upload-brand",
        element: <UploadBrand />,
      },
      {
        path: "/manage-status",
        element: <ManageStatus />,
      },
      {
        path: "/upload-status",
        element: <UploadStatus />,
      },
      {
        path: "/manage-tag",
        element: <ManageTag />,
      },
      {
        path: "/upload-tag",
        element: <UploadTag />,
      },
      {
        path: "/manage-promotion",
        element: <ManagePromotion />,
      },
      {
        path: "/upload-promotion",
        element: <UploadPromotion />,
      },
      {
        path: "/manage-review",
        element: <ManageReviews />,
      },
      {
        path: "/manage-coupons",
        element: <ManageCoupons />,
      },
      {
        path: "/upload-coupon",
        element: <UploadCoupon />,
      },
      {
        path: "/manage-address",
        element: <ManageAddress />,
      },
      {
        path: "/view-stock",
        element: <StockManagement />,
      },
    ],
  },
]);
export default router;
