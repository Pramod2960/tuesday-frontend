import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import { useState } from "react";

function Board() {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  return (
    <>
      <Navbar />

      <div className="flex justify-left items-left h-screen ">
        <div
          className={`${
            sidebarToggle ? "w-70px" : ""
          }border  border-gray-300 rounded-md transition-all duration-300`}
        >
          <Sidebar
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          />
        </div>
        <div className="border border-gray-300 rounded-md w-full">
          <Dashboard
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          />
        </div>
      </div>
    </>
  );
}

export default Board;
