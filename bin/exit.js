#!/usr/bin/env node

import fs from "fs";

let userName = fs.readFileSync("userName.txt", "utf8");
console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
process.exit(1);
