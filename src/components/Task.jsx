import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Edit2, MessageCircle, Star, Trash2 } from "lucide-react";
import { ReactDialogBox } from "react-js-dialog-box";
import "react-js-dialog-box/dist/index.css";
import EditTask from "./EditTask.jsx";
import Comments from "./Comment.jsx";

export default function Task({ task, index }) {
  //for turncate the text
  const [showFullText, setShowFullText] = useState(false);
  const words = task.desc.split(" ");
  const truncatedText = words.slice(0, 10).join(" ");
  //...

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const openEditBox = () => setIsEditOpen(true);
  const closeEditBox = () => setIsEditOpen(false);

  const openCommentsBox = () => setIsCommentsOpen(true);
  const closeCommentsBox = () => setIsCommentsOpen(false);

  const navigate = useNavigate();

  function handleDelete(id) {
    axios
      .delete(`http://localhost:4000/board/task/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        navigate("/board");
        toast.success("Task has been Deleted.");
      })
      .catch((error) => {
        toast.error("Something went wrong", error);
      });
  }

  function handlePriority(id, priority) {
    console.log("handlePriortyclicked", id, priority);

    axios
      .patch(
        `http://localhost:4000/board/task/priority/${id}`,
        { priority },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        navigate("/board");
        toast.success("Priority has been set");
      })
      .catch((error) => {
        console.error("Error setting priority:", error);
        toast.error("Something went wrong");
      });
  }

  const getBackgroundColor = (status) => {
    switch (status) {
      case "to-do":
        return "bg-blue-500";
      case "working":
        return "bg-green-500";
      case "done":
        return "bg-gray-500";
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
              {/* TEXT FILED */}

              <div className="text-left capitalize font-semibold text-lg">
                {task.title}
              </div>

              <div className="text-left ">
                {showFullText ? task.desc : truncatedText}
                {words.length > 10 && (
                  <span
                    onClick={() => setShowFullText(!showFullText)}
                    className="text-white underline  font-semibold cursor-pointer ml-2"
                  >
                    {showFullText ? "Read Less" : "Read More... "}
                  </span>
                )}
              </div>

              <div className="text-gray-300 flex justify-end">
                {" "}
                {format(new Date(task.dueDate), "d MMMM yyyy")}
              </div>
              <div className="flex justify-center items-center">
                <div>
                  <button
                    className="mt-1 p-2 text-white  hover:text-yellow-500 hover:bg-white rounded-full   
                    "
                    onClick={() => {
                      if (task.priority === "-1") handlePriority(task._id, 1);
                      else handlePriority(task._id, -1);
                    }}
                  >
                    <Star
                      height={20}
                      width={20}
                      className={
                        task.priority === "1"
                          ? "fill-yellow-500  text-yellow-500 b-none"
                          : "text-current"
                      }
                    />
                  </button>
                </div>
                <div>
                  <button
                    className="mt-1 p-2 text-white  hover:text-rose-600 hover:bg-white rounded-full  "
                    onClick={() => handleDelete(task._id)}
                  >
                    <Trash2 height={20} width={20} />
                  </button>
                </div>
                <div>
                  <button
                    className="mt-1 p-2 text-white  hover:text-rose-600 hover:bg-white rounded-full  "
                    onClick={openEditBox}
                  >
                    <Edit2 height={20} width={20} />
                  </button>
                  {isEditOpen && (
                    <ReactDialogBox
                      closeBox={closeEditBox}
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
                <div>
                  <button
                    className="mt-1 p-2 text-white hover:text-rose-600 hover:bg-white rounded-full"
                    onClick={openCommentsBox}
                  >
                    <MessageCircle height={20} width={20} />
                  </button>
                  {isCommentsOpen && (
                    <div className="z-100">
                      <ReactDialogBox
                        closeBox={closeCommentsBox}
                        modalWidth="70%"
                        headerBackgroundColor="green"
                        headerTextColor="white"
                        headerHeight="60px"
                        closeButtonColor="white"
                        bodyBackgroundColor="white"
                        bodyTextColor="black"
                        bodyHeight="450px"
                        headerText="Comments"
                      >
                        <div>
                          <Comments id={task._id} />
                        </div>
                      </ReactDialogBox>
                    </div>
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
