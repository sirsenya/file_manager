import { readdir } from "fs/promises";

class FolderContent {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}

export const ls = async () => {
  let folderContents = [];
  const dirContent = await readdir(process.cwd(), { withFileTypes: true });
  const dirs = dirContent
    .filter((item) => item.isDirectory())
    .map((dir) => dir.name)
    .sort((a, b) => a.localeCompare(b));
  const files = dirContent
    .filter((item) => item.isFile())
    .map((file) => file.name)
    .sort((a, b) => a.localeCompare(b));

  for (let i = 0; i < dirs.length + files.length; i++) {
    i < dirs.length
      ? folderContents.push(new FolderContent(dirs[i], "directory"))
      : folderContents.push(new FolderContent(files[i - dirs.length], "file"));
  }

  console.table(folderContents);
};

// Print in console list of all files and folders in current directory. List should contain:
// list should contain files and folder names (for files - with extension)
// folders and files are sorted in alphabetical order ascending, but list of folders goes first
// type of directory content should be marked explicitly (e.g. as a corresponding column value)
