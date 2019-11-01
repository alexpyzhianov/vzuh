import path from "path"
import fs from "fs"

export function walkSync(
    root: string,
    innerDir: string = "",
    fileList: string[] = [],
) {
    const currentDir = innerDir || root
    const files = fs.readdirSync(currentDir)

    files.forEach(file => {
        const filePath = path.join(currentDir, file)

        if (fs.statSync(filePath).isDirectory()) {
            fileList = walkSync(root, filePath, fileList)
        } else {
            fileList.push(filePath.replace(root + "/", ""))
        }
    })

    return fileList
}
