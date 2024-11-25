import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthProvider";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const {user} = useContext(AuthContext);
  const cartRef = collection(db, "cartItems");

  
  const fetchUserCartItems = async (userId) => {
    try {
      const q = query(cartRef, where("userId", "==", userId));
      const response = await getDocs(q);
      const userCart = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCartItems(userCart);
    } catch (error) {
      console.error("Error fetching user cart items:", error);
    }
  };

 
  const syncCartToFirestore = async () => {
    try {
      if (user && cartItems.length > 0) {
        for (const item of cartItems) {
          await addDoc(cartRef, { ...item, userId: user.uid });
        }
        console.log("Cart synced to Firestore.");
      }
    } catch (error) {
      console.error("Error syncing cart to Firestore:", error);
    }
  };

  useEffect(() => {    
    if(user != null){
      fetchUserCartItems(user?.uid)
    }
  }, [user]);

  const addToCart = async (item) => {
    try {
      if (user) {
       
        const newItem = { ...item, userId: user.uid };
        const docRef = await addDoc(cartRef, newItem);
        setCartItems((prevCart) => [
          ...prevCart,
          { ...newItem, id: docRef.id },
        ]);
      } else {
        
        setCartItems((prevCart) => [...prevCart, item]);
      }
      alert("Item Added To Cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item?"
    );
    if (confirmDelete) {
      try {
        if (user) {
          const specificDoc = doc(db, "cartItems", itemId);
          await deleteDoc(specificDoc);
        }
        setCartItems((prevCart) =>
          prevCart.filter((item) => item.id !== itemId)
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      if (user) {
        const specificDoc = doc(db, "cartItems", id);
        await updateDoc(specificDoc, { quantity: newQuantity });
      }
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  useEffect(() => {
    if (user) {
      syncCartToFirestore();
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
