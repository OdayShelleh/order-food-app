// import { createContext } from "react";
import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./Context/CartProvider";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCartHandler = () => {
    setIsCartShown(true);
  };

  const hideCartHandler = () => {
    setIsCartShown(false);
  };

  return (
    <CartProvider>
      {isCartShown && <Cart onClick={hideCartHandler} />}
      <Header onClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
