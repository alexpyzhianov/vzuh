import AWS from "aws-sdk"

const endpoint = new AWS.Endpoint("storage.yandexcloud.net")

export const s3 = new AWS.S3({
    endpoint: endpoint as any,
    accessKeyId: process.env.YAC_KEY_ID,
    secretAccessKey: process.env.YAC_SECRET,
    region: "ru-central1",
    httpOptions: {
        timeout: 10000,
        connectTimeout: 10000,
    },
})
