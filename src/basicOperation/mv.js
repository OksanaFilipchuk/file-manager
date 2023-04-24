import { cp } from "./cp.js";
import { rm } from "./rm.js";

export async function mv(filePath, newDirPath) {
  await cp(filePath, newDirPath);
  rm(filePath);
}
