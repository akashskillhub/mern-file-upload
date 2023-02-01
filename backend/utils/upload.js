const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { v4: uuid } = require("uuid")
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const allowedExt = [".png", ".jpg", ".jpeg"]
        if (!allowedExt.includes(ext)) {
            cb("Invalid extation")
        }
        const fn = uuid() + ext
        cb(null, fn)
    },
    destination: (req, file, cb) => {
        const loc = "public/profile"
        fs.mkdirSync(loc, { recursive: true })
        cb(null, loc)
    },
})
const multiStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const allowedExt = [".png", ".jpg", ".jpeg", ".pdf"]
        if (!allowedExt.includes(ext)) {
            cb("Invalid extation " + ext)
        }
        const fn = uuid() + ext
        cb(null, fn)
    },
    destination: (req, file, cb) => {
        const loc = "public/gallery"
        fs.mkdirSync(loc, { recursive: true })
        cb(null, loc)
    },
})
const multiDocsStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const allowedExt = [".png", ".jpg", ".jpeg", ".pdf"]
        if (!allowedExt.includes(ext)) {
            cb("Invalid extation " + ext)
        }
        const fn = uuid() + ext
        cb(null, fn)
    },
    destination: (req, file, cb) => {
        let loc
        if (file.fieldname === "dob") {
            loc = "public/dob"
        }
        if (file.fieldname === "adhar") {
            loc = "public/adhar"
        }
        if (file.fieldname === "tc") {
            loc = "public/tc"
        }
        fs.mkdirSync(loc, { recursive: true })
        cb(null, loc)
    },
})
exports.avatarUpload = multer({
    storage,
    limits: { fileSize: "1mb" }
}).single("avatar")
exports.galleryUpload = multer({
    storage: multiStorage,
    limits: { fileSize: "1mb" }
}).array("doc", 5)

exports.multiDocUpload = multer({
    storage: multiDocsStorage,
    limits: { fileSize: "1mb" }
}).fields([
    { name: "dob", maxCount: 1 },
    { name: "adhar", maxCount: 1 },
    { name: "tc", maxCount: 1 },
])