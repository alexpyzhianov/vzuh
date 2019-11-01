import fs from "fs"
import mime from "mime-types"
import path from "path"
import AWS from "aws-sdk"
import { walkSync } from "./files"
import { cli } from "cli-ux"

export const cloudHostname = "storage.yandexcloud.net"

const s3 = new AWS.S3({
    endpoint: "https://" + cloudHostname,
    accessKeyId: process.env.YAC_KEY_ID,
    secretAccessKey: process.env.YAC_SECRET,
    region: "ru-central1",
    httpOptions: {
        timeout: 10000,
        connectTimeout: 10000,
    },
})

export async function createBucket(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
        s3.createBucket({ Bucket: name, ACL: "public-read" }, err => {
            if (err) {
                reject(err)
            } else {
                resolve(name)
            }
        })
    })
}

export async function deleteBucket(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
        s3.deleteBucket({ Bucket: name }, err => {
            if (err) {
                reject(err)
            } else {
                resolve(name)
            }
        })
    })
}

export async function uploadSingleFile(params: {
    bucket: string
    filePath: string
    rootDir: string
}) {
    const { bucket, filePath, rootDir } = params

    return new Promise((resolve, reject) => {
        fs.readFile(path.join(rootDir, filePath), (err, fileContent) => {
            if (err) {
                cli.action.stop("failed")
                return
            }

            s3.putObject(
                {
                    ACL: "public-read",
                    ContentType: mime.lookup(filePath) || undefined,
                    Bucket: bucket,
                    Key: filePath,
                    Body: fileContent,
                },
                err => {
                    if (err) {
                        cli.action.stop("failed")
                        reject()
                    } else {
                        cli.action.stop()
                        resolve(filePath)
                    }
                },
            )
        })
    })
}

export async function uploadFolder(params: {
    bucket: string
    folderPath: string
    rootDir: string
}) {
    const { bucket, folderPath, rootDir } = params
    const fileList = walkSync(folderPath)

    for await (let filePath of fileList) {
        await uploadSingleFile({ bucket, filePath, rootDir })
    }

    return fileList
}

export async function uploadWebsiteConfig(bucket: string) {
    return new Promise((resolve, reject) => {
        s3.putBucketWebsite(
            {
                Bucket: bucket,
                WebsiteConfiguration: {
                    ErrorDocument: {
                        Key: "error.html",
                    },
                    IndexDocument: {
                        Suffix: "index.html",
                    },
                },
            },
            err => {
                if (err) {
                    cli.action.stop("failed")
                    reject()
                } else {
                    cli.action.stop()
                    resolve(null)
                }
            },
        )
    })
}
