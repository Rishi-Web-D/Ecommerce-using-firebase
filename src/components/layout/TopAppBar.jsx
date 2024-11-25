import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartProvider";
import { AuthContext } from "../../context/AuthProvider";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

const TopAppBar = () => {
  const navigate = useNavigate();
  const {user,handleLogout} = useContext(AuthContext)
  const { cartItems, setCartItems } = useContext(CartContext); // Get cart items from context
  const [isHovered, setIsHovered] = useState(false); // Track hover state


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo Section */}
        <Link className="navbar-brand fw-bold" to="/">
          BrandLogo
        </Link>

        {/* Navbar Buttons */}
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => navigate("/shop")}
          >
            Shop
          </button>

          {user != null ? (
            <button
            className="btn btn-outline-success me-2"
            onClick={()=> {
              setCartItems([])
              handleLogout()
            }}          >
             Sign Out           
            </button>
          ) : (
            <button
            className="btn btn-outline-success me-2"
            onClick={() =>  navigate('/auth')}          >
           Sign In           
          </button>
          )}

          

          {/* Cart Icon with Dropdown */}
          <div
            className="position-relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button className="btn btn-outline-dark">
              <i className="bi bi-cart3"></i> {cartItems?.length}
            </button>

            {/* Dropdown with Cart Items */}
            {isHovered && (
              <div
                className="position-absolute bg-white border rounded shadow p-3"
                style={{
                  top: "100%",
                  right: 0,
                  width: "300px",
                  zIndex: 10,
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {cartItems.length > 0 ? (
                  <div>
                    <ul className="list-group">
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="list-group-item d-flex align-items-center"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                            className="me-3"
                          />
                          <div>
                            <p className="mb-1 fw-bold">{item.name}</p>
                            <p className="mb-0 text-muted">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="btn btn-primary w-100 mt-3"
                      onClick={() => navigate("/cart")}
                    >
                      Checkout
                    </button>
                  </div>
                ) : (
                  <p className="text-center text-muted mb-0">
                    Your cart is empty!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopAppBar;
