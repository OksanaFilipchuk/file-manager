import path from "path";
import process from "process";
import fs from "fs";
import { createHash } from "crypto";

export function hash(filePath) {
  try {
    const __dirname = process.cwd();
    filePath = fs.existsSync(filePath)
      ? filePath
      : path.resolve(__dirname, filePath);
    if (path) {
      const readStream = fs.createReadStream(filePath, "utf8", (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    } else {
      console.log('Path doesn"t exist');
    }

    const hash = createHash("sha256");
    readStream.on("data", (data) => hash.update(data));
    readStream.on("end", () => console.log("File hash:", hash.digest("hex")));
  } catch (err) {
    console.log(err.message);
  }
}
