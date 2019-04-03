const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/featuredlanding', (req, res) => {
    console.log("Featured Landing Route");
});

module.exports = router;