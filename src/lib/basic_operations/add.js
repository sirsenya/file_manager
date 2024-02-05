import { writeFile, access } from "fs/promises";
import { join } from "path";
import { opFailed } from "../op_failed.js";

export const add = async (fileName) => {
  const pathToFile = join(process.cwd(), fileName);
  try {
    await access(pathToFile);
    opFailed("file with this name already exist");
  } catch {
    try {
      await writeFile(pathToFile, "");
    } catch {
      opFailed("Initial file doesn't exist");
    }
  }
};
