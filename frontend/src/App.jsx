import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobsListing from "./components/JobComponents/JobListing";
import ViewJob from "./components/JobComponents/ViewJob";
import JobFiltering from "./components/JobComponents/JobFiltering";

import HRSignUp from "./components/Auth/HRSignUp";
import HRProfileUpdate from "./components/Auth/HRProfileUpdate";
import Login from "./components/Auth/Login";
import JobSeekerRegistration from "./components/JobSeeker/JobSeekerRegistration";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/jobs/:id" element={<ViewJob/>} />
        <Route path="/filter" element={<JobFiltering/>} />
        <Route path="/auth" element={<HRSignUp/>} />
        <Route path="/hr-profile" element={<HRProfileUpdate/>} />
        <Route path="/seeker-register" element={<JobSeekerRegistration/>} />
      </Routes>
    </Router>
  );
}

export default App;
