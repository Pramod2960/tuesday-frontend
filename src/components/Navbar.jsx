import {
  Bell,
  ChevronDown,
  FileQuestion,
  HardDrive,
  LogOut,
  Puzzle,
  Search,
  User,
  UserRoundPlus,
} from "lucide-react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav
      className="bg-white h-[55px] w-full fixed z-10  flex justify-between
     items-center border-b-1 drop-shadow-md "
    >
      <div>
        <div className="flex p-2 justify-between  items-center">
          <div className="flex justify-center items-center">
            <div className="flex items-left justify-left">
              <div className="h-8 w-8 mr-1 mt-1">
                <img
                  src="/logoipsum-295.svg"
                  className="animate-pulse"
                  alt="logo"
                />
              </div>
              <div className="flex items-center justify-center">
                <p className="text-2xl  ml-1 font-bold text-gray-900">
                  Tuesday
                </p>
                <p className="text-2xl ">.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center p-1 ml-2"></div>
      </div>
      <div>
        <div className="flex justify-center items-center p-1">
          <div>
            <button className="hover:bg-gray-300 hover:bg-opacity-50 rounded-md p-2">
              <Bell className="text-green-800" />
            </button>
          </div>

          <div className="p-1">
            <button className="hover:bg-gray-300 hover:bg-opacity-50 rounded-md p-2">
              <Search className="text-green-800" />
            </button>
          </div>

          <div className="p-1">
            <button
              onClick={() => {
                Cookies.remove("uid-client", { path: "/" });
                Cookies.remove("uid", { path: "/" });
                navigate("/login");
              }}
              className="hover:bg-gray-300 hover:bg-opacity-50 rounded-md p-2"
            >
              <LogOut className="text-green-800" />
            </button>
          </div>

          <div className=" border-l-gray-300  border-l-2 flex justify-center items-center">
            <div className="relative">
              <button className="hover:bg-gray-300 hover:bg-opacity-50 rounded-full p-2 mx-2 group">
                <User className="text-green-800" />
                <div className="z-10 hidden absolute rounded-lg shadow w-32 group-focus:block top-full right-0 bg-white">
                  <ul className="py-2 text-sm">
                    <li className="py-2 text-sm hover:bg-green-100 rounded-md">
                      <a href="https://react.dev/learn/react-developer-tools">
                        profile
                      </a>
                    </li>
                    <li className="py-2 text-sm hover:bg-green-100 rounded-md">
                      <a href="https://react.dev/learn/react-developer-tools">
                        Setting
                      </a>
                    </li>
                  </ul>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
