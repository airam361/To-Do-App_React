import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classes from "./TodoOptions.module.css";

const TodoOptions = (props) => {
  const inputRef = useRef();
  
  const itemsPerPageHandler = (event) => {
    props.itemsPerPage(event.target.value);
  };

  const filterHandler = (event) => {
    props.filter(event.target.value);
  };

  const inputSearchHandler = (event) => {
    if (event.key === "Enter") {
      props.search(event.target.value);
      // event.target.value = "";
    }
  };
  const btnSearchHandler = () => {
    props.search(inputRef.current.value);
    // inputRef.current.value = "";
  };

  return (
    <div className={classes.options}>
      <div>
        <div className={classes["options__filter"]}>
          <label htmlFor="filter">Filter by:</label>
          <select name="filter" onChange={filterHandler}>
            <option value="">All</option>
            <option value="true">Completed</option>
            <option value="false">Pending</option>
          </select>
        </div>
        <div className={classes["options__items-per-page"]}>
          <label htmlFor="page">Items per page:</label>
          <select name="page" onChange={itemsPerPageHandler}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <div className={classes["options__search-box"]}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search TO DO"
          onKeyUp={inputSearchHandler}
        />
        <button type="button" onClick={btnSearchHandler}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={classes.color} />
        </button>
      </div>
    </div>
  );
};

export default TodoOptions;
