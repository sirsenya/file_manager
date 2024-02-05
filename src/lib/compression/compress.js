import zlib from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { access } from "fs/promises";
import { join } from "path";
import { opFailed } from "../op_failed.js";
import { pipeline } from "stream/promises";

export const compress = async (filePath, destinationDir) => {
  const pathToFile = join(process.cwd(), filePath);
  const pathToDestination =
    join(process.cwd(), destinationDir, filePath) + ".gz";

  try {
    await access(pathToFile);
    try {
      await access(pathToDestination);
      opFailed("file is already compressed in the passed directory");
    } catch {
      const input = createReadStream(pathToFile);
      const output = createWriteStream(pathToDestination);
      const brotli = zlib.createBrotliCompress();
      await pipeline(input, brotli, output);
    }
  } catch {
    opFailed("Initial file doesn't exist");
  }
};
