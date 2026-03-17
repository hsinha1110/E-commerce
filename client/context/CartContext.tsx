import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "@/assets/constants/types";

type CartItem = Product & {
  quantity: number;
  size: string;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (product: Product, size: string) => Promise<void>;

  removeFromCart: (itemId: string, size: string) => Promise<void>;

  updateQuantity: (
    itemId: string,
    quantity: number,
    size: string,
  ) => Promise<void>;

  clearCart: () => Promise<void>;

  cartTotal: number;
  itemCount: number;

  isLoading: boolean;
};


const CartContext = createContext<CartContextType | undefined>(undefined);


export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const addToCart = async (product: Product, size: string) => {
    setIsLoading(true);

    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item._id === product._id && item.size === size,
      );

      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1, size }];
    });

    setIsLoading(false);
  };

  /* Remove Item From Cart */

  const removeFromCart = async (itemId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item._id === itemId && item.size === size)),
    );
  };


  const updateQuantity = async (
    itemId: string,
    quantity: number,
    size: string,
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === itemId && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  /* Clear Cart */

  const clearCart = async () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
