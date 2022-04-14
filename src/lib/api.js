const link = "http://localhost:5500/todos";

export const getToDos = (specialLink = "", limit = 10, noPage = 1) => {
  let totalItems = 0;
  return fetch(link + `?_page=${noPage}&_limit=${limit}` + specialLink, {
    method: "GET",
  })
    .then((response) => {
      totalItems = response.headers.get("X-Total-Count");
      return response.json();
    })
    .then((data) => {
      return [data, totalItems];
    });
};

export const deleteToDo = (id) => {
  return fetch(link + "/" + id, {
    method: "DELETE",
  });
};

export const updateStatusToDo = (id, status) => {
  return fetch(link + "/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      completed: status,
    }),
  });
};

export const editTitleToDo = (id, title) => {
  return fetch(link + "/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
    }),
  });
};

export const createToDo = (id, title) => {
  return fetch(link, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      id: id,
      title: title,
      completed: false,
    }),
  });
};
