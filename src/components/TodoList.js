import { useState, useEffect } from "react";

import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./TodoList.module.css";
import TodoOptions from "./TodoOptions";
import TodoPagination from "./TodoPagination";
import TodoItem from "./TodoItem";
import { getToDos } from "../lib/api";

const filterAndSearchLink = (filter, search) => {
  if (search.trim() === "" && filter === "") {
    return "";
  } else if (search.trim() === "") {
    return `&completed=${filter}`;
  } else if (filter === "") {
    return `&title_like=${search}`;
  } else {
    return `&completed=${filter}&q=${search}`;
  }
};

const TodoList = (props) => {
  const [todos, setTodos] = useState([]);
  const [totalTodos, setTotalTodos] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({
    itemsPerPage: "10",
    filter: "",
    search: "",
  });

  let { itemsPerPage, filter, search } = options;

  const refreshHandler = () => {
    props.trigerRefresh();
  };

  const searchHandler = (option) => {
    setOptions((prevState) => ({ ...prevState, search: option }));
    setCurrentPage(1);
    props.trigerRefresh();
  };
  const itemsPerPageHandler = (option) => {
    setOptions((prevState) => ({ ...prevState, itemsPerPage: option }));
    setCurrentPage(1);
    props.trigerRefresh();
  };
  const filterHandler = (option) => {
    setOptions((prevState) => ({ ...prevState, filter: option }));
    setCurrentPage(1);
    props.trigerRefresh();
  };

  const switchPage = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    setIsLoading(true);
    getToDos(
      filterAndSearchLink(filter, search),
      itemsPerPage,
      currentPage
    ).then((dataArr) => {
      setTodos(dataArr[0]);
      setTotalTodos(dataArr[1]);
      setIsLoading(false);
    });
  }, [props.refresh]);

  return (
    <div className={classes["container-rigth"]}>
      <TodoOptions
        search={searchHandler}
        filter={filterHandler}
        itemsPerPage={itemsPerPageHandler}
      />

      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <ul className={classes.items}>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                id={todo.id}
                completed={todo.completed}
                editHandler={props.editHandler}
                refresh={refreshHandler}
              />
            ))}
          </ul>

          <TodoPagination
            totalTodos={totalTodos}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            refresh={refreshHandler}
            switchPage={switchPage}
          />
        </>
      )}
    </div>
  );
};

export default TodoList;
