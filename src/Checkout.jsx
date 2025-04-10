import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./checkout.css";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "Card",
    products: [],
    orderDate: null,
    totalAmount: 0
  });
  
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from backend API on component mount
  useEffect(() => {
    axios.get("http://localhost:9004/items")
      .then(response => {
        const items = response.data;
        setCartItems(items);
        
        // Calculate total amount
        const total = items.reduce((sum, item) => sum + (item.price), 0);
        
        setFormData(prevData => ({
          ...prevData,
          products: items,
          totalAmount: total,
          orderDate: new Date().toISOString()
        }));
      })
      .catch(error => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const orderData = {
      ...formData,
      orderDate: new Date().toISOString()
    };
  
    // If payment method is UPI or Card, redirect to payment page
    if (formData.paymentMethod === "UPI" || formData.paymentMethod === "Card") {
      navigate("/payment", { state: orderData });
      return;
    }
  
    // If payment is COD, save order to backend
    try {
      await axios.post("http://localhost:9004/saveorder", orderData);
      await clearCart();
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  

  // Function to clear cart after order is placed
  const clearCart = () => {
    const deletePromises = cartItems.map(item =>
      axios.delete(`http://localhost:9004/remove/${item.id}`)
    );
    return Promise.all(deletePromises);
  };
  

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      
      {/* Display Cart Summary */}
      <div className="cart-summary">
        <h3>Order Summary</h3>
        {cartItems.length > 0 ? (
          <div>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.pname}</td>
                    <td>₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>₹{formData.totalAmount}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      
      {/* Shipping and Payment Form */}
      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>Shipping Details</h3>
        <div className="form-group">
          <label className="checkout-label">Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="checkout-input" 
          />
        </div>
        
        <div className="form-group">
          <label className="checkout-label">Address:</label>
          <textarea 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
            className="checkout-textarea"
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label className="checkout-label">Phone:</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
            className="checkout-input" 
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
          />
        </div>
        
        <div className="form-group">
          <label className="checkout-label">Payment Method:</label>
          <select 
            name="paymentMethod" 
            value={formData.paymentMethod} 
            onChange={handleChange} 
            className="checkout-select"
          >
            <option value="Card">Credit/Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="COD">Cash on Delivery</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="checkout-btn"
          disabled={cartItems.length === 0}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;