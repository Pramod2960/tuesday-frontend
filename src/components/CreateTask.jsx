import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const navigate = useNavigate();

  function handlePost() {
    axios
      .post(
        "http://localhost:4000/board/task",
        { title, status, dueDate },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        navigate("/board");
        window.location.reload();
        setTimeout(() => {
          toast.success("Task has been created");
        }, 1000);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  }

  return (
    <>
      <div>
        <input
          className="border p-2 m-2 rounded-md"
          placeholder="Add a title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 m-2 rounded-md"
          placeholder="Desprition of the task"
          name="status"
          onChange={(e) => setStatus(e.target.value)}
        />

        <input
          className="border p-2 m-2 rounded-md"
          placeholder="due date"
          name="dueDate"
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button
        onClick={handlePost}
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </>
  );
}
