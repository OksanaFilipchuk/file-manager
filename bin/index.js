#!/usr/bin/env node

import fs from "fs";
import process from "process";

process.on("SIGINT", (code) => {
  console.log("Process exit event with code: ", code);
});
