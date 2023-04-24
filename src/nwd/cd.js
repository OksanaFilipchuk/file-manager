import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import process from "process";

export function cd(dir) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  let dirPath = fs.existsSync(dir) ? dir : path.resolve(__dirname, dir);
  try {
    process.chdir(dirPath);
    console.log("Current directory was changed: ", process.cwd());
  } catch (err) {
    console.log(err.message);
  }
}
