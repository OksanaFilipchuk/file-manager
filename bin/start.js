#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import fs from "fs";
import process from "process";
import readLine from "readline";
import { FileManager } from "./fileManager.js";

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
  backgroundColor: "#555555",
};

let name =
  process.argv
    .filter((el) => el.includes("--username="))[0]
    ?.replace("--username=", "") || "unknown user";

const greeting = chalk.white.bold(`Welcome to the File Manager, ${name}!`);
const msgBox = boxen(greeting, boxenOptions);

fs.writeFile("userName.txt", `${name}`, (err) => {
  if (err) {
    console.log(err);
    return;
  }
});

console.log(msgBox);
let fileManager = new FileManager(name);

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (input) => {
  if (input.split(" ").length === 2 && input.trim().startsWith("cd")) {
    fileManager.cd(input.split(" ").map((el) => el.trim())[1]);
  } else if (input.trim() == ".exit") {
    fileManager.exit();
  } else console.log("Command not found");
});
