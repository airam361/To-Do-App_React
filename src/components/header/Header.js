import Grass from "./sliding-image/Grass";
import SlidingImage from "./sliding-image/SlidingImage";
import "./Header.module.css";

const Header = () => {
  return (
    <header>
      <img src="/checklist_logo.png" alt="To Do Logo" />
      <h3>My To-Do List</h3>
      <SlidingImage />
      {[...Array(12)].map((item, index) => (
        <Grass key={index} />
      ))}
    </header>
  );
};

export default Header;
