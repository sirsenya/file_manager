import { createReadStream } from "fs";
import { join } from "path";
import { opFailed } from "../op_failed.js";
import { access } from "fs/promises";

export const cat = async (fileName) => {
  try {
    const pathToFile = join(process.cwd(), fileName);
    await access(pathToFile);
    const stream = createReadStream(pathToFile);
    stream.on("data", (chunk) => process.stdout.write(chunk.toString()));
  } catch {
    opFailed("Initial file doesn't exist");
  }
};
