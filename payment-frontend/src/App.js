import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://your-render-backend-url.com";

function App() {
    const [tenants, setTenants] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/tenants`).then(res => setTenants(res.data));
    }, []);

    return (
        <div>
            <h1>Property Payment Tracker</h1>
            <ul>
                {tenants.map(tenant => (
                    <li key={tenant._id}>
                        {tenant.name} - Rent Due: {tenant.rentDueDate} - Paid: {tenant.paid ? "✅" : "❌"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
