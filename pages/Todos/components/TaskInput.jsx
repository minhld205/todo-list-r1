import { useState } from "react";
import { STATUS } from "../constants";

export default ({ onAdd }) => {
  const [taskTitle, updateTaskTitle] = useState("");

  const addTask = () => {
    if (onAdd && taskTitle) {
      onAdd({
        id: Date.now(),
        title: taskTitle,
        status: STATUS.START,
      });
    }
    updateTaskTitle("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  const handleOnChange = (e) => {
    updateTaskTitle(e.currentTarget.value);
  };

  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <input
          className="task-input"
          type="text"
          value={taskTitle}
          onChange={handleOnChange}
        />
      </form>
      <style jsx>{`
        .container {
          display: flex;
          margin: 16px 0px;
        }
        .task-input {
          appearance: none;
          padding: 8px 4px;
          display: block;
          flex: 1;
          border: 1px solid #dedede;
          border-radius: 2px;
        }
      `}</style>
    </>
  );
};
