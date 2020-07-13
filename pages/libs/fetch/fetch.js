export const get = (URL) => {
  return window.fetch && fetch(URL);
};

export const post = (URL, params) => {
  return (
    window.fetch &&
    fetch(URL, {
      method: "POST",
      body: JSON.stringify(params),
    })
  );
};
