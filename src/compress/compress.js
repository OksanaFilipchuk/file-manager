import path from "path";
import fs from "fs";
import zlib from "zlib";
import pipeline from "stream";

export async function compress(filePath, destinationPath) {
  try {
    const __dirname = process.cwd();
    filePath = fs.existsSync(filePath)
      ? filePath
      : path.resolve(__dirname, filePath);

    fs.writeFile(path.basename(destinationPath), "", (err) => {
      if (err) console.log(err.message);
    });

    const brotli = zlib.createBrotliCompress();
    const readableStream = fs.createReadStream(filePath);
    const writableStream = fs.createWriteStream(destinationPath);

    const stream = readableStream.pipe(brotli).pipe(writableStream);

    stream.on("finish", () => {
      console.log("Done compressing");
    });
  } catch (err) {
    console.log(err);
  }
}
