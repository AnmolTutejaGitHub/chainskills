import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AuthPage from "./pages/Auth";
import FreelancerOnboarding from "./pages/Onboarding/Freelancer";
import ClientOnboarding from "./pages/Onboarding/Client";
import ClientDashboard from "./pages/Dashboard/Client";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <BrowserRouter>
      {/* <Suspense fallback={<Loading />}> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/onboarding/freelancer" element={<FreelancerOnboarding />} />
          <Route path="/onboarding/client" element={<ClientOnboarding />} />
          <Route path="/dashboard/client" element={<ClientDashboard />} />
        </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  )
}

export default App
