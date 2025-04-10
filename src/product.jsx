import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; 
import "./productForm.css";

const ProductForm = ({ editProduct = null }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pname: "",
    price: "",
    pdescription: "",
    pstock: "",
    pimgurl: "",
    discount: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.pname.trim()) {
      formErrors.pname = "Product name is required";
      isValid = false;
    }
    if (!formData.price || isNaN(formData.price)) {
      formErrors.price = "Valid price is required";
      isValid = false;
    }
    if (!formData.pdescription.trim()) {
      formErrors.pdescription = "Description is required";
      isValid = false;
    }
    if (!formData.pstock || isNaN(formData.pstock)) {
      formErrors.pstock = "Valid stock quantity is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
     
        // Create new product
        await axios.post("http://localhost:9004/saveproduct", formData);
        alert("Product created successfully!");
      

      navigate("/adminDashboard");
    
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="containerl-product">
      <div className="Headerl-productad">
        <div className="headleftl-product">
          <p className="titlel-product">EasyKart</p>
          <p className="subclassl-product">Admin Portal</p>
        </div>
      </div>

      <div className="product-form-container">
        <h2 className="form-title">{editProduct ? "Edit Product" : "Add New Product"}</h2>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="pname">Product Name*</label>
            <input
              type="text"
              id="pname"
              name="pname"
              value={formData.pname}
              onChange={handleChange}
              className={errors.pname ? "error-input" : ""}
            />
            {errors.pname && <span className="error-message">{errors.pname}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (₹)*</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={errors.price ? "error-input" : ""}
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="discount">Discount (%)</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pdescription">Description*</label>
            <textarea
              id="pdescription"
              name="pdescription"
              value={formData.pdescription}
              onChange={handleChange}
              rows="2"
              className={errors.pdescription ? "error-input" : ""}
            ></textarea>
            {errors.pdescription && <span className="error-message">{errors.pdescription}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pstock">Stock Quantity*</label>
              <input
                type="number"
                id="pstock"
                name="pstock"
                value={formData.pstock}
                onChange={handleChange}
                min="0"
                className={errors.pstock ? "error-input" : ""}
              />
              {errors.pstock && <span className="error-message">{errors.pstock}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pimgurl">Image URL</label>
            <input
              type="text"
              id="pimgurl"
              name="pimgurl"
              value={formData.pimgurl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/adminDashboard")}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
