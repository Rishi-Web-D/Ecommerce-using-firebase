import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import TopAppBar from "./components/layout/TopAppBar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home/Home";
import CategorisedProducts from "./pages/Products/CategorisedProducts";
import DataProvider from "./context/DataProvider";
import Cart from "./pages/Cart/Cart";
import CartProvider from "./context/CartProvider";
import AllProducts from "./pages/Products/AllProducts";
import ProductDetails from "./pages/Details/ProductDetails";
import Auth from "./pages/Auth/Auth";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <BrowserRouter basename="/Ecommerce-using-firebase">
    <AuthProvider>    
    <DataProvider>
      <CartProvider>       
          <TopAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-login" element={<Login />} />
            <Route path="/shop/:category" element={<CategorisedProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<AllProducts />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
          <Footer />
      </CartProvider>
    </DataProvider>
    </AuthProvider>
        </BrowserRouter>
  );
}

export default App;
