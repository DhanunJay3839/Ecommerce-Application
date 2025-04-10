import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./payment.css";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  const handlePayment = async () => {
    try {
      // Simulate successful payment
      alert("Payment Successful!");

      // Send order data to backend
      await axios.post("http://localhost:9004/saveorder", orderData);

      // Redirect to orders page
      navigate("/orders");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Something went wrong while placing the order. Please try again.");
    }
  };

  if (!orderData) {
    return <p>No order data available.</p>;
  }

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <p>Payment Method: <strong>{orderData.paymentMethod}</strong></p>
      <p>Total Amount: ₹{orderData.totalAmount}</p>

      {/* Dummy input fields for UPI ID and Password */}
      <div className="input-group">
        <label htmlFor="upiId">UPI ID : </label>&nbsp;&nbsp;
        <input type="text" id="upiId" placeholder="12345@ybl" />
      </div><br></br>
      <div className="input-group">
        <label htmlFor="upiPassword">Password : </label>&nbsp;&nbsp;
        <input type="password" id="upiPassword" placeholder="Enter password" />
      </div>

      <button className="payment-button" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}

export default PaymentPage;
