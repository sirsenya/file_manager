#!/usr/bin/env node
import process from "process";
import { fileManger } from "../src/lib/file_manager.js";

const mapArgs = (args) => {
  const mappedArgs = new Map();
  for (let arg of args) {
    const splits = arg.split("=");
    mappedArgs.set(splits[0], splits[1]);
  }
  return mappedArgs;
};

const args = mapArgs(process.argv.slice(2));

if (args.has("--username")) {
  const userName = args.get("--username");
  fileManger(userName);
}
