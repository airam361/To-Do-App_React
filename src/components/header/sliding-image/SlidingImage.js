import classes from "./SlidingImage.module.css";

const SlidingImage = () => {
  return (
    <div className={classes["sliding-image-container"]}>
      <div className={classes["sliding-image"]}></div>
    </div>
  );
};

export default SlidingImage;
