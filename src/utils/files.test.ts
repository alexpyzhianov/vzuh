import mockFs from "mock-fs"
import { walkSync } from "./files"

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

afterAll(() => mockFs.restore())

test("walkSync", () => {
    expect(walkSync("public")).toEqual([
        "css/assets/pic.jpg",
        "css/bundle.css",
        "favicon.ico",
        "index.html",
        "js/bundle.js",
    ])
})
