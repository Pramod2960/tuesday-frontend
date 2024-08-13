import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

export default function Columns({ title, tasks, id }) {
  const [taskCount, setTaskCount] = useState(null);

  useEffect(() => {
    setTaskCount(tasks.length);
  }, [tasks]);

  return (
    <div className="bg-slate-100 rounded-md  min-w-[100px] w-full h-[80vh] overflow-y-auto  ">
      <h2 className="p-2 z-1 bg-gray-700 flex justify-center items-center  text-white text-center sticky top-0">
        {title}
        <span className="ml-2 bg-rose-800 rounded-full font-semibold w-6 h-6 flex items-center justify-center text-white">
          {taskCount}
        </span>
      </h2>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-2 h-full ${
              snapshot.isDraggingOver ? "bg-green-100 h-full" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <Task key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
