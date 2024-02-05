import { rename, access } from "fs/promises";
import { join } from "path";
import { opFailed } from "../op_failed.js";

export const rn = async (pathToFile, newName) => {
  const filePath = join(process.cwd(), pathToFile);
  const newFilePath = join(process.cwd(), newName);
  try {
    await access(filePath);
    try {
      await access(newFilePath);
      opFailed("file with passed name already exist");
    } catch {
      await rename(filePath, newFilePath);
    }
  } catch {
    opFailed("initial file doesn't exist");
  }
};
