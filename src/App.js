import { useState } from "react";
import Header from "./components/header/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [editData, setEditData] = useState({
    edit: false,
    id: null,
    content: "",
  });

  const [refresh, setRefresh] = useState();

  const editHandler = (id, content) => {
    setEditData((prevstate) => ({
      ...prevstate,
      edit: true,
      id: id,
      content: content,
    }));
  };

  const resetEditHandler = () => {
    setEditData((prevstate) => ({
      ...prevstate,
      edit: false,
      id: null,
      content: "",
    }));
  };

  const trigerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <>
      <Header />
      <Form
        editData={editData}
        resetEdit={resetEditHandler}
        trigerRefresh={trigerRefresh}
      />
      <TodoList
        editHandler={editHandler}
        refresh={refresh}
        trigerRefresh={trigerRefresh}
      />
    </>
  );
}

export default App;
