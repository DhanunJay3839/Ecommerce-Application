import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrdersFromBackend();
  }, []);

  const fetchOrdersFromBackend = async () => {
    try {
      const response = await axios.get("http://localhost:9004/allorders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const calculateTotal = (products) => {
    if (!products || products.length === 0) return 0;
    return products.reduce((total, product) => {
      return total + (product.price || 0);
    }, 0);
  };

  const confirmCancel = (index) => {
    setOrderToCancel(index);
    setShowPopup(true);
  };

  const handleCancelOrder = async () => {
    try {
      const orderId = orders[orderToCancel].id;
      await axios.delete(`http://localhost:9004/deleteorder/${orderId}`);
      const updatedOrders = orders.filter((_, i) => i !== orderToCancel);
      setOrders(updatedOrders);
      setShowPopup(false);
      setOrderToCancel(null);
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setOrderToCancel(null);
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>

      {/* Cancel Confirmation Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Cancel Order</h3>
            <p>Are you sure you want to cancel this order?</p>
            <div className="popup-buttons">
              <button className="cancel-confirm-btn" onClick={handleCancelOrder}>
                Yes, Cancel Order
              </button>
              <button className="keep-order-btn" onClick={closePopup}>
                No, Keep Order
              </button>
            </div>
          </div>
        </div>
      )}

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={order.id || index} className="order-item">
              <div className="order-details">
                <h3>Order #{index + 1}</h3>
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Order Date:</strong> 
  {order.orderDate
    ? new Date(order.orderDate).toLocaleString()
    : new Date().toLocaleString() // fallback to current date
  }
</p>

              </div>

              {order.products && order.products.length > 0 ? (
                <div className="ordered-products">
                  <h4>Ordered Items:</h4>
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((product, i) => (
                        <tr key={i} className="product-row">
                          <td>{product.pname}</td>
                          <td>₹{product.price}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="total-row">
                        <td><strong>Total</strong></td>
                        <td><strong>₹{order.totalAmount || calculateTotal(order.products)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <p>No items in this order.</p>
              )}

              <div className="order-actions">
                <button className="cancel-btn" onClick={() => confirmCancel(index)}>
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-orders">
          <p>No orders placed yet.</p>
          <button className="shop-now-btn" onClick={() => navigate("/userdashboard")}>
            Shop Now
          </button>
        </div>
      )}

      <button className="back-btn" onClick={() => navigate("/userdashboard")}>
        Back to Shopping
      </button>
    </div>
  );
}

export default Orders;
