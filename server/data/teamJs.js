import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the JSON file from rawData folder
const jsonData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "rawData", "team.json"), "utf8")
);

// TODO: Convert JSON data to MongoDB-ready format using built-in functions

const teamData = jsonData.map((item) => ({
  ...item,
}));

export default teamData;
