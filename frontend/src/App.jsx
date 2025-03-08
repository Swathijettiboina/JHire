import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; //  Context for global auth state
import ViewJob from "./components/JobComponents/ViewJob";
import JobListing from "./components/JobComponents/JobListing";
import HRSignUp from "./components/Auth/HRSignUp";
import JobSeekerRegistration from "./components/JobSeeker/JobSeekerRegistration";
import Home from "./components/HomeComponents/Home";
import Login from "./components/Auth/Login";
import HRDashboard from "./components/HRComponents/HRDashboard";
import AuthNavbar from "./components/HomeComponents/AuthNavBar";
import ProtectedRoute from "./context/ProtectedRoute";
import PostJobForm from "./components/JobComponents/PostJobForm";
import SeekerDashBoard from "./components/JobSeeker/SeekerDashBoard";
import About from "./components/Pages/About";
import Services from "./components/Pages/Services";
import ViewJobAlongWIthApplicants from "./components/JobComponents/ViewJobAlongWIthApplicants";
import SeekerListing from "./components/JobSeeker/SeekerListing";


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
          <Route path="/about" element={<About/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/candidates" element={<SeekerListing />} />

          {/* protected routes are wrapped  */}
          <Route element={<ProtectedRoute />}>
            <Route path="/jobs/:id" element={<ViewJob />} />
            <Route path="/hr-dashboard" element={<HRDashboard />} />
            <Route path="/seeker-dashboard" element={<SeekerDashBoard />} />
            <Route path="/post-job" element={<PostJobForm />} />
            <Route path="/hr/job-details/:job_id" element={<ViewJobAlongWIthApplicants />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
