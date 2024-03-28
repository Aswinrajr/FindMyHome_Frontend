import { createBrowserRouter } from "react-router-dom";

//ADMIN
import Dashboard from "../components/Admin/Dashboard";
import Login from "../components/Admin/Login";
import UserPage from "../Pages/Admin/UserPage";
import ProvidersPage from "../Pages/Admin/ProvidersPage";
import BookingPage from "../Pages/Admin/BookingPage";
import AdminForgotPassword from "../components/Admin/AdminForgotPassword";
import AdminVerifyOtp from "../components/Admin/AdminVerifyOtp";
import AdminChangePassword from "../components/Admin/AdminChangePassword";


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
import MessageList from "../Pages/Admin/MessageList";
import UserAddRoom from "../Pages/Users/UserAddRoom";
import UserEditRoom from "../Pages/Users/UserEditRoom";




const routerPage = createBrowserRouter([
  {
    path: "/*",
    element: <PageNotFound/>
  },
  {
    path: "/",
    element: <SamplePage />,
  },
  //admin
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/users",
    element: <UserPage />,
  },
  {
    path: "/admin/providers",
    element: <ProvidersPage />,
  },

  {
    path: "/admin/providers",
    element: <ProvidersPage />,
  },
  {
    path: "/admin/bookings",
    element: <BookingPage />,
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
  {
    path:"/admin/messages",
    element:<MessageList/>

  },

  //Provider
  {
    path: "/provider",
    element: <ProviderLogin />,
  },
  {
    path: "/provider/signup",
    element: <ProviderSignUp />,
  },
  {
    path: "/provider/dashboard",
    element: <ProviderDashboard />,
  },
  {
    path: "/provider/bookings",
    element: <ProviderBookings />,
  },

  {
    path: "/provider/rooms",
    element: <ProviderRooms />,
  },
  {
    path: "/provider/rooms/addrooms",
    element: <ProviderAddRooms />,
  },
  {
    path: "/provider/rooms/editrooms/:roomId",
    element: <ProviderEditRooms />,
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
    path:"/provider/otplogin",
    element:<LoginByOtp/>
  },
  {
    path:"/provider/profileedit",
    element:<ProviderProfile/>

  },{
    path:"/provider/register",
    element:<FirebaseMobile/>

  },


  //Users
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
    path: "/home",
    element: <SamplePage />,
  },
  {
    path:"/searchedroom",
    element:<SearchedRoom/>
  },
  {
    path:"/searchedroom/roompreview/:id",
    element:<FullDetails/>
  },
  {
    path:"/userprofile",
    element:<UserProfile/>
  },
  {
    path:"/dashboard",
    element:<UserDashboard/>
  },
  {
    path:"/editprofile",
    element:<UserProfile/>
  },
  {
    path:"/change_password",
    element:<UserChangePassword/>
  },
  {
    path:"/notification",
    element:<UserNotification/>
  },
  {
    path:"/bookings",
    element:<UserPreviewBooking/>
  },
  {
    path:"/edit_profile",
    element:<UserEditProfile/>
  },
  {
    path:"/room",
    element:<UserRoom/>

  },
  {
    path:"/rentify",
    element:<UserRentify/>
  },
  {
    path:"/contact",
    element:<UserContact/>
  },
  {
    path:"/addroom",
    element:<UserAddRoom/>
  },

  {
    path:"/usereditroom/:roomId",
    element:<UserEditRoom/>
  }


]);

export default routerPage;
