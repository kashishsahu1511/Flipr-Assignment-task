// server.js
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// -------------------- MIDDLEWARE --------------------
// CORS configuration for multiple environments
const corsOptions = {
  origin: [
    'http://localhost:5175',
    'http://localhost:3000',
    'https://real-trust.vercel.app',
    'https://real-trust-frontend.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------- DATABASE CONNECTION --------------------
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// -------------------- ROUTES --------------------
app.use("/api/clients", require("./src/routes/clientRoutes"));
app.use("/api/projects", require("./src/routes/projectRoutes"));
app.use("/api/contacts", require("./src/routes/contactRoutes"));
app.use("/api/newsletter", require("./src/routes/newsletterRoutes"));
app.use("/api/auth", require("./src/routes/authRoutes"));

// -------------------- BASE ROUTE --------------------
app.get("/", (req, res) => {
  res.send("Backend Server is Running ✔");
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
