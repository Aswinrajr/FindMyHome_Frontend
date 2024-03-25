import { createBrowserRouter } from "react-router-dom";

//ADMIN
import Dashboard from "../components/Admin/Dashboard";
import Login from "../components/Admin/Login";
import UserPage from "../Pages/Admin/UserPage";
import ProvidersPage from "../Pages/Admin/ProvidersPage";
import BookingPage from "../Pages/Admin/BookingPage";
// import MessageList from "../Pages/Admin/MessageList";
import AdminForgotPassword from "../components/Admin/AdminForgotPassword";
import AdminVerifyOtp from "../components/Admin/AdminVerifyOtp";
import AdminChangePassword from "../components/Admin/AdminChangePassword";

//PROVIDER
import ProviderLogin from "../components/Provider/ProviderLogin";
import ProviderSignUp from "../components/Provider/ProviderSignupPage";
import ProviderDashboard from "../Pages/Provider/ProviderDashboard";
import ProviderBookings from "../Pages/Provider/ProviderBookings";
// import ProviderMessage from "../Pages/Provider/ProviderMessages";
import ProviderRooms from "../Pages/Provider/ProviderRooms";
import ProviderAddRooms from "../Pages/Provider/ProviderAddRooms";
import ProviderEditRooms from "../Pages/Provider/ProviderEditRoms";
import ProviderForgotPassword from "../components/Provider/ProviderForgotPassword";
import ProviderVerifyOtp from "../components/Provider/ProviderVerifyOtp";

//USER
import UserLogin from "../Pages/Users/UserLogin";
import UserSignUpPage from "../Pages/Users/UserSignUpPage";
import UserForgotPassowrd from "../Pages/Users/UserForgotPassowrd";
import VerifyOtp from "../Pages/Users/UserVerifyOtp";
import SamplePage from "../components/Sample/SamplePage";
import SampleAddRooms from "../components/Provider/Sample addRooms";
import LoginByOtp from "../components/Provider/LoginByOtp";
import ProviderProfile from "../Pages/Provider/ProviderProfile";
import SearchedRoom from "../Pages/Users/SearchedRoom";
import FullDetails from "../components/User/FullDetails";
import FirebaseMobile from "../components/Provider/FirebaseMobile";



const routerPage = createBrowserRouter([
  {
    path: "/test",
    element: <SampleAddRooms />,
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
  // {
  //   path: "/admin/messages",
  //   element: <MessageList />,
  // },
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
  //{
  //   path: "/provider/messages",
  //   element: <ProviderMessage />,
  // },
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
  }
]);

export default routerPage;
