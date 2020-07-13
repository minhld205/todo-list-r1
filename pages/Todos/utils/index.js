export const parseJSON = (json) => {
  return JSON.parse(json);
};

export const JSONstringify = (string) => {
  return JSON.stringify(string);
};

export const setLocalStorage = (key, data) => {
  return localStorage.setItem(key, JSONstringify(data));
};

export const getLocalStorage = (key) => {
  const dataLocalStorage = localStorage.getItem(key);
  return parseJSON(dataLocalStorage);
};
