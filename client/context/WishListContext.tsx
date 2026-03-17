import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/assets/constants/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const WishListContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishList, setWishList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishList = async () => {
    setLoading(true);
    setWishList(dummyWishlist);
    setLoading(false);
  };

  // toggle wishlist
  const toggleWishlist = (product: Product) => {
    setWishList((prev) => {
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        return prev.filter((item) => item._id !== product._id);
      }

      return [...prev, product];
    });
  };

  const isInWishlist = (id: string) => {
    return wishList.some((item) => item._id === id);
  };

  useEffect(() => {
    fetchWishList();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        wishList,
        loading,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}

export function useWishList() {
  const context = useContext(WishListContext);

  if (!context) {
    throw new Error("useWishList must be used within a WishlistProvider");
  }

  return context;
}
