import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9004/items")  // Fetch from backend
      .then(response => setCartItems(response.data))
      .catch(error => console.error("Error fetching cart items:", error));
  }, []);

  const removeFromCart = (id) => {
    axios.delete(`http://localhost:9004/remove/${id}`)  // Remove from backend
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== id));
      })
      .catch(error => console.error("Error removing item:", error));
  };

  

  return (
    <div className="container">
        <div className="cartHead">
        <h2 className="cartshop">Shopping Cart</h2>
        </div>
      
      {cartItems.length > 0 ? (
        <div className="cart-container">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.pimgurl || "placeholder.jpg"} alt={item.pname} className="cart-image" />
              <div className="cart-details">
                <h3>{item.pname}</h3>
                <p>₹{item.price}</p>
                
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
      <div className="buttons-container">
        <button className="back-btn2" onClick={() => navigate("/userdashboard")}>Continue Shopping</button>
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
