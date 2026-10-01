// Loads the bundled sample data into MongoDB.
// Usage: npm run seed            (skips collections that already have data)
//        npm run seed -- --reset (wipes and reloads every collection)
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./db.js";

import AccountIndustry from "./models/AccountIndustry.js";
import AcvRange from "./models/AcvRange.js";
import CustomerType from "./models/CustomerType.js";
import Team from "./models/Team.js";
import User from "./models/User.js";

import accountIndustryData from "./data/accountIndustryJs.js";
import acvRangeData from "./data/acvRangeJs.js";
import customerTypeData from "./data/customerTypeJs.js";
import teamData from "./data/teamJs.js";
import userData from "./data/userJs.js";

dotenv.config();
const reset = process.argv.includes("--reset");

const collections = [
  [AccountIndustry, accountIndustryData],
  [AcvRange, acvRangeData],
  [CustomerType, customerTypeData],
  [Team, teamData],
  [User, userData],
];

try {
  await connectDB();
  for (const [Model, data] of collections) {
    if (reset) {
      await Model.deleteMany({});
    } else if (await Model.estimatedDocumentCount()) {
      console.log(`${Model.modelName}: already has data, skipping`);
      continue;
    }
    await Model.insertMany(data);
    console.log(`${Model.modelName}: inserted ${data.length} documents`);
  }
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
