const express = require('express')
const router = express.Router()
const listController = require('../controllers/listController')

router.get("/", listController.allList)
router.get("/add", (req, res) => { res.render('../public/add') })
router.get("/edit/:id", express.static(__dirname + '/public'),listController.readList)
router.get("/favorite", listController.loadFavorites)

router.post("/:id", express.urlencoded({ extended: true }), listController.addFavorite)

router.post("/", express.urlencoded({ extended: true }), listController.addList)
router.post("/edit/:id", express.urlencoded({ extended: true }), listController.editList)

router.delete("/:id", express.urlencoded({ extended: true }), listController.deleteList)
router.delete("/", express.urlencoded({ extended: true }), listController.deleteList)


module.exports = router