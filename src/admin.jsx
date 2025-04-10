import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admin.css"; 

const AdminLogin=()=> {

    const emailRef = useRef(null);
  const passRef = useRef(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

    const adminLogin = async () => {
        const email = emailRef.current.value;
        const password = passRef.current.value;
      
        
        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin123";
      
        if (email === adminEmail && password === adminPassword) {
          setMessage("✅ Admin Login Successful!");
          setTimeout(() => {
            navigate("/adminDashboard"); 
          }, 1000);
        } else {
            setMessage("❌ Invalid Admin Credentials!");
          }
        };
  return (
    <>
      <div className="containerl-admin">
        <div className="Headerl-admin">
          <div className="headleftl-admin">
            <p className="titlel-admin">EasyKart</p>
            <p className="subclassl-admin">Admin Portal</p>
          </div>
          <div className="headmiddlel-admin">
            <input
              className="searchbarl-admin"
              type="text"
              name="search"
              placeholder="Search for Products, Orders and More"
            />
          </div>
          <div className="headrightl-admin">
            <div className="rightfirstl-admin">
              <Link to="/" className="loginnl-admin">
                Home
              </Link>
            </div>
            
            <div className="right1l-admin">
              <img src="icons8-admin-32.png" className="adminimgl-admin" alt="Users" />
              <Link to="/login" className="admin-admin">User</Link>
            </div>
          </div>
        </div>
        
        <div className="secondheaderl-admin">
          <div className="product1l-admin">
            <p className="producttext1l-admin">Dashboard</p>
          </div>
          <div className="product2l-admin">
            <p className="producttext2l-admin">Products</p>
          </div>
          <div className="product3l-admin">
            <p className="producttext3l-admin">Orders</p>
          </div>
          <div className="product4l-admin">
            <p className="producttext4l-admin">Customers</p>
          </div>
          <div className="product5l-admin">
            <p className="producttextl-admin">Analytics</p>
          </div>
          <div className="product6l-admin">
            <p className="producttextl-admin">Inventory</p>
          </div>
          <div className="product7l-admin">
            <p className="producttextl-admin">Settings</p>
          </div>
        </div>
        
        <div className="login-container-admin">
          <div className="left-panel-admin">
            <h2 className="login-admin">Admin Login</h2>
            <p className="get-admin">Get access to EasyKart admin dashboard, product management and analytics</p>
          </div>
          <div className="right-panel-admin">
            <input className="mail-admin" type="text" placeholder="Enter Admin Username" ref={emailRef}/>
            <input className="pass-admin" type="password" placeholder="Enter Admin Password" ref={passRef}/>
            
            <div className="terms-admin">
              By continuing, you agree to EasyKart's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
            </div>
            <button className="request-otp-admin" onClick={adminLogin}>Login to Admin Panel</button>
            <p className={message.includes("✅") ? "success-message" : "error-message"}>{message}</p>
            <div className="footer-link-admin">
              Forgot your admin credentials? <a href="#" className="link-admin">Contact Support</a>
            </div>
          </div>
        </div>
        
        
      </div>
    </>
  );
}


export default AdminLogin;