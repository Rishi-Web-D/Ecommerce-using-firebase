import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { CartContext } from "../../context/CartProvider";

const CategorisedProducts = () => {
  const { category } = useParams(); // Get the category from the URL
  const { addToCart } = useContext(CartContext);
  const [filteredData, setFilteredData] = useState([]);
  const data = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      const categoryData = data.find(
        (item) => item.title.toLowerCase() === category.toLowerCase()
      );
      setFilteredData(categoryData ? categoryData.items : []);
    }
  }, [category, data]);

  const handleAddToCart = async (item) => {
    await addToCart(item)
  };

  const handleViewProduct = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-uppercase mb-5">{category}</h1>
      <div className="row justify-content-center g-4">
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <div
              key={product.id}
              className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center"
            >
              <div
                className="card shadow-sm"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-truncate">{product.name}</h5>
                  <p className="card-text text-muted small mb-2">
                    {product.description}
                  </p>
                  <h5 className="text-primary mb-3">₹{product.price}</h5>
                  <div className="d-flex flex-column gap-2">
                    <button
                      onClick={() => handleViewProduct(product.id)}
                      className="btn btn-outline-primary"
                    >
                      View Product
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-success"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategorisedProducts;
