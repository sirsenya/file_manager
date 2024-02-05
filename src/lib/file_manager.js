import readline from "readline";
import { add } from "./basic_operations/add.js";
import { cat } from "./basic_operations/cat.js";
import { cp } from "./basic_operations/cp.js";
import { rn } from "./basic_operations/rn.js";
import { ls } from "./navigation/ls.js";
import { cd } from "./navigation/cd.js";
import { up } from "./navigation/up.js";
import { rm } from "./basic_operations/rm.js";
import { mv } from "./basic_operations/mv.js";
import { hash } from "./hash_calculation/hash.js";
import { compress } from "./compression/compress.js";
import { decompress } from "./compression/decompress.js";
import { whereAmI } from "./navigation/where_am_i.js";
import os from "node:os";

class Command {
  constructor(func, argsQuantity) {
    this.func = func;
    this.argsQuantity = argsQuantity;
  }
}

export async function fileManger(username) {
  const mapCommads = new Map([
    ///---------------SYSTEM INFO
    ["os --EOL", new Command(() => console.log(JSON.stringify(os.EOL)), 0)],
    ["os --CPU", new Command(() => console.log(os.cpus().length), 0)],
    ["os --homedir", new Command(() => console.log(homedir), 0)],
    [
      "os --username",
      new Command(() => console.log(os.userInfo().username), 0),
    ],
    ["os --architecture", new Command(() => console.log(os.arch()), 0)],

    ///---------------NAVIGATION
    ["up", new Command(async () => await up(), 0)],
    ["cd", new Command(async () => await cd(argsAfterCommand[0]), 1)],
    ["ls", new Command(async () => await ls(), 0)],

    ///---------------BASIC OPERATIONS
    ["add", new Command(async () => await add(argsAfterCommand[0]), 1)],
    ["cat", new Command(async () => await cat(argsAfterCommand[0]), 1)],
    [
      "rn",
      new Command(
        async () => await rn(argsAfterCommand[0], argsAfterCommand[1]),
        2
      ),
    ],
    [
      "cp",
      new Command(
        async () => await cp(argsAfterCommand[0], argsAfterCommand[1]),
        2
      ),
    ],
    ["rm", new Command(async () => await rm(argsAfterCommand[0]), 1)],
    [
      "mv",

      new Command(
        async () => await mv(argsAfterCommand[0], argsAfterCommand[1]),
        2
      ),
    ],

    ///---------------HASH
    ["hash", new Command(async () => await hash(argsAfterCommand[0]), 1)],

    ///---------------COMPRESSION
    [
      "compress",
      new Command(
        async () => await compress(argsAfterCommand[0], argsAfterCommand[1]),
        2
      ),
    ],
    [
      "decompress",
      new Command(
        async () => await decompress(argsAfterCommand[0], argsAfterCommand[1]),
        2
      ),
    ],

    ///---------------EXIT
    [".exit", new Command(() => close(), 0)],
  ]);

  const homedir = os.homedir();
  process.chdir(homedir);
  console.log(`Welcome to the File Manager, ${username}!`);
  whereAmI();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "waiting for commands, master\n",
  });

  function close() {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
  }

  let argsAfterCommand = [];

  function detectCommand(line) {
    argsAfterCommand = [];
    const _line = line.trim();
    const invalidInput = () => console.error("Invalid input");
    for (let command of mapCommads.keys()) {
      if (_line.startsWith(command)) {
        let argsQuantity = mapCommads.get(command).argsQuantity;
        if (argsQuantity > 0) {
          const commandAndArgs = _line
            .split(" ")
            .filter((value) => value != "");
          const args = commandAndArgs.slice(1);
          const passedCommand = commandAndArgs[0];
          if (passedCommand !== command || args.length !== argsQuantity) {
            invalidInput();
            return;
          }
          argsAfterCommand = args;
        } else {
          if (_line !== command) {
            invalidInput();
            return;
          }
        }
        mapCommads.get(command).func();
        return;
      }
    }
    invalidInput();
  }

  rl.on("line", async (line) => {
    detectCommand(line);
    whereAmI(process.cwd());
  });
  rl.on("SIGINT", () => {
    close();
  });
}
