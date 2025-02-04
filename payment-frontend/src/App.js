import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tenants, setTenants] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [property, setProperty] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [selectedTenant, setSelectedTenant] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  // Update the API URL if needed (for production, replace localhost with your backend URL)
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    axios.get(`${API_URL}/tenants`)
      .then((res) => setTenants(res.data))
      .catch((err) => console.error("Error fetching tenants:", err));
  }, []);

  const addTenant = () => {
    axios.post(`${API_URL}/add-tenant`, { name, email, contact, property, rentAmount })
      .then(() => window.location.reload())
      .catch((err) => console.error("Error adding tenant:", err));
  };

  const addPayment = () => {
    axios.post(`${API_URL}/add-payment`, { tenantId: selectedTenant, amount: paymentAmount })
      .then(() => window.location.reload())
      .catch((err) => console.error("Error recording payment:", err));
  };

  return (
    <div className="App">
      <header>
        <h1>Property Payment Tracker</h1>
      </header>
      <section className="form-section">
        <h2>Add Tenant</h2>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Contact" onChange={(e) => setContact(e.target.value)} />
        <input type="text" placeholder="Property" onChange={(e) => setProperty(e.target.value)} />
        <input type="number" placeholder="Rent Amount" onChange={(e) => setRentAmount(e.target.value)} />
        <button onClick={addTenant}>Add Tenant</button>
      </section>

      <section className="tenants-section">
        <h2>Tenants List</h2>
        <ul>
          {tenants.map((tenant) => (
            <li key={tenant._id}>
              <strong>{tenant.name}</strong> - {tenant.property} - Rent: R{tenant.rentAmount}
              <ul>
                {tenant.paymentHistory.map((payment, index) => (
                  <li key={index}>
                    {new Date(payment.date).toLocaleDateString()} - R{payment.amount} - {payment.status}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="payment-section">
        <h2>Record Payment</h2>
        <select onChange={(e) => setSelectedTenant(e.target.value)}>
          <option value="">Select Tenant</option>
          {tenants.map((tenant) => (
            <option key={tenant._id} value={tenant._id}>{tenant.name}</option>
          ))}
        </select>
        <input type="number" placeholder="Payment Amount" onChange={(e) => setPaymentAmount(e.target.value)} />
        <button onClick={addPayment}>Record Payment</button>
      </section>
    </div>
  );
}

export default App;
