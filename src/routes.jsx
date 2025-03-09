import { Suspense, lazy } from "react";
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ServerStackIcon,
  DocumentTextIcon, 
} from "@heroicons/react/24/solid";

import IsLoading from "./configs/isLoading";
import Files from "./pages/dashboard/files/Files";


const Home = lazy(() => import("@/pages/dashboard/Home"));
const Profile = lazy(() => import("@/pages/dashboard/profile/profile"));
const Tables = lazy(() => import("@/pages/dashboard/users/Tables"));
const LoginSignupForm = lazy(() => import("./pages/auth/LoginSignupForm"));
const ProjectDetails = lazy(() => import("./pages/dashboard/projects/project-details/ProjectDetails"));

const FileView = lazy(() => import("./pages/dashboard/files/FileView"));

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
        element: (
          <Suspense fallback={<IsLoading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Profile",
        path: "/profile",
        element: (
          <Suspense fallback={<IsLoading />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Users",
        path: "/tables",
        element: (
          <Suspense fallback={<IsLoading />}>
            <Tables />
          </Suspense>
        ),
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Files",
        path: "/files",
        element: (
          <Suspense fallback={<IsLoading />}>
            <Files />
          </Suspense>
        ),
      },
    ],
  },
  {
    title: "projects",
    layout: "project",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: (
          <Suspense fallback={<IsLoading />}>
            <LoginSignupForm />
          </Suspense>
        ),
      },
    ],
  },
];

export const hiddenRoutes = [
  {
    path: "/project-details/:id",
    element: (
      <Suspense fallback={<IsLoading />}>
        <ProjectDetails />
      </Suspense>
    ),
  },
  {
    path: "/files/:id",
    element: (
      <Suspense fallback={<IsLoading />}>
        <FileView />
      </Suspense>
    ),
  },
];

export default routes;
