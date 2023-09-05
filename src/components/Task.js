import React, { useState, useEffect } from "react";
import "../App.css";

const Task = ({ task, onComplete, onRemove }) => {
  const [completed, setCompleted] = useState(task.completed);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const parts = new Date(date)
      .toLocaleDateString(undefined, options)
      .split(" ");
    return `${parts[1]} ${parts[0]}, ${parts[2]}`;
  };

  useEffect(() => {
    let timer;

    if (completed) {
      // Set a timeout to remove completed tasks after 1 minute
      timer = setTimeout(() => {
        onRemove(task.id);
      }, 60000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [completed, task.id, onRemove]);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
    onComplete(task.id, !completed);
  };
  const prefixClass = "task-item";
  const doneClass = task.completed ? " done" : "";
  return (
    <li className={prefixClass + doneClass}>
      <div className={prefixClass + "-wrapper"}>
        <label className={prefixClass + "-checkbox"}>
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCheckboxChange}
          />
          <div className={prefixClass + "-checkbox-el"}></div>
        </label>
        <div className={prefixClass + "-text"}>{task.text}</div>
        {completed && (
          <span className={prefixClass + "-text-date"}>
            {formatDate(task.completionDate)}
          </span>
        )}
      </div>
    </li>
  );
};

export default Task;
