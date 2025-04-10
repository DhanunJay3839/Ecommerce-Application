import {useState,useEffect} from "react";
import {useNavigate,Link} from "react-router-dom";
import Login from "./Login";
import axios from "axios"; 
import CreateAccount from "./Createaccount";
import AdminLogin from "./admin";
import AdminDashboard from "./adminDashboard";
import ProductForm from "./product";
import Cart from "./cart";
import "./home.css";


function UserDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
    const token = localStorage.getItem("userToken");
    return token && token.trim() !== "";
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  
  const handleAction = (action) => {
    if (!isUserLoggedIn()) {
      navigate("/login"); 
    } else {
      alert(`${action} successful!`);
    }
  };

  const addToCart = (product) => {
    
      axios.post("http://localhost:9004/add", product)  
        .then(() => {
          alert("Added to Cart!");
          navigate("/cart"); 
        })
        .catch(error => console.error("Error adding to cart:", error));
    
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
          <p className="welcome-text">Welcome, User!</p>
          </div>
          <div className="right1">
            <img src="icons8-cart-32.png" className="cartimg" alt="Cart" />
            
            <Link to="/cart" className="cart">Cart</Link>
          </div>
          <div className="right1">
            <img src="icons8-box-32.png" className="ordersimg" alt="Orders" />
            
            <Link to="/orders" className="orders">Orders</Link>
          </div>
          <div className="right1">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
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
                <button className="addtocart" onClick={() => addToCart(product)}>Add to Cart</button>
                <button className="buy-now" onClick={() => addToCart(product)}>Buy Now</button>

              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </div>



  );
}



export default UserDashboard;
