import { unlink, access } from "fs/promises";
import { join } from "path";
import { opFailed } from "../op_failed.js";

export const rm = async (pathToFile) => {
  const file = join(process.cwd(), pathToFile);
  try {
    await access(file);
    await unlink(file);
  } catch {
    opFailed("Initial file doesn't exist");
  }
};
