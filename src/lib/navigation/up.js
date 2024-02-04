import path from "path";
import os from "os";

export const up = async () => {
  const currentDir = process.cwd();
  if (currentDir != os.homedir()) {
    process.chdir(currentDir.split(path.basename(currentDir))[0]);
  }
};
