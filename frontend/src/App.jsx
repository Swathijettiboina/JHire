import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewJob from "./components/JobComponents/ViewJob";
import JobFiltering from "./components/JobComponents/JobFiltering";
import JobListing from "./components/JobComponents/JobListing";
import HRSignUp from "./components/Auth/HRSignUp";
import HRProfileUpdate from "./components/HRComponents/HRProfileUpdate";
import JobSeekerRegistration from "./components/JobSeeker/JobSeekerRegistration";
import Home from "./components/HomeComponents/Home";
import HRProfile from "./components/HRComponents/HRProfile";
import Login from "./components/Auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="alljobs" element={<JobListing/>}/>
        <Route path="/jobs/:id" element={<ViewJob/>} />
        <Route path="/filter" element={<JobFiltering/>} />
        <Route path="/auth" element={<HRSignUp/>} />
        <Route path="/hr-profile-update" element={<HRProfileUpdate/>} />
        <Route path="/hr-profile" element={<HRProfile/>} />
        <Route path="/seeker-register" element={<JobSeekerRegistration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<JobSeekerRegistration/>} />
      </Routes>
    </Router>
  );
}

export default App;
