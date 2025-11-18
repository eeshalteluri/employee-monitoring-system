import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import AuthRoutes from "./routes/auth.route"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Backend running on http://localhost:5000");
    });
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
}

start();

// Test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

const PORT = process.env.PORT || 5000;

app.use('/api/auth', AuthRoutes)

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
