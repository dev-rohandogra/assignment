import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import "./App.css";

const LOCAL_STORAGE_KEY = "task-manager";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);

  const addTask = () => {
    if (taskText.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        completionDate: null,
      };
      setTasks([...tasks, newTask]);
      setTaskText("");
      setInputFocused(false);
    }
  };

  const completeTask = (taskId, completed) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed,
            completionDate: completed ? new Date().toISOString() : null,
          }
        : task
    );

    // Move completed tasks to the end and order by completion time
    const completedTasks = updatedTasks.filter((task) => task.completed);
    const uncompletedTasks = updatedTasks.filter((task) => !task.completed);
    const sortedCompletedTasks = completedTasks.sort((a, b) =>
      a.completionDate.localeCompare(b.completionDate)
    );
    const updatedSortedTasks = [...uncompletedTasks, ...sortedCompletedTasks];

    setTasks(updatedSortedTasks);
  };

  // const completeTask = (taskId, completed) => {
  //   const updatedTasks = tasks.map((task) =>
  //     task.id === taskId
  //       ? {
  //           ...task,
  //           completed,
  //           completionDate: completed ? new Date().toISOString() : null,
  //         }
  //       : task
  //   );

  //   // Separate completed and uncompleted tasks
  //   const completedTasks = updatedTasks.filter((task) => task.completed);
  //   const uncompletedTasks = updatedTasks.filter((task) => !task.completed);

  //   // Sort completed tasks by completion time in descending order
  //   completedTasks.sort((a, b) => {
  //     if (a.completionDate < b.completionDate) return 1;
  //     if (a.completionDate > b.completionDate) return -1;
  //     return 0;
  //   });

  //   // Combine uncompleted tasks and sorted completed tasks
  //   const updatedSortedTasks = [...uncompletedTasks, ...completedTasks];

  //   setTasks(updatedSortedTasks);
  // };

  const removeTaskById = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    // Load tasks from local storage on component mount AND Remove completed tasks on page refresh
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTasks.length > 0) {
      const uncompletedTasks = storedTasks.filter((task) => !task.completed);
      setTasks(uncompletedTasks);
    }
  }, []);

  useEffect(() => {
    // Save all tasks to local storage whenever tasks change
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const onBlurHandler = () => {
    if (taskText.length === 0) {
      setInputFocused(false);
    }
  };

  return (
    <div className="main">
      <h1>Task Manager</h1>
      <div className="todo">
        <div className="todo-header">
          <h1>Work</h1>
        </div>
        <div className="todo-form-wrapper">
          <div
            className={
              isInputFocused ? "todo-form todo-form-focused" : "todo-form"
            }
          >
            <h2>+</h2>
            <input
              type="text"
              placeholder="Add new task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={onBlurHandler}
            />
            {isInputFocused && (
              <button
                disabled={taskText.length === 0 && true}
                onClick={addTask}
              >
                Add
              </button>
            )}
          </div>
        </div>

        <div className="todo-body">
          <TaskList
            tasks={tasks}
            onComplete={completeTask}
            onRemove={removeTaskById}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
