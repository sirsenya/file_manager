import { access } from "fs/promises";
import { join } from "path";
import { opFailed } from "../op_failed.js";

export const cd = async (passedPath) => {
  try {
    await access(passedPath, mode);
    process.chdir(join(process.cwd(), passedPath));
  } catch {
    try {
      process.chdir(passedPath);
    } catch {
      opFailed("Invalid path");
    }
  }
};
