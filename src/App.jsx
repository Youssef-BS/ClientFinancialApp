import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "@/protectedRoute/ProtectedRoute";
import IsLoading from "./configs/isLoading";
import LoginSignupForm from "./pages/auth/LoginSignupForm";


const Dashboard = lazy(() => import("@/layouts/Dashboard"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const Home = lazy(() => import("@/pages/home/Home"));

function App() {
  return (
    <Suspense fallback={<IsLoading />}>
      <Routes>
        <Route path="/dashboard/*" element={<ProtectedRoute />}>
          <Route path="*" element={<Dashboard />} />
        </Route>
        <Route path="/auth/*" element={<LoginSignupForm />} />
        <Route path="/index" element={<Home />} />
        <Route path="/auth/forget-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
