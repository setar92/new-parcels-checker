const express = require("express")
const router = express.Router()

const { testController, parcelController, mainLogickController } = require('../controllers/book.controller')

router.get("/createToken", testController.getAll)
router.get("/tocken", testController.getTocken)
router.get("/delete", testController.delete)
router.get("/add", testController.addTocken)
router.get("/createparcel", parcelController.createTable)
router.get("/addparcel", parcelController.addParcel)
router.get("/getparcel", parcelController.getAllParcel)
router.get("/main", mainLogickController.mainLogick)



module.exports = router