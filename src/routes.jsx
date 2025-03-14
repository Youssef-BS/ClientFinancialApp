import { Suspense, lazy } from "react";
import { motion } from "framer-motion"; // Import motion
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";

import IsLoading from "./configs/isLoading";
import AddProject from "./pages/dashboard/projects/AddProject";

const Home = lazy(() => import("@/pages/dashboard/Home"));
const Profile = lazy(() => import("@/pages/dashboard/profile/profile"));
const Tables = lazy(() => import("@/pages/dashboard/users/Tables"));
const ProjectDetails = lazy(() => import("./pages/dashboard/projects/project-details/ProjectDetails"));
const EditFile = lazy(() => import("./pages/dashboard/files/EditFile"));
const FileView = lazy(() => import("./pages/dashboard/files/FileView"));
const AddFile = lazy(() => import("./pages/dashboard/files/AddFile"));
const Bilan = lazy(() => import("./pages/dashboard/files/Bilan"));
const Files = lazy(() => import('./pages/dashboard/files/Files'));

const icon = {
  className: "w-5 h-5 text-inherit",
};

const fadeInTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Dashboard",
        path: "/home",
        element: (
          <Suspense fallback={<IsLoading />}>
            <motion.div {...fadeInTransition}>
              <Home />
            </motion.div>
          </Suspense>
        ),
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Profile",
        path: "/profile",
        element: (
          <Suspense fallback={<IsLoading />}>
            <motion.div {...fadeInTransition}>
              <Profile />
            </motion.div>
          </Suspense>
        ),
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Users",
        path: "/tables",
        element: (
          <Suspense fallback={<IsLoading />}>
            <motion.div {...fadeInTransition}>
              <Tables />
            </motion.div>
          </Suspense>
        ),
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Files",
        path: "/files",
        element: (
          <Suspense fallback={<IsLoading />}>
            <motion.div {...fadeInTransition}>
              <Files />
            </motion.div>
          </Suspense>
        ),
      },
      {
        icon: <ClipboardDocumentListIcon {...icon} />,
        name: "Add New Project",
        path: "/add-project",
        element: (
          <Suspense fallback={<IsLoading />}>
            <motion.div {...fadeInTransition}>
              <AddProject />
            </motion.div>
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
        <motion.div {...fadeInTransition}>
          <ProjectDetails />
        </motion.div>
      </Suspense>
    ),
  },
  {
    path: "/files/add",
    element: (
      <Suspense fallback={<IsLoading />}>
        <motion.div {...fadeInTransition}>
          <AddFile />
        </motion.div>
      </Suspense>
    ),
  },
  {
    path: "/files/edit/:id",
    element: (
      <Suspense fallback={<IsLoading />}>
        <motion.div {...fadeInTransition}>
          <EditFile />
        </motion.div>
      </Suspense>
    ),
  },
  {
    path: "/files/:id",
    element: (
      <Suspense fallback={<IsLoading />}>
        <motion.div {...fadeInTransition}>
          <FileView />
        </motion.div>
      </Suspense>
    ),
  },
  {
    path: "/bilan/:projectId",
    element: (
      <Suspense fallback={<IsLoading />}>
        <motion.div {...fadeInTransition}>
          <Bilan />
        </motion.div>
      </Suspense>
    ),
  },
];

export default routes;
