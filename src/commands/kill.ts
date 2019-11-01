import inquirer from "inquirer"
import { Command, flags } from "@oclif/command"
import { deleteBucket } from "../utils/aws"
import { cli } from "cli-ux"

export default class Kill extends Command {
    static description = "permanently delete one or more websites"
    static strict = false

    static flags = {
        help: flags.help({ char: "h" }),
    }

    static examples = ["$ vzhuh kill website1 website2"]

    static args = [
        {
            name: "website",
            required: true,
            description: "One or more website names",
        },
    ]

    async run() {
        const { argv } = this.parse(Kill)
        const namesDisplay = argv.join(", ")

        const { confirm } = await inquirer.prompt([
            {
                name: "confirm",
                type: "confirm",
                message: `Are you sure you want to delete ${namesDisplay}? This can not be undone!`,
                default: false,
            },
        ])

        if (!confirm) {
            this.log(`Canceled. Your website is still live`)
            return
        }

        for await (let bucket of argv) {
            try {
                cli.action.start(`Deleting ${bucket}...`)
                await deleteBucket(bucket)
                cli.action.stop()
            } catch (e) {
                cli.action.stop("failed")
                this.warn(`Could not delete the website ${bucket}`)
                this.warn(e.message)
            }
        }

        cli.action.stop()
    }
}
