import fs from "fs";
import process from "process";
import readLine from "readline";
import { ls } from "./nwd/ls.js";
import { cd } from "./nwd/cd.js";
import { up } from "./nwd/up.js";
import { cat } from "./basicOperation/cat.js";
import { add } from "./basicOperation/add.js";
import { rn } from "./basicOperation/rn.js";
import { exit } from "./exit.js";

let name =
  process.argv
    .filter((el) => el.includes("--username="))[0]
    ?.replace("--username=", "") || "unknown user";

const greeting = `Welcome to the File Manager, ${name}!`;

fs.writeFile("userName.txt", `${name}`, (err) => {
  if (err) {
    console.log(err);
    return;
  }
});

console.log(greeting);

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  let argument1 = input.split(" ").map((el) => el.trim())[1];
  let argument2 = input.split(" ").map((el) => el.trim())[2];
  if (input.split(" ").length === 2 && input.trim().startsWith("cd")) {
    cd(argument1);
  } else if (input.trim() == ".exit") {
    exit();
  } else if (input.trim() == "ls") {
    ls();
  } else if (input.trim() == "up") {
    up();
  } else if (
    input.trim().split(" ").length === 2 &&
    input.trim().startsWith("cat")
  ) {
    cat(argument1);
  } else if (
    input.trim().split(" ").length === 2 &&
    input.trim().startsWith("add")
  ) {
    add(argument1);
  } else if (
    input.trim().split(" ").length === 3 &&
    input.trim().startsWith("rn")
  ) {
    rn(argument1, argument2);
  } else console.log("Command not found");
});

rl.on("SIGINT", () => {
  exit();
});

process.on("SIGINT", (code) => {
  console.log("Process exit event with code: ", code);
});
