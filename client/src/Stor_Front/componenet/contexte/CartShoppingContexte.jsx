import { createContext, useContext, useState } from "react";

export const Shoppigncartcontexte = createContext({});

const CartShoppingprovider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // get quantity of product
  const getCartItemsQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // to add product in to cart
  const increaseProductToCart = (id) => {
    setCartItems((prev) => {
      if (!prev.find((item) => item.id === id)) {
        return [...prev, { id, quantity: 1 }];
      } else {
        return prev.map((item) => {
          return item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }
    });
  };

  // to delete product in to cart
  const decreaseItemInCart = (id) => {
    setCartItems((prev) => {
      if (!prev.find((item) => item.id === id)) {
        return [...prev];
      } else {
        return prev.map((item) => {
          return item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        });
      }
    });
  };

  // to remove item from cart
  const removeItemInCart = (id) => {
    setCartItems((prev) => {
      return prev.filter((item) => {
        return item.id !== id;
      });
    });
  };

  return (
    <Shoppigncartcontexte.Provider
      value={{
        cartItems,
        setCartItems,
        getCartItemsQuantity,
        increaseProductToCart,
        decreaseItemInCart,
        removeItemInCart
      }}
    >
      {children}
    </Shoppigncartcontexte.Provider>
  );
};

const useShoppingCart = () => {
  return useContext(Shoppigncartcontexte);
};

export default CartShoppingprovider;

export function Cart() {
  return <div>CartShoppingContexte</div>;
}
