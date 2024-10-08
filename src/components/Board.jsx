import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Columns from "./Columns";
import axios from "axios";
import toast from "react-hot-toast";
import Confetti from "react-confetti";

const Boards = forwardRef((props, ref) => {
  const [tasks, setTasks] = useState();
  const [toDo, setToDo] = useState([]);
  const [working, setWorking] = useState([]);
  const [done, setDone] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/board/task", {
        withCredentials: true,
      })
      .then((response) => {
        setTasks(response.data);
        const tasks = response.data;
        if (Array.isArray(tasks)) {
          const sortByPriority = (tasks) => {
            return tasks.sort((a, b) => b.priority - a.priority);
          };

          setToDo(
            sortByPriority(tasks.filter((task) => task.status === "to-do"))
          );
          setWorking(
            sortByPriority(tasks.filter((task) => task.status === "working"))
          );
          setDone(
            sortByPriority(tasks.filter((task) => task.status === "done"))
          );
        } else {
          console.error("Expected an array but got:", tasks);
        }
      })
      .catch((error) => {
        toast.error("Error in featching data, Please try later");
      });
  }, [tasks]);

  //sorting based on priority

  //sorting by Due Date
  const handleSort = () => {
    setToDo((prevToDo) =>
      [...prevToDo].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    );
    setWorking((prevWorking) =>
      [...prevWorking].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    );
    setDone((prevDone) =>
      [...prevDone].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    );
    toast.success("Sorted by Due Date");
  };

  useImperativeHandle(ref, () => ({
    handleSort,
  }));

  //Draging functionality
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // no change
    if (!destination || source.droppableId === destination.droppableId) return;

    // Get task
    const task = findItemById(draggableId, [...toDo, ...working, ...done]);

    if (!task) return;

    // Remove from source
    const sourceList = getListById(source.droppableId);
    const updatedSourceList = removeItemById(draggableId, sourceList);
    updateListById(source.droppableId, updatedSourceList);

    // Add to destination
    const destinationList = getListById(destination.droppableId);
    const updatedDestinationList = [
      ...destinationList.slice(0, destination.index),
      { ...task, status: getStatusById(destination.droppableId) },
      ...destinationList.slice(destination.index),
    ];

    updateListById(destination.droppableId, updatedDestinationList);

    const newStatus = getStatusById(destination.droppableId);
    //make changes in backend
    axios
      .patch(
        `http://localhost:4000/board/task/status/${draggableId}`,
        {
          status: getStatusById(destination.droppableId),
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Task status updated:", response.data);

        if (newStatus !== "done") toast.success("Item moved successfully");

        if (newStatus === "done") {
          toast("Good Job!", {
            icon: "😁🎉🎉",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });

          setShowConfetti(true);
          // Hide confetti after a short delay
          setTimeout(() => setShowConfetti(false), 4000);
        }
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
        toast.error("Something went wrong.");
      });

    function findItemById(_id, array) {
      return array.find((item) => item._id.toString() === _id);
    }
  };

  function getStatusById(id) {
    switch (id) {
      case "1":
        return "to-do";
      case "2":
        return "working";
      case "3":
        return "done";
      default:
        return "";
    }
  }

  function removeItemById(_id, array) {
    return array.filter((item) => item._id.toString() !== _id);
  }

  function getListById(id) {
    switch (id) {
      case "1":
        return toDo;
      case "2":
        return working;
      case "3":
        return done;
      default:
        return [];
    }
  }

  function updateListById(id, updatedList) {
    switch (id) {
      case "1":
        setToDo(updatedList);
        break;
      case "2":
        setWorking(updatedList);
        break;
      case "3":
        setDone(updatedList);
        break;
      default:
        break;
    }
  }

  function getStatusById(id) {
    switch (id) {
      case "1":
        return "to-do";
      case "2":
        return "working";
      case "3":
        return "done";
      default:
        return "";
    }
  }

  return (
    <>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {/* <SortButton onSort={handleSort} /> */}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-10 mx-5 justify-between items-center">
          <Columns title={"To Do"} tasks={toDo} id={"1"} />
          <Columns title={"Working"} tasks={working} id={"2"} />
          <Columns title={"Done"} tasks={done} id={"3"} />
        </div>
      </DragDropContext>
    </>
  );
});

export default Boards;
