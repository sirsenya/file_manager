import { cp } from "./cp.js";
import { rm } from "./rm.js";

export const mv = async (filename, newDir) => {
  await cp(filename, newDir);
  await rm(filename);
};
