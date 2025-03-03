import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">JHire</h1>
        <div className="space-x-4">
          <Link to="/seeker-register" className="text-white hover:underline">Job Seekers</Link>
          <Link to="/hr-register" className="text-white hover:underline">Employers</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
