const express = require("express")
const router = express.Router({ mergeParams: true })
const User = require("../models/User")
const auth = require("../middleware/auth.middleware")

router.patch('/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params
        if(userId) {
            const updateUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
            res.send(updateUser)
        } else {
            res.status(401).json({
                message: 'Unauthorized!'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла 500 ошибка'
        })
    }
})
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла 500 ошибка'
        })
    }
})


module.exports = router