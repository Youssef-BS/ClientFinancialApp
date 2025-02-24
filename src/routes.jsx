import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
<<<<<<< HEAD
import { Home, Profile, Tables, Notifications, EditProfile } from "@/pages/dashboard";
// import { SignIn, SignUp } from "@/pages/auth";
=======
import { Home, Profile, Tables, Notifications, EditProfile } from "@/pages/dashboard"; // Importez EditProfile
>>>>>>> 9a332506927a31db0ce3f6eb31b8d733a3ba21cb
import LoginSignupForm from "./pages/auth/LoginSignupForm";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
        name: "edit profile",
        hidden: true,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {

        
        path: "/edit-profile",
        element: <EditProfile />,  // Assurez-vous que cela est bien ici
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <LoginSignupForm />,
      },
    ],
  },
];

export default routes;
