import { useRef, useState } from "react";

import Board from "./Board";
import CreateTask from "./CreateTask";
import { ArrowDownUp, PlusCircle } from "lucide-react";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const boardRef = useRef(null);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleSortClick = () => {
    if (boardRef.current) {
      boardRef.current.handleSort(); // Call the handleSort function in Board
    }
  };

  return (
    <>
      <div className="flex items-center  bg-gray-100 mt-[55px]">
        <button
          className="px-4 flex py-2 m-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
          onClick={openDialog}
        >
          New Task <PlusCircle className="ml-2" />
        </button>
        {isOpen && (
          <div className=" fixed inset-0  z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white z-50 rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h2 className="text-lg  z-50 font-semibold mb-4">
                Create a new Task
              </h2>

              <CreateTask />
              <div className="flex justify-end space-x-4">
                <button
                  className="mx-1 flex justify-center py-2 w-full bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  onClick={closeDialog}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          className="px-4  flex justify-center items-center py-2 m-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          onClick={handleSortClick}
        >
          Sort by Due Date{" "}
          <ArrowDownUp className="ml-2" height={20} width={20} />{" "}
        </button>
      </div>
      <div>
        <Board ref={boardRef} />
      </div>
    </>
  );
}

export default Dashboard;
