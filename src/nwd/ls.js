import process from "process";
import { readdir } from "fs/promises";

export function ls() {
  let data = [];

  const getDirectories = async () => {
    (await readdir(process.cwd(), { withFileTypes: true })).forEach(
      (el, index) =>
        data.push({
          name: el.name,
          type: el.isDirectory() ? "directory" : "file",
        })
    );
    console.table(data);
  };

  getDirectories();
}
