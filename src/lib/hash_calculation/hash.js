import { createReadStream } from "fs";
import { createHash } from "node:crypto";
import { join } from "path";
import { access } from "fs/promises";
import { opFailed } from "../op_failed.js";

export const hash = async (filePath) => {
  const pathToFile = join(process.cwd(), filePath);
  try {
    await access(pathToFile);
    const stream = createReadStream(pathToFile);
    stream.on("data", (chunk) =>
      console.log(createHash("sha3-256").update(chunk).digest("hex"))
    );
  } catch {
    opFailed("Initial file doesn't exist");
  }
};
