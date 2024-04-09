const express = require("express")
const router = express.Router()

const bookController = require('../controllers/book.controller')

router.get("/", bookController.getAll)
router.get("/tocken", bookController.getTocken)
router.get("/delete", bookController.delete)
router.get("/add", bookController.addTocken)

module.exports = router