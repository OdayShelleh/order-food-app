import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Context/cart-context";

const MealItem = ({ id, name, description, price }) => {
  const cartCtx = useContext(CartContext);
  const addItemToCartHandler = (amount) => {
    const item = {
      id: id,
      name: name,
      price: price,
      amount: amount,
    };
    cartCtx.addItem(item);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>

        <div className={classes.description}>{description}</div>
        <div className={classes.price}>${price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddItemToCart={addItemToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
