import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function Comments(props) {
  const [comments, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/board/task/${props.id}/comment`, {
        withCredentials: true,
      })
      .then((response) => {
        const task = response.data;
        setComment(task.comments);
        console.error(props.id, task);
      })
      .catch((error) => {
        console.error("Error fetching the task:", error, props.id);
        toast.error("Error fetching the task.");
      });
  }, [comments]);

  function handlePost() {
    axios
      .post(
        `http://localhost:4000/board/task/${props.id}/comment`,
        { comments: newComment },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setComment([...comments, newComment]);
        setNewComment("");
        navigate("/board");
        // window.location.reload();
        toast.success("comment has been added");
      })
      .catch((error) => {
        toast.error(`Something went wrong : ${error}`);
      });
  }

  function handleDeleteComment(index) {
    axios
      .delete(`http://localhost:4000/board/task/${props.id}/comment/${index}`, {
        withCredentials: true,
      })
      .then((response) => {
        navigate("/board");
        toast.success("Comment has been deleted");
      })
      .catch((error) => {
        toast.error("Something went wrong", error);
      });
  }

  return (
    <>
      <div>
        <label htmlFor="comments">Comments</label>
        <textarea
          type="text"
          name="comments"
          placeholder="Add a comment"
          className="border p-2 m-2 rounded-md w-full"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button
          onClick={handlePost}
          className="p-2 m-2 w-full  bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <div>
        <ul className="flex flex-col gap-2">
          {comments.map((comment, index) => (
            <li
              key={index}
              className=" border p-2 rounded-lg flex gap-2 align-left items-center justify-between"
            >
              <div className="flex flex-col">
                <span>{comment}</span>
              </div>

              <div>
                <button
                  className="mt-1 p-2 text-black  hover:text-rose-600 hover:bg-white rounded-full  "
                  onClick={() => {
                    handleDeleteComment(index);
                  }}
                >
                  <Trash2 height={20} width={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
