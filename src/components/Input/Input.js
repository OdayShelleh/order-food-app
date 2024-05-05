import React from "react";

import classes from "./Input.module.css";

function InputField(props) {
  const { label, type, name, handleChange, errorMessage, isValid, value } =
    props;

  return (
    <div className={classes.control}>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={handleChange} />
      {errorMessage && !isValid && <span>{errorMessage}</span>}
    </div>
  );
}

export default React.memo(InputField);
