const { multiDocUpload } = require("../utils/upload")
const multiDocs = require("./../models/Doc")
exports.addDocController = (req, res) => {
    try {
        multiDocUpload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "multer Error" + err
                })
            }
            if (req.files.dob) {
                req.body.userDob = `dob/${req.files.dob[0].filename}`
            }
            if (req.files.adhar) {
                req.body.userAdhar = `adhar/${req.files.adhar[0].filename}`
            }
            if (req.files.tc) {
                req.body.userTc = `tc/${req.files.tc[0].filename}`
            }
            const result = await multiDocs.create(req.body)
            res.json({
                success: true,
                message: "Doc Uplaoded successfully"
            })
        })
    } catch (error) {
        res.status(400).json({
            success: true,
            message: "Error " + error
        })
    }

}
exports.getAlldocsController = async (req, res) => {
    try {
        const result = await multiDocs.find()
        res.json({
            sucess: true,
            message: "doc fetched successfully",
            result
        })
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: "error " + error
        })

    }
} 