import { createBrowserRouter } from "react-router-dom";
import ProtectedRouteUser from "../utils/ProtectedRoute.jsx";
import ProtectedRouteAdmin from "../utils/ProtectedRouteAdmin.jsx";
import ProtectedRouteProvider from "../utils/ProtectedRouteProvider.jsx";

//ADMIN
import Login from "../components/Admin/Login.jsx";
import Dashboard from "../components/Admin/profile/Dashboard.jsx";
import UserPage from "../Pages/Admin/UserPage";
import ProvidersPage from "../Pages/Admin/ProvidersPage";
import BookingPage from "../Pages/Admin/BookingPage";
import AdminForgotPassword from "../components/Admin/AdminForgotPassword";
import AdminVerifyOtp from "../components/Admin/AdminVerifyOtp";
import AdminChangePassword from "../components/Admin/AdminChangePassword";
import MessageList from "../Pages/Admin/MessageList.jsx";
import AdminProfilePage from "../Pages/Admin/AdminProfilePage";
import AdminSingleBookingView from "../Pages/Admin/AdminSingleBookingView.jsx";
import AdminSalesOverView from "../Pages/Admin/AdminSalesOverView.jsx";
import AdminOfferPage from "../Pages/Admin/AdminOfferPage.jsx";

//PROVIDER
import ProviderLogin from "../components/Provider/ProviderLogin";
import ProviderSignUp from "../components/Provider/ProviderSignupPage";
import ProviderDashboard from "../Pages/Provider/ProviderDashboard";
import ProviderBookings from "../Pages/Provider/ProviderBookings";
import ProviderRooms from "../Pages/Provider/ProviderRooms";
import ProviderAddRooms from "../Pages/Provider/ProviderAddRooms";
import ProviderEditRooms from "../Pages/Provider/ProviderEditRoms";
import ProviderForgotPassword from "../components/Provider/ProviderForgotPassword";
import ProviderVerifyOtp from "../components/Provider/ProviderVerifyOtp";
import FirebaseMobile from "../components/Provider/FirebaseMobile";
import ProviderProfile from "../Pages/Provider/ProviderProfile";
import LoginByOtp from "../components/Provider/LoginByOtp";
import ProviderViewBookings from "../Pages/Provider/ProviderViewBookings.jsx";
import ProviderCardPage from "../Pages/Provider/ProviderCardPage";

//USER
import UserLogin from "../Pages/Users/UserLogin";
import UserSignUpPage from "../Pages/Users/UserSignUpPage";
import UserForgotPassowrd from "../Pages/Users/UserForgotPassowrd";
import VerifyOtp from "../Pages/Users/UserVerifyOtp";
import SamplePage from "../components/Sample/SamplePage";
import SearchedRoom from "../Pages/Users/SearchedRoom";
import FullDetails from "../components/User/FullDetails";
import UserProfile from "../Pages/Users/UserProfile";
import UserDashboard from "../Pages/Users/UserDashboard";
import UserChangePassword from "../Pages/Users/UserChangePassword";
import UserNotification from "../Pages/Users/UserNotification";
import UserPreviewBooking from "../Pages/Users/UserPreviewBooking";
import UserEditProfile from "../Pages/Users/UserEditProfile";
import UserRoom from "../Pages/Users/UserRoom";
import UserRentify from "../Pages/Users/UserRentify";
import UserContact from "../Pages/Users/UserContact";
import PageNotFound from "../components/PageNotFound";
import UserAddRoom from "../Pages/Users/UserAddRoom";
import UserEditRoom from "../Pages/Users/UserEditRoom";
import UserMobileSignup from "../Pages/Users/UserMobileSignup";
import UserAddedRoomDetails from "../Pages/Users/UserAddedRoomDetails.jsx";
import UserWallet from "../Pages/Users/UserWallet.jsx";
import UserCart from "../Pages/Users/UserCart.jsx";
import SuccessPage from "../components/User/SuccessPage.jsx";
import FailurePage from "../components/User/FailurePage.jsx";
import Chat from "../components/Chat/userChat/Chat.jsx";
import Invoice from "../Pages/Users/Invoice.jsx";
import ProviderChat from "../components/Chat/Provider/ProviderChat.jsx";

const routerPage = createBrowserRouter([
  {
    path: "/*",
    element: <PageNotFound />,
  },
  {
    path: "/",
    element: <SamplePage />,
  },

  //Admin Public Routes
  {
    path: "/admin",
    element: <Login />,
  },

  {
    path: "/admin/forgotpassword",
    element: <AdminForgotPassword />,
  },
  {
    path: "/admin/verifyotp",
    element: <AdminVerifyOtp />,
  },
  {
    path: "/admin/changepassword",
    element: <AdminChangePassword />,
  },

  //Admin Protected Routes
  {
    path: "/admin",
    element: <ProtectedRouteAdmin />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <UserPage /> },
      { path: "providers", element: <ProvidersPage /> },
      { path: "bookings", element: <BookingPage /> },
      { path: "changepassword", element: <AdminChangePassword /> },
      { path: "messages", element: <MessageList /> },
      { path: "profile", element: <AdminProfilePage /> },
      { path: "singlebookingdetails", element: <AdminSingleBookingView /> },
      { path: "sales", element: <AdminSalesOverView /> },
      { path: "offers", element: <AdminOfferPage /> },
    ],
  },

  //Provider Public Routes
  {
    path: "/provider",
    element: <ProviderLogin />,
  },
  {
    path: "/provider/register",
    element: <FirebaseMobile />,
  },
  {
    path: "/provider/signup",
    element: <ProviderSignUp />,
  },
  {
    path: "/provider/forgotpassword",
    element: <ProviderForgotPassword />,
  },
  {
    path: "/provider/verifyOtp",
    element: <ProviderVerifyOtp />,
  },
  {
    path: "/provider/otplogin",
    element: <LoginByOtp />,
  },

  //Provider Protected Routes
  {
    path: "/provider",
    element: <ProtectedRouteProvider />,
    children: [
      { path: "dashboard", element: <ProviderDashboard /> },
      { path: "bookings", element: <ProviderBookings /> },
      { path: "rooms", element: <ProviderRooms /> },
      { path: "rooms/addrooms", element: <ProviderAddRooms /> },
      { path: "rooms/editrooms/:roomId", element: <ProviderEditRooms /> },
      { path: "profileedit", element: <ProviderProfile /> },
      { path: "register", element: <FirebaseMobile /> },
      { path: "account", element: <ProviderCardPage /> },
      { path: "singlebookingdetails", element: <ProviderViewBookings /> },
      { path: "chat", element: <ProviderChat /> },
    ],
  },

  //Users Public Routes
  {
    path: "/login",
    element: <UserLogin />,
  },

  {
    path: "/signup",
    element: <UserSignUpPage />,
  },
  {
    path: "/forgotpassword",
    element: <UserForgotPassowrd />,
  },
  {
    path: "/verifyotp",
    element: <VerifyOtp />,
  },
  {
    path: "/register",
    element: <UserMobileSignup />,
  },

  {
    path: "/home",
    element: <SamplePage />,
  },
  {
    path: "/searchedroom",
    element: <SearchedRoom />,
  },

  //User Protected Routes
  {
    element: <ProtectedRouteUser />,
    children: [
      { path: "home", element: <SamplePage /> },
      { path: "searchedroom", element: <SearchedRoom /> },
      { path: "searchedroom/roompreview/:id", element: <FullDetails /> },
      { path: "userprofile", element: <UserProfile /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "editprofile", element: <UserProfile /> },
      { path: "change_password", element: <UserChangePassword /> },
      { path: "notification", element: <UserNotification /> },
      { path: "bookings", element: <UserPreviewBooking /> },
      { path: "edit_profile", element: <UserEditProfile /> },
      { path: "room", element: <UserRoom /> },
      { path: "rentify", element: <UserRentify /> },
      { path: "contact", element: <UserContact /> },
      { path: "addroom", element: <UserAddRoom /> },
      { path: "usereditroom/:roomId", element: <UserEditRoom /> },
      { path: "register", element: <UserMobileSignup /> },
      { path: "addedroompreview/:id", element: <UserAddedRoomDetails /> },
      { path: "wallet", element: <UserWallet /> },
      { path: "cart", element: <UserCart /> },
      { path: "successpage", element: <SuccessPage /> },
      { path: "failurepage", element: <FailurePage /> },
      { path: "chat", element: <Chat /> },
      { path: "invoice", element: <Invoice /> },
    ],
  },
]);

export default routerPage;
