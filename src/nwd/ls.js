import process from "process";
import { readdir } from "fs/promises";

export function ls() {
  let data = [["index", "name", "type"]];

  const getDirectories = async () => {
    (await readdir(process.cwd(), { withFileTypes: true })).forEach(
      (el, index) =>
        data.push([index + 1, el.name, el.isDirectory() ? "directory" : "file"])
    );
    console.table(data);
  };

  getDirectories();
}
