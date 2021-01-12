const router = require('express').Router()
const pool = require('../pool.js')
const authorization = require("../middleware/authorization.js")
const multer = require('multer');
//multer storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now()
        cb(null, uniquePrefix + file.fieldname + '.png')
    }
})

//upload

const upload = multer( {storage: storage } )

router.post('/:type', upload.single('my-image'),authorization, async (req, res) => {
    try {
        const { type } = req.params
        const { filename } = req.file
        const { text } = req.body

        console.log(text)
        const newPicture = await pool.query("INSERT INTO pictures VALUES (default, $1, $2, $3)" , [
            filename, type, req.user
        ])

        res.send('Image uploaded')
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
} )

module.exports = router 