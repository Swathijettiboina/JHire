import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; //  Context for global auth state
import ViewJob from "./components/JobComponents/ViewJob";
import JobFiltering from "./components/JobComponents/JobFiltering";
import JobListing from "./components/JobComponents/JobListing";
import HRSignUp from "./components/Auth/HRSignUp";
import JobSeekerRegistration from "./components/JobSeeker/JobSeekerRegistration";
import Home from "./components/HomeComponents/Home";
import Login from "./components/Auth/Login";
import HRDashboard from "./components/HRComponents/HRDashboard";
import AuthNavbar from "./components/HomeComponents/AuthNavBar";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <AuthNavbar /> {/* Navbar updates dynamically */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alljobs" element={<JobListing />} />
          <Route path="/hr-register" element={<HRSignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<JobSeekerRegistration />} />

          {/* protected routes are wrapped  */}
          <Route element={<ProtectedRoute />}>
            <Route path="/hr-dashboard" element={<HRDashboard />} />
            <Route path="/filter" element={<JobFiltering />} />
            <Route path="/jobs/:id" element={<ViewJob />} />

          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
