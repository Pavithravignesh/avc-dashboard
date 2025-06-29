import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, 'rawData', 'customerType.json'), 'utf8'));

const customerTypeData = jsonData.map((item) => ({
    ...item
}));

export default customerTypeData;