const { addDocController, getAlldocsController } = require("../controller/docController")

const router = require("express").Router()

router
    .get("/", getAlldocsController)
    .post("/add", addDocController)
module.exports = router