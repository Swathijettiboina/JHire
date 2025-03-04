import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Welcome to JHire</h2>
      <p className="text-lg text-gray-600 mb-8">Connecting job seekers and employers efficiently.</p>
      <div className="flex space-x-6">
        <Link to="/seeker-register">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            For Job Seekers
          </button>
        </Link>
        <Link to="/hr-register">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
            For Employers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
