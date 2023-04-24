import fs from "fs";

export function rm(filePath) {
  try {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Delete File successfully");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
}
