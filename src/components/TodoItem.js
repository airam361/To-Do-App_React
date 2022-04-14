import { updateStatusToDo, deleteToDo } from "../lib/api";
import classes from "./TodoItem.module.css";

const TodoItem = (props) => {
  let image = "";
  if (props.completed) {
    image = "/done.png";
  } else {
    image = "/pending.png";
  }

  const clickStatusHandler = () => {
    updateStatusToDo(props.id, !props.completed).then((response) => {
      if (response.status === 200) {
        props.refresh();
      } else {
        alert("Could not update status!");
        return false;
      }
    });
  };

  const clickEditHandler = () => {
    props.editHandler(props.id, props.title);
  };

  const clickDeleteHandler = () => {
    deleteToDo(props.id).then((response) => {
      if (response.status === 200) {
        props.refresh();
      } else {
        alert("Could not delete!");
        return false;
      }
    });
  };

  return (
    <li className={classes.item}>
      <div className={classes["item__status"]}>
        <button
          type="button"
          className={classes.status}
          onClick={clickStatusHandler}
        >
          <img src={image} />
        </button>
      </div>
      <div className={classes["item__text"]}>{props.title}</div>
      <div className={classes["item__actions"]}>
        <button
          type="button"
          className={classes.edit}
          onClick={clickEditHandler}
        >
          <img src="/edit.png" />
        </button>
        <button
          type="button"
          className={classes.delete}
          onClick={clickDeleteHandler}
        >
          <img src="/delete.png" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
