import { useEffect, useState } from "react";
import classes from "./TodoPagination.module.css";

const TodoPagination = (props) => {
  const [totalPages, setTotalPages] = useState(0);
  let prev = "";
  let next = "";

  useEffect(() => {
    setTotalPages(
      props.totalTodos
        ? Math.ceil(Number(props.totalTodos) / Number(props.itemsPerPage))
        : 0
    );
  }, [props.totalTodos, props.itemsPerPage]);

  const switchPageHandler = (event) => {
    props.switchPage(Number(event.target.innerText));
    props.refresh();
  };

  const nextPageHandler = () => {
    props.switchPage(props.currentPage + 1);
    props.refresh();
  };

  const prevPageHandler = () => {
    props.switchPage(props.currentPage - 1);
    props.refresh();
  };

  const activePage = (page) => {
    if (page === props.currentPage) {
      return "active-page";
    }
  };

  if (props.currentPage === 1) {
    prev = (
      <a href="#" className={classes.hide}>
        &laquo;
      </a>
    );
  } else {
    prev = (
      <a href="#" onClick={prevPageHandler}>
        &laquo;
      </a>
    );
  }

  if (props.currentPage === totalPages) {
    next = (
      <a href="#" className={classes.hide}>
        &raquo;
      </a>
    );
  } else {
    next = (
      <a href="#" onClick={nextPageHandler}>
        &raquo;
      </a>
    );
  }

  return (
    <div className={classes.pagination}>
      {prev}
      {[...Array(totalPages)].map((item, index) => (
        <a
          key={index + 1}
          // value={index + 1}
          href="#"
          className={classes[activePage(index + 1)]}
          onClick={switchPageHandler}
        >
          {index + 1}
        </a>
      ))}
      {next}
    </div>
  );
};

export default TodoPagination;
