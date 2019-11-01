import inquirer from "inquirer"
import cli from "cli-ux"
import { Command, flags } from "@oclif/command"
import { createBucket, uploadFolder, uploadWebsiteConfig } from "../utils/aws"

export default class Deploy extends Command {
    static description = "deploy a new website"

    static flags = {
        help: flags.help({ char: "h" }),
    }

    async run() {
        const bucket = await bucketCreationLoop(this)

        const { folderPath } = await inquirer.prompt([
            {
                name: "folderPath",
                type: "input",
                message:
                    "Choose a folder with your website contents (Usually it's the one with index.html)",
            },
        ])

        try {
            cli.action.start("Uploading files")
            await uploadFolder({ bucket, folderPath, rootDir: folderPath })
        } catch (e) {
            this.warn(e.message)
            cli.action.stop("failed")
        }

        try {
            cli.action.start("Uploading website config")
            await uploadWebsiteConfig(bucket)
        } catch (e) {
            this.warn(e.message)
            cli.action.stop("failed")
        }

        this.log("Вжух! And you website is live!")
    }
}

async function bucketCreationLoop(cmd: Command): Promise<string> {
    while (true) {
        const { bucketName } = await inquirer.prompt([
            {
                name: "bucketName",
                type: "input",
                message: "Name of your website",
            },
        ])

        try {
            cli.action.start("Creating your website", "", {
                stdout: true,
            })
            await createBucket(bucketName)
            cli.action.stop()

            return bucketName
        } catch (e) {
            cmd.warn(e.message)
            cli.action.stop("failed")
            continue
        }
    }
}
