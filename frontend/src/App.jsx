

// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tenants, setTenants] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rentDueDate: "",
    amount: "",
    paid: false,
  });

  // Update this URL to your backend URL if different
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    // Fetch tenants from the backend when the component mounts
    axios
      .get(`${API_URL}/tenants`)
      .then((res) => setTenants(res.data))
      .catch((err) => console.error("Error fetching tenants:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddTenant = () => {
    // Convert rentDueDate and amount to numbers before sending
    const payload = {
      ...formData,
      rentDueDate: Number(formData.rentDueDate),
      amount: Number(formData.amount),
    };

    axios
      .post(`${API_URL}/add-tenant`, payload)
      .then(() => {
        alert("Tenant added successfully!");
        // Refresh tenant list after adding
        return axios.get(`${API_URL}/tenants`);
      })
      .then((res) => setTenants(res.data))
      .catch((err) => console.error("Error adding tenant:", err));
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Property Payment Tracker</h1>
      </header>
      <main>
        <section className="form-section">
          <h2>Add New Tenant</h2>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter tenant name"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter tenant email"
            />
          </div>
          <div className="form-group">
            <label>Rent Due Date (Day of Month):</label>
            <input
              type="number"
              name="rentDueDate"
              value={formData.rentDueDate}
              onChange={handleChange}
              placeholder="e.g., 1 for 1st of month"
            />
          </div>
          <div className="form-group">
            <label>Rent Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter rent amount"
            />
          </div>
          <button onClick={handleAddTenant} className="btn">
            Add Tenant
          </button>
        </section>

        <section className="list-section">
          <h2>Tenant List</h2>
          {tenants.length === 0 ? (
            <p>No tenants available. Add one above!</p>
          ) : (
            <ul className="tenant-list">
              {tenants.map((tenant) => (
                <li key={tenant._id} className="tenant-card">
                  <h3>{tenant.name}</h3>
                  <p><strong>Email:</strong> {tenant.email}</p>
                  <p><strong>Rent Due Date:</strong> {tenant.rentDueDate}</p>
                  <p><strong>Rent Amount:</strong> R{tenant.amount}</p>
                  <p>
                    <strong>Status:</strong> {tenant.paid ? "Paid" : "Not Paid"}
                  </p>
                  {tenant.paymentHistory && tenant.paymentHistory.length > 0 && (
                    <div className="payment-history">
                      <h4>Payment History:</h4>
                      <ul>
                        {tenant.paymentHistory.map((payment, index) => (
                          <li key={index}>
                            {new Date(payment.date).toLocaleDateString()} - R{payment.amount} - {payment.status}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Property Payment Tracker</p>
      </footer>
    </div>
  );
}



export default App
