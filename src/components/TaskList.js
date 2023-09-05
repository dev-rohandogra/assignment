import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onComplete, onRemove }) => {
  // Sort the tasks to display uncompleted first and completed last
  const sortedTasks = [...tasks].sort((taskA, taskB) => {
    // Sort completed tasks after uncompleted tasks
    if (taskA.completed && !taskB.completed) {
      return 1;
    } else if (!taskA.completed && taskB.completed) {
      return -1;
    }
    // If both tasks have the same completion status, maintain their original order
    return 0;
  });
  return (
    <ul>
      {sortedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onComplete={onComplete}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};

export default TaskList;
