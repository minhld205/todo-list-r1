import { get, post } from "../../libs/fetch";

const SERVICES = {
  TODOS: `https://5f0c7fa911b7f60016055ef2.mockapi.io/api/v1/todos`,
};

const URL = {
  GET_LIST_TODOS: `${SERVICES.TODOS}/getTodos`,
  UPDATE_TODOS: `${SERVICES.TODOS}/update`,
};

export const getListTodos = async () =>
  await get(URL.GET_LIST_TODOS)
    .then((response) => response.json())
    .then((data) => data);

export const updateListTodos = async (params) =>
  await post(URL.UPDATE_TODOS, params);
