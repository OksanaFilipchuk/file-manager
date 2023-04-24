import process from "process";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";

export async function cp(filePath, newDirPath) {
  let __dirname = process.cwd();
  filePath = fs.existsSync(filePath)
    ? filePath
    : path.resolve(__dirname, filePath);
  try {
    if (!fs.existsSync(path.resolve(newDirPath, path.basename(filePath)))) {
      fs.writeFile(
        path.resolve(newDirPath, path.basename(filePath)),
        "",
        function (err) {
          if (err) console.log(err.message);
          else {
            console.log("File copied successfully\n");
          }
        }
      );
    } else console.log("File already exist");

    const readableStream = fs.createReadStream(filePath, "utf-8");
    const writableStream = fs.createWriteStream(
      path.resolve(newDirPath, path.basename(filePath))
    );
    await pipeline(readableStream, writableStream);
  } catch (err) {
    console.log(err.message);
  }
}
