import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminDashboard.css"; 
import Login from "./Login";
import App from "./home";

const AdminDashboard=()=> {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken"); 
    navigate("/");
    window.location.reload(); 
  };

  return (
    <>
      <div className="containerl-admin">
        <div className="Headerl-adminad">
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
            
           
            <div className="right1">
              
                             
                           
          <button className="logout-btn2" onClick={handleLogout}>Logout</button>
         
          </div>
          </div>
        </div>
        
        <div className="secondheaderl-adminad">
          
          <div className="product1l-adminad">
            <Link to="/product"> <p className="producttext2l-admin">Products</p></Link>
          </div>
          
          <div className="product4l-adminad">
          <Link to="/customermanagement"> <p className="producttext4l-admin">Customers</p></Link>
          </div>
          
        </div>
        
        
        
        <div className="footerr-admin"></div>
      </div>
    </>
  );
}


export default AdminDashboard;