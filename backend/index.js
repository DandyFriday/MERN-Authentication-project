// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import path from "path";

// import { connectDB } from "./db/connectDB.js";

// import authRoutes from "./routes/auth.route.js";

// dotenv.config();

// //await connectDB();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.use(express.json()); // allows us to parse incoming requests:req.body
// app.use(cookieParser()); // allows us to parse incoming cookies

// app.use("/api/auth", authRoutes);

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

// app.listen(PORT, () => {
// 	connectDB();
// 	console.log("Server is running on port: ", PORT);
// });





import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

//await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ✅ Updated: Allow both local and deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-authentication-project-1.onrender.com", // 👈 replace with your actual frontend domain if different
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port: ", PORT);
});