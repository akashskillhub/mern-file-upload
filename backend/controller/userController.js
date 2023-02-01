const { avatarUpload, galleryUpload } = require("../utils/upload")
const user = require("./../models/User")
exports.addAvatar = async (req, res) => {
    try {
        avatarUpload(req, res, async err => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Multer error " + err
                })
            }

            const result = await user.create({
                ...req.body,
                profile: `profile/${req.file.filename}`
            })

            res.json({
                success: true,
                message: "avatar add successfully"
            })
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error " + error
        })
    }
}
exports.getAllAvatars = async (req, res) => {
    try {
        const result = await user.find()
        res.json({
            success: true,
            message: "avatar fetched successfully",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error " + error
        })
    }
}

exports.addToGallery = async (req, res) => {
    try {
        galleryUpload(req, res, async err => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Multer error " + err
                })
            }
            const d = []
            for (let i = 0; i < req.files.length; i++) {
                d.push(`gallery/${req.files[i].filename}`)
            }

            const result = await user.create({
                ...req.body,
                docs: d
            })
            res.json({
                success: true,
                message: "docs add successfully"
            })
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error " + error
        })
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        const result = await user.find()
        res.json({
            success: true,
            message: "Users Fetched successfully",
            result
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error " + error
        })
    }
}
exports.destroyAllUsers = async (req, res) => {
    try {
        const result = await user.deleteMany()
        res.json({
            success: true,
            message: "all users deleted successfully",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error " + error
        })
    }
}

