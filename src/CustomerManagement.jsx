import React, { useEffect, useState } from "react";
import axios from "axios";
import "./customerManagement.css"; // Create this file for styling

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios.get("http://localhost:9004/allusers")
      .then(response => setCustomers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  };

  const deleteCustomer = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:9004/deleteuser/${userId}`)
        .then(() => {
          alert("User deleted successfully.");
          fetchCustomers(); // Refresh list
        })
        .catch(error => {
          console.error("Error deleting user:", error);
          alert("Failed to delete user.");
        });
    }
  };

  return (
    <>
   
      <div className="Headerl-productad">
        <div className="headleftl-product">
          <p className="titlel-product">EasyKart</p>
          <p className="subclassl-product">Admin Portal</p>
        </div>
      </div>



    <div className="customer-container">
      <h2>Customer Management</h2>
      {customers.length > 0 ? (
        <table className="customer-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              
            </tr>
          </thead>
          <tbody>
          {customers.map((user) => (
  <tr key={user.uid}>
    <td>{user.uid}</td>
    <td>{user.uname}</td>
    <td>{user.uemail}</td>
    <td>
      <button className="delete-btn" onClick={() => deleteCustomer(user.uid)}>
        Delete
      </button>
    </td>
  </tr>
))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
    </>
  );
}

export default CustomerManagement;
