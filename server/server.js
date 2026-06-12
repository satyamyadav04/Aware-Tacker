// import dns from 'node:dns/promises';
// dns.setServers(["1.1.1.1", "1.0.0.1"]);

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors"; // ADD THIS

// import userRoutes from "./routes/userRoutes.js";
// import activityRoutes from "./routes/activityRoutes.js";

// dotenv.config();

// const app = express();

// // middleware
// app.use(cors()); // ADD THIS
// app.use(express.json());

// // port
// const PORT = process.env.PORT || 5000;

// // ================= ROUTES =================
// app.use("/api/users", userRoutes);
// app.use("/api/activity", activityRoutes);

// // ================= HOME ROUTE =================
// app.get("/", (req, res) => {
//   res.send("Backend is running 🚀");
// });

// // ================= DATABASE CONNECTION =================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });

//   })
//   .catch((err) => {
//     console.log("MongoDB Connection Error:", err);
//   });


import dns from 'node:dns/promises';
dns.setServers(["1.1.1.1", "1.0.0.1"]);

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ================= DATABASE CONNECTION =================
// Serverless-friendly: connect once, reuse connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
  }
};

// Connect on every request (cached after first)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ================= ROUTES =================
app.use("/api/users", userRoutes);
app.use("/api/activity", activityRoutes);

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ================= LOCAL DEV ONLY =================
if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

export default app;