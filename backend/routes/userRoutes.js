const { addAvatar, getAllAvatars, addToGallery, getAllUsers, destroyAllUsers } = require("../controller/userController")

const router = require("express").Router()
router
    .get("/", getAllAvatars)
    .get("/fetch", getAllUsers)
    .delete("/destroy", destroyAllUsers)
    .post("/add", addAvatar)
    .post("/add-to-gallery", addToGallery)
module.exports = router