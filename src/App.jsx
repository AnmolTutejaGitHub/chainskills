import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <BrowserRouter>
      {/* <Suspense fallback={<Loading />}> */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  )
}

export default App
