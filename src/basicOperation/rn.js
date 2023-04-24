import fs from "fs";

export function rn(argument1, argument2) {
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
