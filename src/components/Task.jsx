import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function Task({ task, index }) {
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
        toast.error("Something went wrong");
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
              <div className="text-gray-200">
                {" "}
                {format(new Date(task.dueDate), "d MMMM yyyy")}
              </div>
              <div>
                <button
                  onClick={() => {
                    handleDelete(task._id);
                  }}
                ></button>
              </div>
            </div>

            {provided.placeholder}
          </div>
        )}
      </Draggable>
    </>
  );
}
