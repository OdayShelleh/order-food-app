import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";

import CartItem from "./cartItem/CartItem";
import Modal from "./Modal";
import CartContext from "../../Context/cart-context";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [expanded, setExpanded] = useState(false);
  const cartCtx = useContext(CartContext);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoading, sendRequest } = useHttp();
  const sendRequestHandler = async (userData) => {
    setIsSubmitting(true);
    await sendRequest(
      {
        url: "https://order-food-app-508f6-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        headers: {
          "Type-Content": "application/json",
        },
        body: {
          orderedItems: cartCtx.items,
          userInfo: userData,
        },
      },
      (data) => {
        if (data.name !== null) {
          setIsSubmitting(false);
          setSubmittedSuccessfully(true);
        }
      }
    );
  };

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = (e) => {
    e.preventDefault();
    setExpanded(true);
  };

  const cartItemList = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={addItemHandler.bind(null, item)}
            onRemove={removeItemHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onClick={props.onClick}>
      {!isSubmitting && submittedSuccessfully && (
        <>
          <p>Form Submitted Successfully</p>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClick}>
              Close
            </button>
          </div>
        </>
      )}
      {isSubmitting && !submittedSuccessfully && <p>Submiting ...</p>}
      {!isSubmitting && !submittedSuccessfully && (
        <>
          {cartItemList}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>${cartCtx.totalAmount.toFixed(2)}</span>
          </div>
          {expanded && (
            <Checkout
              onCancel={props.onClick}
              onConfirm={sendRequestHandler}
              isLoading={isLoading}
            />
          )}
          {!expanded && (
            <div className={classes.actions}>
              <button
                className={classes["button--alt"]}
                onClick={props.onClick}
              >
                Close
              </button>
              <button className={classes.button} onClick={orderHandler}>
                Order
              </button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default Cart;
