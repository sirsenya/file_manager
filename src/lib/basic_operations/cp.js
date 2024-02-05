import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { access } from "fs/promises";
import path from "path";
import { opFailed } from "../op_failed.js";

export const cp = async (fileName, newDirectory) => {
  const pathToFile = path.join(process.cwd(), fileName);
  const pathToNewDirectory = path.join(process.cwd(), newDirectory, fileName);
  try {
    await access(pathToFile);
    try {
      await access(pathToNewDirectory);
      opFailed("copy already exist");
    } catch {
      await pipeline(
        createReadStream(pathToFile),
        createWriteStream(pathToNewDirectory)
      );
    }
  } catch {
    opFailed("initial file doesn't exist");
  }
};
