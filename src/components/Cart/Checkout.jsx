import React from "react";
import classes from "./Checkout.module.css";
import useForm from "../../hooks/use-form";
import { checkoutForm } from "../../utils/CheckoutForm";

const Checkout = (props) => {
  const { renderFormInputs, isFormValid, form } = useForm(checkoutForm);
  const submitHandler = (e) => {
    e.preventDefault();
    let userData = {};
    for (const key in form) {
      userData[key] = form[key].value;
    }

    props.onConfirm(userData);
  };

  const cc = isFormValid() ? classes.submit : classes.invalid;
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["inputs-container"]}>{renderFormInputs()}</div>
      <div className={classes.actions}>
        <button onClick={props.onCancel}>Cancle</button>
        <button className={cc} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
