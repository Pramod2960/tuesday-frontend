import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Edit2, Trash2 } from "lucide-react";
import { ReactDialogBox } from "react-js-dialog-box";
import "react-js-dialog-box/dist/index.css";
import EditTask from "./EditTask.jsx";

export default function Task({ task, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const openBox = () => {
    setIsOpen(true);
  };

  const closeBox = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  function handleDelete(id) {
    axios
      .delete(`http://localhost:4000/board/task/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        navigate("/board");
        window.location.reload();
        toast.success("Task has been Delete");
      })
      .catch((error) => {
        toast.error("Something went wrong", error);
      });
  }

  const getBackgroundColor = (status) => {
    switch (status) {
      case "to-do":
        return "bg-blue-500";
      case "working":
        return "bg-green-400";
      case "done":
        return "bg-gray-400";
      default:
        return "bg-gray-300";
    }
  };
  return (
    <>
      <Draggable draggableId={`${task._id}`} key={task._id} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div
              className={`flex flex-col justify-start p-2 my-2 rounded-lg text-white ${getBackgroundColor(
                task.status
              )}`}
            >
              <div className="text-left">{task.title}</div>
              <div className="text-left">{task.desc}</div>
              <div className="text-gray-200">
                {" "}
                {format(new Date(task.dueDate), "d MMMM yyyy")}
              </div>
              <div className="flex justify-center items-center">
                <div>
                  <button
                    className="mt-1 p-2 text-white  hover:text-rose-600 hover:bg-white rounded-full  "
                    onClick={() => {
                      handleDelete(task._id);
                    }}
                  >
                    <Trash2 height={20} width={20} />
                  </button>
                </div>
                <div>
                  <button
                    className="mt-1 p-2 text-white  hover:text-rose-600 hover:bg-white rounded-full  "
                    onClick={openBox}
                  >
                    <Edit2 height={20} width={20} />
                  </button>
                  {isOpen && (
                    <ReactDialogBox
                      closeBox={closeBox}
                      modalWidth="70%"
                      headerBackgroundColor="gray"
                      headerTextColor="white"
                      headerHeight="60px"
                      closeButtonColor="white"
                      bodyBackgroundColor="white"
                      bodyTextColor="black"
                      bodyHeight="450px"
                      headerText="Edit the Task"
                    >
                      <div>
                        <EditTask id={task._id} />
                      </div>
                    </ReactDialogBox>
                  )}
                </div>
              </div>
            </div>

            {provided.placeholder}
          </div>
        )}
      </Draggable>
    </>
  );
}
