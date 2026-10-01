import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./db.js";

// routes
import customerTypeRoutes from "./routes/customerType.js";
import accountIndustryRoutes from "./routes/accountIndustry.js";
import acvRangeRoutes from "./routes/acvRange.js";
import teamRoutes from "./routes/team.js";
import userRoutes from "./routes/user.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// CLIENT_URL is a comma-separated list of allowed origins
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins }));

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// Make sure the database is connected before any data route runs
// (needed on serverless platforms where there is no long-lived process)
const dataRoutes = ["/customerType", "/accountIndustry", "/acvRange", "/team", "/user"];
app.use(dataRoutes, async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// ROUTES
app.use("/customerType", customerTypeRoutes);
app.use("/accountIndustry", accountIndustryRoutes);
app.use("/acvRange", acvRangeRoutes);
app.use("/team", teamRoutes);
app.use("/user", userRoutes);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

// On Vercel the exported app is used as the request handler;
// everywhere else we start a regular HTTP server.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 9000;
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server Port: ${PORT}`)))
    .catch((error) => {
      console.error(`${error} Server did not connect`);
      process.exit(1);
    });
}

export default app;
