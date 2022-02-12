const express = require("express")
const router = express.Router({ mergeParams: true })
const auth = require("../middleware/auth.middleware")
const Comment = require("../models/Comment")


router
    .route("/")
    .get( auth, async (req, res) => {
        try {
            const { orderBy, equalTo } = req.query
            const list = await Comment.find({[orderBy]: equalTo})
            res.status(200).send(list)
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла 500 ошибка'
            })
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newComment = await Comment.create({
                ...req.body,
                userId: req.user._id
            })
            res.status(201).send(newComment)
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла 500 ошибка'
            })
        }

})
router.delete('/:commentId', auth, async (req, res) => {
    try {
        const { commentId } = req.params
        const removeComment = await Comment.findById(commentId)

        if( removeComment.userId.toString() === req.user._id ) {
            await removeComment.remove()
            res.status(201).send(null)
        } else {
            res.status(401).json({
                message: 'Unauthorized!'
            })
        }
    } catch (error) {
        console.log("cont", error.message)
        res.status(500).json({
            message: 'На сервере произошла 500 ошибка'
        })
    }
})

module.exports = router