import path from "path";
import process from "process";
import fs from "fs";
import { fileURLToPath } from "url";
import { readdir } from "fs/promises";
import chalk from "chalk";
import boxen from "boxen";
import { table } from "table";

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "#555555",
};

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
  ls() {
    let data = [["index", "name", "type"]];
    const getDirectories = async () => {
      (await readdir(process.cwd(), { withFileTypes: true })).forEach(
        (el, index) =>
          data.push([
            index + 1,
            el.name,
            el.isDirectory() ? "directory" : "file",
          ])
      );
      console.log(table(data));
    };
    getDirectories();
  }

  exit() {
    let userName = fs.readFileSync("userName.txt", "utf8");
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.exit(1);
  }
}

export { FileManager };
