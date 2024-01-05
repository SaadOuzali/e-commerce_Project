import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const Shoppigncartcontexte = createContext({});

// to initial state
const initialState = () => {
  const cart = localStorage.getItem("cartshopping");
  return cart ? JSON.parse(cart) : [];
};
const CartShoppingprovider = ({ children }) => {
  // 

  const [cartItems, setCartItems] = useState(initialState());
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // to calculate total price
  const TotalPrice = useMemo(() => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price * cartItems[i].quantity;
    }
    return total;
  }, [cartItems]);

  // to save state in local storage dynamicly
  useEffect(() => {
    localStorage.setItem("cartshopping", JSON.stringify(cartItems));
  }, [cartItems]);

  // get quantity of product
  const getCartItemsQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  // to add product in to cart
  const increaseProductToCart = (id, img, price, title,_id) => {
    setCartItems((prev) => {
      if (!prev.find((item) => item.id === id)) {
        return [...prev, { id, img, price, title, quantity: 1,_id }];
      } else {
        return prev.map((item) => {
          return item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }
    });
  };

  // const increaseProductToCart = (id) => {
  //   setCartItems((prev) => {
  //     if (!prev.find((item) => item.id === id)) {
  //       return [...prev, { id, quantity: 1 }];
  //     } else {
  //       return prev.map((item) => {
  //         return item.id === id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item;
  //       });
  //     }
  //   });
  // };

  // to delete product in to cart
  // const decreaseItemInCart = (id) => {
  //   setCartItems((prev) => {
  //     if (!prev.find((item) => item.id === id)) {
  //       return [...prev];
  //     } else {
  //       return prev.map((item) => {
  //         return item.id === id
  //           ? { ...item, quantity: item.quantity - 1 }
  //           : item;
  //       });
  //     }
  //   });
  // };

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
        removeItemInCart,
        initialState,
        TotalPrice,
        anchorEl,
        setAnchorEl,
        open,
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
