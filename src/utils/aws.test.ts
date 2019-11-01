import nock from "nock"
import mockFs from "mock-fs"
import {
    createBucket,
    deleteBucket,
    uploadSingleFile,
    uploadFolder,
    cloudHostname,
} from "./aws"

const bucket = "sample"
const bucketUrl = `https://${bucket}.${cloudHostname}`
const buffer = Buffer.from([1, 2, 3])

beforeAll(() => {
    mockFs({
        public: {
            "index.html": buffer,
            "favicon.ico": buffer,
            js: {
                "bundle.js": buffer,
            },
            css: {
                assets: {
                    "pic.jpg": buffer,
                },
                "bundle.css": buffer,
            },
        },
    })
})

const rootDir = "public"
const relativePaths = [
    "css/assets/pic.jpg",
    "css/bundle.css",
    "favicon.ico",
    "index.html",
    "js/bundle.js",
]

afterAll(() => mockFs.restore())

test("createBucket", async () => {
    nock(bucketUrl)
        .put("/")
        .reply(200)

    const val = await createBucket(bucket)
    expect(val).toEqual(bucket)
})

test("deleteBucket", async () => {
    nock(bucketUrl)
        .delete("/")
        .reply(200)

    const val = await deleteBucket(bucket)
    expect(val).toEqual(bucket)
})

test("uploadSingleFile", async () => {
    const filePath = "index.html"

    nock(bucketUrl)
        .put("/" + filePath)
        .reply(200)

    const val = await uploadSingleFile({ bucket, filePath, rootDir })
    expect(val).toEqual(filePath)
})

test("uploadFolder", async () => {
    relativePaths.forEach(path => {
        nock(bucketUrl)
            .put("/" + path)
            .reply(200)
    })

    const val = await uploadFolder({ bucket, folderPath: rootDir, rootDir })

    expect(val).toEqual(relativePaths)
})
