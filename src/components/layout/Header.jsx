import classes from "./header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import { Fragment } from "react";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h2>REACT MEALS</h2>
        <HeaderCartButton onClick={props.onClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of food" />
      </div>
    </Fragment>
  );
};

export default Header;
