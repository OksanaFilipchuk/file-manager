import path from "path";
import process from "process";
import fs from "fs";
import { fileURLToPath } from "url";

class FileManager {
  constructor(userName) {
    this.userName = userName;
  }

  cd(dir) {
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

  exit() {
    let userName = fs.readFileSync("userName.txt", "utf8");
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(1);
  }
}

export { FileManager };
