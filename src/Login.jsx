import React, { useRef, useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login=()=> {
    const emailRef = useRef(null);
  const passRef = useRef(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

    const handleLogin = async () => {
       
          const response = await axios.post("http://localhost:9004/loginuser", {
            uemail: emailRef.current.value,
            upass: passRef.current.value,
          });
    
          if (response.data === "Login Successful") {
            setMessage("✅ Login Successful!");
            setTimeout(() => {
              navigate("/userdashboard"); 
            }, 1000);
          } else {
            setMessage("❌ Invalid Credentials!");
          }
       
      };
  return (
    <>
      <div className="containerl">
        <div className="Headerl">
          <div className="headleftl">
            <p className="titlel">EasyKart</p>
            <p className="subclassl">User Portal</p>
          </div>
          <div className="headmiddlel">
            <input
              className="searchbarl"
              type="text"
              name="search"
              placeholder="Search for Products, Brands and More"
            />
          </div>
          <div className="headrightl">
            <div className="rightfirstl">
              <Link to="/" className="loginnl">
                Home
              </Link>
            </div>
            
            <div className="right1l">
              <img src="icons8-admin-32.png" className="adminimgl" alt="Admin" />
              <Link to="/admin"className="adminl">Admin</Link>
            </div>
          </div>
        </div>
        
        <div className="secondheaderl">
          <div className="product1l">
            <p className="producttext1l">Mobiles</p>
          </div>
          <div className="product2l">
            <p className="producttext2l">Fashion</p>
          </div>
          <div className="product3l">
            <p className="producttext3l">Electronics</p>
          </div>
          <div className="product4l">
            <p className="producttext4l">Home & Furniture</p>
          </div>
          <div className="product5l">
            <p className="producttextl">Appliances</p>
          </div>
          <div className="product6l">
            <p className="producttextl">Toys</p>
          </div>
          <div className="product7l">
            <p className="producttextl">Two Wheelers</p>
          </div>
        </div>
        
        <div className="login-container">
          <div className="left-panel">
            <h2 className="login">Login</h2>
            <p className="get">Get access to your Orders, Wishlist and Recommendations</p>
            <img src="shopcart.png" className="shopcartimg"/>
          </div>
          <div className="right-panel">
            <input className="mail" type="email" placeholder="Enter Email/Mobile number" ref={emailRef}/>
            <input className="pass" type="password" placeholder="Enter Password" ref={passRef}/>
            
            <div className="terms">
              By continuing, you agree to EasyKart's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
            </div>
            <button className="request-otp" onClick={handleLogin}>Submit</button>
            <p className={message.includes("✅") ? "success-message" : "error-message"}>{message}</p>
            <div className="footer-link">
              New to EasyKart? <Link to="/create" className="link">Create an account</Link>
            </div>
          </div>
        </div>
        
       
      </div>
    </>
  );
}

export default Login;