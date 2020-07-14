import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskListItem from "./components/TaskListItem";
import TaskInput from "./components/TaskInput";
import { setLocalStorage, getLocalStorage } from "./utils";
import { KEY_STORAGE, STATUS } from "./constants";
import { getListTodos, updateListTodos } from "../api/Todos/Todos";

export const Todos = () => {
  const [tasks, setTasks] = useState([]);

  function handleSetTasks(tasks) {
    setTasks(tasks);
    setLocalStorage(KEY_STORAGE.TODOS, tasks);
  }

  const handleTasks = (task) => {
    const newTasks = [...tasks, task];
    handleSetTasks(newTasks);
    updateListTodos(newTasks);
  };

  const handleOnChange = ({ status, id }) => {
    const indexTask = tasks.findIndex((task) => task[`id`] === id);
    if (indexTask > -1) {
      let newTasks = [...tasks];
      let newTask = { ...tasks[indexTask] };
      switch (status) {
        case STATUS.START:
          newTasks[indexTask] = {
            ...newTask,
            status: STATUS.IN_PROGRESS,
          };
          break;
        case STATUS.IN_PROGRESS:
          newTasks[indexTask] = {
            ...newTask,
            status: STATUS.DONE,
          };
          break;
        case STATUS.DONE:
          break;
        case STATUS.CANCELED:
          newTasks[indexTask] = {
            ...newTask,
            status: STATUS.CANCELED,
          };
          break;
        case STATUS.DELETED:
          newTasks[indexTask] = {
            ...newTask,
            status: STATUS.DELETED,
          };
          break;
        default:
          status = STATUS.START;
          break;
      }
      handleSetTasks(newTasks);
      updateListTodos(newTasks);
    }
  };

  useEffect(() => {
    async function getTodos() {
      const { data } = await getListTodos();
      const localTasks = getLocalStorage(KEY_STORAGE.TODOS);
      let newTasks = [...data];
      if (localTasks) {
        newTasks = newTasks.concat(localTasks);
      }
      handleSetTasks(newTasks);
    }
    getTodos();
  }, []);

  return (
    <>
      <TaskInput onAdd={handleTasks} />
      {tasks.length > 0 && (
        <TaskList>
          {tasks.map((task) => {
            return (
              <TaskListItem key={task.id} item={task} onChange={handleOnChange}>
                {task.title}
              </TaskListItem>
            );
          })}
        </TaskList>
      )}
    </>
  );
};
