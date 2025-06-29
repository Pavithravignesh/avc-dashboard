import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import customerTypeRoutes from "./routes/customerType.js";
import accountIndustryRoutes from "./routes/accountIndustry.js";
import acvRangeRoutes from "./routes/acvRange.js";
import teamRoutes from "./routes/team.js";

// models imports
import AccountIndustry from "./models/AccountIndustry.js";
import AcvRange from "./models/AcvRange.js";
import CustomerType from "./models/CustomerType.js";
import Team from "./models/Team.js";

// // data imports
import accountIndustryData from "./data/accountIndustryJs.js";
import acvRangeData from "./data/acvRangeJs.js";
import customerTypeData from "./data/customerTypeJs.js";
import teamData from "./data/teamJs.js";




// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
    credentials: true,
  })
);

// ROUTES
app.use("/customerType", customerTypeRoutes);
app.use("/accountIndustry", accountIndustryRoutes);
app.use("/acvRange", acvRangeRoutes);
app.use("/team", teamRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // ONLY ADD DATA ONE TIME
    // AccountIndustry.insertMany(accountIndustryData);
    // AcvRange.insertMany(acvRangeData);
    // CustomerType.insertMany(customerTypeData);
    // Team.insertMany(teamData);
  })
  .catch((error) => console.log(`${error} Server did not connect`));
