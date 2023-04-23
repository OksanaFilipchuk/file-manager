import path from "path";
import process from "process";
import fs from "fs";
import { fileURLToPath } from "url";
import { readdir } from "fs/promises";
import chalk from "chalk";
import boxen from "boxen";
import { table } from "table";

class FileManager {
  constructor(userName) {
    this.userName = userName;
  }

  up() {
    this.cd("..");
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
            chalk.green(el.name),
            chalk.green(el.isDirectory() ? "directory" : "file"),
          ])
      );
      console.log(table(data));
    };

    getDirectories();
  }

  cat(filePath) {
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

  add(filePath) {
    const __dirname = process.cwd();
    try {
      fs.writeFile(path.resolve(__dirname, filePath), "", function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      });
    } catch (err) {
      console.log(err);
    }
  }

  rn(argument1, argument2) {
    try {
      fs.rename(argument1, argument2, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Rename complete!");
        }
      });
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
