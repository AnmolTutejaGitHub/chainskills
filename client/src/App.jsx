import { useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useAuthStore } from "./store/authStore.js";
import FreelancerOnboarding from "./pages/Onboarding/Freelancer";
import ClientOnboarding from "./pages/Onboarding/Client";
import ClientDashboard from "./pages/Dashboard/Client";
import PostJobPage from "./pages/Dashboard/Client/PostJob";
import FreelancerDashboard from "./pages/Dashboard/Freelancer";
import EditClientProfile from "./pages/Dashboard/Client/EditProfile";
import EditFreelancerProfile from "./pages/Dashboard/Freelancer/EditProfile";
import ApplyToJobPage from "./pages/Dashboard/Freelancer/ApplyToJob.jsx";
// import Messages from "./pages/Dashboard/Messages";
import ClientApplications from "./pages/ClientApplications.jsx";
import FreelancerProfileData from "./pages/FreelancerProfileData.jsx";

const Home = lazy(() => import("./pages/Home"));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  console.log("isAuthenticated: ", isAuthenticated);
  console.log("isCheckingAuth: ", isCheckingAuth);

  if (isCheckingAuth) {
    return <div>Loading....</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding/freelancer" element={<FreelancerOnboarding />} />
          <Route path="/onboarding/client" element={<ClientOnboarding />} />
          {/* <Route path="/dashboard/messages" element={<Messages />} /> */}
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          <Route path="/dashboard/client/post-job" element={<PostJobPage />} />
          <Route path="/dashboard/client/edit-profile" element={<ProtectedRoute><EditClientProfile /></ProtectedRoute>} />
          <Route path="/dashboard/freelancer" element={<ProtectedRoute><FreelancerDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/freelancer/edit-profile" element={<ProtectedRoute><EditFreelancerProfile /></ProtectedRoute>} />
          <Route path="/dashboard/freelancer/applyToJob" element={<ProtectedRoute><ApplyToJobPage /></ProtectedRoute>} />
          <Route path="/dashboard/client/applications/:id" element={<ProtectedRoute><ClientApplications/></ProtectedRoute>} />
          <Route path="/dashboard/freelancer/:id" element={<ProtectedRoute><FreelancerProfileData/></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
