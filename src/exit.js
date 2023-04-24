import process from "process";
import fs from "fs";

export function exit() {
  let userName = fs.readFileSync("userName.txt", "utf8");
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(1);
}
