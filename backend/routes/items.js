const express = require("express")
const requireAuth = require("../middleware/requireAuth")
const {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem
  } = require('../controllers/itemController')

const router  = express.Router()
router.use(requireAuth)

router.get('/', getItems)

//GET a single Item
router.get('/:id', getItem)

// POST a new Item
router.post('/', createItem)

// DELETE a Item
router.delete('/:id', deleteItem)

// UPDATE a Item
router.patch('/:id', updateItem)


module.exports = router