import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, 'rawData', 'acvRange.json'), 'utf8'));

const acvRangeData = jsonData.map((item) => ({
  ...item
}));

export default acvRangeData;
