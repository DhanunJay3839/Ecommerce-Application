import React from "react";
import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import "./create.css";

const CreateAccount=()=> {

    const [res, setRes] = useState();
    const [message,setMessage] = useState("");
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
   

    const post_data = async () => {
            const res = await axios.post("http://localhost:9004/saveuser",
                {
                   
                    "uname": ref1.current.value,
                    "uemail": ref2.current.value,
                    "upass": ref3.current.value,
                }
            
            );

            if(res.data ==="Registered Successfully")
            {
              setMessage("✅ Account Created Successfully!")

            }
            else{
              setMessage("❌ Failed to create!");
            }
            setRes(res.data);
        
    };
  return (
    <>
      <div className="container-create">
        <div className="header-create">
          <div className="headleft-create">
            <p className="title-create">EasyKart</p>
            <p className="subclass-create">Explore</p>
          </div>
          <div className="headmiddle-create">
            <input
              className="searchbar-create"
              type="text"
              name="search"
              placeholder="Search for Products, Brands and More"
            />
          </div>
          <div className="headright-create">
            <div className="rightfirst-create">
              <Link to="/" className="loginn-create">
                Home
              </Link>
            </div>
            
            <div className="right1-create">
              <img src="icons8-admin-32.png" className="adminimg-create" alt="Admin" />
              <Link to="/admin"className="admin-create">Admin</Link>
            </div>
          </div>
        </div>
        
        <div className="secondheader-create">
          <div className="product1-create">
            <p className="producttext1-create">Mobiles</p>
          </div>
          <div className="product2-create">
            <p className="producttext2-create">Fashion</p>
          </div>
          <div className="product3-create">
            <p className="producttext3-create">Electronics</p>
          </div>
          <div className="product4-create">
            <p className="producttext4-create">Home & Furniture</p>
          </div>
          <div className="product5-create">
            <p className="producttext-create">Appliances</p>
          </div>
          <div className="product6-create">
            <p className="producttext-create">Toys</p>
          </div>
          <div className="product7-create">
            <p className="producttext-create">Two Wheelers</p>
          </div>
        </div>
        
        <div className="login-container-create">
          <div className="left-panel-create">
            <h2 className="login-create">Looks Like you're<br/> new here!</h2>
            <p className="get-create">Sign up with your email to get started</p>
            <img src="shopcart.png" className="shopcartimgc"/>
          </div>
          <div className="right-panel-create">
            <input className="text-create" type="text" placeholder="Enter your Name" ref={ref1}/>
            <input className="email-create" type="email" placeholder="Enter Email" ref={ref2}/>
            <input className="pass-create" type="password" placeholder="Enter Password" ref={ref3}/>
            
            <div className="terms-create">
              By continuing, you agree to EasyKart's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
            </div>
            <button className="request-otp-create" onClick={post_data}>Register</button>
            <div className="succ">
            <p 
            className={res === "Registered Successfully" ? "success-message" : "error-message"}>
               {JSON.stringify(res)}
            </p>
            </div>
           
            <div className="footer-link-create">
              Already have an account? <Link to="/login" className="link-create">Login here</Link>
            </div>
          </div>
        </div>
        
       
      </div>
    </>
  );
}

export default CreateAccount;