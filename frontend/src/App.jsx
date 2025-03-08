import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; // ✅ Wrap app with user context
import ViewJob from "./components/JobComponents/ViewJob";
import JobFiltering from "./components/JobComponents/JobFiltering";
import JobListing from "./components/JobComponents/JobListing";
import HRSignUp from "./components/Auth/HRSignUp";
import JobSeekerRegistration from "./components/JobSeeker/JobSeekerRegistration";
import Home from "./components/HomeComponents/Home";
import Login from "./components/Auth/Login";
import HRDashboard from "./components/HRComponents/HRDashboard";
import AuthNavbar from "./components/HomeComponents/AuthNavBar";
import axios from "axios";
function App() {
  useEffect(() => {
    axios.get("/jhire/auth/check-session", { withCredentials: true })
      .then(res => {
        console.log("Auth Status:", res.data);
        setIsAuthenticated(res.data.isAuthenticated);
      })
      .catch(err => console.error(err));
  }, []);
  
  return (
    <UserProvider>
      <Router>
        <AuthNavbar /> {/* ✅ Navbar updates dynamically */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alljobs" element={<JobListing />} />
          <Route path="/jobs/:id" element={<ViewJob />} />
          <Route path="/filter" element={<JobFiltering />} />
          <Route path="/hr-register" element={<HRSignUp />} />
          <Route path="/hr-dashboard" element={<HRDashboard />} />
          <Route path="/seeker-register" element={<JobSeekerRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<JobSeekerRegistration />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
