import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("to-do");
  const [dueDate, setDueDate] = useState(new Date());

  const navigate = useNavigate();

  function handlePost() {
    axios
      .post(
        "http://localhost:4000/board/task",
        { title, desc, status, dueDate },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        navigate("/board");
        window.location.reload();
        toast.success("Task has been created");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  }

  return (
    <>
      <div className="w-full">
        <label for="title" className="ml-3 flex justify-start">
          Title
        </label>
        <input
          className="border p-2 m-2 rounded-md w-full"
          placeholder="Add a title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label for="desc" className="ml-3 flex justify-start">
          Description
        </label>

        <input
          className="border p-2 m-2 rounded-md w-full"
          placeholder="Desprition of the task"
          name="desc"
          onChange={(e) => setDesc(e.target.value)}
        />

        <label for="taskStatus" className="ml-3 flex justify-start">
          Status
        </label>
        <select
          id="taskStatus"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border w-full  m-2 border-gray-300 rounded p-2"
        >
          <option value="to-do">To Do</option>
          <option value="working">Working</option>
        </select>

        <label for="taskStatus" className="ml-3 flex justify-start">
          Due Date
        </label>
        <div className="flex justify-start w-full">
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy/MM/dd"
            className="border m-2 p-2 rounded-mdnw-full"
          />
        </div>
      </div>

      <button
        onClick={handlePost}
        type="submit"
        className="p-2 m-2 w-full  bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </>
  );
}
