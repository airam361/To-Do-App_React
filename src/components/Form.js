import { useState, useEffect, useRef } from "react";
import { editTitleToDo, createToDo } from "../lib/api";
import classes from "./Form.module.css";

const idGenerator = () => {
  return new Date().getTime();
};

const Form = (props) => {
  const [textareaContent, setTextareaContent] = useState("");
  const textareaRef = useRef();

  let { edit, id, content } = props.editData;
  // let btnDescript = "Add TO DO";

  useEffect(() => {
    if (edit) {
      // btnDescript = "Edit TO DO";
      setTextareaContent(content);
    }
  }, [edit]);

  const textareaOnChangeHandler = (event) => {
    setTextareaContent(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (textareaContent.trim() === "") {
      textareaRef.current.focus();
      return;
    }

    if (edit) {
      editTitleToDo(id, textareaContent).then((response) => {
        if (response.status !== 200) {
          alert("Could not edit!");
          return false;
        }
      });
      props.resetEdit();
    } else {
      createToDo(idGenerator(), textareaContent).then((response) => {
        if (response.status !== 201) {
          alert("Could not create new ToDo!");
          return false;
        }
      });
      setTextareaContent("");
    }
    
    props.trigerRefresh(true);
  };

  return (
    <div className={classes["container-left"]}>
      <form className={classes["todo-form"]} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="todo">Your TO DO</label>
          <textarea
            ref={textareaRef}
            name="todo"
            value={textareaContent}
            onChange={textareaOnChangeHandler}
          ></textarea>
        </div>
        <div className={classes["form-actions"]}>
          <button>{edit ? "Edit TO DO" : "Add TO DO"}</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
