import Input from "../components/Input/Input";
import {
  maxLengthRule,
  minLengthRule,
  requiredRule,
} from "./inputValidationRules";

export const createFormFieldConfig = (label, name, type, defaultValue = "") => {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      return (
        <Input
          key={key}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          value={value}
          handleChange={handleChange}
          errorMessage={error}
        />
      );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: "",
    touched: false,
  };
};

export const checkoutForm = {
  name: {
    ...createFormFieldConfig("Full Name", "name", "text"),
    validationRules: [
      requiredRule("name"),
      minLengthRule("name", 3),
      maxLengthRule("name", 25),
    ],
  },
  address: {
    ...createFormFieldConfig("Address", "address", "address"),
    validationRules: [
      requiredRule("address"),
      minLengthRule("address", 8),
      maxLengthRule("address", 20),
    ],
  },
  city: {
    ...createFormFieldConfig("City", "city", "city"),
    validationRules: [
      requiredRule("city"),
      minLengthRule("city", 8),
      maxLengthRule("city", 20),
    ],
  },
  street: {
    ...createFormFieldConfig("Street", "street", "text"),
    validationRules: [
      requiredRule("street"),
      minLengthRule("street", 6),
      maxLengthRule("street", 25),
    ],
  },
};
