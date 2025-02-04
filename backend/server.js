// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (make sure MongoDB is running on your machine)
mongoose.connect("mongodb://localhost:27017/property_payment", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Define a simple Tenant schema
const TenantSchema = new mongoose.Schema({
    name: String,
    email: String,
    rentDueDate: Number,
    amount: Number,
    paid: Boolean,
});

const Tenant = mongoose.model("Tenant", TenantSchema);

// API route: Get list of tenants
app.get("/tenants", async (req, res) => {
    try {
        const tenants = await Tenant.find();
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 

// API route: Add a new tenant
app.post("/add-tenant", async (req, res) => {
    try {
        const tenant = new Tenant(req.body);
        await tenant.save();
        res.json({ message: "✅ Tenant added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
