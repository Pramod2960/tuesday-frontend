import { useState } from "react";

import Board from "./Board";
import CreateTask from "./CreateTask";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <div className="flex items-center  bg-gray-100 mt-[55px]">
        <button
          className="px-4 py-2 m-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          onClick={openDialog}
        >
          New Task
        </button>

        {isOpen && (
          <div className="fixed inset-0  z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white  z-50 rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h2 className="text-lg  z-50 font-semibold mb-4">
                Create a new Task
              </h2>

              <CreateTask />
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  onClick={closeDialog}
                >
                  Cancel
                </button>
                {/* <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={closeDialog}
                >
                  Confirm
                </button> */}
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <Board />
      </div>
    </>
  );
}

export default Dashboard;
