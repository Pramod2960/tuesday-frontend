import { Calendar, ChevronDown, Home } from "lucide-react";
function Sidebar({ sidebarToggle }) {
  return (
    <div className="">
      <div
        className={`${
          sidebarToggle ? "hidden " : "block   "
        } bg-green-100  sidebar-height p-1 w-[180px] mt-[55px] `}
      >
        <ul>
          <li className="flex w-full">
            <button className="w-full flex p-2 hover:bg-slate-300 hover:bg-opacity-30 rounded-md">
              <Home className="mr-2" /> Home
            </button>
          </li>
          <li className="flex border-b-2">
            <button className="w-full flex p-2 hover:bg-slate-300 hover:bg-opacity-30 rounded-md">
              <Calendar className="mr-2" /> My Work
            </button>
          </li>
          <li>
            <button className=" w-full flex p-2 hover:bg-slate-300 hover:bg-opacity-30 rounded-md">
              <p className="flex">Start</p>
              <ChevronDown className="ml-14" />
            </button>
          </li>
          <li>
            <div className="flex p-1 ">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-2 border border-gray-400 rounded-md shadow h-8"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
