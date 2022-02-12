const express = require("express")
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/comment', require('./comment.routes'))
router.use('/qualities', require('./quality.routes'))
router.use('/profession', require('./profession.routes'))

module.exports = router