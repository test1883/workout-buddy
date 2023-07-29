const express = require("express")
const requireAuth = require("../middleware/requireAuth")
const checkout = require("../controllers/checkoutController")

const router  = express.Router()
router.use(requireAuth)

router.post("/", checkout)


module.exports = router