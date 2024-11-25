import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { CartContext } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const { addToCart } = useContext(CartContext);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCategory, setSearchCategory] = useState(""); // State for category search
  const [searchName, setSearchName] = useState(""); // State for product name search
  const data = useContext(DataContext);
  const navigate = useNavigate()

  useEffect(() => {
    let updatedData = data;

    // Filter by category if a category search is provided
    if (searchCategory.trim()) {
      updatedData = updatedData.filter((item) =>
        item.title.toLowerCase().includes(searchCategory.toLowerCase())
      );
    }

    // Flatten items and filter by product name if a product search is provided
    updatedData = updatedData.flatMap((category) => category.items || []);
    if (searchName.trim()) {
      updatedData = updatedData.filter((product) =>
        product.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredData(updatedData);
  }, [searchCategory, searchName, data]);

  const handleAddToCart = async (item) => {
    await addToCart(item)
  };

  const handleViewProduct = (id) => {
    navigate(`/product-details/${id}`)
  }

  return (
    <div className="container">
      <h1 className="text-center text-uppercase my-5">All Products</h1>

      {/* Search Fields */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Category"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Product Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <div
              key={product.id}
              className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
            >
              <div className="card shadow-sm w-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    maxHeight: "250px",
                    width: "100%",
                    objectFit: "contain",
                    objectPosition: "top",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text text-muted">Price: ₹{product.price}</p>
                  <div className="mt-auto">
                    <button onClick={()=> handleViewProduct(product.id)} className="btn btn-primary w-100 mb-2">
                      View Product
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-primary w-100"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
