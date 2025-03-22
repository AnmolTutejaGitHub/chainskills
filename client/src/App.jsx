import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
// import AuthPage from "./pages/Auth";
import FreelancerOnboarding from "./pages/Onboarding/Freelancer";
import ClientOnboarding from "./pages/Onboarding/Client";
import ClientDashboard from "./pages/Dashboard/Client";
import PostJobPage from "./pages/Dashboard/Client/PostJob";
import FreelancerDashboard from "./pages/Dashboard/Freelancer";
import EditClientProfile from "./pages/Dashboard/Client/EditProfile";
import EditFreelancerProfile from "./pages/Dashboard/Freelancer/EditProfile";
// import Messages from "./pages/Dashboard/Messages";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <BrowserRouter>
      {/* <Suspense fallback={<Loading />}> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/auth" element={<AuthPage />} /> */}
          <Route path="/onboarding/freelancer" element={<FreelancerOnboarding />} />
          <Route path="/onboarding/client" element={<ClientOnboarding />} />
          {/* <Route path="/dashboard/messages" element={<Messages />} /> */}
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          <Route path="/dashboard/client/post-job" element={<PostJobPage />} />
          <Route path="/dashboard/client/edit-profile" element={<EditClientProfile />} />
          <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
          <Route path="/dashboard/freelancer/edit-profile" element={<EditFreelancerProfile />} />
        </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  )
}

export default App
