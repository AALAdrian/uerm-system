const express = require('express');
const router = express.Router()

router.get('/',(req, res) => {
    res.send('you successfully get requested /encode route')
    console.log("get request to /encode is successful")
})

module.exports = router