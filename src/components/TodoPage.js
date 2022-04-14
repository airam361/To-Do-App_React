import "./TodoPage.module.css";

const TodoPage = (props) => {
  return (
    <a href="#" rel={props.rel} className={props.className}>
      {props.children}
    </a>
  );
};

export default TodoPage;
