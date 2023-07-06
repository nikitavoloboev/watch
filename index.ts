import Watcher from "watcher"
import path from "node:path"
import mri from "mri"

// watch --run=<cmd> --file=<file-type> --path=<path>

const argv = process.argv.slice(2)

// console.log(mri(argv))

const runCommand = mri(argv).run
const filePath = mri(argv).file
const watchFolderPath = mri(argv).path

// console.log(runCommand)
// console.log(filePath)
// console.log(path)

const watcher = new Watcher(watchFolderPath, {
  ignore: (targetPath) =>
    path.extname(targetPath) !== ".md" && !!path.extname(targetPath),
})

console.log(watcher, "watcher")

watcher.on("all", (event, targetPath, targetPathNext) => {
  console.log(event) // => could be any target event: 'add', 'addDir', 'change', 'rename', 'renameDir', 'unlink' or 'unlinkDir'
  console.log(targetPath) // => the file system path where the event took place, this is always provided
  console.log(targetPathNext) // => the file system path "targetPath" got renamed to, this is only provided on 'rename'/'renameDir' events
})
