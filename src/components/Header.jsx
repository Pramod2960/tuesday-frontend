import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="bg-gray-100 shadow-slate-700 flex justify-between items-center p-3">
        <Link to="/">
          <div className="flex items-center">
            <img src="/logoipsum-295.svg" alt="logo" className="p-1" />
            <h1 className="text-4xl p-1 font-bold caret-gray-500">
              Tuesday<span className="font-light">.com</span>
            </h1>
          </div>
        </Link>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-gray-800 text-white px-4 py-2 rounded">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="bg-blue-700 text-white px-4 py-2 rounded">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
