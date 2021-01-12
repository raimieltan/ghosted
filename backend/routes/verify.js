const router = require("express").Router();
const authorization = require("../middleware/authorization")

router.get("/", authorization, (req, res) => {

    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({msg: "Unauthenticated"});
    }

});

module.exports = router