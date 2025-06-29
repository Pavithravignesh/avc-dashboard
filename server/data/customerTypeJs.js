// ES6 syntax for Express.js applications
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the JSON file from rawData folder
const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, 'rawData', 'customerType.json'), 'utf8'));

// TODO: Convert JSON data to MongoDB-ready format using built-in functions
// You can use methods like map(), forEach(), or other array methods here

// Example conversion (you can modify this as needed):
const customerTypeData = jsonData.map((item) => ({
    ...item
}));

// ES6 export for use in Express routes/controllers
export default customerTypeData;
