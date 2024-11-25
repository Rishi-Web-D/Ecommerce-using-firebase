import React, { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { Link } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const db = getFirestore();
  

  const increaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, parseInt(item.quantity) + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    } else {
      removeItem(id);
    }
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseInt(item.price) * item.quantity,
    0
  );

  return (
    <div className="container my-5">
      <h1 className="mb-4">Shopping Cart</h1>
      
      <div className="row">
        <div className="col-12">
          {cartItems.length > 0 ? (
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="text-center">Image</th>
                  <th scope="col">Product</th>
                  <th scope="col" className="text-center">Price</th>
                  <th scope="col" className="text-center">Quantity</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td className="text-center">₹{item.price}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Your cart is empty ! <Link to='/shop'> Go To Shop </Link></p>
          )}
        </div>
      </div>
      {cartItems.length > 0 && (
        <div className="row mt-4">
          <div className="col-12 text-end">
            <h3>Total Price: ₹{totalPrice}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
