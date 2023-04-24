import path from "path";
import process from "process";
import fs from "fs";

export function add(filePath) {
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
