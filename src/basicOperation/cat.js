import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export function cat(filePath) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  filePath = fs.existsSync(filePath)
    ? filePath
    : path.resolve(__dirname, filePath);
  try {
    let readStream = fs.createReadStream(filePath);
    readStream.on("data", (data) => console.log(data.toString()));
  } catch (err) {
    (err) => console.log(err.message);
  }
}
