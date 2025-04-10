import {useState,useEffect} from "react";
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import Login from "./Login";
import axios from "axios"; 
import CreateAccount from "./Createaccount";
import Cart from "./cart";
import AdminLogin from "./admin";
import UserDashboard from "./UserDashboard";
import Checkout from "./Checkout";
import AdminDashboard from "./adminDashboard";
import ProductForm from "./product";
import Orders from "./Orders";
import "./home.css";
import PaymentPage from "./PaymentPage";
import CustomerManagement from "./CustomerManagement";


function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);


  // Fetch products from backend
  useEffect(() => {
    axios.get("http://localhost:9004/getallp") 
      .then((response) => {
        setProducts(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const isUserLoggedIn = () => {
    return localStorage.getItem("userToken") !== null; // Assume token is stored in localStorage
  };

  useEffect(() => {
    console.log("showPopup state changed:", showPopup);
  }, [showPopup]);

  // Handle Add to Cart and Buy Now
  const handleAction = (action) => {
    if (!isUserLoggedIn()) {
      console.log("User not logged in, showing popup");
      setShowPopup(true); // Show popup if not logged in
    } else {
      alert(`${action} successful!`);
    }
  };
  
  

  return (
    <div className="container">
      
      <div className="Header">
        <div className="headleft">
          <p className="title">EasyKart</p>
          <p className="subclass">Explore</p>
        </div>
        <div className="headmiddle">
          <input className="searchbar" type="text" placeholder="Search for Products, Brands and More" />
        </div>
        <div className="headright">
          <div className="right1">
            <img src="icons8-male-user-32.png" className="profileimg" alt="User Profile" />
            <Link to="/login" className="loginn">Login</Link>
          </div>
          
          <div className="right1" onClick={() => handleAction("Cart")}>
            <img src="icons8-cart-32.png" className="cartimg" alt="Cart" />
            <span className="cart">Cart</span>

          </div>
          <div className="right1" onClick={() => handleAction("Orders")}>
             <img src="icons8-box-32.png" className="ordersimg" alt="Orders" />
             <span className="orders">Orders</span>
          </div>
          <div className="right1">
            <img src="icons8-admin-32.png" className="adminimg" alt="Admin" />
            <Link to="/admin" className="admin">Admin</Link>
          </div>
        </div>
      </div>

      <div className="secondheader">
        <div className="product1">
          <img src="mobiles.jpg" className="mobileimg" alt="Mobiles" />
          <p className="producttext1">Mobiles</p>
        </div>
        <div className="product2">
          <img src="fashion.jpg" className="fashimg" alt="Fashion" />
          <p className="producttext2">Fashion</p>
        </div>
        <div className="product3">
          <img src="Electronics.jpg" className="elecimg" alt="Electronics" />
          <p className="producttext3">Electronics</p>
        </div>
        <div className="product4">
          <img src="furniture.jpg" className="furimg" alt="Furniture" />
          <p className="producttext4">Home & Furniture</p>
        </div>
        <div className="product5">
          <img src="appliances.jpg" className="applimg" alt="Appliances" />
          <p className="producttext5">Appliances</p>
        </div>
        <div className="product6">
          <img src="toys.jpg" className="toyimg" alt="Toys" />
          <p className="producttext6">Toys</p>
        </div>
        <div className="product7">
          <img src="vehicle.jpg" className="twoimg" alt="Two Wheelers" />
          <p className="producttext7">Two Wheelers</p>
        </div>
      </div>

      

      {/* Carousel Section */}
      <div className="carousel">
        <div className="carousel-track">
          <img src="gaming1.jpg" alt="Image 1" />
          <img src="chairs2.jpg" alt="Image 2" />
          <img src="laptophome.jpg" alt="Image 4" />
          <img src="furniture3.jpg" alt="Image 3" />
          
          
        </div>
      </div>
     

      {/* Product List Section */}
      <div className="product-list">
        <h2>Latest Products</h2>
        <div className="products-container">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.pid} className="product-card">
                <img src={product.pimgurl || "placeholder.jpg"} alt={product.pname} className="product-image" />
                <h3 className="product-title">{product.pname}</h3>
                <p className="product-price">₹{product.price}
                {product.discount > 0 && (
              <span className="product-discount"> (-{product.discount}%)</span>
            )}
            <p className="product-stock" style={{ color: product.pstock > 0 ? "green" : "red" }}>
            {product.pstock > 0 ? `In Stock (${product.pstock} left)` : "Out of Stock"}
          </p>
                </p>
                <p className="product-description">{product.pdescription}</p>
                <button className="addtocart" onClick={() => handleAction("Add to Cart")}>Add to Cart</button>
                <button className="buy-now" onClick={() => handleAction("Buy Now")}>Buy Now</button>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
      {showPopup && (
  <div className="popup-overlay">
    <div className="popup">
      <p>Please sign in to continue.</p>
      <button onClick={() => navigate("/login")} className="popup-btn">Login</button>
      <button onClick={() => setShowPopup(false)} className="popup-btn cancel">Cancel</button>
    </div>
  </div>
)}

    </div>



  );
}

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateAccount />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/customermanagement" element={<CustomerManagement />} />
      </Routes>
  
  );
}

export default App;
